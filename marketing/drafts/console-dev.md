# Console.dev draft

Not sent. To: hello@console.dev. Rules read 2026-10-07: console.dev/about says
email hello@console.dev to suggest a tool, reviews are never sponsored, and
they look for tools "built for developers, with easy self-service signup and
clear documentation". No rule on self suggestion. The email says it is ours.
One email, no follow up chasing. Log it in LOG.md when sent (rule 12). It
counts toward the two a day cap (rule 3).

Facts used, all from PLAYBOOK.md: session tiles grouped by project, amber when
the agent needs you, real CLI in a real terminal, Ctrl+Alt+Space, hooks not
scraping, pure Rust on Win32 and Direct2D, about 45 MB with four sessions
open, no Electron, Claude Code / Codex / Grok Build, free, MIT, no telemetry,
Windows 10 and 11, and macOS 11 or later. Not code signed on Windows, not notarized on the Mac.

## Subject

Tool suggestion: Horadric, a desktop for coding agents, on Windows and macOS

## Body

Hi,

I would like to suggest Horadric for Console. I made it, so take that into account.

Horadric turns every coding agent session into a small tile on the desktop, grouped by project. A tile turns amber when the agent needs you. Click it and you get the real CLI in a real terminal. There is no chat UI of its own and no wrapper. Ctrl+Alt+Space (Cmd+J on a Mac) jumps to the session that has waited longest.

State comes from the agents' own hooks, not from scraping the terminal. It works with Claude Code, Codex and Grok Build.

On Windows it is pure Rust on Win32 and Direct2D, about 45 MB with four sessions open, no Electron. It is free, MIT licensed, has no telemetry, and runs on Windows 10 and 11 and macOS 11 or later. The Mac app has the tiles, the stage with real terminals and sessions that outlive the app. The browser pane, quest log, Warriv and usage window are Windows only for now.

One thing to know: it is not code signed yet, so SmartScreen warns the first time you run it.

Site: https://horadric.dev
Source: https://github.com/Mopra/horadric.dev
Download: https://github.com/Mopra/horadric.dev/releases/latest

Thanks for reading.

Morten
