# Product Hunt reply kit

Prepared 2026-10-07 for launch day 2026-10-13. Facts only from PLAYBOOK.md
and the Horadric README. Where the facts give no answer the line says
ASK HUMAN: do not post a reply containing it until the human fills it in
(PLAYBOOK rule 8: a question we cannot answer from the facts goes to the
human as a blocked quest). Always say plainly that I made it. Never ask for
upvotes. Log every reply in LOG.md the moment it is posted.

---

## Is there a Mac or Linux version?

No. Horadric is Windows 10 and 11 only, for now. It is pure Rust drawing straight to Win32 and Direct2D, so it is not something I can flip a switch on. I would rather do one platform well.

ASK HUMAN: is a Mac or Linux port planned? The README only says "for now".

## Why isn't it signed? SmartScreen warned me.

Fair question. The downloads are not code signed yet, so SmartScreen warns the first time. Choose "More info", then "Run anyway". After that, updates are checked against Horadric's own signature. The source is open if you want to read it or build it yourself: https://github.com/Mopra/horadric.dev

ASK HUMAN: why is it not signed yet (cost, certificate process) and is there a plan or date? The facts do not say.

## What does it cost?

Nothing. Free and MIT licensed. No paid tier, no account.

ASK HUMAN: is a paid tier planned later? Do not promise "free forever" unless the human says so.

## Does it collect telemetry?

No. No telemetry, no analytics, no crash reporting. The only thing that leaves your machine is the daily update check against GitHub, and Discord status if you switch it on. The full audit is in docs/PRIVACY.md in the repo.

## How does it know an agent is waiting?

It does not read the terminal. It reads state from the agent's own lifecycle hooks. With Claude Code, each event is posted to Horadric over localhost: a prompt submitted means working, a permission request means waiting, a stop means done. Only sessions Horadric started are tracked. Scraping terminal text is a guess. Hooks are not.

## Does it work with Codex and Grok?

Yes. Claude Code, Codex and Grok Build all work. You start one with `horadric new --agent codex`, for example.

ASK HUMAN: how state is detected for Codex and Grok Build, and whether they match Claude Code in features. The README describes the hooks only for Claude Code.

## How is it different from tmux?

Horadric is a Windows desktop app, not a terminal multiplexer. Each agent session is a small tile grouped by project, and it turns amber when the agent needs you. Ctrl+Alt+Space jumps to the session that has waited longest, and you get a Windows notification when one starts waiting. Click a tile and you get the real CLI in a real terminal.

ASK HUMAN: what to say about tmux itself. The facts say nothing about it, so no claim about what it lacks until the human writes one.

## How is it different from Claude Squad?

Horadric shows every session as a tile on the Windows desktop and never puts a chat UI of its own in front of the agent. The terminal is the UI. It works with Claude Code, Codex and Grok Build.

ASK HUMAN: anything about Claude Squad itself. The facts say nothing about it, so no comparison claims until the human writes them.

## How is it different from Windows Terminal?

Windows Terminal is a terminal. Horadric is the layer above the agents: tiles by project, amber when one needs you, a global jump key, notifications, a quest log per project, and your 5 hour and weekly limits. It also has plain terminals and a browser pane beside the agents, so it covers some of the same ground.

ASK HUMAN: whether to say anything about Windows Terminal's own features. The facts give none.

## Is it AI written?

Almost all of it, yes. Claude Code wrote the code. I made the calls: what the product is, what it refuses to be, and how it should feel. I did the testing too.

Do not add any story about the build that the human has not told.

---

## Short ones for the follow ups

**Is it Electron?** No. Pure Rust on Win32 and Direct2D. About 45 MB with four sessions open, and no CPU between events.

**What if it crashes or I reboot?** Sessions survive a crash, an update and a reboot. Click a paused tile and the conversation resumes.

**Can I use my own terminal?** Click a tile and the session opens in a real terminal with the real CLI in it.

**Bug report or feature request in a comment.** Thank them in one line, then file a quest in the Horadric repository with a `From: <link>` notes line (PLAYBOOK rule 9). Do not promise a date in the reply.

**Anything heated, or a question not covered here.** Do not reply. File a blocked quest for the human.
