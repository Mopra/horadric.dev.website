import Copy from "./copy";
import { RUNES } from "./runes";
import Atmosphere from "./atmosphere";
import Stone from "./stone";

// Rebuild the page at most once an hour, so the download count stays fresh
// without asking GitHub on every visit.
export const revalidate = 3600;

// Below this many downloads the count would undersell the project, so it stays hidden.
const SHOW_DOWNLOADS_FROM = 500;

// Only the files people install from count, on either system. The manifests are fetched by the auto-updater, not by people,
// and horadricw.exe comes with horadric.exe.
const INSTALL_FILES = new Set(["horadric.exe", "horadric-x64.zip", "Horadric-macos.tar.gz"]);
async function downloads() {
  try {
    const res = await fetch("https://api.github.com/repos/Mopra/horadric.dev/releases?per_page=100", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    const releases: { assets: { name: string; download_count: number }[] }[] = await res.json();
    return releases
      .flatMap((r) => r.assets)
      .filter((a) => INSTALL_FILES.has(a.name))
      .reduce((sum, a) => sum + a.download_count, 0);
  } catch {
    return 0;
  }
}

export default async function Home() {
  const n = await downloads();
  return (
    <>
      <section className="hero">
        <Atmosphere />
        <header className="name">
          <h1>horadric</h1>
        </header>
        <Stone />
        {/* What the runes say, for readers who cannot turn the stone and for search engines. */}
        <ul className="told">
          {RUNES.map((r) => (
            <li key={r.name}>
              {r.name}: {r.line}
            </li>
          ))}
        </ul>
        <a className="down" href="#install" aria-label="Scroll down to install">
          install
          <span />
        </a>
        <p className="needs">free, open source. needs a claude subscription</p>
        <nav className="corner">
          <a href="https://github.com/Mopra/horadric.dev">source</a>
          {n >= SHOW_DOWNLOADS_FROM && <span>{n.toLocaleString("en-US")} downloads</span>}
          <a className="get" href="https://github.com/Mopra/horadric.dev/releases/latest">
            download for windows
          </a>
          <a className="get" href="#mac">
            for mac
          </a>
          <a className="get" href="#linux">
            linux
          </a>
        </nav>
      </section>
      <section className="install" id="install" aria-label="How to install Horadric">
        <div className="os" id="mac">
          <h2>mac</h2>
          <ol>
            <li>
              <Copy text="curl -fsSL https://horadric.dev/install.sh | sh" label="Copy the install command for macOS" />
            </li>
          </ol>
        </div>
        <div className="os" id="linux">
          <h2>linux</h2>
          <ol>
            <li>
              <Copy text="curl -fsSL https://horadric.dev/install.sh | sh" label="Copy the install command for a Linux node" />
              <p className="aside">
                a node: no screen, x86_64. it runs claude sessions on a server and joins your brotherhood, so they show
                on your other machines.
              </p>
            </li>
          </ol>
        </div>
        <div className="os" id="windows">
          <h2>windows</h2>
          <div className="ways">
            <ol>
              <li>
                <Copy text="choco install horadric" label="Copy the Chocolatey install command for Windows" />
                <p className="aside">updates itself, so it can run ahead of chocolatey</p>
              </li>
            </ol>
            <p className="or">or by hand</p>
            <ol>
              <li>
                Download <b>horadric.exe</b> and <b>horadricw.exe</b> from the{" "}
                <a href="https://github.com/Mopra/horadric.dev/releases/latest">latest release</a> into one folder.
              </li>
              <li>
                The files are not signed yet. If SmartScreen stops you, choose <b>More info</b>, then{" "}
                <b>Run anyway</b>.
              </li>
              <li>
                In a terminal in that folder, no admin needed:
                <Copy text=".\horadric.exe install" label="Copy the install command for Windows" />
              </li>
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
