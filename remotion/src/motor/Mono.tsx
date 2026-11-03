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
import {SimboloBTC} from './Iconos';

export type TipoMono =
  | 'protagonista' | 'ciberdelincuente' | 'rico' | 'ia' | 'abuelo' | 'currito' | 'nino'
  // v3 (nov-2026): más reparto para que no sea repetitivo
  | 'mona' | 'cientifica' | 'policia' | 'medico' | 'alien' | 'perro' | 'gato' | 'influencer'
  | 'profe' | 'cocinero' | 'astronauta';
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
  | 'puro'
  // v3
  | 'bolso'
  | 'probeta'
  | 'sarten'
  | 'aro_luz'
  | 'paquete';

export const TIPOS: TipoMono[] = [
  'protagonista', 'ciberdelincuente', 'rico', 'ia', 'abuelo', 'currito', 'nino',
  'mona', 'cientifica', 'policia', 'medico', 'alien', 'perro', 'gato', 'influencer', 'profe', 'cocinero', 'astronauta',
];
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
    <SimboloBTC tam={r * 1.15} color={C.paper} seed={`${id}s`} />
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
    // ── v3 ──
    case 'bolso':
      // bolso de mano colgando del brazo: asa de arco y cuerpo trapecio rosa con cierre dorado
      return (
        <g transform={`translate(0 4) rotate(${Math.sin(t * 3.1) * 6})`}>
          <path d="M-22 22 Q0 -18 22 22" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />
          <path d={wobPoly([[-38, 22], [38, 22], [48, 78], [-48, 78]], `${id}bs${b}`, 2, true)} fill={C.pink} stroke={INK} strokeWidth={5} strokeLinejoin="round" />
          <path d={wobLine([-44, 44], [44, 44], `${id}bsl${b}`, 1)} stroke={INK} strokeWidth={3.5} fill="none" />
          <circle cx={0} cy={44} r={7} fill={C.gold} stroke={INK} strokeWidth={3} />
        </g>
      );
    case 'probeta': {
      // tubo de ensayo con líquido verde que burbujea
      const burb = [0, 1, 2].map((i) => {
        const life = (t * 0.9 + i / 3) % 1;
        return <circle key={i} cx={Math.sin(life * 8 + i) * 6} cy={-40 - life * 70} r={4 + life * 6} fill={C.green} stroke={INK} strokeWidth={2.5} opacity={1 - life} />;
      });
      return (
        <g transform="translate(0 -26) rotate(12)">
          {burb}
          <path d={wobRect(-16, -40, 32, 78, `${id}pbl${b}`, 1, 14)} fill={C.green} stroke="none" opacity={0.85} transform="translate(0 22) scale(1 0.72)" />
          <path d={`M-16 -44 L-16 30 Q-16 46 0 46 Q16 46 16 30 L16 -44`} stroke={INK} strokeWidth={5} fill="rgba(220,245,255,0.45)" />
          <path d={wobLine([-24, -44], [24, -44], `${id}pbt${b}`, 1)} stroke={INK} strokeWidth={6} strokeLinecap="round" />
        </g>
      );
    }
    case 'sarten':
      // sartén con un huevo frito que salta
      return (
        <g transform="rotate(-18)">
          <path d={wobLine([0, 0], [70, 0], `${id}sm${b}`, 1)} stroke={INK} strokeWidth={14} strokeLinecap="round" />
          <path d={wobEllipse(130, -4, 62, 22, `${id}sp${b}`, 0.04)} fill="#3A3D46" stroke={INK} strokeWidth={5} />
          <g transform={`translate(130 ${-18 - Math.abs(Math.sin(t * 5)) * 40}) rotate(${Math.sin(t * 5) * 30})`}>
            <path d={wobEllipse(0, 0, 30, 12, `${id}hb${b}`, 0.1)} fill={C.paper} stroke={INK} strokeWidth={3.5} />
            <circle cx={2} cy={-2} r={8} fill={C.orange} stroke={INK} strokeWidth={2.5} />
          </g>
        </g>
      );
    case 'aro_luz': {
      // móvil del influencer con su aro de luz en un palo
      const on = 0.75 + 0.25 * Math.abs(Math.sin(t * 2.5));
      return (
        <g transform="translate(0 -10)">
          <path d={wobLine([0, 0], [0, -110], `${id}al${b}`, 1)} stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <circle cx={0} cy={-170} r={62} fill="none" stroke={`rgba(255,240,170,${0.5 * on})`} strokeWidth={34} />
          <path d={wobEllipse(0, -170, 62, 62, `${id}ar${b}`, 0.03)} fill="none" stroke={INK} strokeWidth={5} />
          <path d={wobEllipse(0, -170, 50, 50, `${id}ar2${b}`, 0.03)} fill="none" stroke={INK} strokeWidth={4} />
          <g transform="translate(0 -170)">
            <path d={wobRect(-20, -34, 40, 68, `${id}am${b}`, 1.5, 7)} fill={C.ink} stroke={INK} strokeWidth={4} />
            <rect x={-14} y={-27} width={28} height={50} rx={4} fill={C.pink} />
            <circle cx={0} cy={-2} r={7} fill={C.red} opacity={Math.floor(t * 2) % 2 ? 1 : 0.3} />
          </g>
        </g>
      );
    }
    case 'paquete':
      // caja de cartón con cinta (envíos, paquetes de datos)
      return (
        <g transform={`translate(0 -34) rotate(${Math.sin(t * 2.4) * 4})`}>
          <path d={wobRect(-46, -40, 92, 76, `${id}pq${b}`, 2, 6)} fill="#C9A26B" stroke={INK} strokeWidth={5} />
          <path d={wobLine([0, -40], [0, 36], `${id}pqc${b}`, 1)} stroke="#E8D3A8" strokeWidth={14} />
          <path d={wobLine([-46, -14], [46, -14], `${id}pqd${b}`, 1)} stroke={INK} strokeWidth={3} opacity={0.5} />
        </g>
      );
    default:
      return null;
  }
};

// ───────────────────────── disfraces de cabeza v3 ─────────────────────────
/** Lo que se pinta ENCIMA de la cara de mono para los personajes nuevos (coordenadas de la cabeza, centro 0,0). */
const Disfraz3: React.FC<{tipo: TipoMono; hr: number; b: number; id: string; t: number; cara: Cara; parpadeo: boolean; abre: number; seed: number}> = ({
  tipo,
  hr,
  b,
  id,
  t,
  cara,
  parpadeo,
  abre,
  seed,
}) => {
  const st = {stroke: INK, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  const ojosCerrados = parpadeo || cara === 'risa';
  switch (tipo) {
    case 'mona':
      return (
        <g>
          {/* pestañas en los ojos (tres rayitas hacia fuera) */}
          {!ojosCerrados &&
            [-1, 1].map((sd) => (
              <path key={sd} d={`M${sd * 38} -28 l${sd * 10} -10 M${sd * 31} -30 l${sd * 4} -13 M${sd * 24} -29 l${sd * -2} -12`} {...st} strokeWidth={4} fill="none" />
            ))}
          {/* colorete y labios */}
          <ellipse cx={-54} cy={18} rx={14} ry={8} fill={C.pink} opacity={0.6} />
          <ellipse cx={54} cy={18} rx={14} ry={8} fill={C.pink} opacity={0.6} />
          {abre < 0.12 && cara !== 'risa' && <path d="M-14 42 Q-7 36 0 41 Q7 36 14 42 Q0 52 -14 42 Z" fill={C.red} stroke={INK} strokeWidth={3} />}
          {/* lazo */}
          <g transform={`translate(${hr * 0.55} ${-hr * 0.78}) rotate(${-18 + Math.sin(t * 3 + seed) * 4})`}>
            <path d={wobPoly([[0, 0], [-46, -30], [-50, 28]], `${id}lz1${b}`, 2, true)} fill={C.red} stroke={INK} strokeWidth={5} />
            <path d={wobPoly([[0, 0], [46, -30], [50, 28]], `${id}lz2${b}`, 2, true)} fill={C.red} stroke={INK} strokeWidth={5} />
            <path d={wobEllipse(0, 0, 13, 13, `${id}lz3${b}`, 0.08, 8)} fill={C.pink} stroke={INK} strokeWidth={4} />
          </g>
        </g>
      );
    case 'cientifica':
      return (
        <g>
          {/* moño de pelo morado y gafas redondas */}
          <path d={wobEllipse(0, -hr * 1.02, 36, 30, `${id}mo${b}`, 0.06, 10)} fill="#5B3A8C" stroke={INK} strokeWidth={SW} />
          <path d={wobPoly([[-hr * 0.8, -hr * 0.45], [-hr * 0.5, -hr * 0.85], [0, -hr * 0.92], [hr * 0.5, -hr * 0.85], [hr * 0.8, -hr * 0.45], [hr * 0.35, -hr * 0.6], [0, -hr * 0.55], [-hr * 0.35, -hr * 0.6]], `${id}pc${b}`, 2, true)} fill="#5B3A8C" stroke={INK} strokeWidth={4} />
          <path d={wobEllipse(-31, -19, 21, 20, `${id}g1${b}`)} fill="#E8F6FF" fillOpacity={0.35} stroke={INK} strokeWidth={5} />
          <path d={wobEllipse(31, -19, 21, 20, `${id}g2${b}`)} fill="#E8F6FF" fillOpacity={0.35} stroke={INK} strokeWidth={5} />
          <path d="M-10 -20 Q0 -27 10 -20" {...st} strokeWidth={4} fill="none" />
          <path d={`M-52 -22 L${-hr + 4} -30 M52 -22 L${hr - 4} -30`} {...st} strokeWidth={4} fill="none" />
        </g>
      );
    case 'policia':
      return (
        <g transform={`translate(0 ${-hr * 0.72}) rotate(-4)`}>
          {/* gorra de plato con visera y placa */}
          <path d={wobPoly([[-hr * 0.9, 4], [-hr * 1.02, -44], [0, -62], [hr * 1.02, -44], [hr * 0.9, 4]], `${id}gp${b}`, 2, true)} fill="#2B4C8C" stroke={INK} strokeWidth={SW} />
          <path d={wobRect(-hr * 0.9, -4, hr * 1.8, 18, `${id}gb${b}`, 1.5, 6)} fill={INK} />
          <path d={`M${-hr * 0.7} 12 Q0 40 ${hr * 0.7} 12 Z`} fill={INK} stroke={INK} strokeWidth={4} />
          <path d={wobEllipse(0, -30, 14, 16, `${id}gs${b}`, 0.08, 8)} fill={C.gold} stroke={INK} strokeWidth={3.5} />
        </g>
      );
    case 'medico':
      return (
        <g>
          {/* espejo frontal con su cinta */}
          <path d={wobLine([-hr * 0.95, -hr * 0.48], [hr * 0.95, -hr * 0.48], `${id}ci${b}`, 1.5, 4)} stroke="#555" strokeWidth={10} fill="none" />
          <path d={wobEllipse(0, -hr * 0.55, 26, 26, `${id}es${b}`, 0.05, 10)} fill={C.lightGrey} stroke={INK} strokeWidth={5} />
          <circle cx={0} cy={-hr * 0.55} r={9} fill={C.paper} stroke={INK} strokeWidth={3} />
          <path d={`M-12 ${-hr * 0.62} l8 -6`} stroke={C.paper} strokeWidth={4} strokeLinecap="round" />
        </g>
      );
    case 'alien':
      return (
        <g>
          {/* tercer ojo en la frente, que parpadea a su aire */}
          <path d={wobEllipse(0, -hr * 0.55, 19, 17, `${id}t3${b}`, 0.06, 10)} fill={C.paper} stroke={INK} strokeWidth={4.5} />
          {Math.floor(t * 1.3 + seed) % 5 === 0 && (t * 1.3 + seed) % 1 < 0.15 ? (
            <path d={`M-14 ${-hr * 0.55} L14 ${-hr * 0.55}`} stroke={INK} strokeWidth={5} strokeLinecap="round" />
          ) : (
            <circle cx={Math.sin(t * 1.9) * 5} cy={-hr * 0.55} r={7.5} fill={INK} />
          )}
        </g>
      );
    case 'perro':
      return (
        <g>
          {/* orejas caídas que se balancean */}
          {[-1, 1].map((sd) => (
            <path
              key={sd}
              d={wobEllipse(0, 0, 30, 64, `${id}po${sd}${b}`, 0.05, 10)}
              transform={`translate(${sd * hr * 0.95} ${hr * 0.12}) rotate(${sd * (14 + Math.sin(t * 4 + seed) * 6)})`}
              fill="#7A4E2D"
              stroke={INK}
              strokeWidth={SW}
            />
          ))}
          {/* hocico y nariz gorda */}
          <path d={wobEllipse(0, 20, 34, 24, `${id}hz${b}`, 0.05, 10)} fill="#F4E1C6" stroke={INK} strokeWidth={4} opacity={0.9} />
          <path d={wobEllipse(0, 10, 15, 11, `${id}nz${b}`, 0.06, 8)} fill={INK} />
          <circle cx={-4} cy={6} r={3.5} fill={C.paper} />
          {cara === 'risa' && <path d="M-10 60 Q0 86 10 60 Z" fill={C.pink} stroke={INK} strokeWidth={3} />}
        </g>
      );
    case 'gato':
      return (
        <g>
          {/* nariz rosa y bigotes */}
          <path d="M-9 4 L9 4 L0 15 Z" fill={C.pink} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
          {[-1, 1].map((sd) => (
            <path
              key={sd}
              d={`M${sd * 24} 18 L${sd * 86} ${8 + Math.sin(t * 3) * 2} M${sd * 24} 25 L${sd * 90} 27 M${sd * 24} 32 L${sd * 84} ${46 - Math.sin(t * 3) * 2}`}
              stroke={INK}
              strokeWidth={3}
              strokeLinecap="round"
            />
          ))}
          {/* rayas de atigrado en la frente */}
          <path d={`M-16 ${-hr * 0.62} l6 18 M0 ${-hr * 0.66} l0 20 M16 ${-hr * 0.62} l-6 18`} stroke="#B5651D" strokeWidth={6} strokeLinecap="round" />
        </g>
      );
    case 'influencer':
      return (
        <g>
          {/* tupé y gafas de sol con brillo */}
          <path d={wobPoly([[-hr * 0.7, -hr * 0.55], [-hr * 0.4, -hr * 1.08], [hr * 0.1, -hr * 1.2], [hr * 0.6, -hr * 1.0], [hr * 0.75, -hr * 0.5], [hr * 0.2, -hr * 0.68], [-hr * 0.3, -hr * 0.62]], `${id}tp${b}`, 2.5, true)} fill="#F2C14E" stroke={INK} strokeWidth={5} />
          <path d={wobRect(-62, -40, 52, 38, `${id}s1${b}`, 1.5, 14)} fill={INK} />
          <path d={wobRect(10, -40, 52, 38, `${id}s2${b}`, 1.5, 14)} fill={INK} />
          <path d="M-10 -28 Q0 -34 10 -28" stroke={INK} strokeWidth={5} fill="none" />
          <path d={`M-62 -30 L${-hr + 2} -38 M62 -30 L${hr - 2} -38`} stroke={INK} strokeWidth={4} />
          <path d="M-50 -32 l14 -2 M22 -32 l14 -2" stroke={C.paper} strokeWidth={5} strokeLinecap="round" opacity={0.8} />
        </g>
      );
    case 'profe':
      return (
        <g>
          {/* pelo con raya, gafas cuadradas y bigote */}
          <path d={wobPoly([[-hr * 0.85, -hr * 0.35], [-hr * 0.7, -hr * 0.85], [-hr * 0.15, -hr * 1.02], [hr * 0.5, -hr * 0.92], [hr * 0.85, -hr * 0.45], [hr * 0.5, -hr * 0.62], [-hr * 0.1, -hr * 0.62], [-hr * 0.5, -hr * 0.55]], `${id}pp${b}`, 2, true)} fill="#3B2416" stroke={INK} strokeWidth={4} />
          <path d={wobLine([-hr * 0.12, -hr * 1.0], [-hr * 0.22, -hr * 0.62], `${id}ry${b}`, 1)} stroke={C.face} strokeWidth={4} />
          <path d={wobRect(-56, -36, 46, 34, `${id}q1${b}`, 1.2, 6)} fill="#E8F6FF" fillOpacity={0.3} stroke={INK} strokeWidth={5} />
          <path d={wobRect(10, -36, 46, 34, `${id}q2${b}`, 1.2, 6)} fill="#E8F6FF" fillOpacity={0.3} stroke={INK} strokeWidth={5} />
          <path d="M-10 -22 L10 -22" stroke={INK} strokeWidth={4} />
          {abre < 0.12 && <path d="M-30 30 Q-15 20 0 28 Q15 20 30 30 Q15 34 0 32 Q-15 34 -30 30 Z" fill="#3B2416" stroke={INK} strokeWidth={3} />}
        </g>
      );
    case 'cocinero':
      return (
        <g>
          {/* gorro de chef abombado y bigote de manillar */}
          <g transform={`translate(0 ${-hr * 0.78}) rotate(${Math.sin(t * 2 + seed) * 3})`}>
            <path d={wobRect(-hr * 0.62, -hr * 0.55, hr * 1.24, hr * 0.62, `${id}gc${b}`, 2, 8)} fill={C.paper} stroke={INK} strokeWidth={SW} />
            {[-0.5, 0, 0.5].map((k, i) => (
              <path key={i} d={wobEllipse(k * hr * 0.95, -hr * 0.78, hr * 0.42, hr * 0.38, `${id}gn${i}${b}`, 0.05, 10)} fill={C.paper} stroke={INK} strokeWidth={SW} />
            ))}
            <path d={wobRect(-hr * 0.62, -hr * 0.62, hr * 1.24, hr * 0.3, `${id}gm${b}`, 1, 4)} fill={C.paper} />
          </g>
          {abre < 0.12 && <path d="M0 26 Q-24 16 -44 28 Q-54 18 -50 10 M0 26 Q24 16 44 28 Q54 18 50 10" stroke={INK} strokeWidth={6} fill="none" strokeLinecap="round" />}
        </g>
      );
    case 'astronauta':
      return (
        <g>
          {/* casco de burbuja, por encima de toda la cabeza */}
          <path d={wobEllipse(0, 4, hr * 1.42, hr * 1.38, `${id}cs${b}`, 0.02)} fill="rgba(190,230,255,0.22)" stroke={INK} strokeWidth={SW} />
          <path d={`M${-hr * 0.95} ${-hr * 0.55} Q${-hr * 0.7} ${-hr * 1.05} ${-hr * 0.2} ${-hr * 1.18}`} stroke={C.paper} strokeWidth={10} fill="none" strokeLinecap="round" opacity={0.85} />
          <path d={wobRect(-hr * 0.9, hr * 1.22, hr * 1.8, 30, `${id}cl${b}`, 1.5, 12)} fill={C.lightGrey} stroke={INK} strokeWidth={5} />
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
  const PIEL: Partial<Record<TipoMono, [string, string]>> = {
    abuelo: ['#9C8B7E', '#CDB8A4'],
    ciberdelincuente: ['#7A4E33', C.face],
    alien: ['#6CC46A', '#A8E89A'],
    perro: ['#C98B4F', '#EBCB9F'],
    gato: ['#E8963A', '#F7D3A6'],
  };
  const fur = PIEL[tipo]?.[0] ?? C.fur;
  const face = PIEL[tipo]?.[1] ?? C.face;
  const OBJ_DEF: Partial<Record<TipoMono, Objeto>> = {
    rico: 'bolsa', abuelo: 'baston', mona: 'bolso', influencer: 'aro_luz', cientifica: 'probeta', cocinero: 'sarten', profe: 'puntero',
  };
  const obj: Objeto = objeto ?? OBJ_DEF[tipo] ?? 'ninguno';
  const m = mira === 'izq' ? -1 : 1;
  const hr = R.head;

  const stroke = {stroke: INK, strokeWidth: SW, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};

  // camiseta con hombros (currito y niño): sustituye al óvalo/trapecio de antes
  // ropa v3: color, largo de bata (px bajo la cadera), vuelo de falda y manga larga
  const ROPA: Partial<Record<TipoMono, {color: string; largo?: number; vuelo?: number; mangaLarga?: boolean}>> = {
    mona: {color: C.pink, vuelo: 46},
    cientifica: {color: C.paper, largo: 120, mangaLarga: true},
    medico: {color: C.paper, largo: 120, mangaLarga: true},
    policia: {color: '#2B4C8C'},
    influencer: {color: C.purple},
    profe: {color: '#7FA66A', mangaLarga: true},
    cocinero: {color: C.paper},
    astronauta: {color: '#F1F1F1', largo: 20, mangaLarga: true},
  };
  const ropa = ROPA[tipo];
  const camiseta =
    tipo === 'currito' || tipo === 'nino' || ropa
      ? (() => {
          const k = nino ? 0.8 : 1;
          const bw = 44 * k; // media anchura en la cadera
          const bajo = ropa?.largo ? hipY + ropa.largo : hipY + 12;
          const v = ropa?.vuelo ?? (ropa?.largo ? 12 : 0);
          return {
            color: ropa ? ropa.color : nino ? C.yellow : C.blue,
            manga: nino ? 32 : 38,
            mano: nino ? 12 : 14,
            mangaHasta: ropa?.mangaLarga ? 0.92 : 0.55,
            bajo,
            torso: [
              [shX - 24 * k, shY - 4],
              [shX - 58 * k, shY + 10],
              [shX - 54 * k, shY + 44 * k],
              [lerp(shX, 0, 0.6) - bw - 4, lerp(shY, hipY, 0.6)],
              [-bw - v, ropa?.vuelo ? hipY + 70 : bajo],
              [bw + v, ropa?.vuelo ? hipY + 70 : bajo],
              [lerp(shX, 0, 0.6) + bw + 4, lerp(shY, hipY, 0.6)],
              [shX + 54 * k, shY + 44 * k],
              [shX + 58 * k, shY + 10],
              [shX + 24 * k, shY - 4],
            ] as [number, number][],
          };
        })()
      : null;

  // ── detalles de la ropa v3 (placa, fonendo, delantal…) ──
  const detallesRopa = (): React.ReactNode => {
    if (!camiseta) return null;
    const cx = lerp(shX, 0, 0.3);
    const pecho = shY + 52;
    const L = (d: string, c = INK, w = 4) => <path d={d} stroke={c} strokeWidth={w} fill="none" strokeLinecap="round" strokeLinejoin="round" />;
    const estrella = (x: number, y: number, r: number, fill: string, k: string) => (
      <path
        d={wobPoly(
          Array.from({length: 10}, (_, i) => {
            const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
            const rr = i % 2 ? r * 0.45 : r;
            return [x + Math.cos(a) * rr, y + Math.sin(a) * rr] as [number, number];
          }),
          `${id}${k}${b}`,
          0.8,
          true,
        )}
        fill={fill}
        stroke={INK}
        strokeWidth={3}
      />
    );
    const bata = tipo === 'cientifica' || tipo === 'medico';
    return (
      <g>
        {bata && (
          <>
            {/* abertura de la bata y solapas */}
            {L(wobLine([shX, shY + 8], [0, camiseta.bajo - 4], `${id}ab${b}`, 1.2, 4))}
            {L(`M${shX - 18} ${shY + 2} L${shX - 4} ${shY + 44} L${shX - 30} ${shY + 30}`)}
            {L(`M${shX + 18} ${shY + 2} L${shX + 4} ${shY + 44} L${shX + 30} ${shY + 30}`)}
            {/* bolsillo */}
            <path d={wobRect(cx + 14, pecho + 4, 30, 26, `${id}bl${b}`, 1, 4)} fill={C.paper} stroke={INK} strokeWidth={3.5} />
            {tipo === 'cientifica' ? (
              <>
                {L(`M${cx + 22} ${pecho + 6} L${cx + 22} ${pecho - 12}`, C.blue, 6)}
                {L(`M${cx + 34} ${pecho + 6} L${cx + 34} ${pecho - 8}`, C.red, 6)}
              </>
            ) : (
              <>
                {L(`M${cx + 29} ${pecho + 9} L${cx + 29} ${pecho + 25}`, C.red, 5)}
                {L(`M${cx + 21} ${pecho + 17} L${cx + 37} ${pecho + 17}`, C.red, 5)}
              </>
            )}
          </>
        )}
        {tipo === 'medico' && (
          <>
            {/* fonendo colgado del cuello */}
            {L(`M${shX - 20} ${shY + 2} Q${shX - 40} ${shY + 70} ${shX - 10} ${shY + 92}`, '#555', 6)}
            {L(`M${shX + 20} ${shY + 2} Q${shX + 30} ${shY + 60} ${shX - 10} ${shY + 92}`, '#555', 6)}
            {L(`M${shX - 10} ${shY + 92} L${shX - 10} ${shY + 112}`, '#555', 6)}
            <path d={wobEllipse(shX - 10, shY + 122, 13, 13, `${id}fo${b}`, 0.06, 8)} fill={C.lightGrey} stroke={INK} strokeWidth={4} />
          </>
        )}
        {tipo === 'policia' && (
          <>
            {estrella(cx - 26, pecho, 17, C.gold, 'pl')}
            {L(wobLine([-50, hipY + 2], [50, hipY + 2], `${id}ct${b}`, 1, 3), INK, 12)}
            <path d={wobRect(-12, hipY - 8, 24, 20, `${id}hb${b}`, 1, 3)} fill={C.gold} stroke={INK} strokeWidth={3} />
            {L(`M${shX} ${shY + 10} L${lerp(shX, 0, 0.8)} ${hipY - 10}`, INK, 3)}
          </>
        )}
        {tipo === 'influencer' && (
          <path
            d={`M${cx} ${pecho + 26} C${cx - 34} ${pecho} ${cx - 16} ${pecho - 22} ${cx} ${pecho - 6} C${cx + 16} ${pecho - 22} ${cx + 34} ${pecho} ${cx} ${pecho + 26} Z`}
            fill={C.paper}
            stroke={INK}
            strokeWidth={3.5}
          />
        )}
        {tipo === 'mona' &&
          [[-22, 0], [20, 26], [-8, 56], [28, 80], [-30, 96]].map(([dx, dy], i) => (
            <circle key={i} cx={lerp(shX, 0, 0.4) + dx} cy={pecho + dy} r={6} fill={C.paper} stroke={INK} strokeWidth={2.5} />
          ))}
        {tipo === 'profe' && (
          <>
            <path d={wobPoly([[shX - 18, shY + 2], [shX, shY + 18], [shX + 18, shY + 2]], `${id}pc${b}`, 1, true)} fill={C.paper} stroke={INK} strokeWidth={3.5} />
            <path d={wobPoly([[shX - 8, shY + 16], [shX + 8, shY + 16], [shX + 11, shY + 84], [shX, shY + 98], [shX - 11, shY + 84]], `${id}pt${b}`, 1.5, true)} fill={C.red} stroke={INK} strokeWidth={3.5} />
          </>
        )}
        {tipo === 'cocinero' && (
          <>
            <path d={wobRect(lerp(shX, 0, 0.5) - 42, shY + 70, 84, hipY - shY - 30, `${id}dl${b}`, 2, 8)} fill="#CFE8F7" stroke={INK} strokeWidth={4} />
            {L(`M${lerp(shX, 0, 0.5) - 40} ${shY + 72} L${shX - 18} ${shY + 6}`, INK, 3.5)}
            {L(`M${lerp(shX, 0, 0.5) + 40} ${shY + 72} L${shX + 18} ${shY + 6}`, INK, 3.5)}
            <path d={wobPoly([[shX - 22, shY], [shX + 22, shY], [shX, shY + 30]], `${id}pn${b}`, 1.5, true)} fill={C.red} stroke={INK} strokeWidth={3.5} />
          </>
        )}
        {tipo === 'astronauta' && (
          <>
            <path d={wobRect(cx - 34, pecho - 8, 68, 46, `${id}pa${b}`, 1.5, 6)} fill={C.grey} stroke={INK} strokeWidth={4} />
            {[C.red, C.green, C.yellow].map((c, i) => (
              <circle key={i} cx={cx - 18 + i * 18} cy={pecho + 15} r={6} fill={c} stroke={INK} strokeWidth={2} opacity={Math.floor(t * 3 + i) % 3 === 0 ? 0.35 : 1} />
            ))}
            {L(wobLine([-48, hipY + 6], [48, hipY + 6], `${id}ac${b}`, 1, 3), '#777', 10)}
          </>
        )}
      </g>
    );
  };
  // ── cola (perro y gato), por detrás del cuerpo ──
  const cola = (() => {
    if (tipo !== 'perro' && tipo !== 'gato') return null;
    const perro = tipo === 'perro';
    const w = perro ? Math.sin(t * 13 + seed) * 22 : Math.sin(t * 2.2 + seed) * 14;
    const d = perro
      ? `M-4 ${hipY + 6} Q${-60 + w * 0.3} ${hipY - 6} ${-82 + w} ${hipY - 70}`
      : `M-4 ${hipY + 6} Q-90 ${hipY + 10} ${-80 + w * 0.4} ${hipY - 80} Q${-70 + w} ${hipY - 150} ${-24 + w} ${hipY - 150}`;
    return (
      <>
        <path d={d} stroke={INK} strokeWidth={perro ? 24 : 22} fill="none" strokeLinecap="round" />
        <path d={d} stroke={fur} strokeWidth={perro ? 12 : 10} fill="none" strokeLinecap="round" />
      </>
    );
  })();
  // collar con chapa (perro y gato)
  const collar =
    tipo === 'perro' || tipo === 'gato' ? (
      <g>
        <path d={wobEllipse(shX, shY - 14, 26, 9, `${id}co${b}`, 0.08, 8)} fill={C.red} stroke={INK} strokeWidth={4} />
        <circle cx={shX} cy={shY + 4} r={8} fill={C.gold} stroke={INK} strokeWidth={3} />
      </g>
    ) : null;

  // ── cuerpo (palitos + ropa) ──
  const torso = (
    <>
      {cola}
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
      {camiseta && (
        <g>
          <path d={wobPoly(camiseta.torso, `${id}cm${b}`, 2.5, true)} fill={camiseta.color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
          {/* cuello redondo */}
          <path d={wobLine([shX - 16, shY + 2], [shX + 16, shY + 2], `${id}cu${b}`, 1, 3).replace(/^M/, 'M')} stroke={INK} strokeWidth={4} fill="none" />
          {ropa ? (
            detallesRopa()
          ) : tipo === 'currito' ? (
            // banda reflectante del currito
            <path d={wobLine([lerp(shX, 0, 0.55) - 50, lerp(shY, hipY, 0.55)], [lerp(shX, 0, 0.55) + 50, lerp(shY, hipY, 0.55)], `${id}rf${b}`, 1.5, 3)} stroke={C.orange} strokeWidth={14} fill="none" strokeLinecap="round" />
          ) : (
            // estrella del niño
            <path d={wobPoly(Array.from({length: 10}, (_, i) => {
              const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
              const r = i % 2 ? 7 : 16;
              return [lerp(shX, 0, 0.45) + Math.cos(a) * r, lerp(shY, hipY, 0.45) + Math.sin(a) * r] as [number, number];
            }), `${id}es${b}`, 1, true)} fill={C.red} stroke={INK} strokeWidth={3} />
          )}
        </g>
      )}
      {tipo === 'ia' && (
        <g>
          <path d={wobRect(shX - 38, shY + 14, 76, (hipY - shY) - 20, `${id}ch${b}`, 2.5, 12)} fill="#A9BCCB" stroke={INK} strokeWidth={SW} />
          <circle cx={shX} cy={shY + 60} r={12} fill={Math.floor(t * 2) % 2 ? '#4DF3FF' : '#1E8A99'} stroke={INK} strokeWidth={3} />
        </g>
      )}

      {/* palitos */}
      <path d={wobLine(sh, hp, `${id}sp${b}`, 2, 4)} {...stroke} />
      <path d={limb(hp, lK, lF, 'll')} {...stroke} />
      <path d={limb(hp, rK, rF, 'rl')} {...stroke} />
      {collar}
      {tipo === 'rico' && (
        <>
          {/* zapatos */}
          <ellipse cx={lF[0] - 8} cy={lF[1]} rx={18} ry={8} fill={INK} />
          <ellipse cx={rF[0] + 8} cy={rF[1]} rx={18} ry={8} fill={INK} />
        </>
      )}
    </>
  );
  // manga: tubo corto del color de la camiseta sobre el brazo (de hombro a ~45 % del brazo)
  const manga = (o: [number, number], e: [number, number], s: string, h?: [number, number]) => {
    if (!camiseta) return null;
    const larga = camiseta.mangaHasta > 0.6 && h;
    const m: [number, number] = larga ? [lerp(e[0], h![0], 0.74), lerp(e[1], h![1], 0.74)] : [lerp(o[0], e[0], camiseta.mangaHasta), lerp(o[1], e[1], camiseta.mangaHasta)];
    const d = larga ? `${wobLine(o, e, `${id}mg${s}${b}`, 1, 2)} ${wobLine(e, m, `${id}mh${s}${b}`, 1, 2)}` : wobLine(o, m, `${id}mg${s}${b}`, 1, 2);
    return (
      <>
        <path d={d} stroke={INK} strokeWidth={camiseta.manga + 2 * SW} fill="none" strokeLinecap="round" />
        <path d={d} stroke={camiseta.color} strokeWidth={camiseta.manga} fill="none" strokeLinecap="round" />
      </>
    );
  };
  // mano sencilla: un círculo de garabato del color de la cara (solo currito y niño, por ahora)
  const mano = (h: [number, number], s: string) =>
    camiseta ? <path d={wobEllipse(h[0], h[1], camiseta.mano, camiseta.mano * 0.92, `${id}mn${s}${b}`, 0.08, 8)} fill={face} stroke={INK} strokeWidth={4.5} /> : null;
  const brazos = (
    <>
      <path d={limb(shL, lE, lH, 'la')} {...stroke} />
      <path d={limb(shR, rE, rH, 'ra')} {...stroke} />
      {manga(shL, lE, 'l', lH)}
      {manga(shR, rE, 'r', rH)}
      {mano(lH, 'l')}
      {mano(rH, 'r')}
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
          {/* v3: orejas de gato (triángulos) y antenas de alien, por detrás de la cabeza */}
          {tipo === 'gato' &&
            [-1, 1].map((sd) => (
              <g key={sd}>
                <path d={wobPoly([[sd * hr * 0.25, -hr * 0.8], [sd * hr * 0.95, -hr * 1.25], [sd * hr * 0.92, -hr * 0.3]], `${id}go${sd}${b}`, 2, true)} fill={fur} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
                <path d={wobPoly([[sd * hr * 0.45, -hr * 0.78], [sd * hr * 0.84, -hr * 1.05], [sd * hr * 0.82, -hr * 0.5]], `${id}gi${sd}${b}`, 1.5, true)} fill={C.pink} />
              </g>
            ))}
          {tipo === 'alien' &&
            [-1, 1].map((sd) => {
              const bob = Math.sin(t * 5 + sd + seed) * 8;
              const tip: [number, number] = [sd * hr * 0.75 + bob, -hr * 1.55];
              return (
                <g key={sd}>
                  <path d={`M${sd * hr * 0.35} ${-hr * 0.85} Q${sd * hr * 0.7} ${-hr * 1.1} ${tip[0]} ${tip[1]}`} stroke={INK} strokeWidth={SW} fill="none" strokeLinecap="round" />
                  <path d={wobEllipse(tip[0], tip[1], 15, 15, `${id}at${sd}${b}`, 0.06, 8)} fill={Math.floor(t * 2 + (sd > 0 ? 1 : 0)) % 2 ? C.yellow : C.pink} stroke={INK} strokeWidth={4.5} />
                </g>
              );
            })}
          {/* orejas (la capucha las tapa) */}
          {!['ciberdelincuente', 'alien', 'perro', 'gato'].includes(tipo) && (
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
            <g>
              {/* patillas y mechones que asoman por debajo del casco */}
              {[-1, 1].map((sd) => (
                <path
                  key={sd}
                  d={wobPoly([[sd * hr * 0.62, -hr * 0.62], [sd * hr * 0.92, -hr * 0.5], [sd * hr * 0.8, -hr * 0.34], [sd * hr * 0.98, -hr * 0.2], [sd * hr * 0.74, -hr * 0.16]], `${id}pl${sd}${b}`, 2, true)}
                  fill="#3B2416"
                  stroke={INK}
                  strokeWidth={4}
                  strokeLinejoin="round"
                />
              ))}
            </g>
          )}
          {tipo === 'currito' && (
            <g transform={`translate(0 ${-hr * 0.72}) rotate(-4)`}>
              <path d={`M${-hr * 0.85} 10 Q0 ${-hr * 0.85} ${hr * 0.85} 10 Z`} fill={C.orange} stroke={INK} strokeWidth={SW} />
              <path d={wobRect(hr * 0.2, 0, hr * 1.0, 20, `${id}vs${b}`, 1.5, 9)} fill={C.orange} stroke={INK} strokeWidth={5} />
            </g>
          )}
          {tipo === 'nino' && (
            // flequillo de pinchos que asoma por debajo de la gorra
            <path
              d={wobPoly([[-hr * 0.72, -hr * 0.6], [-hr * 0.56, -hr * 0.46], [-hr * 0.4, -hr * 0.62], [-hr * 0.2, -hr * 0.5], [0, -hr * 0.64], [hr * 0.2, -hr * 0.5], [hr * 0.4, -hr * 0.62], [hr * 0.56, -hr * 0.46], [hr * 0.72, -hr * 0.6], [hr * 0.4, -hr * 0.8], [-hr * 0.4, -hr * 0.8]], `${id}fl${b}`, 2, true)}
              fill="#5A3A22"
              stroke={INK}
              strokeWidth={4}
              strokeLinejoin="round"
            />
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
          <Disfraz3 tipo={tipo} hr={hr} b={b} id={id} t={t} cara={cara} parpadeo={parpadeo} abre={abre} seed={seed} />
        </>
      )}
    </g>
  );

  const hand = rH;
  const objHand = obj === 'bolsa' || obj === 'bolso' ? lH : hand;
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
