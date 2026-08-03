import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LabelOverlay } from './LabelOverlay';

// Hackear la IA: el nuevo tipo de hacker — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0, labels: ['UNA SOLA FRASE'] },  // "Existe un hacker que no escribe una sola línea de código para entrar."
  { file: '0_04.jpg', startSec: 4.2 },  // "Solo escribe una frase."
  { file: '0_06.jpg', startSec: 6.1, labels: ['30.000 $'] },  // "Y esa frase vale hasta 30 .000 dólares."
  { file: '0_09.jpg', startSec: 9.66, labels: ['HACE 3 AÑOS NO EXISTÍA'] },  // "Hace tres años esta profesión no existía ni el nombre existía."
  { file: '0_14.jpg', startSec: 14.08, labels: ['PENTESTER', 'IA'] },  // "Hoy paga más que el Penteste Inclásico y casi nadie las sabe hacer."
  { file: '0_18.jpg', startSec: 18.22, labels: ['HUECO VACÍO'] },  // "Al final del vídeo vas a saber exactamente cuánto se cobra y por qué está tan vacío este hueco."
  { file: '0_24.jpg', startSec: 24.42 },  // "Capítulo 1."
  { file: '0_25.jpg', startSec: 25.72, labels: ['¿QUÉ ES HACKEAR UNA IA?'] },  // "¿Qué significa jaquear una inteligencia artificial?"
  { file: '0_29.jpg', startSec: 29.48, labels: ['FALLO DEL PROGRAMADOR'] },  // "Jaquear software normal es buscar un error del programador."
  { file: '0_33.jpg', startSec: 33.02, labels: ['ARREGLADO'] },  // "Encuentras el fallo, avisas, alguien cambia el código y se acabó."
  { file: '0_37.jpg', startSec: 37.58 },  // "Jaquear un modelo de lenguaje es otra cosa completamente distinta."
  { file: '0_42.jpg', startSec: 42.12, labels: ['AQUÍ NO HAY NADA'] },  // "Aquí no hay una línea de código con el fallo dentro."
  { file: '0_44.jpg', startSec: 44.88, labels: ['EL COMPORTAMIENTO'] },  // "El fallo está en el comportamiento del modelo."
  { file: '0_47.jpg', startSec: 47.74 },  // "En lo que decide hacer cuando le dices algo que nadie previo."
  { file: '0_51.jpg', startSec: 51.46, labels: ['INTERPRETA LENGUAJE'] },  // "Un modelo no ejecuta instrucciones."
  { file: '0_53.jpg', startSec: 53.78, labels: ['SE PUEDE CONVENCER'] },  // "Un modelo interpreta el lenguaje. Y todo lo que interpreta lenguaje se puede convencer."
  { file: '1_00.jpg', startSec: 60.44, labels: ['MANUAL ROTO'] },  // "Y eso rompe casi todo el manual de seguridad que teníamos escrito."
  { file: '1_05.jpg', startSec: 65.18 },  // "Capítulo 2."
  { file: '1_06.jpg', startSec: 66.58 },  // "Las armas del nuevo hacker."
  { file: '1_08.jpg', startSec: 68.72, labels: ['ARMA 1'] },  // "Arma número 1."
  { file: '1_10.jpg', startSec: 70.38 },  // "La inyección de instrucciones."
  { file: '1_12.jpg', startSec: 72.3 },  // "Prompt injection."
  { file: '1_13.jpg', startSec: 73.68 },  // "Lecuelas al modelo una orden disfrazada de dato normal."
  { file: '1_17.jpg', startSec: 77.24, labels: ['NO DISTINGUE'] },  // "El modelo no distingue entre la orden de su dueño y el texto que está leyendo."
  { file: '1_22.jpg', startSec: 82.06, labels: ['SIMON WILLISON', '2022'] },  // "Simon Willison le puso nombre a esto en septiembre de 2022."
  { file: '1_26.jpg', startSec: 86.26, labels: ['SIN RESOLVER'] },  // "Sigue sin estar resuelto."
  { file: '1_28.jpg', startSec: 88.16, labels: ['ARMA 2'] },  // "Arma número 2."
  { file: '1_29.jpg', startSec: 89.86 },  // "El jailbreak."
  { file: '1_31.jpg', startSec: 91.24 },  // "Convencer al modelo de que salte sus propias normas de seguridad."
  { file: '1_35.jpg', startSec: 95.18, labels: ['DAN', '2023'] },  // "En 2023 el truco famoso se llamaba Dan de Do Anything Now."
  { file: '1_40.jpg', startSec: 100.86 },  // "Puvo otra versión aún más absurda,"
  { file: '1_43.jpg', startSec: 103.24 },  // "pedirle que hiciera de abuela contando un cuento."
  { file: '1_46.jpg', startSec: 106.45, labels: ['¿UN CHISTE?'] },  // "Suena a Chiste."
  { file: '1_47.jpg', startSec: 107.78, labels: ['PROBLEMA REAL'] },  // "Fue un problema de seguridad real en el producto más usado del mundo."
  { file: '1_52.jpg', startSec: 112.72, labels: ['ARMA 3'] },  // "Arma número 3."
  { file: '1_53.jpg', startSec: 113.84 },  // "Extraer el prompt de sistema."
  { file: '1_55.jpg', startSec: 115.9, labels: ['INSTRUCCIONES OCULTAS'] },  // "Todo asistente de IA lleva instrucciones ocultas escritas por la empresa."
  { file: '2_00.jpg', startSec: 120.66, labels: ['KEVIN LIU', '2023'] },  // "En febrero de 2023 un estudiante de Stanford llamado Kevin Liu se las sacó Archat de Bing."
  { file: '2_07.jpg', startSec: 127.0 },  // "Y dentro había un nombre en clave que Microsoft nunca había hecho público."
  { file: '2_11.jpg', startSec: 131.74, labels: ['SYDNEY'] },  // "Sydney."
  { file: '2_12.jpg', startSec: 132.82, labels: ['ARMA 4'] },  // "Arma número 4."
  { file: '2_14.jpg', startSec: 134.52, labels: ['LA PEOR'] },  // "Y la más peligrosa de todas."
  { file: '2_16.jpg', startSec: 136.36 },  // "La inyección indirecta."
  { file: '2_18.jpg', startSec: 138.38, labels: ['NO TOCA NADA'] },  // "Aquí ya no hace falta que la víctima escriba nada."
  { file: '2_21.jpg', startSec: 141.42 },  // "Y el asistente obedece a tu texto no a su dueño."
  { file: '2_25.jpg', startSec: 145.26, labels: ['2025'] },  // "Junio de 2025."
  { file: '2_27.jpg', startSec: 147.26, labels: ['ECHOLEAK'] },  // "Investigadores de AIM Security publican Echo League."
  { file: '2_30.jpg', startSec: 150.86 },  // "Un fallo en Microsoft 365 Copilot que permitía sacar datos internos sin que el usuario hiciera un solo clic."
  { file: '2_38.jpg', startSec: 158.4, labels: ['CERO CLICS'] },  // "Zero clicks."
  { file: '2_39.jpg', startSec: 159.6 },  // "Solo un correo que el asistente había leído por su cuenta."
  { file: '2_43.jpg', startSec: 163.82, labels: ['ARMA 5'] },  // "Arma número 5."
  { file: '2_45.jpg', startSec: 165.12 },  // "Envenenar los datos de entrenamiento."
  { file: '2_47.jpg', startSec: 167.56 },  // "Un modelo aprende de textos e imágenes descargados de Internet."
  { file: '2_51.jpg', startSec: 171.58 },  // "Si controlas una parte diminuta de esos datos,"
  { file: '2_54.jpg', startSec: 174.4, labels: ['PUERTA TRASERA'] },  // "puedes plantar una puerta trasera."
  { file: '2_56.jpg', startSec: 176.86, labels: ['NICOLAS CARLINI', '2023'] },  // "Nicolás Carlini y su equipo demostraron en 2023 que era práctico y barato."
  { file: '3_02.jpg', startSec: 182.1, labels: ['60 $'] },  // "Por unos 60 dólares podían cambiar lo que iba a aprender el modelo. Y en octubre de 2025,"
  { file: '3_08.jpg', startSec: 188.54, labels: ['2025'] },  // "Anthropic publicó algo todavía más incómodo."
  { file: '3_11.jpg', startSec: 191.7, labels: ['250 DOCUMENTOS'] },  // "Con unos 250 documentos envenenados basta para meter una puerta trasera."
  { file: '3_17.jpg', startSec: 197.36 },  // "No necesitas envenenar el 1 por ciento."
  { file: '3_20.jpg', startSec: 200.2, labels: ['SOLO 250'] },  // "Necesitas 250 archivos."
  { file: '3_23.jpg', startSec: 203.92 },  // "Capítulo 3."
  { file: '3_25.jpg', startSec: 205.24, labels: ['¿Y ESTO CÓMO SE ARREGLA?'] },  // "¿Por qué esto no se parcea?"
  { file: '3_27.jpg', startSec: 207.54 },  // "Cuando reglas un bug clásico, el bug desaparece, punto final."
  { file: '3_31.jpg', startSec: 211.88 },  // "Cuando reglas un jailbreak,"
  { file: '3_33.jpg', startSec: 213.52, labels: ['INFINITAS FORMAS'] },  // "no desaparece nada. Pero hay infinitas formas de pedir lo mismo."
  { file: '3_37.jpg', startSec: 217.98, labels: ['2023'] },  // "En julio de 2023,"
  { file: '3_40.jpg', startSec: 220.08, labels: ['CARNEGIE MELLON'] },  // "un equipo de Carnegie Mellon lo dejó por escrito."
  { file: '3_43.jpg', startSec: 223.18, labels: ['Y LO PEOR'] },  // "Y lo peor,"
  { file: '3_44.jpg', startSec: 224.32 },  // "la misma cadena funcionaba en varios modelos distintos a la vez."
  { file: '3_48.jpg', startSec: 228.36, labels: ['NO ERA UN FALLO'] },  // "Eso significa que el ataque no era un fallo de una empresa,"
  { file: '3_51.jpg', startSec: 231.92, labels: ['ES LA TECNOLOGÍA'] },  // "era una propiedad de la tecnología."
  { file: '3_54.jpg', startSec: 234.5, labels: ['99 %'] },  // "Y una defensa que funciona el 99 por ciento de las veces,"
  { file: '3_58.jpg', startSec: 238.12, labels: ['MILLONES'] },  // "a escala de millones de mensajes,"
  { file: '4_00.jpg', startSec: 240.26, labels: ['MILES AL DÍA'] },  // "falla miles de veces al día. Por eso hizo falta gente nueva,"
  { file: '4_04.jpg', startSec: 244.82, labels: ['GENTE NUEVA'] },  // "gente que piensa en lenguaje,"
  { file: '4_06.jpg', startSec: 246.74, labels: ['PIENSA EN LENGUAJE'] },  // "no en memoria."
  { file: '4_08.jpg', startSec: 248.66 },  // "Capítulo 4."
  { file: '4_10.jpg', startSec: 250.04, labels: ['¿Y A TI QUÉ?'] },  // "¿Y esto te afecta a ti?"
  { file: '4_12.jpg', startSec: 252.12, labels: ['MUY BONITO'] },  // "Vale, muy bonito,"
  { file: '4_13.jpg', startSec: 253.54 },  // "pero tú no entrenas modelos. ¿Por qué te importa?"
  { file: '4_16.jpg', startSec: 256.64, labels: ['LE DISTE PERMISOS'] },  // "Porque tú ya le has dado permisos a unaía sin darte cuenta."
  { file: '4_20.jpg', startSec: 260.48, labels: ['LEER', 'ACTUAR'] },  // "Cada vez que un asistente puede leer y además actuar,"
  { file: '4_23.jpg', startSec: 263.6, labels: ['EN TU CASA'] },  // "tienes esta superficie de ataque en casa."
  { file: '4_26.jpg', startSec: 266.64, labels: ['2023'] },  // "Diciembre de 2023,"
  { file: '4_28.jpg', startSec: 268.72 },  // "un concesionario de chebrole en Estados Unidos pone un chat -pot en su web."
  { file: '4_33.jpg', startSec: 273.38, labels: ['1 $'] },  // "Un usuario le convence con un par de frases de aceptar venderle un coche por un dólar."
  { file: '4_39.jpg', startSec: 279.26, labels: ['2024'] },  // "Febrero de 2024,"
  { file: '4_41.jpg', startSec: 281.38 },  // "hercana da pierde ante un tribunal en Canadá."
  { file: '4_44.jpg', startSec: 284.1, labels: ['RESPONSABLE'] },  // "El tribunal decidió que la aerolínea era responsable de lo que había dicho su vot."
  { file: '4_48.jpg', startSec: 288.94, labels: ['TRADUCCIÓN'] },  // "Traducción,"
  { file: '4_50.jpg', startSec: 290.1 },  // "lo que tuía promete,"
  { file: '4_51.jpg', startSec: 291.9, labels: ['LO PAGAS TÚ'] },  // "lo padas tú."
  { file: '4_53.jpg', startSec: 293.28, labels: ['OWASP', '2023'] },  // "Hoas, la referencia mundial en seguridad de aplicaciones publicó en 2023 su top 10 de riesgos para aplicaciones con modelos del lenguaje."
  { file: '5_01.jpg', startSec: 301.16 },  // "El número uno de la lista es la inyección de instrucciones,"
  { file: '5_04.jpg', startSec: 304.3, labels: ['Nº 1'] },  // "el primero,"
  { file: '5_05.jpg', startSec: 305.38 },  // "por encima de todo lo demás."
  { file: '5_07.jpg', startSec: 307.8 },  // "Capítulo 5."
  { file: '5_08.jpg', startSec: 308.96, labels: ['¿CUÁNTO SE GANA?'] },  // "¿Cuánto se gana con esto?"
  { file: '5_10.jpg', startSec: 310.9, labels: ['30.000 €'] },  // "Un pentester junior en España empieza cerca de los 30 .000 euros al año."
  { file: '5_15.jpg', startSec: 315.28, labels: ['70.000 €'] },  // "Un retymer clásico con experiencias se mueve por encima de los 70 .000. Un especialista en seguridad de modelos de ella juega en otra liga."
  { file: '5_23.jpg', startSec: 323.78, labels: ['180.000 $', '300.000 $'] },  // "Las ofertas de AI retymer en Estados Unidos se publican entre 180 .000 y 300 .000 dólares."
  { file: '5_30.jpg', startSec: 330.28 },  // "Y no porque el trabajo sea más difícil,"
  { file: '5_32.jpg', startSec: 332.68, labels: ['CASI NADIE SABE'] },  // "porque hay muy poquísima gente que sepa hacerlo."
  { file: '5_36.jpg', startSec: 336.1, labels: ['RECOMPENSAS'] },  // "Además, está la vía del Book Bounty y ahí ya no hay nómina, hay recompensas."
  { file: '5_40.jpg', startSec: 340.94, labels: ['2023'] },  // "Open AI abrió su programa en abril de 2023 a través de Book Crowd. Anthropic paga hasta 15 .000 dólares por un jailbreak universal en sus sistemas más protegidos."
  { file: '5_51.jpg', startSec: 351.24, labels: ['15.000 $'] },  // "Y Google lanzó en octubre de 2025 un programa dedicado solo a AIA, con premios de hasta 30 .000 dólares por ayazgo."
  { file: '5_59.jpg', startSec: 359.16, labels: ['2025'] },  // "Fíjate en el detalle que importa."
  { file: '6_01.jpg', startSec: 361.12, labels: ['EL DETALLE'] },  // "Aquí el ayazgo no es un exploit de 20 kilobytes."
  { file: '6_04.jpg', startSec: 364.12 },  // "Muchas veces es un párrafo bien escrito."
  { file: '6_06.jpg', startSec: 366.94, labels: ['UN PÁRRAFO'] },  // "En Hacker One, la mayor plataforma de Book Bounty del mundo,"
  { file: '6_10.jpg', startSec: 370.24 },  // "los informes relacionados con AIA se dispararon más de 170 % en un año."
  { file: '6_15.jpg', startSec: 375.9, labels: ['+170 %'] },  // "Y en agosto de 2023, en la Defcon de Las Vegas,"
  { file: '6_19.jpg', startSec: 379.36 },  // "hubo un red timpúblico de modelos generativos."
  { file: '6_21.jpg', startSec: 381.98 },  // "Más de 2000 personas atacando modelos a la vez con apoyo de la Casa Blanca."
  { file: '6_26.jpg', startSec: 386.88 },  // "Cuando un gobierno organiza el ataque,"
  { file: '6_29.jpg', startSec: 389.04, labels: ['YA ES UNA PROFESIÓN'] },  // "es que el ataque ya es una profesión."
  { file: '6_32.jpg', startSec: 392.54 },  // "Capítulo 6,"
  { file: '6_33.jpg', startSec: 393.78, labels: ['LA VENTANA'] },  // "la ventana."
  { file: '6_35.jpg', startSec: 395.0 },  // "Y aquí llega la parte que te prometí al principio."
  { file: '6_37.jpg', startSec: 397.74, labels: ['VACÍO'] },  // "Este hueco estaba cío y estaba cío por un motivo muy concreto."
  { file: '6_42.jpg', startSec: 402.48, labels: ['DOS COSAS'] },  // "Para hacer esto bien necesitas dos cosas que casi nunca van juntas en la misma persona."
  { file: '6_47.jpg', startSec: 407.28 },  // "La gente de seguridad clásica sabe lo primero, pero no lo segundo."
  { file: '6_51.jpg', startSec: 411.4 },  // "La gente de Machine Learning sabe lo segundo, pero nunca ha pensado como un atacante."
  { file: '6_56.jpg', startSec: 416.36, labels: ['SIN COMPETENCIA'] },  // "Quien junta las dos cosas, soy no tiene competencia."
  { file: '6_59.jpg', startSec: 419.68, labels: ['GRATIS', 'LEGAL'] },  // "Literalmente no la tiene."
  { file: '7_01.jpg', startSec: 421.84, labels: ['GANDALF', 'PROMPT AIRLINES'] },  // "Y la puerta de entrada es gratis y legal. Hay laboratorios abiertos hechos para esto,"
  { file: '7_06.jpg', startSec: 426.76, labels: ['TEMARIO GRATIS'] },  // "Gandalf de la Quera y el clásico Prompt Airlines."
  { file: '7_10.jpg', startSec: 430.36, labels: ['AHORA LO HONESTO'] },  // "Añad de la lista de OWASP para modelos del lenguaje y ya tienes el temario ordenado, gratis y en abierto."
  { file: '7_16.jpg', startSec: 436.88, labels: ['NO ES LA MEDIA'] },  // "Ahora la parte honesta porque no te voy a vender humo."
  { file: '7_20.jpg', startSec: 440.42, labels: ['300.000 $'] },  // "Los sueldos de 300 .000 dólares son de Estados Unidos y de las empresas punteras no la media global."
  { file: '7_26.jpg', startSec: 446.74, labels: ['CON PERMISO'] },  // "Y esta ventana no va a estar abierta para siempre, ninguna lo está. Y algo importante,"
  { file: '7_32.jpg', startSec: 452.22, labels: ['ES DELITO'] },  // "todo esto se hace con permiso, en laboratorios o en programas oficiales."
  { file: '7_36.jpg', startSec: 456.5 },  // "Atacar un modelo en producción sin autorización es un delito, exactamente igual que atacar cualquier otro sistema."
  { file: '7_43.jpg', startSec: 463.22, labels: ['LLEGA ANTES'] },  // "Lo que hace que esto se pague no es el ataque,"
  { file: '7_46.jpg', startSec: 466.04 },  // "es el informe que llega antes de que lo haga alguien con malas intenciones."
  { file: '7_50.jpg', startSec: 470.48 },  // "Así que volvamos a la frase del principio."
  { file: '7_52.jpg', startSec: 472.96, labels: ['NO ES EL CÓDIGO'] },  // "Sí, hay un hacker que entra escribiendo sólo una frase. Y esa frase secotiza a 30 .000 dólares porque el fallo no está en el código,"
  { file: '8_01.jpg', startSec: 481.32, labels: ['ES EL COMPORTAMIENTO'] },  // "está en el comportamiento."
  { file: '8_03.jpg', startSec: 483.46, labels: ['SOLO GENTE QUE LO BUSCA'] },  // "No hay parte que lo cierre, sólo hay gente que lo busca."
  { file: '8_07.jpg', startSec: 487.28, labels: ['CABEN EN UN ASCENSOR'] },  // "Y ahora mismo esa gente cabe en un ascensor."
  { file: '8_10.jpg', startSec: 490.96, labels: ['SUSCRÍBETE'] },  // "Si esto te ha volado la cabeza a suscríbete, se viene más de este mundo."
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
        <Img src={staticFile(`hackear-la-ia-notext/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
      {activeFrame && <LabelOverlay labels={activeFrame.labels} seed={activeIndex} />}
    </AbsoluteFill>
  );
};
