import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// que-hay-dentro-de-un-procesador - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Ahora mismo, dentro del aparato con el que ves este vídeo, está pasando algo increíble.
  { file: '0_05.jpg', startSec: 5.5 },  // Miles de millones de interruptores de minutos se encienden y se apagan,
  { file: '0_09.jpg', startSec: 9.12 },  // miles de millones de veces por segundo.
  { file: '0_11.jpg', startSec: 11.64 },  // Y lo más sorprendente es que eso es todo.
  { file: '0_14.jpg', startSec: 14.58 },  // No hay nada más.
  { file: '0_15.jpg', startSec: 15.66 },  // Cada foto, cada mensaje y cada respuesta de una inteligencia artificial, salen de ahí.
  { file: '0_21.jpg', startSec: 21.02 },  // Hoy vas a entender cómo unos simples interruptores consiguen pensar,
  { file: '0_24.jpg', startSec: 24.74 },  // y cabe en algo más pequeño que un sello.
  { file: '0_27.jpg', startSec: 27.98 },  // Empecemos por la pieza más pequeña.
  { file: '0_29.jpg', startSec: 29.6 },  // El transistor.
  { file: '0_31.jpg', startSec: 31.08 },  // Un transistor es un interruptor sin partes móviles, no tiene palanca,
  { file: '0_35.jpg', startSec: 35.36 },  // se enciende y se apaga con electricidad.
  { file: '0_38.jpg', startSec: 38.16 },  // Si le llega a una pequeña señal, deja pasar la corriente,
  { file: '0_41.jpg', startSec: 41.36 },  // si no le llega la corta, encendido o apagado.
  { file: '0_44.jpg', startSec: 44.64 },  // Y aquí está la clave de todo.
  { file: '0_46.jpg', startSec: 46.94 },  // Encendido significa uno.
  { file: '0_48.jpg', startSec: 48.84 },  // Apagado significa cero.
  { file: '0_51.jpg', startSec: 51.0 },  // Con solo dos símbolos puedes escribir cualquier número, es el sistema binario.
  { file: '0_56.jpg', startSec: 56.04 },  // El cinco, por ejemplo, se escribe uno, cero, uno.
  { file: '0_59.jpg', startSec: 59.64 },  // Y con suficientes unos y ceros puede representar letras, colores, sonidos, cualquier cosa.
  { file: '1_05.jpg', startSec: 65.96 },  // A cada uno de esos unos y ceros se le llama bit.
  { file: '1_08.jpg', startSec: 68.82 },  // Y ocho bits juntos forman un byte.
  { file: '1_11.jpg', startSec: 71.02 },  // Esa palabra que ves cada vez que miras cuánto ocupa un archivo.
  { file: '1_15.jpg', startSec: 75.08 },  // El problema es que un solo interruptor no sirve de mucho, necesitas muchísimos.
  { file: '1_20.jpg', startSec: 80.0 },  // ¿Cuántos? Aquí la historia da vértigo.
  { file: '1_23.jpg', startSec: 83.2 },  // Los primeros ordenadores usaban bálbulas de vacío, unos tubos de cristal del tamaño de una bombilla.
  { file: '1_28.jpg', startSec: 88.84 },  // El famoso Eniac tenía casi 18.000 y ocupaba una sala entera.
  { file: '1_34.jpg', startSec: 94.04 },  // En 1947 se inventó el transistor y todo cambió.
  { file: '1_38.jpg', startSec: 98.26 },  // Era más pequeño, gastaba menos y no se fundía.
  { file: '1_41.jpg', startSec: 101.94 },  // En 1971, Intel lanzó el 4.04, el primer microprocesador comercial,
  { file: '1_47.jpg', startSec: 107.84 },  // tenía 2.300 transistores.
  { file: '1_49.jpg', startSec: 109.8 },  // Hoy, el chip de un móvil moderno tiene más de 15.000 millones,
  { file: '1_54.jpg', startSec: 114.06 },  // y los chips que se usan para entrenar inteligencias artificiales superan los 80.000 millones.
  { file: '2_00.jpg', startSec: 120.0 },  // Todos en un trozo de silicio del tamaño de una uña.
  { file: '2_03.jpg', startSec: 123.7 },  // Vale, tenemos miles de millones de interruptores,
  { file: '2_06.jpg', startSec: 126.64 },  // pero ¿cómo se consigue que hagan algo útil?
  { file: '2_09.jpg', startSec: 129.62 },  // Juntándolos en grupos pequeños que se llaman puertas lógicas.
  { file: '2_13.jpg', startSec: 133.58 },  // Una puerta lógica es un circuito que mira sus entradas y decide que sale siguiendo una regla muy simple.
  { file: '2_19.jpg', startSec: 139.88 },  // La puerta y griega solo encién de la salida si las dos entradas están encendidas.
  { file: '2_24.jpg', startSec: 144.92 },  // Como una puerta con dos cerraduras, necesitas las dos llaves.
  { file: '2_28.jpg', startSec: 148.94 },  // La puerta O la enciende si hay al menos una encendida y la puerta no hace lo contrario de lo que le llega.
  { file: '2_35.jpg', startSec: 155.26 },  // Si entra un 1 sale un 0.
  { file: '2_37.jpg', startSec: 157.8 },  // Parece poca cosa, pero combinando unas pocas puertas,
  { file: '2_40.jpg', startSec: 160.86 },  // puedes construir un circuito que suma dos números en binario.
  { file: '2_44.jpg', startSec: 164.54 },  // Y si sabes sumar, puedes restar, multiplicar y comparar.
  { file: '2_48.jpg', startSec: 168.94 },  // Con esas operaciones se construye todo lo demás.
  { file: '2_52.jpg', startSec: 172.1 },  // Ahora vamos a abrir el procesador y para entenderlo imagina que es una cocina.
  { file: '2_57.jpg', startSec: 177.1 },  // El programa que ejecuta es una receta,
  { file: '2_59.jpg', startSec: 179.42 },  // una lista larguísima de pasos muy simples,
  { file: '3_01.jpg', startSec: 181.84 },  // escritos en unos y ceros.
  { file: '3_03.jpg', startSec: 183.92 },  // Cada paso se llama instrucción.
  { file: '3_06.jpg', startSec: 186.18 },  // Suma estos dos números, guarda este resultado.
  { file: '3_09.jpg', startSec: 189.28 },  // Si este valor es cero, salta a otro paso.
  { file: '3_12.jpg', startSec: 192.12 },  // Son órdenes tantísimas, ninguna por si sola es inteligente.
  { file: '3_15.jpg', startSec: 195.6 },  // La magia está en hacer muchísimas, muy deprisa.
  { file: '3_19.jpg', startSec: 199.78 },  // En esa cocina hay un jefe, se llama unidad de control.
  { file: '3_23.jpg', startSec: 203.66 },  // Su trabajo es leer la receta paso a paso y decirle a todo el mundo que tiene que hacer.
  { file: '3_29.jpg', startSec: 209.02 },  // Y lo hace siempre en el mismo ciclo de tres pasos, buscar, decodificar y ejecutar.
  { file: '3_34.jpg', startSec: 214.9 },  // Primero busca la siguiente instrucción en la memoria.
  { file: '3_38.jpg', startSec: 218.34 },  // Luego la decodifica, es decir, averigua qué significan esos unos y ceros.
  { file: '3_42.jpg', startSec: 222.52 },  // Y por último la ejecuta, activando las partes del chip que hacen falta.
  { file: '3_47.jpg', startSec: 227.28 },  // Cuando termina, vuelve a empezar con la siguiente.
  { file: '3_50.jpg', startSec: 230.0 },  // Buscar, decodificar, ejecutar, una y otra vez.
  { file: '3_54.jpg', startSec: 234.4 },  // Eso es, literalmente, lo que hace tu ordenador todo el día.
  { file: '3_58.jpg', startSec: 238.84 },  // ¿Y quién hace las cuentas? El cocinero.
  { file: '4_01.jpg', startSec: 241.6 },  // En el procesador se llama unidad aritmético lógica o alu.
  { file: '4_05.jpg', startSec: 245.58 },  // Es el circuito hecho de puertas lógicas que suma resta y compara.
  { file: '4_09.jpg', startSec: 249.08 },  // Recibe dos números, hace la operación y devuelve el resultado.
  { file: '4_13.jpg', startSec: 253.88 },  // Pero el cocinero necesita tener los ingredientes a mano y para eso están los registros.
  { file: '4_19.jpg', startSec: 259.52 },  // Los registros son la encimera.
  { file: '4_21.jpg', startSec: 261.84 },  // Unas poquísimas cajitas de memoria pegadas al alu, donde se guardan los números con los que se está trabajando
  { file: '4_28.jpg', startSec: 268.98 },  // Son lo más rápido que hay en el chip, pero caben muy pocas cosas, por eso hace falta algo más.
  { file: '4_34.jpg', startSec: 274.94 },  // Todo el programa y todos los datos viven en la memoria RAM
  { file: '4_38.jpg', startSec: 278.06 },  // y aquí aparece un problema enorme.
  { file: '4_40.jpg', startSec: 280.98 },  // Para el procesador ir a las rames como ir al supermercado cada vez que te falta un huevo.
  { file: '4_45.jpg', startSec: 285.8 },  // Mientras espera que llegue los datos, puede perder cientos de ciclos sin hacer nada.
  { file: '4_51.jpg', startSec: 291.16 },  // La solución es la caché.
  { file: '4_53.jpg', startSec: 293.22 },  // Una nevera dentro de la propia cocina, con lo que se usa más a menudo.
  { file: '4_57.jpg', startSec: 297.08 },  // Es una memoria pequeña pero rapidísima, construida dentro del procesador.
  { file: '5_01.jpg', startSec: 301.68 },  // Y suele haber varios niveles, cada uno más grande y un poco más lento que el anterior.
  { file: '5_05.jpg', startSec: 305.76 },  // Casi siempre, lo que el procesador necesita ya está en la nevera,
  { file: '5_10.jpg', startSec: 310.32 },  // y eso marca una diferencia brutal en la velocidad.
  { file: '5_13.jpg', startSec: 313.62 },  // Falta una pieza. ¿Quién decide cuándo se da cada paso?
  { file: '5_17.jpg', startSec: 317.96 },  // El reloj. Un circuito que emite pulsos como un metrónomo y en cada pulso todo el chip avanza un paso a la vez.
  { file: '5_25.jpg', startSec: 325.36 },  // Cuando lees que un procesador va a tres gigaercios,
  { file: '5_28.jpg', startSec: 328.54 },  // significa que su reloj marca 3.000 millones de pulsos por segundo.
  { file: '5_32.jpg', startSec: 332.3 },  // Para que te hagas una idea, en el tiempo que dura uno de esos pulsos,
  { file: '5_36.jpg', startSec: 336.82 },  // la luz solo avanza unos 10 centímetros.
  { file: '5_39.jpg', startSec: 339.6 },  // El 4.04 de Intel funcionaba a menos de un megaercio.
  { file: '5_43.jpg', startSec: 343.48 },  // Los procesadores de hoy van miles de veces más rápido.
  { file: '5_47.jpg', startSec: 347.0 },  // Pero durante años, subir la velocidad del reloj tenía un precio.
  { file: '5_51.jpg', startSec: 351.06 },  // Cuanto más rápido, más calor.
  { file: '5_53.jpg', startSec: 353.64 },  // Llego un momento en que seguir subiendo los gigaercios,
  { file: '5_56.jpg', startSec: 356.64 },  // habría hecho que los chips se calentaran demasiado.
  { file: '5_59.jpg', startSec: 359.52 },  // Así que los fabricantes cambiaron de estrategia,
  { file: '6_02.jpg', startSec: 362.44 },  // si no puedes tener un cocinero más rápido,
  { file: '6_04.jpg', startSec: 364.74 },  // pon varios cocineros.
  { file: '6_06.jpg', startSec: 366.78 },  // Cada cocinero completo, con su jefe, su halu y sus registros, se llama núcleo.
  { file: '6_12.jpg', startSec: 372.24 },  // Un móvil moderno suele tener entre 6 y 8 núcleos,
  { file: '6_15.jpg', startSec: 375.66 },  // un portátil potente más todavía.
  { file: '6_18.jpg', startSec: 378.16 },  // Y cada uno puede trabajar en una tarea distinta al mismo tiempo.
  { file: '6_22.jpg', startSec: 382.16 },  // Por eso puedes escuchar música, descargar un archivo y navegar a la vez sin que nada separe.
  { file: '6_27.jpg', startSec: 387.1 },  // Además, cada núcleo hace trampas muy inteligentes.
  { file: '6_31.jpg', startSec: 391.18 },  // Empieza la siguiente instrucción antes de terminarla anterior, como una cadena de montaje.
  { file: '6_36.jpg', startSec: 396.4 },  // Y cuando llega a un cruce en la receta, intenta adivinar que camino tocará para no quedarse esperando, casi si
  { file: '6_43.jpg', startSec: 403.92 },  // Y aquí es donde todo esto conecta con la inteligencia artificial.
  { file: '6_48.jpg', startSec: 408.42 },  // Un procesador normal, la CPU, tiene pocos núcleos, pero muy listos.
  { file: '6_52.jpg', startSec: 412.94 },  // Son chefs capaces de seguir cualquier receta por complicada que sea.
  { file: '6_57.jpg', startSec: 417.62 },  // Una inteligencia artificial en cambio necesita otra cosa.
  { file: '7_01.jpg', startSec: 421.38 },  // Necesita hacer millones de multiplicaciones sencillas, todas a la vez.
  { file: '7_06.jpg', startSec: 426.02 },  // Para eso, unos pocos chefs brillantes no bastan.
  { file: '7_09.jpg', startSec: 429.42 },  // Es como pedirles que pelen un millón de patatas.
  { file: '7_12.jpg', startSec: 432.4 },  // Por eso la IA usa tarjetas gráficas, las GPU.
  { file: '7_16.jpg', startSec: 436.52 },  // Tienen miles de núcleos más simples trabajando en paralelo.
  { file: '7_19.jpg', startSec: 439.54 },  // No es un chef genial, es un ejército de pinches.
  { file: '7_23.jpg', startSec: 443.4 },  // Pero por dentro la base es exactamente la misma, transistores, puertas lógicas, unos y ceros.
  { file: '7_30.jpg', startSec: 450.08 },  // Así que la próxima vez que abra su aplicación, piensa en lo que está pasando ahí dentro.
  { file: '7_35.jpg', startSec: 455.4 },  // Un reloj que marca miles de millones de pulsos por segundo.
  { file: '7_39.jpg', startSec: 459.06 },  // Una unidad de control que busca, de codifica y ejecutas sin descanso.
  { file: '7_44.jpg', startSec: 464.12 },  // Y debajo de todo, miles de millones de interruptores diminutos que sólo saben hacer una cosa.
  { file: '7_49.jpg', startSec: 469.38 },  // Encenderse y apagarse.
  { file: '7_51.jpg', startSec: 471.8 },  // Tu ordenador no piensa, enciende y apaga interruptores.
  { file: '7_55.jpg', startSec: 475.84 },  // Pero lo hace tan rápido que parece magia.
  { file: '7_59.jpg', startSec: 479.06 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '8_04.jpg', startSec: 484.24 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_curious.mp3', startSec: 0.0, volume: 0.14 },
  { file: 'switch_click.mp3', startSec: 29.6, volume: 0.16 },
  { file: 'binary_blips.mp3', startSec: 44.6, volume: 0.13 },
  { file: 'vertigo_whoosh.mp3', startSec: 80.0, volume: 0.14 },
  { file: 'reveal_chime.mp3', startSec: 109.8, volume: 0.16 },
  { file: 'logic_click.mp3', startSec: 129.6, volume: 0.14 },
  { file: 'kitchen_ding.mp3', startSec: 172.1, volume: 0.15 },
  { file: 'cycle_tick.mp3', startSec: 209.0, volume: 0.14 },
  { file: 'tense_wait.mp3', startSec: 281.0, volume: 0.13 },
  { file: 'fridge_open.mp3', startSec: 291.2, volume: 0.15 },
  { file: 'metronome.mp3', startSec: 318.0, volume: 0.15 },
  { file: 'heat_sizzle.mp3', startSec: 351.1, volume: 0.13 },
  { file: 'multiply_pop.mp3', startSec: 364.7, volume: 0.15 },
  { file: 'scifi_sting.mp3', startSec: 403.9, volume: 0.16 },
  { file: 'army_march.mp3', startSec: 439.5, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 479.1, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const QueHayDentroDeUnProcesador: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hay-dentro-de-un-procesador.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hay-dentro-de-un-procesador-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hay-dentro-de-un-procesador-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hay-dentro-de-un-procesador/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
