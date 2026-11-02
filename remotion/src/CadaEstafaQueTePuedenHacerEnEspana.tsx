import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-estafa-que-te-pueden-hacer-en-espana - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[]; fx?: string }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Estás en Esofa,
  { file: '0_01.jpg', startSec: 1.28 },  // te vibra el móvil.
  { file: '0_02.jpg', startSec: 2.74 },  // Es un SMS de tu banco,
  { file: '0_04.jpg', startSec: 4.74 },  // en el mismo hilo que los de verdad.
  { file: '0_06.jpg', startSec: 6.98, fx: 'pop' },  // ¿A alguien ha hecho un cargo enorme con tu tarjeta?
  { file: '0_09.jpg', startSec: 9.76, fx: 'pop' },  // ¿Y te dan un teléfono para pararlo?
  { file: '0_11.jpg', startSec: 11.94, fx: 'pop' },  // ¿Estu banco?
  { file: '0_12.jpg', startSec: 12.94 },  // No.
  { file: '0_13.jpg', startSec: 13.86 },  // Y es solo la estafa más común.
  { file: '0_16.jpg', startSec: 16.32, fx: 'pop' },  // En 2024, la policía registró más de 412 .000 estafas por Internet en España.
  { file: '0_22.jpg', startSec: 22.64 },  // Aquí van diez, de la más común,
  { file: '0_24.jpg', startSec: 24.5 },  // a la más rara.
  { file: '0_25.jpg', startSec: 25.8 },  // Y la última empezó en una web de fans de un actor de Hollywood,
  { file: '0_29.jpg', startSec: 29.08, fx: 'pop' },  // ¿A divinas de cual?
  { file: '0_30.jpg', startSec: 30.94, fx: 'pop' },  // Número 1, el SMS del banco,
  { file: '0_33.jpg', startSec: 33.44 },  // el febo.
  { file: '0_34.jpg', startSec: 34.58 },  // Ya viste de un cargo que nunca has hecho y te da un número para anularlo.
  { file: '0_38.jpg', startSec: 38.5, fx: 'pop' },  // Septiembre de 2021,
  { file: '0_40.jpg', startSec: 40.5 },  // la Guardia Civil cierra la operación Ibermelo.
  { file: '0_43.jpg', startSec: 43.24, fx: 'pop' },  // Su centro podía mandar más de 100 .000 SMS falsos a la hora.
  { file: '0_48.jpg', startSec: 48.2, fx: 'pop' },  // 29 detenidos y más de un millón de euros robados.
  { file: '0_52.jpg', startSec: 52.02, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '0_53.jpg', startSec: 53.42 },  // Nunca llames al número del mensaje.
  { file: '0_55.jpg', startSec: 55.56 },  // Abretula, app de tu banco.
  { file: '0_57.jpg', startSec: 57.54 },  // Su estilo te asusta con un cargo y el cargo llega cuando le llamas.
  { file: '1_02.jpg', startSec: 62.74, fx: 'pop' },  // Número 2, la multa falsa,
  { file: '1_04.jpg', startSec: 64.92 },  // el cobrador.
  { file: '1_06.jpg', startSec: 66.1 },  // Te escribe la DGT o correos,
  { file: '1_08.jpg', startSec: 68.74 },  // tienes algo pendiente por unos céntimos.
  { file: '1_11.jpg', startSec: 71.26 },  // Incibe avisó de uno de correos,
  { file: '1_13.jpg', startSec: 73.34, fx: 'pop' },  // pedía 80 céntimos por volver a enviarte un paquete.
  { file: '1_16.jpg', startSec: 76.62, fx: 'pop' },  // ¿Para qué quieren 80 céntimos?
  { file: '1_18.jpg', startSec: 78.88 },  // No los quieren,
  { file: '1_19.jpg', startSec: 79.76 },  // quieren tu tarjeta.
  { file: '1_21.jpg', startSec: 81.34, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '1_22.jpg', startSec: 82.5 },  // La DGT solo avisa por carta o por subuzón oficial,
  { file: '1_25.jpg', startSec: 85.92 },  // ninguna multa suya lleva enlaces.
  { file: '1_28.jpg', startSec: 88.46, fx: 'pop' },  // Su estilo te pide 80 céntimos y se queda con todo lo demás.
  { file: '1_33.jpg', startSec: 93.66, fx: 'pop' },  // Número 3,
  { file: '1_34.jpg', startSec: 94.48 },  // el hola mamá,
  { file: '1_35.jpg', startSec: 95.56 },  // el hijo falso.
  { file: '1_37.jpg', startSec: 97.26 },  // Hola mamá, se me ha roto el móvil,
  { file: '1_38.jpg', startSec: 98.94 },  // este es mi número nuevo.
  { file: '1_40.jpg', startSec: 100.66 },  // Al rato te pide dinero,
  { file: '1_42.jpg', startSec: 102.22 },  // es urgente.
  { file: '1_43.jpg', startSec: 103.7, fx: 'pop' },  // En febrero de 2024,
  { file: '1_45.jpg', startSec: 105.58, fx: 'pop' },  // la policía nacional de tubo a 65 personas por este timo. En un portátil guardaban más de 500 hojas de cálculo,
  { file: '1_52.jpg', startSec: 112.8 },  // llenas de datos de posibles víctimas.
  { file: '1_55.jpg', startSec: 115.14 },  // Con inteligencia artificial ya imitan hasta la voz.
  { file: '1_58.jpg', startSec: 118.68, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '1_59.jpg', startSec: 119.86 },  // Llama a tu hijo a su número de siempre.
  { file: '2_02.jpg', startSec: 122.26 },  // Su estilo,
  { file: '2_03.jpg', startSec: 123.38 },  // tu hijo de siempre,
  { file: '2_04.jpg', startSec: 124.62 },  // con un número que nunca has visto.
  { file: '2_07.jpg', startSec: 127.16, fx: 'pop' },  // Número 4, el vízum inverso, el comprador al revés.
  { file: '2_11.jpg', startSec: 131.3 },  // Vendes algo en internet,
  { file: '2_12.jpg', startSec: 132.7 },  // alguien te lo quiere pagar por vízum,
  { file: '2_14.jpg', startSec: 134.74, fx: 'shake' },  // pero aquí viene lo raro. Dice que el pago lo tienes que aceptar tu.
  { file: '2_18.jpg', startSec: 138.86 },  // Aceptas y el dinero sale de tu cuenta.
  { file: '2_21.jpg', startSec: 141.72, fx: 'pop' },  // En 2025, la policía nacional desarticuló una red así en Cádiz,
  { file: '2_26.jpg', startSec: 146.68, fx: 'pop' },  // 207 víctimas.
  { file: '2_29.jpg', startSec: 149.02, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '2_30.jpg', startSec: 150.38 },  // Para cobrar un vízum nunca tienes que aceptar nada,
  { file: '2_33.jpg', startSec: 153.22 },  // si aceptas estás pagando.
  { file: '2_35.jpg', startSec: 155.62 },  // Su estilo dice que te paga y le paga a su.
  { file: '2_39.jpg', startSec: 159.26, fx: 'pop' },  // Número 5,
  { file: '2_40.jpg', startSec: 160.5 },  // la llamada del banco,
  { file: '2_41.jpg', startSec: 161.78 },  // el doble.
  { file: '2_42.jpg', startSec: 162.78 },  // Te llama tu banco,
  { file: '2_44.jpg', startSec: 164.04 },  // en la pantalla sale su número de verdad,
  { file: '2_46.jpg', startSec: 166.4, fx: 'shake' },  // pero ese spufing falsifica en el número que ves.
  { file: '2_49.jpg', startSec: 169.84, fx: 'pop' },  // En 2022, la policía nacional detuvo a 8 personas que lo hacían, casi 3 millones de euros.
  { file: '2_56.jpg', startSec: 176.22 },  // Te pedía a los códigos del móvil para anular la operación,
  { file: '2_59.jpg', startSec: 179.38, fx: 'shake' },  // pero cada código no la anulaba,
  { file: '3_01.jpg', startSec: 181.62 },  // la aprobaba.
  { file: '3_03.jpg', startSec: 183.02, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '3_04.jpg', startSec: 184.24 },  // Cuelga y llama tu al número de tu tarjeta.
  { file: '3_07.jpg', startSec: 187.6 },  // Su estilo tiene la voz de tu banco y la cartera de otro.
  { file: '3_11.jpg', startSec: 191.78, fx: 'pop' },  // Número 6,
  { file: '3_12.jpg', startSec: 192.98 },  // el falso técnico, el que nadie ha llamado.
  { file: '3_15.jpg', startSec: 195.98 },  // Te llaman de Microsoft,
  { file: '3_17.jpg', startSec: 197.3 },  // tu ordenador tiene un virus,
  { file: '3_18.jpg', startSec: 198.8, fx: 'pop' },  // en octubre de 2026 se juzgó en vivo a una red así.
  { file: '3_22.jpg', startSec: 202.72 },  // El que llamaba se hacía llamar Harrison guiaba a sus víctimas durante horas,
  { file: '3_27.jpg', startSec: 207.72 },  // al final les habían vaciado las cuentas.
  { file: '3_30.jpg', startSec: 210.54, fx: 'pop' },  // Cerca de 60 mil euros.
  { file: '3_32.jpg', startSec: 212.64, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '3_34.jpg', startSec: 214.1 },  // Microsoft nunca te llama para arreglarte el ordenador.
  { file: '3_37.jpg', startSec: 217.12 },  // Su estilo viene a quitarte un virus, y el virus es él.
  { file: '3_42.jpg', startSec: 222.2 },  // Y ahora empiezan las raras.
  { file: '3_44.jpg', startSec: 224.18, fx: 'pop' },  // Número 7,
  { file: '3_45.jpg', startSec: 225.1 },  // el alquiler fantasma,
  { file: '3_46.jpg', startSec: 226.52 },  // la casera de mentira.
  { file: '3_48.jpg', startSec: 228.34 },  // Encuentras un piso en idealista, lo visitas, firmas y te da las llaves.
  { file: '3_53.jpg', startSec: 233.22, fx: 'pop' },  // Febrero de 2026,
  { file: '3_55.jpg', startSec: 235.36, fx: 'pop' },  // la Policía Nacional detiene en Madrid a una mujer de 40 años.
  { file: '3_59.jpg', startSec: 239.32 },  // Reservaba pisos en Airbnb y los anunciaba como alquiler de larga duración. Firmaba con varios inquilinos a la 
  { file: '4_09.jpg', startSec: 249.78, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '4_11.jpg', startSec: 251.34 },  // Ver el piso no basta,
  { file: '4_12.jpg', startSec: 252.78 },  // pide la nota simple del registro,
  { file: '4_14.jpg', startSec: 254.62 },  // ahí sale el dueña de verdad.
  { file: '4_16.jpg', startSec: 256.68 },  // Su estilo,
  { file: '4_17.jpg', startSec: 257.76 },  // te enseña el piso,
  { file: '4_18.jpg', startSec: 258.92, fx: 'shake' },  // pero el piso nunca fue suyo.
  { file: '4_21.jpg', startSec: 261.18, fx: 'pop' },  // Número 8,
  { file: '4_22.jpg', startSec: 262.28 },  // el famoso falso,
  { file: '4_23.jpg', startSec: 263.72 },  // el anuncio de mentira.
  { file: '4_25.jpg', startSec: 265.54 },  // Un famoso te recomienda invertir en criptomonedas,
  { file: '4_28.jpg', startSec: 268.4 },  // su cara,
  { file: '4_29.jpg', startSec: 269.12 },  // su voz,
  { file: '4_30.jpg', startSec: 270.02, fx: 'pop' },  // hechas con inteligencia artificial. Abril de 2025,
  { file: '4_34.jpg', startSec: 274.54 },  // cae una red en alicante,
  { file: '4_36.jpg', startSec: 276.14, fx: 'pop' },  // 19 millones de euros,
  { file: '4_38.jpg', startSec: 278.14, fx: 'pop' },  // 208 víctimas.
  { file: '4_40.jpg', startSec: 280.28 },  // Y cuando lo perdías todo volvían a escribirte,
  { file: '4_43.jpg', startSec: 283.06 },  // como falsos agentes de Europol para cobrarte los impuestos de recuperarlo.
  { file: '4_47.jpg', startSec: 287.82, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '4_49.jpg', startSec: 289.18 },  // Si te promete en ganarse en riesgo, es una estafa.
  { file: '4_52.jpg', startSec: 292.6 },  // Su estilo,
  { file: '4_53.jpg', startSec: 293.62 },  // te estafa dos veces y la segunda vestido de policía.
  { file: '4_57.jpg', startSec: 297.58, fx: 'pop' },  // Número 9,
  { file: '4_58.jpg', startSec: 298.8 },  // el SIM Swapping,
  { file: '5_00.jpg', startSec: 300.2 },  // el ladrón de tu número.
  { file: '5_01.jpg', startSec: 301.74 },  // Un día tu móvil se queda sin cobertura,
  { file: '5_04.jpg', startSec: 304.34 },  // tu número ya está en otra tarjeta y los códigos del banco le llegan a otro.
  { file: '5_09.jpg', startSec: 309.18, fx: 'pop' },  // Diciembre de 2024,
  { file: '5_11.jpg', startSec: 311.3 },  // cae una red de los trimitarios en Barcelona y Tarragona,
  { file: '5_14.jpg', startSec: 314.6, fx: 'pop' },  // 20 detenidos,
  { file: '5_15.jpg', startSec: 315.76, fx: 'pop' },  // 429 mil euros y al menos 100 identidades robadas.
  { file: '5_20.jpg', startSec: 320.62, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '5_22.jpg', startSec: 322.06 },  // Si te queda sin cobertura sin motivo,
  { file: '5_23.jpg', startSec: 323.96 },  // llama a tu operadora.
  { file: '5_25.jpg', startSec: 325.5 },  // Su estilo,
  { file: '5_26.jpg', startSec: 326.5 },  // nunca te roba el móvil,
  { file: '5_28.jpg', startSec: 328.02 },  // te roba el número.
  { file: '5_29.jpg', startSec: 329.42 },  // Y llegamos a la última,
  { file: '5_31.jpg', startSec: 331.06 },  // la más rara de todas.
  { file: '5_32.jpg', startSec: 332.88, fx: 'pop' },  // Número 10,
  { file: '5_34.jpg', startSec: 334.02 },  // la estafa del amor,
  { file: '5_35.jpg', startSec: 335.42 },  // el novio de película.
  { file: '5_37.jpg', startSec: 337.4 },  // Conoces a alguien por internet,
  { file: '5_39.jpg', startSec: 339.24 },  // te promete un futuro juntos y un día necesita dinero.
  { file: '5_43.jpg', startSec: 343.08, fx: 'pop' },  // Agosto de 2023,
  { file: '5_45.jpg', startSec: 345.08, fx: 'pop' },  // una mujer de granada denuncia que le han quitado 175 mil euros.
  { file: '5_49.jpg', startSec: 349.48 },  // La guardia civil encuentra otra víctima en bizcaya.
  { file: '5_52.jpg', startSec: 352.48 },  // Las dos venían de la misma web de fans. En un registro apareció una agenda,
  { file: '5_57.jpg', startSec: 357.46 },  // con las frases que usaban para engañarlas.
  { file: '6_00.jpg', startSec: 360.34 },  // Volvamos a la pregunta,
  { file: '6_01.jpg', startSec: 361.98, fx: 'pop' },  // ¿de qué actor era la web?
  { file: '6_04.jpg', startSec: 364.06 },  // Brad Pitt,
  { file: '6_05.jpg', startSec: 365.18 },  // las dos creían salir con Brad Pitt y él les propuso invertir juntos.
  { file: '6_10.jpg', startSec: 370.84, fx: 'pop' },  // 325 mil euros entre las dos.
  { file: '6_13.jpg', startSec: 373.64, fx: 'pop' },  // ¿Cómo pillarla?
  { file: '6_15.jpg', startSec: 375.0 },  // Si alguien a quien nunca has visto te pide dinero, es una estafa.
  { file: '6_19.jpg', startSec: 379.08 },  // Su estilo,
  { file: '6_20.jpg', startSec: 380.12 },  // la única estafa que te rompe el corazón y la cuenta.
  { file: '6_24.jpg', startSec: 384.3, fx: 'pop' },  // ¿Y tú?
  { file: '6_25.jpg', startSec: 385.5, fx: 'pop' },  // ¿Cuál de las diez te ha llegado ya?
  { file: '6_27.jpg', startSec: 387.46 },  // Te leo en los comentarios.
  { file: '6_29.jpg', startSec: 389.7 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '6_34.jpg', startSec: 394.68 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number; duration?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.048, duration: 1.76 },
  { file: 'soft_whoosh.mp3', startSec: 1.16, volume: 0.13, duration: 1.28 },
  { file: 'bubble_pop.mp3', startSec: 3.19, volume: 0.083, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 6.86, volume: 0.13, duration: 1.2 },
  { file: 'impact_thud.mp3', startSec: 12.91, volume: 0.13, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 16.51, volume: 0.068, duration: 1.08 },
  { file: 'sign_pop.mp3', startSec: 18.81, volume: 0.095, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 22.52, volume: 0.072, duration: 1.0 },
  { file: 'rising_whoosh.mp3', startSec: 27.98, volume: 0.072, duration: 1.28 },
  { file: 'mystery_sting.mp3', startSec: 29.08, volume: 0.058, duration: 1.2 },
  { file: 'count_1.mp3', startSec: 30.94, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 31.99, volume: 0.13, duration: 1.08 },
  { file: 'speed_whoosh.mp3', startSec: 33.32, volume: 0.069, duration: 1.2 },
  { file: 'good_ding.mp3', startSec: 38.47, volume: 0.08, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 40.53, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 45.59, volume: 0.083, duration: 1.0 },
  { file: 'cash_register_1.mp3', startSec: 49.99, volume: 0.13, duration: 1.48 },
  { file: 'time_whoosh.mp3', startSec: 51.9, volume: 0.048, duration: 1.48 },
  { file: 'count_2.mp3', startSec: 62.74, volume: 0.13, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 66.95, volume: 0.095, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 68.62, volume: 0.13, duration: 1.28 },
  { file: 'tool_pop.mp3', startSec: 73.57, volume: 0.13, duration: 1.08 },
  { file: 'whoosh_expand.mp3', startSec: 76.5, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 82.73, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 85.8, volume: 0.072, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 89.89, volume: 0.083, duration: 1.0 },
  { file: 'count_3.mp3', startSec: 93.66, volume: 0.13, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 94.36, volume: 0.069, duration: 1.2 },
  { file: 'ding.mp3', startSec: 103.81, volume: 0.105, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 105.46, volume: 0.048, duration: 1.48 },
  { file: 'sign_pop.mp3', startSec: 106.87, volume: 0.095, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 118.56, volume: 0.13, duration: 1.28 },
  { file: 'whoosh_expand.mp3', startSec: 124.5, volume: 0.13, duration: 1.2 },
  { file: 'count_4.mp3', startSec: 127.16, volume: 0.13, duration: 1.0 },
  { file: 'drum_hit.mp3', startSec: 134.71, volume: 0.116, duration: 1.0 },
  { file: 'found_ding.mp3', startSec: 141.91, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 145.83, volume: 0.13, duration: 1.08 },
  { file: 'swipe_whoosh.mp3', startSec: 146.56, volume: 0.072, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 153.1, volume: 0.069, duration: 1.2 },
  { file: 'count_5.mp3', startSec: 159.26, volume: 0.13, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 162.66, volume: 0.048, duration: 1.48 },
  { file: 'shock_hit.mp3', startSec: 166.37, volume: 0.13, duration: 1.2 },
  { file: 'alert_ding.mp3', startSec: 170.05, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 172.17, volume: 0.13, duration: 1.2 },
  { file: 'money_chime.mp3', startSec: 174.41, volume: 0.13, duration: 1.28 },
  { file: 'impact_beat.mp3', startSec: 179.35, volume: 0.068, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 184.12, volume: 0.13, duration: 1.28 },
  { file: 'count_6.mp3', startSec: 191.78, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 192.31, volume: 0.083, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 195.86, volume: 0.13, duration: 1.2 },
  { file: 'soft_ping.mp3', startSec: 198.87, volume: 0.068, duration: 1.08 },
  { file: 'sign_pop.mp3', startSec: 203.97, volume: 0.095, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 210.95, volume: 0.13, duration: 1.08 },
  { file: 'coin_clink.mp3', startSec: 211.59, volume: 0.13, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 212.52, volume: 0.072, duration: 1.0 },
  { file: 'chapter_sting_1.mp3', startSec: 224.18, volume: 0.112, duration: 1.48 },
  { file: 'speed_whoosh.mp3', startSec: 224.98, volume: 0.069, duration: 1.2 },
  { file: 'good_ding.mp3', startSec: 233.19, volume: 0.08, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 235.37, volume: 0.13, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 239.2, volume: 0.048, duration: 1.48 },
  { file: 'bubble_pop.mp3', startSec: 240.43, volume: 0.083, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 256.56, volume: 0.13, duration: 1.28 },
  { file: 'dramatic_hit.mp3', startSec: 258.89, volume: 0.032, duration: 1.2 },
  { file: 'chapter_sting_2.mp3', startSec: 261.18, volume: 0.059, duration: 1.48 },
  { file: 'whoosh_expand.mp3', startSec: 265.42, volume: 0.13, duration: 1.2 },
  { file: 'ding.mp3', startSec: 271.65, volume: 0.105, duration: 1.2 },
  { file: 'cash_chime.mp3', startSec: 276.51, volume: 0.13, duration: 1.08 },
  { file: 'sign_pop.mp3', startSec: 278.11, volume: 0.095, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 280.16, volume: 0.072, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 284.21, volume: 0.13, duration: 1.08 },
  { file: 'speed_whoosh.mp3', startSec: 292.48, volume: 0.069, duration: 1.2 },
  { file: 'chapter_sting_3.mp3', startSec: 297.58, volume: 0.059, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 298.89, volume: 0.13, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 304.22, volume: 0.048, duration: 1.48 },
  { file: 'found_ding.mp3', startSec: 309.15, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 312.85, volume: 0.083, duration: 1.0 },
  { file: 'coins.mp3', startSec: 317.13, volume: 0.13, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 318.21, volume: 0.095, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 320.5, volume: 0.13, duration: 1.28 },
  { file: 'whoosh_expand.mp3', startSec: 326.38, volume: 0.13, duration: 1.2 },
  { file: 'chapter_sting_final.mp3', startSec: 332.88, volume: 0.111, duration: 1.48 },
  { file: 'swipe_whoosh.mp3', startSec: 337.28, volume: 0.072, duration: 1.0 },
  { file: 'alert_ding.mp3', startSec: 343.05, volume: 0.13, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 347.15, volume: 0.13, duration: 1.08 },
  { file: 'cash_register_1.mp3', startSec: 348.51, volume: 0.13, duration: 1.48 },
  { file: 'speed_whoosh.mp3', startSec: 352.36, volume: 0.069, duration: 1.2 },
  { file: 'tension_up.mp3', startSec: 359.24, volume: 0.065, duration: 1.36 },
  { file: 'time_whoosh.mp3', startSec: 360.22, volume: 0.048, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 364.41, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 370.81, volume: 0.083, duration: 1.0 },
  { file: 'money_chime.mp3', startSec: 371.71, volume: 0.13, duration: 1.28 },
  { file: 'soft_whoosh.mp3', startSec: 384.18, volume: 0.13, duration: 1.28 },
  { file: 'subscribe_chime.mp3', startSec: 389.7, volume: 0.13, duration: 1.6 },
];

// Sin música de fondo (sfx.json music.volume = 0).

const PLAYBACK_RATE = 1.0;
const TRANS_SEC = 0.3;          // duración de la transición de entrada
const KB = 0.06;                // amplitud del Ken Burns (escala 1 -> 1.06)
const MOTIONS = ['zoomIn', 'panRight', 'zoomOut', 'panLeft'] as const;
const TRANSITIONS = ['punch', 'slide', 'bounce'] as const;
const easeOut = Easing.out(Easing.cubic);

const kenBurns = (i: number, p: number) => {
  const kind = MOTIONS[i % MOTIONS.length];
  if (kind === 'zoomIn') return { s: 1 + KB * p, x: 0 };
  if (kind === 'zoomOut') return { s: 1 + KB * (1 - p), x: 0 };
  const span = 1.6; // % del ancho; a escala 1.06 sobran 3 % por lado
  return { s: 1 + KB, x: kind === 'panRight' ? -span + 2 * span * p : span - 2 * span * p };
};

export const CadaEstafaQueTePuedenHacerEnEspana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : 12003;
  const e = frame - startF;                       // frames desde que entró la imagen
  const lenF = Math.max(1, endF - startF);
  const transF = Math.max(1, Math.round(TRANS_SEC * fps));
  const t = Math.min(1, e / transF);

  // movimiento continuo
  const kb = kenBurns(activeIndex, Math.min(1, e / lenF));
  let scale = kb.s;
  let x = kb.x;      // %
  let y = 0;         // %
  let rot = 0;       // grados

  // transición de entrada (la primera imagen entra sin transición)
  const trans = active.fx === 'shake' ? 'punch' : TRANSITIONS[activeIndex % TRANSITIONS.length];
  const slideDir = activeIndex % 2 === 0 ? 1 : -1;
  let showPrev = false;
  if (activeIndex > 0 && e < transF + 1) {
    if (trans === 'punch') {
      scale *= interpolate(t, [0, 1], [1.1, 1], { easing: easeOut });
    } else if (trans === 'slide') {
      x += (1 - easeOut(t)) * 100 * slideDir;
      showPrev = t < 1;
    } else {
      const sp = spring({ frame: e, fps, config: { damping: 10, stiffness: 170, mass: 0.6 }, durationInFrames: transF + 6 });
      scale *= 0.88 + 0.12 * sp;
    }
  }

  // énfasis
  const shakeF = Math.round(0.45 * fps);
  if (active.fx === 'shake' && e >= transF && e < transF + shakeF) {
    const k = (e - transF) / shakeF;
    const w = Math.sin(((e - transF) / fps) * 2 * Math.PI * 9) * (1 - k);
    x += 0.5 * w;
    rot += 0.5 * w;
  }
  if (active.fx === 'pop') {
    const popF = Math.round(0.28 * fps);
    const pe = e - transF;
    if (pe >= 0 && pe < popF) scale *= 1 + 0.035 * Math.sin(Math.PI * (pe / popF));
  }

  const imgStyle: React.CSSProperties = { position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' };
  let prevEl: React.ReactNode = null;
  if (showPrev) {
    const prevIndex = activeIndex - 1;
    const prev = FRAMES[prevIndex];
    const pkb = kenBurns(prevIndex, 1);
    const px = pkb.x - easeOut(t) * 25 * slideDir;
    prevEl = (
      <Img src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana/${prev.file}`)}
        style={{ ...imgStyle, transform: `translate(${px}%, 0%) scale(${pkb.s})` }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Audio src={staticFile('cada-estafa-que-te-pueden-hacer-en-espana.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={toFrame(sfx.startSec)} durationInFrames={Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}>
          <Audio src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.1} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {prevEl}
      <Img src={staticFile(`cada-estafa-que-te-pueden-hacer-en-espana/${active.file}`)}
        style={{ ...imgStyle, transform: `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};
