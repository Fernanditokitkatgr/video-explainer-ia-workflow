import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Cómo hackean una web de verdad — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Esta es Sara,
  { file: '0_01.jpg', startSec: 1.16 },  // acaba de lanzar la web de su pequeño negocio de comida a Dom
  { file: '0_04.jpg', startSec: 4.82 },  // Un meno,
  { file: '0_05.jpg', startSec: 5.86 },  // un botón de pedir,
  { file: '0_07.jpg', startSec: 7.14 },  // y detrás, un panel de administración para gestionar los plat
  { file: '0_10.jpg', startSec: 10.84 },  // Sara piensa que ese panel no lo va a encontrar nadie,
  { file: '0_13.jpg', startSec: 13.94 },  // porque no hay ningún enlace que lleve a él.
  { file: '0_16.jpg', startSec: 16.32 },  // Y ahí es donde se equivoca,
  { file: '0_18.jpg', startSec: 18.48 },  // porque al otro lado está alguien que no la conoce de nada,
  { file: '0_21.jpg', startSec: 21.58 },  // pero que sabe una cosa.
  { file: '0_23.jpg', startSec: 23.14 },  // Toda web nueva deja puertas abiertas sin querer.
  { file: '0_26.jpg', startSec: 26.52 },  // Hoy vas a ver paso a paso como entra un atacante en una huev
  { file: '0_31.jpg', startSec: 31.02 },  // y al final vas a saber exactamente qué falló,
  { file: '0_33.jpg', startSec: 33.78 },  // y cómo no ser tú la próxima Sara.
  { file: '0_36.jpg', startSec: 36.68 },  // Lo primero que tienes que entender es que jaquear no esté cr
  { file: '0_42.jpg', startSec: 42.7 },  // Eso es tiene,
  { file: '0_43.jpg', startSec: 43.84 },  // la realidad es mucho más aburrida y mucho más peligrosa,
  { file: '0_47.jpg', startSec: 47.58 },  // es paciencia, es método,
  { file: '0_49.jpg', startSec: 49.7 },  // es buscar con calma la puerta que alguien olvidó cerrar.
  { file: '0_53.jpg', startSec: 53.62 },  // El atacante abre la web de Sara,
  { file: '0_55.jpg', startSec: 55.84 },  // y lo primero solo mira.
  { file: '0_57.jpg', startSec: 57.62 },  // Se llama reconocimiento,
  { file: '0_59.jpg', startSec: 59.1 },  // y es la parte más larga de cualquier ataque.
  { file: '1_01.jpg', startSec: 61.62 },  // Por fuera solo hay dos páginas, el menú y el botón de pedir.
  { file: '1_05.jpg', startSec: 65.38 },  // Ningún enlace al panel de administración,
  { file: '1_08.jpg', startSec: 68.04 },  // nada sospechoso a simple vista.
  { file: '1_10.jpg', startSec: 70.48 },  // Alguien pensaría que ahí no hay nada que hacer,
  { file: '1_13.jpg', startSec: 73.38 },  // pero las puertas de una web casi nunca se anuncian,
  { file: '1_16.jpg', startSec: 76.4 },  // simplemente están ahí escondidas,
  { file: '1_18.jpg', startSec: 78.54 },  // esperando.
  { file: '1_19.jpg', startSec: 79.54 },  // Y él sabe cómo buscarlas sin que nadie es enteré.
  { file: '1_23.jpg', startSec: 83.4 },  // Primero paso, encontrar la dirección real de la web.
  { file: '1_26.jpg', startSec: 86.92 },  // Tú escribes un nombre como comida Sara, punto com,
  { file: '1_30.jpg', startSec: 90.2 },  // pero por debajo cada web es en realidad un número, su direcc
  { file: '1_34.jpg', startSec: 94.24 },  // Para averiguarlo existe un truco viejo y sencillo, una consu
  { file: '1_39.jpg', startSec: 99.96 },  // oye, qué número hay detrás de este nombre.
  { file: '1_42.jpg', startSec: 102.64 },  // En segundo, se la atacante tiene la dirección exacta del ser
  { file: '1_47.jpg', startSec: 107.22 },  // Saber eso es como saber en qué casa vive alguien.
  { file: '1_50.jpg', startSec: 110.44 },  // Ahora quiere ver qué puertas y ventanas tiene esa casa y cuá
  { file: '1_55.jpg', startSec: 115.48 },  // Segundo paso,
  { file: '1_56.jpg', startSec: 116.56 },  // mirar qué está abierto.
  { file: '1_58.jpg', startSec: 118.46 },  // Pienso otra vez en la casa,
  { file: '2_00.jpg', startSec: 120.02 },  // ya sabe dónde está.
  { file: '2_01.jpg', startSec: 121.48 },  // Ahora rodea el edificio y prueba cada puerta y cada ventana 
  { file: '2_06.jpg', startSec: 126.4 },  // En una web esas puertas se llaman puertos y para revisarlos 
  { file: '2_14.jpg', startSec: 134.32 },  // En map recorre el servidor y comproba uno a uno, que puertos
  { file: '2_22.jpg', startSec: 142.94 },  // El resultado le confirma lo que buscaba.
  { file: '2_25.jpg', startSec: 145.32 },  // Hay un puerto abierto sirviendo la página web con un program
  { file: '2_30.jpg', startSec: 150.72 },  // Pero él no quiere lo que se ve,
  { file: '2_32.jpg', startSec: 152.54 },  // eso lo ve cualquiera,
  { file: '2_34.jpg', startSec: 154.18 },  // quiere lo que está escondido debajo.
  { file: '2_36.jpg', startSec: 156.76 },  // Quiere las carpetas y los archivos que existen en el servido
  { file: '2_43.jpg', startSec: 163.46 },  // Y para eso hay una técnica que casi nadie fuera del sector c
  { file: '2_47.jpg', startSec: 167.56 },  // Y aquí llega la parte clave.
  { file: '2_49.jpg', startSec: 169.76 },  // Usa otra herramienta govester que hace una cosa muy simple p
  { file: '2_55.jpg', startSec: 175.52 },  // Coge una lista enorme de nombres típicos de carpetas y archi
  { file: '2_59.jpg', startSec: 179.26 },  // admin,
  { file: '2_59_b.jpg', startSec: 179.96 },  // acceso,
  { file: '3_00.jpg', startSec: 180.74 },  // login,
  { file: '3_01.jpg', startSec: 181.48 },  // copia de seguridad,
  { file: '3_02.jpg', startSec: 182.58 },  // configuración,
  { file: '3_03.jpg', startSec: 183.78 },  // y los prueba a todos uno detrás de otro a toda velocidad con
  { file: '3_09.jpg', startSec: 189.1 },  // Por cada nombre pregunta,
  { file: '3_10.jpg', startSec: 190.84 },  // ¿existe esta página?
  { file: '3_12.jpg', startSec: 192.64 },  // El servidor responde sin querer.
  { file: '3_14.jpg', startSec: 194.56 },  // Está no, está tampoco,
  { file: '3_16.jpg', startSec: 196.3 },  // está sí.
  { file: '3_17.jpg', startSec: 197.62 },  // Piensa en lo que significa,
  { file: '3_19.jpg', startSec: 199.22 },  // no hace falta divisan,
  { file: '3_20.jpg', startSec: 200.78 },  // simplemente lo prueba todo.
  { file: '3_23.jpg', startSec: 203.16 },  // Durante unos minutos no pasa nada.
  { file: '3_25.jpg', startSec: 205.52 },  // La mayoría de nombres no existen.
  { file: '3_27.jpg', startSec: 207.64 },  // El servidor responde que no, una y otra vez.
  { file: '3_31.jpg', startSec: 211.02 },  // Y de repente,
  { file: '3_32.jpg', startSec: 212.26 },  // entre miles de intentos, uno responde distinto. Una página q
  { file: '3_40.jpg', startSec: 220.86 },  // El panel de administración desara,
  { file: '3_43.jpg', startSec: 223.38 },  // el que ella creía invisible.
  { file: '3_45.jpg', startSec: 225.74 },  // No ha hecho falta ser un genio,
  { file: '3_47.jpg', startSec: 227.56 },  // ha hecho falta una lista y un poco de paciencia. El atacante
  { file: '3_54.jpg', startSec: 234.46 },  // Y ahí está,
  { file: '3_55.jpg', startSec: 235.96 },  // una pantalla de acceso pidiendo usuario y contraseña.
  { file: '3_59.jpg', startSec: 239.64 },  // Ahora sólo le falta una cosa.
  { file: '4_02.jpg', startSec: 242.26 },  // Entrar.
  { file: '4_03.jpg', startSec: 243.44 },  // Pero no lo va a hacer probando a mano. Usa una tercera herra
  { file: '4_10.jpg', startSec: 250.16 },  // Hydra funciona como un manojo con miles de llaves.
  { file: '4_13.jpg', startSec: 253.42 },  // Prueba usuario tras usuario y con cada uno, contraseña tras 
  { file: '4_20.jpg', startSec: 260.68 },  // Y aquí está el detalle que lo cambia todo.
  { file: '4_23.jpg', startSec: 263.44 },  // Si la web no limita los intentos, Hydra puede probar para si
  { file: '4_27.jpg', startSec: 267.78 },  // Y qué usuarios y contraseñas prueba primero?
  { file: '4_31.jpg', startSec: 271.04 },  // Los de siempre.
  { file: '4_32.jpg', startSec: 272.22 },  // Y esto es lo que casi nadie sabe.
  { file: '4_34.jpg', startSec: 274.74 },  // Existen listas públicas, gigantescas, con los usuarios más c
  { file: '4_39.jpg', startSec: 279.0 },  // admin,
  { file: '4_39_b.jpg', startSec: 279.8 },  // route,
  { file: '4_40.jpg', startSec: 280.38 },  // usuario, administrador.
  { file: '4_42.jpg', startSec: 282.36 },  // Y con las contraseñas más usadas del mundo, sacadas de filtr
  { file: '4_48.jpg', startSec: 288.22 },  // No se las inventa, se las descarga.
  { file: '4_51.jpg', startSec: 291.04 },  // Contraseñas como 1, 2, 3, 4, 5, 6. O la palabra contraseña, 
  { file: '4_56.jpg', startSec: 296.4 },  // Las mismas que usa muchísimo más gente de la que crees.
  { file: '5_00.jpg', startSec: 300.12 },  // El atacante lanza el ataque y Hydra empieza a probar combina
  { file: '5_10.jpg', startSec: 310.92 },  // Y de repente,
  { file: '5_12.jpg', startSec: 312.12 },  // para.
  { file: '5_13.jpg', startSec: 313.0 },  // Ha encontrado una que funciona.
  { file: '5_15.jpg', startSec: 315.4 },  // El usuario era administrador.
  { file: '5_17.jpg', startSec: 317.22 },  // La contraseña te quiero.
  { file: '5_19.jpg', startSec: 319.62 },  // El atacante escribe esas credenciales en el panel de Sara,
  { file: '5_22.jpg', startSec: 322.74 },  // Pulse a entrar y está dentro.
  { file: '5_25.jpg', startSec: 325.46 },  // Y lo que ve no es un juego.
  { file: '5_27.jpg', startSec: 327.6 },  // Ve la base de datos de clientes de Sara, nombres, correos, t
  { file: '5_32.jpg', startSec: 332.12 },  // datos reales de gente real, protegido solo por una contraseñ
  { file: '5_38.jpg', startSec: 338.86 },  // Esto no es una demostración del laboratorio,
  { file: '5_41.jpg', startSec: 341.54 },  // es exactamente así como pasa en el mundo real, todos los día
  { file: '5_46.jpg', startSec: 346.12 },  // Y quizás te es pensando,
  { file: '5_47.jpg', startSec: 347.74 },  // pero mi web es pequeña, ¿quién me va a atacar a mi?
  { file: '5_50.jpg', startSec: 350.88 },  // Esa es justo la trampa.
  { file: '5_52.jpg', startSec: 352.44 },  // Al atacante le da igual 15as.
  { file: '5_54.jpg', startSec: 354.68 },  // No te lige a ti.
  { file: '5_56.jpg', startSec: 356.1 },  // Elige a cualquiera que tenga la puerta mal cerrada y lanza e
  { file: '6_03.jpg', startSec: 363.04 },  // No te pillan porque seas importante.
  { file: '6_05.jpg', startSec: 365.64 },  // Te pillan porque eras fácil.
  { file: '6_08.jpg', startSec: 368.04 },  // Así que volvamos al principio,
  { file: '6_09.jpg', startSec: 369.7 },  // a lo que de verdad importa.
  { file: '6_11.jpg', startSec: 371.32 },  // A ti.
  { file: '6_12.jpg', startSec: 372.42 },  // Porque todo este ataque de principio a fin se apoya en tres 
  { file: '6_18.jpg', startSec: 378.36 },  // Uno,
  { file: '6_19.jpg', startSec: 379.4 },  // esconder algo no es protegerlo.
  { file: '6_21.jpg', startSec: 381.4 },  // Un panel sin enlace no está seguro,
  { file: '6_23.jpg', startSec: 383.64 },  // solo está sin enlazar.
  { file: '6_25.jpg', startSec: 385.26 },  // En cuanto gobuster prueban hombres, aparece. Ponle contraseñ
  { file: '6_31.jpg', startSec: 391.38 },  // Un código que cambia cada poco y que el atacante no tiene.
  { file: '6_35.jpg', startSec: 395.56 },  // Dos,
  { file: '6_36.jpg', startSec: 396.26 },  // la contraseña débil es la que abre la puerta.
  { file: '6_38.jpg', startSec: 398.86 },  // Te quiero, tu nombre, tu fecha de nacimiento o uno, dos, tre
  { file: '6_46.jpg', startSec: 406.92 },  // Una contraseña larga y única, distinta en cada sitio,
  { file: '6_50.jpg', startSec: 410.4 },  // convierte un ataque de segundos en uno de siglos.
  { file: '6_53.jpg', startSec: 413.86 },  // Tres,
  { file: '6_54.jpg', startSec: 414.98 },  // limita los intentos.
  { file: '6_56.jpg', startSec: 416.5 },  // Si una web bloquea el acceso tras unos pocos fallos, herrami
  { file: '7_02.jpg', startSec: 422.34 },  // Sin ese límite, el atacante tiene todo el tiempo del mundo p
  { file: '7_07.jpg', startSec: 427.86 },  // Fíjate que ninguna de las tres cosas es cara ni complicada.
  { file: '7_11.jpg', startSec: 431.2 },  // Son gratis, solo hay que saberlas.
  { file: '7_14.jpg', startSec: 434.02 },  // Y una cosa más, la más importante de todas.
  { file: '7_17.jpg', startSec: 437.32 },  // Todo lo que has visto aquí son herramientas que usan los pro
  { file: '7_24.jpg', startSec: 444.16 },  // Hacer esto contra una web que no es tuya, sin autorización,
  { file: '7_27.jpg', startSec: 447.78 },  // no es curiosidad.
  { file: '7_29.jpg', startSec: 449.32 },  // Es un delito.
  { file: '7_31.jpg', startSec: 451.1 },  // Esto es divulgación para que sepas defenderte,
  { file: '7_33.jpg', startSec: 453.78 },  // no un manual para atacar a nadie.
  { file: '7_36.jpg', startSec: 456.34 },  // Si esto te ha hecho mirar tus contraseñas con otra cara, sus
  { file: '7_40.jpg', startSec: 460.26 },  // Seben ocias deis.
];
// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.12 },
  { file: 'shadow_enter.mp3', startSec: 18.48, volume: 0.15 },
  { file: 'sign_pop.mp3', startSec: 23.14, volume: 0.15 },
  { file: 'debunk_buzzer.mp3', startSec: 36.68, volume: 0.15 },
  { file: 'recon_search.mp3', startSec: 57.62, volume: 0.13 },
  { file: 'step_ding1.mp3', startSec: 83.4, volume: 0.15 },
  { file: 'step_ding2.mp3', startSec: 115.48, volume: 0.15 },
  { file: 'scan_beeps.mp3', startSec: 126.4, volume: 0.14 },
  { file: 'list_flip.mp3', startSec: 169.76, volume: 0.14 },
  { file: 'rapid_try.mp3', startSec: 183.78, volume: 0.14 },
  { file: 'found_ding.mp3', startSec: 196.3, volume: 0.16 },
  { file: 'reveal_dark.mp3', startSec: 212.26, volume: 0.16 },
  { file: 'door_creak.mp3', startSec: 242.26, volume: 0.14 },
  { file: 'keyring_jingle.mp3', startSec: 250.16, volume: 0.14 },
  { file: 'machinegun_try.mp3', startSec: 300.12, volume: 0.14 },
  { file: 'freeze_stop.mp3', startSec: 312.12, volume: 0.15 },
  { file: 'success_unlock.mp3', startSec: 313.0, volume: 0.16 },
  { file: 'door_open_inside.mp3', startSec: 322.74, volume: 0.16 },
  { file: 'data_reveal.mp3', startSec: 327.6, volume: 0.15 },
  { file: 'trap_sting.mp3', startSec: 350.88, volume: 0.15 },
  { file: 'cheap_hit.mp3', startSec: 365.64, volume: 0.15 },
  { file: 'tick1.mp3', startSec: 378.36, volume: 0.15 },
  { file: 'tick2.mp3', startSec: 395.56, volume: 0.15 },
  { file: 'tick3.mp3', startSec: 413.86, volume: 0.15 },
  { file: 'blocked_stamp.mp3', startSec: 416.5, volume: 0.15 },
  { file: 'gavel.mp3', startSec: 449.32, volume: 0.16 },
  { file: 'subscribe_chime.mp3', startSec: 456.34, volume: 0.17 },
];

// Música del canal: clip de 30 s repetido con Loop (duración de UNA iteración, no del vídeo).
const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const ComoHackeanUnaWeb: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('como-hackean-una-web.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`como-hackean-una-web-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`como-hackean-una-web-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`como-hackean-una-web/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
