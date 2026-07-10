import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "Cómo funciona la Inteligencia Artificial"
// Timestamps from Whisper segment boundaries (exact audio sync). 1 segment = 1 image.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00_0.jpg', startSec: 0.0 },  // "Llevamos un tiempo escuchando noticias así."
  { file: '0_02_1.jpg', startSec: 2.48 },  // "Una IA derrota al mejor jugador de ajedrez del mundo."
  { file: '0_05_bach.jpg', startSec: 5.8 },  // "Otra compone música que nadie distingue de Bach."
  { file: '0_05_0.jpg', startSec: 8.54 },  // "Otra pinta como Rembrandt."
  { file: '0_09_car.jpg', startSec: 10.35 },  // "Otra conduce coche sola."
  { file: '0_08_1.jpg', startSec: 12.02 },  // "Otra reconoce la cara de un criminal entre millones."
  { file: '0_13_1.jpg', startSec: 14.76 },  // "Y en todas esas noticias hay una palabra que nadie explica."
  { file: '0_11_0.jpg', startSec: 19.02 },  // "Inteligencia artificial."
  { file: '0_16_0.jpg', startSec: 21.02 },  // "¿Qué significa exactamente?"
  { file: '0_19_0.jpg', startSec: 22.82 },  // "¿Y cómo funciona de verdad?"
  { file: '0_17_1.jpg', startSec: 24.66 },  // "Vamos a descubrirlo."
  { file: '0_21_1.jpg', startSec: 26.2 },  // "Rápido y sin tecnicismos. La definición oficial es simple."
  { file: '0_35_0.jpg', startSec: 30.36 },  // "Máquinas haciendo tareas propias de una mente humana."
  { file: '0_37_1.jpg', startSec: 33.52 },  // "El problema es que cuenta como propio de una mente humana."
  { file: '0_24_0.jpg', startSec: 36.98 },  // "Calcular ya lo hacía en las máquinas hace décadas."
  { file: '0_24_0.jpg', startSec: 39.86 },  // "Memorizar datos, también."
  { file: '0_27_1.jpg', startSec: 41.76 },  // "Pero había tres cosas que parecían imposibles para una máquina."
  { file: '0_30_0.jpg', startSec: 45.72 },  // "Aprender de sus errores."
  { file: '0_32_1.jpg', startSec: 47.58 },  // "Ser creativa."
  { file: '0_35_0.jpg', startSec: 48.84 },  // "Y ser consciente de sí misma."
  { file: '0_40_0.jpg', startSec: 50.98 },  // "La autoconciencia sigue siendo pura ciencia ficción."
  { file: '0_32_1.jpg', startSec: 54.4 },  // "La creatividad empieza a ser dosamente posible."
  { file: '0_32_1.jpg', startSec: 57.66 },  // "Ya hay algoritmos que pintan, componen, incluso cuentan chistes."
  { file: '0_43_1.jpg', startSec: 61.94 },  // "Pero aquí viene el giro."
  { file: '0_46_0.jpg', startSec: 63.82 },  // "El 90 % de las veces que oyes inteligencia artificial,"
  { file: '0_49_1.jpg', startSec: 68.02 },  // "en realidad se refieren a sólo una de esas tres cosas."
  { file: '0_52_0.jpg', startSec: 71.54 },  // "Aprender."
  { file: '0_55_1.jpg', startSec: 72.72 },  // "Y eso tiene un nombre propio."
  { file: '0_58_0.jpg', startSec: 74.66 },  // "Aprendizaje automático o Machine Learning."
  { file: '1_01_1.jpg', startSec: 77.86 },  // "Hoy Machine Learning es casi sinónimo de inteligencia artificial. Y aquí viene lo interesante."
  { file: '1_05_0.jpg', startSec: 84.08 },  // "Tú ya has entrenado una sin saberlo."
  { file: '1_08_1.jpg', startSec: 86.48 },  // "¿Alguna vez marcaste fotos con semáforos o coches para demostrar que no eres un robot?"
  { file: '1_11_0.jpg', startSec: 91.42 },  // "Eso es un captcha."
  { file: '1_20_1.jpg', startSec: 93.04 },  // "Y cada vez que lo resolvías, estabas etiquetando datos."
  { file: '1_24_0.jpg', startSec: 96.36 },  // "Esos datos entrenan algoritmos que después reconocen semáforos, coches, peatones,"
  { file: '1_26_1.jpg', startSec: 101.68 },  // "en la vida real."
  { file: '1_29_0.jpg', startSec: 103.2 },  // "Algunos de esos algoritmos terminan dentro de un coche autónomo."
  { file: '1_14_1.jpg', startSec: 107.08 },  // "Así que sí,"
  { file: '1_33_1.jpg', startSec: 108.06 },  // "sin saberlo, llevas años enseñando a conducir a los coches del futuro."
  { file: '1_36_0.jpg', startSec: 112.62 },  // "Pero cómo aprende realmente una máquina?"
  { file: '1_39_1.jpg', startSec: 115.5 },  // "El aprendizaje automático cambia el comportamiento de un algoritmo según los datos,"
  { file: '1_43_0.jpg', startSec: 119.84 },  // "sus aciertos o sus errores."
  { file: '1_43_0.jpg', startSec: 122.16 },  // "Básicamente,"
  { file: '1_46_1.jpg', startSec: 123.14 },  // "aprender de la experiencia como haría cualquiera,"
  { file: '1_48_0.jpg', startSec: 125.94 },  // "cualquiera menos esa gente que se apunta al gimnasio cada 2 de enero y se da de baja en febrero."
  { file: '1_52_1.jpg', startSec: 131.46 },  // "Hay cuatro maneras principales de hacerlo."
  { file: '1_55_0.jpg', startSec: 133.94 },  // "La primera,"
  { file: '1_58_1.jpg', startSec: 134.9 },  // "aprendizaje supervisado. Le das al algoritmo millones de datos ya etiquetados con la respuesta correcta incluida,"
  { file: '2_00_0.jpg', startSec: 141.82 },  // "como enseñarle miles de fotos tuyas y de otras personas hasta que aprenda a reconocerte."
  { file: '2_07_0.jpg', startSec: 147.08 },  // "Es el más usado del mundo."
  { file: '2_04_1.jpg', startSec: 149.08 },  // "Reconocimiento facial,"
  { file: '2_10_1.jpg', startSec: 150.64 },  // "de voz,"
  { file: '2_10_1.jpg', startSec: 151.42 },  // "de huellas, coches autónomos."
  { file: '2_13_0.jpg', startSec: 153.9 },  // "La segunda,"
  { file: '2_16_1.jpg', startSec: 155.06 },  // "aprendizaje no supervisado."
  { file: '2_19_0.jpg', startSec: 157.2 },  // "Aquí no hay respuestas correctas, solo datos sueltos."
  { file: '2_19_0.jpg', startSec: 160.44 },  // "El algoritmo busca patrones y agrupa lo parecido,"
  { file: '2_22_1.jpg', startSec: 163.36 },  // "como cuando Spotify compara tus gustos con los de otro usuario para recomendarte canciones."
  { file: '2_25_0.jpg', startSec: 168.82 },  // "La tercera, semi -supervisado,"
  { file: '2_28_1.jpg', startSec: 171.3 },  // "un poco de cada."
  { file: '2_28_1.jpg', startSec: 172.72 },  // "Pocos datos etiquetados para entrenar un modelo que etiquete el resto."
  { file: '2_31_0.jpg', startSec: 176.86 },  // "Y la cuarta,"
  { file: '2_35_1.jpg', startSec: 178.02 },  // "aprendizaje por refuerzo."
  { file: '2_35_1.jpg', startSec: 179.98 },  // "Aquí el algoritmo aprende jugando a base de prueba y error."
  { file: '2_39_0.jpg', startSec: 183.42 },  // "Si ganas, repites a estrategia. Si pierde, la descarta."
  { file: '2_44_0.jpg', startSec: 187.88 },  // "Así es como una máquina puede aprender a jugar al ajedrez o algo sola, contra sí misma, millones de veces."
  { file: '2_48_1.jpg', startSec: 194.92 },  // "Detrás de estos cuatro tipos hay decenas de técnicas con nombres que suenan a hechizos."
  { file: '2_52_0.jpg', startSec: 200.1 },  // "Arboles de decisión,"
  { file: '2_52_0.jpg', startSec: 201.66 },  // "Random Forest,"
  { file: '2_52_0.jpg', startSec: 202.96 },  // "Key Nearest Neighbors,"
  { file: '2_55_1.jpg', startSec: 204.78 },  // "pero la más potente de todas son las redes neuronales."
  { file: '2_58_0.jpg', startSec: 208.3 },  // "Miles de pequeñas funciones matemáticas conectadas entre sí,"
  { file: '3_02_1.jpg', startSec: 212.06 },  // "imitando muy de lejos cómo se conectan las neuronas de un cerebro."
  { file: '3_05_0.jpg', startSec: 216.34 },  // "Cuando esas redes son enormes y con muchas capas se llaman redes profundas."
  { file: '3_08_1.jpg', startSec: 221.02 },  // "Y ahí nace el término que seguro también has oído."
  { file: '3_15_1.jpg', startSec: 224.24 },  // "Deep Learning."
  { file: '3_17_0.jpg', startSec: 225.8 },  // "Así que la próxima vez que oigas que una IA venció a un campeón mundial de ajedrez,"
  { file: '3_21_1.jpg', startSec: 230.48 },  // "ya sabes que no fue magia."
  { file: '3_25_0.jpg', startSec: 232.72 },  // "Fue una red aprendiendo durante millones de partidas qué movimientos ganan y cuáles no."
  { file: '3_28_1.jpg', startSec: 239.02 },  // "La inteligencia artificial no piensa como tú."
  { file: '3_30_0.jpg', startSec: 242.08 },  // "De momento solo encuentra patrones mejor que nadie."
  { file: '3_34_1.jpg', startSec: 244.92 },  // "Y eso, bien usado,"
  { file: '3_37_0.jpg', startSec: 246.44 },  // "ya está cambiando el mundo. Mal usado,"
  { file: '3_40_1.jpg', startSec: 249.28 },  // "también puede salir caro."
  { file: '3_43_0.jpg', startSec: 251.1 },  // "Así que entender cómo funciona ya no es opcional."
  { file: '3_46_1.jpg', startSec: 254.82 },  // "¿Qué parte de la IA te gustaría que explicásemos a fondo?"
  { file: '3_46_1.jpg', startSec: 258.0 },  // "Dímelo en comentarios."
  { file: '3_52_1.jpg', startSec: 259.54 },  // "Y si te ha quedado más claro que antes,"
  { file: '3_49_0.jpg', startSec: 261.54 },  // "suscríbete."
];





// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/como-funciona-la-ia/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.12 },
  { file: 'chess_thud.mp3', startSec: 2.48, volume: 0.14 },
  { file: 'realization_chime.mp3', startSec: 5.8, volume: 0.13 },
  { file: 'camera_shutter.mp3', startSec: 8.54, volume: 0.13 },
  { file: 'digital_chime.mp3', startSec: 12.02, volume: 0.13 },
  { file: 'digital_whoosh.mp3', startSec: 14.76, volume: 0.11 },
  { file: 'dramatic_reveal.mp3', startSec: 19.02, volume: 0.15 },
  { file: 'page_flip.mp3', startSec: 26.2, volume: 0.1 },
  { file: 'digital_chime.mp3', startSec: 41.76, volume: 0.13 },
  { file: 'keyboard_clack.mp3', startSec: 45.72, volume: 0.11 },
  { file: 'comedic_boing.mp3', startSec: 47.58, volume: 0.14 },
  { file: 'warning_beep.mp3', startSec: 50.98, volume: 0.12 },
  { file: 'comedic_boing.mp3', startSec: 57.66, volume: 0.13 },
  { file: 'digital_whoosh.mp3', startSec: 61.94, volume: 0.13 },
  { file: 'dramatic_reveal.mp3', startSec: 63.82, volume: 0.17 },
  { file: 'realization_chime.mp3', startSec: 74.66, volume: 0.14 },
  { file: 'electric_zap.mp3', startSec: 84.08, volume: 0.14 },
  { file: 'camera_shutter.mp3', startSec: 86.48, volume: 0.13 },
  { file: 'digital_chime.mp3', startSec: 91.42, volume: 0.13 },
  { file: 'keyboard_clack.mp3', startSec: 96.36, volume: 0.11 },
  { file: 'game_blip.mp3', startSec: 103.2, volume: 0.13 },
  { file: 'victory_jingle.mp3', startSec: 108.06, volume: 0.15 },
  { file: 'digital_chime.mp3', startSec: 112.62, volume: 0.12 },
  { file: 'comedic_boing.mp3', startSec: 125.94, volume: 0.14 },
  { file: 'page_flip.mp3', startSec: 131.46, volume: 0.1 },
  { file: 'digital_whoosh.mp3', startSec: 134.9, volume: 0.11 },
  { file: 'synth_pulse.mp3', startSec: 157.2, volume: 0.1 },
  { file: 'digital_chime.mp3', startSec: 171.3, volume: 0.12 },
  { file: 'game_blip.mp3', startSec: 179.98, volume: 0.13 },
  { file: 'victory_jingle.mp3', startSec: 183.42, volume: 0.15 },
  { file: 'chess_thud.mp3', startSec: 187.88, volume: 0.13 },
  { file: 'warning_beep.mp3', startSec: 194.92, volume: 0.11 },
  { file: 'synth_pulse.mp3', startSec: 208.3, volume: 0.1 },
  { file: 'dramatic_reveal.mp3', startSec: 221.02, volume: 0.18 },
  { file: 'realization_chime.mp3', startSec: 224.24, volume: 0.16 },
  { file: 'chess_thud.mp3', startSec: 225.8, volume: 0.12 },
  { file: 'digital_whoosh.mp3', startSec: 232.72, volume: 0.12 },
  { file: 'synth_pulse.mp3', startSec: 242.08, volume: 0.1 },
  { file: 'digital_chime.mp3', startSec: 246.44, volume: 0.12 },
  { file: 'warning_beep.mp3', startSec: 249.28, volume: 0.12 },
  { file: 'page_flip.mp3', startSec: 251.1, volume: 0.1 },
  { file: 'digital_chime.mp3', startSec: 254.82, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 261.54, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.22;

export const ComoFuncionaLaIA: React.FC = () => {
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
      <Audio src={staticFile('como-funciona-la-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`como-funciona-la-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`como-funciona-la-ia-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`como-funciona-la-ia/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
