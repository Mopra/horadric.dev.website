# Marketing playbook

The goal: more people download Horadric. Every marketing quest and errand
reads this file first, and writes every public action to `LOG.md` last.

The human gave a standing go ahead (2026-10-07) to post, list and launch
Horadric on their accounts, and to sign in with their Google account in
the browser pane where a site needs an account. That go ahead covers
honest promotion inside each community's rules. Nothing else.

## The measure

Downloads of `horadric.exe` across all releases:

```
gh api "repos/Mopra/horadric.dev/releases?per_page=100" --jq '[.[].assets[]|select(.name=="horadric.exe").download_count]|add'
```

20 on 2026-10-07, before any marketing. Write the number into `LOG.md`
under "Downloads" at every errand, so the log shows what moved it. Also
record GitHub traffic referrers, views, and current download count under
a "## Traffic" section so the log shows which channel brings people.

## The facts

Say only what is true. These are the facts; the README at
https://github.com/Mopra/horadric.dev has the rest. If a claim is not
there, do not make it.

- Every coding agent session becomes a small tile on the Windows desktop,
  grouped by project. It turns amber when the agent needs you.
- Click a tile and you get the real CLI in a real terminal. No chat UI of
  its own, no wrapper.
- Ctrl+Alt+Space jumps to the session that has waited longest.
- A Windows notification when a session starts waiting and you look away.
- Plain terminals and a browser pane beside the agents. Agents can drive
  the browser.
- Quest log per project, Warriv the orchestrator, the Runetome buttons.
- Shows 5 hour, weekly and spend limits; switches Claude subscriptions.
- Pure Rust on Win32 and Direct2D. About 45 MB with four sessions open.
  No CPU between events. No Electron.
- State comes from the agents' own hooks, not from scraping the terminal.
- Sessions survive a crash, an update and a reboot.
- Works with Claude Code, Codex and Grok Build.
- Free, MIT licensed. Windows 10 and 11, and since 0.17.0 (2026-10-07) macOS 11 or later on Apple Silicon or Intel (README). No telemetry.
- The Mac app has the tiles, the stage with real terminals, plain terminals, sessions that outlive the app, the menu bar menu, Cmd+J to the session that has waited longest, a Dock badge and bounce, opening at login and the updater. The browser pane, quest log, Warriv, files tile, usage window and Discord status are Windows only for now. The Mac app is not notarized: it installs with `curl -fsSL https://horadric.dev/install.sh | sh`. Linux: no. Say "Windows only" about those features, never about the app.
- Claude Code wrote almost all of it; the human made the calls.
- Not code signed yet: SmartScreen warns the first time. Always say so. On a Mac say it is not notarized yet.

Links: https://horadric.dev (site), https://github.com/Mopra/horadric.dev
(source), https://github.com/Mopra/horadric.dev/releases/latest
(download).

## The voice

Write like DHH. First person, as the human. Confident, short declarative
sentences, plain words, an opinion where there is one. Say what Horadric
refuses to do as loudly as what it does. No hype words, no emoji, no
hashtags beyond one where a platform expects it.

Never use an em dash, an en dash or a double hyphen as punctuation.
Rewrite the sentence instead.

Never invent a story, a user, a number or a quote. Opinions are fine;
anecdotes the human did not tell are not.

## The rules

These keep the human's accounts alive and the project's name clean.
Break one and the marketing does more harm than good.

1. **Read the community's rules before every post**, every time. Reddit:
   `/r/<sub>/about/rules.json`. If the rules forbid it, skip the place and
   note why in `CHANNELS.md`.
2. **One post per community, ever, unless something new ships.** A new
   release with a real new feature may earn a second post, no sooner
   than 30 days after the first, and only where the rules allow it.
3. **At most two new public posts or listings a day**, across every
   channel together. Spread beats burst.
4. **No vote manipulation.** Never ask anyone to upvote, never use a
   second account, never coordinate votes. Product Hunt and Reddit ban
   for it.
5. **No cold DMs, no mass mentions, no replying to strangers' threads
   just to drop a link.** A reply is fine only when someone asks for
   exactly what Horadric does, and then say plainly that you made it.
6. **Hacker News is the human's.** Never post or comment there again.
   HN wants the human's own words. If a HN thread needs an answer, file
   it as a quest blocked on the human.
7. **No AI-written text where it is banned**: r/rust, r/opensource,
   r/commandline and any place whose rules say so. Skip those.
8. **Answer comments on the human's posts** on Reddit, X, Product Hunt
   and the like, in the voice above, with facts from this file. A
   question you cannot answer from the facts, a complaint about a bug,
   or anything heated goes to the human as a blocked quest instead.
9. **A bug or feature request found in comments** becomes a quest in
   the Horadric repository (`C:/Users/morte/Documents/Github/horadric.dev`)
   with a `From: <link>` notes line, not a promise in the reply.
10. **Spend no money.** No paid launches, ads, featured slots or boosts.
11. **Sign in with Google** in the browser pane when a site needs an
    account. Never create a password account, never accept anything
    beyond the basic profile, and never change an existing account's
    settings.
12. **Log it.** Every post, listing, reply and pull request goes in
    `LOG.md` with the date, place and link, the moment it is done.
    Check `LOG.md` before posting so nothing goes out twice.

## Replying on Reddit

The "Reddit replies" errand does this every two hours. The account is
u/PR4DE, signed in in the browser pane.

1. Open https://old.reddit.com/ in the browser pane and do the rest with
   `fetch` from the page (browser_evaluate), so it uses the signed in
   session. The modhash is `data.modhash` from `/api/me.json`; send it as
   `uh` and as the `X-Modhash` header on every POST.
2. **Find what needs an answer.** Two sources:
   - `/message/unread.json`: replies to our posts and to our comments
     (`was_comment` true, `type` `comment_reply` or `post_reply`).
   - Every Reddit post in `LOG.md` from the last 30 days:
     `/comments/<id>.json?limit=500`, walking the whole tree.
   A comment needs an answer when it is not by PR4DE or AutoModerator,
   none of its direct replies is by PR4DE, it is not removed or deleted,
   and it says or asks something. "Cool" or "nice" gets nothing, or at
   most a short thanks.
3. **Decide each one** by rule 8 above. Answer from the facts only. A
   question the facts do not cover, a bug report, anything angry, legal
   or about money: do not answer. Add a quest
   `Reddit: the human answers <author> on r/<sub>` with the comment's
   link and text in its notes, and the note "Do not reply. Mark this
   quest blocked on the human with the link." A bug report also becomes
   a quest in the Horadric repository with a `From: <link>` line.
4. **Reply** with `POST /api/comment` (`thing_id` the comment's `t1_` name,
   `text`, `api_type=json`). Wait 5 seconds between replies. At most 10
   replies a run; the rest wait for the next run. Short: one to four
   sentences. Never paste the same reply twice.
5. **Check** each reply exists and is not removed
   (`/user/PR4DE/comments.json`), then mark the inbox items read with
   `POST /api/read_message` (`id` the comma separated names).
6. **Log** one line a run in `LOG.md`: how many replies, where, with
   links, and any comment handed to the human. A run with nothing to do
   logs nothing.

The browser pane is shared with other sessions. If a page is not where
you left it, navigate back and do each step in one `browser_evaluate`.

## GitHub

Act on GitHub as Mopra, the owner of Horadric, never as MP-OPTI (the
default `gh` account, a work account). For `gh`, prefix the command with
`GH_TOKEN=$(gh auth token --user Mopra)`. To push this repository:

```
git push "https://x-access-token:$(gh auth token --user Mopra)@github.com/Mopra/horadric.dev.website.git" main
```

Never run `gh auth switch`; other sessions share it.

## Where

`CHANNELS.md` lists every place, its rules and its state. Work it top
down. Add new places you find, with their rules, rather than posting
somewhere unlisted on a whim.
