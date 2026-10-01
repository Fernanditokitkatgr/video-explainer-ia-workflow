import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-data-engineer - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hace unos vídeos te conté que hace de verdad un Data Scientist
  { file: '0_03.jpg', startSec: 3.38 },  // y en los comentarios la pregunta que más se repetió fue la misma.
  { file: '0_07.jpg', startSec: 7.58 },  // Y el Data Engineer no es lo mismo pero con otro nombre?
  { file: '0_11.jpg', startSec: 11.16 },  // No. Y la diferencia es más grande de lo que crees.
  { file: '0_14.jpg', startSec: 14.96 },  // Si el Data Scientist es el que analiza el agua,
  { file: '0_17.jpg', startSec: 17.6 },  // el Data Engineer es el que construye las tuberías por las que esa agua tiene que correr.
  { file: '0_22.jpg', startSec: 22.58 },  // Hoy te cuento qué hace de verdad,
  { file: '0_24.jpg', startSec: 24.46 },  // qué pasa cuando esas tuberías se rompen
  { file: '0_26.jpg', startSec: 26.22 },  // y un dato que te va a sorprender sobre el sueldo.
  { file: '0_29.jpg', startSec: 29.54 },  // Vamos con la diferencia real.
  { file: '0_31.jpg', startSec: 31.7 },  // Un Data Scientist recibe datos más o menos limpios y construye modelos con ellos.
  { file: '0_36.jpg', startSec: 36.64 },  // Un Data Engineer es quien se asegura de que esos datos lleguen limpios completos
  { file: '0_41.jpg', startSec: 41.04 },  // y a tiempo para empezar.
  { file: '0_42.jpg', startSec: 42.94 },  // Sin un Data Engineer detrás,
  { file: '0_44.jpg', startSec: 44.66 },  // un Data Scientist no tiene con qué trabajar.
  { file: '0_47.jpg', startSec: 47.76 },  // Es la diferencia entre analizar el agua
  { file: '0_49.jpg', startSec: 49.78 },  // y construir la tubería que la trae hasta el grifo.
  { file: '0_52.jpg', startSec: 52.9 },  // Y construir esa tubería requiere algo que mucha gente no espera,
  { file: '0_56.jpg', startSec: 56.08 },  // ingeniería de software de verdad.
  { file: '0_58.jpg', startSec: 58.88 },  // Vamos con un ejemplo real y muy típico.
  { file: '1_01.jpg', startSec: 61.9 },  // Una empresa de comercio electrónico quiere entender el comportamiento de sus clientes.
  { file: '1_06.jpg', startSec: 66.9 },  // Para eso necesita juntar tres cosas que viven en sitios completamente distintos.
  { file: '1_11.jpg', startSec: 71.58 },  // Las transacciones de compra,
  { file: '1_13.jpg', startSec: 73.52 },  // los clics en la web y los comentarios en redes sociales.
  { file: '1_17.jpg', startSec: 77.58 },  // Cada una de esas fuentes habla un idioma distinto,
  { file: '1_20.jpg', startSec: 80.26 },  // llega a una velocidad distinta y puede fallar de una forma distinta.
  { file: '1_24.jpg', startSec: 84.56 },  // El Data Engineer construye lo que se llama un pipeline,
  { file: '1_27.jpg', startSec: 87.76 },  // una tubería automática que hace tres cosas seguidas sin parar todos los días.
  { file: '1_32.jpg', startSec: 92.68 },  // Extrae los datos de cada fuente,
  { file: '1_34.jpg', startSec: 94.92 },  // los transforma a un formato como un ilimpio
  { file: '1_37.jpg', startSec: 97.72 },  // y los carga en un almacén central donde todo el mundo puede usarlos.
  { file: '1_41.jpg', startSec: 101.72 },  // A eso en el sector se le llama ETL,
  { file: '1_44.jpg', startSec: 104.6 },  // extraer, transformar y cargar.
  { file: '1_47.jpg', startSec: 107.08 },  // Y ese pipeline no se ejecuta una vez,
  { file: '1_49.jpg', startSec: 109.82 },  // se ejecuta cada hora cada día para siempre.
  { file: '1_53.jpg', startSec: 113.12 },  // Y aquí está la parte que casi nadie cuenta cuando habla de este trabajo.
  { file: '1_57.jpg', startSec: 117.6 },  // Los pipelines se rompen constantemente.
  { file: '2_01.jpg', startSec: 121.14 },  // Una fuente cambia el formato de sus datos sin avisar,
  { file: '2_04.jpg', startSec: 124.28 },  // un servidor se cae a mitad de la carga,
  { file: '2_06.jpg', startSec: 126.68 },  // llega en el doble de datos de golpe un día de rebajas.
  { file: '2_10.jpg', startSec: 130.0 },  // Y cuando un pipeline se rompe no se entera solo el Data Engineer.
  { file: '2_14.jpg', startSec: 134.28 },  // Se entera todo el equipo de Data Science
  { file: '2_16.jpg', startSec: 136.26 },  // que de repente se queda trabajando con datos de ayer
  { file: '2_19.jpg', startSec: 139.0 },  // o con datos a media sin saberlo.
  { file: '2_21.jpg', startSec: 141.84 },  // Por eso una parte enorme del trabajo
  { file: '2_23.jpg', startSec: 143.82 },  // no es construir el pipeline la primera vez, es vigilarlo.
  { file: '2_27.jpg', startSec: 147.92 },  // Alertas que avisan en cuanto algo falla,
  { file: '2_30.jpg', startSec: 150.32 },  // comprobaciones automáticas de que los datos que llegan tienen sentido
  { file: '2_33.jpg', startSec: 153.64 },  // y un plan para cuando, no si,
  { file: '2_36.jpg', startSec: 156.32 },  // algo se rompe a las tres de la madrugada.
  { file: '2_38.jpg', startSec: 158.78 },  // Y aquí hay un matiz que separa a un pipeline a mater de uno de verdad.
  { file: '2_43.jpg', startSec: 163.38 },  // Un pipeline a mater falla en silencio.
  { file: '2_45.jpg', startSec: 165.96 },  // Los datos llegan mal, nadie se entera
  { file: '2_48.jpg', startSec: 168.1 },  // y una semana después alguien de negocio toma una decisión basada
  { file: '2_51.jpg', startSec: 171.58 },  // en un número que estaba corrupto desde el lunes.
  { file: '2_54.jpg', startSec: 174.56 },  // Un pipeline bien construido falla de forma ruidosa,
  { file: '2_58.jpg', startSec: 178.26 },  // separa, avisa y no deja que el dato malo siga adelante.
  { file: '3_02.jpg', startSec: 182.48 },  // Ese detalle fallar alto y pronto en vez de silencioso y tarde
  { file: '3_06.jpg', startSec: 186.18 },  // es prácticamente la definición de ingeniería de datos madura.
  { file: '3_10.jpg', startSec: 190.74 },  // Por eso las herramientas que se usan hoy en día,
  { file: '3_13.jpg', startSec: 193.14 },  // como Erflow para organizar las tareas
  { file: '3_15.jpg', startSec: 195.26 },  // o dbt para las transformaciones,
  { file: '3_17.jpg', startSec: 197.76 },  // están construidas alrededor de esa idea
  { file: '3_19.jpg', startSec: 199.76 },  // que cada paso se pueda vigilar por separado
  { file: '3_22.jpg', startSec: 202.28 },  // y aquí viene el giro que te prometía al principio.
  { file: '3_25.jpg', startSec: 205.62 },  // Durante años, la creencia general era que el Data Scientist
  { file: '3_29.jpg', startSec: 209.14 },  // cobraba más porque era el perfil de moda,
  { file: '3_31.jpg', startSec: 211.62 },  // el que salía en las noticias.
  { file: '3_33.jpg', startSec: 213.72 },  // Eso se ha invertido.
  { file: '3_35.jpg', startSec: 215.48 },  // En cada nivel de experiencia,
  { file: '3_37.jpg', startSec: 217.08 },  // el Data Engineer cobra ahora entre un 8 y un 15% más que el Data Scientist.
  { file: '3_42.jpg', startSec: 222.44 },  // ¿Por qué?
  { file: '3_43.jpg', startSec: 223.76 },  // Porque construir y mantener infraestructura de datos en producción
  { file: '3_46.jpg', startSec: 226.76 },  // que no se puede permitir caerse requiere una combinación de habilidades
  { file: '3_50.jpg', startSec: 230.82 },  // mucho más rara de encontrar.
  { file: '3_53.jpg', startSec: 233.3 },  // Hay muchísima gente que sabe entrenar un modelo siguiendo un tutorial.
  { file: '3_57.jpg', startSec: 237.32 },  // Hay muchísima menos que sabe construir un sistema
  { file: '3_59.jpg', startSec: 239.72 },  // que no se caiga con tráfico real.
  { file: '4_02.jpg', startSec: 242.7 },  // Vale.
  { file: '4_03.jpg', startSec: 243.3 },  // Y en cifras concretas, ¿cuánto se paga en España en 2016?
  { file: '4_08.jpg', startSec: 248.0 },  // El rango completo va de 28.000 a 85.000 euros brutos al año,
  { file: '4_12.jpg', startSec: 252.24 },  // según la experiencia.
  { file: '4_14.jpg', startSec: 254.28 },  // La mediana está alrededor de 50.000.
  { file: '4_17.jpg', startSec: 257.24 },  // Y en sectores donde los datos en tiempo real son críticos,
  { file: '4_20.jpg', startSec: 260.6 },  // banca, seguros, plataformas grandes,
  { file: '4_23.jpg', startSec: 263.12 },  // el sueldo puede igualar o superar claramente al de un Data Scientist
  { file: '4_26.jpg', startSec: 266.68 },  // en el mismo nivel.
  { file: '4_28.jpg', startSec: 268.56 },  // La diferencia entre esos números,
  { file: '4_30.jpg', startSec: 270.44 },  // otra vez, no es sólo antigüedad.
  { file: '4_32.jpg', startSec: 272.78 },  // Es haber visto un pipeline caerse en producción un viernes por la tarde
  { file: '4_36.jpg', startSec: 276.26 },  // y saber exactamente qué hacer.
  { file: '4_39.jpg', startSec: 279.52 },  // ¿Y cómo se entra en esto?
  { file: '4_41.jpg', startSec: 281.84 },  // La base es programación seria,
  { file: '4_43.jpg', startSec: 283.72 },  // no sólo script sueltos, sino código que otras personas puedan mantener.
  { file: '4_48.jpg', startSec: 288.8 },  // Después, bases de datos,
  { file: '4_50.jpg', startSec: 290.54 },  // tanto las clásicas como las que manejan volúmenes enormes
  { file: '4_53.jpg', startSec: 293.3 },  // y entender bien cómo se organiza la información
  { file: '4_55.jpg', startSec: 295.88 },  // para que se pueda consultar rápido.
  { file: '4_58.jpg', startSec: 298.3 },  // Y el patrón que hay que aprender es siempre el mismo,
  { file: '5_01.jpg', startSec: 301.5 },  // extraer, transformar, cargar,
  { file: '5_04.jpg', startSec: 304.06 },  // aunque cambian las herramientas de moda cada dos años.
  { file: '5_07.jpg', startSec: 307.38 },  // Las herramientas concretas del momento son Airflow
  { file: '5_10.jpg', startSec: 310.12 },  // para organizar cuando se ejecuta cada tarea,
  { file: '5_13.jpg', startSec: 313.34 },  // Spark para procesar volúmenes enormes de datos en paralelo
  { file: '5_16.jpg', startSec: 316.66 },  // y débeté para las transformaciones escritas en SQL.
  { file: '5_20.jpg', startSec: 320.68 },  // Pero ojo, las herramientas cambian cada pocos años.
  { file: '5_24.jpg', startSec: 324.2 },  // El patrón de extraer, transformar y cargar,
  { file: '5_27.jpg', startSec: 327.28 },  // y, sobre todo, vigilar, lleva década siendo el mismo.
  { file: '5_31.jpg', startSec: 331.6 },  // El proyecto que de verdad vale en una entrevista no es montéo modelo.
  { file: '5_36.jpg', startSec: 336.08 },  // Es construir un pipeline que coge datos de una fuente real,
  { file: '5_39.jpg', startSec: 339.54 },  // los limpia automáticamente y los deja listos para usar
  { file: '5_43.jpg', startSec: 343.12 },  // y programé una alerta para cuando algo falle.
  { file: '5_46.jpg', startSec: 346.72 },  // Coger un dataset público que se actualiza cada día
  { file: '5_49.jpg', startSec: 349.38 },  // y automatizar por completo su descarga, limpieza y almacenamiento
  { file: '5_53.jpg', startSec: 353.22 },  // es un proyecto de este mismo fin de semana
  { file: '5_55.jpg', startSec: 355.82 },  // y ya te enfrenta al problema real,
  { file: '5_58.jpg', startSec: 358.44 },  // que haces cuando la fuente cambia sin avisar.
  { file: '6_01.jpg', startSec: 361.68 },  // Así que la próxima vez que alguien te diga que un data engineer
  { file: '6_04.jpg', startSec: 364.68 },  // es solo un data scientist con otro nombre,
  { file: '6_07.jpg', startSec: 367.22 },  // ya sabes que uno analiza el agua
  { file: '6_09.jpg', startSec: 369.16 },  // y el otro construye la tubería
  { file: '6_10.jpg', startSec: 370.94 },  // y que sin la tubería no hay agua que analizar.
  { file: '6_15.jpg', startSec: 375.14 },  // Y ahora también sabes que esa tubería,
  { file: '6_17.jpg', startSec: 377.38 },  // la que nadie ve hasta que se rompe,
  { file: '6_19.jpg', startSec: 379.34 },  // es la que mejor se está pagando ahora mismo en todo el sector de datos.
  { file: '6_24.jpg', startSec: 384.24 },  // Si te ha interesado esta serie sobre empleos reales en tecnología,
  { file: '6_27.jpg', startSec: 387.84 },  // suscríbete, se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'pipeline_build.mp3', startSec: 87.76, volume: 0.15 },
  { file: 'etl_stamp.mp3', startSec: 101.72, volume: 0.15 },
  { file: 'pipelines_break.mp3', startSec: 117.6, volume: 0.17 },
  { file: 'alert_ping.mp3', startSec: 147.92, volume: 0.16 },
  { file: 'fail_loud.mp3', startSec: 178.26, volume: 0.16 },
  { file: 'twist_reveal.mp3', startSec: 202.28, volume: 0.16 },
  { file: 'money_chime.mp3', startSec: 217.08, volume: 0.17 },
  { file: 'salary_reveal.mp3', startSec: 248.0, volume: 0.17 },
  { file: 'question_path.mp3', startSec: 279.52, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 367.22, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 384.24, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceDataEngineer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-data-engineer.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-data-engineer-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-data-engineer-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-data-engineer/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
