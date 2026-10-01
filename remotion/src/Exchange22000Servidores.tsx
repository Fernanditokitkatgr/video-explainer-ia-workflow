import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// 22.000 servidores de correo en peligro - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Ahora mismo, mientras escuchas esto, hay casi 22 .000 servidores de correo en el mundo con la puerta de entrada a abierta de par en par."
  { file: '0_07.jpg', startSec: 7.74 },  // "No hace falta robar ninguna contraseña,"
  { file: '0_10.jpg', startSec: 10.02 },  // "no hace falta engañar a nadie,"
  { file: '0_11.jpg', startSec: 11.82 },  // "sólo hace falta saber que esa puerta existe."
  { file: '0_14.jpg', startSec: 14.88 },  // "Y lo más inquietante es que el código para abrirla ya es público,"
  { file: '0_18.jpg', startSec: 18.26 },  // "cualquiera puede usarlo."
  { file: '0_19.jpg', startSec: 19.9 },  // "Esto es real,"
  { file: '0_21.jpg', startSec: 21.14 },  // "está pasando en septiembre de 2016 y probablemente afecta empresas que usas o con las que trabajas."
  { file: '0_27.jpg', startSec: 27.7 },  // "El problema tiene nombre y apellido técnico, se llama CBW -2026 -62 -9 -11."
  { file: '0_34.jpg', startSec: 34.36 },  // "Es una vulnerabilidad en Microsoft Exchange Server,"
  { file: '0_37.jpg', startSec: 37.52 },  // "el programa que usan miles de empresas en todo el mundo para gestionar su correo interno."
  { file: '0_42.jpg', startSec: 42.54 },  // "Microsoft la reconoció oficialmente a mediados de agosto de 2016 y sacó un parche ese mismo mes para solucionarla."
  { file: '0_50.jpg', startSec: 50.1 },  // "El problema no es que no exista solución,"
  { file: '0_52.jpg', startSec: 52.56 },  // "el problema es que miles de empresas todavía no la han instalado."
  { file: '0_56.jpg', startSec: 56.46 },  // "Y cada día que pasa sin ese parche,"
  { file: '0_58.jpg', startSec: 58.74 },  // "esa empresa sigue con la puerta abierta."
  { file: '1_01.jpg', startSec: 61.6 },  // "Para entender el fallo, hace falta entender un concepto muy simple,"
  { file: '1_05.jpg', startSec: 65.42 },  // "el de capturar y repetir."
  { file: '1_07.jpg', startSec: 67.78 },  // "Cuando te conectas a tu correo, tu ordenador y el servidor se intercambian una especie de sello que demuestra quién eres."
  { file: '1_14.jpg', startSec: 74.1 },  // "Este fallo permite a un atacante capturar ese sello mientras viaja por la red y reutilizarlo después para hacerse pasar por ti."
  { file: '1_21.jpg', startSec: 81.5 },  // "No necesita adivinar tu contraseña ni robártela,"
  { file: '1_24.jpg', startSec: 84.88 },  // "sólo necesita interceptar ese sello una vez."
  { file: '1_27.jpg', startSec: 87.9 },  // "Y con eso, puede entrar en el sistema con los mismos permisos que tú,"
  { file: '1_31.jpg', startSec: 91.74 },  // "sin que tú hagas nada mal."
  { file: '1_34.jpg', startSec: 94.18 },  // "Lo que se puede hacer una vez dentro es lo verdaderamente grave."
  { file: '1_37.jpg', startSec: 97.62 },  // "Una atacante que explota este fallo puede tomar control de los buzones de correo de toda la empresa. Leer correos internos, enviar mensajes haciendo se pasar por cualquier empleado y descargar archivos adjuntos con información sensible."
  { file: '1_51.jpg', startSec: 111.08 },  // "Y según los investigadores que lo analizaron, el fallo se puede encadenar hasta conseguir el control total del servidor,"
  { file: '1_57.jpg', startSec: 117.5 },  // "con los permisos más altos posibles."
  { file: '2_00.jpg', startSec: 120.14 },  // "Todo eso, sin necesitar ni una sola credencia al válida de partida."
  { file: '2_05.jpg', startSec: 125.0 },  // "Según los últimos escaneos públicos de la Organización Sado Server,"
  { file: '2_08.jpg', startSec: 128.7 },  // "a finales de agosto había casi 22 .000 servidores expuestos en todo el mundo."
  { file: '2_13.jpg', startSec: 133.5 },  // "Estados Unidos encabeza la lista,"
  { file: '2_15.jpg', startSec: 135.78 },  // "con más de 6 .000 servidores vulnerables."
  { file: '2_18.jpg', startSec: 138.32 },  // "Alemania le sigue de cerca, con más de 5 .000."
  { file: '2_21.jpg', startSec: 141.66 },  // "Estos no son números de un informe cualquiera,"
  { file: '2_24.jpg', startSec: 144.22 },  // "son escaneos reales de internet, hechos día a día."
  { file: '2_27.jpg', startSec: 147.82 },  // "Y lo más preocupante es que el exploit, el programa que aprovecha este fallo, ya está circulando públicamente."
  { file: '2_34.jpg', startSec: 154.76 },  // "Eso significa que no hace falta ser un atacante sofisticado para usarlo,"
  { file: '2_38.jpg', startSec: 158.86 },  // "sólo hace falta saber que el fallo existe."
  { file: '2_42.jpg', startSec: 162.08 },  // "Aquí viene la parte que de verdad importa,"
  { file: '2_44.jpg', startSec: 164.68 },  // "que puedes hacer tus y gestionas o trabajas cerca de un servidor exchange."
  { file: '2_49.jpg', startSec: 169.28 },  // "Primero, y más importante,"
  { file: '2_51.jpg', startSec: 171.24 },  // "instala el parche de seguridad de agosto de 2026 si todavía no lo has hecho."
  { file: '2_56.jpg', startSec: 176.36 },  // "Microsoft ya publicó la solución,"
  { file: '2_58.jpg', startSec: 178.68 },  // "el problema en la mayoría de los casos no es la falta de parche,"
  { file: '3_02.jpg', startSec: 182.34 },  // "es la falta de tiempo para aplicarlo."
  { file: '3_04.jpg', startSec: 184.88 },  // "Segundo,"
  { file: '3_05.jpg', startSec: 185.9 },  // "si administras un servidor exchange,"
  { file: '3_08.jpg', startSec: 188.16 },  // "revisa los registros de acceso en busca de patrones de autenticación repetidos o extraños."
  { file: '3_13.jpg', startSec: 193.5 },  // "Tercero, y esto vale para cualquier sistema crítico,"
  { file: '3_16.jpg', startSec: 196.8 },  // "nunca asumas que porque algo lleva años funcionando,"
  { file: '3_19.jpg', startSec: 199.74 },  // "sigue siendo seguro hoy."
  { file: '3_21.jpg', startSec: 201.68 },  // "Las vulnerabilidades no avisan antes de aparecer,"
  { file: '3_24.jpg', startSec: 204.5 },  // "y los parches no se instalan solos."
  { file: '3_27.jpg', startSec: 207.56 },  // "Lo interesante de este caso no es solo la vulnerabilidad en sí,"
  { file: '3_31.jpg', startSec: 211.16 },  // "cada mes aparece en decenas como esta. Es la brecha de tiempo entre que existe una solución y que esa solución se aplica de verdad."
  { file: '3_39.jpg', startSec: 219.12 },  // "Un parche publicado no protege a nadie hasta que se instala,"
  { file: '3_42.jpg', startSec: 222.52 },  // "y ese hueco entre el aviso y la acción es donde viven la mayoría de los ataques reales."
  { file: '3_48.jpg', startSec: 228.3 },  // "22 .000 servidores no cayeron por falta de aviso,"
  { file: '3_51.jpg', startSec: 231.64 },  // "cayeron por falta de tiempo, de personal o simplemente de prioridad."
  { file: '3_56.jpg', startSec: 236.42 },  // "Y ese es un problema mucho más humano que técnico."
  { file: '3_59.jpg', startSec: 239.66 },  // "Así que si trabajas cerca de sistemas de correo empresarial o simplemente conoces a alguien que lo hace,"
  { file: '4_05.jpg', startSec: 245.44 },  // "este es el tipo de aviso que vale la pena compartir hoy mismo, no la semana que viene."
  { file: '4_10.jpg', startSec: 250.74 },  // "Porque el exploit ya está ahí fuera,"
  { file: '4_13.jpg', startSec: 253.22 },  // "y la única diferencia entre estar protegido y no estarlo es haber aplicado el parche a tiempo."
  { file: '4_19.jpg', startSec: 259.16 },  // "Si esto te ha parecido útil, suscríbete,"
  { file: '4_21.jpg', startSec: 261.82 },  // "se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'digital_glitch.mp3', startSec: 61.6, volume: 0.14 },
  { file: 'reveal_dark.mp3', startSec: 124.78, volume: 0.15 },
  { file: 'question_sting.mp3', startSec: 169.9, volume: 0.15 },
  { file: 'serious_turn.mp3', startSec: 245.46, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 259.16, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const Exchange22000Servidores: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('exchange-22000-servidores.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`exchange-22000-servidores-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`exchange-22000-servidores-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`exchange-22000-servidores/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
