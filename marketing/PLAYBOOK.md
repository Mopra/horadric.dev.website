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
under "Downloads" at every errand, so the log shows what moved it.

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
- Free, MIT licensed, Windows 10 and 11. No telemetry.
- Claude Code wrote almost all of it; the human made the calls.
- Not code signed yet: SmartScreen warns the first time. Always say so.

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

## Where

`CHANNELS.md` lists every place, its rules and its state. Work it top
down. Add new places you find, with their rules, rather than posting
somewhere unlisted on a whim.
