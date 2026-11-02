import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Loop, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// por-que-tu-movil-va-mas-lento-con-los-anos - canal tecno. Generado por scripts/make_tsx.py (movimiento + transiciones + SFX densos).
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[]; fx?: string }[] = [
  { file: 'v3_0_00.jpg', startSec: 0.0 },  // Desbloqueas el móvil. Y tarda.
  { file: 'v3_0_02.jpg', startSec: 2.96 },  // Hace dos años volaba
  { file: 'v3_0_04.jpg', startSec: 4.08 },  // y no ya has hecho nada.
  { file: 'v3_0_05.jpg', startSec: 5.96, fx: 'pop' },  // ¿Se ha estropeado? No.
  { file: 'v3_0_07.jpg', startSec: 7.66 },  // Hay una explicación.
  { file: 'v3_0_08.jpg', startSec: 8.92 },  // Bueno, hay diez.
  { file: 'v3_0_10.jpg', startSec: 10.36 },  // Y al final la gran pregunta.
  { file: 'v3_0_12.jpg', startSec: 12.42, fx: 'pop' },  // ¿Te lo hacen a propósito?
  { file: 'v3_0_13.jpg', startSec: 13.78 },  // Estas son las diez razones por las que tu móvil
  { file: 'v3_0_16.jpg', startSec: 16.0 },  // va más lento con los años.
  { file: 'v3_0_17.jpg', startSec: 17.86 },  // Te las cuento de una en una,
  { file: 'v3_0_19.jpg', startSec: 19.28 },  // de la más común a la más sorprendente.
  { file: 'v3_0_21.jpg', startSec: 21.62 },  // Número uno.
  { file: 'v3_0_23.jpg', startSec: 22.6 },  // La memoria llena. El trastero.
  { file: 'v3_0_24.jpg', startSec: 24.74 },  // La memoria de tu móvil no escribe encima de lo viejo.
  { file: 'v3_0_27.jpg', startSec: 27.36 },  // Primero tiene que borrar.
  { file: 'v3_0_28.jpg', startSec: 28.48 },  // Si está casi llena,
  { file: 'v3_0_30.jpg', startSec: 30.0 },  // cada foto nueva es un Tetris.
  { file: 'v3_0_31.jpg', startSec: 31.88 },  // Y todo se atasca.
  { file: 'v3_0_33.jpg', startSec: 33.16, fx: 'pop' },  // En 2013, la tablet Nexus 7
  { file: 'v3_0_34.jpg', startSec: 34.94 },  // de Google se arrastraba por algo así.
  { file: 'v3_0_37.jpg', startSec: 37.06 },  // Lo arregló una actualización.
  { file: 'v3_0_38.jpg', startSec: 38.58 },  // Así que entra en ajustes, almacenamiento,
  { file: 'v3_0_41.jpg', startSec: 41.06 },  // y borra las apps que no usas.
  { file: 'v3_0_42.jpg', startSec: 42.78 },  // Deja libre un buen trozo.
  { file: 'v3_0_44.jpg', startSec: 44.22 },  // Número dos.
  { file: 'v3_0_45.jpg', startSec: 45.14 },  // Las apps que engordan. La mochila.
  { file: 'v3_0_47.jpg', startSec: 47.48 },  // Cada año tus apps hacen
  { file: 'v3_0_48.jpg', startSec: 48.74 },  // más cosas. Y pesan más.
  { file: 'v3_0_50.jpg', startSec: 50.84 },  // Sensor Tower midió las diez apps
  { file: 'v3_0_52.jpg', startSec: 52.46 },  // más instaladas en iPhone en Estados Unidos.
  { file: 'v3_0_54.jpg', startSec: 54.52, fx: 'pop' },  // En 2013 ocupaban
  { file: 'v3_0_56.jpg', startSec: 56.08, fx: 'pop' },  // 164 Megas.
  { file: 'v3_0_57.jpg', startSec: 57.8, fx: 'pop' },  // En 2017 casi dos gigas,
  { file: 'v3_1_00.jpg', startSec: 60.38, fx: 'pop' },  // 11 veces más.
  { file: 'v3_1_01.jpg', startSec: 61.64 },  // Lo que usas poco, abrelo en la web.
  { file: 'v3_1_03.jpg', startSec: 63.8 },  // La app se llama igual,
  { file: 'v3_1_04.jpg', startSec: 64.98, fx: 'shake' },  // pero cada año pesa más.
  { file: 'v3_1_06.jpg', startSec: 66.82 },  // Número tres. Las apps en segundo plano.
  { file: 'v3_1_09.jpg', startSec: 69.24 },  // Él ocupa. Cierras una app.
  { file: 'v3_1_11.jpg', startSec: 71.2, fx: 'shake' },  // Pero muchas siguen despiertas por detrás.
  { file: 'v3_1_13.jpg', startSec: 73.72, fx: 'pop' },  // En 2015, Facebook admitió que su app de iPhone
  { file: 'v3_1_16.jpg', startSec: 76.2 },  // dejaba el audio abierto después de ver un video.
  { file: 'v3_1_18.jpg', startSec: 78.82 },  // Así seguía viva,
  { file: 'v3_1_20.jpg', startSec: 80.1 },  // comiéndose batería y procesador.
  { file: 'v3_1_21.jpg', startSec: 81.86 },  // Quitales el permiso de segundo
  { file: 'v3_1_23.jpg', startSec: 83.28 },  // plano a las que no lo necesitan.
  { file: 'v3_1_25.jpg', startSec: 85.08 },  // Les cierras la puerta y se quedan dentro.
  { file: 'v3_1_27.jpg', startSec: 87.6 },  // Número cuatro. La batería. El abuelo.
  { file: 'v3_1_30.jpg', startSec: 90.3 },  // Las baterías del hitio envejecen con cada carga.
  { file: 'v3_1_32.jpg', startSec: 92.94, fx: 'pop' },  // Según Apple, hasta el iPhone 14 conservan
  { file: 'v3_1_35.jpg', startSec: 95.1, fx: 'pop' },  // el 80 % después de 500 ciclos.
  { file: 'v3_1_37.jpg', startSec: 97.62, fx: 'pop' },  // En el 15, después de 1000
  { file: 'v3_1_40.jpg', startSec: 99.08 },  // y una batería vieja dan menos fuerza de golpe.
  { file: 'v3_1_42.jpg', startSec: 102.14 },  // Tanto que el móvil puede apagarse solo.
  { file: 'v3_1_44.jpg', startSec: 104.46 },  // Mira su estado en ajustes, batería.
  { file: 'v3_1_46.jpg', startSec: 106.62, fx: 'pop' },  // Si baja del 80 % cambia la.
  { file: 'v3_1_48.jpg', startSec: 108.9 },  // Cada carga le suma
  { file: 'v3_1_49.jpg', startSec: 109.9 },  // una ruga.
  { file: 'v3_1_51.jpg', startSec: 110.82 },  // Número cinco. El calor. El dormilón.
  { file: 'v3_1_53.jpg', startSec: 113.7 },  // Si el chip se calienta además,
  { file: 'v3_1_55.jpg', startSec: 115.22 },  // el móvil se frena solo para protegerse.
  { file: 'v3_1_57.jpg', startSec: 117.58 },  // Apple dice que el iPhone está hecho para usarse
  { file: 'v3_1_59.jpg', startSec: 119.5, fx: 'pop' },  // entre 0 y 35 grados.
  { file: 'v3_2_01.jpg', startSec: 121.42, fx: 'pop' },  // En 2023,
  { file: 'v3_2_02.jpg', startSec: 122.76, fx: 'pop' },  // el iPhone 15 Pro salió quemando.
  { file: 'v3_2_04.jpg', startSec: 124.96 },  // Apple culpó a un fallo suyo
  { file: 'v3_2_06.jpg', startSec: 126.44 },  // y apps como Instagram y Uber.
  { file: 'v3_2_08.jpg', startSec: 128.72 },  // No juegas mientras carga
  { file: 'v3_2_09.jpg', startSec: 129.98 },  // y no lo dejes al sol.
  { file: 'v3_2_11.jpg', startSec: 131.82 },  // Cuando suda se echa la siesta.
  { file: 'v3_2_13.jpg', startSec: 133.98 },  // Número seis. Las actualizaciones.
  { file: 'v3_2_16.jpg', startSec: 136.28 },  // El traje de otra talla.
  { file: 'v3_2_17.jpg', startSec: 137.86 },  // Cada sistema nuevo se diseña
  { file: 'v3_2_19.jpg', startSec: 139.14 },  // para chips más potentes.
  { file: 'v3_2_20.jpg', startSec: 140.44 },  // Y al tuyo le queda pequeño.
  { file: 'v3_2_22.jpg', startSec: 142.56, fx: 'pop' },  // En 2018,
  { file: 'v3_2_23.jpg', startSec: 143.82, fx: 'pop' },  // Italia multó a Apple con 10 millones
  { file: 'v3_2_25.jpg', startSec: 145.5, fx: 'pop' },  // de euros y Samsung con 5.
  { file: 'v3_2_27.jpg', startSec: 147.96, fx: 'pop' },  // Por insistir en actualizar el iPhone 6 y el Galaxy
  { file: 'v3_2_30.jpg', startSec: 150.28, fx: 'pop' },  // Note 4 sin avisar de que irían peor.
  { file: 'v3_2_32.jpg', startSec: 152.94 },  // Antes de una actualización grande, espera unos días.
  { file: 'v3_2_35.jpg', startSec: 155.84 },  // Las de seguridad instala la siempre.
  { file: 'v3_2_38.jpg', startSec: 158.12 },  // Y ahora vienen las sorprendentes.
  { file: 'v3_2_40.jpg', startSec: 160.24 },  // Número siete. La asensación.
  { file: 'v3_2_42.jpg', startSec: 162.52 },  // El escaparate.
  { file: 'v3_2_43.jpg', startSec: 163.78, fx: 'pop' },  // En 2014, una investigadora
  { file: 'v3_2_45.jpg', startSec: 165.7 },  // de Harvard miró las búsqueras de Google.
  { file: 'v3_2_47.jpg', startSec: 167.44 },  // Las de iPhone lento se disparaban
  { file: 'v3_2_49.jpg', startSec: 169.46 },  // justo cuando salía un iPhone nuevo.
  { file: 'v3_2_51.jpg', startSec: 171.44 },  // Las de Samsung al excelento. No.
  { file: 'v3_2_53.jpg', startSec: 173.74 },  // Coincidir no demuestra trampa.
  { file: 'v3_2_55.jpg', startSec: 175.7 },  // Puede ser el sistema nuevo que sale a la vez.
  { file: 'v3_2_58.jpg', startSec: 178.14 },  // Lo que ayuda es reducir las animaciones.
  { file: 'v3_3_00.jpg', startSec: 180.38 },  // En iPhone, en accesibilidad, movimiento.
  { file: 'v3_3_02.jpg', startSec: 182.96 },  // En Android, en opciones de desarrollador.
  { file: 'v3_3_05.jpg', startSec: 185.12 },  // Tu móvil sigue igual.
  { file: 'v3_3_06.jpg', startSec: 186.44 },  // El que ha cambiado es el del escaparate.
  { file: 'v3_3_08.jpg', startSec: 188.42, fx: 'shake' },  // Pero esa sospecha tenía algo de verdad.
  { file: 'v3_3_10.jpg', startSec: 190.86 },  // Número ocho. El battery gate.
  { file: 'v3_3_13.jpg', startSec: 193.04 },  // El freno secreto.
  { file: 'v3_3_14.jpg', startSec: 194.64, fx: 'pop' },  // 2017. Un usuario cambia la batería
  { file: 'v3_3_16.jpg', startSec: 196.98, fx: 'pop' },  // de su iPhone 6S y de repente vuela.
  { file: 'v3_3_19.jpg', startSec: 199.72 },  // El creador de Geekbench mira sus datos.
  { file: 'v3_3_21.jpg', startSec: 201.96 },  // Después de una actualización,
  { file: 'v3_3_23.jpg', startSec: 203.48 },  // los iPhone con batería gastada
  { file: 'v3_3_24.jpg', startSec: 204.78 },  // iban más lentos.
  { file: 'v3_3_26.jpg', startSec: 206.32 },  // Apple lo confirmó.
  { file: 'v3_3_27.jpg', startSec: 207.62 },  // Los frenaba para que no se apagaran solos.
  { file: 'v3_3_29.jpg', startSec: 209.86 },  // Y no lo había contado.
  { file: 'v3_3_31.jpg', startSec: 211.36 },  // En Estados Unidos aceptó pagar
  { file: 'v3_3_32.jpg', startSec: 212.72, fx: 'pop' },  // hasta 500 millones de dólares.
  { file: 'v3_3_34.jpg', startSec: 214.76, fx: 'pop' },  // En Francia, 25 millones de euros de multa.
  { file: 'v3_3_37.jpg', startSec: 217.32 },  // Y en España, la OCEU lo llevó a los tribunales.
  { file: 'v3_3_40.jpg', startSec: 220.1 },  // Hoy puedes desactivar ese freno en ajustes.
  { file: 'v3_3_42.jpg', startSec: 222.26 },  // batería, estado.
  { file: 'v3_3_43.jpg', startSec: 223.94 },  // O cambiar la batería.
  { file: 'v3_3_45.jpg', startSec: 225.32 },  // Te frenaba por tu bien.
  { file: 'v3_3_46.jpg', startSec: 226.88, fx: 'shake' },  // Pero se le olvidó decirte lo.
  { file: 'v3_3_48.jpg', startSec: 228.64, fx: 'pop' },  // Número 9. El fin de las actualizaciones.
  { file: 'v3_3_51.jpg', startSec: 231.48 },  // La fecha de caducidad.
  { file: 'v3_3_52.jpg', startSec: 232.84 },  // Un día, dejan de llegar.
  { file: 'v3_3_54.jpg', startSec: 234.52 },  // Y las apps piden un sistema que ya no tienes.
  { file: 'v3_3_57.jpg', startSec: 237.02, fx: 'pop' },  // En 2015, Francia hizo delito la obsolescencia
  { file: 'v3_3_59.jpg', startSec: 239.52 },  // programada con hasta dos años de cárcel.
  { file: 'v3_4_02.jpg', startSec: 242.26, fx: 'pop' },  // Desde junio de 2025,
  { file: 'v3_4_04.jpg', startSec: 244.04 },  // la Unión Europea exige al menos
  { file: 'v3_4_05.jpg', startSec: 245.4 },  // cinco años de actualizaciones.
  { file: 'v3_4_07.jpg', startSec: 247.14, fx: 'pop' },  // Y en 2027 llega la norma de baterías
  { file: 'v3_4_09.jpg', startSec: 249.56 },  // cambiables con excepciones
  { file: 'v3_4_11.jpg', startSec: 251.12 },  // para las más duraderas.
  { file: 'v3_4_12.jpg', startSec: 252.62 },  // Antes de comprar, mira cuántos años
  { file: 'v3_4_14.jpg', startSec: 254.4 },  // de actualizaciones promete la marca.
  { file: 'v3_4_16.jpg', startSec: 256.4 },  // Y la última. La más rara.
  { file: 'v3_4_17.jpg', startSec: 258.56, fx: 'pop' },  // Número 10.
  { file: 'v3_4_19.jpg', startSec: 259.56 },  // El freno selectivo.
  { file: 'v3_4_20.jpg', startSec: 260.94 },  // El empollón del examen.
  { file: 'v3_4_22.jpg', startSec: 262.8, fx: 'pop' },  // 2022. En Corea descubren
  { file: 'v3_4_24.jpg', startSec: 264.7 },  // que un servicio de Samsung Frena sus Galaxy.
  { file: 'v3_4_27.jpg', startSec: 267.24, fx: 'pop' },  // En una lista filtrada salían más de 10 .000 apps
  { file: 'v3_4_29.jpg', startSec: 269.7 },  // hasta Instagram y TikTok.
  { file: 'v3_4_31.jpg', startSec: 271.46, fx: 'shake' },  // Pero faltaban las apps que miden la velocidad.
  { file: 'v3_4_33.jpg', startSec: 273.48 },  // Geekbench lo llamó Manipulación.
  { file: 'v3_4_36.jpg', startSec: 276.08 },  // Y borró de su ranking cuatro generaciones de Galaxy.
  { file: 'v3_4_38.jpg', startSec: 278.94, fx: 'pop' },  // En 2026,
  { file: 'v3_4_40.jpg', startSec: 280.04 },  // un Tribunal de Seul obligó a Samsung
  { file: 'v3_4_41.jpg', startSec: 281.62, fx: 'pop' },  // a compensar a casi 2 .000 usuarios.
  { file: 'v3_4_44.jpg', startSec: 284.06, fx: 'pop' },  // En el examen saca un 10.
  { file: 'v3_4_45.jpg', startSec: 285.76 },  // En tu día a día, te frena.
  { file: 'v3_4_47.jpg', startSec: 287.68, fx: 'pop' },  // Volvamos a la pregunta. ¿Te lo hacen a propósito?
  { file: 'v3_4_50.jpg', startSec: 290.38 },  // Lo he demostrado de esto.
  { file: 'v3_4_52.jpg', startSec: 292.04 },  // Apple y Samsung frenaron móviles sin avisar.
  { file: 'v3_4_54.jpg', startSec: 294.58 },  // Y pagaron por ello.
  { file: 'v3_4_56.jpg', startSec: 296.0, fx: 'shake' },  // Pero hacerlo para que compres otro
  { file: 'v3_4_57.jpg', startSec: 297.68 },  // es lo más difícil de probar.
  { file: 'v3_4_59.jpg', startSec: 299.36 },  // La ley francesa tardó
  { file: 'v3_5_00.jpg', startSec: 300.7, fx: 'pop' },  // más de 10 años en llegar
  { file: 'v3_5_02.jpg', startSec: 302.04 },  // a su primer juicio y fue
  { file: 'v3_5_03.jpg', startSec: 303.5 },  // contra una marca de impresoras.
  { file: 'v3_5_05.jpg', startSec: 305.34 },  // Que te lo frenan, está demostrado.
  { file: 'v3_5_07.jpg', startSec: 307.38 },  // Que sea para venderte otro, todavía no.
  { file: 'v3_5_09.jpg', startSec: 309.88, fx: 'pop' },  // ¿Y tú? ¿Cuántos años tiene tu móvil?
  { file: 'v3_5_12.jpg', startSec: 312.02 },  // Te leo en los comentarios.
  { file: 'v3_5_13.jpg', startSec: 313.4 },  // Si te gusta entender cómo funciona de verdad
  { file: 'v3_5_15.jpg', startSec: 315.22 },  // la tecnología que usas cada día, suscríbete.
  { file: 'v3_5_17.jpg', startSec: 317.84 },  // Cada semana, una máquina,
  { file: 'v3_5_19.jpg', startSec: 319.28 },  // un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number; duration?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.048, duration: 1.76 },
  { file: 'soft_whoosh.mp3', startSec: 2.84, volume: 0.13, duration: 1.28 },
  { file: 'impact_thud.mp3', startSec: 7.09, volume: 0.13, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 15.88, volume: 0.13, duration: 1.2 },
  { file: 'count_1.mp3', startSec: 21.62, volume: 0.13, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 29.88, volume: 0.072, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 31.07, volume: 0.083, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 33.23, volume: 0.068, duration: 1.08 },
  { file: 'count_2.mp3', startSec: 44.22, volume: 0.13, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 47.36, volume: 0.069, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 51.13, volume: 0.095, duration: 1.0 },
  { file: 'good_ding.mp3', startSec: 54.95, volume: 0.08, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 57.13, volume: 0.13, duration: 1.08 },
  { file: 'time_whoosh.mp3', startSec: 63.68, volume: 0.048, duration: 1.48 },
  { file: 'drum_hit.mp3', startSec: 64.95, volume: 0.116, duration: 1.0 },
  { file: 'count_3.mp3', startSec: 66.82, volume: 0.13, duration: 1.0 },
  { file: 'ding.mp3', startSec: 73.77, volume: 0.105, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 74.67, volume: 0.13, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 84.96, volume: 0.13, duration: 1.28 },
  { file: 'count_4.mp3', startSec: 87.6, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 93.15, volume: 0.083, duration: 1.0 },
  { file: 'sign_pop.mp3', startSec: 98.91, volume: 0.095, duration: 1.0 },
  { file: 'whoosh_expand.mp3', startSec: 102.02, volume: 0.13, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 107.05, volume: 0.13, duration: 1.08 },
  { file: 'count_5.mp3', startSec: 110.82, volume: 0.13, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 119.77, volume: 0.13, duration: 1.2 },
  { file: 'found_ding.mp3', startSec: 121.53, volume: 0.13, duration: 1.0 },
  { file: 'swipe_whoosh.mp3', startSec: 122.64, volume: 0.072, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 127.21, volume: 0.083, duration: 1.0 },
  { file: 'count_6.mp3', startSec: 133.98, volume: 0.13, duration: 1.0 },
  { file: 'speed_whoosh.mp3', startSec: 136.16, volume: 0.069, duration: 1.2 },
  { file: 'alert_ding.mp3', startSec: 142.65, volume: 0.13, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 143.79, volume: 0.095, duration: 1.0 },
  { file: 'cash_register_1.mp3', startSec: 145.13, volume: 0.13, duration: 1.48 },
  { file: 'tool_pop.mp3', startSec: 149.57, volume: 0.13, duration: 1.08 },
  { file: 'time_whoosh.mp3', startSec: 158.0, volume: 0.048, duration: 1.48 },
  { file: 'chapter_sting_1.mp3', startSec: 160.24, volume: 0.112, duration: 1.48 },
  { file: 'soft_ping.mp3', startSec: 163.85, volume: 0.068, duration: 1.08 },
  { file: 'multiply_pop.mp3', startSec: 165.85, volume: 0.13, duration: 1.2 },
  { file: 'bubble_pop.mp3', startSec: 171.69, volume: 0.083, duration: 1.0 },
  { file: 'shock_hit.mp3', startSec: 173.23, volume: 0.13, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 178.02, volume: 0.13, duration: 1.28 },
  { file: 'sign_pop.mp3', startSec: 183.07, volume: 0.095, duration: 1.0 },
  { file: 'impact_beat.mp3', startSec: 188.39, volume: 0.068, duration: 1.0 },
  { file: 'chapter_sting_2.mp3', startSec: 190.86, volume: 0.059, duration: 1.48 },
  { file: 'good_ding.mp3', startSec: 194.61, volume: 0.08, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 197.37, volume: 0.13, duration: 1.08 },
  { file: 'whoosh_expand.mp3', startSec: 199.6, volume: 0.13, duration: 1.2 },
  { file: 'multiply_pop.mp3', startSec: 211.43, volume: 0.13, duration: 1.2 },
  { file: 'money_chime.mp3', startSec: 213.21, volume: 0.13, duration: 1.28 },
  { file: 'swipe_whoosh.mp3', startSec: 214.64, volume: 0.072, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 217.45, volume: 0.083, duration: 1.0 },
  { file: 'dramatic_hit.mp3', startSec: 226.85, volume: 0.032, duration: 1.2 },
  { file: 'chapter_sting_3.mp3', startSec: 228.64, volume: 0.059, duration: 1.48 },
  { file: 'speed_whoosh.mp3', startSec: 234.4, volume: 0.069, duration: 1.2 },
  { file: 'ding.mp3', startSec: 237.09, volume: 0.105, duration: 1.2 },
  { file: 'sign_pop.mp3', startSec: 237.97, volume: 0.095, duration: 1.0 },
  { file: 'tool_pop.mp3', startSec: 244.07, volume: 0.13, duration: 1.08 },
  { file: 'found_ding.mp3', startSec: 247.57, volume: 0.13, duration: 1.0 },
  { file: 'time_whoosh.mp3', startSec: 252.5, volume: 0.048, duration: 1.48 },
  { file: 'chapter_sting_final.mp3', startSec: 258.56, volume: 0.111, duration: 1.48 },
  { file: 'alert_ding.mp3', startSec: 262.77, volume: 0.13, duration: 1.2 },
  { file: 'soft_whoosh.mp3', startSec: 267.12, volume: 0.13, duration: 1.28 },
  { file: 'multiply_pop.mp3', startSec: 268.91, volume: 0.13, duration: 1.2 },
  { file: 'impact_thud.mp3', startSec: 271.43, volume: 0.13, duration: 1.0 },
  { file: 'bubble_pop.mp3', startSec: 274.83, volume: 0.083, duration: 1.0 },
  { file: 'soft_ping.mp3', startSec: 278.99, volume: 0.068, duration: 1.08 },
  { file: 'sign_pop.mp3', startSec: 285.21, volume: 0.095, duration: 1.0 },
  { file: 'rising_whoosh.mp3', startSec: 286.58, volume: 0.072, duration: 1.28 },
  { file: 'whoosh_expand.mp3', startSec: 287.56, volume: 0.13, duration: 1.2 },
  { file: 'tool_pop.mp3', startSec: 292.33, volume: 0.13, duration: 1.08 },
  { file: 'drum_hit.mp3', startSec: 295.97, volume: 0.116, duration: 1.0 },
  { file: 'multiply_pop.mp3', startSec: 300.99, volume: 0.13, duration: 1.2 },
  { file: 'swipe_whoosh.mp3', startSec: 301.92, volume: 0.072, duration: 1.0 },
  { file: 'subscribe_chime.mp3', startSec: 313.4, volume: 0.13, duration: 1.6 },
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

export const PorQueTuMovilVaMasLentoConLosAnos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const active = FRAMES[activeIndex];
  const toFrame = (sec: number) => Math.round((sec / PLAYBACK_RATE) * fps);
  const startF = toFrame(active.startSec);
  const endF = activeIndex + 1 < FRAMES.length ? toFrame(FRAMES[activeIndex + 1].startSec) : 9682;
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
      <Img src={staticFile(`por-que-tu-movil-va-mas-lento-con-los-anos/${prev.file}`)}
        style={{ ...imgStyle, transform: `translate(${px}%, 0%) scale(${pkb.s})` }} />
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', overflow: 'hidden' }}>
      <Audio src={staticFile('por-que-tu-movil-va-mas-lento-con-los-anos.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={toFrame(sfx.startSec)} durationInFrames={Math.ceil(((sfx.duration ?? 2) / PLAYBACK_RATE) * fps) + 3}>
          <Audio src={staticFile(`por-que-tu-movil-va-mas-lento-con-los-anos-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.1} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {prevEl}
      <Img src={staticFile(`por-que-tu-movil-va-mas-lento-con-los-anos/${active.file}`)}
        style={{ ...imgStyle, transform: `translate(${x}%, ${y}%) rotate(${rot}deg) scale(${scale})` }} />
    </AbsoluteFill>
  );
};
