import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-es-la-computacion-cuantica - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Seguro que alguna vez te lo han contado así.
  { file: '0_02.jpg', startSec: 2.78 },  // Un ordenador cuántico prueba todas las respuestas a la vez.
  { file: '0_06.jpg', startSec: 6.46 },  // Un labrinto con un millón de caminos.
  { file: '0_08.jpg', startSec: 8.94 },  // Y la máquina lo recorre todos en el mismo instante.
  { file: '0_12.jpg', startSec: 12.48 },  // Suena increíble. Y es justo la explicación que más confunde.
  { file: '0_16.jpg', startSec: 16.92 },  // Porque un ordenador cuántico funciona de una manera muy distinta.
  { file: '0_20.jpg', startSec: 20.76 },  // Aún así esta máquina podría romper un día el candado que protege tus compras por Internet.
  { file: '0_26.jpg', startSec: 26.38 },  // Y al mismo tiempo tu portátil y tus juegos van a seguir exactamente igual.
  { file: '0_30.jpg', startSec: 30.94 },  // Hoy vas a entender qué es de verdad la computación cuántica.
  { file: '0_34.jpg', startSec: 34.66 },  // ¿Para qué sirve? ¿Y qué parte es puro humo?
  { file: '0_37.jpg', startSec: 37.86 },  // Quitemos el humo. Empecemos por lo que ya conoces.
  { file: '0_41.jpg', startSec: 41.56 },  // Tu móvil, tu portátil, tu consola.
  { file: '0_44.jpg', startSec: 44.46 },  // Por dentro todos hablan el mismo idioma, cero si unos.
  { file: '0_48.jpg', startSec: 48.2 },  // Cada cero o cada uno se llama BIT. Es como un interruptor que puede estar apagado o encendido.
  { file: '0_54.jpg', startSec: 54.2 },  // Tu procesador tiene miles de millones de esos interruptores diminutos.
  { file: '0_57.jpg', startSec: 57.98 },  // Se llaman transistores. Un ordenador cuántico cambia justo esa pieza, el interruptor.
  { file: '1_03.jpg', startSec: 63.98 },  // En lugar de BIT usa CUBITS, BITS cuanticos.
  { file: '1_08.jpg', startSec: 68.14 },  // Y aquí es donde suele aparecer el humo.
  { file: '1_10.jpg', startSec: 70.92 },  // Te dirán que un CUBIT es cero y uno a la vez.
  { file: '1_13.jpg', startSec: 73.7 },  // Y de ahí saltan al laberinto. Si es todo a la vez entonces lo prueba todo a la vez.
  { file: '1_19.jpg', startSec: 79.34 },  // Quitemos el humo. Un CUBIT puede estar en una mezcla de cero y de uno.
  { file: '1_24.jpg', startSec: 84.06 },  // Eso se llama superposición. Pero esa mezcla tiene sus proporciones.
  { file: '1_28.jpg', startSec: 88.44 },  // Un poco más de cero o un poco más de uno.
  { file: '1_31.jpg', startSec: 91.42 },  // Los físicos llaman amplitudes a esas proporciones.
  { file: '1_34.jpg', startSec: 94.84 },  // Piense en ellas como el peso de cada opción.
  { file: '1_37.jpg', startSec: 97.54 },  // Cuando miras el CUBIT, la mezcla desaparece.
  { file: '1_40.jpg', startSec: 100.32 },  // Medir un CUBIT siempre da un único resultado.
  { file: '1_43.jpg', startSec: 103.22 },  // O un cero o un uno. ¿Cuál sale depende de esas amplitudes?
  { file: '1_47.jpg', startSec: 107.34 },  // ¿Cuánto más peso tiene una opción más fáciles que salga?
  { file: '1_51.jpg', startSec: 111.94 },  // Imagina una máquina que de verdad calculara todas las respuestas del laberinto a la vez.
  { file: '1_57.jpg', startSec: 117.12 },  // Al mirarla te daría una sola respuesta al azar.
  { file: '1_59.jpg', startSec: 119.94 },  // Eso te serviría de muy poco. Entonces, ¿cuál es el truco de verdad?
  { file: '2_05.jpg', startSec: 125.2 },  // El truco se llama interferencia.
  { file: '2_08.jpg', startSec: 128.24 },  // Piense en un estanque. Tiras dos piedras y cada una hace sus ondas.
  { file: '2_11.jpg', startSec: 131.84 },  // Donde se juntan dos crestas, el agua sube más.
  { file: '2_15.jpg', startSec: 135.48 },  // Las ondas se suman y donde una cresta coincide con un valle, el agua se queda plana.
  { file: '2_20.jpg', startSec: 140.54 },  // Las ondas se anulan. Las amplitudes de los CUBITs hacen algo parecido.
  { file: '2_25.jpg', startSec: 145.2 },  // Se pueden sumar y se pueden anular.
  { file: '2_28.jpg', startSec: 148.0 },  // Un algoritmo cuántico es una receta para organizar esas ondas.
  { file: '2_32.jpg', startSec: 152.36 },  // Está diseñado para que los caminos que llevan a respuestas equivocadas se anulan entre
  { file: '2_36.jpg', startSec: 156.86 },  // sí. Y para que los caminos hacia la respuesta correcta se sumen y se hagan más fuertes.
  { file: '2_42.jpg', startSec: 162.76 },  // Así cuando, por fin mides, es muy probable que salga la buena.
  { file: '2_46.jpg', startSec: 166.8 },  // Pero esa receta solo existe para algunos problemas muy concretos.
  { file: '2_50.jpg', startSec: 170.74 },  // Por eso lo del laberinto es humo.
  { file: '2_53.jpg', startSec: 173.0 },  // La máquina juega con ondas para que gane la respuesta buena.
  { file: '2_56.jpg', startSec: 176.98 },  // Hay otra palabra que siempre aparece, entre el azamiento.
  { file: '3_01.jpg', startSec: 181.0 },  // Dos CUBITs entre el azados quedan conectados.
  { file: '3_03.jpg', startSec: 183.72 },  // Hay que describir los juntos.
  { file: '3_05.jpg', startSec: 185.82 },  // Al medir uno ya sabes algo sobre el resultado del otro, aunque estén muy separados.
  { file: '3_11.jpg', startSec: 191.14 },  // Quitemos el humo. El entrelazamiento es incapaz de enviar mensajes más rápido que la luz.
  { file: '3_17.jpg', startSec: 197.08 },  // El resultado que te sale al medir es al azar, nadie puede elegirlo.
  { file: '3_21.jpg', startSec: 201.5 },  // Así que es imposible usarlo para mandar información a distancia.
  { file: '3_25.jpg', startSec: 205.68 },  // ¿Para qué sirve entonces? Para que muchos CUBITs trabajen como una sola pieza.
  { file: '3_31.jpg', startSec: 211.2 },  // Ahora bien el problema gordo. Los CUBITs son increíblemente frágiles.
  { file: '3_36.jpg', startSec: 216.18 },  // Esa mezcla de cero y de uno solo aguanta mientras nada la toca.
  { file: '3_40.jpg', startSec: 220.14 },  // Un poco de calor, una vibración, una onda de radio que pasa cerca.
  { file: '3_44.jpg', startSec: 224.66 },  // En cuanto el entorno se entera del estado del CUBIT, la mezcla se estropea.
  { file: '3_49.jpg', startSec: 229.56 },  // Eso se llama de coherencia y es el gran enemigo de la computación cuántica.
  { file: '3_54.jpg', startSec: 234.82 },  // Y cómo se protege al cotán delicado?
  { file: '3_58.jpg', startSec: 238.0 },  // Confrío, muchísimo frío.
  { file: '4_00.jpg', startSec: 240.32 },  // Muchos ordenadores cuánticos viven dentro de unos aparatos llamados refrigeradores de dilución.
  { file: '4_06.jpg', startSec: 246.4 },  // Esa especie del amparadorada colgando del techo que salen las fotos es justo su interior.
  { file: '4_12.jpg', startSec: 252.34 },  // El cero absoluto está a unos 273 grados bajo cero.
  { file: '4_16.jpg', startSec: 256.62 },  // Es la temperatura más baja posible.
  { file: '4_19.jpg', startSec: 259.56 },  // Dentro de estos aparatos, el chip se queda apenas unas centésimas de grado de ese límite.
  { file: '4_25.jpg', startSec: 265.34 },  // Eso es más frío que el espacio exterior.
  { file: '4_27.jpg', startSec: 267.94 },  // Aún así los CUBIT se equivocan y muchísimo más que los transistores de tu móvil.
  { file: '4_33.jpg', startSec: 273.2 },  // La solución se llama Corrección de Errores.
  { file: '4_36.jpg', startSec: 276.02 },  // La idea es sencilla.
  { file: '4_37.jpg', startSec: 277.48 },  // En lugar de fiarte de un solo CUBIT repartes la información entre muchos.
  { file: '4_42.jpg', startSec: 282.14 },  // Si uno se estropea, los demás permiten detectarlo y arreglarlo.
  { file: '4_46.jpg', startSec: 286.3 },  // A ese grupo que trabaja como uno solo se le llama CUBIT lógico y a cada pieza CUBIT físico.
  { file: '4_52.jpg', startSec: 292.78 },  // El problema es la proporción.
  { file: '4_55.jpg', startSec: 295.52 },  // Para un solo CUBIT lógico fiable pueden hacer falta cientos o incluso miles de CUBIT físicos.
  { file: '5_01.jpg', startSec: 301.18 },  // Hoy las máquinas tienen desde decenas hasta alrededor de mil CUBIT físicos.
  { file: '5_06.jpg', startSec: 306.34 },  // Suena mucho, pero en CUBIT lógicos fiables eso da para muy poquito.
  { file: '5_11.jpg', startSec: 311.68 },  // Quitemos el humo.
  { file: '5_12.jpg', startSec: 312.98 },  // Cuando leas que una máquina tiene tantos CUBIT, pregúntate siempre de qué tipo son.
  { file: '5_17.jpg', startSec: 317.98 },  // Vamos con el titular más famoso, año 2019.
  { file: '5_21.jpg', startSec: 321.58 },  // Google anunció que su chip, sí camor, había logrado la supremacía cuántica.
  { file: '5_26.jpg', startSec: 326.32 },  // Según Google, su chip tardó unos 200 segundos y calcularon que el mejor superordenador tardaría unos 10.000 añ
  { file: '5_34.jpg', startSec: 334.04 },  // Pero la tarea era un problema muy concreto diseñado casi a medida para esa máquina.
  { file: '5_39.jpg', startSec: 339.02 },  // Másicamente sacar números al azar con un patrón especial.
  { file: '5_42.jpg', startSec: 342.3 },  // Algo que nadie necesitaba para nada práctico.
  { file: '5_45.jpg', startSec: 345.36 },  // Y lo de los 10.000 años se discutió mucho.
  { file: '5_48.jpg', startSec: 348.14 },  // IBM respondió enseguida que con un método mejor bastarían unos pocos días.
  { file: '5_53.jpg', startSec: 353.0 },  // Quitemos el humo. Fue un hito real, pero la carrera que ganó era muy rara.
  { file: '5_58.jpg', startSec: 358.84 },  // Entonces, ¿para qué sirve de verdad?
  { file: '6_01.jpg', startSec: 361.62 },  // Lo más prometedor es simular la naturaleza.
  { file: '6_04.jpg', startSec: 364.38 },  // Las moléculas y los materiales siguen las reglas de la física cuántica
  { file: '6_07.jpg', startSec: 367.62 },  // y un ordenador normal sufre muchísimo para imitarlas.
  { file: '6_11.jpg', startSec: 371.82 },  // Eso podría ayudar a diseñar medicamentos, materías mejores o materiales nuevos.
  { file: '6_16.jpg', startSec: 376.8 },  // También se investiga para algunos problemas de optimización
  { file: '6_19.jpg', startSec: 379.88 },  // como organizar rutas o repartir recursos,
  { file: '6_23.jpg', startSec: 383.02 },  // aunque ahí la ventaja todavía está por demostrar.
  { file: '6_26.jpg', startSec: 386.42 },  // Y luego está el uso que más miedoda, romper candados.
  { file: '6_30.jpg', startSec: 390.76 },  // Cuando compras por internet, tus datos viajan protegidos por un cifrado.
  { file: '6_34.jpg', startSec: 394.68 },  // Uno de los más usados se llama RSA.
  { file: '6_37.jpg', startSec: 397.74 },  // RSA se basa en algo muy difícil.
  { file: '6_40.jpg', startSec: 400.48 },  // Descomponer un número enorme en los dos números primos que lo forman.
  { file: '6_44.jpg', startSec: 404.68 },  // Multiplicar dos primos es fácil,
  { file: '6_46.jpg', startSec: 406.7 },  // hacer el camino de vuelta con números gigantes y evaría una eternidad.
  { file: '6_50.jpg', startSec: 410.8 },  // En 1994, un matemático llamado Peter Schor
  { file: '6_54.jpg', startSec: 414.34 },  // encontró un algoritmo cuántico que hace ese camino de vuelta muchísimo más rápido.
  { file: '6_59.jpg', startSec: 419.58 },  // En teoría, un ordenador cuántico grande y fiable podría romper RSA.
  { file: '7_04.jpg', startSec: 424.88 },  // Tranquilo, o en ninguna máquina se acerca,
  { file: '7_07.jpg', startSec: 427.7 },  // harían falta muchísimos COVID lógicos y eso es una montaña de COVID físicos.
  { file: '7_13.jpg', startSec: 433.26 },  // Entonces, por qué los gobiernos ya están preocupados.
  { file: '7_16.jpg', startSec: 436.7 },  // Porque alguien podría guardar hoy mensajes cifrados
  { file: '7_19.jpg', startSec: 439.28 },  // y esperar para descifrarlos dentro de unos años.
  { file: '7_22.jpg', startSec: 442.84 },  // Por eso ya existe la criptografía poscuántica,
  { file: '7_26.jpg', startSec: 446.0 },  // candados nuevos pensados para aguantar también a estas máquinas.
  { file: '7_29.jpg', startSec: 449.66 },  // En 2024, Estados Unidos publicó los primeros estándares oficiales de estos candados nuevos.
  { file: '7_36.jpg', startSec: 456.12 },  // Así que el candado de tus compras se está cambiando antes de que exista en ladrón.
  { file: '7_41.jpg', startSec: 461.04 },  // Ahora la otra cara, ¿para qué es una herramienta malísima?
  { file: '7_45.jpg', startSec: 465.38 },  // Escribir un documento, ver una serie, navegar por Internet,
  { file: '7_49.jpg', startSec: 469.1 },  // para eso un ordenador normal es muchísimo mejor.
  { file: '7_52.jpg', startSec: 472.62 },  // Y los videojuegos, igual de mal.
  { file: '7_55.jpg', startSec: 475.54 },  // Un juego necesitan millones de operaciones sencillas y rapidísimas
  { file: '7_59.jpg', startSec: 479.1 },  // y en eso tu tarjeta gráfica es invatible.
  { file: '8_02.jpg', startSec: 482.56 },  // Nadie va a tener uno en el escritorio. Tu portátil va a seguir siendo tu portátil.
  { file: '8_07.jpg', startSec: 487.98 },  // Entonces cuando llegará la máquina de verdad útil.
  { file: '8_11.jpg', startSec: 491.64 },  // La respuesta honesta es que nadie lo sabe con exactitud.
  { file: '8_15.jpg', startSec: 495.3 },  // El avance es real, cada año hay cubits mejores
  { file: '8_18.jpg', startSec: 498.06 },  // y la corrección de errores empieza a funcionar en los laboratorios.
  { file: '8_22.jpg', startSec: 502.26 },  // Pero una máquina grande que resuelva problemas útiles
  { file: '8_24.jpg', startSec: 504.96 },  // todavía está a años de distancia.
  { file: '8_28.jpg', startSec: 508.3 },  // Si alguien te promete que lo va a cambiar todo el año que viene,
  { file: '8_31.jpg', startSec: 511.6 },  // ya sabes lo que es. Humo.
  { file: '8_34.jpg', startSec: 514.56 },  // Así que volvamos al laberinto del principio.
  { file: '8_37.jpg', startSec: 517.64 },  // Recorrer todos los caminos a la vez es el mito.
  { file: '8_40.jpg', startSec: 520.7 },  // Lo que hace de verdad es jugar con ondas.
  { file: '8_43.jpg', startSec: 523.46 },  // Las respuestas malas se anulan y la buena se hace más fuerte.
  { file: '8_47.jpg', startSec: 527.58 },  // Algun día podría romper el candado de tus compras por Internet.
  { file: '8_51.jpg', startSec: 531.14 },  // Por eso ya se están cambiando esos candados.
  { file: '8_53.jpg', startSec: 533.68 },  // Y tu portátil y tus juegos van a seguir exactamente igual.
  { file: '8_57.jpg', startSec: 537.86 },  // Ya sabes que es la computación cuántica y ahora también sabes separarla del humo.
  { file: '9_02.jpg', startSec: 542.18 },  // Si te gusta entender cómo funciona de verdad la tecnología
  { file: '9_05.jpg', startSec: 545.38 },  // que usas cada día, suscríbete. Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'mystery_intro.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'maze_whoosh.mp3', startSec: 6.5, volume: 0.13 },
  { file: 'smoke_puff.mp3', startSec: 37.9, volume: 0.14 },
  { file: 'switch_click.mp3', startSec: 48.2, volume: 0.15 },
  { file: 'smoke_puff2.mp3', startSec: 79.3, volume: 0.14 },
  { file: 'coin_flip.mp3', startSec: 97.5, volume: 0.14 },
  { file: 'water_drop.mp3', startSec: 128.2, volume: 0.15 },
  { file: 'reveal_chime.mp3', startSec: 166.8, volume: 0.16 },
  { file: 'smoke_puff3.mp3', startSec: 191.1, volume: 0.14 },
  { file: 'glass_crack.mp3', startSec: 220.1, volume: 0.13 },
  { file: 'ice_freeze.mp3', startSec: 238.0, volume: 0.14 },
  { file: 'repair_click.mp3', startSec: 273.2, volume: 0.14 },
  { file: 'news_sting.mp3', startSec: 318.0, volume: 0.15 },
  { file: 'lock_break.mp3', startSec: 386.4, volume: 0.15 },
  { file: 'shield_up.mp3', startSec: 442.8, volume: 0.15 },
  { file: 'closing_turn.mp3', startSec: 514.6, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 542.2, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueEsLaComputacionCuantica: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-es-la-computacion-cuantica.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-es-la-computacion-cuantica-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-es-la-computacion-cuantica-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-es-la-computacion-cuantica/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
