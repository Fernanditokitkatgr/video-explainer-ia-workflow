import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// asi-adivinan-tu-contrasena - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Pongamos que tu contraseña es Sara 2024, tiene una mayoscula, tiene números, parece bastante segura.
  { file: '0_07.jpg', startSec: 7.26 },  // Pues un ordenador normal podría adivinarla en segundos, y no necesita conocerte ni espiarte ni tener suerte.
  { file: '0_15.jpg', startSec: 15.36 },  // Hoy vas a ver cómo lo hacen y cómo evitar que te pase a ti.
  { file: '0_19.jpg', startSec: 19.54 },  // La web donde te registras ni siquiera conoce tu contraseña.
  { file: '0_23.jpg', startSec: 23.36 },  // Cuando creas una cuenta, una web bien hecha no guarda lo que escribes.
  { file: '0_26.jpg', startSec: 26.88 },  // Guarda otra cosa, algo que se llama Hash.
  { file: '0_30.jpg', startSec: 30.9 },  // Un Hash es como la huella de actilar de tu contraseña.
  { file: '0_34.jpg', startSec: 34.62 },  // Una fórmula matemática coge tu contraseña y la convierte en una ristra de letras y números.
  { file: '0_40.jpg', startSec: 40.14 },  // La misma contraseña da siempre la misma huella, pero cambia una sola letra y la huella sale completamente dist
  { file: '0_47.jpg', startSec: 47.58 },  // Con la contraseña sacas la huella en un instante, con la huella no puede reconstruir la contraseña.
  { file: '0_53.jpg', startSec: 53.22 },  // Igual que nadie puede fabricar tu dedo a partir de tu huella.
  { file: '0_57.jpg', startSec: 57.7 },  // Así que cuando inicia sesión, la web no compara contraseñas.
  { file: '1_01.jpg', startSec: 61.96 },  // Calcula la huella de lo que acabas de escribir y mira si coincide con la que tiene guardada.
  { file: '1_07.jpg', startSec: 67.16 },  // Si coincide, entras.
  { file: '1_09.jpg', startSec: 69.32 },  // Tu contraseña real no está guardada en ningún sitio.
  { file: '1_13.jpg', startSec: 73.14 },  // Entonces, ¿cómo consiguen adivinarla?
  { file: '1_15.jpg', startSec: 75.92 },  // Todo empieza el día en que alguien roba esas hueyas.
  { file: '1_18.jpg', startSec: 78.72 },  // Las web sufren robos de datos constantemente, se les llama filtraciones.
  { file: '1_24.jpg', startSec: 84.18 },  // En 2009, jaquearon una empresa llamada ROKJU, hacía aplicaciones para redes sociales.
  { file: '1_31.jpg', startSec: 91.04 },  // Gordaba las contraseñas tal cual, sin huella, en texto normal.
  { file: '1_35.jpg', startSec: 95.22 },  // Se filtraron unos 32 millones de contraseñas, escritas por personas reales.
  { file: '1_40.jpg', startSec: 100.86 },  // Y esa lista se convirtió en algo que nadie esperaba, en un manual de cómo elige contraseña la gente.
  { file: '1_47.jpg', startSec: 107.42 },  // Hoy lo normal es que se roben hueyas.
  { file: '1_50.jpg', startSec: 110.24 },  // Como la huella no se puede dar la vuelta, el atacante hace justo lo contrario.
  { file: '1_55.jpg', startSec: 115.06 },  // Coge una contraseña posible, calcula su huella y la compara con las robadas.
  { file: '2_00.jpg', startSec: 120.38 },  // Si no coincide, prueba con otra. Y otra. Y otra.
  { file: '2_05.jpg', startSec: 125.04 },  // Nadie adivina tu contraseña, la prueban millones de veces.
  { file: '2_10.jpg', startSec: 130.26 },  // La forma más bruta de probar se llama literalmente fuerza bruta.
  { file: '2_14.jpg', startSec: 134.22 },  // Probar todas las combinaciones, una detrás de otra.
  { file: '2_18.jpg', startSec: 138.7 },  // Piensa en el pin de cuatro cifras de tu tarjeta.
  { file: '2_21.jpg', startSec: 141.64 },  // Cada cifra puede ir del ferro al 9, son 10 opciones.
  { file: '2_25.jpg', startSec: 145.36 },  // 10 por 10 por 10 por 10, salen 10.000 combinaciones.
  { file: '2_30.jpg', startSec: 150.38 },  // Por eso el cajero te bloquea la tarjeta tras unos pocos fallos, no te deja probar las 10.000.
  { file: '2_36.jpg', startSec: 156.04 },  // Pero con las hueyas robadas en su ordenador, nadie bloquea la atacante.
  { file: '2_39.jpg', startSec: 159.72 },  // Ahora cambia las cifras por letras minúsculas.
  { file: '2_43.jpg', startSec: 163.32 },  // Cada hueco tiene 26 opciones.
  { file: '2_46.jpg', startSec: 166.02 },  // Y aquí está la magia. Cada carácter que añades multiplica todas las combinaciones.
  { file: '2_51.jpg', startSec: 171.64 },  // Con una letra A y 26, con dos, ya A y 676, con ocho letras minúsculas pasas de 200.000 millones de combinacion
  { file: '3_01.jpg', startSec: 181.22 },  // Y si mezclas mayúsculas y números y símbolos, cada hueco tiene casi 100 opciones.
  { file: '3_06.jpg', startSec: 186.82 },  // Suena a muchísimo, pero para una máquina moderna no lo es tanto.
  { file: '3_11.jpg', startSec: 191.38 },  // Aquí entran las tarjetas gráficas, las mismas que se usan para jugar.
  { file: '3_15.jpg', startSec: 195.96 },  // Están pensadas para hacer millones de cálculos pequeños a la vez.
  { file: '3_19.jpg', startSec: 199.94 },  // Con algunas fórmulas de huella antiguas y rápidas,
  { file: '3_22.jpg', startSec: 202.78 },  // una sola tarjeta puede probar miles de millones de contraseñas por segundo.
  { file: '3_27.jpg', startSec: 207.44 },  // A ese ritmo esas ocho letras minúsculas caen en cuestión de minutos.
  { file: '3_31.jpg', startSec: 211.12 },  // Las webseries usan fórmulas lentas a propósito.
  { file: '3_35.jpg', startSec: 215.18 },  // Una de las más conocidas se llama Becrypt.
  { file: '3_38.jpg', startSec: 218.22 },  // Para ti no se nota. Entrar en tu cuenta tardar una fracción de segundo más.
  { file: '3_42.jpg', startSec: 222.8 },  // Pero para el atacante sí se nota, sus miles de millones de intentos por segundo se desploman.
  { file: '3_49.jpg', startSec: 229.04 },  // Y además mezcla en cada contraseña con un ingrediente distinto.
  { file: '3_52.jpg', startSec: 232.88 },  // Se llama Sal.
  { file: '3_54.jpg', startSec: 234.56 },  // Gracias a la Sal, dos personas con la misma contraseña tienen huellas distintas.
  { file: '3_59.jpg', startSec: 239.18 },  // El problema es que no todas las webs lo hacen bien y tú no puedes saber cuájolo hace.
  { file: '4_05.jpg', startSec: 245.58 },  // Pero los atacantes tienen un truco mucho más listo que probarlo todo.
  { file: '4_09.jpg', startSec: 249.88 },  // Empiezan por lo que la gente usa de verdad.
  { file: '4_12.jpg', startSec: 252.56 },  // Se llama ataque de diccionario.
  { file: '4_14.jpg', startSec: 254.92 },  // En vez de combinaciones al azar, prueban listas de palabras y contraseñas reales.
  { file: '4_19.jpg', startSec: 259.56 },  // Y aquí vuelve a aparecer la lista de Rock-Dew y todas las filtraciones que vinieron después.
  { file: '4_25.jpg', startSec: 265.36 },  // ¿Quieres saber cuál suele encabezar esas listas año tras año?
  { file: '4_28.jpg', startSec: 268.44 },  // La reina de todas es 1, 2, 3, 4, 5, 6.
  { file: '4_33.jpg', startSec: 273.46 },  // Justo detrás suelen aparecer Password y Cuarty.
  { file: '4_36.jpg', startSec: 276.22 },  // Así no necesitan probar todas las combinaciones.
  { file: '4_39.jpg', startSec: 279.26 },  // Y una parte enorme de las contraseñas caen los primeros minutos.
  { file: '4_43.jpg', startSec: 283.16 },  // Aquí mucha gente cree tener un truco, cambiar letras por símbolos.
  { file: '4_47.jpg', startSec: 287.4 },  // En vez de Password, escribes la A con una roba y la O con un cero.
  { file: '4_52.jpg', startSec: 292.52 },  // Parece imposible de divinar, pero los atacantes lo conocen desde hace años.
  { file: '4_56.jpg', startSec: 296.96 },  // Sus programas aplican reglas automáticas a cada palabra de la lista.
  { file: '5_01.jpg', startSec: 301.32 },  // Cambian la A por una roba, la O por un cero, la E por un 3.
  { file: '5_05.jpg', startSec: 305.78 },  // Ponen la primera letra en mayúscula.
  { file: '5_08.jpg', startSec: 308.02 },  // Añaden un año al final o un signo de exclamación.
  { file: '5_11.jpg', startSec: 311.66 },  // Y ahora volvamos a Sara 2024.
  { file: '5_14.jpg', startSec: 314.84 },  // Es un nombre con la primera letra en mayúscula y un año al final.
  { file: '5_18.jpg', startSec: 318.9 },  // Es exactamente el patrón que esas reglas prueban primero.
  { file: '5_22.jpg', startSec: 322.78 },  // Si la web usó una fórmula rápida, Sara 2024 cae en segundos.
  { file: '5_27.jpg', startSec: 327.68 },  // Pero hay algo todavía más peligroso.
  { file: '5_30.jpg', startSec: 330.2 },  // Y no tiene nada que ver con adivinar.
  { file: '5_32.jpg', startSec: 332.94 },  // Imagina que usas la misma contraseña en tu correo.
  { file: '5_36.jpg', startSec: 336.02 },  // Y en esa tienda online donde compraste una vez.
  { file: '5_38.jpg', startSec: 338.92 },  // Un día jaquea en la tienda.
  { file: '5_40.jpg', startSec: 340.88 },  // Y tu correo y tu contraseña acaban en una filtración.
  { file: '5_44.jpg', startSec: 344.5 },  // Los atacantes cogen esa pareja de correo y contraseña.
  { file: '5_47.jpg', startSec: 347.8 },  // Y la prueban automáticamente en cientos de webs.
  { file: '5_50.jpg', startSec: 350.88 },  // Se llama relleno de credenciales.
  { file: '5_53.jpg', startSec: 353.22 },  // En inglés, Credential Stuffing.
  { file: '5_55.jpg', startSec: 355.72 },  // No les hace falta romper nada.
  { file: '5_57.jpg', startSec: 357.98 },  // Tu contraseña ya se la diste tu a otra web.
  { file: '6_01.jpg', startSec: 361.28 },  // Si las repites, entrar en tu correo es como abrir con la llave original.
  { file: '6_05.jpg', startSec: 365.74 },  // Por eso el peligro real no es tener una contraseña regular.
  { file: '6_09.jpg', startSec: 369.28 },  // Es tener la misma en todas partes.
  { file: '6_11.jpg', startSec: 371.9 },  // Y queda la forma más fácil de todas, la que más se usa.
  { file: '6_16.jpg', startSec: 376.04 },  // No adivinan tu contraseña, te la piden.
  { file: '6_18.jpg', startSec: 378.94 },  // Te llega un mensaje de tu banco o de una empresa de paquetería.
  { file: '6_22.jpg', startSec: 382.9 },  // Comprisa y con miedo.
  { file: '6_24.jpg', startSec: 384.82 },  // Tu cuenta se va a bloquear.
  { file: '6_26.jpg', startSec: 386.44 },  // Tienes un paquete retenido. Pulse aquí.
  { file: '6_29.jpg', startSec: 389.52 },  // El enlace te lleva una página idéntica a la real.
  { file: '6_32.jpg', startSec: 392.56 },  // Mismo logo, mismos colores.
  { file: '6_35.jpg', startSec: 395.02 },  // Escribes tu contraseña y se la acabas de entregar directamente a ellos.
  { file: '6_39.jpg', startSec: 399.9 },  // Esto se llama Fishing.
  { file: '6_41.jpg', startSec: 401.76 },  // Y aquí da igual o larga que sea tu contraseña.
  { file: '6_44.jpg', startSec: 404.18 },  // La regla es sencilla.
  { file: '6_46.jpg', startSec: 406.46 },  // Nunca entres desde el enlace de un mensaje.
  { file: '6_49.jpg', startSec: 409.2 },  // Abre tu la web o la aplicación oficial.
  { file: '6_52.jpg', startSec: 412.3 },  // Vale, ahora lo importante. ¿Cómo protegerte?
  { file: '6_56.jpg', startSec: 416.16 },  // Lo primero es la longitud.
  { file: '6_58.jpg', startSec: 418.08 },  // Cada carácter extra multiplica el trabajo del atacante.
  { file: '7_01.jpg', startSec: 421.44 },  // Y la forma más fácil de ganar longitud es usar una frase de contraseña.
  { file: '7_06.jpg', startSec: 426.16 },  // 4 o 5 palabras al azar que no tengan nada que ver entre sí.
  { file: '7_09.jpg', startSec: 429.6 },  // Algo como girafa tostadora, nube bicicleta, larguísima, rara y fácil de recordar.
  { file: '7_16.jpg', startSec: 436.96 },  // Pero ojo, al azar de verdad.
  { file: '7_19.jpg', startSec: 439.7 },  // Nada de frases famosas ni canciones.
  { file: '7_22.jpg', startSec: 442.52 },  // Lo segundo es no repetir nunca una contraseña.
  { file: '7_25.jpg', startSec: 445.58 },  // Una distinta para cada web.
  { file: '7_27.jpg', startSec: 447.9 },  // Y como nadie recuerda 100 contraseñas existe el gestor de contraseñas.
  { file: '7_32.jpg', startSec: 452.38 },  // Es como una caja fuerte digital.
  { file: '7_34.jpg', startSec: 454.68 },  // Crea contraseñas largas y únicas y la recuerda por ti.
  { file: '7_37.jpg', startSec: 457.72 },  // Tú solo recuerdas una, la llave de la caja fuerte.
  { file: '7_42.jpg', startSec: 462.24 },  // Lo tercero es la verificación en dos pasos.
  { file: '7_45.jpg', startSec: 465.18 },  // Además de la contraseña te pide un código del móvil o una confirmación en una aplicación.
  { file: '7_50.jpg', startSec: 470.44 },  // Así aunque roben tu contraseña le sigue faltando la segunda llave.
  { file: '7_54.jpg', startSec: 474.82 },  // Y lo más nuevo son las llaves de acceso.
  { file: '7_57.jpg', startSec: 477.48 },  // En inglés, pasquís.
  { file: '7_59.jpg', startSec: 479.62 },  // Con ellas no he contraseña que robar.
  { file: '8_01.jpg', startSec: 481.7 },  // Tu móvil guarda una llave secreta que nunca sale de él.
  { file: '8_04.jpg', startSec: 484.52 },  // Entras con tu dedo o tu cara.
  { file: '8_07.jpg', startSec: 487.26 },  // Y esa llave no funciona en una web falsa.
  { file: '8_10.jpg', startSec: 490.32 },  // Si una web te ofrece llaves de acceso, activa las.
  { file: '8_13.jpg', startSec: 493.74 },  // Y por último, ¿cómo sabes si ya te han filtrado?
  { file: '8_17.jpg', startSec: 497.6 },  // Existe un servicio gratuito y muy conocido que se llama HavaibinPond.
  { file: '8_22.jpg', startSec: 502.58 },  // Escribes tu correo y te dice en qué filtraciones conocidas ha aparecido.
  { file: '8_27.jpg', startSec: 507.3 },  // Si sale alguna, cambia esa contraseña y en cualquier web donde las repitieras.
  { file: '8_32.jpg', startSec: 512.92 },  // Así que volvamos al principio a Sara 2024.
  { file: '8_37.jpg', startSec: 517.1 },  // La web no conocía esa contraseña solo guardaba su huella.
  { file: '8_41.jpg', startSec: 521.14 },  // Pero alguien robó las hueyas y una tarjeta gráfica empezó a probarlas más comunes.
  { file: '8_46.jpg', startSec: 526.5 },  // Un hombre con mayúscula, un año al final y la huella coincidió en segundos.
  { file: '8_51.jpg', startSec: 531.66 },  // Nadie la divinó, la probaron y estaba entre las primeras de la lista.
  { file: '8_56.jpg', startSec: 536.84 },  // Con una frase larga y única esa lista ya no sirve contra ti
  { file: '9_00.jpg', startSec: 540.32 },  // y con la verificación en dos pasos ni acertarles basta.
  { file: '9_04.jpg', startSec: 544.56 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día,
  { file: '9_08.jpg', startSec: 548.72 },  // suscríbete cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'typing_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'tense_sting.mp3', startSec: 7.3, volume: 0.15 },
  { file: 'scanner_beep.mp3', startSec: 30.9, volume: 0.14 },
  { file: 'alarm_blip.mp3', startSec: 84.2, volume: 0.14 },
  { file: 'rapid_clicks.mp3', startSec: 130.3, volume: 0.13 },
  { file: 'rising_whoosh.mp3', startSec: 171.6, volume: 0.14 },
  { file: 'gpu_hum.mp3', startSec: 191.4, volume: 0.13 },
  { file: 'salt_shake.mp3', startSec: 232.9, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 268.4, volume: 0.16 },
  { file: 'glass_break.mp3', startSec: 322.8, volume: 0.13 },
  { file: 'key_jingle.mp3', startSec: 347.8, volume: 0.14 },
  { file: 'fishing_reel.mp3', startSec: 376.0, volume: 0.14 },
  { file: 'shield_up.mp3', startSec: 412.3, volume: 0.15 },
  { file: 'safe_lock.mp3', startSec: 452.4, volume: 0.14 },
  { file: 'phone_unlock.mp3', startSec: 474.8, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 512.9, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 544.6, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const AsiAdivinanTuContrasena: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('asi-adivinan-tu-contrasena.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`asi-adivinan-tu-contrasena-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`asi-adivinan-tu-contrasena-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`asi-adivinan-tu-contrasena/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
