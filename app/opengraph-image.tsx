import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Horadric: the rune stone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview: the rune stone in the dark, and the name beside it.
export default async function Image() {
  const stone = await readFile(join(process.cwd(), "public", "stone.png"));
  const src = `data:image/png;base64,${stone.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", gap: 80 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={420} height={420} alt="" />
        <div style={{ display: "flex", flexDirection: "column", color: "#e8e9ed", fontSize: 64, letterSpacing: 12 }}>
          <div>horadric</div>
          <div style={{ fontSize: 28, letterSpacing: 1, color: "#5b5f68", marginTop: 20, maxWidth: 480 }}>
            Every Claude Code session, on every machine you own.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
