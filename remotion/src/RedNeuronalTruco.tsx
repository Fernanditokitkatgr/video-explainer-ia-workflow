import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "El truco sucio que nadie te cuenta sobre las redes neuronales" (parte 3)
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35). 1 segmento = 1 imagen.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "En el vídeo pasado entrenamos una red para reconocer dígitos, 96 % de aciertos, con ajustes hasta 98%, deberíamos estar celebrando,"
  { file: '0_09.jpg', startSec: 9.96 },  // "pero hay un problema."
  { file: '0_11.jpg', startSec: 11.42 },  // "La red no aprendió lo que creíamos que había aprendido."
  { file: '0_14.jpg', startSec: 14.48 },  // "Te explico."
  { file: '0_15.jpg', startSec: 15.56 },  // "La esperanza original era bonita,"
  { file: '0_17.jpg', startSec: 17.76 },  // "que una capa detectar a bordes sueltos, que otra los juntara en círculos y líneas y que la última combinar a esos patrones en dígitos completos."
  { file: '0_25.jpg', startSec: 25.64 },  // "Así que fuimos a comprobarlo."
  { file: '0_27.jpg', startSec: 27.5 },  // "Visualizamos los pesos de esas neuronas ocultas,"
  { file: '0_30.jpg', startSec: 30.46 },  // "literalmente convertimos los números en una imagen y lo que vimos no fueron bordes limpios,"
  { file: '0_36.jpg', startSec: 36.26 },  // "fue casi puro ruido,"
  { file: '0_37.jpg', startSec: 37.88 },  // "con como mucho un par de patrones vagos en el medio."
  { file: '0_41.jpg', startSec: 41.14 },  // "En un espacio de 13 mil dimensiones posibles,"
  { file: '0_44.jpg', startSec: 44.12 },  // "la red encontró un valle cualquiera,"
  { file: '0_46.jpg', startSec: 46.44 },  // "uno que clasifica bien los dígitos, pero sin entender ni un solo patron real."
  { file: '0_50.jpg', startSec: 50.92 },  // "Y la prueba definitiva es todavía más incómoda."
  { file: '0_53.jpg', startSec: 53.82 },  // "Dale a esta red una imagen de puro ruido aleatorio,"
  { file: '0_56.jpg', startSec: 56.92 },  // "ni siquiera se parece un número."
  { file: '0_59.jpg', startSec: 59.0 },  // "Una red que entendiera dudaría."
  { file: '1_01.jpg', startSec: 61.48 },  // "La nuestra no."
  { file: '1_02.jpg', startSec: 62.56 },  // "Te dice con total confianza que ese ruido es un 5."
  { file: '1_05.jpg', startSec: 65.98 },  // "Tan segura como si fuera un 5 de verdad."
  { file: '1_08.jpg', startSec: 68.48 },  // "¿Por qué pasa esto?"
  { file: '1_09.jpg', startSec: 69.88 },  // "Porque nunca le dimos motivos para dudar. Su universo entero son dígitos perfectos en una cuadrícula pequeña."
  { file: '1_16.jpg', startSec: 76.06 },  // "Nadie le enseñó lo que es, no lo sé."
  { file: '1_18.jpg', startSec: 78.68 },  // "Aquí hay un experimento real que lo deja aún más claro."
  { file: '1_21.jpg', startSec: 81.78 },  // "Unos investigadores cogieron una red así de buena reconociendo imágenes,"
  { file: '1_25.jpg', startSec: 85.7 },  // "y antes de entrenarla,"
  { file: '1_27.jpg', startSec: 87.24 },  // "revolvieron todas las etiquetas."
  { file: '1_29.jpg', startSec: 89.3 },  // "Perro pasó a ser gato,"
  { file: '1_30.jpg', startSec: 90.9 },  // "gato pasó a ser avión,"
  { file: '1_32.jpg', startSec: 92.54 },  // "puro caos, a propósito."
  { file: '1_34.jpg', startSec: 94.44 },  // "Resultado,"
  { file: '1_35.jpg', startSec: 95.42 },  // "la red igual conseguió memorizar el desastre entero,"
  { file: '1_38.jpg', startSec: 98.46 },  // "misma precisión final que con etiquetas correctas."
  { file: '1_41.jpg', startSec: 101.38 },  // "O sea, con suficientes pesos, una red puede memorizar cualquier cosa,"
  { file: '1_45.jpg', startSec: 105.56 },  // "aunque no tengan ningún sentido."
  { file: '1_47.jpg', startSec: 107.36 },  // "La pregunta incómoda es esta."
  { file: '1_49.jpg', startSec: 109.36 },  // "La red encuentra patrones reales, o solo memoriza."
  { file: '1_52.jpg', startSec: 112.66 },  // "Aquí está el dato que lo aclara un poco."
  { file: '1_54.jpg', startSec: 114.76 },  // "Con etiquetas revoltas aprender es lentísimo."
  { file: '1_57.jpg', startSec: 117.68 },  // "La curva de precisión baja casi en línea recta."
  { file: '2_00.jpg', startSec: 120.52 },  // "Con etiquetas reales y datos con estructura, cuesta al principio,"
  { file: '2_04.jpg', startSec: 124.04 },  // "pero luego cae rápido."
  { file: '2_05.jpg', startSec: 125.58 },  // "Como si la estructura real fuera más fácil de encontrar,"
  { file: '2_08.jpg', startSec: 128.46 },  // "que memorizar caos puro. Así que no. La red no está lista como pensábamos,"
  { file: '2_13.jpg', startSec: 133.22 },  // "pero tampoco es solo un loro memorizando al azar, es algo intermedio. Y honestamente, esta red de aquí es tecnología de los años 80 y 90."
  { file: '2_21.jpg', startSec: 141.56 },  // "El punto de partida no la meta final."
  { file: '2_24.jpg', startSec: 144.14 },  // "Aún así, que reconozca dígitos que nunca ha visto,"
  { file: '2_26.jpg', startSec: 146.96 },  // "sigue siendo una pasada."
  { file: '2_28.jpg', startSec: 148.46 },  // "Todavía queda una pregunta enorme sin responder."
  { file: '2_31.jpg', startSec: 151.12 },  // "¿Cómo exactamente calculas ese gradiente de 13 mil números?"
  { file: '2_35.jpg', startSec: 155.08 },  // "Eso se llama Propagación hacia atrás y es el tema del próximo vídeo. Suscríbete para no perdértelo."
];

// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/red-neuronal-truco/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'warning_beep.mp3', startSec: 9.96, volume: 0.14 },
  { file: 'glass_crack.mp3', startSec: 11.42, volume: 0.13 },
  { file: 'magnifying_zoom.mp3', startSec: 25.64, volume: 0.11 },
  { file: 'static_noise.mp3', startSec: 36.26, volume: 0.13 },
  { file: 'synth_pulse.mp3', startSec: 41.14, volume: 0.1 },
  { file: 'dramatic_reveal.mp3', startSec: 46.44, volume: 0.16 },
  { file: 'static_noise.mp3', startSec: 53.82, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 68.48, volume: 0.15 },
  { file: 'lab_bubble.mp3', startSec: 78.68, volume: 0.11 },
  { file: 'shuffle_cards.mp3', startSec: 87.24, volume: 0.12 },
  { file: 'comedic_boing.mp3', startSec: 90.9, volume: 0.14 },
  { file: 'weight_thud.mp3', startSec: 95.42, volume: 0.14 },
  { file: 'realization_chime.mp3', startSec: 128.46, volume: 0.15 },
  { file: 'vintage_computer.mp3', startSec: 133.22, volume: 0.12 },
  { file: 'digital_chime.mp3', startSec: 146.96, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 151.12, volume: 0.16 },
  { file: 'subscribe_chime.mp3', startSec: 155.08, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_lofi_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.22;

export const RedNeuronalTruco: React.FC = () => {
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
      <Audio src={staticFile('red-neuronal-truco.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`red-neuronal-truco-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`red-neuronal-truco-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`red-neuronal-truco/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
