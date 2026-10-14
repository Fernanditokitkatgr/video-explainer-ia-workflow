import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-funcionan-los-deepfakes - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Imagina un vídeo de un político anunciando algo gravísimo.
  { file: '0_03.jpg', startSec: 3.7 },  // Habla con su voz de siempre, mueve la boca con total naturalidad.
  { file: '0_08.jpg', startSec: 8.14 },  // Pero esa persona jamás dijo esas palabras.
  { file: '0_11.jpg', startSec: 11.32 },  // Ese vídeo lo generó una inteligencia artificial de principio a fin.
  { file: '0_15.jpg', startSec: 15.74 },  // Y a simple vista resulta casi imposible notar la diferencia.
  { file: '0_19.jpg', startSec: 19.74 },  // Hace unos años esto solo se veía en estudios de cine con presupuestos enormes.
  { file: '0_24.jpg', startSec: 24.42 },  // Eso es un deep fake, ver ya no es creer.
  { file: '0_28.jpg', startSec: 28.04 },  // Hoy vas a entender cómo se fabrica un vídeo así,
  { file: '0_30.jpg', startSec: 30.8 },  // que hace falta de verdad para crearlo
  { file: '0_32.jpg', startSec: 32.46 },  // y que señales delata a un deep fake aunque parezca perfecto.
  { file: '0_36.jpg', startSec: 36.98 },  // Empecemos por lo básico.
  { file: '0_39.jpg', startSec: 39.26 },  // Un deep fake no es un vídeo editado a mano, fotograma, fotograma como un montaje clásico.
  { file: '0_44.jpg', startSec: 44.68 },  // Es una cara o una voz generada o intercambiada por una inteligencia artificial.
  { file: '0_50.jpg', startSec: 50.18 },  // El nombre mezcla dos palabras en inglés.
  { file: '0_52.jpg', startSec: 52.9 },  // Deep learning, aprendizaje profundo y fake falso.
  { file: '0_57.jpg', startSec: 57.4 },  // Laía aprende cómo se mueve una cara real, como gesticula, como parpadea,
  { file: '1_02.jpg', startSec: 62.32 },  // como encaja la luz sobre la piel. Y luego construye una versión nueva, sintética,
  { file: '1_07.jpg', startSec: 67.38 },  // que imita ese movimiento con mucho detalle.
  { file: '1_10.jpg', startSec: 70.28 },  // No es pegar una cara encima de otra como en una foto de broma de toda la vida.
  { file: '1_14.jpg', startSec: 74.4 },  // Es generar una cara entera, pixel a pixel,
  { file: '1_17.jpg', startSec: 77.36 },  // que nunca existió de esa forma exacta.
  { file: '1_20.jpg', startSec: 80.2 },  // Y cómo aprende unaía a generar algo tan parecido a lo real.
  { file: '1_24.jpg', startSec: 84.0 },  // Ahí entra una técnica con nombre propio, se llama Gan, red generativa antagonica.
  { file: '1_30.jpg', startSec: 90.14 },  // Imagina dos personas compitiendo entre ellas, una contra otra durante mucho tiempo.
  { file: '1_35.jpg', startSec: 95.28 },  // Una es un falsificador. Su trabajo es pintar un cuadro falso que parezca auténtico.
  { file: '1_40.jpg', startSec: 100.48 },  // La otra es un experto en arte. Su trabajo es detectar cuál cuadro es la falsificación.
  { file: '1_46.jpg', startSec: 106.4 },  // El falsificador pinta un cuadro.
  { file: '1_48.jpg', startSec: 108.56 },  // El experto lo mira y dice, esto es falso, aquí se nota el fallo.
  { file: '1_52.jpg', startSec: 112.98 },  // El falsificador corrige ese fallo exacto y pinta otro cuadro, mejor que el anterior.
  { file: '1_58.jpg', startSec: 118.32 },  // El experto vuelve a fallarlo y vuelve a explicar con detalle que lo delatoe esta vez.
  { file: '2_04.jpg', startSec: 124.04 },  // Esa competición se repite miles y miles de veces una ronda tras otra.
  { file: '2_08.jpg', startSec: 128.82 },  // Al final el falsificador pinta cuadros que el experto ya confunde con los reales.
  { file: '2_13.jpg', startSec: 133.82 },  // Un deep fake se entraena exactamente así, pero con dos redes neuronales en vez de dos personas.
  { file: '2_20.jpg', startSec: 140.0 },  // Una genera caras falsas, la otra intenta adivinar cuales son falsas.
  { file: '2_24.jpg', startSec: 144.96 },  // Compitiendo entre ellas, las dos mejoran a la vez y la generadora acaba produciendo caras casi perfectas.
  { file: '2_31.jpg', startSec: 151.74 },  // Ninguna de las dos redes entiende una cara como la entiendes tú,
  { file: '2_35.jpg', startSec: 155.86 },  // solo compiten una contra otra, millón de rondas tras millón de rondas.
  { file: '2_40.jpg', startSec: 160.64 },  // Y de esa competición mecánica sale, al final, algo que a tus ojos parece real.
  { file: '2_46.jpg', startSec: 166.06 },  // Hace unos años entrenar algo así exigía muchísimos datos y muchísima potencia de cálculo.
  { file: '2_52.jpg', startSec: 172.02 },  // Un equipo técnico entero, muchas horas de vídeo de la persona y ordenadores muy potentes dedicados solo a eso.
  { file: '2_59.jpg', startSec: 179.2 },  // Hoy hace falta bastante menos de las dos cosas.
  { file: '3_01.jpg', startSec: 181.96 },  // Unas pocas fotos públicas o un video corto de alguien, el tipo de material que cualquiera cuelga en redes,
  { file: '3_07.jpg', startSec: 187.72 },  // puede bastar como punto de partida. Esa es la parte que de verdad ha cambiado en los últimos años.
  { file: '3_12.jpg', startSec: 192.68 },  // Lo que antes exigía un estudio especializado,
  { file: '3_16.jpg', startSec: 196.08 },  // hoy lo facilitan herramientas mucho más accesibles para cualquiera.
  { file: '3_20.jpg', startSec: 200.12 },  // Cuanta más foto y vídeo público existe de una persona,
  { file: '3_23.jpg', startSec: 203.28 },  // más fácil resulta entrenar una versión convincente de su cara.
  { file: '3_27.jpg', startSec: 207.04 },  // Por eso, quien más expuesto está en redes y en vídeo público,
  { file: '3_30.jpg', startSec: 210.14 },  // es también quien más fácil resulta imitar.
  { file: '3_33.jpg', startSec: 213.66 },  // La misma lógica se aplica también a la voz.
  { file: '3_36.jpg', startSec: 216.48 },  // Con muy pocos segundos de audio real de una persona,
  { file: '3_38.jpg', startSec: 218.92 },  // un sistema moderno puede imitar su tono, su ritmo, hasta sus muletillas.
  { file: '3_44.jpg', startSec: 224.24 },  // Esa voz clonada puede leer cualquier texto nuevo,
  { file: '3_47.jpg', startSec: 227.26 },  // un texto que la persona real jamás grabó.
  { file: '3_50.jpg', startSec: 230.06 },  // Cara y voz sintéticas juntas son las que hacen que un deep fake resulte tan convincente.
  { file: '3_56.jpg', startSec: 236.08 },  // El término deep fake apareció alrededor de 2017.
  { file: '4_00.jpg', startSec: 240.46 },  // Nació de una comunidad de internet que intercambiaba este tipo de vídeos generados entre ellos.
  { file: '4_05.jpg', startSec: 245.94 },  // Desde entonces ha habido casos conocidos y bien documentados,
  { file: '4_09.jpg', startSec: 249.64 },  // vídeos falsos de figuras políticas diciendo cosas que nunca dijeron.
  { file: '4_13.jpg', startSec: 253.86 },  // Caras de actores y famosos intercambiadas en vídeos que se volvieron virales.
  { file: '4_18.jpg', startSec: 258.54 },  // En los primeros años, esos vídeos se delataban con facilidad,
  { file: '4_22.jpg', startSec: 262.34 },  // un parpa de horraro, un borde que temblaba.
  { file: '4_25.jpg', startSec: 265.16 },  // Hoy la calidad ha mejorado tanto que distinguirlos a simple vista cuesta mucho más.
  { file: '4_29.jpg', startSec: 269.78 },  // Casos así generaron alarma real sobre dónde queda el límite entre lo real y lo fabricado.
  { file: '4_35.jpg', startSec: 275.46 },  // Y cuanto más circula un vídeo así antes de desmentirse,
  { file: '4_38.jpg', startSec: 278.82 },  // más gente se queda con la versión falsa en la cabeza.
  { file: '4_41.jpg', startSec: 281.98 },  // Por eso cada vez más gente busca aprender a detectar un deep fake por su cuenta.
  { file: '4_46.jpg', startSec: 286.76 },  // Vamos con las señales que de verdad ayudan a detectarlo.
  { file: '4_50.jpg', startSec: 290.16 },  // Primera señal, el parpadeo.
  { file: '4_52.jpg', startSec: 292.84 },  // Muchos sistemas generan caras que parpadean muy poco o de forma rara y mecánica.
  { file: '4_58.jpg', startSec: 298.14 },  // Fíjate si los ojos parpadean con naturalidad al ritmo de una conversación normal.
  { file: '5_03.jpg', startSec: 303.36 },  // Segunda señal, la luz y las sombras.
  { file: '5_06.jpg', startSec: 306.52 },  // Compruebas si la iluminación de la cara coincide con la del resto de la escena.
  { file: '5_10.jpg', startSec: 310.96 },  // Una sombra que cae en una dirección distinta a la del fondo es una pista sospechosa.
  { file: '5_15.jpg', startSec: 315.96 },  // Laía genera la cara y el fondo casi por separado y a veces se le nota la costura.
  { file: '5_21.jpg', startSec: 321.64 },  // Tercera señal, los bordes.
  { file: '5_23.jpg', startSec: 323.34 },  // Mira el contorno de la cara en nacimiento del pelo, las orejas.
  { file: '5_27.jpg', startSec: 327.98 },  // Ahí es donde más fallan estos sistemas, bordes borrosos, deformados, mal pegados al fondo.
  { file: '5_34.jpg', startSec: 334.32 },  // El pelo suelto en concreto cuesta mucho de generar bien hebra a hebra.
  { file: '5_39.jpg', startSec: 339.02 },  // Cuarta señal, el audio y los labios.
  { file: '5_41.jpg', startSec: 341.96 },  // Fíjate si el movimiento de la boca encaja con el sonido exacto de cada palabra.
  { file: '5_46.jpg', startSec: 346.66 },  // Un desfase pequeño pero constante durante todo el vídeo es una pista fuerte.
  { file: '5_51.jpg', startSec: 351.6 },  // Quinta señal, la piel.
  { file: '5_54.jpg', startSec: 354.22 },  // Una piel demasiado lisa, casi de plástico, que apenas marca un poro o una ruga delata un rostro generado.
  { file: '6_01.jpg', startSec: 361.68 },  // Sexta señal, los reflejos.
  { file: '6_04.jpg', startSec: 364.26 },  // Mira los reflejos en los ojos y en unas gafas si la persona las lleva puestas.
  { file: '6_09.jpg', startSec: 369.04 },  // Esos reflejos deberían coincidir con el entorno real muchas veces no coinciden entre sí.
  { file: '6_14.jpg', startSec: 374.96 },  // Y una última comprobación, la más fiable de todas.
  { file: '6_17.jpg', startSec: 377.82 },  // Busca esa misma noticia en otra fuente verificada.
  { file: '6_21.jpg', startSec: 381.52 },  // Si es real, nunca aparece sola.
  { file: '6_24.jpg', startSec: 384.16 },  // Ninguna señal sola es prueba definitiva, pero varias juntas sidan una pista muy fiable.
  { file: '6_30.jpg', startSec: 390.1 },  // Ya existen herramientas de inteligencia artificial pensadas justo para detectar deepfakes.
  { file: '6_35.jpg', startSec: 395.6 },  // El problema es que la generación mejora al mismo ritmo que la detección.
  { file: '6_39.jpg', startSec: 399.54 },  // Es una carrera constante entre quien genera y quien detecta, igual que el falsificador contra el experto de an
  { file: '6_45.jpg', startSec: 405.62 },  // Un detector que funciona hoy puede quedarse corto dentro de unos meses cuando la generación mejore un poco más
  { file: '6_53.jpg', startSec: 413.04 },  // Ningún truco aislado es infalible para siempre, así que conviene combinar varias señales a la vez.
  { file: '6_59.jpg', startSec: 419.04 },  // Entonces, ¿qué puedes hacer tú de verdad frente a esto?
  { file: '7_02.jpg', startSec: 422.86 },  // Primero, verifica la fuente original antes de compartir nada.
  { file: '7_06.jpg', startSec: 426.82 },  // Busca si un medio serio y verificado cuenta exactamente lo mismo.
  { file: '7_10.jpg', startSec: 430.42 },  // Desconfía todavía más cuando el contenido pide una acción urgente o dinero con tono de emergencia emocional.
  { file: '7_17.jpg', startSec: 437.78 },  // Esa urgencia es precisamente la táctica favorita de quien quiere engañarte con esto.
  { file: '7_23.jpg', startSec: 443.52 },  // Una llamada o un mensaje de voz clonado pidiendo una transferencia inmediata encaja justo en ese patrón.
  { file: '7_30.jpg', startSec: 450.14 },  // Tomate un segundo antes de reaccionar. Ese segundo es tu mejor defensa real.
  { file: '7_34.jpg', startSec: 454.42 },  // Y si puedes confirmar por otra vía distinta.
  { file: '7_37.jpg', startSec: 457.98 },  // Una llamada directa a esa persona, por ejemplo, nunca por el mismo canal donde llegó el mensaje.
  { file: '7_43.jpg', startSec: 463.78 },  // No todo uso de esta tecnología busca engañar a nadie.
  { file: '7_47.jpg', startSec: 467.34 },  // El mismo tipo de sistema dobla películas a otros idiomas moviendo los labios del actor de forma natural sin cr
  { file: '7_55.jpg', startSec: 475.12 },  // Ayuda también a recuperar la voz de personas que la perdieron por una enfermedad usando grabaciones antiguas s
  { file: '8_02.jpg', startSec: 482.38 },  // Y restaura en el cine, escenas antiguas o efectos visuales difíciles de lograr de otra forma como rejuvenecer 
  { file: '8_11.jpg', startSec: 491.4 },  // La herramienta en sí misma no es buena ni mala, depende por completo de quién la use y para qué.
  { file: '8_17.jpg', startSec: 497.06 },  // Así que vuelve a ese vídeo del principio, el político que decía algo que nunca dijo.
  { file: '8_22.jpg', startSec: 502.4 },  // Ahora ya sabes cómo se genera una cara así, dos redes compitiendo entre ellas una y otra vez.
  { file: '8_28.jpg', startSec: 508.04 },  // Y ya sabes que mirar la próxima vez, el parpadeo, la luz, los bordes, el audio, la piel, los reflejos, ver ya 
  { file: '8_38.jpg', startSec: 518.4 },  // Pero ahora tú sabes mirar mejor que la mayoría.
  { file: '8_42.jpg', startSec: 522.88 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '8_48.jpg', startSec: 528.08 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'tense_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 24.4, volume: 0.16 },
  { file: 'paint_brush.mp3', startSec: 80.2, volume: 0.14 },
  { file: 'stamp_fail.mp3', startSec: 106.4, volume: 0.15 },
  { file: 'rapid_pop.mp3', startSec: 124.0, volume: 0.14 },
  { file: 'soft_whoosh.mp3', startSec: 166.1, volume: 0.14 },
  { file: 'mic_blip.mp3', startSec: 213.7, volume: 0.14 },
  { file: 'scifi_sting.mp3', startSec: 236.1, volume: 0.16 },
  { file: 'alert_ding.mp3', startSec: 286.8, volume: 0.15 },
  { file: 'blink_click.mp3', startSec: 292.8, volume: 0.14 },
  { file: 'paper_rustle.mp3', startSec: 321.6, volume: 0.13 },
  { file: 'race_whoosh.mp3', startSec: 390.1, volume: 0.14 },
  { file: 'shield_up.mp3', startSec: 422.9, volume: 0.15 },
  { file: 'alarm_sting.mp3', startSec: 430.4, volume: 0.16 },
  { file: 'film_reel.mp3', startSec: 463.8, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 497.1, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 522.9, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoFuncionanLosDeepfakes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-funcionan-los-deepfakes.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-funcionan-los-deepfakes-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-funcionan-los-deepfakes-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-funcionan-los-deepfakes/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
