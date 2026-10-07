---
title: Ask the agent, don't read the screen
published: false
tags: ai, rust, windows, tooling
---

<!-- Draft prepared 2026-10-07, NOT published. Set published: true only when posting.
     Facts from README.md and docs/PLAN.md of the Horadric repo, plus marketing/PLAYBOOK.md. -->

I run several coding agent sessions at once. The one that has waited twenty minutes for my permission is always the one at the bottom of the pile. So I built Horadric, a Windows desktop that shows every session as a small tile and turns it amber when the agent needs me.

The interesting part is not the tile. It is how Horadric knows which tile to light.

## The tempting way is wrong

The obvious design is to watch the terminal. Read the text, look for "Do you want to proceed?", guess the state. It works on day one and breaks on the next release of the agent, because you are parsing a user interface that was never meant to be parsed.

Horadric never does that. It reads state from the agent's own lifecycle hooks. Claude Code posts each event to Horadric over localhost. A prompt submitted means working. A permission request means waiting. A stop means done. The agent says what it is doing. I just listen.

## How it works

Horadric installs hooks into the agent's settings. Each one is an `http` hook that posts the event to a listener on `127.0.0.1:43117`. The hook config carries a header, `X-Horadric-Session`, filled from an environment variable that Horadric sets when it starts the session. So every event arrives already tagged with the session it belongs to.

The state machine on the other side is small. Prompt and tool events mean working. Permission and notification events mean waiting. `Stop` means done. `SessionEnd` means ended. Subagent events and compaction restarts change nothing.

## The guard that matters

Hooks live in the agent's settings, which are global. Install them naively and every `claude` on your machine reports to you, including the ones you never asked Horadric to watch.

The header fixes that. A `claude` started outside Horadric sends an empty session header, and the event is dropped. Horadric only tracks sessions it started. Everything else is ignored. I would call this the one rule of the design: do not instrument the whole machine. The design notes in the repo say a similar project got this wrong and wrote it up, and the guard is the lesson I took from it.

## It still needs care

The tag alone is not enough. Claude Code's background sessions are started by one shared daemon, which copies the environment of whichever session started it. Every background session after that posts under that first session's tag, whoever asked for it. I saw this with a probe on 2026-09-26: a background session started with its own tag arrived under the daemon's. So background sessions get tiles of their own, and I stopped trusting the tag as the whole answer.

Another gap: Claude Code sends no hook until the first prompt. A fresh session would be invisible. So `horadric run` posts a registration event of its own before it starts Claude.

## What hooks give you for free

Because the events carry real data, a lot comes without parsing anything:

- Hooks fired inside a subagent carry its `agent_id`, so a tile can show subagents without adding a hook to anyone's settings.
- Tool hooks tell Horadric which files changed, and whether a test run or a commit succeeded, from the tool input and the success or failure event.
- Every hook carries Claude's session id, which is how a session resumes with `claude --resume` after a crash, an update or a reboot.

## Where hooks run out

Not everything is a hook. No hook carries usage, and there is no public API for a subscription's limits. Claude Code hands those only to the status line command, as JSON on stdin after each reply. So Horadric starts each of its own sessions with a settings file that makes `horadric status` the status line, and that passes the JSON on to the same localhost listener. Same rule as before: a `claude` started anywhere else is not touched.

A plain terminal has no hook either. For those, the tile reads the terminal title and its output. I would rather say that than pretend the rule has no exception.

## What it costs

Nothing much. Horadric is pure Rust, drawing straight to Win32 and Direct2D. About 45 MB with four sessions open, and no CPU between events. No Electron. There is no telemetry. The only thing that leaves the machine is the daily update check against GitHub.

It works with Claude Code, Codex and Grok Build. It is free and MIT licensed, for Windows 10 and 11. Claude Code wrote almost all of it. I made the calls.

## One warning

The downloads are not code signed yet. Windows SmartScreen will warn you the first time. Choose "More info", then "Run anyway". Updates after that are checked against Horadric's own signature. I would rather you read that here than be surprised by it.

## Links

- Site: https://horadric.dev
- Source: https://github.com/Mopra/horadric.dev
- Download: https://github.com/Mopra/horadric.dev/releases/latest
- Design notes, including the hook decisions: https://github.com/Mopra/horadric.dev/blob/main/docs/PLAN.md
