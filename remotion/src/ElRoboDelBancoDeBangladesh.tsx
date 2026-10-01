import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// El robo del Banco de Bangladesh - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // En febrero de 2016, alguien intentó robar 951
  { file: '0_06.jpg', startSec: 6.58 },  // Casi lo consigue,
  { file: '0_08.jpg', startSec: 8.02 },  // se quedó a 81 millones.
  { file: '0_10.jpg', startSec: 10.2 },  // Y la diferencia entre esas dos cifras la marc
  { file: '0_15.jpg', startSec: 15.4 },  // Hoy vamos a seguir el rastro completo de ese 
  { file: '0_18.jpg', startSec: 18.48 },  // parada por parada,
  { file: '0_19.jpg', startSec: 19.66 },  // desde un banco en DACA hasta un casino en Man
  { file: '0_23.jpg', startSec: 23.2 },  // Y al final vas a entender por qué el error má
  { file: '0_28.jpg', startSec: 28.76 },  // literalmente, un error de ortografía.
  { file: '0_32.jpg', startSec: 32.2 },  // Primera parada, el Banco Central de Banglades
  { file: '0_35.jpg', startSec: 35.26 },  // Este banco guarda parte de las reservas del p
  { file: '0_40.jpg', startSec: 40.76 },  // Para mover ese dinero entre bancos usa un sis
  { file: '0_44.jpg', startSec: 44.84 },  // la red de mensajes que conecta a casi todos l
  { file: '0_48.jpg', startSec: 48.84 },  // Meses antes de la traco,
  { file: '0_50.jpg', startSec: 50.52 },  // alguien ya estaba dentro de la red interna de
  { file: '0_54.jpg', startSec: 54.74 },  // Entraron con un malware diseñado para una cos
  { file: '0_58.jpg', startSec: 58.6 },  // controlar el sistema Swift del banco desde de
  { file: '1_01.jpg', startSec: 61.94 },  // El equipo de seguridad del banco era pequeño 
  { file: '1_08.jpg', startSec: 68.24 },  // ni siquiera tenían un firewall dedicado.
  { file: '1_11.jpg', startSec: 71.0 },  // Puertas de ese tamaño no hacen falta forzarla
  { file: '1_13.jpg', startSec: 73.92 },  // sólo hay que encontrar la que nadie cerró.
  { file: '1_17.jpg', startSec: 77.28 },  // Siguiente parada, la noche del ataque. Un vie
  { file: '1_22.jpg', startSec: 82.1 },  // que además coincide con fin de semana allí.
  { file: '1_24.jpg', startSec: 84.58 },  // Los atacantes enviaron 35 mensajes Swift frau
  { file: '1_28.jpg', startSec: 88.82 },  // pidiendo transferir en total 951 millones de 
  { file: '1_36.jpg', startSec: 96.3 },  // Los mensajes parecían legítimos porque técnic
  { file: '1_40.jpg', startSec: 100.1 },  // estaban firmados con las credenciales reales 
  { file: '1_48.jpg', startSec: 108.36 },  // desactivó la impresora que normalmente saca u
  { file: '1_53.jpg', startSec: 113.62 },  // Sin esa copia en papel,
  { file: '1_55.jpg', startSec: 115.3 },  // nadie en la oficina de Bangladesh iba a notar
  { file: '2_00.jpg', startSec: 120.36 },  // Siguiente parada, Nueva York.
  { file: '2_03.jpg', startSec: 123.0 },  // La reserva federal recibió las 35 órdenes y e
  { file: '2_12.jpg', startSec: 132.04 },  // se completaron y el dinero salió hacia cuenta
  { file: '2_15.jpg', startSec: 135.78 },  // El resto, casi 87 millones más,
  { file: '2_18.jpg', startSec: 138.84 },  // que dobloqueado por un motivo que nadie plane
  { file: '2_21.jpg', startSec: 141.6 },  // la lista de sanciones internacionales.
  { file: '2_24.jpg', startSec: 144.7 },  // Una de las transferencias iba destinada a una
  { file: '2_33.jpg', startSec: 153.08 },  // Y aquí llega la parte que de verdad cambió la
  { file: '2_36.jpg', startSec: 156.2 },  // Una transferencia de 20 millones de dólares i
  { file: '2_43.jpg', startSec: 163.6 },  // Los atacantes, al escribir el mensaje a toda 
  { file: '2_48.jpg', startSec: 168.48 },  // pusieron Shalika Foundation con una letra cam
  { file: '2_52.jpg', startSec: 172.24 },  // Un empleado del banco intermediario en esa tr
  { file: '2_56.jpg', startSec: 176.88 },  // vio una palabra mal escrita y, por simple pro
  { file: '3_02.jpg', startSec: 182.8 },  // Esa pregunta de rutina destapó todo,
  { file: '3_05.jpg', startSec: 185.98 },  // y esa única transferencia de 20 millones se c
  { file: '3_12.jpg', startSec: 192.14 },  // Una palabra.
  { file: '3_13.jpg', startSec: 193.4 },  // Una sola palabra mal escrita frenó lo que hab
  { file: '3_21.jpg', startSec: 201.2 },  // Siguiente parada, Filipinas.
  { file: '3_23.jpg', startSec: 203.74 },  // Los 81 millones que sí llegaron a salir, ater
  { file: '3_29.jpg', startSec: 209.46 },  // abiertas meses antes con nombres falsos.
  { file: '3_32.jpg', startSec: 212.22 },  // En cuestión de días,
  { file: '3_33.jpg', startSec: 213.5 },  // ese dinero se movió a casinos y agencias de c
  { file: '3_37.jpg', startSec: 217.34 },  // Los casinos en Filipinas en aquel momento no 
  { file: '3_46.jpg', startSec: 226.44 },  // Es exactamente el tipo de hueco legal que hac
  { file: '3_50.jpg', startSec: 230.36 },  // una vez dentro de un casino,
  { file: '3_52.jpg', startSec: 232.14 },  // sea casi imposible de rastrear después.
  { file: '3_55.jpg', startSec: 235.16 },  // De los 81 millones,
  { file: '3_57.jpg', startSec: 237.38 },  // solo se ha recuperado una fracción pequeña en
  { file: '4_01.jpg', startSec: 241.1 },  // La mayor parte, sencillamente,
  { file: '4_03.jpg', startSec: 243.32 },  // desapareció.
  { file: '4_05.jpg', startSec: 245.12 },  // Investigadores de Estados Unidos, incluido el
  { file: '4_08.jpg', startSec: 248.46 },  // atribuyeron el ataque a un grupo vinculado a 
  { file: '4_13.jpg', startSec: 253.54 },  // El mismo tipo de grupo detrás de otros ataque
  { file: '4_20.jpg', startSec: 260.14 },  // Nunca hubo una condena formal contra individu
  { file: '4_28.jpg', startSec: 268.54 },  // Pero lo que sí está fuera de toda duda es la 
  { file: '4_33.jpg', startSec: 273.22 },  // documentada por investigaciones bancarias y j
  { file: '4_38.jpg', startSec: 278.0 },  // Así que volvamos a la pregunta del principio.
  { file: '4_41.jpg', startSec: 281.0 },  // ¿Por qué una franca de ortografías salvo 870 
  { file: '4_46.jpg', startSec: 286.12 },  // Porque en un sistema diseñado para mover dine
  { file: '4_53.jpg', startSec: 293.7 },  // La única barrera humana real que quedaba era 
  { file: '5_00.jpg', startSec: 300.1 },  // Si esa persona no hubiera parado a comprobar 
  { file: '5_03.jpg', startSec: 303.92 },  // hoy estaríamos hablando de un robo de mil mil
  { file: '5_07.jpg', startSec: 307.52 },  // no de 81.
  { file: '5_09.jpg', startSec: 309.28 },  // La lección no es solo para bancos centrales.
  { file: '5_12.jpg', startSec: 312.22 },  // Cualquier sistema automatizado necesita, en a
  { file: '5_15.jpg', startSec: 315.7 },  // a alguien que se parea comprobar que algo no 
  { file: '5_19.jpg', startSec: 319.48 },  // Si esto te ha sorprendido suscríbete,
  { file: '5_21.jpg', startSec: 321.84 },  // se viene más de este mundo.
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'stop_ding1.mp3', startSec: 32.2, volume: 0.15 },
  { file: 'menacing_low.mp3', startSec: 77.28, volume: 0.15 },
  { file: 'stop_ding2.mp3', startSec: 120.36, volume: 0.15 },
  { file: 'reveal_dark.mp3', startSec: 153.08, volume: 0.16 },
  { file: 'stop_ding3.mp3', startSec: 201.2, volume: 0.15 },
  { file: 'serious_turn.mp3', startSec: 245.12, volume: 0.14 },
  { file: 'question_sting.mp3', startSec: 278.0, volume: 0.15 },
  { file: 'impact_thud.mp3', startSec: 309.28, volume: 0.16 },
  { file: 'subscribe_chime.mp3', startSec: 319.48, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ElRoboDelBancoDeBangladesh: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('el-robo-del-banco-de-bangladesh.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`el-robo-del-banco-de-bangladesh-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`el-robo-del-banco-de-bangladesh-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`el-robo-del-banco-de-bangladesh/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
