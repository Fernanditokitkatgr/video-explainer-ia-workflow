import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-capa-de-internet-hasta-la-dark-web - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Buscas tu nombre en Google.
  { file: '0_02.jpg', startSec: 2.08 },  // Salé una foto del instituto, un comentario de hace 10 años.
  { file: '0_06.jpg', startSec: 6.76 },  // ¿Esto es todo internet?
  { file: '0_08.jpg', startSec: 8.56 },  // No.
  { file: '0_09.jpg', startSec: 9.68 },  // Es solo la punta del ICB.
  { file: '0_11.jpg', startSec: 11.74 },  // Debajo a hay 10 niveles, cada uno más escondido que el anterior.
  { file: '0_15.jpg', startSec: 15.84 },  // Y al fondo dicen que hay salas donde se emiten crímenes en directo.
  { file: '0_20.jpg', startSec: 20.26 },  // Existen de verdad.
  { file: '0_21.jpg', startSec: 21.98 },  // Vamos a bajar a comprobarlo.
  { file: '0_24.jpg', startSec: 24.08 },  // Nivel 1,
  { file: '0_25.jpg', startSec: 25.22 },  // la web de superficie, el escaparate.
  { file: '0_28.jpg', startSec: 28.0 },  // Es todo lo que encuentra un buscador como este vídeo.
  { file: '0_31.jpg', startSec: 31.12 },  // Según Google su índice tiene cientos de miles de millones de páginas.
  { file: '0_35.jpg', startSec: 35.32 },  // Y aún así es la parte pequeña.
  { file: '0_37.jpg', startSec: 37.76 },  // ¿Cómo te afecta?
  { file: '0_39.jpg', startSec: 39.18 },  // Puedes pedir que Google oculte datos tuyos viejos,
  { file: '0_41.jpg', startSec: 41.82 },  // lo consiguié un español.
  { file: '0_43.jpg', startSec: 43.38 },  // En 2014, Mario Costeja le ganó a Google ante la justicia europea,
  { file: '0_47.jpg', startSec: 47.34 },  // así nació el derecho a los vido.
  { file: '0_49.jpg', startSec: 49.56 },  // Su estilo,
  { file: '0_50.jpg', startSec: 50.64 },  // lo enseña todo y nunca olvida si no se lo pides.
  { file: '0_54.jpg', startSec: 54.4 },  // Nivel 2,
  { file: '0_55.jpg', startSec: 55.74 },  // lo que Google no indexa,
  { file: '0_57.jpg', startSec: 57.32 },  // la puerta entornada.
  { file: '0_59.jpg', startSec: 59.1 },  // Hay páginas públicas que el buscador se salta a propósito,
  { file: '1_02.jpg', startSec: 62.22 },  // basta un archivo llamado robots .txt. Lo inventó Marta en Coster en 1994,
  { file: '1_09.jpg', startSec: 69.2 },  // pero la puerta solo está entornada.
  { file: '1_11.jpg', startSec: 71.24 },  // En 2025 aparecieron en Google miles de chats compartidos de chat GPT,
  { file: '1_16.jpg', startSec: 76.12 },  // algunos con nombres y currículums.
  { file: '1_18.jpg', startSec: 78.66 },  // ¿Cómo te afecta?
  { file: '1_20.jpg', startSec: 80.02 },  // Un enlace compartido es público,
  { file: '1_22.jpg', startSec: 82.1 },  // piensa que puede acabar en un buscador.
  { file: '1_24.jpg', startSec: 84.64 },  // Su estilo,
  { file: '1_25.jpg', startSec: 85.82 },  // nunca cuelga un cartel, pero deja la puerta abierta.
  { file: '1_29.jpg', startSec: 89.7 },  // Nivel 3,
  { file: '1_31.jpg', startSec: 91.14 },  // la Deep Web,
  { file: '1_32.jpg', startSec: 92.24 },  // la caja fuerte.
  { file: '1_33.jpg', startSec: 93.58 },  // Es todo lo que hay detrás de una contraseña,
  { file: '1_36.jpg', startSec: 96.26 },  // tu correo, tu banco, tu historia al médico.
  { file: '1_39.jpg', startSec: 99.24 },  // Suena peligroso?
  { file: '1_40.jpg', startSec: 100.74 },  // No lo es,
  { file: '1_41.jpg', startSec: 101.54 },  // lo usas cada día.
  { file: '1_43.jpg', startSec: 103.22 },  // El nombre lo puso Michael Bergman en 2001,
  { file: '1_46.jpg', startSec: 106.2 },  // calculó que era cientos de veces más grande que la superficie.
  { file: '1_49.jpg', startSec: 109.76 },  // ¿Cómo te afecta?
  { file: '1_51.jpg', startSec: 111.14 },  // Aquí solo te protege tu contraseña,
  { file: '1_53.jpg', startSec: 113.22 },  // activa la verificación en dos pasos.
  { file: '1_55.jpg', startSec: 115.68 },  // Su estilo,
  { file: '1_57.jpg', startSec: 117.18 },  // la llaman profunda y es tu bandeja de entrada.
  { file: '2_01.jpg', startSec: 121.24 },  // Nivel 4,
  { file: '2_02.jpg', startSec: 122.42 },  // la red es privada,
  { file: '2_03.jpg', startSec: 123.66 },  // el pasillo de empleados.
  { file: '2_05.jpg', startSec: 125.8 },  // Hay redes que ni siquiera dan al internet público,
  { file: '2_08.jpg', startSec: 128.5 },  // las empresas y gobiernos.
  { file: '2_10.jpg', startSec: 130.22 },  // En España está la red Sara,
  { file: '2_12.jpg', startSec: 132.26 },  // un eministerios, comunidades autónomas y ayuntamientos.
  { file: '2_16.jpg', startSec: 136.16 },  // ¿Cómo te afecta?
  { file: '2_17.jpg', startSec: 137.6 },  // Por ella comproba en tu identidad en un trámite,
  { file: '2_19.jpg', startSec: 139.96 },  // por eso ya casi nunca llevas fotocopias.
  { file: '2_22.jpg', startSec: 142.94 },  // Su estilo, nunca sale en Google y sabe más de tique Google.
  { file: '2_28.jpg', startSec: 148.1 },  // Nivel 5,
  { file: '2_29.jpg', startSec: 149.42 },  // las bases de datos de pago,
  { file: '2_31.jpg', startSec: 151.16 },  // la biblioteca contorno.
  { file: '2_33.jpg', startSec: 153.1 },  // Mucha ciencia está detrás de un muro de pago.
  { file: '2_35.jpg', startSec: 155.88 },  // En 2011, Aaron Swartz se coló en un cuarto de cables de lm et y descargó casi 5 millones de artículos de jota 
  { file: '2_43.jpg', startSec: 163.62 },  // Se enfrentaba hasta 35 años de cárcel.
  { file: '2_47.jpg', startSec: 167.16 },  // En 2013 se quitó la vida antes del juicio,
  { file: '2_49.jpg', startSec: 169.82 },  // tenía 26 años.
  { file: '2_52.jpg', startSec: 172.18 },  // ¿Cómo te afecta?
  { file: '2_53.jpg', startSec: 173.58 },  // En España la ciencia pagada con dinero público debe dejar una copia gratis,
  { file: '2_57.jpg', startSec: 177.76 },  // busca la en el repositorio de la universidad.
  { file: '3_00.jpg', startSec: 180.52 },  // Su estilo,
  { file: '3_01.jpg', startSec: 181.76 },  // el saber está ahí,
  { file: '3_03.jpg', startSec: 183.06 },  // pero contorno a la entrada.
  { file: '3_05.jpg', startSec: 185.22 },  // Y aquí empieza la parte oscura.
  { file: '3_07.jpg', startSec: 187.86 },  // Nivel 6,
  { file: '3_08.jpg', startSec: 188.98 },  // Tor,
  { file: '3_09.jpg', startSec: 189.68 },  // la cebolla.
  { file: '3_10.jpg', startSec: 190.86 },  // Es una red que esconde quién eres,
  { file: '3_13.jpg', startSec: 193.1 },  // tu conexión salta por tres ordenadores y cada uno quita una capa de cifrado,
  { file: '3_17.jpg', startSec: 197.38 },  // como una cebolla.
  { file: '3_19.jpg', startSec: 199.14 },  // ¿Y quién la inventó?
  { file: '3_20.jpg', startSec: 200.62 },  // ¿Unos hackers? No,
  { file: '3_22.jpg', startSec: 202.38 },  // la Marina de Estados Unidos.
  { file: '3_24.jpg', startSec: 204.54 },  // En 1995,
  { file: '3_26.jpg', startSec: 206.76 },  // tres investigadores de su laboratorio naval diseñaron la idea. Hoy la usan unos 3 millones de personas al día.
  { file: '3_32.jpg', startSec: 212.5 },  // La BBC tiene web -entor y de Guardian recibe ahí documentos de sus fuentes.
  { file: '3_37.jpg', startSec: 217.64 },  // ¿Cómo te afecta? Usar tores legal.
  { file: '3_40.jpg', startSec: 220.32 },  // Lo y legales lo que algunos hacen dentro.
  { file: '3_43.jpg', startSec: 223.02 },  // Su estilo, la creó un ejército y hoy protege a periodistas.
  { file: '3_47.jpg', startSec: 227.56 },  // Nivel 7,
  { file: '3_49.jpg', startSec: 229.0 },  // los mercados de la Dark Web, El Bazar.
  { file: '3_51.jpg', startSec: 231.8 },  // El más famoso fue Silk Road,
  { file: '3_54.jpg', startSec: 234.06 },  // una huevo culta dentro de Tor,
  { file: '3_55.jpg', startSec: 235.94 },  // abrió en 2011 y vendía drogas por Bitcoin.
  { file: '3_59.jpg', startSec: 239.24 },  // En octubre de 2013,
  { file: '4_01.jpg', startSec: 241.12 },  // el FBI detuvo a su creador en una biblioteca de San Francisco,
  { file: '4_04.jpg', startSec: 244.8 },  // Rose Ulbrich, con el portátil abierto.
  { file: '4_07.jpg', startSec: 247.52 },  // Le cayó cadena perpetua,
  { file: '4_09.jpg', startSec: 249.36 },  // pero aquí viene el giro.
  { file: '4_10.jpg', startSec: 250.78 },  // En enero de 2025,
  { file: '4_12.jpg', startSec: 252.52 },  // Donald Trump le indultó.
  { file: '4_14.jpg', startSec: 254.62 },  // Luego llegó Alfa Bay,
  { file: '4_16.jpg', startSec: 256.18 },  // según el FBI, era 10 veces Silk Road, cayó en 2017.
  { file: '4_20.jpg', startSec: 260.84 },  // ¿Cómo te afecta?
  { file: '4_22.jpg', startSec: 262.2 },  // Comprara y es delito, y a veces el mercado es la policía.
  { file: '4_25.jpg', startSec: 265.74 },  // En 2017, la policía holandesa dirigió en secreto el mercado Hansa durante un mes.
  { file: '4_31.jpg', startSec: 271.24 },  // Su estilo,
  { file: '4_32.jpg', startSec: 272.3 },  // te promete anonimato y le pasa tu dirección a Europol.
  { file: '4_35.jpg', startSec: 275.88 },  // Nivel 8,
  { file: '4_37.jpg', startSec: 277.2 },  // I2P y FreeNet,
  { file: '4_38.jpg', startSec: 278.76 },  // las otras cebollas.
  { file: '4_40.jpg', startSec: 280.42 },  // FreeNet nació en 1999,
  { file: '4_42.jpg', startSec: 282.92 },  // era el proyecto de carrera de Ián Clarke en Edimburco.
  { file: '4_46.jpg', startSec: 286.08 },  // I2P llegó en 2003, en vez de cebolla usa ajo,
  { file: '4_49.jpg', startSec: 289.84 },  // mete varios mensajes en un mismo paquete.
  { file: '4_52.jpg', startSec: 292.52 },  // Son redes dentro de la red,
  { file: '4_54.jpg', startSec: 294.24 },  // más pequeñas que tor.
  { file: '4_55.jpg', startSec: 295.88 },  // ¿Cómo te afecta?
  { file: '4_57.jpg', startSec: 297.18 },  // Lo más probable es que nunca la suces,
  { file: '4_59.jpg', startSec: 299.24 },  // nacieron para que nadie sepa quién habla con quién.
  { file: '5_02.jpg', startSec: 302.16 },  // Su estilo,
  { file: '5_03.jpg', startSec: 303.3 },  // menos famosas que tor,
  { file: '5_04.jpg', startSec: 304.7 },  // y por eso más tranquilas.
  { file: '5_06.jpg', startSec: 306.88 },  // Nivel 9,
  { file: '5_08.jpg', startSec: 308.02 },  // los foros de filtraciones,
  { file: '5_09.jpg', startSec: 309.58 },  // la trastienda.
  { file: '5_11.jpg', startSec: 311.16 },  // Aquí no se venden drogas, se venden datos, los tuyos.
  { file: '5_14.jpg', startSec: 314.96 },  // En mayo de 2024, alguien puso a la venta en Rich Forums,
  { file: '5_19.jpg', startSec: 319.02 },  // datos de clientes del Santander,
  { file: '5_20.jpg', startSec: 320.88 },  // también de España.
  { file: '5_22.jpg', startSec: 322.32 },  // Su fundador firmaba como Pompompurin,
  { file: '5_25.jpg', startSec: 325.1 },  // le detuvieron en casa de sus padres,
  { file: '5_27.jpg', startSec: 327.06 },  // y en 2025 le contenaron a tres años.
  { file: '5_30.jpg', startSec: 330.26 },  // ¿Cómo te afecta?
  { file: '5_31.jpg', startSec: 331.54 },  // Mete tu correo en HIV and Pond, te dice en qué filtraciones sales,
  { file: '5_35.jpg', startSec: 335.62 },  // y cambia esa contraseña.
  { file: '5_37.jpg', startSec: 337.66 },  // Su estilo,
  { file: '5_38.jpg', startSec: 338.86 },  // nunca te roba a ti,
  { file: '5_40.jpg', startSec: 340.32 },  // roba a quien guardaba tus datos.
  { file: '5_42.jpg', startSec: 342.52 },  // Y llegamos al fondo,
  { file: '5_44.jpg', startSec: 344.02 },  // Nivel 10,
  { file: '5_45.jpg', startSec: 345.04 },  // los mitos, el cuento de miedo.
  { file: '5_47.jpg', startSec: 347.58 },  // Dicen que debajo de todo está la Mariana\'s Web,
  { file: '5_50.jpg', startSec: 350.44 },  // con los secretos del mundo,
  { file: '5_52.jpg', startSec: 352.06 },  // y que sólo se entra con un ordenador cuántico.
  { file: '5_54.jpg', startSec: 354.96 },  // Nadia ha enseñado jamás una prueba.
  { file: '5_57.jpg', startSec: 357.68 },  // Volvamos a la pregunta del principio.
  { file: '5_59.jpg', startSec: 359.74 },  // Existen las salas de crímenes en directo,
  { file: '6_02.jpg', startSec: 362.28 },  // las llaman redrooms.
  { file: '6_04.jpg', startSec: 364.02 },  // Nadia ha demostrado nunca que exista una.
  { file: '6_06.jpg', startSec: 366.82 },  // La más famosa prometía torturas a presos del Estado islámico,
  { file: '6_10.jpg', startSec: 370.5 },  // miles de personas esperaron.
  { file: '6_12.jpg', startSec: 372.52 },  // Y nunca se emitió nada. Al final subieron un vídeo aburrido. Era un troleo.
  { file: '6_17.jpg', startSec: 377.62 },  // ¿Cómo te afecta?
  { file: '6_18.jpg', startSec: 378.98 },  // Lo que da miedo de verdad está más arriba.
  { file: '6_21.jpg', startSec: 381.32 },  // Tus datos en un foro, tu contraseña repetida.
  { file: '6_24.jpg', startSec: 384.6 },  // Su estilo,
  { file: '6_25.jpg', startSec: 385.58 },  // el nivel más profundo delicever y el único que nadie ha visto nunca.
  { file: '6_30.jpg', startSec: 390.24 },  // ¿Y tú?
  { file: '6_31.jpg', startSec: 390.98 },  // ¿Hasta qué nivel habías bajado?
  { file: '6_32.jpg', startSec: 392.86 },  // Te leo los comentarios.
  { file: '6_35.jpg', startSec: 395.58 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete cada semana, una máqu
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 24.08, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 54.4, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 89.7, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 121.24, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 148.1, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 187.86, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 227.56, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 275.88, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 306.88, volume: 0.13 },
  { file: 'chapter_sting_final.mp3', startSec: 344.02, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 357.68, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 395.58, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const CadaCapaDeInternetHastaLaDarkWeb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-capa-de-internet-hasta-la-dark-web.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-capa-de-internet-hasta-la-dark-web-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-capa-de-internet-hasta-la-dark-web-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-capa-de-internet-hasta-la-dark-web/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
