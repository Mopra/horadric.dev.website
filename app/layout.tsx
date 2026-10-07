import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const mono = Geist_Mono({ subsets: ["latin"], weight: ["300", "400"] });

const description = "Every coding agent on your Windows desktop. The one that needs you lights up.";

// The page shows almost no text, so the title and these tags tell search engines what it is.
export const metadata: Metadata = {
  metadataBase: new URL("https://horadric.dev"),
  title: "Horadric: run every coding agent on your Windows desktop",
  description,
  alternates: { canonical: "/" },
  openGraph: { title: "Horadric", description, url: "/", siteName: "Horadric", type: "website" },
  twitter: { card: "summary_large_image", title: "Horadric", description },
};

const app = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Horadric",
  url: "https://horadric.dev",
  description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Windows",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  downloadUrl: "https://github.com/Mopra/horadric.dev/releases/latest",
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
