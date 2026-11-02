/**
 * BIBLIOTECA DE ESCENAS del motor. Cada escena se parametriza SOLO con datos del plano y trae sus SFX.
 *
 *   ESCENAS[tipo].render({d, t, t0, t1})   → lo que se ve
 *   ESCENAS[tipo].sfx(d, t0, t1)            → [efecto, segundo, volumen] que suenan con ella
 *
 * Los tiempos de `d` ya vienen en segundos (scripts/motor_plano.py resuelve "@palabra" con words.json).
 * Tipos: lista · flujo · comparativa · cifra · grafica · chat · por_dentro · mapa · sello · pantalla ·
 *        dinero · pregunta · texto · iconos   (el fondo de rayos y la cortinilla van en MotorPlano).
 */
import React from 'react';
import {random, useVideoConfig} from 'remotion';
import {C, CHIP_COLORS, col, decay, easeInOut, easeOut, fmt, FONT, jit, lerp, overshoot, pop, ramp, span, useBoil, wobEllipse, wobLine, wobPoly, wobRect} from './base';
import {Icono} from './Iconos';
import {MonedaBTC} from './Mono';
import {Caja, Flecha, Grande, Rafaga} from './piezas';

export type Cue = [string, number, number?];
export type EscenaProps = {d: any; t: number; t0: number; t1: number};
export type DefEscena = {render: React.FC<EscenaProps>; sfx: (d: any, t0: number, t1: number) => Cue[]; descripcion: string};

type Zona = {x: number; y: number; w: number};
const ZONAS: Record<string, Zona> = {
  centro: {x: 960, y: 400, w: 1300},
  arriba: {x: 960, y: 300, w: 1500},
  der: {x: 1290, y: 420, w: 980},
  izq: {x: 630, y: 420, w: 980},
  abajo: {x: 960, y: 700, w: 1400},
};
// Zonas del formato vertical (9:16, 1080x1920): los gráficos van en la mitad de arriba y los
// personajes abajo (suelo en el 0,93 del alto), como en el Short de referencia.
const ZONAS_V: Record<string, Zona> = {
  centro: {x: 540, y: 640, w: 960},
  arriba: {x: 540, y: 440, w: 980},
  der: {x: 790, y: 640, w: 500},
  izq: {x: 290, y: 640, w: 500},
  abajo: {x: 540, y: 940, w: 960},
};
const zona = (d: any): Zona => {
  const {width, height} = useVideoConfig();
  const Z = height > width ? ZONAS_V : ZONAS;
  return {...(Z[d.zona] ?? Z.centro), ...(d.caja ?? {})};
};
const at = (v: any, def: number) => (typeof v === 'number' ? v : def);

// ───────────────────────── lista ("Número X") ─────────────────────────
const Lista: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona({zona: 'centro', ...d});
  const c = col(d.color, C.yellow);
  const tt = at(d.titulo_al, t0 + 0.55);
  const ta = at(d.apodo_al, tt + 0.6);
  const n = d.n ?? 1;
  const total = d.total ?? 10;
  const p = pop(t, t0, 0.5);
  const b = useBoil();
  return (
    <>
      {/* tira de progreso 1..total */}
      <div style={{position: 'absolute', left: z.x, top: 70, translate: '-50% 0', display: 'flex', gap: 14, scale: `${ramp(t, t0, 0.3)}`}}>
        {Array.from({length: total}, (_, i) => {
          const on = i + 1 <= n;
          const cur = i + 1 === n;
          return (
            <div
              key={i}
              style={{
                width: cur ? 58 : 40,
                height: cur ? 58 : 40,
                borderRadius: '50%',
                border: `5px solid ${C.ink}`,
                background: cur ? c : on ? C.ink : C.paper,
                color: cur ? C.ink : C.paper,
                fontFamily: FONT,
                fontSize: cur ? 30 : 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scale: cur ? `${pop(t, t0 + 0.15, 0.4)}` : '1',
                alignSelf: 'center',
              }}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
      {/* estrella con el número */}
      <svg width={520} height={520} viewBox="-260 -260 520 520" style={{position: 'absolute', left: z.x - 260 - 330, top: z.y - 240, scale: `${p}`, rotate: `${(t - t0) * 20}deg`, overflow: 'visible'}}>
        <path
          d={wobPoly(
            Array.from({length: 24}, (_, i) => {
              const r = i % 2 ? 150 : 215;
              const a = (i / 24) * Math.PI * 2;
              return [Math.cos(a) * r, Math.sin(a) * r] as [number, number];
            }),
            `star${b}`,
            4,
            true,
          )}
          fill={c}
          stroke={C.ink}
          strokeWidth={8}
        />
      </svg>
      <Grande x={z.x - 330} y={z.y + 20} size={250} color={C.paper} scale={pop(t, t0 + 0.08, 0.45)} rotate={-6}>
        {n}
      </Grande>
      <Grande x={z.x - 70} y={z.y - 60} size={d.titulo && d.titulo.length > 16 ? 70 : 92} color={C.paper} scale={pop(t, tt, 0.4)} rotate={-2} style={{translate: '0 -50%', transformOrigin: '0% 50%'}}>
        {d.titulo}
      </Grande>
      {d.apodo && (
        <Caja x={z.x - 50} y={z.y + 70} seed={`ap${n}`} bg={c} scale={pop(t, ta, 0.4)} rotate={3} style={{translate: '0 -50%', transformOrigin: '0% 50%', padding: '8px 30px', fontSize: 56}}>
          {d.apodo}
        </Caja>
      )}
      <Rafaga t={t} t0={t0 + 0.1} x={z.x - 330} y={z.y} n={18} />
    </>
  );
};

// ───────────────────────── flujo ─────────────────────────
const Flujo: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const nodos: any[] = d.nodos ?? [];
  const n = nodos.length;
  const ciclo = d.forma === 'ciclo';
  const pos = nodos.map((_, i) => {
    if (ciclo) {
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
      return [z.x + Math.cos(a) * z.w * 0.32, z.y + 20 + Math.sin(a) * 200] as [number, number];
    }
    const step = n > 1 ? (z.w - 260) / (n - 1) : 0;
    return [z.x - (z.w - 260) / 2 + i * step, z.y + (i % 2 ? 40 : -40)] as [number, number];
  });
  const ti = nodos.map((nd, i) => at(nd.al, t0 + 0.2 + i * 0.7));
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.y - 230} size={64} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.4)}>
          {d.titulo}
        </Grande>
      )}
      {nodos.map((nd, i) => {
        if (i === 0 && !ciclo) return null;
        const a = pos[i - 1] ?? pos[n - 1];
        const bb = pos[i];
        const pr = ramp(t, ti[i] - 0.35, 0.35, easeInOut);
        const k = 0.62;
        const A: [number, number] = [lerp(bb[0], a[0], k), lerp(bb[1], a[1], k)];
        const B: [number, number] = [lerp(a[0], bb[0], k), lerp(a[1], bb[1], k)];
        return i === 0 ? null : <Flecha key={i} a={A} b={B} p={pr} curva={ciclo ? 40 : 30} seed={`fl${i}`} />;
      })}
      {ciclo && n > 2 && (
        <Flecha
          a={[lerp(pos[0][0], pos[n - 1][0], 0.62), lerp(pos[0][1], pos[n - 1][1], 0.62)]}
          b={[lerp(pos[n - 1][0], pos[0][0], 0.62), lerp(pos[n - 1][1], pos[0][1], 0.62)]}
          p={ramp(t, at(d.cierra_al, ti[n - 1] + 0.5), 0.4, easeInOut)}
          curva={40}
          seed="flc"
        />
      )}
      {nodos.map((nd, i) => (
        <div key={i} style={{position: 'absolute', left: pos[i][0], top: pos[i][1], scale: `${pop(t, ti[i], 0.4)}`}}>
          {nd.icono && (
            <div style={{position: 'absolute', left: -75, top: -190 + Math.sin(t * 4 + i) * 6}}>
              <Icono nombre={nd.icono} tam={150} color={nd.color_icono ? col(nd.color_icono) : undefined} />
            </div>
          )}
          <Caja x={0} y={0} seed={`fn${i}`} bg={col(nd.color, CHIP_COLORS[i % 6])} rotate={jit(`fr${i}`, 4)} style={{padding: '10px 26px', fontSize: nd.texto?.length > 14 ? 38 : 46}}>
            {nd.texto}
          </Caja>
        </div>
      ))}
    </>
  );
};

// ───────────────────────── comparativa A vs B ─────────────────────────
const Lado: React.FC<{s: any; x: number; y: number; t: number; t0: number; gana: boolean; pierde: boolean; seed: string; tg: number}> = ({s, x, y, t, t0, gana, pierde, seed, tg}) => {
  const p = pop(t, t0, 0.45);
  const g = ramp(t, tg, 0.3);
  const sh = pierde ? Math.sin((t - tg) * 40) * 10 * decay(t, tg, 4) : 0;
  return (
    <div style={{position: 'absolute', left: x + sh, top: y, scale: `${p * (gana ? 1 + 0.08 * g : 1)}`, opacity: pierde ? 1 - 0.45 * g : 1}}>
      <Caja x={0} y={0} w={440} h={400} seed={seed} bg={col(s.color, C.paper)} rotate={jit(seed, 4)} style={{flexDirection: 'column', gap: 10, whiteSpace: 'normal', textAlign: 'center'}}>
        {s.icono && <Icono nombre={s.icono} tam={150} />}
        <div style={{fontSize: s.titulo?.length > 14 ? 40 : 50, lineHeight: 1.05, padding: '0 16px'}}>{s.titulo}</div>
        {s.valor && <div style={{fontSize: 62, color: C.ink, background: C.paper, border: `5px solid ${C.ink}`, borderRadius: 14, padding: '0 16px'}}>{s.valor}</div>}
      </Caja>
      {gana && g > 0 && (
        <div style={{position: 'absolute', left: 150, top: -230, scale: `${pop(t, tg, 0.4)}`}}>
          <Grande x={0} y={0} size={120} color={C.green} rotate={12}>
            ✓
          </Grande>
        </div>
      )}
      {pierde && g > 0 && (
        <Grande x={0} y={0} size={260} color={C.red} scale={pop(t, tg, 0.3)} rotate={-8} opacity={0.9}>
          ✗
        </Grande>
      )}
    </div>
  );
};
const Comparativa: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const ta = at(d.a?.al, t0 + 0.1);
  const tb = at(d.b?.al, ta + 0.8);
  const tv = at(d.vs_al, (ta + tb) / 2);
  const tg = at(d.ganador_al, 1e9);
  const dx = Math.min(330, z.w / 2 - 200);
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.y - 260} size={60} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.4)}>
          {d.titulo}
        </Grande>
      )}
      <Lado s={d.a ?? {}} x={z.x - dx} y={z.y + 20} t={t} t0={ta} gana={d.ganador === 'a'} pierde={d.ganador === 'b'} seed="ca" tg={tg} />
      <Lado s={d.b ?? {}} x={z.x + dx} y={z.y + 20} t={t} t0={tb} gana={d.ganador === 'b'} pierde={d.ganador === 'a'} seed="cb" tg={tg} />
      <Grande x={z.x} y={z.y + 20} size={110} color={C.red} scale={pop(t, tv, 0.35)} rotate={-10 + Math.sin(t * 8) * 4}>
        VS
      </Grande>
    </>
  );
};

// ───────────────────────── cifra gigante / contador ─────────────────────────
const Cifra: React.FC<EscenaProps> = ({d, t, t0, t1}) => {
  const z = zona(d);
  const ta = at(d.al, t0 + 0.1);
  const dur = d.dur ?? Math.min(1.6, Math.max(0.6, t1 - ta - 0.4));
  const p = ramp(t, ta, dur, easeInOut);
  const desde = d.desde ?? 0;
  const hasta = d.hasta ?? 0;
  const v = d.log && desde > 0 && hasta > 0 ? Math.exp(lerp(Math.log(desde), Math.log(hasta), p)) : lerp(desde, hasta, p);
  const done = t >= ta + dur;
  const baja = d.flecha === 'baja' || (d.flecha !== 'sube' && hasta < desde);
  const c = col(d.color, baja ? C.red : C.green);
  const s = done ? 1 + 0.15 * decay(t, ta + dur, 5) : 1;
  const txt = `${d.prefijo ?? ''}${fmt(v, d.decimales ?? 0)}${d.sufijo ?? ''}`;
  const size = d.tam ?? (txt.length > 9 ? 170 : 210);
  return (
    <>
      {d.antes && (
        <Grande x={z.x} y={z.y - size * 0.85} size={58} color={C.paper} scale={pop(t, t0, 0.35)} rotate={-2}>
          {d.antes}
        </Grande>
      )}
      <Grande x={z.x + (done ? 0 : Math.sin(t * 70) * 3)} y={z.y} size={size} color={c} scale={pop(t, d.desde !== d.hasta ? Math.max(t0, ta - 0.3) : t0, 0.4) * s} rotate={-3}>
        {txt}
      </Grande>
      {d.flecha && (
        <div style={{position: 'absolute', left: z.x + txt.length * size * 0.33 + 40, top: z.y - 90, scale: `${pop(t, ta + dur * 0.6, 0.35)}`, rotate: baja ? '180deg' : '0deg'}}>
          <svg width={150} height={180} viewBox="-75 -90 150 180" style={{overflow: 'visible'}}>
            <path d={wobPoly([[0, -85], [65, 0], [25, 0], [25, 85], [-25, 85], [-25, 0], [-65, 0]], `ar${Math.floor(t * 7.5)}`, 3, true)} fill={c} stroke={C.ink} strokeWidth={8} />
          </svg>
        </div>
      )}
      {d.etiqueta && (
        <Caja x={z.x} y={z.y + size * 0.78} seed="cif" bg={C.paper} scale={pop(t, at(d.etiqueta_al, ta + 0.3), 0.35)} rotate={2} style={{padding: '6px 26px', fontSize: 48}}>
          {d.etiqueta}
        </Caja>
      )}
      {done && <Rafaga t={t} t0={ta + dur} x={z.x} y={z.y} n={14} colors={[c, C.yellow, C.paper]} />}
    </>
  );
};

// ───────────────────────── gráfica que se dibuja ─────────────────────────
const Grafica: React.FC<EscenaProps> = ({d, t, t0, t1}) => {
  const z = zona(d);
  const b = useBoil();
  const pts: any[] = d.puntos ?? [];
  const n = pts.length;
  const W = d.ancho ?? Math.min(z.w, 1250);
  const H = d.alto ?? 440;
  const x0 = z.x - W / 2;
  const y0 = z.y - H / 2 + 30;
  const vals = pts.map((p) => p.v as number);
  const ymin = d.ymin ?? Math.min(...vals) * 0.85;
  const ymax = d.ymax ?? Math.max(...vals) * 1.08;
  const X = (i: number) => x0 + 60 + (n > 1 ? (i / (n - 1)) * (W - 120) : 0);
  const Y = (v: number) => y0 + H - ((v - ymin) / (ymax - ymin || 1)) * H;
  // momento en que la línea llega a cada punto
  const tStart = at(d.al, t0 + 0.3);
  const tEnd = at(d.hasta_al, Math.max(tStart + 0.8, t1 - 0.4));
  const tp = pts.map((p, i) => at(p.al, lerp(tStart, tEnd, n > 1 ? i / (n - 1) : 1)));
  for (let i = 1; i < n; i++) tp[i] = Math.max(tp[i], tp[i - 1] + 0.05);
  // progreso continuo en "índice"
  let prog = 0;
  if (t >= tp[n - 1]) prog = n - 1;
  else
    for (let i = 1; i < n; i++)
      if (t < tp[i]) {
        prog = i - 1 + ramp(t, tp[i - 1], tp[i] - tp[i - 1], d.dibujo === 'lineal' ? (x: number) => x : easeInOut);
        break;
      }
  if (t < tp[0]) prog = -1;
  const iFull = Math.floor(prog);
  const frac = prog - iFull;
  const drawn: [number, number][] = [];
  for (let i = 0; i <= Math.min(iFull, n - 1); i++) drawn.push([X(i), Y(vals[i])]);
  let head: [number, number] | null = drawn.length ? drawn[drawn.length - 1] : null;
  let headV = iFull >= 0 ? vals[Math.min(iFull, n - 1)] : vals[0];
  if (iFull >= 0 && iFull < n - 1 && frac > 0) {
    const hx = lerp(X(iFull), X(iFull + 1), frac);
    headV = lerp(vals[iFull], vals[iFull + 1], frac);
    head = [hx, Y(headV)];
    drawn.push(head);
  }
  const seg = (i: number) => (vals[i + 1] < vals[i] ? C.red : C.green);
  // `tipo` lo consume el plano (tipo de escena), así que desde plano.json las barras se piden con forma: 'barras'
  const barras = d.tipo === 'barras' || d.forma === 'barras';
  const fmtV = (v: number) => `${d.prefijo ?? ''}${fmt(v, d.decimales ?? 0)}${d.sufijo ?? ''}`;
  const vis = ramp(t, t0, 0.3);
  return (
    <div style={{position: 'absolute', inset: 0, opacity: vis}}>
      {/* papel de la gráfica */}
      <Caja x={z.x} y={y0 + H / 2 + 5} w={W + 60} h={H + 190} seed="gr" bg="rgba(255,255,255,0.92)" scale={pop(t, t0, 0.4)} />
      {d.titulo && (
        <Grande x={z.x} y={y0 - 40} size={50} color={col(d.color, C.yellow)} scale={pop(t, t0 + 0.1, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
        {/* ejes */}
        <path d={`${wobLine([x0 + 30, y0 - 10], [x0 + 30, y0 + H + 20], `ay${b}`, 1.5)} ${wobLine([x0 + 30, y0 + H + 20], [x0 + W - 10, y0 + H + 20], `ax${b}`, 1.5)}`} fill="none" stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
        {barras
          ? pts.map((p, i) => {
              const g = ramp(t, tp[i] - 0.25, 0.4, overshoot);
              const bw = Math.min(110, (W - 140) / n - 20);
              const h = (y0 + H + 20 - Y(vals[i])) * g;
              return h > 1 ? <path key={i} d={wobRect(X(i) - bw / 2, y0 + H + 20 - h, bw, h, `bar${i}${b}`, 2, 8)} fill={col(p.color, CHIP_COLORS[i % 6])} stroke={C.ink} strokeWidth={6} /> : null;
            })
          : drawn.length > 1 &&
            drawn.slice(0, -1).map((a, i) => (
              <path key={i} d={wobPoly([a, drawn[i + 1]], `ln${i}${b}`, 1.2)} fill="none" stroke={d.color_linea ? col(d.color_linea) : seg(i)} strokeWidth={13} strokeLinecap="round" />
            ))}
        {!barras &&
          pts.map((p, i) =>
            i <= iFull ? <circle key={i} cx={X(i)} cy={Y(vals[i])} r={10} fill={C.paper} stroke={C.ink} strokeWidth={5} style={{scale: `${pop(t, tp[i], 0.3)}`, transformOrigin: `${X(i)}px ${Y(vals[i])}px`}} /> : null,
          )}
      </svg>
      {/* etiquetas del eje x */}
      {pts.map((p, i) =>
        p.e ? (
          <div key={i} style={{position: 'absolute', left: X(i), top: y0 + H + 34, translate: '-50% 0', fontFamily: FONT, fontSize: 30, color: C.ink, opacity: ramp(t, tp[i] - 0.2, 0.2), whiteSpace: 'nowrap'}}>
            {p.e}
          </div>
        ) : null,
      )}
      {/* valores de barras / puntos marcados */}
      {pts.map((p, i) =>
        (barras || p.valor_visible) && t >= tp[i] ? (
          <div key={`v${i}`} style={{position: 'absolute', left: X(i), top: Y(vals[i]) - 64, translate: '-50% 0', fontFamily: FONT, fontSize: 36, color: C.ink, background: C.paper, border: `4px solid ${C.ink}`, borderRadius: 10, padding: '0 10px', scale: `${pop(t, tp[i], 0.3)}`, whiteSpace: 'nowrap'}}>
            {fmtV(vals[i])}
          </div>
        ) : null,
      )}
      {/* cabeza: moneda que corre con el valor */}
      {!barras && head && prog < n - 0.001 + 1 && (
        <>
          <svg style={{position: 'absolute', left: head[0], top: head[1], overflow: 'visible'}} width={1} height={1}>
            <g transform={`rotate(${(t * 180) % 360})`}>
              <MonedaBTC r={28} b={b} id="gh" />
            </g>
          </svg>
          {d.valor_cabeza !== false && (
            <div
              style={{
                position: 'absolute',
                left: head[0] + 40,
                top: head[1] - 70,
                fontFamily: FONT,
                fontSize: 44,
                color: C.paper,
                background: iFull >= 0 && iFull < n - 1 ? seg(iFull) : C.ink,
                border: `5px solid ${C.ink}`,
                borderRadius: 12,
                padding: '2px 14px',
                whiteSpace: 'nowrap',
              }}
            >
              {fmtV(headV)}
            </div>
          )}
        </>
      )}
      {/* marcas: bocadillos anclados a un punto */}
      {(d.marcas ?? []).map((m: any, k: number) => {
        const i = Math.min(n - 1, m.i ?? 0);
        const tm = at(m.al, tp[i]);
        const pm = pop(t, tm, 0.4);
        if (pm <= 0) return null;
        const up = m.abajo ? 1 : -1;
        return (
          <React.Fragment key={k}>
            <Caja x={X(i)} y={Y(vals[i]) + up * 120} seed={`mk${k}`} bg={col(m.color, C.yellow)} scale={pm} rotate={jit(`mk${k}`, 5)} style={{padding: '6px 18px', fontSize: 38}}>
              {m.texto}
            </Caja>
            <Rafaga t={t} t0={tm} x={X(i)} y={Y(vals[i])} n={10} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ───────────────────────── chat / tuit ─────────────────────────
const Chat: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const msgs: any[] = d.mensajes ?? [];
  if (d.estilo === 'tuit') {
    const m = msgs[0] ?? {};
    const tm = at(m.al, t0 + 0.1);
    const likes = Math.floor(lerp(0, d.likes ?? 98000, ramp(t, tm + 0.4, 1.8)));
    return (
      <Caja x={z.x} y={z.y} w={Math.min(900, z.w)} seed="tw" bg={C.paper} scale={pop(t, tm, 0.45)} rotate={-2} style={{flexDirection: 'column', alignItems: 'flex-start', padding: '26px 34px', gap: 14, whiteSpace: 'normal'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, fontSize: 38}}>
          <div style={{width: 74, height: 74, borderRadius: '50%', background: col(d.color, C.blue), border: `5px solid ${C.ink}`}} />
          <div>
            <div>{d.autor ?? 'Alguien famoso'}</div>
            <div style={{fontSize: 26, color: C.grey}}>{d.usuario ?? '@usuario'}</div>
          </div>
        </div>
        <div style={{fontSize: 50, lineHeight: 1.15}}>{m.texto}</div>
        <div style={{fontSize: 34, color: C.red}}>♥ {fmt(likes)}</div>
      </Caja>
    );
  }
  return (
    <>
      {msgs.map((m, i) => {
        const tm = at(m.al, t0 + 0.2 + i * 0.8);
        const der = m.lado === 'der';
        const y = z.y - 180 + i * 130;
        return (
          <Caja
            key={i}
            x={z.x + (der ? z.w * 0.18 : -z.w * 0.18)}
            y={y}
            seed={`ch${i}`}
            bg={col(m.color, der ? C.green : C.paper)}
            scale={pop(t, tm, 0.4)}
            rotate={jit(`chr${i}`, 3)}
            style={{padding: '14px 28px', fontSize: 44, maxWidth: z.w * 0.6, whiteSpace: 'normal', textAlign: 'left'}}
          >
            {m.texto}
          </Caja>
        );
      })}
    </>
  );
};

// ───────────────────────── por dentro (lupa + mecanismo) ─────────────────────────
const Engranaje: React.FC<{r: number; dientes: number; rot: number; color: string; seed: string}> = ({r, dientes, rot, color, seed}) => {
  const b = useBoil();
  const pts: [number, number][] = [];
  for (let i = 0; i < dientes * 2; i++) {
    const a = (i / (dientes * 2)) * Math.PI * 2;
    const rr = i % 2 ? r * 0.8 : r;
    pts.push([Math.cos(a - 0.12) * rr, Math.sin(a - 0.12) * rr], [Math.cos(a + 0.12) * rr, Math.sin(a + 0.12) * rr]);
  }
  return (
    <g transform={`rotate(${rot})`}>
      <path d={wobPoly(pts, `${seed}${b}`, 1.5, true)} fill={color} stroke={C.ink} strokeWidth={7} />
      <circle r={r * 0.25} fill={C.paper} stroke={C.ink} strokeWidth={6} />
    </g>
  );
};
const PorDentro: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const zoom = ramp(t, t0, 0.6, overshoot);
  const R = 300;
  const piezas: any[] = d.piezas ?? [];
  const rot = (t - t0) * 90;
  return (
    <>
      <div style={{position: 'absolute', left: z.x, top: z.y + 40, scale: `${zoom}`, translate: '-50% -50%', width: R * 2, height: R * 2}}>
        <svg width={R * 2} height={R * 2} viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`} style={{overflow: 'visible'}}>
          <defs>
            <clipPath id="lente">
              <circle r={R - 14} />
            </clipPath>
          </defs>
          <circle r={R - 14} fill={col(d.fondo, '#FFF4D6')} />
          <g clipPath="url(#lente)">
            <g transform="translate(-90 -40)">
              <Engranaje r={120} dientes={10} rot={rot} color={col(d.color, C.orange)} seed="e1" />
            </g>
            <g transform="translate(110 70)">
              <Engranaje r={90} dientes={8} rot={-rot * 1.33 + 11} color={C.blue} seed="e2" />
            </g>
            <g transform="translate(60 -150)">
              <Engranaje r={60} dientes={6} rot={-rot * 2 + 5} color={C.green} seed="e3" />
            </g>
            {d.icono && (
              <g transform="translate(-10 150)">
                <foreignObject x={-80} y={-80} width={160} height={160}>
                  <Icono nombre={d.icono} tam={160} />
                </foreignObject>
              </g>
            )}
          </g>
          <circle r={R - 14} fill="none" stroke={C.ink} strokeWidth={22} />
          <circle r={R - 14} fill="none" stroke={C.grey} strokeWidth={10} />
          <path d={`M${R * 0.7} ${R * 0.7} L${R * 1.15} ${R * 1.15}`} stroke={C.ink} strokeWidth={60} strokeLinecap="round" />
          <path d={`M${R * 0.7} ${R * 0.7} L${R * 1.15} ${R * 1.15}`} stroke="#7A4B2A" strokeWidth={44} strokeLinecap="round" />
        </svg>
      </div>
      {d.titulo && (
        <Grande x={z.x} y={z.y - R - 20} size={58} color={C.paper} scale={pop(t, t0 + 0.2, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      {piezas.map((p, i) => {
        const tp = at(p.al, t0 + 0.6 + i * 0.6);
        const side = i % 2 ? 1 : -1;
        return (
          <Caja key={i} x={z.x + side * (R + 170)} y={z.y - 120 + Math.floor(i / 2) * 150} seed={`pd${i}`} bg={col(p.color, CHIP_COLORS[(i + 1) % 6])} scale={pop(t, tp, 0.4)} rotate={jit(`pd${i}`, 5)} style={{padding: '8px 22px', fontSize: 40}}>
            {p.texto}
          </Caja>
        );
      })}
    </>
  );
};

// ───────────────────────── mapa / globo ─────────────────────────
const CONTINENTES: [number, number][][] = [
  // América
  [[-0.95, -0.55], [-0.6, -0.7], [-0.45, -0.45], [-0.55, -0.15], [-0.4, 0.05], [-0.3, 0.35], [-0.42, 0.75], [-0.55, 0.5], [-0.7, 0.1], [-0.85, -0.2]],
  // Europa + África
  [[-0.05, -0.6], [0.2, -0.65], [0.25, -0.4], [0.1, -0.3], [0.3, -0.1], [0.35, 0.3], [0.15, 0.65], [0.0, 0.3], [-0.12, 0.0], [-0.1, -0.35]],
  // Asia
  [[0.3, -0.7], [0.9, -0.65], [1.0, -0.3], [0.8, -0.05], [0.65, 0.05], [0.5, -0.15], [0.35, -0.35]],
  // Oceanía
  [[0.75, 0.35], [0.98, 0.4], [0.95, 0.6], [0.78, 0.6]],
];
const Mapa: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const b = useBoil();
  const R = d.radio ?? 270;
  const p = pop(t, t0, 0.5);
  const giro = d.rota === false ? 0 : ((t - t0) * 0.05) % 2;
  const tA = at(d.apagon?.al, 1e9);
  const dark = ramp(t, tA, 0.3);
  const pines: any[] = d.pines ?? [];
  return (
    <>
      <svg width={R * 2} height={R * 2} viewBox={`${-R} ${-R} ${R * 2} ${R * 2}`} style={{position: 'absolute', left: z.x - R, top: z.y + 40 - R, scale: `${p}`, overflow: 'visible'}}>
        <defs>
          <clipPath id="globo">
            <circle r={R} />
          </clipPath>
        </defs>
        <path d={wobEllipse(6, 8, R, R, `gl${b}`, 0.02)} fill={C.blue} />
        <g clipPath="url(#globo)">
          {[-2, 0, 2].map((off) =>
            CONTINENTES.map((cn, i) => (
              <path
                key={`${off}${i}`}
                d={wobPoly(cn.map(([x, y]) => [(x + off - giro) * R, y * R] as [number, number]), `cn${i}${off}${b}`, 3, true)}
                fill={d.apagon && i === (d.apagon.continente ?? 2) ? `rgb(${lerp(59, 40, dark)},${lerp(178, 40, dark)},${lerp(115, 50, dark)})` : C.green}
                stroke={C.ink}
                strokeWidth={5}
              />
            )),
          )}
        </g>
        <path d={wobEllipse(0, 0, R, R, `glo${b}`, 0.02)} fill="none" stroke={C.ink} strokeWidth={8} />
      </svg>
      {d.titulo && (
        <Grande x={z.x} y={z.y - R - 30} size={58} color={col(d.color, C.yellow)} scale={pop(t, t0 + 0.1, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      {pines.map((pn, i) => {
        const tp = at(pn.al, t0 + 0.5 + i * 0.5);
        const drop = ramp(t, tp, 0.45, overshoot);
        if (drop <= 0) return null;
        const px = z.x + (pn.x ?? 0) * R;
        const py = z.y + 40 + (pn.y ?? 0) * R;
        return (
          <div key={i} style={{position: 'absolute', left: px, top: py - (1 - drop) * 300}}>
            <svg width={60} height={90} viewBox="-30 -85 60 90" style={{position: 'absolute', left: -30, top: -85, overflow: 'visible'}}>
              <path d="M0 0 C-30 -40 -28 -80 0 -80 C28 -80 30 -40 0 0 Z" fill={col(pn.color, C.red)} stroke={C.ink} strokeWidth={5} />
              <circle cx={0} cy={-55} r={10} fill={C.paper} stroke={C.ink} strokeWidth={3} />
            </svg>
            {pn.nombre && (
              <Caja x={0} y={-130} seed={`pn${i}`} bg={C.paper} scale={drop} style={{padding: '4px 18px', fontSize: 38}}>
                {pn.nombre}
              </Caja>
            )}
          </div>
        );
      })}
    </>
  );
};

// ───────────────────────── sello ─────────────────────────
const Sello: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const ts = at(d.al, t0 + 0.2);
  const st = ramp(t, ts - 0.05, 0.18, (x) => x * x);
  if (st <= 0) return null;
  const c = col(d.color, C.red);
  return (
    <div
      style={{
        position: 'absolute',
        left: z.x,
        top: z.y,
        translate: '-50% -50%',
        scale: `${lerp(3.2, 1, st)}`,
        opacity: Math.min(1, st * 1.5),
        rotate: `${d.rot ?? -12}deg`,
        border: `16px solid ${c}`,
        borderRadius: 22,
        padding: '4px 40px',
        fontFamily: FONT,
        fontSize: d.tam ?? 150,
        color: c,
        letterSpacing: 6,
        background: 'rgba(255,255,255,0.86)',
        whiteSpace: 'nowrap',
        boxShadow: `0 0 0 6px rgba(255,255,255,0.86)`,
      }}
    >
      {d.texto}
    </div>
  );
};

// ───────────────────────── pantalla de móvil / ordenador ─────────────────────────
const Pantalla: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const b = useBoil();
  const movil = d.dispositivo !== 'ordenador';
  const W = movil ? 520 : 940;
  const H = movil ? 660 : 560;
  const p = pop(t, t0, 0.45);
  const lineas: any[] = d.lineas ?? [];
  const pr = d.precio;
  let precioV = 0;
  if (pr) precioV = lerp(pr.desde, pr.hasta, ramp(t, at(pr.al, t0 + 0.3), pr.dur ?? 1.2, easeInOut));
  const sparkN = 26;
  const spark = pr
    ? Array.from({length: sparkN}, (_, i) => lerp(pr.desde, precioV, i / (sparkN - 1)) + (i > 0 && i < sparkN - 1 ? jit(`sp${i}`, Math.abs(pr.hasta - pr.desde) * 0.05) : 0))
    : [];
  const vals = spark;
  const lo = pr ? Math.min(pr.desde, pr.hasta) * 0.95 : 0;
  const hi = pr ? Math.max(pr.desde, pr.hasta) * 1.03 : 1;
  const up = pr ? pr.hasta >= pr.desde : true;
  const cx = movil ? z.x : z.x;
  const top = z.y + 40 - H / 2;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, scale: `${p}`, transformOrigin: `${cx}px ${z.y}px`}}>
      <svg style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}} width={1} height={1}>
        {!movil && <path d={wobPoly([[cx - W / 2 - 60, top + H + 10], [cx + W / 2 + 60, top + H + 10], [cx + W / 2 + 100, top + H + 60], [cx - W / 2 - 100, top + H + 60]], `kb${b}`, 2, true)} fill={C.lightGrey} stroke={C.ink} strokeWidth={6} />}
        <path d={wobRect(cx - W / 2, top, W, H, `sc${b}`, 2.5, movil ? 46 : 18)} fill={C.ink} stroke={C.ink} strokeWidth={6} />
        <path d={wobRect(cx - W / 2 + 18, top + (movil ? 50 : 18), W - 36, H - (movil ? 90 : 36), `sci${b}`, 1.5, movil ? 22 : 8)} fill={col(d.fondo, C.paper)} />
      </svg>
      <div style={{position: 'absolute', left: cx - W / 2 + 34, top: top + (movil ? 70 : 34), width: W - 68, display: 'flex', flexDirection: 'column', gap: 16, fontFamily: FONT}}>
        {d.titulo && (
          <div style={{fontSize: movil ? 34 : 40, color: C.paper, background: col(d.color, d.app === 'alerta' ? C.red : C.blue), borderRadius: 12, padding: '8px 14px', border: `4px solid ${C.ink}`, textAlign: 'center'}}>
            {d.titulo}
          </div>
        )}
        {pr && (
          <>
            <div style={{fontSize: movil ? 66 : 80, color: up ? C.green : C.red, WebkitTextStroke: `2px ${C.ink}`, textAlign: 'center'}}>
              {pr.prefijo ?? '$'}
              {fmt(precioV)}
            </div>
            <svg width={W - 68} height={180} style={{overflow: 'visible'}}>
              <path
                d={wobPoly(vals.map((v, i) => [(i / (sparkN - 1)) * (W - 68), 170 - ((v - lo) / (hi - lo || 1)) * 160] as [number, number]), `spk${b}`, 1)}
                fill="none"
                stroke={up ? C.green : C.red}
                strokeWidth={9}
                strokeLinecap="round"
              />
            </svg>
          </>
        )}
        {lineas.map((l, i) => {
          const tl = at(l.al, t0 + 0.4 + i * 0.5);
          const pp = pop(t, tl, 0.35);
          return (
            <div
              key={i}
              style={{
                fontSize: l.tam ?? (movil ? 40 : 46),
                lineHeight: 1.15,
                color: C.ink,
                background: col(l.color, i % 2 ? '#F1F1F1' : C.yellow),
                border: `4px solid ${C.ink}`,
                borderRadius: 14,
                padding: '10px 16px',
                scale: `${pp}`,
                opacity: pp > 0 ? 1 : 0,
                transformOrigin: 'left center',
              }}
            >
              {l.texto}
            </div>
          );
        })}
      </div>
      {d.app === 'alerta' && t > t0 + 0.3 && (
        <Grande x={cx + W / 2 - 10} y={top + 20} size={120} color={C.red} scale={pop(t, t0 + 0.3, 0.3) * (1 + 0.08 * Math.sin(t * 16))} rotate={12}>
          !
        </Grande>
      )}
    </div>
  );
};

// ───────────────────────── dinero y monedas ─────────────────────────
const Dinero: React.FC<EscenaProps> = ({d, t, t0, t1}) => {
  const b = useBoil();
  const ta = at(d.al, t0);
  const tb = at(d.hasta, t1);
  const n = d.cantidad ?? 26;
  const modo = d.modo ?? 'lluvia';
  const z = zona(d);
  const {width: VW, height: VH} = useVideoConfig();
  const out: React.ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const delay = random(`dl${i}`) * Math.max(0.3, Math.min(1.6, tb - ta - 0.5));
    const life = t - ta - delay;
    if (life < 0) continue;
    const fade = 1 - ramp(t, tb - 0.25, 0.25);
    const btc = d.monedas === 'btc' || (d.monedas !== 'dolar' && i % 2 === 0);
    const billete = d.billetes !== false && i % 3 === 0;
    let x = 0;
    let y = 0;
    let r = 0;
    if (modo === 'lluvia') {
      x = 80 + random(`dx${i}`) * (VW - 160);
      y = -100 + life * (500 + random(`dv${i}`) * 400) * (VH / 1080);
      r = life * (200 + random(`dr${i}`) * 300) * (i % 2 ? 1 : -1);
      if (y > VH + 120) continue;
    } else if (modo === 'sube') {
      x = z.x + jit(`dx${i}`, z.w / 2);
      y = VH + 70 - life * (520 + random(`dv${i}`) * 300) * (VH / 1080);
      r = Math.sin(life * 5 + i) * 30;
      if (y < -150) continue;
    } else if (modo === 'escapa') {
      const a = -Math.PI / 2 + jit(`da${i}`, 1.2);
      const v = 600 + random(`dv${i}`) * 500;
      x = (d.desde_x ?? z.x) + Math.cos(a) * v * life + (d.hacia ?? 1) * 500 * life;
      y = (d.desde_y ?? 700) + Math.sin(a) * v * life + 600 * life * life;
      r = life * 400;
      if (y > VH + 170 || life > 2.2) continue;
    } else {
      // explota
      const a = (i / n) * Math.PI * 2;
      const v = 500 + random(`dv${i}`) * 500;
      const pp = easeOut(Math.min(1, life / 0.9));
      x = z.x + Math.cos(a) * v * pp;
      y = z.y + Math.sin(a) * v * pp + 400 * life * life;
      r = life * 500;
      if (life > 2) continue;
    }
    out.push(
      <div key={i} style={{position: 'absolute', left: x, top: y, rotate: `${r}deg`, opacity: fade}}>
        {billete ? (
          <svg width={150} height={80} viewBox="-75 -40 150 80" style={{position: 'absolute', left: -75, top: -40, overflow: 'visible'}}>
            <path d={wobRect(-70, -36, 140, 72, `bl${i}${b}`, 2, 6)} fill="#8BD17C" stroke={C.ink} strokeWidth={5} />
            <circle r={22} fill="#B9E8AE" stroke={C.ink} strokeWidth={3} />
            <text y={14} textAnchor="middle" fontFamily={FONT} fontSize={36} fill={C.ink}>
              $
            </text>
          </svg>
        ) : (
          <svg width={90} height={90} viewBox="-45 -45 90 90" style={{position: 'absolute', left: -45, top: -45, overflow: 'visible'}}>
            {btc ? (
              <MonedaBTC r={36} b={b} id={`dm${i}`} />
            ) : (
              <>
                <path d={wobEllipse(0, 0, 36, 36, `dm${i}${b}`)} fill={C.gold} stroke={C.ink} strokeWidth={5} />
                <text y={14} textAnchor="middle" fontFamily={FONT} fontSize={40} fill={C.paper} stroke={C.ink} strokeWidth={2}>
                  $
                </text>
              </>
            )}
          </svg>
        )}
      </div>,
    );
  }
  return (
    <>
      {out}
      {d.texto && (
        <Grande x={z.x} y={z.y} size={d.tam ?? 110} color={col(d.color, C.green)} scale={pop(t, at(d.texto_al, ta + 0.2), 0.4)} rotate={-4}>
          {d.texto}
        </Grande>
      )}
    </>
  );
};

// ───────────────────────── pregunta gancho y respuesta ─────────────────────────
const Pregunta: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const tq = at(d.al, t0 + 0.05);
  const tr = at(d.respuesta_al, 1e9);
  const ans = t >= tr;
  const q = pop(t, tq, 0.45) * (ans && d.respuesta ? 1 - ramp(t, tr - 0.05, 0.2) * 0.35 : 1);
  return (
    <>
      <Caja
        x={z.x}
        y={z.y - (ans && d.respuesta ? 90 : 0)}
        w={Math.min(z.w, 1250)}
        seed="pq"
        bg={C.paper}
        scale={q}
        rotate={-1.5}
        style={{padding: '28px 40px', fontSize: d.pregunta?.length > 34 ? 62 : 78, whiteSpace: 'normal', textAlign: 'center', lineHeight: 1.15}}
      >
        {d.pregunta}
      </Caja>
      {[
        [z.x - z.w * 0.45, z.y - 160, -14],
        [z.x + z.w * 0.45, z.y - 120, 12],
        [z.x + z.w * 0.33, z.y + 160, 8],
      ].map(([x, y, r], i) => (
        <Grande key={i} x={x} y={y + Math.sin(t * 5 + i) * 12} size={130} color={CHIP_COLORS[i + 1]} rotate={r + Math.sin(t * 4 + i) * 6} scale={pop(t, tq + 0.2 + i * 0.12, 0.4) * (ans ? 1 - ramp(t, tr, 0.2) : 1)}>
          ?
        </Grande>
      ))}
      {d.respuesta && (
        <>
          <Caja x={z.x} y={z.y + 110} seed="pr" bg={col(d.color, C.yellow)} scale={pop(t, tr, 0.4)} rotate={3} style={{padding: '12px 44px', fontSize: 92}}>
            {d.respuesta}
          </Caja>
          <Rafaga t={t} t0={tr} x={z.x} y={z.y + 110} n={20} />
        </>
      )}
    </>
  );
};

// ───────────────────────── texto cinético ─────────────────────────
const Texto: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const ps: any[] = d.palabras ?? [];
  const rows: any[][] = [];
  // reparte en filas si no traen posición
  let cur: any[] = [];
  let len = 0;
  const maxLen = d.por_fila ?? 18;
  ps.forEach((p) => {
    if (p.x !== undefined) return;
    if (len + p.texto.length > maxLen && cur.length) {
      rows.push(cur);
      cur = [];
      len = 0;
    }
    cur.push(p);
    len += p.texto.length + 1;
  });
  if (cur.length) rows.push(cur);
  const size = d.tam ?? 96;
  const out: React.ReactNode[] = [];
  rows.forEach((row, ri) => {
    const totalW = row.reduce((a, p) => a + (p.texto.length * 0.62 + 0.5) * (p.tam ?? size), 0);
    let x = z.x - totalW / 2;
    const y = z.y + (ri - (rows.length - 1) / 2) * size * 1.25;
    row.forEach((p, i) => {
      const w = (p.texto.length * 0.62 + 0.5) * (p.tam ?? size);
      const tp = at(p.al, t0 + 0.1 + i * 0.25);
      out.push(
        p.caja ? (
          <Caja key={`${ri}-${i}`} x={x + w / 2} y={y} seed={`tx${ri}${i}`} bg={col(p.color, C.yellow)} scale={pop(t, tp, 0.35)} rotate={p.rot ?? jit(`txr${ri}${i}`, 4)} style={{padding: '4px 20px', fontSize: (p.tam ?? size) * 0.8}}>
            {p.texto}
          </Caja>
        ) : (
          <Grande key={`${ri}-${i}`} x={x + w / 2} y={y} size={p.tam ?? size} color={col(p.color, C.paper)} scale={pop(t, tp, 0.35)} rotate={p.rot ?? jit(`txr${ri}${i}`, 4)}>
            {p.texto}
          </Grande>
        ),
      );
      x += w;
    });
  });
  ps.forEach((p, i) => {
    if (p.x === undefined) return;
    const tp = at(p.al, t0 + 0.1 + i * 0.25);
    out.push(
      p.caja ? (
        <Caja key={`abs${i}`} x={p.x} y={p.y ?? z.y} seed={`txa${i}`} bg={col(p.color, C.yellow)} scale={pop(t, tp, 0.35)} rotate={p.rot ?? jit(`txa${i}`, 4)} style={{padding: '4px 18px', fontSize: (p.tam ?? size) * 0.8}}>
          {p.texto}
        </Caja>
      ) : (
        <Grande key={`abs${i}`} x={p.x} y={p.y ?? z.y} size={p.tam ?? size} color={col(p.color, C.paper)} scale={pop(t, tp, 0.35)} rotate={p.rot ?? jit(`txa${i}`, 5)}>
          {p.texto}
        </Grande>
      ),
    );
  });
  return <>{out}</>;
};

// ───────────────────────── fila de iconos ─────────────────────────
const Iconos: React.FC<EscenaProps> = ({d, t, t0}) => {
  const z = zona(d);
  const items: any[] = d.items ?? [];
  const n = items.length;
  const tam = d.tam ?? (n > 3 ? 190 : 240);
  const gap = Math.min(z.w / Math.max(1, n), tam * 1.6);
  return (
    <>
      {d.titulo && (
        <Grande x={z.x} y={z.y - tam * 0.95} size={60} color={col(d.color, C.yellow)} scale={pop(t, t0, 0.35)}>
          {d.titulo}
        </Grande>
      )}
      {items.map((it, i) => {
        const ti = at(it.al, t0 + 0.15 + i * 0.4);
        const x = z.x + (i - (n - 1) / 2) * gap + (it.dx ?? 0);
        const y = z.y + (it.dy ?? 0) + Math.sin(t * 4 + i) * 8;
        const tachar = at(it.tachar_al, 1e9);
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, scale: `${pop(t, ti, 0.4)}`}}>
            <div style={{position: 'absolute', left: -tam / 2, top: -tam / 2}}>
              <Icono nombre={it.icono} tam={tam} color={it.color ? col(it.color) : undefined} />
            </div>
            {it.texto && (
              <Caja x={0} y={tam * 0.62} seed={`ic${i}`} bg={col(it.color_texto, C.paper)} style={{padding: '4px 18px', fontSize: 40}}>
                {it.texto}
              </Caja>
            )}
            {t >= tachar && (
              <Grande x={0} y={0} size={tam * 1.1} color={C.red} scale={pop(t, tachar, 0.3)} rotate={-8}>
                ✗
              </Grande>
            )}
          </div>
        );
      })}
    </>
  );
};

// ───────────────────────── registro y SFX por escena ─────────────────────────
const times = (arr: any[] | undefined, key = 'al'): number[] => (arr ?? []).map((x) => x?.[key]).filter((x) => typeof x === 'number');

export const ESCENAS: Record<string, DefEscena> = {
  lista: {
    descripcion: 'Rótulo "Número X": estrella con el número, título, apodo y tira de progreso 1..total',
    render: Lista,
    sfx: (d, t0) => {
      const tt = at(d.titulo_al, t0 + 0.55);
      return [
        ['subida', t0 - 1.0, 0.8],
        ['golpe', t0, 0.9],
        ['boom', t0 + 0.02, 0.7],
        ['pop', tt, 1],
        ['sello', at(d.apodo_al, tt + 0.6), 0.6],
      ];
    },
  },
  flujo: {
    descripcion: 'Diagrama de nodos (con icono opcional) unidos por flechas que se dibujan; forma linea o ciclo',
    render: Flujo,
    sfx: (d, t0) => [
      ['whoosh', t0 - 0.1, 0.8],
      ...(d.nodos ?? []).flatMap((n: any, i: number): Cue[] => {
        const ti = at(n.al, t0 + 0.2 + i * 0.7);
        return i ? [['rotulador', ti - 0.35, 0.7], ['pop', ti, 0.9]] : [['pop', ti, 0.9]];
      }),
    ],
  },
  comparativa: {
    descripcion: 'A contra B en dos tarjetas con VS; ganador con ✓ y perdedor tachado',
    render: Comparativa,
    sfx: (d, t0) => {
      const ta = at(d.a?.al, t0 + 0.1);
      const tb = at(d.b?.al, ta + 0.8);
      const c: Cue[] = [['whoosh', ta - 0.1, 0.8], ['whoosh', tb - 0.1, 0.8], ['golpe', at(d.vs_al, (ta + tb) / 2), 0.7]];
      if (typeof d.ganador_al === 'number') c.push(['exito', d.ganador_al, 0.9], ['boing', d.ganador_al + 0.05, 0.5]);
      return c;
    },
  },
  cifra: {
    descripcion: 'Cifra gigante que cuenta de "desde" a "hasta" con prefijo/sufijo, flecha y etiqueta',
    render: Cifra,
    sfx: (d, t0, t1) => {
      const ta = at(d.al, t0 + 0.1);
      const dur = d.dur ?? Math.min(1.6, Math.max(0.6, t1 - ta - 0.4));
      const baja = d.flecha === 'baja' || (d.flecha !== 'sube' && (d.hasta ?? 0) < (d.desde ?? 0));
      const n = Math.max(3, Math.floor(dur / 0.09));
      return [
        ['pop', t0, 0.8],
        ...(d.desde !== d.hasta ? Array.from({length: n}, (_, i): Cue => ['tick', ta + i * 0.09, 0.55]) : []),
        [baja ? 'caida' : 'subida', ta, 0.6],
        [baja ? 'boom' : 'ding', ta + dur, 0.9],
      ];
    },
  },
  grafica: {
    descripcion: 'Gráfica de línea (o barras) que se dibuja punto a punto con moneda-cabeza, valor y marcas',
    render: Grafica,
    sfx: (d, t0, t1) => {
      const pts: any[] = d.puntos ?? [];
      const n = pts.length;
      const tStart = at(d.al, t0 + 0.3);
      const tEnd = at(d.hasta_al, Math.max(tStart + 0.8, t1 - 0.4));
      const tp = pts.map((p, i) => at(p.al, lerp(tStart, tEnd, n > 1 ? i / (n - 1) : 1)));
      const c: Cue[] = [['whoosh_suave', t0, 0.8], ['rotulador', tStart, 0.6]];
      for (let i = 1; i < n; i++) {
        const drop = pts[i].v < pts[i - 1].v;
        const big = Math.abs(pts[i].v - pts[i - 1].v) / Math.max(1, pts[i - 1].v) > 0.3;
        c.push([drop ? 'caida' : 'swoosh', tp[i - 1], 0.6]);
        c.push(big ? [drop ? 'golpe' : 'ding', tp[i], drop ? 0.6 : 0.8] : ['tick', tp[i], 0.7]);
      }
      (d.marcas ?? []).forEach((m: any) => c.push(['pop', at(m.al, tp[Math.min(n - 1, m.i ?? 0)]), 1]));
      return c;
    },
  },
  chat: {
    descripcion: 'Bocadillos de chat (lado izq/der) o tarjeta de tuit con corazones que suben',
    render: Chat,
    sfx: (d, t0) =>
      d.estilo === 'tuit'
        ? [['notif', at(d.mensajes?.[0]?.al, t0 + 0.1), 1], ['pop', at(d.mensajes?.[0]?.al, t0 + 0.1) + 0.1, 0.8]]
        : (d.mensajes ?? []).map((m: any, i: number): Cue => [i % 2 ? 'pop2' : 'notif', at(m.al, t0 + 0.2 + i * 0.8), 0.9]),
  },
  por_dentro: {
    descripcion: 'Lupa que hace zoom a un mecanismo de engranajes, con piezas etiquetadas alrededor',
    render: PorDentro,
    sfx: (d, t0) => [['whoosh', t0, 0.9], ['engranaje', t0 + 0.4, 0.6], ...times(d.piezas).map((x): Cue => ['pop', x, 0.9])],
  },
  mapa: {
    descripcion: 'Globo que gira con continentes de garabato, chinchetas con nombre y apagón opcional',
    render: Mapa,
    sfx: (d, t0) => [
      ['whoosh', t0, 0.8],
      ...(d.pines ?? []).map((p: any, i: number): Cue => ['pop', at(p.al, t0 + 0.5 + i * 0.5) + 0.2, 1]),
      ...(d.apagon ? ([['apagon', d.apagon.al, 0.9]] as Cue[]) : []),
    ],
  },
  sello: {
    descripcion: 'Sello que se estampa (VERDAD, MENTIRA, ESTAFA, QUIEBRA…) con temblor',
    render: Sello,
    sfx: (d, t0) => [
      ['subida', at(d.al, t0 + 0.2) - 0.9, 0.6],
      ['sello', at(d.al, t0 + 0.2), 1.3],
      ['boom', at(d.al, t0 + 0.2), 0.8],
    ],
  },
  pantalla: {
    descripcion: 'Móvil u ordenador con app: precio que cambia con mini gráfica, titular, alerta o líneas de texto',
    render: Pantalla,
    sfx: (d, t0) => {
      const c: Cue[] = [['whoosh', t0 - 0.05, 0.8], ['click', t0 + 0.2, 0.9]];
      (d.lineas ?? []).forEach((l: any, i: number) => c.push(['notif', at(l.al, t0 + 0.4 + i * 0.5), 0.8]));
      if (d.app === 'alerta') c.push(['alerta', t0 + 0.3, 0.8]);
      if (d.precio) c.push([d.precio.hasta < d.precio.desde ? 'caida' : 'subida', at(d.precio.al, t0 + 0.3), 0.6]);
      return c;
    },
  },
  dinero: {
    descripcion: 'Monedas y billetes: lluvia, sube, escapa (se va volando) o explota; texto opcional',
    render: Dinero,
    sfx: (d, t0, t1) => {
      const ta = at(d.al, t0);
      const tb = at(d.hasta, t1);
      const c: Cue[] = [[d.modo === 'escapa' ? 'whoosh' : 'monedas', ta, 0.9]];
      if (d.modo !== 'escapa') c.push(['caja', ta + 0.15, 0.7]);
      for (let x = ta + 0.7; x < tb - 0.3; x += 0.75) c.push(['moneda', x, 0.5]);
      return c;
    },
  },
  pregunta: {
    descripcion: 'Pregunta gancho con interrogaciones que saltan y respuesta que aparece en su palabra',
    render: Pregunta,
    sfx: (d, t0) => {
      const c: Cue[] = [['pregunta', at(d.al, t0 + 0.05), 0.8], ['pop', at(d.al, t0 + 0.05) + 0.2, 0.7]];
      if (typeof d.respuesta_al === 'number') c.push(['golpe', d.respuesta_al, 0.7], ['ding', d.respuesta_al + 0.05, 0.9]);
      return c;
    },
  },
  texto: {
    descripcion: 'Tipografía cinética: palabras que saltan en su momento (en caja o con contorno)',
    render: Texto,
    sfx: (d, t0) => (d.palabras ?? []).map((p: any, i: number): Cue => [i % 3 === 2 ? 'pop2' : 'pop', at(p.al, t0 + 0.1 + i * 0.25), 0.7]),
  },
  iconos: {
    descripcion: 'Fila de iconos de garabato con etiqueta; se pueden tachar con ✗',
    render: Iconos,
    sfx: (d, t0) => [
      ...(d.items ?? []).map((it: any, i: number): Cue => ['pop', at(it.al, t0 + 0.15 + i * 0.4), 0.9]),
      ...times(d.items, 'tachar_al').map((x): Cue => ['golpe_seco', x, 0.8]),
    ],
  },
};
