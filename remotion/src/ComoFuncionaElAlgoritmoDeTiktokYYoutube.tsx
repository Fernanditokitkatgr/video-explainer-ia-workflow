import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// como-funciona-el-algoritmo-de-tiktok-y-youtube - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // A ver un vídeo,
  { file: '0_01.jpg', startSec: 1.2 },  // solo uno,
  { file: '0_02.jpg', startSec: 2.08 },  // deslizas,
  { file: '0_03.jpg', startSec: 3.34 },  // otro,
  { file: '0_04.jpg', startSec: 4.2 },  // y otro más.
  { file: '0_05.jpg', startSec: 5.68 },  // Levantas la vista y ha pasado una hora.
  { file: '0_08.jpg', startSec: 8.22 },  // Y lo más raro es que casi todos esos vídeos te gustaban,
  { file: '0_11.jpg', startSec: 11.52 },  // como si la aplicación te conociera mejor que tus amigos.
  { file: '0_14.jpg', startSec: 14.84 },  // ¿Cómo sabía la aplicación que vídeo enseñarte?
  { file: '0_18.jpg', startSec: 18.1 },  // Hoy vas a entender cómo deciden TikTok y YouTube lo que aparece en tu pantalla.
  { file: '0_23.jpg', startSec: 23.02 },  // Vas a ver qué señales miran de verdad.
  { file: '0_25.jpg', startSec: 25.24 },  // Vas a distinguir lo que está comprobado de lo que es solo una teoría de internet.
  { file: '0_29.jpg', startSec: 29.74 },  // Vas a entender por qué cuesta tanto soltar el móvil.
  { file: '0_32.jpg', startSec: 32.74 },  // Y al final vas a saber cómo reiniciar tu feed si ya te cansa lo que ves.
  { file: '0_37.jpg', startSec: 37.6 },  // Empecemos por desmontar la palabra más repetida de todas.
  { file: '0_40.jpg', startSec: 40.96 },  // El algoritmo.
  { file: '0_42.jpg', startSec: 42.46 },  // Mucha gente imagina el algoritmo como una persona que elige vídeos para ti,
  { file: '0_46.jpg', startSec: 46.9 },  // o como una lista de reglas fijas que escribió un programador.
  { file: '0_50.jpg', startSec: 50.72 },  // La realidad es otra.
  { file: '0_52.jpg', startSec: 52.58 },  // Es un sistema de recomendación,
  { file: '0_54.jpg', startSec: 54.56 },  // un conjunto de programas que aprende de lo que hacen millones de personas.
  { file: '0_58.jpg', startSec: 58.72 },  // Su trabajo es hacer una predicción.
  { file: '1_01.jpg', startSec: 61.28 },  // De todos los vídeos que existen, cuál tiene más probabilidades de que te quedes mirándolo.
  { file: '1_06.jpg', startSec: 66.32 },  // Eso es todo.
  { file: '1_07.jpg', startSec: 67.44 },  // Hacer apuestas sobre ti,
  { file: '1_08.jpg', startSec: 68.96 },  // una detrás de otra.
  { file: '1_10.jpg', startSec: 70.7 },  // Y cada vez que deslizas, le das una pista nueva para la siguiente apuesta.
  { file: '1_15.jpg', startSec: 75.26 },  // Pero cómo elige entre tantísimos vídeos en menos de un segundo.
  { file: '1_19.jpg', startSec: 79.28 },  // Unos ingenieros de YouTube lo explicaron en un artículo científico publicado en 2016.
  { file: '1_24.jpg', startSec: 84.68 },  // El sistema trabaja en dos fases,
  { file: '1_27.jpg', startSec: 87.06 },  // como un embudo.
  { file: '1_28.jpg', startSec: 88.42 },  // En la primera fase hace una criva rápida.
  { file: '1_31.jpg', startSec: 91.28 },  // De millones de vídeos se queda con unos pocos cientos que podrían interesarte.
  { file: '1_35.jpg', startSec: 95.7 },  // Para esa criva mira lo que has visto antes y lo que ven personas con gustos parecidos a los tuyos.
  { file: '1_41.jpg', startSec: 101.96 },  // En la segunda fase ordena esos candidatos con mucho más cuidado.
  { file: '1_46.jpg', startSec: 106.42 },  // A cada uno le pone una nota y el que saca más nota es el que ves primero.
  { file: '1_51.jpg', startSec: 111.56 },  // Es como un ojeador de fútbol.
  { file: '1_53.jpg', startSec: 113.68 },  // Primero descarta a casi todos los jugadores.
  { file: '1_56.jpg', startSec: 116.46 },  // Luego estudia fondo a los pocos que quedan.
  { file: '1_59.jpg', startSec: 119.48 },  // Lo de las personas con gustos parecidos es clave.
  { file: '2_02.jpg', startSec: 122.5 },  // Imagina que mucha gente que ve vídeos de cocina también disfruta con los de bricolaje.
  { file: '2_07.jpg', startSec: 127.5 },  // Entonces el sistema prueba enseñarte bricolaje a ti también.
  { file: '2_11.jpg', startSec: 131.18 },  // Te recomienda cosas que todavía no has buscado,
  { file: '2_13.jpg', startSec: 133.92 },  // porque otras personas parecidas a ti ya las vieron.
  { file: '2_17.jpg', startSec: 137.54 },  // Esa técnica existe desde mucho antes que TikTok.
  { file: '2_20.jpg', startSec: 140.77 },  // Las tiendas online la usan para recomendarte productos.
  { file: '2_24.jpg', startSec: 144.02 },  // Y hay un detalle que lo cambia todo.
  { file: '2_26.jpg', startSec: 146.54 },  // Nadie programa a mano que a ti te gusten los gatos.
  { file: '2_29.jpg', startSec: 149.96 },  // Lo que deciden los ingenieros es el objetivo.
  { file: '2_32.jpg', startSec: 152.82 },  // ¿Qué tiene que intentar conseguir el sistema?
  { file: '2_35.jpg', startSec: 155.94 },  // El sistema aprende solo a cumplirlo mirando lo que hace la gente.
  { file: '2_39.jpg', startSec: 159.74 },  // Si el objetivo es que mire es más tiempo,
  { file: '2_41.jpg', startSec: 161.9 },  // el sistema aprende a que mire es más tiempo.
  { file: '2_44.jpg', startSec: 164.64 },  // Por eso el objetivo que elige cada plataforma importa tanto y por eso lo han ido cambiando con los años.
  { file: '2_50.jpg', startSec: 170.98 },  // ¿Y qué pistas mira exactamente?
  { file: '2_53.jpg', startSec: 173.88 },  // TikTok lo explicó en su propia web en 2020.
  { file: '2_57.jpg', startSec: 177.16 },  // Dijo que tienen cuenta tus interacciones.
  { file: '2_59.jpg', startSec: 179.76 },  // Los vídeos que te gustan,
  { file: '3_01.jpg', startSec: 181.22 },  // los que compartes, los que comentas,
  { file: '3_03.jpg', startSec: 183.78 },  // las cuentas que sigues.
  { file: '3_05.jpg', startSec: 185.7 },  // También mira información del propio vídeo,
  { file: '3_08.jpg', startSec: 188.2 },  // el texto, los sonidos,
  { file: '3_10.jpg', startSec: 190.1 },  // las etiquetas
  { file: '3_11.jpg', startSec: 191.32 },  // y con menos peso mira tu idioma,
  { file: '3_13.jpg', startSec: 193.52 },  // tu país,
  { file: '3_14.jpg', startSec: 194.28 },  // el tipo de móvil que usas.
  { file: '3_16.jpg', startSec: 196.36 },  // Pero hay una señal que la propia TikTok destacó como de las más fuertes.
  { file: '3_20.jpg', startSec: 200.96 },  // ¿Si ves un vídeo largo entero desde el principio hasta el final?
  { file: '3_25.jpg', startSec: 205.0 },  // Y aquí viene algo que sorprende a mucha gente.
  { file: '3_27.jpg', startSec: 207.74 },  // Según TikTok,
  { file: '3_28.jpg', startSec: 208.9 },  // el número de seguidores de quien publica el vídeo no cuenta directamente.
  { file: '3_33.jpg', startSec: 213.12 },  // Por eso un vídeo de una cuenta recién creada puede hacerse viral de golpe.
  { file: '3_37.jpg', startSec: 217.82 },  // ¿Y qué pasa con un vídeo recién subido que nadie ha visto todavía?
  { file: '3_42.jpg', startSec: 222.0 },  // Muchas guías para creadores de escriben el mismo patrón.
  { file: '3_45.jpg', startSec: 225.2 },  // Primero se enseña a un grupo pequeño de personas.
  { file: '3_48.jpg', startSec: 228.32 },  // Si ese grupo se queda mirando,
  { file: '3_50.jpg', startSec: 230.26 },  // se enseña a un grupo más grande.
  { file: '3_52.jpg', startSec: 232.56 },  // Y así ronda tras ronda.
  { file: '3_55.jpg', startSec: 235.06 },  // Ninguna plataforma ha publicado esas rondas al detalle,
  { file: '3_58.jpg', startSec: 238.34 },  // así que tomaló como una descripción aproximada.
  { file: '4_01.jpg', startSec: 241.44 },  // El tiempo que pasas mirando es la pista más honesta quedas.
  { file: '4_05.jpg', startSec: 245.36 },  // Un me gusta lo das a veces por compromiso.
  { file: '4_08.jpg', startSec: 248.06 },  // Tus ojos casi nunca mienten.
  { file: '4_10.jpg', startSec: 250.64 },  // Si te quedas viendo un vídeo de gatos hasta el final, el sistema toma nota.
  { file: '4_15.jpg', startSec: 255.32 },  // Si lo deslizas en el primer segundo, también toma nota. Ninguna de las dos plataformas ha publicado cuánto pes
  { file: '4_23.jpg', startSec: 263.1 },  // Pero tiene lógica que salir corriendo de un vídeo sea una mala señal para ese vídeo.
  { file: '4_27.jpg', startSec: 267.98 },  // Y volver a verlo,
  { file: '4_29.jpg', startSec: 269.28 },  // ver el mismo vídeo dos o tres veces seguidas.
  { file: '4_32.jpg', startSec: 272.22 },  // Muchos creadores están convencidos de que eso cuenta muchísimo.
  { file: '4_35.jpg', startSec: 275.98 },  // Tiene sentido porque suma tiempo de visionado,
  { file: '4_38.jpg', startSec: 278.5 },  // pero ninguna plataforma lo ha confirmado con detalle.
  { file: '4_41.jpg', startSec: 281.22 },  // Así que tomaló como una teoría razonable.
  { file: '4_43.jpg', startSec: 283.98 },  // Todavía falta la confirmación oficial.
  { file: '4_46.jpg', startSec: 286.66 },  // Con YouTube pasó algo parecido.
  { file: '4_48.jpg', startSec: 288.62 },  // En 2012 YouTube anunció que dejaba de premiar sobre todo los clics y que pasaba a premiar el tiempo de visiona
  { file: '4_54.jpg', startSec: 294.76 },  // Querían frenar los vídeos con títulos trampa que la gente habría y cerraba enseguida.
  { file: '4_59.jpg', startSec: 299.38 },  // Con los años añadió más cosas.
  { file: '5_01.jpg', startSec: 301.34 },  // Por ejemplo, en cuestras que te preguntan si un vídeo te ha merecido la pena.
  { file: '5_05.jpg', startSec: 305.12 },  // YouTube dice que hoy intenta medir tu satisfacción y el tiempo que pasas mirando es solo una parte.
  { file: '5_10.jpg', startSec: 310.82 },  // En 2019 YouTube anunció otro cambio y va a recomendar menos los vídeos que rozan sus normas, como las curas mi
  { file: '5_18.jpg', startSec: 318.28 },  // Esos vídeos podían enganchar mucho,
  { file: '5_20.jpg', startSec: 320.24 },  // pero la plataforma decidió que tenerte pegado a la pantalla era insuficiente.
  { file: '5_24.jpg', startSec: 324.88 },  // Vale.
  { file: '5_25.jpg', startSec: 325.86 },  // Pero ¿por qué cuesta tanto parar?
  { file: '5_28.jpg', startSec: 328.22 },  // Parte de la respuesta está en el diseño.
  { file: '5_30.jpg', startSec: 330.72 },  // El fide infinito elimina los puntos de parada.
  { file: '5_33.jpg', startSec: 333.4 },  // Un libro termina su capítulo,
  { file: '5_35.jpg', startSec: 335.12 },  // una serie termina su episodio. Aquí el siguiente vídeo ya está acargado.
  { file: '5_39.jpg', startSec: 339.68 },  // Y luego está la sorpresa.
  { file: '5_41.jpg', startSec: 341.48 },  // Nunca sabes si el siguiente vídeo va a ser buenísimo o un rollo.
  { file: '5_45.jpg', startSec: 345.96 },  // Los psicólogos llevan décadas estudiando ese tipo de premio que llega a ratos y por sorpresa.
  { file: '5_51.jpg', startSec: 351.04 },  // Es el mismo mecanismo que hace tan difícil dejar una máquina a tragar perras.
  { file: '5_54.jpg', startSec: 354.98 },  // Cada vez que te toca un vídeo genial,
  { file: '5_56.jpg', startSec: 356.98 },  // tu cerebro quiere repetir.
  { file: '5_58.jpg', startSec: 358.92 },  // Hay que ser justos.
  { file: '6_00.jpg', startSec: 360.2 },  // Las plataformas no inventaron esa psicología,
  { file: '6_02.jpg', startSec: 362.94 },  // pero su sistema premia en lo que te retiene y aprende de ti a toda velocidad.
  { file: '6_07.jpg', startSec: 367.42 },  // Ahí está el riesgo de la burbuja.
  { file: '6_09.jpg', startSec: 369.44 },  // Si sólo ves un tipo de vídeo, el sistema te enseña cada vez más de lo mismo.
  { file: '6_13.jpg', startSec: 373.54 },  // TikTok reconoce ese riesgo.
  { file: '6_15.jpg', startSec: 375.72 },  // Dice que mezcla de vez en cuando vídeos distintos para romper la repetición.
  { file: '6_20.jpg', startSec: 380.52 },  // Aquí va la idea más importante del vídeo.
  { file: '6_23.jpg', startSec: 383.12 },  // El algoritmo no te conoce a ti.
  { file: '6_25.jpg', startSec: 385.28 },  // Conoce tu comportamiento.
  { file: '6_27.jpg', startSec: 387.24 },  // Ignora si estabas aburrido o triste.
  { file: '6_29.jpg', startSec: 389.52 },  // Sólo sabe que te quedaste mirando.
  { file: '6_31.jpg', startSec: 391.56 },  // Por eso a veces te enseña algo que te pilló en un mal momento y luego te lo repite durante semanas.
  { file: '6_37.jpg', startSec: 397.66 },  // La buena noticia es que eso significa que puedes entrenarlo tú.
  { file: '6_41.jpg', startSec: 401.52 },  // Así que vamos a lo práctico.
  { file: '6_43.jpg', startSec: 403.08 },  // ¿Cómo reiniciar tu feed?
  { file: '6_44.jpg', startSec: 404.98 },  // En TikTok existe una opción oficial para empezar de cero.
  { file: '6_48.jpg', startSec: 408.08 },  // Está en los ajustes, en el apartado de preferencias de contenido.
  { file: '6_51.jpg', startSec: 411.7 },  // Sirve para actualizar tu feed para ti.
  { file: '6_54.jpg', startSec: 414.06 },  // Al usarla TikTok te trata como si acabaras de llegar y vuelve a aprender tus gustos desde el principio.
  { file: '6_59.jpg', startSec: 419.84 },  // También puedes mantener pulsado un vídeo y marcar que te interesa poco
  { file: '7_03.jpg', startSec: 423.44 },  // y puedes filtrar palabras para que ciertos temas dejen de aparecer.
  { file: '7_07.jpg', startSec: 427.28 },  // En YouTube tienes algo parecido.
  { file: '7_09.jpg', startSec: 429.32 },  // En cada recomendación puedes marcar que te interesa poco o pedir que deje de recomendarte un canal.
  { file: '7_14.jpg', startSec: 434.9 },  // Puedes borrar vídeos sueltos de tu historial para que dejen de influir
  { file: '7_18.jpg', startSec: 438.68 },  // y puedes pausar o borrar todo el historial de reproducciones.
  { file: '7_22.jpg', startSec: 442.46 },  // YouTube avisa de que entonces la página de inicio puede quedarse casi vacía porque ya le faltan pistas sobre t
  { file: '7_29.jpg', startSec: 449.06 },  // Pero el truco más potente es el más sencillo.
  { file: '7_32.jpg', startSec: 452.34 },  // Busca a propósito lo que quieres ver y quédate mirándolo hasta el final y cuando aparezca algo que ya te sobra
  { file: '7_41.jpg', startSec: 461.92 },  // Unos días así y notarás que tu feed empieza a cambiar.
  { file: '7_45.jpg', startSec: 465.82 },  // Así que volvamos a esa hora que se te escapó deslizando.
  { file: '7_49.jpg', startSec: 469.08 },  // ¿Cómo sabía la aplicación que vídeo enseñarte?
  { file: '7_52.jpg', startSec: 472.3 },  // ¿Por qué se lo dijiste tú?
  { file: '7_53.jpg', startSec: 473.94 },  // Con cada segundo que te quedaste mirando con cada vídeo que compartiste,
  { file: '7_57.jpg', startSec: 477.98 },  // con cada uno que deslizaste.
  { file: '7_59.jpg', startSec: 479.98 },  // El algoritmo no lee tu mente.
  { file: '8_02.jpg', startSec: 482.2 },  // Lee tus pulgares y todo lo que aprendió de ti,
  { file: '8_05.jpg', startSec: 485.3 },  // se lo puedes volver a enseñar.
  { file: '8_07.jpg', startSec: 487.86 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete,
  { file: '8_13.jpg', startSec: 493.04 },  // cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'swipe_whoosh.mp3', startSec: 2.08, volume: 0.14 },
  { file: 'clock_tick.mp3', startSec: 5.68, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 14.84, volume: 0.15 },
  { file: 'dramatic_hit.mp3', startSec: 40.96, volume: 0.15 },
  { file: 'data_whirr.mp3', startSec: 58.72, volume: 0.14 },
  { file: 'chips_clack.mp3', startSec: 67.44, volume: 0.13 },
  { file: 'funnel_whoosh.mp3', startSec: 87.06, volume: 0.14 },
  { file: 'whistle_blow.mp3', startSec: 111.56, volume: 0.13 },
  { file: 'cat_meow.mp3', startSec: 146.54, volume: 0.13 },
  { file: 'rising_whoosh.mp3', startSec: 213.12, volume: 0.14 },
  { file: 'ripple_expand.mp3', startSec: 232.56, volume: 0.14 },
  { file: 'negative_buzz.mp3', startSec: 263.1, volume: 0.13 },
  { file: 'mouse_click.mp3', startSec: 288.62, volume: 0.14 },
  { file: 'warning_tone.mp3', startSec: 310.82, volume: 0.14 },
  { file: 'slot_machine.mp3', startSec: 351.04, volume: 0.14 },
  { file: 'bubble_pop.mp3', startSec: 367.42, volume: 0.14 },
  { file: 'reset_ding.mp3', startSec: 403.08, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 479.98, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 487.86, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoFuncionaElAlgoritmoDeTiktokYYoutube: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-funciona-el-algoritmo-de-tiktok-y-youtube.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-funciona-el-algoritmo-de-tiktok-y-youtube-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-funciona-el-algoritmo-de-tiktok-y-youtube-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-funciona-el-algoritmo-de-tiktok-y-youtube/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
