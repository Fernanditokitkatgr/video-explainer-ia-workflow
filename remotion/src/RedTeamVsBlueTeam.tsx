import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Red Team vs Blue Team: quién gana de verdad — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Cada gran empresa del mundo libra una guerra silenciosa todos los días."
  { file: '0_04.jpg', startSec: 4.66 },  // "No sale en las noticias,"
  { file: '0_06.jpg', startSec: 6.22 },  // "no hay explosiones,"
  { file: '0_07.jpg', startSec: 7.86 },  // "pero hay un equipo que ataca y otro que defiende,"
  { file: '0_11.jpg', startSec: 11.24 },  // "contra el mismo objetivo,"
  { file: '0_12.jpg', startSec: 12.82 },  // "la misma empresa."
  { file: '0_14.jpg', startSec: 14.48 },  // "Se llaman Red Team y Blue Team,"
  { file: '0_16.jpg', startSec: 16.66 },  // "y la pregunta que nadie responde bien es esta."
  { file: '0_20.jpg', startSec: 20.02 },  // "¿Quién gana de verdad?"
  { file: '0_22.jpg', startSec: 22.12 },  // "Capítulo 1."
  { file: '0_23.jpg', startSec: 23.38 },  // "¿Quién es el Red Team?"
  { file: '0_24.jpg', startSec: 24.98 },  // "El Red Team es el equipo que ataca su propia empresa, con permiso, para encontrar el fallo antes que un criminal real."
  { file: '0_32.jpg', startSec: 32.22 },  // "Pienzan como un atacante todo el tiempo, es su trabajo."
  { file: '0_36.jpg', startSec: 36.6 },  // "Un lunes cualquiera prueban si pueden entrar en la red interna desde fuera."
  { file: '0_40.jpg', startSec: 40.74 },  // "Un martes prueban si un empleado hace clic en un correo falso."
  { file: '0_44.jpg', startSec: 44.68 },  // "Un miércoles prueban si pueden moverse de un ordenador a otro sin que nadie se de cuenta."
  { file: '0_50.jpg', startSec: 50.12 },  // "Su herramienta favorita no es un virus de película,"
  { file: '0_53.jpg', startSec: 53.12 },  // "es la paciencia."
  { file: '0_54.jpg', startSec: 54.76 },  // "Usan escáneres de vulnerabilidades, credenciales filtradas y mucho conocimiento del sistema operativo por dentro."
  { file: '1_01.jpg', startSec: 61.54 },  // "Si consiguen llegar hasta el controlador de dominio, han ganado esa ronda."
  { file: '1_05.jpg', startSec: 65.96 },  // "Pero su objetivo nunca es destruir nada,"
  { file: '1_08.jpg', startSec: 68.86 },  // "es escribir el informe que evita el desastre real."
  { file: '1_13.jpg', startSec: 73.1 },  // "Capítulo 2. ¿Quién es el Blue Team?"
  { file: '1_16.jpg', startSec: 76.14 },  // "El Blue Team es el equipo que defiende esa misma empresa todos los días, contra todo el mundo."
  { file: '1_22.jpg', startSec: 82.4 },  // "No sabe cuando llega el ataque,"
  { file: '1_24.jpg', startSec: 84.6 },  // "ni si es un simulacro del red team o un criminal de verdad."
  { file: '1_28.jpg', startSec: 88.56 },  // "Vigila el tráfico de la red las 24 horas,"
  { file: '1_31.jpg', startSec: 91.62 },  // "revisa alertas,"
  { file: '1_32.jpg', startSec: 92.88 },  // "miles de alertas al día, la mayoría falsas."
  { file: '1_36.jpg', startSec: 96.24 },  // "Su trabajo es encontrar la aguja real en un pajar de ruido."
  { file: '1_40.jpg', startSec: 100.3 },  // "Cuando ocurre algo raro, tienen minutos, no horas, para decidir si es un ataque real."
  { file: '1_46.jpg', startSec: 106.12 },  // "Usan sistemas de detección,"
  { file: '1_48.jpg', startSec: 108.0 },  // "registros de actividad y una regla de oro. Nunca confiar por defecto."
  { file: '1_53.jpg', startSec: 113.16 },  // "Si el red team consigue entrar sin que el Blue Team lo detecte, esa ronda la pierde en ellos."
  { file: '1_58.jpg', startSec: 118.46 },  // "Pero si lo detectan a tiempo, han hecho su trabajo perfectamente, aunque nadie fuera lo sepa nunca."
  { file: '2_04.jpg', startSec: 124.96 },  // "Capítulo 3."
  { file: '2_06.jpg', startSec: 126.42 },  // "La simulación que lo cambia todo."
  { file: '2_08.jpg', startSec: 128.96 },  // "Muchas empresas ya no separan los dos equipos del todo,"
  { file: '2_12.jpg', startSec: 132.32 },  // "crean un parpe el team,"
  { file: '2_13.jpg', startSec: 133.9 },  // "la mezcla de los dos, compartiendo lo que aprenden en cada simulacro."
  { file: '2_18.jpg', startSec: 138.06 },  // "El red team ataca, el Blue Team defiende y luego se sientan juntos a revisar qué pasó."
  { file: '2_24.jpg', startSec: 144.04 },  // "Eso, más que la victoria de un solo vando,"
  { file: '2_26.jpg', startSec: 146.56 },  // "es lo que de verdad protege la empresa."
  { file: '2_29.jpg', startSec: 149.34 },  // "Sin esa mezcla, el red team gana simulacros, pero la empresa sigue expuesta al ataque real."
  { file: '2_35.jpg', startSec: 155.56 },  // "Capítulo 4."
  { file: '2_36.jpg', startSec: 156.88 },  // "El día a día real."
  { file: '2_38.jpg', startSec: 158.66 },  // "Un red teamer pasa la mayor parte del tiempo investigando antes de atacar nada. Busca en redes sociales de empleados, en filtraciones antiguas, en la configuración pública de la empresa."
  { file: '2_49.jpg', startSec: 169.7 },  // "El ataque en sí puede durar minutos,"
  { file: '2_52.jpg', startSec: 172.12 },  // "la investigación previa semanas."
  { file: '2_54.jpg', startSec: 174.72 },  // "Un Blue Teamer pasa la mayor parte del tiempo mirando paneles,"
  { file: '2_58.jpg', startSec: 178.16 },  // "no persiguiendo hackers de película."
  { file: '3_00.jpg', startSec: 180.46 },  // "Configura alertas, ajustas reglas,"
  { file: '3_03.jpg', startSec: 183.08 },  // "reduce el ruido para que la señal real se vea."
  { file: '3_05.jpg', startSec: 185.98 },  // "El trabajo bonito de las series es apenas el 5 % de lo que hacen los dos equipos."
  { file: '3_11.jpg', startSec: 191.78 },  // "Capítulo 5."
  { file: '3_13.jpg', startSec: 193.32 },  // "El dinero."
  { file: '3_14.jpg', startSec: 194.6 },  // "¿Y quién cobra más?"
  { file: '3_16.jpg', startSec: 196.3 },  // "Aquí la respuesta sorprende a mucha gente."
  { file: '3_19.jpg', startSec: 199.02 },  // "Una analista de Blue Team Junior en España empieza cerca de 28 .000 euros al año."
  { file: '3_24.jpg', startSec: 204.42 },  // "Un red teamer junior cerca de 32 .000, un poco más por el perfil ofensivo."
  { file: '3_29.jpg', startSec: 209.76 },  // "Pero con experiencia,"
  { file: '3_31.jpg', startSec: 211.06 },  // "la brecha se cierra casi del todo."
  { file: '3_33.jpg', startSec: 213.32 },  // "Un responsable de seguridad defensiva senior puede superar los 80 .000 euros al año en empresas grandes. Y el red team con más demanda ahora mismo no es el que ataca sistemas."
  { file: '3_44.jpg', startSec: 224.32 },  // "Es el que simula ataques con inteligencia artificial contra la propia inteligencia artificial de la empresa."
  { file: '3_51.jpg', startSec: 231.26 },  // "Capítulo 6."
  { file: '3_52.jpg', startSec: 232.52 },  // "Entonces,"
  { file: '3_53.jpg', startSec: 233.44 },  // "¿Quién gana de verdad?"
  { file: '3_55.jpg', startSec: 235.26 },  // "En una simulación aislada casi siempre gana el red team."
  { file: '3_58.jpg', startSec: 238.96 },  // "Atacar es más fácil que defenderlo todo, todo el tiempo."
  { file: '4_02.jpg', startSec: 242.48 },  // "Pero en la vida real,"
  { file: '4_03.jpg', startSec: 243.96 },  // "la empresa entera es el verdadero equipo. Si red team y Blue Team no comparten lo que aprenden, los dos pierden tarde o temprano."
  { file: '4_12.jpg', startSec: 252.02 },  // "Las empresas con mejor seguridad del mundo no son las que tienen el mejor atacante."
  { file: '4_16.jpg', startSec: 256.84 },  // "Son las que consiguen que ataca y defensa hablen entre ellos cada semana."
  { file: '4_21.jpg', startSec: 261.7 },  // "Así que la pregunta real no es quién gana."
  { file: '4_24.jpg', startSec: 264.34 },  // "Es si tu empresa deja que los dos equipos se hablen."
  { file: '4_28.jpg', startSec: 268.12 },  // "Si te ha interesado este mundo, suscríbete. Se viene mucho más sobre ciberseguridad real, contada sin humo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'ominous_sting_1.mp3', startSec: 20.02, volume: 0.15 },
  { file: 'chapter_sting_red.mp3', startSec: 22.12, volume: 0.17 },
  { file: 'click_alert.mp3', startSec: 40.74, volume: 0.14 },
  { file: 'achievement_chime.mp3', startSec: 61.54, volume: 0.15 },
  { file: 'chapter_sting_blue.mp3', startSec: 73.1, volume: 0.17 },
  { file: 'alarm_blare.mp3', startSec: 100.3, volume: 0.17 },
  { file: 'danger_buzz.mp3', startSec: 113.16, volume: 0.16 },
  { file: 'chapter_sting_purple.mp3', startSec: 124.96, volume: 0.16 },
  { file: 'positive_chime.mp3', startSec: 138.06, volume: 0.14 },
  { file: 'chapter_sting_neutral.mp3', startSec: 155.56, volume: 0.16 },
  { file: 'time_whoosh.mp3', startSec: 169.7, volume: 0.12 },
  { file: 'chapter_sting_money.mp3', startSec: 191.78, volume: 0.16 },
  { file: 'cash_register_1.mp3', startSec: 199.02, volume: 0.15 },
  { file: 'cash_register_2.mp3', startSec: 213.32, volume: 0.16 },
  { file: 'chapter_sting_final.mp3', startSec: 231.26, volume: 0.17 },
  { file: 'tense_sting_final.mp3', startSec: 238.96, volume: 0.15 },
  { file: 'calm_resolve_chime.mp3', startSec: 256.84, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 264.34, volume: 0.17 },
];

export const RedTeamVsBlueTeam: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('red-team-vs-blue-team.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`red-team-vs-blue-team-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`red-team-vs-blue-team/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
