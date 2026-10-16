import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// todos-los-grupos-hacker-de-los-gobiernos - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // 23 de diciembre de 2015,
  { file: '0_02.jpg', startSec: 2.48 },  // una eléctrica de loeste de Ucrania.
  { file: '0_04.jpg', startSec: 4.68 },  // Un técnico ve como el cursor de su ordenador se mueve solo,
  { file: '0_08.jpg', startSec: 8.2 },  // hace clic y abre los interruptores uno tras otro.
  { file: '0_12.jpg', startSec: 12.2 },  // 225 .000 clientes se quedan a oscuras en pleno invierno.
  { file: '0_16.jpg', startSec: 16.0 },  // ¿Fue un virus suelto?
  { file: '0_17.jpg', startSec: 17.46 },  // No,
  { file: '0_18.jpg', startSec: 18.24 },  // detrás había una unidad del ejército ruso y no es la única,
  { file: '0_21.jpg', startSec: 21.86 },  // hay más,
  { file: '0_22.jpg', startSec: 22.74 },  // y todos trabajan para un gobierno.
  { file: '0_24.jpg', startSec: 24.92 },  // Aquí van diez,
  { file: '0_26.jpg', startSec: 26.0 },  // del más conocido al más entraro,
  { file: '0_28.jpg', startSec: 28.08 },  // y uno es el más avanzado jamás descubierto.
  { file: '0_30.jpg', startSec: 30.76 },  // ¿A divinás cuál?
  { file: '0_32.jpg', startSec: 32.12 },  // Un aviso.
  { file: '0_33.jpg', startSec: 33.12 },  // Ningún gobierno reconoce a estos grupos,
  { file: '0_35.jpg', startSec: 35.5 },  // lo que oirás es lo que les atribuye en otros.
  { file: '0_38.jpg', startSec: 38.6 },  // Número uno.
  { file: '0_39.jpg', startSec: 39.7 },  // Fancy Ber,
  { file: '0_40.jpg', startSec: 40.9 },  // también llamado APT -28,
  { file: '0_43.jpg', startSec: 43.28 },  // según la justicia de Estados Unidos,
  { file: '0_45.jpg', startSec: 45.24 },  // es la unidad 26 .165 del espionaje militar ruso.
  { file: '0_49.jpg', startSec: 49.87 },  // Su golpe más famoso fueron las elecciones estadounidenses de 2016.
  { file: '0_54.jpg', startSec: 54.46 },  // Un correo falso bastó para robar la contraseña del jefe de campaña de Hillary Clinton.
  { file: '0_59.jpg', startSec: 59.46 },  // Entraron también en el partido democrata y publicaron los correos a cuentagotas.
  { file: '1_03.jpg', startSec: 63.98 },  // En 2018,
  { file: '1_05.jpg', startSec: 65.64 },  // Estados Unidos acusó a doce oficiales rusos.
  { file: '1_08.jpg', startSec: 68.54 },  // Su estilo,
  { file: '1_09.jpg', startSec: 69.54 },  // te roban los correos y los publican en el peor momento.
  { file: '1_13.jpg', startSec: 73.0 },  // Número dos. Cosy Ber.
  { file: '1_15.jpg', startSec: 75.08 },  // Se le atribuye al espionaje exterior ruso y es justo lo contrario de Fancy Ber.
  { file: '1_19.jpg', startSec: 79.94 },  // Nunca hace ruido.
  { file: '1_21.jpg', startSec: 81.64 },  // En 2020, escondió su código dentro de una actualización del programa SolarWinds.
  { file: '1_26.jpg', startSec: 86.52 },  // Según la propia empresa,
  { file: '1_27.jpg', startSec: 87.94 },  // unos 18 .000 clientes descargaron esa actualización,
  { file: '1_31.jpg', startSec: 91.44 },  // entre ellos agencias de Estados Unidos.
  { file: '1_34.jpg', startSec: 94.0 },  // Pero aquí viene lo raro.
  { file: '1_35.jpg', startSec: 95.68 },  // En 2024, Microsoft contó que este grupo había entrado en los correos de sus directivos. Y que buscaban.
  { file: '1_42.jpg', startSec: 102.48 },  // Lo que Microsoft sabía de ellos.
  { file: '1_45.jpg', startSec: 105.3 },  // Número tres.
  { file: '1_46.jpg', startSec: 106.2 },  // Sangworm.
  { file: '1_47.jpg', startSec: 107.12 },  // Los de la pagón del principio.
  { file: '1_49.jpg', startSec: 109.02 },  // Según Estados Unidos,
  { file: '1_50.jpg', startSec: 110.42 },  // es la unidad 74455 del ejército ruso.
  { file: '1_55.jpg', startSec: 115.14 },  // En 2017, soltaron notpétia,
  { file: '1_57.jpg', startSec: 117.92 },  // nació en Ucrania y se escapó al mundo entero.
  { file: '2_00.jpg', startSec: 120.88 },  // Paró a la naviera Maersk.
  { file: '2_02.jpg', startSec: 122.58 },  // Estados Unidos calcula unos daños de 10 .000 millones de dólares. Y en los juegos olímpicos de invierno de 201
  { file: '2_12.jpg', startSec: 132.12 },  // Su estilo.
  { file: '2_13.jpg', startSec: 133.14 },  // Este grupo nunca roba.
  { file: '2_14.jpg', startSec: 134.9 },  // Rompe.
  { file: '2_16.jpg', startSec: 136.06 },  // Número cuatro.
  { file: '2_17.jpg', startSec: 137.46 },  // Turla.
  { file: '2_18.jpg', startSec: 138.34 },  // Se atribuye al servicio de seguridad ruso.
  { file: '2_20.jpg', startSec: 140.86 },  // Su arma es un programa espía llamado Snake.
  { file: '2_23.jpg', startSec: 143.78 },  // Según las agencias estadounidenses,
  { file: '2_25.jpg', startSec: 145.8 },  // lo empezaron a construir en 2003 y ha aparecido en más de 50 países.
  { file: '2_30.jpg', startSec: 150.62 },  // Pero su golpe más raro es otro. En 2019,
  { file: '2_34.jpg', startSec: 154.24 },  // los británicos descubrieron que Turla había hackeado a unos hackers iraníes.
  { file: '2_38.jpg', startSec: 158.74 },  // Usó sus herramientas para atacar en al menos 35 países y que pareciera un ataque iraní.
  { file: '2_44.jpg', startSec: 164.72 },  // Su estilo.
  { file: '2_45.jpg', startSec: 165.64 },  // El ladrón que roba otros ladrones.
  { file: '2_48.jpg', startSec: 168.26 },  // Número cinco.
  { file: '2_49.jpg', startSec: 169.52 },  // Lazarus. Corea del Norte.
  { file: '2_51.jpg', startSec: 171.66 },  // Ya tienes vídeos suyos en el canal.
  { file: '2_53.jpg', startSec: 173.74 },  // El Banco de Bangladesh.
  { file: '2_55.jpg', startSec: 175.1 },  // Y Guanacrai.
  { file: '2_56.jpg', startSec: 176.4 },  // En febrero de 2025,
  { file: '2_58.jpg', startSec: 178.28 },  // el FBI le atribuyó el robo a la plataforma de criptomonedas Baybit. 1 .500 millones de dólares en un solo golp
  { file: '3_11.jpg', startSec: 191.0 },  // Número seis.
  { file: '3_12.jpg', startSec: 191.88 },  // APT 41.
  { file: '3_13.jpg', startSec: 193.52 },  // China.
  { file: '3_14.jpg', startSec: 194.5 },  // En el sector le llaman doble dragón.
  { file: '3_16.jpg', startSec: 196.7 },  // Según mandían de día espía para el estado chino y en su tiempo libre roba para sí mismo.
  { file: '3_21.jpg', startSec: 201.96 },  // Empezó robando moneda virtual a empresas de videojuegos.
  { file: '3_25.jpg', startSec: 205.04 },  // En 2020,
  { file: '3_26.jpg', startSec: 206.02 },  // Estados Unidos acusó a cinco chinos de atacar a más de 100 empresas. Su estilo,
  { file: '3_30.jpg', startSec: 210.6 },  // un pie en el gobierno y otro en el crimen.
  { file: '3_33.jpg', startSec: 213.62 },  // Y ahora empiezan los raros.
  { file: '3_35.jpg', startSec: 215.9 },  // Número siete.
  { file: '3_36.jpg', startSec: 216.84 },  // Volta y Fún.
  { file: '3_37.jpg', startSec: 217.92 },  // También se le atribuye a China.
  { file: '3_39.jpg', startSec: 219.9 },  // Este grupo no roba datos. No espía correos. Espera.
  { file: '3_43.jpg', startSec: 223.54 },  // En 2024,
  { file: '3_44.jpg', startSec: 224.68 },  // las agencias de Estados Unidos avisaron de que estaba dentro de redes de agua,
  { file: '3_48.jpg', startSec: 228.7 },  // de energía y de transporte.
  { file: '3_50.jpg', startSec: 230.88 },  // En algunas llevaba al menos cinco años escondido.
  { file: '3_53.jpg', startSec: 233.7 },  // Según ella se preparaba para sabotear las algún día. Su estilo.
  { file: '3_57.jpg', startSec: 237.68 },  // Nunca dispara. Deja la bomba apuesta.
  { file: '4_00.jpg', startSec: 240.86 },  // Número ocho. Solta y Fún.
  { file: '4_02.jpg', startSec: 242.76 },  // China otra vez.
  { file: '4_04.jpg', startSec: 244.06 },  // Entró en las grandes telefónicas de Estados Unidos.
  { file: '4_06.jpg', startSec: 246.98 },  // Según en New York Times apuntaron a los móviles de Donald Trump y de J .D. Bans en plena campaña.
  { file: '4_12.jpg', startSec: 252.34 },  // Y según el FBI copiaron datos de las escuchas que pide la policía con orden judicial.
  { file: '4_17.jpg', startSec: 257.28 },  // Según el FBI atacaron empresas de 80 países.
  { file: '4_20.jpg', startSec: 260.56 },  // Su estilo.
  { file: '4_21.jpg', startSec: 261.54 },  // Espía el sistema que usa la policía para espiar.
  { file: '4_24.jpg', startSec: 264.94 },  // Número nueve. Charming Kitten.
  { file: '4_26.jpg', startSec: 266.96 },  // Irán.
  { file: '4_27.jpg', startSec: 267.96 },  // Se atribuye a la Guardia Revolucionaria a Irani.
  { file: '4_30.jpg', startSec: 270.44 },  // Y su arma favorita es la mentira.
  { file: '4_32.jpg', startSec: 272.52 },  // Según mandían se hace pasar por periodistas de grandes medios. Te invita a una entrevista y te roba la contras
  { file: '4_38.jpg', startSec: 278.94 },  // En 2024 Microsoft le atribuyó un correo Trump a contra un alto cargo de una campaña presidencial estadounidens
  { file: '4_45.jpg', startSec: 285.86 },  // Poco después Estados Unidos acusó a Irán de robar documentos de la campaña de Trump.
  { file: '4_50.jpg', startSec: 290.48 },  // Su estilo.
  { file: '4_51.jpg', startSec: 291.4 },  // Nunca entra por la fuerza.
  { file: '4_53.jpg', startSec: 293.02 },  // Le abre estúla puerta.
  { file: '4_54.jpg', startSec: 294.72 },  // Y llegamos al último.
  { file: '4_56.jpg', startSec: 296.32 },  // El más raro de todos.
  { file: '4_58.jpg', startSec: 298.08 },  // Número diez. Equation Group.
  { file: '5_00.jpg', startSec: 300.18 },  // En 2015 Casperzquilo destapó y dijo que llevaba casi 20 años activo. Podía esconderse dentro del disco duro, a
  { file: '5_09.jpg', startSec: 309.4 },  // Los asistentes a un congreso científico en Houston recibieron un cede con las ponencias.
  { file: '5_13.jpg', startSec: 313.96 },  // Venía infectado.
  { file: '5_15.jpg', startSec: 315.48 },  // Y lo vinculó con los creadores de StackSnet.
  { file: '5_18.jpg', startSec: 318.22 },  // Luego un grupo llamado DeXado Brokers filtró herramientas que encajaban con las suyas. Y una de ellas acabó de
  { file: '5_25.jpg', startSec: 325.24 },  // Su estilo.
  { file: '5_26.jpg', startSec: 326.24 },  // Un fantasma.
  { file: '5_27.jpg', startSec: 327.34 },  // Pasó casi 20 años escondido.
  { file: '5_29.jpg', startSec: 329.88 },  // Así que volvamos a la pregunta del principio.
  { file: '5_32.jpg', startSec: 332.34 },  // ¿Cuál es el más avanzado de todos?
  { file: '5_34.jpg', startSec: 334.48 },  // Según Casperzquilo es Equation Group.
  { file: '5_36.jpg', startSec: 336.68 },  // Supera todo lo conocido en complejidad.
  { file: '5_38.jpg', startSec: 338.98 },  // Y los investigadores no lo vinculan con Moscú ni con Pequín.
  { file: '5_42.jpg', startSec: 342.52 },  // Lo vinculan con la NSEA, la agencia de espionaje de Estados Unidos.
  { file: '5_46.jpg', startSec: 346.96 },  // Estados Unidos nunca lo ha confirmado.
  { file: '5_49.jpg', startSec: 349.82 },  // ¿Y tú? ¿Cuál de los diez te da más miedo? Te leo en los comentarios.
  { file: '5_53.jpg', startSec: 353.88 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '5_58.jpg', startSec: 358.72 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'power_hum.mp3', startSec: 0.3, volume: 0.14 },
  { file: 'switch_clicks.mp3', startSec: 8.2, volume: 0.15 },
  { file: 'power_down.mp3', startSec: 12.2, volume: 0.14 },
  { file: 'dramatic_hit.mp3', startSec: 17.5, volume: 0.15 },
  { file: 'whoosh_list.mp3', startSec: 38.6, volume: 0.14 },
  { file: 'email_ping.mp3', startSec: 54.5, volume: 0.14 },
  { file: 'tiptoe.mp3', startSec: 79.9, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 94.0, volume: 0.14 },
  { file: 'glitch.mp3', startSec: 115.1, volume: 0.14 },
  { file: 'smash.mp3', startSec: 134.9, volume: 0.15 },
  { file: 'sneaky_sting.mp3', startSec: 165.6, volume: 0.14 },
  { file: 'coins.mp3', startSec: 181.0, volume: 0.14 },
  { file: 'heartbeat.mp3', startSec: 221.8, volume: 0.14 },
  { file: 'fuse_tick.mp3', startSec: 237.7, volume: 0.15 },
  { file: 'phone_static.mp3', startSec: 252.3, volume: 0.14 },
  { file: 'door_creak.mp3', startSec: 293.0, volume: 0.14 },
  { file: 'deep_boom.mp3', startSec: 314.0, volume: 0.15 },
  { file: 'ghost_whoosh.mp3', startSec: 326.2, volume: 0.14 },
  { file: 'dramatic_hit_two.mp3', startSec: 342.5, volume: 0.15 },
  { file: 'subscribe_chime.mp3', startSec: 357.6, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const TodosLosGruposHackerDeLosGobiernos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('todos-los-grupos-hacker-de-los-gobiernos.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`todos-los-grupos-hacker-de-los-gobiernos-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`todos-los-grupos-hacker-de-los-gobiernos-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`todos-los-grupos-hacker-de-los-gobiernos/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
