# Changelog News draft

Not submitted. Needs the human's Changelog sign in (Google, rule 11) in the browser
pane. Form read 2026-10-07 at changelog.com/news/submit without signing in. The form
is disabled until sign in. Self submission is "also encouraged". Excluded: how-tos,
tutorials, commercial products/services, reader-hostile sites. Nothing stated on AI
text. Log it in LOG.md when submitted (rule 12). It counts toward the two a day cap
(rule 3).

Fields on the form:

1. URL* (placeholder `https://example.com`)
2. Title* (placeholder `Project/Article title...`)
3. What's interesting about it? (optional, Markdown supported, placeholder
   `Proverbial elevator pitch...`)

Facts used, all from PLAYBOOK.md: MIT, free, no telemetry, pure Rust on Win32 and
Direct2D, about 45 MB with four sessions open, no CPU between events, no Electron,
state from the agents' own hooks, real CLI in a real terminal, Claude Code wrote
almost all of it and the human made the calls, Claude Code / Codex / Grok Build,
Windows 10 and 11, not code signed.

## URL

https://github.com/Mopra/horadric.dev

## Title

Horadric: an MIT licensed Windows desktop for coding agents, in pure Rust

## What's interesting about it?

Horadric is open source (MIT, no telemetry) and written in pure Rust on Win32 and Direct2D. No Electron, no webview shell. It sits at about 45 MB with four agent sessions open and uses no CPU between events.

The interesting part is how it knows what an agent is doing. It does not scrape the terminal. State comes from the agents' own hooks, so a tile on the desktop turns amber when Claude Code, Codex or Grok Build needs you. Click it and you get the real CLI in a real terminal. There is no chat UI of its own and no wrapper.

It was also built by the thing it hosts. Claude Code wrote almost all of the code, and I made the calls.

Free, Windows 10 and 11. It is not code signed yet, so SmartScreen warns the first time you run it.

Site: https://horadric.dev
