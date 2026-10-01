import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// la-ia-va-a-acabar-con-nosotros - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Imagínate que subes a un avión y el ingeniero que lo ha diseñado te dice que hay un 10% de posibilidades de qu
  { file: '0_07.jpg', startSec: 7.44 },  // No te subes, nadie se sube.
  { file: '0_10.jpg', startSec: 10.34 },  // Un 10% es una barbaridad para cualquier cosa que te juegues.
  { file: '0_14.jpg', startSec: 14.38 },  // Pues ese es exactamente el número que dan de media más de 700 investigadores de inteligencia artificial.
  { file: '0_21.jpg', startSec: 21.32 },  // No para un avión, para la extinción de la humanidad.
  { file: '0_24.jpg', startSec: 24.94 },  // Y aun así, el avión sigue en construcción y nadie se ha bajado.
  { file: '0_29.jpg', startSec: 29.86 },  // Hoy vamos a mirar ese número de frente, de donde sale, que significa, y sobre todo, que no significa.
  { file: '0_37.jpg', startSec: 37.48 },  // Lo primero es la palabra, porque la vas a oír cada vez más.
  { file: '0_41.jpg', startSec: 41.06 },  // En este mundillo, la llaman P de Doom.
  { file: '0_44.jpg', startSec: 44.74 },  // Y es simplemente la probabilidad que alguien le asigna a que la inteligencia artificial acabe en una catástrof
  { file: '0_52.jpg', startSec: 52.8 },  // No es un término técnico riguroso, es una forma rápida de decir cuánto miedo te da esto pero con un número.
  { file: '1_00.jpg', startSec: 60.26 },  // Y lo interesante es que se ha convertido en algo que la gente del sector se pregunta entre sí con total normal
  { file: '1_06.jpg', startSec: 66.56 },  // Como quien pregunta por el tiempo.
  { file: '1_08.jpg', startSec: 68.68 },  // Tu cuanto le das, un 10, yo un 2, yo un 90.
  { file: '1_12.jpg', startSec: 72.66 },  // Vamos con los datos, que es lo que hemos venido.
  { file: '1_15.jpg', startSec: 75.7 },  // Hay una organización que se dedica en cuestar a investigadores de inteligencia artificial.
  { file: '1_20.jpg', startSec: 80.28 },  // Se llama AI Impact.
  { file: '1_22.jpg', startSec: 82.9 },  // En su encuesta más amplia participaron más de 700 expertos de primer nivel del campo.
  { file: '1_28.jpg', startSec: 88.84 },  // Y les preguntaron por la probabilidad de que la inteligencia artificial causa la extinción humana o algo igual
  { file: '1_37.jpg', startSec: 97.74 },  // La mediana de las respuestas fue del 10% y la media del 18,3.
  { file: '1_43.jpg', startSec: 103.5 },  // Esa diferencia entre mediana y media, por cierto, ya te dice algo importante.
  { file: '1_48.jpg', startSec: 108.18 },  // Significa que hay un grupo de gente dando números altísimos que tira de la media hacia arriba.
  { file: '1_53.jpg', startSec: 113.84 },  // En una encuesta anterior, la cifra de la mediana era del 5% para extinción o pérdida severa de control.
  { file: '2_00.jpg', startSec: 120.76 },  // O sea, que en el tiempo que ha pasado entre una encuesta y la otra, el número subió.
  { file: '2_06.jpg', startSec: 126.24 },  // Pero el dato de verdad interesante no es la media.
  { file: '2_08.jpg', startSec: 128.62 },  // Es lo que pasa cuando dejas de mirar el promedio y miras a la gente una por una.
  { file: '2_14.jpg', startSec: 134.38 },  // Porque ahí se abre una bismo.
  { file: '2_17.jpg', startSec: 137.34 },  // Uno de los investigadores más con decorados del campo, Premio Nobel de Física en 2024,
  { file: '2_22.jpg', startSec: 142.74 },  // sitúa el riesgo entre el 10 y el 50%.
  { file: '2_26.jpg', startSec: 146.12 },  // El jefe científico de inteligencia artificial, de una de las mayores tecnológicas del mundo,
  { file: '2_31.jpg', startSec: 151.52 },  // lo sitúa por debajo del 0,01%.
  { file: '2_35.jpg', startSec: 155.56 },  // Fíjate en esos dos números juntos un segundo.
  { file: '2_38.jpg', startSec: 158.62 },  // 50% contra 0,01.
  { file: '2_42.jpg', startSec: 162.64 },  // Son dos personas igual de cualificadas, mirando la misma tecnología con los mismos datos encima de la mesa.
  { file: '2_49.jpg', startSec: 169.08 },  // Y sus respuestas se diferencian en varios órdenes de magnitud.
  { file: '2_53.jpg', startSec: 173.18 },  // Y todavía hay más arriba.
  { file: '2_55.jpg', startSec: 175.26 },  // Uno de los teóricos históricos del riesgo de la Ia lo pone por encima del 95%.
  { file: '3_01.jpg', startSec: 181.62 },  // Y una excomisaria reguladora de Estados Unidos alrededor del 15.
  { file: '3_06.jpg', startSec: 186.82 },  // Entonces, ¿qué hacemos con esto?
  { file: '3_09.jpg', startSec: 189.68 },  // Porque la reacción fácil es quedarte con el número que ya encajaba con lo que pensaba antes de empezar el víde
  { file: '3_15.jpg', startSec: 195.66 },  // Y eso no es informarse, eso es buscar quien te dé la razón.
  { file: '3_20.jpg', startSec: 200.7 },  // Así que vamos a la pregunta buena, ¿qué es por qué discrepan tanto?
  { file: '3_24.jpg', startSec: 204.92 },  // Y discrepan porque el número no depende de un dato, depende de tres apuestas.
  { file: '3_29.jpg', startSec: 209.56 },  // Una primera, las capacidades van a seguir creciendo al ritmo actual o se van a estancar.
  { file: '3_36.jpg', startSec: 216.68 },  // Si crees que esto se estanca en unos años, tu número baja muchísimo.
  { file: '3_41.jpg', startSec: 221.2 },  // La segunda, ¿el problema de controlar un sistema más listo que nosotros tiene solución técnica?
  { file: '3_47.jpg', startSec: 227.8 },  // Los optimistas creen que sí, que es un problema de ingeniería como otros.
  { file: '3_52.jpg', startSec: 232.0 },  // Los pessimistas creen que no sabemos ni por dónde empezar.
  { file: '3_55.jpg', startSec: 235.78 },  // ¿Y la tercera habrá avisos por el camino?
  { file: '3_59.jpg', startSec: 239.36 },  // Es decir, fallará algo lo bastante gordo y lo bastante pronto como para que reaccionemos a tiempo pero sin que
  { file: '4_07.jpg', startSec: 247.58 },  // Según cómo respondas a esas tres, te sale un cero como cero uno o te sale un 95.
  { file: '4_13.jpg', startSec: 253.62 },  // Y ninguna de las tres se puede resolver hoy con un experimento.
  { file: '4_18.jpg', startSec: 258.22 },  // Y aquí viene la parte que casi nunca se dice y que es fundamental.
  { file: '4_22.jpg', startSec: 262.48 },  // Estos números no son mediciones. Son opiniones con un decimal puesto.
  { file: '4_28.jpg', startSec: 268.1 },  // Nadie ha medido la probabilidad de extinción por inteligencia artificial porque no hay forma de medirla.
  { file: '4_34.jpg', startSec: 274.5 },  // No hay 100 planetas tierras con 100 inteligencias artificiales para ver en cuanto sale mal.
  { file: '4_40.jpg', startSec: 280.2 },  // Lo que hay son expertos estimando a ojo y un número con decimales suena mucho más científico de lo que realmen
  { file: '4_46.jpg', startSec: 286.6 },  // Eso no invalida el ejercicio ojo, sigue siendo útil, que la gente que más sabe te diga cuánto le preocupa algo
  { file: '4_55.jpg', startSec: 295.96 },  // Pero es la opinión de un experto no el resultado de un experimento, y no es lo mismo.
  { file: '5_02.jpg', startSec: 302.14 },  // Entonces, respondiendo a la pregunta del título de una vez.
  { file: '5_06.jpg', startSec: 306.22 },  // ¿La inteligencia artificial va a acabar con nosotros?
  { file: '5_09.jpg', startSec: 309.84 },  // La respuesta honesta es que nadie lo sabe.
  { file: '5_12.jpg', startSec: 312.78 },  // Y que cualquiera que te diga que está seguro, en cualquiera de las dos direcciones te está contando cómo es él
  { file: '5_20.jpg', startSec: 320.8 },  // Ni el que te dice que estamos todos muertos en cinco años, ni el que te dice que esto es un chatbot un poco me
  { file: '5_28.jpg', startSec: 328.14 },  // Los dos están rellenando con carácter un hueco que debería estar ocupado por incertidumbre.
  { file: '5_33.jpg', startSec: 333.6 },  // Pero hay una conclusión que sí se puede sacar y es bastante más práctica.
  { file: '5_37.jpg', startSec: 337.68 },  // Para tomar decisiones, no hace falta saber si el número es un dos o un veinte.
  { file: '5_43.jpg', startSec: 343.16 },  // Basta con que el número no sea cero.
  { file: '5_46.jpg', startSec: 346.08 },  // Nadie discute que sea mayor que cero, ni siquiera el más optimista de todos, que lo pone bajísimo, lo pone en 
  { file: '5_53.jpg', startSec: 353.36 },  // Y cuando una probabilidad no es cero y lo que está en juego es todo, la respuesta razonable no es entrar en pá
  { file: '6_00.jpg', startSec: 360.06 },  // Tampoco es ignorarlo. Es hacer lo que hacemos con cualquier otro riesgo pequeño pero catastrófico, que es medi
  { file: '6_11.jpg', startSec: 371.92 },  // Que es exactamente lo que hacemos con las centrales nucleares, con los aviones y con los medicamentos.
  { file: '6_18.jpg', startSec: 378.06 },  // No porque creamos que van a fallar, sino porque el coste de equivocarse es inasumible.
  { file: '6_23.jpg', startSec: 383.62 },  // Así que la próxima vez que veas un titular diciendo que la Ia nos va a extinguir, o uno diciendo que todo eso 
  { file: '6_31.jpg', startSec: 391.16 },  // acuérdate de que 700 de los que más saben dieron una mediana del 10% y que entre ellos hay quien dice 0,01 y q
  { file: '6_41.jpg', startSec: 401.46 },  // El titular honesto no es que nos vamos a morir, ni que no pasa nada.
  { file: '6_45.jpg', startSec: 405.22 },  // El titular honesto es que los que están construyendo esto no se ponen de acuerdo y lo están construyendo igual
  { file: '6_54.jpg', startSec: 414.0 },  // Si esto te he hecho pensar, suscríbete, se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'cabin_intro.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'stat_drop.mp3', startSec: 14.38, volume: 0.16 },
  { file: 'term_reveal.mp3', startSec: 41.06, volume: 0.15 },
  { file: 'survey_tally.mp3', startSec: 82.9, volume: 0.14 },
  { file: 'number_reveal.mp3', startSec: 97.74, volume: 0.16 },
  { file: 'chasm_open.mp3', startSec: 134.38, volume: 0.15 },
  { file: 'clash_contrast.mp3', startSec: 158.62, volume: 0.16 },
  { file: 'question_turn.mp3', startSec: 186.82, volume: 0.14 },
  { file: 'dice_three.mp3', startSec: 204.92, volume: 0.15 },
  { file: 'caveat_low.mp3', startSec: 258.22, volume: 0.14 },
  { file: 'the_question.mp3', startSec: 306.22, volume: 0.16 },
  { file: 'not_zero.mp3', startSec: 343.16, volume: 0.16 },
  { file: 'safety_systems.mp3', startSec: 371.92, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 383.62, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 414.0, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const LaIaVaAAcabarConNosotros: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('la-ia-va-a-acabar-con-nosotros.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`la-ia-va-a-acabar-con-nosotros-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`la-ia-va-a-acabar-con-nosotros-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`la-ia-va-a-acabar-con-nosotros/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
