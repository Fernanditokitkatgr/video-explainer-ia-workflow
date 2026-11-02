import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-gran-apagon-de-la-historia - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[]; fx?: string }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Lones, las doce y treinta y tres del medio día, estás en casa.
  { file: '0_04.jpg', startSec: 4.52 },  // Se apaga la nevera,
  { file: '0_06.jpg', startSec: 6.06 },  // se apaga el router,
  { file: '0_07.jpg', startSec: 7.48 },  // y el móvil se queda sin datos.
  { file: '0_09.jpg', startSec: 9.54 },  // No es tu casa,
  { file: '0_11.jpg', startSec: 11.02 },  // es España entera y Portugal.
  { file: '0_14.jpg', startSec: 14.24, fx: 'pop' },  // ¿Es el peor apagón de la historia?
  { file: '0_16.jpg', startSec: 16.34 },  // No,
  { file: '0_17.jpg', startSec: 17.0 },  // ni se le acerca.
  { file: '0_18.jpg', startSec: 18.7 },  // Aquí van diez, de los más famosos a los más grandes,
  { file: '0_22.jpg', startSec: 22.0 },  // y los dos últimos llegaron del espacio,
  { file: '0_24.jpg', startSec: 24.3 },  // y al final la pregunta de ese día,
  { file: '0_26.jpg', startSec: 26.6, fx: 'pop' },  // ¿qué apagó España?
  { file: '0_28.jpg', startSec: 28.5 },  // Número uno,
  { file: '0_29.jpg', startSec: 29.7 },  // Nueva York,
  { file: '0_30.jpg', startSec: 30.54, fx: 'pop' },  // 1977,
  { file: '0_32.jpg', startSec: 32.4 },  // el apagón de los saqueos.
  { file: '0_34.jpg', startSec: 34.34 },  // Trece de julio por la noche,
  { file: '0_36.jpg', startSec: 36.14 },  // caen rayos sobre las líneas que alimentan la ciudad,
  { file: '0_38.jpg', startSec: 38.8 },  // y en una hora todo se queda oscuras,
  { file: '0_41.jpg', startSec: 41.28, fx: 'pop' },  // 9 millones de personas,
  { file: '0_43.jpg', startSec: 43.16, fx: 'pop' },  // unas 25 horas sin luz,
  { file: '0_45.jpg', startSec: 45.42, fx: 'pop' },  // saquearon o destrozaron 1 .616 tiendas y hubo más de 1 .000 incendios.
  { file: '0_50.jpg', startSec: 50.9, fx: 'pop' },  // ¿Qué hacer?
  { file: '0_51.jpg', startSec: 51.96 },  // Ten una linterna en un cajón que sepas encontrar a oscuras, su estilo,
  { file: '0_56.jpg', startSec: 56.26 },  // lo empezó un rayo y lo terminaron las personas.
  { file: '1_00.jpg', startSec: 60.3 },  // Número dos, Noreste de Estados Unidos,
  { file: '1_02.jpg', startSec: 62.8, fx: 'pop' },  // 2003,
  { file: '1_03.jpg', startSec: 63.96 },  // el apagón del bujo.
  { file: '1_05.jpg', startSec: 65.52, fx: 'pop' },  // 14 de agosto,
  { file: '1_06.jpg', startSec: 66.8, fx: 'pop' },  // 50 millones de personas sin luz,
  { file: '1_09.jpg', startSec: 69.14, fx: 'pop' },  // 8 estados y ontario.
  { file: '1_11.jpg', startSec: 71.0 },  // Empezó en Ohio,
  { file: '1_12.jpg', startSec: 72.44 },  // unas líneas tocaron árboles sin podar y saltaron,
  { file: '1_15.jpg', startSec: 75.62, fx: 'shake' },  // pero la alarma de la sala de control se había quedado colgada y nadie lo sabía.
  { file: '1_20.jpg', startSec: 80.38 },  // Semanas después encontraron el fallo, un bujo. Dos procesos escribiendo a la vez en el mismo dato.
  { file: '1_26.jpg', startSec: 86.56 },  // Su estilo,
  { file: '1_27.jpg', startSec: 87.54 },  // lo tumbó un árbol y lo agravo una alarma muda.
  { file: '1_31.jpg', startSec: 91.58 },  // Número tres, Italia,
  { file: '1_33.jpg', startSec: 93.2, fx: 'pop' },  // 2003,
  { file: '1_34.jpg', startSec: 94.28 },  // el árbol suizo.
  { file: '1_35.jpg', startSec: 95.78 },  // Las tres de la madrugada, en suiza una línea que lleva electricidad a Italia, roza un árbol y se desconecta.
  { file: '1_42.jpg', startSec: 102.8 },  // Las demás se sobrecargan y en menos de media hora se apaga a Italia entera.
  { file: '1_47.jpg', startSec: 107.98, fx: 'pop' },  // 56 millones de personas hasta 12 horas sin luz
  { file: '1_51.jpg', startSec: 111.96 },  // y pilló a Roma de fiesta era su primera noche blanca.
  { file: '1_55.jpg', startSec: 115.88 },  // Su estilo,
  { file: '1_57.jpg', startSec: 117.02 },  // un solo árbol,
  { file: '1_58.jpg', startSec: 118.24 },  // en otro país.
  { file: '1_59.jpg', startSec: 119.94 },  // Número cuatro,
  { file: '2_01.jpg', startSec: 121.08 },  // Texas,
  { file: '2_02.jpg', startSec: 121.8, fx: 'pop' },  // 2021,
  { file: '2_03.jpg', startSec: 123.22 },  // el apagón helado.
  { file: '2_04.jpg', startSec: 124.78 },  // Una ola de frío con gel a las centrales,
  { file: '2_07.jpg', startSec: 127.42, fx: 'pop' },  // cuatro millones y medio de casas y negocios se quedan sin luz y la red estuvo a cuatro minutos y 37 segundos d
  { file: '2_15.jpg', startSec: 135.16, fx: 'pop' },  // El estado con todos 246 muertos,
  { file: '2_18.jpg', startSec: 138.08, fx: 'pop' },  // al menos 19 por monóxido de carbono.
  { file: '2_20.jpg', startSec: 140.98, fx: 'pop' },  // ¿Qué hacer?
  { file: '2_22.jpg', startSec: 142.04 },  // Nunca enciendas un generador ni una barbacoa adentro de casa.
  { file: '2_25.jpg', startSec: 145.86 },  // Su estilo,
  { file: '2_26.jpg', startSec: 146.8 },  // el estado del calor,
  { file: '2_28.jpg', startSec: 148.22 },  // tumbado por el frío.
  { file: '2_30.jpg', startSec: 150.44 },  // Número cinco,
  { file: '2_31.jpg', startSec: 151.46 },  // Besnes,
  { file: '2_32.jpg', startSec: 152.18, fx: 'pop' },  // 2019,
  { file: '2_33.jpg', startSec: 153.52 },  // el apagón sin culpable.
  { file: '2_35.jpg', startSec: 155.42 },  // Faya Guri,
  { file: '2_36.jpg', startSec: 156.54, fx: 'pop' },  // la presa que da cerca del 70 % de la electricidad del país.
  { file: '2_40.jpg', startSec: 160.64 },  // El gobierno habló de esa botaje.
  { file: '2_42.jpg', startSec: 162.5 },  // Los ingenieros hablaron de un incendio bajo la línea principal y de años sin mantenimiento.
  { file: '2_47.jpg', startSec: 167.74 },  // En Caracas separaron las bombas de agua y hubo gente llenando garrafas junto al río Guaire.
  { file: '2_53.jpg', startSec: 173.38, fx: 'pop' },  // ¿Qué hacer?
  { file: '2_54.jpg', startSec: 174.46 },  // Guarta agua embotellada en casa.
  { file: '2_56.jpg', startSec: 176.62 },  // Su estilo,
  { file: '2_57.jpg', startSec: 177.66 },  // un país a oscuras y dos versiones de quién apagó la luz.
  { file: '3_01.jpg', startSec: 181.94 },  // Y ahora empiezan las causas raras,
  { file: '3_04.jpg', startSec: 184.32 },  // número seis,
  { file: '3_05.jpg', startSec: 185.26 },  // Chile,
  { file: '3_06.jpg', startSec: 185.82, fx: 'pop' },  // 2025,
  { file: '3_07.jpg', startSec: 187.24 },  // el apagón de la reglo.
  { file: '3_08.jpg', startSec: 188.96, fx: 'pop' },  // Si apagan 14 de las 16 regiones del país,
  { file: '3_12.jpg', startSec: 192.18 },  // esa noche hay toque de queda.
  { file: '3_14.jpg', startSec: 194.04 },  // La causa, según el coordinador eléctrico, una empresa tocó los equipos de una línea clave sin avisar y sin per
  { file: '3_21.jpg', startSec: 201.54, fx: 'pop' },  // La protección saltó y la línea entera se cortó. ¿Qué hacer?
  { file: '3_26.jpg', startSec: 206.0 },  // Lleva algo de efectivo,
  { file: '3_27.jpg', startSec: 207.44 },  // si luz los datáfonos dejan de funcionar.
  { file: '3_30.jpg', startSec: 210.38 },  // Su estilo fue a regular una línea y apagó un país.
  { file: '3_35.jpg', startSec: 215.28 },  // Número siete,
  { file: '3_36.jpg', startSec: 216.52 },  // Pakistan,
  { file: '3_37.jpg', startSec: 217.46, fx: 'pop' },  // 2023,
  { file: '3_38.jpg', startSec: 218.96 },  // el apagón de la horro.
  { file: '3_41.jpg', startSec: 221.34, fx: 'pop' },  // Más de 220 millones de habitantes,
  { file: '3_44.jpg', startSec: 224.1 },  // la mayoría sin luz.
  { file: '3_45.jpg', startSec: 225.7, fx: 'pop' },  // ¿Por qué?
  { file: '3_46.jpg', startSec: 226.66 },  // Para ahorrar combustible, apagaron parte de las centrales por la noche.
  { file: '3_50.jpg', startSec: 230.44 },  // Al encenderla subo un baiven de tensión y la red se fue desconectando entera.
  { file: '3_56.jpg', startSec: 236.08 },  // Su estilo apagaron la luz para ahorrar y luego nos supieron encenderla.
  { file: '4_01.jpg', startSec: 241.06 },  // Número ocho,
  { file: '4_02.jpg', startSec: 242.28 },  // India,
  { file: '4_03.jpg', startSec: 242.96, fx: 'pop' },  // 2012,
  { file: '4_04.jpg', startSec: 244.28 },  // el más grande de la historia.
  { file: '4_06.jpg', startSec: 246.58 },  // Cae la red del norte.
  { file: '4_08.jpg', startSec: 248.12 },  // Al día siguiente vuelve a caer y arrastra a la del este.
  { file: '4_11.jpg', startSec: 251.88, fx: 'pop' },  // Más de 600 millones de personas.
  { file: '4_14.jpg', startSec: 254.48 },  // Sientos de mineros se quedan atrapados bajo tierra.
  { file: '4_17.jpg', startSec: 257.86, fx: 'pop' },  // La causa?
  { file: '4_19.jpg', startSec: 259.04 },  // Algunos estados tiraban de más electricidad de la que les tocaba y una línea clave saltó por ir demasiado carg
  { file: '4_25.jpg', startSec: 265.66 },  // Su estilo,
  { file: '4_26.jpg', startSec: 266.68, fx: 'pop' },  // 600 millones a oscuras y ni una avería.
  { file: '4_30.jpg', startSec: 270.62 },  // Y llegamos a los dos más raros.
  { file: '4_32.jpg', startSec: 272.98 },  // Ninguno empezó en la tierra.
  { file: '4_34.jpg', startSec: 274.92 },  // Número nueve, Quebec,
  { file: '4_36.jpg', startSec: 276.8, fx: 'pop' },  // 1989,
  { file: '4_38.jpg', startSec: 278.72 },  // la tormenta solar.
  { file: '4_40.jpg', startSec: 280.28 },  // El sol lanza una nube de partículas y el campo magnético de la tierra se agita.
  { file: '4_45.jpg', startSec: 285.14 },  // Que ve que está sobre una roca que conduce muy mal.
  { file: '4_48.jpg', startSec: 288.14 },  // Así que esas corrientes se meten por las líneas.
  { file: '4_51.jpg', startSec: 291.24, fx: 'pop' },  // En menos de 90 segundos cae la red.
  { file: '4_53.jpg', startSec: 293.88, fx: 'pop' },  // 6 millones de personas.
  { file: '4_55.jpg', startSec: 295.82 },  // Más de nueve horas.
  { file: '4_57.jpg', startSec: 297.7, fx: 'pop' },  // Su estilo lo apagó una estrella a 150 millones de kilómetros.
  { file: '5_03.jpg', startSec: 303.1 },  // Número diez,
  { file: '5_04.jpg', startSec: 304.22 },  // Carrington,
  { file: '5_05.jpg', startSec: 305.16, fx: 'pop' },  // 1859,
  { file: '5_06.jpg', startSec: 306.98 },  // y la pagó antes de la bombilla.
  { file: '5_09.jpg', startSec: 309.24 },  // Llega la tormenta solar más fuerte de la que hay registro. Se ven auroras hasta en Cuba.
  { file: '5_14.jpg', startSec: 314.36 },  // Los telegrafos hechas en chispas.
  { file: '5_16.jpg', startSec: 316.6 },  // Algunas estaciones se incendian.
  { file: '5_18.jpg', startSec: 318.74, fx: 'shake' },  // Pero aquí viene lo más raro.
  { file: '5_20.jpg', startSec: 320.54 },  // Entre Boston y Portland desconecta las baterías y siguen mandando mensajes con la corriente de la aurora.
  { file: '5_26.jpg', startSec: 326.84 },  // Y si pasara hoy.
  { file: '5_28.jpg', startSec: 328.54, fx: 'pop' },  // Lloyds calculó que sólo en Estados Unidos costaría hasta 2 ,6 billones de dólares.
  { file: '5_34.jpg', startSec: 334.38, fx: 'pop' },  // ¿Qué hacer?
  { file: '5_35.jpg', startSec: 335.64, fx: 'pop' },  // La Unión Europea recomienda un kit para 72 horas. Agua, comida, la interna y radioapilas.
  { file: '5_42.jpg', startSec: 342.32 },  // Su estilo todavía no había bombillas y aún así incendió los cables.
  { file: '5_47.jpg', startSec: 347.96 },  // Volvamos a la pregunta.
  { file: '5_49.jpg', startSec: 349.62, fx: 'pop' },  // ¿Qué apagó España?
  { file: '5_51.jpg', startSec: 351.72, fx: 'pop' },  // A las 12 y 33 desaparecieron 15 gigabatios en 5 segundos.
  { file: '5_56.jpg', startSec: 356.34, fx: 'pop' },  // El 60 % de lo que gastaba el país.
  { file: '5_59.jpg', startSec: 359.48, fx: 'pop' },  // En marzo de 2026, los expertos europeos publicaron su informe final.
  { file: '6_04.jpg', startSec: 364.48 },  // Su respuesta sobre tensión.
  { file: '6_07.jpg', startSec: 367.26 },  // La tensión de la red subió sin control.
  { file: '6_09.jpg', startSec: 369.74 },  // Las centrales se desconexaron para protegerse y cada desconexión la subía más.
  { file: '6_15.jpg', startSec: 375.2, fx: 'shake' },  // Pero ojo. El informe habla de varias causas a la vez y reparte el peso.
  { file: '6_19.jpg', startSec: 379.78 },  // Red eléctrica, las centrales y las normas.
  { file: '6_23.jpg', startSec: 383.0 },  // Y la culpa legal la decide otro.
  { file: '6_25.jpg', startSec: 385.12, fx: 'pop' },  // En abril de 2026,
  { file: '6_27.jpg', startSec: 387.02 },  // la CNMC abrió expedientes a red eléctricas y a varias eléctricas.
  { file: '6_32.jpg', startSec: 392.06 },  // Su estilo sin rayo, sin árbol, sin vag. una atención que nadie supo frenar.
  { file: '6_38.jpg', startSec: 398.28, fx: 'pop' },  // ¿Y tú?
  { file: '6_39.jpg', startSec: 399.34, fx: 'pop' },  // ¿Dónde te pidió el apagón?
  { file: '6_40.jpg', startSec: 400.96 },  // Te leo en los comentarios.
  { file: '6_43.jpg', startSec: 403.3 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '6_48.jpg', startSec: 408.44 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number; duration?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.048, duration: 1.76 },
  { file: 'soft_whoosh.mp3', startSec: 4.4, volume: 0.13, duration: 1.28 },
  { file: 'bubble_pop.mp3', startSec: 11.19, volume: 0.083, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 14.12, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 24.18, volume: 0.072, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 27.17, volume: 0.095, duration: 1.0 },
  { file: 'count_1.mp3', startSec: 28.5, volume: 0.13, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 30.51, volume: 0.068, duration: 1.08 },
  { file: 'speed_whoosh.mp3', startSec: 36.02, volume: 0.069, duration: 1.2 },
  { file: 'cash_register_1.mp3', startSec: 41.59, volume: 0.13, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 43.29, volume: 0.13, duration: 1.08 },
  { file: 'time_whoosh.mp3', startSec: 45.3, volume: 0.048, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 49.45, volume: 0.13, duration: 1.2 },
  { file: 'count_2.mp3', startSec: 60.3, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 61.13, volume: 0.083, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 62.77, volume: 0.08, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 63.84, volume: 0.13, duration: 1.28 },
  { file: 'sign_pop.mp3', startSec: 66.77, volume: 0.095, duration: 1.0 },
  { file: 'money_chime.mp3', startSec: 67.27, volume: 0.13, duration: 1.28 },
  { file: 'impact_thud.mp3', startSec: 75.59, volume: 0.13, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 80.26, volume: 0.13, duration: 1.2 },
  { file: 'count_3.mp3', startSec: 91.58, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 92.41, volume: 0.13, duration: 1.08 },
  { file: 'ding.mp3', startSec: 93.17, volume: 0.105, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 94.16, volume: 0.072, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 99.67, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 106.31, volume: 0.083, duration: 1.0 },
  { file: 'coin_clink.mp3', startSec: 108.51, volume: 0.13, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 112.67, volume: 0.095, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 115.76, volume: 0.069, duration: 1.2 },
  { file: 'count_4.mp3', startSec: 119.94, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 121.05, volume: 0.13, duration: 1.08 },
  { file: 'found_ding.mp3', startSec: 121.77, volume: 0.13, duration: 1.0 },
  { file: 'cash_chime.mp3', startSec: 127.67, volume: 0.13, duration: 1.08 },
  { file: 'multiply_pop.mp3', startSec: 132.51, volume: 0.13, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 135.04, volume: 0.048, duration: 1.48 },
  { file: 'bubble_pop.mp3', startSec: 138.35, volume: 0.083, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 145.74, volume: 0.13, duration: 1.28 },
  { file: 'count_5.mp3', startSec: 150.44, volume: 0.13, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 151.43, volume: 0.095, duration: 1.0 },
  { file: 'alert_ding.mp3', startSec: 152.15, volume: 0.13, duration: 1.2 },
  { file: 'whoosh_expand.mp3', startSec: 156.42, volume: 0.13, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 157.71, volume: 0.13, duration: 1.08 },
  { file: 'multiply_pop.mp3', startSec: 167.91, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 176.5, volume: 0.072, duration: 1.0 },
  { file: 'count_6.mp3', startSec: 184.32, volume: 0.13, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 185.79, volume: 0.068, duration: 1.08 },
  { file: 'speed_whoosh.mp3', startSec: 187.12, volume: 0.069, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 189.57, volume: 0.083, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 205.88, volume: 0.048, duration: 1.48 },
  { file: 'chapter_sting_1.mp3', startSec: 215.28, volume: 0.112, duration: 1.48 },
  { file: 'sign_pop.mp3', startSec: 216.49, volume: 0.095, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 217.43, volume: 0.08, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 221.75, volume: 0.13, duration: 1.08 },
  { file: 'coins.mp3', startSec: 222.45, volume: 0.13, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 223.98, volume: 0.13, duration: 1.28 },
  { file: 'whoosh_expand.mp3', startSec: 230.32, volume: 0.13, duration: 1.2 },
  { file: 'chapter_sting_2.mp3', startSec: 241.06, volume: 0.059, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 242.25, volume: 0.13, duration: 1.2 },
  { file: 'ding.mp3', startSec: 242.93, volume: 0.105, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 246.46, volume: 0.072, duration: 1.0 },
  { file: 'cash_register_1.mp3', startSec: 252.53, volume: 0.13, duration: 1.48 },
  { file: 'speed_whoosh.mp3', startSec: 257.74, volume: 0.069, duration: 1.2 },
  { file: 'money_chime.mp3', startSec: 266.97, volume: 0.13, duration: 1.28 },
  { file: 'time_whoosh.mp3', startSec: 270.5, volume: 0.048, duration: 1.48 },
  { file: 'chapter_sting_3.mp3', startSec: 274.92, volume: 0.059, duration: 1.48 },
  { file: 'bubble_pop.mp3', startSec: 275.87, volume: 0.083, duration: 1.0 },
  { file: 'found_ding.mp3', startSec: 276.77, volume: 0.13, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 285.02, volume: 0.13, duration: 1.28 },
  { file: 'sign_pop.mp3', startSec: 291.77, volume: 0.095, duration: 1.0 },
  { file: 'coin_clink.mp3', startSec: 294.23, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 300.09, volume: 0.13, duration: 1.08 },
  { file: 'cash_chime.mp3', startSec: 300.71, volume: 0.13, duration: 1.08 },
  { file: 'chapter_sting_final.mp3', startSec: 303.1, volume: 0.111, duration: 1.48 },
  { file: 'whoosh_expand.mp3', startSec: 304.1, volume: 0.13, duration: 1.2 },
  { file: 'alert_ding.mp3', startSec: 305.13, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 309.12, volume: 0.072, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 313.41, volume: 0.13, duration: 1.2 },
  { file: 'drum_hit.mp3', startSec: 318.71, volume: 0.116, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 320.71, volume: 0.083, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 326.72, volume: 0.069, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 329.87, volume: 0.095, duration: 1.0 },
  { file: 'coins.mp3', startSec: 332.31, volume: 0.13, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 335.79, volume: 0.13, duration: 1.08 },
  { file: 'rising_whoosh.mp3', startSec: 346.86, volume: 0.072, duration: 1.28 },
  { file: 'time_whoosh.mp3', startSec: 347.84, volume: 0.048, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 350.13, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 356.47, volume: 0.083, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 359.69, volume: 0.068, duration: 1.08 },
  { file: 'soft_whoosh.mp3', startSec: 364.36, volume: 0.13, duration: 1.28 },
  { file: 'shock_hit.mp3', startSec: 375.15, volume: 0.13, duration: 1.2 },
  { file: 'whoosh_expand.mp3', startSec: 379.66, volume: 0.13, duration: 1.2 },
  { file: 'good_ding.mp3', startSec: 385.25, volume: 0.08, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 387.05, volume: 0.095, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 398.16, volume: 0.072, duration: 1.0 },
  { file: 'subscribe_chime.mp3', startSec: 403.34, volume: 0.13, duration: 1.6 },
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

export const CadaGranApagonDeLaHistoria: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : 12413;
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
      <Img src={staticFile(`cada-gran-apagon-de-la-historia/${prev.file}`)}
        style={{ ...imgStyle, transform: `translate(${px}%, 0%) scale(${pkb.s})` }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Audio src={staticFile('cada-gran-apagon-de-la-historia.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={toFrame(sfx.startSec)} durationInFrames={Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}>
          <Audio src={staticFile(`cada-gran-apagon-de-la-historia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.1} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {prevEl}
      <Img src={staticFile(`cada-gran-apagon-de-la-historia/${active.file}`)}
        style={{ ...imgStyle, transform: `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};
