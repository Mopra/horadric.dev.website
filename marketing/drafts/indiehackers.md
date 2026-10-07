# Indie Hackers draft

Not posted. Rules read 2026-10-07: see the Indie Hackers row in CHANNELS.md.
Post at https://www.indiehackers.com/new-post (Google sign in, rule 11), in
the main feed, not as a product page entry. Check LOG.md first (rule 12).
Count toward the two a day cap (rule 3). After posting, stay for comments:
answer from the facts, route bugs to quests (rule 9), questions beyond the
facts to the human (rule 8). Never ask for upvotes.

Facts used, all from PLAYBOOK.md and the README: Claude Code wrote almost
all of it, the human made the calls, Rust on Win32 and Direct2D, about 45 MB
with four sessions open, no Electron, state from the agents' own hooks, real
CLI in a real terminal, free, MIT, no telemetry, Windows 10 and 11 and macOS 11 or later, not code
signed on Windows, not notarized on the Mac. The r/ClaudeCode post covered what was built and how Claude Code was
used. This one is about the split of work, so it is a different post.

## Title

Claude Code wrote almost all of my desktop app. These are the calls I kept for myself.

## Body

I built Horadric with Claude Code. Claude Code wrote almost all of the code. I made the calls.

That split is the whole story, so here is what I think belongs on each side.

**What I decided**

- It is a native app. On Windows it is pure Rust on Win32 and Direct2D. No Electron. It sits at about 45 MB with four sessions open and uses no CPU between events. An agent will happily reach for a web stack if you let it. I did not let it.
- It does not wrap the agent. Click a tile and you get the real CLI in a real terminal. There is no chat UI of its own. I refuse to build one.
- It reads state from the agents' own hooks. It does not scrape the terminal. Scraping works until the next CLI update breaks it.
- It is free, MIT licensed, and has no telemetry. That is a decision about what kind of tool this is, not something the code could tell me.
- It ships unsigned. SmartScreen warns the first time you run it. I would rather say that up front than have you find out.

**What the agents wrote**

Nearly everything else. The tiles, the terminals, the browser pane, the quest log, the notifications, the limit readouts. I describe what I want, the agent writes it, I run it and say what is wrong.

Horadric is also the tool I use to do this. Every agent session is a small tile on the desktop, grouped by project, and it turns amber when the agent needs me. Each project has a quest log that agents work down, with an orchestrator called Warriv that keeps the list going while I am away. I use it to build itself.

**What I took from it**

The code was never the scarce part. The scarce part was knowing what to refuse. Every decision above is a "no", and every one of them is something the agent would not have chosen on its own.

It works with Claude Code, Codex and Grok Build. Windows 10 and 11, and since 0.17.0 macOS 11 or later. The Mac app lacks the browser pane, quest log, Warriv and usage window for now.

Source and download: https://github.com/Mopra/horadric.dev
Site: https://horadric.dev

I would like to hear how you split the work between you and your agents, and where you draw your own line.
