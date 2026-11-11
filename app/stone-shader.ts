// The rune stone, ray marched. Ported from the app's own icon source,
// horadric.dev/crates/horadric-ui/assets/icon/stone.html, with its sliders fixed at
// the values the icon is baked with. Added here: time, so the cuts shimmer, and
// `ignite`, how far each face's rune has caught fire, from 0 to 1: each
// face burns up and dies down on its own, so moving between runes crossfades.

export const VS = `#version 300 es
in vec2 pos; void main() { gl_Position = vec4(pos, 0, 1); }`;

export const FS = `#version 300 es
precision highp float;
uniform vec2 res;
uniform vec3 lightCol;
uniform float yaw, pitch, glowK, time;
uniform float ignite[6];
// Always 0, but the compiler can't know it. Every loop starts from it, so
// Direct3D's compiler (behind Chrome and Edge on Windows) keeps them loops
// instead of unrolling each one into a copy of map() per step: unrolled,
// this shader took twenty seconds to compile.
uniform int zero;
const float LENS = .25; // smaller is closer; stone.tsx picks with the same lens
// One output only. With a second one for depth, Direct3D compiled the whole
// shader a second time at the first frame, and the page froze for a second.
// So the alpha byte carries both, for the lens pass to take apart: below 128
// it is empty air and its glow, from 128 up it is stone and how far it is.
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
float fbm(vec3 p) { float a = .5, s = 0.; for (int i = zero; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec3(1.7, 9.2, 3.1); a *= .5; } return s; }
float ridged(vec3 p) { float a = .5, s = 0.; for (int i = zero; i < 4; i++) { float n = 1. - abs(vnoise(p) * 2. - 1.); s += a * n * n; p = p * 2.1 + 3.3; a *= .5; } return s; }

float seg(vec2 p, vec2 a, vec2 b) { vec2 pa = p - a, ba = b - a; float h = clamp(dot(pa, ba) / dot(ba, ba), 0., 1.); return length(pa - ba * h); }
// The six runes, five strokes each (from.xy, to.zw); a rune of four repeats
// its last. A table and one loop, not a branch per rune: the branches were
// half of the shader's compile time.
const vec4 SEG[30] = vec4[30](
  vec4(0,-1,0,1), vec4(0,.2,-.62,.82), vec4(0,.2,.62,.82), vec4(-.42,-.5,.42,-.5), vec4(-.42,-.5,.42,-.5),
  vec4(-.6,.9,.6,-.9), vec4(.6,.9,-.6,-.9), vec4(-.6,.9,.6,.9), vec4(-.6,-.9,.6,-.9), vec4(-.6,-.9,.6,-.9),
  vec4(-.7,1,-.7,-1), vec4(-.7,.45,.7,1), vec4(-.7,-.15,.7,.4), vec4(.7,-1,.05,-.45), vec4(.7,-1,.05,-.45),
  vec4(0,1,.62,0), vec4(.62,0,0,-1), vec4(0,-1,-.62,0), vec4(-.62,0,0,1), vec4(0,1,0,-1),
  vec4(-.8,-.7,0,.9), vec4(0,.9,.8,-.7), vec4(.8,-.7,-.8,-.7), vec4(0,.9,0,-.2), vec4(0,.9,0,-.2),
  vec4(-.7,.85,.7,.3), vec4(.7,.3,-.7,-.25), vec4(-.7,-.25,.7,-.8), vec4(0,1,0,-1), vec4(0,1,0,-1));
float glyph(vec2 p, int g) {
  float d = 1e3;
  for (int i = zero; i < 5; i++) { vec4 s = SEG[g * 5 + i]; d = min(d, seg(p, s.xy, s.zw)); }
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
float heat(vec3 p) { return ignite[faceOf(p)]; }
// Flame noise: rising in the world, whichever way the face is turned.
// Stretched upward, so it reads as tongues and not as a boil.
// Slow: the fire of an old spell, not a blaze.
float flame(vec3 p) {
  vec3 q = vec3(p.x * 6., p.y * 2.6 - time * .6, p.z * 6.) + seed;
  return vnoise(q) * .6 + vnoise(q * 2.2 + vec3(0., -time * .45, 0.)) * .4;
}
// The veil behind the tongues: coarser, slower still.
float veil(vec3 p) {
  vec3 q = vec3(p.x * 2.6, p.y * 1.4 - time * .28, p.z * 2.6) + seed * 1.7;
  return vnoise(q) * .65 + vnoise(q * 2.1 + vec3(0., -time * .2, 0.)) * .35;
}

// The rune distance at the point map() was last asked about, so the march
// need not work it out again.
float runeAt;
float map(vec3 p) {
  vec3 q = abs(p) - vec3(.8);
  float box = length(max(q, 0.)) + min(max(q.x, max(q.y, q.z)), 0.) - .14;
  // Far from the stone its roughness cannot matter: the plain box will do.
  if (box > .3) { runeAt = 1.; return box; }
  vec3 a = abs(p);
  float mx = max(a.x, max(a.y, a.z)), mn = min(a.x, min(a.y, a.z)), md = a.x + a.y + a.z - mx - mn;
  float edge = smoothstep(.55, .92, md);
  vec3 s = p + seed;
  float d = box;
  d += (fbm(s * 1.4) - .5) * .08 * rough;
  d += (ridged(s * 3.6) - .35) * .028 * rough;
  d += (vnoise(s * 14.) - .5) * .006 * rough;
  d += edge * max(0., fbm(s * 2.6 + 11.) - .45) * .45 * chips;
  runeAt = runeD(p);
  d += (1. - smoothstep(W * .5, W, runeAt)) * .085;
  return d;
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

  // Only rays through the box that holds the stone and its glow are marched,
  // and from where they enter it.
  vec3 bi = 1. / rd, b1 = (-1.1 - ro) * bi, b2 = (1.1 - ro) * bi, blo = min(b1, b2), bhi = max(b1, b2);
  float t = max(4., max(max(blo.x, blo.y), blo.z)), tEnd = min(9., min(min(bhi.x, bhi.y), bhi.z));
  bool hit = false;
  float glowAcc = 0.;
  // One loop does it all, a phase at a time: the march to the stone (0), then
  // at the hit its normal (1), its occlusion (2) and its shadow (3). That way
  // map() is called from one place. The Direct3D compiler copies it into
  // every place it is called from, and each copy cost over half a second.
  int phase = 0, k = 0;
  vec3 p = vec3(0), n = vec3(0), e = vec3(0);
  float r = 0., ao = 0., aw = 1., ah = 0., sh = 1., st = .02;
  for (int i = zero; i < 460; i++) {
    vec3 q;
    if (phase == 0) { if (t > tEnd || i >= 400) break; q = ro + rd * t; }
    // The tetrahedron normal. The step is a little wider than a pixel's
    // grain, so the finest bumps don't shimmer.
    else if (phase == 1) { e = .5773 * (2. * vec3(float(((k + 3) >> 1) & 1), float((k >> 1) & 1), float(k & 1)) - 1.); q = p + e * .0024; }
    else if (phase == 2) { ah = .025 * float(k); q = p + n * ah; }
    else q = p + n * .004 + key * st;
    float d = map(q);
    if (phase == 0) {
      // A burning rune's halo is ragged and flickers, never a smooth bloom.
      if (d < .06) glowAcc += exp(-runeAt * 22.) * .012 * (1. + heat(q) * (veil(q) * .9 - .2));
      if (d < .0006) { hit = true; p = q; r = runeAt; phase = 1; k = 0; }
      else t += d * (runeAt < .1 ? .22 : .6);
    } else if (phase == 1) {
      n += e * d;
      if (++k == 4) { n = normalize(n); phase = 2; k = 1; }
    } else if (phase == 2) {
      ao += aw * (ah - d); aw *= .6;
      if (++k > 5) { ao = clamp(1. - 6.5 * ao, 0., 1.); phase = 3; k = 0; }
    } else {
      sh = min(sh, 7. * d / st); st += clamp(d, .01, .15);
      if (sh < .002 || st > 4. || ++k >= 48) break;
    }
  }
  sh = clamp(sh, 0., 1.);
  vec3 L = lightCol;
  vec3 col = vec3(0); float alpha = 0.;
  if (hit) {
    float hp = heat(p);
    float g = glowK + hp * .15;
    float inCut = 1. - smoothstep(W * .45, W, r);
    float tone = fbm((p + seed) * 7.);
    // Basalt, darker than the icon's, with a faint mineral fleck.
    vec3 alb = vec3(.011, .011, .013) * (.55 + .9 * tone);
    float fleck = smoothstep(.74, .92, vnoise((p + seed) * 60.));
    // A stone in a dark room: a low raking key so every crag throws its
    // shadow, a cold thin rim only at the grazing edges to part it from the
    // dark, almost nothing from below, and the runes' own warm light.
    float nk = dot(n, key);
    float dif = mix(max(nk, 0.), max((nk + .25) / 1.25, 0.), .3);
    float graze = pow(1. - max(dot(n, -rd), 0.), 3.);
    float rimL = graze * max(dot(n, rim), 0.);
    float sky = .5 + .5 * n.y;
    vec3 hv = normalize(key - rd);
    float rough = mix(.3, .85, tone);
    float spec = pow(max(dot(n, hv), 0.), mix(70., 14., rough)) * mix(.1, .025, rough);
    col = alb * (vec3(1., .93, .84) * 1.8 * dif * sh
               + vec3(.5, .6, .88) * 2.6 * rimL * ao
               + vec3(.45, .5, .62) * .1 * sky * ao * ao);
    col += vec3(1., .95, .88) * spec * (1. + fleck * 5.) * sh * (1. - inCut);
    float fl = flame(p);
    // The runes light the stone around them: hot close by, then a wide soft spill.
    col += L * alb * ao * (24. * exp(-r * 12.) + 5. * exp(-r * 3.)) * (g + .1 + hp * fl * .25);
    // The cut: hot along the middle, and the heat crawls slowly along it.
    float flick = .65 + .7 * vnoise(p * 9. + seed + vec3(0., time * .7, time * .3));
    float core = 1. - smoothstep(0., W * .55, r);
    col += L * (inCut * 1.4 + core * core * 4.5) * flick * (.4 + g);
    col = mix(col, vec3(1., .93, .8) * L * 2.2, core * core * core * .2 * g);
    // Fire: tongues licking up out of the cut, ragged where the noise
    // reaches far, white hot at the root, deep and red at the tips.
    if (hp > 0.) {
      // Fire rises: a point burns if the cut lies close below it, so the
      // flames stand up off the rune instead of ringing it.
      // Looked for at two heights picked by a fine rising noise, so the
      // fire comes apart into wisps instead of copies of the rune.
      float below = 1e3;
      for (int i = zero; i < 2; i++) {
        float hz = vnoise(vec3(p.x * 34., p.y * 9. - time * .7, p.z * 34.) + float(i) * 17.3);
        float k = W * (.8 + 5.5 * hz * hz);
        below = min(below, runeD(p - vec3(0., k, 0.)) + k * .3);
      }
      float dF = min(r, below) - (fl - .5) * W * 3.;
      float f = pow(clamp(1. - (dF - W * .3) / (W * 2.2), 0., 1.), 2.4);
      // Behind the tongues, a wide dim veil, so the fire has depth.
      float vl = veil(p);
      float dV = min(r, below) - (vl - .5) * W * 6.;
      float v = pow(clamp(1. - (dV - W * .2) / (W * 4.), 0., 1.), 2.);
      float breathe = .8 + .2 * sin(time * .9 + fl * 3.);
      vec3 ember = L * vec3(.8, .42, .32) * .45;
      vec3 tip = L * vec3(1., .4, .2) * .5, body = L * .9, root = L * 1.25 + vec3(.06, .05, .03);
      vec3 fire = f < .5 ? mix(tip, body, f * 2.) : mix(body, root, f * 2. - 1.);
      col += (ember * v * .3 + fire * f * .45) * breathe * hp * (1. - inCut * .8);
    }
    alpha = 1.;
  }
  col += L * glowAcc * (.35 + glowK) * .8;
  alpha = max(alpha, clamp(glowAcc * 3. * (.35 + glowK), 0., 1.));
  col = aces(col);
  col = pow(col, vec3(1. / 2.2));
  frag = vec4(col, (hit ? 128. + floor(clamp((t - 4.) / 5., 0., .99) * 127. + .5) : floor(alpha * 127. + .5)) / 255.);
}`;

// The lens: the stone, drawn once with its depth, is blurred here only where
// it lies far from the eye, as a camera focused on its near corner would.
// A disk of taps, so bright specks in the blur open into soft discs.
export const LENS_FS = `#version 300 es
precision highp float;
uniform sampler2D col;
uniform vec2 res;
uniform float maxR;
out vec4 o;

// From 0 in focus to 1 fully soft, by distance along the ray.
float coc(float d) { return d >= .999 ? .25 : smoothstep(.3, .66, d); }
// A pixel of the stone pass, its alpha byte taken apart: the colour with its
// true alpha, and how far the stone is there, 1 for empty air.
vec4 tap(vec2 uv, out float d) {
  vec4 c = texture(col, uv);
  float a = c.a * 255.;
  bool stone = a > 127.5;
  d = stone ? (a - 128.) / 127. : 1.;
  c.a = stone ? 1. : a / 127.;
  return c;
}

void main() {
  vec2 uv = gl_FragCoord.xy / res;
  float d;
  vec4 c0 = tap(uv, d);
  float r = coc(d) * maxR;
  if (r < .35) { o = c0; return; }
  vec4 acc = vec4(0); float ws = 0.;
  for (int i = 0; i < 24; i++) {
    float fi = float(i) + .5;
    float a = fi * 2.39996;
    vec2 off = vec2(cos(a), sin(a)) * sqrt(fi / 24.) * r / res;
    vec4 c = tap(uv + off, d);
    // A sharp near sample must not smear over the soft far ones behind it;
    // bright ones weigh more, which is what makes bokeh.
    float w = (.1 + coc(d)) * (1. + 3. * dot(c.rgb, vec3(.3, .5, .2)));
    acc += c * w; ws += w;
  }
  o = acc / ws;
}`;
