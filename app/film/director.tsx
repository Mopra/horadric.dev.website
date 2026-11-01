"use client";

import { useRef, useState } from "react";
import type { Scene } from "../light";
import type { Rgb } from "../runes";

// Films the stone as a seamless loop. The site is loaded with ?film in a
// frame, where a stepped clock stands in for the real one; each frame the
// clock steps, the script below sets the stone's turn, light and fire,
// and the layers are drawn together into one picture, the way the page's
// CSS lays them over each other. The loop's seam: the stone's turn, light,
// fire and drift all come round exactly; what does not (smoke, drifting
// runes, flicker) is crossfaded from the end back into the start.

const T = 30; // seconds in one loop: one full turn of the stone
const FPS = 30;
const FADE = 1.5; // seconds of crossfade at the seam

const GOLD: Rgb = [1, 0.62, 0.2];
const BLOOD: Rgb = [0.9, 0.06, 0.05];
const VIOLET: Rgb = [0.62, 0.42, 1];
// The light through one loop, as [share of the loop, colour], back to gold.
const LIGHTS: [number, Rgb][] = [
  [0, GOLD], [0.27, GOLD], [0.36, BLOOD], [0.6, BLOOD], [0.69, VIOLET], [0.91, VIOLET], [1, GOLD],
];
// When the runes facing us burn, as [from, to] shares of the loop.
const FIRES: [number, number][] = [[0.07, 0.27], [0.41, 0.59], [0.73, 0.9]];

const smooth = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

function script(t: number): Scene {
  const u = (((t % T) + T) % T) / T;
  const yaw = 0.9 + Math.PI * 2 * u;
  const pitch = ((25 + 2.5 * Math.sin(Math.PI * 2 * u)) * Math.PI) / 180;
  let light = GOLD;
  for (let i = 1; i < LIGHTS.length; i++) {
    const [a, ca] = LIGHTS[i - 1], [b, cb] = LIGHTS[i];
    if (u <= b) {
      const k = smooth(a, b, u);
      light = [0, 1, 2].map((j) => ca[j] + (cb[j] - ca[j]) * k) as Rgb;
      break;
    }
  }
  // Each face burns as much as it faces the camera, while a fire is on.
  const fire = Math.max(...FIRES.map(([a, b]) => smooth(a, a + 0.05, u) * (1 - smooth(b - 0.05, b, u))));
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const eye = [cp * sy, sp, -cp * cy];
  const normals = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
  const ignite = normals.map((n) => fire * Math.max(0, n[0] * eye[0] + n[1] * eye[1] + n[2] * eye[2]) ** 3);
  return {
    yaw, pitch, light, ignite,
    px: 0.35 * Math.sin(Math.PI * 2 * u),
    py: 0.15 * Math.sin(Math.PI * 4 * u),
  };
}

type Film = { script: ((t: number) => Scene) | null; step: (ms: number) => void };
const SIZES = { square: [1080, 1080], wide: [1920, 1080] } as const;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function Director() {
  const holder = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("ready");

  const shoot = async (name: keyof typeof SIZES) => {
    const [W, H] = SIZES[name];
    const frame = document.createElement("iframe");
    frame.style.cssText = `width:${W}px;height:${H}px;border:0;background:#000;display:block`;
    frame.src = "/?film";
    holder.current!.replaceChildren(frame);
    await new Promise((r) => (frame.onload = r));
    const win = frame.contentWindow as Window & { __film: Film };
    const doc = frame.contentDocument!;
    // The stone and the air read the clock from when the page loaded; the
    // film counts from when the stone is awake. One script, one time.
    let start = 0;
    win.__film.script = (abs) => script(abs - start);
    doc.querySelector(".veil")?.remove();

    // Wake the stone: step the clock until it is drawn, giving its shader
    // real time to compile in between.
    let ms = 0;
    setStatus("waking the stone");
    while (!doc.querySelector(".stone.live")) {
      win.__film.step((ms += 1000 / FPS));
      await wait(20);
    }
    for (let i = 0; i < FPS; i++) win.__film.step((ms += 1000 / FPS));
    start = ms / 1000;

    const out = doc.createElement("canvas");
    out.width = W;
    out.height = H;
    const g = out.getContext("2d")!;
    const layer = doc.createElement("canvas");
    layer.width = W;
    layer.height = H;
    const lg = layer.getContext("2d")!;
    const grain = doc.createElement("canvas");
    grain.width = grain.height = 256;
    const gg = grain.getContext("2d")!;
    const hero = doc.querySelector<HTMLElement>(".hero")!;
    const S = W / hero.clientWidth;

    const at = (el: Element) => {
      const r = el.getBoundingClientRect(), h = hero.getBoundingClientRect();
      return [(r.left - h.left) * S, (r.top - h.top) * S, r.width * S, r.height * S] as const;
    };
    const put = (ctx: CanvasRenderingContext2D, sel: string, filter = "none") => {
      const el = doc.querySelector<HTMLCanvasElement>(sel);
      if (!el) return;
      ctx.filter = filter;
      ctx.drawImage(el, ...at(el));
      ctx.filter = "none";
    };
    // A group of layers, faded out toward the bottom as its CSS mask does.
    const group = (sels: [string, string?][], solidTo: number, extra?: () => void) => {
      lg.clearRect(0, 0, W, H);
      for (const [sel, f] of sels) put(lg, sel, f);
      extra?.();
      lg.globalCompositeOperation = "destination-in";
      const m = lg.createLinearGradient(0, 0, 0, H);
      m.addColorStop(0, "#000");
      m.addColorStop(solidTo, "#000");
      m.addColorStop(1, "rgba(0,0,0,0)");
      lg.fillStyle = m;
      lg.fillRect(0, 0, W, H);
      lg.globalCompositeOperation = "source-over";
      g.drawImage(layer, 0, 0);
    };
    const text = (el: Element | null, color: string, glow?: string) => {
      if (!el) return;
      const cs = win.getComputedStyle(el);
      const [x, y, w] = at(el);
      g.font = `${cs.fontWeight} ${parseFloat(cs.fontSize) * S}px ${cs.fontFamily}`;
      g.letterSpacing = `${parseFloat(cs.letterSpacing || "0") * S}px`;
      g.textBaseline = "top";
      g.textAlign = cs.textAlign === "center" || el.closest(".speaks") ? "center" : "left";
      const tx = g.textAlign === "center" ? x + w / 2 : x;
      const content = el.textContent ?? "";
      if (glow) {
        g.shadowColor = glow;
        g.shadowBlur = 26 * S;
        g.fillStyle = color;
        g.fillText(content, tx, y);
        g.shadowBlur = 10 * S;
        g.fillText(content, tx, y);
        g.shadowBlur = 0;
      }
      g.fillStyle = color;
      g.fillText(content, tx, y);
    };

    const draw = (t: number) => {
      const scene = script(t);
      const L = scene.light.map((v) => Math.round(v * 255));
      g.fillStyle = "#000";
      g.fillRect(0, 0, W, H);
      group([[".air.back .smoke"], [".air.back .far", `blur(${1.2 * S}px)`], [".air.back .mid"]], 0.75);
      // The faint halo of the stone's light behind it.
      const stone = doc.querySelector(".stone");
      if (stone) {
        const [x, y, w, h] = at(stone);
        g.filter = `blur(${30 * S}px)`;
        const halo = g.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w * 0.4);
        halo.addColorStop(0, `rgba(${L.join(",")},0.07)`);
        halo.addColorStop(1, `rgba(${L.join(",")},0)`);
        g.fillStyle = halo;
        g.fillRect(x, y, w, h);
        g.filter = "none";
      }
      put(g, ".stone canvas");
      group([[".air.front .near", `blur(${3 * S}px)`], [".air.front .wisps"]], 0.8, () => {
        const px = gg.createImageData(256, 256);
        for (let i = 0; i < px.data.length; i += 4) {
          px.data[i] = px.data[i + 1] = px.data[i + 2] = 255;
          px.data[i + 3] = Math.random() < 0.5 ? Math.random() * 255 : 0;
        }
        gg.putImageData(px, 0, 0);
        lg.globalAlpha = 0.035;
        lg.fillStyle = lg.createPattern(grain, "repeat")!;
        lg.fillRect(0, 0, W, H);
        lg.globalAlpha = 1;
      });
      text(doc.querySelector(".name h1"), "#e8e9ed");
      // The line under the stone, in the stone's light, as on the page.
      const mixc = L.map((v, i) => Math.round(v * 0.75 + [138, 142, 152][i] * 0.25));
      text(doc.querySelector(".speaks .what"), `rgb(${mixc.join(",")})`, `rgba(${L.join(",")},0.5)`);
      // Where to find it.
      g.font = `300 ${13 * S}px ${win.getComputedStyle(hero).fontFamily}`;
      g.letterSpacing = `${0.3 * 13 * S}px`;
      g.textAlign = "center";
      g.textBaseline = "bottom";
      g.fillStyle = "#5b5f68";
      g.fillText("horadric.dev", W / 2, H - 32 * S);
    };

    const send = async (i: number, c: HTMLCanvasElement) => {
      const blob = await new Promise<Blob>((r) => c.toBlob((b) => r(b!), "image/png"));
      await fetch(`/film/frame?name=${name}&i=${i}`, { method: "POST", body: blob });
    };

    await fetch(`/film/frame?name=${name}&start`, { method: "POST" });
    const N = T * FPS, K = Math.round(FADE * FPS);
    const head: HTMLCanvasElement[] = [];
    // The loop itself; its first frames are kept to crossfade into.
    for (let i = 0; i < N; i++) {
      const t = i / FPS;
      win.__film.step((start + t) * 1000);
      draw(t);
      if (i < K) {
        const keep = doc.createElement("canvas");
        keep.width = W;
        keep.height = H;
        keep.getContext("2d")!.drawImage(out, 0, 0);
        head.push(keep);
      } else await send(i, out);
      setStatus(`${name}: frame ${i + 1} of ${N}`);
    }
    // Past the end, the loop runs on into its start: blend the two.
    for (let i = 0; i < K; i++) {
      const t = (N + i) / FPS;
      win.__film.step((start + t) * 1000);
      draw(t);
      const w = (i + 0.5) / K;
      g.globalAlpha = w;
      g.drawImage(head[i], 0, 0);
      g.globalAlpha = 1;
      await send(i, out);
      setStatus(`${name}: seam ${i + 1} of ${K}`);
    }
    setStatus(`${name}: encoding`);
    const res = await fetch(`/film/frame?name=${name}&encode&fps=${FPS}`, { method: "POST" }).then((r) => r.json());
    setStatus(res.ok ? `done: ${res.file}` : `frames saved, but ffmpeg failed: ${res.why}`);
  };

  return (
    <main style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <button className="copy" style={{ width: "auto" }} onClick={() => shoot("square")}>film square, 1080</button>
        <button className="copy" style={{ width: "auto" }} onClick={() => shoot("wide")}>film wide, 1920 x 1080</button>
        <span id="status">{status}</span>
      </div>
      <div ref={holder} />
    </main>
  );
}
