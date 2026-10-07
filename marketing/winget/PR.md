# winget PR

Open from a Mopra fork of microsoft/winget-pkgs, branch `Mopra.Horadric-0.16.0`,
copying `manifests/m/Mopra/Horadric/0.16.0/` from this folder. Fill in the
checklist from the repo's current PR template when opening.

Title: `New package: Mopra.Horadric version 0.16.0`

Body:

New package. I am the author of Horadric.

Horadric is a Windows desktop app that shows each running coding agent session (Claude Code, Codex, Grok Build) as a tile. Source: https://github.com/Mopra/horadric.dev (MIT).

Notes for review:

- The release zip holds two executables, `horadric.exe` and `horadricw.exe`. Both are needed: `horadric install` copies `horadricw.exe` from next to `horadric.exe`, so the manifest lists both as NestedInstallerFiles.
- The binaries link the MSVC runtime (VCRUNTIME140.dll), hence the Microsoft.VCRedist.2015+.x64 dependency.
- The binaries are not code signed yet.
- Horadric has its own self-updater. After a self-update the installed version will differ from what winget recorded. I will submit a manifest for each release.

Validated locally with `winget validate` (winget v1.29.380).
