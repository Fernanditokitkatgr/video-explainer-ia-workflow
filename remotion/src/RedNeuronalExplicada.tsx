import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "Cómo funciona una red neuronal (por dentro)"
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35). 1 segmento = 1 imagen.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Esto es un 3."
  { file: '0_01.jpg', startSec: 1.42 },  // "Escritos en ningún cuidado, reducido a una imagen minúscula de solo 28x28 píxeles y aún así tu cerebro lo reconoce al instante, sin esfuerzo."
  { file: '0_11.jpg', startSec: 11.34 },  // "Este también es un 3 y este y este,"
  { file: '0_14.jpg', startSec: 14.88 },  // "aunque cada píxel sea completamente diferente de un dibujo a otro."
  { file: '0_18.jpg', startSec: 18.86 },  // "Para tus ojos, esto es trivial."
  { file: '0_21.jpg', startSec: 21.0 },  // "Para un ordenador, es casi una tortura."
  { file: '0_23.jpg', startSec: 23.94 },  // "Pídele a alguien que programa esto a mano y en 5 segundos pasa de fácil a quiero llorar."
  { file: '0_30.jpg', startSec: 30.0 },  // "Este es el mismo truco detrás de un coche que se conduce solo, de una app que reconoce tu cara para desbloquear el móvil."
  { file: '0_36.jpg', startSec: 36.72 },  // "De un chatbot que entiende lo que le escribes,"
  { file: '0_39.jpg', startSec: 39.28 },  // "todo eso tiene el mismo nombre."
  { file: '0_41.jpg', startSec: 41.64 },  // "Redes neuronales."
  { file: '0_43.jpg', startSec: 43.18 },  // "Hoy vas a entender de verdad que son, no palabras raras, no fingir que lo entiendes en una fiesta."
  { file: '0_48.jpg', startSec: 48.7 },  // "Vamos a construir pieza a pieza, una red que aprende a leer números escritos a mano. Ojo, hoy solo vemos la estructura, el esqueleto."
  { file: '0_56.jpg', startSec: 56.78 },  // "¿Cómo aprende esa estructura te lo cuento en el próximo vídeo?"
  { file: '1_00.jpg', startSec: 60.7 },  // "Empecemos por lo más simple posible."
  { file: '1_03.jpg', startSec: 63.62 },  // "Una neurona no es más que una caja, una caja que guarda un número,"
  { file: '1_07.jpg', startSec: 67.6 },  // "entre 0 y 1, nada más, nada de ciencia ficción."
  { file: '1_11.jpg', startSec: 71.2 },  // "Nuestra red arranca con 784 de esas cajas,"
  { file: '1_15.jpg', startSec: 75.14 },  // "una por cada píxel de la imagen,"
  { file: '1_17.jpg', startSec: 77.16 },  // "28x28,"
  { file: '1_18.jpg', startSec: 78.68 },  // "784 en total. Cada una guarda cuánto de blanco o de negro es su píxel, eso es toda la primera capa."
  { file: '1_26.jpg', startSec: 86.12 },  // "En el otro extremo hay una última capa, con solo 10 neuronas, una por cada número posible, del 0 a 9."
  { file: '1_32.jpg', startSec: 92.74 },  // "Cuanto más brillante esté una de esas 10, más convencida está la red de que ese es el dígito correcto."
  { file: '1_38.jpg', startSec: 98.82 },  // "Y en medio,"
  { file: '1_39.jpg', startSec: 99.92 },  // "un par de capas ocultas, que de momento son un enorme signo de interrogación."
  { file: '1_44.jpg', startSec: 104.54 },  // "Ahí es donde se supone que ocurre la magia. La idea es esta."
  { file: '1_48.jpg', startSec: 108.8 },  // "Cuando tú reconoces un 9, tu cerebro junta piezas sueltas, un círculo arriba,"
  { file: '1_53.jpg', startSec: 113.44 },  // "una línea a la derecha,"
  { file: '1_54.jpg', startSec: 114.9 },  // "un 8 junta dos círculos,"
  { file: '1_56.jpg', startSec: 116.68 },  // "la esperanza es que la red haga exactamente lo mismo, que una capa detecte borde sueltos, que la siguiente junta esos borde en círculos y líneas, y que la última junta es esas piezas en un dígito completo."
  { file: '2_08.jpg', startSec: 128.64 },  // "Píxeles,"
  { file: '2_09.jpg', startSec: 129.64 },  // "abordes, apatrones,"
  { file: '2_11.jpg', startSec: 131.28 },  // "a números,"
  { file: '2_12.jpg', startSec: 132.14 },  // "como un cerebro junta sonidos en sílabas, en palabras,"
  { file: '2_15.jpg', startSec: 135.48 },  // "en frases,"
  { file: '2_16.jpg', startSec: 136.36 },  // "pero como decide una sola neuronas si está viendo un borde?"
  { file: '2_20.jpg', startSec: 140.36 },  // "Aquí está el truco real,"
  { file: '2_22.jpg', startSec: 142.28 },  // "piensa en cada neuronas como alguien que escucha 784 opiniones a la vez."
  { file: '2_27.jpg', startSec: 147.34 },  // "Cada conexión entre dos neuronas tiene asignado un peso, y un peso es solo eso, un número que dice cuánto importa esa opinión. Si el peso es alto, esa entrada pesa mucho en la decisión final, si es bajo o negativo casi no cuenta o incluso resta."
  { file: '2_42.jpg', startSec: 162.78 },  // "La neurona multiplica cada entrada por su peso y lo suma todo."
  { file: '2_46.jpg', startSec: 166.62 },  // "Si los pesos son altos justo donde debería haber un borde y bajos o negativos alrededor,"
  { file: '2_51.jpg', startSec: 171.84 },  // "esa suma se dispara solo cuando el borde existe de verdad y se queda plana cuando no."
  { file: '2_56.jpg', startSec: 176.78 },  // "Pero hay un problema,"
  { file: '2_58.jpg', startSec: 178.16 },  // "esa suma puede dar cualquier número gigante o gigante negativo. Así que le sumamos otro número más,"
  { file: '3_04.jpg', startSec: 184.6 },  // "el sesgo."
  { file: '3_05.jpg', startSec: 185.54 },  // "El sesgo es como el umbral de exigencia de la neurona."
  { file: '3_08.jpg', startSec: 188.8 },  // "Un sesgo muy negativo hace que le cueste mucho activarse,"
  { file: '3_12.jpg', startSec: 192.16 },  // "uno positivo se lo pone fácil,"
  { file: '3_14.jpg', startSec: 194.0 },  // "y al final aplastamos ese resultado con una función que se llama Sigmoide."
  { file: '3_19.jpg', startSec: 199.12 },  // "La Sigmoide agarra cualquier número, por gigante que sea, y lo comprime entre 0 y 1."
  { file: '3_24.jpg', startSec: 204.9 },  // "Así todas las neuronas de la red hablan el mismo idioma. Eso es todo lo que hace una neurona, multiplicar, sumar,"
  { file: '3_32.jpg', startSec: 212.22 },  // "comprimir."
  { file: '3_33.jpg', startSec: 213.1 },  // "El problema es la escala."
  { file: '3_34.jpg', startSec: 214.9 },  // "Solo entre la primera y la segunda capa hay 784 por 16 pesos distintos."
  { file: '3_40.jpg', startSec: 220.84 },  // "Toda la red junta acumula casi 13 mil números,"
  { file: '3_43.jpg', startSec: 223.98 },  // "13 mil diales que hay que calibrar bien para distinguir un 3 de 1 ocho."
  { file: '3_48.jpg', startSec: 228.46 },  // "Imagina sentarte tú, a mano, a mover esos 13 mil diales 1 por 1,"
  { file: '3_53.jpg', startSec: 233.26 },  // "ni con 5 cafés de por medio. Por suerte no hace falta hacerlo a mano."
  { file: '3_57.jpg', startSec: 237.96 },  // "Eso precisamente es lo que la red aprende a hacer sola."
  { file: '4_01.jpg', startSec: 241.68 },  // "Y como una máquina calibra sola 13 mil números sin que nadie se los diga, es la parte más alucinante de todo esto."
  { file: '4_08.jpg', startSec: 248.92 },  // "Te la cuento en el próximo vídeo."
  { file: '4_10.jpg', startSec: 250.78 },  // "Por ahora quédate con esto."
  { file: '4_12.jpg', startSec: 252.86 },  // "Una cordes magia,"
  { file: '4_14.jpg', startSec: 254.12 },  // "ni conciencia,"
  { file: '4_15.jpg', startSec: 255.28 },  // "ni un cerebro digital pensando como tú."
  { file: '4_17.jpg', startSec: 257.72 },  // "Es una función larguísima, sí,"
  { file: '4_20.jpg', startSec: 260.4 },  // "con miles de números, sí. Pero solo una función,"
  { file: '4_23.jpg', startSec: 263.86 },  // "que convierte 784 píxeles en 10 probabilidades."
  { file: '4_28.jpg', startSec: 268.28 },  // "Y aun con solo esto ya reconoce números escritos a mano casi tan bien como tú."
  { file: '4_33.jpg', startSec: 273.7 },  // "¿Te está volando un poco la cabeza?"
  { file: '4_36.jpg', startSec: 276.14 },  // "Suscríbete que la segunda parte como aprende de verdad una red neuronal viene pronto."
];



// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/red-neuronal-explicada/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'marker_scribble.mp3', startSec: 1.42, volume: 0.13 },
  { file: 'digital_chime.mp3', startSec: 8.88, volume: 0.14 },
  { file: 'marker_squeak.mp3', startSec: 11.34, volume: 0.1 },
  { file: 'warning_beep.mp3', startSec: 21.0, volume: 0.13 },
  { file: 'comedic_boing.mp3', startSec: 23.94, volume: 0.15 },
  { file: 'digital_whoosh.mp3', startSec: 30.0, volume: 0.12 },
  { file: 'digital_chime.mp3', startSec: 41.64, volume: 0.14 },
  { file: 'page_flip.mp3', startSec: 56.78, volume: 0.1 },
  { file: 'synth_pulse.mp3', startSec: 71.2, volume: 0.1 },
  { file: 'camera_shutter.mp3', startSec: 86.12, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 92.74, volume: 0.14 },
  { file: 'dramatic_reveal.mp3', startSec: 104.54, volume: 0.16 },
  { file: 'glass_crack.mp3', startSec: 108.8, volume: 0.12 },
  { file: 'magnifying_zoom.mp3', startSec: 140.36, volume: 0.11 },
  { file: 'crowd_murmur.mp3', startSec: 142.28, volume: 0.12 },
  { file: 'weight_thud.mp3', startSec: 147.34, volume: 0.14 },
  { file: 'electric_zap.mp3', startSec: 171.84, volume: 0.14 },
  { file: 'warning_beep.mp3', startSec: 178.16, volume: 0.13 },
  { file: 'dramatic_reveal.mp3', startSec: 184.6, volume: 0.17 },
  { file: 'digital_chime.mp3', startSec: 194.0, volume: 0.15 },
  { file: 'synth_pulse.mp3', startSec: 199.12, volume: 0.11 },
  { file: 'keyboard_clack.mp3', startSec: 220.84, volume: 0.11 },
  { file: 'gear_whirring.mp3', startSec: 237.96, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 241.68, volume: 0.15 },
  { file: 'comedic_boing.mp3', startSec: 273.7, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 276.14, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_lofi_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.1;

export const RedNeuronalExplicada: React.FC = () => {
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
      <Audio src={staticFile('red-neuronal-explicada.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`red-neuronal-explicada-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`red-neuronal-explicada-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`red-neuronal-explicada/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
