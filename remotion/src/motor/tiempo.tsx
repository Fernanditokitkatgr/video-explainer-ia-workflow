/**
 * Contexto de tiempo del motor: palabras de la locución (whisper alineado con el guion) y segundo actual.
 * Así cualquier pieza (la boca de un mono, un bocadillo) sabe qué palabra se está diciendo.
 */
import React, {createContext, useContext} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type Palabra = {text: string; start: number; end: number};

const Ctx = createContext<Palabra[]>([]);
export const PalabrasProvider: React.FC<{words: Palabra[]; children: React.ReactNode}> = ({words, children}) => (
  <Ctx.Provider value={words}>{children}</Ctx.Provider>
);
export const usePalabras = () => useContext(Ctx);

/** Segundo actual del vídeo. */
export const useT = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return f / fps;
};

const VOCALES = /[aeiouáéíóúü]/gi;
/** Apertura de la boca (0..1) según la palabra que suena: una "sílaba" por vocal. */
export const aperturaBoca = (words: Palabra[], t: number): number => {
  // búsqueda binaria de la palabra en curso
  let lo = 0;
  let hi = words.length - 1;
  let w: Palabra | undefined;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (words[m].start <= t) {
      w = words[m];
      lo = m + 1;
    } else hi = m - 1;
  }
  if (!w || t > w.end + 0.03) return 0;
  const n = Math.max(1, (w.text.match(VOCALES) || []).length);
  const d = Math.max(0.05, w.end - w.start);
  const p = Math.min(1, Math.max(0, (t - w.start) / d));
  return 0.2 + 0.8 * Math.abs(Math.sin(p * n * Math.PI));
};

/** Inicio de la palabra en curso (para el saltito por palabra), o null. */
export const inicioPalabra = (words: Palabra[], t: number): number | null => {
  let lo = 0;
  let hi = words.length - 1;
  let w: Palabra | undefined;
  while (lo <= hi) {
    const m = (lo + hi) >> 1;
    if (words[m].start <= t) {
      w = words[m];
      lo = m + 1;
    } else hi = m - 1;
  }
  return w && t <= w.end + 0.05 ? w.start : null;
};
