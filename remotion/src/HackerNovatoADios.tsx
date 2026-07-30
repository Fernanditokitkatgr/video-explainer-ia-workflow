import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// De hacker novato a nivel dios: la hoja de ruta real — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Todo el mundo quiere el hacker de nivel dios. Nadie quiere hablar del camino real hasta llegar ahí."
  { file: '0_05.jpg', startSec: 5.46 },  // "Y ese camino tiene etapas exactas, con tiempos reales, no promesas de Odd hacker en un mes."
  { file: '0_12.jpg', startSec: 12.46 },  // "Esta es la hoja de ruta real etapa por etapa."
  { file: '0_16.jpg', startSec: 16.16 },  // "Etapa 1."
  { file: '0_17.jpg', startSec: 17.38 },  // "Los primeros tres meses."
  { file: '0_19.jpg', startSec: 19.08 },  // "Aquí no tocas nada avanzado todavía."
  { file: '0_21.jpg', startSec: 21.48 },  // "Aprendes cómo funciona un ordenador por dentro,"
  { file: '0_24.jpg', startSec: 24.04 },  // "que es un sistema operativo,"
  { file: '0_25.jpg', startSec: 25.74 },  // "que es una red,"
  { file: '0_26.jpg', startSec: 26.92 },  // "que es un puerto abierto."
  { file: '0_28.jpg', startSec: 28.6 },  // "Instalas Linux,"
  { file: '0_29.jpg', startSec: 29.76 },  // "aunque no entiendas ni la mitad de lo que ves en pantalla."
  { file: '0_32.jpg', startSec: 32.64 },  // "La mayoría abandona aquí, porque es la etapa menos emocionante de todas."
  { file: '0_37.jpg', startSec: 37.0 },  // "Si aguantas estos tres meses aburridos,"
  { file: '0_39.jpg', startSec: 39.44 },  // "llavas por delante del 90 % de la gente que lo intenta."
  { file: '0_43.jpg', startSec: 43.4 },  // "Etápados."
  { file: '0_44.jpg', startSec: 44.56 },  // "Del mes 4 al mes 12."
  { file: '0_46.jpg', startSec: 46.52 },  // "Empiezas a practicar de verdad,"
  { file: '0_48.jpg', startSec: 48.26 },  // "en plataformas legales como Trai, Hackney y Hackdebox."
  { file: '0_51.jpg', startSec: 51.78 },  // "Rompes tu primera máquina virtual,"
  { file: '0_53.jpg', startSec: 53.92 },  // "y luego la segunda,"
  { file: '0_55.jpg', startSec: 55.08 },  // "y luego veinte más."
  { file: '0_56.jpg', startSec: 56.7 },  // "Aprendes a leer código,"
  { file: '0_58.jpg', startSec: 58.08 },  // "aunque sea mal,"
  { file: '0_59.jpg', startSec: 59.18 },  // "aprendes a buscar en foros técnicos sin rendirtirte a la primera."
  { file: '1_02.jpg', startSec: 62.42 },  // "En este punto, ya puedes intentar tu primera certificación de entrada, tipo Ejo -TAPT o Security Plus."
  { file: '1_09.jpg', startSec: 69.1 },  // "Aquí es donde la mayoría de la gente que sí aguantó la etapa 1,"
  { file: '1_12.jpg', startSec: 72.54 },  // "se atasca de verdad."
  { file: '1_14.jpg', startSec: 74.22 },  // "Porque ya no es aburrido,"
  { file: '1_15.jpg', startSec: 75.64 },  // "es difícil y son cosas distintas."
  { file: '1_19.jpg', startSec: 79.16 },  // "Etapa 3."
  { file: '1_20.jpg', startSec: 80.32 },  // "Del año 1 al año 2."
  { file: '1_22.jpg', startSec: 82.08 },  // "Ya sabes lo suficiente para tu primer trabajo real. No como hacker de élite,"
  { file: '1_26.jpg', startSec: 86.64 },  // "como analista junior de seguridad,"
  { file: '1_28.jpg', startSec: 88.64 },  // "o como soporte técnico con interés en seguridad."
  { file: '1_31.jpg', startSec: 91.68 },  // "Ese primer trabajo es la etapa más importante de todas, aunque no lo parezca,"
  { file: '1_35.jpg', startSec: 95.64 },  // "porque ahí aprendes cómo funciona una empresa de verdad,"
  { file: '1_38.jpg', startSec: 98.84 },  // "no un laboratorio de prácticas,"
  { file: '1_40.jpg', startSec: 100.7 },  // "ves incidentes reales, ves presión real,"
  { file: '1_43.jpg', startSec: 103.74 },  // "ves que la teoría y la realidad no siempre coinciden."
  { file: '1_46.jpg', startSec: 106.88 },  // "La mayoría de los currículums fallan aquí, no por falta de conocimiento,"
  { file: '1_50.jpg', startSec: 110.66 },  // "sino por no tener ningún proyecto propio que enseñar. Un perfil de GitHub, con tres proyectos propios,"
  { file: '1_56.jpg', startSec: 116.64 },  // "pesa más que un título sin nada detrás."
  { file: '1_59.jpg', startSec: 119.66 },  // "Etapa 4."
  { file: '2_00.jpg', startSec: 120.88 },  // "Del año 2 al año 4."
  { file: '2_02.jpg', startSec: 122.42 },  // "Ahora te especializas,"
  { file: '2_04.jpg', startSec: 124.06 },  // "y aquí se abre la bifurcación real."
  { file: '2_06.jpg', startSec: 126.38 },  // "Unos van hacia el Pentestin,"
  { file: '2_08.jpg', startSec: 128.22 },  // "atacar sistemas con permiso para encontrar sus fallos."
  { file: '2_11.jpg', startSec: 131.32 },  // "Otros van hacia el Blue Team,"
  { file: '2_12.jpg', startSec: 132.98 },  // "defender sistemas,"
  { file: '2_14.jpg', startSec: 134.16 },  // "detectar ataques en tiempo real. Sacas tu primera certificación sería el OSCP si vas por ataque,"
  { file: '2_20.jpg', startSec: 140.8 },  // "o certificaciones de detección si vas por defensa."
  { file: '2_23.jpg', startSec: 143.88 },  // "Esta etapa es la que multiplica tu sueldo, no la primera,"
  { file: '2_27.jpg', startSec: 147.36 },  // "esta."
  { file: '2_28.jpg', startSec: 148.52 },  // "Un profesional en esta etapa ya gana el doble que en su primer trabajo si eligío bien su especialidad."
  { file: '2_34.jpg', startSec: 154.88 },  // "Etapa 5."
  { file: '2_36.jpg', startSec: 156.22 },  // "Del año 4 en adelante."
  { file: '2_38.jpg', startSec: 158.14 },  // "Aquí está el nivel dios."
  { file: '2_39.jpg', startSec: 159.94 },  // "No es alguien que sabe todos los trucos,"
  { file: '2_42.jpg', startSec: 162.14 },  // "es alguien que ha visto tantos casos reales que reconoce el patrón en segundos,"
  { file: '2_46.jpg', startSec: 166.62 },  // "encuentra el fallo crítico que 10 personas más ya miraron y no vieran."
  { file: '2_50.jpg', startSec: 170.98 },  // "Compiten el Backbound y más alto,"
  { file: '2_53.jpg', startSec: 173.14 },  // "los programas de Google,"
  { file: '2_54.jpg', startSec: 174.66 },  // "Apple, Microsoft,"
  { file: '2_55.jpg', startSec: 175.88 },  // "donde un solo fallo puede pagar 100 .000 dólares o más."
  { file: '2_59.jpg', startSec: 179.16 },  // "O lidera el red team de una empresa entera,"
  { file: '3_01.jpg', startSec: 181.68 },  // "decidiendo qué se ataca y por qué."
  { file: '3_04.jpg', startSec: 184.22 },  // "Y lo más importante,"
  { file: '3_05.jpg', startSec: 185.76 },  // "sigue aprendiendo cada semana,"
  { file: '3_07.jpg', startSec: 187.64 },  // "porque en este mundo, quien deja de aprender, se queda absoluto en menos de dos años."
  { file: '3_12.jpg', startSec: 192.9 },  // "Capítulo final."
  { file: '3_14.jpg', startSec: 194.16 },  // "¿Cuánto tarda de verdad?"
  { file: '3_15.jpg', startSec: 195.98 },  // "La respuesta honesta,"
  { file: '3_17.jpg', startSec: 197.4 },  // "entre 3 y 5 años de trabajo constante,"
  { file: '3_20.jpg', startSec: 200.38 },  // "no de promesas de curso rápido."
  { file: '3_22.jpg', startSec: 202.46 },  // "Nadie llega a nivel dios en un fin de semana,"
  { file: '3_25.jpg', startSec: 205.14 },  // "ni en un mes,"
  { file: '3_26.jpg', startSec: 206.06 },  // "ni en un curso de 40 horas."
  { file: '3_28.jpg', startSec: 208.28 },  // "Pero si empiezas hoy, con constancia real,"
  { file: '3_31.jpg', startSec: 211.22 },  // "dentro de un año ya estarás muy por delante de dónde estás ahora mismo."
  { file: '3_35.jpg', startSec: 215.18 },  // "La pregunta no es si tienes talento,"
  { file: '3_37.jpg', startSec: 217.66 },  // "es si vas a aguantar la etapa 1, la aburrida,"
  { file: '3_40.jpg', startSec: 220.7 },  // "la que casi nadie termina."
  { file: '3_42.jpg', startSec: 222.94 },  // "Si quieres empezar de verdad,"
  { file: '3_44.jpg', startSec: 224.72 },  // "trae Hackmy, Hack de Box,"
  { file: '3_46.jpg', startSec: 226.22 },  // "son gratis para dar el primer paso hoy mismo."
  { file: '3_49.jpg', startSec: 229.06 },  // "Suscríbete,"
  { file: '3_49_b.jpg', startSec: 229.96 },  // "se viene mucho más de este camino."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'stage_sting_1.mp3', startSec: 16.16, volume: 0.16 },
  { file: 'time_whoosh.mp3', startSec: 32.64, volume: 0.12 },
  { file: 'stage_sting_2.mp3', startSec: 43.4, volume: 0.16 },
  { file: 'game_blip.mp3', startSec: 51.78, volume: 0.13 },
  { file: 'achievement_chime.mp3', startSec: 62.42, volume: 0.15 },
  { file: 'tense_sting_1.mp3', startSec: 69.1, volume: 0.15 },
  { file: 'stage_sting_3.mp3', startSec: 79.16, volume: 0.16 },
  { file: 'notification_ping.mp3', startSec: 91.68, volume: 0.13 },
  { file: 'deflate_sound.mp3', startSec: 106.88, volume: 0.14 },
  { file: 'positive_chime.mp3', startSec: 116.64, volume: 0.14 },
  { file: 'stage_sting_4.mp3', startSec: 119.66, volume: 0.16 },
  { file: 'fork_whoosh.mp3', startSec: 124.06, volume: 0.13 },
  { file: 'cash_register_1.mp3', startSec: 148.52, volume: 0.15 },
  { file: 'stage_sting_5.mp3', startSec: 154.88, volume: 0.18 },
  { file: 'target_lock_beep.mp3', startSec: 166.62, volume: 0.14 },
  { file: 'cash_register_2.mp3', startSec: 175.88, volume: 0.16 },
  { file: 'chapter_sting_final.mp3', startSec: 192.9, volume: 0.16 },
  { file: 'calm_resolve_chime.mp3', startSec: 211.22, volume: 0.13 },
  { file: 'door_open_bright.mp3', startSec: 224.72, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 229.1, volume: 0.17 },
];

export const HackerNovatoADios: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('hacker-novato-a-dios.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`hacker-novato-a-dios-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`hacker-novato-a-dios/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
