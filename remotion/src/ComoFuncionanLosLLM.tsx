import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "Así funcionan de verdad los modelos de lenguaje (LLM)" (parte 5)
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35). 1 segmento = 1 imagen.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Imagina que encuentras el vión de un cortometraje."
  { file: '0_03.jpg', startSec: 3.06 },  // "Una escena entre una persona y su asistente de inteligencia artificial."
  { file: '0_07.jpg', startSec: 7.22 },  // "Ves la pregunta,"
  { file: '0_08.jpg', startSec: 8.7 },  // "pero la respuesta ha desaparecido."
  { file: '0_11.jpg', startSec: 11.16 },  // "Ahora imagina que tienes una máquina mágica que predice la siguiente palabra de cualquier texto."
  { file: '0_16.jpg', startSec: 16.5 },  // "Podrías meter el guión en esa máquina,"
  { file: '0_18.jpg', startSec: 18.9 },  // "predecir la primera palabra de la respuesta,"
  { file: '0_21.jpg', startSec: 21.34 },  // "y repetir palabra por palabra hasta completar el diálogo."
  { file: '0_24.jpg', startSec: 24.86 },  // "Cuando hablas con un chatbot,"
  { file: '0_26.jpg', startSec: 26.68 },  // "es literalmente esto lo que pasa."
  { file: '0_28.jpg', startSec: 28.6 },  // "Un modelo de lenguaje, un l -l -m,"
  { file: '0_31.jpg', startSec: 31.04 },  // "es una función matemática gigante."
  { file: '0_33.jpg', startSec: 33.12 },  // "Solo hace una cosa, predecir la siguiente palabra."
  { file: '0_36.jpg', startSec: 36.42 },  // "Pero no predice una palabra con certeza."
  { file: '0_38.jpg', startSec: 38.94 },  // "Le asigna una probabilidad a cada palabra posible del idioma."
  { file: '0_42.jpg', startSec: 42.38 },  // "Para montar un chatbot, le das un texto que simula una conversación entre un usuario y una ia."
  { file: '0_47.jpg', startSec: 47.74 },  // "Añades lo que escribe el usuario real y haces que el modelo prediga una y otra vez que diría la ia. El resultado suena mucho más natural si dejas que el modelo elija a veces palabras menos probables al azar."
  { file: '1_00.jpg', startSec: 60.36 },  // "Por eso la misma pregunta te da respuestas distintas cada vez, aunque el modelo sea determinista."
  { file: '1_05.jpg', startSec: 65.62 },  // "Y cómo aprende a predecir,"
  { file: '1_07.jpg', startSec: 67.72 },  // "leyendo cantidades brutales de texto de Internet."
  { file: '1_10.jpg', startSec: 70.64 },  // "Para leer todo el texto que entrenó a GPT -3, un humano tardaría más de 2600 años sin dormir."
  { file: '1_17.jpg', startSec: 77.28 },  // "Los modelos actuales entrenan con muchísimo más. Piensa en el entrenamiento como girar millones de diales de una máquina enorme."
  { file: '1_24.jpg', startSec: 84.4 },  // "Esos diales se llaman parámetros o pesos."
  { file: '1_27.jpg', startSec: 87.46 },  // "Cambia los diales y cambian las probabilidades que predice el modelo."
  { file: '1_31.jpg', startSec: 91.38 },  // "Lo que hace grande a un LLM es tener cientos de miles de millones de esos parámetros."
  { file: '1_37.jpg', startSec: 97.08 },  // "Y nadie los diseña a mano."
  { file: '1_38.jpg', startSec: 98.74 },  // "Empiezan totalmente al azar."
  { file: '1_40.jpg', startSec: 100.86 },  // "Al principio el modelo solo escúpe letras sin sentido."
  { file: '1_43.jpg', startSec: 103.92 },  // "Si afina con ejemplos reales de texto,"
  { file: '1_46.jpg', startSec: 106.7 },  // "metes todas las palabras de un ejemplo menos la última. Comparas la predicción del modelo con la palabra real y usas retropropagación para ajustar los parámetros."
  { file: '1_56.jpg', startSec: 116.02 },  // "Para que la próxima vez acerte un poco más esa última palabra."
  { file: '1_59.jpg', startSec: 119.74 },  // "Repite estos billones de veces y el modelo no solo mejora en sus ejemplos de entrenamiento. Empieza a predecir razonablemente textos que nunca ha visto."
  { file: '2_08.jpg', startSec: 128.5 },  // "La cantidad de cálculo para entrenar esto es una locura."
  { file: '2_11.jpg', startSec: 131.6 },  // "Imagina que puedes hacer mil millones de operaciones por segundo. ¿Cuánto tardarías en entrenar el modelo más grande?"
  { file: '2_18.jpg', startSec: 138.02 },  // "Un año,"
  { file: '2_18_b.jpg', startSec: 138.9 },  // "diez mil años, la respuesta real más de cien millones de años."
  { file: '2_23.jpg', startSec: 143.84 },  // "Pero esto es solo la mitad de la historia."
  { file: '2_26.jpg', startSec: 146.24 },  // "Se llama preentrenamiento."
  { file: '2_28.jpg', startSec: 148.54 },  // "Autocompletar texto de internet no es lo mismo que ser un buen asistente."
  { file: '2_32.jpg', startSec: 152.52 },  // "Por eso viene una segunda fase igual de importante."
  { file: '2_35.jpg', startSec: 155.96 },  // "Aprendizaje por refuerzo con retroalimentación humana."
  { file: '2_39.jpg', startSec: 159.34 },  // "Personas señalan que respuestas son inútiles o problemáticas. Y esas correcciones afinan aún más los parámetros del modelo."
  { file: '2_47.jpg', startSec: 167.18 },  // "Todo este cálculo solo es posible gracias a chips diseñados para hacer muchísimas operaciones en paralelo,"
  { file: '2_53.jpg', startSec: 173.22 },  // "las GPU."
  { file: '2_54.jpg', startSec: 174.54 },  // "Pero no todos los modelos se pueden paralelizar bien."
  { file: '2_57.jpg', startSec: 177.76 },  // "Antes de 2017 casi todos procesaban el texto palabra por palabra en fila."
  { file: '3_03.jpg', startSec: 183.36 },  // "Entonces un equipo de Google presentó un modelo nuevo, el Transformer."
  { file: '3_07.jpg', startSec: 187.72 },  // "Los Transformers no leen de principio a fin. Absorben todo el texto de golpe en paralelo."
  { file: '3_13.jpg', startSec: 193.82 },  // "El primer paso,"
  { file: '3_15.jpg', startSec: 195.34 },  // "convertir cada palabra en una lista larga de números porque el entrenamiento solo entiende números, no letras."
  { file: '3_21.jpg', startSec: 201.76 },  // "Esa lista de números codifica el significado de la palabra."
  { file: '3_25.jpg', startSec: 205.42 },  // "Lo que hace único al Transformer es una operación especial,"
  { file: '3_28.jpg', startSec: 208.96 },  // "la atención."
  { file: '3_30.jpg', startSec: 210.22 },  // "La atención deja que todas esas listas de números hablen entre sí y afinen su significado según el contexto todo en paralelo."
  { file: '3_38.jpg', startSec: 218.38 },  // "Por ejemplo, la palabra banco cambia sus números según el contexto."
  { file: '3_42.jpg', startSec: 222.5 },  // "Puede pasar de significar entidad financiera a significar la orilla de un río."
  { file: '3_47.jpg', startSec: 227.66 },  // "Los Transformers también tienen otra pieza, una red neuronal normal y corriente."
  { file: '3_52.jpg', startSec: 232.84 },  // "Le da al modelo espacio extra para guardar patrones aprendidos en el entrenamiento."
  { file: '3_57.jpg', startSec: 237.56 },  // "Todo esto se repite muchas veces, capa, trascapa."
  { file: '4_00.jpg', startSec: 240.92 },  // "Cada lista de números se enriquece un poco más en cada pasada, hasta acumular toda la información necesaria para predecir bien la siguiente palabra."
  { file: '4_09.jpg', startSec: 249.42 },  // "Al final, se usa el último de esos vectores, ya ha cargado de contexto para hacer la predicción final."
  { file: '4_15.jpg', startSec: 255.5 },  // "Una probabilidad para cada palabra posible del idioma."
  { file: '4_19.jpg', startSec: 259.14 },  // "Los investigadores diseñan cada paso del proceso,"
  { file: '4_22.jpg', startSec: 262.18 },  // "pero lo que el modelo aprende dentro es un fenómeno emergente,"
  { file: '4_25.jpg', startSec: 265.5 },  // "depende de miles de millones de parámetros ajustados solo, sin que nadie los programe a mano."
  { file: '4_30.jpg', startSec: 270.92 },  // "Por eso es tan difícil saber exactamente por qué el modelo predice lo que predice."
  { file: '4_36.jpg', startSec: 276.18 },  // "Lo que sí puedes ver es el resultado,"
  { file: '4_38.jpg', startSec: 278.48 },  // "texto sorprendentemente fluido, coherente y a veces genuinamente útil."
  { file: '4_43.jpg', startSec: 283.6 },  // "Y así, palabra por palabra, es como funciona de verdad un modelo del lenguaje."
  { file: '4_48.jpg', startSec: 288.84 },  // "Suscríbete si quieres que sigamos abriendo la caja negra de la ia."
];


// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/como-funcionan-los-llm/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'digital_chime.mp3', startSec: 7.22, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 8.7, volume: 0.16 },
  { file: 'magic_sparkle.mp3', startSec: 11.16, volume: 0.15 },
  { file: 'keyboard_clack.mp3', startSec: 21.34, volume: 0.12 },
  { file: 'realization_chime.mp3', startSec: 26.68, volume: 0.15 },
  { file: 'warning_beep.mp3', startSec: 36.42, volume: 0.14 },
  { file: 'dice_roll.mp3', startSec: 60.36, volume: 0.15 },
  { file: 'page_flip.mp3', startSec: 67.72, volume: 0.11 },
  { file: 'vintage_computer.mp3', startSec: 70.64, volume: 0.13 },
  { file: 'dramatic_reveal.mp3', startSec: 91.38, volume: 0.18 },
  { file: 'electric_zap.mp3', startSec: 98.74, volume: 0.15 },
  { file: 'typewriter_glitch.mp3', startSec: 100.86, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 116.02, volume: 0.15 },
  { file: 'synth_pulse.mp3', startSec: 131.6, volume: 0.12 },
  { file: 'big_reveal_swell.mp3', startSec: 138.9, volume: 0.2 },
  { file: 'digital_chime.mp3', startSec: 146.24, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 159.34, volume: 0.14 },
  { file: 'gear_whirring.mp3', startSec: 167.18, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 183.36, volume: 0.16 },
  { file: 'synth_pulse.mp3', startSec: 201.76, volume: 0.11 },
  { file: 'magic_sparkle.mp3', startSec: 208.96, volume: 0.17 },
  { file: 'comedic_boing.mp3', startSec: 222.5, volume: 0.13 },
  { file: 'gear_whirring.mp3', startSec: 237.56, volume: 0.12 },
  { file: 'digital_chime.mp3', startSec: 255.5, volume: 0.13 },
  { file: 'clock_tick.mp3', startSec: 270.92, volume: 0.11 },
  { file: 'realization_chime.mp3', startSec: 278.48, volume: 0.15 },
  { file: 'digital_whoosh.mp3', startSec: 283.6, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 288.84, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_curious_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.14;

export const ComoFuncionanLosLLM: React.FC = () => {
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
      <Audio src={staticFile('como-funcionan-los-llm.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`como-funcionan-los-llm-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`como-funcionan-los-llm-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`como-funcionan-los-llm/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
