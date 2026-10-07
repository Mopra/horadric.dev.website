# Listing drafts

Prepared 2026-10-07, not submitted. Every claim comes from the facts in
`PLAYBOOK.md`. Rules and queue notes are in `CHANNELS.md`. Each site needs
a sign in on the day, so only the human's Google or GitHub basic profile
(playbook rule 11). Counts toward the two-a-day cap (rule 3).

Always state the SmartScreen warning. Never ask for votes.

## Shared copy

**Name:** Horadric

**Website:** https://horadric.dev
**Source:** https://github.com/Mopra/horadric.dev
**Download:** https://github.com/Mopra/horadric.dev/releases/latest

**Tagline (60 chars):** Every coding agent session as a tile on your desktop

**Tagline, short (40 chars):** Coding agent sessions as desktop tiles

**One line:** A desktop for Windows and macOS for Claude Code, Codex and Grok Build sessions. It tells you which one is waiting for you.

**Short description (about 300 chars):**
Horadric turns every coding agent session into a small tile on the desktop, grouped by project. A tile turns amber when the agent needs you. Click it and you get the real CLI in a real terminal. No chat UI of its own, no wrapper. Free, MIT licensed, no telemetry.

**Long description:**

Every coding agent session becomes a small tile on the desktop, grouped by project. A tile turns amber when the agent needs you.

Click a tile and you get the real CLI in a real terminal. Horadric has no chat UI of its own and does not wrap the agent.

- Ctrl+Alt+Space jumps to the session that has waited longest.
- A Windows notification fires when a session starts waiting and you look away. On a Mac the Dock icon counts the sessions waiting and bounces.
- Plain terminals sit beside the agents. On Windows there is also a browser pane agents can drive.
- On Windows: a quest log per project, Warriv the orchestrator, and the Runetome buttons.
- On Windows it shows 5 hour, weekly and spend limits, and switches Claude subscriptions.
- State comes from the agents' own hooks, not from scraping the terminal.
- Sessions survive a crash, an update and a reboot.
- Works with Claude Code, Codex and Grok Build.

On Windows it is pure Rust on Win32 and Direct2D. About 45 MB with four sessions open. No CPU between events. No Electron.

Free, MIT licensed, Windows 10 and 11 and macOS 11 or later (Apple Silicon or Intel). No telemetry.

The Mac app is new in 0.17.0. It has the tiles, the stage with real terminals, sessions that outlive the app, the menu bar menu and the updater. The browser pane, quest log, Warriv, files tile, usage window and Discord status are Windows only for now.

Claude Code wrote almost all of it. I made the calls.

Not code signed yet, so SmartScreen warns the first time you run it. The Mac app is not notarized yet, so on a Mac install it with `curl -fsSL https://horadric.dev/install.sh | sh`, which Gatekeeper does not stop.

**Maker comment (first comment on launch sites, first person):**
I built Horadric because I run several coding agents at once and kept losing track of which one was waiting on me. Now each session is a tile, and the tile turns amber when it needs me. Click it and I am in the real CLI, not a chat box someone built around it. It is free and MIT. Claude Code wrote almost all of it and I made the calls. It is not code signed yet, so SmartScreen will warn you the first time. Tell me what is missing.

**Categories / tags:** Developer tools, AI coding agents, Terminal, Windows, macOS, Open source, Productivity
**Pricing:** Free, open source (MIT)
**Platforms:** Windows 10, Windows 11, macOS 11 or later
**Alternatives to name (only where the form asks, and only as honest comparisons):** Windows Terminal, tmux, Claude Squad

**Assets to make** (the Horadric repo has no app screenshots yet, see the Product Hunt row):
- Logo, square, 512x512 PNG.
- Cover / OG image: the site's OG image (1200x630).
- Gallery: 1270x760 site screenshot and three fact cards, as made for Product Hunt.

---

## DevHunt

- Form: behind a GitHub or Google sign in (login at /login, no public /submit). Per the FAQ: name, website, description, logo, screenshots. Exact limits and image sizes not visible without signing in.
- Free: yes. Free tools get a launch week from the queue; length of the wait is not published. Paid ($19 choose a week, $49 boosted) is off limits.
- Dev tools only, so Horadric fits. Free links are nofollow.
- Voting needs sign in; never ask anyone to vote.

Copy: shared name, tagline (60), long description, categories "AI Coding tools, AI Agents tools, Open Source tools".

## AlternativeTo

- Form: "Suggest new application" in the user menu, after signing in and verifying email. Fields: platforms, license, descriptions, tags, official and creator website, social links.
- Free: yes, but the normal queue "holds several thousand apps" and no date is promised. $5 priority review exists and is off limits (rule 10). Expect a very long wait or none.
- No UTM tags on the official link. Plain https://horadric.dev.
- After approval: on the page of Windows Terminal, tmux and Claude Squad use "Contribute to this page", then "Suggest Alternatives".

Copy:
- Platforms: Windows, Mac. License: Open Source (MIT). Price: Free.
- Description: the short description above.
- Tags: Terminal, AI coding agents, Developer tools, Session manager, Rust.

## Uneed

- Form: paste product name and address, it scrapes the page, then asks for sign up. Fields it scrapes: name, tagline, description, images.
- Free: "Join the line". Launch date assigned up to 5 months out. Needs an upvote score of 10 to stay published and 20 for the do-follow backlink. Rule 4 means we cannot chase that score, so accept that it may be unpublished. Skip the line ($29.99) and Fast-track ($14.99) are off limits.
- Copy: shared name, tagline, short description, maker comment.

## Peerlist Launchpad

- Needs a verified Peerlist profile of an individual (real name, profile picture, not a company). The human must have or make that profile (sign in with Google).
- Add Horadric as a project on the profile to 100 percent: name, tagline, cover image, demo link, description. Cover size not published.
- Free. Launch day is Monday (UTC), or schedule for any later week from the project's Launch button.
- Rules: never ask for upvotes, no DMs to strangers, do not reshare the link over and over on Scroll. Engage with comments.
- Copy: shared name, tagline (60), long description, categories "DevTool, Productivity, Open Source". Demo link: https://horadric.dev.

## Microlaunch

- Skipped 2026-10-07: after Google sign in only the paid Pro Launch shows. See CHANNELS.md.

## Fazier

- Form: Submit Product at /launch after Google sign in. Free path: 3 genuine comments on other products, product link, Fazier badge on horadric.dev, then Verify Badge. Fields: name, tagline, description, category, thumbnail, gallery, pricing. Image sizes and wait not published.
- Needs the badge on the site and Domain Rating above 0 before it can be submitted.
- Copy: shared name, tagline, long description, pricing "Free".

## SaaSHub

- Form: https://www.saashub.com/services/submit after Register. Needs website URL, categories, and listed competitors (without competitors the submission goes to the bottom of the queue). Verifying with an email address on horadric.dev gives priority; ask the human whether such a mailbox exists, or skip verification.
- Free. Rejected: unreleased products, free subdomains, non-English, waiting list pages. Horadric is released and on its own domain, so it fits. Is it a "SaaS"? It is a desktop app, which they list under "most software products and apps".
- Competitors to list: Windows Terminal, tmux, Claude Squad.
- Categories: Developer Tools, Terminal, AI.
- Copy: shared short description and long description.

## OpenAlternative

- Checked 2026-10-07. Not submitted. The form at /submit needs a sign in first (email magic link, Google or GitHub). After the tool details, the package page (see openalternative.co/submit/jean as an example) lists only paid packages: Standard $97 (48h), Premium $137 (24h, dofollow), Ultimate $197/month (12h, featured). Standard is worded "Skip the queue and get published within 48 hours", so a free queue may exist, but no free option is shown. Paid is off limits (PLAYBOOK rule 10).
- No rules page and no note on AI built projects found. The site has an "AI-native" collection and a "Claude Code Alternatives" collection (18 tools).
- Not confirmed: whether finishing the form without paying leaves the tool in a free queue. The human can check on the day by signing in and stopping at the package step. Contact: hello@openalternative.co.
- If a free path shows up, copy to use: shared name, short tagline, long description, Source URL, license MIT.
- Alternative to name: Claude Code (they list tools as alternatives to proprietary software). Honest framing: Horadric is a free MIT desktop for running Claude Code, Codex and Grok Build sessions, so it fits as a companion rather than a replacement. Do not claim it replaces Claude Code.

## Windows download sites

Prepared 2026-10-07, not submitted. Rules and rehost notes are in the
"Windows download sites" table of `CHANNELS.md`. Screenshot and icon URLs:
raw links to the files in `docs/assets` of the Horadric repo. Download link
everywhere: the GitHub release asset
`https://github.com/Mopra/horadric.dev/releases/latest/download/horadric-x64.zip`
(a zip holding `horadric.exe` and `horadricw.exe`). Say the SmartScreen
warning in every long description.

### Chocolatey (package `horadric`, maintainer account is the human's)

- `title`: Horadric
- `summary` (nuspec): Every coding agent session as a tile on the Windows desktop.
- `description`:
  Horadric turns every coding agent session into a tile on the Windows desktop, grouped by project. A tile turns amber when the agent needs you. Click it and you get the real CLI in a real terminal, not a chat UI.

  * Works with Claude Code, Codex and Grok Build.
  * Ctrl+Alt+Space jumps to the session that has waited longest.
  * A Windows notification fires when a session starts waiting and you look away.
  * Plain terminals and a browser pane beside the agents.
  * State comes from the agents' own hooks, not from scraping the terminal.

  Pure Rust on Win32 and Direct2D. No telemetry. Free, MIT licensed.

  Notes: the exes are not code signed yet, so SmartScreen warns the first time. Horadric updates itself, so the installed version can run ahead of the version Chocolatey lists.
- `projectUrl`: https://horadric.dev
- `projectSourceUrl`: https://github.com/Mopra/horadric.dev
- `licenseUrl`: https://github.com/Mopra/horadric.dev/blob/main/LICENSE
- `tags`: horadric terminal claude-code codex agents developer-tools rust
- dependency: `vcredist140`
- `chocolateyInstall.ps1`: Install-ChocolateyZipPackage with the release URL and its SHA256 from the winget manifest, plus an `horadricw.exe.ignore` file next to the zip contents.

### Softpedia (form at softpedia.com/user/submit.shtml)

- Developer: Mopra. Developer site: https://horadric.dev
- Program name: Horadric. Category: Programming > Other Programming Files, or Launchers & Shutdown Tools (pick on the day, whichever the list shows). Fallback: System > System Info is wrong, do not use it.
- Supported OS: Windows 10 64 bit, Windows 11. License: MIT License (or Open Source).
- Short description (128 max): Free Windows desktop that shows every coding agent session as a tile and lights it when it needs you.
- Long description: the shared long description.
- Special requirements: Visual C++ 2015 to 2022 Redistributable (x64).
- Changes: the release notes of the version.
- Icon (32x32): https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/icon-32.png
- Screenshot: https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/screenshot-tiles.png

### MajorGeeks (email to mgnews at majorgeeks.com)

Subject: Horadric, a free MIT desktop for coding agent sessions (Windows)

Hello,

I would like to suggest Horadric for MajorGeeks. It is a free Windows 10/11 and macOS desktop that shows each coding agent session (Claude Code, Codex, Grok Build) as a tile, and the tile turns amber when the agent is waiting on you. It is MIT licensed, has no telemetry, and the source is public.

I made it, with Claude Code writing most of the code. It is not code signed yet, so SmartScreen warns the first time, and some scanners may flag an unsigned Rust exe.

Download: https://github.com/Mopra/horadric.dev/releases/latest (horadric-x64.zip)
Site: https://horadric.dev
Source: https://github.com/Mopra/horadric.dev

Thanks for looking.
Morten

### FileHorse (contact form at filehorse.com/submit, "I am a developer")

- Program: Horadric. Version: the current release. Website: https://horadric.dev
- Download link: the GitHub release URL above. Ask: "Please link to the GitHub release instead of mirroring, since the app updates itself."
- License: Open Source (MIT).
- Icon (256x256): https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/icon-256.png
- Screenshots:
  1. https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/screenshot-tiles.png
  2. https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/screenshot-terminal.png
  3. https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/screenshot-browser.png
  4. https://raw.githubusercontent.com/Mopra/horadric.dev/main/docs/assets/screenshot-quests.png
- Description: the shared long description. Features: the bullet list from it.
