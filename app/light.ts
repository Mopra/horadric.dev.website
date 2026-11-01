import type { Rgb } from "./runes";

// What the stone and the air around it share: the stone's light, how hot it
// burns after a rune is touched, and where the pointer is, eased, from -1 to 1
// on each axis. The stone writes the light; the atmosphere reads it.
export const shared: { light: Rgb; heat: number; px: number; py: number } = {
  light: [1, 0.62, 0.2],
  heat: 0,
  px: 0,
  py: 0,
};
