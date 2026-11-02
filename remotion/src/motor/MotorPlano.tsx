/**
 * MotorPlano: la composición genérica que pinta CUALQUIER vídeo a partir de su plano resuelto
 * (public-motor/<slug>/plano.json, lo escribe scripts/motor_plano.py). Ningún vídeo nuevo necesita código.
 *
 * Capas: fondo de rayos con cortinilla de color → escenas (gráficos) → reparto (monos) → sonido.
 */
import React from 'react';
import {AbsoluteFill, Audio, CalculateMetadataFunction, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, col, decay, loadFont, ramp} from './base';
import {Cue, ESCENAS} from './Escenas';
import {Personaje, Reparto} from './Reparto';
import {Palabra, PalabrasProvider} from './tiempo';

export type EscenaPlano = {tipo: string; d: any; t0: number; t1: number};
export type TramoPlano = {t0: number; t1: number; color?: string; escenas: EscenaPlano[]; sfx?: Cue[]; golpes?: number[]};
export type PlanoResuelto = {
  slug: string;
  fps: number;
  ancho: number;
  alto: number;
  duracion: number;
  voz: string;
  palabras: Palabra[];
  tramos: TramoPlano[];
  reparto: Record<string, Personaje>;
  sfx_gain: Record<string, number>;
  rayos?: {x: number; y: number};
};
export type MotorProps = {slug: string; plano?: PlanoResuelto | null};

export const calcularPlano: CalculateMetadataFunction<MotorProps> = async ({props}) => {
  const res = await fetch(staticFile(`${props.slug}/plano.json`));
  const plano = (await res.json()) as PlanoResuelto;
  return {
    durationInFrames: Math.ceil(plano.duracion * plano.fps),
    fps: plano.fps,
    width: plano.ancho,
    height: plano.alto,
    props: {...props, plano},
  };
};

// ───────────────────────── fondo de rayos + cortinilla ─────────────────────────
const Rayos: React.FC<{color: string; t: number; W: number; H: number; cx: number; cy: number}> = ({color, t, W, H, cx, cy}) => (
  <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
    <g transform={`translate(${cx} ${cy}) rotate(${t * 4})`}>
      {Array.from({length: 20}, (_, i) => {
        const a0 = (i / 20) * Math.PI * 2;
        const a1 = a0 + Math.PI / 20;
        const R = 2600;
        return <path key={i} d={`M0 0 L${Math.cos(a0) * R} ${Math.sin(a0) * R} L${Math.cos(a1) * R} ${Math.sin(a1) * R} Z`} fill={color} opacity={0.16} />;
      })}
    </g>
    <circle cx={cx} cy={cy} r={Math.max(W, H) * 0.9} fill="url(#vig)" />
    <defs>
      <radialGradient id="vig">
        <stop offset="0.45" stopColor="#fff" stopOpacity={0} />
        <stop offset="1" stopColor={color} stopOpacity={0.22} />
      </radialGradient>
    </defs>
  </svg>
);

const Fondo: React.FC<{tramos: TramoPlano[]; t: number; W: number; H: number; cx: number; cy: number}> = ({tramos, t, W, H, cx, cy}) => {
  // lista de cambios de color (solo cuando cambia de verdad)
  const cambios: [number, string][] = [];
  for (const tr of tramos) {
    const c = col(tr.color, cambios.length ? cambios[cambios.length - 1][1] : C.yellow);
    if (!cambios.length || cambios[cambios.length - 1][1] !== c) cambios.push([tr.t0, c]);
  }
  let i = 0;
  for (let k = 0; k < cambios.length; k++) if (cambios[k][0] <= t) i = k;
  const [s, c] = cambios[i] ?? [0, C.yellow];
  const prev = cambios[Math.max(0, i - 1)]?.[1] ?? c;
  const p = i > 0 ? ramp(t, s - 0.1, 0.55, Easing.bezier(0.6, 0, 0.3, 1)) : 1;
  const R = Math.hypot(W, H);
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Rayos color={prev} t={t} W={W} H={H} cx={cx} cy={cy} />
      <AbsoluteFill style={{clipPath: `circle(${p * R}px at ${cx}px ${cy}px)`, background: C.paper}}>
        <Rayos color={c} t={t} W={W} H={H} cx={cx} cy={cy} />
      </AbsoluteFill>
      {p > 0 && p < 1 && (
        <div
          style={{
            position: 'absolute',
            left: cx,
            top: cy,
            width: p * R * 2,
            height: p * R * 2,
            translate: '-50% -50%',
            borderRadius: '50%',
            border: `18px solid ${c}`,
            opacity: 0.75,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// ───────────────────────── sonido ─────────────────────────
export const cuesDelPlano = (plano: PlanoResuelto): Cue[] => {
  const all: Cue[] = [];
  plano.tramos.forEach((tr, i) => {
    const prevColor = i ? plano.tramos[i - 1].color : undefined;
    if (i && tr.color && tr.color !== prevColor) all.push(['whoosh', tr.t0 - 0.12, 0.85]);
    for (const e of tr.escenas) {
      const def = ESCENAS[e.tipo];
      if (def && e.d?.sfx !== false) all.push(...def.sfx(e.d ?? {}, e.t0, e.t1));
    }
    all.push(...(tr.sfx ?? []));
  });
  // reparto: aterrizajes y saltos
  for (const p of Object.values(plano.reparto)) {
    for (const ap of p.apariciones) {
      if ((ap.entrada ?? 'salto') === 'salto') all.push(['boing', ap.t0 + 0.05, 0.35]);
      if (ap.entrada === 'izq' || ap.entrada === 'der') all.push(['pasos', ap.t0, 0.5]);
      if ((ap.salida ?? 'salto') !== 'nada' && ap.t1 < plano.duracion - 0.5) all.push(['swoosh', ap.t1 - 0.3, 0.4]);
      for (const k of ap.claves) if (k.salta) all.push(['boing', k.t, 0.5]);
      for (const d of ap.dice ?? []) all.push(['pop2', d.al, 0.7]);
    }
  }
  // limpia: fuera de rango y repetidos del mismo efecto a menos de 0,12 s
  const out: Cue[] = [];
  const last: Record<string, number> = {};
  all
    .filter((c) => c[1] >= 0 && c[1] < plano.duracion - 0.1)
    .sort((a, b) => a[1] - b[1])
    .forEach((c) => {
      if (last[c[0]] !== undefined && c[1] - last[c[0]] < 0.12) return;
      last[c[0]] = c[1];
      out.push(c);
    });
  return out;
};

const Sonido: React.FC<{plano: PlanoResuelto}> = ({plano}) => {
  const {fps} = useVideoConfig();
  const cues = React.useMemo(() => cuesDelPlano(plano), [plano]);
  return (
    <>
      <Audio src={staticFile(plano.voz)} />
      {cues.map(([s, a, k = 1], i) => (
        <Sequence key={i} from={Math.max(0, Math.round(a * fps))} durationInFrames={Math.round(3 * fps)} layout="none" name={`sfx ${s}`}>
          <Audio src={staticFile(`sfx/${s}.mp3`)} volume={Math.min(1, (plano.sfx_gain[s] ?? 0.25) * k)} />
        </Sequence>
      ))}
    </>
  );
};

// ───────────────────────── composición ─────────────────────────
export const golpesDelPlano = (plano: PlanoResuelto): {t: number; fuerza: number}[] => {
  const g: {t: number; fuerza: number}[] = [];
  for (const tr of plano.tramos) {
    for (const e of tr.escenas) {
      if (e.tipo === 'sello') g.push({t: typeof e.d?.al === 'number' ? e.d.al : e.t0 + 0.2, fuerza: 1});
      if (e.tipo === 'lista') g.push({t: e.t0, fuerza: 0.6});
    }
    for (const x of tr.golpes ?? []) g.push({t: x, fuerza: 0.8});
  }
  return g;
};

export const Lienzo: React.FC<{plano: PlanoResuelto}> = ({plano}) => {
  loadFont();
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const t = frame / fps;
  const golpes = React.useMemo(() => golpesDelPlano(plano), [plano]);
  let punch = 0;
  let sx = 0;
  let sy = 0;
  for (const g of golpes) {
    if (t < g.t || t > g.t + 1.2) continue;
    punch += 0.04 * g.fuerza * decay(t, g.t, 7);
    sx += Math.sin((t - g.t) * 55) * 16 * g.fuerza * decay(t, g.t, 6);
    sy += Math.sin((t - g.t) * 55 + 1) * 9 * g.fuerza * decay(t, g.t, 6);
  }
  const cx = plano.rayos?.x ?? width / 2;
  const cy = plano.rayos?.y ?? height * 0.58;
  return (
    <PalabrasProvider words={plano.palabras}>
      <AbsoluteFill style={{background: C.paper, overflow: 'hidden'}}>
        <AbsoluteFill style={{scale: `${1 + punch}`, translate: `${sx}px ${sy}px`}}>
          <Fondo tramos={plano.tramos} t={t} W={width} H={height} cx={cx} cy={cy} />
          {plano.tramos.map((tr, i) =>
            tr.escenas.map((e, j) => {
              if (t < e.t0 - 0.05 || t > e.t1 + 0.05) return null;
              const def = ESCENAS[e.tipo];
              if (!def) return null;
              const R = def.render;
              const out = 1 - ramp(t, e.t1 - 0.16, 0.16);
              return (
                <AbsoluteFill key={`${i}-${j}`} style={{opacity: out, scale: `${1 - 0.04 * (1 - out)}`}}>
                  <R d={e.d ?? {}} t={t} t0={e.t0} t1={e.t1} />
                </AbsoluteFill>
              );
            }),
          )}
          <Reparto reparto={plano.reparto} t={t} />
        </AbsoluteFill>
      </AbsoluteFill>
    </PalabrasProvider>
  );
};

export const MotorPlano: React.FC<MotorProps> = ({plano}) => {
  if (!plano) return <AbsoluteFill style={{background: C.paper}} />;
  return (
    <>
      <Sonido plano={plano} />
      <Lienzo plano={plano} />
    </>
  );
};
