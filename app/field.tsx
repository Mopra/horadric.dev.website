"use client";

import { useEffect, useRef } from "react";

// The server renders the squares dark; the browser brings them to life. Their
// states change several times a second, so the DOM is driven directly rather
// than through React state.
const SQUARES = 48;
const PHONE_SQUARES = 40;

type State = "off" | "work" | "wait" | "done";
type Agent = { el: HTMLButtonElement; state: State; timer?: number };

export default function Field() {
  const field = useRef<HTMLElement>(null);
  const count = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Each square is an agent. Working ones flicker with activity; now and then
    // one stops and waits for you, and a click sends it back to work.
    const n = matchMedia("(max-width: 520px)").matches ? PHONE_SQUARES : SQUARES;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(field.current!.children).slice(0, n) as HTMLButtonElement[];
    const agents: Agent[] = els.map((el) => ({ el, state: Math.random() < 0.8 ? "work" : "off" }));
    const timers: number[] = [];

    const paint = (a: Agent) => {
      a.el.className = "a " + a.state;
      a.el.tabIndex = a.state === "wait" ? 0 : -1;
      a.el.setAttribute("aria-label", a.state === "wait" ? "agent waiting, answer it" : "agent");
    };

    const tally = () => {
      const working = agents.filter((a) => a.state === "work").length;
      const waiting = agents.filter((a) => a.state === "wait").length;
      count.current!.innerHTML =
        `${working} agents working. ` +
        (waiting ? `<b>${waiting} need${waiting === 1 ? "s" : ""} you.</b>` : "none need you.");
    };

    const answer = (a: Agent) => {
      if (a.state !== "wait") return;
      clearTimeout(a.timer);
      a.state = "done";
      paint(a);
      tally();
      timers.push(window.setTimeout(() => { a.state = "work"; paint(a); tally(); }, 600));
    };

    const onClick = (e: MouseEvent) => {
      const a = agents.find((x) => x.el === e.target);
      if (a) answer(a);
    };
    field.current!.addEventListener("click", onClick);

    // Activity: working squares change brightness in small steps, like drive lights.
    const flicker = () => {
      for (const a of agents) {
        if (a.state === "work" && Math.random() < 0.18) {
          a.el.style.setProperty("--l", 18 + Math.floor(Math.random() * 5) * 14 + "%");
        }
      }
    };

    const call = () => {
      if (agents.filter((a) => a.state === "wait").length < 2) {
        const working = agents.filter((a) => a.state === "work");
        const a = working[Math.floor(Math.random() * working.length)];
        if (a) {
          a.state = "wait";
          paint(a);
          // Nobody answering? It gets answered anyway, so the field never freezes.
          a.timer = window.setTimeout(() => answer(a), 9000);
        }
      }
      // Agents start and stop too.
      const b = agents[Math.floor(Math.random() * n)];
      if (b.state === "off") b.state = "work";
      else if (b.state === "work" && Math.random() < 0.3) b.state = "off";
      paint(b);
      tally();
      timers.push(window.setTimeout(call, 2200 + Math.random() * 2600));
    };

    agents.forEach(paint);
    flicker();
    tally();
    const flickering = reduced ? 0 : window.setInterval(flicker, 140);
    timers.push(window.setTimeout(call, 1200));

    const el = field.current!;
    return () => {
      el.removeEventListener("click", onClick);
      clearInterval(flickering);
      timers.forEach(clearTimeout);
      agents.forEach((a) => clearTimeout(a.timer));
    };
  }, []);

  return (
    <>
      <main className="field" ref={field} aria-label="Your agents">
        {Array.from({ length: SQUARES }, (_, i) => (
          <button key={i} className="a" tabIndex={-1} aria-label="agent" />
        ))}
      </main>
      <p className="count" ref={count} aria-live="polite" />
    </>
  );
}
