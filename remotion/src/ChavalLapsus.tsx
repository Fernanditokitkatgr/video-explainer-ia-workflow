import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// El chaval de Lapsus$ - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "En 2022,"
  { file: '0_01.jpg', startSec: 1.36 },  // "un chaval de 17 años desde la habitación de un hotel en Inglaterra,"
  { file: '0_05.jpg', startSec: 5.04 },  // "Hakeo Auber ha envidia y filtró el próximo gran Teft Auto antes de que nadie lo hubiera visto."
  { file: '0_11.jpg', startSec: 11.64 },  // "No tenía un equipo de hackers profesionales detrás,"
  { file: '0_14.jpg', startSec: 14.64 },  // "no tenía financiación de ningún gobierno."
  { file: '0_17.jpg', startSec: 17.24 },  // "Tenía un portátil, una conexión a Internet y un grupo de adolescentes con el mismo objetivo que se hacían llamar Lapsus."
  { file: '0_25.jpg', startSec: 25.0 },  // "Esta es la historia de cómo un grupo sin estructura, sin dinero y sin experiencia profesional,"
  { file: '0_30.jpg', startSec: 30.42 },  // "humilló algunas de las empresas de tecnología más grandes del mundo."
  { file: '0_35.jpg', startSec: 35.18 },  // "Lapsus apareció de la nada a finales de 2021."
  { file: '0_38.jpg', startSec: 38.66 },  // "No era un grupo de cibercrime enorganizado al estilo tradicional con jerarquía y reparto de beneficios."
  { file: '0_44.jpg', startSec: 44.06 },  // "Era más parecido a un chat de adolescentes obsesionados con Hakear,"
  { file: '0_47.jpg', startSec: 47.76 },  // "compitiendo entre ellos por ver quién conseguía el objetivo más grande."
  { file: '0_51.jpg', startSec: 51.76 },  // "Y uno de los nombres que más se repetía dentro de ese grupo,"
  { file: '0_55.jpg', startSec: 55.46 },  // "era el de un usuario conocido como White."
  { file: '0_59.jpg', startSec: 59.0 },  // "Mises despuéses habría que detrás de ese nombre había un chaval de 17 años llamado Arian Courthag."
  { file: '1_05.jpg', startSec: 65.8 },  // "La táctica de Lapsus no dependía de malgoer sofisticado ni de vulnerabilidades secretas de día cero."
  { file: '1_11.jpg', startSec: 71.76 },  // "Dependía de algo mucho más simple y por eso mismo mucho más difícil de bloquear del todo,"
  { file: '1_17.jpg', startSec: 77.0 },  // "la ingeniería social."
  { file: '1_19.jpg', startSec: 79.06 },  // "Compraban credenciales robadas en foros,"
  { file: '1_21.jpg', startSec: 81.72 },  // "sobornábanos convencían a empleados internos y saturaban a base de intentos hasta que alguien picaba."
  { file: '1_27.jpg', startSec: 87.88 },  // "Uno de sus trucos favoritos era el llamado MFA Fatigue,"
  { file: '1_31.jpg', startSec: 91.9 },  // "bombardear a un empleado con notificaciones de verificación en dos pasos hasta que agotado pulsaba aceptarse en pensar."
  { file: '1_39.jpg', startSec: 99.84 },  // "La puerta de entrada no era un agujero técnico,"
  { file: '1_42.jpg', startSec: 102.6 },  // "era el cansancio de una persona real a las tres de la madrugada."
  { file: '1_46.jpg', startSec: 106.78 },  // "En febrero de 2022 le tocó el turno Nvidia,"
  { file: '1_50.jpg', startSec: 110.64 },  // "uno de los fabricantes de chips más importantes del planeta."
  { file: '1_54.jpg', startSec: 114.54 },  // "Lapsus rogó código fuente interno y credenciales de empleados y amenazó con publicarlo todo si Nvidia no cumplía sus exigencias."
  { file: '2_02.jpg', startSec: 122.3 },  // "Entre esas exigencias había una particularmente extraña para un ataque de este tipo,"
  { file: '2_07.jpg', startSec: 127.08 },  // "pedían que Nvidia quitar a los límites dominado de criptomonedas de sus tarjetas gráficas."
  { file: '2_12.jpg', startSec: 132.5 },  // "Nvidia se negó a pagar,"
  { file: '2_14.jpg', startSec: 134.38 },  // "parte del código acabó filtrado igualmente."
  { file: '2_17.jpg', startSec: 137.34 },  // "Ese mismo mes, el objetivo fue Uber."
  { file: '2_20.jpg', startSec: 140.6 },  // "Un empleado de Uber recibió una lubión de solicitudes de doble factor de autenticación,"
  { file: '2_25.jpg', startSec: 145.32 },  // "una detrás de otra, sin parar."
  { file: '2_27.jpg', startSec: 147.78 },  // "Agotado terminó aceptando una de ellas,"
  { file: '2_30.jpg', startSec: 150.68 },  // "con eso bastó para que el atacante entrara en la red interna de la empresa. Una vez dentro, accedió a sistemas internos, incluido el panel de Hacker One, la plataforma donde Uber gestiona los reportes de sus propios fallos de seguridad."
  { file: '2_44.jpg', startSec: 164.08 },  // "El atacante, presentamente el mismo chaval de 17 años,"
  { file: '2_48.jpg', startSec: 168.04 },  // "publicó capturas de pantalla del interior de los sistemas de Uber directamente en canales públicos de Slack de la empresa."
  { file: '2_55.jpg', startSec: 175.34 },  // "Pero el golpe que más titulares generó fue otro muy distinto."
  { file: '2_59.jpg', startSec: 179.48 },  // "Curtaj, desde una habitación de hotel en Oxfordshire, donde la policía lo había puesto bajo vigilancia tras una detención previa, volvió a conectarse Internet."
  { file: '3_08.jpg', startSec: 188.96 },  // "Considió acceso a los sistemas internos de Rockstar Games y filtro más de 90 vídeos de una versión temprana, sin terminar,"
  { file: '3_16.jpg', startSec: 196.38 },  // "de Grand Theft Auto 6."
  { file: '3_18.jpg', startSec: 198.48 },  // "Uno de los lanzamientos más esperados de la historia de los videojuegos,"
  { file: '3_22.jpg', startSec: 202.1 },  // "filtrado meses antes de cualquier anuncio oficial por un adolescente bajo supervisión policial."
  { file: '3_28.jpg', startSec: 208.3 },  // "Exigió un rescate de 4 millones de dólares."
  { file: '3_31.jpg', startSec: 211.16 },  // "Rockstar tampoco pagó."
  { file: '3_33.jpg', startSec: 213.19 },  // "Al final la policía británica identificó y de tubo a varios miembros del grupo,"
  { file: '3_37.jpg', startSec: 217.32 },  // "incluidos Curtaj y otro adolescente de 17 años."
  { file: '3_41.jpg', startSec: 221.28 },  // "En el juicio en 2023,"
  { file: '3_43.jpg', startSec: 223.26 },  // "un jurado los declaró responsables de varios de estos ataques."
  { file: '3_47.jpg', startSec: 227.42 },  // "Pero el caso de Curtaj tuvo un giro que pocos esperaban,"
  { file: '3_50.jpg', startSec: 230.58 },  // "fue diagnosticado con autismo severo y considerado no apto para ser juzgado de forma convencional."
  { file: '3_56.jpg', startSec: 236.4 },  // "En lugar de una condena de prisión tradicional, un tribunal ordenó su ingreso indefinido en un hospital psiquiátrico de seguridad."
  { file: '4_03.jpg', startSec: 243.54 },  // "Seguirá allí hasta que los médicos certificuen que ya no representa un riesgo sin fecha de salida fijada."
  { file: '4_10.jpg', startSec: 250.28 },  // "Lo más inquietante de todo este caso,"
  { file: '4_12.jpg', startSec: 252.5 },  // "no es la sofisticación técnica porque apenas la hubo."
  { file: '4_15.jpg', startSec: 255.82 },  // "Es justo lo contrario,"
  { file: '4_17.jpg', startSec: 257.42 },  // "lo poco que hacía falta para tumbar agigantes como Nvidia,"
  { file: '4_20.jpg', startSec: 260.7 },  // "Uber y Rockstar Games."
  { file: '4_22.jpg', startSec: 262.96 },  // "Ni exploit secretos, ni herramientas de un estado,"
  { file: '4_26.jpg', startSec: 266.38 },  // "solo constancia,"
  { file: '4_27.jpg', startSec: 267.66 },  // "paciencia y la certeza de que tarde temprano alguien agotado iba a cometer un error."
  { file: '4_33.jpg', startSec: 273.92 },  // "Las empresas más grandes del mundo no cayeron ante una super arma digital,"
  { file: '4_38.jpg', startSec: 278.4 },  // "cayeron ante una del estente con Wi -Fi y mucho tiempo libre."
  { file: '4_42.jpg', startSec: 282.92 },  // "Y esa es probablemente la lección más incómoda de toda esta historia."
  { file: '4_47.jpg', startSec: 287.74 },  // "Así que la próxima vez que pienses que la ciberseguridad de una gran empresa es inquebrantable,"
  { file: '4_53.jpg', startSec: 293.36 },  // "recuerda que a veces todo lo que hace falta para entrar es cansar a la persona correcta en el momento correcto."
  { file: '5_00.jpg', startSec: 300.62 },  // "Si esta historia te ha dejado con la boca abierta,"
  { file: '5_03.jpg', startSec: 303.42 },  // "suscríbete,"
  { file: '5_04.jpg', startSec: 304.34 },  // "se viene más de este mundo."
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_dark.mp3', startSec: 35.18, volume: 0.15 },
  { file: 'tense_creep.mp3', startSec: 87.88, volume: 0.15 },
  { file: 'digital_glitch.mp3', startSec: 106.78, volume: 0.14 },
  { file: 'impact_thud.mp3', startSec: 196.38, volume: 0.17 },
  { file: 'serious_turn.mp3', startSec: 230.58, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 303.42, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ChavalLapsus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('chaval-lapsus.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`chaval-lapsus-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`chaval-lapsus-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`chaval-lapsus/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
