/**
 * PRUEBA DE ESTILO "NAIVE" (nov-2026): el mono dibujado con cera grasa. No es producción ni depende del motor.
 *
 * Cómo se consigue el estilo sin que el render se dispare:
 *   - La composición va a 10 fps ("en treses"): cada dibujo es UN fotograma de render. ffmpeg lo sube a 30 fps.
 *   - BOILING: cada trazo tiene un error "de mano" fijo y un temblor que cicla entre 4 dibujos (como un
 *     animador que repasa la misma pose). Ciclar, y no azar nuevo, evita el parpadeo estroboscópico.
 *   - LÍNEA: dos pasadas desplazadas + feDisplacementMap de grano medio para que el borde sea irregular.
 *   - COLOR: no hay rellenos. Cada mancha es un zigzag grueso real, con huecos, que se sale de la forma.
 *   - TEXTURA: PNG del color del papel por ENCIMA (diente = cera seca; vetas = rayas de la barra). Pintar una
 *     imagen no cuesta casi nada, a diferencia de calcular feTurbulence a pantalla completa.
 *   - LETRAS: alfabeto propio de trazos (no una fuente): cada letra se dibuja y hierve como el resto.
 *   - MOVIMIENTO: poses marcadas sin interpolar, con pops por tablas de 3-4 dibujos.
 */
import React from 'react';
import {AbsoluteFill, Composition, getInputProps, Img, staticFile, useCurrentFrame} from 'remotion';
import palabrasJson from '../../public-pruebas/naive/words.json';

export const NAIVE_FPS = 10;
const DURACION = 28.6;
const W = 1080;
const H = 1920;

const PAPEL = '#F3EFE4';
const TINTA = '#141312';
const LILA = '#B983D6';
const LILA2 = '#8A4FB5';
const ORO = '#E5B02F';
const NARANJA = '#F0872A';
const ROJO = '#E0392B';
const AZUL = '#7CC6E6';
const ROSA = '#F4B6C2';
const BLANCO = '#FFFDF6';

type P = [number, number];
type Capa = 'color' | 'tinta' | 'arriba';
const PALABRAS = palabrasJson as {text: string; start: number; end: number}[];

// ───────────────────────── azar reproducible ─────────────────────────
class Rng {
  s: number;
  constructor(seed: number) {
    this.s = (seed * 2654435761) >>> 0;
  }
  n() {
    this.s = (this.s + 0x6d2b79f5) >>> 0;
    let t = this.s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  r(a: number) {
    return (this.n() - 0.5) * 2 * a;
  }
}
const hashTxt = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) % 100000;
};

// ───────────────────────── geometría de trazo ─────────────────────────
const catmull = (pts: P[], pasos = 8): P[] => {
  if (pts.length < 3) return pts;
  const out: P[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[i];
    const c = pts[i + 1];
    const d = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < pasos; k++) {
      const t = k / pasos;
      const t2 = t * t;
      const t3 = t2 * t;
      out.push([
        0.5 * (2 * b[0] + (c[0] - a[0]) * t + (2 * a[0] - 5 * b[0] + 4 * c[0] - d[0]) * t2 + (3 * b[0] - a[0] - 3 * c[0] + d[0]) * t3),
        0.5 * (2 * b[1] + (c[1] - a[1]) * t + (2 * a[1] - 5 * b[1] + 4 * c[1] - d[1]) * t2 + (3 * b[1] - a[1] - 3 * c[1] + d[1]) * t3),
      ]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};
/** Puntos cada `paso` píxeles a lo largo de la polilínea. */
const remuestrea = (pts: P[], paso: number): P[] => {
  const out: P[] = [pts[0]];
  let resto = paso;
  for (let i = 1; i < pts.length; i++) {
    let a = pts[i - 1];
    const b = pts[i];
    let d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    while (d >= resto) {
      const f = resto / d;
      a = [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f];
      out.push(a);
      d -= resto;
      resto = paso;
    }
    resto -= d;
  }
  out.push(pts[pts.length - 1]);
  return out;
};
const d = (q: P[]) => {
  if (q.length < 2) return '';
  let s = `M${q[0][0].toFixed(1)} ${q[0][1].toFixed(1)}`;
  for (let i = 1; i < q.length - 1; i++) {
    const mx = (q[i][0] + q[i + 1][0]) / 2;
    const my = (q[i][1] + q[i + 1][1]) / 2;
    s += `Q${q[i][0].toFixed(1)} ${q[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
  }
  const u = q[q.length - 1];
  return `${s}L${u[0].toFixed(1)} ${u[1].toFixed(1)}`;
};
const elipse = (cx: number, cy: number, rx: number, ry: number, n = 16, ini = 0): P[] =>
  Array.from({length: n}, (_, i) => {
    const a = ini + (i / n) * Math.PI * 2;
    return [cx + Math.cos(a) * rx, cy + Math.sin(a) * ry] as P;
  });

// ───────────────────────── lienzo ─────────────────────────
type OpLinea = {w?: number; c?: string; pasadas?: number; amp?: number; capa?: Capa; cerrada?: boolean; op?: number; recta?: boolean};
type OpMancha = {paso?: number; ang?: number; rebose?: number; capa?: Capa; sombra?: string; huecos?: number; op?: number};

class Lienzo {
  color: React.ReactNode[] = [];
  tinta: React.ReactNode[] = [];
  arriba: React.ReactNode[] = [];
  m = [1, 0, 0, 1, 0, 0];
  k = 1;
  constructor(public b: number) {}
  capa(c: Capa) {
    return this[c];
  }
  semilla(n: number) {
    this.k = n * 1000 + 1;
  }
  id() {
    return (this.k += 3);
  }
  p(q: P): P {
    const [a, b, c, e, f, g] = this.m;
    return [a * q[0] + c * q[1] + f, b * q[0] + e * q[1] + g];
  }
  esc() {
    return Math.hypot(this.m[0], this.m[1]);
  }
  /** Ejecuta fn con el origen en (x,y), escala s y giro r (grados). */
  en(x: number, y: number, s: number, r: number, fn: () => void) {
    const prev = this.m;
    const [a, b, c, e, f, g] = prev;
    const cs = Math.cos((r * Math.PI) / 180) * s;
    const sn = Math.sin((r * Math.PI) / 180) * s;
    this.m = [a * cs + c * sn, b * cs + e * sn, -a * sn + c * cs, -b * sn + e * cs, a * x + c * y + f, b * x + e * y + g];
    fn();
    this.m = prev;
  }
  /** Línea de cera: error de mano fijo + temblor que cicla + pasadas desplazadas. */
  linea(pts: P[], {w = 18, c = TINTA, pasadas = 2, amp = 6, capa = 'tinta', cerrada, op = 1, recta}: OpLinea = {}) {
    const s = this.esc();
    const ww = Math.max(5, w * Math.pow(s, 0.8));
    const base = cerrada ? [...pts, pts[0], pts[1]] : pts;
    const lleno = (recta || base.length < 3 ? base : catmull(base)).map((q) => this.p(q));
    const dest = this.capa(capa);
    for (let i = 0; i < pasadas; i++) {
      const id = this.id();
      const hand = new Rng(id);
      const boil = new Rng(id + 131 * (this.b + 1));
      const ox = i ? hand.r(ww * 0.65) : 0;
      const oy = i ? hand.r(ww * 0.65) : 0;
      const a = amp * Math.pow(s, 0.6);
      const q = remuestrea(lleno, Math.max(24, 62 * Math.pow(s, 0.6))).map((v) => [v[0] + ox + hand.r(a) + boil.r(a * 0.42), v[1] + oy + hand.r(a) + boil.r(a * 0.42)] as P);
      dest.push(
        <path key={dest.length} d={d(q)} stroke={c} strokeWidth={i ? ww * 0.72 : ww} opacity={i ? op * 0.88 : op} fill="none" strokeLinecap="round" strokeLinejoin="round" />,
      );
    }
  }
  /** Mancha de cera: zigzag real que recorre la forma, con huecos, y se sale de ella. */
  mancha(pts: P[], c: string, {paso = 36, ang = -28, rebose = 26, capa = 'color', sombra, huecos = 0.1, op = 1}: OpMancha = {}) {
    const s = this.esc();
    const w = this.zigzag(pts.map((q) => this.p(q)), c, paso * Math.pow(s, 0.7), ang, rebose * Math.pow(s, 0.7), capa, huecos, op, 1.12);
    if (sombra) this.zigzag(pts.map((q) => this.p(q)), sombra, paso * 2.3 * Math.pow(s, 0.7), ang + 62, rebose * 0.3, capa, 0.34, 0.75, 0.42);
    return w;
  }
  private zigzag(poly: P[], c: string, paso: number, ang: number, rebose: number, capa: Capa, huecos: number, op: number, grueso: number) {
    const id = this.id();
    const hand = new Rng(id);
    const boil = new Rng(id + 131 * (this.b + 1));
    const ca = Math.cos((ang * Math.PI) / 180);
    const sa = Math.sin((ang * Math.PI) / 180);
    const rot = poly.map((q) => [q[0] * ca + q[1] * sa, -q[0] * sa + q[1] * ca] as P);
    const ys = rot.map((q) => q[1]);
    const y0 = Math.min(...ys);
    const y1 = Math.max(...ys);
    const zz: P[] = [];
    const trozos: P[][] = [];
    let lado = 0;
    for (let y = y0 + paso * 0.4; y < y1; y += paso) {
      const xs: number[] = [];
      for (let i = 0; i < rot.length; i++) {
        const a = rot[i];
        const b = rot[(i + 1) % rot.length];
        if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
      }
      const fuera = hand.n() < huecos;
      const r1 = hand.r(rebose) + rebose * 0.4;
      const r2 = hand.r(rebose) + rebose * 0.4;
      const dyh = hand.r(paso * 0.3);
      if (xs.length < 2 || fuera) {
        if (zz.length > 1) trozos.push(zz.splice(0));
        continue;
      }
      const a = Math.min(...xs) - r1;
      const b = Math.max(...xs) + r2;
      const izq: P = [a + boil.r(6), y + dyh + boil.r(4)];
      const der: P = [b + boil.r(6), y + dyh + paso * 0.35 + boil.r(4)];
      if (lado++ % 2) zz.push(der, izq);
      else zz.push(izq, der);
    }
    if (zz.length > 1) trozos.push(zz);
    const dest = this.capa(capa);
    for (const t of trozos) {
      const q = t.map((v) => [v[0] * ca - v[1] * sa, v[0] * sa + v[1] * ca] as P);
      dest.push(
        <path
          key={dest.length}
          d={`M${q.map((v) => `${v[0].toFixed(1)} ${v[1].toFixed(1)}`).join('L')}`}
          stroke={c}
          strokeWidth={paso * grueso}
          opacity={op}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />,
      );
    }
  }
  /** Relleno liso (blanco de los ojos, papel de la lista). */
  relleno(pts: P[], c: string, capa: Capa = 'color') {
    const id = this.id();
    const boil = new Rng(id + 131 * (this.b + 1));
    const q = pts.map((v) => {
      const w = this.p(v);
      return [w[0] + boil.r(3), w[1] + boil.r(3)] as P;
    });
    const dest = this.capa(capa);
    dest.push(<path key={dest.length} d={d(catmull([...q, q[0], q[1]], 4))} fill={c} stroke="none" />);
  }
}

// ───────────────────────── alfabeto de trazos (caja 100 × 140, y hacia abajo) ─────────────────────────
const O_: P[] = [[52, 0], [14, 18], [2, 70], [16, 122], [50, 140], [86, 120], [98, 70], [84, 20], [46, 2]];
const PUNTO: P[] = [[50, 126], [53, 139], [47, 137]];
const G: Record<string, P[][]> = {
  A: [[[2, 140], [50, 0]], [[50, 0], [98, 140]], [[18, 92], [84, 90]]],
  B: [[[8, 0], [8, 140]], [[8, 0], [68, 8], [84, 36], [60, 62], [8, 70]], [[8, 70], [74, 76], [96, 106], [70, 134], [8, 140]]],
  C: [[[94, 24], [60, 2], [22, 18], [4, 70], [22, 122], [60, 138], [96, 114]]],
  D: [[[8, 0], [8, 140]], [[6, 0], [68, 12], [96, 70], [68, 128], [6, 140]]],
  E: [[[90, 2], [10, 0]], [[10, 0], [8, 140]], [[6, 140], [92, 138]], [[8, 70], [74, 68]]],
  F: [[[90, 2], [10, 0]], [[10, 0], [8, 140]], [[8, 70], [72, 68]]],
  G: [[[94, 24], [60, 2], [22, 18], [4, 70], [22, 122], [60, 138], [92, 114], [94, 78]], [[96, 78], [54, 78]]],
  H: [[[6, 0], [6, 140]], [[94, 0], [94, 140]], [[6, 72], [94, 68]]],
  I: [[[50, 0], [50, 140]], [[18, 3], [82, 0]], [[18, 140], [82, 137]]],
  J: [[[72, 0], [74, 100], [50, 138], [18, 128], [6, 100]]],
  K: [[[8, 0], [8, 140]], [[90, 0], [8, 80]], [[34, 58], [96, 140]]],
  L: [[[8, 0], [8, 140]], [[8, 140], [90, 138]]],
  M: [[[4, 140], [10, 0]], [[10, 0], [50, 92]], [[50, 92], [90, 0]], [[90, 0], [98, 140]]],
  N: [[[6, 140], [8, 0]], [[8, 0], [92, 140]], [[92, 140], [94, 0]]],
  Ñ: [[[6, 140], [8, 0]], [[8, 0], [92, 140]], [[92, 140], [94, 0]], [[20, -30], [40, -46], [60, -28], [82, -42]]],
  O: [O_],
  P: [[[8, 0], [8, 140]], [[6, 0], [72, 8], [92, 40], [70, 72], [8, 78]]],
  Q: [O_, [[58, 98], [102, 148]]],
  R: [[[8, 0], [8, 140]], [[6, 0], [72, 8], [92, 40], [70, 72], [8, 78]], [[40, 78], [96, 140]]],
  S: [[[90, 20], [58, 0], [20, 10], [10, 40], [40, 66], [78, 84], [92, 112], [62, 138], [24, 134], [4, 112]]],
  T: [[[2, 2], [98, 0]], [[50, 0], [50, 140]]],
  U: [[[6, 0], [8, 96], [28, 136], [72, 136], [92, 96], [94, 0]]],
  V: [[[2, 0], [50, 140]], [[50, 140], [98, 0]]],
  W: [[[0, 0], [24, 140]], [[24, 140], [50, 44]], [[50, 44], [76, 140]], [[76, 140], [100, 0]]],
  X: [[[4, 0], [96, 140]], [[96, 0], [4, 140]]],
  Y: [[[2, 0], [50, 74]], [[98, 0], [50, 74]], [[50, 74], [50, 140]]],
  Z: [[[4, 2], [96, 0]], [[96, 0], [4, 140]], [[4, 140], [98, 138]]],
  '!': [[[50, 0], [50, 98]], PUNTO],
  '¡': [[[50, 40], [50, 140]], [[50, 2], [53, 13], [47, 11]]],
  '?': [[[10, 30], [30, 4], [70, 2], [90, 34], [50, 72], [50, 100]], PUNTO],
  '¿': [[[90, 110], [70, 136], [30, 138], [10, 106], [50, 68], [50, 40]], [[50, 2], [53, 13], [47, 11]]],
  '=': [[[8, 50], [92, 48]], [[8, 92], [92, 90]]],
  '+': [[[8, 70], [92, 68]], [[50, 28], [50, 112]]],
  '.': [PUNTO],
};
const ANCHO: Record<string, number> = {I: 76, J: 84, L: 86, '!': 56, '¡': 56, '.': 50, M: 112, W: 118, O: 104, Q: 104};
const TILDE: Record<string, string> = {Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ú: 'U'};

type OpRotulo = {seed?: number; c?: string; w?: number; caos?: number; t?: number; desde?: number; vel?: number; capa?: Capa; maxW?: number};
/** Rótulo a mano centrado en x, con la parte de arriba en y. `desde`+`t`: se escribe letra a letra. */
const rotulo = (l: Lienzo, txt: string, x: number, y: number, h: number, op: OpRotulo = {}) => {
  const {c = TINTA, w, caos = 1, t, desde, vel = 2.2, capa = 'tinta', maxW = 950} = op;
  const seed = op.seed ?? hashTxt(txt);
  const hand = new Rng(seed);
  const letras = [...txt];
  let e = h / 140;
  const medir = (k: number) => letras.reduce((a, ch) => a + (ch === ' ' ? 62 : (ANCHO[TILDE[ch] ?? ch] ?? 100) + 12) * k, 0);
  if (medir(e) > maxW) e = maxW / medir(1);
  let cx = x - medir(e) / 2;
  const visibles = desde === undefined || t === undefined ? 1e9 : (t - desde) * NAIVE_FPS * vel + 1;
  letras.forEach((ch, i) => {
    const adv = (ch === ' ' ? 62 : (ANCHO[TILDE[ch] ?? ch] ?? 100) + 12) * e;
    const base = TILDE[ch] ?? ch;
    const est = G[base];
    const ky = 1 + hand.r(0.13 * caos);
    const dy = hand.r(h * 0.1 * caos);
    const dx = hand.r(h * 0.035 * caos);
    const rr = hand.r(7 * caos);
    if (est && i < visibles) {
      const cw = (ANCHO[base] ?? 100) / 100;
      l.semilla(seed + i * 37);
      l.en(cx + dx + (adv - 12 * e) / 2, y + h / 2 + dy, e * ky, rr, () => {
        for (const tr of est) {
          const q = tr.map((v) => [(v[0] - 50) * cw, v[1] - 70] as P);
          l.linea(q, {w: (w ?? Math.max(13, h * 0.13)) / Math.pow(e * ky, 0.8), c, pasadas: 2, amp: 4 / Math.pow(e, 0.6), capa});
        }
        if (TILDE[ch]) l.linea([[-6, -92], [26, -122]], {w: (w ?? Math.max(13, h * 0.13)) / Math.pow(e * ky, 0.8), c, pasadas: 1, capa});
      });
    }
    cx += adv;
  });
};

// ───────────────────────── tiempo ─────────────────────────
/** Dibujos desde t0 (0 el primero); negativo si aún no ha llegado. */
const dib = (t: number, t0: number) => Math.round((t - t0) * NAIVE_FPS);
/** Escala de "pop" dibujo a dibujo, sin interpolar. */
const pop = (t: number, t0: number) => {
  const n = dib(t, t0);
  if (n < 0) return 0;
  return [1.4, 0.88, 1.08, 0.97][n] ?? 1;
};
/** Rebote vertical dibujo a dibujo. */
const brinco = (t: number, t0: number) => [-130, -70, 30, -12][dib(t, t0)] ?? 0;
const alterna = (t: number, cada: number, n = 2) => Math.floor(t / cada + 1e-6) % n;
const bocaEn = (t: number) => {
  for (const w of PALABRAS) {
    if (t >= w.start - 0.03 && t < w.end) return [2, 1, 3, 1][Math.floor((t - w.start) * 9) % 4];
  }
  return 0;
};

// ───────────────────────── personajes y objetos ─────────────────────────
type Ang = [number, number];
type PoseDef = {bi: Ang; bd: Ang; pi: Ang; pd: Ang};
const POSES: Record<string, PoseDef> = {
  pie: {bi: [-22, -10], bd: [22, 10], pi: [-10, -4], pd: [10, 4]},
  arriba: {bi: [-125, -165], bd: [125, 165], pi: [-17, -6], pd: [17, 6]},
  arriba2: {bi: [-140, -180], bd: [108, 150], pi: [-26, 8], pd: [12, 10]},
  panico: {bi: [-135, -172], bd: [135, 172], pi: [-30, 6], pd: [30, -6]},
  panico2: {bi: [-118, -158], bd: [118, 158], pi: [-14, -30], pd: [14, 30]},
  senala: {bi: [-22, -8], bd: [76, 104], pi: [-12, -4], pd: [12, 4]},
  senalaIzq: {bi: [-76, -104], bd: [22, 8], pi: [-12, -4], pd: [12, 4]},
  senalaArr: {bi: [-22, -8], bd: [128, 158], pi: [-12, -4], pd: [12, 4]},
  jarras: {bi: [-58, 42], bd: [58, -42], pi: [-15, -6], pd: [15, 6]},
  jarras2: {bi: [-58, 42], bd: [130, 170], pi: [-15, -6], pd: [15, 6]},
  saltoA: {bi: [-140, -105], bd: [140, 105], pi: [-62, 12], pd: [62, -12]},
  saltoB: {bi: [-70, -22], bd: [70, 22], pi: [-32, -62], pd: [32, 62]},
  encoge: {bi: [-70, -150], bd: [70, 150], pi: [-10, -4], pd: [10, 4]},
  andar1: {bi: [32, 44], bd: [-32, -20], pi: [-30, -10], pd: [26, 44]},
  andar2: {bi: [-32, -20], bd: [32, 44], pi: [26, 44], pd: [-30, -10]},
  sostiene: {bi: [-42, 52], bd: [42, -52], pi: [-12, -4], pd: [12, 4]},
  sostiene2: {bi: [-42, 62], bd: [42, -42], pi: [-22, -4], pd: [8, 12]},
};
const dir = (a: number): P => [Math.sin((a * Math.PI) / 180), Math.cos((a * Math.PI) / 180)];
const miembro = (o: P, a: Ang, l1: number, l2: number): [P, P] => {
  const u = dir(a[0]);
  const c: P = [o[0] + u[0] * l1, o[1] + u[1] * l1];
  const v = dir(a[1]);
  return [c, [c[0] + v[0] * l2, c[1] + v[1] * l2]];
};

type OpMono = {
  x: number; y: number; e?: number; pose?: string; boca?: number; mir?: P; ojos?: 'normal' | 'dormido' | 'susto' | 'bizco';
  corona?: boolean; r?: number; id?: number; gorra?: boolean; color?: string; color2?: string;
};
/** El mono: orejas, máscara de cara, cola en espiral y cuerpo de palo. Los pies en (x, y). */
const mono = (l: Lienzo, o: OpMono) => {
  const {x, y, e = 1, pose = 'pie', boca = 0, mir = [0, 0], ojos = 'normal', corona = true, r = 0, id = 1, gorra, color = LILA, color2 = LILA2} = o;
  const P_ = POSES[pose] ?? POSES.pie;
  l.en(x, y, e, r, () => {
    const hombro: P = [0, -436];
    const cadera: P = [0, -296];
    const cab: P = [0, -690];
    l.semilla(100 * id);
    // cola: sale de la cadera y acaba en espiral
    l.linea([cadera, [120, -240], [262, -292], [316, -408], [262, -496], [186, -466], [198, -398], [254, -412]], {w: 26, c: LILA2, pasadas: 1, amp: 5, capa: 'color'});
    l.linea([cadera, [120, -240], [262, -292], [316, -408], [262, -496], [186, -466], [198, -398], [254, -412]], {w: 20, amp: 7});
    // piernas y pies
    const [ri, pi] = miembro(cadera, P_.pi, 150, 150);
    const [rd, pd] = miembro(cadera, P_.pd, 150, 150);
    l.linea([cadera, ri, pi], {w: 24, recta: true});
    l.linea([cadera, rd, pd], {w: 24, recta: true});
    l.linea([pi, [pi[0] - 56, pi[1] + 6], [pi[0] - 76, pi[1] - 16], [pi[0] - 8, pi[1] - 16]], {w: 20, pasadas: 1});
    l.linea([pd, [pd[0] + 56, pd[1] + 6], [pd[0] + 76, pd[1] - 16], [pd[0] + 8, pd[1] - 16]], {w: 20, pasadas: 1});
    // cuerpo: tripa lila mal rellena y palo
    l.mancha(elipse(0, -366, 90, 106, 12), color, {paso: 30, sombra: color2});
    l.linea([hombro, cadera], {w: 26});
    l.linea(elipse(0, -366, 84, 100, 12), {w: 15, pasadas: 1, cerrada: true, amp: 9});
    // brazos con dedos de palo
    const brazo = (a: Ang, h: P, sg: number) => {
      const [c, m] = miembro(h, a, 148, 138);
      l.linea([h, c, m], {w: 24, recta: true});
      const u = dir(a[1]);
      for (const de of [-34, 0, 34]) {
        const v = dir(a[1] + de);
        l.linea([m, [m[0] + v[0] * 56, m[1] + v[1] * 56]], {w: 15, pasadas: 1, amp: 3});
      }
      return [m, u, sg];
    };
    brazo(P_.bi, [hombro[0] - 12, hombro[1]], -1);
    brazo(P_.bd, [hombro[0] + 12, hombro[1]], 1);

    l.semilla(100 * id + 40);
    // orejas de mono
    for (const s of [-1, 1]) {
      l.mancha(elipse(cab[0] + s * 258, cab[1] + 6, 92, 100, 12), color, {paso: 30, rebose: 18, ang: -60});
      l.mancha(elipse(cab[0] + s * 262, cab[1] + 12, 50, 60, 10), ROSA, {paso: 22, rebose: 6, huecos: 0.04});
      l.linea(elipse(cab[0] + s * 258, cab[1] + 6, 88, 96, 12), {w: 19, cerrada: true, amp: 8});
    }
    // cabeza: mancha que se sale y contorno repasado con pelos
    const pelo = elipse(cab[0], cab[1], 262, 226, 34).map((q, i) => {
      const k = i % 2 ? 1.2 : 0.98;
      return [cab[0] + (q[0] - cab[0]) * k, cab[1] + (q[1] - cab[1]) * k] as P;
    });
    l.mancha(pelo, color, {paso: 42, sombra: color2, rebose: 62, huecos: 0.07});
    garabato(l, -250, -880, 60, 11 + id, color2, 'color');
    garabato(l, 262, -520, 54, 13 + id, color2, 'color');
    l.linea(elipse(cab[0], cab[1], 244, 212, 18), {w: 21, cerrada: true, amp: 11});
    // máscara de mono: dos lóbulos arriba y hocico abajo
    const masc: P[] = [[0, -806], [-62, -860], [-158, -836], [-192, -740], [-158, -640], [-132, -574], [-60, -522], [0, -512], [60, -522], [132, -574], [158, -640], [192, -740], [158, -836], [62, -860]];
    l.mancha(masc, ROSA, {paso: 26, rebose: 7, ang: 24, huecos: 0.05});
    l.relleno(masc.map((q) => [q[0] * 0.9, -690 + (q[1] + 690) * 0.9] as P), '#FBDCDD');
    l.linea([[-182, -660], [-132, -574], [-60, -522], [0, -512], [60, -522], [132, -574], [182, -660]], {w: 12, pasadas: 1, amp: 6});
    l.linea([[-150, -628], [-60, -664], [0, -650], [60, -664], [150, -628]], {w: 10, pasadas: 1, amp: 5});
    // orejas tapan: rayones de pelo arriba
    for (const s of [-1, 0, 1]) l.linea([[s * 72 - 24, -902], [s * 72, -956], [s * 72 + 14, -900], [s * 72 + 36, -944]], {w: 14, pasadas: 1, amp: 5});
    // ojos enormes
    const oy = -760;
    const ojo = (s: number) => {
      const ex = s * 72;
      if (ojos === 'dormido') {
        l.linea([[ex - 58, oy + 6], [ex, oy + 38], [ex + 58, oy + 6]], {w: 19, capa: 'arriba'});
        return;
      }
      const k = ojos === 'susto' ? 1.14 : 1;
      l.relleno(elipse(ex, oy, 62 * k, 92 * k, 12), BLANCO, 'arriba');
      l.linea(elipse(ex, oy, 62 * k, 92 * k, 12), {w: 16, cerrada: true, capa: 'arriba', amp: 5});
      const pk = ojos === 'susto' ? 0.62 : 1;
      const px = ex + mir[0] + (ojos === 'bizco' ? -s * 20 : 0);
      l.relleno(elipse(px, oy + 6 + mir[1], 32 * pk, 60 * pk, 10), TINTA, 'arriba');
      l.relleno(elipse(px, oy + 6 + mir[1], 25 * pk, 50 * pk, 10), '#000000', 'arriba');
      l.relleno(elipse(px - 9, oy - 22 + mir[1], 9, 13, 6), BLANCO, 'arriba');
    };
    ojo(-1);
    ojo(1);
    // nariz dorada
    l.mancha([[-20, -618], [20, -620], [2, -590]], ORO, {paso: 11, rebose: 3, huecos: 0, capa: 'arriba'});
    l.linea([[-22, -622], [22, -622], [2, -588]], {w: 9, cerrada: true, pasadas: 1, amp: 2, capa: 'arriba'});
    // boca
    if (boca === 0) l.linea([[-92, -564], [-34, -540], [34, -540], [92, -566]], {w: 14, amp: 4});
    else {
      const ab = [0, 18, 34, 56][boca];
      const ax = [0, 44, 70, 92][boca];
      l.relleno(elipse(0, -548 + ab * 0.4, ax, ab + 8, 12), '#5A1730', 'arriba');
      if (boca === 3) l.linea([[-62, -575], [-30, -552], [0, -575], [30, -552], [62, -575]], {w: 8, c: BLANCO, pasadas: 1, amp: 2, capa: 'arriba', recta: true});
      l.linea(elipse(0, -548 + ab * 0.4, ax, ab + 8, 12), {w: 12, cerrada: true, pasadas: 1, amp: 3, capa: 'arriba'});
    }
    // corona garabateada
    if (corona) {
      const c: P[] = [[-110, -880], [-128, -992], [-66, -930], [-24, -1022], [18, -930], [76, -1006], [112, -878]];
      l.mancha([...c, [40, -862], [-40, -864]], ORO, {paso: 22, rebose: 8, ang: 70, huecos: 0.04});
      l.linea(c, {w: 13, recta: true, amp: 5, pasadas: 3});
      l.linea([[-116, -880], [0, -858], [116, -878]], {w: 13, amp: 4});
    }
    if (gorra) {
      l.mancha([[-150, -900], [-120, -990], [120, -990], [150, -900]], '#3C5CA8', {paso: 24, rebose: 6});
      l.linea([[-170, -880], [170, -880]], {w: 26, pasadas: 2, amp: 4});
    }
  });
};

const pez = (l: Lienzo, x: number, y: number, e: number, o: {mira?: number; antifaz?: boolean; id?: number; corona?: boolean} = {}) => {
  const {mira = 1, antifaz, id = 7} = o;
  l.en(x, y, e, alterna(l.b, 2) ? 5 : -5, () => {
    l.semilla(300 + id);
    const m = mira;
    const cuerpo = elipse(0, 0, 170, 105, 14);
    l.mancha(cuerpo, NARANJA, {paso: 28, rebose: 16, sombra: ROJO, huecos: 0.04});
    const cola: P[] = [[-m * 150, 0], [-m * 262, -86], [-m * 240, 0], [-m * 268, 92]];
    l.mancha(cola, NARANJA, {paso: 24, rebose: 8});
    l.linea(elipse(0, 0, 164, 100, 14), {w: 15, cerrada: true, amp: 6});
    l.linea([...cola, cola[0]], {w: 14, recta: true, pasadas: 1});
    l.linea([[m * 10, -94], [-m * 34, -150], [-m * 76, -94]], {w: 13, pasadas: 1, recta: true});
    l.linea([[-m * 34, -40], [-m * 10, 0], [-m * 34, 40]], {w: 9, pasadas: 1});
    const ex = m * 86;
    l.relleno(elipse(ex, -24, 48, 62, 10), BLANCO, 'arriba');
    l.linea(elipse(ex, -24, 48, 62, 10), {w: 12, cerrada: true, pasadas: 1, capa: 'arriba', amp: 3});
    l.relleno(elipse(ex + m * 8, -20, 20, 34, 8), TINTA, 'arriba');
    if (antifaz) l.linea([[ex - 80, -60], [ex, -44], [ex + 74, -60], [ex + 74, -8], [ex, -18], [ex - 80, -6], [ex - 80, -60]], {w: 16, recta: true, capa: 'arriba', pasadas: 3, amp: 3});
    l.linea([[m * 126, 34], [m * 150, 52], [m * 112, 62]], {w: 9, pasadas: 1});
  });
};

const pecera = (l: Lienzo, x: number, y: number, e: number, o: {pez?: boolean; termo?: boolean; rojo?: number} = {}) => {
  const {pez: conPez = true, termo = false} = o;
  l.en(x, y, e, 0, () => {
    l.semilla(400);
    const R = 340;
    const borde: P[] = [[-190, -300], [-300, -170], [-348, 0], [-300, 180], [-160, 300], [0, 340], [160, 300], [300, 180], [348, 0], [300, -170], [190, -300]];
    const agua: P[] = [[-316, -100], [-348, 0], [-300, 180], [-160, 300], [0, 340], [160, 300], [300, 180], [348, 0], [316, -100], [150, -130], [0, -96], [-150, -130]];
    l.mancha(agua, AZUL, {paso: 42, rebose: 12, ang: -12, huecos: 0.08});
    l.linea(borde, {w: 24, amp: 8});
    l.linea(elipse(0, -304, 214, 42, 14), {w: 18, cerrada: true, amp: 5});
    l.linea([[-312, -96], [-210, -130], [-100, -96], [0, -128], [110, -94], [214, -128], [316, -96]], {w: 11, pasadas: 1, amp: 6, c: '#2E6E96'});
    for (const [bx, by, br] of [[-250, 90, 22], [-214, 10, 15], [230, 150, 18]] as number[][]) l.linea(elipse(bx, by - alterna(l.b, 2) * 16, br, br, 8), {w: 8, cerrada: true, pasadas: 1, amp: 2});
    if (termo) termometro(l, 214, -150, 0.8, o.rojo ?? 0.5, 12);
    if (conPez) pez(l, -34, 94, 0.98, {mira: 1});
    void R;
  });
};

const termometro = (l: Lienzo, x: number, y: number, e: number, nivel: number, r = 0) => {
  l.en(x, y, e, r, () => {
    l.semilla(450);
    const tubo: P[] = [[-46, -300], [-44, 180], [44, 180], [46, -300], [0, -344]];
    l.relleno(tubo, BLANCO);
    const top = 180 - 460 * nivel;
    l.mancha([[-24, 200], [-24, top], [24, top], [24, 200]], ROJO, {paso: 16, rebose: 3, ang: 78, huecos: 0});
    l.mancha(elipse(0, 232, 86, 86, 12), ROJO, {paso: 26, rebose: 10, huecos: 0.03, sombra: '#8E1C14'});
    l.linea([[-46, 170], [-48, -300], [0, -346], [48, -300], [46, 170]], {w: 20, amp: 5});
    l.linea(elipse(0, 232, 88, 88, 12), {w: 20, cerrada: true, amp: 6});
    for (let i = 0; i < 6; i++) l.linea([[48, -230 + i * 72], [96, -230 + i * 72]], {w: 11, pasadas: 1, amp: 3});
  });
};

const wifi = (l: Lienzo, x: number, y: number, e: number, c: string = TINTA) => {
  const n = 1 + alterna(l.b, 1, 3);
  l.en(x, y, e, 0, () => {
    l.semilla(470);
    l.relleno(elipse(0, 0, 22, 22, 8), c, 'tinta');
    for (let i = 1; i <= n; i++) {
      const R = 40 + i * 62;
      const q: P[] = Array.from({length: 7}, (_, k) => {
        const a = (-140 + (k / 6) * 100) * (Math.PI / 180);
        return [Math.cos(a) * R, Math.sin(a) * R];
      });
      l.linea(q, {w: 22, c, pasadas: 2, amp: 5});
    }
  });
};

const camara = (l: Lienzo, x: number, y: number, e: number, r: number, id: number) => {
  l.en(x, y, e, r, () => {
    l.semilla(500 + id);
    const c: P[] = [[-130, -74], [130, -82], [136, 74], [-124, 80]];
    l.mancha(c, '#C9C4B8', {paso: 30, rebose: 8, huecos: 0.08});
    l.linea([...c, c[0]], {w: 18, recta: true, amp: 6});
    l.relleno(elipse(150, 0, 56, 56, 10), BLANCO, 'color');
    l.linea(elipse(150, 0, 56, 56, 10), {w: 17, cerrada: true, amp: 4});
    l.relleno(elipse(158, 0, 24, 24, 8), TINTA, 'tinta');
    if (alterna(l.b, 3)) l.relleno(elipse(-92, -44, 17, 17, 8), ROJO, 'arriba');
    l.linea([[-40, 76], [-46, 190]], {w: 19, amp: 3});
  });
};

const hacker = (l: Lienzo, x: number, y: number, e: number, id = 1, mirar: P = [0, 0]) => {
  l.en(x, y, e, 0, () => {
    l.semilla(600 + id);
    const cuerpo: P[] = [[-30, -300], [-140, -220], [-190, -40], [-210, 150], [210, 150], [190, -40], [140, -220], [30, -300]];
    l.mancha(cuerpo, TINTA, {paso: 34, rebose: 20, capa: 'tinta', ang: 62, huecos: 0.03});
    l.linea([[-70, -280], [-104, -386], [-14, -292]], {w: 24, recta: true});
    l.linea([[70, -280], [104, -386], [14, -292]], {w: 24, recta: true});
    for (const s of [-1, 1]) {
      l.relleno(elipse(s * 62, -114, 52, 74, 10), BLANCO, 'arriba');
      l.relleno(elipse(s * 62 + mirar[0], -106 + mirar[1], 18, 34, 8), TINTA, 'arriba');
    }
    l.linea([[-70, 24], [-30, 0], [0, 24], [34, 0], [74, 24]], {w: 11, c: BLANCO, pasadas: 1, capa: 'arriba', recta: true, amp: 3});
  });
};

const lista = (l: Lienzo, x: number, y: number, e: number, r: number) => {
  l.en(x, y, e, r, () => {
    l.semilla(700);
    const c: P[] = [[-230, -320], [230, -330], [244, 320], [-222, 334]];
    l.relleno(c, BLANCO);
    l.mancha([[-230, -320], [230, -330], [230, -216], [-226, -210]], ORO, {paso: 24, rebose: 8, huecos: 0.05});
    l.linea([...c, c[0]], {w: 21, recta: true, amp: 7});
    rotulo(l, 'VIP', 0, -304, 84, {seed: 71, maxW: 330});
    for (let i = 0; i < 5; i++) {
      const yy = -170 + i * 96;
      l.semilla(720 + i);
      l.relleno(elipse(-168, yy, 15, 15, 7), TINTA, 'tinta');
      l.linea(Array.from({length: 7}, (_, k) => [-120 + k * 54, yy + (k % 2 ? -22 : 20)] as P), {w: 11, pasadas: 1, amp: 8});
    }
  });
};

const casita = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(800);
    const pared: P[] = [[-440, -240], [440, -240], [436, 400], [-436, 400]];
    l.mancha(pared, '#F4DA8F', {paso: 56, rebose: 22, huecos: 0.18, ang: -20});
    l.mancha([[-520, -222], [0, -610], [520, -222]], ROJO, {paso: 40, rebose: 22, huecos: 0.1, sombra: '#8E1C14'});
    l.linea([[-520, -222], [0, -610]], {w: 26, amp: 9, recta: true});
    l.linea([[0, -610], [520, -222]], {w: 26, amp: 9, recta: true});
    l.linea([[-520, -222], [520, -222]], {w: 22, amp: 9, recta: true});
    l.linea([[-440, -222], [-436, 404], [440, 400], [438, -222]], {w: 24, amp: 9, recta: true});
  });
};
const tele = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(820);
    const c: P[] = [[-160, -112], [160, -118], [166, 104], [-154, 112]];
    l.mancha(c, AZUL, {paso: 30, rebose: 8});
    l.linea([...c, c[0]], {w: 19, recta: true, amp: 5});
    l.linea([[-54, -118], [-104, -200]], {w: 14, amp: 3, pasadas: 1});
    l.linea([[54, -118], [104, -200]], {w: 14, amp: 3, pasadas: 1});
    l.linea([[-90, 112], [-110, 158]], {w: 15, pasadas: 1, amp: 2});
    l.linea([[90, 112], [110, 158]], {w: 15, pasadas: 1, amp: 2});
  });
};
const bombilla = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(840);
    const q: P[] = [[-44, 70], [-110, -30], [-70, -134], [0, -166], [70, -134], [110, -30], [44, 70]];
    l.mancha(q, ORO, {paso: 30, rebose: 16});
    l.linea(q, {w: 19, amp: 6});
    l.linea([[-46, 72], [46, 70]], {w: 16, pasadas: 1, amp: 3});
    l.linea([[-40, 108], [40, 106]], {w: 16, pasadas: 1, amp: 3});
    l.linea([[-24, 142], [24, 140]], {w: 16, pasadas: 1, amp: 3});
    l.linea([[-30, 66], [-44, -40], [-14, -8], [14, -46], [30, -6], [46, -40], [30, 66]], {w: 10, pasadas: 1, amp: 3, recta: true});
  });
};
const robot = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(860);
    const c = elipse(0, 0, 200, 88, 14);
    l.mancha(c, '#9E9A90', {paso: 28, rebose: 10});
    l.linea(c, {w: 19, cerrada: true, amp: 6});
    l.linea(elipse(0, -30, 62, 22, 8), {w: 13, cerrada: true, pasadas: 1, amp: 3});
    l.relleno(elipse(-96, -14, 13, 13, 6), ROJO, 'arriba');
    l.linea([[-150, 90], [-136, 118]], {w: 15, pasadas: 1, amp: 2});
    l.linea([[150, 90], [136, 118]], {w: 15, pasadas: 1, amp: 2});
  });
};
const puerta = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(880);
    const hueco: P[] = [[-210, -440], [210, -446], [216, 440], [-204, 446]];
    l.mancha(hueco, TINTA, {paso: 46, rebose: 12, capa: 'tinta', ang: 74, huecos: 0.02});
    l.linea([...hueco, hueco[0]], {w: 26, recta: true, amp: 8});
    const hoja: P[] = [[-204, -440], [-440, -520], [-452, 556], [-204, 446]];
    l.mancha(hoja, ROJO, {paso: 38, rebose: 14, sombra: '#8E1C14'});
    l.linea([...hoja, hoja[0]], {w: 24, recta: true, amp: 8});
    l.relleno(elipse(-392, 30, 20, 26, 8), ORO, 'arriba');
    for (const s of [-1, 1]) {
      l.relleno(elipse(s * 66, -60, 42, 66, 10), BLANCO, 'arriba');
      l.relleno(elipse(s * 66 - 8, -50, 16, 32, 8), TINTA, 'arriba');
    }
  });
};
const candado = (l: Lienzo, x: number, y: number, e: number) => {
  l.en(x, y, e, 0, () => {
    l.semilla(900);
    const c: P[] = [[-160, -60], [160, -66], [166, 190], [-154, 196]];
    l.mancha(c, ORO, {paso: 34, rebose: 14, sombra: '#A97A12'});
    l.linea([...c, c[0]], {w: 23, recta: true, amp: 7});
    l.linea([[-100, -60], [-108, -170], [-40, -248], [40, -248], [108, -170], [100, -60]], {w: 30, amp: 6});
    l.relleno(elipse(0, 40, 32, 32, 8), TINTA, 'tinta');
    l.linea([[0, 50], [0, 124]], {w: 26, pasadas: 1, amp: 3});
  });
};
/** Maraña de rayones: el tachón nervioso de quien repasa sin mirar. */
function garabato(l: Lienzo, x: number, y: number, r: number, seed: number, c: string = TINTA, capa: Capa = 'tinta') {
  const h = new Rng(seed * 97 + 5);
  const q: P[] = Array.from({length: 16}, () => {
    const a = h.n() * Math.PI * 2;
    const k = 0.45 + h.n() * 0.7;
    return [x + Math.cos(a) * r * k, y + Math.sin(a) * r * k * 0.8];
  });
  l.semilla(1500 + seed);
  l.linea(q, {w: 11, c, pasadas: 1, amp: 5, capa});
}
/** Salpicaduras de cera alrededor de una zona. */
const motas = (l: Lienzo, seed: number, n: number, c: string) => {
  const h = new Rng(seed);
  for (let i = 0; i < n; i++) {
    const x = 60 + h.n() * (W - 120);
    const y = 120 + h.n() * (H - 300);
    const r = 6 + h.n() * 20;
    l.semilla(seed + i);
    l.mancha(elipse(x, y, r, r * 0.8, 7), c, {paso: 9, rebose: 3, huecos: 0});
  }
};
/** Cortinilla: zigzag de cera que tapa la pantalla en 3 dibujos. */
const barrido = (l: Lienzo, n: number, c: string) => {
  const q: Record<number, P[]> = {
    0: [[-60, 1980], [-60, 900], [1140, 1300], [1140, 1980]],
    1: [[-60, -60], [1140, -60], [1140, 1980], [-60, 1980]],
    2: [[-60, -60], [1140, -60], [1140, 500], [-60, 960]],
  };
  if (!q[n]) return;
  l.semilla(990 + n);
  l.mancha(q[n], c, {paso: 74, rebose: 0, capa: 'arriba', ang: -24, huecos: 0});
};

// ───────────────────────── escenas ─────────────────────────
/** Portada: abre el vídeo y lo cierra igual, para que el final empalme con el principio. */
const portada = (l: Lienzo, t: number, t0: number, boca: number) => {
  const tl = t - t0;
  const fase = alterna(tl, 0.2);
  mono(l, {x: 500 + (fase ? 26 : -26), y: 1500 + (fase ? -46 : 0), e: 0.86, pose: fase ? 'panico2' : 'panico', ojos: 'susto', boca, mir: fase ? [16, -16] : [-12, 10], r: fase ? 4 : -4});
  const ata = alterna(tl, 0.3);
  pez(l, 860 + (ata ? 20 : -14), 470 + (ata ? -30 : 16), 0.72, {mira: -1, antifaz: true});
  l.semilla(16);
  l.mancha([[60, 120], [1010, 70], [1030, 300], [40, 340]], LILA, {paso: 58, rebose: 44, huecos: 0.3, ang: -6});
  garabato(l, 950, 700, 74, 3);
  garabato(l, 110, 1190, 62, 4);
  rotulo(l, 'HACKEADO', 540, 70, 250, {seed: 12, caos: 1.25});
  rotulo(l, 'POR UN', 300, 368, 150, {seed: 13, maxW: 520});
  l.semilla(15);
  l.mancha([[120, 1420], [960, 1390], [990, 1720], [90, 1760]], ROJO, {paso: 52, rebose: 40, ang: -14, huecos: 0.16, sombra: '#8E1C14'});
  rotulo(l, 'PEZ', 540, 1400, 300, {seed: 14, caos: 0.9, w: 44, capa: 'arriba', maxW: 800});
  motas(l, 21, 9, LILA);
};

type Esc = {t0: number; t1: number; f: (l: Lienzo, t: number) => void};
const ESCENAS: Esc[] = [
  {t0: 0, t1: 2.7, f: (l, t) => portada(l, t, 0, bocaEn(t) || 3)},
  {
    t0: 2.7, t1: 4.35,
    f: (l, t) => {
      const tr = pop(t, 3.68);
      if (t < 3.68) {
        mono(l, {x: 540, y: 1660, e: 1, pose: alterna(t, 0.3) ? 'encoge' : 'jarras2', boca: bocaEn(t), mir: [18, -8], ojos: 'normal'});
        rotulo(l, 'BUENO...', 540, 170, 240, {seed: 31, t, desde: 2.78, vel: 1.4});
      } else {
        pecera(l, 540, 1080 - brinco(t, 3.68) * -0.5, 1.28 * tr, {});
        rotulo(l, 'PECERA', 540, 130, 300, {seed: 32, t, desde: 3.68, vel: 3, caos: 1.1});
        rotulo(l, 'SU', 150, 500, 130, {seed: 33, t, desde: 3.52, vel: 3});
        mono(l, {x: 900, y: 1860, e: 0.46, pose: alterna(t, 0.2) ? 'senalaIzq' : 'arriba', boca: bocaEn(t), mir: [-18, 0]});
      }
    },
  },
  {
    t0: 4.35, t1: 6.85,
    f: (l, t) => {
      const b = alterna(t, 0.3);
      mono(l, {x: 540, y: 1690 + brinco(t, 5.19) * 0.6, e: 0.92, pose: b ? 'jarras' : 'jarras2', boca: bocaEn(t), mir: [b ? -22 : 22, -6]});
      const cams: [number, number, number, number, number][] = [
        [210, 770, 0.72, 16, 4.7], [870, 770, 0.72, 164, 4.95], [170, 1300, 0.62, -14, 5.8], [920, 1300, 0.62, 196, 6.1],
      ];
      cams.forEach(([x, y, e, r, tt], i) => {
        if (t >= tt) camara(l, x, y, e * pop(t, tt), r + (alterna(t + i * 0.1, 0.5) ? 8 : -8), i);
      });
      if (t >= 5.19) {
        mono(l, {x: 150, y: 1800 + brinco(t, 5.19), e: 0.3 * pop(t, 5.19), pose: 'jarras', gorra: true, corona: false, color: '#7C93C9', color2: '#3C5CA8', id: 4});
        mono(l, {x: 930, y: 1800 + brinco(t, 5.5), e: 0.3 * pop(t, 5.5), pose: 'jarras', gorra: true, corona: false, color: '#7C93C9', color2: '#3C5CA8', id: 5});
      }
      rotulo(l, 'CÁMARAS', 540, 90, 210, {seed: 41, t, desde: 4.7, vel: 3});
      rotulo(l, 'GUARDIAS', 540, 320, 170, {seed: 42, t, desde: 5.19, vel: 3});
    },
  },
  {
    t0: 6.85, t1: 10.95,
    f: (l, t) => {
      const lejos = t < 9.2;
      if (lejos) {
        const x = 230 + Math.min(10, Math.floor((t - 6.9) * 3.4)) * 11;
        mono(l, {x, y: 1720 - alterna(t, 0.2) * 34, e: 0.72, pose: alterna(t, 0.2) ? 'andar1' : 'andar2', boca: bocaEn(t), mir: [20, 0]});
        if (t < 7.5) rotulo(l, 'PERO...', 540, 170, 300, {seed: 50, t, desde: 6.94, vel: 2.6, caos: 1.2, c: ROJO});
        else rotulo(l, 'VESTÍBULO', 540, 100, 170, {seed: 51, t, desde: 7.5, vel: 3});
        if (t >= 8.2) {
          pecera(l, 760, 980 + brinco(t, 8.2) * 0.4, 0.74 * pop(t, 8.32 - 0.1), {});
          rotulo(l, 'ACUARIO', 540, 320, 220, {seed: 52, t, desde: 8.32, vel: 3, caos: 1.1});
        }
      } else {
        pecera(l, 300, 1320, 0.86 * pop(t, 9.2), {termo: false});
        termometro(l, 780, 1030 + brinco(t, 9.2), 1.25 * pop(t, 9.2), 0.32 + alterna(t, 0.4, 3) * 0.12);
        rotulo(l, 'TERMÓMETRO', 540, 90, 190, {seed: 53, t, desde: 9.2, vel: 4});
        if (t >= 10.1) {
          wifi(l, 790, 560, 0.86 * pop(t, 10.18));
          rotulo(l, 'INTERNET', 330, 380, 150, {seed: 54, t, desde: 10.18, vel: 4, c: ROJO, maxW: 590});
        }
      }
    },
  },
  {
    t0: 10.95, t1: 12.25,
    f: (l, t) => {
      l.semilla(60);
      l.mancha([[40, 110], [1040, 70], [1050, 620], [30, 640]], LILA, {paso: 66, rebose: 50, huecos: 0.24, ang: -12});
      garabato(l, 930, 690, 66, 5);
      mono(l, {x: 330, y: 1700, e: 0.8, pose: 'pie', ojos: 'dormido', boca: 0, r: alterna(t, 0.5) ? -6 : -2});
      camara(l, 840, 1370, 0.62, 200, 2);
      termometro(l, 800, 880, 0.72, 0.5, 8);
      rotulo(l, 'NADIE', 540, 90, 310, {seed: 61, t, desde: 11.04, vel: 2.4, caos: 1.25});
      rotulo(l, 'LO VIGILABA', 540, 410, 165, {seed: 62, t, desde: 11.36, vel: 4});
      if (alterna(t, 0.3)) rotulo(l, 'Z', 610, 900, 90, {seed: 63});
      else rotulo(l, 'Z', 650, 830, 120, {seed: 64});
    },
  },
  {
    t0: 12.25, t1: 14.72,
    f: (l, t) => {
      if (t < 13.78) {
        termometro(l, 800, 1120, 1.1, 0.5);
        const n = Math.floor((t - 12.3) * 5);
        const xs = [-90, 40, 170, 300, 410, 520, 610, 640];
        const hx = xs[Math.min(xs.length - 1, Math.max(0, n))];
        const salto = alterna(t, 0.2) * 40;
        hacker(l, hx, 1440 - salto, 0.9, 1, [18, -6]);
        if (t > 12.7) hacker(l, hx - 300, 1500 - (40 - salto), 0.7, 2, [18, 0]);
        rotulo(l, 'HACKERS', 540, 110, 250, {seed: 71, t, desde: 12.52, vel: 3, caos: 1.15});
        rotulo(l, 'POR AHÍ', 400, 420, 170, {seed: 72, t, desde: 13.26, vel: 3, c: ROJO, maxW: 640});
      } else {
        const red: P[] = [[160, 760], [520, 620], [900, 800], [240, 1200], [640, 1120], [920, 1320], [420, 1520], [780, 1620]];
        const lazos = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 4], [3, 6], [4, 5], [4, 6], [5, 7], [6, 7]];
        l.semilla(740);
        lazos.forEach(([a, b]) => l.linea([red[a], red[b]], {w: 13, pasadas: 1, amp: 8, recta: true}));
        red.forEach((q, i) => {
          l.semilla(750 + i);
          l.mancha(elipse(q[0], q[1], 58, 58, 10), LILA, {paso: 20, rebose: 10});
          l.linea(elipse(q[0], q[1], 54, 54, 10), {w: 15, cerrada: true, pasadas: 1, amp: 5});
        });
        const ruta = [0, 1, 4, 5];
        const i = Math.min(3, Math.max(0, Math.floor((t - 13.78) / 0.28)));
        const q = red[ruta[i]];
        const fr = (t - 13.78) / 0.28 - i;
        hacker(l, q[0], q[1] - 40 - (fr < 0.5 ? 70 : 0), 0.55, 1, [12, 10]);
        rotulo(l, 'SALTARON', 540, 110, 210, {seed: 73, t, desde: 13.78, vel: 3});
        rotulo(l, 'A LA RED', 540, 340, 170, {seed: 74, t, desde: 14.1, vel: 4, c: ROJO});
      }
    },
  },
  {
    t0: 14.72, t1: 17.1,
    f: (l, t) => {
      const f = alterna(t, 0.2);
      hacker(l, 290, 1500 - f * 26, 1.3, 1, [24, -14]);
      if (t >= 15.3) {
        lista(l, 690, 1160 + brinco(t, 15.4), 1.05 * pop(t, 15.4), f ? 6 : -4);
        rotulo(l, 'LA LISTA', 540, 100, 210, {seed: 81, t, desde: 15.3, vel: 3});
      } else rotulo(l, 'ENCONTRARON', 540, 150, 170, {seed: 82, t, desde: 14.76, vel: 5});
      if (t >= 15.9) {
        rotulo(l, 'GRANDES', 540, 320, 165, {seed: 83, t, desde: 15.9, vel: 4, c: ROJO});
        rotulo(l, 'APOSTADORES', 540, 500, 135, {seed: 84, t, desde: 16.16, vel: 5});
      }
    },
  },
  {
    t0: 17.1, t1: 19.42,
    f: (l, t) => {
      termometro(l, 560, 1060 + brinco(t, 18.5) * 0.4, 1.22, 0.5 + Math.min(0.5, Math.max(0, t - 17.6) * 0.3));
      const n = dib(t, 17.52);
      if (n < 12) {
        const k = n < 0 ? 0 : n;
        const py = 1540 - k * 150;
        const es = 0.62 - k * 0.042;
        lista(l, 560 + (k % 2 ? 26 : -26), py, Math.max(0.1, es), k % 2 ? 11 : -11);
      }
      hacker(l, 210, 1560 - alterna(t, 0.2) * 24, 0.6, 1, [24, -24]);
      mono(l, {x: 860, y: 1780, e: 0.5, pose: alterna(t, 0.2) ? 'panico' : 'panico2', ojos: 'susto', boca: bocaEn(t) || 3, mir: [-12, -12]});
      rotulo(l, 'SE LA', 240, 100, 150, {seed: 91, t, desde: 17.3, vel: 3, maxW: 400});
      rotulo(l, 'LLEVARON', 540, 280, 220, {seed: 92, t, desde: 17.52, vel: 3.4, caos: 1.1});
      if (t > 18.5) rotulo(l, 'POR AQUÍ', 800, 120, 110, {seed: 93, t, desde: 18.5, vel: 4, c: ROJO, maxW: 480});
    },
  },
  {
    t0: 19.42, t1: 23.15,
    f: (l, t) => {
      casita(l, 540, 960, 0.92);
      rotulo(l, 'TU CASA', 540, 110, 230, {seed: 101, t, desde: 19.9, vel: 3, caos: 1.1});
      if (t >= 20.96) tele(l, 290, 960, 0.92 * pop(t, 20.96));
      if (t >= 21.5) bombilla(l, 780, 950, 0.9 * pop(t, 21.5));
      if (t >= 22.18) robot(l, 540, 1300 + brinco(t, 22.18) * 0.3, 0.92 * pop(t, 22.18));
      const dice = t < 20.96 ? 'arriba' : alterna(t, 0.3) ? 'senalaArr' : 'senalaIzq';
      mono(l, {x: 800, y: 1880 + brinco(t, 19.74), e: 0.48, pose: dice, boca: bocaEn(t), mir: [-16, -14]});
      if (t >= 20.96) rotulo(l, 'TELE', 270, 1120, 84, {seed: 102, t, desde: 20.96, vel: 3});
      if (t >= 21.5) rotulo(l, 'BOMBILLA', 780, 1125, 70, {seed: 103, t, desde: 21.5, vel: 4, maxW: 360});
      if (t >= 22.18) rotulo(l, 'ROBOT', 300, 1370, 90, {seed: 104, t, desde: 22.18, vel: 3, maxW: 400});
    },
  },
  {
    t0: 23.15, t1: 25.32,
    f: (l, t) => {
      if (t < 24.54) {
        casita(l, 540, 1120, 0.78);
        tele(l, 320, 1170, 0.8);
        bombilla(l, 750, 1130, 0.82);
        robot(l, 540, 1390, 0.76);
        if (t >= 23.95) {
          wifi(l, 320, 1000, 0.62);
          wifi(l, 760, 930, 0.62);
          wifi(l, 660, 1330, 0.52);
        }
        rotulo(l, 'CADA', 540, 100, 190, {seed: 111, t, desde: 23.24, vel: 3});
        rotulo(l, 'CACHARRO', 540, 300, 170, {seed: 112, t, desde: 23.38, vel: 4, c: ROJO});
        if (t >= 23.82) rotulo(l, 'CON WIFI', 540, 1540, 200, {seed: 115, t, desde: 23.82, vel: 4, caos: 1.2, capa: 'arriba'});
      } else {
        puerta(l, 620, 1240, 1.05 * pop(t, 24.54));
        rotulo(l, 'UNA', 240, 110, 170, {seed: 113, t, desde: 24.54, vel: 4, maxW: 380});
        rotulo(l, 'PUERTA', 540, 310, 280, {seed: 114, t, desde: 24.68, vel: 4, caos: 1.1, c: ROJO});
      }
    },
  },
  {
    t0: 25.32, t1: 26.7,
    f: (l, t) => {
      const f = alterna(t, 0.2);
      mono(l, {x: 540, y: 1710 + brinco(t, 25.36), e: 0.86, pose: f ? 'sostiene' : 'sostiene2', boca: bocaEn(t), mir: [0, 22]});
      candado(l, 540 + (f ? 14 : -14), 1400 + brinco(t, 25.96) * 0.5, 0.82 * pop(t, 25.36));
      rotulo(l, 'CÁMBIALE', 540, 90, 220, {seed: 121, t, desde: 25.36, vel: 4, caos: 1.1});
      rotulo(l, 'LA CONTRASEÑA', 540, 350, 150, {seed: 122, t, desde: 25.86, vel: 6});
    },
  },
  {t0: 26.7, t1: 99, f: (l, t) => portada(l, t, 26.7, bocaEn(t) || 3)},
];

// golpes de cámara y cortinillas (en dibujos)
const GOLPES = [0, 2.06, 3.68, 8.32, 9.2, 10.18, 13.4, 15.4, 18.5, 24.68, 25.96, 26.78, 27.64];
const CORTINAS: [number, string][] = [[4.3, LILA], [10.9, ROJO], [19.37, LILA], [26.65, ROJO]];

export const NaiveMono: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / NAIVE_FPS;
  const sinFiltro = Boolean(getInputProps().sinFiltro); // solo para medir lo que cuestan los filtros
  // el temblor cicla entre 4 dibujos: "hierve" sin parpadear
  const l = new Lienzo(frame % 4);
  const e = ESCENAS.find((s) => t >= s.t0 && t < s.t1) ?? ESCENAS[ESCENAS.length - 1];
  e.f(l, t);
  for (const [tc, c] of CORTINAS) barrido(l, dib(t, tc), c);

  let cx = 0;
  let cy = 0;
  let ce = 1;
  for (const g of GOLPES) {
    const n = dib(t, g);
    if (n >= 0 && n < 3) {
      cx = [26, -18, 8][n];
      cy = [-22, 14, -6][n];
      ce = [1.05, 1.02, 1][n];
    }
  }
  const of = [[-20, -30], [-90, -130], [-140, -60], [-60, -180]][frame % 4];
  const ofV = [[0, 0], [-60, -50], [-30, -100]][Math.floor(frame / 2) % 3];
  const capa = (hijos: React.ReactNode[], f: string) => (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
      <g filter={sinFiltro ? undefined : `url(#${f})`}>{hijos}</g>
    </svg>
  );
  return (
    <AbsoluteFill style={{backgroundColor: PAPEL, overflow: 'hidden'}}>
      <Img src={staticFile('naive/papel.jpg')} style={{position: 'absolute', inset: 0, width: W, height: H}} />
      <svg width={0} height={0} style={{position: 'absolute'}}>
        <defs>
          <filter id="fTinta" x="0" y="0" width={W} height={H} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.055" numOctaves={2} seed={frame % 4} result="r" />
            <feDisplacementMap in="SourceGraphic" in2="r" scale={13} xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="fColor" x="0" y="0" width={W} height={H} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves={2} seed={10 + (frame % 4)} result="r" />
            <feDisplacementMap in="SourceGraphic" in2="r" scale={22} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div style={{position: 'absolute', inset: 0, transform: `translate(${cx}px,${cy}px) scale(${ce})`}}>
        {capa(l.color, 'fColor')}
        <Img
          src={staticFile('naive/vetas.png')}
          style={{position: 'absolute', left: -230, top: -260, width: 1600, height: 2708, transform: `translate(${ofV[0]}px,${ofV[1]}px) rotate(-26deg)`}}
        />
        {capa(l.tinta, 'fTinta')}
        {capa(l.arriba, 'fTinta')}
      </div>
      <Img src={staticFile('naive/diente.png')} style={{position: 'absolute', left: of[0], top: of[1], width: 1300, height: 2200}} />
    </AbsoluteFill>
  );
};

export const NaiveRoot: React.FC = () => (
  <Composition id="NaiveMono" component={NaiveMono} durationInFrames={Math.round(DURACION * NAIVE_FPS)} fps={NAIVE_FPS} width={W} height={H} />
);
