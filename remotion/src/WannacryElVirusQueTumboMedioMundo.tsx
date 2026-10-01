import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// wannacry-el-virus-que-tumbo-medio-mundo - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // viernes por la mañana, un hospital de Londres, las pantallas de los ordenadores se vuelven rojas de golpe.
  { file: '0_05.jpg', startSec: 5.98 },  // Un mensaje dice que todos los archivos están bloqueados, y que para recuperarlos hay que pagar.
  { file: '0_12.jpg', startSec: 12.16 },  // En pocas horas pasa lo mismo en fábricas de coches, en estaciones de tren, en grandes empresas de España,
  { file: '0_18.jpg', startSec: 18.24 },  // más de 200 .000 ordenadores en unos 150 países, en un solo fin de semana.
  { file: '0_24.jpg', startSec: 24.12 },  // Y lo más loco es que todo eso se podía haber evitado con un botón que casi todo el mundo ignora.
  { file: '0_29.jpg', startSec: 29.66 },  // El parche ya existía.
  { file: '0_32.jpg', startSec: 32.02 },  // Y al final a este monstruo, lo frenó un chaval de 22 años, con unos 10 dólares.
  { file: '0_38.jpg', startSec: 38.08 },  // Hoy vas a ver qué fue Guanacrae, cómo funcionaba, y qué tiene que ver contigo.
  { file: '0_43.jpg', startSec: 43.0 },  // Empecemos por el nombre, Guanacrae es un ransomware.
  { file: '0_46.jpg', startSec: 46.32 },  // Un ransomware es un programa que se cuestra a tus archivos.
  { file: '0_49.jpg', startSec: 49.64 },  // No los roba, no los borra, los cifra.
  { file: '0_52.jpg', startSec: 52.96 },  // Cifrar es convertir tus fotos y tus documentos en un revoltijo que no se puede leer.
  { file: '0_57.jpg', startSec: 57.78 },  // Para devolverlos a la normalidad hace falta una llave, una clave secreta.
  { file: '1_02.jpg', startSec: 62.08 },  // Y esa llave solo la tienen los atacantes.
  { file: '1_04.jpg', startSec: 64.76 },  // Es como si alguien entrar a en tu casa y cambiar a la cerradura de todos los armarios.
  { file: '1_09.jpg', startSec: 69.16 },  // Tus cosas siguen ahí, las ves a través del cristal, pero no puedes abrir nada.
  { file: '1_14.jpg', startSec: 74.06 },  // Y en la puerta te deja una nota, si quieres la llave, paga.
  { file: '1_17.jpg', startSec: 77.88 },  // Eso es un ransomware, un secuestro digital.
  { file: '1_21.jpg', startSec: 81.06 },  // La nota de Guanacrae era muy clara.
  { file: '1_23.jpg', startSec: 83.08 },  // Pedía unos 300 dólares y los quería en Bitcoin.
  { file: '1_26.jpg', startSec: 86.7 },  // ¿Por qué Bitcoin? ¿Por qué es dinero digital que se puede mover sin pasar por un banco?
  { file: '1_31.jpg', startSec: 91.62 },  // Y eso hace mucho más difícil seguir la pista de quién lo cobra.
  { file: '1_35.jpg', startSec: 95.42 },  // Además había una cuenta atrás en la pantalla.
  { file: '1_37.jpg', startSec: 97.88 },  // Si no pagabas en tres días, el precio subía 600 dólares.
  { file: '1_41.jpg', startSec: 101.84 },  // Y si pasaba una semana, la amenaza era que tus archivos se perderían para siempre.
  { file: '1_46.jpg', startSec: 106.42 },  // Hasta aquí es un ransomware bastante normal.
  { file: '1_48.jpg', startSec: 108.9 },  // Había muchos antes que él.
  { file: '1_50.jpg', startSec: 110.74 },  // Pero Guanacrae tenía algo que lo hacían muchísimo más peligroso.
  { file: '1_54.jpg', startSec: 114.82 },  // No necesitaba que nadie hiciera click en nada.
  { file: '1_57.jpg', startSec: 117.68 },  // La mayoría de virus necesitan tu ayuda, abres un archivo raro, pinchas en un enlace y entran.
  { file: '2_03.jpg', startSec: 123.8 },  // Guanacrae era un gusano, saltaba solo de un ordenador a otro.
  { file: '2_07.jpg', startSec: 127.76 },  // En cuanto infectaba un equipo, se ponía a buscar otros ordenadores cercanos en la misma red.
  { file: '2_12.jpg', startSec: 132.72 },  // Y también probaba con ordenadores al azar de todo Internet.
  { file: '2_16.jpg', startSec: 136.16 },  // Si encontraba un ogulnerable, se colaba dentro.
  { file: '2_19.jpg', startSec: 139.02 },  // Y ese nuevo equipo empezaba a buscar otros.
  { file: '2_21.jpg', startSec: 141.84 },  // Uno infecta a dos. Dos infectan a cuatro.
  { file: '2_24.jpg', startSec: 144.76 },  // Cuatro infectan a ocho.
  { file: '2_26.jpg', startSec: 146.58 },  // Por eso, en una oficina bastaba un solo ordenador para que cayera la planta entera.
  { file: '2_31.jpg', startSec: 151.28 },  // Y cómo conseguía colarse sin que nadie hiciera nada?
  { file: '2_34.jpg', startSec: 154.48 },  // Por una puerta trasera de Windows.
  { file: '2_36.jpg', startSec: 156.68 },  // Windows tiene un sistema para compartir archivos e impresoras entre ordenadores de una misma red.
  { file: '2_41.jpg', startSec: 161.72 },  // Es como una puerta de servicio que usan los equipos para hablar entre ellos.
  { file: '2_45.jpg', startSec: 165.86 },  // Y esa puerta tenía un fallo, con un mensaje preparado de una forma muy concreta alguien de fuera podía entrar.
  { file: '2_52.jpg', startSec: 172.44 },  // Ese fallo tenía nombre, lo llamaban Eternal Blue.
  { file: '2_56.jpg', startSec: 176.04 },  // Y aquí la historia se pone todavía más rara.
  { file: '2_58.jpg', startSec: 178.98 },  // Eternal Blue no lo inventaron unos delincuentes.
  { file: '3_01.jpg', startSec: 181.72 },  // Lo había desarrollado la NSA, la agencia de espionaje de Estados Unidos.
  { file: '3_06.jpg', startSec: 186.88 },  // La NSA guardaba fallos como este en secreto, como herramientas para espiar.
  { file: '3_11.jpg', startSec: 191.64 },  // Pero en 2017 un grupo que se hacía llamar De Shadow Brokers publicó en internet un montón de esas herramientas
  { file: '3_18.jpg', startSec: 198.42 },  // Nadie sabe con certeza quién estaba detrás de ese grupo.
  { file: '3_22.jpg', startSec: 202.04 },  // De repente, cualquiera podía descargar un arma que había diseñado una agencia de espionaje.
  { file: '3_27.jpg', startSec: 207.36 },  // Ahora viene la parte más importante de toda la historia.
  { file: '3_30.jpg', startSec: 210.52 },  // En marzo de 2017, Microsoft ya había publicado un parche que cerraba esa puerta.
  { file: '3_35.jpg', startSec: 215.52 },  // Se llamaba MES 17 -010.
  { file: '3_38.jpg', startSec: 218.3 },  // Era una actualización normal de Windows.
  { file: '3_40.jpg', startSec: 220.82 },  // Llegó dos meses antes del ataque. El parche ya existía.
  { file: '3_44.jpg', startSec: 224.78 },  // Los ordenadores que habían instalado esa actualización estaban a salvo, Guanacra y rebotaba contra ellos.
  { file: '3_50.jpg', startSec: 230.94 },  // Las víctimas fueron los equipos que no se habían actualizado.
  { file: '3_54.jpg', startSec: 234.32 },  // La mayoría eran ordenadores con Windows 7 que no se habían actualizado.
  { file: '3_58.jpg', startSec: 238.4 },  // Y había otros todavía peores, ordenadores con Windows XP.
  { file: '4_02.jpg', startSec: 242.72 },  // Windows XP era tan viejo que Microsoft ya ni siquiera le daba soporte, no recibía parches.
  { file: '4_08.jpg', startSec: 248.62 },  // Así que el fin de semana del ataque, Microsoft hizo algo muy poco habitual. Publicó un parche de emergencia ta
  { file: '4_18.jpg', startSec: 258.18 },  // Vamos a ver qué pasó a que el viernes 12 de mayo de 2017.
  { file: '4_22.jpg', startSec: 262.44 },  // En España, Telefónica fue de las primeras víctimas conocidas.
  { file: '4_25.jpg', startSec: 265.94 },  // Por la mañana en sus oficinas se pidió a los empleados que apagaran los ordenadores.
  { file: '4_29.jpg', startSec: 269.98 },  // Y la noticia corrió enseguida.
  { file: '4_32.jpg', startSec: 272.08 },  // Si le pasaba una empresa, así le podía pasar a cualquiera.
  { file: '4_35.jpg', startSec: 275.68 },  // En Reino Unido el golpe fue mucho más duro. Cayeron ordenadores de muchos hospitales de la sanidad pública,
  { file: '4_41.jpg', startSec: 281.7 },  // se cancelaron miles de citas, se aplazaron operaciones.
  { file: '4_45.jpg', startSec: 285.36 },  // Algunas urgencias tuvieron que desviar ambulancias a otros hospitales.
  { file: '4_49.jpg', startSec: 289.32 },  // En Francia separaba una fábrica de renoll en Reino Unido, una de Nissan.
  { file: '4_53.jpg', startSec: 293.86 },  // Hubo empresas de mensajería, estaciones de tren, universidades ministerios.
  { file: '4_58.jpg', startSec: 298.78 },  // En pocas horas, el mapa del mundo se llenó de punto rojos.
  { file: '5_02.jpg', startSec: 302.56 },  // Y parecía que nada podía pararlo, hasta que apareció un chaval de 22 años.
  { file: '5_07.jpg', startSec: 307.5 },  // Se llamaba Marcos Hachins, un investigador de seguridad británico que en internet se hacía llamar Malguerteche
  { file: '5_14.jpg', startSec: 314.42 },  // Aquel día estaba de vacaciones, pero se puso a mirar una copia del virus.
  { file: '5_18.jpg', startSec: 318.32 },  // Dentro del código encontró algo muy raro, una dirección web larguísima, una ristra de letras incentido.
  { file: '5_24.jpg', startSec: 324.76 },  // El virus intentaba conectarse a esa dirección antes de hacer nada.
  { file: '5_28.jpg', startSec: 328.4 },  // Y esa dirección no existía, nadie la había registrado.
  { file: '5_32.jpg', startSec: 332.36 },  // Hachins la compró, le costó unos 10 dólares.
  { file: '5_35.jpg', startSec: 335.32 },  // En realidad no quería parar nada, solo quería medir cuántos ordenadores estaban infectados,
  { file: '5_40.jpg', startSec: 340.4 },  // pero en cuanto esa web empezó a funcionar, el virus dejó de propagarse.
  { file: '5_44.jpg', startSec: 344.54 },  // Resulta que Guanacrae tenía un interruptor de apagado escondido.
  { file: '5_48.jpg', startSec: 348.24 },  // Si la web respondía, el virus se quedaba quieto, si no respondía, atacaba.
  { file: '5_52.jpg', startSec: 352.74 },  // Al registrarla, Hachins había pulsado ese interruptor para todo el mundo.
  { file: '5_56.jpg', startSec: 356.84 },  // 10 dólares frenaron un ataque que ya estaba costando millones.
  { file: '6_00.jpg', startSec: 360.84 },  // Ojo, eso no lo arregló todo.
  { file: '6_03.jpg', startSec: 363.12 },  // Los ordenadores que ya estaban cifrados siguieron cifrados, y el interruptor solo servía para esa versión del 
  { file: '6_09.jpg', startSec: 369.38 },  // Pronto aparecieron copia sin él, pero le dio al mundo algo que necesitaba muchísimo.
  { file: '6_14.jpg', startSec: 374.22 },  // Tiempo. Tiempo para que millones de ordenadores instalaran el parche,
  { file: '6_18.jpg', startSec: 378.54 },  // el mismo parche que ya existía desde hacía dos meses.
  { file: '6_21.jpg', startSec: 381.8 },  // Y quién estaba detrás de todo esto?
  { file: '6_24.jpg', startSec: 384.18 },  // Meses después, Estados inutos y Reino Unidos señalaron al mismo responsable, Corea del Norte.
  { file: '6_29.jpg', startSec: 389.8 },  // En concreto, a un grupo de hackers conocido como Lazarus.
  { file: '6_33.jpg', startSec: 393.08 },  // Los daños se calcularon en miles de millones de dólares por ordenadores parados, por trabajo perdido, por hosp
  { file: '6_40.jpg', startSec: 400.32 },  // Y aquí va el giro final.
  { file: '6_42.jpg', startSec: 402.36 },  // Con los rescates, los atacantes ganaron muy poco,
  { file: '6_45.jpg', startSec: 405.16 },  // pagó muy poca gente y muchos de los que pagaron ni siquiera recuperaron sus archivos.
  { file: '6_50.jpg', startSec: 410.0 },  // Un ataque que costó una fortuna al mundo y casi no dio dinero a quien lo lanzó.
  { file: '6_54.jpg', startSec: 414.52 },  // Ahora la pregunta que importa, que tiene que ver todo esto contigo.
  { file: '6_58.jpg', startSec: 418.56 },  // Primera lección. Actualiza tus dispositivos.
  { file: '7_01.jpg', startSec: 421.66 },  // Esa viso de actualización que siempre dejas para mañana muchas veces cierra una puerta como la de Eternal Blue
  { file: '7_07.jpg', startSec: 427.72 },  // El parche ya existía, sólo había que instalarlo.
  { file: '7_11.jpg', startSec: 431.02 },  // Segunda lección. Haz copias de seguridad.
  { file: '7_14.jpg', startSec: 434.02 },  // Guarda tus archivos importantes también fuera del ordenador, en un disco externo o en la nube.
  { file: '7_19.jpg', startSec: 439.34 },  // Si un razon huerte cifra todo y tienes una copia, no hay secuestro. Borras y recuperas.
  { file: '7_25.jpg', startSec: 445.24 },  // Tercera lección. Notecíes de los sistemas viejos.
  { file: '7_28.jpg', startSec: 448.58 },  // Un ordenador o un móvil que ya no recibe actualizaciones es una casa con una puerta que nadie va a volver a ce
  { file: '7_34.jpg', startSec: 454.94 },  // Y una última cosa. Pagar no te garantiza nada y además financia al siguiente ataque.
  { file: '7_40.jpg', startSec: 460.78 },  // Así que volvamos a aquel viernes a esas pantallas rojas.
  { file: '7_44.jpg', startSec: 464.54 },  // Un fallo guardado en secreto por una agencia de espionaje,
  { file: '7_47.jpg', startSec: 467.78 },  // robado, publicado en internet. Un gusano que saltaba sólo de ordenador en ordenador, hospitales, fábricas,
  { file: '7_54.jpg', startSec: 474.32 },  // empresas enteras paradas.
  { file: '7_56.jpg', startSec: 476.24 },  // Y un chaval de 22 años que con 10 dólares pulso el botón de apagado.
  { file: '8_00.jpg', startSec: 480.84 },  // Pero el botón que de verdad lo habría evitado era mucho más sencillo.
  { file: '8_05.jpg', startSec: 485.04 },  // Actualizar. El parche ya existía.
  { file: '8_08.jpg', startSec: 488.04 },  // La próxima vez que tu móvil te pida actualizar ya sabes lo que te juegas. Si te gusta entender cómo funciona d
  { file: '8_17.jpg', startSec: 497.04 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'alarm_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 29.7, volume: 0.15 },
  { file: 'lock_click.mp3', startSec: 49.6, volume: 0.16 },
  { file: 'coin_drop.mp3', startSec: 81.1, volume: 0.15 },
  { file: 'countdown_tick.mp3', startSec: 95.4, volume: 0.14 },
  { file: 'worm_squish.mp3', startSec: 123.8, volume: 0.13 },
  { file: 'multiply_pop.mp3', startSec: 141.8, volume: 0.14 },
  { file: 'door_creak.mp3', startSec: 172.4, volume: 0.14 },
  { file: 'spy_sting.mp3', startSec: 181.7, volume: 0.15 },
  { file: 'success_chime.mp3', startSec: 220.8, volume: 0.14 },
  { file: 'siren.mp3', startSec: 258.2, volume: 0.13 },
  { file: 'hero_sting.mp3', startSec: 302.6, volume: 0.16 },
  { file: 'switch_click.mp3', startSec: 344.5, volume: 0.16 },
  { file: 'mystery_tone.mp3', startSec: 381.8, volume: 0.14 },
  { file: 'lesson_ding.mp3', startSec: 418.6, volume: 0.15 },
  { file: 'closing_turn.mp3', startSec: 460.8, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 488.0, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const WannacryElVirusQueTumboMedioMundo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('wannacry-el-virus-que-tumbo-medio-mundo.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`wannacry-el-virus-que-tumbo-medio-mundo-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`wannacry-el-virus-que-tumbo-medio-mundo-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`wannacry-el-virus-que-tumbo-medio-mundo/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
