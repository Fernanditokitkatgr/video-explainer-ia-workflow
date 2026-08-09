import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Te han hackeado y no lo sabes — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Ahora mismo, mientras ves esto,"
  { file: '0_02.jpg', startSec: 2.3 },  // "puede haber alguien dentro de una de tus cuentas."
  { file: '0_04.jpg', startSec: 4.88 },  // "Y lo peor no es eso,"
  { file: '0_06.jpg', startSec: 6.3 },  // "lo peores que llevaría ahí semanas,"
  { file: '0_08.jpg', startSec: 8.56 },  // "y tú no habrías notado absolutamente nada."
  { file: '0_11.jpg', startSec: 11.62 },  // "Al final de este vídeo vas a saber las cinco señales exactas que delatan a un intruso,"
  { file: '0_16.jpg', startSec: 16.38 },  // "y vas a poder comprobar en cinco minutos si tú eres una de las víctimas."
  { file: '0_20.jpg', startSec: 20.54 },  // "Porque el otro día contamos la historia del hacker,"
  { file: '0_23.jpg', startSec: 23.18 },  // "hoy le damos la vuelta a la cámara,"
  { file: '0_25.jpg', startSec: 25.1 },  // "hoy la víctima eres tú."
  { file: '0_27.jpg', startSec: 27.02 },  // "Y lo primero que tienes que entender es el silencio."
  { file: '0_30.jpg', startSec: 30.0 },  // "En las películas cuando te jakean, la pantalla se pone roja y suena una alarma."
  { file: '0_34.jpg', startSec: 34.82 },  // "En la vida real no suena nada,"
  { file: '0_36.jpg', startSec: 36.62 },  // "no hay humo, no hay ruido,"
  { file: '0_38.jpg', startSec: 38.3 },  // "no hay aviso."
  { file: '0_39.jpg', startSec: 39.98 },  // "IBM publica cada año su informe sobre el coste de una brecha de datos."
  { file: '0_44.jpg', startSec: 44.12 },  // "En la edición de 2024,"
  { file: '0_46.jpg', startSec: 46.0 },  // "la media para identificar y contener una brecha fue de 258 días."
  { file: '0_51.jpg', startSec: 51.92 },  // "258 días,"
  { file: '0_53.jpg', startSec: 53.34 },  // "casi nueve meses,"
  { file: '0_54.jpg', startSec: 54.8 },  // "es el tiempo que alguien puede pasar leyendo tu correo antes de que alguien se de cuenta."
  { file: '0_59.jpg', startSec: 59.76 },  // "Mandiant la empresa que investiga intrusiones reales midi otra cosa,"
  { file: '1_04.jpg', startSec: 64.02 },  // "el tiempo de permanencia,"
  { file: '1_05.jpg', startSec: 65.56 },  // "es decir, cuánto tarda el atacante desde que entra hasta que lo pillan."
  { file: '1_09.jpg', startSec: 69.44 },  // "La mediana global ha bajado a unos diez días y eso suena bien,"
  { file: '1_13.jpg', startSec: 73.16 },  // "pero es una mediana y la mediana esconde los casos largos."
  { file: '1_16.jpg', startSec: 76.88 },  // "En Mario, los investigadores descubrieron que los intrusos llevaban dentro desde 2014."
  { file: '1_22.jpg', startSec: 82.58 },  // "La brecha se anunció en 2018,"
  { file: '1_24.jpg', startSec: 84.74 },  // "cuatro años dentro."
  { file: '1_26.jpg', startSec: 86.74 },  // "Ya jú tardó años en admitir una brecha que afectó a 3 .000 millones de cuentas."
  { file: '1_31.jpg', startSec: 91.3 },  // "Y si empresas con equipos de seguridad entero tardan meses en verlo, dime una cosa."
  { file: '1_36.jpg', startSec: 96.28 },  // "¿Cuánto crees que tardarías tú,"
  { file: '1_38.jpg', startSec: 98.06 },  // "solo, sin herramientas, sin logs,"
  { file: '1_40.jpg', startSec: 100.48 },  // "sin nadie mirando?"
  { file: '1_42.jpg', startSec: 102.18 },  // "Hay cinco señales,"
  { file: '1_43.jpg', startSec: 103.52 },  // "todas fáciles de pasar por alto."
  { file: '1_45.jpg', startSec: 105.38 },  // "Vale,"
  { file: '1_46.jpg', startSec: 106.1 },  // "vamos a lo práctico."
  { file: '1_47.jpg', startSec: 107.36 },  // "Estas son las señales reales."
  { file: '1_49.jpg', startSec: 109.78 },  // "Señal número uno,"
  { file: '1_51.jpg', startSec: 111.02 },  // "sesiones activas que no reconoces."
  { file: '1_53.jpg', startSec: 113.22 },  // "Google, Instagram, WhatsApp o tu banco,"
  { file: '1_55.jpg', startSec: 115.82 },  // "te dejan verdes de que dispositivos hay sesión abierta."
  { file: '1_58.jpg', startSec: 118.96 },  // "Si ahí aparece un móvil Andro y de en Vietnam y tú tienes un iPhone en Murcia,"
  { file: '2_02.jpg', startSec: 122.92 },  // "ya lo sabes."
  { file: '2_04.jpg', startSec: 124.66 },  // "Señal número dos,"
  { file: '2_05.jpg', startSec: 125.78 },  // "un correo de tu contraseña ha cambiado que tú no pediste."
  { file: '2_09.jpg', startSec: 129.84 },  // "No lo gorres."
  { file: '2_11.jpg', startSec: 131.05 },  // "Ese correo suele ser el último viso antes de perder la cuenta."
  { file: '2_14.jpg', startSec: 134.48 },  // "Y su primo hermano es igual de peligroso,"
  { file: '2_16.jpg', startSec: 136.66 },  // "un código de verificación que llega sin que tú lo pidieras."
  { file: '2_20.jpg', startSec: 140.18 },  // "Si te llega un código que no ha solicitado, alguien está probando tu contraseña."
  { file: '2_24.jpg', startSec: 144.44 },  // "Y la tiene."
  { file: '2_26.jpg', startSec: 146.22 },  // "Señal número tres,"
  { file: '2_27.jpg', startSec: 147.46 },  // "tu móvil se queda sin cobertura de repente."
  { file: '2_30.jpg', startSec: 150.08 },  // "Eso puede ser un sim -swapping."
  { file: '2_32.jpg', startSec: 152.16 },  // "Alguien ha llamado tu operadora haciéndose pasar por ti y ha portado tu número a su tarjeta. Desde ese segundo,"
  { file: '2_38.jpg', startSec: 158.42 },  // "todos tus SMS de verificación llegan a su móvil, no al tuyo."
  { file: '2_42.jpg', startSec: 162.72 },  // "El SDI recibió 1 .600 denuncias de sim -swapping en 2021,"
  { file: '2_47.jpg', startSec: 167.62 },  // "casi 70 millones de dólares en pérdidas en un solo año."
  { file: '2_51.jpg', startSec: 171.72 },  // "Frente a unas 300 denuncias en los tres años anteriores juntos,"
  { file: '2_55.jpg', startSec: 175.46 },  // "se multiplicó por 5."
  { file: '2_57.jpg', startSec: 177.84 },  // "Señal número 4 y esta es mi favorita,"
  { file: '3_00.jpg', startSec: 180.56 },  // "porque es la más silenciosa de todas."
  { file: '3_02.jpg', startSec: 182.58 },  // "Reglas de reenvió automático creadas en tu correo sin que tú lo sepas."
  { file: '3_07.jpg', startSec: 187.14 },  // "Es una función legítima,"
  { file: '3_08.jpg', startSec: 188.7 },  // "sirve para reenviar copias de tus correos a otra dirección."
  { file: '3_12.jpg', startSec: 192.1 },  // "El atacante entra, crea una regla y sale."
  { file: '3_15.jpg', startSec: 195.42 },  // "Ya no necesita tu contraseña nunca más."
  { file: '3_18.jpg', startSec: 198.26 },  // "Le llega una copia de todo, cada día, para siempre."
  { file: '3_21.jpg', startSec: 201.54 },  // "Y encima suelen añadir un filtro para que los avisos de seguridad se borren solos antes de que los veas."
  { file: '3_27.jpg', startSec: 207.58 },  // "Así funciona el fraude del CEO,"
  { file: '3_29.jpg', startSec: 209.48 },  // "el fraude de la factura falsa."
  { file: '3_31.jpg', startSec: 211.32 },  // "El FBI cifró esas estafas en más de 2 .900 millones de dólares de pérdidas en un solo año."
  { file: '3_38.jpg', startSec: 218.8 },  // "Señal número 5,"
  { file: '3_40.jpg', startSec: 220.3 },  // "dispositivos o aplicaciones vinculadas que no conoces."
  { file: '3_43.jpg', startSec: 223.78 },  // "En WhatsApp se llaman dispositivos vinculados,"
  { file: '3_46.jpg', startSec: 226.4 },  // "en Google aplicaciones con acceso a tu cuenta."
  { file: '3_49.jpg', startSec: 229.28 },  // "Ahí puede haber un permiso que diste hace cuatro años a una app de filtros de fotos."
  { file: '3_53.jpg', startSec: 233.84 },  // "Ese permiso sigue vivo y sigue leyendo."
  { file: '3_57.jpg', startSec: 237.04 },  // "Ahora la parte que nadie cuenta,"
  { file: '3_59.jpg', startSec: 239.08 },  // "¿por qué no quiere que lo notes?"
  { file: '4_01.jpg', startSec: 241.46 },  // "Aquí está la parte que casi nadie explica bien."
  { file: '4_04.jpg', startSec: 244.02 },  // "El atacante medio no quiere hacer ruido."
  { file: '4_06.jpg', startSec: 246.22 },  // "Al revés, hace todo lo posible por no hacerlo."
  { file: '4_09.jpg', startSec: 249.48 },  // "Porque tu cuenta vale mucho más viva que quemada."
  { file: '4_12.jpg', startSec: 252.22 },  // "Si cambia tu contraseña y bloquea tu acceso,"
  { file: '4_14.jpg', startSec: 254.76 },  // "tu tenteras en horas y llamas a soporte."
  { file: '4_17.jpg', startSec: 257.08 },  // "Si no tocan nada, tiene tu correo, tus facturas, tus contactos y tu identidad durante meses."
  { file: '4_22.jpg', startSec: 262.69 },  // "Y con tu correo puede recetear la contraseña de todo lo demás."
  { file: '4_26.jpg', startSec: 266.48 },  // "Tu correo es el llaverio romáestro. Por eso los ataques buenos son aburridos."
  { file: '4_30.jpg', startSec: 270.79 },  // "¿No hay pantallas verdes?"
  { file: '4_32.jpg', startSec: 272.26 },  // "No hay letras cayendo."
  { file: '4_33.jpg', startSec: 273.8 },  // "Hay alguien leyendo tus conversaciones en silencio y esperando el momento adecuado."
  { file: '4_38.jpg', startSec: 278.94 },  // "Por ejemplo,"
  { file: '4_39.jpg', startSec: 279.97 },  // "el día que estás comprando un piso y esperas una transferencia."
  { file: '4_43.jpg', startSec: 283.36 },  // "Ahí aparece un correo perfecto, con tu hilo real citado y un número de cuenta cambiado. Pero lo que de verdad te mata no es ninguna de esas cinco."
  { file: '4_52.jpg', startSec: 292.23 },  // "Y ahora la pregunta importante."
  { file: '4_54.jpg', startSec: 294.41 },  // "¿Cómo llegan a tu contraseña si tú no le has dado nada a nadie?"
  { file: '4_58.jpg', startSec: 298.15 },  // "La mayoría de las veces no te jakean a ti,"
  { file: '5_00.jpg', startSec: 300.72 },  // "te reciclan."
  { file: '5_01.jpg', startSec: 301.86 },  // "Se llama Credential Stuffing."
  { file: '5_04.jpg', startSec: 304.31 },  // "Roban una base de datos de una web cualquiera,"
  { file: '5_06.jpg', startSec: 306.76 },  // "una tienda pequeña, un foro viejo de 2012."
  { file: '5_09.jpg', startSec: 309.93 },  // "Coge en esos millones de correos y contraseñas y los prueban automatizados en Gmail,"
  { file: '5_14.jpg', startSec: 314.66 },  // "en Amazon, en tu banco."
  { file: '5_16.jpg', startSec: 316.41 },  // "La tasa de acierto es baja, en torno al 1 por ciento."
  { file: '5_19.jpg', startSec: 319.86 },  // "Pero cuando pruebas 100 millones de combinaciones, el 1 por ciento es un millón de cuentas."
  { file: '5_24.jpg', startSec: 325.02 },  // "En 2019 apareció una recopilación llamada Collection Number One,"
  { file: '5_30.jpg', startSec: 330.36 },  // "773 millones de correos y 21 millones de contraseñas únicas en un solo archivo."
  { file: '5_36.jpg', startSec: 336.54 },  // "Nada de eso requiere talento,"
  { file: '5_38.jpg', startSec: 338.66 },  // "requiere que tú reutilices la contraseña."
  { file: '5_41.jpg', startSec: 341.41 },  // "Y ese es el punto."
  { file: '5_42.jpg', startSec: 343.14 },  // "No te pillan porque sea su objetivo."
  { file: '5_45.jpg', startSec: 345.35 },  // "Te pillan porque eres barato."
  { file: '5_47.jpg', startSec: 347.43 },  // "Vamos a lo práctico."
  { file: '5_48.jpg', startSec: 348.94 },  // "10 minutos, ahora mismo, y sales de dudas."
  { file: '5_51.jpg', startSec: 351.93 },  // "Esto es accionable."
  { file: '5_53.jpg', startSec: 353.33 },  // "Puedes hacerlo al acabar el video y deberías."
  { file: '5_56.jpg', startSec: 356.36 },  // "Uno,"
  { file: '5_56_b.jpg', startSec: 357.21 },  // "entre en la seguridad de tu cuenta de Google y de Instagram y mira las sesiones activas."
  { file: '6_01.jpg', startSec: 362.3 },  // "Cierra todas las que no reconozcas y luego cambia la contraseña en ese orden."
  { file: '6_07.jpg', startSec: 367.42 },  // "Dos,"
  { file: '6_07_b.jpg', startSec: 368.18 },  // "entre los ajustes de renvío y en los filtros de tu correo."
  { file: '6_11.jpg', startSec: 371.72 },  // "Casi nadie ha mirado eso en su vida."
  { file: '6_13.jpg', startSec: 373.86 },  // "Míralo,"
  { file: '6_14.jpg', startSec: 374.65 },  // "es donde se esconde los intrusos pacientes."
  { file: '6_17.jpg', startSec: 377.58 },  // "Tres,"
  { file: '6_17_b.jpg', startSec: 378.3 },  // "comprovas si tu correo está en filtraciones conocidas."
  { file: '6_21.jpg', startSec: 381.47 },  // "La web, Java y WinPound,"
  { file: '6_23.jpg', startSec: 383.44 },  // "lo hace gratis y llevan miles de millones de cuentas indexadas."
  { file: '6_26.jpg', startSec: 387.15 },  // "Si tu correo sale ahí con la contraseña que sigue usando,"
  { file: '6_30.jpg', startSec: 390.56 },  // "cambia la antes de seguir viendo esto."
  { file: '6_32.jpg', startSec: 393.23 },  // "Cuatro,"
  { file: '6_33.jpg', startSec: 394.09 },  // "quita el SMS como segundo factor donde puedas, porque el SMS depende de tu operadora y tu operadora se pueden cañar por teléfono."
  { file: '6_41.jpg', startSec: 402.24 },  // "Usa una app de autenticación o mejor, una llave física."
  { file: '6_45.jpg', startSec: 406.45 },  // "Microsoft calculó que el doble factor bloquea más del 99 % de los ataques de cuenta."
  { file: '6_51.jpg', startSec: 412.33 },  // "Cinco,"
  { file: '6_52.jpg', startSec: 413.2 },  // "un gestor de contraseñas."
  { file: '6_54.jpg', startSec: 414.9 },  // "No es para Gix,"
  { file: '6_55.jpg', startSec: 416.09 },  // "es para no reutilizar nunca más."
  { file: '6_58.jpg', startSec: 418.58 },  // "Con eso, una brecha en un foro viejo deja de ser una brecha en toda tu vida."
  { file: '7_03.jpg', startSec: 423.61 },  // "Y queda una última cosa,"
  { file: '7_04.jpg', startSec: 425.32 },  // "la más importante de todas."
  { file: '7_07.jpg', startSec: 427.75 },  // "Y aquí toca ser honesto contigo."
  { file: '7_09.jpg', startSec: 430.09 },  // "Ninguna de estas señales prueba por sí sola que te hayan jaqueado."
  { file: '7_13.jpg', startSec: 434.19 },  // "Una sesión rara puede ser tu propio móvil viejo."
  { file: '7_16.jpg', startSec: 437.26 },  // "Una caída de cobertura puede ser solo mala cobertura."
  { file: '7_20.jpg', startSec: 440.73 },  // "La clave no es el pánico,"
  { file: '7_22.jpg', startSec: 442.66 },  // "es el patrón. Varias señales a la vez, el mismo día."
  { file: '7_26.jpg', startSec: 446.95 },  // "Y esto es divulgación defensiva."
  { file: '7_28.jpg', startSec: 449.2 },  // "Todo lo que has visto son ajustes de tu cuenta."
  { file: '7_31.jpg', startSec: 452.19 },  // "Mirar la seguridad de cuentas ajenas no es curiosidad,"
  { file: '7_34.jpg', startSec: 455.42 },  // "es delito."
  { file: '7_36.jpg', startSec: 457.09 },  // "Volvamos al principio."
  { file: '7_38.jpg', startSec: 458.65 },  // "Te dije que alguien podría llevar semanas dentro de tus cuentas."
  { file: '7_41.jpg', startSec: 462.2 },  // "Ahora ya no depende de que suene una alarma que nunca va a sonar."
  { file: '7_45.jpg', startSec: 466.1 },  // "Depende de cinco pantallas de ajustes que puedes abrir en 10 minutos."
  { file: '7_49.jpg', startSec: 470.43 },  // "Esas la diferencia entre ser una víctima de 258 días y una de 10 minutos."
  { file: '7_56.jpg', startSec: 476.91 },  // "Si esto te ha hecho sacar el móvil a mitad del video, suscríbete,"
  { file: '7_59.jpg', startSec: 480.57 },  // "se viene más de este mundo."
];


// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'promise_sting.mp3', startSec: 11.62, volume: 0.15 },
  { file: 'silence_drop.mp3', startSec: 27.02, volume: 0.14 },
  { file: 'movie_alarm.mp3', startSec: 30.0, volume: 0.16 },
  { file: 'flatline_quiet.mp3', startSec: 38.3, volume: 0.13 },
  { file: 'clock_ticking.mp3', startSec: 51.92, volume: 0.14 },
  { file: 'impact_thud.mp3', startSec: 86.74, volume: 0.16 },
  { file: 'list_sting.mp3', startSec: 102.18, volume: 0.15 },
  { file: 'notification_1.mp3', startSec: 109.78, volume: 0.15 },
  { file: 'notification_2.mp3', startSec: 124.66, volume: 0.15 },
  { file: 'signal_lost.mp3', startSec: 146.22, volume: 0.16 },
  { file: 'sneaky_whoosh.mp3', startSec: 177.84, volume: 0.14 },
  { file: 'copy_repeat.mp3', startSec: 198.26, volume: 0.14 },
  { file: 'cash_dark.mp3', startSec: 211.32, volume: 0.16 },
  { file: 'notification_3.mp3', startSec: 218.8, volume: 0.15 },
  { file: 'reveal_dark.mp3', startSec: 237.04, volume: 0.16 },
  { file: 'keyring.mp3', startSec: 266.48, volume: 0.14 },
  { file: 'email_tense.mp3', startSec: 283.36, volume: 0.16 },
  { file: 'question_sting.mp3', startSec: 292.23, volume: 0.15 },
  { file: 'machine_gun_try.mp3', startSec: 301.86, volume: 0.14 },
  { file: 'data_dump.mp3', startSec: 325.02, volume: 0.15 },
  { file: 'cheap_buzz.mp3', startSec: 345.35, volume: 0.15 },
  { file: 'action_sting.mp3', startSec: 347.43, volume: 0.16 },
  { file: 'tick_1.mp3', startSec: 356.36, volume: 0.15 },
  { file: 'tick_2.mp3', startSec: 367.42, volume: 0.15 },
  { file: 'tick_3.mp3', startSec: 377.58, volume: 0.15 },
  { file: 'tick_4.mp3', startSec: 393.23, volume: 0.15 },
  { file: 'tick_5.mp3', startSec: 412.33, volume: 0.15 },
  { file: 'serious_turn.mp3', startSec: 423.61, volume: 0.14 },
  { file: 'gavel_soft.mp3', startSec: 457.09, volume: 0.15 },
  { file: 'loop_close.mp3', startSec: 458.65, volume: 0.15 },
  { file: 'subscribe.mp3', startSec: 480.57, volume: 0.17 },
];

// Música del canal: clip de 30 s repetido con Loop. A Loop se le pasa la duración de UNA
// iteración (el clip), nunca la del vídeo. Volumen 0.17: a 0.075 no se oía bajo la voz.
const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const TeHanHackeado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('te-han-hackeado-y-no-lo-sabes.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`te-han-hackeado-y-no-lo-sabes-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`te-han-hackeado-y-no-lo-sabes-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`te-han-hackeado-y-no-lo-sabes/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
