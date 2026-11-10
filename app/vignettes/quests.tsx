import type { CSSProperties } from "react";
import "./quests.css";

const QUESTS = ["fix the redirect", "add billing tests", "update the readme", "cache search api", "bump dependencies"];
const STEP = 2.4; // seconds a quest: the 12s loop holds one step for each

// Four rows show at a time and the list rolls up one row a step, so it needs
// the five quests and then the first four again to wrap unseen.
const ROWS = [...QUESTS, ...QUESTS.slice(0, 4)];
const STILL = ["done", "work"]; // the state of the top rows when nothing moves

const BARS = [70, 46, 88, 58];

export default function Quests() {
  return (
    <div className="v-quests">
      <div className="v-quests-away">
        <span className="v-quests-clock">
          <i />
          <i />
        </span>
        <span>you are away</span>
      </div>

      <div className="v-quests-panel">
        <div className="v-quests-head">
          <span className="v-quests-name">QUESTS</span>
          <span>5</span>
          <span className="v-quests-auto">auto</span>
          <span className="v-quests-plus">+</span>
        </div>
        <div className="v-quests-list">
          <div className="v-quests-roll">
            {ROWS.map((title, i) => (
              // Each row runs the same 12s life, one step later than the row above it.
              <div className="v-quests-row" data-s={STILL[i]} key={i} style={{ "--d": `${i * STEP - 24}s` } as CSSProperties}>
                <span className="v-quests-mark">
                  <span className="v-quests-box" />
                  <svg className="v-quests-play" viewBox="0 0 12 12">
                    <path d="M3 1.8v8.4L10 6z" />
                  </svg>
                  <svg className="v-quests-check" viewBox="0 0 12 12">
                    <path d="M2.8 6.3l2.2 2.2 4.2-4.8" />
                  </svg>
                </span>
                <span className="v-quests-title">{title}</span>
                <span className="v-quests-state">working</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <span className="v-quests-wire" />
      {/* One tile stands for each session in turn: it comes with the working row and goes when the row is done. */}
      <div className="v-quests-tile">
        <div className="v-quests-tile-head">
          <span className="v-quests-dot" />
          <span className="v-quests-names">
            <span>
              {QUESTS.map((_, i) => (
                <span key={i}>{QUESTS[(i + 1) % QUESTS.length]}</span>
              ))}
            </span>
          </span>
        </div>
        <div className="v-quests-body">
          <div className="v-quests-lines">
            {[...BARS, ...BARS].map((w, i) => (
              <i key={i} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="v-quests-foot">
          <span className="v-quests-working">working</span>
          <span className="v-quests-finished">done</span>
        </div>
      </div>
    </div>
  );
}
