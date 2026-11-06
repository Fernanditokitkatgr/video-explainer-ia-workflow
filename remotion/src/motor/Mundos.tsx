/**
 * MUNDOS TEMÁTICOS (nov-2026): `"mundo": "<id>"` en plano.json cambia TODO lo que rodea al mono y NADA del mono.
 *
 *   hacking    terminal oscuro, verde y rojo, volcado hexadecimal, barrido de escaneo
 *   ia         plano técnico azul, retícula, pistas de circuito, cotas y cajetín de ingeniería
 *   periodico  periódico antiguo: papel, tinta, cabecera gótica y columnas
 *
 * Estilos de dibujo (estos SÍ cambian el mono, siempre con filtros de borde duro sobre el mismo esqueleto):
 *   comic      rotulador grueso, tinta plana y sombra a trama
 *   collage    recortes de papel con borde irregular, sombra dura y animación a saltos (stop-motion)
 *   pegatina   colores saturados y troquel blanco grueso
 *
 * Cada mundo define: fondo, cortinilla, tema de cajas y títulos (tema.ts), estilo de iconos (duotono SVG sobre
 * los mismos dibujos de Iconos.tsx), contorno del reparto y sonido (ambiente en bucle + equivalencias de efectos).
 *
 * En los tres mundos el mono se pinta igual, píxel a píxel. En los oscuros su línea negra se perdería, así que el
 * reparto lleva un contorno recortado (dilatación del alfa, sin desenfoque). Nada de glow ni blur.
 *
 * Escenas propias (se registran solas en ESCENAS; solo pintan bien dentro de un mundo):
 *   m_rotulo  {texto, kicker, al, tam, color, zona: {x, y, w}}          rótulo principal; "\n" parte líneas
 *   m_paso    {n, titulo, detalle, icono, al, y, color}                  ficha numerada del paso
 *   m_visual  {icono, al, y, tam, etiqueta, alerta_al}                   icono protagonista con su instrumento
 * Sin `"mundo"` en el plano no se ejecuta nada de este archivo salvo el registro de esas tres escenas.
 */
import React from 'react';
import {Freeze, random, useCurrentFrame, useVideoConfig} from 'remotion';
import {col, decay, FONT, lerp, pop, ramp} from './base';
import type {Cue, DefEscena, EscenaProps} from './Escenas';
import {ESCENAS} from './Escenas';
import {Icono} from './Iconos';
import type {CapaPintada} from './Reparto';
import {TemaCtx, TemaPiezas} from './tema';

type Tramo = {t0: number; t1: number};
type FondoProps = {t: number; W: number; H: number; tramos: Tramo[]};

export type DefMundo = {
  id: 'hacking' | 'ia' | 'periodico' | 'comic' | 'collage' | 'pegatina';
  tema: TemaPiezas;
  /** color principal, de alerta, de texto y de relleno de los paneles */
  acento: string;
  alerta: string;
  texto: string;
  panel: string;
  /** anchura media de letra de los títulos, en em (para encajar las fichas) */
  anchoLetra: number;
  /** contorno recortado del reparto (px), solo en fondos oscuros */
  contorno?: {color: string; px: number};
  /** duotono de los iconos: tinta y papel del dibujo original pasan a estos dos colores */
  icono?: {tinta: string; papel: string};
  /** filtro de dibujo del reparto (y de los iconos): cambia el aspecto del mono */
  estilo?: 'comic' | 'collage' | 'pegatina';
  /** animación a saltos: un dibujo cada `paso` fotogramas (stop-motion) */
  paso?: number;
  ambiente: {sfx: string; vol: number}[];
  sonidos: Record<string, string>;
  Fondo: React.FC<FondoProps>;
};

// ───────────────────────── utilidades ─────────────────────────
/** Inicio del último tramo empezado: la cortinilla de cada mundo se dispara con él. */
const ultimoCorte = (tramos: Tramo[], t: number) => {
  let s = -10;
  for (const tr of tramos) if (tr.t0 > 0 && tr.t0 <= t) s = tr.t0;
  return s;
};
const hex = (s: string, n: number) => {
  let o = '';
  for (let i = 0; i < n; i++) o += (i % 3 === 2 ? ' ' : '') + '0123456789ABCDEF'[Math.floor(random(`${s}${i}`) * 16)];
  return o;
};
const hexRGB = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);

// ───────────────────────── HACKING ─────────────────────────
const CONSOLA = 'Consolas, "Cascadia Mono", monospace';
const RECORTE = '"Rockwell Nova", Rockwell, Georgia, serif';
const FondoHacking: React.FC<FondoProps> = ({t, W, H, tramos}) => {
  const fila = 46;
  const paso = Math.floor((t * 90) / fila);
  const desliz = (t * 90) % fila;
  const filas = Math.ceil(H / fila) + 2;
  const yScan = ((t * 520) % (H + 260)) - 130;
  const corte = ultimoCorte(tramos, t);
  const dt = t - corte;
  const reloj = `00:00:${String(Math.floor(t)).padStart(2, '0')}.${String(Math.floor((t % 1) * 100)).padStart(2, '0')}`;
  const suelo = H * 0.93;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#04090A', overflow: 'hidden', fontFamily: CONSOLA}}>
      <div style={{position: 'absolute', left: 28, top: -desliz, fontSize: 30, lineHeight: `${fila}px`, color: '#123A29', whiteSpace: 'pre', fontWeight: 700}}>
        {Array.from({length: filas}, (_, i) => {
          const n = i + paso;
          return <div key={n}>{`${(n * 16).toString(16).toUpperCase().padStart(6, '0')}  ${hex(`f${n}`, 28)}`}</div>;
        })}
      </div>
      {/* barrido de escaneo: borde duro, sin desenfoque */}
      <div style={{position: 'absolute', left: 0, top: yScan, width: W, height: 110, background: 'rgba(53,255,136,0.07)', borderBottom: '4px solid #35FF88'}} />
      {/* barra de estado */}
      <div style={{position: 'absolute', left: 0, top: 0, width: W, height: 74, background: '#0A1712', borderBottom: '4px solid #35FF88', color: '#35FF88', fontSize: 36, fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 34px', boxSizing: 'border-box'}}>
        <span>root@tecnomono:~#</span>
        <span style={{color: Math.floor(t * 2) % 2 ? '#FF3B4E' : '#7A2230'}}>● REC {reloj}</span>
      </div>
      {/* suelo */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <rect x={0} y={suelo} width={W} height={H - suelo} fill="#07140F" />
        <line x1={0} y1={suelo} x2={W} y2={suelo} stroke="#35FF88" strokeWidth={5} />
        {Array.from({length: 13}, (_, i) => {
          const x0 = lerp(-400, W + 400, i / 12);
          return <line key={i} x1={lerp(W / 2, x0, 0.42)} y1={suelo} x2={x0} y2={H} stroke="#1B6B47" strokeWidth={3} />;
        })}
      </svg>
      {/* cortinilla: bloques que se rompen */}
      {dt >= 0 && dt < 0.2 &&
        Array.from({length: 7}, (_, i) => (
          <div key={i} style={{position: 'absolute', left: random(`gx${corte}${i}`) * W * 0.5, top: random(`gy${corte}${i}${Math.floor(dt * 30)}`) * H, width: W * (0.3 + random(`gw${corte}${i}`) * 0.6), height: 18 + random(`gh${corte}${i}`) * 70, background: i % 3 ? '#35FF88' : '#FF3B4E'}} />
        ))}
    </div>
  );
};

// ───────────────────────── IA (plano técnico) ─────────────────────────
const INGENIERIA = 'Bahnschrift, "DIN Alternate", sans-serif';
const PISTAS: [number, number][][] = [
  [[0, 170], [150, 170], [210, 230], [420, 230], [480, 170], [1080, 170]],
  [[0, 1210], [120, 1210], [190, 1140], [190, 980], [90, 880], [0, 880]],
  [[1080, 1050], [930, 1050], [860, 1120], [860, 1290], [950, 1380], [1080, 1380]],
  [[0, 1600], [230, 1600], [300, 1530], [640, 1530], [710, 1600], [1080, 1600]],
  [[300, 0], [300, 90], [360, 150]],
  [[780, 0], [780, 110], [720, 170]],
];
const FondoIA: React.FC<FondoProps> = ({t, W, H, tramos}) => {
  const azul = '#0C3F9E';
  const suelo = H * 0.93;
  const corte = ultimoCorte(tramos, t);
  const p = ramp(t, corte, 0.5);
  return (
    <div style={{position: 'absolute', inset: 0, background: azul, overflow: 'hidden'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="m-reticula" width={200} height={200} patternUnits="userSpaceOnUse">
            <path d="M40 0V200M80 0V200M120 0V200M160 0V200M0 40H200M0 80H200M0 120H200M0 160H200" stroke="#3E6CC2" strokeWidth={2} fill="none" />
            <path d="M200 0V200M0 200H200" stroke="#7DA3E8" strokeWidth={3} fill="none" />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#m-reticula)" />
        {PISTAS.map((ps, i) => {
          const d = ps.map((q, j) => `${j ? 'L' : 'M'}${q[0]} ${q[1]}`).join(' ');
          const f = ps[ps.length - 1];
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="#BFD6FF" strokeWidth={5} strokeLinejoin="round" />
              <path d={d} fill="none" stroke="#FFD23F" strokeWidth={7} strokeDasharray="46 900" strokeDashoffset={-(t * 330 + i * 170)} strokeLinecap="round" />
              <circle cx={f[0]} cy={f[1]} r={11} fill={azul} stroke="#FFFFFF" strokeWidth={5} />
            </g>
          );
        })}
        {/* cotas de los bordes */}
        <line x1={46} y1={110} x2={46} y2={suelo - 30} stroke="#FFFFFF" strokeWidth={3} />
        {Array.from({length: 17}, (_, i) => (
          <line key={i} x1={i % 4 ? 38 : 26} x2={54} y1={110 + i * ((suelo - 140) / 16)} y2={110 + i * ((suelo - 140) / 16)} stroke="#FFFFFF" strokeWidth={3} />
        ))}
        <line x1={0} y1={suelo} x2={W} y2={suelo} stroke="#FFFFFF" strokeWidth={5} strokeDasharray="34 12 6 12" />
        {/* cortinilla: línea de trazado */}
        {p < 1 && <line x1={0} y1={p * H} x2={W} y2={p * H} stroke="#FFD23F" strokeWidth={8} />}
      </svg>
      {/* cajetín */}
      <div style={{position: 'absolute', right: 28, bottom: 26, width: 460, border: '4px solid #FFFFFF', color: '#FFFFFF', fontFamily: INGENIERIA, fontSize: 25, fontWeight: 700, background: azul, display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        <div style={{gridColumn: '1 / 3', padding: '6px 12px', borderBottom: '3px solid #FFFFFF', letterSpacing: 2}}>TECNOMONO · PLANO Nº 07</div>
        <div style={{padding: '6px 12px', borderRight: '3px solid #FFFFFF'}}>ESCALA 1:1</div>
        <div style={{padding: '6px 12px'}}>REV. B</div>
      </div>
    </div>
  );
};

// ───────────────────────── PERIÓDICO ─────────────────────────
const SERIF = '"Georgia Pro Black", "Georgia Pro", Georgia, serif';
const GOTICA = '"Old English Text MT", "Georgia Pro", serif';
const TINTA = '#1C1712';
const PAPEL = '#EFE3C8';
const FALSO =
  'Las acciones volvieron a subir ayer y los corredores de la plaza no dan abasto con tantos encargos de clientes recién llegados, que confían sus ahorros a quien promete doblarlos antes del invierno y exigen ver el recibo a la salida de la oficina ';
const FondoPeriodico: React.FC<FondoProps> = ({t, W, H, tramos}) => {
  const suelo = H * 0.93;
  const corte = ultimoCorte(tramos, t);
  const p = ramp(t, corte, 0.42);
  return (
    <div style={{position: 'absolute', inset: 0, background: PAPEL, overflow: 'hidden'}}>
      {/* columnas de texto, en tinta muy diluida */}
      <div style={{position: 'absolute', left: 30, right: 30, top: 300, height: suelo - 300, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 22, overflow: 'hidden'}}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{fontFamily: 'Georgia, serif', fontSize: 22, lineHeight: '30px', color: '#CDBE9D', textAlign: 'justify', borderRight: i < 3 ? '2px solid #CDBE9D' : undefined, paddingRight: 12, overflow: 'hidden'}}>
            {FALSO.slice(i * 37).concat(FALSO.repeat(9))}
          </div>
        ))}
      </div>
      {/* cabecera */}
      <div style={{position: 'absolute', left: 30, right: 30, top: 34, textAlign: 'center', color: TINTA}}>
        <div style={{fontFamily: GOTICA, fontSize: 112, lineHeight: 1.1}}>El Diario Tecnomono</div>
        <div style={{marginTop: 8, borderTop: `6px solid ${TINTA}`, borderBottom: `2px solid ${TINTA}`, padding: '7px 8px', display: 'flex', justifyContent: 'space-between', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 28}}>
          <span>AÑO XXXI</span>
          <span>EDICIÓN DE LA TARDE</span>
          <span>10 CÉNTIMOS</span>
        </div>
      </div>
      {/* suelo: filete doble */}
      <div style={{position: 'absolute', left: 0, top: suelo, width: W, height: H - suelo, background: PAPEL, borderTop: `9px double ${TINTA}`, boxSizing: 'border-box'}} />
      {/* cortinilla: la plancha entintada pasa por la hoja */}
      {p < 1 && <div style={{position: 'absolute', left: p * (W + 180) - 180, top: 0, width: 180, height: H, background: TINTA}} />}
    </div>
  );
};

// ───────────────────────── ESTILOS DE DIBUJO: cómic, collage, pegatina ─────────────────────────
const COMIC = 'Impact, "Arial Black", sans-serif';
const FondoComic: React.FC<FondoProps> = ({t, W, H, tramos}) => {
  const COLORES = ['#FFD400', '#FF3B30', '#17A5E6', '#FFD400', '#FF3B30'];
  let i = 0;
  tramos.forEach((tr, k) => {
    if (tr.t0 <= t) i = k;
  });
  const c = COLORES[i % COLORES.length];
  const cx = W / 2;
  const cy = H * 0.5;
  const R = 2400;
  return (
    <div style={{position: 'absolute', inset: 0, background: c, overflow: 'hidden'}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        <defs>
          <pattern id="m-benday" width={26} height={26} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <circle cx={13} cy={13} r={7} fill="#111111" opacity={0.22} />
          </pattern>
        </defs>
        <rect width={W} height={H} fill="url(#m-benday)" />
        {Array.from({length: 16}, (_, k) => {
          const a0 = (k / 16) * Math.PI * 2 + i * 0.2;
          const a1 = a0 + Math.PI / 32;
          return <path key={k} d={`M${cx} ${cy} L${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} L${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R} Z`} fill="#FFFFFF" />;
        })}
        <rect x={0} y={H * 0.93} width={W} height={H * 0.07} fill="#111111" />
        <rect x={12} y={12} width={W - 24} height={H - 24} fill="none" stroke="#111111" strokeWidth={14} />
      </svg>
    </div>
  );
};

const RECORTES: {x: number; y: number; w: number; h: number; c: string; r: number}[] = [
  {x: -60, y: 90, w: 620, h: 300, c: '#E9DFC7', r: -5},
  {x: 640, y: -40, w: 560, h: 340, c: '#2E6F73', r: 7},
  {x: 720, y: 1040, w: 520, h: 420, c: '#D9472B', r: -8},
  {x: -90, y: 1180, w: 560, h: 380, c: '#F2B632', r: 6},
  {x: 280, y: 640, w: 620, h: 300, c: '#EFEAD8', r: 3},
];
const FondoCollage: React.FC<FondoProps> = ({W, H}) => {
  const suelo = H * 0.93;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#B98F5E', overflow: 'hidden'}}>
      {/* cartón: líneas de la onda, nítidas */}
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: Math.ceil(W / 18)}, (_, k) => (
          <line key={k} x1={k * 18} y1={0} x2={k * 18} y2={H} stroke="#A67C4D" strokeWidth={4} />
        ))}
      </svg>
      {RECORTES.map((r, k) => (
        <div key={k} style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, background: r.c, rotate: `${r.r}deg`, boxShadow: '7px 9px 0 rgba(40,25,10,0.45)', clipPath: undefined}} />
      ))}
      <div style={{position: 'absolute', left: -30, top: suelo, width: W + 60, height: 260, background: '#3C3A46', rotate: '-0.8deg', boxShadow: '0 -7px 0 rgba(40,25,10,0.45)'}} />
    </div>
  );
};

const PEGATINAS: {x: number; y: number; r: number; c: string; f: 'estrella' | 'circulo' | 'rayo'}[] = [
  {x: 120, y: 1120, r: 62, c: '#FFE500', f: 'estrella'},
  {x: 950, y: 1150, r: 54, c: '#00E5C7', f: 'circulo'},
  {x: 90, y: 90, r: 48, c: '#00E5C7', f: 'rayo'},
  {x: 990, y: 90, r: 58, c: '#FFE500', f: 'estrella'},
];
const FondoPegatina: React.FC<FondoProps> = ({t, W, H, tramos}) => {
  const corte = ultimoCorte(tramos, t);
  const golpe = decay(t, corte, 8);
  const suelo = H * 0.93;
  return (
    <div style={{position: 'absolute', inset: 0, background: '#7A1FFF', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: suelo, width: W, height: H - suelo, background: '#FF1F8F'}} />
      <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
        {PEGATINAS.map((p, k) => {
          const rr = p.r * (1 + 0.25 * golpe);
          const forma =
            p.f === 'circulo' ? (
              <circle r={rr} />
            ) : p.f === 'estrella' ? (
              <path d={Array.from({length: 10}, (_, j) => `${j ? 'L' : 'M'}${Math.cos((j / 10) * Math.PI * 2 - Math.PI / 2) * (j % 2 ? rr * 0.48 : rr)} ${Math.sin((j / 10) * Math.PI * 2 - Math.PI / 2) * (j % 2 ? rr * 0.48 : rr)}`).join(' ') + 'Z'} />
            ) : (
              <path d={`M${rr * 0.2} ${-rr} L${-rr * 0.6} ${rr * 0.15} L${-rr * 0.05} ${rr * 0.15} L${-rr * 0.25} ${rr} L${rr * 0.6} ${-rr * 0.2} L${rr * 0.05} ${-rr * 0.2} Z`} />
            );
          return (
            <g key={k} transform={`translate(${p.x} ${p.y}) rotate(${k * 17 - 20 + Math.sin(t * 2 + k) * 6})`}>
              <g transform="translate(7 9)" fill="rgba(0,0,0,0.35)" stroke="rgba(0,0,0,0.35)" strokeWidth={18} strokeLinejoin="round">{forma}</g>
              <g fill={p.c} stroke="#FFFFFF" strokeWidth={18} strokeLinejoin="round" paintOrder="stroke">{forma}</g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ───────────────────────── catálogo ─────────────────────────
export const MUNDOS: Record<string, DefMundo> = {
  hacking: {
    id: 'hacking',
    tema: {fuente: CONSOLA, fuenteTitulo: CONSOLA, linea: '#35FF88', cajaFondo: '#07140F', cajaTexto: '#D8FFE8', radio: 6, sombra: 'none', contornoTitulo: '#04090A', quieto: true},
    acento: '#35FF88',
    alerta: '#FF3B4E',
    texto: '#D8FFE8',
    panel: '#07140F',
    anchoLetra: 0.56,
    contorno: {color: '#FFFFFF', px: 6},
    icono: {tinta: '#35FF88', papel: '#07140F'},
    ambiente: [{sfx: 'teclas', vol: 0.2}, {sfx: 'tension', vol: 0.2}],
    sonidos: {whoosh: 'glitch', swoosh: 'glitch', pop2: 'click', pop: 'click', boing: 'click', subida: 'tension'},
    Fondo: FondoHacking,
  },
  ia: {
    id: 'ia',
    tema: {fuente: INGENIERIA, fuenteTitulo: INGENIERIA, linea: '#FFFFFF', cajaFondo: '#0C3F9E', cajaTexto: '#FFFFFF', radio: 0, sombra: 'none', contornoTitulo: '#0C3F9E', quieto: true},
    acento: '#FFFFFF',
    alerta: '#FFD23F',
    texto: '#FFFFFF',
    panel: '#0C3F9E',
    anchoLetra: 0.58,
    contorno: {color: '#FFFFFF', px: 6},
    icono: {tinta: '#FFFFFF', papel: '#0C3F9E'},
    ambiente: [{sfx: 'engranaje', vol: 0.22}],
    sonidos: {whoosh: 'zap', swoosh: 'whoosh_suave', pop2: 'tick', pop: 'tick', boing: 'tick', teclas: 'click'},
    Fondo: FondoIA,
  },
  periodico: {
    id: 'periodico',
    tema: {fuente: SERIF, fuenteTitulo: SERIF, linea: TINTA, cajaFondo: PAPEL, cajaTexto: TINTA, radio: 0, sombra: `7px 7px 0 ${TINTA}`, contornoTitulo: PAPEL, quieto: true},
    acento: TINTA,
    alerta: '#B3201C',
    texto: TINTA,
    panel: PAPEL,
    anchoLetra: 0.72,
    icono: {tinta: TINTA, papel: PAPEL},
    ambiente: [{sfx: 'reloj', vol: 0.32}],
    sonidos: {whoosh: 'pagina', swoosh: 'pagina', pop2: 'rotulador', pop: 'rotulador', boing: 'pagina', subida: 'tension'},
    Fondo: FondoPeriodico,
  },
  comic: {
    id: 'comic',
    tema: {fuente: COMIC, fuenteTitulo: COMIC, linea: '#111111', cajaFondo: '#FFFFFF', cajaTexto: '#111111', radio: 0, sombra: '7px 8px 0 #111111', contornoTitulo: '#111111', quieto: true},
    acento: '#111111',
    alerta: '#E0001B',
    texto: '#111111',
    panel: '#FFFFFF',
    anchoLetra: 0.54,
    estilo: 'comic',
    ambiente: [{sfx: 'tension', vol: 0.16}],
    sonidos: {whoosh: 'caida', swoosh: 'caida', pop2: 'pop', boing: 'boing'},
    Fondo: FondoComic,
  },
  collage: {
    id: 'collage',
    tema: {fuente: RECORTE, fuenteTitulo: RECORTE, linea: '#23202B', cajaFondo: '#F6F1E3', cajaTexto: '#23202B', radio: 0, sombra: '6px 7px 0 rgba(40,25,10,0.5)', contornoTitulo: '#F6F1E3', quieto: false},
    acento: '#23202B',
    alerta: '#C7321A',
    texto: '#23202B',
    panel: '#F6F1E3',
    anchoLetra: 0.8,
    estilo: 'collage',
    paso: 4,
    ambiente: [{sfx: 'reloj', vol: 0.18}],
    sonidos: {whoosh: 'pagina', swoosh: 'pagina', pop2: 'pagina', pop: 'click', boing: 'click', teclas: 'pagina'},
    Fondo: FondoCollage,
  },
  pegatina: {
    id: 'pegatina',
    tema: {fuente: FONT, fuenteTitulo: FONT, linea: '#FFFFFF', cajaFondo: '#FFE500', cajaTexto: '#111111', radio: 30, sombra: '8px 10px 0 rgba(0,0,0,0.35)', contornoTitulo: '#111111', quieto: true},
    acento: '#FF1F8F',
    alerta: '#FF1F3D',
    texto: '#111111',
    panel: '#FFE500',
    anchoLetra: 0.74,
    estilo: 'pegatina',
    ambiente: [{sfx: 'tension', vol: 0.12}],
    sonidos: {whoosh: 'whoosh_suave', swoosh: 'whoosh_suave', pop2: 'pop'},
    Fondo: FondoPegatina,
  },
};

const MundoCtx = React.createContext<DefMundo | null>(null);
const useMundo = () => React.useContext(MundoCtx) ?? MUNDOS.hacking;

// tinta y papel de la trama del cómic: un punto negro en una baldosa de 15 px
const TRAMA = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"><circle cx="7.5" cy="7.5" r="4.6" fill="#111"/></svg>')}`;

/** gris → tinta (oscuro) a papel (claro), con un tono medio para que los rellenos conserven peso */
const FiltroIcono: React.FC<{tinta: string; papel: string}> = ({tinta, papel}) => {
  const a = hexRGB(tinta);
  const b = hexRGB(papel);
  const tabla = (i: number) => `${a[i]} ${lerp(a[i], b[i], 0.6)} ${b[i]}`;
  return (
    <filter id="mundo-icono" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
      <feColorMatrix type="matrix" values="0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0.3 0.59 0.11 0 0  0 0 0 1 0" />
      <feComponentTransfer>
        <feFuncR type="table" tableValues={tabla(0)} />
        <feFuncG type="table" tableValues={tabla(1)} />
        <feFuncB type="table" tableValues={tabla(2)} />
      </feComponentTransfer>
    </filter>
  );
};

/** Filtros SVG del mundo: duotono de iconos y dibujo del reparto. Ninguno desenfoca: todo son bordes duros. */
const Filtros: React.FC<{m: DefMundo}> = ({m}) => {
  const frame = useCurrentFrame();
  const semilla = 1 + (Math.floor(frame / 8) % 6); // el recorte cambia de borde a saltos, como en stop-motion
  // tinta: alfa alto solo donde el dibujo es casi negro (las líneas del mono)
  const tinta = (
    <>
      <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.07  0 0 0 0 0.07  0 0 0 0 0.07  -2.4 -2.4 -2.4 0 1.6" />
      <feComposite in2="SourceAlpha" operator="in" result="linea" />
    </>
  );
  // silueta sin lo semitransparente: la sombrita de los pies no debe llevar borde
  const duro = (
    <feComponentTransfer in="SourceAlpha" result="duro">
      <feFuncA type="table" tableValues="0 0 1 1" />
    </feComponentTransfer>
  );
  return (
    <svg width={0} height={0} style={{position: 'absolute'}}>
      <defs>
        {m.icono && <FiltroIcono tinta={m.icono.tinta} papel={m.icono.papel} />}
        {m.contorno && (
          <filter id="mundo-reparto" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            {duro}
            <feMorphology in="duro" operator="dilate" radius={m.contorno.px} result="grueso" />
            <feFlood floodColor={m.contorno.color} />
            <feComposite in2="grueso" operator="in" result="borde" />
            <feMerge>
              <feMergeNode in="borde" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
        {m.estilo === 'comic' && (
          <filter id="mundo-reparto" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            {/* tinta plana: color saturado y en pocos niveles */}
            <feColorMatrix in="SourceGraphic" type="saturate" values="1.5" />
            <feComponentTransfer result="plano">
              <feFuncR type="discrete" tableValues="0.08 0.45 0.72 0.92 1" />
              <feFuncG type="discrete" tableValues="0.08 0.4 0.68 0.88 1" />
              <feFuncB type="discrete" tableValues="0.08 0.32 0.6 0.85 1" />
            </feComponentTransfer>
            {/* sombra a trama: media luna abajo a la derecha rellena de puntos */}
            {duro}
            <feOffset in="duro" dx={-38} dy={-30} result="movido" />
            <feComposite in="duro" in2="movido" operator="out" result="luna" />
            <feImage href={TRAMA} x={0} y={0} width={15} height={15} />
            <feTile />
            <feComposite in2="luna" operator="in" result="trama" />
            {/* rotulador grueso: las líneas negras engordan */}
            {tinta}
            <feMorphology in="linea" operator="dilate" radius={2} result="gorda" />
            <feMerge>
              <feMergeNode in="plano" />
              <feMergeNode in="trama" />
              <feMergeNode in="gorda" />
            </feMerge>
          </filter>
        )}
        {m.estilo === 'collage' && (
          <filter id="mundo-reparto" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            {duro}
            <feMorphology in="duro" operator="dilate" radius={8} result="grueso" />
            <feTurbulence type="fractalNoise" baseFrequency={0.04} numOctaves={2} seed={semilla} result="ruido" />
            <feDisplacementMap in="grueso" in2="ruido" scale={15} xChannelSelector="R" yChannelSelector="G" result="corte" />
            <feFlood floodColor="#F6F1E3" />
            <feComposite in2="corte" operator="in" result="papel" />
            <feOffset in="corte" dx={8} dy={10} result="movido" />
            <feFlood floodColor="#2A1A0A" floodOpacity={0.5} />
            <feComposite in2="movido" operator="in" result="sombra" />
            {tinta}
            <feMorphology in="linea" operator="dilate" radius={2} result="tira" />
            <feFlood floodColor="#23202B" />
            <feComposite in2="tira" operator="in" result="tirita" />
            <feMerge>
              <feMergeNode in="sombra" />
              <feMergeNode in="papel" />
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="tirita" />
            </feMerge>
          </filter>
        )}
        {m.estilo === 'pegatina' && (
          <filter id="mundo-reparto" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
            <feColorMatrix in="SourceGraphic" type="saturate" values="1.8" result="vivo" />
            {duro}
            <feMorphology in="duro" operator="dilate" radius={12} result="grueso" />
            <feFlood floodColor="#FFFFFF" />
            <feComposite in2="grueso" operator="in" result="blanco" />
            <feOffset in="grueso" dx={9} dy={12} result="movido" />
            <feFlood floodColor="#000000" floodOpacity={0.35} />
            <feComposite in2="movido" operator="in" result="sombra" />
            <feMerge>
              <feMergeNode in="sombra" />
              <feMergeNode in="blanco" />
              <feMergeNode in="vivo" />
            </feMerge>
          </filter>
        )}
      </defs>
    </svg>
  );
};

/** Provee el mundo a todo lo que hay dentro. Con mundo desconocido o ausente no añade ni un nodo. */
export const ProveedorMundo: React.FC<{mundo?: string; children: React.ReactNode}> = ({mundo, children}) => {
  const m = mundo ? MUNDOS[mundo] : undefined;
  if (!m) return <>{children}</>;
  return (
    <MundoCtx.Provider value={m}>
      <TemaCtx.Provider value={m.tema}>
        <Filtros m={m} />
        {children}
      </TemaCtx.Provider>
    </MundoCtx.Provider>
  );
};

/** Con mundo a saltos, el segundo que ve todo lo dibujado (t) se congela `paso` fotogramas. */
export const fotogramaMundo = (mundo: string | undefined, frame: number) => {
  const paso = mundo ? MUNDOS[mundo]?.paso : undefined;
  return paso ? Math.floor(frame / paso) * paso : frame;
};

/** El reparto. Con filtro de dibujo, este solo toca a los monos: los bocadillos van encima, limpios y legibles. */
export const CapaReparto: React.FC<{mundo?: string; pinta: (capa?: CapaPintada) => React.ReactNode}> = ({mundo, pinta}) => {
  const frame = useCurrentFrame();
  const m = mundo ? MUNDOS[mundo] : undefined;
  if (!m || !(m.contorno || m.estilo)) return <>{pinta()}</>;
  const capas = (
    <>
      <div style={{position: 'absolute', inset: 0, filter: 'url(#mundo-reparto)'}}>{pinta('monos')}</div>
      {pinta('bocadillos')}
    </>
  );
  return m.paso ? <Freeze frame={fotogramaMundo(mundo, frame)}>{capas}</Freeze> : capas;
};

// ───────────────────────── escenas ─────────────────────────
const at = (v: any, def: number) => (typeof v === 'number' ? v : def);
const IconoM: React.FC<{nombre: string; tam: number}> = ({nombre, tam}) => {
  const m = useMundo();
  return (
    <div style={{width: tam, height: tam, filter: m.icono ? 'url(#mundo-icono)' : undefined}}>
      <Icono nombre={nombre} tam={tam} />
    </div>
  );
};

const Rotulo: React.FC<EscenaProps> = ({d, t, t0}) => {
  const m = useMundo();
  const {width: W} = useVideoConfig();
  const al = at(d.al, t0);
  const lineas: string[] = String(d.texto ?? '').split('\n');
  const total = lineas.reduce((a, l) => a + l.length, 0);
  const x = d.zona?.x ?? W / 2;
  const y = d.zona?.y ?? 420;
  const w = d.zona?.w ?? 980;
  const tam = d.tam ?? 118;
  const color = d.color ? (d.color === 'alerta' ? m.alerta : col(d.color)) : m.id === 'hacking' ? m.acento : m.texto;
  // tecleado solo en la consola; en los otros mundos el rótulo entra de golpe (y en el fotograma 0 ya está)
  const dur = Math.min(0.9, total * 0.035);
  const vis = m.id === 'hacking' && al >= 0 ? Math.floor(ramp(t, al, dur, (v) => v) * total + 0.001) : total;
  let quedan = vis;
  const filas = lineas.map((l) => {
    const s = l.slice(0, Math.max(0, quedan));
    quedan -= l.length;
    return s;
  });
  const p = m.id === 'hacking' || al < 0 ? 1 : pop(t, al, 0.35);
  const cuerpo = (
    <div style={{fontFamily: m.tema.fuenteTitulo, fontWeight: 900, fontSize: tam, lineHeight: 1.08, color, textAlign: m.id === 'hacking' ? 'left' : 'center', whiteSpace: 'pre', minHeight: lineas.length * tam * 1.08}}>
      {(m.id === 'hacking' ? filas : lineas).map((l, i) => (
        <div key={i}>
          {l}
          {m.id === 'hacking' && (i === filas.length - 1 || filas[i + 1] === '') && l.length > 0 && Math.floor(t * 4) % 2 === 0 && <span style={{color: m.acento}}>█</span>}
        </div>
      ))}
    </div>
  );
  const base: React.CSSProperties = {position: 'absolute', left: x, top: y, width: w, translate: '-50% -50%', scale: `${p}`, boxSizing: 'border-box'};
  if (m.id === 'hacking')
    return (
      <div style={{...base, background: m.panel, border: `5px solid ${m.acento}`}}>
        <div style={{display: 'flex', gap: 14, alignItems: 'center', padding: '10px 18px', borderBottom: `5px solid ${m.acento}`, fontFamily: CONSOLA, fontSize: 32, fontWeight: 700, color: m.acento}}>
          <span style={{width: 24, height: 24, background: m.alerta}} />
          <span style={{width: 24, height: 24, background: m.acento}} />
          <span>{d.barra ?? 'bash'}</span>
        </div>
        <div style={{padding: '18px 26px 26px'}}>
          {d.kicker && <div style={{fontFamily: CONSOLA, fontWeight: 700, fontSize: 40, color: m.texto, marginBottom: 14}}>$ {d.kicker}</div>}
          {cuerpo}
        </div>
      </div>
    );
  if (m.id === 'comic')
    return (
      <div style={{...base, background: m.panel, border: '10px solid #111111', boxShadow: '12px 14px 0 #111111', rotate: '-1.5deg', padding: '12px 22px 22px'}}>
        {d.kicker && <div style={{display: 'inline-block', background: '#FFD400', border: '6px solid #111111', fontFamily: COMIC, fontSize: 44, padding: '2px 16px', color: '#111111', marginBottom: 10}}>{String(d.kicker).toUpperCase()}</div>}
        <div style={{transform: 'skewX(-6deg)'}}>{cuerpo}</div>
      </div>
    );
  if (m.id === 'collage') {
    const papeles = ['#F6F1E3', '#F2B632', '#D9472B', '#2E6F73', '#23202B', '#FFFFFF'];
    const tintas = ['#23202B', '#23202B', '#FFFFFF', '#FFFFFF', '#F6F1E3', '#C7321A'];
    const fuentes = [RECORTE, '"Georgia Pro Black", Georgia, serif', 'Impact, sans-serif', 'Consolas, monospace'];
    return (
      <div style={{...base, textAlign: 'center'}}>
        {d.kicker && (
          <div style={{display: 'inline-block', background: '#23202B', color: '#F6F1E3', fontFamily: RECORTE, fontWeight: 800, fontSize: 40, padding: '4px 18px', rotate: '-2deg', marginBottom: 14, boxShadow: m.tema.sombra}}>{d.kicker}</div>
        )}
        {lineas.map((l, i) => (
          <div key={i} style={{display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', marginBottom: 8}}>
            {l.split('').map((ch, j) => {
              if (ch === ' ') return <span key={j} style={{width: tam * 0.3}} />;
              const k = Math.floor(random(`rl${l}${j}`) * papeles.length);
              return (
                <span key={j} style={{background: papeles[k], color: tintas[k], fontFamily: fuentes[Math.floor(random(`rf${l}${j}`) * fuentes.length)], fontWeight: 900, fontSize: tam * 0.86, lineHeight: 1.12, padding: '0 9px', margin: '0 2px', rotate: `${(random(`rr${l}${j}`) - 0.5) * 11}deg`, translate: `0 ${(random(`ry${l}${j}`) - 0.5) * 10}px`, boxShadow: m.tema.sombra}}>
                  {ch}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
  if (m.id === 'pegatina')
    return (
      <div style={{...base, background: m.panel, border: '14px solid #FFFFFF', borderRadius: 44, boxShadow: m.tema.sombra, rotate: '-2deg', padding: '16px 22px 22px'}}>
        {d.kicker && <div style={{fontFamily: FONT, fontSize: 38, color: '#7A1FFF', textAlign: 'center', marginBottom: 8}}>{d.kicker}</div>}
        {cuerpo}
      </div>
    );
  if (m.id === 'ia')
    return (
      <div style={{...base, background: m.panel, border: `5px solid ${m.acento}`, padding: '20px 26px 26px'}}>
        {d.kicker && <div style={{fontFamily: INGENIERIA, fontWeight: 700, fontSize: 40, letterSpacing: 4, color: m.alerta, marginBottom: 12, textAlign: 'center'}}>{d.kicker}</div>}
        {cuerpo}
        {/* cota de anchura */}
        <svg width={w - 62} height={34} style={{display: 'block', marginTop: 14}}>
          <path d={`M4 4V30M${w - 66} 4V30M4 17H${w - 66}`} stroke={m.acento} strokeWidth={4} fill="none" />
        </svg>
      </div>
    );
  return (
    <div style={{...base, background: m.panel, borderTop: `9px double ${m.acento}`, borderBottom: `9px double ${m.acento}`, padding: '14px 12px 18px'}}>
      {d.kicker && <div style={{fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 40, letterSpacing: 7, color: m.texto, marginBottom: 10, textAlign: 'center'}}>{d.kicker}</div>}
      {cuerpo}
    </div>
  );
};

const Paso: React.FC<EscenaProps> = ({d, t, t0}) => {
  const m = useMundo();
  const {width: W} = useVideoConfig();
  const al = at(d.al, t0);
  const p = pop(t, al, 0.35);
  if (p <= 0.01) return null;
  const y = d.y ?? 700;
  const c = d.color === 'alerta' ? m.alerta : m.acento;
  const dentro: React.CSSProperties =
    m.id === 'periodico'
      ? {borderTop: `3px solid ${m.acento}`, borderBottom: `3px solid ${m.acento}`, boxShadow: m.tema.sombra}
      : m.id === 'comic'
        ? {border: `8px solid ${m.acento}`, boxShadow: m.tema.sombra, background: d.n % 2 ? '#FFD400' : '#FFFFFF', rotate: d.n % 2 ? '-1deg' : '1deg'}
        : m.id === 'collage'
          ? {boxShadow: m.tema.sombra, background: ['#F6F1E3', '#F2B632', '#EFEAD8'][(d.n - 1) % 3], rotate: `${[-1.6, 1.2, -0.8][(d.n - 1) % 3]}deg`}
          : m.id === 'pegatina'
            ? {border: '12px solid #FFFFFF', borderRadius: 38, boxShadow: m.tema.sombra, background: ['#FFE500', '#00E5C7', '#FFFFFF'][(d.n - 1) % 3], rotate: d.n % 2 ? '-1.5deg' : '1.5deg'}
            : {border: `5px solid ${c}`};
  const etiqueta = m.id === 'hacking' ? `[0${d.n}]` : m.id === 'ia' ? `0${d.n}` : m.id === 'periodico' ? ['', 'I', 'II', 'III', 'IV'][d.n] ?? `${d.n}` : `${d.n}`;
  return (
    <div style={{position: 'absolute', left: W / 2, top: y, width: 980, height: 190, translate: '-50% -50%', scale: `${p}`, background: m.panel, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 22, padding: '0 22px', ...dentro}}>
      <div style={{fontFamily: m.tema.fuenteTitulo, fontWeight: 900, fontSize: 64, color: c, width: 150, textAlign: 'center', flexShrink: 0}}>{etiqueta}</div>
      {d.icono && (
        <div style={{flexShrink: 0}}>
          <IconoM nombre={d.icono} tam={150} />
        </div>
      )}
      <div style={{fontFamily: m.tema.fuenteTitulo, color: m.texto, minWidth: 0}}>
        <div style={{fontWeight: 900, fontSize: Math.min(56, Math.floor(610 / (String(d.titulo).length * m.anchoLetra))), lineHeight: 1.05, color: d.color === 'alerta' ? c : m.texto, whiteSpace: 'nowrap'}}>{d.titulo}</div>
        {d.detalle && <div style={{fontWeight: 700, fontSize: 36, lineHeight: 1.15, marginTop: 6, fontFamily: m.id === 'periodico' ? 'Georgia, serif' : m.tema.fuente, whiteSpace: 'nowrap'}}>{d.detalle}</div>}
      </div>
    </div>
  );
};

const Visual: React.FC<EscenaProps> = ({d, t, t0}) => {
  const m = useMundo();
  const {width: W} = useVideoConfig();
  const al = at(d.al, t0);
  const y = d.y ?? 860;
  const tam = d.tam ?? 300;
  const p = pop(t, al, 0.35);
  const alerta = t >= at(d.alerta_al, 1e9);
  const c = alerta ? m.alerta : m.acento;
  const lado = tam + 120;
  const x = W / 2;
  const barra = Math.min(1, Math.max(0, (t - al) / 2.6));
  return (
    <div style={{position: 'absolute', left: x, top: y, width: lado, height: lado, translate: '-50% -50%', scale: `${p * (1 + 0.05 * decay(t, at(d.alerta_al, 1e9), 7))}`}}>
      <svg width={lado} height={lado} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        {m.id === 'hacking' && (
          <>
            <rect x={0} y={0} width={lado} height={lado} fill={m.panel} />
            {[[0, 0, 1, 1], [lado, 0, -1, 1], [0, lado, 1, -1], [lado, lado, -1, -1]].map(([a, b, sx, sy], i) => (
              <path key={i} d={`M${a} ${b + sy * 70}V${b}H${a + sx * 70}`} fill="none" stroke={c} strokeWidth={9} />
            ))}
          </>
        )}
        {m.id === 'ia' && (
          <>
            <circle cx={lado / 2} cy={lado / 2} r={lado / 2} fill={m.panel} stroke={m.acento} strokeWidth={5} />
            <circle cx={lado / 2} cy={lado / 2} r={lado / 2 - 26} fill="none" stroke={c} strokeWidth={5} strokeDasharray="22 16" transform={`rotate(${t * 40} ${lado / 2} ${lado / 2})`} />
            <path d={`M-40 ${lado / 2}H${lado + 40}M${lado / 2} -40V${lado + 40}`} stroke={m.acento} strokeWidth={3} strokeDasharray="30 10 6 10" />
          </>
        )}
        {m.id === 'periodico' && (
          <>
            <ellipse cx={lado / 2} cy={lado / 2} rx={lado / 2} ry={lado / 2 + 16} fill={m.panel} stroke={m.acento} strokeWidth={9} />
            <ellipse cx={lado / 2} cy={lado / 2} rx={lado / 2 - 16} ry={lado / 2} fill="none" stroke={m.acento} strokeWidth={3} />
          </>
        )}
      </svg>
      {m.estilo && <div style={{position: 'absolute', inset: 0, background: alerta ? m.alerta : m.panel, border: `${m.id === 'pegatina' ? 14 : 8}px solid ${m.tema.linea}`, borderRadius: m.tema.radio * 2, boxShadow: m.tema.sombra, rotate: '2deg'}} />}
      <div style={{position: 'absolute', left: 60, top: 60}}>
        <IconoM nombre={d.icono} tam={tam} />
      </div>
      {m.id === 'hacking' && <div style={{position: 'absolute', left: 8, right: 8, top: lado * ((t * 1.1) % 1), height: 8, background: c}} />}
      {d.etiqueta && (
        <div style={{position: 'absolute', left: '50%', top: lado + (m.id === 'periodico' ? 32 : 18), translate: '-50% 0', fontFamily: m.tema.fuente, fontWeight: 900, fontSize: 40, color: alerta ? m.alerta : m.texto, background: m.panel, padding: '4px 16px', whiteSpace: 'nowrap', border: m.id === 'periodico' ? undefined : `4px solid ${c}`}}>
          {m.id === 'hacking' && !alerta ? `${d.etiqueta} ${String(Math.round(barra * 100)).padStart(3, ' ')}%` : d.alerta_texto && alerta ? d.alerta_texto : d.etiqueta}
        </div>
      )}
    </div>
  );
};

const ESCENAS_MUNDO: Record<string, DefEscena> = {
  m_rotulo: {
    descripcion: 'Rótulo principal con el grafismo del mundo (consola, cajetín de plano o titular)',
    render: Rotulo,
    sfx: (d, t0): Cue[] => (at(d.al, t0) > 0.1 ? [['teclas', at(d.al, t0), 0.8]] : []),
  },
  m_paso: {descripcion: 'Ficha numerada de un paso', render: Paso, sfx: (d, t0): Cue[] => [['whoosh', at(d.al, t0) - 0.05, 0.5], ['golpe_seco', at(d.al, t0) + 0.03, 0.5]]},
  m_visual: {
    descripcion: 'Icono protagonista dentro del instrumento del mundo (retícula, compás, grabado)',
    render: Visual,
    sfx: (d): Cue[] => (typeof d.alerta_al === 'number' ? [['alerta', d.alerta_al, 0.7]] : []),
  },
};
for (const [k, v] of Object.entries(ESCENAS_MUNDO)) if (!ESCENAS[k]) ESCENAS[k] = v;

