import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Tecno — "Propagación hacia atrás: así aprende de verdad una red neuronal" (parte 4)
// Timestamps from Whisper word-gap resegmentation (--resegment-gap 0.35). 1 segmento = 1 imagen.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Hoy hablamos del algoritmo más importante de todo esto, la propagación hacia atrás."
  { file: '0_05.jpg', startSec: 5.16 },  // "Es el motor real de cómo aprende una red neuronal."
  { file: '0_08.jpg', startSec: 8.38 },  // "Repaso relámpago antes de empezar, ya sabes que es una red neuronal,"
  { file: '0_12.jpg', startSec: 12.4 },  // "ya sabes cómo propaga información hacia adelante."
  { file: '0_15.jpg', startSec: 15.02 },  // "Y ya viste el descenso degradiente,"
  { file: '0_17.jpg', startSec: 17.06 },  // "mover 13 .000 diales para bajar el costo lo más rápido posible."
  { file: '0_20.jpg', startSec: 20.86 },  // "Pues bien, la retropropagación es el algoritmo que calcula exactamente ese movimiento,"
  { file: '0_26.jpg', startSec: 26.12 },  // "cómo mover esos 13 .000 números uno por uno. Y sí,"
  { file: '0_30.jpg', startSec: 30.06 },  // "pensar entre 13 .000 dimensiones a la vez es imposible para un cerebro humano."
  { file: '0_34.jpg', startSec: 34.06 },  // "Por suerte hay otra forma de pensarlo."
  { file: '0_36.jpg', startSec: 36.32 },  // "Cada número de ese agradiente te dice una cosa muy simple, que tan sensible es el costo a ese peso en concreto."
  { file: '0_43.jpg', startSec: 43.5 },  // "Un ejemplo rápido,"
  { file: '0_44.jpg', startSec: 44.78 },  // "imagina que calculas la agradiente y un peso te da 3x2, otro peso en cambio te da 0x1."
  { file: '0_51.jpg', startSec: 51.24 },  // "Eso significa que el costo es 32 veces más sensible al primer peso que al segundo. Mover el primero un poco cambia mucho el resultado."
  { file: '0_59.jpg', startSec: 59.8 },  // "Mover el segundo casi nada."
  { file: '1_02.jpg', startSec: 62.12 },  // "Vale, con eso claro, vamos al mecanismo real paso a paso."
  { file: '1_05.jpg', startSec: 65.74 },  // "Nos olvidamos de la notación matemática por completo, solo vamos a razonar con un único ejemplo de entrenamiento, la imagen de un 2."
  { file: '1_13.jpg', startSec: 73.22 },  // "La red, sin entrenar todavía, es cupe resultados casi aleatorios."
  { file: '1_17.jpg', startSec: 77.38 },  // "Algo como 0 ,5, 0 ,8, 0 ,2, puro ruido. No podemos tocar esas activaciones directamente,"
  { file: '1_24.jpg', startSec: 84.56 },  // "solo controlamos los pesos y los sesgos."
  { file: '1_27.jpg', startSec: 87.02 },  // "Pero si podemos anotar que cambios nos gustaría ver en esa última capa. Como queremos que la red diga 2, el valor de esa neurona debería subir,"
  { file: '1_35.jpg', startSec: 95.4 },  // "y todos los demás deberían bajar. Cuanto más lejos esté un valor de donde debería estar, más importante es corregirlo."
  { file: '1_42.jpg', startSec: 102.4 },  // "Centrémonos solo en la neurona del 2. ¿Cómo aumentamos su activación?"
  { file: '1_46.jpg', startSec: 106.48 },  // "Recuerda, activación es una suma ponderada de la capa anterior, más un sesgo metida en una función de apachurramiento."
  { file: '1_53.jpg', startSec: 113.54 },  // "Así que hay tres palancas disponibles,"
  { file: '1_55.jpg', startSec: 115.72 },  // "subir el sesgo,"
  { file: '1_56.jpg', startSec: 116.8 },  // "subir los pesos o cambiar las activaciones de la capa anterior."
  { file: '2_00.jpg', startSec: 120.6 },  // "Vamos con los pesos primero."
  { file: '2_02.jpg', startSec: 122.42 },  // "No todos los pesos pesan igual,"
  { file: '2_04.jpg', startSec: 124.26 },  // "nunca mejor dicho."
  { file: '2_05.jpg', startSec: 125.54 },  // "Las conexiones con neuronas ya muy brillantes en la capa anterior tienen más impacto."
  { file: '2_10.jpg', startSec: 130.22 },  // "Subir ese peso mueve más la aguja que subir un peso conectado a una neurona apagada. Dato curioso, esto se parece a una idea real de neurociencia, la teoría heavyana,"
  { file: '2_21.jpg', startSec: 141.28 },  // "las neuronas que se activan juntas se conectan juntas. Aquí pasa algo parecido, las neuronas más activas y las que queremos activar más, se refuerzan entre sí."
  { file: '2_30.jpg', startSec: 150.66 },  // "Ojo, esto es solo una analogía, no una prueba de que las redes artificiales funcionen como el cerebro real, pero mola señalarlo."
  { file: '2_38.jpg', startSec: 158.1 },  // "La tercera palanca, cambiar las activaciones de la capa anterior."
  { file: '2_41.jpg', startSec: 161.86 },  // "Si todo lo conectado con peso positivo se vuelve más brillante y lo conectado con peso negativo se apaga, esa neurona del dos se activa más."
  { file: '2_49.jpg', startSec: 169.86 },  // "Y otra vez, los cambios más eficientes son proporcionales al tamaño de esos pesos."
  { file: '2_55.jpg', startSec: 175.12 },  // "El problema es que tampoco controlamos esas activaciones directamente,"
  { file: '2_58.jpg', startSec: 178.8 },  // "solo anotamos qué querríamos que pasara ahí."
  { file: '3_01.jpg', startSec: 181.52 },  // "Pero espera,"
  { file: '3_02.jpg', startSec: 182.26 },  // "hay más."
  { file: '3_03.jpg', startSec: 183.2 },  // "Eso es solo lo que quiere la neurona del dos."
  { file: '3_05.jpg', startSec: 185.6 },  // "Las otras nueve neuronas de salida también tienen sus propias exigencias para esa misma capa anterior. Aquí es exactamente donde aparece la propagación hacia atrás,"
  { file: '3_15.jpg', startSec: 195.36 },  // "sumas todos esos deseos de las diez neuronas de salida a la vez."
  { file: '3_19.jpg', startSec: 199.4 },  // "Y el resultado es una lista de ajustes deseados para toda la penúltima capa."
  { file: '3_24.jpg', startSec: 204.76 },  // "¿Y ahora qué?"
  { file: '3_26.jpg', startSec: 206.3 },  // "Repite exactamente el mismo proceso,"
  { file: '3_28.jpg', startSec: 208.72 },  // "pero una capa más atrás."
  { file: '3_30.jpg', startSec: 210.3 },  // "Y otra vez,"
  { file: '3_31.jpg', startSec: 211.24 },  // "y otra,"
  { file: '3_32.jpg', startSec: 212.24 },  // "retrocediendo por toda la red capa por capa."
  { file: '3_35.jpg', startSec: 215.62 },  // "Eso es literalmente propagar hacia atrás,"
  { file: '3_38.jpg', startSec: 218.46 },  // "empujar los ajustes deseados desde la salida hasta la entrada Pero espera, todavía falta una pieza."
  { file: '3_44.jpg', startSec: 224.42 },  // "Si solo escucháramos a este único dos,"
  { file: '3_46.jpg', startSec: 226.82 },  // "la red se obsesionaría con clasificar todo como un dos."
  { file: '3_50.jpg', startSec: 230.48 },  // "Así que repites este mismo proceso para cada ejemplo de entrenamiento,"
  { file: '3_54.jpg', startSec: 234.5 },  // "miles y miles de dígitos distintos,"
  { file: '3_56.jpg', startSec: 236.9 },  // "cada uno con su propia opinión sobre cómo mover los pesos."
  { file: '4_00.jpg', startSec: 240.38 },  // "Y al final, promedias todos esos deseos."
  { file: '4_03.jpg', startSec: 243.44 },  // "Ese promedio de ajustes es, básicamente,"
  { file: '4_06.jpg', startSec: 246.3 },  // "el negativo del agradiente que veníamos persiguiendo. Si entendiste por qué unos cambios pesan más que otros y cómo se suman entre capas,"
  { file: '4_14.jpg', startSec: 254.2 },  // "ya entiendes la mecánica real de la retro -propagación."
  { file: '4_17.jpg', startSec: 257.62 },  // "Ahora un problema práctico."
  { file: '4_19.jpg', startSec: 259.56 },  // "Sumar la influencia de decenas de miles de ejemplos en cada paso es carísimo computacionalmente."
  { file: '4_25.jpg', startSec: 265.86 },  // "Así que en la práctica se hace un truquito."
  { file: '4_28.jpg', startSec: 268.18 },  // "Revolves todos tus datos."
  { file: '4_29.jpg', startSec: 269.98 },  // "Los divides en minilotes,"
  { file: '4_31.jpg', startSec: 271.6 },  // "digamos, de 100 ejemplos cada uno."
  { file: '4_33.jpg', startSec: 273.84 },  // "Calculas un paso de descenso usando solo ese minilote. No es la agradiente perfecta, pero es una muy buena aproximación y muchísimo más rápida."
  { file: '4_43.jpg', startSec: 283.5 },  // "Si dibujaras el camino que sigue la red por la superficie de costo con este método,"
  { file: '4_48.jpg', startSec: 288.02 },  // "parecería un borracho tan valeándose cuesta abajo."
  { file: '4_51.jpg', startSec: 291.12 },  // "Pasos rápidos,"
  { file: '4_52.jpg', startSec: 292.28 },  // "dirección no perfecta."
  { file: '4_54.jpg', startSec: 294.08 },  // "En vez de alguien calculando milimétricamente cada paso antes de moverse."
  { file: '4_58.jpg', startSec: 298.54 },  // "Esta técnica tiene nombre."
  { file: '5_00.jpg', startSec: 300.26 },  // "Descenso de agradiente estocástico."
  { file: '5_02.jpg', startSec: 302.66 },  // "Es literalmente cómo se entrena casi cualquier red neuronal moderna."
  { file: '5_07.jpg', startSec: 307.06 },  // "Repasemos todo, porque han pasado muchas cosas."
  { file: '5_10.jpg', startSec: 310.2 },  // "La retropropagación calcula como un ejemplo de entrenamiento,"
  { file: '5_14.jpg', startSec: 314.04 },  // "quiere mover cada peso y sesgo."
  { file: '5_16.jpg', startSec: 316.24 },  // "No solo si debes subir o bajar,"
  { file: '5_18.jpg', startSec: 318.1 },  // "sino cuánto, en proporción,"
  { file: '5_19.jpg', startSec: 319.88 },  // "para bajar el costo lo más rápido posible."
  { file: '5_22.jpg', startSec: 322.6 },  // "Un paso de descenso de gradiente real"
  { file: '5_25.jpg', startSec: 325.23 },  // "promediaría esto sobre todos tus ejemplos,"
  { file: '5_27.jpg', startSec: 327.52 },  // "pero por eficiencia usamos minilotes al azar uno por paso."
  { file: '5_31.jpg', startSec: 331.76 },  // "Repitiendo esto una y otra vez, la red converge hacia un mínimo local del costo y termina siendo un buen trabajo con los ejemplos que ha visto."
  { file: '5_41.jpg', startSec: 341.14 },  // "Con todo esto, cada línea de código detrás de la retropropagación corresponde algo que ya entiendes, aunque sea de forma intuitiva."
  { file: '5_48.jpg', startSec: 348.62 },  // "Pero una cosa es entender las matemáticas y otra muy distinta es programarla sin liarte con la notación."
  { file: '5_55.jpg', startSec: 355.24 },  // "Ahí es donde de verdad se complica todo."
  { file: '5_58.jpg', startSec: 358.22 },  // "Para quien quiera ir más profundo, el próximo vídeo entra en el cálculo real detrás de todo esto."
  { file: '6_03.jpg', startSec: 363.56 },  // "Las mismas ideas, pero con las fórmulas completas."
  { file: '6_07.jpg', startSec: 367.1 },  // "Antes de cerrar una cosa importante que aplica a todo el aprendizaje automático, no sólo a redes neuronales."
  { file: '6_13.jpg', startSec: 373.22 },  // "Nada de esto funciona sin muchísimos datos de entrenamiento."
  { file: '6_17.jpg', startSec: 377.36 },  // "Los dígitos escritos a mano son un ejemplo perfecto porque existe emenist,"
  { file: '6_22.jpg', startSec: 382.08 },  // "miles de ejemplos ya etiquetados por humanos."
  { file: '6_25.jpg', startSec: 385.1 },  // "En cualquier proyecto real deía,"
  { file: '6_27.jpg', startSec: 387.2 },  // "conseguir datos etiquetados de calidad suele ser el reto más grande de todos. Y así es paso a paso como una red neuronal aprende de verdad."
  { file: '6_36.jpg', startSec: 396.52 },  // "Suscríbete si quieres ver las matemáticas completas en el próximo vídeo."
];


// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/tecno/videos/red-neuronal-retropropagacion/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'digital_whoosh.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'digital_chime.mp3', startSec: 20.86, volume: 0.14 },
  { file: 'synth_pulse.mp3', startSec: 36.32, volume: 0.1 },
  { file: 'weight_thud.mp3', startSec: 51.24, volume: 0.14 },
  { file: 'glitch_error.mp3', startSec: 73.22, volume: 0.14 },
  { file: 'marker_scribble.mp3', startSec: 102.4, volume: 0.11 },
  { file: 'synth_pulse.mp3', startSec: 130.22, volume: 0.1 },
  { file: 'realization_chime.mp3', startSec: 141.28, volume: 0.15 },
  { file: 'digital_chime.mp3', startSec: 195.36, volume: 0.14 },
  { file: 'dramatic_reveal.mp3', startSec: 215.62, volume: 0.16 },
  { file: 'comedic_boing.mp3', startSec: 226.82, volume: 0.14 },
  { file: 'synth_pulse.mp3', startSec: 246.3, volume: 0.11 },
  { file: 'warning_beep.mp3', startSec: 259.56, volume: 0.13 },
  { file: 'comedic_boing.mp3', startSec: 288.02, volume: 0.13 },
  { file: 'realization_chime.mp3', startSec: 300.26, volume: 0.15 },
  { file: 'digital_chime.mp3', startSec: 322.6, volume: 0.13 },
  { file: 'glitch_error.mp3', startSec: 348.62, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 358.22, volume: 0.16 },
  { file: 'page_flip.mp3', startSec: 373.22, volume: 0.1 },
  { file: 'digital_chime.mp3', startSec: 382.08, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 396.52, volume: 0.18 },
];

const MUSIC_FILE = 'background_theme_lofi_30.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.22;

export const RedNeuronalRetropropagacion: React.FC = () => {
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
      <Audio src={staticFile('red-neuronal-retropropagacion.mp3')} playbackRate={PLAYBACK_RATE} />
      {MUSIC_FILE && (
        <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
          <Audio src={staticFile(`red-neuronal-retropropagacion-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
        </Loop>
      )}
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`red-neuronal-retropropagacion-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      {activeFrame && (
        <Img
          src={staticFile(`red-neuronal-retropropagacion/${activeFrame.file}`)}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      )}
    </AbsoluteFill>
  );
};
