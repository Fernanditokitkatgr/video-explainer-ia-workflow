/**
 * Prueba de concepto (nov-2026): Short "Así piensa ChatGPT por dentro".
 *
 * Capas, de abajo arriba:
 *   1. Papel blanco con rayos de sol muy suaves cuyo color cambia por bloque con una cortinilla
 *      circular (copiado del vídeo de Pinocho: el color de fondo SIGNIFICA algo; rojo = mentira).
 *   2. Clip de Veo del mono stick (imagen a vídeo) en "multiply": su blanco desaparece y el mono
 *      queda dibujado sobre el papel. Si un clip no existe, sale su imagen con bamboleo de marioneta.
 *   3. Motion graphics por código: tragaperras de palabras, tokens que se trocean y se vuelven
 *      números, barras de probabilidad, contador de billones, sello INVENTADO, partículas...
 *      Todo con trazo "que hierve" (cambia cada 4 fotogramas) para que parezca dibujado a mano.
 *   4. Subtítulos palabra a palabra (1-3 palabras, Montserrat ExtraBold, contorno negro grueso).
 *   5. SFX en cada golpe. Sin música (regla del canal).
 * Cada cosa cae en SU palabra: los tiempos salen de words.json (whisper alineado con el guion).
 */
import React from 'react';
import {
  AbsoluteFill,
  Audio,
  continueRender,
  delayRender,
  Easing,
  Img,
  interpolate,
  OffthreadVideo,
  random,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import wordsJson from '../../public/pruebas-chatgpt/words.json';
import gains from '../../public/pruebas-chatgpt/sfx_gain.json';

// ───────────────────────── tiempos ─────────────────────────
type Word = {text: string; start: number; end: number};
const WORDS = wordsJson as Word[];
const norm = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ]/g, '');
const at = (word: string, n = 1) => {
  let seen = 0;
  for (const w of WORDS) if (norm(w.text) === norm(word) && ++seen === n) return w.start;
  throw new Error(`La palabra "${word}" (#${n}) no está en la locución`);
};
const LAST = WORDS[WORDS.length - 1].end;
export const SHORT_CHATGPT_SECONDS = LAST + 1.0;

const S = {
  hook: 0,
  tokens: at('primero') - 0.15,
  nums: at('cada') - 0.2,
  prob: at('con') - 0.1,
  write: at('así', 2) - 0.1,
  learn: at('como') - 0.25,
  train: at('tapaba') - 0.1,
  trillion: at('así', 3) - 0.05,
  humans: at('luego') - 0.1,
  think: at('curioso') - 0.25,
  lie: at('pero') - 0.1,
  end: at('así', 4) - 0.1,
};

// ───────────────────────── recursos ─────────────────────────
const P = 'pruebas-chatgpt';
// Clips de Veo que ya existen (se rellena tras generarlos). Lo que no esté aquí sale como imagen.
const CLIPS: Record<string, number> = {}; // clave → duración del clip en segundos
const IMGS = new Set<string>([]); // imágenes de partida disponibles
const clipSrc = (k: string) => staticFile(`${P}/clips/chatgpt_short_${k}.mp4`);
const imgSrc = (k: string) => staticFile(`${P}/chatgpt_short_${k}.png`);

const FONT = 'MontserratXB';
const fontHandle = delayRender('fuente Montserrat', {timeoutInMilliseconds: 120000, retries: 2});
new FontFace(FONT, `url(${staticFile(`${P}/Montserrat-ExtraBold.ttf`)})`)
  .load()
  .then((f) => {
    document.fonts.add(f);
    continueRender(fontHandle);
  })
  .catch(() => continueRender(fontHandle));

const C = {
  ink: '#151515',
  paper: '#FFFFFF',
  yellow: '#FFD23F',
  blue: '#5BC0EB',
  green: '#3BB273',
  red: '#E4572E',
  pink: '#FF8FB1',
  orange: '#FF9F1C',
  purple: '#9B5DE5',
};
const CHIP_COLORS = [C.yellow, C.blue, C.pink, C.green, C.orange, C.purple];

// ───────────────────────── utilidades de movimiento ─────────────────────────
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const overshoot = Easing.bezier(0.34, 1.7, 0.64, 1);
const ramp = (t: number, t0: number, dur = 0.4, e = easeOut) => interpolate(t, [t0, t0 + dur], [0, 1], {...clamp, easing: e});
const pop = (t: number, t0: number, dur = 0.45) => interpolate(t, [t0, t0 + dur], [0, 1], {...clamp, easing: overshoot});
const span = (t: number, a: number, b: number, fade = 0.2) => Math.min(ramp(t, a, fade), 1 - ramp(t, b - fade, fade));
const decay = (t: number, t0: number, k = 6) => (t >= t0 ? Math.exp(-(t - t0) * k) : 0);
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

/** Trazo que "hierve": una semilla nueva cada 4 fotogramas, como la animación dibujada a mano. */
const useBoil = () => Math.floor(useCurrentFrame() / 4);
const jit = (seed: string | number, amp: number) => (random(`${seed}`) - 0.5) * 2 * amp;
const doodleRadius = (seed: number) =>
  `${28 + jit(seed + 'a', 8)}px ${22 + jit(seed + 'b', 8)}px ${30 + jit(seed + 'c', 8)}px ${20 + jit(seed + 'd', 8)}px`;

// ───────────────────────── piezas dibujadas ─────────────────────────
const Box: React.FC<{
  x: number;
  y: number;
  w?: number;
  h?: number;
  bg?: string;
  seed?: number;
  scale?: number;
  rotate?: number;
  opacity?: number;
  border?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({x, y, w, h, bg = C.paper, seed = 1, scale = 1, rotate = 0, opacity = 1, border = 6, children, style}) => {
  const b = useBoil();
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
        rotate: `${rotate + jit(`${seed}-${b}`, 0.8)}deg`,
        opacity,
        background: bg,
        border: `${border}px solid ${C.ink}`,
        borderRadius: doodleRadius(seed * 13 + b),
        boxShadow: `${6 + jit(`${seed}s${b}`, 1)}px ${8 + jit(`${seed}t${b}`, 1)}px 0 ${C.ink}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: FONT,
        color: C.ink,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

/** Texto gigante con contorno, para la tipografía cinética. */
const Big: React.FC<{x: number; y: number; size: number; color?: string; scale?: number; rotate?: number; opacity?: number; children: React.ReactNode}> = ({
  x,
  y,
  size,
  color = C.yellow,
  scale = 1,
  rotate = 0,
  opacity = 1,
  children,
}) => {
  const b = useBoil();
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        translate: '-50% -50%',
        scale: `${scale}`,
        rotate: `${rotate + jit(`big${b}`, 0.7)}deg`,
        opacity,
        fontFamily: FONT,
        fontSize: size,
        lineHeight: 1,
        color,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        WebkitTextStroke: `${Math.round(size * 0.07)}px ${C.ink}`,
        paintOrder: 'stroke fill',
        textShadow: `${size * 0.05}px ${size * 0.07}px 0 ${C.ink}`,
      }}
    >
      {children}
    </div>
  );
};

/** Ráfaga de confeti/chispas que sale de (x, y) en t0. */
const Burst: React.FC<{t: number; t0: number; x: number; y: number; n?: number; colors?: string[]; spread?: number}> = ({
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

// ───────────────────────── 1 · fondo con rayos y cortinillas de color ─────────────────────────
const TINTS: [number, string][] = [
  [S.hook, C.yellow],
  [S.tokens, C.blue],
  [S.learn, C.green],
  [S.think, C.yellow],
  [S.lie, C.red],
  [S.end, C.yellow],
];
const Rays: React.FC<{color: string; t: number}> = ({color, t}) => (
  <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
    <g transform={`translate(540 1060) rotate(${t * 5})`}>
      {Array.from({length: 18}, (_, i) => {
        const a0 = (i / 18) * Math.PI * 2;
        const a1 = a0 + Math.PI / 18;
        const R = 1800;
        return <path key={i} d={`M0 0 L${Math.cos(a0) * R} ${Math.sin(a0) * R} L${Math.cos(a1) * R} ${Math.sin(a1) * R} Z`} fill={color} opacity={0.13} />;
      })}
    </g>
  </svg>
);
const Background: React.FC<{t: number}> = ({t}) => {
  const i = TINTS.filter(([s]) => s <= t).length - 1;
  const [s, col] = TINTS[Math.max(0, i)];
  const prev = TINTS[Math.max(0, i - 1)][1];
  const p = i > 0 ? ramp(t, s, 0.55, Easing.bezier(0.6, 0, 0.3, 1)) : 1;
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Rays color={prev} t={t} />
      <AbsoluteFill style={{clipPath: `circle(${p * 125}% at 50% 55%)`, background: C.paper}}>
        <Rays color={col} t={t} />
      </AbsoluteFill>
      {/* aro de la cortinilla, como el círculo que barre en Pinocho */}
      {p > 0 && p < 1 && (
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 1056,
            width: p * 2 * 1.25 * 1100,
            height: p * 2 * 1.25 * 1100,
            translate: '-50% -50%',
            borderRadius: '50%',
            border: `14px solid ${col}`,
            opacity: 0.7,
          }}
        />
      )}
    </AbsoluteFill>
  );
};

// ───────────────────────── 2 · el mono (clip de Veo o imagen con marioneta) ─────────────────────────
type Shot = {k: string; from: number; to: number; enter: 'punch' | 'slide' | 'iris' | 'drop' | 'face'};
const SHOTS: Shot[] = [
  {k: 'c1', from: S.hook, to: S.tokens, enter: 'face'},
  {k: 'c2', from: S.tokens, to: S.nums, enter: 'slide'},
  {k: 'c3', from: S.prob, to: S.write, enter: 'punch'},
  {k: 'c4', from: S.write, to: S.learn, enter: 'slide'},
  {k: 'c5', from: S.learn, to: S.train, enter: 'iris'},
  {k: 'c6', from: S.train, to: S.humans, enter: 'punch'},
  {k: 'c7', from: S.humans, to: S.think, enter: 'slide'},
  {k: 'c8', from: S.think, to: S.lie, enter: 'iris'},
  {k: 'c9', from: S.lie, to: S.end, enter: 'punch'},
  {k: 'c10', from: S.end, to: SHORT_CHATGPT_SECONDS, enter: 'drop'},
];

// Plan B sin clips de Veo: el mono de la hoja de referencia (4 poses) animado como marioneta.
// Cambia de pose en su palabra (pop con aplastamiento), da un saltito en cada palabra dicha y respira.
const POSES: [number, number][] = [
  [0, 0], [at('dentro'), 1], [at('palabra'), 0], [at('vez'), 1],
  [S.tokens, 0], [at('tokens'), 1],
  [S.prob, 3], [at('pega'), 1], [at('vuelta'), 0],
  [S.write, 0],
  [S.learn, 2], [at('barbaridad'), 1],
  [S.train, 0], [at('fallaba'), 2], [at('internos'), 1],
  [S.trillion, 1],
  [S.humans, 0], [at('util'), 1],
  [S.think, 3], [at('piensa', 2), 1],
  [S.lie, 3], [at('inventa'), 2], [at('seguridad'), 3],
  [S.end, 0], [at('adivinando'), 1], [at('pero', 2), 3], [at('adivinando', 2), 1],
];
const PoseMonkey: React.FC<{t: number}> = ({t}) => {
  const idx = POSES.filter(([s]) => s <= t).length - 1;
  const [t0, pose] = POSES[Math.max(0, idx)];
  const sw = pop(t, t0, 0.3);
  const w = [...WORDS].reverse().find((x) => x.start <= t);
  const hop = w && t - w.start < 0.2 ? Math.sin(((t - w.start) / 0.2) * Math.PI) * 10 : 0;
  const breathe = Math.sin(t * 4.2) * 0.014;
  const H = 780;
  return (
    <div
      style={{
        position: 'absolute',
        left: 540,
        top: 1730,
        translate: `-50% ${-100 + 0}% `,
        height: H,
        rotate: `${Math.sin(t * 2.3) * 2.2 + (1 - sw) * 6}deg`,
        transformOrigin: '50% 100%',
        scale: `${lerp(0.86, 1, sw) * (1 + breathe)} ${lerp(1.12, 1, sw) * (1 - breathe)}`,
        marginTop: -hop,
      }}
    >
      <Img src={staticFile(`${P}/poses/p${pose}.png`)} style={{height: H}} />
    </div>
  );
};

const Monkey: React.FC<{shot: Shot; t: number; i: number}> = ({shot, t, i}) => {
  const {fps} = useVideoConfig();
  const {k, from, to, enter} = shot;
  const dur = to - from;
  const inP = ramp(t, from, 0.32, easeOut);
  const out = ramp(t, to - 0.12, 0.12);
  const dir = i % 2 ? -1 : 1;
  let style: React.CSSProperties = {};
  if (enter === 'punch') style = {scale: `${lerp(1.35, 1, inP)}`, filter: inP < 0.98 ? `blur(${(1 - inP) * 10}px)` : undefined};
  if (enter === 'slide') style = {translate: `${lerp(dir * 1080, 0, inP)}px 0`, filter: inP < 0.98 ? `blur(${(1 - inP) * 16}px)` : undefined};
  if (enter === 'iris') style = {clipPath: `circle(${inP * 110}% at 50% 62%)`};
  if (enter === 'drop') style = {translate: `0 ${lerp(-700, 0, pop(t, from, 0.5))}px`};
  // Pinocho abre en primer plano de la cara y se aleja: aquí igual, y el cierre vuelve a acercarse (bucle).
  if (enter === 'face') style = {scale: `${lerp(1.9, 1, ramp(t, from + 0.15, 1.1, Easing.bezier(0.7, 0, 0.2, 1)))}`, transformOrigin: '50% 58%'};
  if (k === 'c10') style = {...style, scale: `${lerp(1, 1.5, ramp(t, at('adivinando', 2) - 0.3, 0.9, Easing.bezier(0.6, 0, 0.3, 1)))}`, transformOrigin: '50% 58%'};
  const clipLen = CLIPS[k];
  // Si el clip es más corto que el tramo, se ralentiza un pelín (nunca menos de 0,8×) y se congela al final.
  const rate = clipLen ? Math.max(0.8, Math.min(1.25, clipLen / dur)) : 1;
  // Marioneta (solo si NO hay clip): respiración, balanceo y salto en cada golpe.
  const tt = t - from;
  const puppet = clipLen
    ? {}
    : {rotate: `${Math.sin(tt * 3.1) * 2.2}deg`, scale: `${1 + Math.sin(tt * 6.2) * 0.012} ${1 - Math.sin(tt * 6.2) * 0.012}`, transformOrigin: '50% 90%'};
  return (
    <AbsoluteFill style={{opacity: 1 - out, mixBlendMode: 'multiply', ...style}}>
      <AbsoluteFill style={puppet}>
        {clipLen ? (
          <Sequence from={Math.round(from * fps)} durationInFrames={Math.ceil((dur + 0.2) * fps)} layout="none">
            <OffthreadVideo src={clipSrc(k)} muted playbackRate={rate} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
          </Sequence>
        ) : IMGS.has(k) ? (
          <Img src={imgSrc(k)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
        ) : (
          <PoseMonkey t={t} />
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ───────────────────────── 3 · motion graphics por bloque ─────────────────────────
const POOL = ['casa', 'perro', 'sol', 'mesa', 'rápido', 'verde', 'luna', 'tren', 'nube', 'gato', 'jamón', 'mar'];

/** Tragaperras de palabras: gira con candidatas y se clava en la palabra real cuando se dice. */
const Slot: React.FC<{t: number; spinFrom: number; lock: number; word: string; color?: string; size?: number}> = ({t, spinFrom, lock, word, color = C.yellow, size = 70}) => {
  const frame = useCurrentFrame();
  if (t < spinFrom) return <span style={{display: 'inline-block', minWidth: size * 3, borderBottom: `8px solid ${C.ink}`}}>&nbsp;</span>;
  if (t < lock) {
    const w = POOL[Math.floor(frame / 2 + spinFrom * 7) % POOL.length];
    return (
      <span style={{display: 'inline-block', minWidth: size * 3, color: '#999', filter: 'blur(2px)', translate: `0 ${((frame % 2) - 0.5) * 18}px`, borderBottom: `8px solid ${C.ink}`}}>
        {w}
      </span>
    );
  }
  const p = pop(t, lock, 0.35);
  return (
    <span
      style={{
        display: 'inline-block',
        background: color,
        border: `5px solid ${C.ink}`,
        borderRadius: 16,
        padding: '0 14px',
        scale: `${lerp(1.6, 1, p)}`,
      }}
    >
      {word}
    </span>
  );
};

const ONCE = ['una', 'y', 'otra', 'vez']; // "Una y otra vez": la primera "y" del guion
const Hook: React.FC<{t: number}> = ({t}) => {
  const v = span(t, 0.05, S.tokens + 0.1);
  if (v <= 0) return null;
  const second = t >= at('palabra');
  return (
    <>
      <Box x={540} y={400} w={960} bg={C.paper} seed={3} scale={pop(t, 0.05, 0.5) * v} style={{padding: '34px 40px', fontSize: 72, gap: 18, flexWrap: 'wrap', whiteSpace: 'normal', lineHeight: 1.3, textAlign: 'center'}}>
        {!second ? (
          <span>
            Así piensa ChatGPT por <Slot t={t} spinFrom={0.6} lock={at('dentro')} word="dentro" />
          </span>
        ) : (
          <span>
            {ONCE.map((w, i) => (
              <React.Fragment key={w}>
                <Slot t={t} spinFrom={i === 0 ? at('palabra') + 0.1 : at(ONCE[i - 1]) + 0.05} lock={at(w)} word={w} color={CHIP_COLORS[i]} size={50} />{' '}
              </React.Fragment>
            ))}
          </span>
        )}
      </Box>
      {/* interrogaciones que saltan al decir "adivinar" */}
      {[
        [170, 640, -14],
        [905, 610, 12],
        [800, 190, 8],
      ].map(([x, y, r], i) => {
        const p = pop(t, at('adivinar') + i * 0.12, 0.4);
        return (
          <Big key={i} x={x} y={y + Math.sin(t * 5 + i) * 12} size={130} color={CHIP_COLORS[i + 1]} rotate={r + Math.sin(t * 4 + i) * 6} scale={p * v}>
            ?
          </Big>
        );
      })}
      <Burst t={t} t0={at('dentro')} x={640} y={470} />
    </>
  );
};

const TOKS = [
  {s: 'lo', id: '1157'},
  {s: 'que', id: '1891'},
  {s: 'le', id: '514'},
  {s: 'escrib', id: '33790'},
  {s: 'es', id: '288'},
];
const Tokens: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.tokens, S.prob + 0.15);
  if (v <= 0) return null;
  const split = ramp(t, at('trocea') + 0.1, 0.5, overshoot);
  const toNum = (i: number) => ramp(t, at('convierte') + i * 0.12, 0.3);
  // en el bloque de números no hay mono: la fila baja al centro y crece
  const center = ramp(t, S.nums, 0.6, Easing.bezier(0.6, 0, 0.2, 1));
  const y = lerp(380, 820, center);
  const sc = lerp(0.92, 1.08, center);
  const widths = TOKS.map((x) => Math.max(x.s.length, x.id.length) * 30 + 52);
  const gap = lerp(0, 26, split);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (TOKS.length - 1);
  let x0 = 540 - total / 2;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <div style={{position: 'absolute', inset: 0, scale: `${sc}`, transformOrigin: `540px ${y}px`}}>
        {TOKS.map((tok, i) => {
          const w = widths[i];
          const cx = x0 + w / 2;
          x0 += w + gap;
          const n = toNum(i);
          const flip = Math.abs(Math.cos(n * Math.PI));
          const showNum = n > 0.5;
          const enter = pop(t, S.tokens + 0.1, 0.45);
          return (
            <Box
              key={i}
              x={cx}
              y={y + (split > 0 ? Math.sin(t * 6 + i) * 6 : 0)}
              w={w}
              h={110}
              seed={20 + i}
              bg={split > 0.02 ? (showNum ? C.paper : CHIP_COLORS[i]) : C.yellow}
              scale={enter}
              rotate={split * jit(`tr${i}`, 6)}
              style={{fontSize: 48, transform: `scaleY(${flip})`, borderRadius: split < 0.02 ? 0 : undefined}}
            >
              {showNum ? tok.id : tok.s}
            </Box>
          );
        })}
      </div>
      <Big x={540} y={lerp(560, 1080, center)} size={92} color={C.blue} scale={pop(t, at('tokens'), 0.4) * (1 - ramp(t, at('convierte'), 0.3))} rotate={-4}>
        TOKENS
      </Big>
      {/* lluvia de cifras: lo único que entiende */}
      {t > at('numeros') - 0.1 &&
        Array.from({length: 26}, (_, i) => {
          const sx = 60 + random(`rx${i}`) * 960;
          const sp = 380 + random(`rs${i}`) * 420;
          const yy = ((t - at('numeros')) * sp + random(`ry${i}`) * 1700) % 1700 + 120;
          return (
            <div key={i} style={{position: 'absolute', left: sx, top: yy, fontFamily: FONT, fontSize: 40 + random(`rz${i}`) * 30, color: CHIP_COLORS[i % 6], WebkitTextStroke: `2px ${C.ink}`, opacity: 0.8 * span(t, at('numeros'), S.prob + 0.1, 0.3)}}>
              {Math.floor(random(`rd${i}`) * 10)}
            </div>
          );
        })}
      <Big x={540} y={1160} size={64} color={C.paper} scale={pop(t, at('entiende') - 0.15, 0.4) * (1 - ramp(t, S.prob - 0.1, 0.2))} rotate={2}>
        solo entiende números
      </Big>
    </AbsoluteFill>
  );
};

const CANDS1 = [
  ['tejado', 62],
  ['sofá', 21],
  ['árbol', 11],
  ['coche', 6],
] as const;
const CANDS2 = [
  ['para', 44],
  ['y', 31],
  ['otra', 15],
  ['sin', 10],
] as const;
const Prob: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.prob, S.write + 0.1);
  if (v <= 0) return null;
  const tPega = at('pega');
  const tVuelta = at('vuelta');
  const second = t >= tVuelta;
  const cands = second ? CANDS2 : CANDS1;
  const grow0 = second ? tVuelta + 0.15 : at('calcula');
  const fly = ramp(t, tPega, 0.45, Easing.bezier(0.5, 0, 0.2, 1));
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Box x={540} y={250} seed={40} scale={pop(t, S.prob, 0.45)} style={{padding: '26px 34px', fontSize: 58, gap: 14}}>
        El gato se subió al{' '}
        {t >= tPega + 0.45 ? (
          <span style={{background: C.green, border: `5px solid ${C.ink}`, borderRadius: 14, padding: '0 12px', marginLeft: 12, scale: `${lerp(1.4, 1, pop(t, tPega + 0.45, 0.3))}`, display: 'inline-block'}}>tejado</span>
        ) : (
          <span style={{display: 'inline-block', width: 190, borderBottom: `7px solid ${C.ink}`}}>&nbsp;</span>
        )}
        {second && (
          <span style={{display: 'inline-block', width: 120, borderBottom: `7px solid ${C.ink}`, marginLeft: 10, opacity: ramp(t, tVuelta, 0.2)}}>&nbsp;</span>
        )}
      </Box>
      {cands.map(([w, pct], i) => {
        const g = ramp(t, grow0 + i * 0.1, 0.6);
        const best = i === 0 && t > at('probable') && !second;
        const y = 430 + i * 118;
        const hide = i === 0 && !second && t >= tPega;
        return (
          <React.Fragment key={`${second}${i}`}>
            {!hide && (
              <Box x={250} y={y} w={230} h={90} seed={50 + i} bg={best ? C.green : CHIP_COLORS[i]} scale={pop(t, grow0 + i * 0.08, 0.4)} style={{fontSize: 46}}>
                {w}
              </Box>
            )}
            <div
              style={{
                display: g < 0.03 ? 'none' : 'block',
                position: 'absolute',
                left: 390,
                top: y - 26,
                height: 52,
                width: g * pct * 7.2,
                background: best ? C.green : '#d8d8d8',
                border: `5px solid ${C.ink}`,
                borderRadius: 12,
              }}
            />
            <div style={{position: 'absolute', left: 405 + g * pct * 7.2, top: y - 30, fontFamily: FONT, fontSize: 48, color: C.ink, opacity: g}}>
              {Math.round(pct * g)} %
            </div>
          </React.Fragment>
        );
      })}
      {/* la ganadora vuela a la frase */}
      {fly > 0 && fly < 1 && (
        <Box x={lerp(250, 800, fly)} y={lerp(430, 250, fly) - Math.sin(fly * Math.PI) * 160} w={230} h={90} seed={77} bg={C.green} rotate={fly * 360} style={{fontSize: 46}}>
          tejado
        </Box>
      )}
      <Burst t={t} t0={tPega + 0.45} x={800} y={250} n={12} />
      {/* flecha circular: y vuelta a empezar */}
      {second && (
        <svg width={170} height={170} style={{position: 'absolute', left: 870, top: 560, rotate: `${-(t - tVuelta) * 540}deg`, scale: `${pop(t, tVuelta, 0.35)}`}}>
          <path d="M140 85 A55 55 0 1 1 85 30" fill="none" stroke={C.ink} strokeWidth={14} strokeLinecap="round" />
          <path d="M70 8 L100 30 L70 52 Z" fill={C.ink} />
        </svg>
      )}
    </AbsoluteFill>
  );
};

const ANSWER = ['Los', ' gatos', ' su', 'ben', ' a', ' los', ' tej', 'ados', ' para', ' vig', 'ilar', '.'];
const Write: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.write, S.learn + 0.05);
  if (v <= 0) return null;
  const step = (S.learn - 0.4 - (S.write + 0.3)) / ANSWER.length;
  const n = Math.floor((t - S.write - 0.3) / step) + 1;
  const b = Math.floor(t * 2) % 2;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Box x={540} y={360} w={940} h={330} seed={60} scale={pop(t, S.write, 0.4)} style={{alignItems: 'flex-start', justifyContent: 'flex-start', padding: 34, whiteSpace: 'normal', flexWrap: 'wrap', fontSize: 64, lineHeight: 1.45}}>
        {ANSWER.slice(0, Math.max(0, n)).map((tok, i) => (
          <span key={i} style={{background: `${CHIP_COLORS[i % 6]}AA`, borderRadius: 8, whiteSpace: 'pre', scale: `${pop(t, S.write + 0.3 + i * step, 0.25)}`, display: 'inline-block'}}>
            {tok}
          </span>
        ))}
        <span style={{display: 'inline-block', width: 8, height: 70, background: C.ink, opacity: b, marginLeft: 6}} />
      </Box>
      <Big x={540} y={640} size={60} color={C.orange} scale={pop(t, at('token', 3), 0.35)} rotate={-3}>
        token a token
      </Big>
    </AbsoluteFill>
  );
};

const Card: React.FC<{x: number; y: number; t: number; t0: number; label: string; seed: number; bg: string; children: React.ReactNode}> = ({x, y, t, t0, label, seed, bg, children}) => {
  const p = pop(t, t0, 0.45);
  if (p <= 0) return null;
  return (
    <>
      <Box x={x} y={y + Math.sin(t * 4 + seed) * 8} w={250} h={230} seed={seed} bg={bg} scale={p} rotate={jit(`c${seed}`, 7)}>
        {children}
      </Box>
      <Big x={x} y={y + 170} size={50} color={C.paper} scale={p}>
        {label}
      </Big>
    </>
  );
};
const Learn: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.learn, S.train + 0.05);
  if (v <= 0) return null;
  const tRead = at('leyendo');
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Big x={540} y={380} size={300} color={C.yellow} scale={pop(t, S.learn + 0.02, 0.4) * (1 - ramp(t, tRead, 0.25))} rotate={Math.sin(t * 6) * 8}>
        ?
      </Big>
      <Big x={540} y={400} size={86} color={C.green} scale={pop(t, tRead, 0.4) * (1 - ramp(t, at('libros') - 0.25, 0.2))} rotate={-4}>
        leyendo
      </Big>
      <Big x={540} y={530} size={64} color={C.paper} scale={pop(t, at('barbaridad'), 0.4) * (1 - ramp(t, at('libros') - 0.25, 0.2))} rotate={3}>
        una barbaridad de texto
      </Big>
      {/* páginas que salen volando del montón de libros */}
      {t > tRead &&
        Array.from({length: 18}, (_, i) => {
          const life = (t - tRead - i * 0.18) % 2.2;
          if (t - tRead - i * 0.18 < 0) return null;
          const px = 540 + jit(`px${i}`, 120) + Math.sin(life * 3 + i) * 120 * life;
          const py = 1150 - life * 520;
          return (
            <div key={i} style={{position: 'absolute', left: px, top: py, width: 70, height: 90, background: C.paper, border: `4px solid ${C.ink}`, borderRadius: 6, rotate: `${life * 220 + i * 30}deg`, opacity: Math.min(1, (2.2 - life) * 2) * 0.9}}>
              <div style={{margin: '14px 10px', height: 5, background: '#999', boxShadow: '0 14px 0 #999, 0 28px 0 #999, 0 42px 0 #bbb'}} />
            </div>
          );
        })}
      <Card x={210} y={520} t={t} t0={at('libros') - 0.1} label="libros" seed={81} bg={C.red}>
        <svg width={150} height={150} viewBox="0 0 150 150">
          <path d="M15 30 Q75 10 75 40 Q75 10 135 30 L135 125 Q75 105 75 135 Q75 105 15 125 Z" fill={C.paper} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
          <path d="M75 40 L75 135" stroke={C.ink} strokeWidth={7} />
        </svg>
      </Card>
      <Card x={540} y={500} t={t} t0={at('webs') - 0.1} label="webs" seed={82} bg={C.blue}>
        <svg width={170} height={140} viewBox="0 0 170 140">
          <rect x={8} y={8} width={154} height={124} rx={14} fill={C.paper} stroke={C.ink} strokeWidth={8} />
          <path d="M8 40 L162 40" stroke={C.ink} strokeWidth={7} />
          <circle cx={28} cy={24} r={6} fill={C.red} />
          <circle cx={48} cy={24} r={6} fill={C.yellow} />
          <circle cx={68} cy={24} r={6} fill={C.green} />
          <path d="M28 66 L140 66 M28 88 L120 88 M28 110 L100 110" stroke="#999" strokeWidth={9} strokeLinecap="round" />
        </svg>
      </Card>
      <Card x={870} y={520} t={t} t0={at('codigo') - 0.1} label="código" seed={83} bg={C.green}>
        <span style={{fontSize: 96, color: C.ink}}>{'</>'}</span>
      </Card>
    </AbsoluteFill>
  );
};

const Train: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.train, S.trillion + 0.1);
  if (v <= 0) return null;
  const tGuess = at('intentaba');
  const tFail = at('fallaba');
  const tFix = at('retocaba');
  const tGood = at('internos');
  const xp = ramp(t, tFail, 0.25);
  const good = t >= tGood;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Box x={540} y={260} seed={90} scale={pop(t, S.train, 0.4)} style={{padding: '24px 34px', fontSize: 64, gap: 16}}>
        El cielo es{' '}
        {good ? (
          <span style={{display: 'inline-block', background: C.blue, border: `5px solid ${C.ink}`, borderRadius: 14, padding: '0 14px', scale: `${lerp(1.5, 1, pop(t, tGood, 0.35))}`}}>azul ✓</span>
        ) : (
          <span style={{display: 'inline-block', width: 200, height: 70, background: C.yellow, border: `5px solid ${C.ink}`, rotate: '-4deg', scale: `${pop(t, S.train + 0.15, 0.35)}`}}>?</span>
        )}
      </Box>
      {/* el intento fallido */}
      {t > tGuess && !good && (
        <div style={{position: 'absolute', left: 540, top: 470, translate: '-50% -50%'}}>
          <Box x={0} y={0} seed={91} bg={C.green} scale={pop(t, tGuess, 0.35)} rotate={-6} style={{padding: '10px 30px', fontSize: 64}}>
            ¿verde?
          </Box>
          {xp > 0 && (
            <svg width={320} height={200} style={{position: 'absolute', left: -160, top: -100}}>
              <path d={`M30 30 L${30 + 260 * Math.min(1, xp * 2)} ${30 + 140 * Math.min(1, xp * 2)}`} stroke={C.red} strokeWidth={20} strokeLinecap="round" />
              {xp > 0.5 && <path d={`M290 30 L${290 - 260 * (xp - 0.5) * 2} ${30 + 140 * (xp - 0.5) * 2}`} stroke={C.red} strokeWidth={20} strokeLinecap="round" />}
            </svg>
          )}
        </div>
      )}
      {/* ruedecitas de ajuste que giran */}
      {[260, 540, 820].map((x, i) => {
        const p = pop(t, tFix + i * 0.1, 0.35);
        const rot = t > tFix ? (t - tFix) * (i % 2 ? -260 : 320) : 0;
        return (
          <svg key={i} width={150} height={150} style={{position: 'absolute', left: x - 75, top: 590, scale: `${p}`}}>
            <circle cx={75} cy={75} r={58} fill={CHIP_COLORS[i + 2]} stroke={C.ink} strokeWidth={8} />
            <g transform={`rotate(${rot} 75 75)`}>
              <path d="M75 75 L75 26" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
            </g>
          </svg>
        );
      })}
      <Big x={540} y={820} size={58} color={C.paper} scale={pop(t, at('miles') - 0.05, 0.35)} rotate={-2}>
        miles de millones de ajustes
      </Big>
    </AbsoluteFill>
  );
};

const Trillion: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.trillion, S.humans + 0.05, 0.12);
  if (v <= 0) return null;
  const tb = at('billones');
  const p = ramp(t, tb - 0.25, at('veces') + 0.2 - tb, Easing.bezier(0.3, 0, 0.2, 1));
  const n = Math.floor(Math.pow(10, lerp(3, 12, p)));
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Big x={540} y={360} size={150} color={C.red} scale={lerp(2.4, 1, pop(t, tb, 0.3))} rotate={-5}>
        BILLONES
      </Big>
      <Big x={540} y={520} size={86} color={C.paper} scale={pop(t, at('veces'), 0.3)} rotate={3}>
        de veces
      </Big>
      <Box x={540} y={690} seed={99} bg={C.yellow} scale={pop(t, S.trillion + 0.1, 0.3)} style={{padding: '8px 30px', fontSize: 74}}>
        {n.toLocaleString('es-ES')}
      </Box>
    </AbsoluteFill>
  );
};

const Star: React.FC<{x: number; y: number; s: number; color: string}> = ({x, y, s, color}) => (
  <svg width={140} height={140} viewBox="0 0 140 140" style={{position: 'absolute', left: x - 70, top: y - 70, scale: `${s}`}}>
    <path d="M70 8 L86 52 L132 54 L95 82 L108 128 L70 101 L32 128 L45 82 L8 54 L54 52 Z" fill={color} stroke={C.ink} strokeWidth={8} strokeLinejoin="round" />
  </svg>
);
const Humans: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.humans, S.think + 0.05);
  if (v <= 0) return null;
  const tp = at('puntuaron');
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Big x={540} y={300} size={74} color={C.pink} scale={pop(t, S.humans + 0.1, 0.35)} rotate={-3}>
        personas de verdad
      </Big>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} x={180 + i * 180} y={520 + Math.sin(t * 5 + i) * 14} s={pop(t, tp + i * 0.1, 0.35)} color={i < 4 ? C.yellow : '#ddd'} />
      ))}
      <Box x={540} y={740} seed={110} bg={C.green} scale={pop(t, at('util') - 0.05, 0.35)} rotate={-6} style={{padding: '8px 34px', fontSize: 80}}>
        ÚTIL ✓
      </Box>
      <Burst t={t} t0={at('util')} x={540} y={740} n={14} />
    </AbsoluteFill>
  );
};

const Think: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.think, S.lie + 0.05);
  if (v <= 0) return null;
  const items = [
    {w: 'gramática', t0: at('gramatica'), c: C.blue},
    {w: 'datos', t0: at('datos'), c: C.orange},
    {w: 'razonamiento', t0: at('razonamiento'), c: C.pink},
  ];
  const cp = pop(t, S.think + 0.1, 0.5);
  const tq = at('parece');
  return (
    <AbsoluteFill style={{opacity: v}}>
      {/* nube de pensamiento dibujada */}
      <svg width={1000} height={620} viewBox="0 0 1000 620" style={{position: 'absolute', left: 40, top: 110, scale: `${cp}`}}>
        <path
          d="M180 470 C80 470 60 360 140 330 C80 250 170 160 260 200 C290 100 430 80 490 160 C560 70 720 90 740 190 C850 160 930 260 870 330 C950 380 900 490 800 470 C760 540 620 540 580 490 C520 550 360 550 330 490 C280 530 200 520 180 470 Z"
          fill={C.paper}
          stroke={C.ink}
          strokeWidth={9}
        />
        <circle cx={420} cy={560} r={22} fill={C.paper} stroke={C.ink} strokeWidth={8} />
        <circle cx={470} cy={605} r={12} fill={C.paper} stroke={C.ink} strokeWidth={7} />
      </svg>
      <Big x={540} y={400} size={62} color={C.purple} scale={pop(t, S.think + 0.2, 0.4) * (1 - ramp(t, at('gramatica') - 0.2, 0.2))} rotate={-2}>
        para predecir tanto texto…
      </Big>
      <Big x={540} y={900} size={58} color={C.paper} scale={pop(t, at('aprender'), 0.35) * (1 - ramp(t, at('gramatica') - 0.2, 0.2))} rotate={2}>
        tuvo que aprender
      </Big>
      {items.map(({w, t0, c}, i) => {
        const fly = ramp(t, t0 - 0.1, 0.45, overshoot);
        const ang = t * 0.9 + (i * Math.PI * 2) / 3;
        const ox = 540 + Math.cos(ang) * 220;
        const oy = 400 + Math.sin(ang) * 90;
        const sx = i === 0 ? -300 : i === 1 ? 1380 : 540;
        const sy = i === 2 ? -200 : 1100;
        if (t < t0 - 0.1) return null;
        return (
          <Box key={w} x={lerp(sx, ox, fly)} y={lerp(sy, oy, fly)} seed={120 + i} bg={c} style={{padding: '6px 24px', fontSize: 52}} rotate={jit(`th${i}`, 8)}>
            {w}
          </Box>
        );
      })}
      <Big x={540} y={420} size={120} color={C.yellow} scale={pop(t, tq, 0.4)} rotate={-4}>
        ¿piensa?
      </Big>
      <Burst t={t} t0={at('piensa', 2)} x={540} y={420} colors={[C.yellow, C.orange, C.paper]} n={20} />
    </AbsoluteFill>
  );
};

const Lie: React.FC<{t: number}> = ({t}) => {
  const v = span(t, S.lie, S.end + 0.05);
  if (v <= 0) return null;
  const tc = at('comprueba');
  const tv = at('verdad');
  const ti = at('inventa');
  const ts = at('seguridad');
  const stamp = ramp(t, ti - 0.05, 0.18, Easing.in(Easing.quad));
  const no = t > tv ? Math.sin((t - tv) * 30) * 18 * decay(t, tv, 3) : 0;
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Box x={540 + no} y={270} seed={130} scale={pop(t, S.lie + 0.15, 0.4)} style={{padding: '22px 34px', fontSize: 64, gap: 24}}>
        <span style={{display: 'inline-block', width: 70, height: 70, border: `7px solid ${C.ink}`, borderRadius: 10, background: C.paper}} />
        ¿Es verdad?
      </Box>
      <Box x={540} y={460} seed={131} bg={C.yellow} scale={pop(t, at('suena') - 0.05, 0.35) * (1 - ramp(t, ti - 0.2, 0.15))} rotate={3} style={{padding: '8px 28px', fontSize: 54}}>
        suena probable ✓
      </Box>
      {/* el sello, copiado del MENTIRA/VERDAD de Pinocho */}
      {stamp > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 540,
            top: 470,
            translate: '-50% -50%',
            scale: `${lerp(3.2, 1, stamp)}`,
            opacity: Math.min(1, stamp * 1.5),
            rotate: '-13deg',
            border: `14px solid ${C.red}`,
            borderRadius: 18,
            padding: '6px 34px',
            fontFamily: FONT,
            fontSize: 132,
            color: C.red,
            letterSpacing: 4,
            background: 'rgba(255,255,255,0.82)',
          }}
        >
          INVENTADO
        </div>
      )}
      <div style={{position: 'absolute', left: 140, top: 690, width: 800, opacity: ramp(t, ts - 0.2, 0.2)}}>
        <div style={{fontFamily: FONT, fontSize: 46, color: C.ink, marginBottom: 10}}>seguridad</div>
        <div style={{height: 56, border: `6px solid ${C.ink}`, borderRadius: 14, background: C.paper, overflow: 'hidden'}}>
          <div style={{height: '100%', width: `${ramp(t, ts - 0.1, 0.5) * 100}%`, background: C.green}} />
        </div>
        <div style={{position: 'absolute', right: 0, top: 0, fontFamily: FONT, fontSize: 46}}>{Math.round(ramp(t, ts - 0.1, 0.5) * 100)} %</div>
      </div>
    </AbsoluteFill>
  );
};

const End: React.FC<{t: number}> = ({t}) => {
  const v = ramp(t, S.end, 0.25);
  if (v <= 0) return null;
  const t1 = at('adivinando');
  const t2 = at('adivinando', 2);
  const shake = Math.sin((t - at('pero', 2)) * 40) * 10 * decay(t, at('pero', 2), 5);
  return (
    <AbsoluteFill style={{opacity: v}}>
      <Box x={540 + shake} y={400} seed={140} scale={pop(t, S.end, 0.45)} style={{padding: '30px 40px', fontSize: 74, gap: 18}}>
        Está <Slot t={t} spinFrom={at('esta') - 0.1} lock={t1} word="adivinando" color={t >= t2 ? C.orange : C.yellow} />
      </Box>
      <Big x={540} y={620} size={70} color={C.paper} scale={pop(t, at('muy'), 0.35)} rotate={-3}>
        muy bien, pero…
      </Big>
      <Burst t={t} t0={t1} x={640} y={400} />
      <Burst t={t} t0={t2} x={640} y={400} n={22} />
    </AbsoluteFill>
  );
};

// ───────────────────────── 4 · subtítulos ─────────────────────────
const KEY: Record<string, string> = {
  chatgpt: C.yellow, adivinar: C.yellow, tokens: C.blue, token: C.blue, numeros: C.green, probable: C.yellow,
  leyendo: C.green, libros: C.green, webs: C.green, codigo: C.green, billones: C.red, personas: C.pink,
  piensa: C.yellow, nunca: C.red, verdad: C.green, inventa: C.red, adivinando: C.yellow, millones: C.orange,
  gramatica: C.blue, datos: C.orange, razonamiento: C.pink, util: C.green,
};
type Chunk = {words: Word[]; start: number; end: number};
const CHUNKS: Chunk[] = (() => {
  const out: Chunk[] = [];
  let cur: Word[] = [];
  for (const w of WORDS) {
    cur.push(w);
    const strong = /[.?!:,;]$/.test(w.text);
    if (strong || cur.length >= 3) {
      out.push({words: cur, start: cur[0].start, end: w.end});
      cur = [];
    }
  }
  if (cur.length) out.push({words: cur, start: cur[0].start, end: cur[cur.length - 1].end});
  return out;
})();
const Captions: React.FC<{t: number}> = ({t}) => {
  const c = [...CHUNKS].reverse().find((x) => x.start - 0.04 <= t);
  if (!c || t > c.end + 0.6) return null;
  const sh = (n: number) =>
    [...Array(16)].map((_, i) => `${(Math.cos((i / 16) * Math.PI * 2) * n).toFixed(1)}px ${(Math.sin((i / 16) * Math.PI * 2) * n).toFixed(1)}px 0 ${C.ink}`).join(',') +
    `, 0 ${n * 1.4}px 0 ${C.ink}`;
  return (
    <div style={{position: 'absolute', left: 50, right: 50, top: 1420, textAlign: 'center', fontFamily: FONT, fontSize: 104, lineHeight: 1.1, letterSpacing: '-0.01em'}}>
      {c.words.map((w, i) => {
        const said = t >= w.start - 0.02;
        const p = pop(t, w.start - 0.03, 0.22);
        const k = KEY[norm(w.text)];
        return (
          <span
            key={`${c.start}-${i}`}
            style={{
              display: 'inline-block',
              margin: '0 0.2em',
              color: said ? k ?? C.paper : C.paper,
              opacity: said ? 1 : 0,
              scale: `${said ? lerp(0.6, k ? 1.12 : 1, p) : 0.6}`,
              rotate: k && said ? `${jit(w.text, 4)}deg` : '0deg',
              textShadow: sh(8),
            }}
          >
            {w.text.replace(/[.,:;]$/, '')}
          </span>
        );
      })}
    </div>
  );
};

// ───────────────────────── 5 · sonido ─────────────────────────
type Cue = [string, number, number?];
const G = gains as Record<string, {gain: number}>;
const SFX: Cue[] = [
  // tragaperras del gancho
  ...Array.from({length: 7}, (_, i): Cue => ['tick', 0.6 + i * 0.12, 0.7]),
  ['chime', at('dentro'), 1.2],
  ['pop', at('dentro'), 1],
  ['pop', at('adivinar'), 0.9],
  ['pop', at('adivinar') + 0.12, 0.8],
  ['pop', at('adivinar') + 0.24, 0.8],
  ['click', at('una'), 1],
  ['click', at('y'), 1],
  ['click', at('otra'), 1],
  ['click', at('vez'), 1],
  // tokens → números
  ['ch_whoosh', S.tokens - 0.15, 0.9],
  ['page', at('trocea') + 0.1, 1],
  ['click', at('trocea') + 0.25, 0.8],
  ['click', at('trocea') + 0.4, 0.8],
  ['pop', at('tokens'), 1.1],
  ...TOKS.map((_, i): Cue => ['tick', at('convierte') + i * 0.12, 0.9]),
  ['ch_whoosh_soft', at('numeros') - 0.2, 1],
  ['coins', at('numeros'), 0.6],
  ['pop', at('entiende') - 0.15, 0.9],
  // probabilidades
  ['ch_whoosh', S.prob - 0.15, 0.9],
  ['swoosh', at('calcula'), 0.8],
  ['chime', at('probable'), 0.8],
  ['swoosh', at('pega'), 1],
  ['pop', at('pega') + 0.45, 1.1],
  ['swoosh', at('vuelta'), 0.9],
  // escribe token a token
  ['ch_whoosh', S.write - 0.15, 0.9],
  ['typing', S.write + 0.3, 1],
  ['typing', S.write + 1.6, 0.9],
  ['chime', S.learn - 0.35, 0.7],
  // aprende leyendo
  ['ch_whoosh_soft', S.learn - 0.2, 1],
  ['pop', at('como'), 1],
  ['flutter', at('leyendo'), 1],
  ['page', at('barbaridad'), 1],
  ['pop', at('libros') - 0.1, 1],
  ['pop', at('webs') - 0.1, 1],
  ['pop', at('codigo') - 0.1, 1],
  ['flutter', at('codigo'), 0.8],
  // entrenamiento
  ['ch_whoosh', S.train - 0.15, 0.9],
  ['stamp', S.train + 0.15, 0.8],
  ['pop', at('intentaba'), 0.9],
  ['knock', at('fallaba'), 1.2],
  ['ch_hit', at('fallaba') + 0.05, 0.5],
  ['click', at('retocaba'), 1],
  ['click', at('retocaba') + 0.12, 1],
  ['click', at('retocaba') + 0.24, 1],
  ['pop', at('miles'), 0.9],
  ['chime', at('internos'), 1],
  // billones
  ['ch_riser', at('billones') - 1.1, 1],
  ['boom', at('billones'), 1.2],
  ['ch_hit', at('billones') + 0.02, 0.6],
  ...Array.from({length: 8}, (_, i): Cue => ['tick', at('billones') + i * 0.09, 0.7]),
  ['pop', at('veces'), 1],
  // personas
  ['ch_whoosh', S.humans - 0.15, 0.9],
  ['crowd', at('puntuaron') - 0.1, 0.9],
  ...[0, 1, 2, 3, 4].map((i): Cue => ['pop', at('puntuaron') + i * 0.1, 0.7]),
  ['chime', at('util'), 1],
  // parece que piensa
  ['ch_whoosh_soft', S.think - 0.2, 1],
  ['swoosh', at('gramatica') - 0.1, 0.9],
  ['swoosh', at('datos') - 0.1, 0.9],
  ['swoosh', at('razonamiento') - 0.1, 0.9],
  ['ch_riser', at('parece') - 1.0, 0.8],
  ['boom', at('parece'), 1],
  ['chime', at('piensa', 2), 1.2],
  // se lo inventa
  ['ch_whoosh', S.lie - 0.15, 1],
  ['ch_hit', S.lie, 0.4],
  ['pop', at('comprueba') - 0.15, 0.9],
  ['knock', at('verdad'), 1],
  ['pop', at('suena') - 0.05, 0.9],
  ['ch_riser', at('inventa') - 1.1, 0.9],
  ['stamp', at('inventa'), 1.4],
  ['boom', at('inventa'), 1.1],
  ['swoosh', at('seguridad') - 0.2, 0.8],
  // cierre en bucle
  ['ch_whoosh', S.end - 0.15, 1],
  ...Array.from({length: 8}, (_, i): Cue => ['tick', at('esta') - 0.1 + i * 0.13, 0.7]),
  ['chime', at('adivinando'), 1.2],
  ['pop', at('adivinando'), 1],
  ['knock', at('pero', 2), 0.8],
  ['chime', at('adivinando', 2), 1.3],
  ['pop', at('adivinando', 2), 1.1],
];
const Sound: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <>
      <Audio src={staticFile(`${P}/voz_11.mp3`)} />
      {SFX.map(([s, a, k = 1], i) => (
        <Sequence key={i} from={Math.max(0, Math.round(a * fps))} durationInFrames={Math.round(3 * fps)} layout="none" name={`sfx ${s}`}>
          <Audio src={staticFile(`${P}/sfx/${s}.mp3`)} volume={Math.min(1, (G[s]?.gain ?? 0.25) * k)} />
        </Sequence>
      ))}
    </>
  );
};

// ───────────────────────── composición ─────────────────────────
const PUNCH = [at('dentro'), at('tokens'), at('numeros'), at('pega'), at('billones'), at('piensa', 2), at('inventa'), at('adivinando'), at('adivinando', 2)];
const SHOW_CAPTIONS = false;
export const ShortAnimadoChatgpt: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const punch = PUNCH.reduce((a, p) => a + 0.05 * decay(t, p, 7), 0);
  const quake = (p: number, amp: number) => Math.sin((t - p) * 55) * amp * decay(t, p, 6);
  const sx = quake(at('billones'), 18) + quake(at('inventa'), 22);
  const sy = quake(at('billones') + 0.03, 10) + quake(at('inventa') + 0.03, 12);
  return (
    <AbsoluteFill style={{background: C.paper}}>
      <Sound />
      <AbsoluteFill style={{scale: `${1 + punch}`, translate: `${sx}px ${sy}px`}}>
        <Background t={t} />
        {SHOTS.map((s, i) => (t >= s.from - 0.05 && t <= s.to + 0.05 ? <Monkey key={s.k} shot={s} t={t} i={i} /> : null))}
        <Hook t={t} />
        <Tokens t={t} />
        <Prob t={t} />
        <Write t={t} />
        <Learn t={t} />
        <Train t={t} />
        <Trillion t={t} />
        <Humans t={t} />
        <Think t={t} />
        <Lie t={t} />
        <End t={t} />
      </AbsoluteFill>
      {/* Subtítulos quitados (3-nov-2026): duplicaban el texto de los gráficos. */}
      {SHOW_CAPTIONS && <Captions t={t} />}
    </AbsoluteFill>
  );
};
