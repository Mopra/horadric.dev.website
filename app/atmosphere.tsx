"use client";

import { useEffect, useRef } from "react";
import { shared } from "./light";
import { SMOKE_FS, SMOKE_VS } from "./smoke-shader";

// The air around the stone, back to front: smoke, far runes, near runes,
// then (in front of the stone) the nearest runes, sparks and a few wisps.
// Each depth follows the pointer a little more than the one behind it.

type Pt = [number, number];
// The Elder Futhark, as the app draws them behind the Folio (horadric.dev,
// crates/horadric-ui/src/sparks.rs): strokes in a box 0 to 1 tall, top down.
const FUTHARK: Pt[][][] = [
  [[[-0.15, 0], [-0.15, 1]], [[-0.15, 0.3], [0.25, 0]], [[-0.15, 0.55], [0.25, 0.25]]],
  [[[-0.2, 1], [-0.2, 0], [0.2, 0.3], [0.2, 1]]],
  [[[-0.15, 0], [-0.15, 1]], [[-0.15, 0.25], [0.22, 0.5], [-0.15, 0.75]]],
  [[[-0.15, 0], [-0.15, 1]], [[-0.15, 0], [0.22, 0.25]], [[-0.15, 0.3], [0.22, 0.55]]],
  [[[-0.18, 1], [-0.18, 0], [0.2, 0.22], [-0.18, 0.45], [0.2, 1]]],
  [[[0.15, 0.1], [-0.15, 0.5], [0.15, 0.9]]],
  [[[-0.2, 0], [-0.2, 1]], [[0.2, 0], [0.2, 1]], [[-0.2, 0.35], [0.2, 0.65]]],
  [[[0, 0], [0, 1]], [[-0.28, 0], [0, 0.4], [0.28, 0]]],
  [[[0, 0], [0, 1]], [[-0.28, 0.3], [0, 0], [0.28, 0.3]]],
  [[[0.2, 0], [-0.2, 0.35], [0.2, 0.65], [-0.2, 1]]],
  [[[-0.25, 0], [-0.25, 1], [0.25, 0], [0.25, 1], [-0.25, 0]]],
  [[[-0.2, 1], [0.2, 0.55], [0, 0.3], [-0.2, 0.55], [0.2, 1]]],
];

// The app's three depths, a little bigger for a whole page, and how far
// each follows the pointer, in pixels.
type Depth = { count: number; size: Pt; speed: Pt; alpha: Pt; sway: number; stroke: number; sunk: number; follow: number };
const FAR: Depth = { count: 46, size: [6, 10], speed: [3, 7], alpha: [0.09, 0.16], sway: 6, stroke: 0.16, sunk: 0.45, follow: 6 };
const MID: Depth = { count: 18, size: [14, 26], speed: [9, 20], alpha: [0.1, 0.18], sway: 18, stroke: 0.11, sunk: 0.15, follow: 16 };
const NEAR: Depth = { count: 5, size: [60, 110], speed: [26, 42], alpha: [0.05, 0.09], sway: 34, stroke: 0.06, sunk: 0, follow: 46 };

type Ember = { u: number[] };
const seeded = (n: number, salt: number): Ember[] =>
  Array.from({ length: n }, (_, i) => ({
    u: Array.from({ length: 9 }, (_, k) => {
      const x = Math.sin((i + 1) * 12.9898 + (k + 1) * 78.233 + salt * 37.719) * 43758.5453;
      return x - Math.floor(x);
    }),
  }));

const span = ([lo, hi]: Pt, k: number) => lo + (hi - lo) * k;
const rgba = (c: number[], a: number) => `rgba(${c.map((v) => Math.round(Math.min(1, v) * 255)).join(",")},${a})`;

export default function Atmosphere() {
  const back = useRef<HTMLCanvasElement>(null);
  const far = useRef<HTMLCanvasElement>(null);
  const mid = useRef<HTMLCanvasElement>(null);
  const near = useRef<HTMLCanvasElement>(null);
  const front = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero = back.current!.parentElement!.parentElement!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Smoke: one small GL program per canvas, drawn at a third of the size
    // and stretched, since smoke has no edges to lose.
    const smoke = (c: HTMLCanvasElement, isFront: boolean) => {
      const gl = c.getContext("webgl2", { premultipliedAlpha: false, alpha: true, antialias: false });
      if (!gl) return null;
      const sh = (type: number, src: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
      };
      const vs = sh(gl.VERTEX_SHADER, SMOKE_VS), fs = sh(gl.FRAGMENT_SHADER, SMOKE_FS);
      if (!vs || !fs) return null;
      const prog = gl.createProgram()!;
      gl.attachShader(prog, vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, "pos");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
      const U = (n: string) => gl.getUniformLocation(prog, n);
      const u = { res: U("res"), time: U("time"), front: U("front"), heat: U("heat"), light: U("light"), par: U("par") };
      return {
        draw(t: number) {
          gl.viewport(0, 0, c.width, c.height);
          gl.uniform2f(u.res, c.width, c.height);
          gl.uniform1f(u.time, t);
          gl.uniform1f(u.front, isFront ? 1 : 0);
          gl.uniform1f(u.heat, shared.heat);
          gl.uniform3fv(u.light, shared.light);
          const k = isFront ? 0.12 : 0.03;
          gl.uniform2f(u.par, shared.px * k, -shared.py * k);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        },
        free() {
          gl.deleteProgram(prog);
          gl.deleteShader(vs);
          gl.deleteShader(fs);
          gl.deleteBuffer(buf);
        },
      };
    };
    const smokes = [smoke(back.current!, false), smoke(front.current!, true)];

    const depths: [HTMLCanvasElement, Depth, Ember[], number][] = [
      [far.current!, FAR, seeded(FAR.count, 1), 0],
      [mid.current!, MID, seeded(MID.count, 2), 14],
      [near.current!, NEAR, seeded(NEAR.count, 3), 10],
    ];

    let w = 0, h = 0, dpr = 1, count = 1;
    const size = () => {
      w = hero.clientWidth;
      h = hero.clientHeight;
      dpr = Math.min(devicePixelRatio, 2);
      // A bigger page gets more runes, so the field reads the same.
      count = Math.max(0.5, Math.min(1.8, (w * h) / (1280 * 800)));
      for (const c of [back.current!, front.current!]) {
        c.width = Math.ceil(w / 3);
        c.height = Math.ceil(h / 3);
      }
      for (const [c] of depths) {
        c.width = Math.round(w * dpr);
        c.height = Math.round(h * dpr);
      }
    };
    // Grit shaken off the stone while it is worked, falling into the dark.
    type Grain = { x: number; y: number; vx: number; vy: number; life: number; r: number };
    let grit: Grain[] = [];
    const stoneEl = hero.querySelector(".stone");
    const shed = (dt: number) => {
      const s = shared.strain;
      if (stoneEl && s > 0.05 && grit.length < 400) {
        const b = stoneEl.getBoundingClientRect(), hb = hero.getBoundingClientRect();
        const cx = b.left - hb.left + b.width / 2, base = b.top - hb.top + b.height * 0.8;
        for (let i = 0; i < s * 6; i++) {
          grit.push({
            x: cx + (Math.random() - 0.5) * b.width * 0.5,
            y: base + (Math.random() - 0.3) * b.height * 0.1,
            vx: (Math.random() - 0.5) * 8,
            vy: Math.random() * 20,
            life: 1,
            r: 0.8 + Math.random() * 1.8,
          });
        }
      }
      for (const g of grit) {
        g.vy += 140 * dt;
        g.x += g.vx * dt;
        g.y += g.vy * dt;
        g.life -= dt * 0.7;
      }
      grit = grit.filter((g) => g.life > 0 && g.y < h + 10);
    };
    const drawGrit = (c: HTMLCanvasElement) => {
      const g = c.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (const p of grit) {
        g.fillStyle = `rgba(170,165,160,${(p.life * 0.75).toFixed(3)})`;
        g.fillRect(p.x, p.y, p.r, p.r);
      }
    };

    let raf = 0, n = 0, then = 0;
    size();
    const ro = new ResizeObserver(() => {
      size();
      if (still) raf = requestAnimationFrame(frame); // a still page draws again only when it changes size
    });
    ro.observe(hero);
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(hero);

    let tx = 0, ty = 0;
    const point = (e: PointerEvent) => {
      tx = (e.clientX / innerWidth) * 2 - 1;
      ty = (e.clientY / innerHeight) * 2 - 1;
    };
    addEventListener("pointermove", point);

    const runes = (c: HTMLCanvasElement, d: Depth, embers: Ember[], sparks: number, t: number) => {
      const g = c.getContext("2d")!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, w, h);
      g.translate(-shared.px * d.follow, -shared.py * d.follow);
      const heat = shared.heat;
      // The app's ink: the text colour leaning toward the light, more when hot.
      const ink = [0.91, 0.91, 0.93].map((v, i) => v + (shared.light[i] - v) * (0.35 + 0.4 * heat));
      g.lineCap = "round";
      g.lineJoin = "round";
      const shown = Math.round(embers.length * count);
      for (let i = 0; i < Math.min(shown, embers.length * 2); i++) {
        const { u } = embers[i % embers.length];
        const salt = i >= embers.length ? 0.37 : 0; // the second pass over the seeds, for big pages
        const sz = span(d.size, u[6]);
        const speed = span(d.speed, u[1]) * (1 + heat * 1.5);
        const margin = sz * 2;
        const travel = h + 2 * margin;
        const p = (((u[2] + salt) % 1) * travel + t * speed) % travel;
        const life = Math.sin((Math.PI * p) / travel);
        const sway = Math.sin(t * (0.2 + 0.2 * u[3]) + u[4] * Math.PI * 2) * d.sway;
        const x = ((u[5] + salt) % 1) * w + sway;
        const y = h + margin - p;
        const a = span(d.alpha, u[7]) * life * (1 - d.sunk * 0.5) * (1 + heat * 0.8);
        if (a <= 0.004) continue;
        g.strokeStyle = rgba(ink, a);
        g.lineWidth = Math.max(0.8, sz * d.stroke);
        for (const stroke of FUTHARK[Math.floor(u[8] * FUTHARK.length)]) {
          g.beginPath();
          stroke.forEach(([gx, gy], k) => (k ? g.lineTo(x + gx * sz, y - sz / 2 + gy * sz) : g.moveTo(x + gx * sz, y - sz / 2 + gy * sz)));
          g.stroke();
        }
      }
      // Sparks off the stone: specks of its light rising and flickering out.
      if (sparks) {
        g.globalCompositeOperation = "lighter";
        const hot = shared.light.map((v) => v * 0.6 + 0.4);
        for (let i = 0; i < sparks * (1 + heat); i++) {
          const r = (k: number) => { const s = Math.sin((i + 1) * (k + 3) * 91.7 + sparks) * 9431.3; return s - Math.floor(s); };
          const speed = 18 + 40 * r(1);
          const travel = h * 0.9;
          const p = (r(2) * travel + t * speed) % travel;
          const life = Math.sin((Math.PI * p) / travel);
          const x = w / 2 + (r(3) - 0.5) * Math.min(w, 760) * 0.9 + Math.sin(t * (0.5 + r(4)) + r(5) * 6) * 24;
          const y = h * 0.62 - p;
          const flick = 0.5 + 0.5 * Math.sin(t * (3 + 4 * r(6)) + r(7) * 6);
          const rad = 0.6 + 1.6 * r(8);
          g.fillStyle = rgba(hot, life * flick * 0.8);
          g.beginPath();
          g.arc(x, y, rad, 0, Math.PI * 2);
          g.fill();
        }
        g.globalCompositeOperation = "source-over";
      }
    };

    const t0 = performance.now();
    const frame = (now: number) => {
      raf = still ? 0 : requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = still ? 40 : (now - t0) / 1000;
      shared.px += (tx - shared.px) * 0.04;
      shared.py += (ty - shared.py) * 0.04;
      shared.heat *= 0.994;
      // The smoke moves slowly: every other frame is enough.
      if (n++ % 2 === 0 || still) for (const s of smokes) s?.draw(t);
      for (const [c, d, embers, sparks] of depths) runes(c, d, embers, sparks, t);
      shed(then ? Math.min(0.1, (now - then) / 1000) : 0);
      then = now;
      drawGrit(mid.current!);
      hero.style.setProperty("--px", shared.px.toFixed(4));
      hero.style.setProperty("--py", shared.py.toFixed(4));
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", point);
      ro.disconnect();
      io.disconnect();
      for (const s of smokes) s?.free();
    };
  }, []);

  return (
    <>
      <div className="air back" aria-hidden="true">
        <canvas ref={back} className="smoke" />
        <canvas ref={far} className="far" />
        <canvas ref={mid} className="mid" />
      </div>
      <div className="air front" aria-hidden="true">
        <canvas ref={near} className="near" />
        <canvas ref={front} className="wisps" />
        <div className="grain" />
      </div>
    </>
  );
}
