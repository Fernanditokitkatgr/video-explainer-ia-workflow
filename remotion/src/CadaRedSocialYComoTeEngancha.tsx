import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-red-social-y-como-te-engancha - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[]; fx?: string }[] = [
  { file: 'v3_0_00.jpg', startSec: 0.0 },  // Son las dos de la mañana,
  { file: 'v3_0_01.jpg', startSec: 1.94 },  // y llevas una hora en TikTok,
  { file: 'v3_0_04.jpg', startSec: 4.04 },  // solo ibas a ver un vídeo,
  { file: 'v3_0_05.jpg', startSec: 5.64 },  // y tu pulgar sigue bajando.
  { file: 'v3_0_07.jpg', startSec: 7.48, fx: 'pop' },  // ¿Es culpa tuya? Solo en parte,
  { file: 'v3_0_09.jpg', startSec: 9.52 },  // ese gesto lo diseñó alguien,
  { file: 'v3_0_11.jpg', startSec: 11.22 },  // y cada red social tiene su propio anzuelo.
  { file: 'v3_0_13.jpg', startSec: 13.82 },  // La última, además,
  { file: 'v3_0_14.jpg', startSec: 14.86 },  // nació para curarte de todas las demás,
  { file: 'v3_0_17.jpg', startSec: 17.04, fx: 'pop' },  // ¿Adivinas qué truco acabó usando?
  { file: 'v3_0_18.jpg', startSec: 18.88 },  // Estas son las diez redes
  { file: 'v3_0_20.jpg', startSec: 20.18 },  // y su truco para engancharte,
  { file: 'v3_0_22.jpg', startSec: 22.02 },  // de la que más usas a la más sorprendente.
  { file: 'v3_0_24.jpg', startSec: 24.08 },  // Número uno,
  { file: 'v3_0_25.jpg', startSec: 25.56 },  // Whatsapp, el chivato.
  { file: 'v3_0_27.jpg', startSec: 27.3, fx: 'pop' },  // La crearon Jan Koum y Brian Acton en 2009.
  { file: 'v3_0_30.jpg', startSec: 30.2 },  // Ese año Facebook había rechazado a Acton.
  { file: 'v3_0_32.jpg', startSec: 32.52, fx: 'pop' },  // 5 años después se la compró
  { file: 'v3_0_34.jpg', startSec: 34.1, fx: 'pop' },  // por 19 .000 millones de dólares.
  { file: 'v3_0_36.jpg', startSec: 36.66 },  // Su anzuelo es el doble check azul.
  { file: 'v3_0_38.jpg', startSec: 38.72 },  // Sabes que te han leído,
  { file: 'v3_0_39.jpg', startSec: 39.96 },  // y nadie quiere dejar a nadie en visto.
  { file: 'v3_0_42.jpg', startSec: 42.1 },  // En España es la red favorita de casi
  { file: 'v3_0_43.jpg', startSec: 43.76 },  // cuatro de cada diez usuarios,
  { file: 'v3_0_45.jpg', startSec: 45.56 },  // según IAB Spain.
  { file: 'v3_0_47.jpg', startSec: 47.0 },  // Quita las confirmaciones de lectura.
  { file: 'v3_0_48.jpg', startSec: 48.82 },  // Whatsapp no te obliga a contestar,
  { file: 'v3_0_50.jpg', startSec: 50.8 },  // solo chiva que ya lo has leído.
  { file: 'v3_0_52.jpg', startSec: 52.3 },  // Número dos, Youtube,
  { file: 'v3_0_54.jpg', startSec: 54.46 },  // la tele sin final.
  { file: 'v3_0_55.jpg', startSec: 55.74, fx: 'pop' },  // Nació en 2005,
  { file: 'v3_0_57.jpg', startSec: 57.24 },  // y al principio iba a ser una web de citas en vídeo.
  { file: 'v3_0_59.jpg', startSec: 59.88 },  // Su anzuelo es la reproducción automática.
  { file: 'v3_1_02.jpg', startSec: 62.24 },  // Acaba un vídeo, y empieza otro.
  { file: 'v3_1_04.jpg', startSec: 64.18 },  // Tú nunca decides seguir.
  { file: 'v3_1_05.jpg', startSec: 65.76 },  // Tendrías que decidir parar.
  { file: 'v3_1_07.jpg', startSec: 67.5, fx: 'pop' },  // En 2018 lo contó Neal Mohan,
  { file: 'v3_1_09.jpg', startSec: 69.62 },  // su director de producto.
  { file: 'v3_1_10.jpg', startSec: 70.96, fx: 'pop' },  // Más del 70 % de lo que se ve,
  { file: 'v3_1_13.jpg', startSec: 73.16 },  // sale de sus recomendaciones.
  { file: 'v3_1_14.jpg', startSec: 74.7 },  // Así que apágala.
  { file: 'v3_1_15.jpg', startSec: 75.94 },  // Youtube nunca te pide que te quedes.
  { file: 'v3_1_17.jpg', startSec: 77.74 },  // Simplemente, nunca se acaba.
  { file: 'v3_1_19.jpg', startSec: 79.28 },  // Número tres,
  { file: 'v3_1_20.jpg', startSec: 80.76 },  // Instagram, el espejo.
  { file: 'v3_1_22.jpg', startSec: 82.64 },  // La crearon Kevin Systrom
  { file: 'v3_1_23.jpg', startSec: 83.88, fx: 'pop' },  // y Mike Krieger en 2010.
  { file: 'v3_1_25.jpg', startSec: 85.64 },  // Su primera foto fue un perro junto a un puesto de tacos.
  { file: 'v3_1_28.jpg', startSec: 88.46 },  // Su anzuelo es el contador de me gusta,
  { file: 'v3_1_30.jpg', startSec: 90.6 },  // debajo de cada foto.
  { file: 'v3_1_31.jpg', startSec: 91.84, fx: 'pop' },  // En 2021 se filtró
  { file: 'v3_1_33.jpg', startSec: 93.28 },  // una investigación interna de Facebook.
  { file: 'v3_1_35.jpg', startSec: 95.26 },  // Entre las chicas que ya se sentían mal con su cuerpo,
  { file: 'v3_1_37.jpg', startSec: 97.94 },  // una de cada tres se sentía
  { file: 'v3_1_39.jpg', startSec: 99.4 },  // peor por Instagram.
  { file: 'v3_1_40.jpg', startSec: 100.84 },  // Oculta los me gusta.
  { file: 'v3_1_42.jpg', startSec: 102.24 },  // Instagram te enseña la vida
  { file: 'v3_1_43.jpg', startSec: 103.42 },  // de los demás, con la nota puesta.
  { file: 'v3_1_45.jpg', startSec: 105.12 },  // Número cuatro, TikTok,
  { file: 'v3_1_47.jpg', startSec: 107.46 },  // el pozo sin fondo.
  { file: 'v3_1_48.jpg', startSec: 108.86, fx: 'pop' },  // Es de la china ByteDance, que en 2018
  { file: 'v3_1_50.jpg', startSec: 110.86 },  // la fusionó con Musical.ly.
  { file: 'v3_1_53.jpg', startSec: 113.08 },  // Su anzuelo es el scroll infinito.
  { file: 'v3_1_55.jpg', startSec: 115.12, fx: 'pop' },  // Lo inventó Aza Raskin en 2006
  { file: 'v3_1_56.jpg', startSec: 116.86 },  // y hoy dice que se arrepiente.
  { file: 'v3_1_58.jpg', startSec: 118.88 },  // Y el feed Para ti aprende de cada segundo.
  { file: 'v3_2_01.jpg', startSec: 121.74 },  // En Kentucky se filtraron sus documentos internos.
  { file: 'v3_2_04.jpg', startSec: 124.48 },  // Según su propia investigación,
  { file: 'v3_2_06.jpg', startSec: 126.04 },  // el hábito puede empezar tras
  { file: 'v3_2_07.jpg', startSec: 127.24, fx: 'pop' },  // 260 vídeos.
  { file: 'v3_2_08.jpg', startSec: 128.84, fx: 'pop' },  // Unos 35 minutos.
  { file: 'v3_2_11.jpg', startSec: 131.06, fx: 'pop' },  // Y en 2026 Bruselas acusó
  { file: 'v3_2_13.jpg', startSec: 133.34 },  // a su diseño adictivo
  { file: 'v3_2_14.jpg', startSec: 134.34 },  // de incumplir la ley europea.
  { file: 'v3_2_16.jpg', startSec: 136.28 },  // Ponte un límite de tiempo en el móvil
  { file: 'v3_2_17.jpg', startSec: 137.76 },  // y que el código lo ponga otra persona.
  { file: 'v3_2_20.jpg', startSec: 140.44 },  // Número cinco, Facebook, el confeso.
  { file: 'v3_2_23.jpg', startSec: 143.42 },  // Antes, Mark Zuckerberg montó FaceMash,
  { file: 'v3_2_25.jpg', startSec: 145.92 },  // una web para votar quién era más guapo en Harvard.
  { file: 'v3_2_28.jpg', startSec: 148.66 },  // Su anzuelo es el botón de me gusta.
  { file: 'v3_2_30.jpg', startSec: 150.66 },  // Y su cocreador, Justin Rosenstein,
  { file: 'v3_2_32.jpg', startSec: 152.9 },  // acabó con control parental en su móvil.
  { file: 'v3_2_34.jpg', startSec: 154.82, fx: 'pop' },  // En 2017,
  { file: 'v3_2_36.jpg', startSec: 156.38 },  // Sean Parker, su primer presidente,
  { file: 'v3_2_38.jpg', startSec: 158.22 },  // lo admitió en público.
  { file: 'v3_2_39.jpg', startSec: 159.56 },  // Facebook explotaba una vulnerabilidad
  { file: 'v3_2_41.jpg', startSec: 161.4 },  // de la psicología humana.
  { file: 'v3_2_42.jpg', startSec: 162.8 },  // Lo sabían y lo hicieron igual.
  { file: 'v3_2_44.jpg', startSec: 164.98 },  // Apaga los avisos de me gusta y comentarios.
  { file: 'v3_2_47.jpg', startSec: 167.36 },  // Te dan un poquito de aprobación
  { file: 'v3_2_48.jpg', startSec: 168.72 },  // y te dejan con ganas de más.
  { file: 'v3_2_50.jpg', startSec: 170.76 },  // Número seis, X,
  { file: 'v3_2_52.jpg', startSec: 172.54 },  // antes Twitter, la tragaperras.
  { file: 'v3_2_54.jpg', startSec: 174.64 },  // Su primer tuit lo escribió Jack Dorsey
  { file: 'v3_2_56.jpg', startSec: 176.52, fx: 'pop' },  // en 2006 y se vendió
  { file: 'v3_2_58.jpg', startSec: 178.12 },  // como NFT por casi
  { file: 'v3_2_59.jpg', startSec: 179.4 },  // tres millones de dólares.
  { file: 'v3_3_00.jpg', startSec: 180.86 },  // Su anzuelo es tirar
  { file: 'v3_3_02.jpg', startSec: 182.26 },  // hacia abajo para actualizar.
  { file: 'v3_3_03.jpg', startSec: 183.84 },  // Lo inventó Loren Brichter y hoy
  { file: 'v3_3_05.jpg', startSec: 185.66 },  // reconoce que es adictivo.
  { file: 'v3_3_07.jpg', startSec: 187.42 },  // Tiras, esperas
  { file: 'v3_3_08.jpg', startSec: 188.56 },  // y a veces sale algo nuevo,
  { file: 'v3_3_10.jpg', startSec: 190.38 },  // como una tragaperras.
  { file: 'v3_3_11.jpg', startSec: 191.7, fx: 'pop' },  // En diciembre de 2025,
  { file: 'v3_3_13.jpg', startSec: 193.62 },  // Bruselas multó a X
  { file: 'v3_3_14.jpg', startSec: 194.54, fx: 'pop' },  // con 120 millones de euros
  { file: 'v3_3_16.jpg', startSec: 196.26 },  // porque su check azul engañaba,
  { file: 'v3_3_18.jpg', startSec: 198.58 },  // Usa la pestaña Siguiendo.
  { file: 'v3_3_20.jpg', startSec: 200.18 },  // Cada vez que tiras puede tocarte
  { file: 'v3_3_21.jpg', startSec: 201.6 },  // el premio y casi nunca toca.
  { file: 'v3_3_23.jpg', startSec: 203.7 },  // Y ahora vienen las sorprendentes.
  { file: 'v3_3_25.jpg', startSec: 205.94 },  // Número siete, Twitch,
  { file: 'v3_3_27.jpg', startSec: 207.72 },  // la que te paga por mirar.
  { file: 'v3_3_29.jpg', startSec: 209.04, fx: 'pop' },  // Empezó en 2007
  { file: 'v3_3_30.jpg', startSec: 210.22 },  // cuando Justin Kan se puso
  { file: 'v3_3_31.jpg', startSec: 211.82 },  // una cámara en la cabeza y emitió
  { file: 'v3_3_33.jpg', startSec: 213.42 },  // su vida en directo.
  { file: 'v3_3_34.jpg', startSec: 214.6 },  // Su anzuelo son los puntos de canal.
  { file: 'v3_3_36.jpg', startSec: 216.66 },  // Cuanto más miras, más ganas.
  { file: 'v3_3_38.jpg', startSec: 218.64 },  // Y si te vas del directo, te lo pierdes.
  { file: 'v3_3_40.jpg', startSec: 220.96, fx: 'pop' },  // En 2025,
  { file: 'v3_3_42.jpg', startSec: 222.2 },  // La Velada del Año de Ibai superó
  { file: 'v3_3_43.jpg', startSec: 223.82 },  // los nueve millones de espectadores a la vez.
  { file: 'v3_3_46.jpg', startSec: 226.32 },  // Decide antes a qué hora apagas.
  { file: 'v3_3_48.jpg', startSec: 228.26 },  // Twitch te paga en puntos
  { file: 'v3_3_49.jpg', startSec: 229.42 },  // y tú le pagas en horas.
  { file: 'v3_3_51.jpg', startSec: 231.42 },  // Número ocho, Snapchat,
  { file: 'v3_3_53.jpg', startSec: 233.4 },  // la de las rachas.
  { file: 'v3_3_54.jpg', startSec: 234.52, fx: 'pop' },  // Nació en Stanford en 2011 con otro nombre, Picaboo.
  { file: 'v3_3_56.jpg', startSec: 236.68 },  // La racha
  { file: 'v3_3_57.jpg', startSec: 237.98 },  // es un fuego con un número.
  { file: 'v3_3_59.jpg', startSec: 239.64 },  // Sube cada día que tú
  { file: 'v3_4_00.jpg', startSec: 240.78 },  // y un amigo os mandáis una foto.
  { file: 'v3_4_02.jpg', startSec: 242.58 },  // Si fallas un día, vuelve a cero.
  { file: 'v3_4_04.jpg', startSec: 244.58 },  // En una demanda de Nuevo México
  { file: 'v3_4_05.jpg', startSec: 245.8 },  // salió una presentación interna.
  { file: 'v3_4_07.jpg', startSec: 247.78 },  // Decía que las rachas hacen imposible
  { file: 'v3_4_09.jpg', startSec: 249.68 },  // desconectar ni un solo día.
  { file: 'v3_4_11.jpg', startSec: 251.64 },  // Pacta con tu amigo, romperla, tu amistad,
  { file: 'v3_4_14.jpg', startSec: 254.08 },  // con contador y caduca
  { file: 'v3_4_15.jpg', startSec: 255.44, fx: 'pop' },  // cada 24 horas.
  { file: 'v3_4_16.jpg', startSec: 256.98 },  // Número nueve, Reddit,
  { file: 'v3_4_18.jpg', startSec: 258.86 },  // el pueblo de mentira.
  { file: 'v3_4_20.jpg', startSec: 260.18 },  // Al principio estaba vacía,
  { file: 'v3_4_21.jpg', startSec: 261.88 },  // así que sus fundadores crearon
  { file: 'v3_4_23.jpg', startSec: 263.36 },  // cientos de cuentas falsas.
  { file: 'v3_4_24.jpg', startSec: 264.86 },  // Su anzuelo son los votos.
  { file: 'v3_4_26.jpg', startSec: 266.8 },  // Cada comentario tuyo lleva
  { file: 'v3_4_28.jpg', startSec: 268.0 },  // un marcador que sube o baja.
  { file: 'v3_4_30.jpg', startSec: 270.0 },  // Y lo que escribes vale dinero.
  { file: 'v3_4_31.jpg', startSec: 271.98 },  // Según Reuters, Google
  { file: 'v3_4_33.jpg', startSec: 273.22, fx: 'pop' },  // le paga unos 60 millones
  { file: 'v3_4_34.jpg', startSec: 274.72 },  // de dólares al año para entrenar
  { file: 'v3_4_36.jpg', startSec: 276.32 },  // su inteligencia artificial.
  { file: 'v3_4_37.jpg', startSec: 277.84 },  // Quita los avisos de votos.
  { file: 'v3_4_39.jpg', startSec: 279.44 },  // Reddit empezó con gente inventada.
  { file: 'v3_4_41.jpg', startSec: 281.38 },  // Y hoy vende lo que escribe la gente de verdad.
  { file: 'v3_4_43.jpg', startSec: 283.86 },  // Y la última, la más sorprendente.
  { file: 'v3_4_46.jpg', startSec: 286.3, fx: 'pop' },  // Número 10, BeReal, la alarma.
  { file: 'v3_4_49.jpg', startSec: 289.08 },  // La creó en Francia Alexis Barreyat
  { file: 'v3_4_50.jpg', startSec: 290.78, fx: 'pop' },  // en 2020 contra Instagram.
  { file: 'v3_4_52.jpg', startSec: 292.56 },  // Fotos tal cual,
  { file: 'v3_4_54.jpg', startSec: 294.14 },  // y solo para tus amigos.
  { file: 'v3_4_55.jpg', startSec: 295.64, fx: 'pop' },  // ¿Y qué truco acabó usando?
  { file: 'v3_4_57.jpg', startSec: 297.42 },  // Una notificación, una vez al día.
  { file: 'v3_4_59.jpg', startSec: 299.68 },  // A una hora que nunca sabes,
  { file: 'v3_5_01.jpg', startSec: 301.46 },  // tienes dos minutos para hacer la foto.
  { file: 'v3_5_03.jpg', startSec: 303.82 },  // Y si llegas tarde, todos lo ven.
  { file: 'v3_5_06.jpg', startSec: 306.16 },  // Según Platformer,
  { file: 'v3_5_07.jpg', startSec: 307.26, fx: 'pop' },  // en cinco meses pasó de 15 millones
  { file: 'v3_5_08.jpg', startSec: 308.9 },  // de usuarios al mes a seis.
  { file: 'v3_5_11.jpg', startSec: 311.06 },  // Ninguna alarma de una app es una emergencia.
  { file: 'v3_5_13.jpg', startSec: 313.62 },  // BeReal te prometía soltar el móvil
  { file: 'v3_5_15.jpg', startSec: 315.34 },  // y te lo hacía sacar corriendo cada día.
  { file: 'v3_5_17.jpg', startSec: 317.74, fx: 'pop' },  // ¿Y tú? ¿Cuál de las diez te
  { file: 'v3_5_19.jpg', startSec: 319.16, fx: 'pop' },  // tiene despierto a las dos de la mañana?
  { file: 'v3_5_20.jpg', startSec: 320.64 },  // Te leo en los comentarios.
  { file: 'v3_5_22.jpg', startSec: 322.46 },  // Si te gusta entender cómo funciona de verdad
  { file: 'v3_5_24.jpg', startSec: 324.52 },  // la tecnología que usas
  { file: 'v3_5_25.jpg', startSec: 325.76 },  // cada día, suscríbete.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number; duration?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.048, duration: 1.76 },
  { file: 'soft_whoosh.mp3', startSec: 1.82, volume: 0.13, duration: 1.28 },
  { file: 'bubble_pop.mp3', startSec: 3.17, volume: 0.083, duration: 1.0 },
  { file: 'rising_whoosh.mp3', startSec: 15.94, volume: 0.072, duration: 1.28 },
  { file: 'mystery_sting.mp3', startSec: 17.04, volume: 0.058, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 17.55, volume: 0.095, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 18.76, volume: 0.13, duration: 1.2 },
  { file: 'count_1.mp3', startSec: 24.08, volume: 0.13, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 29.17, volume: 0.068, duration: 1.08 },
  { file: 'tool_pop.mp3', startSec: 30.57, volume: 0.13, duration: 1.08 },
  { file: 'cash_register_1.mp3', startSec: 35.23, volume: 0.13, duration: 1.48 },
  { file: 'tension_up.mp3', startSec: 37.62, volume: 0.065, duration: 1.36 },
  { file: 'swipe_whoosh.mp3', startSec: 39.84, volume: 0.072, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 42.19, volume: 0.13, duration: 1.2 },
  { file: 'count_2.mp3', startSec: 52.3, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 53.55, volume: 0.083, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 56.09, volume: 0.08, duration: 1.2 },
  { file: 'speed_whoosh.mp3', startSec: 57.12, volume: 0.069, duration: 1.2 },
  { file: 'ding.mp3', startSec: 67.55, volume: 0.105, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 68.79, volume: 0.095, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 73.04, volume: 0.048, duration: 1.48 },
  { file: 'count_3.mp3', startSec: 79.28, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 80.73, volume: 0.13, duration: 1.08 },
  { file: 'found_ding.mp3', startSec: 84.69, volume: 0.13, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 88.34, volume: 0.13, duration: 1.28 },
  { file: 'alert_ding.mp3', startSec: 91.91, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 100.01, volume: 0.13, duration: 1.2 },
  { file: 'count_4.mp3', startSec: 105.12, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 106.67, volume: 0.083, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 108.74, volume: 0.13, duration: 1.2 },
  { file: 'soft_ping.mp3', startSec: 110.33, volume: 0.068, duration: 1.08 },
  { file: 'sign_pop.mp3', startSec: 115.71, volume: 0.095, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 127.21, volume: 0.13, duration: 1.08 },
  { file: 'swipe_whoosh.mp3', startSec: 128.72, volume: 0.072, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 131.29, volume: 0.08, duration: 1.2 },
  { file: 'count_5.mp3', startSec: 140.44, volume: 0.13, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 141.41, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 147.95, volume: 0.083, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 150.54, volume: 0.069, duration: 1.2 },
  { file: 'ding.mp3', startSec: 155.15, volume: 0.105, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 156.35, volume: 0.095, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 167.24, volume: 0.048, duration: 1.48 },
  { file: 'count_6.mp3', startSec: 170.76, volume: 0.13, duration: 1.0 },
  { file: 'found_ding.mp3', startSec: 176.61, volume: 0.13, duration: 1.0 },
  { file: 'money_chime.mp3', startSec: 179.79, volume: 0.13, duration: 1.28 },
  { file: 'tool_pop.mp3', startSec: 184.35, volume: 0.13, duration: 1.08 },
  { file: 'soft_whoosh.mp3', startSec: 185.54, volume: 0.13, duration: 1.28 },
  { file: 'multiply_pop.mp3', startSec: 190.75, volume: 0.13, duration: 1.2 },
  { file: 'alert_ding.mp3', startSec: 191.79, volume: 0.13, duration: 1.2 },
  { file: 'coin_clink.mp3', startSec: 195.33, volume: 0.13, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 201.48, volume: 0.13, duration: 1.2 },
  { file: 'chapter_sting_1.mp3', startSec: 205.94, volume: 0.112, duration: 1.48 },
  { file: 'bubble_pop.mp3', startSec: 207.09, volume: 0.083, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 209.73, volume: 0.068, duration: 1.08 },
  { file: 'good_ding.mp3', startSec: 221.01, volume: 0.08, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 222.08, volume: 0.072, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 222.99, volume: 0.095, duration: 1.0 },
  { file: 'cash_chime.mp3', startSec: 224.41, volume: 0.13, duration: 1.08 },
  { file: 'chapter_sting_2.mp3', startSec: 231.42, volume: 0.059, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 232.55, volume: 0.13, duration: 1.08 },
  { file: 'ding.mp3', startSec: 235.37, volume: 0.105, duration: 1.2 },
  { file: 'speed_whoosh.mp3', startSec: 239.52, volume: 0.069, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 245.47, volume: 0.13, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 253.96, volume: 0.048, duration: 1.48 },
  { file: 'bubble_pop.mp3', startSec: 255.73, volume: 0.083, duration: 1.0 },
  { file: 'chapter_sting_3.mp3', startSec: 256.98, volume: 0.059, duration: 1.48 },
  { file: 'sign_pop.mp3', startSec: 272.29, volume: 0.095, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 273.1, volume: 0.13, duration: 1.28 },
  { file: 'coins.mp3', startSec: 274.35, volume: 0.13, duration: 1.2 },
  { file: 'chapter_sting_final.mp3', startSec: 286.3, volume: 0.111, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 287.31, volume: 0.13, duration: 1.08 },
  { file: 'found_ding.mp3', startSec: 290.89, volume: 0.13, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 292.44, volume: 0.13, duration: 1.2 },
  { file: 'cash_register_1.mp3', startSec: 308.61, volume: 0.13, duration: 1.48 },
  { file: 'swipe_whoosh.mp3', startSec: 310.94, volume: 0.072, duration: 1.0 },
  { file: 'subscribe_chime.mp3', startSec: 322.46, volume: 0.13, duration: 1.6 },
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

export const CadaRedSocialYComoTeEngancha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : 9852;
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
      <Img src={staticFile(`cada-red-social-y-como-te-engancha/${prev.file}`)}
        style={{ ...imgStyle, transform: `translate(${px}%, 0%) scale(${pkb.s})` }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Audio src={staticFile('cada-red-social-y-como-te-engancha.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={toFrame(sfx.startSec)} durationInFrames={Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}>
          <Audio src={staticFile(`cada-red-social-y-como-te-engancha-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.1} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {prevEl}
      <Img src={staticFile(`cada-red-social-y-como-te-engancha/${active.file}`)}
        style={{ ...imgStyle, transform: `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};
