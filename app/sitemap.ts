import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://horadric.dev", changeFrequency: "weekly", priority: 1 },
    { url: "https://horadric.dev/privacy", changeFrequency: "yearly", priority: 0.2 },
  ];
}
