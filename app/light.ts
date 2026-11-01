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
