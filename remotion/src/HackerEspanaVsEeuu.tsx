import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Cuánto cobra un hacker en España vs EEUU — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Dos personas, mismo examen aprobado, mismo título, la misma habilidad exacta para hackear."
  { file: '0_06.jpg', startSec: 6.94 },  // "Una vive en Madrid,"
  { file: '0_08.jpg', startSec: 8.44 },  // "la otra en San Francisco,"
  { file: '0_10.jpg', startSec: 10.34 },  // "y una de las dos gana casi cuatro veces más que la otra,"
  { file: '0_13.jpg', startSec: 13.84 },  // "por el mismo trabajo."
  { file: '0_15.jpg', startSec: 15.54 },  // "Hoy vamos a poner las dos carreras una al lado de la otra, cifra por cifra, y al final vas a entender exactamente por qué pasa esto,"
  { file: '0_22.jpg', startSec: 22.94 },  // "y qué puedes hacer tú si estás en el lado que pierde."
  { file: '0_26.jpg', startSec: 26.52 },  // "Capítulo 1,"
  { file: '0_27.jpg', startSec: 27.68 },  // "el mismo punto de partida. En los dos países el camino empieza exactamente igual,"
  { file: '0_33.jpg', startSec: 33.18 },  // "aprendes redes,"
  { file: '0_34.jpg', startSec: 34.04 },  // "aprendes Linux,"
  { file: '0_35.jpg', startSec: 35.12 },  // "aprendes a leer un escaneo de puertos,"
  { file: '0_37.jpg', startSec: 37.38 },  // "aprendes qué es una vulnerabilidad y qué es explotar la de verdad, no solo leerla en un informe."
  { file: '0_43.jpg', startSec: 43.28 },  // "Prácticas en máquinas virtuales pensadas para romperse,"
  { file: '0_46.jpg', startSec: 46.34 },  // "hack de box,"
  { file: '0_47.jpg', startSec: 47.18 },  // "try hack me,"
  { file: '0_48.jpg', startSec: 48.36 },  // "y en algún momento sacas la certificación que de verdad abre puertas. El lo es es qué, 24 horas de examen hackeando máquinas reales sin ayuda,"
  { file: '0_57.jpg', startSec: 57.32 },  // "sin conexión con nadie."
  { file: '0_59.jpg', startSec: 59.3 },  // "Ese papel dice exactamente lo mismo en España que en California,"
  { file: '1_03.jpg', startSec: 63.22 },  // "esta persona sabe entrar donde no debería, con permiso,"
  { file: '1_06.jpg', startSec: 66.42 },  // "y explicarlo por escrito de forma que una empresa pueda arreglarlo."
  { file: '1_10.jpg', startSec: 70.5 },  // "Hasta aquí,"
  { file: '1_11.jpg', startSec: 71.56 },  // "cero diferencia,"
  { file: '1_12.jpg', startSec: 72.8 },  // "mismo examen, mismo aprobado,"
  { file: '1_14.jpg', startSec: 74.92 },  // "mismo nivel real."
  { file: '1_16.jpg', startSec: 76.54 },  // "La diferencia empieza el día que firmas tu primer contrato,"
  { file: '1_20.jpg', startSec: 80.24 },  // "y no tiene nada que ver con tu talento."
  { file: '1_23.jpg', startSec: 83.1 },  // "Capítulo 2, la oferta en España."
  { file: '1_26.jpg', startSec: 86.0 },  // "En España, un pentester junior recién salido con su OECP, firma un contrato."
  { file: '1_31.jpg', startSec: 91.54 },  // "La cifra ronda los 28 .000 euros brutos al año."
  { file: '1_35.jpg', startSec: 95.22 },  // "Con 3 o 4 años de experiencia,"
  { file: '1_37.jpg', startSec: 97.26 },  // "ya como consultor de seguridad ofensiva,"
  { file: '1_39.jpg', startSec: 99.68 },  // "esa cifra suba 40 .000. Y si llegas a Red Teamer Senior,"
  { file: '1_43.jpg', startSec: 103.86 },  // "en una consultora grande o dentro de un banco,"
  { file: '1_46.jpg', startSec: 106.38 },  // "puede superar los 65 .000 euros al año."
  { file: '1_49.jpg', startSec: 109.5 },  // "Es un buen sueldo para España,"
  { file: '1_51.jpg', startSec: 111.58 },  // "está claramente por encima de la media nacional con algura."
  { file: '1_55.jpg', startSec: 115.16 },  // "Pero el techo existe,"
  { file: '1_56.jpg', startSec: 116.64 },  // "y se nota rápido en cuanto lleva a unos años en el sector."
  { file: '1_59.jpg', startSec: 119.94 },  // "Muy pocas empresas en España pagan de verdad más de 80 .000 euros a un solo hacker,"
  { file: '2_04.jpg', startSec: 124.98 },  // "por muy bueno que sea,"
  { file: '2_06.jpg', startSec: 126.28 },  // "por muy senior que sea. Y no es solo el sueldo bruto,"
  { file: '2_10.jpg', startSec: 130.46 },  // "encima hay que descontar un tramo de IRPF que en esos niveles ronda el 45%."
  { file: '2_16.jpg', startSec: 136.6 },  // "El mercado del Bag Bounty ayuda a compensar,"
  { file: '2_19.jpg', startSec: 139.58 },  // "encontrar un fallo grave en una empresa internacional se paga en dólares,"
  { file: '2_23.jpg', startSec: 143.26 },  // "no en euros,"
  { file: '2_24.jpg', startSec: 144.16 },  // "y eso sube bastante la media real."
  { file: '2_26.jpg', startSec: 146.66 },  // "Pero como sueldo fijo, con nómina española, con contrato indefinido de toda la vida,"
  { file: '2_31.jpg', startSec: 151.62 },  // "el recorrido tiene un límite bastante claro y bastante bajo."
  { file: '2_35.jpg', startSec: 155.52 },  // "Capítulo 3."
  { file: '2_36.jpg', startSec: 156.92 },  // "La oferta en Estados Unidos."
  { file: '2_39.jpg', startSec: 159.24 },  // "Cruza el charco,"
  { file: '2_40.jpg', startSec: 160.48 },  // "y el mismo currículum, con el mismo OSCCP,"
  { file: '2_43.jpg', startSec: 163.48 },  // "entra en otra escala completamente distinta."
  { file: '2_46.jpg', startSec: 166.66 },  // "Un pentester junior en Estados Unidos empieza cerca de los 90 .000 dólares al año."
  { file: '2_51.jpg', startSec: 171.78 },  // "Con experiencia real,"
  { file: '2_53.jpg', startSec: 173.18 },  // "un consultor de seguridad ofensiva supera los 120 .000 dólares sin demasiado esfuerzo. Y un red teamer senior,"
  { file: '3_00.jpg', startSec: 180.44 },  // "en una empresa tecnológica grande en San Francisco o en Seattle,"
  { file: '3_04.jpg', startSec: 184.2 },  // "puede firmar por 170 .000 dólares o más,"
  { file: '3_07.jpg', startSec: 187.14 },  // "solo en salario base."
  { file: '3_09.jpg', startSec: 189.24 },  // "Y ahí no acaba la cosa,"
  { file: '3_10.jpg', startSec: 190.94 },  // "sumas el bonus anual y las acciones de la empresa,"
  { file: '3_13.jpg', startSec: 193.76 },  // "y la cifra total sube todavía más, a veces muy por encima del salario base."
  { file: '3_18.jpg', startSec: 198.58 },  // "El Bag Bounty en Estados Unidos juega directamente en otra liga, en otro planeta. Encontrar un solo fallo crítico en Google o en Apple puede pagar más de 100 .000 dólares,"
  { file: '3_29.jpg', startSec: 209.18 },  // "por un solo halladgo, en un solo informe."
  { file: '3_32.jpg', startSec: 212.1 },  // "En 2019, un chaval argentino de 19 años, Santiago López,"
  { file: '3_36.jpg', startSec: 216.8 },  // "se convirtió en el primer hackerético millonario del mundo,"
  { file: '3_40.jpg', startSec: 220.18 },  // "encontrando fallos para hacker one,"
  { file: '3_42.jpg', startSec: 222.52 },  // "sin pisar Estados Unidos siquiera."
  { file: '3_44.jpg', startSec: 224.98 },  // "Apple ha llegado a pagar hasta dos millones de dólares por un solo exploit de los grandes,"
  { file: '3_49.jpg', startSec: 229.76 },  // "acceso remoto completo, sin que la víctima toque nada."
  { file: '3_53.jpg', startSec: 233.66 },  // "Esa nivel de pago no existe en ningún mercado europeo ni de lejos,"
  { file: '3_57.jpg', startSec: 237.78 },  // "ni de cerca."
  { file: '3_59.jpg', startSec: 239.24 },  // "Y hay algo más,"
  { file: '4_00.jpg', startSec: 240.66 },  // "en Estados Unidos,"
  { file: '4_01.jpg', startSec: 241.78 },  // "un red teamer con nombre reconocido en el sector puede cobrar por dar charlas, por escribir herramientas, por asesorada start -ups encima de su sueldo fijo."
  { file: '4_11.jpg', startSec: 251.52 },  // "Capítulo 4."
  { file: '4_12.jpg', startSec: 252.88 },  // "¿Por qué pasa esto de verdad?"
  { file: '4_15.jpg', startSec: 255.22 },  // "La pregunta obligada es,"
  { file: '4_17.jpg', startSec: 257.0 },  // "¿por qué tanta diferencia si el trabajo es literalmente idéntico?"
  { file: '4_21.jpg', startSec: 261.44 },  // "La primera razón es donde está el dinero de verdad."
  { file: '4_24.jpg', startSec: 264.98 },  // "Silicón vale y concentra las empresas que más pagan por seguridad,"
  { file: '4_28.jpg', startSec: 268.74 },  // "porque un fallo hay cuesta miles de millones,"
  { file: '4_31.jpg', startSec: 271.18 },  // "no miles de euros."
  { file: '4_32.jpg', startSec: 272.7 },  // "La segunda razón es el coste de vida, y aquí hay que ser honestos, no solo repetir la cifra grande. Un alquiler en San Francisco puede costar el triple que uno en Madrid,"
  { file: '4_42.jpg', startSec: 282.02 },  // "y la sanidad allí no es gratuita como aquí."
  { file: '4_45.jpg', startSec: 285.32 },  // "Ajustando por poder adquisitivo real,"
  { file: '4_47.jpg', startSec: 287.64 },  // "la diferencia se reduce bastante,"
  { file: '4_49.jpg', startSec: 289.52 },  // "pero sigue siendo enorme."
  { file: '4_51.jpg', startSec: 291.12 },  // "Sigue quedando un sueldo casi el doble de bueno en términos reales, no solo en el número que ves en la oferta."
  { file: '4_57.jpg', startSec: 297.42 },  // "Y la tercera razón es la más incómoda de las tres."
  { file: '5_01.jpg', startSec: 301.26 },  // "En España todavía se paga la seguridad informática como un coste que hay que minimizar,"
  { file: '5_05.jpg', startSec: 305.88 },  // "no como un seguro que hay que reforzar."
  { file: '5_08.jpg', startSec: 308.4 },  // "En Estados Unidos,"
  { file: '5_09.jpg', startSec: 309.78 },  // "tras más de una de cada de brechas que han costado miles de millones a empresas que cotizan en bolsa,"
  { file: '5_15.jpg', startSec: 315.24 },  // "pagar bien a quien te protege se entiende como inversión,"
  { file: '5_18.jpg', startSec: 318.4 },  // "no como gasto que recortar en la próxima crisis."
  { file: '5_21.jpg', startSec: 321.7 },  // "Mismo examen,"
  { file: '5_23.jpg', startSec: 323.24 },  // "mismas manos,"
  { file: '5_24.jpg', startSec: 324.34 },  // "mismo talento exacto."
  { file: '5_26.jpg', startSec: 326.12 },  // "¿El mercado que hay detrás de cada uno?"
  { file: '5_28.jpg', startSec: 328.56 },  // "No."
  { file: '5_29.jpg', startSec: 329.58 },  // "Y esa diferencia de cultura empresarial pesa más, a largo plazo,"
  { file: '5_33.jpg', startSec: 333.64 },  // "que cualquier tabla de sueldos."
  { file: '5_36.jpg', startSec: 336.44 },  // "Capítulo 5,"
  { file: '5_37.jpg', startSec: 337.9 },  // "cara a cara, con matices,"
  { file: '5_39.jpg', startSec: 339.62 },  // "sin trampas."
  { file: '5_41.jpg', startSec: 341.06 },  // "Pongamos las tifras una al lado de la otra sin exagerar ninguna de las dos."
  { file: '5_45.jpg', startSec: 345.42 },  // "España,"
  { file: '5_46.jpg', startSec: 346.34 },  // "entre 28 .000 y 65 .000 euros de sueldo fijo,"
  { file: '5_50.jpg', startSec: 350.02 },  // "techo bajo,"
  { file: '5_50_b.jpg', startSec: 350.88 },  // "pero coste de vida también bajo y sanidad pública incluida."
  { file: '5_54.jpg', startSec: 354.46 },  // "Estados Unidos,"
  { file: '5_55.jpg', startSec: 355.64 },  // "entre 90 .000 y 170 .000 dólares de sueldo fijo,"
  { file: '5_59.jpg', startSec: 359.32 },  // "techo altísimo,"
  { file: '6_00.jpg', startSec: 360.56 },  // "pero alquiler y seguro médico privado que se comen una parte real de esa ventaja cada mes."
  { file: '6_05.jpg', startSec: 365.66 },  // "Y aquí está el dato que casi nadie cuenta cuando compara estas dos tifras."
  { file: '6_10.jpg', startSec: 370.16 },  // "Hoy, en 2026,"
  { file: '6_12.jpg', startSec: 372.12 },  // "no hace falta mudarte de país para cobrar en dólares."
  { file: '6_15.jpg', startSec: 375.22 },  // "Cada vez más empresas estadounidenses contratan seguridad ofensiva en remoto puro sin pedir que vivas allí."
  { file: '6_21.jpg', startSec: 381.62 },  // "Y el Bag Bounty se cobra desde cualquier país del mundo, sin visado, sin permiso de trabajo,"
  { file: '6_26.jpg', startSec: 386.8 },  // "con solo una cuenta y una cuenta bancaria que reciba transferencias."
  { file: '6_30.jpg', startSec: 390.78 },  // "Hay hackers españoles que nunca han pisado Estados Unidos y facturan en dólares cada mes desde su casa en Valencia o en Bilbao."
  { file: '6_38.jpg', startSec: 398.44 },  // "La frontera que de verdad importa hoy ya no es el pasaporte que llevas en el cajón."
  { file: '6_43.jpg', startSec: 403.42 },  // "Es el idioma en el que escribes tus informes,"
  { file: '6_46.jpg', startSec: 406.22 },  // "la reputación que construyes en plataformas como hacker one y el nivel real de tu habilidad, medido contra el resto del mundo,"
  { file: '6_53.jpg', startSec: 413.2 },  // "no solo contra tu ciudad."
  { file: '6_56.jpg', startSec: 416.1 },  // "Capítulo 6."
  { file: '6_57.jpg', startSec: 417.3 },  // "El cierre"
  { file: '6_58.jpg', startSec: 418.66 },  // "Así que si tienes esta habilidad hoy mismo,"
  { file: '7_01.jpg', startSec: 421.38 },  // "la pregunta ya no es España o Estados Unidos."
  { file: '7_04.jpg', startSec: 424.42 },  // "La pregunta real es si vas a competir solo en el mercado local o si te atreves a competir en el mercado global desde el primer día."
  { file: '7_12.jpg', startSec: 432.52 },  // "La puerta de entrada es exactamente la misma para los dos caminos y además es gratis,"
  { file: '7_17.jpg', startSec: 437.62 },  // "hack de box,"
  { file: '7_18.jpg', startSec: 438.5 },  // "try hack me y después el OSCP cuando estés listo."
  { file: '7_22.jpg', startSec: 442.88 },  // "La diferencia de sueldo no está escrita en el pasaporte que tienes guardado en un cajón."
  { file: '7_27.jpg', startSec: 447.64 },  // "Está en para qué mercado decides trabajar en qué idioma escribes tus informes y en sitio animas a subir tu primera yadgo a una plataforma internacional en vez de guardártelo."
  { file: '7_38.jpg', startSec: 458.3 },  // "El talento, ya lo hemos visto,"
  { file: '7_40.jpg', startSec: 460.54 },  // "es exactamente el mismo a los dos lados del océano."
  { file: '7_44.jpg', startSec: 464.18 },  // "Si esta comparación te has sorprendido, suscríbete,"
  { file: '7_47.jpg', startSec: 467.36 },  // "se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'scale_tip.mp3', startSec: 10.34, volume: 0.15 },
  { file: 'count_1.mp3', startSec: 26.52, volume: 0.15 },
  { file: 'keyboard_type.mp3', startSec: 33.18, volume: 0.13 },
  { file: 'terminal_beep.mp3', startSec: 46.34, volume: 0.14 },
  { file: 'clock_ticking.mp3', startSec: 48.36, volume: 0.14 },
  { file: 'stamp_approve.mp3', startSec: 63.22, volume: 0.16 },
  { file: 'equal_ding.mp3', startSec: 71.56, volume: 0.15 },
  { file: 'pen_sign.mp3', startSec: 76.54, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 83.1, volume: 0.15 },
  { file: 'cash_small.mp3', startSec: 91.54, volume: 0.15 },
  { file: 'cash_medium.mp3', startSec: 99.68, volume: 0.15 },
  { file: 'cash_bigger.mp3', startSec: 106.38, volume: 0.16 },
  { file: 'ceiling_thud.mp3', startSec: 115.16, volume: 0.15 },
  { file: 'scissors_snip.mp3', startSec: 130.46, volume: 0.15 },
  { file: 'bug_ping.mp3', startSec: 139.58, volume: 0.15 },
  { file: 'count_3.mp3', startSec: 155.52, volume: 0.15 },
  { file: 'whoosh_jump.mp3', startSec: 159.24, volume: 0.16 },
  { file: 'cash_big.mp3', startSec: 166.66, volume: 0.16 },
  { file: 'cash_bigger2.mp3', startSec: 173.18, volume: 0.16 },
  { file: 'cash_huge.mp3', startSec: 184.2, volume: 0.17 },
  { file: 'sparkle_bonus.mp3', startSec: 190.94, volume: 0.16 },
  { file: 'cosmic_reveal.mp3', startSec: 198.58, volume: 0.17 },
  { file: 'million_hit.mp3', startSec: 216.8, volume: 0.17 },
  { file: 'million_hit2.mp3', startSec: 224.98, volume: 0.17 },
  { file: 'count_4.mp3', startSec: 251.52, volume: 0.15 },
  { file: 'bite_chunk.mp3', startSec: 360.56, volume: 0.15 },
  { file: 'count_5.mp3', startSec: 336.44, volume: 0.15 },
  { file: 'laptop_connect.mp3', startSec: 375.22, volume: 0.15 },
  { file: 'count_6.mp3', startSec: 416.1, volume: 0.15 },
  { file: 'door_open.mp3', startSec: 432.52, volume: 0.15 },
  { file: 'subscribe.mp3', startSec: 464.18, volume: 0.17 },
];

// Música del canal: clip de 30 s repetido con Loop. A Loop se le pasa la duración de UNA
// iteración (el clip), nunca la del vídeo.
const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const HackerEspanaVsEeuu: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('hacker-espana-vs-eeuu.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`hacker-espana-vs-eeuu-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`hacker-espana-vs-eeuu-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`hacker-espana-vs-eeuu/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
