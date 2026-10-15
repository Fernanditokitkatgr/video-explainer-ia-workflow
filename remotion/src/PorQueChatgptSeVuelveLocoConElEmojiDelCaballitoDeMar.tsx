import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// por-que-chatgpt-se-vuelve-loco-con-el-emoji-del-caballito-de-mar - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Hazle esta pregunta a ChatGPT.
  { file: '0_02.jpg', startSec: 2.48 },  // Existe el emoye del caballito de mar.
  { file: '0_05.jpg', startSec: 5.18 },  // ¡Y prepárate!
  { file: '0_06.jpg', startSec: 6.48 },  // Porque lo que viene a continuación no es una broma.
  { file: '0_09.jpg', startSec: 9.56 },  // Es uno de los fallos más raros que se han visto en una inteligencia artificial.
  { file: '0_14.jpg', startSec: 14.22 },  // Y al final de este vídeo, vas a entender por qué pasa.
  { file: '0_17.jpg', startSec: 17.66 },  // Empecemos por lo básico.
  { file: '0_19.jpg', startSec: 19.42 },  // El emoye del caballito de mar no existe.
  { file: '0_21.jpg', startSec: 21.98 },  // Ni existe hoy ni ha existido nunca en el estándar Unicode.
  { file: '0_25.jpg', startSec: 25.88 },  // Es la lista oficial de todos los emojis del mundo. Hay peces,
  { file: '0_30.jpg', startSec: 30.1 },  // hay pulpos,
  { file: '0_31.jpg', startSec: 30.96 },  // hay medusas,
  { file: '0_32.jpg', startSec: 32.0 },  // hay hasta un paracol.
  { file: '0_33.jpg', startSec: 33.48 },  // Pero caballito de mar no hay ninguno.
  { file: '0_36.jpg', startSec: 36.22 },  // Se propuso en 2018 y se rechazó.
  { file: '0_39.jpg', startSec: 39.52 },  // Y según emoye pedia, nadie ha vuelto a intentarlo en serio.
  { file: '0_43.jpg', startSec: 43.36 },  // Solo existo una rareza.
  { file: '0_45.jpg', startSec: 45.18 },  // Un manual de un procesador de textos japonés de 1988 dibujaba uno en su lista de signos del zodíaco.
  { file: '0_52.jpg', startSec: 52.22 },  // Pero eso no es un emoye de tu teclado.
  { file: '0_54.jpg', startSec: 54.82 },  // Y ahora vuelve a la pregunta. Hace un tiempo mucha gente se la hizo achad GPP.
  { file: '1_00.jpg', startSec: 60.02 },  // Y lo que pasó quedó documentado en medios y en foros.
  { file: '1_03.jpg', startSec: 63.44 },  // Empieza seguro de sí mismo.
  { file: '1_05.jpg', startSec: 65.16 },  // Sí, existe,
  { file: '1_06.jpg', startSec: 66.32 },  // aquí lo tienes.
  { file: '1_07.jpg', startSec: 67.74 },  // Y te escribe un pez.
  { file: '1_09.jpg', startSec: 69.52 },  // Pero un pez no es un caballito de mar.
  { file: '1_12.jpg', startSec: 72.12 },  // Entonces se corrige, espera, ese no es.
  { file: '1_15.jpg', startSec: 75.18 },  // Lo intenta otra vez.
  { file: '1_16.jpg', startSec: 76.56 },  // Y te escribe un caballo.
  { file: '1_18.jpg', startSec: 78.42 },  // Tampoco,
  { file: '1_19.jpg', startSec: 79.32 },  // un caballo tampoco es un caballito de mar.
  { file: '1_22.jpg', startSec: 82.24 },  // Prueba con un unicornio, con otro bicho marino. Dice que sí,
  { file: '1_26.jpg', startSec: 86.2 },  // dice que no,
  { file: '1_27.jpg', startSec: 87.08 },  // dice que ahora sí,
  { file: '1_28.jpg', startSec: 88.38 },  // dice que en realidad no.
  { file: '1_30.jpg', startSec: 90.22 },  // Hasta que al final reconoce que no encuentra nada.
  { file: '1_33.jpg', startSec: 93.3 },  // Algunos modelos tardaban más en salir del bucle.
  { file: '1_36.jpg', startSec: 96.12 },  // Otros se daban cuenta antes y otros acertaban a la primera.
  { file: '1_40.jpg', startSec: 100.12 },  // Un medio alemán lo contó en octubre de 2025 y los usuarios lo compartieron por todas partes.
  { file: '1_46.jpg', startSec: 106.54 },  // Así que la pregunta es esta.
  { file: '1_48.jpg', startSec: 108.5 },  // ¿Por qué se atasca?
  { file: '1_50.jpg', startSec: 110.14 },  // Para responder necesitamos hablar de las personas. Porque a nosotros nos pasa algo muy parecido.
  { file: '1_55.jpg', startSec: 115.98 },  // Seguro que tú también lo recuerdas.
  { file: '1_58.jpg', startSec: 118.06 },  // Un caballito de mar con su cola enroscada.
  { file: '2_00.jpg', startSec: 120.7 },  // Mucha gente jura que lo ha visto en su teclado.
  { file: '2_03.jpg', startSec: 123.48 },  // Pero no lo ha visto, porque no existe.
  { file: '2_06.jpg', startSec: 126.54 },  // A esto se le llama el efecto mandela.
  { file: '2_08.jpg', startSec: 128.96 },  // Es cuando mucha gente recuerda lo mismo y todo se equivocan a la vez.
  { file: '2_13.jpg', startSec: 133.1 },  // ¿Por qué nos pasa en este caso nadie lo sabe con certeza?
  { file: '2_16.jpg', startSec: 136.54 },  // Una idea habitual es que tiene sentido que exista. Hay peces, hay delfines, hay pulpos,
  { file: '2_22.jpg', startSec: 142.04 },  // un caballito de mar encajaría perfectamente.
  { file: '2_24.jpg', startSec: 144.88 },  // Y tu cerebro rellena el hueco.
  { file: '2_27.jpg', startSec: 147.2 },  // Ahora piensa en esto.
  { file: '2_28.jpg', startSec: 148.96 },  // Estas máquinas aprenden leyendo cantidades enormes de texto escrito por personas.
  { file: '2_33.jpg', startSec: 153.8 },  // Y entre esas personas hay muchas que están convencidas de que ese emoji existe.
  { file: '2_38.jpg', startSec: 158.8 },  // Los investigadores creen que puede que ahí esté el origen.
  { file: '2_42.jpg', startSec: 162.1 },  // La máquina hereda nuestra falsa memoria.
  { file: '2_44.jpg', startSec: 164.7 },  // Ojo, es una hipótesis, no está demostrado. Pero encaja con lo que se ve.
  { file: '2_49.jpg', startSec: 169.72 },  // Muchos modelos responden que sí con mucha seguridad.
  { file: '2_53.jpg', startSec: 173.02 },  // Y aquí viene lo más interesante.
  { file: '2_55.jpg', startSec: 175.42 },  // Creer que algo existe no basta para provocar el bucle.
  { file: '2_58.jpg', startSec: 178.54 },  // El bucle aparece al intentar escribirlo.
  { file: '3_01.jpg', startSec: 181.62 },  // Así que vamos a mirar cómo escribe una máquina de estas.
  { file: '3_04.jpg', startSec: 184.9 },  // Imagina que el modelo tiene una enorme lista de piezas.
  { file: '3_08.jpg', startSec: 188.04 },  // Cada pieza es una palabra, o un trozo de palabra,
  { file: '3_10.jpg', startSec: 190.86 },  // o un símbolo.
  { file: '3_12.jpg', startSec: 192.12 },  // A esas piezas se les llama Tokens. Cada emoji que existe tiene su pieza en la lista.
  { file: '3_17.jpg', startSec: 197.68 },  // El pez tiene la suya. El caballo tiene la suya.
  { file: '3_20.jpg', startSec: 200.82 },  // Y el modelo sólo puede escribir piezas de esa lista.
  { file: '3_24.jpg', startSec: 204.02 },  // Nunca puede inventarse una pieza nueva por el camino.
  { file: '3_27.jpg', startSec: 207.22 },  // Por dentro el modelo no escribe de golpe.
  { file: '3_29.jpg', startSec: 209.62 },  // Primero construye una idea de lo que quiere decir.
  { file: '3_32.jpg', startSec: 212.22 },  // Y luego busca en la lista la prisa que más se parece a esa idea.
  { file: '3_36.jpg', startSec: 216.04 },  // Con la palabra casa, la idea y la pieza coinciden. No hay problema.
  { file: '3_39.jpg', startSec: 219.94 },  // Con un emoji que existe pasa lo mismo. Pero con el caballito de mar no.
  { file: '3_44.jpg', startSec: 224.72 },  // Aquí es donde entra el análisis más citado.
  { file: '3_47.jpg', startSec: 227.46 },  // Lo publicó un investigador a llamada Teia Vogel en octubre de 2025.
  { file: '3_52.jpg', startSec: 232.2 },  // Usó una técnica llamada Lodge and Lens.
  { file: '3_54.jpg', startSec: 234.84 },  // Es como mirar por una ventana lo que piensa el modelo capa a capa mientras trabaja.
  { file: '3_59.jpg', startSec: 239.54 },  // Lo provocó con un modelo abierto.
  { file: '4_01.jpg', startSec: 241.5 },  // De los que se pueden abrir y mirar por dentro.
  { file: '4_03.jpg', startSec: 243.86 },  // Y vio algo curioso.
  { file: '4_05.jpg', startSec: 245.78 },  // En las capas del medio, el modelo parecía estar montando la idea de caballito de mar más emoji. Es decir,
  { file: '4_11.jpg', startSec: 251.86 },  // estaba construyendo justo lo que quería escribir.
  { file: '4_14.jpg', startSec: 254.8 },  // Pero en la lista no hay ninguna pieza que encaje con esa idea.
  { file: '4_18.jpg', startSec: 258.32 },  // Así que el sistema coge la más cercana.
  { file: '4_20.jpg', startSec: 260.5 },  // Un pez, un caballo, algo marino.
  { file: '4_23.jpg', startSec: 263.24 },  // La explicación más aceptada es esta.
  { file: '4_25.jpg', startSec: 265.68 },  // El modelo quería una cosa y sale otra distinta.
  { file: '4_29.jpg', startSec: 269.24 },  // Y entonces llega el momento clave.
  { file: '4_31.jpg', startSec: 271.6 },  // El modelo no centera de su error hasta que ve lo que ha escrito.
  { file: '4_35.jpg', startSec: 275.32 },  // Mientras trabaja por dentro sigue creyendo que todo va bien. Ve el pez ya escrito y se da cuenta de que algo f
  { file: '4_42.jpg', startSec: 282.68 },  // Entonces se corrige,
  { file: '4_44.jpg', startSec: 284.12 },  // lo intenta otra vez.
  { file: '4_45.jpg', startSec: 285.64 },  // Y vuelve a pasar exactamente lo mismo.
  { file: '4_48.jpg', startSec: 288.32 },  // Porque la pieza que busca sigue sin existir.
  { file: '4_51.jpg', startSec: 291.12 },  // Cada intento fallido se suma el texto y cada fallo le confunda un poco más.
  { file: '4_55.jpg', startSec: 295.94 },  // Según el análisis, algunos modelos acababan reconociendo que el emoji no existe.
  { file: '5_00.jpg', startSec: 300.78 },  // Otro seguían dando vueltas durante mucho rato.
  { file: '5_03.jpg', startSec: 303.76 },  // Queda una duda. ¿Y por qué no se limita decir que no sabe?
  { file: '5_07.jpg', startSec: 307.74 },  // ¿Por qué no está construido para eso?
  { file: '5_09.jpg', startSec: 309.86 },  // Un modelo de lenguaje no hace una pausa para pensarse la respuesta.
  { file: '5_13.jpg', startSec: 313.6 },  // Siempre tiene que escribir la siguiente pieza.
  { file: '5_16.jpg', startSec: 316.24 },  // Y esa pieza siempre es una de las de su lista.
  { file: '5_19.jpg', startSec: 319.24 },  // No tiene un botón de silencio.
  { file: '5_21.jpg', startSec: 321.2 },  // Cuando la pieza perfecta no existe, elige la menos mala.
  { file: '5_24.jpg', startSec: 324.42 },  // Y la menos mala es un pez.
  { file: '5_26.jpg', startSec: 326.4 },  // Es como pedirle a alguien que responda con las fichas de un juego de mesa y que la ficha que necesita no esté 
  { file: '5_34.jpg', startSec: 334.14 },  // aunque sepa que no es la buena.
  { file: '5_36.jpg', startSec: 336.62 },  // Entonces, ¿qué nos enseña esto?
  { file: '5_38.jpg', startSec: 338.86 },  // Primero,
  { file: '5_39.jpg', startSec: 339.68 },  // que estas máquinas no consultan en un enciclopedia.
  { file: '5_42.jpg', startSec: 342.7 },  // Tienen una especie de recuerdo aproximado, como el nuestro.
  { file: '5_46.jpg', startSec: 346.12 },  // Y como el nuestro puede ser falso.
  { file: '5_48.jpg', startSec: 348.66 },  // Segundo,
  { file: '5_49.jpg', startSec: 349.7 },  // que dicho con seguridad no significa comprobado.
  { file: '5_52.jpg', startSec: 352.84 },  // El modelo respondió que sí con total confianza y estaba equivocado.
  { file: '5_57.jpg', startSec: 357.7 },  // Tercero, que entender algo por dentro y poder expresarlo son dos cosas distintas.
  { file: '6_03.jpg', startSec: 363.06 },  // El modelo parecía tener la idea clara.
  { file: '6_05.jpg', startSec: 365.52 },  // Lo que no tenía era la pieza para escribirla.
  { file: '6_08.jpg', startSec: 368.58 },  // Ya hay una cuarta cosa.
  { file: '6_10.jpg', startSec: 370.32 },  // Esto ya se ha ido arreglando.
  { file: '6_12.jpg', startSec: 372.54 },  // Según Emojipedia, algunas empresas ajustaron sus modelos y ahora detectan el error mucho antes.
  { file: '6_18.jpg', startSec: 378.52 },  // El fallo fue un accidente, pero nos dejó ver un trocito de cómo funcionan por dentro.
  { file: '6_23.jpg', startSec: 383.48 },  // Así que volvamos a la pregunta del principio.
  { file: '6_26.jpg', startSec: 386.12 },  // ¿Existe el emoji del caballito de mar?
  { file: '6_28.jpg', startSec: 388.82 },  // No, no existe.
  { file: '6_31.jpg', startSec: 391.26 },  // Tú podrías pensar que sí,
  { file: '6_32.jpg', startSec: 392.92 },  // muchísima gente lo piensa.
  { file: '6_34.jpg', startSec: 394.8 },  // Y las máquinas que han leído lo que escribimos lo piensan también.
  { file: '6_38.jpg', startSec: 398.36 },  // La diferencia es que tú puedes parar y decir que no estás seguro.
  { file: '6_42.jpg', startSec: 402.18 },  // Ellas tienen que seguir escribiendo.
  { file: '6_44.jpg', startSec: 404.62 },  // Si te gusta entender cómo funciona la tecnología que usas cada día, suscríbete.
  { file: '6_49.jpg', startSec: 409.38 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'mystery_sting.mp3', startSec: 5.18, volume: 0.15 },
  { file: 'record_scratch.mp3', startSec: 33.48, volume: 0.14 },
  { file: 'soft_ping.mp3', startSec: 36.22, volume: 0.14 },
  { file: 'whoosh_expand.mp3', startSec: 54.82, volume: 0.14 },
  { file: 'soft_ping_two.mp3', startSec: 67.74, volume: 0.14 },
  { file: 'computer_beep.mp3', startSec: 76.56, volume: 0.14 },
  { file: 'fast_rewind.mp3', startSec: 90.22, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 126.54, volume: 0.14 },
  { file: 'rising_tension.mp3', startSec: 147.2, volume: 0.14 },
  { file: 'dramatic_hit.mp3', startSec: 173.02, volume: 0.15 },
  { file: 'data_whirr.mp3', startSec: 184.9, volume: 0.14 },
  { file: 'camera_shutter.mp3', startSec: 224.72, volume: 0.14 },
  { file: 'static_noise.mp3', startSec: 254.8, volume: 0.13 },
  { file: 'deep_boom.mp3', startSec: 269.24, volume: 0.15 },
  { file: 'tense_silence.mp3', startSec: 303.76, volume: 0.14 },
  { file: 'clock_tick.mp3', startSec: 326.4, volume: 0.14 },
  { file: 'triumphant_chime.mp3', startSec: 336.62, volume: 0.15 },
  { file: 'closing_turn.mp3', startSec: 383.48, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 404.62, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const PorQueChatgptSeVuelveLocoConElEmojiDelCaballitoDeMar: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('por-que-chatgpt-se-vuelve-loco-con-el-emoji-del-caballito-de-mar.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`por-que-chatgpt-se-vuelve-loco-con-el-emoji-del-caballito-de-mar-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`por-que-chatgpt-se-vuelve-loco-con-el-emoji-del-caballito-de-mar-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`por-que-chatgpt-se-vuelve-loco-con-el-emoji-del-caballito-de-mar/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
