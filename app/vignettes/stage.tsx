import "./stage.css";

// Fake terminal output: one bar a line, as [width in %, kind].
const LINES: [number, string][] = [
  [62, "a"], [84, "b"], [48, "b"], [70, "c"], [90, "a"], [56, "b"], [76, "c"], [40, "b"],
];

// Six sessions. The second one asks for you, the fourth one finishes.
const TILES = ["fix login", "auth types", "add tests", "api cache", "bump deps", "write docs"];
const ROLE: Record<number, string> = { 1: "ask", 3: "end" };

export default function Stage() {
  return (
    <div className="v-stage">
      <div className="v-stage-bar">
        <span>
          <b />
          my-app
        </span>
        <span>6 sessions</span>
      </div>
      <div className="v-stage-grid">
        {TILES.map((title, i) => {
          const role = ROLE[i];
          // Each tile starts at another line, and the lines come twice so the scroll can wrap unseen.
          const lines = LINES.map((_, j) => LINES[(j + i * 3) % LINES.length]);
          // The plain tiles run out of step with each other. The two with a part to play keep the loop's time.
          const offset = role ? undefined : { animationDelay: `${-i * 1.3}s` };
          return (
            <div className="v-stage-tile" data-role={role} key={title}>
              {role && <span className="v-stage-lit">{role === "ask" && <span className="v-stage-ring" />}</span>}
              <div className="v-stage-head">
                <span className="v-stage-dot" style={offset} />
                <span className="v-stage-title">{title}</span>
              </div>
              <div className="v-stage-body">
                <div className="v-stage-lines" style={offset}>
                  {[...lines, ...lines].map(([w, kind], j) => (
                    <i key={j} data-kind={kind} style={{ width: `${w}%` }} />
                  ))}
                </div>
                {role === "ask" && (
                  <div className="v-stage-ask">
                    <span>edit auth.ts?</span>
                    <span className="v-stage-yes">&gt; yes</span>
                    <span className="v-stage-no">&nbsp; no</span>
                  </div>
                )}
              </div>
              <div className="v-stage-foot">
                <span className="v-stage-working">working</span>
                {role === "ask" && <span className="v-stage-needs">needs you</span>}
                {role === "end" && <span className="v-stage-finished">done</span>}
              </div>
            </div>
          );
        })}
      </div>
      <svg className="v-stage-cursor" viewBox="0 0 16 16">
        <path d="M2 1.5v12l3.3-3 2.1 4.6 2-.9-2.1-4.5h4.5z" />
      </svg>
    </div>
  );
}
