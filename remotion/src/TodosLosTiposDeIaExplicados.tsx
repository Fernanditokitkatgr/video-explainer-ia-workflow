import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// todos-los-tipos-de-ia-explicados - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Esta mañana es desbloqueado el móvil con tu cara.
  { file: '0_02.jpg', startSec: 2.88 },  // Asabierto el correo y la publicidad basura ya estaba apartada en su carpeta.
  { file: '0_07.jpg', startSec: 7.14 },  // Has dictado un mensaje en vez de escribirlo.
  { file: '0_09.jpg', startSec: 9.68 },  // Tu aplicación de música te ha puesto una canción que te ha encantado.
  { file: '0_13.jpg', startSec: 13.16 },  // Y a lo mejor le has preguntado algo a un chatbot.
  { file: '0_16.jpg', startSec: 16.32 },  // Hoy has usado al menos cinco tipos deía distintos y seguramente ni te has dado cuenta.
  { file: '0_21.jpg', startSec: 21.82 },  // Porque la inteligencia artificial no es una sola cosa.
  { file: '0_25.jpg', startSec: 25.32 },  // Hoy vas a conocerlos a todos,
  { file: '0_27.jpg', startSec: 27.24 },  // del más simple al más inquietante.
  { file: '0_30.jpg', startSec: 30.12 },  // Tres tipos deía,
  { file: '0_31.jpg', startSec: 31.66 },  // cada uno con lo que hace y donde te lo has cruzado.
  { file: '0_34.jpg', startSec: 34.68 },  // Y al final vas a poder contar cuántos has usado tu hoy.
  { file: '0_38.jpg', startSec: 38.86 },  // Tipo uno,
  { file: '0_39.jpg', startSec: 39.9 },  // las reglas fijas.
  { file: '0_41.jpg', startSec: 41.5 },  // Es laía más antigua y la más sencilla.
  { file: '0_44.jpg', startSec: 44.26 },  // Un programador escribe las reglas a mano. Si pasa esto hace aquello,
  { file: '0_48.jpg', startSec: 48.52 },  // piensa en el termostato de tu casa. Si hace frío en cien de la calefacción o en los fantasmas del comecocos,
  { file: '0_54.jpg', startSec: 54.92 },  // siguen unas pocas reglas para perseguirte.
  { file: '0_57.jpg', startSec: 57.4 },  // Parece listo, pero no aprende nada.
  { file: '0_59.jpg', startSec: 59.74 },  // Hace siempre exactamente lo mismo.
  { file: '1_02.jpg', startSec: 62.74 },  // El siguiente nivel cambia las reglas del juego.
  { file: '1_05.jpg', startSec: 65.36 },  // Tipo dos,
  { file: '1_06.jpg', startSec: 66.3 },  // el aprendizaje automático.
  { file: '1_08.jpg', startSec: 68.26 },  // Aquí ya nadie escribe las reglas.
  { file: '1_10.jpg', startSec: 70.42 },  // La máquina las descubre a partir de ejemplos.
  { file: '1_13.jpg', startSec: 73.36 },  // El ejemplo de manual es el filtro de spam de tu correo.
  { file: '1_16.jpg', startSec: 76.38 },  // Ha visto muchísimos correos marcados como basura y ha aprendido qué pinta tienen.
  { file: '1_21.jpg', startSec: 81.4 },  // Nadie le dijo que desconfiar a los premios gordos y las prisas lo descubrió solo.
  { file: '1_26.jpg', startSec: 86.88 },  // Tipo tres,
  { file: '1_27.jpg', startSec: 87.86 },  // las redes neuronales.
  { file: '1_29.jpg', startSec: 89.64 },  // Son aprendizaje automático inspirado muy por encima en el cerebro.
  { file: '1_33.jpg', startSec: 93.7 },  // Muchísimas piezas pequeñas conectadas en capas.
  { file: '1_36.jpg', startSec: 96.62 },  // Cada capa entiende algo un poco más complejo que el anterior.
  { file: '1_40.jpg', startSec: 100.1 },  // Lo has notado seguro en el traductor del móvil.
  { file: '1_42.jpg', startSec: 102.74 },  // Hace unos años dio un salto enorme,
  { file: '1_44.jpg', startSec: 104.72 },  // pasó de frases torpes a sonar casi natural.
  { file: '1_47.jpg', startSec: 107.6 },  // Eses alto fueron las redes neuronales y son el motor de casi todo lo que viene ahora.
  { file: '1_53.jpg', startSec: 113.42 },  // Tipo cuatro,
  { file: '1_54.jpg', startSec: 114.4 },  // la visión por ordenador.
  { file: '1_56.jpg', startSec: 116.02 },  // Es laía que entiende imágenes.
  { file: '1_58.jpg', startSec: 118.6 },  // Para ella una foto es solo una tabla de números y aun así aprende a reconocer caras.
  { file: '2_03.jpg', startSec: 123.54 },  // La usas cada vez que desbloqueas el móvil con la cara,
  { file: '2_06.jpg', startSec: 126.44 },  // o cuando escribes playa en tu galería y aparecen tus fotos de vacaciones.
  { file: '2_10.jpg', startSec: 130.58 },  // Tu móvil no sabe qué es una playa, pero ha aprendido cómo se ve.
  { file: '2_15.jpg', startSec: 135.02 },  // Tipo cinco,
  { file: '2_16.jpg', startSec: 136.24 },  // el reconocimiento de voz.
  { file: '2_18.jpg', startSec: 138.34 },  // Conviarte el sonido de tu voz en texto.
  { file: '2_20.jpg', startSec: 140.64 },  // Parece fácil, pero cada persona habla distinto, con acento, comprisa, con ruido de fondo.
  { file: '2_26.jpg', startSec: 146.42 },  // Está detrás de los mensajes que dictas y de los subtítulos automáticos.
  { file: '2_30.jpg', startSec: 150.3 },  // Ojo,
  { file: '2_31.jpg', startSec: 150.92 },  // este tipo solo escucha y escribe entender lo que pides este trabajo de otra a ella.
  { file: '2_36.jpg', startSec: 156.64 },  // Tipo seis,
  { file: '2_37.jpg', startSec: 157.8 },  // los sistemas de recomendación.
  { file: '2_39.jpg', startSec: 159.84 },  // Su trabajo es adivinar qué vas a querer después.
  { file: '2_42.jpg', startSec: 162.56 },  // La siguiente serie, la siguiente canción,
  { file: '2_45.jpg', startSec: 165.2 },  // el siguiente vídeo.
  { file: '2_46.jpg', startSec: 166.72 },  // Comparan lo que haces con lo que hicieron millones de personas con gustos parecidos
  { file: '2_50.jpg', startSec: 170.92 },  // y probablemente son laía que más decide en qué gastas tus horas.
  { file: '2_55.jpg', startSec: 175.5 },  // Lo curioso es que no te conocen a ti,
  { file: '2_57.jpg', startSec: 177.68 },  // conocen tu comportamiento.
  { file: '2_59.jpg', startSec: 179.7 },  // Y aquí llega el gran salto.
  { file: '3_01.jpg', startSec: 181.86 },  // Hasta ahora todas estasías reconocían cosas,
  { file: '3_04.jpg', startSec: 184.76 },  // clasificaban, elegían,
  { file: '3_06.jpg', startSec: 186.66 },  // las siguientes crean.
  { file: '3_08.jpg', startSec: 188.72 },  // Tipo siete,
  { file: '3_10.jpg', startSec: 190.1 },  // laía generativa de texto.
  { file: '3_12.jpg', startSec: 192.32 },  // Son los chatbots que contestan preguntas y escriben correos por ti.
  { file: '3_16.jpg', startSec: 196.2 },  // Por dentro hacen algo sorprendentemente simple,
  { file: '3_18.jpg', startSec: 198.98 },  // predicen la siguiente palabra.
  { file: '3_21.jpg', startSec: 201.16 },  // Han leído tantísimo texto que esa predicción suena a alguien que sabe de lo que habla.
  { file: '3_25.jpg', startSec: 205.9 },  // Por eso a veces se inventan cosas con total seguridad,
  { file: '3_28.jpg', startSec: 208.86 },  // no comproban,
  { file: '3_30.jpg', startSec: 210.0 },  // predicen.
  { file: '3_31.jpg', startSec: 211.7 },  // Tipo ocho,
  { file: '3_32.jpg', startSec: 212.84 },  // laía generativa de imágenes.
  { file: '3_35.jpg', startSec: 215.08 },  // Le escribes una frase y te dibuja una imagen que nunca ha existido. La imagen no la busca en internet,
  { file: '3_41.jpg', startSec: 221.16 },  // la fábrica.
  { file: '3_42.jpg', startSec: 222.76 },  // Empieza con una imagen llena de ruido,
  { file: '3_45.jpg', startSec: 225.08 },  // como la nieve de una tele vieja,
  { file: '3_47.jpg', startSec: 227.28 },  // y la va limpiando paso a paso hasta que aparece lo que has pedido.
  { file: '3_51.jpg', startSec: 231.92 },  // Tipo nueve,
  { file: '3_53.jpg', startSec: 233.02 },  // laía generativa de voz.
  { file: '3_54.jpg', startSec: 234.94 },  // Lea un texto en voz alta con una voz que suena humana.
  { file: '3_58.jpg', startSec: 238.14 },  // Algunas pueden imitar la voz de una persona real con unos segundos de grabación.
  { file: '4_02.jpg', startSec: 242.5 },  // Eso ya se usa en estafas con voces clonadas de familiares.
  { file: '4_06.jpg', startSec: 246.32 },  // Y ahora un detalle.
  { file: '4_08.jpg', startSec: 248.12 },  // La voz que está sollendo ahora mismo la ha generado unaía.
  { file: '4_12.jpg', startSec: 252.0 },  // El siguiente nivel ya no imita,
  { file: '4_13.jpg', startSec: 253.82 },  // aprende a ganar.
  { file: '4_15.jpg', startSec: 255.32 },  // Tipo diez,
  { file: '4_16.jpg', startSec: 256.16 },  // laía que juega.
  { file: '4_17.jpg', startSec: 257.66 },  // Aprende a base de prueba y error.
  { file: '4_19.jpg', startSec: 259.64 },  // Suma puntos cuando acierta y los pierde cuando falla.
  { file: '4_22.jpg', startSec: 262.68 },  // A esto se le llama aprendizaje por refuerzo.
  { file: '4_25.jpg', startSec: 265.5 },  // El caso más famoso es AlphaGo.
  { file: '4_27.jpg', startSec: 267.86 },  // En 2016,
  { file: '4_29.jpg', startSec: 269.34 },  // venció al Goal DiceDole,
  { file: '4_31.jpg', startSec: 271.12 },  // uno de los mejores jugadores del mundo.
  { file: '4_33.jpg', startSec: 273.52 },  // Y como llegó a ese nivel?
  { file: '4_35.jpg', startSec: 275.46 },  // Primero estudió partidas de humanos.
  { file: '4_37.jpg', startSec: 277.52 },  // Después mejoró jugando contra sí misma,
  { file: '4_39.jpg', startSec: 279.78 },  // millones de partidas.
  { file: '4_41.jpg', startSec: 281.46 },  // Este mismo método se usa hoy para entrenar robots y para pulir a los chatbots.
  { file: '4_46.jpg', startSec: 286.48 },  // Y aquí empieza lo inquietante.
  { file: '4_48.jpg', startSec: 288.92 },  // Tipo once, los agentes.
  { file: '4_51.jpg', startSec: 291.32 },  // Un chatbot te dice cómo hacer algo.
  { file: '4_53.jpg', startSec: 293.52 },  // Una gente lo hace.
  { file: '4_55.jpg', startSec: 295.08 },  // Le das un objetivo y decide él los pasos.
  { file: '4_58.jpg', startSec: 298.04 },  // Por ejemplo, buscarte un vuelo barato y dejarte la reserva preparada.
  { file: '5_01.jpg', startSec: 301.82 },  // Ya existen,
  { file: '5_02.jpg', startSec: 302.8 },  // pero todavía se equivocan bastante y conviene vigilarlos.
  { file: '5_06.jpg', startSec: 306.46 },  // Ya no le pides una respuesta,
  { file: '5_08.jpg', startSec: 308.32 },  // le das permiso para actuar.
  { file: '5_10.jpg', startSec: 310.52 },  // Tipo doce,
  { file: '5_11.jpg', startSec: 311.5 },  // laía estrecha frente a laía general.
  { file: '5_14.jpg', startSec: 314.16 },  // Atento porque esto cambia cómo ves todo lo anterior.
  { file: '5_17.jpg', startSec: 317.38 },  // Todas las hías que has visto hasta ahora son estrechas.
  { file: '5_20.jpg', startSec: 320.38 },  // Cada una es muy buena en lo suyo y fuera de lo suyo no sirve.
  { file: '5_24.jpg', startSec: 324.52 },  // Alpha Go uno puede filtrar del correo.
  { file: '5_26.jpg', startSec: 326.92 },  // El filtro de spam no sabe jugar al Go.
  { file: '5_29.jpg', startSec: 329.6 },  // Unaía general sería otra cosa.
  { file: '5_32.jpg', startSec: 332.26 },  // Una sola máquina capaz de aprender casi cualquier tarea que aprenda una persona.
  { file: '5_36.jpg', startSec: 336.8 },  // Hoy laía general todavía no existe.
  { file: '5_39.jpg', startSec: 339.42 },  // Los chatbots más avanzados se le acercan en algunas cosas y fallan en otras que un niño resuelven segundos.
  { file: '5_45.jpg', startSec: 345.9 },  // Varias empresas dicen que construirla es su objetivo y los expertos no se ponen de acuerdo. Unos creen que lle
  { file: '5_53.jpg', startSec: 353.4 },  // otros en décadas,
  { file: '5_54.jpg', startSec: 354.76 },  // otros dudan que lleguen nunca.
  { file: '5_57.jpg', startSec: 357.22 },  // Tipo trece,
  { file: '5_58.jpg', startSec: 358.32 },  // la super inteligencia.
  { file: '6_00.jpg', startSec: 360.2 },  // Aquí conviene decirlo claro,
  { file: '6_02.jpg', startSec: 362.08 },  // esto es pura hipótesis.
  { file: '6_04.jpg', startSec: 364.14 },  // Sería unaía más lista que cualquier persona en casi todo.
  { file: '6_07.jpg', startSec: 367.76 },  // Ciencia, estrategia, persuasion.
  { file: '6_10.jpg', startSec: 370.46 },  // La idea que preocupa es esta.
  { file: '6_12.jpg', startSec: 372.66 },  // Unaía así podría mejorarse a sí misma y cada versión podría diseñar otra todavía más lista.
  { file: '6_19.jpg', startSec: 379.08 },  // Algunos investigadores creen que sería uno de los mayores riesgos de este siglo.
  { file: '6_23.jpg', startSec: 383.7 },  // Otros creen que es ciencia ficción y que distrae de problemas que ya tenemos hoy.
  { file: '6_28.jpg', startSec: 388.42 },  // ¿Y quién tiene razón?
  { file: '6_30.jpg', startSec: 390.12 },  // Nadie sabe si es posible y por eso tanta gente sería se lo tomen serio.
  { file: '6_35.jpg', startSec: 395.02 },  // Así que volvamos a esta mañana.
  { file: '6_37.jpg', startSec: 397.4 },  // ¿Cuántos tipos deía has usado hoy?
  { file: '6_39.jpg', startSec: 399.88 },  // Tu cara desbloqueando el móvil,
  { file: '6_41.jpg', startSec: 401.86 },  // visión por ordenador. El correo basura en su carpeta,
  { file: '6_45.jpg', startSec: 405.46 },  // aprendizaje automático,
  { file: '6_47.jpg', startSec: 407.2 },  // el mensaje dictado,
  { file: '6_48.jpg', startSec: 408.82 },  // reconocimiento de voz.
  { file: '6_50.jpg', startSec: 410.54 },  // La canción que te ha encantado,
  { file: '6_52.jpg', startSec: 412.26 },  // un sistema de recomendación,
  { file: '6_54.jpg', startSec: 414.1 },  // la pregunta al chatbot y a generativa de texto.
  { file: '6_57.jpg', startSec: 417.7 },  // 5.
  { file: '6_58.jpg', startSec: 418.98 },  // Y con la voz de este video ya van 6.
  { file: '7_01.jpg', startSec: 421.7 },  // Y todas sonía estrecha.
  { file: '7_04.jpg', startSec: 424.2 },  // Ninguna se parece todavía a unaía general.
  { file: '7_07.jpg', startSec: 427.34 },  // Laía que da miedo no está en tu bolsillo.
  { file: '7_10.jpg', startSec: 430.02 },  // Por ahora solo existen los debates.
  { file: '7_12.jpg', startSec: 432.44 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '7_18.jpg', startSec: 438.02 },  // Cada semana una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'whoosh_expand.mp3', startSec: 21.8, volume: 0.14 },
  { file: 'soft_ping.mp3', startSec: 38.9, volume: 0.14 },
  { file: 'record_scratch.mp3', startSec: 57.4, volume: 0.14 },
  { file: 'warm_reveal.mp3', startSec: 65.4, volume: 0.14 },
  { file: 'data_whirr.mp3', startSec: 76.4, volume: 0.14 },
  { file: 'computer_beep.mp3', startSec: 86.9, volume: 0.14 },
  { file: 'fast_rewind.mp3', startSec: 102.7, volume: 0.14 },
  { file: 'camera_shutter.mp3', startSec: 113.4, volume: 0.14 },
  { file: 'mystery_sting.mp3', startSec: 130.6, volume: 0.15 },
  { file: 'soft_ping_two.mp3', startSec: 156.6, volume: 0.14 },
  { file: 'dramatic_hit.mp3', startSec: 179.7, volume: 0.15 },
  { file: 'rising_tension.mp3', startSec: 205.9, volume: 0.14 },
  { file: 'static_noise.mp3', startSec: 222.8, volume: 0.13 },
  { file: 'tense_silence.mp3', startSec: 246.3, volume: 0.14 },
  { file: 'triumphant_chime.mp3', startSec: 267.9, volume: 0.15 },
  { file: 'unease_drone.mp3', startSec: 286.5, volume: 0.14 },
  { file: 'clock_tick.mp3', startSec: 345.9, volume: 0.14 },
  { file: 'deep_boom.mp3', startSec: 357.2, volume: 0.15 },
  { file: 'closing_turn.mp3', startSec: 395.0, volume: 0.14 },
  { file: 'subscribe_chime.mp3', startSec: 434.5, volume: 0.17 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const TodosLosTiposDeIaExplicados: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('todos-los-tipos-de-ia-explicados.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`todos-los-tipos-de-ia-explicados-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`todos-los-tipos-de-ia-explicados-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`todos-los-tipos-de-ia-explicados/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
