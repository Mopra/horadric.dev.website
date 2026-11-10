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
// One row a rune, in the order a newcomer needs them, each with a small moving picture of the app doing it.
const PARTS: { rune: string; head: string; body: string; show: ReactNode }[] = [
  {
    rune: "the stage",
    head: "see every session at once",
    body: "Each Claude Code session is a tile on one screen. The one waiting for you turns amber, so you stop checking terminals to see who is stuck.",
    show: <Stage />,
  },
  {
    rune: "the quest log",
    head: "queue the work, walk away",
    body: "Write down a list of tasks. Horadric starts an agent for each one and works down the list while you are gone.",
    show: <Quests />,
  },
  {
    rune: "the lore",
    head: "agents that remember",
    body: "What one session figures out is kept as a note. The next session reads it instead of finding it out again.",
    show: <Lore />,
  },
  {
    rune: "the folio",
    head: "claude as a page, not a terminal",
    body: "Read the conversation like a document. Rewind to any prompt, or edit it and try another way. The old thread stays in your history.",
    show: <Folio />,
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
];

export default function Explain() {
  return (
    <section className="explain" id="what" aria-label="What Horadric is">
      <header className="lede">
        <h2>the stone, in plain words</h2>
        <p>
          Horadric is a desktop app. It runs the Claude Code you already have, many sessions at a time, and tells you
          which one needs you. Six runes on the stone, six things it does.
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
              {rune.note && <p className="note">{rune.note}</p>}
            </div>
            <Seen>{p.show}</Seen>
          </article>
        );
      })}
    </section>
  );
}
