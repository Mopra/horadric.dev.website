import "./portal.css";

// A session on the desk asks for leave to run a command. The phone shows it
// waiting, a tap opens what it asks, a second tap answers yes, and it works on.
export default function Portal() {
  return (
    <div className="v-portal">
      <p className="v-portal-where">desktop</p>
      <div className="v-portal-tile">
        <p className="v-portal-title">
          <i />
          deploy
          <em>api</em>
        </p>
        <p className="v-portal-said">&gt; ship the fix</p>
        <p><b />bash(npm test)</p>
        <p className="v-portal-out">42 passed</p>
        <p className="v-portal-step"><b />bash(git push)</p>
        <p className="v-portal-end">
          <span className="v-portal-asks">allow? yes · no</span>
          <span className="v-portal-runs">pushing to main</span>
        </p>
      </div>

      {/* The sealed link: a thread from desk to phone, a lock on it. */}
      <div className="v-portal-link" />
      <i className="v-portal-spark" />
      <div className="v-portal-lock">
        <svg viewBox="0 0 16 16">
          <rect x="3.5" y="7.5" width="9" height="6" rx="1.2" />
          <path d="M5.5 7.5V5.5a2.5 2.5 0 0 1 5 0v2" />
        </svg>
      </div>
      <p className="v-portal-sealed">sealed</p>

      <div className="v-portal-phone">
        <div className="v-portal-screen">
          <i className="v-portal-notch" />
          <p className="v-portal-head">
            desktop
            <em>3 sessions</em>
          </p>
          <div className="v-portal-row v-portal-work">
            <i />
            <p>fix login</p>
            <p className="v-portal-line">editing auth.ts</p>
          </div>
          <div className="v-portal-row v-portal-hot">
            <i />
            <p>
              deploy
              <em>needs you</em>
            </p>
            <p className="v-portal-line">
              <span className="v-portal-a">tests passed</span>
              <span className="v-portal-b">allow git push?</span>
              <span className="v-portal-c">pushing to main</span>
            </p>
            <u className="v-portal-tap v-portal-tap1" />
          </div>
          <div className="v-portal-row v-portal-done">
            <i />
            <p>write docs</p>
            <p className="v-portal-line">done</p>
          </div>
          <div className="v-portal-scrim" />
          <div className="v-portal-sheet">
            <i className="v-portal-grip" />
            <p className="v-portal-ask">allow bash?</p>
            <p className="v-portal-cmd">git push origin main</p>
            <div className="v-portal-keys">
              <span className="v-portal-yes">
                yes
                <u className="v-portal-tap v-portal-tap2" />
              </span>
              <span>always</span>
              <span>no</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
