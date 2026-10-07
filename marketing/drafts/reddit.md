# Reddit drafts

Prepared 2026-10-07, not posted. Rules read from /r/<sub>/about/rules.json
the same day. The r/ClaudeCode post (LOG.md) was a feature tour plus
"how Claude Code was used". These four each take a different angle and do
not reuse its sentences. Post at most two new public things a day, in the
order below, and log each in LOG.md the moment it is posted.

Skipped: r/ChatGPTCoding (see CHANNELS.md).

---

## r/ClaudeAI

Earliest: 2026-10-09. Flair: the showcase / project flair (pick the one
that reads "Built with Claude" or "Showcase"; check the flair list in the
submit form). Rule 7 needs OP karma over 100 on the feed: check the
account before posting. Link to the project is fine; no referral links.
Free is stated in the body, as the rule asks.

**Title:** I built a Windows desktop app almost entirely with Claude Code, and this is how it went

**Body:**

I run several Claude Code sessions at once and kept losing the one that was waiting for me. So I built Horadric, a Windows app that shows each session as a small tile and turns it amber when Claude needs a decision. It is free, MIT licensed, and works on Windows 10 and 11.

Claude Code wrote almost all of the code. Here is what that looked like in practice.

**The hard part was not the idea, it was the platform.** Horadric is pure Rust that draws straight to Win32 and Direct2D. No Electron, no UI framework. It sits at about 45 MB with four sessions open and uses no CPU between events. I would not have taken raw Win32 on by hand. Claude Code did, and it was good at the parts that are tedious and exact: window messages, DPI handling, text layout, the terminal underneath the tiles.

**Claude worked from my own quest list.** Horadric has a per project quest log, a plain Markdown checklist. Clicking an item starts a Claude Code session on it. That is how most of the app got built: I wrote the next item down, a session picked it up, I reviewed what came back. I made the calls on what the product is. Claude made it exist.

**Claude Code's hooks are the foundation.** Horadric does not scrape the terminal to guess whether a session is busy or waiting. It reads state from the hooks Claude Code already fires, so a tile is right the moment Claude asks for permission. Keeping the real CLI as the interface meant I never had to chase Claude Code's own updates.

**What I would tell someone starting the same way:** keep your own judgment on design and testing. Claude can write a lot of Rust that compiles and still feels wrong on screen. The testing was mine.

What it does today: tiles grouped by project, a Ctrl+Alt+Space jump to the session that has waited longest, a Windows notification when a session starts waiting, plain terminals and a browser pane beside the agents, your 5 hour and weekly limits, and switching between Claude subscriptions with sessions resuming on the new one. Sessions survive a crash, an update or a reboot.

Free to try: https://horadric.dev
Source: https://github.com/Mopra/horadric.dev

Builds are not code signed yet, so SmartScreen warns you the first time.

Notes for the human before posting:
- "DPI handling", "text layout" and "the terminal underneath the tiles" are named as typical Win32 work. Cut any you do not recognise from the build.
- "Claude can write a lot of Rust that compiles and still feels wrong on screen" is an opinion written for you. Edit it to your real experience if it differs.

---

## r/codex

Flair: Showcase (the rules say showcases skip the karma delay queue, and
a wrong flair gets the post deleted). The rule is high information, so
this is about using Codex with Horadric, not a tour of the app. One
link each, at the end.

**Title:** Running Codex sessions next to Claude Code in one place on Windows (Horadric, free, MIT)

**Body:**

If you keep more than one Codex session going, you know the problem: which terminal is waiting on you? I made Horadric for that. It is a Windows app, free and MIT licensed, and Codex is a supported agent in it.

How Codex works with it:

- Each Codex session becomes a small tile on the desktop, grouped by project. The tile turns amber when Codex needs you.
- Click the tile and you get the real Codex CLI in a real terminal. There is no chat UI of mine in between, so Codex behaves exactly as it does in any terminal.
- Horadric learns a session's state from the agent's own hooks, not by reading terminal text. That is why it can tell "working" from "waiting" without guessing.
- Ctrl+Alt+Space jumps to whichever session has waited longest, Codex or not.
- You get a Windows notification when a session starts waiting and you are looking at something else.
- Sessions survive a crash, an update and a reboot.
- A browser pane sits beside the terminals and agents can drive it.

It also runs Claude Code and Grok Build in the same view, so if you mix agents you do not need a different setup per tool.

It is pure Rust on Win32 and Direct2D, about 45 MB with four sessions open, no CPU between events, no Electron, no telemetry.

Builds are not code signed yet, so SmartScreen warns you the first time you run it.

Site: https://horadric.dev
Source and releases: https://github.com/Mopra/horadric.dev

Which Codex states do you wish a tile could show? Tell me what is missing and I will look at it.

Notes for the human before posting:
- I have no Codex specific story, because the facts file has none. If you have one (a Codex session you caught waiting, a hook detail), add it near the top. r/codex rewards detail.
- Comment karma on r/codex lowers priority for ordinary posts. Showcase flair avoids that.

---

## r/AI_Agents

Rule 3: no links in the post, links go in the first comment. Rule 4: self
promotion is fine if it is about one in ten of the account's posts and
comments, so check the account's history first. Rule 5: needs real
context. If the account is mostly promotion already, use the weekly
project display thread instead.

**Title:** The thing nobody tells you about running five coding agents at once is the waiting

**Body:**

Once I ran four or five coding agents in parallel, the limit was not the model. It was me. Each agent stops when it needs a decision, and I would not notice for twenty minutes because its terminal was behind three others.

Two things fixed it for me.

First, state has to come from the agent, not from the screen. Reading terminal output to guess if an agent is waiting is fragile and breaks whenever the CLI changes. Claude Code, Codex and Grok Build all expose hooks. A hook fires at defined moments in a session, so you get a clean signal with no guessing.

Second, do not wrap the agent in your own chat window. I keep the real CLI as the interface and only add a small tile around it that goes amber when the agent needs me. When the vendor ships a new feature, it just works, because I never replaced the part that changes.

I turned this into a Windows app called Horadric. It is free and open source, written in Rust, with no Electron. Link in the comment.

The open question for me is what a good "needs you" signal looks like once agents run for an hour unattended. A notification is not enough and a wall of dashboards is too much. How do you handle it?

First comment (post right after, same account):

Horadric, if you want to look: https://horadric.dev, source at https://github.com/Mopra/horadric.dev. MIT, Windows 10 and 11, no telemetry. Not code signed yet, so SmartScreen warns on first run. I made it.

Notes for the human before posting:
- "I would not notice for twenty minutes" is an illustration I wrote. Change the number or drop it if it is not true for you.

---

## r/windowsapps

Rule 3: promotional content is limited to 1 post a week and must carry the
"Developer" flair. Rule 2: links must be official and safe, and the
project site and GitHub are. Post nothing else promotional in this sub the
same week.

**Title:** Horadric: a free Windows app that shows each coding agent session as a tile and turns amber when it needs you

**Body:**

I made a small Windows app for people who run AI coding agents (Claude Code, Codex, Grok Build) in terminals.

Each session becomes a tile on the edge of the desktop, grouped by project. It turns amber when the agent is waiting on you. Click it and the real command line tool opens in a terminal. Nothing is wrapped in a chat window.

On the Windows side:

- Native Win32 and Direct2D, written in Rust. About 45 MB with four sessions open and no CPU use between events. Not Electron.
- A global Ctrl+Alt+Space hotkey jumps to the session that has waited longest.
- Windows notifications when a session starts waiting and you are looking elsewhere.
- Sessions survive a crash, an update and a reboot.
- Plain terminals and a browser pane in the same window.

Free, MIT licensed, no telemetry. Windows 10 and 11.

It is not code signed yet, so SmartScreen will warn you the first time you run it. The source is public if you want to check what it does.

Site: https://horadric.dev
Download and source: https://github.com/Mopra/horadric.dev/releases/latest

Notes for the human before posting:
- Flair: Developer.
