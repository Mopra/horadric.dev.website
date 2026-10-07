import Image from "next/image";
import Copy from "./copy";
import Field from "./field";

// Rebuild the page at most once an hour, so the download count stays fresh
// without asking GitHub on every visit.
export const revalidate = 3600;

// Below this many downloads the count would undersell the project, so it stays hidden.
const SHOW_DOWNLOADS_FROM = 500;

// Only the app itself counts, on either system. The manifests are fetched by the
// auto-updater, not by people.
async function downloads() {
  try {
    const res = await fetch("https://api.github.com/repos/Mopra/horadric.dev/releases?per_page=100", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    const releases: { assets: { name: string; download_count: number }[] }[] = await res.json();
    return releases
      .flatMap((r) => r.assets)
      .filter((a) => a.name === "horadric.exe" || a.name === "Horadric-macos.tar.gz")
      .reduce((sum, a) => sum + a.download_count, 0);
  } catch {
    return 0;
  }
}

// Real screenshots of the app. Alt text sticks to what the README and PLAYBOOK say it does.
const shots = [
  { src: "/screenshot-tiles.png", alt: "Horadric on the Windows desktop: every coding agent session as a small tile, grouped by project, with the quest log and Runetome buttons beside live terminals." },
  { src: "/screenshot-terminal.png", alt: "Clicking a tile opens the real Claude Code CLI in a real terminal, with no chat UI of its own." },
  { src: "/screenshot-quests.png", alt: "The quest log of a project, with Warriv the orchestrator driving it, above the Runetome buttons." },
  { src: "/screenshot-browser.png", alt: "The browser pane that sits beside the agents, which agents can drive." },
];

export default async function Home() {
  const n = await downloads();
  return (
    <>
      <section className="hero">
        <Field />
        <p className="needs">needs a Claude, Codex or xAI subscription</p>
        <nav className="corner">
          <a href="#shots">screenshots</a>
          <a href="https://github.com/Mopra/horadric.dev">source</a>
          {n >= SHOW_DOWNLOADS_FROM && <span>{n.toLocaleString("en-US")} downloads</span>}
          <a className="get" href="https://github.com/Mopra/horadric.dev/releases/latest">
            download for windows
          </a>
          <a className="get" href="#mac">
            for mac
          </a>
        </nav>
      </section>
      <section className="mac" id="mac" aria-label="Install on a Mac">
        <Copy text="curl -fsSL https://horadric.dev/install.sh | sh" />
      </section>
      <section className="install" id="install" aria-label="How to install Horadric">
        <ol>
          <li>
            <b>download</b> horadric.exe and horadricw.exe from the{" "}
            <a href="https://github.com/Mopra/horadric.dev/releases/latest">latest release</a>, into the same
            folder. Leave the other files alone.
          </li>
          <li>
            <b>windows may warn you.</b> The files are not code signed yet, so SmartScreen can stop you the
            first time. Choose More info, then Run anyway.
          </li>
          <li>
            <b>install:</b> open a terminal in that folder and run <code>.\horadric.exe install</code>. No
            admin rights needed.
          </li>
        </ol>
      </section>
      <section className="shots" id="shots" aria-label="Screenshots of Horadric">
        {shots.map((s) => (
          <Image key={s.src} src={s.src} alt={s.alt} width={1270} height={760} sizes="(max-width: 900px) 100vw, 880px" />
        ))}
      </section>
    </>
  );
}
