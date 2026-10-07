# Channels

Top down is the order to work them. State is one of: todo, done, skip
(with why), later (with when). Rules checked on 2026-10-07 unless said.

## Launch sites

| Place | State | Notes |
|---|---|---|
| Product Hunt | later 2026-10-13 | Free launch scheduled for Tue 2026-10-13 00:01 Pacific, made 2026-10-07. Gallery (changed 2026-10-07): the site's OG image first, then four real app screenshots, 1270x760 (tile grid with the amber tile, a session in its terminal, the browser pane, the quest log), files in docs/assets of the Horadric repo. Only Horadric's own projects on screen. Quest 'Product Hunt launch day: answer comments' wakes on the day. Never ask for upvotes; ask for feedback. |
| DevHunt (devhunt.org) | todo, draft ready | Dev tools launch site, GitHub or Google sign in. Free queue only. Free tools get a launch week from the queue, wait not published. $19 and $49 launches are paid, skip. Free link is nofollow. Submit form is behind sign in (name, website, description, logo, screenshots). Draft in marketing/drafts/listings.md. |
| AlternativeTo | todo, draft ready | List Horadric as an alternative to Windows Terminal, tmux, Claude Squad and similar agent managers. Accurate description, MIT, Windows. Needs a verified email to submit. Free queue holds several thousand apps with no promised date; $5 priority review is paid, skip it. No UTM tags on the official link. Draft ready. |
| Uneed | todo, draft ready | Free queue only ("Join the line"): launch date assigned up to 5 months out. Needs an upvote score of 10 to stay published and 20 for the do-follow link, which we cannot chase (rule 4). Skip the line ($29.99) and Fast-track ($14.99) are paid, skip. Starts with name and URL, scrapes the page, then asks to sign up. |
| Peerlist Launchpad | todo, draft ready | Weekly launch, free. Needs a verified Peerlist profile as an individual (real name, photo, not a company) and a project at 100 percent (name, tagline, cover image, demo link). Monday UTC is launch day, any later week can be scheduled. Rules: never ask for upvotes, no DMs to strangers, do not over-reshare on Scroll. |
| Microlaunch | skip, paid only | Checked 2026-10-07 signed in with Google (basic profile only). New Launch offers only Pro Launch ($39, code LAUNCH20, 50% off for OSS and students, which is still paid). The submit route redirects to the pricing page, and the dashboard says to buy a premium credit first. No free launch path shows. Revisit only if the human wants to pay. |
| Fazier | todo, draft ready | Free launch exists, checked 2026-10-07 signed in with Google. /launch has 3 steps: (1) leave 3 genuine, specific comments on other products (no generic ones), (2) paste the product link, (3) embed the Fazier badge on horadric.dev and tick the checklist (badge visible, English site, Domain Rating above 0, startup meets conditions), then Verify Badge. Lite Plan ($29) skips steps 1 and 3, off limits. Form fields after the link: name, tagline, description, category, thumbnail, gallery, pricing (Free). Image sizes and queue wait are not published. Needs a human or site change first: add the badge to the site, and check DR above 0 (a brand new domain may show 0, then this stays blocked). Copy is in marketing/drafts/listings.md. |
| Indie Hackers | todo, draft ready | Draft in marketing/drafts/indiehackers.md, about what the human decided versus what Claude Code wrote. Rules read 2026-10-07: there is no posting guidelines page (/post-guidelines is a 404); the FAQ (/about) sets no posting rules; Terms (/terms) bar spam and auto-responders and anything the moderators find offensive or inappropriate, and nothing bars self promotion. The feed is full of founders posting their own products. Posting needs sign in (Google, rule 11) at /new-post. The site is aimed at people who set out to make money, Horadric is free, so frame it as a build story, not a sales pitch. Not a product page entry. |
| SaaSHub | todo, draft ready | Free listing. Must list competitors (else bottom of queue), give categories, and a released product on its own domain. Verifying with an email on horadric.dev raises priority. Rejects unreleased, free subdomains, waiting list pages. |

## Package managers (downloads, not just visits)

| Place | State | Notes |
|---|---|---|
| winget (microsoft/winget-pkgs) | todo, zip ships | Checked 2026-10-07 against v0.16.0. No star or age rule, so a new project can be listed, and an unsigned exe is not an automatic block (the pipeline runs AV and Defender scans and SmartScreen reputation checks; a false positive is appealed to Microsoft and re-run with `@wingetbot run`). The blocker is the shape of the release: it has two bare exes (`horadric.exe`, `horadricw.exe`) and no archive. A winget installer entry is one URL, and `horadric install` copies `horadricw.exe` from next to itself, so a portable manifest on `horadric.exe` alone would install a binary whose `horadric install` fails. Fix: the Horadric release also ships `horadric-x64.zip` holding both exes. Then a manifest with InstallerType zip, NestedInstallerType portable and two NestedInstallerFiles (`Mopra.Horadric`) fits. Quest added for the zip. Self-update will also drift from winget's recorded version, so say so in the PR. Done 2026-10-07: RELEASING.md in the Horadric repo now zips both exes into every release, and v0.16.0 got `horadric-x64.zip` (SHA256 9339ED0701948784E2D3D6B267B563CE0372B7628CA6BA54D7AFF47C1D7EF1C7). Manifest written 2026-10-07 in `marketing/winget/manifests/m/Mopra/Horadric/0.16.0/` (schema 1.12.0, adds a Microsoft.VCRedist.2015+.x64 dependency since both exes import VCRUNTIME140.dll), passes `winget validate`. PR text in `marketing/winget/PR.md`. Next: open the PR from a Mopra fork on 2026-10-08, held a day by the two-a-day rule. |
| Scoop (extras bucket) | skip until it has users | Checked 2026-10-07. Extras takes what does not fit Main, and Main wants a widely used tool (its page says 500 stars, 150 forks). I could not load the Extras page itself, so its exact bar is unconfirmed, but Horadric has 0 stars and was created 2026-09-24, so a PR would be closed. Same two-exe problem as winget: a Scoop manifest can list both exes as `url` entries, so that part fits, but `horadric install` then self-installs outside Scoop's folder. Revisit at about 100 stars. Do not open a PR before. |

## Lists on GitHub

| Place | State | Notes |
|---|---|---|
| hesreallyhim/awesome-claude-code | human | Takes submissions only from a person through its web form. The human was asked to do it on 2026-10-07. Do not submit it. |
| jqueryscript/awesome-claude-code | todo, draft ready | Section "Clients & GUIs". Rules read 2026-10-07: the guidelines section says "Under Construction", so copy the neighbours' format. Line in marketing/drafts/awesome-lists.md. Active (pushed 2026-10-07) but no merged PR lately, so expect a wait. |
| rohitg00/awesome-claude-code-toolkit | skip, stale | Rules read 2026-10-07: fork, PR, update the README table. Last merge was 2026-05-12 and about 40 PRs sit open, so it is not kept. Line is in the drafts file in case it wakes up. Recheck in January. |
| RoggeOhta/awesome-codex-cli | todo, wait for users | Section "GUI & Desktop Apps". Pushed 2026-09-06. Self submission allowed, but rejects "self-promotion without substance" and wants real users. Needs a one-sentence description and a star badge. Submit after a few stars or about 50 more downloads. Line in drafts. |
| jaywcjlove/awesome-rust-apps | todo, draft ready | Section "AI & Machine Learning". Pushed 2026-10-07, merged a PR on 2026-09-19. Open-source Rust apps, PR welcome, no other rules. Needs the two badge images. Line in drafts. |
| milisp/awesome-codex-cli | skip | Wants proven external usage first ("No users yet? Submit once you get adoption"). Revisit at real adoption. |
| 0PandaDEV/awesome-windows | skip | Rejects "vibecoded slop". Horadric is built with Claude Code, so do not submit. |
| phamquiluan/awesome-cli-agents, cdleon/awesome-terminals | skip | The first is script generated from stars (2k and up). The second lists terminal emulators, off topic. |
| Other lists | done 2026-10-07 | Searched Codex, coding agents, AI terminals, Windows, Rust. The rest are skills, plugins or subagent lists, or cover Gemini only. At most one PR a day across all of these. |

## Communities

| Place | State | Notes |
|---|---|---|
| r/ClaudeCode | done 2026-10-07 | Standalone posts must say what was built, how Claude Code was used, what was learned. Flair "Built with Claude". Next post only for a big release, 30 days on. |
| r/SideProject | todo | Scheduled for 2026-10-07 21:23 by the launch session. Check LOG.md. |
| r/ClaudeAI | todo, draft ready | Draft in marketing/drafts/reddit.md. Rules read 2026-10-07: rule 7 also needs OP karma over 100 on feed posts. Rule 7: project built with Claude by you, describe how Claude helped in detail, free to try. Use the showcase flair. Not before 2026-10-09, so it does not look like a blast. |
| r/codex | todo, draft ready | Draft in marketing/drafts/reddit.md, Showcase flair. Rules read 2026-10-07: no ban on self promotion; showcases skip the karma delay queue; wrong flair gets a post deleted. Automated mods weigh the poster's comment karma in r/codex. Make it about using Codex with Horadric, with detail. |
| r/ChatGPTCoding | skip | Rules read 2026-10-07. Rule 5: posts whose main purpose is promoting a tool or repo belong in the weekly Self-Promotion thread ("delete the link: if nothing is left, it's an ad"). Rule 3 also bars a discussion post that promotes indirectly. Only a comment in the weekly thread would fit. AI text is allowed for grammar and clarity, not raw output. |
| r/AI_Agents | todo, draft ready | Draft in marketing/drafts/reddit.md. Rules read 2026-10-07: links go in comments, not posts (rule 3); self promotion about 1 in 10 of the account's posts and comments (rule 4); no low effort (rule 5). Check the account's history first, else use the weekly project display thread. |
| r/windowsapps | todo, draft ready | Draft in marketing/drafts/reddit.md. Rules read 2026-10-07: promotional posts limited to 1 a week and must carry the "Developer" flair (rule 3); links must be official and safe (rule 2). |
| r/rust, r/opensource, r/commandline | skip | Ban AI-written posts or AI tools. |
| r/windows | skip | Needs mod permission, which they are not granting. |
| Hacker News | done 2026-10-07 | Human only from here on. |
| Lobsters | skip | Invite only, and hostile to self promotion. |
| dev.to | todo, draft ready | One article on how Horadric reads agent state from hooks instead of scraping the terminal. Draft in marketing/drafts/devto-hooks.md (front matter published: false). Rules (dev.to/terms, read 2026-10-07): content must be on-topic, high quality and not designed primarily for promotion or backlinks; the post must carry substance, not just an external link; affiliate links must be disclosed (none here). The guidelines page and editor guide say nothing on self promotion or AI disclosure. Max four tags. So keep it a technical article, links at the end, and one post only. |
| X | done 2026-10-07 | Later posts only when a release ships something new, at most one a week. |
| Bluesky | skip until signed in | Checked 2026-10-07 in the browser pane: bsky.app shows the logged out Discover feed with "Sign in" and "Create account" buttons, so the human is NOT signed in. Never create an account here. Revisit only if the human signs in. |

## Newsletters and roundups (free, researched 2026-10-07, nothing submitted)

| Place | State | Notes |
|---|---|---|
| Console.dev | todo, draft ready (marketing/drafts/console-dev.md) | Email hello@console.dev to suggest a tool. Free: the site says "We do not publish sponsored reviews", ads are a separate paid thing, skip. Wants tools "built for developers, with easy self-service signup and clear documentation". No stated rule on self submission or AI text, so keep the email short, human and plain, and say it is ours. One email, no follow up chasing. |
| This Week in Rust | todo, later | Submit by PR to the `drafts/` folder of rust-lang/this-week-in-rust (or a post to @thisweekinrust). Self promotion is not barred but content must give the community value. It takes articles, tutorials, project updates and calls for participation. AI rule: authors must DISCLOSE if an article was written by an LLM, and the editors dislike it ("there is no community growth happening"). Horadric is written by Claude Code, so a PR must say so plainly. Horadric is Rust but a Windows GUI, so best fit is a technical article (hooks instead of terminal scraping, Direct2D on Win32) not a product plug. Do it with the dev.to article, after it is out, as a "Crate/Project updates" or "Observations" line. Run it past the human first because of the AI disclosure. |
| Changelog News (changelog.com/news) | todo, draft ready (marketing/drafts/changelog-news.md) | Fields read 2026-10-07: URL*, Title*, "What's interesting about it?" (optional, Markdown); form is disabled until signed in. Form at changelog.com/news/submit, needs a Changelog sign in (Google, rule 11). Self submission is "also encouraged". Excluded: how-to guides, tutorials, "commercial products/services" (sponsorship is that path). Horadric is free and MIT, so submit the repo or the build story with a line on why devs will find it interesting. Nothing stated on AI text. Risk: it may read as a product, so lead with the open source and how it is built. |
| TLDR newsletters | skip | The only route found (advertise.tldr.tech) is paid sponsorship. No free submission form was visible. Revisit if a free link form appears. |
| Web Tools Weekly | skip | Front end web tools only, and it explicitly takes desktop apps and editors/IDEs in scope but the audience is web developers. Contact is by DM on X or Bluesky to the curator, which rule 5 bars as a cold DM. Skip. |
| DevBoost (Windows productivity newsletter, buttondown.com/neeraj9) | skip | Monthly, Windows developer productivity, so a good fit on topic, but no submission route or contact is published. A cold message is rule 5. Revisit only if a submit link appears. |
| Windows and Rust dev weeklies | done | Searched. TWiR is the only Rust weekly that takes submissions. No Windows developer weekly with a public free submit route was found. |

## Chat and forums (rules not confirmed, human join needed)

| Place | State | Notes |
|---|---|---|
| Anthropic Discord (Claude Developers) | todo, human | Has a share-your-projects area and a Featured Projects channel with a community voted Project of the Month (from search results, not read from the server). Joining needs the human's own Discord account and the server rules cannot be read without joining, so do not post until the rules are read in the server. The Project of the Month vote is vote chasing under rule 4, so never ask for votes there. |
| Rust Community Discord (and Rust GUI channel) | skip for now | Enforces the Rust Code of Conduct and is hostile to AI work in the Rust subreddits (see r/rust). Rules could not be read without joining. Do not post unless a human reads them and says yes. |
| Codex community Discord | skip, unknown | No official server with public showcase rules found. Use r/codex instead. |

## Directories not yet listed

| Place | State | Notes |
|---|---|---|
| OpenAlternative (openalternative.co/submit) | todo | Directory of open source alternatives, has a "Claude Code Alternatives" collection with 18 entries, so Horadric fits. Free submission was not confirmed on the page; if the form asks for money for a featured or fast slot, skip that. Contact hello@openalternative.co. Needs the repo URL, so frame it as an open source alternative to Windows Terminal with tabs, or similar agent managers. Nothing found on AI text. |
| SourceForge | todo, low priority | Free hosting for open source, offers "Import from GitHub", scans downloads for malware. It would add a second download mirror and a page that ranks. The SourceForge download counts would not appear in the GitHub download measure. Cons: needs an account, adds a second place to keep in sync. No AI text rule found in the page. Do only if the human wants it. |
| LibHunt | skip | Add a project form at /repo/submit, but it is about libraries and repos by language, not GUI apps. Low fit. |
| awesome-rust (rust-unofficial/awesome-rust) | skip until 50 stars | Rule: 50+ GitHub stars or 2,000+ crates.io downloads or equivalent popularity with proof. Horadric has neither. Revisit at 50 stars. |
