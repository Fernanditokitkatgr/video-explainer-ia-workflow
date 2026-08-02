import React from 'react';
import { AbsoluteFill } from 'remotion';

/**
 * Pinta las etiquetas en español ENCIMA de la imagen, como texto de verdad.
 *
 * Por qué existe: pedirle al generador de imágenes que escriba los rótulos daba
 * faltas constantes ("¡HOLA MONDO!", "COMPORTBAMIENTO", "FEBRORO", "TECONLOGÍA"),
 * inventaba etiquetas que contradecían la narración y a veces escribía en inglés
 * ("AI" en vez de "IA"). Eran 44 de 82 fallos en una sola tanda. Con el texto
 * pintado aquí la ortografía es exacta siempre, porque ya no se genera: se escribe.
 *
 * Las imágenes se piden ahora SIN ningún texto, y estas etiquetas se colocan
 * alternando esquinas para que no tapen al personaje, que suele ir centrado.
 */

const POSICIONES: React.CSSProperties[] = [
  { top: '7%', left: '5%', textAlign: 'left' },
  { top: '7%', right: '5%', textAlign: 'right' },
  { bottom: '8%', left: '5%', textAlign: 'left' },
  { bottom: '8%', right: '5%', textAlign: 'right' },
];

export const LabelOverlay: React.FC<{ labels?: string[]; seed?: number }> = ({
  labels,
  seed = 0,
}) => {
  if (!labels || labels.length === 0) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {labels.slice(0, 4).map((texto, i) => {
        // El seed (índice del frame) desplaza la esquina inicial, así dos planos
        // seguidos no ponen la etiqueta en el mismo sitio.
        const pos = POSICIONES[(i + seed) % POSICIONES.length];
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              maxWidth: '38%',
              fontFamily: "'Ink Free', 'Segoe Print', 'Comic Sans MS', sans-serif",
              fontSize: labels.length > 2 ? 58 : 72,
              fontWeight: 700,
              lineHeight: 1.05,
              color: '#111111',
              textTransform: 'uppercase',
              // Contorno blanco: legible aunque caiga sobre un trazo negro del dibujo.
              WebkitTextStroke: '2px #ffffff',
              paintOrder: 'stroke fill',
              textShadow: '0 2px 0 rgba(255,255,255,0.9)',
              ...pos,
            }}
          >
            {texto}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
