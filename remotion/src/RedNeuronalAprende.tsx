import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "Así aprende de verdad una red neuronal" (parte 2)
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35). 1 segmento = 1 imagen.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "En el vídeo anterior viste la estructura de una red neuronal,"
  { file: '0_03.jpg', startSec: 3.18 },  // "neuronas,"
  { file: '0_03_b.jpg', startSec: 3.98 },  // "capas, pesos,"
  { file: '0_05.jpg', startSec: 5.3 },  // "sesgos,"
  { file: '0_05_b.jpg', startSec: 5.96 },  // "un esqueleto entero listo para funcionar, pero le faltaba lo más importante,"
  { file: '0_10.jpg', startSec: 10.38 },  // "aprender."
  { file: '0_11.jpg', startSec: 11.32 },  // "Hoy te lo cuento."
  { file: '0_13.jpg', startSec: 13.3 },  // "Repaso relámpago por si se te olvidó algo."
  { file: '0_16.jpg', startSec: 16.32 },  // "Nuestra red recibe 784 números, 1 por pixel."
  { file: '0_20.jpg', startSec: 20.54 },  // "Los pasa por un par de capas ocultas y escúpe 10 números al final, 1 por cada dígito posible."
  { file: '0_26.jpg', startSec: 26.34 },  // "El más brillante de esos 10 gana. Toda la red no es más que una función gigante,"
  { file: '0_31.jpg', startSec: 31.52 },  // "784 entradas,"
  { file: '0_33.jpg', startSec: 33.04 },  // "10 salidas,"
  { file: '0_33_b.jpg', startSec: 33.98 },  // "y unos 13 mil pesos y sesgos que puedes mover como diales."
  { file: '0_37.jpg', startSec: 37.96 },  // "Al principio esos 13 mil diales están puestos al azar, así que como te imaginarás, la red es pésima."
  { file: '0_44.jpg', startSec: 44.36 },  // "Le enseñas la imagen de un tres y la capa de salida responde con puro caos."
  { file: '0_49.jpg', startSec: 49.22 },  // "Aquí es donde entra la primera pieza clave, la función de costo, es solo una forma de decirle a la máquina, esto está mal, muy mal."
  { file: '0_57.jpg', startSec: 57.22 },  // "Compara lo que la red respondió con lo que debería haber respondido, cuanto más se parezcan menor el costo,"
  { file: '1_02.jpg', startSec: 62.88 },  // "cuanto más la cague mayor el costo."
  { file: '1_05.jpg', startSec: 65.52 },  // "Haces esto con decenas de miles de ejemplos y sacas el promedio, eso es el costo total de la red, un solo número gigante que resume lo mala que es."
  { file: '1_15.jpg', startSec: 75.02 },  // "Ahora viene la pregunta importante,"
  { file: '1_17.jpg', startSec: 77.0 },  // "¿cómo bajas ese número?"
  { file: '1_18.jpg', startSec: 78.52 },  // "Aquí entra la segunda pieza clave, el descenso de gradiente."
  { file: '1_22.jpg', startSec: 82.24 },  // "Olvídate de 13 mil pesos por un segundo, imagina solo una función con un número de entrada. Quieres encontrar el valor que le da el resultado más bajo posible."
  { file: '1_31.jpg', startSec: 91.54 },  // "La táctica es simple,"
  { file: '1_32.jpg', startSec: 92.92 },  // "mira la pendiente donde estás,"
  { file: '1_34.jpg', startSec: 94.54 },  // "si sube hacia la derecha, muevete a la izquierda, si sube hacia la izquierda, muevete a la derecha."
  { file: '1_40.jpg', startSec: 100.04 },  // "Repite eso una y otra vez."
  { file: '1_42.jpg', startSec: 102.0 },  // "Es como una pelota rodando cuesta abajo, al final cae en un valle, un mínimo local."
  { file: '1_46.jpg', startSec: 106.92 },  // "Ojo, no siempre el más bajo de todos los valles posibles,"
  { file: '1_50.jpg', startSec: 110.32 },  // "solo el más cercano a donde empezaste."
  { file: '1_52.jpg', startSec: 112.62 },  // "Ahora, en vez de un número, imagina 13 mil,"
  { file: '1_55.jpg', startSec: 115.64 },  // "uno por cada peso y sesgo de la red."
  { file: '1_57.jpg', startSec: 117.82 },  // "La misma idea sigue funcionando, solo que ahora la pendiente se llama a gradiente."
  { file: '2_02.jpg', startSec: 122.72 },  // "El gradiente negativo te dice dos cosas a la vez, hacia donde moverte para bajar más rápido y cuánto importa cada uno de esos 13 mil números."
  { file: '2_10.jpg', startSec: 130.76 },  // "Algunos pesos apenas mueve la aguja, otros lo cambian todo."
  { file: '2_14.jpg', startSec: 134.84 },  // "El gradiente te dice cuáles son cuáles."
  { file: '2_17.jpg', startSec: 137.6 },  // "Así que el algoritmo entero es esto,"
  { file: '2_19.jpg', startSec: 139.86 },  // "calcula el gradiente, da un paso pequeño cuesta abajo,"
  { file: '2_23.jpg', startSec: 143.3 },  // "repite miles y miles de veces."
  { file: '2_25.jpg', startSec: 145.86 },  // "Eso literalmente es aprender."
  { file: '2_28.jpg', startSec: 148.16 },  // "No imagía, no hay conciencia,"
  { file: '2_30.jpg', startSec: 150.14 },  // "solo una bola rodando por una montaña de 13 mil dimensiones y funciona sorprendentemente bien."
  { file: '2_35.jpg', startSec: 155.8 },  // "La red que construimos classifica bien el 96 % de dígitos que nunca ha visto."
  { file: '2_40.jpg', startSec: 160.84 },  // "Con algunos ajustes suben el 98%. Nada mal para un puñado de matemáticas de los años 80."
  { file: '2_47.jpg', startSec: 167.4 },  // "Pero aquí viene la parte incómoda. La red realmente aprendió a reconocer bordes y patrones como esperábamos?"
  { file: '2_53.jpg', startSec: 173.7 },  // "Eso te lo cuento en el próximo vídeo porque la respuesta te va a sorprender."
  { file: '2_57.jpg', startSec: 177.96 },  // "Suscríbete si quieres verlo."
];

// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/red-neuronal-aprende/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'marker_scribble.mp3', startSec: 3.18, volume: 0.11 },
  { file: 'digital_chime.mp3', startSec: 10.38, volume: 0.14 },
  { file: 'page_flip.mp3', startSec: 13.3, volume: 0.1 },
  { file: 'synth_pulse.mp3', startSec: 20.54, volume: 0.1 },
  { file: 'comedic_boing.mp3', startSec: 37.96, volume: 0.14 },
  { file: 'glitch_error.mp3', startSec: 44.36, volume: 0.14 },
  { file: 'warning_beep.mp3', startSec: 49.22, volume: 0.13 },
  { file: 'weight_thud.mp3', startSec: 62.88, volume: 0.13 },
  { file: 'marker_squeak.mp3', startSec: 78.52, volume: 0.1 },
  { file: 'ball_bounce_roll.mp3', startSec: 102.0, volume: 0.13 },
  { file: 'digital_chime.mp3', startSec: 117.82, volume: 0.14 },
  { file: 'synth_pulse.mp3', startSec: 137.6, volume: 0.11 },
  { file: 'realization_chime.mp3', startSec: 145.86, volume: 0.15 },
  { file: 'dramatic_reveal.mp3', startSec: 155.8, volume: 0.16 },
  { file: 'digital_chime.mp3', startSec: 160.84, volume: 0.15 },
  { file: 'mystery_sting.mp3', startSec: 167.4, volume: 0.16 },
  { file: 'subscribe_chime.mp3', startSec: 177.96, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_lofi_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.22;

export const RedNeuronalAprende: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;

  // Active image: last one whose startSec <= currentSec
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) {
      activeIndex = i;
    } else {
      break;
    }
  }

  const activeFrame = FRAMES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('red-neuronal-aprende.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`red-neuronal-aprende-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`red-neuronal-aprende-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`red-neuronal-aprende/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
