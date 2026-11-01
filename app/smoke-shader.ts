// Smoke, from domain warped noise rising slowly. Drawn twice: once behind
// the stone, nearly black and lit only close to it by its light, and once in
// front, a low fog that lies thickest around the stone's foot and below.

export const SMOKE_VS = `#version 300 es
in vec2 pos; void main() { gl_Position = vec4(pos, 0, 1); }`;

export const SMOKE_FS = `#version 300 es
precision highp float;
uniform vec2 res;
uniform float time, front, heat;
uniform vec3 light;
uniform vec2 par;
out vec4 frag;

float h(vec2 p) { p = fract(p * vec2(.1031, .1030)); p += dot(p, p.yx + 33.33); return fract((p.x + p.y) * p.x); }
float n(vec2 p) {
  vec2 i = floor(p), f = fract(p); f = f * f * (3. - 2. * f);
  return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float a = .5, s = 0.;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) { s += a * n(p); p = m * p; a *= .5; }
  return s;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - .5 * res) / res.y;
  float t = time * .035;
  vec2 p = uv * (front > .5 ? 1.1 : 1.7) + par + vec2(front * (13.1 + time * .03), -time * .025 * (1. - front * .7));
  vec2 q = vec2(fbm(p + vec2(0., t)), fbm(p + vec2(5.2, 1.3) - t * .7));
  vec2 r = vec2(fbm(p + 3. * q + vec2(1.7, 9.2) + t * .5), fbm(p + 3. * q + vec2(8.3, 2.8) - t * .4));
  float s = fbm(p + 2.6 * r);
  float c = length(uv * vec2(.85, 1.));

  if (front < .5) {
    // Mostly dark: only the thickest smoke shows, and only near the stone
    // does it catch the light.
    float d = pow(smoothstep(.45, 1.05, s), 1.7);
    float halo = exp(-c * c * 4.2);
    vec3 grey = vec3(.028, .03, .036);
    vec3 smoke = mix(grey, light * .2, .1 + .7 * halo) * d * (.3 + 1.1 * halo) * (1. + heat * .8);
    vec3 col = smoke + light * halo * (.006 + heat * .015);
    col *= smoothstep(1.2, .15, c); // the edges sink into the dark
    frag = vec4(col, 1.);
  } else {
    // Fog: everywhere a little, more toward the bottom, most in a bank
    // around the foot of the stone.
    float d = smoothstep(.3, .95, s);
    float low = smoothstep(-.05, -.5, uv.y);
    float bank = exp(-pow((uv.y + .27) * 3.4, 2.)) * exp(-uv.x * uv.x * 1.4);
    float a = (.25 + .75 * d) * (.04 + .55 * low + .7 * bank);
    vec3 col = mix(vec3(.15, .155, .175), light * .35, .15 + .3 * bank);
    frag = vec4(col, clamp(a, 0., 1.) * .62);
  }
}`;
