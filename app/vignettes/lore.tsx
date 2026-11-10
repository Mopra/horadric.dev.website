import "./lore.css";

// The months on file, newest first, and how full each one's bar is drawn.
// A month with `hit` holds one of the three memories the prompt brings back.
const MONTHS: { name: string; full: number; hit?: string }[] = [
  { name: "nov", full: 34 },
  { name: "oct", full: 92 },
  { name: "sep", full: 78, hit: "b" },
  { name: "aug", full: 100, hit: "a" },
  { name: "jul", full: 64 },
  { name: "jun", full: 85, hit: "c" },
  { name: "may", full: 71 },
  { name: "apr", full: 55 },
  { name: "mar", full: 80 },
];

// Turns as they are saved: whose project, who spoke, the words. The last one
// is the turn this very picture tells, so it is the one left standing.
const TURNS = [
  ["website", "agent: it is live"],
  ["app", "you: try dark mode"],
  ["api", "agent: tests pass"],
  ["api", "you: why drop redis?"],
];

// What comes back: its kind, its age, where it is from when not from here.
const HITS = [
  { at: "a", kind: "dialogue", age: "96 days ago", from: "", text: "you: drop redis, use sqlite" },
  { at: "b", kind: "quest", age: "62 days ago", from: "", text: "moved the cache to sqlite" },
  { at: "c", kind: "note", age: "150 days ago", from: "website", text: "redis kept timing out" },
];

// Every turn of every session drops into the store on the left. On the right
// a new session asks about an old choice, and the store hands it the three
// memories that matter before the agent has searched for anything.
export default function Lore() {
  return (
    <div className="v-lore">
      <div className="v-lore-store">
        <p className="v-lore-name">the lore</p>
        <p className="v-lore-count">
          <b>
            1,20
            <span className="v-lore-roll">
              <span className="v-lore-digits">
                8<br />7<br />6<br />5<br />4
              </span>
            </span>
          </b>
          <span className="v-lore-unit">sessions kept</span>
        </p>

        <div className="v-lore-slot">
          {TURNS.map(([project, words], n) => (
            <p className={`v-lore-turn v-lore-turn${n + 1}`} key={n}>
              <em>{project}</em>
              {words}
            </p>
          ))}
        </div>

        <div className="v-lore-months">
          {MONTHS.map((m) => (
            <p className={`v-lore-month${m.hit ? ` v-lore-m${m.hit}` : ""}`} key={m.name}>
              <span>{m.name}</span>
              <i style={{ width: `${m.full * 0.11}em` }} />
              {m.hit && <u />}
            </p>
          ))}
        </div>

        <p className="v-lore-foot">
          saved after every turn
          <br />
          on your machine, for years
        </p>
      </div>

      <div className="v-lore-tile">
        <p className="v-lore-bar">
          <i className="v-lore-dot" />
          new session
          <em>api</em>
        </p>
        <p className="v-lore-ask">
          &gt;{" "}
          <span className="v-lore-typed">
            why did we drop redis?
            <i className="v-lore-cover" />
          </span>
        </p>

        <div className="v-lore-dock">
          <p className="v-lore-tag">handed over by horadric</p>
          <p className="v-lore-says">stay awhile and listen.</p>
        </div>
        {HITS.map((h) => (
          <div className={`v-lore-hit v-lore-hit-${h.at}`} key={h.at}>
            <p className="v-lore-meta">
              <b>{h.kind}</b>
              {h.age}
              {h.from && <em>{h.from}</em>}
            </p>
            <p className="v-lore-text">{h.text}</p>
          </div>
        ))}

        <p className="v-lore-answer v-lore-answer1">
          <i />
          redis kept timing out, so
        </p>
        <p className="v-lore-answer v-lore-answer2">we moved to sqlite in sep.</p>
      </div>
    </div>
  );
}
