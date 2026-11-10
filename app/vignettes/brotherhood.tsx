import "./brotherhood.css";

// A session in miniature: a status dot, a name, a few lines of output.
function Tile({ name, state, className = "" }: { name: string; state: "work" | "done"; className?: string }) {
  return (
    <div className={`v-brotherhood-tile v-brotherhood-${state} ${className}`}>
      <p>
        <i />
        {name}
      </p>
      <span />
      <span />
      <span />
    </div>
  );
}

// Three machines joined in a ring. One running session goes round it,
// its files trailing behind, and works wherever it lands.
export default function Brotherhood() {
  return (
    <div className="v-brotherhood">
      {/* The links, drawn in the frame's own em grid of 40 by 30. */}
      <svg className="v-brotherhood-links" viewBox="0 0 40 30">
        <line x1="14.4" y1="7.3" x2="25.4" y2="7.3" />
        <line x1="27.39" y1="10.6" x2="24.48" y2="18.5" />
        <line x1="19.65" y1="18.5" x2="14.14" y2="11.2" />
        <line className="v-brotherhood-lit v-brotherhood-lit1" x1="14.4" y1="7.3" x2="25.4" y2="7.3" />
        <line className="v-brotherhood-lit v-brotherhood-lit2" x1="27.39" y1="10.6" x2="24.48" y2="18.5" />
        <line className="v-brotherhood-lit v-brotherhood-lit3" x1="19.65" y1="18.5" x2="14.14" y2="11.2" />
      </svg>

      <div className="v-brotherhood-box v-brotherhood-laptop">
        <div className="v-brotherhood-bar"><i /><i /><i /></div>
        <div className="v-brotherhood-slots">
          <Tile name="docs" state="done" />
          <div className="v-brotherhood-gap" />
        </div>
      </div>
      <div className="v-brotherhood-hinge" />
      <p className="v-brotherhood-name v-brotherhood-name1">laptop</p>

      <div className="v-brotherhood-box v-brotherhood-desktop">
        <div className="v-brotherhood-bar"><i /><i /><i /></div>
        <div className="v-brotherhood-slots">
          <div className="v-brotherhood-gap" />
          <Tile name="ui" state="work" className="v-brotherhood-late" />
        </div>
      </div>
      <div className="v-brotherhood-neck" />
      <div className="v-brotherhood-foot" />
      <p className="v-brotherhood-name v-brotherhood-name2">desktop</p>

      <div className="v-brotherhood-box v-brotherhood-server">
        <div className="v-brotherhood-bar v-brotherhood-rack"><i /><i /><b /></div>
        <div className="v-brotherhood-slots">
          <Tile name="build" state="work" className="v-brotherhood-later" />
          <div className="v-brotherhood-gap" />
        </div>
      </div>
      <p className="v-brotherhood-name v-brotherhood-name3">server</p>

      <i className="v-brotherhood-file v-brotherhood-file1" />
      <i className="v-brotherhood-file v-brotherhood-file2" />
      <i className="v-brotherhood-file v-brotherhood-file3" />
      <Tile name="api" state="work" className="v-brotherhood-roamer" />
    </div>
  );
}
