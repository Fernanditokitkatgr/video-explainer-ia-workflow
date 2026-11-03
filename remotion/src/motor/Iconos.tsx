/**
 * Iconos de garabato para las escenas (todos por código, trazo que hierve, relleno plano).
 * <Icono nombre="ballena" tam={220} />   — el SVG se centra en (0,0) con tamaño `tam`.
 */
import React from 'react';
import {C, jit, useBoil, wobEllipse, wobLine, wobPoly, wobRect} from './base';
import {useT} from './tiempo';

export const ICONOS = [
  'bitcoin', 'dolar', 'pizza', 'cohete', 'ascensor', 'oveja', 'megafono', 'coche', 'banco', 'grifo', 'tienda', 'rayo',
  'enchufe', 'pico', 'ballena', 'robot', 'reloj_arena', 'candado', 'calendario', 'dedo', 'grafico_sube', 'grafico_baja',
  'alerta', 'mundo', 'movil', 'hucha', 'fuego', 'libro', 'bombilla', 'cadena', 'balanza', 'gota', 'ola', 'escudo',
  // nov-2026 (Shorts de contraseñas y alucinaciones)
  'llave', 'anzuelo', 'sobre', 'dado', 'mazo', 'examen', 'pinocho', 'gpu', 'calavera',
  // nov-2026 (largos del youtuber y del móvil lento)
  'play', 'bateria', 'termometro', 'camiseta', 'chocolate', 'micro', 'trofeo', 'ojo', 'tortuga', 'caja', 'mochila',
  'puerta', 'avion', 'casa', 'chip', 'ticket',
] as const;
export type NombreIcono = (typeof ICONOS)[number];

const S = {stroke: C.ink, strokeWidth: 6, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const};

/**
 * Símbolo ₿ dibujado a trazo (no depende de que la fuente tenga el carácter). Centrado en (0,0) y de
 * `tam` de alto: palo, dos barrigas y las dos rayitas de arriba y de abajo, con contorno de rotulador.
 */
export const SimboloBTC: React.FC<{tam?: number; color?: string; seed?: string}> = ({tam = 100, color = C.paper, seed = 'btc'}) => {
  const b = useBoil();
  const s = tam / 100;
  const j = (v: number, k: string) => (v + jit(`${seed}${k}${b}`, 1.4)).toFixed(1);
  const d = [
    `M${j(-22, 'a')} -38 L${j(-22, 'b')} 38`,
    `M-22 -38 L6 -38 Q${j(30, 'c')} -38 ${j(30, 'd')} -20 Q30 -2 6 -2 L-22 -2`,
    `M-22 -2 L10 -2 Q${j(36, 'e')} -2 ${j(36, 'f')} 18 Q36 38 8 38 L-22 38`,
    `M-8 -50 L-8 -38 M10 -50 L10 -38 M-8 38 L-8 50 M10 38 L10 50`,
  ].join(' ');
  return (
    <g transform={`scale(${s})`}>
      <path d={d} fill="none" stroke={C.ink} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export const Icono: React.FC<{nombre: string; tam?: number; color?: string}> = ({nombre, tam = 200, color}) => {
  const b = useBoil();
  const t = useT();
  const k = `${nombre}${b}`;
  const E = (cx: number, cy: number, rx: number, ry: number, fill: string, s = '') => <path d={wobEllipse(cx, cy, rx, ry, k + s + cx + cy)} fill={fill} {...S} />;
  const R = (x: number, y: number, w: number, h: number, fill: string, s = '', r = 10) => <path d={wobRect(x, y, w, h, k + s + x + y, 2, r)} fill={fill} {...S} />;
  const P = (pts: [number, number][], fill: string, s = '', closed = true) => <path d={wobPoly(pts, k + s, 2, closed)} fill={closed ? fill : 'none'} {...S} />;
  const L = (a: [number, number], c: [number, number], s = '', w = 6) => <path d={wobLine(a, c, k + s)} fill="none" {...S} strokeWidth={w} />;
  const T = (x: number, y: number, txt: string, size: number, fill = C.ink) => (
    <text x={x} y={y} textAnchor="middle" fontFamily="MontserratXB" fontSize={size} fill={fill} stroke={C.ink} strokeWidth={fill === C.ink ? 0 : 3} paintOrder="stroke">
      {txt}
    </text>
  );
  let body: React.ReactNode = null;
  switch (nombre) {
    case 'bitcoin':
      body = (
        <>
          {E(0, 0, 80, 80, color ?? C.gold)}
          <path d={wobEllipse(0, 0, 58, 58, k + 'in')} fill="none" stroke={C.ink} strokeWidth={3} opacity={0.5} />
          <SimboloBTC tam={100} color={C.paper} seed={k} />
        </>
      );
      break;
    case 'dolar':
      body = (
        <>
          {R(-90, -50, 180, 100, color ?? '#8BD17C', 'b', 8)}
          {E(0, 0, 34, 34, '#B9E8AE')}
          {T(0, 22, '$', 60)}
        </>
      );
      break;
    case 'pizza':
      body = (
        <>
          {E(0, 0, 85, 85, '#E3A857')}
          {E(0, 0, 70, 70, color ?? C.yellow, 'q')}
          {[[-30, -20], [25, -30], [10, 25], [-25, 35], [40, 20]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={11} fill={C.red} stroke={C.ink} strokeWidth={3} />
          ))}
          {L([-70, 0], [70, 0], 'c1', 3)}
          {L([0, -70], [0, 70], 'c2', 3)}
        </>
      );
      break;
    case 'cohete': {
      const fl = 20 + Math.abs(Math.sin(t * 30)) * 25;
      body = (
        <g transform="rotate(35)">
          {P([[-20, 60], [0, 60 + fl], [20, 60]], C.orange, 'f')}
          {P([[-30, 60], [-30, -30], [0, -95], [30, -30], [30, 60]], color ?? C.paper, 'b')}
          {E(0, -20, 15, 15, C.blue)}
          {P([[-30, 20], [-55, 65], [-30, 60]], C.red, 'a1')}
          {P([[30, 20], [55, 65], [30, 60]], C.red, 'a2')}
        </g>
      );
      break;
    }
    case 'ascensor':
      body = (
        <>
          {R(-70, -90, 140, 180, color ?? C.lightGrey, 'a', 6)}
          {L([0, -60], [0, 90], 'p')}
          {E(95, -30, 18, 18, C.green, 'u')}
          {E(95, 30, 18, 18, C.red, 'd')}
          {P([[87, -26], [95, -40], [103, -26]], C.ink, 'ua')}
          {P([[87, 26], [95, 40], [103, 26]], C.ink, 'da')}
        </>
      );
      break;
    case 'oveja':
      body = (
        <>
          {[[-40, -10], [-10, -30], [25, -20], [40, 10], [0, 15], [-35, 20]].map(([x, y], i) => (
            <path key={i} d={wobEllipse(x, y, 32, 28, k + 'o' + i)} fill={C.paper} {...S} />
          ))}
          {E(-75, -5, 24, 20, '#444', 'h')}
          {L([-30, 40], [-30, 75], 'l1')}
          {L([25, 40], [25, 75], 'l2')}
          <circle cx={-80} cy={-9} r={4} fill={C.paper} />
        </>
      );
      break;
    case 'megafono':
      body = (
        <>
          {P([[-60, -20], [50, -70], [50, 70], [-60, 20]], color ?? C.red, 'm')}
          {R(-85, -22, 28, 44, C.lightGrey, 'h', 6)}
          {[0, 1, 2].map((i) => {
            const p = (t * 1.5 + i / 3) % 1;
            return <path key={i} d={`M${70 + p * 40} ${-40 - p * 10} Q${95 + p * 50} 0 ${70 + p * 40} ${40 + p * 10}`} fill="none" {...S} strokeWidth={5} opacity={1 - p} />;
          })}
        </>
      );
      break;
    case 'coche':
      body = (
        <>
          {P([[-90, 20], [-80, -15], [-40, -20], [-20, -50], [40, -50], [65, -18], [90, -10], [90, 25]], color ?? C.red, 'c')}
          {E(-50, 30, 22, 22, C.ink, 'r1')}
          {E(55, 30, 22, 22, C.ink, 'r2')}
          {P([[-12, -42], [32, -42], [50, -20], [-22, -20]], C.blue, 'w')}
          {T(10, 10, '⚡', 30, C.yellow)}
        </>
      );
      break;
    case 'banco':
      body = (
        <>
          {P([[-100, -40], [0, -95], [100, -40]], color ?? C.lightGrey, 't')}
          {R(-95, -40, 190, 20, C.lightGrey, 'f', 2)}
          {[-70, -25, 25, 70].map((x, i) => (
            <path key={i} d={wobRect(x - 10, -18, 20, 88, k + 'col' + i, 1.5, 2)} fill={C.paper} {...S} />
          ))}
          {R(-105, 70, 210, 22, C.lightGrey, 'b', 2)}
        </>
      );
      break;
    case 'grifo': {
      const drop = (t * 1.6) % 1;
      body = (
        <>
          {R(-90, -60, 110, 40, color ?? C.lightGrey, 'tb', 10)}
          {R(-10, -60, 40, 90, C.lightGrey, 'cu', 8)}
          {R(-60, -95, 40, 35, C.red, 'llave', 6)}
          {L([-75, -95], [-5, -95], 'h', 8)}
          <path d={`M10 ${45 + drop * 70} q-14 22 0 28 q14 -6 0 -28 Z`} fill={C.blue} {...S} strokeWidth={3} opacity={1 - drop} />
        </>
      );
      break;
    }
    case 'tienda':
      body = (
        <>
          {R(-90, -20, 180, 110, C.paper, 'w', 4)}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={wobPoly([[-96 + i * 32, -60], [-64 + i * 32, -60], [-64 + i * 32, -20], [-96 + i * 32, -20]], k + 'tl' + i, 1.5, true)} fill={i % 2 ? C.paper : color ?? C.red} {...S} strokeWidth={4} />
          ))}
          {R(-25, 20, 50, 70, C.blue, 'd', 4)}
          <g transform="translate(0 -84)">
            <SimboloBTC tam={38} color={C.gold} seed={k + 't'} />
          </g>
        </>
      );
      break;
    case 'rayo':
      body = P([[10, -100], [-50, 10], [-5, 10], [-25, 100], [50, -20], [5, -20], [30, -100]], color ?? C.yellow, 'r');
      break;
    case 'enchufe':
      body = (
        <>
          {R(-60, -40, 120, 90, color ?? C.paper, 'e', 24)}
          {L([-20, -40], [-20, -85], 'p1', 10)}
          {L([20, -40], [20, -85], 'p2', 10)}
          <path d={wobLine([0, 50], [0, 100], k + 'cab')} fill="none" {...S} strokeWidth={10} />
        </>
      );
      break;
    case 'pico':
      body = (
        <>
          {L([-60, 80], [40, -40], 'm', 12)}
          <path d={`M-10 -80 Q60 -70 90 -10`} fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
          <path d={`M-10 -80 Q60 -70 90 -10`} fill="none" stroke={color ?? C.grey} strokeWidth={9} strokeLinecap="round" />
        </>
      );
      break;
    case 'ballena': {
      const sp = (t * 1.2) % 1;
      body = (
        <>
          {P([[-110, 0], [-80, -50], [0, -60], [70, -30], [95, 10], [70, 45], [-20, 50], [-90, 35]], color ?? '#4A78B8', 'bd')}
          {P([[85, 5], [125, -40], [115, 10], [130, 45]], color ?? '#4A78B8', 'tl')}
          <path d="M-80 20 Q-20 45 60 25" fill="none" {...S} strokeWidth={4} />
          <circle cx={-60} cy={-15} r={7} fill={C.ink} />
          <path d={`M-30 -60 Q-35 ${-90 - sp * 30} -55 ${-100 - sp * 30} M-30 -60 Q-25 ${-90 - sp * 30} -5 ${-100 - sp * 30}`} fill="none" stroke={C.blue} strokeWidth={6} strokeLinecap="round" opacity={1 - sp * 0.6} />
        </>
      );
      break;
    }
    case 'robot':
      body = (
        <>
          {R(-60, -60, 120, 100, color ?? '#A9BCCB', 'h', 22)}
          {R(-42, -40, 84, 56, '#1E2A38', 's', 10)}
          <circle cx={-18} cy={-14} r={9} fill="#4DF3FF" />
          <circle cx={18} cy={-14} r={9} fill="#4DF3FF" />
          {L([0, -60], [0, -90], 'a')}
          <circle cx={0} cy={-95} r={9} fill={C.red} stroke={C.ink} strokeWidth={4} />
          {R(-40, 45, 80, 45, '#A9BCCB', 'b', 10)}
        </>
      );
      break;
    case 'reloj_arena': {
      const p = (t * 0.25) % 1;
      body = (
        <>
          {R(-60, -95, 120, 16, '#B5651D', 't', 4)}
          {R(-60, 79, 120, 16, '#B5651D', 'b', 4)}
          {P([[-45, -79], [45, -79], [6, 0], [45, 79], [-45, 79], [-6, 0]], '#E8F6FF', 'v')}
          <path d={`M${-35 + p * 30} ${-70 + p * 60} L${35 - p * 30} ${-70 + p * 60} L0 -4 Z`} fill={C.gold} />
          <path d={`M-35 76 L35 76 L${30 - p * 25} ${70 - p * 50} L${-30 + p * 25} ${70 - p * 50} Z`} fill={C.gold} />
        </>
      );
      break;
    }
    case 'candado':
      body = (
        <>
          <path d="M-40 -10 L-40 -50 Q-40 -95 0 -95 Q40 -95 40 -50 L40 -10" fill="none" stroke={C.ink} strokeWidth={16} />
          <path d="M-40 -10 L-40 -50 Q-40 -95 0 -95 Q40 -95 40 -50 L40 -10" fill="none" stroke={C.grey} strokeWidth={8} />
          {R(-70, -15, 140, 110, color ?? C.gold, 'c', 14)}
          {E(0, 30, 12, 12, C.ink, 'k')}
        </>
      );
      break;
    case 'calendario':
      body = (
        <>
          {R(-80, -80, 160, 170, C.paper, 'c', 12)}
          {R(-80, -80, 160, 45, color ?? C.red, 'h', 12)}
          {L([-40, -95], [-40, -65], 'a1', 8)}
          {L([40, -95], [40, -65], 'a2', 8)}
        </>
      );
      break;
    case 'dedo':
      body = (
        <>
          {R(-50, -20, 100, 90, color ?? C.face, 'm', 26)}
          {R(-18, -100, 36, 95, color ?? C.face, 'd', 18)}
          {L([-8, -90], [8, -90], 'u', 3)}
        </>
      );
      break;
    case 'grafico_sube':
    case 'grafico_baja': {
      const up = nombre === 'grafico_sube';
      body = (
        <>
          {L([-90, -90], [-90, 85], 'y')}
          {L([-90, 85], [95, 85], 'x')}
          <path
            d={wobPoly(up ? [[-80, 60], [-40, 30], [-10, 45], [30, -10], [80, -70]] : [[-80, -60], [-40, -20], [-10, -35], [30, 20], [80, 70]], k + 'l', 2)}
            fill="none"
            stroke={color ?? (up ? C.green : C.red)}
            strokeWidth={14}
            strokeLinecap="round"
          />
          {P(up ? [[60, -80], [95, -85], [88, -48]] : [[60, 80], [95, 85], [88, 48]], color ?? (up ? C.green : C.red), 'ar')}
        </>
      );
      break;
    }
    case 'alerta':
      body = (
        <>
          {P([[0, -95], [95, 80], [-95, 80]], color ?? C.yellow, 't')}
          {T(0, 60, '!', 120)}
        </>
      );
      break;
    case 'mundo':
      body = (
        <>
          {E(0, 0, 90, 90, C.blue, 'm')}
          {P([[-50, -50], [-10, -60], [0, -30], [-30, 0], [-60, -10]], C.green, 'c1')}
          {P([[10, 0], [50, -10], [60, 30], [20, 60], [5, 30]], C.green, 'c2')}
        </>
      );
      break;
    case 'movil':
      body = (
        <>
          {R(-55, -100, 110, 200, C.ink, 'm', 18)}
          {R(-43, -82, 86, 160, color ?? C.blue, 's', 6)}
        </>
      );
      break;
    case 'hucha':
      body = (
        <>
          {E(0, 10, 95, 70, color ?? C.pink, 'h')}
          {E(-95, 0, 22, 24, color ?? C.pink, 'n')}
          <circle cx={-98} cy={-4} r={4} fill={C.ink} />
          <circle cx={-98} cy={6} r={4} fill={C.ink} />
          {L([-20, -55], [25, -55], 'r', 8)}
          {L([-50, 70], [-50, 95], 'p1', 10)}
          {L([50, 70], [50, 95], 'p2', 10)}
        </>
      );
      break;
    case 'fuego': {
      const f = Math.sin(t * 18) * 6;
      body = (
        <>
          {P([[0, -100 + f], [50, -20], [60, 40], [0, 90], [-60, 40], [-50, -20], [-20, -40]], color ?? C.orange, 'f')}
          {P([[0, -30 - f], [25, 20], [0, 70], [-25, 20]], C.yellow, 'i')}
        </>
      );
      break;
    }
    case 'libro':
      body = (
        <>
          {P([[-90, -60], [0, -45], [90, -60], [90, 60], [0, 75], [-90, 60]], C.paper, 'p')}
          {L([0, -45], [0, 75], 'l')}
          {R(-95, 55, 190, 20, color ?? C.red, 'c', 6)}
        </>
      );
      break;
    case 'bombilla':
      body = (
        <>
          {E(0, -20, 65, 68, color ?? C.yellow, 'b')}
          {R(-30, 45, 60, 45, C.grey, 'r', 6)}
        </>
      );
      break;
    case 'cadena':
      body = (
        <>
          {[-60, 0, 60].map((x, i) => (
            <path key={i} d={wobEllipse(x, 0, 40, 26, k + 'e' + i)} fill="none" stroke={color ?? C.grey} strokeWidth={14} />
          ))}
        </>
      );
      break;
    case 'balanza': {
      const a = Math.sin(t * 2) * 10;
      body = (
        <>
          {L([0, -80], [0, 85], 'm', 8)}
          {R(-50, 80, 100, 16, C.ink, 'b', 4)}
          <g transform={`rotate(${a} 0 -70)`}>
            {L([-90, -70], [90, -70], 'v', 8)}
            {P([[-120, -10], [-60, -10], [-90, -70]], color ?? C.gold, 'pl', false)}
            {E(-90, -10, 34, 10, color ?? C.gold, 'pl2')}
            {E(90, -10, 34, 10, color ?? C.gold, 'pr2')}
          </g>
        </>
      );
      break;
    }
    case 'gota':
      body = P([[0, -95], [55, 20], [40, 70], [0, 85], [-40, 70], [-55, 20]], color ?? C.blue, 'g');
      break;
    case 'ola':
      body = (
        <path
          d={wobPoly([[-110, 40], [-70, -10], [-30, 30], [10, -20], [50, 20], [90, -30], [110, 40]], k + 'o', 3)}
          fill="none"
          stroke={color ?? C.blue}
          strokeWidth={18}
          strokeLinecap="round"
        />
      );
      break;
    case 'escudo':
      body = P([[0, -95], [80, -60], [70, 30], [0, 95], [-70, 30], [-80, -60]], color ?? C.green, 'e');
      break;
    case 'llave':
      body = (
        <>
          {E(-50, 0, 42, 42, color ?? C.gold, 'c')}
          {E(-50, 0, 14, 14, C.paper, 'h')}
          {R(-12, -11, 112, 22, color ?? C.gold, 'v', 6)}
          {R(62, 8, 14, 28, color ?? C.gold, 'd1', 3)}
          {R(84, 8, 14, 20, color ?? C.gold, 'd2', 3)}
        </>
      );
      break;
    case 'anzuelo':
      body = (
        <>
          {L([0, -110], [0, -70], 'hilo', 4)}
          <path d={wobPoly([[0, -70], [0, 40], [-10, 70], [-40, 80], [-65, 60], [-70, 30]], k + 'g', 2)} fill="none" stroke={C.ink} strokeWidth={18} strokeLinecap="round" />
          <path d={wobPoly([[0, -70], [0, 40], [-10, 70], [-40, 80], [-65, 60], [-70, 30]], k + 'g2', 2)} fill="none" stroke={color ?? C.grey} strokeWidth={9} strokeLinecap="round" />
          {P([[-70, 30], [-88, 52], [-58, 46]], color ?? C.grey, 'p')}
          {E(0, -78, 14, 14, C.red, 'o')}
        </>
      );
      break;
    case 'sobre':
      body = (
        <>
          {R(-95, -60, 190, 130, color ?? C.paper, 's', 10)}
          {P([[-92, -56], [0, 15], [92, -56]], color ?? C.paper, 'f', false)}
        </>
      );
      break;
    case 'dado':
      body = (
        <>
          {R(-80, -80, 160, 160, color ?? C.paper, 'd', 26)}
          {E(-40, -40, 14, 14, C.ink, 'p1')}
          {E(0, 0, 14, 14, C.ink, 'p2')}
          {E(40, 40, 14, 14, C.ink, 'p3')}
          {E(40, -40, 14, 14, C.ink, 'p4')}
          {E(-40, 40, 14, 14, C.ink, 'p5')}
        </>
      );
      break;
    case 'mazo':
      body = (
        <>
          <g transform={`rotate(${-30 + Math.max(0, Math.sin(t * 5)) * -18})`}>
            {R(-12, -20, 24, 130, '#8B5A2B', 'm', 8)}
            {R(-70, -70, 140, 60, color ?? '#6B3E1F', 'c', 14)}
          </g>
          {R(-90, 80, 180, 30, '#6B3E1F', 'b', 8)}
        </>
      );
      break;
    case 'examen':
      body = (
        <>
          {R(-75, -100, 150, 200, color ?? C.paper, 'h', 8)}
          {[-55, -10, 35].map((y, i) => (
            <React.Fragment key={i}>
              {R(-55, y, 26, 26, C.paper, `b${i}`, 4)}
              {L([-15, y + 13], [55, y + 13], `l${i}`, 6)}
            </React.Fragment>
          ))}
          {T(-42, 2, '?', 40, C.red)}
        </>
      );
      break;
    case 'pinocho': {
      const nariz = 105 + Math.max(0, Math.sin(t * 1.5)) * 25;
      body = (
        <>
          {E(-30, 10, 62, 62, '#F2C48D', 'c')}
          {E(-10, -5, 6, 8, C.ink, 'o')}
          {P([[-14, -6], [-14, 14], [nariz, 4]], '#E3B27A', 'n2')}
          {P([[-90, -40], [30, -40], [-40, -125]], color ?? C.red, 'g')}
          {E(-40, -125, 12, 12, C.yellow, 'p')}
          {L([-50, 45], [-15, 50], 'b', 5)}
        </>
      );
      break;
    }
    case 'gpu':
      body = (
        <>
          {R(-110, -55, 220, 110, color ?? C.ink, 'c', 12)}
          {E(-50, 0, 38, 38, C.grey, 'v1')}
          {E(50, 0, 38, 38, C.grey, 'v2')}
          <g transform={`translate(-50 0) rotate(${(t * 720) % 360})`}>{L([-30, 0], [30, 0], 'a1', 6)}{L([0, -30], [0, 30], 'a2', 6)}</g>
          <g transform={`translate(50 0) rotate(${(t * 720) % 360})`}>{L([-30, 0], [30, 0], 'a3', 6)}{L([0, -30], [0, 30], 'a4', 6)}</g>
          {R(-90, 55, 120, 16, C.gold, 'pin', 3)}
        </>
      );
      break;
    case 'calavera':
      body = (
        <>
          {E(0, -15, 80, 72, color ?? C.paper, 'c')}
          {R(-40, 40, 80, 45, color ?? C.paper, 'm', 12)}
          {E(-30, -15, 20, 22, C.ink, 'o1')}
          {E(30, -15, 20, 22, C.ink, 'o2')}
          {L([-15, 55], [-15, 80], 'd1', 5)}
          {L([15, 55], [15, 80], 'd2', 5)}
        </>
      );
      break;
    case 'play':
      body = (
        <>
          {R(-100, -70, 200, 140, color ?? C.red, 'p', 40)}
          {P([[-25, -38], [45, 0], [-25, 38]], C.paper, 'tr')}
        </>
      );
      break;
    case 'bateria': {
      // color 'vacia' → casi sin carga y en rojo
      const nivel = color === 'vacia' ? 0.18 : 0.75;
      const c = nivel < 0.3 ? C.red : C.green;
      body = (
        <>
          {R(-60, -95, 120, 190, C.paper, 'b', 16)}
          {R(-22, -112, 44, 20, C.grey, 'pt', 5)}
          {R(-44, 79 - 158 * nivel, 88, 158 * nivel, c, 'n', 8)}
          {P([[8, -55], [-22, 5], [2, 5], [-10, 60], [24, -10], [0, -10]], C.yellow, 'r')}
        </>
      );
      break;
    }
    case 'termometro': {
      const h = 60 + Math.sin(t * 3) * 25;
      body = (
        <>
          {R(-22, -105, 44, 160, C.paper, 't', 22)}
          {R(-10, 40 - h, 20, h + 10, color ?? C.red, 'm', 8)}
          {E(0, 65, 38, 38, color ?? C.red, 'bu')}
          {L([22, -70], [42, -70], 'g1', 5)}
          {L([22, -40], [36, -40], 'g2', 5)}
          {L([22, -10], [42, -10], 'g3', 5)}
        </>
      );
      break;
    }
    case 'camiseta':
      body = (
        <>
          {P([[-40, -85], [-100, -55], [-80, -10], [-55, -25], [-55, 90], [55, 90], [55, -25], [80, -10], [100, -55], [40, -85], [0, -60]], color ?? C.blue, 'c')}
          {P([[-40, -85], [0, -60], [40, -85]], C.paper, 'cu', false)}
        </>
      );
      break;
    case 'chocolate':
      body = (
        <>
          {R(-80, -95, 160, 190, color ?? '#6B3E1F', 'c', 10)}
          {[-50, 0].map((x) => [-65, -10].map((y) => <path key={`${x}${y}`} d={wobRect(x + 5, y, 40, 44, k + 'o' + x + y, 1.5, 6)} fill="#8B5A2B" {...S} strokeWidth={4} />))}
          {P([[-85, 30], [85, -10], [85, 100], [-85, 100]], C.red, 'env')}
        </>
      );
      break;
    case 'micro':
      body = (
        <>
          {R(-38, -100, 76, 120, color ?? C.grey, 'c', 38)}
          {L([-26, -60], [26, -60], 'r1', 4)}
          {L([-26, -35], [26, -35], 'r2', 4)}
          <path d={wobPoly([[-60, -10], [-55, 40], [0, 60], [55, 40], [60, -10]], k + 'u', 2)} fill="none" {...S} strokeWidth={8} />
          {L([0, 60], [0, 95], 'p', 8)}
          {L([-40, 95], [40, 95], 'b', 8)}
        </>
      );
      break;
    case 'trofeo':
      body = (
        <>
          <path d={wobPoly([[-60, -60], [-95, -55], [-80, 0], [-45, 10]], k + 'a1', 2)} fill="none" {...S} strokeWidth={9} />
          <path d={wobPoly([[60, -60], [95, -55], [80, 0], [45, 10]], k + 'a2', 2)} fill="none" {...S} strokeWidth={9} />
          {P([[-65, -90], [65, -90], [50, 0], [0, 30], [-50, 0]], color ?? C.gold, 'c')}
          {R(-14, 25, 28, 40, color ?? C.gold, 'p', 4)}
          {R(-55, 60, 110, 32, '#6B3E1F', 'b', 6)}
        </>
      );
      break;
    case 'ojo': {
      const mira = Math.sin(t * 2) * 18;
      const parp = t % 3 < 0.12;
      body = parp ? (
        L([-100, 0], [100, 0], 'c', 8)
      ) : (
        <>
          {P([[-105, 0], [-50, -55], [0, -65], [50, -55], [105, 0], [50, 55], [0, 65], [-50, 55]], C.paper, 'e')}
          {E(mira, 0, 42, 42, color ?? C.blue, 'i')}
          {E(mira, 0, 18, 18, C.ink, 'pu')}
          <circle cx={mira + 10} cy={-12} r={7} fill={C.paper} />
        </>
      );
      break;
    }
    case 'tortuga': {
      const pata = Math.sin(t * 4) * 6;
      body = (
        <>
          {E(95, 10 + pata * 0.3, 28, 24, '#8BD17C', 'cb')}
          <circle cx={104} cy={2} r={5} fill={C.ink} />
          {E(-55 + pata, 55, 18, 14, '#8BD17C', 'p1')}
          {E(45 - pata, 55, 18, 14, '#8BD17C', 'p2')}
          {P([[-90, 45], [-75, -30], [-30, -70], [30, -70], [75, -30], [90, 45]], color ?? C.green, 'ca')}
          {L([-40, -40], [-10, 40], 'h1', 4)}
          {L([40, -40], [10, 40], 'h2', 4)}
          {L([-80, 10], [80, 10], 'h3', 4)}
        </>
      );
      break;
    }
    case 'caja':
      body = (
        <>
          {R(-90, -40, 180, 130, color ?? '#C9A26B', 'c', 6)}
          {P([[-90, -40], [-60, -85], [60, -85], [90, -40]], '#DDB97F', 't')}
          {L([0, -40], [0, 90], 'ci', 5)}
          {R(-30, 0, 60, 26, C.paper, 'et', 4)}
        </>
      );
      break;
    case 'mochila':
      body = (
        <>
          <path d={wobPoly([[-40, -70], [-40, -100], [40, -100], [40, -70]], k + 'a', 2)} fill="none" {...S} strokeWidth={10} />
          {R(-75, -75, 150, 175, color ?? C.orange, 'c', 34)}
          {R(-50, 20, 100, 60, '#D9822B', 'b', 12)}
          {L([-50, 40], [50, 40], 'cr', 4)}
        </>
      );
      break;
    case 'puerta':
      body = (
        <>
          {R(-70, -105, 140, 210, color ?? '#B5651D', 'p', 6)}
          {R(-50, -85, 100, 70, '#9A5216', 'v1', 4)}
          {R(-50, 0, 100, 80, '#9A5216', 'v2', 4)}
          {E(45, 5, 9, 9, C.gold, 'po')}
        </>
      );
      break;
    case 'avion':
      body = (
        <g transform={`rotate(-20) translate(0 ${Math.sin(t * 3) * 6})`}>
          {P([[-30, 0], [-60, -85], [-30, -85], [30, -10]], C.lightGrey, 'a1')}
          {P([[-30, 10], [-60, 85], [-30, 85], [30, 15]], C.lightGrey, 'a2')}
          {P([[-110, -12], [90, -18], [115, 0], [90, 18], [-110, 12]], color ?? C.paper, 'f')}
          {P([[-110, -12], [-125, -50], [-95, -12]], C.red, 'co')}
          {E(70, -4, 10, 7, C.blue, 'v')}
        </g>
      );
      break;
    case 'casa':
      body = (
        <>
          {R(-75, -10, 150, 105, color ?? C.paper, 'c', 4)}
          {P([[-100, -5], [0, -95], [100, -5]], C.red, 't')}
          {R(-20, 30, 40, 65, '#B5651D', 'pu', 4)}
          {R(35, 10, 30, 30, C.blue, 'v', 3)}
        </>
      );
      break;
    case 'chip':
      body = (
        <>
          {[-60, -20, 20, 60].map((v, i) => (
            <React.Fragment key={i}>
              {L([v, -100], [v, -70], `pa${i}`, 8)}
              {L([v, 70], [v, 100], `pb${i}`, 8)}
              {L([-100, v], [-70, v], `pc${i}`, 8)}
              {L([70, v], [100, v], `pd${i}`, 8)}
            </React.Fragment>
          ))}
          {R(-75, -75, 150, 150, color ?? C.ink, 'c', 14)}
          {R(-35, -35, 70, 70, C.grey, 'n', 6)}
        </>
      );
      break;
    case 'ticket':
      body = (
        <g transform="rotate(-10)">
          {R(-105, -50, 210, 100, color ?? C.yellow, 't', 10)}
          {L([45, -45], [45, 45], 'c', 4)}
          {T(-25, 18, 'VIP', 48)}
        </g>
      );
      break;
    default:
      body = (
        <>
          {E(0, 0, 80, 80, color ?? C.lightGrey)}
          {T(0, 30, '?', 90)}
        </>
      );
  }
  return (
    <svg width={tam} height={tam} viewBox="-130 -130 260 260" style={{overflow: 'visible', rotate: `${jit(k, 1)}deg`}}>
      {body}
    </svg>
  );
};
