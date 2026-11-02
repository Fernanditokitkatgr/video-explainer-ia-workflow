/**
 * Hoja de personajes (13 s): presenta a todo el reparto del motor moviéndose, con su nombre.
 * Sirve de prueba visual de la biblioteca y de catálogo para quien haga Shorts con el motor.
 * Está montada con la MISMA estructura de plano que un vídeo (reparto + tramos), sin código especial.
 */
import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Lienzo, PlanoResuelto} from './MotorPlano';
import {Cara, Pose, TipoMono} from './Mono';
import {Personaje} from './Reparto';
import {Cue} from './Escenas';
import gains from '../../../assets/sfx/motor/sfx_gain.json';

const G = gains as Record<string, number>;

export const HOJA_SEGUNDOS = 13;

const CAST: {id: string; tipo: TipoMono; nombre: string; color: string}[] = [
  {id: 'mono', tipo: 'protagonista', nombre: 'Mono', color: 'amarillo'},
  {id: 'hacker', tipo: 'ciberdelincuente', nombre: 'Ciberdelincuente', color: 'morado'},
  {id: 'rico', tipo: 'rico', nombre: 'Mono rico', color: 'verde'},
  {id: 'ia', tipo: 'ia', nombre: 'Mono IA', color: 'azul'},
  {id: 'abuelo', tipo: 'abuelo', nombre: 'Abuelo', color: 'naranja'},
  {id: 'currito', tipo: 'currito', nombre: 'Currito', color: 'rosa'},
  {id: 'nino', tipo: 'nino', nombre: 'Peque', color: 'amarillo'},
];
const POSES: Pose[] = ['saludar', 'señalar', 'brazos_arriba', 'pensar', 'encogerse', 'jarras', 'brazos_cruzados', 'miedo', 'presentar', 'señalar_arriba'];
const CARAS: Cara[] = ['risa', 'sorpresa', 'guiño', 'normal', 'miedo', 'enfado', 'triste', 'chulo'];

const construir = (): PlanoResuelto => {
  const reparto: Record<string, Personaje> = {};
  const n = CAST.length;
  CAST.forEach((c, i) => {
    const x = 175 + i * ((1920 - 350) / (n - 1));
    const y = 900;
    const t0 = 0.3 + i * 0.35;
    const claves: any[] = [{t: t0, x, y, escala: c.tipo === 'nino' ? 0.62 : 0.58, pose: 'saludar', cara: 'risa', habla: i % 2 === 0}];
    // cambia de pose y cara cada ~1,1 s, desfasados
    for (let k = 1; k < 9; k++) {
      claves.push({t: t0 + 2.6 + k * 0.95 + (i % 3) * 0.12, pose: POSES[(i + k) % POSES.length], cara: CARAS[(i * 2 + k) % CARAS.length], salta: k % 4 === i % 4});
    }
    // final: todos celebran
    claves.push({t: 11.2, pose: 'celebrar', cara: 'risa', salta: true});
    // el ciberdelincuente cruza corriendo a mitad (desplazamiento entre claves)
    if (c.id === 'hacker') {
      for (let q = claves.length - 1; q >= 0; q--) if (claves[q].t > 5.9 && claves[q].t < 7.8) claves.splice(q, 1);
      claves.push({t: 6.0, x: x + 330, y, pose: 'jarras', cara: 'chulo'}, {t: 7.2, x, y, cara: 'risa', pose: 'señalar'});
      claves.sort((a, b) => a.t - b.t);
    }
    reparto[c.id] = {
      tipo: c.tipo,
      apariciones: [
        {
          t0,
          t1: HOJA_SEGUNDOS + 1,
          entrada: i % 2 ? 'cae' : 'salto',
          salida: 'nada',
          claves: claves.map((k) => ({x: k.x ?? x, y: k.y ?? y, ...k})).map((k, j, arr) => ({...k, x: k.x ?? arr[0].x, y: k.y ?? arr[0].y})),
          dice: c.id === 'mono' ? [{texto: '¡Hola!', al: 1.0, hasta: 2.4}] : c.id === 'rico' ? [{texto: '¡Mi dinero!', al: 8.6, hasta: 10.2}] : [],
        },
      ],
    };
  });
  // palabras de mentira para que las bocas se muevan
  const palabras = Array.from({length: 60}, (_, i) => ({text: 'hola', start: 0.8 + i * 0.22, end: 0.8 + i * 0.22 + 0.18}));
  const nombres = CAST.map((c, i) => ({
    texto: c.nombre,
    al: 0.6 + i * 0.35,
    caja: true,
    color: c.color,
    tam: c.nombre.length > 10 ? 30 : 40,
  }));
  return {
    slug: 'hoja',
    fps: 30,
    ancho: 1920,
    alto: 1080,
    duracion: HOJA_SEGUNDOS,
    voz: '',
    palabras,
    sfx_gain: G,
    rayos: {x: 960, y: 700},
    reparto,
    tramos: [
      {
        t0: 0,
        t1: 4.5,
        color: 'amarillo',
        escenas: [{tipo: 'texto', t0: 0, t1: 4.5, d: {zona: 'arriba', caja: {y: 130}, palabras: [{texto: 'EL', al: 0.1, color: 'amarillo'}, {texto: 'REPARTO', al: 0.35, color: 'amarillo'}], tam: 120}}],
      },
      {t0: 4.5, t1: 8.5, color: 'azul', escenas: [{tipo: 'texto', t0: 4.5, t1: 8.5, d: {zona: 'arriba', caja: {y: 130}, palabras: [{texto: 'POSES', al: 4.6, color: 'azul'}, {texto: 'Y CARAS', al: 4.85, color: 'blanco'}], tam: 110}}]},
      {t0: 8.5, t1: 13, color: 'verde', escenas: [{tipo: 'texto', t0: 8.5, t1: 13, d: {zona: 'arriba', caja: {y: 130}, palabras: [{texto: '¡TODOS', al: 8.6, color: 'verde'}, {texto: 'A UNA!', al: 8.85, color: 'blanco'}], tam: 110}}]},
      ...CAST.map((c, i) => ({
        t0: 0,
        t1: 13,
        escenas: [{tipo: 'texto', t0: 0, t1: 13, d: {palabras: [{...nombres[i], x: 175 + i * ((1920 - 350) / (CAST.length - 1)), y: 1000}], sfx: false}}],
      })),
    ],
  };
};

export const HOJA = construir();

const CUES_HOJA: Cue[] = [
  ...CAST.map((c, i): Cue => ['boing', 0.3 + i * 0.35 + 0.4, 0.6]),
  ['pop', 0.1, 0.8],
  ['pop', 0.35, 0.8],
  ['whoosh', 4.4, 0.9],
  ['ding', 4.6, 0.8],
  ['whoosh', 6.1, 0.7],
  ['pasos', 6.2, 0.6],
  ['whoosh', 8.4, 0.9],
  ['caja', 8.7, 0.8],
  ['subida', 10.2, 0.8],
  ['exito', 11.2, 1],
  ['boing', 11.25, 0.7],
];

export const HojaPersonajes: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      {CUES_HOJA.map(([s, a, k = 1], i) => (
        <Sequence key={i} from={Math.round(a * fps)} durationInFrames={Math.round(2.5 * fps)} layout="none">
          <Audio src={staticFile(`sfx/${s}.mp3`)} volume={Math.min(1, (G[s] ?? 0.25) * k)} />
        </Sequence>
      ))}
      <Lienzo plano={HOJA} />
    </AbsoluteFill>
  );
};
