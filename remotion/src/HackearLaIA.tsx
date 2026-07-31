import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Hackear la IA: el nuevo tipo de hacker — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Existe un hacker que no escribe una sola línea de código para entrar."
  { file: '0_04.jpg', startSec: 4.2 },  // "Solo escribe una frase."
  { file: '0_06.jpg', startSec: 6.1 },  // "Y esa frase vale hasta 30 .000 dólares."
  { file: '0_09.jpg', startSec: 9.66 },  // "Hace tres años esta profesión no existía ni el nombre existía."
  { file: '0_14.jpg', startSec: 14.08 },  // "Hoy paga más que el Penteste Inclásico y casi nadie las sabe hacer."
  { file: '0_18.jpg', startSec: 18.22 },  // "Al final del vídeo vas a saber exactamente cuánto se cobra y por qué está tan vacío este hueco."
  { file: '0_24.jpg', startSec: 24.42 },  // "Capítulo 1."
  { file: '0_25.jpg', startSec: 25.72 },  // "¿Qué significa jaquear una inteligencia artificial?"
  { file: '0_29.jpg', startSec: 29.48 },  // "Jaquear software normal es buscar un error del programador."
  { file: '0_33.jpg', startSec: 33.02 },  // "Encuentras el fallo, avisas, alguien cambia el código y se acabó."
  { file: '0_37.jpg', startSec: 37.58 },  // "Jaquear un modelo de lenguaje es otra cosa completamente distinta."
  { file: '0_42.jpg', startSec: 42.12 },  // "Aquí no hay una línea de código con el fallo dentro."
  { file: '0_44.jpg', startSec: 44.88 },  // "El fallo está en el comportamiento del modelo."
  { file: '0_47.jpg', startSec: 47.74 },  // "En lo que decide hacer cuando le dices algo que nadie previo."
  { file: '0_51.jpg', startSec: 51.46 },  // "Un modelo no ejecuta instrucciones."
  { file: '0_53.jpg', startSec: 53.78 },  // "Un modelo interpreta el lenguaje. Y todo lo que interpreta lenguaje se puede convencer."
  { file: '1_00.jpg', startSec: 60.44 },  // "Y eso rompe casi todo el manual de seguridad que teníamos escrito."
  { file: '1_05.jpg', startSec: 65.18 },  // "Capítulo 2."
  { file: '1_06.jpg', startSec: 66.58 },  // "Las armas del nuevo hacker."
  { file: '1_08.jpg', startSec: 68.72 },  // "Arma número 1."
  { file: '1_10.jpg', startSec: 70.38 },  // "La inyección de instrucciones."
  { file: '1_12.jpg', startSec: 72.3 },  // "Prompt injection."
  { file: '1_13.jpg', startSec: 73.68 },  // "Lecuelas al modelo una orden disfrazada de dato normal."
  { file: '1_17.jpg', startSec: 77.24 },  // "El modelo no distingue entre la orden de su dueño y el texto que está leyendo."
  { file: '1_22.jpg', startSec: 82.06 },  // "Simon Willison le puso nombre a esto en septiembre de 2022."
  { file: '1_26.jpg', startSec: 86.26 },  // "Sigue sin estar resuelto."
  { file: '1_28.jpg', startSec: 88.16 },  // "Arma número 2."
  { file: '1_29.jpg', startSec: 89.86 },  // "El jailbreak."
  { file: '1_31.jpg', startSec: 91.24 },  // "Convencer al modelo de que salte sus propias normas de seguridad."
  { file: '1_35.jpg', startSec: 95.18 },  // "En 2023 el truco famoso se llamaba Dan de Do Anything Now."
  { file: '1_40.jpg', startSec: 100.86 },  // "Puvo otra versión aún más absurda,"
  { file: '1_43.jpg', startSec: 103.24 },  // "pedirle que hiciera de abuela contando un cuento."
  { file: '1_46.jpg', startSec: 106.45 },  // "Suena a Chiste."
  { file: '1_47.jpg', startSec: 107.78 },  // "Fue un problema de seguridad real en el producto más usado del mundo."
  { file: '1_52.jpg', startSec: 112.72 },  // "Arma número 3."
  { file: '1_53.jpg', startSec: 113.84 },  // "Extraer el prompt de sistema."
  { file: '1_55.jpg', startSec: 115.9 },  // "Todo asistente de IA lleva instrucciones ocultas escritas por la empresa."
  { file: '2_00.jpg', startSec: 120.66 },  // "En febrero de 2023 un estudiante de Stanford llamado Kevin Liu se las sacó Archat de Bing."
  { file: '2_07.jpg', startSec: 127.0 },  // "Y dentro había un nombre en clave que Microsoft nunca había hecho público."
  { file: '2_11.jpg', startSec: 131.74 },  // "Sydney."
  { file: '2_12.jpg', startSec: 132.82 },  // "Arma número 4."
  { file: '2_14.jpg', startSec: 134.52 },  // "Y la más peligrosa de todas."
  { file: '2_16.jpg', startSec: 136.36 },  // "La inyección indirecta."
  { file: '2_18.jpg', startSec: 138.38 },  // "Aquí ya no hace falta que la víctima escriba nada."
  { file: '2_21.jpg', startSec: 141.42 },  // "Y el asistente obedece a tu texto no a su dueño."
  { file: '2_25.jpg', startSec: 145.26 },  // "Junio de 2025."
  { file: '2_27.jpg', startSec: 147.26 },  // "Investigadores de AIM Security publican Echo League."
  { file: '2_30.jpg', startSec: 150.86 },  // "Un fallo en Microsoft 365 Copilot que permitía sacar datos internos sin que el usuario hiciera un solo clic."
  { file: '2_38.jpg', startSec: 158.4 },  // "Zero clicks."
  { file: '2_39.jpg', startSec: 159.6 },  // "Solo un correo que el asistente había leído por su cuenta."
  { file: '2_43.jpg', startSec: 163.82 },  // "Arma número 5."
  { file: '2_45.jpg', startSec: 165.12 },  // "Envenenar los datos de entrenamiento."
  { file: '2_47.jpg', startSec: 167.56 },  // "Un modelo aprende de textos e imágenes descargados de Internet."
  { file: '2_51.jpg', startSec: 171.58 },  // "Si controlas una parte diminuta de esos datos,"
  { file: '2_54.jpg', startSec: 174.4 },  // "puedes plantar una puerta trasera."
  { file: '2_56.jpg', startSec: 176.86 },  // "Nicolás Carlini y su equipo demostraron en 2023 que era práctico y barato."
  { file: '3_02.jpg', startSec: 182.1 },  // "Por unos 60 dólares podían cambiar lo que iba a aprender el modelo. Y en octubre de 2025,"
  { file: '3_08.jpg', startSec: 188.54 },  // "Anthropic publicó algo todavía más incómodo."
  { file: '3_11.jpg', startSec: 191.7 },  // "Con unos 250 documentos envenenados basta para meter una puerta trasera."
  { file: '3_17.jpg', startSec: 197.36 },  // "No necesitas envenenar el 1 por ciento."
  { file: '3_20.jpg', startSec: 200.2 },  // "Necesitas 250 archivos."
  { file: '3_23.jpg', startSec: 203.92 },  // "Capítulo 3."
  { file: '3_25.jpg', startSec: 205.24 },  // "¿Por qué esto no se parcea?"
  { file: '3_27.jpg', startSec: 207.54 },  // "Cuando reglas un bug clásico, el bug desaparece, punto final."
  { file: '3_31.jpg', startSec: 211.88 },  // "Cuando reglas un jailbreak,"
  { file: '3_33.jpg', startSec: 213.52 },  // "no desaparece nada. Pero hay infinitas formas de pedir lo mismo."
  { file: '3_37.jpg', startSec: 217.98 },  // "En julio de 2023,"
  { file: '3_40.jpg', startSec: 220.08 },  // "un equipo de Carnegie Mellon lo dejó por escrito."
  { file: '3_43.jpg', startSec: 223.18 },  // "Y lo peor,"
  { file: '3_44.jpg', startSec: 224.32 },  // "la misma cadena funcionaba en varios modelos distintos a la vez."
  { file: '3_48.jpg', startSec: 228.36 },  // "Eso significa que el ataque no era un fallo de una empresa,"
  { file: '3_51.jpg', startSec: 231.92 },  // "era una propiedad de la tecnología."
  { file: '3_54.jpg', startSec: 234.5 },  // "Y una defensa que funciona el 99 por ciento de las veces,"
  { file: '3_58.jpg', startSec: 238.12 },  // "a escala de millones de mensajes,"
  { file: '4_00.jpg', startSec: 240.26 },  // "falla miles de veces al día. Por eso hizo falta gente nueva,"
  { file: '4_04.jpg', startSec: 244.82 },  // "gente que piensa en lenguaje,"
  { file: '4_06.jpg', startSec: 246.74 },  // "no en memoria."
  { file: '4_08.jpg', startSec: 248.66 },  // "Capítulo 4."
  { file: '4_10.jpg', startSec: 250.04 },  // "¿Y esto te afecta a ti?"
  { file: '4_12.jpg', startSec: 252.12 },  // "Vale, muy bonito,"
  { file: '4_13.jpg', startSec: 253.54 },  // "pero tú no entrenas modelos. ¿Por qué te importa?"
  { file: '4_16.jpg', startSec: 256.64 },  // "Porque tú ya le has dado permisos a unaía sin darte cuenta."
  { file: '4_20.jpg', startSec: 260.48 },  // "Cada vez que un asistente puede leer y además actuar,"
  { file: '4_23.jpg', startSec: 263.6 },  // "tienes esta superficie de ataque en casa."
  { file: '4_26.jpg', startSec: 266.64 },  // "Diciembre de 2023,"
  { file: '4_28.jpg', startSec: 268.72 },  // "un concesionario de chebrole en Estados Unidos pone un chat -pot en su web."
  { file: '4_33.jpg', startSec: 273.38 },  // "Un usuario le convence con un par de frases de aceptar venderle un coche por un dólar."
  { file: '4_39.jpg', startSec: 279.26 },  // "Febrero de 2024,"
  { file: '4_41.jpg', startSec: 281.38 },  // "hercana da pierde ante un tribunal en Canadá."
  { file: '4_44.jpg', startSec: 284.1 },  // "El tribunal decidió que la aerolínea era responsable de lo que había dicho su vot."
  { file: '4_48.jpg', startSec: 288.94 },  // "Traducción,"
  { file: '4_50.jpg', startSec: 290.1 },  // "lo que tuía promete,"
  { file: '4_51.jpg', startSec: 291.9 },  // "lo padas tú."
  { file: '4_53.jpg', startSec: 293.28 },  // "Hoas, la referencia mundial en seguridad de aplicaciones publicó en 2023 su top 10 de riesgos para aplicaciones con modelos del lenguaje."
  { file: '5_01.jpg', startSec: 301.16 },  // "El número uno de la lista es la inyección de instrucciones,"
  { file: '5_04.jpg', startSec: 304.3 },  // "el primero,"
  { file: '5_05.jpg', startSec: 305.38 },  // "por encima de todo lo demás."
  { file: '5_07.jpg', startSec: 307.8 },  // "Capítulo 5."
  { file: '5_08.jpg', startSec: 308.96 },  // "¿Cuánto se gana con esto?"
  { file: '5_10.jpg', startSec: 310.9 },  // "Un pentester junior en España empieza cerca de los 30 .000 euros al año."
  { file: '5_15.jpg', startSec: 315.28 },  // "Un retymer clásico con experiencias se mueve por encima de los 70 .000. Un especialista en seguridad de modelos de ella juega en otra liga."
  { file: '5_23.jpg', startSec: 323.78 },  // "Las ofertas de AI retymer en Estados Unidos se publican entre 180 .000 y 300 .000 dólares."
  { file: '5_30.jpg', startSec: 330.28 },  // "Y no porque el trabajo sea más difícil,"
  { file: '5_32.jpg', startSec: 332.68 },  // "porque hay muy poquísima gente que sepa hacerlo."
  { file: '5_36.jpg', startSec: 336.1 },  // "Además, está la vía del Book Bounty y ahí ya no hay nómina, hay recompensas."
  { file: '5_40.jpg', startSec: 340.94 },  // "Open AI abrió su programa en abril de 2023 a través de Book Crowd. Anthropic paga hasta 15 .000 dólares por un jailbreak universal en sus sistemas más protegidos."
  { file: '5_51.jpg', startSec: 351.24 },  // "Y Google lanzó en octubre de 2025 un programa dedicado solo a AIA, con premios de hasta 30 .000 dólares por ayazgo."
  { file: '5_59.jpg', startSec: 359.16 },  // "Fíjate en el detalle que importa."
  { file: '6_01.jpg', startSec: 361.12 },  // "Aquí el ayazgo no es un exploit de 20 kilobytes."
  { file: '6_04.jpg', startSec: 364.12 },  // "Muchas veces es un párrafo bien escrito."
  { file: '6_06.jpg', startSec: 366.94 },  // "En Hacker One, la mayor plataforma de Book Bounty del mundo,"
  { file: '6_10.jpg', startSec: 370.24 },  // "los informes relacionados con AIA se dispararon más de 170 % en un año."
  { file: '6_15.jpg', startSec: 375.9 },  // "Y en agosto de 2023, en la Defcon de Las Vegas,"
  { file: '6_19.jpg', startSec: 379.36 },  // "hubo un red timpúblico de modelos generativos."
  { file: '6_21.jpg', startSec: 381.98 },  // "Más de 2000 personas atacando modelos a la vez con apoyo de la Casa Blanca."
  { file: '6_26.jpg', startSec: 386.88 },  // "Cuando un gobierno organiza el ataque,"
  { file: '6_29.jpg', startSec: 389.04 },  // "es que el ataque ya es una profesión."
  { file: '6_32.jpg', startSec: 392.54 },  // "Capítulo 6,"
  { file: '6_33.jpg', startSec: 393.78 },  // "la ventana."
  { file: '6_35.jpg', startSec: 395.0 },  // "Y aquí llega la parte que te prometí al principio."
  { file: '6_37.jpg', startSec: 397.74 },  // "Este hueco estaba cío y estaba cío por un motivo muy concreto."
  { file: '6_42.jpg', startSec: 402.48 },  // "Para hacer esto bien necesitas dos cosas que casi nunca van juntas en la misma persona."
  { file: '6_47.jpg', startSec: 407.28 },  // "La gente de seguridad clásica sabe lo primero, pero no lo segundo."
  { file: '6_51.jpg', startSec: 411.4 },  // "La gente de Machine Learning sabe lo segundo, pero nunca ha pensado como un atacante."
  { file: '6_56.jpg', startSec: 416.36 },  // "Quien junta las dos cosas, soy no tiene competencia."
  { file: '6_59.jpg', startSec: 419.68 },  // "Literalmente no la tiene."
  { file: '7_01.jpg', startSec: 421.84 },  // "Y la puerta de entrada es gratis y legal. Hay laboratorios abiertos hechos para esto,"
  { file: '7_06.jpg', startSec: 426.76 },  // "Gandalf de la Quera y el clásico Prompt Airlines."
  { file: '7_10.jpg', startSec: 430.36 },  // "Añad de la lista de OWASP para modelos del lenguaje y ya tienes el temario ordenado, gratis y en abierto."
  { file: '7_16.jpg', startSec: 436.88 },  // "Ahora la parte honesta porque no te voy a vender humo."
  { file: '7_20.jpg', startSec: 440.42 },  // "Los sueldos de 300 .000 dólares son de Estados Unidos y de las empresas punteras no la media global."
  { file: '7_26.jpg', startSec: 446.74 },  // "Y esta ventana no va a estar abierta para siempre, ninguna lo está. Y algo importante,"
  { file: '7_32.jpg', startSec: 452.22 },  // "todo esto se hace con permiso, en laboratorios o en programas oficiales."
  { file: '7_36.jpg', startSec: 456.5 },  // "Atacar un modelo en producción sin autorización es un delito, exactamente igual que atacar cualquier otro sistema."
  { file: '7_43.jpg', startSec: 463.22 },  // "Lo que hace que esto se pague no es el ataque,"
  { file: '7_46.jpg', startSec: 466.04 },  // "es el informe que llega antes de que lo haga alguien con malas intenciones."
  { file: '7_50.jpg', startSec: 470.48 },  // "Así que volvamos a la frase del principio."
  { file: '7_52.jpg', startSec: 472.96 },  // "Sí, hay un hacker que entra escribiendo sólo una frase. Y esa frase secotiza a 30 .000 dólares porque el fallo no está en el código,"
  { file: '8_01.jpg', startSec: 481.32 },  // "está en el comportamiento."
  { file: '8_03.jpg', startSec: 483.46 },  // "No hay parte que lo cierre, sólo hay gente que lo busca."
  { file: '8_07.jpg', startSec: 487.28 },  // "Y ahora mismo esa gente cabe en un ascensor."
  { file: '8_10.jpg', startSec: 490.96 },  // "Si esto te ha volado la cabeza a suscríbete, se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'cash_register.mp3', startSec: 6.1, volume: 0.16 },
  { file: 'chapter_1.mp3', startSec: 24.42, volume: 0.16 },
  { file: 'reveal_sting.mp3', startSec: 60.44, volume: 0.15 },
  { file: 'chapter_2.mp3', startSec: 65.18, volume: 0.16 },
  { file: 'weapon_unsheath.mp3', startSec: 70.38, volume: 0.14 },
  { file: 'padlock_break.mp3', startSec: 89.86, volume: 0.15 },
  { file: 'paper_unroll.mp3', startSec: 113.84, volume: 0.13 },
  { file: 'dark_reveal.mp3', startSec: 131.74, volume: 0.16 },
  { file: 'danger_sting.mp3', startSec: 136.36, volume: 0.17 },
  { file: 'error_beep.mp3', startSec: 158.4, volume: 0.15 },
  { file: 'poison_drip.mp3', startSec: 165.12, volume: 0.14 },
  { file: 'impact_thud.mp3', startSec: 200.2, volume: 0.16 },
  { file: 'chapter_3.mp3', startSec: 203.92, volume: 0.16 },
  { file: 'alarm_multi.mp3', startSec: 240.26, volume: 0.16 },
  { file: 'chapter_4.mp3', startSec: 248.66, volume: 0.16 },
  { file: 'comedy_pop.mp3', startSec: 279.26, volume: 0.16 },
  { file: 'gavel.mp3', startSec: 284.1, volume: 0.16 },
  { file: 'chapter_5.mp3', startSec: 307.8, volume: 0.16 },
  { file: 'cash_big.mp3', startSec: 323.78, volume: 0.17 },
  { file: 'cash_bounty.mp3', startSec: 351.24, volume: 0.16 },
  { file: 'rising_chart.mp3', startSec: 370.24, volume: 0.14 },
  { file: 'crowd_murmur.mp3', startSec: 381.98, volume: 0.13 },
  { file: 'chapter_6.mp3', startSec: 392.54, volume: 0.16 },
  { file: 'door_open.mp3', startSec: 421.84, volume: 0.14 },
  { file: 'serious_tone.mp3', startSec: 436.88, volume: 0.14 },
  { file: 'cell_clang.mp3', startSec: 456.5, volume: 0.16 },
  { file: 'elevator_ding.mp3', startSec: 487.28, volume: 0.15 },
  { file: 'subscribe.mp3', startSec: 490.96, volume: 0.17 },
];

// Música de fondo del canal: clip de 30 s que Loop repite. OJO: a Loop se le pasa la
// duración de UNA iteración (el clip), nunca la duración total del vídeo.
const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.075;

export const HackearLaIA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('hackear-la-ia.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`hackear-la-ia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`hackear-la-ia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`hackear-la-ia/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
