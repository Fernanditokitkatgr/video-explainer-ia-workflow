/**
 * BIBLIOTECA DE PERSONAJES del motor: el mono stick cutre y sus amigos, dibujados por código.
 *
 *   <Mono tipo="ciberdelincuente" pose="señalar" cara="risa" x={1300} y={980} escala={1} />
 *
 * Todos comparten el mismo esqueleto de palitos (hoja channel/tecno/references/mono_stick_cutre.png):
 * cabeza redonda marrón con dos orejas, máscara de la cara más clara, ojos de punto y cuerpo de palo.
 * Cada `tipo` añade su disfraz (capucha y antifaz, traje y puro, cabeza de robot, gafas y bastón…).
 *
 * Animación de marioneta, siempre encendida:
 *   - respiración (estira y encoge), balanceo, parpadeo cada pocos segundos;
 *   - si `habla`, la boca se abre por sílabas con la voz (tiempos de whisper) y da un saltito por palabra;
 *   - al cambiar de pose, los brazos llegan con rebote y el cuerpo se aplasta un instante;
 *   - el trazo "hierve" cada 4 fotogramas.
 * Las entradas y salidas con salto y los desplazamientos los pone el Reparto (Reparto.tsx).
 */
import React from 'react';
import {C, easeOut, jit, lerp, overshoot, ramp, useBoil, wobEllipse, wobLine, wobPoly, wobRect} from './base';
import {aperturaBoca, inicioPalabra, usePalabras, useT} from './tiempo';

export type TipoMono = 'protagonista' | 'ciberdelincuente' | 'rico' | 'ia' | 'abuelo' | 'currito' | 'nino';
export type Pose =
  | 'de_pie'
  | 'señalar'
  | 'señalar_arriba'
  | 'brazos_arriba'
  | 'pensar'
  | 'encogerse'
  | 'correr'
  | 'caminar'
  | 'sentado'
  | 'brazos_cruzados'
  | 'saludar'
  | 'jarras'
  | 'miedo'
  | 'presentar'
  | 'celebrar'
  | 'empujar';
export type Cara = 'normal' | 'sorpresa' | 'risa' | 'miedo' | 'enfado' | 'guiño' | 'triste' | 'chulo';
export type Objeto =
  | 'ninguno'
  | 'bolsa'
  | 'bitcoin'
  | 'movil'
  | 'baston'
  | 'puntero'
  | 'billete'
  | 'lupa'
  | 'pizza'
  | 'megafono'
  | 'puro';

export const TIPOS: TipoMono[] = ['protagonista', 'ciberdelincuente', 'rico', 'ia', 'abuelo', 'currito', 'nino'];
export const POSES: Pose[] = [
  'de_pie', 'señalar', 'señalar_arriba', 'brazos_arriba', 'pensar', 'encogerse', 'correr', 'caminar', 'sentado',
  'brazos_cruzados', 'saludar', 'jarras', 'miedo', 'presentar', 'celebrar', 'empujar',
];
export const CARAS: Cara[] = ['normal', 'sorpresa', 'risa', 'miedo', 'enfado', 'guiño', 'triste', 'chulo'];

// ───────────────────────── esqueleto ─────────────────────────
type Ang = [number, number]; // [segmento 1, segmento 2] en grados absolutos: 0 = abajo, 90 = derecha, 180 = arriba
type PoseDef = {lA: Ang; rA: Ang; lL: Ang; rL: Ang; lean?: number; tilt?: number; drop?: number; lift?: number};

const dir = (a: number): [number, number] => [Math.sin((a * Math.PI) / 180), Math.cos((a * Math.PI) / 180)];

/** Poses estáticas (las dinámicas se calculan con el tiempo en poseAt). */
const POSE_DEF: Record<Exclude<Pose, 'correr' | 'caminar' | 'celebrar' | 'saludar' | 'miedo'>, PoseDef> = {
  de_pie: {lA: [-14, -8], rA: [14, 8], lL: [-8, -4], rL: [8, 4]},
  señalar: {lA: [-14, -6], rA: [84, 96], lL: [-9, -4], rL: [9, 4], tilt: 4},
  señalar_arriba: {lA: [-14, -6], rA: [118, 146], lL: [-9, -4], rL: [9, 4], tilt: -6},
  brazos_arriba: {lA: [-112, -140], rA: [112, 140], lL: [-13, -8], rL: [13, 8]},
  pensar: {lA: [-12, 62], rA: [30, -155], lL: [-8, -4], rL: [8, 4], tilt: 9},
  encogerse: {lA: [-75, -130], rA: [75, 130], lL: [-8, -4], rL: [8, 4], tilt: -8, lift: 12},
  sentado: {lA: [-30, 40], rA: [30, -40], lL: [-62, -4], rL: [62, 4], drop: 52},
  brazos_cruzados: {lA: [-26, 74], rA: [26, -74], lL: [-9, -4], rL: [9, 4], tilt: -3},
  jarras: {lA: [-48, 38], rA: [48, -38], lL: [-11, -6], rL: [11, 6]},
  presentar: {lA: [-14, -8], rA: [58, 118], lL: [-9, -4], rL: [9, 4], tilt: 5},
  empujar: {lA: [70, 88], rA: [80, 92], lL: [-30, -20], rL: [25, 10], lean: 14},
};

const poseAt = (pose: Pose, t: number, seed: number): PoseDef => {
  if (pose === 'correr' || pose === 'caminar') {
    const run = pose === 'correr';
    const ph = t * Math.PI * 2 * (run ? 2.3 : 1.4) + seed;
    const s = Math.sin(ph);
    const A = run ? 55 : 28;
    const Lg = run ? 42 : 24;
    return {
      lA: [A * s, A * s + (run ? 85 : 25)],
      rA: [-A * s, -A * s + (run ? 85 : 25)],
      lL: [Lg * s, Lg * s - (run ? 55 : 20) * (0.5 + 0.5 * Math.cos(ph))],
      rL: [-Lg * s, -Lg * s - (run ? 55 : 20) * (0.5 - 0.5 * Math.cos(ph))],
      lean: run ? 12 : 4,
      tilt: run ? 6 : 2,
    };
  }
  if (pose === 'celebrar') {
    const w = Math.sin(t * 14 + seed) * 12;
    return {lA: [-112 + w * 0.5, -140 + w], rA: [112 - w * 0.5, 140 - w], lL: [-14, -10], rL: [14, 10]};
  }
  if (pose === 'saludar') {
    const w = Math.sin(t * 12 + seed) * 22;
    return {lA: [-14, -8], rA: [108, 152 + w], lL: [-9, -4], rL: [9, 4], tilt: -4};
  }
  if (pose === 'miedo') {
    const tr = Math.sin(t * 60 + seed) * 3;
    return {lA: [-100 + tr, -165 + tr], rA: [100 - tr, 165 - tr], lL: [7, -7], rL: [-7, 7], tilt: tr};
  }
  return POSE_DEF[pose] ?? POSE_DEF.de_pie;
};

const mixAng = (a: Ang, b: Ang, p: number): Ang => [lerp(a[0], b[0], p), lerp(a[1], b[1], p)];
const mixPose = (a: PoseDef, b: PoseDef, p: number): PoseDef => ({
  lA: mixAng(a.lA, b.lA, p),
  rA: mixAng(a.rA, b.rA, p),
  lL: mixAng(a.lL, b.lL, p),
  rL: mixAng(a.rL, b.rL, p),
  lean: lerp(a.lean ?? 0, b.lean ?? 0, p),
  tilt: lerp(a.tilt ?? 0, b.tilt ?? 0, p),
  drop: lerp(a.drop ?? 0, b.drop ?? 0, p),
  lift: lerp(a.lift ?? 0, b.lift ?? 0, p),
});

/** Medidas del esqueleto (unidades del SVG; el mono mide ~600 de alto a escala 1). */
const RIG = {
  normal: {hip: 205, sh: 330, head: 105, neck: 125, ua: 104, fa: 100, th: 106, sn: 100},
  nino: {hip: 150, sh: 252, head: 112, neck: 128, ua: 76, fa: 70, th: 78, sn: 74},
};

// ───────────────────────── caras ─────────────────────────
const INK = C.ink;
const SW = 6; // grosor del rotulador

const Ojo: React.FC<{x: number; cerrado: boolean; r?: number; b: number; id: string}> = ({x, cerrado, r = 7.5, b, id}) =>
  cerrado ? (
    <path d={wobLine([x - 11, -18], [x + 11, -18], `${id}oc${x}${b}`, 1)} stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
  ) : (
    <circle cx={x + jit(`${id}ox${x}${b}`, 0.6)} cy={-20 + jit(`${id}oy${x}${b}`, 0.6)} r={r} fill={INK} />
  );

/** Cara de mono (ojos, cejas, nariz, boca) centrada en la cabeza. */
const CaraMono: React.FC<{cara: Cara; abre: number; parpadeo: boolean; b: number; id: string; t: number}> = ({cara, abre, parpadeo, b, id, t}) => {
  const L = (d: string, w = 5) => <path d={d} stroke={INK} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
  const wl = (a: [number, number], c: [number, number], s: string) => wobLine(a, c, `${id}${s}${b}`, 1.2, 3);
  const cerr = parpadeo;
  const ojos = () => {
    switch (cara) {
      case 'risa':
        return (
          <>
            {L(`M-42 -16 Q-31 -32 -20 -16`)}
            {L(`M20 -16 Q31 -32 42 -16`)}
          </>
        );
      case 'guiño':
        return (
          <>
            <Ojo x={-31} cerrado={cerr} b={b} id={id} />
            {L(`M20 -18 Q31 -28 42 -18`)}
          </>
        );
      case 'chulo':
        return (
          <>
            {L(wl([-44, -27], [-17, -25], 'pl'))}
            {L(wl([17, -25], [44, -27], 'pr'))}
            <path d="M-38 -25 A8 8 0 0 0 -22 -25 Z" fill={INK} />
            <path d="M22 -25 A8 8 0 0 0 38 -25 Z" fill={INK} />
          </>
        );
      case 'sorpresa':
        return (
          <>
            <Ojo x={-31} cerrado={cerr} r={9.5} b={b} id={id} />
            <Ojo x={31} cerrado={cerr} r={9.5} b={b} id={id} />
          </>
        );
      default:
        return (
          <>
            <Ojo x={-31} cerrado={cerr} b={b} id={id} />
            <Ojo x={31} cerrado={cerr} b={b} id={id} />
          </>
        );
    }
  };
  const cejas = () => {
    switch (cara) {
      case 'sorpresa':
        return (
          <>
            {L(`M-46 -44 Q-31 -56 -16 -46`)}
            {L(`M16 -46 Q31 -56 46 -44`)}
          </>
        );
      case 'miedo':
      case 'triste':
        return (
          <>
            {L(wl([-46, -38], [-18, -50], 'cl'))}
            {L(wl([18, -50], [46, -38], 'cr'))}
          </>
        );
      case 'enfado':
        return (
          <>
            {L(wl([-46, -50], [-16, -36], 'cl'), 6)}
            {L(wl([16, -36], [46, -50], 'cr'), 6)}
          </>
        );
      default:
        return null;
    }
  };
  const boca = () => {
    if (abre > 0.12 && cara !== 'risa') {
      return (
        <path
          d={wobEllipse(0, 46, 12 + abre * 6, 4 + abre * 15, `${id}bo${b}`, 0.06, 10)}
          fill="#5A2318"
          stroke={INK}
          strokeWidth={4.5}
        />
      );
    }
    switch (cara) {
      case 'sorpresa':
        return <path d={wobEllipse(0, 48, 12, 17, `${id}bs${b}`, 0.06, 10)} fill={C.furDark} stroke={INK} strokeWidth={4.5} />;
      case 'risa': {
        const o = 1 + abre * 0.35;
        return (
          <>
            <path d={`M-30 30 Q0 ${30 + 42 * o} 30 30 Z`} fill="#7A2418" stroke={INK} strokeWidth={4.5} strokeLinejoin="round" />
            <path d={`M-12 ${44 + 10 * o} Q0 ${36 + 10 * o} 12 ${44 + 10 * o} Q0 ${54 + 12 * o} -12 ${44 + 10 * o} Z`} fill={C.pink} />
          </>
        );
      }
      case 'miedo':
        return L(`M-28 46 q7 -8 14 0 q7 8 14 0 q7 -8 14 0 q7 8 14 0`, 4.5);
      case 'enfado':
        return L(`M-22 52 Q0 38 22 52`);
      case 'triste':
        return L(`M-20 52 Q0 40 20 52`);
      case 'guiño':
        return L(`M-20 44 Q6 56 28 36`);
      case 'chulo':
        return L(wl([-24, 45], [24, 42], 'bc'), 4.5);
      default:
        return L(`M-22 40 q11 12 22 0 q11 12 22 0`, 4.5);
    }
  };
  const extra = () => {
    if (cara === 'miedo') {
      const y = -46 + ((t * 40) % 30);
      return <path d={`M78 ${y} q-10 16 0 22 q10 -6 0 -22 Z`} fill={C.blue} stroke={INK} strokeWidth={3} />;
    }
    if (cara === 'triste') {
      const y = -2 + ((t * 60) % 50);
      return <path d={`M-36 ${y} q-8 14 0 18 q8 -4 0 -18 Z`} fill={C.blue} stroke={INK} strokeWidth={3} opacity={1 - ((t * 60) % 50) / 50} />;
    }
    if (cara === 'enfado') {
      return (
        <>
          <ellipse cx={-52} cy={18} rx={14} ry={8} fill={C.red} opacity={0.45} />
          <ellipse cx={52} cy={18} rx={14} ry={8} fill={C.red} opacity={0.45} />
        </>
      );
    }
    if (cara === 'risa' || cara === 'guiño') {
      return (
        <>
          <ellipse cx={-54} cy={16} rx={13} ry={7} fill={C.pink} opacity={0.55} />
          <ellipse cx={54} cy={16} rx={13} ry={7} fill={C.pink} opacity={0.55} />
        </>
      );
    }
    return null;
  };
  return (
    <g>
      {ojos()}
      {cejas()}
      {/* nariz: dos puntitos */}
      <circle cx={-7} cy={10} r={3} fill={INK} />
      <circle cx={7} cy={10} r={3} fill={INK} />
      {boca()}
      {extra()}
    </g>
  );
};

/** Cara del mono IA: pantalla con ojos de luz. */
const CaraRobot: React.FC<{cara: Cara; abre: number; parpadeo: boolean; b: number; id: string; t: number}> = ({cara, abre, parpadeo, b, id, t}) => {
  const G = '#4DF3FF';
  const glow = {filter: 'drop-shadow(0 0 6px #4DF3FF)'};
  const eye = (x: number) => {
    if (parpadeo) return <rect x={x - 14} y={-20} width={28} height={5} rx={2} fill={G} />;
    switch (cara) {
      case 'risa':
      case 'guiño':
        return cara === 'guiño' && x > 0 ? (
          <rect x={x - 14} y={-20} width={28} height={6} rx={3} fill={G} />
        ) : (
          <path d={`M${x - 15} -12 Q${x} -34 ${x + 15} -12`} stroke={G} strokeWidth={7} fill="none" strokeLinecap="round" />
        );
      case 'enfado':
        return <path d={x < 0 ? `M${x - 15} -32 L${x + 15} -20 L${x + 15} -8 L${x - 15} -8 Z` : `M${x - 15} -20 L${x + 15} -32 L${x + 15} -8 L${x - 15} -8 Z`} fill={C.red} />;
      case 'sorpresa':
        return <circle cx={x} cy={-18} r={16} fill={G} />;
      case 'triste':
      case 'miedo':
        return <path d={`M${x - 15} -24 Q${x} -6 ${x + 15} -24`} stroke={G} strokeWidth={7} fill="none" strokeLinecap="round" />;
      case 'chulo':
        return <rect x={x - 15} y={-22} width={30} height={10} rx={4} fill={G} />;
      default:
        return <rect x={x - 12} y={-32} width={24} height={26} rx={7} fill={G} />;
    }
  };
  const bars = Array.from({length: 7}, (_, i) => {
    const h = abre > 0.1 ? 4 + abre * 26 * Math.abs(Math.sin(t * 22 + i * 1.3)) : 3;
    return <rect key={i} x={-30 + i * 9} y={38 - h / 2} width={6} height={h} rx={2} fill={cara === 'enfado' ? C.red : G} />;
  });
  return (
    <g>
      <path d={wobRect(-74, -60, 148, 124, `${id}scr${b}`, 2, 24)} fill="#1E2A38" stroke={INK} strokeWidth={5} />
      <g style={glow}>
        {eye(-30)}
        {eye(30)}
        {bars}
      </g>
    </g>
  );
};

// ───────────────────────── objetos en la mano ─────────────────────────
const Bolsa: React.FC<{b: number; id: string}> = ({b, id}) => (
  <g transform="translate(0 8)">
    <path d={wobPoly([[-14, 0], [14, 0], [42, 40], [40, 82], [0, 92], [-40, 82], [-42, 40]], `${id}bg${b}`, 2.5, true)} fill="#C9A26B" stroke={INK} strokeWidth={5} />
    <path d={wobLine([-18, 4], [18, 4], `${id}bt${b}`)} stroke={INK} strokeWidth={7} />
    <text x={0} y={70} textAnchor="middle" fontFamily="MontserratXB" fontSize={40} fill={C.green} stroke={INK} strokeWidth={2}>
      $
    </text>
  </g>
);
const MonedaBTC: React.FC<{r?: number; b: number; id: string}> = ({r = 30, b, id}) => (
  <g>
    <path d={wobEllipse(0, 0, r, r, `${id}co${b}`, 0.04)} fill={C.gold} stroke={INK} strokeWidth={5} />
    <path d={wobEllipse(0, 0, r * 0.72, r * 0.72, `${id}ci${b}`, 0.05)} fill="none" stroke={INK} strokeWidth={2.5} opacity={0.6} />
    <text x={0} y={r * 0.42} textAnchor="middle" fontFamily="MontserratXB" fontSize={r * 1.2} fill={C.paper} stroke={INK} strokeWidth={2.5}>
      ₿
    </text>
  </g>
);

const ObjetoMano: React.FC<{obj: Objeto; b: number; id: string; t: number}> = ({obj, b, id, t}) => {
  switch (obj) {
    case 'bolsa':
      return <Bolsa b={b} id={id} />;
    case 'bitcoin':
      return (
        <g transform="translate(0 -30)">
          <MonedaBTC b={b} id={id} />
        </g>
      );
    case 'movil':
      return (
        <g transform="translate(0 -30) rotate(-8)">
          <path d={wobRect(-22, -38, 44, 76, `${id}mv${b}`, 1.5, 8)} fill={C.ink} stroke={INK} strokeWidth={4} />
          <rect x={-16} y={-30} width={32} height={56} rx={4} fill={C.blue} />
          <circle cx={0} cy={31} r={3} fill={C.paper} />
        </g>
      );
    case 'baston':
      return <path d={`M0 0 L4 ${210 + jit(`${id}bs${b}`, 2)} M0 0 Q-2 -26 -24 -22`} stroke="#7A4B2A" strokeWidth={9} fill="none" strokeLinecap="round" />;
    case 'puntero':
      return <path d={wobLine([0, 0], [120, -70], `${id}pt${b}`, 1.5)} stroke="#B5651D" strokeWidth={8} strokeLinecap="round" />;
    case 'billete':
      return (
        <g transform={`rotate(${-15 + Math.sin(t * 6) * 6})`}>
          <path d={wobRect(-40, -22, 80, 44, `${id}bl${b}`, 2, 6)} fill="#8BD17C" stroke={INK} strokeWidth={4} />
          <text x={0} y={12} textAnchor="middle" fontFamily="MontserratXB" fontSize={30} fill={C.ink}>
            $
          </text>
        </g>
      );
    case 'lupa':
      return (
        <g transform="rotate(-30)">
          <path d={wobLine([0, 0], [0, -60], `${id}lm${b}`)} stroke="#7A4B2A" strokeWidth={11} strokeLinecap="round" />
          <path d={wobEllipse(0, -95, 36, 36, `${id}lv${b}`)} fill="#DFF6FF" fillOpacity={0.7} stroke={INK} strokeWidth={7} />
        </g>
      );
    case 'pizza':
      return (
        <g transform="translate(0 -20) rotate(20)">
          <path d={wobPoly([[-38, -30], [38, -30], [0, 50]], `${id}pz${b}`, 2, true)} fill={C.yellow} stroke={INK} strokeWidth={5} />
          <path d="M-38 -30 Q0 -44 38 -30" stroke="#C97B2A" strokeWidth={10} fill="none" />
          <circle cx={-10} cy={-8} r={7} fill={C.red} />
          <circle cx={10} cy={8} r={6} fill={C.red} />
        </g>
      );
    case 'megafono':
      return (
        <g transform="rotate(-20)">
          <path d={wobPoly([[0, -14], [70, -42], [70, 42], [0, 14]], `${id}mg${b}`, 2, true)} fill={C.red} stroke={INK} strokeWidth={5} />
          <path d={wobRect(-18, -14, 20, 28, `${id}mh${b}`, 1, 4)} fill={C.lightGrey} stroke={INK} strokeWidth={4} />
        </g>
      );
    default:
      return null;
  }
};

// ───────────────────────── el mono ─────────────────────────
export type MonoProps = {
  tipo?: TipoMono;
  pose?: Pose;
  cara?: Cara;
  /** posición de los PIES en píxeles del vídeo */
  x?: number;
  y?: number;
  escala?: number;
  /** 'izq' lo voltea (mira y señala hacia la izquierda) */
  mira?: 'der' | 'izq';
  habla?: boolean;
  objeto?: Objeto;
  /** pose anterior y momento del cambio (para que los brazos lleguen con rebote) */
  poseAnterior?: Pose;
  cambioPose?: number;
  cambioCara?: number;
  /** semilla/identificador (parpadeo y temblor distintos por personaje) */
  id?: string;
  /** desplazamiento vertical extra (saltos del Reparto) y aplastamiento externo */
  salto?: number;
  aplasta?: number;
  opacidad?: number;
};

export const Mono: React.FC<MonoProps> = ({
  tipo = 'protagonista',
  pose = 'de_pie',
  cara = 'normal',
  x = 960,
  y = 980,
  escala = 1,
  mira = 'der',
  habla = false,
  objeto,
  poseAnterior,
  cambioPose = -10,
  cambioCara = -10,
  id = 'mono',
  salto = 0,
  aplasta = 0,
  opacidad = 1,
}) => {
  const t = useT();
  const words = usePalabras();
  const b = useBoil();
  const seed = (id.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 97) / 9.7;
  const nino = tipo === 'nino';
  const R = nino ? RIG.nino : RIG.normal;

  // pose con transición elástica
  const pT = ramp(t, cambioPose, 0.28, overshoot);
  const P = poseAnterior && pT < 1 ? mixPose(poseAt(poseAnterior, t, seed), poseAt(pose, t, seed), pT) : poseAt(pose, t, seed);
  const squash = (1 - ramp(t, cambioPose, 0.3, easeOut)) * 0.1 + aplasta;

  // marioneta: respiración, balanceo, saltito por palabra
  const breathe = Math.sin(t * 4.2 + seed) * 0.016;
  const sway = Math.sin(t * 2.3 + seed) * 2;
  const abre = habla ? aperturaBoca(words, t) : 0;
  const w0 = habla ? inicioPalabra(words, t) : null;
  const hop = w0 !== null && t - w0 < 0.2 ? Math.sin(((t - w0) / 0.2) * Math.PI) * 9 : 0;
  const idle = !habla ? Math.max(0, Math.sin(t * 3 + seed * 3)) * 4 : 0;
  const running = pose === 'correr' ? Math.abs(Math.sin(t * Math.PI * 2 * 2.3 + seed)) * 16 : 0;
  const lift = hop + idle + running + salto;

  // parpadeo: ~0,12 s cada 2,6-4,2 s
  const period = 2.6 + (seed % 1.6);
  const parpadeo = (t + seed) % period < 0.12;
  const caraPop = 1 + 0.12 * (1 - ramp(t, cambioCara, 0.25));

  // articulaciones
  const drop = P.drop ?? 0;
  const hipY = -R.hip + drop;
  const shY = -R.sh + drop - (P.lift ?? 0);
  const lean = P.lean ?? 0;
  const shX = Math.sin((lean * Math.PI) / 180) * (R.sh - R.hip);
  const headY = shY - R.neck;
  const headX = shX * 1.15;
  const joint = (o: [number, number], a: Ang, l1: number, l2: number) => {
    const d1 = dir(a[0]);
    const e: [number, number] = [o[0] + d1[0] * l1, o[1] + d1[1] * l1];
    const d2 = dir(a[1]);
    const h: [number, number] = [e[0] + d2[0] * l2, e[1] + d2[1] * l2];
    return [e, h] as const;
  };
  const sh: [number, number] = [shX, shY];
  const hp: [number, number] = [0, hipY];
  const shL: [number, number] = [shX - 10, shY];
  const shR: [number, number] = [shX + 10, shY];
  const [lE, lH] = joint(shL, P.lA, R.ua, R.fa);
  const [rE, rH] = joint(shR, P.rA, R.ua, R.fa);
  const [lK, lF] = joint(hp, P.lL, R.th, R.sn);
  const [rK, rF] = joint(hp, P.rL, R.th, R.sn);
  const limb = (a: [number, number], m: [number, number], c: [number, number], s: string) =>
    `${wobLine(a, m, `${id}${s}1${b}`, 1.8, 3)} ${wobLine(m, c, `${id}${s}2${b}`, 1.8, 3).replace(/^M/, 'M')}`;

  // colores por tipo
  const fur = tipo === 'abuelo' ? '#9C8B7E' : tipo === 'ciberdelincuente' ? '#7A4E33' : C.fur;
  const face = tipo === 'abuelo' ? '#CDB8A4' : C.face;
  const obj: Objeto = objeto ?? (tipo === 'rico' ? 'bolsa' : tipo === 'abuelo' ? 'baston' : 'ninguno');
  const m = mira === 'izq' ? -1 : 1;
  const hr = R.head;

  const stroke = {stroke: INK, strokeWidth: SW, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};

  // ── cuerpo (palitos + ropa) ──
  const torso = (
    <>
      {/* ropa por debajo de los palitos */}
      {tipo === 'rico' && (
        <g>
          <path d={wobEllipse(shX * 0.5, (shY + hipY) / 2 + 8, 92, 112, `${id}tr${b}`, 0.03)} fill="#2B3A67" stroke={INK} strokeWidth={SW} />
          <path d={wobPoly([[shX * 0.5 - 30, shY + 4], [shX * 0.5 + 30, shY + 4], [shX * 0.5, shY + 92]], `${id}sh${b}`, 2, true)} fill={C.paper} stroke={INK} strokeWidth={4} />
          <path d={wobPoly([[shX * 0.5 - 9, shY + 14], [shX * 0.5 + 9, shY + 14], [shX * 0.5 + 12, shY + 78], [shX * 0.5, shY + 94], [shX * 0.5 - 12, shY + 78]], `${id}tie${b}`, 1.5, true)} fill={C.red} stroke={INK} strokeWidth={3.5} />
          <circle cx={shX * 0.5 + 40} cy={shY + 120} r={6} fill={C.gold} stroke={INK} strokeWidth={2} />
          <circle cx={shX * 0.5 + 40} cy={shY + 150} r={6} fill={C.gold} stroke={INK} strokeWidth={2} />
        </g>
      )}
      {tipo === 'ciberdelincuente' && (
        <path d={wobPoly([[shX - 46, shY + 6], [shX + 46, shY + 6], [28, hipY + 10], [-28, hipY + 10]], `${id}hd${b}`, 3, true)} fill="#3A3D46" stroke={INK} strokeWidth={SW} />
      )}
      {tipo === 'currito' && (
        <path d={wobPoly([[shX - 40, shY + 4], [shX + 40, shY + 4], [26, hipY + 6], [-26, hipY + 6]], `${id}cm${b}`, 3, true)} fill={C.blue} stroke={INK} strokeWidth={SW} />
      )}
      {tipo === 'ia' && (
        <g>
          <path d={wobRect(shX - 38, shY + 14, 76, (hipY - shY) - 20, `${id}ch${b}`, 2.5, 12)} fill="#A9BCCB" stroke={INK} strokeWidth={SW} />
          <circle cx={shX} cy={shY + 60} r={12} fill={Math.floor(t * 2) % 2 ? '#4DF3FF' : '#1E8A99'} stroke={INK} strokeWidth={3} />
        </g>
      )}
      {tipo === 'nino' && (
        <path d={wobPoly([[shX - 32, shY + 4], [shX + 32, shY + 4], [22, hipY + 6], [-22, hipY + 6]], `${id}nm${b}`, 3, true)} fill={C.yellow} stroke={INK} strokeWidth={SW} />
      )}
      {/* palitos */}
      <path d={wobLine(sh, hp, `${id}sp${b}`, 2, 4)} {...stroke} />
      <path d={limb(hp, lK, lF, 'll')} {...stroke} />
      <path d={limb(hp, rK, rF, 'rl')} {...stroke} />
      {tipo === 'rico' && (
        <>
          {/* zapatos */}
          <ellipse cx={lF[0] - 8} cy={lF[1]} rx={18} ry={8} fill={INK} />
          <ellipse cx={rF[0] + 8} cy={rF[1]} rx={18} ry={8} fill={INK} />
        </>
      )}
    </>
  );
  const brazos = (
    <>
      <path d={limb(shL, lE, lH, 'la')} {...stroke} />
      <path d={limb(shR, rE, rH, 'ra')} {...stroke} />
    </>
  );

  // ── cabeza ──
  const robot = tipo === 'ia';
  const cabeza = (
    <g transform={`translate(${headX} ${headY}) rotate(${(P.tilt ?? 0) + sway * 0.6}) scale(${caraPop})`}>
      {/* capucha por detrás */}
      {tipo === 'ciberdelincuente' && (
        <path d={wobEllipse(0, -6, hr * 1.32, hr * 1.34, `${id}cap${b}`, 0.035)} fill="#3A3D46" stroke={INK} strokeWidth={SW} />
      )}
      {robot ? (
        <>
          {/* antena */}
          <path d={wobLine([0, -hr + 8], [0, -hr - 42], `${id}an${b}`)} {...stroke} />
          <circle cx={0} cy={-hr - 48} r={11} fill={Math.floor(t * 1.5 + seed) % 2 ? C.red : '#7A1E10'} stroke={INK} strokeWidth={4} />
          {/* tornillos-oreja */}
          <path d={wobEllipse(-hr - 6, 0, 20, 26, `${id}el${b}`)} fill="#7E93A4" stroke={INK} strokeWidth={SW} />
          <path d={wobEllipse(hr + 6, 0, 20, 26, `${id}er${b}`)} fill="#7E93A4" stroke={INK} strokeWidth={SW} />
          <path d={wobRect(-hr, -hr * 0.92, hr * 2, hr * 1.84, `${id}hb${b}`, 2.5, 34)} fill="#A9BCCB" stroke={INK} strokeWidth={SW} />
          <CaraRobot cara={cara} abre={abre} parpadeo={parpadeo} b={b} id={id} t={t} />
        </>
      ) : (
        <>
          {/* orejas (la capucha las tapa) */}
          {tipo !== 'ciberdelincuente' && (
            <>
              <path d={wobEllipse(-hr - 8 + 4, 2 + 3, 38, 40, `${id}elf${b}`)} fill={fur} />
              <path d={wobEllipse(-hr - 8, 2, 38, 40, `${id}el${b}`)} fill="none" stroke={INK} strokeWidth={SW} />
              <path d={wobEllipse(hr + 8 + 4, 2 + 3, 38, 40, `${id}erf${b}`)} fill={fur} />
              <path d={wobEllipse(hr + 8, 2, 38, 40, `${id}er${b}`)} fill="none" stroke={INK} strokeWidth={SW} />
            </>
          )}
          {/* cabeza: relleno descolocado + contorno */}
          <path d={wobEllipse(5, 5, hr, hr * 0.97, `${id}hf${b}`, 0.03)} fill={fur} />
          <path
            d={wobPoly(
              [[-hr * 0.72, -hr * 0.18], [-hr * 0.62, -hr * 0.6], [-hr * 0.3, -hr * 0.66], [0, -hr * 0.48], [hr * 0.3, -hr * 0.66], [hr * 0.62, -hr * 0.6], [hr * 0.72, -hr * 0.18], [hr * 0.7, hr * 0.38], [hr * 0.4, hr * 0.74], [0, hr * 0.82], [-hr * 0.4, hr * 0.74], [-hr * 0.7, hr * 0.38]],
              `${id}fm${b}`,
              2,
              true,
            )}
            fill={face}
            stroke={INK}
            strokeWidth={4}
          />
          <path d={wobEllipse(0, 0, hr, hr * 0.97, `${id}hc${b}`, 0.03)} fill="none" stroke={INK} strokeWidth={SW} />
          <CaraMono cara={cara} abre={abre} parpadeo={parpadeo} b={b} id={id} t={t} />
          {/* disfraces de cabeza */}
          {tipo === 'ciberdelincuente' && (
            <>
              <path d={wobRect(-hr * 0.82, -42, hr * 1.64, 44, `${id}mk${b}`, 2, 18)} fill={INK} />
              <circle cx={-31} cy={-20} r={13} fill={C.paper} />
              <circle cx={31} cy={-20} r={13} fill={C.paper} />
              {cara === 'risa' || cara === 'guiño' ? (
                <>
                  <path d="M-42 -14 Q-31 -30 -20 -14" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
                  <path d="M20 -14 Q31 -30 42 -14" stroke={INK} strokeWidth={5} fill="none" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <circle cx={-31 + Math.sin(t * 1.7) * 3} cy={-20} r={parpadeo ? 1.5 : 6.5} fill={INK} />
                  <circle cx={31 + Math.sin(t * 1.7) * 3} cy={-20} r={parpadeo ? 1.5 : 6.5} fill={INK} />
                </>
              )}
              {/* borde de la capucha por delante */}
              <path d={wobEllipse(0, 4, hr * 1.12, hr * 1.12, `${id}cb${b}`, 0.03)} fill="none" stroke="#3A3D46" strokeWidth={16} />
              <path d={wobEllipse(0, 4, hr * 1.2, hr * 1.2, `${id}cc${b}`, 0.03)} fill="none" stroke={INK} strokeWidth={4} />
            </>
          )}
          {tipo === 'rico' && (
            <>
              {/* chistera */}
              <g transform={`translate(0 ${-hr * 0.78}) rotate(-6)`}>
                <path d={wobRect(-hr * 0.62, -hr * 1.05, hr * 1.24, hr * 1.05, `${id}ch${b}`, 2.5, 6)} fill={INK} />
                <path d={wobRect(-hr * 0.62, -hr * 0.4, hr * 1.24, hr * 0.22, `${id}cbd${b}`, 1.5, 3)} fill={C.red} />
                <path d={wobRect(-hr * 0.98, -12, hr * 1.96, 22, `${id}cbr${b}`, 2, 10)} fill={INK} />
              </g>
              {/* monóculo */}
              <circle cx={31} cy={-20} r={20} fill="none" stroke={C.gold} strokeWidth={5} />
              <path d="M50 -14 Q62 20 48 60" stroke={C.gold} strokeWidth={2.5} fill="none" />
              {/* bigote */}
              <path d="M0 24 Q-20 14 -40 26 Q-50 34 -56 24 M0 24 Q20 14 40 26 Q50 34 56 24" stroke={INK} strokeWidth={7} fill="none" strokeLinecap="round" />
              {/* puro con humo */}
              {obj !== 'puro' && abre < 0.12 && (
                <g transform="translate(22 46) rotate(12)">
                  <rect x={0} y={-7} width={62} height={14} rx={6} fill="#6B3E1F" stroke={INK} strokeWidth={4} />
                  <rect x={56} y={-7} width={9} height={14} rx={3} fill={C.orange} />
                  {[0, 1, 2].map((i) => {
                    const life = (t * 0.8 + i / 3) % 1;
                    return <circle key={i} cx={66 + life * 30 + Math.sin(life * 9 + i) * 8} cy={-10 - life * 90} r={6 + life * 14} fill="#BBBBBB" opacity={0.6 * (1 - life)} />;
                  })}
                </g>
              )}
            </>
          )}
          {tipo === 'abuelo' && (
            <>
              {/* cejas blancas pobladas, gafas redondas, bigote y boina */}
              <path d="M-50 -40 q10 -14 32 -6" stroke={C.paper} strokeWidth={10} fill="none" strokeLinecap="round" />
              <path d="M18 -46 q22 -8 32 6" stroke={C.paper} strokeWidth={10} fill="none" strokeLinecap="round" />
              <path d={wobEllipse(-31, -19, 20, 19, `${id}g1${b}`)} fill="#E8F6FF" fillOpacity={0.35} stroke={INK} strokeWidth={4.5} />
              <path d={wobEllipse(31, -19, 20, 19, `${id}g2${b}`)} fill="#E8F6FF" fillOpacity={0.35} stroke={INK} strokeWidth={4.5} />
              <path d="M-11 -20 Q0 -26 11 -20" stroke={INK} strokeWidth={4} fill="none" />
              <path d="M0 22 Q-22 12 -44 30 Q-26 40 0 30 Q26 40 44 30 Q22 12 0 22 Z" fill={C.paper} stroke={INK} strokeWidth={3.5} />
              <g transform={`translate(0 ${-hr * 0.82}) rotate(-8)`}>
                <path d={wobEllipse(0, 0, hr * 0.95, hr * 0.42, `${id}bo${b}`, 0.04)} fill="#4F6D3A" stroke={INK} strokeWidth={SW} />
                <circle cx={0} cy={-hr * 0.4} r={8} fill="#4F6D3A" stroke={INK} strokeWidth={4} />
              </g>
            </>
          )}
          {tipo === 'currito' && (
            <g transform={`translate(0 ${-hr * 0.72}) rotate(-4)`}>
              <path d={`M${-hr * 0.85} 10 Q0 ${-hr * 0.85} ${hr * 0.85} 10 Z`} fill={C.orange} stroke={INK} strokeWidth={SW} />
              <path d={wobRect(hr * 0.2, 0, hr * 1.0, 20, `${id}vs${b}`, 1.5, 9)} fill={C.orange} stroke={INK} strokeWidth={5} />
            </g>
          )}
          {tipo === 'nino' && (
            <g transform={`translate(0 ${-hr * 0.74})`}>
              <path d={`M${-hr * 0.8} 14 Q0 ${-hr * 0.9} ${hr * 0.8} 14 Z`} fill={C.red} stroke={INK} strokeWidth={SW} />
              <path d={`M-4 ${-hr * 0.34} Q0 ${-hr * 0.9} 4 ${-hr * 0.34} Z`} fill={C.yellow} stroke={INK} strokeWidth={3} />
              <path d={`M0 ${-hr * 0.42} L0 ${-hr * 0.62}`} {...stroke} strokeWidth={5} />
              {/* hélice que gira */}
              <ellipse cx={0} cy={-hr * 0.64} rx={Math.abs(Math.cos(t * 14)) * 46 + 4} ry={7} fill={C.blue} stroke={INK} strokeWidth={4} />
            </g>
          )}
        </>
      )}
    </g>
  );

  const hand = rH;
  const objHand = obj === 'bolsa' ? lH : hand;
  const shadowK = 1 / (1 + Math.max(0, lift) / 120);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        opacity: opacidad,
      }}
    >
      {/* sombra */}
      <svg width={300} height={60} viewBox="-150 -30 300 60" style={{position: 'absolute', left: -150 * escala, top: -30 * escala, width: 300 * escala, height: 60 * escala, overflow: 'visible'}}>
        <ellipse cx={0} cy={4} rx={86 * shadowK} ry={13 * shadowK} fill="rgba(0,0,0,0.13)" />
      </svg>
      <svg
        width={800}
        height={900}
        viewBox="-400 -820 800 900"
        style={{
          position: 'absolute',
          left: -400 * escala,
          top: -820 * escala - lift * escala,
          width: 800 * escala,
          height: 900 * escala,
          overflow: 'visible',
          transformOrigin: `${400 * escala}px ${820 * escala}px`,
          scale: `${(1 + breathe - squash * 0.6) * (nino ? 1 : 1)} ${1 - breathe + squash}`.replace(/ .*/, (s) => s),
          rotate: `${sway * 0.5}deg`,
        }}
      >
        <g transform={`scale(${m} 1)`}>
          {tipo === 'abuelo' && obj === 'baston' && <g transform={`translate(${hand[0]} ${hand[1]})`}>{<ObjetoMano obj="baston" b={b} id={id} t={t} />}</g>}
          {torso}
          {cabeza}
          {brazos}
          {obj !== 'ninguno' && !(tipo === 'abuelo' && obj === 'baston') && (
            <g transform={`translate(${objHand[0]} ${objHand[1]}) scale(${m} 1)`}>
              <ObjetoMano obj={obj} b={b} id={id} t={t} />
            </g>
          )}
          {/* taburete al sentarse */}
          {pose === 'sentado' && (
            <path d={wobRect(-70, hipY + 6, 140, -hipY - 6, `${id}tb${b}`, 2.5, 8)} fill={C.red} stroke={INK} strokeWidth={SW} opacity={0.95} />
          )}
        </g>
      </svg>
    </div>
  );
};

export {MonedaBTC};
