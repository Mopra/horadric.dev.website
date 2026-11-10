import "./folio.css";

// A prompt as the Folio draws it: a dark plate on the right with a small rune.
function Plate({ at, children }: { at: string; children: string }) {
  return (
    <p className={`v-folio-plate v-folio-${at}`}>
      <i />
      {children}
    </p>
  );
}

// A reply: lines of body text as bars, each drawn on its own.
function Reply({ at, lines }: { at: string; lines: number[] }) {
  return (
    <div className={`v-folio-reply v-folio-${at}`}>
      {lines.map((w, i) => (
        <i key={i} style={{ width: `${w}em` }} />
      ))}
    </div>
  );
}

export default function Folio() {
  return (
    <div className="v-folio">
      <div className="v-folio-page">
        <div className="v-folio-bar">
          <i />
          folio
          <span>login page</span>
        </div>

        <Plate at="p1">add a login form</Plate>
        <Reply at="r1" lines={[31, 33.5, 19]} />

        {/* Where the page splits: the old way on the left, the new on the right. */}
        <div className="v-folio-rail v-folio-rail-was" />
        <div className="v-folio-rail v-folio-rail-now" />
        <span className="v-folio-tag v-folio-tag-was">original, kept in history</span>
        <span className="v-folio-tag v-folio-tag-now">fork</span>

        {/* The turns after the first, which the fork sets aside. */}
        <div className="v-folio-was">
          <Plate at="p2">use passwords</Plate>
          <Reply at="r2" lines={[33.5, 28, 30]} />
          <Plate at="p3">add a reset link</Plate>
          <Reply at="r3" lines={[33.5, 31, 16]} />
          <div className="v-folio-acts">
            <span className="v-folio-edit">edit</span>
            <span>rewind</span>
          </div>
        </div>

        <Plate at="p4">use magic links</Plate>
        <Reply at="r4" lines={[14.25, 11, 13, 7]} />
      </div>

      <svg className="v-folio-cursor" viewBox="0 0 12 16">
        <path d="M1 1v12.5l3.2-3 2.2 4.7 1.9-.9-2.2-4.6H11z" />
      </svg>
    </div>
  );
}
