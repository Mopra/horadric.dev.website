"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The frame around a vignette. Its animations run only while it is on screen:
// it carries data-seen then, and explain.css pauses everything inside without it.
export default function Seen({ children }: { children: ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = frame.current!;
    const io = new IntersectionObserver((es) => el.toggleAttribute("data-seen", es[es.length - 1].isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div className="vignette" ref={frame} aria-hidden="true">
      {children}
    </div>
  );
}
