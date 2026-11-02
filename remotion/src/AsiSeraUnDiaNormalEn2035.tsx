import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// asi-sera-un-dia-normal-en-2035 - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[]; fx?: string }[] = [
  { file: 'v3_0_00.jpg', startSec: 0.0, fx: 'pop' },  // son las 7 de la mañana
  { file: 'v3_0_01.jpg', startSec: 1.16, fx: 'pop' },  // de un martes de 2035.
  { file: 'v3_0_03.jpg', startSec: 3.48, fx: 'pop' },  // ¿Tú casa ya está calentita?
  { file: 'v3_0_05.jpg', startSec: 5.22, fx: 'pop' },  // ¿Y no tienes caldera?
  { file: 'v3_0_06.jpg', startSec: 6.62 },  // Abajo te espera un taxi,
  { file: 'v3_0_08.jpg', startSec: 8.28 },  // sin nadie al volante.
  { file: 'v3_0_09.jpg', startSec: 9.7 },  // Parece ciencia ficción,
  { file: 'v3_0_11.jpg', startSec: 11.3, fx: 'shake' },  // pero todo lo de este día
  { file: 'v3_0_12.jpg', startSec: 12.44 },  // ya se está construyendo hoy.
  { file: 'v3_0_14.jpg', startSec: 14.3 },  // Otra cosa es que llegue todo.
  { file: 'v3_0_16.jpg', startSec: 16.14 },  // Algunas lo tienen difícil.
  { file: 'v3_0_17.jpg', startSec: 17.82 },  // Y una ya tuvo fecha para dentro de un año.
  { file: 'v3_0_20.jpg', startSec: 20.2, fx: 'pop' },  // De eso hace 7.
  { file: 'v3_0_21.jpg', startSec: 21.46, fx: 'pop' },  // ¿A divinas cuál?
  { file: 'v3_0_22.jpg', startSec: 22.44, fx: 'pop' },  // Estas son las 10 cosas que verás ese día.
  { file: 'v3_0_25.jpg', startSec: 25.24 },  // Te las cuento de una en una
  { file: 'v3_0_26.jpg', startSec: 26.46 },  // de la mañana a la noche.
  { file: 'v3_0_28.jpg', startSec: 28.22, fx: 'pop' },  // Número 1.
  { file: 'v3_0_29.jpg', startSec: 28.9, fx: 'pop' },  // La 7 de la mañana.
  { file: 'v3_0_30.jpg', startSec: 30.72 },  // Te despiertas.
  { file: 'v3_0_31.jpg', startSec: 31.78 },  // El calor sale de una bomba de calor.
  { file: 'v3_0_33.jpg', startSec: 33.88 },  // Y la luz de las placas del tejado.
  { file: 'v3_0_35.jpg', startSec: 35.9 },  // Esto ya es ley.
  { file: 'v3_0_37.jpg', startSec: 37.18 },  // Según la directiva europea de edificios,
  { file: 'v3_0_39.jpg', startSec: 39.2, fx: 'pop' },  // desde 2030 todos los nuevos
  { file: 'v3_0_40.jpg', startSec: 40.94 },  // serán de cero emisiones.
  { file: 'v3_0_42.jpg', startSec: 42.62, fx: 'pop' },  // Y para 2020,
  { file: 'v3_0_44.jpg', startSec: 44.06 },  // Europa quiere dejar de calentar
  { file: 'v3_0_45.jpg', startSec: 45.32 },  // casas con gas y gasoleo.
  { file: 'v3_0_47.jpg', startSec: 47.04 },  // El problema es que España tenía
  { file: 'v3_0_48.jpg', startSec: 48.6 },  // que adaptar la ley antes de junio.
  { file: 'v3_0_50.jpg', startSec: 50.48, fx: 'pop' },  // Y en mayo iba por el 60%.
  { file: 'v3_0_52.jpg', startSec: 52.78 },  // La casa del futuro ya se construye.
  { file: 'v3_0_55.jpg', startSec: 55.2 },  // El piso de tu abuela sigue igual.
  { file: 'v3_0_57.jpg', startSec: 57.18, fx: 'pop' },  // Número 2.
  { file: 'v3_0_58.jpg', startSec: 57.84, fx: 'pop' },  // La 7 y media.
  { file: 'v3_0_59.jpg', startSec: 59.44 },  // El desayuno.
  { file: 'v3_1_00.jpg', startSec: 60.44 },  // Un tas paté en la tostara.
  { file: 'v3_1_02.jpg', startSec: 62.18 },  // Y ese patón nunca existió,
  { file: 'v3_1_03.jpg', startSec: 63.9 },  // salió de células cultivadas.
  { file: 'v3_1_05.jpg', startSec: 65.54 },  // Fue la de Europa ya se vende.
  { file: 'v3_1_07.jpg', startSec: 67.26, fx: 'pop' },  // Singapura provó la carne cultivada en 2020
  { file: 'v3_1_09.jpg', startSec: 69.34, fx: 'pop' },  // y Estados Unidos en 2023.
  { file: 'v3_1_11.jpg', startSec: 71.86 },  // Y en San Sebastián,
  { file: 'v3_1_13.jpg', startSec: 73.06 },  // biotec futs empezó a construir
  { file: 'v3_1_14.jpg', startSec: 74.64 },  // una planta para mil toneladas al año.
  { file: 'v3_1_16.jpg', startSec: 76.92, fx: 'shake' },  // Pero en Italia la han prohibido
  { file: 'v3_1_18.jpg', startSec: 78.38 },  // por ley y la unión
  { file: 'v3_1_19.jpg', startSec: 79.52 },  // europea todavía no ha probado ninguna.
  { file: 'v3_1_21.jpg', startSec: 81.9 },  // La carne del futuro ya existe.
  { file: 'v3_1_23.jpg', startSec: 83.84 },  // Lo difícil es que te dejen comprarla.
  { file: 'v3_1_26.jpg', startSec: 86.18, fx: 'pop' },  // Número 3.
  { file: 'v3_1_27.jpg', startSec: 86.72, fx: 'pop' },  // La 8 y 4.
  { file: 'v3_1_28.jpg', startSec: 88.36 },  // Te vas al curro.
  { file: 'v3_1_29.jpg', startSec: 89.46 },  // Te subes al taxi y el podante gira solo.
  { file: 'v3_1_32.jpg', startSec: 92.14 },  // Waymo, la empresa hermana de Google,
  { file: 'v3_1_34.jpg', startSec: 94.14, fx: 'pop' },  // ya circula sin conductor en más de 10
  { file: 'v3_1_35.jpg', startSec: 95.9 },  // ciudades de Estados Unidos.
  { file: 'v3_1_37.jpg', startSec: 97.62, fx: 'pop' },  // A principios de este año daba unos 500
  { file: 'v3_1_39.jpg', startSec: 99.48 },  // mil viajes de pago a la semana.
  { file: 'v3_1_41.jpg', startSec: 101.62 },  // En Europa quieren empezar por Londres.
  { file: 'v3_1_43.jpg', startSec: 103.6 },  // Para España no ha dado ninguna fecha.
  { file: 'v3_1_45.jpg', startSec: 105.7 },  // O sea, el coche sin conductor ya existe.
  { file: 'v3_1_48.jpg', startSec: 108.32 },  // Solo que vive en otro continente.
  { file: 'v3_1_50.jpg', startSec: 110.28, fx: 'pop' },  // Número 4.
  { file: 'v3_1_51.jpg', startSec: 111.38, fx: 'pop' },  // Las 9.
  { file: 'v3_1_52.jpg', startSec: 112.34 },  // Llegas al trabajo.
  { file: 'v3_1_53.jpg', startSec: 113.14 },  // Tu agente de inteligencia artificial ya ha
  { file: 'v3_1_55.jpg', startSec: 115.52 },  // contestado los correos
  { file: 'v3_1_56.jpg', startSec: 116.62 },  // y te ha hecho el informe.
  { file: 'v3_1_58.jpg', startSec: 118.28 },  // Lo ha medido el laboratorio M -E -T -R.
  { file: 'v3_2_00.jpg', startSec: 120.8 },  // La duración de las tareas que una inteligencia artificial
  { file: 'v3_2_03.jpg', startSec: 123.26, fx: 'pop' },  // termina sola se duplica cada 7 meses
  { file: 'v3_2_05.jpg', startSec: 125.54, fx: 'pop' },  // y lleva así 6 años.
  { file: 'v3_2_07.jpg', startSec: 127.88, fx: 'shake' },  // Pero sólo las afierta a la mitad de las veces.
  { file: 'v3_2_10.jpg', startSec: 130.48 },  // La otra mitad hay que repasarla.
  { file: 'v3_2_12.jpg', startSec: 132.5 },  // Tu compañero de mesa puede ser un programa
  { file: 'v3_2_14.jpg', startSec: 134.44 },  // y tú el que le corrí que los deberés.
  { file: 'v3_2_17.jpg', startSec: 137.08, fx: 'pop' },  // Número 5.
  { file: 'v3_2_18.jpg', startSec: 138.24, fx: 'pop' },  // La 11.
  { file: 'v3_2_19.jpg', startSec: 139.24 },  // El médico.
  { file: 'v3_2_20.jpg', startSec: 140.18 },  // Tu madre se hace una mamografía.
  { file: 'v3_2_21.jpg', startSec: 141.74 },  // Y antes que el radiólogo
  { file: 'v3_2_23.jpg', startSec: 143.24 },  // la mira una inteligencia artificial.
  { file: 'v3_2_25.jpg', startSec: 145.44, fx: 'pop' },  // En Suecia lo probaron con más de 100 .000 mujeres.
  { file: 'v3_2_28.jpg', startSec: 148.2, fx: 'pop' },  // Encontraron un 29
  { file: 'v3_2_29.jpg', startSec: 149.38 },  // % más de cánceres
  { file: 'v3_2_30.jpg', startSec: 150.78 },  // y los radiólogos leyeron
  { file: 'v3_2_32.jpg', startSec: 152.18, fx: 'pop' },  // un 44 % menos.
  { file: 'v3_2_34.jpg', startSec: 154.18 },  // Encontrar más cánceres
  { file: 'v3_2_35.jpg', startSec: 155.44 },  // todavía no demuestra que mueran
  { file: 'v3_2_36.jpg', startSec: 156.82 },  // menos personas y quien firma sigue siendo
  { file: 'v3_2_39.jpg', startSec: 159.24 },  // el médico.
  { file: 'v3_2_40.jpg', startSec: 160.2, fx: 'pop' },  // Número 6.
  { file: 'v3_2_41.jpg', startSec: 161.36, fx: 'pop' },  // La 1.
  { file: 'v3_2_42.jpg', startSec: 162.2 },  // La compra.
  { file: 'v3_2_43.jpg', startSec: 163.1 },  // Te has quedado sin leche.
  { file: 'v3_2_44.jpg', startSec: 164.68 },  // Y un dron te la deja en el jardín.
  { file: 'v3_2_46.jpg', startSec: 166.8 },  // Ya pasa en Texas.
  { file: 'v3_2_47.jpg', startSec: 167.62 },  // Wing, también de Google,
  { file: 'v3_2_49.jpg', startSec: 169.6 },  // reparte con drones para los supermercados Walmart.
  { file: 'v3_2_52.jpg', startSec: 172.22, fx: 'pop' },  // En 2017 quieren llegar
  { file: 'v3_2_53.jpg', startSec: 173.78, fx: 'pop' },  // a más de 40 millones de personas.
  { file: 'v3_2_55.jpg', startSec: 175.92, fx: 'pop' },  // El problema es que cada dron carga poco más de 2
  { file: 'v3_2_58.jpg', startSec: 178.24 },  // kilos y en un piso de Madrid, donde
  { file: 'v3_3_00.jpg', startSec: 180.3 },  // aterrisa.
  { file: 'v3_3_01.jpg', startSec: 181.22 },  // El repartidor del futuro vuela,
  { file: 'v3_3_03.jpg', startSec: 183.28, fx: 'shake' },  // pero necesita un patio.
  { file: 'v3_3_04.jpg', startSec: 184.94 },  // A partir de aquí vienen las que más cuestan.
  { file: 'v3_3_07.jpg', startSec: 187.52, fx: 'pop' },  // Número 7.
  { file: 'v3_3_08.jpg', startSec: 188.72, fx: 'pop' },  // Las 4.
  { file: 'v3_3_09.jpg', startSec: 189.7 },  // El café.
  { file: 'v3_3_10.jpg', startSec: 190.56 },  // Lo pagas con euros digitales desde el móvil.
  { file: 'v3_3_12.jpg', startSec: 192.88 },  // Hasta sin cobertura.
  { file: 'v3_3_14.jpg', startSec: 194.18 },  // Esto ya tiene fecha.
  { file: 'v3_3_15.jpg', startSec: 195.24 },  // El Banco Central Europeo
  { file: 'v3_3_16.jpg', startSec: 196.76, fx: 'pop' },  // quiere emitirlo en 2019.
  { file: 'v3_3_18.jpg', startSec: 198.82 },  // En julio, el Parlamento Europeo
  { file: 'v3_3_20.jpg', startSec: 200.62 },  // votó a abrir la negociación.
  { file: 'v3_3_22.jpg', startSec: 202.26 },  // Y el ponente es español, Fernando Navarrete.
  { file: 'v3_3_25.jpg', startSec: 205.06, fx: 'shake' },  // Pero esa fecha exige a probar la ley este año.
  { file: 'v3_3_27.jpg', startSec: 207.64 },  // Si la ley se retrasa, se retrasa todo.
  { file: 'v3_3_30.jpg', startSec: 210.14, fx: 'pop' },  // Número 8.
  { file: 'v3_3_31.jpg', startSec: 211.28, fx: 'pop' },  // Las 6.
  { file: 'v3_3_32.jpg', startSec: 212.3 },  // Quedas con tus amigos.
  { file: 'v3_3_33.jpg', startSec: 213.8 },  // Llevas gafas con pantalla.
  { file: 'v3_3_35.jpg', startSec: 215.3 },  // Y contestas los mensajes moviendo los dedos.
  { file: 'v3_3_37.jpg', startSec: 217.76 },  // Eso ya se vende.
  { file: 'v3_3_39.jpg', startSec: 219.04 },  // Las gafas raivan con pantalla de meta.
  { file: 'v3_3_41.jpg', startSec: 221.14 },  // Traen una pulsera que lee los gestos de tu mano.
  { file: 'v3_3_43.jpg', startSec: 223.22, fx: 'pop' },  // En octubre de 2026
  { file: 'v3_3_44.jpg', startSec: 224.94 },  // llegaron a Alemania,
  { file: 'v3_3_46.jpg', startSec: 226.26 },  // Francia y Italia
  { file: 'v3_3_47.jpg', startSec: 227.06, fx: 'pop' },  // por 899 euros.
  { file: 'v3_3_49.jpg', startSec: 229.32 },  // A España aún sin fecha.
  { file: 'v3_3_51.jpg', startSec: 231.22 },  // A mí lo que me inquieta es otra cosa.
  { file: 'v3_3_53.jpg', startSec: 233.18 },  // Una cámara en la cara de cada persona
  { file: 'v3_3_54.jpg', startSec: 234.94 },  // y una lucecita
  { file: 'v3_3_56.jpg', startSec: 236.02 },  // como unico aviso de que te graban.
  { file: 'v3_3_58.jpg', startSec: 238.14, fx: 'pop' },  // Número 9.
  { file: 'v3_3_59.jpg', startSec: 239.24, fx: 'pop' },  // Las 8.
  { file: 'v3_4_00.jpg', startSec: 240.28 },  // Vuelves a casa.
  { file: 'v3_4_01.jpg', startSec: 241.38 },  // Y un robot con forma de persona
  { file: 'v3_4_02.jpg', startSec: 242.94 },  // te ha doblado la ropa.
  { file: 'v3_4_04.jpg', startSec: 244.5 },  // La empresa OneX vende
  { file: 'v3_4_05.jpg', startSec: 245.78, fx: 'pop' },  // su robotneo por 20 .000 dólares
  { file: 'v3_4_07.jpg', startSec: 247.68 },  // y promete entregarlo en Estados
  { file: 'v3_4_09.jpg', startSec: 249.24, fx: 'pop' },  // Unidos en 2026.
  { file: 'v3_4_10.jpg', startSec: 250.72, fx: 'shake' },  // Lo raro es
  { file: 'v3_4_11.jpg', startSec: 251.7 },  // que cuando Neo no sabe hacer algo,
  { file: 'v3_4_13.jpg', startSec: 253.82 },  // lo maneja a distancia
  { file: 'v3_4_14.jpg', startSec: 254.66 },  // un empleado, viendo tu casa.
  { file: 'v3_4_16.jpg', startSec: 256.84 },  // Que lo haga todo solo es dudoso.
  { file: 'v3_4_18.jpg', startSec: 258.68 },  // El robot de casa ya existe,
  { file: 'v3_4_20.jpg', startSec: 260.48 },  // lo que le falta es aprender.
  { file: 'v3_4_22.jpg', startSec: 262.2, fx: 'pop' },  // Número 10.
  { file: 'v3_4_23.jpg', startSec: 263.32, fx: 'pop' },  // La 11 de la noche.
  { file: 'v3_4_24.jpg', startSec: 264.66 },  // Ya en la cama.
  { file: 'v3_4_25.jpg', startSec: 265.7 },  // Escribes un mensaje sin tocar el móvil.
  { file: 'v3_4_28.jpg', startSec: 268.02 },  // Solo compensarlo.
  { file: 'v3_4_29.jpg', startSec: 269.34 },  // Esto ya pasa en ensayos.
  { file: 'v3_4_31.jpg', startSec: 271.16 },  // Neuralink, la empresa de Elon Musk implanta
  { file: 'v3_4_33.jpg', startSec: 273.6 },  // un chip en el cerebro de personas con paralisis.
  { file: 'v3_4_35.jpg', startSec: 275.76, fx: 'pop' },  // En enero de este año ya eran 21
  { file: 'v3_4_37.jpg', startSec: 277.96 },  // personas y mueven
  { file: 'v3_4_39.jpg', startSec: 279.46 },  // un cursor con la mente.
  { file: 'v3_4_40.jpg', startSec: 280.98 },  // Aunque al primer paciente se les saltaron
  { file: 'v3_4_42.jpg', startSec: 282.66 },  // parte de los hilos del implante.
  { file: 'v3_4_44.jpg', startSec: 284.42 },  // Para alguien sano, todavía es dudoso,
  { file: 'v3_4_46.jpg', startSec: 286.72, fx: 'shake' },  // pero para quien no puede mover las manos,
  { file: 'v3_4_48.jpg', startSec: 288.9 },  // escribir con la mente ya es real.
  { file: 'v3_4_51.jpg', startSec: 291.16 },  // Y ahora la pregunta del principio.
  { file: 'v3_4_53.jpg', startSec: 293.36, fx: 'pop' },  // ¿Cuál se saltó su fecha?
  { file: 'v3_4_54.jpg', startSec: 294.9 },  // El taxi sin conductor.
  { file: 'v3_4_56.jpg', startSec: 296.58, fx: 'shake' },  // ¿Pero el de Tesla?
  { file: 'v3_4_57.jpg', startSec: 297.74, fx: 'pop' },  // En 2019,
  { file: 'v3_4_59.jpg', startSec: 299.02 },  // Elon Musk prometió más de un millón
  { file: 'v3_5_00.jpg', startSec: 300.66 },  // de robotaxis para el año siguiente.
  { file: 'v3_5_02.jpg', startSec: 302.3, fx: 'pop' },  // Al acabar 2025,
  { file: 'v3_5_04.jpg', startSec: 304.3, fx: 'pop' },  // en Austin circulaban unos 30.
  { file: 'v3_5_06.jpg', startSec: 306.24 },  // Y lo curioso es que esa promesa fallida
  { file: 'v3_5_08.jpg', startSec: 308.04 },  // es de las que ya existen.
  { file: 'v3_5_09.jpg', startSec: 309.8 },  // Weymoo la cumple cada semana.
  { file: 'v3_5_11.jpg', startSec: 311.62, fx: 'pop' },  // ¿Y tú?
  { file: 'v3_5_12.jpg', startSec: 312.22, fx: 'pop' },  // ¿Cuál de las 10 crees que llega antes a España?
  { file: 'v3_5_14.jpg', startSec: 314.58 },  // Te leeré en los comentarios.
  { file: 'v3_5_15.jpg', startSec: 315.96 },  // Si te gusta entender cómo funciona de verdad la tecnología
  { file: 'v3_5_18.jpg', startSec: 318.36 },  // que usas cada día, suscríbete.
  { file: 'v3_5_20.jpg', startSec: 320.5 },  // Cada semana, una máquina,
  { file: 'v3_5_21.jpg', startSec: 321.96 },  // un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number; duration?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.048, duration: 1.76 },
  { file: 'soft_ping.mp3', startSec: 1.97, volume: 0.068, duration: 1.08 },
  { file: 'soft_whoosh.mp3', startSec: 3.36, volume: 0.13, duration: 1.28 },
  { file: 'impact_thud.mp3', startSec: 11.27, volume: 0.13, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 16.02, volume: 0.13, duration: 1.2 },
  { file: 'rising_whoosh.mp3', startSec: 20.36, volume: 0.072, duration: 1.28 },
  { file: 'mystery_sting.mp3', startSec: 21.46, volume: 0.058, duration: 1.2 },
  { file: 'count_1.mp3', startSec: 28.22, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 29.37, volume: 0.083, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 37.06, volume: 0.072, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 39.29, volume: 0.08, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 44.03, volume: 0.095, duration: 1.0 },
  { file: 'ding.mp3', startSec: 49.79, volume: 0.105, duration: 1.2 },
  { file: 'speed_whoosh.mp3', startSec: 55.08, volume: 0.069, duration: 1.2 },
  { file: 'count_2.mp3', startSec: 57.18, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 58.31, volume: 0.13, duration: 1.08 },
  { file: 'found_ding.mp3', startSec: 68.87, volume: 0.13, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 72.01, volume: 0.13, duration: 1.2 },
  { file: 'time_whoosh.mp3', startSec: 72.94, volume: 0.048, duration: 1.48 },
  { file: 'drum_hit.mp3', startSec: 76.89, volume: 0.116, duration: 1.0 },
  { file: 'count_3.mp3', startSec: 86.18, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 87.21, volume: 0.083, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 95.78, volume: 0.13, duration: 1.28 },
  { file: 'sign_pop.mp3', startSec: 99.17, volume: 0.095, duration: 1.0 },
  { file: 'count_4.mp3', startSec: 110.28, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 111.49, volume: 0.13, duration: 1.08 },
  { file: 'whoosh_expand.mp3', startSec: 115.4, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 124.77, volume: 0.13, duration: 1.2 },
  { file: 'shock_hit.mp3', startSec: 127.85, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 130.36, volume: 0.072, duration: 1.0 },
  { file: 'count_5.mp3', startSec: 137.08, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 138.39, volume: 0.083, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 148.08, volume: 0.069, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 152.27, volume: 0.095, duration: 1.0 },
  { file: 'count_6.mp3', startSec: 160.2, volume: 0.13, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 162.08, volume: 0.048, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 167.35, volume: 0.13, duration: 1.08 },
  { file: 'alert_ding.mp3', startSec: 172.31, volume: 0.13, duration: 1.2 },
  { file: 'cash_register_1.mp3', startSec: 174.37, volume: 0.13, duration: 1.48 },
  { file: 'multiply_pop.mp3', startSec: 178.01, volume: 0.13, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 180.18, volume: 0.13, duration: 1.28 },
  { file: 'impact_beat.mp3', startSec: 183.25, volume: 0.068, duration: 1.0 },
  { file: 'chapter_sting_1.mp3', startSec: 187.52, volume: 0.112, duration: 1.48 },
  { file: 'money_chime.mp3', startSec: 191.13, volume: 0.13, duration: 1.28 },
  { file: 'bubble_pop.mp3', startSec: 195.65, volume: 0.083, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 197.51, volume: 0.068, duration: 1.08 },
  { file: 'whoosh_expand.mp3', startSec: 200.5, volume: 0.13, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 203.75, volume: 0.095, duration: 1.0 },
  { file: 'dramatic_hit.mp3', startSec: 205.03, volume: 0.032, duration: 1.2 },
  { file: 'chapter_sting_2.mp3', startSec: 210.14, volume: 0.059, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 211.47, volume: 0.13, duration: 1.08 },
  { file: 'swipe_whoosh.mp3', startSec: 221.02, volume: 0.072, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 223.65, volume: 0.08, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 225.49, volume: 0.13, duration: 1.2 },
  { file: 'coin_clink.mp3', startSec: 228.47, volume: 0.13, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 235.9, volume: 0.069, duration: 1.2 },
  { file: 'chapter_sting_3.mp3', startSec: 238.14, volume: 0.059, duration: 1.48 },
  { file: 'cash_chime.mp3', startSec: 247.29, volume: 0.13, duration: 1.08 },
  { file: 'ding.mp3', startSec: 249.87, volume: 0.105, duration: 1.2 },
  { file: 'impact_thud.mp3', startSec: 250.69, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 252.19, volume: 0.083, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 253.7, volume: 0.048, duration: 1.48 },
  { file: 'chapter_sting_final.mp3', startSec: 262.2, volume: 0.111, duration: 1.48 },
  { file: 'sign_pop.mp3', startSec: 263.35, volume: 0.095, duration: 1.0 },
  { file: 'soft_whoosh.mp3', startSec: 271.04, volume: 0.13, duration: 1.28 },
  { file: 'found_ding.mp3', startSec: 276.23, volume: 0.13, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 277.49, volume: 0.13, duration: 1.08 },
  { file: 'drum_hit.mp3', startSec: 286.69, volume: 0.116, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 288.78, volume: 0.13, duration: 1.2 },
  { file: 'shock_hit.mp3', startSec: 296.55, volume: 0.13, duration: 1.2 },
  { file: 'alert_ding.mp3', startSec: 297.85, volume: 0.13, duration: 1.2 },
  { file: 'coins.mp3', startSec: 300.33, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 304.35, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 306.12, volume: 0.072, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 312.57, volume: 0.083, duration: 1.0 },
  { file: 'subscribe_chime.mp3', startSec: 315.96, volume: 0.13, duration: 1.6 },
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

export const AsiSeraUnDiaNormalEn2035: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : 9761;
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
      <Img src={staticFile(`asi-sera-un-dia-normal-en-2035/${prev.file}`)}
        style={{ ...imgStyle, transform: `translate(${px}%, 0%) scale(${pkb.s})` }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Audio src={staticFile('asi-sera-un-dia-normal-en-2035.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={toFrame(sfx.startSec)} durationInFrames={Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}>
          <Audio src={staticFile(`asi-sera-un-dia-normal-en-2035-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.1} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {prevEl}
      <Img src={staticFile(`asi-sera-un-dia-normal-en-2035/${active.file}`)}
        style={{ ...imgStyle, transform: `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};
