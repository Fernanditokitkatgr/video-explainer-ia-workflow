import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Empleos del futuro (de menos a mas pasta) — estilo Ecomonos (mono cartoon).
// 1 segmento whisper = 1 imagen. Timestamps exactos del audio.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Estos siete trabajos casi no existían hace diez años."
  { file: '0_03.jpg', startSec: 3.38 },  // "El último paga casi un millón de dólares al año."
  { file: '0_06.jpg', startSec: 6.94 },  // "Y para los primeros no necesitas ni carrera."
  { file: '0_10.jpg', startSec: 10.2 },  // "Los vamos a ver de menos a más dinero."
  { file: '0_12.jpg', startSec: 12.86 },  // "Y te habizo."
  { file: '0_14.jpg', startSec: 14.02 },  // "¿Cuánto más subimos, más se descontró la la cosa?"
  { file: '0_17.jpg', startSec: 17.42 },  // "Así que quédate hasta el final."
  { file: '0_20.jpg', startSec: 20.06 },  // "Empezamos por el número siete, piloto de drones."
  { file: '0_23.jpg', startSec: 23.48 },  // "Sí, ha soído bien."
  { file: '0_25.jpg', startSec: 25.4 },  // "Te pagan por volar un juguete carísimo y encima es legal."
  { file: '0_29.jpg', startSec: 29.34 },  // "¿Pero qué hace exactamente un piloto de drones?"
  { file: '0_32.jpg', startSec: 32.6 },  // "Pues de todo."
  { file: '0_33.jpg', startSec: 33.92 },  // "Grava bodas desde el cielo, inspecciona puentes sin subirse a ellos,"
  { file: '0_37.jpg', startSec: 37.96 },  // "vigila campos enteros desde el sofá."
  { file: '0_40.jpg', startSec: 40.44 },  // "¿Y qué necesitas para dedicarte a esto?"
  { file: '0_43.jpg', startSec: 43.18 },  // "Menos de lo que crees,"
  { file: '0_44.jpg', startSec: 44.72 },  // "básicamente un carne oficial de drone y buen pulso."
  { file: '0_47.jpg', startSec: 47.86 },  // "Poco más."
  { file: '0_48.jpg', startSec: 48.78 },  // "Por eso su dificultades bajísima."
  { file: '0_51.jpg', startSec: 51.14 },  // "En un par de meses ya estás volando."
  { file: '0_53.jpg', startSec: 53.34 },  // "Y si quieres probarlo este fin de, es fácil."
  { file: '0_55.jpg', startSec: 55.4 },  // "Pilla un dron barato y graba tu barrio como si fuera una pele de acció"
  { file: '0_59.jpg', startSec: 59.96 },  // "¿Y cuánto se lleva a casa un piloto de drones?"
  { file: '1_03.jpg', startSec: 63.3 },  // "Entre 25 y 40.000 euros."
  { file: '1_05.jpg', startSec: 65.42 },  // "Por jugar con drones."
  { file: '1_06.jpg', startSec: 66.86 },  // "Oye, no está nada mal para empezar."
  { file: '1_09.jpg', startSec: 69.88 },  // "Subimos al número seis, el cazador de hackers."
  { file: '1_12.jpg', startSec: 72.88 },  // "Y este me encanta, porque te pagan por colarte donde no debes,"
  { file: '1_16.jpg', startSec: 76.52 },  // "como un ladrón, pero con contrato y sin acabar en la cárcel."
  { file: '1_20.jpg', startSec: 80.46 },  // "Su trabajo es atacar empresas a propósito"
  { file: '1_22.jpg', startSec: 82.8 },  // "para encontrar los agujeros antes que los malos de verdad."
  { file: '1_26.jpg', startSec: 86.62 },  // "¿Y qué necesitas para ser cazador de hackers?"
  { file: '1_29.jpg', startSec: 89.4 },  // "Curiosidad, un poco de mala idea sana y aprender a pensar como un deli"
  { file: '1_34.jpg', startSec: 94.42 },  // "Su dificultad ya sube a media,"
  { file: '1_36.jpg', startSec: 96.54 },  // "pero es de lo más divertido que vas a encontrar."
  { file: '1_39.jpg', startSec: 99.16 },  // "Para empezar hoy,"
  { file: '1_40.jpg', startSec: 100.28 },  // "monta un laboratorio en tu propio ordenador"
  { file: '1_42.jpg', startSec: 102.32 },  // "e intenta hackearte a ti mismo, legal y adictivo."
  { file: '1_46.jpg', startSec: 106.74 },  // "Y el sueldo de un cazador de hackers?"
  { file: '1_49.jpg', startSec: 109.1 },  // "Entre 40 y 70.000 euros."
  { file: '1_50.jpg', startSec: 110.86 },  // "Por ser el malo de los buenos."
  { file: '1_54.jpg', startSec: 114.08 },  // "Y llegamos al número cinco, el fontanero de datos."
  { file: '1_57.jpg', startSec: 117.94 },  // "Para entenderlo, piensa en la inteligencia artificial como un bebé gig"
  { file: '2_02.jpg', startSec: 122.66 },  // "Solo come datos y alguien tiene que darle la papilla."
  { file: '2_06.jpg', startSec: 126.2 },  // "Ese es el fontanero."
  { file: '2_08.jpg', startSec: 128.06 },  // "¿Qué hace en concreto?"
  { file: '2_09.jpg', startSec: 129.66 },  // "Construye las tuberías por las que fluyen los datos,"
  { file: '2_12.jpg', startSec: 132.54 },  // "limpios y ordenados hasta la máquina."
  { file: '2_15.jpg', startSec: 135.24 },  // "¿Y qué necesitas para ser fontanero de datos?"
  { file: '2_18.jpg', startSec: 138.36 },  // "Tranquilo, nada de matemáticas raras."
  { file: '2_20.jpg', startSec: 140.9 },  // "Solo algo de programación"
  { file: '2_22.jpg', startSec: 142.14 },  // "y ser una persona muy, muy ordenada."
  { file: '2_25.jpg', startSec: 145.76 },  // "Y como de difíciles."
  { file: '2_27.jpg', startSec: 147.42 },  // "Su dificultad es media y lo mejor."
  { file: '2_29.jpg', startSec: 149.78 },  // "Se aprende sin carrera."
  { file: '2_32.jpg', startSec: 152.02 },  // "¿Quieres probar como se siente?"
  { file: '2_34.jpg', startSec: 154.06 },  // "Coge tus chats de WhatsApp"
  { file: '2_35.jpg', startSec: 155.32 },  // "y descubre a qué hora hablas más y con quién."
  { file: '2_38.jpg', startSec: 158.18 },  // "Vas a flipar con lo que sale."
  { file: '2_40.jpg', startSec: 160.36 },  // "¿Y cuánto gana este fontanero?"
  { file: '2_42.jpg', startSec: 162.64 },  // "Entre 45 y 70.000 euros."
  { file: '2_45.jpg', startSec: 165.36 },  // "Oficialmente, el fontanero mejor pagado de la historia."
  { file: '2_49.jpg', startSec: 169.1 },  // "Espera un momento,"
  { file: '2_50.jpg', startSec: 170.44 },  // "porque seguro que estás pensando en otro trabajo famoso,"
  { file: '2_53.jpg', startSec: 173.54 },  // "el experto en hablarle a Chat GPT,"
  { file: '2_56.jpg', startSec: 176.1 },  // "el prompt engineer."
  { file: '2_57.jpg', startSec: 177.82 },  // "Pues malas noticias."
  { file: '2_59.jpg', startSec: 179.36 },  // "Chat GPT ya se entiende solito."
  { file: '3_01.jpg', startSec: 181.72 },  // "Ese trabajo se está borrando del mapa."
  { file: '3_04.jpg', startSec: 184.04 },  // "Así que no pierdas ni un minuto ahí."
  { file: '3_06.jpg', startSec: 186.74 },  // "Seguimos subiendo."
  { file: '3_08.jpg', startSec: 188.06 },  // "Y a partir de aquí, esto se pone muy serio."
  { file: '3_11.jpg', startSec: 191.3 },  // "Número cuatro."
  { file: '3_12.jpg', startSec: 192.62 },  // "El que enseña a ver a las máquinas."
  { file: '3_15.jpg', startSec: 195.14 },  // "¿Y qué hace un ingeniero de visión?"
  { file: '3_17.jpg', startSec: 197.74 },  // "Algo que suena a magia."
  { file: '3_19.jpg', startSec: 199.48 },  // "Consigue que un ordenador mire una foto y entienda que hay dentro."
  { file: '3_23.jpg', startSec: 203.28 },  // "Por ejemplo, distinguir un perro de una magdalena."
  { file: '3_26.jpg', startSec: 206.5 },  // "No te rías, que es más difícil de lo que crees."
  { file: '3_29.jpg', startSec: 209.62 },  // "Gracias a él, existen los coches que conducen solos"
  { file: '3_32.jpg', startSec: 212.3 },  // "y las cámaras que te reconocen la cara."
  { file: '3_34.jpg', startSec: 214.94 },  // "¿Y qué necesitas para esto?"
  { file: '3_37.jpg', startSec: 217.06 },  // "Aquí ya subimos el listón,"
  { file: '3_38.jpg', startSec: 218.52 },  // "programación de verdad."
  { file: '3_40.jpg', startSec: 220.28 },  // "Y ahora sí, matemáticas."
  { file: '3_42.jpg', startSec: 222.4 },  // "Por eso su dificultad ya es alta."
  { file: '3_44.jpg', startSec: 224.76 },  // "Aquí ya se suda."
  { file: '3_46.jpg', startSec: 226.56 },  // "Tu primer proyecto podría ser una app que mire una foto"
  { file: '3_49.jpg', startSec: 229.32 },  // "y diga si es un gato o un perro."
  { file: '3_51.jpg', startSec: 231.74 },  // "Esa tontería es la base de absolutamente todo."
  { file: '3_55.jpg', startSec: 235.16 },  // "¿Y cuánto paga enseñarle a ver a una máquina?"
  { file: '3_58.jpg', startSec: 238.24 },  // "Agárrate."
  { file: '3_59.jpg', startSec: 239.32 },  // "De 140 a 208.000 dólares."
  { file: '4_03.jpg', startSec: 243.14 },  // "Número tres."
  { file: '4_04.jpg', startSec: 244.3 },  // "El que le pone cuerpo a la máquina."
  { file: '4_05.jpg', startSec: 245.92 },  // "Porque hasta ahora nuestra inteligencia artificial"
  { file: '4_08.jpg', startSec: 248.78 },  // "era sólo una bocecita atrapada en una pantalla."
  { file: '4_12.jpg', startSec: 252.06 },  // "¿Y qué hace este ingeniero?"
  { file: '4_14.jpg', startSec: 254.06 },  // "Ne construye un cuerpo como el Dr. Frankenstein, pero coserando."
  { file: '4_18.jpg', startSec: 258.68 },  // "Le pone brazos, piernas, ruedas y sensores"
  { file: '4_21.jpg', startSec: 261.5 },  // "y luego la suelta en fábricas, almacenes y hasta quirófonos."
  { file: '4_26.jpg', startSec: 266.3 },  // "¿Y qué necesitas para dedicarte a la robótica?"
  { file: '4_29.jpg', startSec: 269.34 },  // "El pack completo, programación, electrónica y física."
  { file: '4_32.jpg', startSec: 272.76 },  // "Por eso su dificultad es muy alta."
  { file: '4_35.jpg', startSec: 275.66 },  // "Es sin discusión el trabajo más exigente de la lista."
  { file: '4_39.jpg', startSec: 279.5 },  // "Si te pica la curiosidad empieza por lo clásico."
  { file: '4_42.jpg', startSec: 282.66 },  // "Un robot de cartón que siga una línea negra por el suelo."
  { file: '4_46.jpg', startSec: 286.02 },  // "Todos los cracks empezaron justo ahí."
  { file: '4_49.jpg', startSec: 289.24 },  // "¿Y el sueldo de un ingeniero de robótica?"
  { file: '4_51.jpg', startSec: 291.66 },  // "Más de 180.000 dólares por darle vida a la máquina."
  { file: '4_56.jpg', startSec: 296.02 },  // "Número dos."
  { file: '4_57.jpg', startSec: 297.2 },  // "El entrenador del cerebro."
  { file: '4_58.jpg', startSec: 298.94 },  // "Este coge un cerebro artificial completamente vacío"
  { file: '5_01.jpg', startSec: 301.86 },  // "y lo entrena."
  { file: '5_03.jpg', startSec: 303.34 },  // "Es como un entrenador personal pero para robots."
  { file: '5_06.jpg', startSec: 306.68 },  // "Una más máquina, una más."
  { file: '5_09.jpg', startSec: 309.08 },  // "¿Qué hace exactamente?"
  { file: '5_11.jpg', startSec: 311.02 },  // "Le mete millones de ejemplos una y otra vez hasta que la máquina apren"
  { file: '5_15.jpg', startSec: 315.9 },  // "¿Y qué necesitas para entrenar cerebros?"
  { file: '5_18.jpg', startSec: 318.28 },  // "Programación y muchísimas matemáticas."
  { file: '5_21.jpg', startSec: 321.06 },  // "Aquí no hay ningún atajo."
  { file: '5_22.jpg', startSec: 322.72 },  // "Por eso su dificultad es brutal."
  { file: '5_24.jpg', startSec: 324.94 },  // "Es uno de los perfiles más técnicos que existen en el planeta."
  { file: '5_28.jpg', startSec: 328.7 },  // "¿Quieres saborearlo?"
  { file: '5_29.jpg', startSec: 329.58 },  // "Crea una inteligencia que te recomiende películas según lo que ya te g"
  { file: '5_34.jpg', startSec: 334.14 },  // "Sí, el famoso truco de Netflix y sí, puedes hacerlo tú."
  { file: '5_38.jpg', startSec: 338.2 },  // "Y ahora sujetate al sueldo."
  { file: '5_40.jpg', startSec: 340.06 },  // "En empresas como Meta o OpenAI,"
  { file: '5_42.jpg', startSec: 342.56 },  // "un entrenador de estos gana hasta 490.000 dólares al año."
  { file: '5_46.jpg', startSec: 346.76 },  // "Medio millón por entrenar a una máquina."
  { file: '5_50.jpg', startSec: 350.28 },  // "Y por fin, el número uno."
  { file: '5_52.jpg', startSec: 352.46 },  // "El jefe supremo de la inteligencia artificial."
  { file: '5_55.jpg', startSec: 355.46 },  // "Este es el que manda sobre todos los anteriores."
  { file: '5_57.jpg', startSec: 357.82 },  // "El jefe final, el tanos de la oficina."
  { file: '6_01.jpg', startSec: 361.22 },  // "¿Y qué hace un jefe de inteligencia artificial?"
  { file: '6_04.jpg', startSec: 364.08 },  // "Toma las grandes decisiones. Decide qué se construye, con qué datos se"
  { file: '6_08.jpg', startSec: 368.62 },  // "y para ganar cuánto dinero."
  { file: '6_10.jpg', startSec: 370.62 },  // "Dirige a los fontaneros, a los entrenadores y a los ingenieros, a todo"
  { file: '6_15.jpg', startSec: 375.26 },  // "Pero aquí viene lo más curioso de todo."
  { file: '6_17.jpg', startSec: 377.48 },  // "Este señor ni siquiera programa."
  { file: '6_20.jpg', startSec: 380.14 },  // "Entonces, ¿qué necesitas para llegar a jefe de inteligencia artificial"
  { file: '6_24.jpg', startSec: 384.12 },  // "Otra cosa completamente distinta."
  { file: '6_26.jpg', startSec: 386.48 },  // "Necesitas visión de negocio, mucho liderazgo,"
  { file: '6_29.jpg', startSec: 389.38 },  // "y entender de tecnología más que nadie en la sala."
  { file: '6_32.jpg', startSec: 392.56 },  // "¿Y cómo de difíciles llegar aquí?"
  { file: '6_34.jpg', startSec: 394.82 },  // "Tanto que no se mide en un curso."
  { file: '6_37.jpg', startSec: 397.0 },  // "Se mide en 10 o 15 años de carrera."
  { file: '6_39.jpg', startSec: 399.28 },  // "Porque a este puesto no se estudia. A este puesto se llega."
  { file: '6_43.jpg', startSec: 403.6 },  // "Aún así, puedes empezar a entrenar la mente desde hoy."
  { file: '6_46.jpg', startSec: 406.94 },  // "Coge la panadería de tu barrio,"
  { file: '6_48.jpg', startSec: 408.62 },  // "y decide dónde le meterías inteligencia artificial para ganar más dine"
  { file: '6_52.jpg', startSec: 412.74 },  // "Enhorabona, acabas de pensar como un jefe de inteligencia artificial."
  { file: '6_57.jpg', startSec: 417.1 },  // "¿Y su sueldo?"
  { file: '6_58.jpg', startSec: 418.44 },  // "El que cierre al vídeo por todo lo alto."
  { file: '7_00.jpg', startSec: 420.62 },  // "De media, 350.000 dólares."
  { file: '7_03.jpg', startSec: 423.62 },  // "Pero un jefe senior en Google puede llegar a 893.000,"
  { file: '7_08.jpg', startSec: 428.14 },  // "casi un millón de dólares, al año, por mandar sobre robots."
  { file: '7_12.jpg', startSec: 432.84 },  // "Y hasta aquí, siete trabajos, siete sueldos,"
  { file: '7_16.jpg', startSec: 436.3 },  // "siete formas distintas de flipar,"
  { file: '7_18.jpg', startSec: 438.38 },  // "y sabes cuál es la mejor noticia,"
  { file: '7_20.jpg', startSec: 440.06 },  // "que los de abajo, los más fáciles,"
  { file: '7_22.jpg', startSec: 442.64 },  // "los puedes empezar este mismo fin de semana."
  { file: '7_25.jpg', startSec: 445.48 },  // "Te he dado un proyecto para cada uno,"
  { file: '7_27.jpg', startSec: 447.54 },  // "así que ya no tienes excusas."
  { file: '7_29.jpg', startSec: 449.74 },  // "Ahora dime tú una cosa en los comentarios."
  { file: '7_32.jpg', startSec: 452.06 },  // "¿Cuál de los siete harías?"
  { file: '7_33.jpg', startSec: 453.9 },  // "Y suscríbete que la semana que viene,"
  { file: '7_35.jpg', startSec: 455.8 },  // "te enseño hacer fontanero de datos desde cero, sin carrera."
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'pop_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'cash_register.mp3', startSec: 3.38, volume: 0.16 },
  { file: 'paper_toss.mp3', startSec: 6.94, volume: 0.13 },
  { file: 'coins_stack.mp3', startSec: 10.2, volume: 0.13 },
  { file: 'rising_whoosh.mp3', startSec: 14.02, volume: 0.13 },
  { file: 'tada_7.mp3', startSec: 20.06, volume: 0.15 },
  { file: 'drone_buzz.mp3', startSec: 25.4, volume: 0.11 },
  { file: 'stamp_thud.mp3', startSec: 44.72, volume: 0.14 },
  { file: 'easy_ding.mp3', startSec: 48.78, volume: 0.12 },
  { file: 'coin_small.mp3', startSec: 63.3, volume: 0.12 },
  { file: 'sneaky_reveal.mp3', startSec: 69.88, volume: 0.13 },
  { file: 'tiptoe.mp3', startSec: 72.88, volume: 0.12 },
  { file: 'camera_shutter.mp3', startSec: 94.42, volume: 0.12 },
  { file: 'boing.mp3', startSec: 110.86, volume: 0.13 },
  { file: 'wrench_clank.mp3', startSec: 114.08, volume: 0.13 },
  { file: 'slurp.mp3', startSec: 122.66, volume: 0.13 },
  { file: 'phone_notify.mp3', startSec: 155.32, volume: 0.12 },
  { file: 'fanfare_small.mp3', startSec: 165.36, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 169.1, volume: 0.16 },
  { file: 'glitch.mp3', startSec: 176.1, volume: 0.12 },
  { file: 'eraser_swipe.mp3', startSec: 181.72, volume: 0.13 },
  { file: 'climb_steps.mp3', startSec: 186.74, volume: 0.11 },
  { file: 'tada_4.mp3', startSec: 191.3, volume: 0.14 },
  { file: 'comedic_boing2.mp3', startSec: 203.28, volume: 0.13 },
  { file: 'tension_up.mp3', startSec: 222.4, volume: 0.12 },
  { file: 'drumroll.mp3', startSec: 238.24, volume: 0.13 },
  { file: 'cash_register2.mp3', startSec: 239.32, volume: 0.16 },
  { file: 'tada_3.mp3', startSec: 243.14, volume: 0.14 },
  { file: 'electric_zap.mp3', startSec: 254.06, volume: 0.14 },
  { file: 'cash_register3.mp3', startSec: 291.66, volume: 0.16 },
  { file: 'tada_2.mp3', startSec: 296.02, volume: 0.14 },
  { file: 'effort_grunt.mp3', startSec: 301.86, volume: 0.12 },
  { file: 'heavy_thud.mp3', startSec: 322.72, volume: 0.13 },
  { file: 'cash_big.mp3', startSec: 342.56, volume: 0.17 },
  { file: 'faint_thud.mp3', startSec: 346.76, volume: 0.14 },
  { file: 'fanfare_1.mp3', startSec: 350.28, volume: 0.16 },
  { file: 'dramatic_hit.mp3', startSec: 357.82, volume: 0.15 },
  { file: 'cash_huge.mp3', startSec: 423.62, volume: 0.18 },
  { file: 'money_rain.mp3', startSec: 428.14, volume: 0.15 },
  { file: 'mind_blown.mp3', startSec: 436.3, volume: 0.16 },
  { file: 'checklist.mp3', startSec: 445.48, volume: 0.12 },
  { file: 'subscribe_chime.mp3', startSec: 453.9, volume: 0.16 },
];

const MUSIC_FILE = 'background_classical.mp3';
const MUSIC_CLIP_SECONDS = 145;
const MUSIC_VOLUME = 0.08;

export const EmpleosDelFuturo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;

  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; }
  }
  const activeFrame = FRAMES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('empleos-del-futuro.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`empleos-del-futuro-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`empleos-del-futuro-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.2} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      <Img src={staticFile(`empleos-del-futuro/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AbsoluteFill>
  );
};
