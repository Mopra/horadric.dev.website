import "./lore.css";

// The one note of the story. It is drawn where it is written, on the shelf,
// in flight both ways, and where it is read, so each can fade on its own.
function Note({ at }: { at: string }) {
  return (
    <div className={`v-lore-note v-lore-${at}`}>
      <span>
        auth tokens live in
        <br />
        <b>lib/session.ts</b>
      </span>
    </div>
  );
}

// An older note on the shelf: a word and a bar, there to make it a shelf.
function Old({ at, word }: { at: string; word: string }) {
  return (
    <div className={`v-lore-note v-lore-old v-lore-${at}`}>
      <span>
        {word}
        <i />
      </span>
    </div>
  );
}

export default function Lore() {
  return (
    <div className="v-lore">
      <div className="v-lore-tile v-lore-one">
        <div className="v-lore-bar">
          <i className="v-lore-dot" />
          session one
          <span className="v-lore-state">
            <em className="v-lore-working">working</em>
            <em className="v-lore-ended">ended</em>
          </span>
        </div>
        <div className="v-lore-body">
          <p className="v-lore-ask v-lore-a1">&gt; where are auth tokens?</p>
          <p className="v-lore-a2">
            <i />
            grep &quot;token&quot;
          </p>
          <p className="v-lore-a3">
            <i />
            read lib/auth.ts
          </p>
          <p className="v-lore-a4">
            <i />
            read lib/session.ts
          </p>
          <p className="v-lore-tool v-lore-a5">
            <i />
            lore_note
          </p>
          <Note at="written" />
        </div>
      </div>

      <div className="v-lore-tile v-lore-two">
        <div className="v-lore-bar">
          <i className="v-lore-dot" />
          session two
          <span className="v-lore-state">
            <em className="v-lore-working">working</em>
            <em className="v-lore-done">done</em>
          </span>
        </div>
        <div className="v-lore-body">
          <p className="v-lore-ask v-lore-b1">&gt; fix the token refresh</p>
          <p className="v-lore-tool v-lore-b2">
            <i />
            lore_recall &quot;auth&quot;
          </p>
          <Note at="held" />
          <p className="v-lore-b3">
            <i />
            edit lib/session.ts
          </p>
          <p className="v-lore-fin v-lore-b4">
            <i />
            done, no searching
          </p>
        </div>
      </div>

      <div className="v-lore-shelf">
        <span className="v-lore-name">the lore</span>
        <span className="v-lore-what">notes every session can read</span>
      </div>
      <Old at="left" word="api routes" />
      <Note at="kept" />
      <Old at="right" word="db schema" />
      <Note at="down" />
      <Note at="up" />
    </div>
  );
}
