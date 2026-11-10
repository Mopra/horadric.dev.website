import "./stage.css";

// Fake terminal output: one bar a line, as [width in %, kind].
const LINES: [number, string][] = [
  [62, "a"], [84, "b"], [48, "c"], [72, "b"],
];

// The four lines come three times, so the scroll can wrap unseen.
function Lines({ from }: { from: number }) {
  const round = LINES.map((_, j) => LINES[(j + from) % LINES.length]);
  return (
    <div className="v-stage-lines">
      {[...round, ...round, ...round].map(([w, kind], j) => (
        <i key={j} data-kind={kind} style={{ width: `${w}%` }} />
      ))}
    </div>
  );
}

// A session that pushes, and the line saying which account it went out as.
function Pusher({ title, as, from }: { title: string; as: string; from: number }) {
  return (
    <div className="v-stage-tile" data-role="push">
      <div className="v-stage-head">
        <span className="v-stage-dot" />
        <span className="v-stage-title">{title}</span>
      </div>
      <div className="v-stage-body">
        <Lines from={from} />
        <div className="v-stage-out">
          <p>$ git push</p>
          <p className="v-stage-went">
            <b />
            pushed as <em>{as}</em>
          </p>
        </div>
      </div>
    </div>
  );
}

// Two projects side by side, each with its own logins. Both push at once and
// each goes out as its own account. Then one session uses a secret from the
// vault: the human allows it once, and the session only ever sees its name.
export default function Stage() {
  return (
    <div className="v-stage">
      <div className="v-stage-desk">
        <div className="v-stage-proj" data-who="a">
          <p className="v-stage-name">
            <b />
            acme-api
          </p>
          <p className="v-stage-ids">
            <span className="v-stage-gh">
              <em>gh</em>acme-dev
            </span>
            <span>
              <em>vercel</em>acme
            </span>
          </p>
          <Pusher title="fix checkout" as="acme-dev" from={0} />
          <div className="v-stage-tile" data-role="secret">
            <span className="v-stage-lit">
              <span className="v-stage-ring" />
            </span>
            <div className="v-stage-head">
              <span className="v-stage-dot" />
              <span className="v-stage-title">webhooks</span>
            </div>
            <div className="v-stage-body">
              <Lines from={2} />
              <div className="v-stage-out">
                <p>$ horadric secret run</p>
                <p>STRIPE_KEY -- stripe listen</p>
                <p className="v-stage-key">
                  key <u>[STRIPE_KEY]</u>
                  <span>masked</span>
                </p>
                <p className="v-stage-ready">
                  <b />
                  ready
                </p>
              </div>
              <div className="v-stage-ask">
                <p>
                  use <em>STRIPE_KEY</em>
                </p>
                <p className="v-stage-for">for stripe listen?</p>
                <div className="v-stage-keys">
                  <span className="v-stage-once">once</span>
                  <span>always</span>
                  <span>no</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="v-stage-proj" data-who="b">
          <p className="v-stage-name">
            <b />
            side-project
          </p>
          <p className="v-stage-ids">
            <span className="v-stage-gh">
              <em>gh</em>mopra
            </span>
            <span>
              <em>vercel</em>personal
            </span>
          </p>
          <Pusher title="new landing" as="mopra" from={1} />
          <div className="v-stage-tile">
            <div className="v-stage-head">
              <span className="v-stage-dot" />
              <span className="v-stage-title">bump deps</span>
            </div>
            <div className="v-stage-body">
              <Lines from={3} />
            </div>
          </div>
        </div>
      </div>

      {/* The vault: where the secret stays, and the note that its use was logged. */}
      <div className="v-stage-vault">
        <svg className="v-stage-lock" viewBox="0 0 16 16">
          <rect x="3.5" y="7.5" width="9" height="6" rx="1.2" />
          <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />
        </svg>
        <span className="v-stage-vname">vault</span>
        <span className="v-stage-sealed">
          STRIPE_KEY<i>••••••••</i>
        </span>
        <span className="v-stage-log">used once · logged</span>
      </div>

      <svg className="v-stage-cursor" viewBox="0 0 16 16">
        <path d="M2 1.5v12l3.3-3 2.1 4.6 2-.9-2.1-4.5h4.5z" />
      </svg>
    </div>
  );
}
