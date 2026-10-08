"use client";

import { useState } from "react";

// An install command, copied with a click. On a Mac it is the curl line, since a
// browser download would be quarantined by Gatekeeper and curl's is not.
export default function Copy({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="copy"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        });
      }}
      aria-label={label}
    >
      <code>{text}</code>
      <span>{copied ? "copied" : "copy"}</span>
    </button>
  );
}
