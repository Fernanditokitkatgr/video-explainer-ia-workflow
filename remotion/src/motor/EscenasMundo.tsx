/**
 * ESCENAS DE MUNDO (nov-2026): un escenario PERSISTENTE que crece delante del espectador, para explicar
 * un mecanismo como una historia (enfoque narrativo "pueblo que crece"; ver channel/tecno/pruebas/ecomonos/analisis.md).
 *
 *   pueblo   Un pueblo de garabato sobre una colina: casas, máquinas, naves de servidores, torres de
 *            refrigeración, centrales, molinos y postes unidos por cables por los que corre la luz.
 *            Los elementos aparecen en su palabra, se calientan, se apagan (apagón) y la cámara se aleja
 *            cuando el pueblo crece. Un medidor opcional enseña cuánta luz se gasta.
 *
 * Datos de `pueblo` (los `…_al` son anclas):
 *   elementos: [{id, tipo, x, escala, al, ya, quita_al, texto, texto_al, color, calor_al, encendida}]
 *       tipo: casa · maquina · nave · refrigeracion · nuclear · central · molino · poste
 *       x: fracción del ancho de la zona (-0,5..0,5) o píxeles desde el centro.  ya: true = ya estaba (sin pop)
 *   cables: [{de, a, al}]            ids de elementos; la luz corre por ellos mientras haya corriente
 *   apagon_al / vuelve_al            el pueblo se queda a oscuras / vuelve la luz
 *   zoom: {desde, hasta, al, dur}    la cámara se aleja (o se acerca) cuando crece el pueblo
 *   medidor: {texto, desde, hasta, al, hasta_al}   barra de consumo 0..1 a la derecha (verde → rojo)
 *   cartel: "TEXTO"                  letrero de madera a la izquierda
 *   continua: true                   sigue del tramo anterior: sin animación de entrada de la colina
 *   suelo: px por debajo del centro de la zona donde está el suelo (por defecto 210) · escala: tamaño general de los edificios (1,2)
 *
 * Se registra en ESCENAS desde index.ts (registrarMundo), sin tocar Escenas.tsx.
 */
import React from 'react';
import {useVideoConfig} from 'remotion';
import {C, col, decay, easeInOut, FONT, jit, lerp, pop, ramp, useBoil, wobEllipse, wobLine, wobPoly, wobRect} from './base';
import {Caja} from './piezas';
import type {Cue, DefEscena, EscenaProps} from './Escenas';
import {ESCENAS} from './Escenas';

type Zona = {x: number; y: number; w: number};
const ZONAS: Record<string, Zona> = {
  centro: {x: 960, y: 400, w: 1300},
  arriba: {x: 960, y: 300, w: 1500},
  der: {x: 1290, y: 420, w: 980},
  izq: {x: 630, y: 420, w: 980},
  abajo: {x: 960, y: 700, w: 1400},
};
const ZONAS_V: Record<string, Zona> = {
  centro: {x: 540, y: 640, w: 960},
  arriba: {x: 540, y: 440, w: 980},
  der: {x: 790, y: 640, w: 500},
  izq: {x: 290, y: 640, w: 500},
  abajo: {x: 540, y: 940, w: 960},
};
const useZona = (d: any): Zona => {
  const {width, height} = useVideoConfig();
  const Z = height > width ? ZONAS_V : ZONAS;
  return {...(Z[d.zona] ?? Z.centro), ...(d.caja ?? {})};
};
const at = (v: any, def: number) => (typeof v === 'number' ? v : def);
const INK = C.ink;

// altura (px a escala 1) de cada tipo: sirve para colgar los cables y colocar etiquetas
const ALTO: Record<string, number> = {casa: 200, maquina: 150, nave: 190, refrigeracion: 170, nuclear: 250, central: 240, molino: 260, poste: 210};

type Ctx = {t: number; b: number; luz: number; calor: number; k: string; color?: string};

// ───────────────────────── piezas del pueblo (origen = centro del suelo) ─────────────────────────
const Ventana: React.FC<{x: number; y: number; w: number; h: number; luz: number; k: string; b: number}> = ({x, y, w, h, luz, k, b}) => (
  <>
    <path d={wobRect(x, y, w, h, `${k}v${b}`, 1.5, 4)} fill={luz > 0.5 ? C.yellow : '#3A3F52'} stroke={INK} strokeWidth={5} />
    {luz > 0.5 && <path d={wobLine([x + w * 0.25, y + h * 0.3], [x + w * 0.6, y + h * 0.3], `${k}vb${b}`, 1)} stroke={C.paper} strokeWidth={4} strokeLinecap="round" />}
  </>
);

const Casa: React.FC<Ctx> = ({b, luz, k, color, t}) => {
  const humo = (t * 0.7) % 1;
  return (
    <g>
      <path d={wobRect(48, -205, 26, 60, `${k}ch${b}`, 1.5, 3)} fill={C.red} stroke={INK} strokeWidth={6} />
      <circle cx={61 + humo * 20} cy={-215 - humo * 70} r={10 + humo * 14} fill={C.lightGrey} stroke={INK} strokeWidth={4} opacity={1 - humo} />
      <path d={wobRect(-78, -125, 156, 125, `${k}c${b}`, 2.5, 6)} fill={col(color, C.pink)} stroke={INK} strokeWidth={7} />
      <path d={wobPoly([[-98, -118], [0, -205], [98, -118]], `${k}t${b}`, 3, true)} fill={C.red} stroke={INK} strokeWidth={7} strokeLinejoin="round" />
      <Ventana x={-58} y={-95} w={44} h={40} luz={luz} k={k} b={b} />
      <path d={wobRect(12, -82, 42, 82, `${k}p${b}`, 1.5, 5)} fill={C.orange} stroke={INK} strokeWidth={6} />
      {/* bombilla colgando en el porche */}
      <line x1={-36} y1={-125} x2={-36} y2={-138} stroke={INK} strokeWidth={4} />
      {luz > 0.5 && <circle cx={-36} cy={-108} r={34} fill={C.yellow} opacity={0.25 + 0.1 * Math.sin(t * 6)} />}
    </g>
  );
};

const Maquina: React.FC<Ctx> = ({b, luz, k, t}) => {
  const parpadeo = Math.floor(t * 3) % 2;
  return (
    <g>
      <path d={wobRect(-62, -150, 124, 120, `${k}m${b}`, 2.5, 10)} fill={C.lightGrey} stroke={INK} strokeWidth={7} />
      <path d={wobRect(-46, -134, 92, 70, `${k}ms${b}`, 1.5, 6)} fill={luz > 0.5 ? C.blue : '#3A3F52'} stroke={INK} strokeWidth={5} />
      {luz > 0.5 && (
        <text x={0} y={-82} textAnchor="middle" fontFamily={FONT} fontSize={46} fill={C.paper} stroke={INK} strokeWidth={3} paintOrder="stroke">
          {parpadeo ? '?' : '!'}
        </text>
      )}
      <path d={wobRect(-30, -30, 60, 30, `${k}mp${b}`, 1.5, 4)} fill={C.grey} stroke={INK} strokeWidth={6} />
      <circle cx={40} cy={-44} r={6} fill={luz > 0.5 ? C.green : C.grey} stroke={INK} strokeWidth={3} />
    </g>
  );
};

const Nave: React.FC<Ctx> = ({b, luz, k, t, calor}) => {
  const racks = [-120, -60, 0, 60, 120];
  return (
    <g>
      {/* ventiladores en el tejado */}
      {[-110, 0, 110].map((fx, i) => (
        <g key={i} transform={`translate(${fx} -198)`}>
          <path d={wobEllipse(0, 0, 30, 14, `${k}f${i}${b}`, 0.06, 10)} fill={C.grey} stroke={INK} strokeWidth={5} />
          <line x1={-24 * Math.cos(t * 14 + i)} y1={-8 * Math.sin(t * 14 + i)} x2={24 * Math.cos(t * 14 + i)} y2={8 * Math.sin(t * 14 + i)} stroke={INK} strokeWidth={5} opacity={luz} />
        </g>
      ))}
      <path d={wobRect(-185, -190, 370, 190, `${k}n${b}`, 3, 10)} fill={calor > 0.5 ? '#FFC2A8' : C.lightGrey} stroke={INK} strokeWidth={8} />
      {racks.map((rx, i) => (
        <g key={i}>
          <path d={wobRect(rx - 24, -165, 48, 140, `${k}r${i}${b}`, 1.5, 4)} fill="#2B2F3A" stroke={INK} strokeWidth={5} />
          {Array.from({length: 6}, (_, j) => {
            const on = luz > 0.5 && (Math.floor(t * 8 + i * 3 + j * 5) % 3 !== 0);
            return <circle key={j} cx={rx - 10 + (j % 2) * 20} cy={-148 + Math.floor(j / 2) * 22 + 10} r={5} fill={on ? (j % 3 ? C.green : C.blue) : '#55596A'} />;
          })}
          <line x1={rx - 16} x2={rx + 16} y1={-60} y2={-60} stroke="#55596A" strokeWidth={4} />
          <line x1={rx - 16} x2={rx + 16} y1={-45} y2={-45} stroke="#55596A" strokeWidth={4} />
        </g>
      ))}
    </g>
  );
};

const Vapor: React.FC<{x: number; y: number; t: number; k: string; b: number; n?: number; tam?: number; on: number}> = ({x, y, t, k, b, n = 3, tam = 26, on}) => (
  <>
    {Array.from({length: n}, (_, i) => {
      const p = (t * 0.45 + i / n) % 1;
      return (
        <path
          key={i}
          d={wobEllipse(x + Math.sin(p * 5 + i) * 18, y - p * 150, tam + p * tam * 1.4, (tam + p * tam * 1.4) * 0.75, `${k}va${i}${b}`, 0.08, 9)}
          fill={C.paper}
          stroke={INK}
          strokeWidth={4}
          opacity={on * (1 - p) * 0.95}
        />
      );
    })}
  </>
);

const Refrigeracion: React.FC<Ctx> = ({b, luz, k, t}) => (
  <g>
    <Vapor x={0} y={-170} t={t} k={k} b={b} on={luz} />
    <path d={wobRect(-80, -150, 160, 150, `${k}rf${b}`, 2.5, 8)} fill={C.blue} stroke={INK} strokeWidth={7} />
    <path d={wobEllipse(0, -150, 70, 18, `${k}rt${b}`, 0.05, 10)} fill={C.lightGrey} stroke={INK} strokeWidth={6} />
    {[0, 1, 2].map((i) => {
      const a = t * 9 * luz + (i * Math.PI * 2) / 3;
      return <line key={i} x1={0} y1={-150} x2={Math.cos(a) * 56} y2={-150 + Math.sin(a) * 14} stroke={INK} strokeWidth={6} strokeLinecap="round" />;
    })}
    {/* tuberías */}
    <path d={wobLine([-80, -60], [-130, -60], `${k}tu1${b}`, 1)} stroke={C.blue} strokeWidth={16} strokeLinecap="round" />
    <path d={wobLine([-80, -60], [-130, -60], `${k}tu1${b}`, 1)} stroke={INK} strokeWidth={4} fill="none" />
    {[-50, 0, 50].map((gx, i) => (
      <path key={i} d={`M${gx} -110 q -8 14 0 22 q 8 -8 0 -22`} fill={C.paper} stroke={INK} strokeWidth={4} transform={`translate(0 ${((t * 40 + i * 13) % 40)})`} opacity={luz} />
    ))}
  </g>
);

const Nuclear: React.FC<Ctx> = ({b, luz, k, t}) => (
  <g>
    <Vapor x={-10} y={-255} t={t} k={k} b={b} n={4} tam={34} on={luz} />
    <path
      d={wobPoly([[-110, 0], [-82, -90], [-72, -170], [-80, -250], [80, -250], [72, -170], [82, -90], [110, 0]], `${k}nu${b}`, 3, true)}
      fill={C.lightGrey}
      stroke={INK}
      strokeWidth={8}
      strokeLinejoin="round"
    />
    <path d={wobLine([-78, -205], [78, -205], `${k}nb${b}`, 1.5)} stroke={C.red} strokeWidth={14} />
    <path d={wobEllipse(-150, -40, 60, 52, `${k}cu${b}`, 0.04, 12)} fill={C.paper} stroke={INK} strokeWidth={7} />
    <path d={wobRect(-210, -40, 120, 40, `${k}cb${b}`, 2, 4)} fill={C.paper} stroke={INK} strokeWidth={7} />
    {/* símbolo de radiación de garabato */}
    <g transform="translate(-150 -52)">
      <circle r={9} fill={INK} />
      {[0, 1, 2].map((i) => {
        const a0 = (i * 2 * Math.PI) / 3 - Math.PI / 2 - 0.5;
        const a1 = a0 + 1.0;
        const r0 = 14;
        const r1 = 34;
        return (
          <path
            key={i}
            d={`M${Math.cos(a0) * r0} ${Math.sin(a0) * r0} L${Math.cos(a0) * r1} ${Math.sin(a0) * r1} A${r1} ${r1} 0 0 1 ${Math.cos(a1) * r1} ${Math.sin(a1) * r1} L${Math.cos(a1) * r0} ${Math.sin(a1) * r0} Z`}
            fill={luz > 0.5 ? C.yellow : C.grey}
            stroke={INK}
            strokeWidth={4}
          />
        );
      })}
    </g>
  </g>
);

const Central: React.FC<Ctx> = ({b, luz, k, t}) => (
  <g>
    <Vapor x={60} y={-245} t={t} k={k} b={b} on={luz} tam={22} />
    <path d={wobRect(40, -240, 44, 150, `${k}ce${b}`, 2, 4)} fill={C.red} stroke={INK} strokeWidth={7} />
    <path d={wobLine([40, -205], [84, -205], `${k}ceb${b}`, 1)} stroke={C.paper} strokeWidth={10} />
    <path d={wobRect(-110, -120, 220, 120, `${k}cn${b}`, 3, 8)} fill={C.orange} stroke={INK} strokeWidth={8} />
    <path d={wobPoly([[-70, -95], [-40, -55], [-62, -55], [-30, -10]], `${k}ry${b}`, 2)} stroke={luz > 0.5 ? C.yellow : C.grey} strokeWidth={12} fill="none" strokeLinecap="round" />
    <path d={wobPoly([[-70, -95], [-40, -55], [-62, -55], [-30, -10]], `${k}ry${b}`, 2)} stroke={INK} strokeWidth={3} fill="none" />
  </g>
);

const Molino: React.FC<Ctx> = ({b, luz, k, t}) => (
  <g>
    <path d={wobPoly([[-14, 0], [-6, -235], [6, -235], [14, 0]], `${k}mo${b}`, 1.5, true)} fill={C.paper} stroke={INK} strokeWidth={7} />
    <g transform={`translate(0 -240) rotate(${t * 120 * luz})`}>
      {[0, 120, 240].map((a) => (
        <path key={a} d={wobPoly([[0, -6], [0, -110], [16, -60], [6, -6]], `${k}pa${a}${b}`, 1.5, true)} fill={C.paper} stroke={INK} strokeWidth={6} transform={`rotate(${a})`} />
      ))}
      <circle r={12} fill={C.grey} stroke={INK} strokeWidth={5} />
    </g>
  </g>
);

const Poste: React.FC<Ctx> = ({b, k}) => (
  <g>
    <path d={wobLine([0, 0], [0, -210], `${k}po${b}`, 2)} stroke="#8A5A3B" strokeWidth={16} strokeLinecap="round" />
    <path d={wobLine([0, 0], [0, -210], `${k}po${b}`, 2)} stroke={INK} strokeWidth={4} fill="none" />
    <path d={wobLine([-40, -190], [40, -190], `${k}pc${b}`, 1.5)} stroke={INK} strokeWidth={9} strokeLinecap="round" />
  </g>
);

const PIEZAS: Record<string, React.FC<Ctx>> = {casa: Casa, maquina: Maquina, nave: Nave, refrigeracion: Refrigeracion, nuclear: Nuclear, central: Central, molino: Molino, poste: Poste};

// ───────────────────────── escena ─────────────────────────
type ElemPos = {e: any; i: number; x: number; s: number; vis: number; top: number};

const Pueblo: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const suelo = z.y + at(d.suelo, 210);
  const EM = at(d.escala, 1.2); // escala general de los edificios
  const cont = !!d.continua;
  // colina
  const pc = cont ? 1 : pop(t, t0, 0.5);
  // apagón
  const apag = typeof d.apagon_al === 'number' ? ramp(t, d.apagon_al, 0.25) * (1 - (typeof d.vuelve_al === 'number' ? ramp(t, d.vuelve_al, 0.3) : 0)) : 0;
  const parpadeoApagon = typeof d.apagon_al === 'number' && t > d.apagon_al && t < d.apagon_al + 0.5 ? (Math.floor((t - d.apagon_al) * 16) % 2) : 0;
  const luzGlobal = Math.max(0, 1 - apag) * (parpadeoApagon ? 0 : 1);
  // zoom de cámara
  const zm = d.zoom ? lerp(at(d.zoom.desde, 1), at(d.zoom.hasta, 1), ramp(t, at(d.zoom.al, t0), at(d.zoom.dur, 1.2), easeInOut)) : 1;

  const elems: ElemPos[] = (d.elementos ?? []).map((e: any, i: number) => {
    const x = Math.abs(e.x ?? 0) <= 1 ? (e.x ?? 0) * z.w : e.x;
    const s = (e.escala ?? 1) * EM;
    let vis: number;
    if (typeof e.al === 'number') vis = pop(t, e.al, 0.5);
    else vis = cont || e.ya ? 1 : pop(t, t0 + 0.15 + i * 0.12, 0.5);
    if (typeof e.quita_al === 'number') vis *= 1 - ramp(t, e.quita_al, 0.3);
    return {e, i, x, s, vis, top: -(ALTO[e.tipo] ?? 180) * s * 0.92};
  });
  const porId: Record<string, ElemPos> = {};
  elems.forEach((p) => {
    if (p.e.id) porId[p.e.id] = p;
  });

  return (
    <div style={{position: 'absolute', inset: 0, transformOrigin: `${z.x}px ${suelo}px`, scale: `${zm}`}}>
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
        <g transform={`translate(${z.x} ${suelo})`}>
          {/* colina */}
          <g transform={`scale(${pc} ${pc})`}>
            <path
              d={wobPoly(
                [[-z.w * 0.53, 46], [-z.w * 0.47, 6], [-z.w * 0.25, -8], [0, -12], [z.w * 0.25, -8], [z.w * 0.47, 6], [z.w * 0.53, 46]],
                `col${b}`,
                3,
                true,
              )}
              fill={C.green}
              stroke={INK}
              strokeWidth={8}
            />
            <path d={wobLine([-z.w * 0.44, 24], [z.w * 0.44, 24], `colb${b}`, 3, 8)} stroke="#2E8F5B" strokeWidth={6} fill="none" strokeDasharray="30 40" />
          </g>
          {/* cables (detrás de los edificios) */}
          {(d.cables ?? []).map((cb: any, i: number) => {
            const A = porId[cb.de];
            const B = porId[cb.a];
            if (!A || !B) return null;
            const ta = at(cb.al, t0);
            const p = cont && typeof cb.al !== 'number' ? 1 : ramp(t, ta, 0.6);
            const v = Math.min(A.vis, B.vis);
            if (p <= 0 || v <= 0.05) return null;
            const ax = A.x;
            const ay = A.top * Math.min(1, A.vis);
            const bx = lerp(A.x, B.x, p);
            const by = lerp(ay, B.top * Math.min(1, B.vis), p);
            const mx = (ax + bx) / 2;
            const my = Math.max(ay, by) + 40;
            const dpath = `M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`;
            return (
              <g key={i}>
                <path d={dpath} stroke={INK} strokeWidth={6} fill="none" />
                {luzGlobal > 0.5 && p >= 1 && (
                  <path d={dpath} stroke={C.yellow} strokeWidth={6} fill="none" strokeDasharray="10 34" strokeDashoffset={-t * 160} strokeLinecap="round" />
                )}
              </g>
            );
          })}
          {/* edificios */}
          {elems.map((p) => {
            const Pieza = PIEZAS[p.e.tipo];
            if (!Pieza || p.vis <= 0.001) return null;
            const encendida = p.e.encendida === false ? 0 : typeof p.e.luz_al === 'number' ? (t >= p.e.luz_al ? 1 : 0) : 1;
            const calor = typeof p.e.calor_al === 'number' ? ramp(t, p.e.calor_al, 0.6) : 0;
            const resp = 1 + Math.sin(t * 2.6 + p.i * 1.7) * 0.014;
            return (
              <g key={p.i} transform={`translate(${p.x} 0) scale(${p.s * p.vis} ${p.s * p.vis * resp})`}>
                <Pieza t={t} b={b} luz={encendida * luzGlobal} calor={calor} k={`p${p.i}`} color={p.e.color} />
                {calor > 0.01 &&
                  [-90, 0, 90].map((hx, j) => {
                    const q = (t * 0.9 + j * 0.33) % 1;
                    return (
                      <path
                        key={j}
                        d={wobPoly([[hx, -215 - q * 90], [hx + 14, -240 - q * 90], [hx - 8, -265 - q * 90], [hx + 10, -290 - q * 90]], `ca${j}${b}`, 2)}
                        stroke={C.red}
                        strokeWidth={8}
                        fill="none"
                        strokeLinecap="round"
                        opacity={calor * (1 - q)}
                      />
                    );
                  })}
              </g>
            );
          })}
          {/* letrero */}
          {d.cartel && (
            <g transform={`translate(${-z.w * 0.47} 0) scale(${cont ? 1 : pop(t, t0 + 0.2, 0.5)})`}>
              <path d={wobLine([0, 0], [0, -120], `lt${b}`, 1.5)} stroke="#8A5A3B" strokeWidth={14} />
              <path d={wobRect(-95, -170, 190, 62, `lr${b}`, 2.5, 8)} fill="#C98B55" stroke={INK} strokeWidth={7} />
              <text x={0} y={-126} textAnchor="middle" fontFamily={FONT} fontSize={30} fill={C.paper} stroke={INK} strokeWidth={4} paintOrder="stroke">
                {d.cartel}
              </text>
            </g>
          )}
        </g>
      </svg>
      {/* oscuridad del apagón */}
      {apag > 0.01 && (
        <div style={{position: 'absolute', left: z.x - z.w * 0.66, top: suelo - 420, width: z.w * 1.32, height: 520, background: '#1B2140', opacity: apag * 0.45, borderRadius: 60}} />
      )}
      {/* etiquetas de los elementos */}
      {elems.map((p) => {
        if (!p.e.texto || p.vis <= 0.05) return null;
        const tt = at(p.e.texto_al, typeof p.e.al === 'number' ? p.e.al + 0.25 : t0 + 0.3);
        const sc = cont && typeof p.e.texto_al !== 'number' && typeof p.e.al !== 'number' ? 1 : pop(t, tt, 0.4);
        return (
          <Caja key={p.i} x={z.x + p.x} y={suelo + 52} seed={`pt${p.i}`} bg={col(p.e.color_texto, C.yellow)} scale={sc * Math.min(1, p.vis)} rotate={p.i % 2 ? 3 : -3} style={{padding: '4px 18px', fontSize: 34}}>
            {p.e.texto}
          </Caja>
        );
      })}
      {/* medidor de consumo */}
      {d.medidor && <Medidor m={d.medidor} t={t} t0={t0} x={z.x + z.w * 0.47} y={suelo} cont={cont} />}
    </div>
  );
};

const Medidor: React.FC<{m: any; t: number; t0: number; x: number; y: number; cont: boolean}> = ({m, t, t0, x, y, cont}) => {
  const b = useBoil();
  const H = 330;
  const ta = at(m.al, t0 + 0.3);
  const tb = at(m.hasta_al, ta + 1.2);
  const nivel = lerp(at(m.desde, 0.1), at(m.hasta, 0.9), ramp(t, ta, Math.max(0.3, tb - ta), easeInOut));
  const c = nivel < 0.5 ? C.green : nivel < 0.8 ? C.orange : C.red;
  const sc = cont ? 1 : pop(t, t0 + 0.1, 0.5);
  const tiembla = nivel > 0.85 ? Math.sin(t * 50) * 3 : 0;
  return (
    <div style={{position: 'absolute', left: x + tiembla, top: y - H, scale: `${sc}`, transformOrigin: '50% 100%'}}>
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
        <path d={wobRect(-40, 0, 80, H, `me${b}`, 2.5, 30)} fill={C.paper} stroke={INK} strokeWidth={8} />
        <path d={wobRect(-28, H - 12 - (H - 24) * nivel, 56, (H - 24) * nivel, `mf${b}`, 1.5, 20)} fill={c} stroke={INK} strokeWidth={4} />
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1={-40} x2={-20} y1={H - H * f} y2={H - H * f} stroke={INK} strokeWidth={5} />
        ))}
        {/* rayo encima */}
        <path d={wobPoly([[6, -70], [-16, -30], [2, -30], [-10, 6], [20, -40], [2, -40], [12, -70]], `mr${b}`, 1.5, true)} fill={C.yellow} stroke={INK} strokeWidth={5} />
      </svg>
      {m.texto && (
        <Caja x={0} y={H + 50} seed="medt" bg={c} scale={cont ? 1 : pop(t, t0 + 0.3, 0.4)} rotate={-4} style={{padding: '4px 16px', fontSize: 30}}>
          {m.texto}
        </Caja>
      )}
    </div>
  );
};

// ───────────────────────── registro ─────────────────────────
export const MUNDO: Record<string, DefEscena> = {
  pueblo: {
    descripcion: 'Pueblo persistente que crece: casas, máquinas, naves de servidores, refrigeración, centrales y cables con luz; apagón, zoom y medidor de consumo',
    render: Pueblo,
    sfx: (d, t0) => {
      const c: Cue[] = d.continua ? [] : [['whoosh_suave', t0, 0.8], ['boing', t0 + 0.1, 0.5]];
      (d.elementos ?? []).forEach((e: any) => {
        if (typeof e.al !== 'number') return;
        const grande = ['nave', 'nuclear', 'central'].includes(e.tipo);
        c.push([grande ? 'caja' : 'pop', e.al, grande ? 1 : 0.9]);
        if (e.tipo === 'nuclear') c.push(['boom_hondo', e.al + 0.05, 0.7]);
        if (e.tipo === 'refrigeracion') c.push(['agua', e.al + 0.2, 0.7]);
        if (e.tipo === 'nave' || e.tipo === 'maquina') c.push(['engranaje', e.al + 0.3, 0.5]);
        if (typeof e.calor_al === 'number') c.push(['tension', e.calor_al, 0.6]);
      });
      (d.cables ?? []).forEach((cb: any) => {
        if (typeof cb.al === 'number') c.push(['zap', cb.al + 0.5, 0.7]);
      });
      if (typeof d.apagon_al === 'number') c.push(['apagon', d.apagon_al, 1]);
      if (typeof d.vuelve_al === 'number') c.push(['click', d.vuelve_al, 0.9], ['zap', d.vuelve_al + 0.1, 0.7]);
      if (d.zoom && typeof d.zoom.al === 'number') c.push(['whoosh', d.zoom.al, 0.6]);
      if (d.medidor && typeof d.medidor.al === 'number') {
        c.push(['subida', d.medidor.al, 0.6]);
        if (at(d.medidor.hasta, 0.9) > 0.85) c.push(['alerta', at(d.medidor.hasta_al, d.medidor.al + 1.2), 0.6]);
      }
      return c;
    },
  },
};

/** Registro aditivo: añade las escenas de mundo a ESCENAS (se llama desde index.ts). */
export const registrarMundo = () => {
  for (const [k, v] of Object.entries(MUNDO)) if (!ESCENAS[k]) ESCENAS[k] = v;
};
registrarMundo();
