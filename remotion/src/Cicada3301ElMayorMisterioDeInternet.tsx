import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cicada-3301-el-mayor-misterio-de-internet - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // 4 de enero de 2012.
  { file: '0_02.jpg', startSec: 2.42 },  // En el foro 4chan aparece una imagen firmada con un número,
  { file: '0_06.jpg', startSec: 6.58 },  // 3 .3001.
  { file: '0_08.jpg', startSec: 8.82 },  // El mensaje es corto.
  { file: '0_10.jpg', startSec: 10.6 },  // Buscamos personas muy inteligentes.
  { file: '0_12.jpg', startSec: 12.92 },  // Hay un mensaje escondido en esta imagen.
  { file: '0_15.jpg', startSec: 15.48 },  // Encuéntralo.
  { file: '0_16.jpg', startSec: 16.98 },  // Una broma de foro?
  { file: '0_18.jpg', startSec: 18.5 },  // Eso pensó casi todo el mundo.
  { file: '0_20.jpg', startSec: 20.74 },  // Días después aparecieron carteles en postes de la calle,
  { file: '0_23.jpg', startSec: 23.62 },  // en Barsovia,
  { file: '0_24.jpg', startSec: 24.56 },  // en París,
  { file: '0_25.jpg', startSec: 25.4 },  // en Seul, en Sydney. Todos con el dibujo de una cigarrha.
  { file: '0_30.jpg', startSec: 30.32 },  // Miles de personas intentaron resolverlo,
  { file: '0_32.jpg', startSec: 32.48 },  // solo unas pocas llegaron al final.
  { file: '0_34.jpg', startSec: 34.9 },  // Y la gran pregunta lleva más de 10 años abierta.
  { file: '0_38.jpg', startSec: 38.16 },  // ¿Quién estaba detrás?
  { file: '0_40.jpg', startSec: 40.08 },  // Uno de los que lo vio aquel día fue Marcus Banner.
  { file: '0_43.jpg', startSec: 43.14 },  // Tenía 15 años,
  { file: '0_44.jpg', startSec: 44.44 },  // estudiaba en casa cerca de Roanowk,
  { file: '0_46.jpg', startSec: 46.68 },  // en Virginia.
  { file: '0_48.jpg', startSec: 48.0 },  // Sus padres solo le dejaban usar el ordenador del salón.
  { file: '0_51.jpg', startSec: 51.04 },  // Al otro lado del océano lo vio Joe Erickson, un analista informático sueco de 34 años.
  { file: '0_56.jpg', startSec: 56.96 },  // Ninguno de los dos se conocía,
  { file: '0_58.jpg', startSec: 58.9 },  // los dos se engancharon.
  { file: '1_00.jpg', startSec: 60.6 },  // La primera pista era fácil,
  { file: '1_02.jpg', startSec: 62.4 },  // abrieron la imagen con el blog de notas,
  { file: '1_04.jpg', startSec: 64.6 },  // debajo había un texto escondido,
  { file: '1_06.jpg', startSec: 66.54 },  // un cifrado de los de Julio César,
  { file: '1_08.jpg', startSec: 68.76 },  // cada letra movida a cuatro posiciones.
  { file: '1_11.jpg', startSec: 71.06 },  // Al destifrarlo salía una web con la foto de un pato de madera.
  { file: '1_14.jpg', startSec: 74.92 },  // Era un señuelo,
  { file: '1_16.jpg', startSec: 76.12 },  // pero en su mensaje burlón había dos palabras en inglés.
  { file: '1_19.jpg', startSec: 79.48 },  // Out y Guess.
  { file: '1_21.jpg', startSec: 81.58 },  // Out Guess es un programa que esconde datos dentro de imágenes.
  { file: '1_25.jpg', startSec: 85.42 },  // Esto se llama este gano gracia.
  { file: '1_27.jpg', startSec: 87.64 },  // Pasaron la foto del pato por Out Guess y apareció una lista de 75 pares de números.
  { file: '1_33.jpg', startSec: 93.22 },  // Pero aquí viene lo raro.
  { file: '1_34.jpg', startSec: 94.86 },  // Era un código de libro.
  { file: '1_36.jpg', startSec: 96.46 },  // Cada par señala una línea y una letra de un texto concreto.
  { file: '1_40.jpg', startSec: 100.08 },  // El texto era la dama de la fuente,
  { file: '1_42.jpg', startSec: 102.58 },  // un cuento del Mavinojón,
  { file: '1_44.jpg', startSec: 104.38 },  // un libro galés de la edad media. Del cuento salió un número de teléfono,
  { file: '1_48.jpg', startSec: 108.72 },  // con prefijo de Dallas,
  { file: '1_50.jpg', startSec: 110.24 },  // en Texas.
  { file: '1_51.jpg', startSec: 111.78 },  // Al otro lado contestaba un contestador automático.
  { file: '1_54.jpg', startSec: 114.64 },  // La siguiente pista llevaba a tres números primos,
  { file: '1_57.jpg', startSec: 117.3 },  // 3 .3001,
  { file: '1_59.jpg', startSec: 119.36 },  // 509 y 503.
  { file: '2_03.jpg', startSec: 123.02 },  // Multiplicados daban una dirección web y dentro había una cuenta atrás.
  { file: '2_07.jpg', startSec: 127.58 },  // Ericsson se dio cuenta de algo.
  { file: '2_09.jpg', startSec: 129.76 },  // Hay figarras en norteamérica que salen de la tierra cada 13 o 17 años. Dos números primos.
  { file: '2_16.jpg', startSec: 136.24 },  // Todo el puzzle estaba construido con primos, hasta el nombre.
  { file: '2_20.jpg', startSec: 140.44 },  // El 9 de enero la cuenta atrás llegó a cero,
  { file: '2_23.jpg', startSec: 143.0 },  // aparecieron coordenadas de lugares reales, en cuatro continentes,
  { file: '2_27.jpg', startSec: 147.1 },  // Barsovia,
  { file: '2_28.jpg', startSec: 148.1 },  // Paris,
  { file: '2_29.jpg', startSec: 149.08 },  // Seul,
  { file: '2_30.jpg', startSec: 150.0 },  // Seattle,
  { file: '2_31.jpg', startSec: 150.8 },  // Miami,
  { file: '2_32.jpg', startSec: 151.76 },  // Sydney y una pequeña ciudad de arcanzas.
  { file: '2_35.jpg', startSec: 155.14 },  // En cada sitio había un cartel pegado con la cigarras y un código QR. El puzzle había salido de internet,
  { file: '2_42.jpg', startSec: 162.04 },  // alguien había ido a pegar carteles en medio mundo.
  { file: '2_45.jpg', startSec: 165.18 },  // Los códigos llevaban a una web dentro de la red tor,
  { file: '2_48.jpg', startSec: 168.18 },  // la parte oculta de internet.
  { file: '2_49.jpg', startSec: 169.98 },  // Solo dejaba entrar a un número limitado de visitantes.
  { file: '2_53.jpg', startSec: 173.04 },  // Al llegar a ese número, la web se cerró con una frase.
  { file: '2_56.jpg', startSec: 176.42 },  // Queremos a los mejores,
  { file: '2_58.jpg', startSec: 178.02 },  // no a los seguidores.
  { file: '3_00.jpg', startSec: 180.02 },  // Yo el Ericsson llegó tarde,
  { file: '3_01.jpg', startSec: 181.82 },  // nunca pudo registrarse.
  { file: '3_03.jpg', startSec: 183.56 },  // El mismo lo llamó su mayor decepción. Y Marcus?
  { file: '3_07.jpg', startSec: 187.04 },  // Marcus se llegó.
  { file: '3_08.jpg', startSec: 188.78 },  // El 6 de febrero recibió un correo.
  { file: '3_11.jpg', startSec: 191.16 },  // Decía que de los miles que lo intentaron solo unos pocos lo habían conseguido.
  { file: '3_15.jpg', startSec: 195.44 },  // Y le hacía una pregunta.
  { file: '3_17.jpg', startSec: 197.48 },  // ¿Crees que todo ser humano tiene derecho a la privacidad de la anonimato?
  { file: '3_22.jpg', startSec: 202.06 },  // Marcus respondió que sí.
  { file: '3_24.jpg', startSec: 204.26 },  // El 28 de febrero le llegó otro correo cifrado,
  { file: '3_27.jpg', startSec: 207.48 },  // acababa con una palabra.
  { file: '3_29.jpg', startSec: 209.72 },  // Bienvenido.
  { file: '3_30.jpg', startSec: 210.84 },  // Al menos otras 20 personas recibieron ese mismo correo.
  { file: '3_35.jpg', startSec: 215.12 },  // ¿Y qué era si cada por dentro?
  { file: '3_37.jpg', startSec: 217.6 },  // Según contaron a Marcus, no tenía nombre, ni símbolo, ni lista de miembros.
  { file: '3_42.jpg', startSec: 222.78 },  // Se describía como algo parecido a un laboratorio de ideas.
  { file: '3_46.jpg', startSec: 226.48 },  // Centrado en la libertad, la privacidad y la seguridad.
  { file: '3_50.jpg', startSec: 230.32 },  // Decía que la censura es un error y que la privacidad es un derecho que nadie te puede quitar.
  { file: '3_55.jpg', startSec: 235.98 },  // Los elegidos recibieron un encargo,
  { file: '3_58.jpg', startSec: 238.72 },  // programar una herramienta para proteger a filtradores de secretos.
  { file: '4_02.jpg', startSec: 242.58 },  // Pero aquí bien el giro.
  { file: '4_04.jpg', startSec: 244.5 },  // A finales de 2012, Marcus era el único que seguía programando.
  { file: '4_08.jpg', startSec: 248.84 },  // El gran grupo secreto había acabado en una adolescente trabajando solo.
  { file: '4_13.jpg', startSec: 253.52 },  // En enero de 2013 volvió nuevas pruebas,
  { file: '4_17.jpg', startSec: 257.06 },  // esta vez con un libro de locultista Alister Crowley. Y un cartel en Okinawa,
  { file: '4_22.jpg', startSec: 262.0 },  // en Japón.
  { file: '4_23.jpg', startSec: 263.26 },  // Ese año circuló un texto anónimo.
  { file: '4_25.jpg', startSec: 265.66 },  // Soutor decía hacer un ex miembro y llamaba así cada una religión disfrazada.
  { file: '4_30.jpg', startSec: 270.54 },  // Nadie ha podido verificar ese texto.
  { file: '4_33.jpg', startSec: 273.28 },  // En marzo a la web de los elegidos desapareció.
  { file: '4_36.jpg', startSec: 276.18 },  // En enero de 2014 volvió por última vez.
  { file: '4_39.jpg', startSec: 279.44 },  // Y esta vez dejó un libro entero. El Libre Primos.
  { file: '4_43.jpg', startSec: 283.46 },  // 58 páginas escritas en runas.
  { file: '4_46.jpg', startSec: 286.34 },  // Se han descifrado unas pocas páginas.
  { file: '4_48.jpg', startSec: 288.62 },  // La mayor parte nunca se ha descifrado.
  { file: '4_51.jpg', startSec: 291.52 },  // Y ese mismo año pasó algo curioso.
  { file: '4_54.jpg', startSec: 294.54 },  // En abril la Marina de Estados Unidos lanzó su propio puzzle para buscar talento.
  { file: '4_59.jpg', startSec: 299.56 },  // En mayo la NCA publicó otro en Twitter,
  { file: '5_02.jpg', startSec: 302.5 },  // también para reclutar.
  { file: '5_04.jpg', startSec: 304.42 },  // Nadie ha demostrado que tuvieran relación concicada,
  { file: '5_07.jpg', startSec: 307.3 },  // pero las teorías se dispararon.
  { file: '5_09.jpg', startSec: 309.34 },  // En abril de 2017 apareció un mensaje firmado con su clave secreta.
  { file: '5_14.jpg', startSec: 314.54 },  // Avizaba de que todo lo que no llevara esa firma era falso.
  { file: '5_18.jpg', startSec: 318.4 },  // Es el último mensaje auténtico que se conoce.
  { file: '5_21.jpg', startSec: 321.78 },  // Así que volvamos a la pregunta.
  { file: '5_23.jpg', startSec: 323.96 },  // ¿Quién estaba detrás de cicada?
  { file: '5_26.jpg', startSec: 326.22 },  // Se ha dicho de todo.
  { file: '5_27.jpg', startSec: 327.66 },  // La NCA,
  { file: '5_28.jpg', startSec: 328.92 },  // la CIA,
  { file: '5_29.jpg', startSec: 329.92 },  // el espionaje británico,
  { file: '5_31.jpg', startSec: 331.62 },  // Google, una gran empresa,
  { file: '5_33.jpg', startSec: 333.94 },  // una secta,
  { file: '5_34.jpg', startSec: 334.98 },  // unos criminales.
  { file: '5_36.jpg', startSec: 336.42 },  // Hasta el escritor William Gibson.
  { file: '5_38.jpg', startSec: 338.72 },  // El lónego.
  { file: '5_39.jpg', startSec: 339.96 },  // Un portavoz de la CIA dijo que desde luego no eran ellos.
  { file: '5_43.jpg', startSec: 343.62 },  // La experta en código se lonca Dunin a punto otra idea.
  { file: '5_47.jpg', startSec: 347.28 },  // Quizás solo era un grupo de gente riendos en un chat.
  { file: '5_50.jpg', startSec: 350.72 },  // La respuesta honesta es esta.
  { file: '5_52.jpg', startSec: 352.72 },  // Nadie lo sabe.
  { file: '5_54.jpg', startSec: 354.2 },  // Nadie lo ha confirmado nunca.
  { file: '5_56.jpg', startSec: 356.32 },  // Y su libro de runas sigue ahí,
  { file: '5_58.jpg', startSec: 358.56 },  // esperando a que alguien lo lea.
  { file: '6_00.jpg', startSec: 360.74 },  // ¿Tú qué crees que era?
  { file: '6_02.jpg', startSec: 362.6 },  // Te leo en los comentarios.
  { file: '6_04.jpg', startSec: 364.84 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete cada semana una máqui
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'mystery_drone.mp3', startSec: 0.3, volume: 0.14 },
  { file: 'forum_ping.mp3', startSec: 2.4, volume: 0.14 },
  { file: 'secret_shimmer.mp3', startSec: 12.9, volume: 0.14 },
  { file: 'poster_tape.mp3', startSec: 20.7, volume: 0.13 },
  { file: 'cicada_buzz.mp3', startSec: 28.0, volume: 0.13 },
  { file: 'duck_squeak.mp3', startSec: 74.9, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 93.2, volume: 0.14 },
  { file: 'phone_ring.mp3', startSec: 107.0, volume: 0.14 },
  { file: 'answer_beep.mp3', startSec: 111.8, volume: 0.14 },
  { file: 'clock_tick.mp3', startSec: 125.5, volume: 0.14 },
  { file: 'countdown_hit.mp3', startSec: 140.4, volume: 0.15 },
  { file: 'whoosh_world.mp3', startSec: 143.0, volume: 0.14 },
  { file: 'door_slam.mp3', startSec: 174.5, volume: 0.15 },
  { file: 'email_ping.mp3', startSec: 188.8, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 209.7, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 242.6, volume: 0.14 },
  { file: 'deep_boom.mp3', startSec: 279.4, volume: 0.15 },
  { file: 'rising_tension.mp3', startSec: 326.2, volume: 0.14 },
  { file: 'soft_sting.mp3', startSec: 352.7, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 369.3, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const Cicada3301ElMayorMisterioDeInternet: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cicada-3301-el-mayor-misterio-de-internet.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cicada-3301-el-mayor-misterio-de-internet-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cicada-3301-el-mayor-misterio-de-internet-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cicada-3301-el-mayor-misterio-de-internet/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
