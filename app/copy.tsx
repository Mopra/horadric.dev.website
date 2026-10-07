"use client";

import { useState } from "react";

// The one line a Mac needs, copied with a click. A browser download would be
// quarantined by Gatekeeper; curl's is not.
export default function Copy({ text }: { text: string }) {
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
      aria-label="Copy the install command for macOS"
    >
      <code>{text}</code>
      <span>{copied ? "copied" : "copy"}</span>
    </button>
  );
}
