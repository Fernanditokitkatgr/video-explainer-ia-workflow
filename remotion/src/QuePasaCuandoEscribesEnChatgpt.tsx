import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-pasa-cuando-escribes-en-chatgpt - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Cuando Chat GPT te responde, las palabras van apareciendo una a una,
  { file: '0_04.jpg', startSec: 4.1 },  // como si alguien estuviera tecleando al otro lado.
  { file: '0_07.jpg', startSec: 7.1 },  // Pero al otro lado no hay nadie.
  { file: '0_09.jpg', startSec: 9.42 },  // Y lo más raro es que ni la propia máquina sabe cómo va a terminar su frase,
  { file: '0_14.jpg', startSec: 14.06 },  // va decidiendo sobre la marcha, una pieza cada vez.
  { file: '0_17.jpg', startSec: 17.8 },  // Hoy vamos a seguir el viaje de un solo mensaje,
  { file: '0_20.jpg', startSec: 20.38 },  // desde que Pulse Asenter hasta que aparece la última palabra.
  { file: '0_24.jpg', startSec: 24.3 },  // Empecemos con un mensaje sencillo. Escribes en Chat GPT.
  { file: '0_27.jpg', startSec: 27.72 },  // ¿Cómo se hace una tortilla de patatas?
  { file: '0_30.jpg', startSec: 30.66 },  // Y Pulse Asenter, en ese instante tu mensaje sale de tu móvil.
  { file: '0_34.jpg', startSec: 34.98 },  // Porque Chat GPT no vive en tu móvil, vive en un centro de datos,
  { file: '0_38.jpg', startSec: 38.9 },  // una nave enorme llena de ordenadores que puede estar a miles de kilómetros.
  { file: '0_43.jpg', startSec: 43.24 },  // Tu pregunta viaja por Internet, igual que cualquier otra web,
  { file: '0_46.jpg', startSec: 46.66 },  // y llega a una de esas máquinas. Pero allí nadie la lee como la lee es tú.
  { file: '0_50.jpg', startSec: 50.94 },  // La máquina no entiende letras, sólo entiende números.
  { file: '0_54.jpg', startSec: 54.54 },  // Así que lo primero que pasa es algo curioso. Tu mensaje se corta en trocitos.
  { file: '0_59.jpg', startSec: 59.4 },  // A esos trocitos se les llama Tokens.
  { file: '1_02.jpg', startSec: 62.08 },  // Un token puede ser una palabra entera, un trozo de palabra,
  { file: '1_05.jpg', startSec: 65.2 },  // o incluso un signo de puntuación.
  { file: '1_07.jpg', startSec: 67.64 },  // Las palabras cortas y muy usadas suelen ser un solo token.
  { file: '1_11.jpg', startSec: 71.44 },  // Las largas horraras se parten en varios. Por ejemplo, una palabra como increíblemente
  { file: '1_16.jpg', startSec: 76.72 },  // podría cortarse en algo así como increíble y mente.
  { file: '1_21.jpg', startSec: 81.56 },  // Y la interrogación o el espacio antes de una palabra
  { file: '1_24.jpg', startSec: 84.38 },  // también cuentan como parte de las piezas.
  { file: '1_27.jpg', startSec: 87.4 },  // El modelo tiene un catálogo fijo de decenas de miles de piezas
  { file: '1_30.jpg', startSec: 90.52 },  // y cualquier texto del mundo se puede montar combinándolas
  { file: '1_33.jpg', startSec: 93.5 },  // como si fueran piezas de lego. Por eso los límites de estos modelos no se miden en palabras,
  { file: '1_39.jpg', startSec: 99.14 },  // se miden en Tokens. Tu pregunta sobre la tortilla ya no es una frase,
  { file: '1_43.jpg', startSec: 103.76 },  // es una fila de piezas. Siguiente parada.
  { file: '1_47.jpg', startSec: 107.38 },  // Cada pieza se cambia por un número, su número de catálogo.
  { file: '1_51.jpg', startSec: 111.08 },  // Pero un número solo no dice nada, así que cada pieza se convierte en una lista larguísima de números,
  { file: '1_56.jpg', startSec: 116.92 },  // miles de ellos. Esa lista funciona como unas coordenadas,
  { file: '2_01.jpg', startSec: 121.04 },  // como la posición de un punto en un mapa. En ese mapa, las piezas con significado parecido
  { file: '2_05.jpg', startSec: 125.96 },  // quedan cerca unas de otras. Patata queda cerca de cebolla.
  { file: '2_10.jpg', startSec: 130.26 },  // Sartén, cerca de cocina. Nadie dibujó ese mapa a mano.
  { file: '2_14.jpg', startSec: 134.42 },  // La máquina lo fue ajustando sola mientras aprendía.
  { file: '2_17.jpg', startSec: 137.9 },  // Tu pregunta ya no es texto, es un montón de puntos en un mapa de significados.
  { file: '2_22.jpg', startSec: 142.92 },  // Ahora llegamos al corazón de todo, el modelo de lenguaje.
  { file: '2_27.jpg', startSec: 147.24 },  // Por dentro es una red gigantesca de operaciones matemáticas.
  { file: '2_30.jpg', startSec: 150.66 },  // Las siglas Gpt vienen de su nombre técnico en inglés,
  { file: '2_34.jpg', startSec: 154.22 },  // transformador generativo preentrenado.
  { file: '2_37.jpg', startSec: 157.12 },  // Su gran truco se llama atención. Le permite mirar todas las piezas a la vez
  { file: '2_41.jpg', startSec: 161.64 },  // y decidir cuáles importan más para entender cada una.
  { file: '2_44.jpg', startSec: 164.52 },  // Así sabe que en tu frase patatas va con tortilla
  { file: '2_48.jpg', startSec: 168.08 },  // y que lo que pides es una receta, no una historia.
  { file: '2_51.jpg', startSec: 171.96 },  // Y después de todo ese cálculo, el modelo sólo responde a una pregunta.
  { file: '2_56.jpg', startSec: 176.48 },  // Una sola. ¿Cuál es la siguiente pieza más probable?
  { file: '3_01.jpg', startSec: 181.0 },  // Y esta es la clave de todo el vídeo.
  { file: '3_03.jpg', startSec: 183.56 },  // Chat Gpt no escribe la respuesta entera y luego te la enseña.
  { file: '3_07.jpg', startSec: 187.32 },  // Calcula una pieza, la añade al texto y vuelve a empezar desde el principio
  { file: '3_11.jpg', startSec: 191.6 },  // ahora con esa pieza nueva incluida.
  { file: '3_14.jpg', startSec: 194.52 },  // Otra pieza, otra vuelta completa y así cientos de veces seguidas.
  { file: '3_19.jpg', startSec: 199.54 },  // Por eso ves la respuesta a parecer palabra a palabra.
  { file: '3_22.jpg', startSec: 202.26 },  // No es un efecto bonito para darle emoción, es literalmente cómo se está fabricando.
  { file: '3_27.jpg', startSec: 207.94 },  // Es como el autocompletado del teclado de tu móvil,
  { file: '3_30.jpg', startSec: 210.74 },  // pero llevado a un extremo absurdo. Algunos modelos, antes de contestar,
  { file: '3_35.jpg', startSec: 215.42 },  // escriben primero un borrador de razonamiento que no siempre ves,
  { file: '3_39.jpg', startSec: 219.0 },  // pero ese borrador se fabrica exactamente igual. Una pieza cada vez,
  { file: '3_43.jpg', startSec: 223.86 },  // sin plan previo, sin saber cómo termina la frase.
  { file: '3_47.jpg', startSec: 227.38 },  // Pero cómo lige cada pieza? Con probabilidades.
  { file: '3_51.jpg', startSec: 231.58 },  // Para la siguiente palabra, el modelo no tiene una única respuesta,
  { file: '3_55.jpg', startSec: 235.34 },  // tiene una lista de candidatas, cada una con su porcentaje.
  { file: '3_59.jpg', startSec: 239.1 },  // Después de para hacer una tortilla necesitas, la palabra huevos tendrá muchísima probabilidad.
  { file: '4_04.jpg', startSec: 244.68 },  // Patatas también, chocolate casi ninguna.
  { file: '4_08.jpg', startSec: 248.22 },  // Y aquí entra una justa que se llama temperatura.
  { file: '4_11.jpg', startSec: 251.16 },  // Con la temperatura baja, el modelo escoge casi siempre la opción más probable.
  { file: '4_15.jpg', startSec: 255.78 },  // Es predecible, casi aburrido. Con la temperatura más alta,
  { file: '4_19.jpg', startSec: 259.84 },  // si atreve a escoger opciones menos probables, es más creativo, pero también más raro.
  { file: '4_24.jpg', startSec: 264.7 },  // Por eso, si le haces la misma pregunta dos veces, casi nunca te contesta exactamente igual.
  { file: '4_29.jpg', startSec: 269.62 },  // Hay un poco de dado en cada palabra. Ahora, algo que seguramente te ha pasado.
  { file: '4_35.jpg', startSec: 275.22 },  // Tienes un chat larguísimo, y de repente parece que sea olvidado de lo que le dijiste al principio.
  { file: '4_40.jpg', startSec: 280.54 },  // No es un despiste, es un límite físico,
  { file: '4_43.jpg', startSec: 283.44 },  // se llama ventana de contexto. Cada vez que envías un mensaje,
  { file: '4_47.jpg', startSec: 287.6 },  // el modelo vuelve a leer la conversación entera desde el principio,
  { file: '4_50.jpg', startSec: 290.9 },  // todas las piezas. Pero solo cabe un número máximo de piezas a la vez,
  { file: '4_55.jpg', startSec: 295.36 },  // es como una mesa de trabajo con un tamaño fijo.
  { file: '4_58.jpg', startSec: 298.18 },  // Cuando la conversación no cabe, lo más antiguo se queda fuera de la mesa,
  { file: '5_02.jpg', startSec: 302.42 },  // o sea, tiende peor, y para el modelo, lo que no está en la mesa no existe.
  { file: '5_07.jpg', startSec: 307.6 },  // Y hay algo todavía más sorprendente. El modelo no tiene memoria entre conversaciones.
  { file: '5_13.jpg', startSec: 313.18 },  // Cuando abres un chat nuevo, empieza de cero.
  { file: '5_15.jpg', startSec: 315.9 },  // No sabe quién eres ni de qué hablasteis ayer.
  { file: '5_18.jpg', startSec: 318.62 },  // Salvo que tengas activada una función de memoria.
  { file: '5_21.jpg', startSec: 321.42 },  // En ese caso, la aplicación guarda algunas notas sobre ti
  { file: '5_24.jpg', startSec: 324.14 },  // y se las añade a escondidas al principio de cada chat.
  { file: '5_27.jpg', startSec: 327.68 },  // Pero el modelo, en sí, no recuerda nada. Solo lee lo que le ponen delante en ese momento.
  { file: '5_33.jpg', startSec: 333.3 },  // Y aquí viene el problema más famoso. A veces chat GPT se inventa cosas.
  { file: '5_38.jpg', startSec: 338.32 },  // Un dato que no existe, un libro que nadie ha escrito,
  { file: '5_41.jpg', startSec: 341.5 },  // una cita que nadie dijo, y te lo cuenta con total seguridad.
  { file: '5_45.jpg', startSec: 345.58 },  // A eso se le llama alucinación, y tiene una explicación muy sencilla.
  { file: '5_50.jpg', startSec: 350.28 },  // El modelo no busca la verdad en una base de datos,
  { file: '5_53.jpg', startSec: 353.28 },  // predice que texto suena más probable. Casi siempre, lo más probable coincide con lo verdadero,
  { file: '5_58.jpg', startSec: 358.68 },  // pero no siempre. Si no sabe algo, no se queda callado,
  { file: '6_02.jpg', startSec: 362.38 },  // sigue haciéndolo único que sabe hacer, poner la siguiente pieza que suena bien.
  { file: '6_06.jpg', startSec: 366.9 },  // Por eso, para cualquier dato importante, compúrbano siempre en una fuente fiable.
  { file: '6_12.jpg', startSec: 372.06 },  // Vale, y cómo aprendió a predecir también,
  { file: '6_15.jpg', startSec: 375.28 },  // leyendo muchísimo. Primero, lo que se llama pre-entrenamiento,
  { file: '6_20.jpg', startSec: 380.2 },  // le dieron cantidades enormes de texto, páginas web, libros, artículos, código,
  { file: '6_25.jpg', startSec: 385.02 },  // y le pusieron un único ejercicio, repetido miles de millones de veces.
  { file: '6_30.jpg', startSec: 390.02 },  // Leer un trozo de texto y adivinar la palabra siguiente.
  { file: '6_33.jpg', startSec: 393.12 },  // Al principio fallaba siempre. Cada fallo ajustaba un poquito sus números internos,
  { file: '6_38.jpg', startSec: 398.24 },  // y poco a poco fue acertando más.
  { file: '6_41.jpg', startSec: 401.12 },  // Para adivinar bien la siguiente palabra de una receta,
  { file: '6_44.jpg', startSec: 404.08 },  // tiene que captar cómo son las recetas, y lo mismo con la historia,
  { file: '6_47.jpg', startSec: 407.46 },  // las matemáticas o los chistes. Pero un modelo así solo sabe continuar textos,
  { file: '6_52.jpg', startSec: 412.64 },  // no sabe conversar ni ayudarte. Así que hay un segundo paso.
  { file: '6_56.jpg', startSec: 416.9 },  // Personas reales leen muchas respuestas del modelo y puntúan cuáles son mejores,
  { file: '7_01.jpg', startSec: 421.72 },  // más útiles, más claras, más prudentes.
  { file: '7_04.jpg', startSec: 424.38 },  // Con esas notas, el modelo se reajusta para parecerse aún asistente,
  { file: '7_08.jpg', startSec: 428.62 },  // por eso responde como alguien amable que quiere ayudarte.
  { file: '7_12.jpg', startSec: 432.18 },  // Volvamos a tu tortilla. Mientras todo esto pasa, ¿qué máquinas están haciendo el trabajo?
  { file: '7_17.jpg', startSec: 437.78 },  // No son ordenadores normales, son tarjetas gráficas,
  { file: '7_21.jpg', startSec: 441.1 },  // las mismas que nacieron para los videojuegos.
  { file: '7_23.jpg', startSec: 443.72 },  // Son perfectas para esto, porque hacen millones de multiplicaciones pequeñas a la vez,
  { file: '7_27.jpg', startSec: 447.9 },  // y un modelo de lenguaje en el fondo es eso,
  { file: '7_30.jpg', startSec: 450.88 },  // multiplicaciones. Para atender a cientos de millones de personas,
  { file: '7_35.jpg', startSec: 455.18 },  // hacen falta decenas de miles de estas tarjetas trabajando a la vez.
  { file: '7_38.jpg', startSec: 458.94 },  // Y todo eso tiene un precio, esas naves consumen muchísima electricidad,
  { file: '7_43.jpg', startSec: 463.64 },  // y como las máquinas se calientan, muchas usan agua para refrigerarse.
  { file: '7_47.jpg', startSec: 467.9 },  // Cada respuesta cuesta poca energía por separado,
  { file: '7_50.jpg', startSec: 470.76 },  // pero multiplicada por millones de preguntas al día, se convierte en una factura enorme para el planeta.
  { file: '7_56.jpg', startSec: 476.32 },  // Así que la próxima vez que escribas en chat GPT,
  { file: '7_59.jpg', startSec: 479.34 },  // piensa en el viaje que estaba decer tu mensaje.
  { file: '8_02.jpg', startSec: 482.04 },  // A cruzado internet hasta un centro de datos,
  { file: '8_04.jpg', startSec: 484.7 },  // se ha cortado empiezas, cada pieza se ha convertido en un punto
  { file: '8_07.jpg', startSec: 487.9 },  // en un mapa de significados. Miles de tarjetas gráficas han calculado
  { file: '8_12.jpg', startSec: 492.1 },  // cuál era la pieza más probable, y después la siguiente y la siguiente.
  { file: '8_16.jpg', startSec: 496.9 },  // Al otro lado, no hay nadie escribiendo, solo una máquina que adivina tu respuesta,
  { file: '8_21.jpg', startSec: 501.46 },  // una pieza cada vez. Si te gusta entender cómo funciona de verdad la tecnología
  { file: '8_25.jpg', startSec: 505.88 },  // que usas cada día, suscríbete. Cada semana, una máquina, un invento,
  { file: '8_30.jpg', startSec: 510.58 },  // o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'typing_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'eerie_empty.mp3', startSec: 7.1, volume: 0.13 },
  { file: 'send_whoosh.mp3', startSec: 30.7, volume: 0.15 },
  { file: 'scissors_snip.mp3', startSec: 54.5, volume: 0.15 },
  { file: 'lego_click.mp3', startSec: 93.5, volume: 0.15 },
  { file: 'map_pop.mp3', startSec: 121.0, volume: 0.13 },
  { file: 'reveal_chime.mp3', startSec: 142.9, volume: 0.16 },
  { file: 'key_sting.mp3', startSec: 181.0, volume: 0.16 },
  { file: 'dice_roll.mp3', startSec: 227.4, volume: 0.15 },
  { file: 'thermo_rise.mp3', startSec: 248.2, volume: 0.13 },
  { file: 'fall_off.mp3', startSec: 298.2, volume: 0.14 },
  { file: 'oops_sting.mp3', startSec: 333.3, volume: 0.15 },
  { file: 'page_flip.mp3', startSec: 372.1, volume: 0.14 },
  { file: 'stars_ding.mp3', startSec: 416.9, volume: 0.14 },
  { file: 'gpu_hum.mp3', startSec: 437.8, volume: 0.13 },
  { file: 'closing_turn.mp3', startSec: 476.3, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 505.9, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QuePasaCuandoEscribesEnChatgpt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-pasa-cuando-escribes-en-chatgpt.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-pasa-cuando-escribes-en-chatgpt-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-pasa-cuando-escribes-en-chatgpt-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-pasa-cuando-escribes-en-chatgpt/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
