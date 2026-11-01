"use client";

import { useEffect, useRef, useState } from "react";
import { RUNES, type Rgb, type Rune } from "./runes";
import { shared } from "./light";
import { FS, LENS_FS, VS } from "./stone-shader";

const GOLD: Rgb = [1, 0.62, 0.2];
const CYCLE: Rgb[] = [GOLD, ...RUNES.map((r) => r.light)];

const TURN = (Math.PI * 2) / 140; // one turn every two minutes and more
const PITCH = (25 * Math.PI) / 180;
const PITCH_MIN = (-40 * Math.PI) / 180;
const PITCH_MAX = (65 * Math.PI) / 180;
const LENS = 0.25; // as in the shader
const HALF = 0.94; // the stone's half width, for picking a face
const FRAME_MS = 33; // the stone turns slowly; thirty frames a second is plenty
const MAX_PX = 1080; // above the drawn size where the GPU allows: smoother edges
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
  // No live stone is coming (no WebGL2, or it failed): the baked one rests.
  const [asleep, setAsleep] = useState(false);
  const [rune, setRune] = useState<Rune | null>(null);

  useEffect(() => {
    const c = canvas.current!;
    const gl = c.getContext("webgl2", { premultipliedAlpha: false, alpha: true, antialias: false });
    if (!gl) { setAsleep(true); return; } // the baked stone stays
    // Compiled in the background where the browser can, so the page stays
    // alive and the baked stone shows until the live one is ready.
    const shader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const vs = shader(gl.VERTEX_SHADER, VS), fs = shader(gl.FRAGMENT_SHADER, FS), lfs = shader(gl.FRAGMENT_SHADER, LENS_FS);
    const link = (f: WebGLShader) => {
      const p = gl.createProgram()!;
      gl.attachShader(p, vs);
      gl.attachShader(p, f);
      gl.bindAttribLocation(p, 0, "pos");
      gl.linkProgram(p);
      return p;
    };
    const prog = link(fs), lens = link(lfs);
    const ext = gl.getExtension("KHR_parallel_shader_compile");
    let poll = 0;
    let stop = () => {
      gl.deleteProgram(prog);
      gl.deleteProgram(lens);
      for (const s of [vs, fs, lfs]) gl.deleteShader(s);
    };
    const wait = () => {
      const done = (q: WebGLProgram) => !ext || gl.getProgramParameter(q, ext.COMPLETION_STATUS_KHR);
      if (!done(prog) || !done(lens)) { poll = requestAnimationFrame(wait); return; }
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS) || !gl.getProgramParameter(lens, gl.LINK_STATUS)) { setAsleep(true); return; }
      stop = begin();
    };
    const begin = () => {
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      // The stone is drawn into two textures, its colour and its depth, and
      // the lens draws them to the canvas.
      const tex = () => {
        const t = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return t;
      };
      const colTex = tex(), depTex = tex();
      const fbo = gl.createFramebuffer();
      let fboPx = 0;
      const target = (px: number) => {
        if (px === fboPx) return;
        fboPx = px;
        for (const t of [colTex, depTex]) {
          gl.bindTexture(gl.TEXTURE_2D, t);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, px, px, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, colTex, 0);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT1, gl.TEXTURE_2D, depTex, 0);
        gl.drawBuffers([gl.COLOR_ATTACHMENT0, gl.COLOR_ATTACHMENT1]);
      };
      const L = (n: string) => gl.getUniformLocation(lens, n);
      const lu = { col: L("col"), dep: L("dep"), res: L("res"), maxR: L("maxR") };
      const U = (n: string) => gl.getUniformLocation(prog, n);
      const u = { res: U("res"), light: U("lightCol"), yaw: U("yaw"), pitch: U("pitch"), glow: U("glowK"), hot: U("hot"), ignite: U("ignite"), time: U("time") };

      const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
      let yaw = 0.9, spin = still ? 0 : TURN, pitchOff = 0, hot = -1, near = 0;
      // A hand on the stone: how hard it pushes the turn, and how far it means to tip it.
      let push = 0, tilt = 0, strain = 0;
      // The rune under the pointer catches slowly and dies down slowly.
      let fire = -1, ignite = 0;
      let light: Rgb = GOLD, from: Rgb = GOLD, to: Rgb = GOLD, shiftAt = 0, holdUntil = 0, cycle = 0;
      let dirty = true, visible = true, raf = 0, last = 0, prev = 0, slow = 0, frames = 0;
      // A weak GPU drops the resolution until it keeps up.
      let scale = 1;

      const size = () => {
        const css = c.clientWidth || 1;
        const px = Math.round(Math.max(MIN_PX, Math.min(MAX_PX, css * Math.min(devicePixelRatio, 2) * 1.4) * scale));
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

        // The stone is heavy. A hand only leans on it: it is slow to answer,
        // slower to stop, and a push that ends stops pushing at once.
        const before = spin;
        if (drag) {
          push *= Math.exp(-dt * 5);
          spin += (push - spin) * Math.min(1, dt * 0.7);
        } else spin += ((still ? 0 : TURN) - spin) * Math.min(1, dt * 0.16);
        pitchOff += ((drag ? tilt : 0) - pitchOff) * Math.min(1, dt * (drag ? 0.6 : 0.12));
        yaw += spin * dt;
        // How hard it is being worked: the stone trembles and sheds grit with it.
        const work = dt ? Math.min(1, (Math.abs(spin - before) / dt) * 1.6 + Math.abs(push - spin) * 0.6) : 0;
        strain += (work - strain) * Math.min(1, dt * 3);
        shared.strain = strain;
        const shake = strain > 0.02 ? strain * 1.4 : 0;
        c.parentElement!.style.setProperty("--sx", `${((Math.random() - 0.5) * shake).toFixed(2)}px`);
        c.parentElement!.style.setProperty("--sy", `${((Math.random() - 0.5) * shake).toFixed(2)}px`);
        if (Math.abs(spin) > 1e-4 || Math.abs(pitchOff) > 1e-4 || drag) dirty = true;
        if (hot >= 0 && hot !== fire) { fire = hot; ignite = 0; }
        const kindle = hot >= 0 && hot === fire ? 1 : 0;
        const was = ignite;
        ignite += (kindle - ignite) * Math.min(1, dt * (kindle ? 0.7 : 0.55));
        if (Math.abs(ignite - was) > 1e-4 || ignite > 0.01) dirty = true;
        if (!still) {
          if (now > holdUntil && now - shiftAt > 11000) { cycle = (cycle + 1) % CYCLE.length; shift(CYCLE[cycle], now); }
          dirty = true;
        }
        const k = Math.min(1, (now - shiftAt) / 2600);
        const next = mix(from, to, ease(k));
        if (next.some((v, i) => v !== light[i])) {
          light = next;
          shared.light = light;
          dirty = true;
          (c.closest(".hero") as HTMLElement ?? c.parentElement!).style.setProperty("--light", `rgb(${light.map((v) => Math.round(v * 255)).join(",")})`);
        }
        if (!dirty) return;
        dirty = false;

        const pitch = Math.max(PITCH_MIN, Math.min(PITCH_MAX, PITCH + (still ? 0 : Math.sin(now / 14000) * 0.03) + pitchOff));
        view.yaw = yaw;
        view.pitch = pitch;
        const breath = still ? 0 : (Math.sin(now / 2400) + 1) * 0.04;
        target(c.width);
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.useProgram(prog);
        gl.viewport(0, 0, c.width, c.height);
        gl.uniform2f(u.res, c.width, c.height);
        gl.uniform3fv(u.light, light);
        gl.uniform1f(u.yaw, yaw);
        gl.uniform1f(u.pitch, pitch);
        gl.uniform1f(u.glow, 0.04 + breath + near * 0.04);
        gl.uniform1f(u.hot, fire);
        gl.uniform1f(u.ignite, ignite);
        gl.uniform1f(u.time, still ? 0 : now / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // Then through the lens to the canvas.
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.useProgram(lens);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, colTex);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, depTex);
        gl.uniform1i(lu.col, 0);
        gl.uniform1i(lu.dep, 1);
        gl.uniform2f(lu.res, c.width, c.height);
        gl.uniform1f(lu.maxR, c.width * 0.0055);
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
        drag = true; push = spin; tilt = pitchOff; moved = 0; lx = e.clientX; ly = e.clientY; lt = e.timeStamp;
        try { c.setPointerCapture(e.pointerId); } catch {} // a pointer already gone
      };
      const move = (e: PointerEvent) => {
        if (drag && e.pointerId !== finger) return;
        if (drag) {
          const dx = e.clientX - lx, dy = e.clientY - ly, dt = Math.max(1, e.timeStamp - lt) / 1000;
          moved += Math.abs(dx) + Math.abs(dy);
          // However fast the hand, the stone will not be hurried past this.
          push = Math.max(-0.7, Math.min(0.7, push + ((-dx * 0.0012) / dt) * 0.25));
          tilt = Math.max(PITCH_MIN - PITCH, Math.min(PITCH_MAX - PITCH, tilt + dy * 0.0016));
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
        // Let go, it keeps what momentum it has and gives it up slowly.
        if (e.type === "pointercancel" || moved > 6) return;
        const f = at(e);
        const r = RUNES.find((r) => r.face === f);
        if (!r) return;
        setRune(r);
        shared.heat = 1;
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
      const lost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); raf = 0; setLive(false); setAsleep(true); };
      c.addEventListener("webglcontextlost", lost);
      size();
      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        c.removeEventListener("webglcontextlost", lost);
        gl.deleteProgram(prog);
        gl.deleteProgram(lens);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteShader(lfs);
        gl.deleteBuffer(buf);
        gl.deleteTexture(colTex);
        gl.deleteTexture(depTex);
        gl.deleteFramebuffer(fbo);
        ro.disconnect();
        io.disconnect();
        c.removeEventListener("pointerdown", down);
        c.removeEventListener("pointermove", move);
        c.removeEventListener("pointerup", up);
        c.removeEventListener("pointercancel", up);
        c.removeEventListener("pointerleave", leave);
      };
    };
    poll = requestAnimationFrame(wait);
    return () => {
      cancelAnimationFrame(poll);
      stop();
    };
  }, []);

  const tint = rune ? `rgb(${rune.light.map((v) => Math.round(v * 255)).join(",")})` : undefined;
  return (
    <>
      <div className={live ? "stone live" : asleep ? "stone asleep" : "stone"}>
        {/* The baked stone shows until the live one has drawn, and stays where WebGL2 is missing. */}
        <img src="/stone.png" alt="" aria-hidden="true" />
        {/* While the live stone is compiled, the baked one breathes in the dark. */}
        <p className="waking" aria-hidden="true">
          <span>the stone wakes</span>
        </p>
        <canvas ref={canvas} role="img" aria-label="The Horadric rune stone. Drag to turn it; touch a rune to hear it." />
      </div>
      <p className="speaks" aria-live="polite">
        {rune && (
          <span key={rune.name}>
            <b style={{ color: tint }}>{rune.name}</b>
            {rune.line}
            {rune.note && <i>{rune.note}</i>}
          </span>
        )}
      </p>
    </>
  );
}
