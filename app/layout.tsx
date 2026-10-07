import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const mono = Geist_Mono({ subsets: ["latin"], weight: ["300", "400"] });

const description =
  "Horadric is a free, open source app for Windows and macOS that shows every Claude Code, Codex and Grok Build session as a tile on your desktop. The one that needs you turns amber.";

// The page shows almost no text, so the title and these tags tell search engines what it is.
export const metadata: Metadata = {
  metadataBase: new URL("https://horadric.dev"),
  title: "Horadric: every Claude Code, Codex and Grok Build session on your desktop, Windows and Mac",
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Horadric: every coding agent on your desktop", description, url: "/", siteName: "Horadric", type: "website" },
  twitter: { card: "summary_large_image", title: "Horadric: every coding agent on your desktop", description },
};

const app = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Horadric",
  url: "https://horadric.dev",
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows 10, Windows 11, macOS 11 or later",
  softwareRequirements: "A Claude, Codex or xAI subscription",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  downloadUrl: "https://github.com/Mopra/horadric.dev/releases/latest",
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
  sameAs: ["https://github.com/Mopra/horadric.dev"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mono.className}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(app) }} />
        {children}
      </body>
      <GoogleAnalytics gaId="G-3FGXPB5W63" />
    </html>
  );
}
