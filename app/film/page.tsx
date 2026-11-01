import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Director from "./director";

export const metadata: Metadata = { title: "Film: Horadric", robots: { index: false, follow: false } };

// Renders the stone into a looping video, for posts. Only on the dev server.
export default function Film() {
  if (process.env.NODE_ENV === "production") notFound();
  return <Director />;
}
