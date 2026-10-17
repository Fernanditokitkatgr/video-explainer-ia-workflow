import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-gran-ciberataque-que-ha-sufrido-espana - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // marzo de 2021.
  { file: '0_01.jpg', startSec: 1.68 },  // Estás en un herte. Necesitas cobrar este mes.
  { file: '0_04.jpg', startSec: 4.7 },  // Entras en la web del sep para pedir cita,
  { file: '0_07.jpg', startSec: 7.04 },  // y la web se queda en blanco.
  { file: '0_08.jpg', startSec: 8.9 },  // Vas a tu oficina de empleo. Los ordenadores están apagados.
  { file: '0_12.jpg', startSec: 12.6 },  // ¿Me son fallo técnico?
  { file: '0_14.jpg', startSec: 14.0 },  // No lo es.
  { file: '0_15.jpg', startSec: 14.94 },  // Es un ciber ataque, y solo es el primero.
  { file: '0_17.jpg', startSec: 17.8 },  // Aquí van 10 ciber ataques contra España, del más conocido, al más raro.
  { file: '0_22.jpg', startSec: 22.78 },  // Guanacray en Telefónica ya tiene su propio vídeo en el canal, y el último le robó gigas al móvil de alguien mu
  { file: '0_29.jpg', startSec: 29.34 },  // ¿Adiobinas de quién?
  { file: '0_31.jpg', startSec: 31.14 },  // Número 1. El sep. El apagón del paro.
  { file: '0_34.jpg', startSec: 34.38 },  // Nueve de marzo de 2021.
  { file: '0_36.jpg', startSec: 36.48 },  // Un ransonguer tumba el servicio público de empleo.
  { file: '0_39.jpg', startSec: 39.56 },  // Según el sindicato CESIF, se quedan sin sistemas 710 oficinas.
  { file: '0_44.jpg', startSec: 44.18 },  // Según la prensa, algunos empleados vieron archivos de Ryuk, un ransonguer muy conocido.
  { file: '0_49.jpg', startSec: 49.26 },  // Que te tocó a ti.
  { file: '0_50.jpg', startSec: 50.56 },  // Día sincita y plazos ampliados.
  { file: '0_52.jpg', startSec: 52.72 },  // Guarda siempre el justificante de cada trámite.
  { file: '0_55.jpg', startSec: 55.56 },  // Su estilo.
  { file: '0_56.jpg', startSec: 56.68 },  // Te dejas sincita, justo cuando más la necesitas.
  { file: '1_00.jpg', startSec: 60.48 },  // Número 2. El hospital clinic. El secuestro del quirófano.
  { file: '1_04.jpg', startSec: 64.18 },  // Marzo de 2023.
  { file: '1_05.jpg', startSec: 65.88 },  // Un ransonguer entra en este gran hospital de Barcelona.
  { file: '1_08.jpg', startSec: 68.9 },  // En una semana se quedan sin hacer 300 operaciones y 11 .000 consultas.
  { file: '1_13.jpg', startSec: 73.76 },  // Según la generalitat, el grupo se llama Ransom House,
  { file: '1_17.jpg', startSec: 77.06 },  // pide 4 millones y medio de dólares.
  { file: '1_19.jpg', startSec: 79.5 },  // El gobern se negó a pagar y los ladrones publicaron datos de pacientes.
  { file: '1_23.jpg', startSec: 83.98 },  // ¿Qué te tocó a ti?
  { file: '1_25.jpg', startSec: 85.36 },  // Si alguien te llama citando tu enfermedad para pedirte dinero,
  { file: '1_28.jpg', startSec: 88.5 },  // cuelga.
  { file: '1_29.jpg', startSec: 89.58 },  // Su estilo usa a los enfermos como renes.
  { file: '1_33.jpg', startSec: 93.12 },  // Número 3. El Santander.
  { file: '1_35.jpg', startSec: 95.14 },  // La llave del vecino.
  { file: '1_36.jpg', startSec: 96.7 },  // Maio de 2024.
  { file: '1_38.jpg', startSec: 98.48 },  // El banco avisa de un acceso a una base de datos guardada en un proveedor.
  { file: '1_42.jpg', startSec: 102.26 },  // Un grupo llamado Shinee Hunters la pone a la venta.
  { file: '1_45.jpg', startSec: 105.36 },  // Dice tener 30 millones de clientes.
  { file: '1_47.jpg', startSec: 107.88 },  // El banco asegura que esa base no guardaba contra señas.
  { file: '1_51.jpg', startSec: 111.38 },  // ¿Qué te tocó a ti?
  { file: '1_52.jpg', startSec: 112.64 },  // Si te llama tu banco,
  { file: '1_53.jpg', startSec: 113.86 },  // cuelga y llama tu al número de tu tarjeta.
  { file: '1_57.jpg', startSec: 117.0 },  // Su estilo nunca entró en el banco, entró en casa de su proveedor.
  { file: '2_01.jpg', startSec: 121.56 },  // Número 4.
  { file: '2_02.jpg', startSec: 122.74 },  // La dejete el dueño de todos los coches.
  { file: '2_05.jpg', startSec: 125.62 },  // Maio de 2024.
  { file: '2_07.jpg', startSec: 127.64 },  // Trafico detecta un acceso ilícito a su base de conductores.
  { file: '2_10.jpg', startSec: 130.96 },  // Alguien anuncian un foro 34 millones de registros, matrículas, DNI,
  { file: '2_16.jpg', startSec: 136.32 },  // domicilios.
  { file: '2_17.jpg', startSec: 137.44 },  // Eran reales?
  { file: '2_18.jpg', startSec: 138.66 },  // Nadie ha confirmado esa cifra.
  { file: '2_20.jpg', startSec: 140.66 },  // Trafico cortó el acceso a varios usuarios sospechosos.
  { file: '2_24.jpg', startSec: 144.02 },  // ¿Qué te tocó a ti?
  { file: '2_25.jpg', startSec: 145.3 },  // Más SMS de multas falsas. La dejete nunca cobra una multa con un enlace.
  { file: '2_30.jpg', startSec: 150.82 },  // Su estilo sabe que coche tienes y te manda una multa que nunca te pusieron.
  { file: '2_36.jpg', startSec: 156.16 },  // Número 5.
  { file: '2_37.jpg', startSec: 157.22 },  // Las eléctricas.
  { file: '2_41.jpg', startSec: 161.06 },  // La trola 850 .000 clientes con nombre y DNI.
  { file: '2_45.jpg', startSec: 165.82 },  // Enero de 2026, le toca en desa. Pudieron salir tu DNI y hasta el iban de tu cuenta.
  { file: '2_52.jpg', startSec: 172.4 },  // El atacante firma como Spain.
  { file: '2_54.jpg', startSec: 174.9 },  // Dice tener más de 20 millones de personas.
  { file: '2_57.jpg', startSec: 177.38 },  // En desa nunca lo ha confirmado.
  { file: '2_59.jpg', startSec: 179.62 },  // ¿Qué te tocó a ti?
  { file: '3_00.jpg', startSec: 180.88 },  // Si te llaman para cambiarte de tarifa, cuelga y llama tu al teléfono de tu factura.
  { file: '3_05.jpg', startSec: 185.74 },  // Su estilo nunca toca tu luz, toca tu factura.
  { file: '3_09.jpg', startSec: 189.68 },  // Y ahora empiezan los raros.
  { file: '3_11.jpg', startSec: 191.92 },  // Número 6. El ayuntamiento de Sevilla.
  { file: '3_14.jpg', startSec: 194.34 },  // La ciudad sin ventanilla. Septiembre de 2023.
  { file: '3_17.jpg', startSec: 197.68 },  // Un razon huera paga la web municipal y sus trámites.
  { file: '3_21.jpg', startSec: 201.0 },  // El ayuntamiento señala Lockpid.
  { file: '3_23.jpg', startSec: 203.42 },  // Y dice que piden alrededor de un millón y medio de euros.
  { file: '3_27.jpg', startSec: 207.22 },  // Sevilla se negó a negociar.
  { file: '3_29.jpg', startSec: 209.02 },  // Urbanismo pasó casi dos semanas parado.
  { file: '3_31.jpg', startSec: 211.72 },  // Que te tocó a ti.
  { file: '3_37.jpg', startSec: 217.66 },  // Trámites su estilo.
  { file: '3_39.jpg', startSec: 219.26 },  // Cierra una ciudad entera sin bajar una persona.
  { file: '3_42.jpg', startSec: 222.36 },  // Número 7.
  { file: '3_43.jpg', startSec: 223.24 },  // Ere Europa.
  { file: '3_44.jpg', startSec: 224.22 },  // La que se enteró por otro.
  { file: '3_46.jpg', startSec: 226.3 },  // 2018.
  { file: '3_47.jpg', startSec: 227.76 },  // Roban datos de tarjetas de 489 .000 clientes.
  { file: '3_51.jpg', startSec: 231.8 },  // ¿Quién da la alarma?
  { file: '3_53.jpg', startSec: 233.28 },  // La aerolínea no se dio cuenta. Aviso el banco popular.
  { file: '3_56.jpg', startSec: 236.82 },  // Ere Europa tardó 41 días en avisar.
  { file: '3_59.jpg', startSec: 239.76 },  // Multa de 600 .000 euros.
  { file: '4_01.jpg', startSec: 241.84 },  // En 2023 le volvió a pasar.
  { file: '4_04.jpg', startSec: 244.6 },  // Pidió a sus clientes que cancelaran sus tarjetas.
  { file: '4_07.jpg', startSec: 247.46 },  // Que te tocó a ti. Para comprar por internet usa una tarjeta virtual si te la roban pierdes solo lo que lleva.
  { file: '4_14.jpg', startSec: 254.0 },  // Su estilo.
  { file: '4_15.jpg', startSec: 255.0 },  // Se lleva de viaje.
  { file: '4_16.jpg', startSec: 256.24 },  // Y tu tarjeta se va por su cuenta.
  { file: '4_18.jpg', startSec: 258.82 },  // Número 8. Anónimos.
  { file: '4_20.jpg', startSec: 260.72 },  // Las máscaras de las elecciones.
  { file: '4_22.jpg', startSec: 262.66 },  // Mayo de 2011.
  { file: '4_24.jpg', startSec: 264.26 },  // Elecciones municipales y protestas del 15M.
  { file: '4_27.jpg', startSec: 267.28 },  // Alguien intenta tumbar la web de la junta electoral central.
  { file: '4_30.jpg', startSec: 270.76 },  // La policía nacional anuncia que ha caído la cúpula de Anónimos en España. Tres detenidos.
  { file: '4_36.jpg', startSec: 276.2 },  // Pero aquí viene lo raro.
  { file: '4_38.jpg', startSec: 278.02 },  // En 2016 una jueza de jijón los absolvió de todo.
  { file: '4_41.jpg', startSec: 281.88 },  // Hoy ese truco lo usan grupos pros rusos como No Name 057.
  { file: '4_46.jpg', startSec: 286.56 },  // Que te tocó a ti.
  { file: '4_47.jpg', startSec: 287.84 },  // Una web caída.
  { file: '4_49.jpg', startSec: 289.18 },  // Desconfía de las webs alternativas que circulen por redes.
  { file: '4_52.jpg', startSec: 292.74 },  // Su estilo.
  { file: '4_54.jpg', startSec: 294.0 },  // Todos llevan la misma máscara y nadie sabe quién hay debajo.
  { file: '4_58.jpg', startSec: 298.04 },  // Y llegamos a los dos más raros.
  { file: '5_00.jpg', startSec: 300.3 },  // Número 9.
  { file: '5_01.jpg', startSec: 301.34 },  // Hacienda.
  { file: '5_02.jpg', startSec: 302.18 },  // El ataque que nunca pasó.
  { file: '5_04.jpg', startSec: 304.36 },  // Diciembre de 2024.
  { file: '5_06.jpg', startSec: 306.32 },  // Un grupo llamado Trinity dice haber jaqueado la agencia tributaria.
  { file: '5_10.jpg', startSec: 310.38 },  // Asegura tener 560 higas y pone fecha para publicarlos.
  { file: '5_14.jpg', startSec: 314.9 },  // Pero hacienda revisa sus sistemas y no encuentran ninguna intrusión.
  { file: '5_19.jpg', startSec: 319.16 },  // Según la prensa, la atacada era una pequeña gestoria de Málaga.
  { file: '5_23.jpg', startSec: 323.0 },  // Otros sí entraron en el estado,
  { file: '5_24.jpg', startSec: 324.94 },  // como al casé que en el poder judicial.
  { file: '5_27.jpg', startSec: 327.36 },  // Que te tocó a ti. Tus datos fiscales también viven en tu gestoria.
  { file: '5_31.jpg', startSec: 331.18 },  // Pregúntale como los protege.
  { file: '5_33.jpg', startSec: 333.24 },  // Su estilo amenaza al gigante y muerde al pequeño.
  { file: '5_37.jpg', startSec: 337.3 },  // Y el último.
  { file: '5_38.jpg', startSec: 338.26 },  // El más raro de todos.
  { file: '5_39.jpg', startSec: 339.84 },  // Número 10.
  { file: '5_40.jpg', startSec: 340.86 },  // Pegasus.
  { file: '5_41.jpg', startSec: 341.74 },  // El espía del presidente.
  { file: '5_43.jpg', startSec: 343.98 },  // Mayo de 2022.
  { file: '5_45.jpg', startSec: 345.88 },  // El gobierno convoca una rueda de prensa urgente.
  { file: '5_48.jpg', startSec: 348.88 },  // Volvamos a la pregunta.
  { file: '5_50.jpg', startSec: 350.3 },  // ¿De quién era el móvil?
  { file: '5_52.jpg', startSec: 352.04 },  // De Pedro Sánchez,
  { file: '5_53.jpg', startSec: 353.16 },  // el presidente.
  { file: '5_54.jpg', startSec: 354.76 },  // Según el gobierno, un programa espía llamado Pegasus se llevó más de dos higas y medio de su móvil.
  { file: '6_00.jpg', startSec: 360.74 },  // ¿Y quién lo mandó?
  { file: '6_02.jpg', startSec: 362.42 },  // Nadie lo sabe.
  { file: '6_03.jpg', startSec: 363.64 },  // El juez archivo el caso.
  { file: '6_05.jpg', startSec: 365.32 },  // Según él, Israel nunca colaboró.
  { file: '6_08.jpg', startSec: 368.06 },  // Que te tocó a ti.
  { file: '6_09.jpg', startSec: 369.34 },  // Actualiza el móvil en cuanto salga a un parche.
  { file: '6_11.jpg', startSec: 371.94 },  // Su estilo.
  { file: '6_13.jpg', startSec: 373.08 },  // Se mete en el bolsillo del presidente.
  { file: '6_15.jpg', startSec: 375.34 },  // Y nadie sabe quién lo envió.
  { file: '6_17.jpg', startSec: 377.44 },  // ¿Y tú?
  { file: '6_18.jpg', startSec: 378.28 },  // ¿Cuál de los 10 te tocó más de cerca?
  { file: '6_20.jpg', startSec: 380.38 },  // Te leo en los comentarios.
  { file: '6_22.jpg', startSec: 382.14 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '6_26.jpg', startSec: 386.86 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 31.14, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 60.48, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 93.12, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 121.56, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 156.16, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 189.68, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 191.92, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 222.36, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 258.82, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 300.3, volume: 0.13 },
  { file: 'chapter_sting_final.mp3', startSec: 339.84, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 348.88, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 382.14, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const CadaGranCiberataqueQueHaSufridoEspana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-gran-ciberataque-que-ha-sufrido-espana.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-gran-ciberataque-que-ha-sufrido-espana-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-gran-ciberataque-que-ha-sufrido-espana-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-gran-ciberataque-que-ha-sufrido-espana/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
