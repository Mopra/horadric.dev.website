import { ImageResponse } from "next/og";

export const alt = "Horadric: every coding agent on your Windows desktop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview: a small field of agents, one of them waiting for you.
export default function Image() {
  const cells = Array.from({ length: 36 }, (_, i) =>
    i === 14 ? "#ffb224" : [3, 9, 22, 30].includes(i) ? "#15171b" : `rgba(61,180,255,${0.25 + (i % 4) * 0.15})`,
  );
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 96 }}>
        <div style={{ display: "flex", flexWrap: "wrap", width: 312, gap: 24 }}>
          {cells.map((c, i) => (
            <div key={i} style={{ width: 32, height: 32, borderRadius: 6, background: c, boxShadow: i === 14 ? "0 0 40px #ffb224" : "none" }} />
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", color: "#e8e9ed", fontSize: 64 }}>
          <div>horadric</div>
          <div style={{ fontSize: 30, color: "#5b5f68", marginTop: 16, maxWidth: 520 }}>
            Every coding agent on your Windows desktop. The one that needs you lights up.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
