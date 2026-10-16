import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// dejaron-mil-ias-solas-en-minecraft - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Imagina que entras en un mundo de Minecraft.
  { file: '0_02.jpg', startSec: 2.78 },  // Hay granjeros, guardias, herreros,
  { file: '0_05.jpg', startSec: 5.32 },  // pueblos con sus propias modas,
  { file: '0_07.jpg', startSec: 7.14 },  // sus vecinos pagan impuestos,
  { file: '0_08.jpg', startSec: 8.88 },  // y votan para cambiarlos.
  { file: '0_10.jpg', startSec: 10.68 },  // Hay hasta sacerdotes que van convirtiendo a la gente.
  { file: '0_13.jpg', startSec: 13.96 },  // Y ninguno de ellos es humano,
  { file: '0_16.jpg', startSec: 16.02 },  // todos son inteligencias artificiales.
  { file: '0_18.jpg', startSec: 18.42 },  // En internet lo vendieron así,
  { file: '0_20.jpg', startSec: 20.3 },  // dejaron mil y a solas y crearon una civilización.
  { file: '0_23.jpg', startSec: 23.6 },  // Pero es verdad,
  { file: '0_24.jpg', startSec: 24.76 },  // al final del vídeo vas a tener la respuesta.
  { file: '0_27.jpg', startSec: 27.28 },  // El experimento existe,
  { file: '0_28.jpg', startSec: 28.9 },  // se llama ProjectSeed.
  { file: '0_30.jpg', startSec: 30.6 },  // Lo hizo Altera, una pequeña empresa de California.
  { file: '0_33.jpg', startSec: 33.8 },  // Lo publicaron en octubre de 2024 en un estudio científico.
  { file: '0_37.jpg', startSec: 37.7 },  // Cada personaje de ese mundo es una gente,
  { file: '0_40.jpg', startSec: 40.22 },  // unaía que decide por su cuenta que hacer.
  { file: '0_43.jpg', startSec: 43.02 },  // Por dentro funcionan con GPD 4O, el modelo de chat GPD.
  { file: '0_47.jpg', startSec: 47.4 },  // Pero con ese modelo no basta.
  { file: '0_49.jpg', startSec: 49.3 },  // Una gente así dice una cosa y hace otra.
  { file: '0_52.jpg', startSec: 52.14 },  // Así que Altera le dio un cerebro con 10 partes que trabajan a la vez. Memoria,
  { file: '0_56.jpg', startSec: 56.62 },  // objetivos,
  { file: '0_57.jpg', startSec: 57.52 },  // conversación,
  { file: '0_58.jpg', startSec: 58.48 },  // habilidades, y un jefe en medio que decide y avisa a todas las partes para que lo que dice y lo que hace encaj
  { file: '1_05.jpg', startSec: 65.38 },  // Primero probaron que podía acercada a gente por su cuenta.
  { file: '1_08.jpg', startSec: 68.76 },  // 49 agentes jugaron durante 4 horas.
  { file: '1_11.jpg', startSec: 71.7 },  // Entre todos consiguieron unos 320 objetos distintos,
  { file: '1_15.jpg', startSec: 75.44 },  // casi un tercio de todo lo que existe en Minecraft.
  { file: '1_18.jpg', startSec: 78.54 },  // Algunos ya tenían diamantes a la media hora.
  { file: '1_21.jpg', startSec: 81.14 },  // Luego vino lo interesante,
  { file: '1_22.jpg', startSec: 82.66 },  // juntarlos.
  { file: '1_23.jpg', startSec: 83.78 },  // Metieron a 30 agentes en un pueblo,
  { file: '1_26.jpg', startSec: 86.22 },  // todos con la misma personalidad,
  { file: '1_28.jpg', startSec: 88.04 },  // todos con el mismo objetivo.
  { file: '1_29.jpg', startSec: 89.8 },  // Iguales, como clones.
  { file: '1_31.jpg', startSec: 91.74 },  // En 20 minutos se repartieron el trabajo,
  { file: '1_34.jpg', startSec: 94.36 },  // aparecieron granjeros, mineros,
  { file: '1_36.jpg', startSec: 96.48 },  // ingenieros,
  { file: '1_37.jpg', startSec: 97.48 },  // guardias, exploradores,
  { file: '1_39.jpg', startSec: 99.34 },  // herreros,
  { file: '1_40.jpg', startSec: 100.42 },  // nadie les asignó esos papeles y cada papel cambiaba lo que hacían.
  { file: '1_44.jpg', startSec: 104.9 },  // Los granjeros recogían semillas,
  { file: '1_46.jpg', startSec: 106.96 },  // los guardias levantaban vallas,
  { file: '1_48.jpg', startSec: 108.86 },  // el artista cogía flores.
  { file: '1_50.jpg', startSec: 110.78 },  // Luego cambiaron el carácter del pueblo.
  { file: '1_53.jpg', startSec: 113.24 },  // En un pueblo guerrero aparecieron exploradores y estrategas.
  { file: '1_56.jpg', startSec: 116.94 },  // En uno artístico salieron comisarios y coleccionistas.
  { file: '2_00.jpg', startSec: 120.32 },  // Entonces les quitaron la parte del cerebro que se fija en los demás y los papeles se desmoronaron.
  { file: '2_05.jpg', startSec: 125.78 },  // Todos acabaron haciendo más o menos lo mismo.
  { file: '2_08.jpg', startSec: 128.46 },  // En otra prueba con 50 agentes vieron algo muy humano.
  { file: '2_12.jpg', startSec: 132.2 },  // Cada agente puntuaba cuánto le caían bien los demás y esas notas cambiaban con el tiempo.
  { file: '2_17.jpg', startSec: 137.68 },  // A un cocinero le tocaba repartir comida y daba más a quienes más le apreciaban.
  { file: '2_22.jpg', startSec: 142.62 },  // Después llegaron los impuestos.
  { file: '2_24.jpg', startSec: 144.44 },  // 25 ciudadanos recibieron una constitución. Tenían que pagar el 20 % de lo que llevaban encima.
  { file: '2_30.jpg', startSec: 150.6 },  // Entre ellos metieron a tres influencers,
  { file: '2_32.jpg', startSec: 152.94 },  // unos a favor de los impuestos y otros en contra.
  { file: '2_36.jpg', startSec: 156.1 },  // A mitad de partida los ciudadanos podían proponer cambios y votarlos,
  { file: '2_39.jpg', startSec: 159.96 },  // y los influencers arrastraban el voto de quienes hablaban con ellos.
  { file: '2_43.jpg', startSec: 163.7 },  // El impuesto bajó del 20 a entre el 5 y el 10 % y los ciudadanos cumplieron la nueva ley.
  { file: '2_49.jpg', startSec: 169.88 },  // La prueba de control fue al revés.
  { file: '2_52.jpg', startSec: 172.02 },  // Con la constitución congelada, el impuesto nunca cambió.
  { file: '2_55.jpg', startSec: 175.94 },  // La prueba más grande tenía 500 agentes repartidos en seis pueblos.
  { file: '3_00.jpg', startSec: 180.96 },  // Cada pueblo acabó con sus propias modas.
  { file: '3_03.jpg', startSec: 183.68 },  // En uno se hablaba de ecología.
  { file: '3_05.jpg', startSec: 185.68 },  // En otro todo eran bromas pesadas
  { file: '3_07.jpg', startSec: 187.84 },  // y en el campo surgían muchas menos modas que en los pueblos.
  { file: '3_11.jpg', startSec: 191.62 },  // Y luego estaba la religión.
  { file: '3_13.jpg', startSec: 193.82 },  // Era el pastafarismo,
  { file: '3_15.jpg', startSec: 195.66 },  // la religión de broma del monstruo de espagueti volador.
  { file: '3_18.jpg', startSec: 198.78 },  // Sus acerdotes iban convirtiendo los vecinos y los conversos la llevaban a otros pueblos.
  { file: '3_24.jpg', startSec: 204.54 },  // Ni siquiera hacía falta hablar con un sacerdote,
  { file: '3_27.jpg', startSec: 207.08 },  // bastaba concruzarse con alguien ya convertido.
  { file: '3_30.jpg', startSec: 210.5 },  // Después de dos horas, la religión seguía creciendo.
  { file: '3_34.jpg', startSec: 214.18 },  // Hasta aquí suena increíble, ¿verdad?
  { file: '3_36.jpg', startSec: 216.54 },  // Pues ahora viene la letra pequeña.
  { file: '3_38.jpg', startSec: 218.72 },  // La religión nunca surgió sola.
  { file: '3_41.jpg', startSec: 221.14 },  // Los investigadores colocaron a propósito a 20 sacerdotes en un pueblo para ver cómo se extiende una idea.
  { file: '3_47.jpg', startSec: 227.96 },  // La constitución tampoco la inventaron ellos.
  { file: '3_50.jpg', startSec: 230.64 },  // Se la dieron hecha, igual que el calendario de cada votación.
  { file: '3_54.jpg', startSec: 234.52 },  // Y los milagentes del titular.
  { file: '3_56.jpg', startSec: 236.8 },  // Lo intentaron con más de mil,
  { file: '3_58.jpg', startSec: 238.74 },  // pero el servidor se saturó y muchos agentes dejaban de responder.
  { file: '4_02.jpg', startSec: 242.98 },  // Por eso el estudio de la cultura se hizo con 500.
  { file: '4_06.jpg', startSec: 246.18 },  // Y la economía con gemas como moneda
  { file: '4_09.jpg', startSec: 249.06 },  // y el sacerdote que sobornaba a la gente para convertirla?
  { file: '4_12.jpg', startSec: 252.96 },  // Eso lo contó la empresa al presentar el proyecto,
  { file: '4_15.jpg', startSec: 255.72 },  // pero en el estudio científico no aparece por ningún lado.
  { file: '4_19.jpg', startSec: 259.58 },  // Y ninguna de estas pruebas duró años duraban minutos u horas.
  { file: '4_24.jpg', startSec: 264.46 },  // Los propios autores reconocen más límites.
  { file: '4_27.jpg', startSec: 267.84 },  // Sus agentes no pueden ver,
  { file: '4_29.jpg', startSec: 269.78 },  // así que les cuesta orientarse y construir juntos.
  { file: '4_32.jpg', startSec: 272.88 },  // Les faltan instintos de verdad como sobrevivir o la curiosidad.
  { file: '4_37.jpg', startSec: 277.68 },  // Y admiten algo clave.
  { file: '4_39.jpg', startSec: 279.52 },  // Estos agentes no pueden inventar la democracia desde cero,
  { file: '4_43.jpg', startSec: 283.16 },  // porque el modelo que los mueve ya la conoce,
  { file: '4_46.jpg', startSec: 286.2 },  // ha leído muchísimo sobre ella.
  { file: '4_48.jpg', startSec: 288.64 },  // Un experto enía y videojuegos lo dijo en MIT Technology Review.
  { file: '4_53.jpg', startSec: 293.6 },  // No hay ninguna razón para creer que esa red neuronal sienta algo.
  { file: '4_58.jpg', startSec: 298.86 },  // Entonces,
  { file: '4_59.jpg', startSec: 299.82 },  // ¿para qué sirve?
  { file: '5_01.jpg', startSec: 301.16 },  // Para estudiar cómo se comportan muchasías juntas y eso importa cada vez más,
  { file: '5_06.jpg', startSec: 306.64 },  // porque cada vez hay más agentes deía trabajando a la vez.
  { file: '5_10.jpg', startSec: 310.0 },  // En este mundo puedes cambiar una regla y ver qué pasa,
  { file: '5_13.jpg', startSec: 313.12 },  // o meter a una gente que convencia los demás.
  { file: '5_16.jpg', startSec: 316.18 },  // Y ninguna persona real corre ningún riesgo.
  { file: '5_19.jpg', startSec: 319.42 },  // Así que volvamos a la pregunta.
  { file: '5_21.jpg', startSec: 321.82 },  // Mil y asolas crearon una civilización?
  { file: '5_24.jpg', startSec: 324.9 },  // No,
  { file: '5_25.jpg', startSec: 325.9 },  // nunca estuvieron solas y los mil agentes nunca llegaron a funcionar bien a la vez.
  { file: '5_31.jpg', startSec: 331.24 },  // Pero 30 clones se repartieron el trabajo y 500 agentes inventaron sus propias modas.
  { file: '5_37.jpg', startSec: 337.62 },  // No crearon una civilización,
  { file: '5_39.jpg', startSec: 339.8 },  // copiaron la nuestra,
  { file: '5_41.jpg', startSec: 341.4 },  // porque es lo único que han leído.
  { file: '5_44.jpg', startSec: 344.2 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día,
  { file: '5_48.jpg', startSec: 348.34 },  // suscríbete,
  { file: '5_49.jpg', startSec: 349.44 },  // cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'blocky_steps.mp3', startSec: 0.2, volume: 0.13 },
  { file: 'village_chime.mp3', startSec: 2.8, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 13.96, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 23.6, volume: 0.14 },
  { file: 'computer_beep.mp3', startSec: 37.7, volume: 0.14 },
  { file: 'whoosh_expand.mp3', startSec: 52.14, volume: 0.14 },
  { file: 'pickaxe_clink.mp3', startSec: 68.8, volume: 0.14 },
  { file: 'sparkle_ping.mp3', startSec: 78.5, volume: 0.14 },
  { file: 'crowd_murmur.mp3', startSec: 83.8, volume: 0.13 },
  { file: 'sad_descend.mp3', startSec: 120.3, volume: 0.14 },
  { file: 'coin_clink.mp3', startSec: 142.6, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 163.7, volume: 0.14 },
  { file: 'mystery_sting_two.mp3', startSec: 191.6, volume: 0.14 },
  { file: 'comedic_boing.mp3', startSec: 195.66, volume: 0.13 },
  { file: 'record_scratch_two.mp3', startSec: 216.5, volume: 0.14 },
  { file: 'static_noise.mp3', startSec: 238.7, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 279.5, volume: 0.15 },
  { file: 'soft_ping.mp3', startSec: 299.8, volume: 0.14 },
  { file: 'closing_turn.mp3', startSec: 319.4, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 348.3, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const DejaronMilIasSolasEnMinecraft: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('dejaron-mil-ias-solas-en-minecraft.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`dejaron-mil-ias-solas-en-minecraft-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`dejaron-mil-ias-solas-en-minecraft-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`dejaron-mil-ias-solas-en-minecraft/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
