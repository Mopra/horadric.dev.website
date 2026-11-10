import "./quests.css";

// One line is typed, the aim. You leave. Warriv files the quests, each gets a
// session of its own and lands on main. One waits for you, and you come back.
// The timing of every row lives in quests.css, keyed by data-q.
const QUESTS = [
  { title: "add stripe checkout", hash: "9a1c4e2" },
  { title: "send invoice emails", hash: "3fb07d1" },
  { title: "write billing tests", hash: "c82e5a9" },
  { title: "add live stripe key" }, // only you have the key, so this one waits
];

export default function Quests() {
  return (
    <div className="v-quests">
      <div className="v-quests-panel">
        <div className="v-quests-head">
          <span className="v-quests-name">QUESTS</span>
          <span className="v-quests-pill">warriv drives</span>
        </div>
        <div className="v-quests-fade">
          <p className="v-quests-aim">
            <span className="v-quests-typed">
              <b>aim:</b> ship the billing page
              <i className="v-quests-cover" />
            </span>
          </p>
          <p className="v-quests-by">filed by warriv</p>
          {QUESTS.map((q, i) => (
            <div className="v-quests-row" data-q={i + 1} key={q.title}>
              <span className="v-quests-mark">
                <span className="v-quests-box" />
                <svg className="v-quests-play" viewBox="0 0 12 12">
                  <path d="M3 1.8v8.4L10 6z" />
                </svg>
                {q.hash ? (
                  <svg className="v-quests-check" viewBox="0 0 12 12">
                    <path d="M2.8 6.3l2.2 2.2 4.2-4.8" />
                  </svg>
                ) : (
                  <svg className="v-quests-bang" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="5" />
                    <path d="M6 3.2v3.4M6 8.6v.2" />
                  </svg>
                )}
              </span>
              <span className="v-quests-title">{q.title}</span>
              <span className="v-quests-state">
                <span className="v-quests-working">working</span>
                {q.hash ? <span className="v-quests-landed">landed</span> : <span className="v-quests-needs">needs you</span>}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* The main branch: a rail the landed work stacks up on. */}
      <p className="v-quests-main">main</p>
      <i className="v-quests-rail" />

      <div className="v-quests-fade v-quests-side">
        <p className="v-quests-chip v-quests-away">
          <svg viewBox="0 0 16 16">
            <path d="M12.6 9.8A5.4 5.4 0 0 1 6.2 3.4a5.4 5.4 0 1 0 6.4 6.4z" />
          </svg>
          you are away
        </p>
        <p className="v-quests-chip v-quests-back">
          <svg viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="2.6" />
            <path d="M8 1.6v1.8M8 12.6v1.8M1.6 8h1.8M12.6 8h1.8M3.5 3.5l1.3 1.3M11.2 11.2l1.3 1.3M3.5 12.5l1.3-1.3M11.2 4.8l1.3-1.3" />
          </svg>
          you are back
        </p>

        {/* Beside each quest: its session while it works, then its commit on main. */}
        {QUESTS.map((q, i) => (
          <div className="v-quests-lane" data-q={i + 1} key={q.title}>
            <i className="v-quests-wire" />
            <p className="v-quests-tile">
              <i />
              session
            </p>
            <i className="v-quests-ring" />
            {q.hash && (
              <>
                <p className="v-quests-hash">{q.hash}</p>
                <i className="v-quests-ping" />
                <i className="v-quests-commit" />
              </>
            )}
          </div>
        ))}

        <p className="v-quests-sum">
          3 h away · <b>3 landed</b> · <em>1 needs you</em>
        </p>
      </div>
    </div>
  );
}
