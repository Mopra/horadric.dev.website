export type Rgb = [number, number, number];
export type Rune = { face: number; name: string; line: string; note?: string; light: Rgb };

// One rune a face, each a part of Horadric. Faces as the shader numbers them:
// 0 +x, 1 -x, 2 +y (top), 3 -y (underneath, found only by turning the stone over), 4 +z, 5 -z.
export const RUNES: Rune[] = [
  { face: 2, name: "the stage", line: "every project on one desk, each with its own keys. the session that needs you lights up.", light: [1, 0.7, 0.14] },
  { face: 0, name: "the folio", line: "claude, written out on the page. rewind a prompt, fork the past, burn it all with /clear.", note: "windows for now", light: [1, 0.3, 0.2] },
  { face: 5, name: "the brotherhood", line: "every machine you own, sworn together. hand a session across, files and all.", light: [0.62, 0.42, 1] },
  { face: 1, name: "the town portal", line: "your sessions in your pocket. sealed end to end. no ports opened.", light: [0.2, 0.62, 1] },
  { face: 4, name: "the quest log", line: "name the aim. the agents walk it while you are away.", note: "windows for now", light: [0.2, 0.9, 0.5] },
  { face: 3, name: "the lore", line: "every conversation kept. the next agent already knows.", note: "windows for now", light: [1, 1, 1] },
];
