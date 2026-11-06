/**
 * Piezas dibujadas reutilizables: caja de rotulador (Caja), texto gigante con contorno (Grande),
 * ráfaga de confeti (Rafaga) y flecha que se dibuja (Flecha).
 */
import React from 'react';
import {random} from 'remotion';
import {C, CHIP_COLORS, doodleRadius, easeOut, FONT, jit, ramp, useBoil, wobLine, wobPoly} from './base';
import {useTema} from './tema';

export const Caja: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  bg?: string;
  seed?: number | string;
  scale?: number;
  rotate?: number;
  opacity?: number;
  border?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, w, h, bg = C.paper, seed = 1, scale = 1, rotate = 0, opacity = 1, border = 6, children, style}) => {
  const b = useBoil();
  const tema = useTema();
  if (scale <= 0.001 || opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: w,
        height: h,
        translate: '-50% -50%',
        scale: `${scale}`,
        rotate: `${rotate + (tema?.quieto ? 0 : jit(`${seed}-${b}`, 0.8))}deg`,
        opacity,
        background: tema?.cajaFondo ?? bg,
        border: `${border}px solid ${tema?.linea ?? C.ink}`,
        borderRadius: tema ? tema.radio : doodleRadius(`${seed}${b}`),
        boxShadow: tema ? tema.sombra : `${6 + jit(`${seed}s${b}`, 1)}px ${8 + jit(`${seed}t${b}`, 1)}px 0 ${C.ink}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: tema?.fuente ?? FONT,
        color: tema?.cajaTexto ?? C.ink,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Grande: React.FC<{
  x: number;
  y: number;
  size: number;
  color?: string;
  scale?: number;
  rotate?: number;
  opacity?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, size, color = C.yellow, scale = 1, rotate = 0, opacity = 1, children, style}) => {
  const b = useBoil();
  const tema = useTema();
  if (scale <= 0.001 || opacity <= 0.001) return null;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        translate: '-50% -50%',
        scale: `${scale}`,
        rotate: `${rotate + (tema?.quieto ? 0 : jit(`big${b}${size}`, 0.7))}deg`,
        opacity,
        fontFamily: tema?.fuenteTitulo ?? FONT,
        fontSize: size,
        lineHeight: 1,
        color,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        WebkitTextStroke: `${Math.round(size * 0.07)}px ${tema?.contornoTitulo ?? C.ink}`,
        paintOrder: 'stroke fill',
        textShadow: `${size * 0.05}px ${size * 0.07}px 0 ${tema?.contornoTitulo ?? C.ink}`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export const Rafaga: React.FC<{t: number; t0: number; x: number; y: number; n?: number; colors?: string[]; spread?: number}> = ({
  t,
  t0,
  x,
  y,
  n = 16,
  colors = CHIP_COLORS,
  spread = 420,
}) => {
  const dt = t - t0;
  if (dt < 0 || dt > 1.1) return null;
  return (
    <>
      {Array.from({length: n}, (_, i) => {
        const a = (i / n) * Math.PI * 2 + jit(`ba${t0}${i}`, 0.3);
        const v = spread * (0.6 + random(`bv${t0}${i}`) * 0.6);
        const p = easeOut(Math.min(1, dt / 0.9));
        const px = x + Math.cos(a) * v * p;
        const py = y + Math.sin(a) * v * p + 260 * dt * dt;
        const s = 14 + random(`bs${t0}${i}`) * 16;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: px,
              top: py,
              width: s,
              height: s * (i % 3 === 0 ? 1 : 0.5),
              background: colors[i % colors.length],
              border: `3px solid ${C.ink}`,
              borderRadius: i % 2 ? '50%' : 3,
              rotate: `${dt * 500 + i * 40}deg`,
              opacity: 1 - ramp(t, t0 + 0.7, 0.4),
            }}
          />
        );
      })}
    </>
  );
};

/** Flecha de rotulador que se dibuja de a a b (p de 0 a 1). Curvada con `curva` (px). */
export const Flecha: React.FC<{a: [number, number]; b: [number, number]; p: number; color?: string; curva?: number; grosor?: number; seed?: string}> = ({
  a,
  b,
  p,
  color = C.ink,
  curva = 0,
  grosor = 10,
  seed = 'f',
}) => {
  const bb = useBoil();
  if (p <= 0) return null;
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  const c: [number, number] = [mx - (dy / len) * curva, my + (dx / len) * curva];
  // puntos de la curva cuadrática hasta p
  const N = 14;
  const pts: [number, number][] = [];
  for (let i = 0; i <= N; i++) {
    const u = (i / N) * p;
    pts.push([(1 - u) * (1 - u) * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) * (1 - u) * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]]);
  }
  const end = pts[pts.length - 1];
  const prev = pts[pts.length - 2] ?? a;
  const ang = Math.atan2(end[1] - prev[1], end[0] - prev[0]);
  const hl = 34;
  const h1: [number, number] = [end[0] - Math.cos(ang - 0.5) * hl, end[1] - Math.sin(ang - 0.5) * hl];
  const h2: [number, number] = [end[0] - Math.cos(ang + 0.5) * hl, end[1] - Math.sin(ang + 0.5) * hl];
  return (
    <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
      <path d={wobPoly(pts, `${seed}${bb}`, 1.6)} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" />
      {p > 0.92 && <path d={`${wobLine(h1, end, `${seed}h1${bb}`, 1)} ${wobLine(end, h2, `${seed}h2${bb}`, 1)}`} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
};
