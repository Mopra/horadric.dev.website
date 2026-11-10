import type { CSSProperties, ReactNode } from "react";
import { RUNES } from "./runes";
import Seen from "./seen";
import Stage from "./vignettes/stage";
import Folio from "./vignettes/folio";
import Brotherhood from "./vignettes/brotherhood";
import Portal from "./vignettes/portal";
import Quests from "./vignettes/quests";
import Lore from "./vignettes/lore";
import "./explain.css";

// What each rune means in plain words: the stone keeps the riddle, this keeps the answer.
// One row a rune, what only Horadric does first, each with a small moving picture of the app doing it.
// Tiles for sessions are left unsold: every tool of this kind has them.
const PARTS: { rune: string; head: string; body: string; show: ReactNode; note?: string }[] = [
  {
    rune: "the quest log",
    head: "give it a goal. come back to shipped work.",
    body: "Write down an aim. Warriv, the driver, files the quests, starts a session for each and lands the finished work on main. It stops for you only when a choice cannot be undone.",
    show: <Quests />,
  },
  {
    rune: "the lore",
    head: "it remembers every conversation",
    body: "Every word you and your agents say is kept on your machine and searched by meaning. What matters is handed to the next prompt unasked, even from another project. Nobody writes anything down.",
    show: <Lore />,
  },
  {
    rune: "the stage",
    head: "every project with its own keys",
    body: "Each project carries its own GitHub, git, npm and Vercel logins, so two clients run side by side with no switching. Agents use secrets from the vault without ever seeing them.",
    show: <Stage />,
    note: "the vault is windows for now",
  },
  {
    rune: "the brotherhood",
    head: "all your machines, one desk",
    body: "Join your laptop, your desktop and your server. Hand a running session from one to another, files and all.",
    show: <Brotherhood />,
  },
  {
    rune: "the town portal",
    head: "answer from your phone",
    body: "Follow your sessions from your pocket and answer the one that waits. Sealed end to end, with no ports opened.",
    show: <Portal />,
  },
  {
    rune: "the folio",
    head: "claude as a page, not a terminal",
    body: "Read the conversation like a document. Rewind to any prompt, or edit it and try another way. The old thread stays in your history.",
    show: <Folio />,
  },
];

export default function Explain() {
  return (
    <section className="explain" id="what" aria-label="What Horadric is">
      <header className="lede">
        <h2>the stone, in plain words</h2>
        <p>
          Horadric is a desktop app that runs the Claude Code you already have, many sessions at a time. Every tool of
          its kind shows you sessions as tiles. This is what only Horadric does.
        </p>
      </header>
      {PARTS.map((p) => {
        const rune = RUNES.find((r) => r.name === p.rune)!;
        const light = `rgb(${rune.light.map((v) => Math.round(v * 255)).join(",")})`;
        return (
          <article className="part" key={p.rune} style={{ "--rune": light } as CSSProperties}>
            <div className="says">
              <p className="rune">{p.rune}</p>
              <h3>{p.head}</h3>
              <p>{p.body}</p>
              {(p.note ?? rune.note) && <p className="note">{p.note ?? rune.note}</p>}
            </div>
            <Seen>{p.show}</Seen>
          </article>
        );
      })}
    </section>
  );
}
