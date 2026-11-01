// The rune stone, ray marched. Ported from the app's own icon source,
// horadric.dev/crates/horadric-ui/assets/icon/stone.html, with its sliders fixed at
// the values the icon is baked with. Added here: time, so the cuts shimmer, and
// `hot`, the face under the pointer, whose rune burns brighter.

export const VS = `#version 300 es
in vec2 pos; void main() { gl_Position = vec4(pos, 0, 1); }`;

export const FS = `#version 300 es
precision highp float;
uniform vec2 res;
uniform vec3 lightCol;
uniform float yaw, pitch, glowK, hot, time;
const float LENS = .25; // smaller is closer; stone.tsx picks with the same lens
out vec4 frag;

const float rough = 100. / 60.;
const float chips = 40. / 55.;
const float seed = 11. * 3.7;

float h31(vec3 p) { p = fract(p * .3183099 + .1); p *= 17.; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3. - 2. * f);
  return mix(mix(mix(h31(i), h31(i + vec3(1,0,0)), f.x), mix(h31(i + vec3(0,1,0)), h31(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(h31(i + vec3(0,0,1)), h31(i + vec3(1,0,1)), f.x), mix(h31(i + vec3(0,1,1)), h31(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { float a = .5, s = 0.; for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; } return s; }
float ridged(vec3 p) { float a = .5, s = 0.; for (int i = 0; i < 4; i++) { float n = 1. - abs(vnoise(p) * 2. - 1.); s += a * n * n; p = p * 2.1 + 3.3; a *= .5; } return s; }

float seg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
float glyph(vec2 p, int g) {
  float d = 1e3;
  if (g == 0) { d = min(d, seg(p, vec2(0,-1), vec2(0,1))); d = min(d, seg(p, vec2(0,.2), vec2(-.62,.82))); d = min(d, seg(p, vec2(0,.2), vec2(.62,.82))); d = min(d, seg(p, vec2(-.42,-.5), vec2(.42,-.5))); }
  else if (g == 1) { d = min(d, seg(p, vec2(-.6,.9), vec2(.6,-.9))); d = min(d, seg(p, vec2(.6,.9), vec2(-.6,-.9))); d = min(d, seg(p, vec2(-.6,.9), vec2(.6,.9))); d = min(d, seg(p, vec2(-.6,-.9), vec2(.6,-.9))); }
  else if (g == 2) { d = min(d, seg(p, vec2(-.7,1), vec2(-.7,-1))); d = min(d, seg(p, vec2(-.7,.45), vec2(.7,1))); d = min(d, seg(p, vec2(-.7,-.15), vec2(.7,.4))); d = min(d, seg(p, vec2(.7,-1), vec2(.05,-.45))); }
  else if (g == 3) { d = min(d, seg(p, vec2(0,1), vec2(.62,0))); d = min(d, seg(p, vec2(.62,0), vec2(0,-1))); d = min(d, seg(p, vec2(0,-1), vec2(-.62,0))); d = min(d, seg(p, vec2(-.62,0), vec2(0,1))); d = min(d, seg(p, vec2(0,1), vec2(0,-1))); }
  else if (g == 4) { d = min(d, seg(p, vec2(-.8,-.7), vec2(0,.9))); d = min(d, seg(p, vec2(0,.9), vec2(.8,-.7))); d = min(d, seg(p, vec2(.8,-.7), vec2(-.8,-.7))); d = min(d, seg(p, vec2(0,.9), vec2(0,-.2))); }
  else { d = min(d, seg(p, vec2(-.7,.85), vec2(.7,.3))); d = min(d, seg(p, vec2(.7,.3), vec2(-.7,-.25))); d = min(d, seg(p, vec2(-.7,-.25), vec2(.7,-.8))); d = min(d, seg(p, vec2(0,1), vec2(0,-1))); }
  return d;
}
// The face a point is nearest: 0 +x, 1 -x, 2 +y, 3 -y, 4 +z, 5 -z.
int faceOf(vec3 p) {
  vec3 a = abs(p);
  if (a.y >= a.x && a.y >= a.z) return p.y > 0. ? 2 : 3;
  if (a.x >= a.z) return p.x > 0. ? 0 : 1;
  return p.z > 0. ? 4 : 5;
}
// Distance, in the plane of the nearest face, to that face's rune.
float runeD(vec3 p) {
  int f = faceOf(p); vec2 uv;
  if (f == 2 || f == 3) uv = vec2(p.x, -p.z * sign(p.y));
  else if (f == 0 || f == 1) uv = vec2(p.z * sign(p.x), p.y);
  else uv = vec2(-p.x * sign(p.z), p.y);
  int g = f == 0 ? 0 : f == 2 ? 1 : f == 5 ? 2 : f == 1 ? 3 : f == 4 ? 4 : 5;
  const float s = .46;
  return glyph(uv / s, g) * s;
}
const float W = .042;
float heat(vec3 p) { return float(faceOf(p)) == hot ? 1. : 0.; }

float map(vec3 p) {
  vec3 q = abs(p) - vec3(.8);
  float box = length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.) - .14;
  vec3 a = abs(p);
  float mx = max(a.x, max(a.y, a.z)), mn = min(a.x, min(a.y, a.z)), md = a.x + a.y + a.z - mx - mn;
  float edge = smoothstep(.55, .92, md);
  vec3 s = p + seed;
  float d = box;
  d += (fbm(s * 1.4) - .5) * .08 * rough;
  d += (ridged(s * 3.6) - .35) * .028 * rough;
  d += (vnoise(s * 14.) - .5) * .006 * rough;
  d += edge * max(0., fbm(s * 2.6 + 11.) - .45) * .45 * chips;
  d += (1. - smoothstep(W * .5, W, runeD(p))) * .085;
  return d;
}
vec3 normalAt(vec3 p) {
  const vec2 k = vec2(1, -1); float e = .0015;
  return normalize(k.xyy * map(p + k.xyy * e) + k.yyx * map(p + k.yyx * e) + k.yxy * map(p + k.yxy * e) + k.xxx * map(p + k.xxx * e));
}
float shadow(vec3 ro, vec3 rd) {
  float r = 1., t = .02;
  for (int i = 0; i < 48; i++) { float h = map(ro + rd * t); r = min(r, 10. * h / t); t += clamp(h, .01, .15); if (r < .002 || t > 4.) break; }
  return clamp(r, 0., 1.);
}
float occlusion(vec3 p, vec3 n) {
  float o = 0., w = 1.;
  for (int i = 1; i <= 5; i++) { float h = .025 * float(i); o += w * (h - map(p + n * h)); w *= .6; }
  return clamp(1. - 5. * o, 0., 1.);
}
vec3 aces(vec3 x) { return clamp((x * (2.51 * x + .03)) / (x * (2.43 * x + .59) + .14), 0., 1.); }

void main() {
  vec2 uv = (gl_FragCoord.xy * 2. - res) / res.y;
  float cy = cos(yaw), sy = sin(yaw), cp = cos(pitch), sp = sin(pitch);
  vec3 ro = 6.2 * vec3(cp * sy, sp, -cp * cy);
  vec3 fw = normalize(-ro), rt = normalize(cross(vec3(0,1,0), fw)), up = cross(fw, rt);
  vec3 rd = normalize(fw + (uv.x * rt + uv.y * up) * LENS);
  vec3 key = normalize(-.55 * rt + .85 * up - .35 * fw);
  vec3 rim = normalize(.75 * rt + .35 * up + .7 * fw);

  float t = 4.;
  bool hit = false;
  float glowAcc = 0.;
  for (int i = 0; i < 400; i++) {
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < .06) glowAcc += exp(-runeD(p) * 28.) * .012 * (1. + heat(p) * 1.6);
    if (d < .0006) { hit = true; break; }
    t += d * (runeD(p) < .1 ? .22 : .6);
    if (t > 9.) break;
  }
  vec3 L = lightCol;
  vec3 col = vec3(0); float alpha = 0.;
  if (hit) {
    vec3 p = ro + rd * t, n = normalAt(p);
    float ao = occlusion(p, n);
    float sh = shadow(p + n * .004, key);
    float r = runeD(p);
    float g = glowK + heat(p) * .9;
    float inCut = 1. - smoothstep(W * .45, W, r);
    float tone = fbm((p + seed) * 7.);
    vec3 alb = vec3(.016, .016, .019) * (.6 + .8 * tone);
    float dif = max(dot(n, key), 0.);
    float rimL = pow(max(dot(n, rim), 0.), 2.);
    vec3 h = normalize(key - rd);
    float spec = pow(max(dot(n, h), 0.), 28.) * .06;
    col = alb * (vec3(1., .96, .9) * 3.9 * dif * sh + vec3(.55, .65, .9) * 2.1 * rimL * ao + vec3(.5, .55, .7) * .22 * ao);
    col += vec3(1., .96, .9) * spec * sh * (1. - inCut);
    col += L * alb * 30. * exp(-r * 16.) * ao * g;
    // The cut: hot along the middle, and the heat crawls slowly along it.
    float flick = .65 + .7 * vnoise(p * 9. + seed + vec3(0., time * .7, time * .3));
    float core = 1. - smoothstep(0., W * .55, r);
    col += L * (inCut * 1.4 + core * core * 4.5) * flick * (.4 + g);
    col = mix(col, vec3(1., .93, .8) * L * 2.2, core * core * core * .2 * g);
    alpha = 1.;
  }
  col += L * glowAcc * (.35 + glowK) * .8;
  alpha = max(alpha, clamp(glowAcc * 3. * (.35 + glowK), 0., 1.));
  col = aces(col);
  col = pow(col, vec3(1. / 2.2));
  frag = vec4(col, alpha);
}`;
