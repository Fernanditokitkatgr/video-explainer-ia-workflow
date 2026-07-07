import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Stick to the Plan — "¿Y si Colón nunca hubiese descubierto América?"
// Timestamps from Whisper segment boundaries (exact audio sync). 1 segment = 1 image.
// === FRAMES:START (generado por scripts/orchestrate.py — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: 'v3_0_00.jpg', startSec: 0.0 },  // "Imagina que en 1492 un tipo con tres barcos pudo simplemente no ir."
  { file: 'v3_0_05.jpg', startSec: 5.8 },  // "Nada de Santa María, nada de Pinta ni Niña..."
  { file: 'v3_0_11.jpg', startSec: 11.64 },  // "...la comida de tu nevera, ni el idioma que hablas, serían iguales."
  { file: 'v3_0_16.jpg', startSec: 16.32 },  // "Hay exactamente cuatro formas en las que la historia podría haber ido distinta."
  { file: 'v3_0_21.jpg', startSec: 21.04 },  // "Vamos a verlas, de la menos probable a la más probable, empecemos por la menos probable"
  { file: 'v3_0_25.jpg', startSec: 25.88 },  // "...que nadie descubra América jamás."
  { file: 'v3_0_29.jpg', startSec: 29.94 },  // "Digo menos probable, porque en 1500 ya había pruebas de que tarde o temprano alguien iba"
  { file: 'v3_0_35.jpg', startSec: 35.54 },  // "a tropezar con ella."
  { file: 'v3_0_37.jpg', startSec: 37.34 },  // "...Cabral, iba camino de la India y se topó con Brasil sin buscarlo siquiera."
  { file: 'v3_0_42.jpg', startSec: 42.44 },  // "siquiera."
  { file: 'v3_0_43.jpg', startSec: 43.64 },  // "Pero juguemos a que ese tipo de accidente nunca ocurre."
  { file: 'v3_0_47.jpg', startSec: 47.26 },  // "Nadie se atreve, nadie tropieza, nadie cruza el océano."
  { file: 'v3_0_51.jpg', startSec: 51.38 },  // "Sin europeos de por medio, el continente sigue su propio camino."
  { file: 'v3_0_55.jpg', startSec: 55.64 },  // "Los aztecas absorben a los mayas, ya debilitados por sequías y guerras internas."
  { file: 'v3_1_00.jpg', startSec: 60.64 },  // "Los incas se extienden hacia el sur, gracias a sus carreteras y su dominio de la agricultura"
  { file: 'v3_1_05.jpg', startSec: 65.24 },  // "de montaña."
  { file: 'v3_1_06.jpg', startSec: 66.68 },  // "Entre ambos imperios está el tapón del Darién, una selva tan hostil que hoy, en pleno"
  { file: 'v3_1_11.jpg', startSec: 71.62 },  // "siglo veintiuno, sigue sin haber una carretera que la cruce."
  { file: 'v3_1_16.jpg', startSec: 76.14 },  // "Dos imperios, una frontera que ni la selva ni el tiempo logran borrar."
  { file: 'v3_1_20.jpg', startSec: 80.04 },  // "Y mientras tanto, en Europa, sin América en el mapa, la mirada se habría ido hacia"
  { file: 'v3_1_26.jpg', startSec: 86.0 },  // "África, chocando de frente con el imperio otomano."
  { file: 'v3_1_29.jpg', startSec: 89.92 },  // "Segundo escenario, es América la que encuentra al resto del mundo primero."
  { file: 'v3_1_34.jpg', startSec: 94.3 },  // "Suena a ciencia ficción y en parte lo es."
  { file: 'v3_1_37.jpg', startSec: 97.06 },  // "América lo tenía crudo desde el principio, es un continente vertical, no horizontal como Eurasia."
  { file: 'v3_1_43.jpg', startSec: 103.18 },  // "Así que un cultivo no viaja bien de norte a sur."
  { file: 'v3_1_46.jpg', startSec: 106.14 },  // "El maíz nunca cruzó al sur, la llama nunca subió al norte, y para cruzar un océano"
  { file: 'v3_1_51.jpg', startSec: 111.26 },  // "hace falta algo más que ganas."
  { file: 'v3_1_53.jpg', startSec: 113.52 },  // "Un consejero azteca podría proponerlo, sí, pero en el puerto sólo había canoas, a"
  { file: 'v3_1_58.jpg', startSec: 118.44 },  // "años luz de lo necesario."
  { file: 'v3_2_00.jpg', startSec: 120.44 },  // "Aún así, juguemos a que sí lo consiguen, y son los aztecas quienes cruzan el Atlántico"
  { file: 'v3_2_05.jpg', startSec: 125.18 },  // "y conquistan Iberia, tres ciudades-estado, un sistema de impuestos brutal y el náhuatl"
  { file: 'v3_2_11.jpg', startSec: 131.08 },  // "como lengua de la clase alta."
  { file: 'v3_2_13.jpg', startSec: 133.48 },  // "Con los incas casi nada cambiaría."
  { file: 'v3_2_15.jpg', startSec: 135.74 },  // "Ya vivían bajo un reparto de tierras parecido."
  { file: 'v3_2_18.jpg', startSec: 138.82 },  // "Tercer escenario, es Asia quien llega primero, y aquí la cosa pudo ser muy distinta, porque"
  { file: 'v3_2_24.jpg', startSec: 144.44 },  // "China estuvo más cerca de lo que crees."
  { file: 'v3_2_26.jpg', startSec: 146.98 },  // "...sus flotas ya habían llegado hasta África oriental."
  { file: 'v3_2_33.jpg', startSec: 153.54 },  // "Inventaron la brújula y la pólvora antes que nadie."
  { file: 'v3_2_36.jpg', startSec: 156.4 },  // "El emperador incluso se planteó seguir navegando hacia el este."
  { file: 'v3_2_40.jpg', startSec: 160.14 },  // "Pero el imperio tenía líos internos más urgentes y la flota dio media vuelta."
  { file: 'v3_2_44.jpg', startSec: 164.76 },  // "Por política, no por falta de barcos."
  { file: 'v3_2_47.jpg', startSec: 167.36 },  // "Quizás la decisión más cara de la historia."
  { file: 'v3_2_50.jpg', startSec: 170.28 },  // "Y aunque hubiesen insistido, el Pacífico no se lo iba a poner fácil."
  { file: 'v3_2_54.jpg', startSec: 174.58 },  // "Sus corrientes tardaron 43 años en descifrarse, incluso sabiendo ya que América estaba ahí."
  { file: 'v3_3_01.jpg', startSec: 181.2 },  // "Japón en plena guerra civil, India partida en mil pedazos, los otomanos con la puerta"
  { file: 'v3_3_06.jpg', startSec: 186.84 },  // "de Gibraltar cerrada a cal y canto."
  { file: 'v3_3_09.jpg', startSec: 189.26 },  // "Este escenario, con todo su potencial, se queda corto."
  { file: 'v3_3_12.jpg', startSec: 192.84 },  // "Y así llegamos al escenario que de verdad ocurrió, o algo muy parecido."
  { file: 'v3_3_17.jpg', startSec: 197.2 },  // "Otro país europeo llega primero."
  { file: 'v3_3_19.jpg', startSec: 199.54 },  // "Da igual cuál, porque aquí es donde de verdad se decide el mundo que conoces hoy."
  { file: 'v3_3_24.jpg', startSec: 204.14 },  // "Cada potencia habría jugado sus cartas distinto."
  { file: 'v3_3_27.jpg', startSec: 207.14 },  // "España prohibió la esclavitud indígena con las leyes de Burgos, y terminó importando"
  { file: 'v3_3_31.jpg', startSec: 211.54 },  // "esclavos africanos igual."
  { file: 'v3_3_33.jpg', startSec: 213.54 },  // "Los colonos ingleses apenas se mezclaron con la población local, llevaban familias"
  { file: 'v3_3_38.jpg', startSec: 218.06 },  // "enteras y mantenían las distancias."
  { file: 'v3_3_40.jpg', startSec: 220.48 },  // "Los españoles en cambio ya se habían casado con buena parte de las aldeas indígenas."
  { file: 'v3_3_45.jpg', startSec: 225.66 },  // "Y esa diferencia explica más de lo que parece."
  { file: 'v3_3_48.jpg', startSec: 228.8 },  // "De ahí viene que media Latinoamérica hable español y casi toda Norteamérica hable inglés."
  { file: 'v3_3_54.jpg', startSec: 234.5 },  // "Si hubiese sido Portugal, el resultado habría sido casi idéntico al español."
  { file: 'v3_3_58.jpg', startSec: 238.82 },  // "Con Francia parecido, pero con Inglaterra o Holanda, hoy tendrías un continente mucho menos"
  { file: 'v3_4_05.jpg', startSec: 245.06 },  // "mestizo."
  { file: 'v3_4_06.jpg', startSec: 246.26 },  // "Así que la próxima vez que abras la nevera y veas una patata, un tomate o te tomes un café,"
  { file: 'v3_4_11.jpg', startSec: 251.44 },  // "acuérdate."
  { file: 'v3_4_12.jpg', startSec: 252.4 },  // "Nada de eso debería estar ahí."
  { file: 'v3_4_14.jpg', startSec: 254.7 },  // "Todo empezó porque un día de 1492 un tipo con tres barcos decidió no quedarse en casa."
  { file: 'v3_4_21.jpg', startSec: 261.28 },  // "¿Cuál de los cuatro escenarios te hubiese gustado más?"
  { file: 'v3_4_24.jpg', startSec: 264.28 },  // "Dímelo en comentarios."
  { file: 'v3_4_25.jpg', startSec: 265.1 },  // "Y si te ha volado la cabeza, suscríbete."
];




// === FRAMES:END ===

// SFX/ambiente: capa superpuesta a la narración (generada con scripts/generate_sfx.py,
// ElevenLabs Sound Generation — receta en channel/.../colon-america/sfx.json).
// startSec/volume en la RECETA original (1.0x); el offset real en pantalla se recalcula
// abajo dividiendo por PLAYBACK_RATE, igual que con FRAMES.
// { file, startSec, volume } — vive en remotion/public/colon-america-sfx/.
const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'dock_night.mp3', startSec: 0.0, volume: 0.09 },
  { file: 'wind_gust.mp3', startSec: 5.8, volume: 0.1 },
  { file: 'coin_shine.mp3', startSec: 11.64, volume: 0.12 },
  { file: 'parchment_rustle.mp3', startSec: 16.32, volume: 0.1 },
  { file: 'whoosh_transition.mp3', startSec: 21.04, volume: 0.12 },
  { file: 'low_drone_hit.mp3', startSec: 25.88, volume: 0.12 },
  { file: 'crowd_murmur.mp3', startSec: 29.94, volume: 0.09 },
  { file: 'comedic_boing.mp3', startSec: 35.54, volume: 0.13 },
  { file: 'wave_wash.mp3', startSec: 37.34, volume: 0.11 },
  { file: 'small_pop.mp3', startSec: 42.44, volume: 0.11 },
  { file: 'eraser_swipe.mp3', startSec: 43.64, volume: 0.13 },
  { file: 'wind_gust.mp3', startSec: 47.26, volume: 0.1 },
  { file: 'low_drone_hit.mp3', startSec: 51.38, volume: 0.1 },
  { file: 'stone_thud.mp3', startSec: 55.64, volume: 0.12 },
  { file: 'footsteps_light.mp3', startSec: 60.64, volume: 0.09 },
  { file: 'jungle_ambience.mp3', startSec: 66.68, volume: 0.1 },
  { file: 'low_drone_hit.mp3', startSec: 76.14, volume: 0.11 },
  { file: 'wave_wash.mp3', startSec: 80.04, volume: 0.11 },
  { file: 'sword_clash.mp3', startSec: 86.0, volume: 0.13 },
  { file: 'whoosh_transition.mp3', startSec: 89.92, volume: 0.12 },
  { file: 'realization_chime.mp3', startSec: 94.3, volume: 0.12 },
  { file: 'small_pop.mp3', startSec: 106.14, volume: 0.11 },
  { file: 'comedic_boing.mp3', startSec: 111.26, volume: 0.13 },
  { file: 'crowd_murmur.mp3', startSec: 113.52, volume: 0.09 },
  { file: 'small_pop.mp3', startSec: 118.44, volume: 0.11 },
  { file: 'ocean_storm.mp3', startSec: 120.44, volume: 0.12 },
  { file: 'horn_fanfare.mp3', startSec: 125.18, volume: 0.13 },
  { file: 'parchment_rustle.mp3', startSec: 131.08, volume: 0.1 },
  { file: 'whoosh_transition.mp3', startSec: 138.82, volume: 0.11 },
  { file: 'gong_hit.mp3', startSec: 144.44, volume: 0.11 },
  { file: 'wave_wash.mp3', startSec: 146.98, volume: 0.11 },
  { file: 'metal_clink.mp3', startSec: 153.54, volume: 0.13 },
  { file: 'gong_hit.mp3', startSec: 156.4, volume: 0.11 },
  { file: 'tense_sting.mp3', startSec: 160.14, volume: 0.12 },
  { file: 'gate_slam.mp3', startSec: 164.76, volume: 0.14 },
  { file: 'treasure_fade.mp3', startSec: 167.36, volume: 0.13 },
  { file: 'low_drone_hit.mp3', startSec: 170.28, volume: 0.11 },
  { file: 'clock_tick.mp3', startSec: 174.58, volume: 0.09 },
  { file: 'sword_clash.mp3', startSec: 181.2, volume: 0.13 },
  { file: 'gate_slam.mp3', startSec: 186.84, volume: 0.13 },
  { file: 'low_drone_hit.mp3', startSec: 189.26, volume: 0.11 },
  { file: 'dramatic_reveal.mp3', startSec: 192.84, volume: 0.2 },
  { file: 'whoosh_transition.mp3', startSec: 197.2, volume: 0.11 },
  { file: 'parchment_rustle.mp3', startSec: 204.14, volume: 0.1 },
  { file: 'stamp_thud.mp3', startSec: 207.14, volume: 0.14 },
  { file: 'footsteps_light.mp3', startSec: 213.54, volume: 0.09 },
  { file: 'realization_chime.mp3', startSec: 225.66, volume: 0.13 },
  { file: 'page_flip.mp3', startSec: 228.8, volume: 0.1 },
  { file: 'low_drone_hit.mp3', startSec: 238.82, volume: 0.11 },
  { file: 'coin_shine.mp3', startSec: 246.26, volume: 0.12 },
  { file: 'reverse_whoosh.mp3', startSec: 252.4, volume: 0.12 },
  { file: 'ship_helm.mp3', startSec: 254.7, volume: 0.11 },
  { file: 'curious_chime.mp3', startSec: 261.28, volume: 0.13 },
  { file: 'mind_blown.mp3', startSec: 265.1, volume: 0.18 },
  { file: 'subscribe_chime.mp3', startSec: 266.1, volume: 0.16 },
];

const MUSIC_FILE = 'background_theme.mp3';
const MUSIC_CLIP_SECONDS = 22;
const MUSIC_VOLUME = 0.09;

export const ColonAmerica: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;

  // Active image: last one whose startSec <= currentSec
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) {
    if (FRAMES[i].startSec <= currentSec) {
      activeIndex = i;
    } else {
      break;
    }
  }

  const activeFrame = FRAMES[activeIndex];

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('colon-america.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`colon-america-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio
            src={staticFile(`colon-america-sfx/${sfx.file}`)}
            volume={sfx.volume ?? 0.2}
            playbackRate={PLAYBACK_RATE}
          />
        </Sequence>
      ))}
      <Img
        src={staticFile(`colon-america/${activeFrame.file}`)}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </AbsoluteFill>
  );
};
