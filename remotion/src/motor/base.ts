/**
 * MOTOR de animación de Tecnomono (nov-2026) · utilidades comunes.
 *
 * Todo el motor dibuja por código (SVG/CSS): sin imágenes generadas. El aspecto "cutre" sale de
 * tres trucos que se repiten en todas las piezas:
 *   1. Trazo que HIERVE: la semilla del temblor cambia cada 4 fotogramas (useBoil), como la
 *      animación dibujada a mano.
 *   2. Relleno DESCOLOCADO: el color se pinta un poco fuera de la línea (como en la hoja del mono).
 *   3. Movimiento de MARIONETA: rebote, respiración, saltito por palabra, pop con aplastamiento.
 */
import {continueRender, delayRender, Easing, interpolate, random, staticFile, useCurrentFrame} from 'remotion';

// ───────────────────────── paleta ─────────────────────────
export const C = {
  ink: '#151515',
  paper: '#FFFFFF',
  yellow: '#FFD23F',
  blue: '#5BC0EB',
  green: '#3BB273',
  red: '#E4572E',
  pink: '#FF8FB1',
  orange: '#FF9F1C',
  purple: '#9B5DE5',
  grey: '#9A9A9A',
  lightGrey: '#E4E4E4',
  gold: '#F7B32B',
  // mono
  fur: '#8A5A3B',
  face: '#B07A52',
  furDark: '#6E4529',
};
export const CHIP_COLORS = [C.yellow, C.blue, C.pink, C.green, C.orange, C.purple];

/** Nombres de color que acepta el plano (en español) → hex. Si no es un nombre, se usa tal cual. */
export const COLORES: Record<string, string> = {
  amarillo: C.yellow,
  azul: C.blue,
  verde: C.green,
  rojo: C.red,
  rosa: C.pink,
  naranja: C.orange,
  morado: C.purple,
  gris: C.grey,
  blanco: C.paper,
  negro: C.ink,
  oro: C.gold,
};
export const col = (c?: string, def: string = C.yellow) => (c ? COLORES[c] ?? c : def);

// ───────────────────────── fuente ─────────────────────────
export const FONT = 'MontserratXB';
let fontLoaded = false;
/** Carga Montserrat ExtraBold desde public/fonts (una sola vez por pestaña de render). */
export const loadFont = () => {
  if (fontLoaded || typeof document === 'undefined') return;
  fontLoaded = true;
  const h = delayRender('fuente Montserrat', {timeoutInMilliseconds: 120000, retries: 2});
  new FontFace(FONT, `url(${staticFile('fonts/Montserrat-ExtraBold.ttf')})`)
    .load()
    .then((f) => {
      document.fonts.add(f);
      continueRender(h);
    })
    .catch(() => continueRender(h));
};

// ───────────────────────── movimiento ─────────────────────────
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.6, 0, 0.3, 1);
export const overshoot = Easing.bezier(0.34, 1.7, 0.64, 1);
/** 0→1 entre t0 y t0+dur. */
export const ramp = (t: number, t0: number, dur = 0.4, e = easeOut) =>
  interpolate(t, [t0, t0 + Math.max(0.001, dur)], [0, 1], {...clamp, easing: e});
/** 0→1 con rebote (sobrepasa y vuelve): para que todo "salte" al aparecer. */
export const pop = (t: number, t0: number, dur = 0.45) => ramp(t, t0, dur, overshoot);
/** Visible entre a y b, con fundido de entrada y salida. */
export const span = (t: number, a: number, b: number, fade = 0.2) => Math.min(ramp(t, a, fade), 1 - ramp(t, b - fade, fade));
/** Impulso que decae: temblores, golpes. */
export const decay = (t: number, t0: number, k = 6) => (t >= t0 ? Math.exp(-(t - t0) * k) : 0);
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const shake = (t: number, t0: number, amp = 14, k = 6) => Math.sin((t - t0) * 55) * amp * decay(t, t0, k);

/** Trazo que "hierve": una semilla nueva cada 4 fotogramas. */
export const useBoil = () => Math.floor(useCurrentFrame() / 4);
export const jit = (seed: string | number, amp: number) => (random(`${seed}`) - 0.5) * 2 * amp;
export const doodleRadius = (seed: number | string) =>
  `${28 + jit(seed + 'a', 8)}px ${22 + jit(seed + 'b', 8)}px ${30 + jit(seed + 'c', 8)}px ${20 + jit(seed + 'd', 8)}px`;

// ───────────────────────── trazo tembloroso (SVG) ─────────────────────────
type Pt = [number, number];
/** Curva suave (Catmull-Rom → Bézier) que pasa por los puntos. */
export const smoothPath = (pts: Pt[], closed = false): string => {
  if (pts.length < 2) return '';
  const p = closed ? [pts[pts.length - 1], ...pts, pts[0], pts[1]] : [pts[0], ...pts, pts[pts.length - 1]];
  let d = `M${p[1][0].toFixed(1)} ${p[1][1].toFixed(1)}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  return closed ? d + ' Z' : d;
};
/** Línea de rotulador: interpola puntos entre a y b y los hace temblar con la semilla. */
export const wobLine = (a: Pt, b: Pt, seed: string, amp = 2.2, n = 4): string => {
  const pts: Pt[] = [];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const off = i === 0 || i === n ? jit(`${seed}e${i}`, amp * 0.4) : jit(`${seed}m${i}`, amp);
    pts.push([a[0] + dx * f + nx * off, a[1] + dy * f + ny * off]);
  }
  return smoothPath(pts);
};
/** Polilínea temblorosa (varios tramos). */
export const wobPoly = (pts: Pt[], seed: string, amp = 2.2, closed = false): string => {
  const out: Pt[] = pts.map((p, i) => [p[0] + jit(`${seed}x${i}`, amp), p[1] + jit(`${seed}y${i}`, amp)]);
  return smoothPath(out, closed);
};
/** Elipse temblorosa (cabezas, orejas, botones…). */
export const wobEllipse = (cx: number, cy: number, rx: number, ry: number, seed: string, amp = 0.035, n = 12): string => {
  const pts: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + jit(`${seed}r${i}`, amp);
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  return smoothPath(pts, true);
};
/** Rectángulo redondeado tembloroso. */
export const wobRect = (x: number, y: number, w: number, h: number, seed: string, amp = 3, r = 14): string => {
  const pts: Pt[] = [
    [x + r, y],
    [x + w / 2, y],
    [x + w - r, y],
    [x + w, y + r],
    [x + w, y + h / 2],
    [x + w, y + h - r],
    [x + w - r, y + h],
    [x + w / 2, y + h],
    [x + r, y + h],
    [x, y + h - r],
    [x, y + h / 2],
    [x, y + r],
  ];
  return wobPoly(pts, seed, amp, true);
};

/** Formatea cifras al estilo español: 121000 → "121.000". */
export const fmt = (n: number, dec = 0) =>
  n.toLocaleString('es-ES', {minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: true}).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
