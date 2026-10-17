import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-estafa-que-te-pueden-hacer-en-espana - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Estás en Esofa,
  { file: '0_01.jpg', startSec: 1.28 },  // te vibra el móvil.
  { file: '0_02.jpg', startSec: 2.74 },  // Es un SMS de tu banco,
  { file: '0_04.jpg', startSec: 4.74 },  // en el mismo hilo que los de verdad.
  { file: '0_06.jpg', startSec: 6.98 },  // ¿A alguien ha hecho un cargo enorme con tu tarjeta?
  { file: '0_09.jpg', startSec: 9.76 },  // ¿Y te dan un teléfono para pararlo?
  { file: '0_11.jpg', startSec: 11.94 },  // ¿Estu banco?
  { file: '0_12.jpg', startSec: 12.94 },  // No.
  { file: '0_13.jpg', startSec: 13.86 },  // Y es solo la estafa más común.
  { file: '0_16.jpg', startSec: 16.32 },  // En 2024, la policía registró más de 412 .000 estafas por Internet en España.
  { file: '0_22.jpg', startSec: 22.64 },  // Aquí van diez, de la más común,
  { file: '0_24.jpg', startSec: 24.5 },  // a la más rara.
  { file: '0_25.jpg', startSec: 25.8 },  // Y la última empezó en una web de fans de un actor de Hollywood,
  { file: '0_29.jpg', startSec: 29.08 },  // ¿A divinas de cual?
  { file: '0_30.jpg', startSec: 30.94 },  // Número 1, el SMS del banco,
  { file: '0_33.jpg', startSec: 33.44 },  // el febo.
  { file: '0_34.jpg', startSec: 34.58 },  // Ya viste de un cargo que nunca has hecho y te da un número para anularlo.
  { file: '0_38.jpg', startSec: 38.5 },  // Septiembre de 2021,
  { file: '0_40.jpg', startSec: 40.5 },  // la Guardia Civil cierra la operación Ibermelo.
  { file: '0_43.jpg', startSec: 43.24 },  // Su centro podía mandar más de 100 .000 SMS falsos a la hora.
  { file: '0_48.jpg', startSec: 48.2 },  // 29 detenidos y más de un millón de euros robados.
  { file: '0_52.jpg', startSec: 52.02 },  // ¿Cómo pillarla?
  { file: '0_53.jpg', startSec: 53.42 },  // Nunca llames al número del mensaje.
  { file: '0_55.jpg', startSec: 55.56 },  // Abretula, app de tu banco.
  { file: '0_57.jpg', startSec: 57.54 },  // Su estilo te asusta con un cargo y el cargo llega cuando le llamas.
  { file: '1_02.jpg', startSec: 62.74 },  // Número 2, la multa falsa,
  { file: '1_04.jpg', startSec: 64.92 },  // el cobrador.
  { file: '1_06.jpg', startSec: 66.1 },  // Te escribe la DGT o correos,
  { file: '1_08.jpg', startSec: 68.74 },  // tienes algo pendiente por unos céntimos.
  { file: '1_11.jpg', startSec: 71.26 },  // Incibe avisó de uno de correos,
  { file: '1_13.jpg', startSec: 73.34 },  // pedía 80 céntimos por volver a enviarte un paquete.
  { file: '1_16.jpg', startSec: 76.62 },  // ¿Para qué quieren 80 céntimos?
  { file: '1_18.jpg', startSec: 78.88 },  // No los quieren,
  { file: '1_19.jpg', startSec: 79.76 },  // quieren tu tarjeta.
  { file: '1_21.jpg', startSec: 81.34 },  // ¿Cómo pillarla?
  { file: '1_22.jpg', startSec: 82.5 },  // La DGT solo avisa por carta o por subuzón oficial,
  { file: '1_25.jpg', startSec: 85.92 },  // ninguna multa suya lleva enlaces.
  { file: '1_28.jpg', startSec: 88.46 },  // Su estilo te pide 80 céntimos y se queda con todo lo demás.
  { file: '1_33.jpg', startSec: 93.66 },  // Número 3,
  { file: '1_34.jpg', startSec: 94.48 },  // el hola mamá,
  { file: '1_35.jpg', startSec: 95.56 },  // el hijo falso.
  { file: '1_37.jpg', startSec: 97.26 },  // Hola mamá, se me ha roto el móvil,
  { file: '1_38.jpg', startSec: 98.94 },  // este es mi número nuevo.
  { file: '1_40.jpg', startSec: 100.66 },  // Al rato te pide dinero,
  { file: '1_42.jpg', startSec: 102.22 },  // es urgente.
  { file: '1_43.jpg', startSec: 103.7 },  // En febrero de 2024,
  { file: '1_45.jpg', startSec: 105.58 },  // la policía nacional de tubo a 65 personas por este timo. En un portátil guardaban más de 500 hojas de cálculo,
  { file: '1_52.jpg', startSec: 112.8 },  // llenas de datos de posibles víctimas.
  { file: '1_55.jpg', startSec: 115.14 },  // Con inteligencia artificial ya imitan hasta la voz.
  { file: '1_58.jpg', startSec: 118.68 },  // ¿Cómo pillarla?
  { file: '1_59.jpg', startSec: 119.86 },  // Llama a tu hijo a su número de siempre.
  { file: '2_02.jpg', startSec: 122.26 },  // Su estilo,
  { file: '2_03.jpg', startSec: 123.38 },  // tu hijo de siempre,
  { file: '2_04.jpg', startSec: 124.62 },  // con un número que nunca has visto.
  { file: '2_07.jpg', startSec: 127.16 },  // Número 4, el vízum inverso, el comprador al revés.
  { file: '2_11.jpg', startSec: 131.3 },  // Vendes algo en internet,
  { file: '2_12.jpg', startSec: 132.7 },  // alguien te lo quiere pagar por vízum,
  { file: '2_14.jpg', startSec: 134.74 },  // pero aquí viene lo raro. Dice que el pago lo tienes que aceptar tu.
  { file: '2_18.jpg', startSec: 138.86 },  // Aceptas y el dinero sale de tu cuenta.
  { file: '2_21.jpg', startSec: 141.72 },  // En 2025, la policía nacional desarticuló una red así en Cádiz,
  { file: '2_26.jpg', startSec: 146.68 },  // 207 víctimas.
  { file: '2_29.jpg', startSec: 149.02 },  // ¿Cómo pillarla?
  { file: '2_30.jpg', startSec: 150.38 },  // Para cobrar un vízum nunca tienes que aceptar nada,
  { file: '2_33.jpg', startSec: 153.22 },  // si aceptas estás pagando.
  { file: '2_35.jpg', startSec: 155.62 },  // Su estilo dice que te paga y le paga a su.
  { file: '2_39.jpg', startSec: 159.26 },  // Número 5,
  { file: '2_40.jpg', startSec: 160.5 },  // la llamada del banco,
  { file: '2_41.jpg', startSec: 161.78 },  // el doble.
  { file: '2_42.jpg', startSec: 162.78 },  // Te llama tu banco,
  { file: '2_44.jpg', startSec: 164.04 },  // en la pantalla sale su número de verdad,
  { file: '2_46.jpg', startSec: 166.4 },  // pero ese spufing falsifica en el número que ves.
  { file: '2_49.jpg', startSec: 169.84 },  // En 2022, la policía nacional detuvo a 8 personas que lo hacían, casi 3 millones de euros.
  { file: '2_56.jpg', startSec: 176.22 },  // Te pedía a los códigos del móvil para anular la operación,
  { file: '2_59.jpg', startSec: 179.38 },  // pero cada código no la anulaba,
  { file: '3_01.jpg', startSec: 181.62 },  // la aprobaba.
  { file: '3_03.jpg', startSec: 183.02 },  // ¿Cómo pillarla?
  { file: '3_04.jpg', startSec: 184.24 },  // Cuelga y llama tu al número de tu tarjeta.
  { file: '3_07.jpg', startSec: 187.6 },  // Su estilo tiene la voz de tu banco y la cartera de otro.
  { file: '3_11.jpg', startSec: 191.78 },  // Número 6,
  { file: '3_12.jpg', startSec: 192.98 },  // el falso técnico, el que nadie ha llamado.
  { file: '3_15.jpg', startSec: 195.98 },  // Te llaman de Microsoft,
  { file: '3_17.jpg', startSec: 197.3 },  // tu ordenador tiene un virus,
  { file: '3_18.jpg', startSec: 198.8 },  // en octubre de 2026 se juzgó en vivo a una red así.
  { file: '3_22.jpg', startSec: 202.72 },  // El que llamaba se hacía llamar Harrison guiaba a sus víctimas durante horas,
  { file: '3_27.jpg', startSec: 207.72 },  // al final les habían vaciado las cuentas.
  { file: '3_30.jpg', startSec: 210.54 },  // Cerca de 60 mil euros.
  { file: '3_32.jpg', startSec: 212.64 },  // ¿Cómo pillarla?
  { file: '3_34.jpg', startSec: 214.1 },  // Microsoft nunca te llama para arreglarte el ordenador.
  { file: '3_37.jpg', startSec: 217.12 },  // Su estilo viene a quitarte un virus, y el virus es él.
  { file: '3_42.jpg', startSec: 222.2 },  // Y ahora empiezan las raras.
  { file: '3_44.jpg', startSec: 224.18 },  // Número 7,
  { file: '3_45.jpg', startSec: 225.1 },  // el alquiler fantasma,
  { file: '3_46.jpg', startSec: 226.52 },  // la casera de mentira.
  { file: '3_48.jpg', startSec: 228.34 },  // Encuentras un piso en idealista, lo visitas, firmas y te da las llaves.
  { file: '3_53.jpg', startSec: 233.22 },  // Febrero de 2026,
  { file: '3_55.jpg', startSec: 235.36 },  // la Policía Nacional detiene en Madrid a una mujer de 40 años.
  { file: '3_59.jpg', startSec: 239.32 },  // Reservaba pisos en Airbnb y los anunciaba como alquiler de larga duración. Firmaba con varios inquilinos a la 
  { file: '4_09.jpg', startSec: 249.78 },  // ¿Cómo pillarla?
  { file: '4_11.jpg', startSec: 251.34 },  // Ver el piso no basta,
  { file: '4_12.jpg', startSec: 252.78 },  // pide la nota simple del registro,
  { file: '4_14.jpg', startSec: 254.62 },  // ahí sale el dueña de verdad.
  { file: '4_16.jpg', startSec: 256.68 },  // Su estilo,
  { file: '4_17.jpg', startSec: 257.76 },  // te enseña el piso,
  { file: '4_18.jpg', startSec: 258.92 },  // pero el piso nunca fue suyo.
  { file: '4_21.jpg', startSec: 261.18 },  // Número 8,
  { file: '4_22.jpg', startSec: 262.28 },  // el famoso falso,
  { file: '4_23.jpg', startSec: 263.72 },  // el anuncio de mentira.
  { file: '4_25.jpg', startSec: 265.54 },  // Un famoso te recomienda invertir en criptomonedas,
  { file: '4_28.jpg', startSec: 268.4 },  // su cara,
  { file: '4_29.jpg', startSec: 269.12 },  // su voz,
  { file: '4_30.jpg', startSec: 270.02 },  // hechas con inteligencia artificial. Abril de 2025,
  { file: '4_34.jpg', startSec: 274.54 },  // cae una red en alicante,
  { file: '4_36.jpg', startSec: 276.14 },  // 19 millones de euros,
  { file: '4_38.jpg', startSec: 278.14 },  // 208 víctimas.
  { file: '4_40.jpg', startSec: 280.28 },  // Y cuando lo perdías todo volvían a escribirte,
  { file: '4_43.jpg', startSec: 283.06 },  // como falsos agentes de Europol para cobrarte los impuestos de recuperarlo.
  { file: '4_47.jpg', startSec: 287.82 },  // ¿Cómo pillarla?
  { file: '4_49.jpg', startSec: 289.18 },  // Si te promete en ganarse en riesgo, es una estafa.
  { file: '4_52.jpg', startSec: 292.6 },  // Su estilo,
  { file: '4_53.jpg', startSec: 293.62 },  // te estafa dos veces y la segunda vestido de policía.
  { file: '4_57.jpg', startSec: 297.58 },  // Número 9,
  { file: '4_58.jpg', startSec: 298.8 },  // el SIM Swapping,
  { file: '5_00.jpg', startSec: 300.2 },  // el ladrón de tu número.
  { file: '5_01.jpg', startSec: 301.74 },  // Un día tu móvil se queda sin cobertura,
  { file: '5_04.jpg', startSec: 304.34 },  // tu número ya está en otra tarjeta y los códigos del banco le llegan a otro.
  { file: '5_09.jpg', startSec: 309.18 },  // Diciembre de 2024,
  { file: '5_11.jpg', startSec: 311.3 },  // cae una red de los trimitarios en Barcelona y Tarragona,
  { file: '5_14.jpg', startSec: 314.6 },  // 20 detenidos,
  { file: '5_15.jpg', startSec: 315.76 },  // 429 mil euros y al menos 100 identidades robadas.
  { file: '5_20.jpg', startSec: 320.62 },  // ¿Cómo pillarla?
  { file: '5_22.jpg', startSec: 322.06 },  // Si te queda sin cobertura sin motivo,
  { file: '5_23.jpg', startSec: 323.96 },  // llama a tu operadora.
  { file: '5_25.jpg', startSec: 325.5 },  // Su estilo,
  { file: '5_26.jpg', startSec: 326.5 },  // nunca te roba el móvil,
  { file: '5_28.jpg', startSec: 328.02 },  // te roba el número.
  { file: '5_29.jpg', startSec: 329.42 },  // Y llegamos a la última,
  { file: '5_31.jpg', startSec: 331.06 },  // la más rara de todas.
  { file: '5_32.jpg', startSec: 332.88 },  // Número 10,
  { file: '5_34.jpg', startSec: 334.02 },  // la estafa del amor,
  { file: '5_35.jpg', startSec: 335.42 },  // el novio de película.
  { file: '5_37.jpg', startSec: 337.4 },  // Conoces a alguien por internet,
  { file: '5_39.jpg', startSec: 339.24 },  // te promete un futuro juntos y un día necesita dinero.
  { file: '5_43.jpg', startSec: 343.08 },  // Agosto de 2023,
  { file: '5_45.jpg', startSec: 345.08 },  // una mujer de granada denuncia que le han quitado 175 mil euros.
  { file: '5_49.jpg', startSec: 349.48 },  // La guardia civil encuentra otra víctima en bizcaya.
  { file: '5_52.jpg', startSec: 352.48 },  // Las dos venían de la misma web de fans. En un registro apareció una agenda,
  { file: '5_57.jpg', startSec: 357.46 },  // con las frases que usaban para engañarlas.
  { file: '6_00.jpg', startSec: 360.34 },  // Volvamos a la pregunta,
  { file: '6_01.jpg', startSec: 361.98 },  // ¿de qué actor era la web?
  { file: '6_04.jpg', startSec: 364.06 },  // Brad Pitt,
  { file: '6_05.jpg', startSec: 365.18 },  // las dos creían salir con Brad Pitt y él les propuso invertir juntos.
  { file: '6_10.jpg', startSec: 370.84 },  // 325 mil euros entre las dos.
  { file: '6_13.jpg', startSec: 373.64 },  // ¿Cómo pillarla?
  { file: '6_15.jpg', startSec: 375.0 },  // Si alguien a quien nunca has visto te pide dinero, es una estafa.
  { file: '6_19.jpg', startSec: 379.08 },  // Su estilo,
  { file: '6_20.jpg', startSec: 380.12 },  // la única estafa que te rompe el corazón y la cuenta.
  { file: '6_24.jpg', startSec: 384.3 },  // ¿Y tú?
  { file: '6_25.jpg', startSec: 385.5 },  // ¿Cuál de las diez te ha llegado ya?
  { file: '6_27.jpg', startSec: 387.46 },  // Te leo en los comentarios.
  { file: '6_29.jpg', startSec: 389.7 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '6_34.jpg', startSec: 394.68 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'phone_notify.mp3', startSec: 1.3, volume: 0.13 },
  { file: 'question_sting.mp3', startSec: 12.5, volume: 0.13 },
  { file: 'hard_no.mp3', startSec: 13.6, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 29, volume: 0.13 },
  { file: 'sms_flood.mp3', startSec: 35, volume: 0.13 },
  { file: 'cash_register.mp3', startSec: 48, volume: 0.13 },
  { file: 'coin_clink.mp3', startSec: 73, volume: 0.13 },
  { file: 'chat_ping.mp3', startSec: 97, volume: 0.13 },
  { file: 'money_whoosh.mp3', startSec: 139, volume: 0.13 },
  { file: 'stat_reveal.mp3', startSec: 147, volume: 0.13 },
  { file: 'phone_ring.mp3', startSec: 163, volume: 0.13 },
  { file: 'phone_hangup.mp3', startSec: 184, volume: 0.13 },
  { file: 'phone_ring.mp3', startSec: 196, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 222, volume: 0.13 },
  { file: 'key_jingle.mp3', startSec: 239, volume: 0.13 },
  { file: 'digital_glitch.mp3', startSec: 270, volume: 0.13 },
  { file: 'police_sting.mp3', startSec: 283, volume: 0.13 },
  { file: 'signal_lost.mp3', startSec: 302, volume: 0.13 },
  { file: 'mystery_drone.mp3', startSec: 331, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 364, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 390, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const CadaEstafaQueTePuedenHacerEnEspana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-estafa-que-te-pueden-hacer-en-espana.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
