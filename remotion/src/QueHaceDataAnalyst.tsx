import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hace-data-analyst - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hay un puesto de trabajo del que casi todo el mundo se hace una idea equivocada, y no es por lo que hace.
  { file: '0_05.jpg', startSec: 5.82 },  // Es por lo que la gente cree que es un escalón,
  { file: '0_08.jpg', startSec: 8.88 },  // algo temporal.
  { file: '0_10.jpg', startSec: 10.7 },  // El data analista.
  { file: '0_12.jpg', startSec: 12.76 },  // Casi todo el mundo asume que es el peldaño junior de camino a convertirte en Data Scientist. No lo es.
  { file: '0_19.jpg', startSec: 19.26 },  // Vamos a la diferencia real, porque aquí está la clave de todo el vídeo.
  { file: '0_23.jpg', startSec: 23.64 },  // El Data Scientist mira hacia adelante.
  { file: '0_26.jpg', startSec: 26.48 },  // Construye modelos que predicen qué va a pasar.
  { file: '0_29.jpg', startSec: 29.86 },  // El Data Analist mira hacia atrás.
  { file: '0_32.jpg', startSec: 32.54 },  // Analiza lo que ya pasó y lo cuenta de forma que alguien pueda decidir algo con ello.
  { file: '0_37.jpg', startSec: 37.82 },  // Si el Data Scientist predice que tiempo hará mañana,
  { file: '0_40.jpg', startSec: 40.98 },  // el Data Analist es quien te dice que ha habido todos los martes de los últimos seis meses.
  { file: '0_46.jpg', startSec: 46.22 },  // Y saber eso, lo de los martes,
  { file: '0_48.jpg', startSec: 48.36 },  // puede valer tanto como predecir el tiempo de mañana.
  { file: '0_51.jpg', startSec: 51.1 },  // A veces más.
  { file: '0_52.jpg', startSec: 52.98 },  // Vamos con un ejemplo real y muy típico. Una tienda online nota que las ventas del último trimestre bajaron un 
  { file: '1_01.jpg', startSec: 61.38 },  // El Data Analist no construye un modelo para predecir ventas futuras.
  { file: '1_05.jpg', startSec: 65.66 },  // Eso no es su trabajo aquí.
  { file: '1_07.jpg', startSec: 67.8 },  // Se mete en los datos que ya existen, pedidos, visitas, carritos abandonados y busca el patrón.
  { file: '1_14.jpg', startSec: 74.3 },  // Y encuentra algo muy concreto.
  { file: '1_16.jpg', startSec: 76.44 },  // Los carritos se abandonan sobre todo los jueves por la tarde,
  { file: '1_19.jpg', startSec: 79.7 },  // justo cuando se activa un cargo de envío que los otros días no aparece hasta el último paso.
  { file: '1_25.jpg', startSec: 85.04 },  // Nadie predijo nada,
  { file: '1_26.jpg', startSec: 86.82 },  // alguien miró con cuidado lo que ya había pasado y encontró la causa.
  { file: '1_31.jpg', startSec: 91.42 },  // Y fíjate en el tipo de trabajo que fue eso.
  { file: '1_34.jpg', startSec: 94.38 },  // No hizo falta entrenar ningún modelo,
  { file: '1_36.jpg', startSec: 96.82 },  // hizo falta cruzar tres tablas de datos que ya existían y hacer las preguntas correctas en el orden correcto.
  { file: '1_43.jpg', startSec: 103.44 },  // Cuando se abandona el carrito,
  { file: '1_45.jpg', startSec: 105.72 },  // coincide con algo que cambia en la hueve ese mismo día.
  { file: '1_48.jpg', startSec: 108.98 },  // Pasa en todos los dispositivos o solo en uno.
  { file: '1_51.jpg', startSec: 111.82 },  // Cada pregunta descarta una hipótesis y deja una más probable.
  { file: '1_55.jpg', startSec: 115.72 },  // Eso, ir descartando con cuidado,
  { file: '1_57.jpg', startSec: 117.88 },  // es el oficio entero resumido en una frase.
  { file: '2_00.jpg', startSec: 120.84 },  // Y ese hallazgo no vale nada si se queda en una hoja de cálculo que nadie entiende.
  { file: '2_05.jpg', startSec: 125.54 },  // Por eso la otra mitad del trabajo, la que menos se cuenta,
  { file: '2_08.jpg', startSec: 128.68 },  // es contarlo bien.
  { file: '2_10.jpg', startSec: 130.64 },  // Un dashboard en Power BI o tablo, un informe claro, una reunión donde explicas a alguien de negocio sin jerga 
  { file: '2_18.jpg', startSec: 138.2 },  // ¿por qué está pasando esto?
  { file: '2_20.jpg', startSec: 140.18 },  // Un data analist brillante con datos, pero que no sabe explicarlos,
  { file: '2_24.jpg', startSec: 144.34 },  // no cambian ninguna decisión en la empresa.
  { file: '2_27.jpg', startSec: 147.22 },  // Comunicar el hallazgo es, literalmente,
  { file: '2_29.jpg', startSec: 149.76 },  // la mitad del trabajo, no un extra.
  { file: '2_32.jpg', startSec: 152.9 },  // Y esa reunión tiene un riesgo que casi nadie te cuenta cuando empiezas.
  { file: '2_37.jpg', startSec: 157.24 },  // La persona de negocio no quiere quince gráficos ni una explicación técnica del cruce de tablas.
  { file: '2_42.jpg', startSec: 162.94 },  // Quiere una frase,
  { file: '2_44.jpg', startSec: 164.44 },  // la respuesta,
  { file: '2_45.jpg', startSec: 165.36 },  // y entonces qué hago yo con esto,
  { file: '2_47.jpg', startSec: 167.62 },  // en menos de un minuto.
  { file: '2_49.jpg', startSec: 169.52 },  // Saber resumir un análisis de tres días de trabajo en una sola frase accionable es, para mucha gente,
  { file: '2_55.jpg', startSec: 175.44 },  // la parte más difícil de todo el oficio.
  { file: '2_58.jpg', startSec: 178.58 },  // Vale, y aquí está el mito que quiero desmontar del todo.
  { file: '3_02.jpg', startSec: 182.12 },  // Mucha gente entra en este puesto pensando en él como una sala de espera.
  { file: '3_06.jpg', startSec: 186.28 },  // Como si en un año dos si trabajas bien,
  { file: '3_08.jpg', startSec: 188.88 },  // ascendieras automáticamente a datas scientists.
  { file: '3_12.jpg', startSec: 192.28 },  // Pero no es una versión reducida de ese otro trabajo, es una disciplina distinta con su propia carrera completa
  { file: '3_19.jpg', startSec: 199.28 },  // Hay analistas de datos senior,
  { file: '3_21.jpg', startSec: 201.36 },  // analistas líderes de equipo,
  { file: '3_23.jpg', startSec: 203.3 },  // gente con 15 años de experiencia que nunca ha querido ni necesitado tocar un modelo de machine learning.
  { file: '3_29.jpg', startSec: 209.76 },  // Confundir los dos puestos hace que mucha gente buenísima en esto se sienta como si estuviera fallando por no a
  { file: '3_37.jpg', startSec: 217.64 },  // Y ese malentendido tiene un coste real, no solo emocional.
  { file: '3_41.jpg', startSec: 221.92 },  // Empresas que tratan el puesto como una sala de espera,
  { file: '3_44.jpg', startSec: 224.8 },  // lo rotan cada año y pierden justo lo que más vale de una analista bueno.
  { file: '3_49.jpg', startSec: 229.1 },  // El conocimiento acumulado de cómo se comporta esa empresa en concreto. Una analista con tres años en la misma 
  { file: '4_01.jpg', startSec: 241.5 },  // Y las herramientas del día a día lo confirman son distintas de verdad.
  { file: '4_05.jpg', startSec: 245.76 },  // El datas scientists vive en Python, en librerías de machine learning, en estadística inferencial compleja.
  { file: '4_12.jpg', startSec: 252.08 },  // El data analista vive en SQL para sacar los datos, en excel avanzado y en herramientas de visualización como P
  { file: '4_21.jpg', startSec: 261.38 },  // Si uno oferta de trabajo pide sobre todo SQL,
  { file: '4_24.jpg', startSec: 264.34 },  // excel y comunicación con negocio, es un puesto de analista.
  { file: '4_28.jpg', startSec: 268.2 },  // Si pide Python, librerías de aprendizaje automático y estadística avanzada es otra cosa completamente distinta
  { file: '4_35.jpg', startSec: 275.36 },  // Y hay una herramienta que casi nunca sin honbra en estas comparativas y que en el día a día pesa muchísimo.
  { file: '4_41.jpg', startSec: 281.82 },  // El propio SQL no es solo sacar datos, es saber escribir la pregunta exacta para no traerte 10 millones de fila
  { file: '4_50.jpg', startSec: 290.7 },  // Una consulta mal escrita puede tardar horas y bloquear el sistema para todo el equipo, una bien escrita tardas
  { file: '4_57.jpg', startSec: 297.88 },  // Esa habilidad tampoco vistosa es de las que más rápido separa una analista con experiencia de uno que acaba de
  { file: '5_05.jpg', startSec: 305.54 },  // Vale, y en cifras concretas, cuando se paga esto en España en 2026.
  { file: '5_10.jpg', startSec: 310.68 },  // Un data analista que empieza ronda los 26 .000 euros brutos al año.
  { file: '5_14.jpg', startSec: 314.96 },  // Con experiencia media, 3 a 5 años, sube a un rango de 35 .000.
  { file: '5_19.jpg', startSec: 319.96 },  // Y un perfil senior, con más de 10 años, puede superarlo 60 .000.
  { file: '5_24.jpg', startSec: 324.74 },  // Cifras muy parecidas, de hecho, a las de un data scientist en los mismos niveles. La diferencia real no está e
  { file: '5_35.jpg', startSec: 335.14 },  // Y esa cercanía en el sueldo es, en sí misma, otra prueba de que no es un puesto de segunda.
  { file: '5_41.jpg', startSec: 341.06 },  // Si de verdad fuera solo el escalón junior de otra profesión, no cobraría casi lo mismo en cada nivel de experi
  { file: '5_47.jpg', startSec: 347.6 },  // El mercado, con sus cifras, ya está diciendo algo que el nombre del puesto no deja ver a simple vista.
  { file: '5_53.jpg', startSec: 353.82 },  // ¿Y cómo se entra en esto?
  { file: '5_56.jpg', startSec: 356.16 },  // Y aquí va otro mito menos, no hace falta saber programar para entrar.
  { file: '6_00.jpg', startSec: 360.82 },  // Ese huele ayuda muchísimo, pero muchas ofertas de nivel inicial piden sobre todo excel avanzado y una herramie
  { file: '6_08.jpg', startSec: 368.46 },  // Lo que sí hace falta, y esto es lo que de verdad marca la diferencia,
  { file: '6_12.jpg', startSec: 372.5 },  // es curiosidad por el porqué detrás de un número raro.
  { file: '6_16.jpg', startSec: 376.08 },  // El proyecto que de verdad impresiona en una entrevista no es, y hace un dashboard bonito.
  { file: '6_21.jpg', startSec: 381.22 },  // Escojero un conjunto de datos público real, encontrar un patrón que no sea obvio a simple vista, y contarlo en
  { file: '6_31.jpg', startSec: 391.6 },  // Esa combinación, encontrar el patrón y saber contarlo, es exactamente lo que se paga en este trabajo.
  { file: '6_38.jpg', startSec: 398.26 },  // Y un consejo práctico para ese proyecto,
  { file: '6_40.jpg', startSec: 400.98 },  // elige un dato que te importe de verdad a ti.
  { file: '6_43.jpg', startSec: 403.68 },  // Tus propias finanzas, los resultados de tu equipo favorito, tus horas de sueño de los últimos meses. La curios
  { file: '6_55.jpg', startSec: 415.62 },  // Nadie cuenta bien una historia que no le interesaba desde el principio.
  { file: '6_59.jpg', startSec: 419.98 },  // Así que la próxima vez que alguien te llame solo analista como si fuera un diminutivo,
  { file: '7_04.jpg', startSec: 424.78 },  // ya sabes que no es una escalona hacia otra cosa, es un oficio completo por sí mismo.
  { file: '7_10.jpg', startSec: 430.66 },  // El Data Scientist te dirá que tiempo hará mañana. El Data Analyst es quien ya sabe con certeza por qué ha llov
  { file: '7_21.jpg', startSec: 441.9 },  // Si te ha interesado esta serie sobre empleos reales en tecnología,
  { file: '7_25.jpg', startSec: 445.36 },  // suscríbete.
  { file: '7_26.jpg', startSec: 446.28 },  // Se viene más de este mundo.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'key_transition.mp3', startSec: 19.26, volume: 0.15 },
  { file: 'example_intro.mp3', startSec: 52.98, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 86.82, volume: 0.16 },
  { file: 'emphasis_sting.mp3', startSec: 149.76, volume: 0.16 },
  { file: 'myth_twist.mp3', startSec: 178.58, volume: 0.16 },
  { file: 'tools_transition.mp3', startSec: 241.5, volume: 0.14 },
  { file: 'money_question.mp3', startSec: 305.54, volume: 0.14 },
  { file: 'money_chime.mp3', startSec: 310.68, volume: 0.17 },
  { file: 'question_transition.mp3', startSec: 353.82, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 424.78, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 445.36, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHaceDataAnalyst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hace-data-analyst.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hace-data-analyst-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hace-data-analyst-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hace-data-analyst/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
