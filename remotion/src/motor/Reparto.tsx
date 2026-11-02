/**
 * REPARTO: mueve a los personajes del plano en el tiempo (entradas con salto, desplazamientos,
 * cambios de pose y cara, bocadillos). Cada personaje tiene "apariciones" con "claves":
 *
 *   {tipo, apariciones: [{t0, t1, entrada, salida, claves: [{t, x, y, escala, pose, cara, mira, objeto, habla, salta}],
 *                         dice: [{texto, al, hasta}]}]}
 */
import React from 'react';
import {useVideoConfig} from 'remotion';
import {C, easeInOut, easeOut, lerp, overshoot, pop, ramp} from './base';
import {Cara, Mono, Objeto, Pose, TipoMono} from './Mono';
import {Caja} from './piezas';

export type Clave = {
  t: number;
  x: number;
  y: number;
  escala?: number;
  pose?: Pose;
  cara?: Cara;
  mira?: 'der' | 'izq';
  objeto?: Objeto;
  habla?: boolean;
  salta?: boolean;
};
export type Aparicion = {
  t0: number;
  t1: number;
  entrada?: 'salto' | 'cae' | 'izq' | 'der' | 'pop' | 'nada';
  salida?: 'salto' | 'izq' | 'der' | 'pop' | 'nada';
  claves: Clave[];
  dice?: {texto: string; al: number; hasta?: number; color?: string}[];
};
export type Personaje = {tipo: TipoMono; apariciones: Aparicion[]};

const ENTRA = 0.45;
const SALE = 0.32;

const PersonajeEnEscena: React.FC<{id: string; p: Personaje; ap: Aparicion; t: number}> = ({id, p, ap, t}) => {
  const VW = useVideoConfig().width; // 1920 en 16:9 (igual que antes); 1080 en vertical
  const ks = ap.claves;
  let i = 0;
  for (let k = 0; k < ks.length; k++) if (ks[k].t <= t + 1e-6) i = k;
  const k = ks[i];
  const prev = i > 0 ? ks[i - 1] : undefined;
  // pose/cara vigentes y cuándo cambiaron
  const poseDe = (j: number): Pose => {
    for (let q = j; q >= 0; q--) if (ks[q].pose) return ks[q].pose!;
    return 'de_pie';
  };
  const caraDe = (j: number): Cara => {
    for (let q = j; q >= 0; q--) if (ks[q].cara) return ks[q].cara!;
    return 'normal';
  };
  const campo = <K extends keyof Clave>(j: number, c: K, def: Clave[K]): Clave[K] => {
    for (let q = j; q >= 0; q--) if (ks[q][c] !== undefined) return ks[q][c];
    return def;
  };
  let pose = poseDe(i);
  const cara = caraDe(i);
  let cambioPose = -10;
  let poseAnterior: Pose | undefined;
  for (let q = i; q > 0; q--) {
    if (poseDe(q) !== poseDe(q - 1)) {
      cambioPose = ks[q].t;
      poseAnterior = poseDe(q - 1);
      break;
    }
  }
  let cambioCara = -10;
  for (let q = i; q > 0; q--)
    if (caraDe(q) !== caraDe(q - 1)) {
      cambioCara = ks[q].t;
      break;
    }

  // desplazamiento entre claves
  let x = k.x;
  let y = k.y;
  let salto = 0;
  const esc = campo(i, 'escala', 1) ?? 1;
  if (prev && (prev.x !== k.x || prev.y !== k.y)) {
    const dist = Math.hypot(k.x - prev.x, k.y - prev.y);
    const dur = Math.min(0.85, Math.max(0.3, dist / 1500));
    const pm = ramp(t, k.t, dur, easeInOut);
    if (pm < 1) {
      x = lerp(prev.x, k.x, pm);
      y = lerp(prev.y, k.y, pm);
      const hops = Math.max(1, Math.round(dist / 260));
      salto = Math.abs(Math.sin(pm * Math.PI * hops)) * 40;
      if (dist > 250) {
        poseAnterior = pose;
        pose = 'correr';
        cambioPose = k.t;
      }
    }
  }
  if (k.salta) salto += Math.max(0, Math.sin(Math.min(1, (t - k.t) / 0.45) * Math.PI)) * 90;

  // entrada y salida
  let dx = 0;
  let dy = 0;
  let sc = 1;
  let aplasta = 0;
  const pin = ramp(t, ap.t0, ENTRA, easeOut);
  const ent = ap.entrada ?? 'salto';
  if (pin < 1) {
    if (ent === 'salto') {
      dy = (1 - pin) * 720;
      salto += Math.sin(pin * Math.PI) * 160;
    } else if (ent === 'cae') {
      dy = -(1 - ramp(t, ap.t0, ENTRA, overshoot)) * 1200;
    } else if (ent === 'izq' || ent === 'der') {
      dx = (ent === 'izq' ? -1 : 1) * (1 - pin) * 1300;
      poseAnterior = 'correr';
      pose = pin < 0.85 ? 'correr' : pose;
      cambioPose = ap.t0 + ENTRA * 0.85;
    } else if (ent === 'pop') {
      sc = pop(t, ap.t0, ENTRA);
    }
  }
  // aterrizaje: aplastamiento
  const land = ap.t0 + ENTRA;
  if (ent !== 'nada' && t >= land && t < land + 0.25) aplasta = Math.sin(((t - land) / 0.25) * Math.PI) * 0.12;
  const sal = ap.salida ?? 'salto';
  const pout = ramp(t, ap.t1 - SALE, SALE, (v) => v * v);
  if (pout > 0 && sal !== 'nada') {
    if (sal === 'salto') {
      dy += pout * 760;
      salto += Math.sin(Math.min(1, pout * 1.6) * Math.PI) * 120;
    } else if (sal === 'izq' || sal === 'der') {
      dx += (sal === 'izq' ? -1 : 1) * pout * 1300;
      pose = 'correr';
    } else if (sal === 'pop') {
      sc *= 1 - pout;
    }
  }
  if (sc <= 0.01) return null;
  const escala = esc * sc;
  const habla = campo(i, 'habla', false) ?? false;
  const mira = campo(i, 'mira', 'der') ?? 'der';
  const objeto = campo(i, 'objeto', undefined);
  const dice = (ap.dice ?? []).filter((d) => t >= d.al && t < (d.hasta ?? ap.t1) - 0.05);
  const head = 640 * escala * (p.tipo === 'nino' ? 0.85 : 1);
  return (
    <>
      <Mono
        id={id}
        tipo={p.tipo}
        pose={pose}
        cara={cara}
        x={x + dx}
        y={y + dy}
        escala={escala}
        mira={mira}
        habla={habla}
        objeto={objeto}
        poseAnterior={poseAnterior}
        cambioPose={cambioPose}
        cambioCara={cambioCara}
        salto={salto}
        aplasta={aplasta}
      />
      {dice.map((d, j) => {
        const pp = pop(t, d.al, 0.35) * (1 - ramp(t, (d.hasta ?? ap.t1) - 0.2, 0.15));
        const bx = Math.min(VW - 220, Math.max(220, x + dx + (mira === 'izq' ? -1 : 1) * 160 * escala));
        const by = Math.max(150, y + dy - head - 50 - salto * escala);
        return (
          <div key={j} style={{position: 'absolute', left: 0, top: 0}}>
            {pp > 0.3 && (
              <svg style={{position: 'absolute', left: bx - 20, top: by - 14, overflow: 'visible'}} width={1} height={1}>
                <path d={`M0 0 L${mira === 'izq' ? 34 : -14} 58 L34 0 Z`} fill={d.color ?? C.paper} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
              </svg>
            )}
            <Caja x={bx} y={by} seed={`dc${id}${j}`} bg={d.color ?? C.paper} scale={pp} style={{translate: '-50% -100%', transformOrigin: '50% 100%', padding: '12px 26px', fontSize: 46, maxWidth: 620, whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.12, ...(VW < 1200 ? {width: 'max-content', maxWidth: 520} : {})}}>
              {d.texto}
            </Caja>
          </div>
        );
      })}
    </>
  );
};

export const Reparto: React.FC<{reparto: Record<string, Personaje>; t: number}> = ({reparto, t}) => {
  const vivos: {id: string; p: Personaje; ap: Aparicion; y: number}[] = [];
  for (const [id, p] of Object.entries(reparto)) {
    for (const ap of p.apariciones) {
      if (t >= ap.t0 && t <= ap.t1) {
        vivos.push({id, p, ap, y: ap.claves[0]?.y ?? 0});
        break;
      }
    }
  }
  // los de más abajo (más cerca) se pintan encima
  vivos.sort((a, b) => a.y - b.y);
  return (
    <>
      {vivos.map(({id, p, ap}) => (
        <PersonajeEnEscena key={id} id={id} p={p} ap={ap} t={t} />
      ))}
    </>
  );
};
