import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-forma-en-que-tu-movil-te-espia - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Sales de una clínica, el móvil va bloqueado en tu bolsillo.
  { file: '0_03.jpg', startSec: 3.72 },  // Días después esa visita está a la venta.
  { file: '0_07.jpg', startSec: 7.12 },  // La FTC de Estados Unidos revisó una muestra así,
  { file: '0_11.jpg', startSec: 11.0 },  // con más de 61 millones de móviles.
  { file: '0_13.jpg', startSec: 13.46 },  // ¿Es lo peor que hace tu móvil?
  { file: '0_15.jpg', startSec: 15.4 },  // No.
  { file: '0_16.jpg', startSec: 16.28 },  // Aquí van 10 formas en que te espía,
  { file: '0_18.jpg', startSec: 18.56 },  // de la más normal a la más rara.
  { file: '0_21.jpg', startSec: 21.14 },  // Y al final,
  { file: '0_22.jpg', startSec: 22.12 },  // un exjefe de los espías lo resume en una frase.
  { file: '0_25.jpg', startSec: 25.88 },  // ¿Te atreves a divinarla?
  { file: '0_27.jpg', startSec: 27.92 },  // Número uno,
  { file: '0_28.jpg', startSec: 28.92 },  // el historial de ubicaciones,
  { file: '0_30.jpg', startSec: 30.54 },  // el diario.
  { file: '0_31.jpg', startSec: 31.76 },  // Tu móvil apunta a dónde estás,
  { file: '0_33.jpg', startSec: 33.88 },  // cada día.
  { file: '0_35.jpg', startSec: 35.0 },  // En 2018,
  { file: '0_36.jpg', startSec: 36.28 },  // Associated Press lo pilló.
  { file: '0_38.jpg', startSec: 38.24 },  // Google guardaba ubicaciones aunque pausarás el historial.
  { file: '0_41.jpg', startSec: 41.32 },  // En 2022 pagó 391 millones de dólares a 40 estados.
  { file: '0_46.jpg', startSec: 46.92 },  // ¿Cómo evitarlo?
  { file: '0_48.jpg', startSec: 48.12 },  // En Android apaga la cronología.
  { file: '0_50.jpg', startSec: 50.04 },  // En iPhone apaga ubicaciones importantes en servicios del sistema.
  { file: '0_54.jpg', startSec: 54.08 },  // Su estilo,
  { file: '0_55.jpg', startSec: 55.6 },  // nunca olvida dónde has estado.
  { file: '0_58.jpg', startSec: 58.48 },  // Número dos,
  { file: '0_59.jpg', startSec: 59.34 },  // el identificador de publicidad,
  { file: '1_01.jpg', startSec: 61.36 },  // el chivato.
  { file: '1_02.jpg', startSec: 62.54 },  // Tu móvil lleva una matrícula para anuncios.
  { file: '1_05.jpg', startSec: 65.36 },  // Las apps la venden con tu ubicación y los data brokers la compran.
  { file: '1_09.jpg', startSec: 69.36 },  // La muestra de la clínica era de uno de ellos.
  { file: '1_11.jpg', startSec: 71.86 },  // Cochaba,
  { file: '1_12.jpg', startSec: 72.68 },  // la FTC lo demandó en 2022.
  { file: '1_15.jpg', startSec: 75.4 },  // Otro se llamaba X -Mode.
  { file: '1_17.jpg', startSec: 77.24 },  // Según motherboard,
  { file: '1_18.jpg', startSec: 78.54 },  // se acaba datos de una app para rezar y los vendía contratistas del ejército estadounidense.
  { file: '1_23.jpg', startSec: 83.98 },  // En 2024, la FTC le prohibió vender ubicaciones sensibles.
  { file: '1_28.jpg', startSec: 88.36 },  // ¿Cómo evitarlo?
  { file: '1_29.jpg', startSec: 89.72 },  // En Android borra el identificador en privacidad,
  { file: '1_32.jpg', startSec: 92.48 },  // anuncios.
  { file: '1_33.jpg', startSec: 93.44 },  // En iPhone apaga las solicitudes de rastreo.
  { file: '1_36.jpg', startSec: 96.6 },  // Su estilo,
  { file: '1_37.jpg', startSec: 97.74 },  // nunca sabe tu nombre,
  { file: '1_39.jpg', startSec: 99.08 },  // pero sabe dónde duermes.
  { file: '1_41.jpg', startSec: 101.3 },  // Número tres,
  { file: '1_42.jpg', startSec: 102.34 },  // el porta papeles,
  { file: '1_43.jpg', startSec: 103.62 },  // el cotilla.
  { file: '1_45.jpg', startSec: 105.08 },  // Lo que copia se guarda en una memoria,
  { file: '1_47.jpg', startSec: 107.16 },  // una contraseña, un número de cuenta,
  { file: '1_49.jpg', startSec: 109.54 },  // y cualquier app podía leerlo.
  { file: '1_51.jpg', startSec: 111.66 },  // 2020,
  { file: '1_53.jpg', startSec: 113.0 },  // Apple prueba un aviso que salta cuando una app lee lo copiado,
  { file: '1_56.jpg', startSec: 116.38 },  // y salta con TikTok una y otra vez,
  { file: '1_59.jpg', startSec: 119.36 },  // y con LinkedIn y con Reddit.
  { file: '2_01.jpg', startSec: 121.76 },  // TikTok dijo que era contra el spam,
  { file: '2_04.jpg', startSec: 124.12 },  // y lo quitó.
  { file: '2_05.jpg', startSec: 125.34 },  // ¿Cómo evitarlo?
  { file: '2_06.jpg', startSec: 126.68 },  // En iPhone entra en cada app y en pegar desde otras apps, elige preguntar.
  { file: '2_11.jpg', startSec: 131.16 },  // Android ya te avisa.
  { file: '2_13.jpg', startSec: 133.12 },  // Su estilo,
  { file: '2_14.jpg', startSec: 134.36 },  // tu copias y él pega.
  { file: '2_17.jpg', startSec: 137.12 },  // Número cuatro, el teclado,
  { file: '2_19.jpg', startSec: 139.22 },  // él escribe.
  { file: '2_20.jpg', startSec: 140.2 },  // Todo lo que escribe es pasa por él,
  { file: '2_22.jpg', startSec: 142.56 },  // y muchos mandan tus letras a Internet.
  { file: '2_25.jpg', startSec: 145.0 },  // En 2024,
  { file: '2_26.jpg', startSec: 146.06 },  // el Citizen Lab de Toronto analizó teclados chinos de nueve marcas.
  { file: '2_30.jpg', startSec: 150.16 },  // Ocho tenían fallos.
  { file: '2_31.jpg', startSec: 151.82 },  // Quien espiera la red podía leer lo que tecleabas,
  { file: '2_34.jpg', startSec: 154.56 },  // hasta mil millones de personas expuestas.
  { file: '2_37.jpg', startSec: 157.66 },  // ¿Cómo evitarlo?
  { file: '2_39.jpg', startSec: 159.18 },  // Usa un solo teclado y actualízalo.
  { file: '2_41.jpg', startSec: 161.3 },  // En iPhone quita el acceso total a los que no conozcas.
  { file: '2_44.jpg', startSec: 164.58 },  // Su estilo, te ayuda a escribir y lee por encima de tu hombro.
  { file: '2_49.jpg', startSec: 169.88 },  // Número cinco, el micrófono,
  { file: '2_51.jpg', startSec: 171.98 },  // la gran pregunta.
  { file: '2_53.jpg', startSec: 173.72 },  // Hablas de unas tapatillas y te sale el anuncio.
  { file: '2_56.jpg', startSec: 176.88 },  // Te escucha?
  { file: '2_58.jpg', startSec: 178.2 },  // En 2018, la Universidad Northeastern probó más de 17 .000 apps,
  { file: '3_03.jpg', startSec: 183.18 },  // ninguno encendía el micrófono escondidas.
  { file: '3_05.jpg', startSec: 185.84 },  // Pero aquí viene lo raro.
  { file: '3_07.jpg', startSec: 187.4 },  // En 2024, se filtró una presentación de Cox Media Group, prometía anuncio según lo que dices cerca del micrófon
  { file: '3_14.jpg', startSec: 194.48 },  // Google le echó de su programa de socios y nadie ha demostrado que funcionara.
  { file: '3_19.jpg', startSec: 199.1 },  // En España,
  { file: '3_20.jpg', startSec: 200.1 },  // la AEPD multó a la liga.
  { file: '3_22.jpg', startSec: 202.64 },  // Sua pusaba el micrófono para cazar bar es con fútbol pirata.
  { file: '3_26.jpg', startSec: 206.54 },  // 250 .000 euros,
  { file: '3_28.jpg', startSec: 208.26 },  // por no avisar bien.
  { file: '3_29.jpg', startSec: 209.78 },  // Y el supremo anuló la multa.
  { file: '3_31.jpg', startSec: 211.82 },  // Que escuchen para ponerte anuncios, nadie lo ha probado. ¿Cómo evitarlo?
  { file: '3_36.jpg', startSec: 216.24 },  // Un punto naranja o verde arriba es el micro o la cámara en uso. Quita ese permiso a quien no lo necesite.
  { file: '3_43.jpg', startSec: 223.08 },  // Su estilo no le hace falta oírte ya sabe dónde estás.
  { file: '3_47.jpg', startSec: 227.78 },  // Y ahora empiezan las raras.
  { file: '3_49.jpg', startSec: 229.94 },  // Número seis,
  { file: '3_51.jpg', startSec: 231.24 },  // el GUIFI apagado,
  { file: '3_52.jpg', startSec: 232.6 },  // el fantasma.
  { file: '3_54.jpg', startSec: 234.28 },  // Apagas el GUIFI,
  { file: '3_55.jpg', startSec: 235.78 },  // pero el móvil sigue buscando redes y aparatos Bluetooth,
  { file: '3_58.jpg', startSec: 238.92 },  // y al buscar dice un número que lo identifica.
  { file: '4_02.jpg', startSec: 242.08 },  // 2013, Londres,
  { file: '4_03.jpg', startSec: 243.88 },  // unas papeleras con pantallas de anuncios captaban esos números.
  { file: '4_07.jpg', startSec: 247.4 },  // En un solo día contaron más de 100 .000 móviles y las cítilas mandó parar.
  { file: '4_12.jpg', startSec: 252.86 },  // ¿Cómo evitarlo?
  { file: '4_14.jpg', startSec: 254.32 },  // En Android apaga la búsqueda de GUIFI y de Bluetooth,
  { file: '4_17.jpg', startSec: 257.1 },  // en iPhone apaga los enajustes, el centro de control solo desconecta.
  { file: '4_21.jpg', startSec: 261.62 },  // Su estilo lo apagas y sigue saludando a todo el que pasa.
  { file: '4_26.jpg', startSec: 266.96 },  // Número siete,
  { file: '4_28.jpg', startSec: 268.22 },  // el cargador público, el enchufe trampa.
  { file: '4_31.jpg', startSec: 271.14 },  // El cable lleva corriente y también datos. En 2023,
  { file: '4_35.jpg', startSec: 275.54 },  // el FBI y la FCC avisaron,
  { file: '4_37.jpg', startSec: 277.94 },  // un puerto USB trucado podría meterte un virus,
  { file: '4_41.jpg', startSec: 281.48 },  // pero ninguno dio un solo caso real,
  { file: '4_43.jpg', startSec: 283.7 },  // los ataques conocidos salen de laboratorios.
  { file: '4_46.jpg', startSec: 286.68 },  // ¿Cómo evitarlo?
  { file: '4_48.jpg', startSec: 288.08 },  // Usa tu cargador en la pared y si el móvil pregunta si confías en el aparato,
  { file: '4_52.jpg', startSec: 292.32 },  // diga no.
  { file: '4_53.jpg', startSec: 293.84 },  // Su estilo te da batería y se cobra en datos.
  { file: '4_58.jpg', startSec: 298.16 },  // Número ocho, la tela inteligente,
  { file: '5_00.jpg', startSec: 300.8 },  // la que te mira.
  { file: '5_02.jpg', startSec: 302.28 },  // Muchas teles hacen capturas de lo que ves y adivinan qué programa es.
  { file: '5_06.jpg', startSec: 306.84 },  // En 2017,
  { file: '5_08.jpg', startSec: 308.26 },  // Vicio pagó 2 ,200 ,000 dólares,
  { file: '5_11.jpg', startSec: 311.34 },  // recogía lo que veían 11 millones de teles y lo vendía.
  { file: '5_15.jpg', startSec: 315.56 },  // ¿Cómo evitarlo?
  { file: '5_17.jpg', startSec: 317.0 },  // En los ajustes de la tele apaga la información de visualización.
  { file: '5_21.jpg', startSec: 321.16 },  // Su estilo,
  { file: '5_22.jpg', startSec: 322.24 },  // tu ves la tele y la tele te ve a ti.
  { file: '5_25.jpg', startSec: 325.6 },  // Número nueve,
  { file: '5_26.jpg', startSec: 326.76 },  // las antenas, el rastro.
  { file: '5_29.jpg', startSec: 329.06 },  // Tu móvil habla con las antenas todo el rato, tu operadora sabe a cuál.
  { file: '5_33.jpg', startSec: 333.12 },  // En 2019,
  { file: '5_34.jpg', startSec: 334.54 },  // el INE contó móviles por zonas con Movistar, Vodafone y Orange,
  { file: '5_39.jpg', startSec: 339.08 },  // con datos anónimos.
  { file: '5_40.jpg', startSec: 340.6 },  // Y hay algo peor,
  { file: '5_42.jpg', startSec: 342.08 },  // antenas falsas que engañan a tu móvil.
  { file: '5_44.jpg', startSec: 344.5 },  // En 2018,
  { file: '5_46.jpg', startSec: 346.12 },  // Estados Unidos detectó algo que parecían antenas falsas, cerca de la casa blanca.
  { file: '5_51.jpg', startSec: 351.26 },  // ¿Cómo evitarlo?
  { file: '5_52.jpg', startSec: 352.68 },  // Suelen bajarte a la red 2G.
  { file: '5_54.jpg', startSec: 354.72 },  // En Android apaga a permitir 2G.
  { file: '5_56.jpg', startSec: 356.98 },  // En iPhone lo hace el modo de aislamiento.
  { file: '5_59.jpg', startSec: 359.58 },  // Su estilo parece una antena, pero es un oído.
  { file: '6_03.jpg', startSec: 363.84 },  // Luego están los que se instalan dentro,
  { file: '6_05.jpg', startSec: 365.92 },  // el stalkerware o Pegasus.
  { file: '6_08.jpg', startSec: 368.0 },  // Eso son otra historia.
  { file: '6_10.jpg', startSec: 370.22 },  // Y llegamos a la última,
  { file: '6_11.jpg', startSec: 371.5 },  // la más rara.
  { file: '6_13.jpg', startSec: 373.2 },  // Número diez,
  { file: '6_14.jpg', startSec: 374.34 },  // los metadatos,
  { file: '6_15.jpg', startSec: 375.62 },  // el sobre.
  { file: '6_17.jpg', startSec: 377.06 },  // Nadie lee tu carta,
  { file: '6_18.jpg', startSec: 378.62 },  // sólo el sobre,
  { file: '6_19.jpg', startSec: 379.76 },  // aquí en llamas cuando y desde donde.
  { file: '6_22.jpg', startSec: 382.62 },  // En 2016,
  { file: '6_24.jpg', startSec: 384.14 },  // Stanford estudió las llamadas de 546 voluntarios,
  { file: '6_27.jpg', startSec: 387.96 },  // si no ir una palabra,
  { file: '6_29.jpg', startSec: 389.4 },  // y supieron que uno tenía una ritmia y que otro tenía un rifle.
  { file: '6_33.jpg', startSec: 393.9 },  // ¿Cómo evitarlo?
  { file: '6_35.jpg', startSec: 395.44 },  // Aquí no hay botón,
  { file: '6_36.jpg', startSec: 396.84 },  // usa apps de mensajes que guarden lo mínimo, como Signal.
  { file: '6_40.jpg', startSec: 400.72 },  // ¿Y la frase del exjefe de los espías?
  { file: '6_43.jpg', startSec: 403.2 },  // Michael Hayden,
  { file: '6_44.jpg', startSec: 404.32 },  // exjefe de la NSA y la CIA,
  { file: '6_47.jpg', startSec: 407.0 },  // en 2014,
  { file: '6_48.jpg', startSec: 408.4 },  // matamos a gente basándonos en metadatos.
  { file: '6_51.jpg', startSec: 411.24 },  // Su estilo,
  { file: '6_52.jpg', startSec: 412.68 },  // nunca escucha lo que dices,
  { file: '6_54.jpg', startSec: 414.32 },  // y lo sabe todo.
  { file: '6_56.jpg', startSec: 416.26 },  // ¿Y tú?
  { file: '6_57.jpg', startSec: 417.3 },  // ¿Cuál de las diez vas a pagar primero?
  { file: '6_59.jpg', startSec: 419.68 },  // Te leo en los comentarios.
  { file: '7_01.jpg', startSec: 421.9 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete,
  { file: '7_06.jpg', startSec: 426.82 },  // cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 27.92, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 58.48, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 101.3, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 137.12, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 169.88, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 227.78, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 229.94, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 266.96, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 298.16, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 325.6, volume: 0.13 },
  { file: 'chapter_sting_final.mp3', startSec: 373.2, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 421.9, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const CadaFormaEnQueTuMovilTeEspia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-forma-en-que-tu-movil-te-espia.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-forma-en-que-tu-movil-te-espia-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-forma-en-que-tu-movil-te-espia-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-forma-en-que-tu-movil-te-espia/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
