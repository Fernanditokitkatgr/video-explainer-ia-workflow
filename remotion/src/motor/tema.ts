/**
 * Tema de las piezas compartidas (Caja, Grande). Sin mundo el contexto vale null y las piezas pintan
 * exactamente lo de siempre; con `"mundo"` en el plano, Mundos.tsx lo rellena. Va en un archivo aparte
 * para que piezas.tsx no dependa de Mundos.tsx (que a su vez importa las piezas).
 */
import {createContext, useContext} from 'react';

export type TemaPiezas = {
  fuente: string;
  fuenteTitulo: string;
  /** borde de las cajas */
  linea: string;
  cajaFondo: string;
  cajaTexto: string;
  radio: number;
  sombra: string;
  /** contorno y sombra de los títulos grandes */
  contornoTitulo: string;
  /** sin el temblor de rotulador en las cajas: el mono sigue a mano, el grafismo es preciso */
  quieto: boolean;
};

export const TemaCtx = createContext<TemaPiezas | null>(null);
export const useTema = () => useContext(TemaCtx);
