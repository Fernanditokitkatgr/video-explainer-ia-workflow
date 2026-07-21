import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "El error de como construimos los ordenadores para la IA" (parte 6)
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35).
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Durante siglos, las computadoras más poderosas del mundo no tenían ni un solo cero, ni uno, no."
  { file: '0_05.jpg', startSec: 5.76 },  // "Predecían eclipses, mareas y guiaban cañones antiaéreos, todo con electricidad pura."
  { file: '0_11.jpg', startSec: 11.74 },  // "Luego llegaron los transistores y las computadores digitales las parrieron del mapa."
  { file: '0_17.jpg', startSec: 17.04 },  // "Hoy casi todo lo que usas es digital,"
  { file: '0_19.jpg', startSec: 19.4 },  // "pero una tormenta perfecta está a punto de traer de vuelta lo analógico y todo empieza con un error,"
  { file: '0_25.jpg', startSec: 25.48 },  // "un experimento fallido y un hombre que se ogo antes de ver si tenía razón."
  { file: '0_30.jpg', startSec: 30.18 },  // "Una computadora analógica no calcula con cero si unos, calcula con voltaje puro, subiendo y bajando como una masa en un resorte."
  { file: '0_37.jpg', startSec: 37.82 },  // "El circuito eléctrico es el problema físico,"
  { file: '0_41.jpg', startSec: 41.08 },  // "solo que ocurre mucho más rápido."
  { file: '0_43.jpg', startSec: 43.22 },  // "Con esto puedes simular el clima, el caos, cualquier ecuación diferencial, solo cambiando cables de sitio y es rápidísima."
  { file: '0_50.jpg', startSec: 50.88 },  // "Para sumar dos números, una computadora digital necesita unos 50 transistores."
  { file: '0_55.jpg', startSec: 55.54 },  // "Una analógica solo necesita conectar dos cables."
  { file: '0_58.jpg', startSec: 58.96 },  // "Para multiplicar, lo digital necesita mil transistores."
  { file: '1_02.jpg', startSec: 62.5 },  // "Lo analógico solo necesita una resistencia,"
  { file: '1_05.jpg', startSec: 65.38 },  // "voltaje entre resistencia y ya tienes la multiplicación gratis."
  { file: '1_09.jpg', startSec: 69.3 },  // "Pero lo analógico tiene un problema serio, no sirve para propósitos generales, no vas a escribir un documento de Word en una de estas y como todo es continuo, nunca obtienes el mismo resultado dos veces."
  { file: '1_20.jpg', startSec: 80.88 },  // "Siempre hay un margen de error del 1 por ciento."
  { file: '1_23.jpg', startSec: 83.84 },  // "Por eso lo digital ganó la guerra en cuanto se hizo viable."
  { file: '1_27.jpg', startSec: 87.18 },  // "Finde la historia, durante 70 años,"
  { file: '1_29.jpg', startSec: 89.72 },  // "hasta que llegó la inteligencia artificial y todo volvió a estar en juego."
  { file: '1_34.jpg', startSec: 94.1 },  // "En 1958,"
  { file: '1_35.jpg', startSec: 95.98 },  // "un psicólogo llamado Frank Rosenblatt construyó una máquina para imitar neuronas, la llamó el Perceptron."
  { file: '1_42.jpg', startSec: 102.42 },  // "Una neuron artificial hace algo muy simple,"
  { file: '1_45.jpg', startSec: 105.46 },  // "recibe señales, las multiplica por un peso y las suma todas."
  { file: '1_49.jpg', startSec: 109.4 },  // "Si la suma supera cierto ombral, la neuronas se dispara, sino se queda callada."
  { file: '1_54.jpg', startSec: 114.56 },  // "El Perceptron de Rosenblatt tenía 400 células fotosensibles como una imagen de 20x20 pixels."
  { file: '2_01.jpg', startSec: 121.02 },  // "Todas conectadas a una única neurona de salida, cada una con su propio peso ajustable."
  { file: '2_06.jpg', startSec: 126.24 },  // "El objetivo era simple, distinguir un círculo de un rectángulo. Al principio todos los pesos empezaban en cero,"
  { file: '2_12.jpg', startSec: 132.82 },  // "la máquina no sabía nada."
  { file: '2_14.jpg', startSec: 134.7 },  // "Le enseñaban círculos y rectángulos uno tras otro, y cada vez que se equivocaba, ajustaba sus propios pesos un poquito."
  { file: '2_21.jpg', startSec: 141.64 },  // "Y funcionó."
  { file: '2_22.jpg', startSec: 142.9 },  // "Aprendió solo a base de errores corregidos."
  { file: '2_26.jpg', startSec: 146.0 },  // "Los medios en lo que hicieron,"
  { file: '2_27.jpg', startSec: 147.84 },  // "el New York Times escribió que la marina esperaba una máquina capaz de caminar, hablar,"
  { file: '2_32.jpg', startSec: 152.64 },  // "ver,"
  { file: '2_33.jpg', startSec: 153.28 },  // "escribir,"
  { file: '2_33_b.jpg', startSec: 153.86 },  // "reproducirse y ser consciente de su propia existencia. Un ordenador de los años 50, del tamaño de un armario, del que se esperaba que tuviera alma."
  { file: '2_42.jpg', startSec: 162.94 },  // "La realidad fue más humilde."
  { file: '2_44.jpg', startSec: 164.88 },  // "El Perceptron ni siquiera podía distinguir un perro de un gato."
  { file: '2_48.jpg', startSec: 168.4 },  // "En 1969,"
  { file: '2_50.jpg', startSec: 170.08 },  // "dos investigadores del MIT publicaron un libro destrozando sus límites matemáticos."
  { file: '2_54.jpg', startSec: 174.74 },  // "Fue el primer invierno de la inteligencia artificial."
  { file: '2_57.jpg', startSec: 177.92 },  // "La financiación se congeló de la noche a la mañana."
  { file: '3_01.jpg', startSec: 181.0 },  // "Rosenblatt no llegó a verlo, murió aogado navegando, el día de su cumpleaños número 43."
  { file: '3_06.jpg', startSec: 186.74 },  // "Pero su idea no murió con él."
  { file: '3_08.jpg', startSec: 188.88 },  // "Volvió en los años 80, dentro de un camión."
  { file: '3_12.jpg', startSec: 192.1 },  // "Investigadores de Carnegie Mellon construyeron Alvin, un camión que conducía solo, guiado por una red neuronal con una capa oculta de neuronas entre la entrada y la salida."
  { file: '3_21.jpg', startSec: 201.5 },  // "Un humano conducía primero, enseñándole el ángulo de giro correcto para cada imagen del camino."
  { file: '3_26.jpg', startSec: 206.58 },  // "La velocidad máxima del camión autónomo era de 2 kilómetros por hora."
  { file: '3_30.jpg', startSec: 210.46 },  // "El cuello de botella no era la inteligencia, era la velocidad de cálculo."
  { file: '3_34.jpg', startSec: 214.44 },  // "En los 90 llegó otro invierno."
  { file: '3_36.jpg', startSec: 216.62 },  // "Nadie sabía si el problema era el software o simplemente que faltaba hardware."
  { file: '3_41.jpg', startSec: 221.12 },  // "A mediados de los 2000,"
  { file: '3_42.jpg', startSec: 222.52 },  // "una investigadora llamada Faith Faley tuvo una idea distinta."
  { file: '3_46.jpg', startSec: 226.24 },  // "Quizás el problema nunca fue el algoritmo, quizás faltaban datos."
  { file: '3_50.jpg', startSec: 230.6 },  // "Entre 2006 y 2009 construyó ImageNet,"
  { file: '3_54.jpg', startSec: 234.14 },  // "una base de datos con un millón 200 mil imágenes etiquetadas a mano."
  { file: '3_58.jpg', startSec: 238.84 },  // "Con eso organizó una competición anual para clasificar imágenes en mil categorías distintas."
  { file: '4_04.jpg', startSec: 244.2 },  // "En 2010,"
  { file: '4_05.jpg', startSec: 245.24 },  // "la mejor red se equivocaba casi un tercio de las veces."
  { file: '4_08.jpg', startSec: 248.18 },  // "En 2011 mejoró un poco,"
  { file: '4_10.jpg', startSec: 250.12 },  // "pero en 2012 todo cambió de golpe."
  { file: '4_13.jpg', startSec: 253.06 },  // "Una red llamada AlexNet arrasó la competición con una tasa de error de solo el 16%."
  { file: '4_19.jpg', startSec: 259.7 },  // "Tenía 8 capas, 500 mil neuronas y 60 millones de pesos que ajustar y se entrenó usando tarjetas gráficas no procesadores normales."
  { file: '4_28.jpg', startSec: 268.7 },  // "Su artículo se ha citado más de 100 mil veces,"
  { file: '4_31.jpg', startSec: 271.52 },  // "fue el pistoletazo de salida de la Ia moderna."
  { file: '4_34.jpg', startSec: 274.94 },  // "Para 2015 una red de 100 capas ya clasificaba imágenes mejor que un humano,"
  { file: '4_40.jpg', startSec: 280.0 },  // "pero ese éxito trajo un problema nuevo y muy caro."
  { file: '4_43.jpg', startSec: 283.52 },  // "Entrenar una sola red neuronal grande puede gastar tanta electricidad como tres casas en un año entero y la mayor parte de esa energía no se gasta calculando. Se gasta moviendo datos de la memoria al procesador una y otra vez."
  { file: '4_57.jpg', startSec: 297.24 },  // "Además, los transistores ya casi tienen el tamaño de un átomo,"
  { file: '5_00.jpg', startSec: 300.78 },  // "no queda mucho margen para encogerlos más."
  { file: '5_03.jpg', startSec: 303.42 },  // "Digital llegando a su límite físico,"
  { file: '5_05.jpg', startSec: 305.78 },  // "redes neuronales cada vez más grandes y casi todo su trabajo reducido a una sola operación,"
  { file: '5_11.jpg', startSec: 311.28 },  // "multiplicar y sumar."
  { file: '5_13.jpg', startSec: 313.24 },  // "Esa es la tormenta perfecta que puede traer de vuelta al o analógico."
  { file: '5_17.jpg', startSec: 317.14 },  // "Y aquí está el giro final."
  { file: '5_19.jpg', startSec: 319.06 },  // "A una red neuronal no le importa ser un poco imprescisa. Si está 97 % segura de que ve una gallina, sí enciendo una gallina."
  { file: '5_27.jpg', startSec: 327.42 },  // "Justo el error que un dio a las computadoras analógicas hace 70 años a la inteligencia artificial no le molesta en absoluto."
  { file: '5_34.jpg', startSec: 334.96 },  // "Hoy existen chips analógicos reales para redes neuronales."
  { file: '5_38.jpg', startSec: 338.84 },  // "Reutilizan memoria flasco -riente pero de una forma ingeniosa."
  { file: '5_42.jpg', startSec: 342.52 },  // "En vez de guardar solo un cero o un uno guardan una cantidad exacta de electrones como una resistencia variable."
  { file: '5_49.jpg', startSec: 349.2 },  // "Aplica su envoltaje y la corriente resultante ya es, literalmente, la multiplicación hecha por la física misma."
  { file: '5_56.jpg', startSec: 356.26 },  // "Uno de estos chips hace 25 billones de operaciones por segundo usando solo 3 vatios de energía."
  { file: '6_02.jpg', startSec: 362.76 },  // "Un chip digital equivalente necesita decenas de vatios y cuesta miles de dólares."
  { file: '6_08.jpg', startSec: 368.06 },  // "Ya se usan para cámaras de seguridad, inspección en fábricas y para que un altavoz inteligente reconozca su palabra de activación gastando casi nada de batería."
  { file: '6_17.jpg', startSec: 377.22 },  // "Todavía tienen un límite."
  { file: '6_18.jpg', startSec: 378.94 },  // "La señal analógica se distorsiona si en cadenas demasiado operaciones seguidas."
  { file: '6_23.jpg', startSec: 383.6 },  // "Así que los chips actuales alternan. Analógico digital,"
  { file: '6_27.jpg', startSec: 387.46 },  // "analógico otra vez para no perder la señal por el camino."
  { file: '6_31.jpg', startSec: 391.02 },  // "Hay algo casi poético en todo esto."
  { file: '6_33.jpg', startSec: 393.36 },  // "Para construir su perceptro en original,"
  { file: '6_35.jpg', startSec: 395.64 },  // "Rosenblatt no tenía suficiente potencia digital."
  { file: '6_38.jpg', startSec: 398.72 },  // "Así que construyó su propia computadora analógica a mano con resistencias variables y pequeños motores."
  { file: '6_45.jpg', startSec: 405.28 },  // "Su idea sobre las redes neuronales resultó ser correcta."
  { file: '6_48.jpg', startSec: 408.84 },  // "Puede que su instinto analógico también lo fuera."
  { file: '6_51.jpg', startSec: 411.86 },  // "Nuestro propio cerebro es digital en el sentido de que una neurona se dispara o no."
  { file: '6_56.jpg', startSec: 416.8 },  // "Pero también es profundamente analógico."
  { file: '6_59.jpg', startSec: 419.38 },  // "El pensamiento ocurre en todas partes a la vez."
  { file: '7_02.jpg', startSec: 422.3 },  // "Quizás para lograr una inteligencia artificial de verdad hace falta algo del poder de lo analógico."
  { file: '7_08.jpg', startSec: 428.1 },  // "Suscríbete si quieres que sigamos abriendo la caja negra de la IA."
];

// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/el-error-de-los-ordenadores-de-ia/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'magic_sparkle.mp3', startSec: 5.76, volume: 0.14 },
  { file: 'old_machine_sweep.mp3', startSec: 11.74, volume: 0.14 },
  { file: 'storm_rumble.mp3', startSec: 19.4, volume: 0.15 },
  { file: 'somber_tone.mp3', startSec: 25.48, volume: 0.15 },
  { file: 'synth_pulse.mp3', startSec: 30.18, volume: 0.11 },
  { file: 'magic_sparkle.mp3', startSec: 43.22, volume: 0.14 },
  { file: 'keyboard_clack.mp3', startSec: 55.54, volume: 0.11 },
  { file: 'electric_zap.mp3', startSec: 65.38, volume: 0.14 },
  { file: 'warning_beep.mp3', startSec: 69.3, volume: 0.13 },
  { file: 'trophy_chime.mp3', startSec: 83.84, volume: 0.16 },
  { file: 'mystery_sting.mp3', startSec: 89.72, volume: 0.16 },
  { file: 'digital_chime.mp3', startSec: 95.98, volume: 0.14 },
  { file: 'realization_chime.mp3', startSec: 141.64, volume: 0.15 },
  { file: 'dramatic_reveal.mp3', startSec: 147.84, volume: 0.18 },
  { file: 'comedic_boing.mp3', startSec: 153.86, volume: 0.13 },
  { file: 'somber_tone.mp3', startSec: 181.0, volume: 0.16 },
  { file: 'vintage_computer.mp3', startSec: 188.88, volume: 0.13 },
  { file: 'comedic_boing.mp3', startSec: 206.58, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 216.62, volume: 0.15 },
  { file: 'realization_chime.mp3', startSec: 226.24, volume: 0.15 },
  { file: 'gear_whirring.mp3', startSec: 238.84, volume: 0.12 },
  { file: 'big_reveal_swell.mp3', startSec: 253.06, volume: 0.2 },
  { file: 'trophy_chime.mp3', startSec: 274.94, volume: 0.16 },
  { file: 'warning_beep.mp3', startSec: 283.52, volume: 0.14 },
  { file: 'synth_pulse.mp3', startSec: 305.78, volume: 0.12 },
  { file: 'storm_rumble.mp3', startSec: 313.24, volume: 0.15 },
  { file: 'comedic_boing.mp3', startSec: 319.06, volume: 0.14 },
  { file: 'electric_zap.mp3', startSec: 349.2, volume: 0.15 },
  { file: 'digital_chime.mp3', startSec: 356.26, volume: 0.15 },
  { file: 'gear_whirring.mp3', startSec: 383.6, volume: 0.12 },
  { file: 'realization_chime.mp3', startSec: 405.28, volume: 0.15 },
  { file: 'synth_pulse.mp3', startSec: 416.8, volume: 0.11 },
  { file: 'digital_whoosh.mp3', startSec: 422.3, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 428.1, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_curious_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.14;

export const ElErrorDeLosOrdenadoresDeIA: React.FC = () => {
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
      <Audio src={staticFile('el-error-de-los-ordenadores-de-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`el-error-de-los-ordenadores-de-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`el-error-de-los-ordenadores-de-ia-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`el-error-de-los-ordenadores-de-ia/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
