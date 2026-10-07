# Channels

Top down is the order to work them. State is one of: todo, done, skip
(with why), later (with when). Rules checked on 2026-10-07 unless said.

## Launch sites

| Place | State | Notes |
|---|---|---|
| Product Hunt | later 2026-10-13 | Free launch scheduled for Tue 2026-10-13 00:01 Pacific, made 2026-10-07. Gallery: the site's OG image (twice, PH pulled one in itself), a site screenshot and three fact cards, 1270x760, because the Horadric repo has no app screenshots yet. Quest 'Product Hunt launch day: answer comments' wakes on the day. Never ask for upvotes; ask for feedback. |
| DevHunt (devhunt.org) | todo | Dev tools launch site, GitHub sign in. Free queue only. |
| AlternativeTo | todo | List Horadric as an alternative to Windows Terminal, tmux, Claude Squad and similar agent managers. Accurate description, MIT, Windows. |
| Uneed | todo | Free queue only. |
| Peerlist Launchpad | todo | Weekly launch, free. |
| Microlaunch | todo | Free only. |
| Fazier | todo | Free only. |
| Indie Hackers | todo | A post in the product's own voice about building it with Claude Code. |
| SaaSHub | todo | Free listing. |

## Package managers (downloads, not just visits)

| Place | State | Notes |
|---|---|---|
| winget (microsoft/winget-pkgs) | later, when a release ships a zip | Checked 2026-10-07 against v0.16.0. No star or age rule, so a new project can be listed, and an unsigned exe is not an automatic block (the pipeline runs AV and Defender scans and SmartScreen reputation checks; a false positive is appealed to Microsoft and re-run with `@wingetbot run`). The blocker is the shape of the release: it has two bare exes (`horadric.exe`, `horadricw.exe`) and no archive. A winget installer entry is one URL, and `horadric install` copies `horadricw.exe` from next to itself, so a portable manifest on `horadric.exe` alone would install a binary whose `horadric install` fails. Fix: the Horadric release also ships `horadric-x64.zip` holding both exes. Then a manifest with InstallerType zip, NestedInstallerType portable and two NestedInstallerFiles (`Mopra.Horadric`) fits. Quest added for the zip. Self-update will also drift from winget's recorded version, so say so in the PR. No manifest written yet: it needs the zip's SHA256. |
| Scoop (extras bucket) | skip until it has users | Checked 2026-10-07. Extras takes what does not fit Main, and Main wants a widely used tool (its page says 500 stars, 150 forks). I could not load the Extras page itself, so its exact bar is unconfirmed, but Horadric has 0 stars and was created 2026-09-24, so a PR would be closed. Same two-exe problem as winget: a Scoop manifest can list both exes as `url` entries, so that part fits, but `horadric install` then self-installs outside Scoop's folder. Revisit at about 100 stars. Do not open a PR before. |

## Lists on GitHub

| Place | State | Notes |
|---|---|---|
| hesreallyhim/awesome-claude-code | human | Takes submissions only from a person through its web form. The human was asked to do it on 2026-10-07. Do not submit it. |
| jqueryscript/awesome-claude-code | todo | Section "Clients & GUIs". Read its contribution guidelines, then a PR with one line. |
| rohitg00/awesome-claude-code-toolkit | todo | Read the rules first. |
| Other awesome lists for Codex, coding agents, Windows tools | todo | Search, read each list's rules, at most one PR a day. |

## Communities

| Place | State | Notes |
|---|---|---|
| r/ClaudeCode | done 2026-10-07 | Standalone posts must say what was built, how Claude Code was used, what was learned. Flair "Built with Claude". Next post only for a big release, 30 days on. |
| r/SideProject | todo | Scheduled for 2026-10-07 21:23 by the launch session. Check LOG.md. |
| r/ClaudeAI | todo | Rule 7: project built with Claude by you, describe how Claude helped in detail, free to try. Use the showcase flair. Not before 2026-10-09, so it does not look like a blast. |
| r/codex | todo | Automated mods weigh the poster's comment karma in r/codex. Make it about using Codex with Horadric, with detail. |
| r/ChatGPTCoding, r/AI_Agents, r/windowsapps | todo | Read rules first; skip any that bans self promotion. |
| r/rust, r/opensource, r/commandline | skip | Ban AI-written posts or AI tools. |
| r/windows | skip | Needs mod permission, which they are not granting. |
| Hacker News | done 2026-10-07 | Human only from here on. |
| Lobsters | skip | Invite only, and hostile to self promotion. |
| dev.to | todo | One article on how Horadric reads agent state from hooks instead of scraping the terminal. Facts from the README and docs/PLAN.md in the Horadric repo only. |
| X | done 2026-10-07 | Later posts only when a release ships something new, at most one a week. |
| Bluesky | todo | Only if the human is signed in; never create an account here. |
