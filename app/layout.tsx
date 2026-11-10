import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const mono = Geist_Mono({ subsets: ["latin"], weight: ["300", "400"] });

const description =
  "Horadric is a free, open source agentic development environment (ADE) for Claude Code, on Windows and macOS. Every session is a tile on your desktop, and the one that needs you lights up. Talk to Claude in the Folio, join every machine you own in the Brotherhood, and follow it all from your phone through the Town Portal.";

// The page is a stone and almost no text, so the title and these tags tell search engines what it is.
export const metadata: Metadata = {
  metadataBase: new URL("https://horadric.dev"),
  title: "Horadric: an agentic development environment for Claude Code",
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Horadric: an agentic development environment for Claude Code", description, url: "/", siteName: "Horadric", type: "website" },
  twitter: { card: "summary_large_image", title: "Horadric: an agentic development environment for Claude Code", description },
};

const app = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Horadric",
  url: "https://horadric.dev",
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows 10, Windows 11, macOS 11 or later, Linux x86_64 (as a node)",
  softwareRequirements: "A Claude subscription",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  downloadUrl: "https://github.com/Mopra/horadric.dev/releases/latest",
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
  sameAs: ["https://github.com/Mopra/horadric.dev"],
};

const FILM_CLOCK = `if (/[?&]film(=|&|$)/.test(location.search)) {
  var now = 0, queue = [];
  performance.now = function () { return now; };
  window.requestAnimationFrame = function (cb) { queue.push(cb); return queue.length; };
  window.cancelAnimationFrame = function () {};
  window.__film = { script: null, step: function (ms) { now = ms; var q = queue; queue = []; q.forEach(function (cb) { cb(now); }); } };
}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mono.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
        {/* Filming (app/film): with ?film, a stepped clock stands in for the real one before anything else runs. */}
        <script dangerouslySetInnerHTML={{ __html: FILM_CLOCK }} />
        {/* Without script the stone never wakes, so the veil must not stand, and the
            vignettes never start, so they show their still picture. */}
        <noscript>
          <style>{".veil{display:none}.vignette *,.vignette *::before,.vignette *::after{animation:none!important}"}</style>
        </noscript>
        {children}
      </body>
      <GoogleAnalytics gaId="G-3FGXPB5W63" />
    </html>
  );
}
