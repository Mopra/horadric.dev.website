import type { Rgb } from "./runes";

// What the stone and the air around it share: the stone's light, how hot it
// burns after a rune is touched, how hard it is being pushed, and where the
// pointer is, eased, from -1 to 1 on each axis. The stone writes the light
// and the strain; the atmosphere reads them.
export const shared: { light: Rgb; heat: number; strain: number; px: number; py: number } = {
  light: [1, 0.62, 0.2],
  heat: 0,
  strain: 0, // how hard the stone is being worked, 0 to 1
  px: 0,
  py: 0,
};

// Filming: the page at /film loads the site with ?film, where a stepped
// clock stands in for the real one (see layout.tsx) and this script, given
// the time in seconds, sets what the stone and the air would otherwise
// choose for themselves. Unset on the live site.
export type Scene = { yaw: number; pitch: number; light: Rgb; ignite: number[]; px: number; py: number };
export const filming = (): ((t: number) => Scene) | undefined =>
  typeof window === "undefined" ? undefined : (window as unknown as { __film?: { script?: (t: number) => Scene } }).__film?.script;
