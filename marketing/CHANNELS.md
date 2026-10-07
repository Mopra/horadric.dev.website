# Channels

Top down is the order to work them. State is one of: todo, done, skip
(with why), later (with when). Rules checked on 2026-10-07 unless said.

## Launch sites

| Place | State | Notes |
|---|---|---|
| Product Hunt | later 2026-10-13 | Free launch scheduled for Tue 2026-10-13 00:01 Pacific, made 2026-10-07. Gallery: the site's OG image (twice, PH pulled one in itself), a site screenshot and three fact cards, 1270x760, because the Horadric repo has no app screenshots yet. Quest 'Product Hunt launch day: answer comments' wakes on the day. Never ask for upvotes; ask for feedback. |
| DevHunt (devhunt.org) | todo, draft ready | Dev tools launch site, GitHub or Google sign in. Free queue only. Free tools get a launch week from the queue, wait not published. $19 and $49 launches are paid, skip. Free link is nofollow. Submit form is behind sign in (name, website, description, logo, screenshots). Draft in marketing/drafts/listings.md. |
| AlternativeTo | todo, draft ready | List Horadric as an alternative to Windows Terminal, tmux, Claude Squad and similar agent managers. Accurate description, MIT, Windows. Needs a verified email to submit. Free queue holds several thousand apps with no promised date; $5 priority review is paid, skip it. No UTM tags on the official link. Draft ready. |
| Uneed | todo, draft ready | Free queue only ("Join the line"): launch date assigned up to 5 months out. Needs an upvote score of 10 to stay published and 20 for the do-follow link, which we cannot chase (rule 4). Skip the line ($29.99) and Fast-track ($14.99) are paid, skip. Starts with name and URL, scrapes the page, then asks to sign up. |
| Peerlist Launchpad | todo, draft ready | Weekly launch, free. Needs a verified Peerlist profile as an individual (real name, photo, not a company) and a project at 100 percent (name, tagline, cover image, demo link). Monday UTC is launch day, any later week can be scheduled. Rules: never ask for upvotes, no DMs to strangers, do not over-reshare on Scroll. |
| Microlaunch | todo, check free tier | Free only. Public pages show only paid Launch Pro ($39) and Launch Plus ($79). A free launch is not confirmed without signing in; if only paid options show after sign in, mark skip. |
| Fazier | todo, check free tier | Free only. Submit at fazier.com/launch after Google or email sign in: name, tagline, description, category, thumbnail, gallery, pricing. The home page marks listings Free, Freemium, Paid and Premium; a free launch is likely but unconfirmed, wait not published. Skip if only paid shows. |
| Indie Hackers | todo | A post in the product's own voice about building it with Claude Code. |
| SaaSHub | todo, draft ready | Free listing. Must list competitors (else bottom of queue), give categories, and a released product on its own domain. Verifying with an email on horadric.dev raises priority. Rejects unreleased, free subdomains, waiting list pages. |

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
