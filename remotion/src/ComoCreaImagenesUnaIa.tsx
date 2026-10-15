import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-crea-imagenes-una-ia - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Escribes una frase en una aplicación de inteligencia artificial.
  { file: '0_03.jpg', startSec: 3.76 },  // Un gato astronauta flotando sobre Madrid a la tarde ser.
  { file: '0_07.jpg', startSec: 7.94 },  // Pulsas un botón y esperas unos segundos.
  { file: '0_10.jpg', startSec: 10.62 },  // Y aparece la imagen,
  { file: '0_12.jpg', startSec: 12.12 },  // con su casco, con sus bigotes,
  { file: '0_14.jpg', startSec: 14.0 },  // con el cielo naranja detrás.
  { file: '0_16.jpg', startSec: 16.02 },  // Esa imagen no existía hace un minuto.
  { file: '0_18.jpg', startSec: 18.34 },  // Nadie le ha dibujado,
  { file: '0_19.jpg', startSec: 19.68 },  // nadie le ha fotografiado jamás.
  { file: '0_22.jpg', startSec: 22.32 },  // Entonces,
  { file: '0_23.jpg', startSec: 23.16 },  // ¿de dónde sale una imagen que nunca ha existido?
  { file: '0_26.jpg', startSec: 26.2 },  // Hoy vas a entenderlo paso a paso.
  { file: '0_28.jpg', startSec: 28.62 },  // Vas a ver como una hía convierte ruido en un dibujo.
  { file: '0_31.jpg', startSec: 31.84 },  // Vas a ver cómo tus palabras guían todo ese proceso.
  { file: '0_35.jpg', startSec: 35.26 },  // Vas a entender por qué le cuesta tanto las manos y las letras.
  { file: '0_38.jpg', startSec: 38.88 },  // Y vas a ver de dónde sacó todo lo que sabe.
  { file: '0_41.jpg', startSec: 41.56 },  // Que es justo donde empieza la polémica.
  { file: '0_44.jpg', startSec: 44.26 },  // Empecemos por algo que parece una tontería,
  { file: '0_46.jpg', startSec: 46.62 },  // la nieve de una tele vieja.
  { file: '0_48.jpg', startSec: 48.8 },  // Lo primero es quitarse una idea de la cabeza.
  { file: '0_51.jpg', startSec: 51.48 },  // La hía no busca tu imagen en internet. Tampoco recorta trozos de fotos ya hechas para pegarlos como un colas.
  { file: '0_58.jpg', startSec: 58.06 },  // Fabrica cada pixel desde cero.
  { file: '1_00.jpg', startSec: 60.46 },  // Y lo hace partiendo de algo que parece lo contrario de una imagen.
  { file: '1_04.jpg', startSec: 64.26 },  // ¿Ya cuerdas de la nieve que salía en las teles antiguas cuando se perdía la señal?
  { file: '1_08.jpg', startSec: 68.58 },  // Punto de colores, repartidos al azar, ruido puro.
  { file: '1_12.jpg', startSec: 72.14 },  // Ahí empieza todo,
  { file: '1_13.jpg', startSec: 73.44 },  // en el ruido.
  { file: '1_14.jpg', startSec: 74.82 },  // Para entender cómo sale una imagen del ruido, hay que mirar primero cómo se entrena esta hía.
  { file: '1_19.jpg', startSec: 79.98 },  // Y el entrenamiento hace justo lo contrario.
  { file: '1_22.jpg', startSec: 82.6 },  // Destruye imágenes.
  { file: '1_24.jpg', startSec: 84.3 },  // Coge es una foto real.
  { file: '1_25.jpg', startSec: 85.98 },  // Por ejemplo, la de un perro en la playa.
  { file: '1_28.jpg', startSec: 88.1 },  // Le añades un poco de ruido,
  { file: '1_29.jpg', startSec: 89.68 },  // unos puntitos de colores por encima.
  { file: '1_31.jpg', startSec: 91.98 },  // El perro todavía se ve perfectamente.
  { file: '1_34.jpg', startSec: 94.2 },  // Le añades otro poco y otro más.
  { file: '1_36.jpg', startSec: 96.94 },  // Después de muchos pasos, el perro desaparece del todo.
  { file: '1_40.jpg', startSec: 100.06 },  // Solo queda nieve, la misma nieve de la tele vieja.
  { file: '1_43.jpg', startSec: 103.72 },  // Ahora viene el truco.
  { file: '1_45.jpg', startSec: 105.38 },  // A la hía se le enseña a recorrer ese camino al revés.
  { file: '1_48.jpg', startSec: 108.54 },  // Se le da una imagen con algo de ruido y se le hace una pregunta muy concreta.
  { file: '1_53.jpg', startSec: 113.18 },  // ¿Qué parte de todo esto es ruido?
  { file: '1_55.jpg', startSec: 115.68 },  // Al principio falla muchísimo.
  { file: '1_57.jpg', startSec: 117.7 },  // Cada vez que falla, se ajustan un poco sus conexiones internas para que la siguiente vez acerte algo más.
  { file: '2_03.jpg', startSec: 123.36 },  // Y eso se repite con muchísimas imágenes,
  { file: '2_05.jpg', startSec: 125.86 },  // millones y millones de veces.
  { file: '2_07.jpg', startSec: 127.86 },  // Al final,
  { file: '2_08.jpg', startSec: 128.74 },  // la hía se vuelve experta en una sola cosa,
  { file: '2_11.jpg', startSec: 131.24 },  // quitar ruido.
  { file: '2_12.jpg', startSec: 132.56 },  // Por eso a esta técnica se la llama difusión.
  { file: '2_15.jpg', startSec: 135.22 },  // El nombre viene de la física. Pienza en una gota de tinta que se difumina en un vaso de agua.
  { file: '2_20.jpg', startSec: 140.62 },  // La hía aprende a deshacer esa mezcla, a devolver la tinta a su gota.
  { file: '2_25.jpg', startSec: 145.28 },  // ¿Y qué pasa cuando le pides tu gato astronauta?
  { file: '2_28.jpg', startSec: 148.48 },  // La hía arranca desde ruido puro,
  { file: '2_30.jpg', startSec: 150.68 },  // un ruido que se genera al azar en ese mismo momento.
  { file: '2_33.jpg', startSec: 153.86 },  // Ahí dentro todavía no existe ningún gato.
  { file: '2_36.jpg', startSec: 156.3 },  // Pero la hía hace lo único que sabe hacer,
  { file: '2_38.jpg', startSec: 158.82 },  // intenta quitar un poco de ruido.
  { file: '2_40.jpg', startSec: 160.84 },  // Y para quitarlo, tiene que adivinar qué imagen podría esconderse debajo.
  { file: '2_45.jpg', startSec: 165.0 },  // En la primera pasada solo salen manchas borrosas, una zona más clara arriba, una más oscura abajo.
  { file: '2_50.jpg', startSec: 170.82 },  // En la siguiente pasada,
  { file: '2_52.jpg', startSec: 172.62 },  // esas manchas empiezan a tener forma.
  { file: '2_54.jpg', startSec: 174.88 },  // Unas pasadas después,
  { file: '2_56.jpg', startSec: 176.24 },  // ya se adivina una silueta,
  { file: '2_57.jpg', startSec: 177.98 },  // luego unas orejas,
  { file: '2_59.jpg', startSec: 179.42 },  // luego el brillo del casco.
  { file: '3_01.jpg', startSec: 181.22 },  // Es como un escultor que quita piedra hasta que aparece la figura.
  { file: '3_04.jpg', startSec: 184.88 },  // Solo que aquí la piedra es ruido,
  { file: '3_06.jpg', startSec: 186.96 },  // y el escultor quita un poco en cada pasada.
  { file: '3_09.jpg', startSec: 189.68 },  // Normalmente son unas decenas de pasadas, y en cada una la imagen gana detalle.
  { file: '3_14.jpg', startSec: 194.86 },  // Y aquí va un detalle que sorprende a mucha gente.
  { file: '3_17.jpg', startSec: 197.86 },  // Si cambias el ruido del principio, sale otro gato distinto con la misma frase.
  { file: '3_22.jpg', startSec: 202.2 },  // Por eso pides lo mismo dos veces y te salen dos imágenes diferentes.
  { file: '3_26.jpg', startSec: 206.36 },  // Ese punto de partida al azar es lo que hace única cada imagen.
  { file: '3_30.jpg', startSec: 210.6 },  // Hay un truco más para que todo esto vaya rápido.
  { file: '3_33.jpg', startSec: 213.38 },  // Muchas de estas hías trabajan sobre una versión pequeña y comprimida de la imagen.
  { file: '3_37.jpg', startSec: 217.88 },  // Al terminar otra pieza, la amplia está su tamaño real con todo su detalle.
  { file: '3_42.jpg', startSec: 222.7 },  // Vale,
  { file: '3_43.jpg', startSec: 223.68 },  // pero si empieza desde ruido al azar, ¿cómo sabe que tiene que salir un gato y no una tostadora?
  { file: '3_49.jpg', startSec: 229.2 },  // Aquí entra tu frase.
  { file: '3_51.jpg', startSec: 231.16 },  // Antes de empezar otra parte del sistema,
  { file: '3_53.jpg', startSec: 233.32 },  // traduce tus palabras a números.
  { file: '3_55.jpg', startSec: 235.04 },  // Esa parte aprendió mirando muchísimas fotos junto a su descripción.
  { file: '3_58.jpg', startSec: 238.96 },  // Así aprendió que la palabra gato va con orejas puntiagudas y bigotes,
  { file: '4_02.jpg', startSec: 242.8 },  // y que la palabra a tardecer va con cielos naranjas y sombras largas.
  { file: '4_07.jpg', startSec: 247.08 },  // Esos números acompañan a la hía en cada pasada del impieza. En cada pasada la hía busca que ruido quitar para 
  { file: '4_17.jpg', startSec: 257.72 },  // Va tirando de la imagen hacia lo que describes.
  { file: '4_20.jpg', startSec: 260.42 },  // Hay incluso un ajuste para decidir con cuánta fuerza tira ese imán.
  { file: '4_24.jpg', startSec: 264.64 },  // Si tira poco la hía se toma libertades.
  { file: '4_27.jpg', startSec: 267.1 },  // Si tira demasiado la imagen sale forzada y con colores exagerados.
  { file: '4_31.jpg', startSec: 271.06 },  // Por eso escribir bien la frase cambia tanto el resultado.
  { file: '4_34.jpg', startSec: 274.44 },  // Y ahora la pregunta que todo el mundo se ha hecho alguna vez.
  { file: '4_37.jpg', startSec: 277.92 },  // ¿Por qué estas hías dibujaban manos con seis dedos?
  { file: '4_41.jpg', startSec: 281.36 },  // La respuesta tiene que ver con cómo aprenden.
  { file: '4_43.jpg', startSec: 283.92 },  // La hía nunca estudió anatomía.
  { file: '4_46.jpg', startSec: 286.16 },  // Nadie le explicó que una mano tiene cinco dedos.
  { file: '4_48.jpg', startSec: 288.9 },  // Solo aprendió patrones a base de ver muchísimas fotos.
  { file: '4_52.jpg', startSec: 292.2 },  // Y en las fotos las manos son un lío.
  { file: '4_54.jpg', startSec: 294.62 },  // Salen cogiendo cosas, medio tapadas, delado, entre lazadas con otras manos.
  { file: '4_59.jpg', startSec: 299.18 },  // Muchas veces se ven solo tres dedos o dos o ninguno.
  { file: '5_02.jpg', startSec: 302.9 },  // Además ocupan un trozo pequeñísimo de la foto.
  { file: '5_05.jpg', startSec: 305.68 },  // La hía aprende que una mano es un montón de dedos juntos,
  { file: '5_09.jpg', startSec: 309.14 },  // pero no sabe contar.
  { file: '5_10.jpg', startSec: 310.68 },  // Una cara tiene casi siempre la misma estructura.
  { file: '5_13.jpg', startSec: 313.38 },  // Tos ojos, una nariz, una boca.
  { file: '5_15.jpg', startSec: 315.9 },  // Una mano cambia de forma en cada foto.
  { file: '5_18.jpg', startSec: 318.3 },  // Por eso las caras salían bien mucho antes que las manos.
  { file: '5_21.jpg', startSec: 321.68 },  // Los modelos más recientes han mejorado muchísimo en esto.
  { file: '5_24.jpg', startSec: 324.84 },  // Han visto más datos y mejor descritos.
  { file: '5_27.jpg', startSec: 327.22 },  // Aún así, cuando una mano hace algo raro, todavía puede colarse algún dedo de más.
  { file: '5_31.jpg', startSec: 331.74 },  // Con las letras dentro de la imagen pasaba algo parecido.
  { file: '5_35.jpg', startSec: 335.18 },  // Pedías un cartel que dijera panadería y salía una palabra rara que parecía de un idioma inventado.
  { file: '5_41.jpg', startSec: 341.14 },  // El motivo es el mismo.
  { file: '5_42.jpg', startSec: 342.66 },  // La hía no lee las letras,
  { file: '5_44.jpg', startSec: 344.38 },  // las ve como formas.
  { file: '5_45.jpg', startSec: 345.84 },  // Sabe que un cartel lleva rayitas y curvas negras con un aspecto concreto,
  { file: '5_49.jpg', startSec: 349.92 },  // pero colocar cada letra en su orden exacto es algo que al principio se les capaba.
  { file: '5_54.jpg', startSec: 354.72 },  // Una mancha mal puesta en el cielo pasa de esa precipida.
  { file: '5_57.jpg', startSec: 357.96 },  // Una sola letra mal se nota enseguida.
  { file: '6_00.jpg', startSec: 360.96 },  // Las versiones nuevas escriben bastante mejor.
  { file: '6_03.jpg', startSec: 363.56 },  // Se entrenaron con más ejemplos de texto y entienden mejor las palabras.
  { file: '6_07.jpg', startSec: 367.82 },  // Aún así un texto largo dentro de una imagen sigue siendo de lo más difícil para ellas.
  { file: '6_13.jpg', startSec: 373.1 },  // Ahora la parte más delicada.
  { file: '6_15.jpg', startSec: 375.16 },  // ¿De dónde salieron todas esas fotos con su descripción?
  { file: '6_18.jpg', startSec: 378.54 },  // Sobre todo de Internet.
  { file: '6_20.jpg', startSec: 380.1 },  // Las empresas recopilaron miles de millones de imágenes publicadas en la rep.
  { file: '6_24.jpg', startSec: 384.42 },  // Muchas venían con un texto al lado.
  { file: '6_26.jpg', startSec: 386.46 },  // El pie de foto o la descripción que se escribe para personas ciegas.
  { file: '6_30.jpg', startSec: 390.48 },  // Este texto es lo que le enseñó a la IA que hay en cada imagen y ahí había de todo.
  { file: '6_35.jpg', startSec: 395.88 },  // Fotos de bancos de imágenes,
  { file: '6_37.jpg', startSec: 397.52 },  // cuadros de museos,
  { file: '6_38.jpg', startSec: 398.72 },  // dibujos de artistas que viven de su trabajo.
  { file: '6_41.jpg', startSec: 401.2 },  // A la mayoría de esos autores, nadie les pidió permiso.
  { file: '6_44.jpg', startSec: 404.54 },  // Aquí empieza un debate que todavía está abierto y conviene contarlo bien.
  { file: '6_48.jpg', startSec: 408.82 },  // Por un lado están muchos artistas y fotógrafos.
  { file: '6_51.jpg', startSec: 411.8 },  // Dicen que su trabajo se usó para crear una herramienta que ahora compite con ellos y que la IA puede imitar el
  { file: '7_01.jpg', startSec: 421.62 },  // Por otro lado están las empresas que crean estas ciegas.
  { file: '7_04.jpg', startSec: 424.92 },  // Defienden que la IA aprende patrones, igual que un estudiante de arte que mira miles de cuadros y que la image
  { file: '7_12.jpg', startSec: 432.06 },  // que no copia ninguna obra concreta.
  { file: '7_14.jpg', startSec: 434.56 },  // Las dos posturas tienen argumentos heridos.
  { file: '7_17.jpg', startSec: 437.1 },  // Por eso hay demandas abiertas en varios países.
  { file: '7_19.jpg', startSec: 439.88 },  // Hay plaitos de artistas y de bancos de imágenes contra empresas de IA y los jueces todavía están decidiendo dó
  { file: '7_27.jpg', startSec: 447.4 },  // Mientras tanto, ya hay cambios.
  { file: '7_29.jpg', startSec: 449.52 },  // En Europa las normas permiten a los autores pedir que sus obras queden fuera del entrenamiento.
  { file: '7_34.jpg', startSec: 454.5 },  // Algunas empresas ya entrenan solo con imágenes que tienen licencia o que les han cebido.
  { file: '7_40.jpg', startSec: 460.4 },  // La tecnología va muchísimo más rápido que la ley y esa es la verdadera discusión.
  { file: '7_45.jpg', startSec: 465.24 },  // Así que volvamos al gato astronauta del principio.
  { file: '7_48.jpg', startSec: 468.48 },  // ¿De dónde sale una imagen que nunca existido?
  { file: '7_52.jpg', startSec: 472.02 },  // Sale del ruido.
  { file: '7_53.jpg', startSec: 473.56 },  // De un puñado de puntos al azar que la IA va limpiando pasada a pasada.
  { file: '7_58.jpg', startSec: 478.14 },  // Con tus palabras tirando de ella como un imán y con todo lo que aprendió mirando millones de imágenes hechas p
  { file: '8_05.jpg', startSec: 485.28 },  // Por eso hace maravillas y por eso a veces les salen seis dedos.
  { file: '8_09.jpg', startSec: 489.24 },  // La IA no imagina,
  { file: '8_10.jpg', startSec: 490.78 },  // recuerda patrones y los mezcla de una forma que nadie había visto antes.
  { file: '8_15.jpg', startSec: 495.64 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete cada semana una máqui
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'button_click.mp3', startSec: 7.9, volume: 0.14 },
  { file: 'magic_reveal.mp3', startSec: 10.6, volume: 0.15 },
  { file: 'mystery_sting.mp3', startSec: 23.2, volume: 0.15 },
  { file: 'tv_static.mp3', startSec: 46.6, volume: 0.13 },
  { file: 'crumble_break.mp3', startSec: 82.6, volume: 0.14 },
  { file: 'whoosh_vanish.mp3', startSec: 96.9, volume: 0.14 },
  { file: 'fast_rewind.mp3', startSec: 105.4, volume: 0.14 },
  { file: 'error_buzz.mp3', startSec: 115.7, volume: 0.14 },
  { file: 'repeating_loop.mp3', startSec: 125.9, volume: 0.13 },
  { file: 'water_drop.mp3', startSec: 132.6, volume: 0.15 },
  { file: 'soft_reveal.mp3', startSec: 176.2, volume: 0.14 },
  { file: 'chisel_tap.mp3', startSec: 181.2, volume: 0.14 },
  { file: 'dice_roll.mp3', startSec: 197.9, volume: 0.14 },
  { file: 'magnet_pull.mp3', startSec: 247.1, volume: 0.14 },
  { file: 'comedic_boing.mp3', startSec: 277.9, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 335.2, volume: 0.14 },
  { file: 'rising_tension.mp3', startSec: 373.1, volume: 0.14 },
  { file: 'gavel_bang.mp3', startSec: 439.9, volume: 0.15 },
  { file: 'closing_turn.mp3', startSec: 465.2, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 495.6, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoCreaImagenesUnaIa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-crea-imagenes-una-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-crea-imagenes-una-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-crea-imagenes-una-ia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-crea-imagenes-una-ia/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
