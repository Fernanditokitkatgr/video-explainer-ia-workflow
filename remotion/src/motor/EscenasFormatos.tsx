/**
 * FORMATOS v3 (nov-2026): plantillas de vídeo explicativo como escenas del motor. Mismo contrato que
 * Escenas.tsx (render + sfx + descripcion) y se registran en ESCENAS, así que se usan desde el plano igual:
 *
 *   capas        "Así funciona por dentro": zoom progresivo, capa a capa, con barra de profundidad
 *   viaje        "Viaje de…": un viajero (sobre, paquete, euro…) recorre un circuito de paradas
 *   combate      "X vs Y": ring con barras de vida, asaltos con ganador y marcador
 *   reloj        "¿Qué pasaría si…?": reloj que corre, rótulo "Hora 12", medidor de caos y sucesos
 *   tier_list    ranking S/A/B/C/D que se va llenando con fichas que vuelan a su fila
 *   mito_verdad  afirmación, aguja que duda entre MITO y VERDAD, veredicto con sello y pistas
 *   linea_tiempo línea del tiempo que se desplaza para centrar cada hito
 *   experimento  simulación con mandos (deslizadores) y resultado en un medidor (o antenas que triangulan)
 *
 * Todos aceptan "zona"/"caja" como las demás escenas y funcionan en 16:9 y 9:16.
 */
import React from 'react';
import {useVideoConfig} from 'remotion';
import {C, CHIP_COLORS, col, decay, easeInOut, easeOut, fmt, FONT, jit, lerp, overshoot, pop, ramp, useBoil, wobEllipse, wobLine, wobPoly, wobRect} from './base';
import {Icono} from './Iconos';
import {Caja, Grande, Rafaga} from './piezas';
import type {Cue, DefEscena, EscenaProps} from './Escenas';

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
const useZona = (d: any): Zona & {vertical: boolean; VW: number; VH: number} => {
  const {width, height} = useVideoConfig();
  const v = height > width;
  const Z = v ? ZONAS_V : ZONAS;
  return {...(Z[d.zona] ?? Z.centro), ...(d.caja ?? {}), vertical: v, VW: width, VH: height};
};
const at = (v: any, def: number) => (typeof v === 'number' ? v : def);
/** índice del último elemento cuyo tiempo ya llegó (-1 si ninguno) */
const actualDe = (ts: number[], t: number) => {
  let k = -1;
  ts.forEach((x, i) => {
    if (t >= x) k = i;
  });
  return k;
};
const Svg: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', ...style}} width={1} height={1}>
    {children}
  </svg>
);

// ═════════════════════════ 1 · CAPAS ("así funciona por dentro") ═════════════════════════
/** Cada capa es un "plano" (icono grande, título, etiqueta y mini iconos). Al llegar la siguiente,
 *  la anterior se agranda y se desvanece (entramos en ella) y la nueva sale del fondo. */
const PlanoCapa: React.FC<{c: any; k: number; tam: number; vertical: boolean}> = ({c, k, tam, vertical}) => {
  const b = useBoil();
  const W = vertical ? 860 : 980;
  const H = vertical ? 700 : 560;
  const mini: string[] = c.iconos ?? [];
  return (
    <>
      <Svg>
        <path d={wobRect(-W / 2, -H / 2, W, H, `cp${k}${b}`, 3, 46)} fill={col(c.fondo, '#FFF7E0')} stroke={C.ink} strokeWidth={9} />
        {/* anillos de "lente" que sugieren profundidad */}
        {[0.82, 0.62].map((f, i) => (
          <path key={i} d={wobEllipse(0, 0, (W / 2) * f, (H / 2) * f, `cr${k}${i}${b}`, 0.03)} fill="none" stroke={col(c.color, C.yellow)} strokeWidth={6} opacity={0.35} />
        ))}
      </Svg>
      <div style={{position: 'absolute', left: -tam / 2, top: -tam / 2 - (vertical ? 90 : 40)}}>
        <Icono nombre={c.icono ?? 'chip'} tam={tam} color={c.color_icono ? col(c.color_icono) : undefined} />
      </div>
      {mini.map((ic, i) => {
        const a = (i / Math.max(1, mini.length)) * Math.PI * 2 - Math.PI / 2;
        return (
          <div key={i} style={{position: 'absolute', left: Math.cos(a) * W * 0.38 - 55, top: Math.sin(a) * H * 0.36 - 55 - 30}}>
            <Icono nombre={ic} tam={110} />
          </div>
        );
      })}
      <Grande x={0} y={H / 2 - (vertical ? 150 : 110)} size={c.titulo?.length > 16 ? 56 : 70} color={col(c.color, C.yellow)} rotate={-2}>
        {c.titulo}
      </Grande>
      {c.etiqueta && (
        <Caja x={-W / 2 + 60} y={-H / 2 + 10} seed={`ce${k}`} bg={col(c.color_etiqueta, C.paper)} rotate={-7} style={{padding: '6px 22px', fontSize: 44, translate: '0 -50%', transformOrigin: '0% 50%'}}>
          {c.etiqueta}
        </Caja>
      )}
    </>
  );
};
const Capas: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const capas: any[] = d.capas ?? [];
  const ts = capas.map((c, i) => at(c.al, t0 + 0.2 + i * 1.5));
  // "actual" fija la capa que se ve sin animación al empezar (para continuar entre tramos)
  const base = typeof d.actual === 'number' ? d.actual : -1;
  const ts2 = ts.map((x, i) => (i <= base ? -1e9 : x));
  const k = Math.max(0, actualDe(ts2, t));
  const p = ramp(t, ts2[k], 0.65, easeInOut);
  const tam = d.tam ?? (z.vertical ? 340 : 330);
  const cx = z.x;
  const cy = z.y + (z.vertical ? 0 : 30);
  const total = d.total ?? capas.length;
  const b = useBoil();
  return (
    <>
      {/* capa anterior: entramos en ella (crece y se va) */}
      {k > 0 && p < 1 && (
        <div style={{position: 'absolute', left: cx, top: cy, scale: `${lerp(1, 4.2, p)}`, opacity: 1 - p, rotate: `${p * 8}deg`}}>
          <PlanoCapa c={capas[k - 1]} k={k - 1} tam={tam} vertical={z.vertical} />
        </div>
      )}
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: cy + Math.sin((t - t0) * 2) * 6,
          scale: `${k > 0 ? lerp(0.15, 1, ramp(t, ts2[k], 0.65, overshoot)) : pop(t, ts2[0] > -1e8 ? ts2[0] : t0, 0.5)}`,
          opacity: k > 0 ? Math.min(1, p * 2) : 1,
        }}
      >
        <PlanoCapa c={capas[k]} k={k} tam={tam} vertical={z.vertical} />
      </div>
      {/* barra de profundidad: CAPA k / total */}
      <div style={{position: 'absolute', left: z.vertical ? z.VW - 80 : cx + 600, top: z.vertical ? 180 : cy - 260}}>
        <Svg>
          <path d={wobLine([0, 0], [0, (total - 1) * 58], `bp${b}`, 1.5)} stroke={C.ink} strokeWidth={8} fill="none" strokeLinecap="round" />
          {Array.from({length: total}, (_, i) => (
            <circle key={i} cx={0} cy={i * 58} r={i === k ? 22 : 14} fill={i < k ? C.ink : i === k ? col(capas[k]?.color, C.yellow) : C.paper} stroke={C.ink} strokeWidth={5} />
          ))}
        </Svg>
        {!z.vertical && (
          <Caja x={0} y={-60} seed="bpc" bg={C.paper} rotate={-4} style={{padding: '2px 14px', fontSize: 30}}>
            {d.rotulo ?? 'CAPA'} {k + 1}
          </Caja>
        )}
      </div>
      {p > 0 && p < 0.9 && k > 0 && <Rafaga t={t} t0={ts2[k] + 0.3} x={cx} y={cy} n={12} spread={520} />}
    </>
  );
};

// ═════════════════════════ 2 · VIAJE ═════════════════════════
/** Circuito en serpiente: paradas (icono + nombre). El viajero (icono) llega a la parada "actual" en su
 *  "al"; las anteriores ya están visitadas y las siguientes se ven como fantasmas (o no se ven). */
const posParadas = (n: number, z: Zona & {vertical: boolean}, ancho = 1400) => {
  const out: [number, number][] = [];
  if (z.vertical) {
    const filas = Math.ceil(n / 2);
    for (let i = 0; i < n; i++) {
      const f = Math.floor(i / 2);
      const izq = f % 2 === 0 ? i % 2 === 0 : i % 2 === 1;
      out.push([z.x + (izq ? -290 : 290), z.y - 400 + f * (820 / Math.max(1, filas - 1))]);
    }
    return out;
  }
  // dos filas en serpiente: la de arriba de izquierda a derecha y la de abajo de vuelta
  const porFila = n > 5 ? Math.ceil(n / 2) : n;
  const W = Math.min(z.w + 100, ancho);
  const step = W / Math.max(1, porFila - 1);
  for (let i = 0; i < n; i++) {
    const fila = i < porFila ? 0 : 1;
    const x = fila ? z.x + W / 2 - (i - porFila) * step : z.x - W / 2 + i * step;
    out.push([x, n > 5 ? z.y + (fila ? 130 : -200) : z.y - 30]);
  }
  return out;
};
const Viaje: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const ps: any[] = d.paradas ?? [];
  const n = ps.length;
  const pos = posParadas(n, z, d.ancho);
  const act = Math.min(n - 1, d.actual ?? n - 1);
  const ta = at(d.al, t0 + 0.8);
  const viaje = d.duracion_tramo ?? 0.8;
  const pm = act > 0 ? ramp(t, ta - viaje, viaje, easeInOut) : 1;
  // posición del viajero
  const A = pos[Math.max(0, act - 1)];
  const B = pos[act];
  const vx = lerp(A[0], B[0], pm);
  const vy = lerp(A[1], B[1], pm) - Math.abs(Math.sin(pm * Math.PI)) * 90 - Math.abs(Math.sin((t - t0) * 6)) * 6;
  const fantasmas = d.futuras !== 'ocultas';
  const llegada = t >= ta;
  // camino hasta donde va el viajero
  const camino: [number, number][] = [];
  for (let i = 0; i < act; i++) camino.push(pos[i]);
  camino.push([lerp(A[0], B[0], pm), lerp(A[1], B[1], pm)]);
  const cnt = d.contador;
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.vertical ? 150 : 70} size={z.vertical ? 62 : 58} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      <Svg>
        {/* carretera completa en gris (fantasma) */}
        {fantasmas && n > 1 && <path d={wobPoly(pos, `vr${b}`, 2)} stroke={C.lightGrey} strokeWidth={26} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {fantasmas && n > 1 && <path d={wobPoly(pos, `vr2${b}`, 2)} stroke={C.paper} strokeWidth={6} strokeDasharray="18 22" fill="none" />}
        {/* recorrido hecho en color */}
        {camino.length > 1 && <path d={wobPoly(camino, `vc${b}`, 1.5)} stroke={C.ink} strokeWidth={30} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
        {camino.length > 1 && <path d={wobPoly(camino, `vc${b}`, 1.5)} stroke={col(d.color_camino, C.green)} strokeWidth={18} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      </Svg>
      {ps.map((p, i) => {
        if (i > act && !fantasmas) return null;
        const futura = i > act;
        const esta = i === act;
        const s = esta ? pop(t, i === 0 ? t0 : ta, 0.45) * (llegada || i === 0 ? 1 : 0.85) : 1;
        const pulso = esta && llegada ? 1 + 0.06 * Math.sin((t - ta) * 8) * decay(t, ta + 0.4, 1.2) : 1;
        const tam = z.vertical ? 118 : 140;
        return (
          <div key={i} style={{position: 'absolute', left: pos[i][0], top: pos[i][1], scale: `${Math.max(0.6, s) * pulso}`, opacity: futura ? 0.35 : 1}}>
            <Svg>
              <path d={wobEllipse(0, 0, tam * 0.62, tam * 0.62, `vp${i}${b}`, 0.05)} fill={futura ? C.paper : col(p.color, CHIP_COLORS[i % 6])} stroke={C.ink} strokeWidth={7} />
              {esta && llegada && <path d={wobEllipse(0, 0, tam * 0.8, tam * 0.8, `vh${i}${b}`, 0.05)} fill="none" stroke={C.ink} strokeWidth={4} strokeDasharray="10 12" />}
            </Svg>
            <div style={{position: 'absolute', left: -tam * 0.4, top: -tam * 0.4}}>
              <Icono nombre={p.icono ?? 'caja'} tam={tam * 0.8} />
            </div>
            {(!futura || d.nombres_futuras) && (
              <Caja x={0} y={tam * 0.78} seed={`vn${i}`} bg={esta ? C.yellow : C.paper} rotate={jit(`vn${i}`, 4)} style={{padding: '2px 14px', fontSize: esta ? 42 : 32}}>
                {p.nombre}
              </Caja>
            )}
            {i + (d.numero_desde ?? 1) > 0 && (
              <div style={{position: 'absolute', left: -tam * 0.62, top: -tam * 0.7, fontFamily: FONT, fontSize: 30, color: C.paper, background: C.ink, borderRadius: 20, padding: '0 10px'}}>{i + (d.numero_desde ?? 1)}</div>
            )}
          </div>
        );
      })}
      {/* viajero */}
      <div style={{position: 'absolute', left: vx, top: vy, rotate: `${Math.sin((t - t0) * 7) * 8}deg`, scale: `${1 + 0.15 * decay(t, ta, 5)}`}}>
        <div style={{position: 'absolute', left: -70, top: -150}}>
          <Icono nombre={d.viajero ?? 'sobre'} tam={140} color={d.color_viajero ? col(d.color_viajero) : undefined} />
        </div>
      </div>
      {llegada && act > 0 && <Rafaga t={t} t0={ta} x={B[0]} y={B[1]} n={12} spread={260} />}
      {cnt && (
        <Caja x={z.vertical ? z.x : z.x + 700} y={z.vertical ? 1120 : 960} seed="vct" bg={C.paper} rotate={-3} style={{padding: '6px 24px', fontSize: 50}}>
          {cnt.antes ?? ''}
          {fmt(lerp(cnt.desde ?? 0, cnt.hasta ?? 0, ramp(t, at(cnt.al, ta - viaje), cnt.dur ?? viaje, easeInOut)), cnt.decimales ?? 0)}
          {cnt.sufijo ?? ''}
        </Caja>
      )}
    </>
  );
};

// ═════════════════════════ 3 · COMBATE (X vs Y) ═════════════════════════
const Combate: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const as: any[] = d.asaltos ?? [];
  const ts = as.map((a, i) => at(a.al, t0 + 1 + i * 2));
  const k = actualDe(ts, t);
  const W = z.vertical ? 960 : 1300;
  const top = z.y - (z.vertical ? 260 : 180);
  const suelo = z.y + (z.vertical ? 260 : 220);
  const vida = (lado: 'a' | 'b') => {
    let v = 1;
    const golpes = as.filter((a) => a.ganador && a.ganador !== lado && a.ganador !== 'empate').length || 1;
    as.forEach((a, i) => {
      if (a.ganador && a.ganador !== lado && a.ganador !== 'empate') v -= ramp(t, ts[i] + 0.15, 0.4) / Math.max(golpes, d.vidas ?? golpes + 1);
    });
    return Math.max(0, v);
  };
  const puntos = (lado: string) => as.filter((a, i) => a.ganador === lado && t >= ts[i] + 0.2).length;
  const tg = at(d.ganador_al, 1e9);
  const lados: ('a' | 'b')[] = ['a', 'b'];
  return (
    <>
      {/* ring: lona, postes y cuerdas */}
      <Svg>
        <path d={wobPoly([[z.x - W / 2 - 40, suelo], [z.x + W / 2 + 40, suelo], [z.x + W / 2 + 90, suelo + 70], [z.x - W / 2 - 90, suelo + 70]], `rl${b}`, 2, true)} fill="#D9C6A5" stroke={C.ink} strokeWidth={7} />
        {[-1, 1].map((sd) => (
          <path key={sd} d={wobRect(z.x + sd * (W / 2) - 14, top, 28, suelo - top + 10, `rp${sd}${b}`, 1.5, 6)} fill={sd < 0 ? C.red : C.blue} stroke={C.ink} strokeWidth={6} />
        ))}
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={wobLine([z.x - W / 2, top + 20 + i * 70], [z.x + W / 2, top + 20 + i * 70], `rc${i}${b}`, 3, 5)}
            stroke={[C.red, C.paper, C.blue][i]}
            strokeWidth={10}
            fill="none"
            opacity={0.85}
          />
        ))}
      </Svg>
      {/* luchadores */}
      {lados.map((lado, j) => {
        const s = d[lado] ?? {};
        const sd = j ? 1 : -1;
        const tin = at(s.al, t0 + 0.2 + j * 0.5);
        let dx = 0;
        let sh = 0;
        if (k >= 0) {
          const a = as[k];
          const dt = t - ts[k];
          if (a.ganador === lado && dt < 0.5) dx = -sd * Math.sin(Math.min(1, dt / 0.5) * Math.PI) * 150;
          if (a.ganador && a.ganador !== lado && a.ganador !== 'empate') sh = Math.sin(dt * 50) * 18 * decay(t, ts[k] + 0.15, 5);
        }
        const gana = t >= tg && d.ganador === lado;
        const pierde = t >= tg && d.ganador && d.ganador !== lado;
        const x = z.x + sd * W * 0.27 + dx + sh;
        const y = z.y + 40 - (gana ? Math.abs(Math.sin((t - tg) * 6)) * 30 : 0);
        return (
          <React.Fragment key={lado}>
            <div style={{position: 'absolute', left: x, top: y, scale: `${pop(t, tin, 0.45) * (gana ? 1.12 : 1)}`, opacity: pierde ? 0.55 : 1, rotate: `${pierde ? sd * 12 : 0}deg`}}>
              <div style={{position: 'absolute', left: -110, top: -170}}>
                <Icono nombre={s.icono ?? 'robot'} tam={220} />
              </div>
              <Caja x={0} y={90} seed={`cn${j}`} bg={col(s.color, j ? C.blue : C.red)} rotate={sd * 3} style={{padding: '6px 26px', fontSize: s.nombre?.length > 10 ? 40 : 52, color: C.paper}}>
                {s.nombre}
              </Caja>
            </div>
            {/* barra de vida */}
            <div style={{position: 'absolute', left: z.x + sd * W * 0.27 - 180, top: top - 120, width: 360, height: 38, border: `6px solid ${C.ink}`, borderRadius: 14, background: C.paper, overflow: 'hidden', scale: `${pop(t, tin, 0.4)}`}}>
              <div style={{width: `${vida(lado) * 100}%`, height: '100%', background: vida(lado) > 0.5 ? C.green : vida(lado) > 0.25 ? C.orange : C.red}} />
            </div>
          </React.Fragment>
        );
      })}
      {/* marcador */}
      <Caja x={z.x} y={top - 100} seed="mk" bg={C.ink} rotate={-2} style={{padding: '4px 28px', fontSize: 66, color: C.paper, scale: `${1 + 0.15 * decay(t, ts[Math.max(0, k)] + 0.2, 5)}`}}>
        {puntos('a')} - {puntos('b')}
      </Caja>
      {/* rótulo del asalto */}
      {k >= 0 && (
        <Caja x={z.x} y={suelo + (z.vertical ? 150 : 130)} seed={`as${k}`} bg={C.yellow} scale={pop(t, ts[k] - 0.25, 0.35)} rotate={jit(`as${k}`, 4)} style={{padding: '6px 26px', fontSize: z.vertical ? 46 : 52}}>
          {as[k].titulo}
        </Caja>
      )}
      {k >= 0 && t - ts[k] < 0.6 && t >= ts[k] && as[k].ganador !== 'empate' && (
        <Grande x={z.x + (as[k].ganador === 'a' ? 1 : -1) * W * 0.12} y={z.y - 40} size={150} color={C.yellow} scale={pop(t, ts[k], 0.25)} rotate={-12}>
          {as[k].onomatopeya ?? '¡POW!'}
        </Grande>
      )}
      {t >= tg && d.ganador && (
        <>
          <Grande x={z.x} y={z.y - 40} size={z.vertical ? 84 : 104} color={C.green} scale={pop(t, tg, 0.4)} rotate={-4}>
            {d.texto_ganador ?? `¡GANA ${(d[d.ganador]?.nombre ?? '').toUpperCase()}!`}
          </Grande>
          <Rafaga t={t} t0={tg} x={z.x} y={z.y - 40} n={22} />
        </>
      )}
      {d.titulo && t < (ts[0] ?? 1e9) && (
        <Grande x={z.x} y={z.y - 40} size={130} color={C.red} scale={pop(t, t0 + 0.6, 0.35)} rotate={-8}>
          {d.titulo}
        </Grande>
      )}
    </>
  );
};

// ═════════════════════════ 4 · RELOJ ("¿qué pasaría si…?") ═════════════════════════
const Reloj: React.FC<EscenaProps> = ({d, t, t0, t1}) => {
  const z = useZona(d);
  const b = useBoil();
  const ta = at(d.al, t0 + 0.2);
  const dur = d.dur ?? 1.4;
  const p = ramp(t, ta, dur, easeInOut);
  const desde = d.desde ?? 0; // en minutos
  const hasta = d.hasta ?? 60;
  const mins = lerp(desde, hasta, p);
  const R = d.radio ?? (z.vertical ? 210 : 230);
  const cx = z.vertical ? z.x : z.x - 380;
  const cy = z.vertical ? z.y - 170 : z.y + 30;
  const angM = ((mins % 60) / 60) * 360;
  const angH = ((mins / 60) % 12) / 12 * 360;
  const corre = p > 0 && p < 1;
  const caos = d.caos !== undefined ? lerp(d.caos_desde ?? Math.max(0, d.caos - 20), d.caos, ramp(t, ta, dur + 0.3, easeOut)) : null;
  const ev: any[] = d.sucesos ?? [];
  const tiemble = corre ? Math.sin(t * 60) * 3 : 0;
  return (
    <>
      {d.escenario && (
        <Caja x={z.x} y={z.vertical ? 140 : 70} seed="esc" bg={C.ink} scale={pop(t, t0, 0.35)} rotate={-2} style={{padding: '4px 26px', fontSize: z.vertical ? 40 : 44, color: C.paper}}>
          {d.escenario}
        </Caja>
      )}
      <div style={{position: 'absolute', left: cx + tiemble, top: cy, scale: `${pop(t, t0, 0.45) * (1 + 0.08 * decay(t, ta + dur, 5))}`}}>
        <Svg>
          <path d={wobEllipse(8, 10, R, R, `rjs${b}`, 0.02)} fill={C.ink} />
          <path d={wobEllipse(0, 0, R, R, `rj${b}`, 0.02)} fill={col(d.color_esfera, C.paper)} stroke={C.ink} strokeWidth={10} />
          {Array.from({length: 12}, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            return <path key={i} d={wobLine([Math.sin(a) * R * 0.78, -Math.cos(a) * R * 0.78], [Math.sin(a) * R * 0.9, -Math.cos(a) * R * 0.9], `rm${i}${b}`, 1)} stroke={C.ink} strokeWidth={i % 3 ? 5 : 10} strokeLinecap="round" />;
          })}
          <g transform={`rotate(${angH})`}>
            <path d={wobLine([0, 14], [0, -R * 0.5], `rh${b}`, 1)} stroke={C.ink} strokeWidth={16} strokeLinecap="round" />
          </g>
          <g transform={`rotate(${angM})`}>
            <path d={wobLine([0, 18], [0, -R * 0.78], `rmm${b}`, 1)} stroke={C.red} strokeWidth={10} strokeLinecap="round" />
          </g>
          <circle r={16} fill={C.yellow} stroke={C.ink} strokeWidth={5} />
          {/* campanitas */}
          {[-1, 1].map((sd) => (
            <path key={sd} d={wobEllipse(sd * R * 0.62, -R * 0.95, R * 0.22, R * 0.16, `rc${sd}${b}`, 0.06)} transform={`rotate(${sd * 30 + (corre ? Math.sin(t * 50) * 10 : 0)} ${sd * R * 0.62} ${-R * 0.95})`} fill={C.red} stroke={C.ink} strokeWidth={6} />
          ))}
        </Svg>
      </div>
      {/* rótulo del momento ("HORA 12") */}
      <Grande x={z.vertical ? z.x : z.x + 230} y={z.vertical ? cy + R + 120 : z.y - 120} size={d.tam ?? (z.vertical ? 120 : 150)} color={col(d.color, C.yellow)} scale={pop(t, ta + dur * 0.6, 0.4)} rotate={-4}>
        {d.rotulo}
      </Grande>
      {d.subtitulo && (
        <Caja x={z.vertical ? z.x : z.x + 230} y={z.vertical ? cy + R + 240 : z.y + 20} seed="rst" bg={C.paper} scale={pop(t, at(d.subtitulo_al, ta + dur), 0.35)} rotate={2} style={{padding: '6px 26px', fontSize: z.vertical ? 46 : 52}}>
          {d.subtitulo}
        </Caja>
      )}
      {/* medidor de caos */}
      {caos !== null && (
        <div style={{position: 'absolute', left: z.vertical ? z.x - 330 : z.x + 30, top: z.vertical ? cy + R + 330 : z.y + 120, scale: `${pop(t, ta, 0.35)}`}}>
          <div style={{fontFamily: FONT, fontSize: 34, color: C.ink, marginBottom: 6}}>{d.medidor ?? 'CAOS'}</div>
          <div style={{width: 660, height: 46, border: `6px solid ${C.ink}`, borderRadius: 16, background: C.paper, overflow: 'hidden'}}>
            <div style={{width: `${caos}%`, height: '100%', background: caos > 70 ? C.red : caos > 40 ? C.orange : C.green}} />
          </div>
        </div>
      )}
      {ev.map((e, i) => {
        const te = at(e.al, ta + dur + 0.3 + i * 0.6);
        const x = z.vertical ? z.x + (i % 2 ? 230 : -230) : z.x + 50 + (i % 3) * 300;
        const y = z.vertical ? cy + R + 520 + Math.floor(i / 2) * 170 : z.y + 300 + Math.floor(i / 3) * 140;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y + Math.sin(t * 4 + i) * 5, scale: `${pop(t, te, 0.4)}`}}>
            {e.icono && (
              <div style={{position: 'absolute', left: -150, top: -55}}>
                <Icono nombre={e.icono} tam={110} />
              </div>
            )}
            <Caja x={30} y={0} seed={`rv${i}`} bg={col(e.color, C.paper)} rotate={jit(`rv${i}`, 4)} style={{padding: '4px 18px', fontSize: 36}}>
              {e.texto}
            </Caja>
            {e.tachar_al !== undefined && t >= e.tachar_al && (
              <Grande x={30} y={0} size={110} color={C.red} scale={pop(t, e.tachar_al, 0.3)} rotate={-8}>
                ✗
              </Grande>
            )}
          </div>
        );
      })}
    </>
  );
};

// ═════════════════════════ 5 · TIER LIST ═════════════════════════
const FILAS_DEF = [
  {n: 'S', color: '#FF7F7F'},
  {n: 'A', color: '#FFBF7F'},
  {n: 'B', color: '#FFDF7F'},
  {n: 'C', color: '#BFFF7F'},
  {n: 'D', color: '#7FBFFF'},
];
const TierList: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const filas: any[] = d.filas ?? FILAS_DEF;
  const items: any[] = d.items ?? [];
  const W = d.ancho ?? (z.vertical ? 980 : 1240);
  const hF = d.alto_fila ?? (z.vertical ? 150 : 128);
  const x0 = z.x - W / 2;
  const y0 = z.y - (filas.length * hF) / 2 + (z.vertical ? 0 : 40);
  const cuenta: Record<string, number> = {};
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={y0 - 70} size={58} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      <div style={{position: 'absolute', left: 0, top: 0, scale: `${pop(t, t0, 0.45)}`, transformOrigin: `${z.x}px ${z.y}px`}}>
        <Svg>
          {filas.map((f, i) => (
            <React.Fragment key={i}>
              <path d={wobRect(x0, y0 + i * hF, W, hF - 8, `tf${i}${b}`, 2, 10)} fill="#2E2E36" stroke={C.ink} strokeWidth={6} />
              <path d={wobRect(x0, y0 + i * hF, 150, hF - 8, `tl${i}${b}`, 2, 10)} fill={f.color} stroke={C.ink} strokeWidth={6} />
            </React.Fragment>
          ))}
        </Svg>
        {filas.map((f, i) => (
          <Grande key={i} x={x0 + 75} y={y0 + i * hF + (hF - 8) / 2} size={hF * 0.55} color={C.paper} rotate={-3}>
            {f.n}
          </Grande>
        ))}
      </div>
      {items.map((it, i) => {
        const ti = at(it.al, t0 + 0.6 + i * 0.7);
        const fi = Math.max(0, filas.findIndex((f) => f.n === it.fila));
        const slot = (cuenta[fi] = (cuenta[fi] ?? -1) + 1);
        const tx = x0 + 150 + 30 + slot * (hF + 60) + hF * 0.4;
        const ty = y0 + fi * hF + (hF - 8) / 2;
        const sx = z.x;
        const sy = z.VH + 160;
        const pf = ramp(t, ti - 0.45, 0.45, easeInOut);
        if (pf <= 0) return null;
        const x = lerp(sx, tx, pf);
        const y = lerp(sy, ty, pf) - Math.sin(pf * Math.PI) * 220;
        const tam = hF * 0.9;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, rotate: `${(1 - pf) * 360 + jit(`ti${i}`, 5)}deg`, scale: `${1 + 0.25 * decay(t, ti, 6)}`}}>
            <Svg>
              <path d={wobRect(-tam / 2 - 8, -tam / 2 - 8, tam + 16, tam + 16, `tb${i}${b}`, 1.5, 12)} fill={C.paper} stroke={C.ink} strokeWidth={5} />
            </Svg>
            <div style={{position: 'absolute', left: -tam * 0.45, top: -tam * 0.45}}>
              <Icono nombre={it.icono ?? 'caja'} tam={tam * 0.9} />
            </div>
            {it.texto && (
              <div style={{position: 'absolute', left: 0, top: tam / 2 - 6, translate: '-50% 0', fontFamily: FONT, fontSize: 24, color: C.ink, background: C.yellow, border: `3px solid ${C.ink}`, borderRadius: 8, padding: '0 8px', whiteSpace: 'nowrap'}}>{it.texto}</div>
            )}
          </div>
        );
      })}
      {items.map((it, i) => {
        const ti = at(it.al, t0 + 0.6 + i * 0.7);
        return t >= ti && t < ti + 1.1 ? <Rafaga key={`r${i}`} t={t} t0={ti} x={z.x} y={z.y} n={8} spread={200} /> : null;
      })}
    </>
  );
};

// ═════════════════════════ 6 · MITO O VERDAD ═════════════════════════
const MitoVerdad: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const tv = at(d.al, t0 + 3);
  const W = z.vertical ? 940 : 1200;
  const cy = z.y - (z.vertical ? 140 : 60);
  const ver = d.veredicto ?? 'mito'; // mito | verdad | medias
  const objetivo = ver === 'mito' ? -1 : ver === 'verdad' ? 1 : 0;
  // aguja: duda (oscila) y se clava en el veredicto
  const pv = ramp(t, tv - 0.3, 0.5, overshoot);
  const duda = Math.sin((t - t0) * 4.2) * 0.85;
  const v = lerp(duda, objetivo, pv);
  const ang = v * 62;
  const pistas: any[] = d.pistas ?? [];
  const sel = t >= tv;
  const sello = ver === 'mito' ? d.texto_sello ?? 'MITO' : ver === 'verdad' ? d.texto_sello ?? 'VERDAD' : d.texto_sello ?? 'A MEDIAS';
  const cSello = ver === 'mito' ? C.red : ver === 'verdad' ? C.green : C.orange;
  const gy = cy + (z.vertical ? 320 : 290);
  return (
    <>
      <Grande x={z.x} y={cy - (z.vertical ? 300 : 250)} size={z.vertical ? 76 : 80} color={C.yellow} scale={pop(t, t0, 0.35)} rotate={-3}>
        {d.titulo ?? '¿MITO O VERDAD?'}
      </Grande>
      <Caja x={z.x} y={cy - 60} w={W} seed="mvaf" bg={C.paper} scale={pop(t, at(d.afirmacion_al, t0 + 0.2), 0.45)} rotate={-1.5} style={{padding: '22px 36px', fontSize: d.afirmacion?.length > 40 ? 46 : d.afirmacion?.length > 26 ? 54 : 64, whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.12}}>
        «{d.afirmacion}»
      </Caja>
      {/* medidor con aguja */}
      <div style={{position: 'absolute', left: z.x, top: gy, scale: `${pop(t, t0 + 0.4, 0.4)}`}}>
        <Svg>
          <path d="M-260 0 A260 260 0 0 1 260 0 Z" fill={C.paper} stroke={C.ink} strokeWidth={8} />
          <path d="M-260 0 A260 260 0 0 1 -86 -245 L0 0 Z" fill={C.red} opacity={0.85} />
          <path d="M86 -245 A260 260 0 0 1 260 0 L0 0 Z" fill={C.green} opacity={0.85} />
          <path d="M-86 -245 A260 260 0 0 1 86 -245 L0 0 Z" fill={C.orange} opacity={0.85} />
          <path d="M-260 0 A260 260 0 0 1 260 0" fill="none" stroke={C.ink} strokeWidth={8} />
          <g transform={`rotate(${ang})`}>
            <path d={wobLine([0, 0], [0, -230], `ag${b}`, 1)} stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          </g>
          <circle r={22} fill={C.ink} />
        </Svg>
      </div>
      {[
        ['MITO', -1, C.red],
        ['VERDAD', 1, C.green],
      ].map(([txt, sd, c]: any) => {
        const elegido = sel && objetivo === sd;
        const apagado = sel && objetivo !== sd && objetivo !== 0;
        return (
          <Caja
            key={txt}
            x={z.x + sd * (z.vertical ? 300 : 420)}
            y={gy + 60}
            seed={`mv${txt}`}
            bg={c}
            scale={pop(t, t0 + 0.6, 0.4) * (elegido ? 1.18 + 0.04 * Math.sin(t * 10) : 1)}
            opacity={apagado ? 0.35 : 1}
            rotate={sd * 4}
            style={{padding: '8px 30px', fontSize: 58, color: C.paper}}
          >
            {txt}
          </Caja>
        );
      })}
      {sel && (
        <div
          style={{
            position: 'absolute',
            left: z.x,
            top: cy - 60,
            translate: '-50% -50%',
            scale: `${lerp(3, 1, ramp(t, tv, 0.18, (x) => x * x))}`,
            rotate: '-12deg',
            border: `14px solid ${cSello}`,
            borderRadius: 22,
            padding: '0 34px',
            fontFamily: FONT,
            fontSize: z.vertical ? 120 : 140,
            color: cSello,
            background: 'rgba(255,255,255,0.9)',
            whiteSpace: 'nowrap',
          }}
        >
          {sello}
        </div>
      )}
      {pistas.map((p, i) => {
        const tp = at(p.al, tv + 0.8 + i * 0.7);
        const x = z.vertical ? z.x : z.x + (i - (pistas.length - 1) / 2) * 420;
        const y = z.vertical ? gy + 200 + i * 120 : gy + 170;
        return (
          <Caja key={i} x={x} y={y} seed={`mp${i}`} bg={col(p.color, C.yellow)} scale={pop(t, tp, 0.35)} rotate={jit(`mp${i}`, 4)} style={{padding: '4px 20px', fontSize: 38}}>
            {p.texto}
          </Caja>
        );
      })}
    </>
  );
};

// ═════════════════════════ 7 · LÍNEA DEL TIEMPO ═════════════════════════
const LineaTiempo: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const hs: any[] = d.hitos ?? [];
  const sep = d.separacion ?? (z.vertical ? 420 : 540);
  const ts = hs.map((h, i) => at(h.al, t0 + 0.4 + i * 1.6));
  const k = actualDe(ts, t);
  // desplazamiento: el hito actual se centra (con una transición de 0,6 s)
  let off = 0;
  if (k >= 0) {
    const pk = ramp(t, ts[k] - 0.3, 0.6, easeInOut);
    off = lerp(Math.max(0, k - 1), k, k > 0 ? pk : 1) * sep;
  }
  const ly = z.y + (z.vertical ? 0 : 140);
  const X = (i: number) => z.x + i * sep - off;
  const fin = X(hs.length - 1) + sep * 0.7;
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.vertical ? 170 : 80} size={60} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      <Svg>
        <path d={wobLine([X(0) - sep, ly], [fin, ly], `lt${b}`, 3, 14)} stroke={C.ink} strokeWidth={14} fill="none" strokeLinecap="round" />
        <path d={`M${fin - 10} ${ly - 30} L${fin + 30} ${ly} L${fin - 10} ${ly + 30}`} stroke={C.ink} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {Array.from({length: Math.ceil((fin - X(0) + sep) / 70)}, (_, i) => (
          <path key={i} d={`M${X(0) - sep + i * 70} ${ly - 12} L${X(0) - sep + i * 70} ${ly + 12}`} stroke={C.ink} strokeWidth={4} />
        ))}
      </Svg>
      {hs.map((h, i) => {
        const vis = t >= ts[i] - 0.3;
        const x = X(i);
        if (x < -400 || x > z.VW + 400) return null;
        const p = pop(t, ts[i], 0.45);
        const arriba = i % 2 === 0;
        const c = col(h.color, CHIP_COLORS[i % 6]);
        return (
          <React.Fragment key={i}>
            <Svg>
              <path d={wobEllipse(x, ly, 26, 26, `lh${i}${b}`, 0.06)} fill={vis ? c : C.paper} stroke={C.ink} strokeWidth={6} />
            </Svg>
            {vis && (
              <>
                <Grande x={x} y={ly + (arriba ? -80 : 80)} size={z.vertical ? 74 : 80} color={c} scale={p} rotate={-4}>
                  {h.fecha}
                </Grande>
                {h.icono && (
                  <div style={{position: 'absolute', left: x - 75, top: ly + (arriba ? 70 : -220), scale: `${pop(t, ts[i] + 0.15, 0.4)}`}}>
                    <Icono nombre={h.icono} tam={150} />
                  </div>
                )}
                <Caja x={x} y={ly + (arriba ? 290 : -280)} seed={`lc${i}`} bg={C.paper} scale={pop(t, ts[i] + 0.25, 0.4)} rotate={jit(`lc${i}`, 3)} style={{padding: '8px 20px', fontSize: 38, maxWidth: sep - 40, whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.1}}>
                  {h.texto}
                </Caja>
              </>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};

// ═════════════════════════ 8 · EXPERIMENTO / SIMULACIÓN ═════════════════════════
/** Mandos (deslizadores) que se mueven en cada paso y un resultado que responde: medidor de aguja con
 *  número, o "antenas" que triangulan (círculos que se cruzan y una zona de error que encoge). */
const Experimento: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = useZona(d);
  const b = useBoil();
  const ctrls: any[] = d.controles ?? [];
  const pasos: any[] = d.pasos ?? [];
  const ts = pasos.map((p, i) => at(p.al, t0 + 0.6 + i * 1.5));
  const k = actualDe(ts, t);
  const pk = k >= 0 ? ramp(t, ts[k], 0.6, easeInOut) : 0;
  const valor = (j: number) => {
    const ini = ctrls[j]?.inicio ?? ctrls[j]?.min ?? 0;
    if (k < 0) return ini;
    const prev = k > 0 ? pasos[k - 1].valores?.[j] ?? ini : ini;
    return lerp(prev, pasos[k].valores?.[j] ?? prev, pk);
  };
  const res = d.resultado ?? {};
  const rIni = res.inicio ?? res.min ?? 0;
  const rv = k < 0 ? rIni : lerp(k > 0 ? pasos[k - 1].resultado ?? rIni : rIni, pasos[k].resultado ?? rIni, pk);
  const panelX = z.vertical ? z.x : z.x - 360;
  const panelY = z.vertical ? z.y + 360 : z.y + 40;
  const visX = z.vertical ? z.x : z.x + 330;
  const visY = z.vertical ? z.y - 250 : z.y + 20;
  const antenas = d.visual === 'antenas';
  const nAnt = Math.round(valor(0));
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.vertical ? 150 : 70} size={60} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      {/* panel de mandos */}
      <div style={{position: 'absolute', left: panelX, top: panelY, scale: `${pop(t, t0 + 0.1, 0.45)}`}}>
        <Caja x={0} y={0} w={620} h={120 + ctrls.length * 130} seed="exp" bg="#2E3440" rotate={-1} />
        <div style={{position: 'absolute', left: -280, top: -(60 + ctrls.length * 65) + 26, fontFamily: FONT, fontSize: 30, color: C.yellow}}>{d.rotulo_panel ?? 'MANDOS'}</div>
        {ctrls.map((c, j) => {
          const v = valor(j);
          const f = (v - (c.min ?? 0)) / ((c.max ?? 1) - (c.min ?? 0) || 1);
          const y = -(ctrls.length * 65) + 60 + j * 130;
          return (
            <React.Fragment key={j}>
              <div style={{position: 'absolute', left: -280, top: y - 46, fontFamily: FONT, fontSize: 32, color: C.paper, whiteSpace: 'nowrap'}}>
                {c.nombre}: <span style={{color: C.yellow}}>{fmt(v, c.decimales ?? 0)}{c.sufijo ?? ''}</span>
              </div>
              <Svg>
                <path d={wobLine([-270, y + 20], [270, y + 20], `es${j}${b}`, 1.5)} stroke={C.lightGrey} strokeWidth={14} strokeLinecap="round" />
                <path d={wobLine([-270, y + 20], [-270 + 540 * f, y + 20], `ef${j}${b}`, 1.5)} stroke={col(c.color, C.green)} strokeWidth={14} strokeLinecap="round" />
                <path d={wobEllipse(-270 + 540 * f, y + 20, 22, 22, `ek${j}${b}`, 0.06)} fill={C.paper} stroke={C.ink} strokeWidth={6} />
              </Svg>
            </React.Fragment>
          );
        })}
      </div>
      {/* resultado */}
      {antenas ? (
        <div style={{position: 'absolute', left: visX, top: visY, scale: `${pop(t, t0 + 0.2, 0.45)}`}}>
          <Svg>
            <path d={wobRect(-320, -300, 640, 600, `ma${b}`, 3, 30)} fill="#E8F4E0" stroke={C.ink} strokeWidth={7} />
            {[[-180, -90], [150, -170], [60, 190]].map(([ax, ay], i) => {
              const on = i < nAnt;
              const dist = Math.hypot(ax, ay);
              return on ? (
                <path key={i} d={wobEllipse(ax, ay, dist, dist, `ac${i}${b}`, 0.02)} fill="none" stroke={CHIP_COLORS[i + 1]} strokeWidth={6} strokeDasharray="16 12" opacity={0.9} />
              ) : null;
            })}
            <path d={wobEllipse(0, 0, Math.max(14, rv * (d.escala_error ?? 1)), Math.max(14, rv * (d.escala_error ?? 1)), `az${b}`, 0.05)} fill="rgba(228,87,46,0.35)" stroke={C.red} strokeWidth={6} />
            <circle r={12} fill={C.blue} stroke={C.ink} strokeWidth={4} />
          </Svg>
          {[[-180, -90], [150, -170], [60, 190]].map(([ax, ay], i) =>
            i < nAnt ? (
              <div key={i} style={{position: 'absolute', left: ax - 50, top: ay - 80, scale: `${pop(t, k >= 0 ? ts[Math.min(k, i)] : t0, 0.4)}`}}>
                <Icono nombre="antena" tam={100} />
              </div>
            ) : null,
          )}
          <Caja x={0} y={340} seed="are" bg={C.yellow} rotate={2} style={{padding: '4px 22px', fontSize: 44}}>
            {res.nombre ?? 'Error'}: ±{fmt(rv, res.decimales ?? 0)}{res.sufijo ?? ''}
          </Caja>
        </div>
      ) : (
        <div style={{position: 'absolute', left: visX, top: visY + 80, scale: `${pop(t, t0 + 0.2, 0.45)}`}}>
          <Svg>
            <path d="M-250 0 A250 250 0 0 1 250 0 Z" fill={C.paper} stroke={C.ink} strokeWidth={8} />
            {Array.from({length: 11}, (_, i) => {
              const a = Math.PI + (i / 10) * Math.PI;
              return <path key={i} d={`M${Math.cos(a) * 210} ${Math.sin(a) * 210} L${Math.cos(a) * 240} ${Math.sin(a) * 240}`} stroke={C.ink} strokeWidth={5} />;
            })}
            <g transform={`rotate(${-90 + 180 * Math.min(1, Math.max(0, (rv - (res.min ?? 0)) / ((res.max ?? 100) - (res.min ?? 0) || 1)))})`}>
              <path d={wobLine([0, 0], [0, -220], `gn${b}`, 1)} stroke={C.red} strokeWidth={12} strokeLinecap="round" />
            </g>
            <circle r={20} fill={C.ink} />
          </Svg>
          <Grande x={0} y={90} size={96} color={col(res.color, C.green)} rotate={-3}>
            {res.prefijo ?? ''}
            {fmt(rv, res.decimales ?? 0)}
            {res.sufijo ?? ''}
          </Grande>
          {res.nombre && (
            <Caja x={0} y={190} seed="grn" bg={C.paper} rotate={2} style={{padding: '2px 18px', fontSize: 38}}>
              {res.nombre}
            </Caja>
          )}
        </div>
      )}
      {k >= 0 && pasos[k].texto && (
        <Caja x={z.x} y={z.vertical ? z.VH * 0.08 + 90 : 960} seed={`ept${k}`} bg={C.paper} scale={pop(t, ts[k] + 0.3, 0.35)} rotate={-2} style={{padding: '4px 24px', fontSize: 44}}>
          {pasos[k].texto}
        </Caja>
      )}
    </>
  );
};

// ═════════════════════════ registro y SFX ═════════════════════════
export const FORMATOS: Record<string, DefEscena> = {
  capas: {
    descripcion: 'Así funciona por dentro: zoom progresivo capa a capa (cada capa con icono, título y etiqueta) y barra de profundidad',
    render: Capas,
    sfx: (d, t0) => {
      const base = typeof d.actual === 'number' ? d.actual : -1;
      const c: Cue[] = [['whoosh', t0, 0.7]];
      (d.capas ?? []).forEach((x: any, i: number) => {
        if (i <= base) return;
        const ta = at(x.al, t0 + 0.2 + i * 1.5);
        if (i > 0) c.push(['caida', ta - 0.15, 0.8], ['glitch', ta + 0.05, 0.35]);
        c.push(['pop', ta + 0.35, 0.9]);
      });
      return c;
    },
  },
  viaje: {
    descripcion: 'Viaje de A a B: un viajero (sobre, paquete, euro…) recorre un circuito de paradas; "actual" marca hasta dónde llega',
    render: Viaje,
    sfx: (d, t0) => {
      const ta = at(d.al, t0 + 0.8);
      const v = d.duracion_tramo ?? 0.8;
      const c: Cue[] = [['whoosh_suave', t0, 0.6]];
      if ((d.actual ?? 1) > 0) c.push(['swoosh', ta - v, 0.8], ['pasos', ta - v + 0.05, 0.4], ['pop', ta, 1], ['ding2', ta + 0.05, 0.6]);
      return c;
    },
  },
  combate: {
    descripcion: 'X contra Y en un ring: barras de vida, asaltos con ganador (¡POW!), marcador y campeón final',
    render: Combate,
    sfx: (d, t0) => {
      const c: Cue[] = [['gente', t0, 0.6], ['ding', t0 + 0.3, 0.9], ['ding', t0 + 0.5, 0.9], ['ding', t0 + 0.7, 0.9]];
      (d.asaltos ?? []).forEach((a: any, i: number) => {
        const ta = at(a.al, t0 + 1 + i * 2);
        c.push(['whoosh', ta - 0.25, 0.7], [a.ganador === 'empate' ? 'boing' : 'golpe', ta, 1], ['boom', ta + 0.02, 0.5]);
      });
      if (typeof d.ganador_al === 'number') c.push(['triunfo', d.ganador_al, 1], ['gente', d.ganador_al + 0.1, 0.8]);
      return c;
    },
  },
  reloj: {
    descripcion: '¿Qué pasaría si…?: reloj que corre de "desde" a "hasta" minutos, rótulo del momento, medidor de caos y sucesos',
    render: Reloj,
    sfx: (d, t0) => {
      const ta = at(d.al, t0 + 0.2);
      const dur = d.dur ?? 1.4;
      const c: Cue[] = [['reloj', ta, 0.9]];
      for (let x = ta; x < ta + dur; x += 0.12) c.push(['tick', x, 0.5]);
      c.push(['golpe', ta + dur, 0.8]);
      if ((d.caos ?? 0) > 70) c.push(['alerta', ta + dur + 0.1, 0.6]);
      (d.sucesos ?? []).forEach((e: any, i: number) => c.push(['pop', at(e.al, ta + dur + 0.3 + i * 0.6), 0.9]));
      (d.sucesos ?? []).forEach((e: any) => typeof e.tachar_al === 'number' && c.push(['golpe_seco', e.tachar_al, 0.8]));
      return c;
    },
  },
  tier_list: {
    descripcion: 'Tier list S/A/B/C/D que se llena: cada ficha (icono + texto) vuela a su fila en su momento',
    render: TierList,
    sfx: (d, t0) => [
      ['whoosh', t0, 0.7],
      ...(d.items ?? []).flatMap((it: any, i: number): Cue[] => {
        const ti = at(it.al, t0 + 0.6 + i * 0.7);
        return [['swoosh', ti - 0.45, 0.7], ['golpe_seco', ti, 0.9], ...(it.fila === 'S' ? ([['exito', ti + 0.05, 0.7]] as Cue[]) : [])];
      }),
    ],
  },
  mito_verdad: {
    descripcion: 'Mito o verdad completo: afirmación, aguja que duda, veredicto (mito, verdad o medias) con sello y pistas',
    render: MitoVerdad,
    sfx: (d, t0) => {
      const tv = at(d.al, t0 + 3);
      const c: Cue[] = [['pregunta', t0, 0.8], ['pop', at(d.afirmacion_al, t0 + 0.2), 0.8]];
      for (let x = t0 + 0.8; x < tv - 1.2; x += 0.75) c.push(['tick', x, 0.6]);
      c.push(['tension', Math.max(t0, tv - 1.6), 0.6], ['sello', tv, 1.3], ['boom', tv, 0.8]);
      (d.pistas ?? []).forEach((p: any, i: number) => c.push(['pop', at(p.al, tv + 0.8 + i * 0.7), 0.9]));
      return c;
    },
  },
  linea_tiempo: {
    descripcion: 'Línea del tiempo que se desplaza para centrar cada hito (fecha, icono y texto)',
    render: LineaTiempo,
    sfx: (d, t0) => [
      ['whoosh_suave', t0, 0.6],
      ...(d.hitos ?? []).flatMap((h: any, i: number): Cue[] => {
        const th = at(h.al, t0 + 0.4 + i * 1.6);
        return [['whoosh_suave', th - 0.3, 0.6], ['pop', th, 1], ['pagina', th + 0.15, 0.5]];
      }),
    ],
  },
  experimento: {
    descripcion: 'Experimento o simulación: deslizadores que cambian en cada paso y un resultado (medidor o antenas que triangulan)',
    render: Experimento,
    sfx: (d, t0) => {
      const c: Cue[] = [['click', t0 + 0.1, 0.8]];
      (d.pasos ?? []).forEach((p: any, i: number) => {
        const tp = at(p.al, t0 + 0.6 + i * 1.5);
        c.push(['click', tp, 0.9], ['engranaje', tp + 0.05, 0.4], ['tick', tp + 0.2, 0.6], ['tick', tp + 0.4, 0.6], ['ding', tp + 0.62, 0.8]);
      });
      return c;
    },
  },
};
