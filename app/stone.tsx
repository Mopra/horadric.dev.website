"use client";

import { useEffect, useRef, useState } from "react";
import { RUNES, type Rgb, type Rune } from "./runes";
import { FS, VS } from "./stone-shader";

const GOLD: Rgb = [1, 0.62, 0.2];
const CYCLE: Rgb[] = [GOLD, ...RUNES.map((r) => r.light)];

const TURN = (Math.PI * 2) / 80; // one turn every 80 seconds
const PITCH = (25 * Math.PI) / 180;
const PITCH_MIN = (-40 * Math.PI) / 180;
const PITCH_MAX = (65 * Math.PI) / 180;
const LENS = 0.25; // as in the shader
const HALF = 0.94; // the stone's half width, for picking a face
const FRAME_MS = 33; // the stone turns slowly; thirty frames a second is plenty
const MAX_PX = 760;
const MIN_PX = 280;

const mix = (a: Rgb, b: Rgb, k: number): Rgb => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const ease = (k: number) => k * k * (3 - 2 * k);

// The face of the stone under a point of the canvas, -1 for none: the shader's
// camera, followed in JS to the stone's box.
function pick(x: number, y: number, yaw: number, pitch: number): number {
  const ux = x * 2 - 1, uy = 1 - y * 2;
  const cy = Math.cos(yaw), sy = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
  const ro = [6.2 * cp * sy, 6.2 * sp, -6.2 * cp * cy];
  const fl = Math.hypot(ro[0], ro[1], ro[2]);
  const fw = [-ro[0] / fl, -ro[1] / fl, -ro[2] / fl];
  let rt = [fw[2], 0, -fw[0]]; // cross((0,1,0), fw)
  const rl = Math.hypot(rt[0], rt[2]);
  rt = [rt[0] / rl, 0, rt[2] / rl];
  const up = [fw[1] * rt[2] - fw[2] * rt[1], fw[2] * rt[0] - fw[0] * rt[2], fw[0] * rt[1] - fw[1] * rt[0]];
  const rd = [0, 1, 2].map((i) => fw[i] + (ux * rt[i] + uy * up[i]) * LENS);
  let near = -Infinity, far = Infinity, axis = -1;
  for (let i = 0; i < 3; i++) {
    const t1 = (-HALF - ro[i]) / rd[i], t2 = (HALF - ro[i]) / rd[i];
    const lo = Math.min(t1, t2), hi = Math.max(t1, t2);
    if (lo > near) { near = lo; axis = i; }
    far = Math.min(far, hi);
  }
  if (near > far || far < 0) return -1;
  const v = ro[axis] + rd[axis] * near;
  return axis === 0 ? (v > 0 ? 0 : 1) : axis === 1 ? (v > 0 ? 2 : 3) : v > 0 ? 4 : 5;
}

export default function Stone() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);
  const [rune, setRune] = useState<Rune | null>(null);

  useEffect(() => {
    const c = canvas.current!;
    const gl = c.getContext("webgl2", { premultipliedAlpha: false, alpha: true, antialias: false });
    if (!gl) return; // the baked stone stays
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const u = { res: U("res"), light: U("lightCol"), yaw: U("yaw"), pitch: U("pitch"), glow: U("glowK"), hot: U("hot"), time: U("time") };

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let yaw = 0.9, spin = TURN, pitchOff = 0, hot = -1, near = 0;
    let light: Rgb = GOLD, from: Rgb = GOLD, to: Rgb = GOLD, shiftAt = 0, holdUntil = 0, cycle = 0;
    let dirty = true, visible = true, raf = 0, last = 0, prev = 0, slow = 0, frames = 0;
    // A weak GPU drops the resolution until it keeps up.
    let scale = 1;

    const size = () => {
      const css = c.clientWidth || 1;
      const px = Math.round(Math.max(MIN_PX, Math.min(MAX_PX, css * Math.min(devicePixelRatio, 2)) * scale));
      if (c.width !== px) { c.width = c.height = px; dirty = true; }
    };
    const ro = new ResizeObserver(size);
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(c);

    const shift = (next: Rgb, now: number) => { from = light; to = next; shiftAt = now; };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) { prev = 0; return; }
      if (now - last < FRAME_MS) return;
      const dt = Math.min(0.1, prev ? (now - prev) / 1000 : 0);
      // Frames that come far slower than asked mean the GPU is struggling.
      if (prev && now - prev > 70) slow++;
      if (++frames % 30 === 0) {
        if (slow > 10 && scale > 0.4) { scale *= 0.8; size(); }
        slow = 0;
      }
      prev = now;
      last = now;

      if (!still && !drag) {
        yaw += spin * dt;
        spin += (TURN - spin) * Math.min(1, dt * 0.8); // a flung stone settles back to its slow turn
        pitchOff *= 1 - Math.min(1, dt * 0.25);
      }
      if (!still) {
        if (now > holdUntil && now - shiftAt > 11000) { cycle = (cycle + 1) % CYCLE.length; shift(CYCLE[cycle], now); }
        dirty = true;
      }
      const k = Math.min(1, (now - shiftAt) / 2600);
      const next = mix(from, to, ease(k));
      if (next.some((v, i) => v !== light[i])) {
        light = next;
        dirty = true;
        c.parentElement!.style.setProperty("--light", `rgb(${light.map((v) => Math.round(v * 255)).join(",")})`);
      }
      if (!dirty) return;
      dirty = false;

      const pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, PITCH + (still ? 0 : Math.sin(now / 9000) * 0.06) + pitchOff));
      view.yaw = yaw;
      view.pitch = pitch;
      const breath = still ? 0 : (Math.sin(now / 2400) + 1) * 0.04;
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(u.res, c.width, c.height);
      gl.uniform3fv(u.light, light);
      gl.uniform1f(u.yaw, yaw);
      gl.uniform1f(u.pitch, pitch);
      gl.uniform1f(u.glow, 0.04 + breath + near * 0.25);
      gl.uniform1f(u.hot, hot);
      gl.uniform1f(u.time, still ? 0 : now / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (frames === 1) setLive(true);
    };
    const view = { yaw, pitch: PITCH };

    // Drag to turn it, flick to spin it, click a rune to hear it.
    let drag = false, moved = 0, lx = 0, ly = 0, lt = 0, finger = -1;
    const at = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      return pick((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, view.yaw, view.pitch);
    };
    const down = (e: PointerEvent) => {
      if (drag) return; // a second finger
      finger = e.pointerId;
      drag = true; moved = 0; lx = e.clientX; ly = e.clientY; lt = e.timeStamp;
      try { c.setPointerCapture(e.pointerId); } catch {} // a pointer already gone
    };
    const move = (e: PointerEvent) => {
      if (drag && e.pointerId !== finger) return;
      if (drag) {
        const dx = e.clientX - lx, dy = e.clientY - ly, dt = Math.max(1, e.timeStamp - lt) / 1000;
        moved += Math.abs(dx) + Math.abs(dy);
        yaw -= dx * 0.008;
        spin = Math.max(-6, Math.min(6, (-dx * 0.008) / dt));
        pitchOff = Math.max(PITCH_MIN - PITCH, Math.min(PITCH_MAX - PITCH, pitchOff + dy * 0.006));
        lx = e.clientX; ly = e.clientY; lt = e.timeStamp;
        dirty = true;
      }
      const f = at(e);
      if (f !== hot) { hot = f; dirty = true; }
      near = f < 0 ? 0 : 1;
      c.style.cursor = drag ? "grabbing" : f < 0 ? "default" : "grab";
    };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== finger) return;
      drag = false;
      // Held still before letting go: no fling.
      if (e.type === "pointercancel" || e.timeStamp - lt > 80) spin = TURN;
      if (e.type === "pointercancel") return;
      if (moved > 6) { if (Math.abs(spin) < TURN) spin = TURN; return; }
      spin = TURN;
      const f = at(e);
      const r = RUNES.find((r) => r.face === f);
      if (!r) return;
      setRune(r);
      shift(r.light, performance.now());
      holdUntil = performance.now() + 14000;
    };
    const leave = () => { if (!drag) { hot = -1; near = 0; dirty = true; } };
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    c.addEventListener("pointerleave", leave);
    // A GPU reset blanks the canvas: show the baked stone again and stop drawing.
    const lost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; setLive(false); };
    c.addEventListener("webglcontextlost", lost);
    size();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      c.removeEventListener("webglcontextlost", lost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
      ro.disconnect();
      io.disconnect();
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
      c.removeEventListener("pointerleave", leave);
    };
  }, []);

  const tint = rune ? `rgb(${rune.light.map((v) => Math.round(v * 255)).join(",")})` : undefined;
  return (
    <>
      <div className={live ? "stone live" : "stone"}>
        {/* The baked stone shows until the live one has drawn, and stays where WebGL2 is missing. */}
        <img src="/stone.png" alt="" aria-hidden="true" />
        <canvas ref={canvas} role="img" aria-label="The Horadric rune stone. Drag to turn it; touch a rune to hear it." />
      </div>
      <p className="speaks" aria-live="polite">
        {rune ? (
          <span key={rune.name}>
            <b style={{ color: tint }}>{rune.name}</b>
            {rune.line}
            {rune.note && <i>{rune.note}</i>}
          </span>
        ) : (
          <span className="hint">turn the stone. touch a rune.</span>
        )}
      </p>
    </>
  );
}
