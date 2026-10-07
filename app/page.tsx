import Field from "./field";

// Rebuild the page at most once an hour, so the download count stays fresh
// without asking GitHub on every visit.
export const revalidate = 3600;

// Below this many downloads the count would undersell the project, so it stays hidden.
const SHOW_DOWNLOADS_FROM = 500;

// Only the app itself counts. latest.json is fetched by the auto-updater, not by people.
async function downloads() {
  try {
    const res = await fetch("https://api.github.com/repos/Mopra/horadric.dev/releases?per_page=100", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return 0;
    const releases: { assets: { name: string; download_count: number }[] }[] = await res.json();
    return releases
      .flatMap((r) => r.assets)
      .filter((a) => a.name === "horadric.exe")
      .reduce((sum, a) => sum + a.download_count, 0);
  } catch {
    return 0;
  }
}

export default async function Home() {
  const n = await downloads();
  return (
    <>
      <Field />
      <nav className="corner">
        <a href="https://github.com/Mopra/horadric.dev">source</a>
        {n >= SHOW_DOWNLOADS_FROM && <span>{n.toLocaleString("en-US")} downloads</span>}
        <a className="get" href="https://github.com/Mopra/horadric.dev/releases/latest">
          download for windows
        </a>
      </nav>
    </>
  );
}
