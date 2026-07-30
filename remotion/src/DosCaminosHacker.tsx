import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// POV: soy hacker. ¿Qué camino elijo? — mono-hacker oscuro, canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Son las tres de la madrugada."
  { file: '0_02.jpg', startSec: 2.0 },  // "Estoy solo,"
  { file: '0_03.jpg', startSec: 3.18 },  // "frente a una pantalla en negro."
  { file: '0_05.jpg', startSec: 5.66 },  // "Tengo acceso a algo que no es mío."
  { file: '0_08.jpg', startSec: 8.28 },  // "Un clic más y toda una empresa se viene abajo."
  { file: '0_11.jpg', startSec: 11.98 },  // "Mi dedo está sobre la tecla entera."
  { file: '0_14.jpg', startSec: 14.52 },  // "No pulso,"
  { file: '0_15.jpg', startSec: 15.68 },  // "todavía."
  { file: '0_17.jpg', startSec: 17.32 },  // "Antes de este momento hubo un camino muy largo y ese camino se partió en dos hace años."
  { file: '0_22.jpg', startSec: 22.88 },  // "Yo elegí una rama."
  { file: '0_24.jpg', startSec: 24.56 },  // "Tú vas a elegir la tuya,"
  { file: '0_25.jpg', startSec: 25.96 },  // "viendo esto."
  { file: '0_27.jpg', startSec: 27.14 },  // "Esta es la historia de cómo se hace un hacker y de lo que pasa según que puerta cruzas."
  { file: '0_32.jpg', startSec: 32.92 },  // "Capítulo 1. ¿Cómo nace un hacker?"
  { file: '0_35.jpg', startSec: 35.74 },  // "Nadie nace hacker."
  { file: '0_37.jpg', startSec: 37.32 },  // "Se hace noche tras noche delante de un teclado y no empiezas por el dinero."
  { file: '0_41.jpg', startSec: 41.74 },  // "Empiezas por una pregunta."
  { file: '0_43.jpg', startSec: 43.68 },  // "¿Cómo funciona esto por dentro?"
  { file: '0_45.jpg', startSec: 45.64 },  // "Aprendes Linux, porque Windows te esconde demasiado."
  { file: '0_48.jpg', startSec: 48.62 },  // "Aprendes que es un puerto, que es un paquete,"
  { file: '0_51.jpg', startSec: 51.16 },  // "como viaja un dato de un lado a otro."
  { file: '0_53.jpg', startSec: 53.4 },  // "Aprendes Python, porque tu mano se cansa, pero un script no se cansa nunca."
  { file: '0_57.jpg', startSec: 57.74 },  // "Y entonces descubres las CTF,"
  { file: '1_00.jpg', startSec: 60.2 },  // "competiciones de hacking,"
  { file: '1_01.jpg', startSec: 61.58 },  // "legales, gamificadas,"
  { file: '1_03.jpg', startSec: 63.2 },  // "hack de box,"
  { file: '1_04.jpg', startSec: 64.26 },  // "trae hackmy,"
  { file: '1_05.jpg', startSec: 65.36 },  // "máquinas virtuales que existen solo para que tú las rompas."
  { file: '1_08.jpg', startSec: 68.58 },  // "Cada máquina es un puzzle y cada puzzle te engancha un poco más."
  { file: '1_12.jpg', startSec: 72.96 },  // "Un año después ya piensas distinto que el resto del mundo."
  { file: '1_16.jpg', startSec: 76.34 },  // "Miras una web y no ves un diseño,"
  { file: '1_18.jpg', startSec: 78.72 },  // "ves una superficie de ataque."
  { file: '1_20.jpg', startSec: 80.7 },  // "Miras un formulario de login y te preguntas qué pasas y metes algo que no debería ir ahí."
  { file: '1_25.jpg', startSec: 85.8 },  // "Y en algún punto, sin darte cuenta,"
  { file: '1_28.jpg', startSec: 88.14 },  // "ya sabes entrar donde no deberías."
  { file: '1_30.jpg', startSec: 90.38 },  // "Ahí es exactamente donde se abre la bifurcación."
  { file: '1_34.jpg', startSec: 94.04 },  // "Capítulo 2. La bifurcación."
  { file: '1_36.jpg', startSec: 96.6 },  // "Tienes la habilidad."
  { file: '1_38.jpg', startSec: 98.14 },  // "Ahora toca decidir qué haces con ella."
  { file: '1_40.jpg', startSec: 100.52 },  // "Un camino te ofrece un contrato, una nómina, un currículum."
  { file: '1_44.jpg', startSec: 104.14 },  // "El otro te ofrece dinero rápido, sin preguntas,"
  { file: '1_46.jpg', startSec: 106.7 },  // "sin jefe."
  { file: '1_48.jpg', startSec: 108.0 },  // "Miles de hackers jóvenes reciben esa segunda oferta en foros ocultos, en privado."
  { file: '1_53.jpg', startSec: 113.14 },  // "Tenemos acceso a una empresa,"
  { file: '1_55.jpg', startSec: 115.12 },  // "solo hace falta que actives la carga."
  { file: '1_57.jpg', startSec: 117.46 },  // "Suena fácil y esa es exactamente la trampa."
  { file: '2_01.jpg', startSec: 121.2 },  // "Otros cogen ese mismo talento y lo certifican."
  { file: '2_04.jpg', startSec: 124.48 },  // "Saca en el oscp,"
  { file: '2_06.jpg', startSec: 126.26 },  // "la certificación que demuestra que saben jaquear de verdad no solo de boca."
  { file: '2_10.jpg', startSec: 130.7 },  // "Se dan de alta en hacker one y en back crowd plataformas donde las empresas pagan por encontrar sus fallos."
  { file: '2_17.jpg', startSec: 137.04 },  // "Mismo cerebro,"
  { file: '2_18.jpg', startSec: 138.52 },  // "mismas manos,"
  { file: '2_19.jpg', startSec: 139.68 },  // "caminos completamente opuestos."
  { file: '2_21.jpg', startSec: 141.78 },  // "Vamos a ver los dos, uno detrás del otro."
  { file: '2_24.jpg', startSec: 144.94 },  // "Capítulo 3. El camino ético."
  { file: '2_27.jpg', startSec: 147.56 },  // "Aquí soy Pentester o Red Timmer."
  { file: '2_30.jpg', startSec: 150.16 },  // "Me pagan por atacar con permiso por escrito."
  { file: '2_33.jpg', startSec: 153.18 },  // "Un lunes cualquiera,"
  { file: '2_34.jpg', startSec: 154.5 },  // "mi trabajo es intentar entrar en el banco que me ha contratado,"
  { file: '2_37.jpg', startSec: 157.68 },  // "no para robar nada,"
  { file: '2_39.jpg', startSec: 159.08 },  // "para avisarles de la grieta antes de que otro la encuentre primero."
  { file: '2_42.jpg', startSec: 162.46 },  // "Mando un correo de fishing simulado a sus empleados."
  { file: '2_45.jpg', startSec: 165.6 },  // "La mitad hace clic."
  { file: '2_47.jpg', startSec: 167.04 },  // "Siempre hay quien hace clic."
  { file: '2_48.jpg', startSec: 168.68 },  // "Provebo contraseñas filtradas de otras brechas porque la gente reutiliza contraseñas."
  { file: '2_53.jpg', startSec: 173.56 },  // "Siempre la reutiliza."
  { file: '2_55.jpg', startSec: 175.76 },  // "Y en tres días estoy dentro de su red interna."
  { file: '2_58.jpg', startSec: 178.82 },  // "Escalo privilegios,"
  { file: '3_00.jpg', startSec: 180.22 },  // "llego a controlador de dominio."
  { file: '3_02.jpg', startSec: 182.4 },  // "Tecnicamente podría cifrar la empresa entera ahora mismo."
  { file: '3_05.jpg', startSec: 185.96 },  // "Pero no lo hago,"
  { file: '3_07.jpg', startSec: 187.14 },  // "escribo un informe de cuarenta páginas en su lugar."
  { file: '3_10.jpg', startSec: 190.1 },  // "Ese informe vale más que cualquier ataque."
  { file: '3_13.jpg', startSec: 193.18 },  // "Y el dinero?"
  { file: '3_14.jpg', startSec: 194.32 },  // "Aquí está lo que muy poca gente sabe."
  { file: '3_16.jpg', startSec: 196.54 },  // "Un Pentester Junior en España empieza cerca de 30 .000 euros al año."
  { file: '3_21.jpg', startSec: 201.0 },  // "Un Red Timmer con experiencia supera los 70 .000."
  { file: '3_24.jpg', startSec: 204.24 },  // "Pero el Bag Bounty juega en otra liga."
  { file: '3_26.jpg', startSec: 206.66 },  // "Encontrar un solo fallo crítico en Google o en Apple puede pagarte más de 100 .000 dólares."
  { file: '3_33.jpg', startSec: 213.4 },  // "Por un chaval argentino llamado Santiago López se convirtió en el primer jaquerético millonario del mundo."
  { file: '3_40.jpg', startSec: 220.54 },  // "Un millón de dólares,"
  { file: '3_42.jpg', startSec: 222.32 },  // "encontrando fallos sin romper ni una sola ley."
  { file: '3_46.jpg', startSec: 226.04 },  // "Apple ha llegado a pagar hasta dos millones de dólares por un solo exploit de los grandes,"
  { file: '3_50.jpg', startSec: 230.68 },  // "acceso remoto sin que la víctima toque nada."
  { file: '3_53.jpg', startSec: 233.74 },  // "Mi momento más espectacular en este camino llega un martes cualquiera."
  { file: '3_57.jpg', startSec: 237.9 },  // "Me contratan de una empresa de seguridad física."
  { file: '4_00.jpg', startSec: 240.66 },  // "La misión entrar en su frazo de técnico de mantenimiento."
  { file: '4_06.jpg', startSec: 246.58 },  // "Enseño una tarjeta falsa que he fabricado yo mismo."
  { file: '4_09.jpg', startSec: 249.94 },  // "El guardia me abre la puerta él mismo sin dudarlo."
  { file: '4_13.jpg', startSec: 253.02 },  // "Estoy dentro del edificio en menos de cuatro minutos."
  { file: '4_16.jpg', startSec: 256.42 },  // "Al día siguiente se lo explico todo al director de seguridad con una sonrisa café en mano."
  { file: '4_22.jpg', startSec: 262.28 },  // "Ese es el camino ético,"
  { file: '4_23.jpg', startSec: 263.98 },  // "adrenalina real,"
  { file: '4_25.jpg', startSec: 265.44 },  // "sueldo real y cero cárcel."
  { file: '4_28.jpg', startSec: 268.32 },  // "Capítulo 4."
  { file: '4_29.jpg', startSec: 269.52 },  // "El camino criminal."
  { file: '4_31.jpg', startSec: 271.1 },  // "Aquí soy afiliado."
  { file: '4_32.jpg', startSec: 272.72 },  // "Trabajo para un grupo de ramson guercomo servicio."
  { file: '4_35.jpg', startSec: 275.48 },  // "Yo no programo el virus."
  { file: '4_37.jpg', startSec: 277.04 },  // "Otro lo he hecho."
  { file: '4_38.jpg', startSec: 278.24 },  // "Yo solo lo distribuyo."
  { file: '4_40.jpg', startSec: 280.14 },  // "Compró el acceso a una empresa por dos mil dólares a un corredor de accesos en un foro oculto. Entro por una WPN mal configurada que alguien más encontró antes que yo."
  { file: '4_49.jpg', startSec: 289.28 },  // "Paso semanas ahí dentro en silencio sin tocar nada todavía."
  { file: '4_52.jpg', startSec: 292.64 },  // "Solo miro,"
  { file: '4_53.jpg', startSec: 293.56 },  // "solo aprendo su red."
  { file: '4_55.jpg', startSec: 295.48 },  // "Primero robo los datos, contratos, nóminas y historiales médicos."
  { file: '4_59.jpg', startSec: 299.7 },  // "Luego de madrugada activo el cifrado en todos sus servidores a la vez."
  { file: '5_03.jpg', startSec: 303.98 },  // "A las nueve de la mañana la empresa entera está bloqueada,"
  { file: '5_07.jpg', startSec: 307.54 },  // "pantallas, negras,"
  { file: '5_08.jpg', startSec: 308.82 },  // "letras rojas,"
  { file: '5_09.jpg', startSec: 309.96 },  // "dejó una nota."
  { file: '5_11.jpg', startSec: 311.32 },  // "Paga o publicamos todo lo que hemos robado."
  { file: '5_14.jpg', startSec: 314.36 },  // "Si pagan me llevo hasta el 80 % del rescate."
  { file: '5_17.jpg', startSec: 317.58 },  // "El resto es para el grupo que hizo el virus."
  { file: '5_20.jpg', startSec: 320.14 },  // "En 2021, Colonial Pipeline pagó 4 ,4 millones de dólares en Bitcoin a un solo grupo Darkside."
  { file: '5_28.jpg', startSec: 328.2 },  // "Y para mí el afiliado en una sola operación,"
  { file: '5_31.jpg', startSec: 331.1 },  // "puede ser una casa, puede ser un coche caro."
  { file: '5_34.jpg', startSec: 334.14 },  // "Pero aquí está lo que las series nunca te cuentan."
  { file: '5_37.jpg', startSec: 337.08 },  // "El FBI no necesita atraparme jakeando."
  { file: '5_39.jpg', startSec: 339.9 },  // "Le basta con que gaste mal ese dinero."
  { file: '5_42.jpg', startSec: 342.12 },  // "Un reloj caro en redes sociales, una transferencia torpe,"
  { file: '5_45.jpg', startSec: 345.46 },  // "un compañero que confiesa para reducir su condena."
  { file: '5_48.jpg', startSec: 348.58 },  // "Las condenas por ramsón muera gran escala, superan hoy los 20 años de prisión,"
  { file: '5_53.jpg', startSec: 353.18 },  // "algunas más de 80."
  { file: '5_55.jpg', startSec: 355.0 },  // "Y el Bitcoin que cobre queda escrito para siempre en una cadena pública."
  { file: '5_59.jpg', startSec: 359.12 },  // "No se borra nunca."
  { file: '6_00.jpg', startSec: 360.7 },  // "Los investigadores tienen años enteros para rastrearlo."
  { file: '6_03.jpg', startSec: 363.86 },  // "Yo solo tengo una vida."
  { file: '6_06.jpg', startSec: 366.18 },  // "Mi momento más espectacular en este camino llega de madrugada,"
  { file: '6_09.jpg', startSec: 369.62 },  // "la noche que cifro mi primera empresa grande."
  { file: '6_12.jpg', startSec: 372.46 },  // "Veo entrar el primer pago en mi cartera y por un segundo siento que he ganado."
  { file: '6_17.jpg', startSec: 377.14 },  // "Lo que no veo esa noche es a la gente federal que ya ha etiquetado esa transacción,"
  { file: '6_22.jpg', startSec: 382.1 },  // "ya conoce mi nombre de usuario."
  { file: '6_24.jpg', startSec: 384.08 },  // "Solo espera el momento."
  { file: '6_26.jpg', startSec: 386.62 },  // "Capítulo 5."
  { file: '6_28.jpg', startSec: 388.0 },  // "Cara a cara."
  { file: '6_29.jpg', startSec: 389.66 },  // "Pongo las tifras una al lado de la otra."
  { file: '6_32.jpg', startSec: 392.0 },  // "Camino ético,"
  { file: '6_33.jpg', startSec: 393.08 },  // "sueldo estable, un bonus por cada fallo,"
  { file: '6_35.jpg', startSec: 395.56 },  // "cero ríes golegal y una carrera de décadas por delante."
  { file: '6_39.jpg', startSec: 399.0 },  // "Camino criminal,"
  { file: '6_40.jpg', startSec: 400.42 },  // "pagos más grandes sobre el papel,"
  { file: '6_42.jpg', startSec: 402.2 },  // "pero un reloj corriendo desde el primer click."
  { file: '6_44.jpg', startSec: 404.84 },  // "Y aquí está el dato que casi nadie calcula."
  { file: '6_47.jpg', startSec: 407.42 },  // "El valor esperado real no el número bonito del titular."
  { file: '6_51.jpg', startSec: 411.36 },  // "Si existe una probabilidad alta de acabar 20 años en prisión,"
  { file: '6_55.jpg', startSec: 415.16 },  // "ese pago grande vale mucho menos de lo que parece en la pantalla."
  { file: '6_59.jpg', startSec: 419.62 },  // "El hacker ético cobra menos por cada golpe, pero cobra siempre y duerme tranquilo sin mirar la puerta cada noche."
  { file: '7_06.jpg', startSec: 426.5 },  // "La habilidad es idéntica en los dos caminos."
  { file: '7_08.jpg', startSec: 428.98 },  // "El destino no."
  { file: '7_11.jpg', startSec: 431.28 },  // "Capítulo 6."
  { file: '7_12.jpg', startSec: 432.48 },  // "El cierre."
  { file: '7_13.jpg', startSec: 433.9 },  // "Así que si tuvieras este talento hoy mismo,"
  { file: '7_16.jpg', startSec: 436.82 },  // "¿qué puerta cruzarías tú?"
  { file: '7_18.jpg', startSec: 438.86 },  // "La buena noticia es que la puerta ética está abierta ahora mismo, y es gratis."
  { file: '7_23.jpg', startSec: 443.28 },  // "Puedes entrar hoy en tryhacmi o en hack de box sin pagar nada."
  { file: '7_27.jpg', startSec: 447.74 },  // "El mismo cerebro que podría meterte 20 años en la cárcel puede pagarte un sueldo de seis tifras."
  { file: '7_33.jpg', startSec: 453.54 },  // "Solo cambia la puerta que decide escruzar."
  { file: '7_36.jpg', startSec: 456.48 },  // "Si esta comparación te ha volado la cabeza, suscríbete."
  { file: '7_39.jpg', startSec: 459.56 },  // "Se viene más de este mundo, muy pronto."
];



// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'click_tick.mp3', startSec: 8.28, volume: 0.14 },
  { file: 'keyboard_tension.mp3', startSec: 11.98, volume: 0.15 },
  { file: 'fork_whoosh.mp3', startSec: 17.32, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 32.92, volume: 0.17 },
  { file: 'game_blip.mp3', startSec: 57.74, volume: 0.13 },
  { file: 'time_whoosh.mp3', startSec: 72.96, volume: 0.12 },
  { file: 'target_lock_beep.mp3', startSec: 78.72, volume: 0.14 },
  { file: 'ominous_sting_1.mp3', startSec: 90.38, volume: 0.15 },
  { file: 'chapter_sting_2.mp3', startSec: 94.04, volume: 0.17 },
  { file: 'dark_message_ping.mp3', startSec: 113.14, volume: 0.14 },
  { file: 'danger_buzz.mp3', startSec: 115.12, volume: 0.16 },
  { file: 'achievement_chime.mp3', startSec: 124.48, volume: 0.15 },
  { file: 'notification_ping_1.mp3', startSec: 130.7, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 144.94, volume: 0.17 },
  { file: 'paper_stamp.mp3', startSec: 150.16, volume: 0.13 },
  { file: 'click_alert.mp3', startSec: 165.6, volume: 0.14 },
  { file: 'tense_sting_2.mp3', startSec: 182.4, volume: 0.16 },
  { file: 'positive_chime.mp3', startSec: 190.1, volume: 0.14 },
  { file: 'cash_register_1.mp3', startSec: 220.54, volume: 0.16 },
  { file: 'cash_register_2.mp3', startSec: 226.04, volume: 0.17 },
  { file: 'door_creak.mp3', startSec: 249.94, volume: 0.13 },
  { file: 'success_whoosh.mp3', startSec: 253.02, volume: 0.13 },
  { file: 'light_chime.mp3', startSec: 256.42, volume: 0.13 },
  { file: 'chapter_sting_4.mp3', startSec: 268.32, volume: 0.18 },
  { file: 'dark_transaction.mp3', startSec: 280.14, volume: 0.14 },
  { file: 'encryption_glitch_1.mp3', startSec: 299.7, volume: 0.18 },
  { file: 'alarm_blare.mp3', startSec: 303.98, volume: 0.18 },
  { file: 'ransom_sting.mp3', startSec: 311.32, volume: 0.18 },
  { file: 'cash_register_dark.mp3', startSec: 320.14, volume: 0.16 },
  { file: 'police_sting.mp3', startSec: 337.08, volume: 0.17 },
  { file: 'cell_clang.mp3', startSec: 348.58, volume: 0.17 },
  { file: 'digital_lock_permanent.mp3', startSec: 355.0, volume: 0.14 },
  { file: 'encryption_glitch_2.mp3', startSec: 366.18, volume: 0.16 },
  { file: 'cash_glitch.mp3', startSec: 372.46, volume: 0.15 },
  { file: 'ominous_reveal_sting.mp3', startSec: 377.14, volume: 0.17 },
  { file: 'chapter_sting_5.mp3', startSec: 386.62, volume: 0.16 },
  { file: 'deflate_sound.mp3', startSec: 415.16, volume: 0.14 },
  { file: 'calm_chime.mp3', startSec: 419.62, volume: 0.12 },
  { file: 'chapter_sting_6.mp3', startSec: 431.28, volume: 0.16 },
  { file: 'door_open_bright.mp3', startSec: 438.86, volume: 0.14 },
  { file: 'final_sting.mp3', startSec: 453.54, volume: 0.16 },
  { file: 'subscribe_chime.mp3', startSec: 456.48, volume: 0.17 },
];

export const DosCaminosHacker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.1;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117' }}>
      <Audio src={staticFile('dos-caminos-hacker.mp3')} playbackRate={PLAYBACK_RATE} />
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`dos-caminos-hacker-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`dos-caminos-hacker-v2/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
