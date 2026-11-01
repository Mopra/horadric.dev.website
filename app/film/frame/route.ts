import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

// Where the film page (app/film) sends its frames, one PNG at a time, and
// then asks for them to be made into an MP4 with ffmpeg. Only on the dev
// server: in production this answers nothing.
export async function POST(req: Request) {
  if (process.env.NODE_ENV === "production") return new Response(null, { status: 404 });
  const url = new URL(req.url);
  const name = (url.searchParams.get("name") ?? "film").replace(/[^a-z0-9-]/gi, "");
  const out = join(process.cwd(), "film-out");
  const dir = join(out, name);

  if (url.searchParams.has("start")) {
    await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
    return new Response("ok");
  }

  if (url.searchParams.has("encode")) {
    const fps = url.searchParams.get("fps") ?? "30";
    const file = join(out, `horadric-${name}.mp4`);
    const args = [
      "-y", "-framerate", fps, "-i", join(dir, "%05d.png"),
      // CRF 20: about 15 MB for the 30 second loop, the grain still there.
      "-c:v", "libx264", "-preset", "slow", "-crf", "20",
      "-pix_fmt", "yuv420p", "-movflags", "+faststart", file,
    ];
    // FFMPEG names ffmpeg when the dev server's PATH does not have it.
    const why = await new Promise<string>((done) => {
      // windowsHide: started from a server with no console of its own,
      // ffmpeg otherwise fails to start on Windows (0xC0000142).
      const p = spawn(process.env.FFMPEG ?? "ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"], windowsHide: true });
      let err = "";
      p.stderr.on("data", (d) => (err += d));
      p.on("close", (c) => done(c === 0 ? "" : err.slice(-400) || `ffmpeg exited ${c}`));
      p.on("error", (e) => done(`could not start ffmpeg: ${e.message}`));
    });
    return Response.json({ ok: !why, file, why });
  }

  const i = Number(url.searchParams.get("i"));
  await writeFile(join(dir, `${String(i).padStart(5, "0")}.png`), Buffer.from(await req.arrayBuffer()));
  return new Response("ok");
}
