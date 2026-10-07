# Awesome list entries

One line per list, written to each list's own format (read 2026-10-07).
Repo: https://github.com/Mopra/horadric.dev (MIT, 0 stars on 2026-10-07).
One PR per list, at most one PR a day. Say in the PR body that the author
submits it, and what is real: Windows and macOS, Claude Code, Codex and Grok Build.

## jqueryscript/awesome-claude-code

Section: "Clients & GUIs" (add at the end, the list is by stars).
Rules: the "Contribution Guidelines" section says "Under Construction", so
there are no written rules. Copy the neighbours' format exactly. The list
pushes to main daily, but no PR has been merged lately, so expect a wait.

```
- [**Horadric**](https://github.com/Mopra/horadric.dev) - (0 ⭐) - Desktop dock for Windows and macOS that shows every Claude Code, Codex and Grok Build session as a tile, lights it when the agent needs you, and opens the real CLI in a real terminal.
```

PR title: `Add Horadric to Clients & GUIs`

## rohitg00/awesome-claude-code-toolkit

Section: "Companion Apps & GUIs" (table: Name, Stars, Description).
Rules (CONTRIBUTING.md): fork, branch, PR. Update the README table when adding
an item. Test before submitting. No generated attribution footers in files.
Status: do not open a PR. Last merge was 2026-05-12 and about 40 PRs sit open
since, so the list is not being kept.

```
| [Horadric](https://github.com/Mopra/horadric.dev) | - | Desktop dock for Claude Code, Codex and Grok Build sessions, on Windows and macOS. One tile per session, amber when the agent needs you, the real CLI in a real terminal on click. No Electron |
```

## RoggeOhta/awesome-codex-cli

Section: "GUI & Desktop Apps".
Rules (CONTRIBUTING.md): entry must relate directly to Codex CLI, be actively
maintained, have a one-sentence description that says what it does, and carry a
shields.io star badge. Format `- [owner/repo](url) - sentence. ![GitHub stars](...)`.
Not accepted: self-promotion without substance ("needs real users or a clear
unique value"), duplicates, paid products without a free tier. Self submission
is allowed, but with 0 stars the "real users" test is the risk. Wait for about
50 downloads of the exe beyond the first 20, or a few stars.

```
- [Mopra/horadric.dev](https://github.com/Mopra/horadric.dev) - Dock for Windows and macOS that shows each Codex CLI session (and Claude Code and Grok Build) as a tile, lights it when it needs you, and opens the real CLI in a terminal. ![GitHub stars](https://img.shields.io/github/stars/Mopra/horadric.dev?style=flat-square)
```

## jaywcjlove/awesome-rust-apps

Section: "AI & Machine Learning" (next to AI Agent Launcher and PI-Desktop).
Rules: README says contributions are welcome via PR, open-source Rust apps.
No further file. Copy the neighbours' format with the two badges. Horadric is
Rust on Win32 and Direct2D, MIT, so it fits.

```
- [Horadric](https://github.com/Mopra/horadric.dev) <img align="bottom" height="13" src="https://badgen.net/github/stars/Mopra/horadric.dev?style=flat&label=" /> <img align="bottom" height="13" src="https://img.shields.io/github/last-commit/Mopra/horadric.dev?style=flat&label=" /> - A desktop dock for Windows and macOS that shows every Claude Code, Codex and Grok Build session as a tile and opens the real CLI in a terminal.
```

PR title: `Add Horadric`

## jaywcjlove/awesome-mac

Prepared 2026-10-07, not submitted. Section: "AI Tools" (`## AI Tools` in
README.md). Rules (docs/CONTRIBUTING.md, read 2026-10-07): no duplicate,
useful item, one PR per suggestion, alphabetical order, AP title case (the
name is already; the neighbours write the description in sentence case, so
this does too), one sentence. The repo keeps README-zh, -ja and -ko in sync, so the PR changes
four files with the same entry in each language. Place it after Grux and
before RecurseChat in the first run of the section (that run is
alphabetical; the second run starting at Jan is a separate block). Open
source icon links the repo, free apps carry the Freeware icon. AI assisted
PRs are explicitly allowed, but say so in the PR body. One PR a day across
all lists (playbook rule 3). Needs the human's GitHub account, acting as
Mopra (playbook "GitHub").

README.md:

```
* [Horadric](https://horadric.dev) - Desktop dock that shows every Claude Code, Codex and Grok Build session as a tile and opens the real CLI in a real terminal. [![Open-Source Software][OSS Icon]](https://github.com/Mopra/horadric.dev) ![Freeware][Freeware Icon]
```

README-zh.md:

```
* [Horadric](https://horadric.dev) - 将每个 Claude Code、Codex 和 Grok Build 会话显示为一个磁贴，并在真实终端中打开真实的命令行。 [![Open-Source Software][OSS Icon]](https://github.com/Mopra/horadric.dev) ![Freeware][Freeware Icon]
```

README-ja.md:

```
* [Horadric](https://horadric.dev) - Claude Code、Codex、Grok Buildの各セッションをタイルとして表示し、本物のターミナルで本物のCLIを開く。 [![Open-Source Software][OSS Icon]](https://github.com/Mopra/horadric.dev) ![Freeware][Freeware Icon]
```

README-ko.md:

```
* [Horadric](https://horadric.dev) - Claude Code, Codex, Grok Build 세션을 각각 타일로 보여 주고 실제 터미널에서 실제 CLI를 엽니다. [![Open-Source Software][OSS Icon]](https://github.com/Mopra/horadric.dev) ![Freeware][Freeware Icon]
```

PR title: `Add Horadric to AI Tools`

PR body: Adds Horadric, an open source (MIT) macOS and Windows app for
Claude Code, Codex and Grok Build sessions, to AI Tools in README.md and the
zh, ja and ko files. I am the author. Claude Code wrote most of the code and
the translations of the entry are machine made, so a native reader may want
to polish them. The Mac app is not notarized yet; it installs with
`curl -fsSL https://horadric.dev/install.sh | sh`.

## Checked and skipped

- milisp/awesome-codex-cli: "Projects must show proven external usage (stars/downloads/community activity)... No users yet? Submit once you get adoption." Revisit at real adoption.
- 0PandaDEV/awesome-windows: CONTRIBUTING.md opens with "Vibecoded slop and tools that don't fall in the category of awesome are not welcomed". Horadric is built with Claude Code, so do not submit.
- phamquiluan/awesome-cli-agents: the README is generated by a script, and every entry has 2k or more stars. A PR would not be merged by hand.
- cdleon/awesome-terminals: a list of terminal emulators and shells. Horadric hosts terminals but is not one, so it would be off topic.
- Piebald-AI/awesome-gemini-cli: Horadric does not support Gemini CLI.
- VoltAgent/awesome-codex-subagents, composio-community/awesome-codex-skills, hashgraph-online/awesome-codex-plugins: subagents, skills and plugins only, not apps.
