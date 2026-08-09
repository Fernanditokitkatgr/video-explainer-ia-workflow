import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// Qué hacen con tu DNI robado — canal tecno.
// === FRAMES:START (generado — no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // "Tu DNA vale más que tu tarjeta de crédito en el mercado negro, y al final de este vídeo vas a entender exactamente por qué."
  { file: '0_06.jpg', startSec: 6.96 },  // "No es porque sea más difícil de robar, es porque una tarjeta se cancela en un día, tu identidad no se cancela nunca."
  { file: '0_14.jpg', startSec: 14.18 },  // "Hoy vamos a seguir el viaje completo de una foto de tu DNA,"
  { file: '0_17.jpg', startSec: 17.36 },  // "desde el segundo en que sale de tus manos,"
  { file: '0_19.jpg', startSec: 19.38 },  // "hasta el día en que te llega una carta de un banco donde nunca has estado."
  { file: '0_22.jpg', startSec: 22.9 },  // "Vamos."
  { file: '0_23.jpg', startSec: 23.82 },  // "Primera parada, de donde sale de verdad tu DNA."
  { file: '0_27.jpg', startSec: 27.02 },  // "Cuando pensamos en robo de identidad, imaginamos a alguien quitándote la cartera, y eso casi nunca es lo que pasa."
  { file: '0_33.jpg', startSec: 33.44 },  // "La inmensa mayoría de los documentos de identidad que circulan hoy salieron de una base de datos,"
  { file: '0_38.jpg', startSec: 38.24 },  // "no de un bolsillo."
  { file: '0_39.jpg', startSec: 39.58 },  // "Salieron de empresas donde tú te registraste con toda la buena fe del mundo."
  { file: '0_43.jpg', startSec: 43.56 },  // "Piensa en cuántas veces ha subido una foto de tu DNA y a una web. Para verificar tu cuenta en una casa de apuestas,"
  { file: '0_49.jpg', startSec: 49.38 },  // "para abrir un banco digital desde el sofá, para darte de alta en un exchange de criptomonedas,"
  { file: '0_54.jpg', startSec: 54.0 },  // "cada una de esas copias sigue existiendo en algún servidor, y tú no controlas ninguna."
  { file: '0_59.jpg', startSec: 59.2 },  // "En 2021 una filtración expuso datos de más de 500 millones de usuarios de Facebook con teléfonos incluidos."
  { file: '1_05.jpg', startSec: 65.72 },  // "En 2019,"
  { file: '1_06.jpg', startSec: 66.88 },  // "Capital One perdió datos de 100 millones de personas,"
  { file: '1_09.jpg', startSec: 69.82 },  // "incluidos números de la seguridad social."
  { file: '1_12.jpg', startSec: 72.18 },  // "Y en España, en 2023,"
  { file: '1_14.jpg', startSec: 74.0 },  // "se filtraron datos de cientos de miles de clientes de un grupo hospitalario privado."
  { file: '1_18.jpg', startSec: 78.62 },  // "Y ahora el otro gran canal, el que casi nadie vigila, el chat."
  { file: '1_22.jpg', startSec: 82.62 },  // "Has enviado una foto de tu DNA por WhatsApp alguna vez, al casero, a la agencia,"
  { file: '1_27.jpg', startSec: 87.44 },  // "al compañero de trabajo que gestionaba el papeléo."
  { file: '1_30.jpg', startSec: 90.18 },  // "Esa foto ya no está solo en tu móvil,"
  { file: '1_32.jpg', startSec: 92.3 },  // "está en el móvil de otra persona sin cifrar en una carpeta que nadie limpia nunca."
  { file: '1_37.jpg', startSec: 97.02 },  // "Y si a ese señor le entran en la cuenta, tu documento se va con lo demás."
  { file: '1_41.jpg', startSec: 101.24 },  // "Y el tercer canal es el más sucio de los tres, el Fishing Directo. Un correo perfecto de tu banco pidiendote verificar tu identidad,"
  { file: '1_48.jpg', startSec: 108.92 },  // "un mensaje de una empresa de mensajería que necesita una foto del documento para liberar el paquete."
  { file: '1_54.jpg', startSec: 114.42 },  // "Ninguna entidad legítima te pide una foto de tu DNA y por chat ni por correo para desbloquear nada."
  { file: '1_59.jpg', startSec: 119.88 },  // "Ninguna, nunca."
  { file: '2_01.jpg', startSec: 121.46 },  // "Eso solo lo hace quien lo quiere para otra cosa."
  { file: '2_04.jpg', startSec: 124.58 },  // "Siguiente parada, ¿cuánto vale tu identidad ahí dentro?"
  { file: '2_07.jpg', startSec: 127.98 },  // "Aquí es donde la mayoría de la gente se lleva en la primera sorpresa."
  { file: '2_11.jpg', startSec: 131.46 },  // "Según los informes de precios del mercado negro que publican cada año empresas como Privacy Affairs,"
  { file: '2_16.jpg', startSec: 136.44 },  // "los números son ridículamente bajos. Los datos de una tarjeta de crédito con saldo se venden por unos pocos dólares y un escaneo de un documento de identidad se mueve en un rango parecido, pero se paga mejor cuando viene completo."
  { file: '2_28.jpg', startSec: 148.72 },  // "Un pack con documento, slip sujetándolo y un recibo de luz a tu nombre puede irse a bastante más."
  { file: '2_34.jpg', startSec: 154.48 },  // "Y por qué se paga más por los segundos y son cifras parecidas?"
  { file: '2_37.jpg', startSec: 157.98 },  // "Por su vida útil."
  { file: '2_39.jpg', startSec: 159.34 },  // "Una tarjeta robada tiene la vida de una mosca."
  { file: '2_41.jpg', startSec: 161.96 },  // "En 24 horas es el número está muerto y el banco te devuelve el dinero."
  { file: '2_46.jpg', startSec: 166.22 },  // "Tu número de documento, tu fecha de nacimiento, tu nombre completo y tu firma no expiran. No hay un teléfono al que llamar para cancelar tu identidad. La tarjeta es un billete de un solo uso."
  { file: '2_56.jpg', startSec: 176.68 },  // "Tu identidad es un abono anual."
  { file: '2_58.jpg', startSec: 178.82 },  // "Y por eso el segundo producto se revende una y otra vez a compradores distintos durante años."
  { file: '3_04.jpg', startSec: 184.34 },  // "Y aquí empieza lo serio."
  { file: '3_05.jpg', startSec: 185.96 },  // "¿Para qué se usa exactamente?"
  { file: '3_08.jpg', startSec: 188.02 },  // "Aquí llega la parte que casi nunca se cuenta bien."
  { file: '3_10.jpg', startSec: 190.6 },  // "Nadie roba tu DNA y para mirarlo. Lo roba para convertirlo en dinero y hay cuatro formas principales."
  { file: '3_16.jpg', startSec: 196.52 },  // "Uno,"
  { file: '3_17.jpg', startSec: 197.38 },  // "crédito a tu nombre."
  { file: '3_18.jpg', startSec: 198.58 },  // "Se abre una cuenta en un banco digital con tu documento. Se pide un préstamo rápido de esos que se aproban en 10 minutos con una foto."
  { file: '3_25.jpg', startSec: 205.68 },  // "El dinero llega, el producto se revende y las cuotas quedan a tu nombre."
  { file: '3_30.jpg', startSec: 210.12 },  // "Dos,"
  { file: '3_30_b.jpg', startSec: 210.82 },  // "líneas de telefonía móvil."
  { file: '3_32.jpg', startSec: 212.4 },  // "Se contratan varias líneas con tu identidad. Se usan para fraud y se abandonan. Cuando llega el impago, la operadora no busca al que la contrató. Busca al titular."
  { file: '3_41.jpg', startSec: 221.28 },  // "Y de ahí sale el uso más peligroso de todos."
  { file: '3_43.jpg', startSec: 223.96 },  // "Tres, el SIM Swapping o duplicado fraudulento de tarjeta SIM. Alguien se presenta con tus datos y pide un duplicado de tu número."
  { file: '3_51.jpg', startSec: 231.28 },  // "Si convence a la operadora, tu móvil se queda sin cobertura de golpe."
  { file: '3_54.jpg', startSec: 234.94 },  // "Y todos los códigos de verificación por SMS empiezan a llegar a su teléfono. El del banco, el del correo, el de tu exchange de criptomonedas. En España hubo con denas por esta vía con robos de decenas de miles de euros en cuentas bancarias."
  { file: '4_08.jpg', startSec: 248.0 },  // "Es de los pocos fraudes donde tu segundo factor de seguridad se convierte en el arma del atacante."
  { file: '4_13.jpg', startSec: 254.07 },  // "Y cuatro,"
  { file: '4_15.jpg', startSec: 255.16 },  // "el alquiler de identidad."
  { file: '4_16.jpg', startSec: 256.75 },  // "Tu documento se le presta a otros delitos como fachada."
  { file: '4_20.jpg', startSec: 260.29 },  // "Empresas pantallas registradas con tu nombre."
  { file: '4_22.jpg', startSec: 263.07 },  // "Tú no cometes nada, pero tu nombre aparece en el papel."
  { file: '4_26.jpg', startSec: 267.06 },  // "Ahora la parte que te toca a ti directamente."
  { file: '4_29.jpg', startSec: 269.92 },  // "Vamos a bajarlo a tu vida concreta porque aquí es donde deja de ser una curiosidad tecnológica."
  { file: '4_35.jpg', startSec: 275.67 },  // "Tú no notas nada durante meses."
  { file: '4_37.jpg', startSec: 278.02 },  // "Lo notas el día que vas a pedir una hipoteca y te la deniegan sin explicación clara."
  { file: '4_42.jpg', startSec: 283.3 },  // "Lo notas cuando aparece tu nombre en un fichero de morosos por una deuda de la que no sabes nada."
  { file: '4_47.jpg', startSec: 288.47 },  // "En España esos ficheros existen y se llaman a SNES y BadexQ"
  { file: '4_51.jpg', startSec: 292.71 },  // "y una anotación ahí te cierra puertas durante años aunque la deuda no sea tuya."
  { file: '4_57.jpg', startSec: 298.37 },  // "Y ahora la parte injusta."
  { file: '4_59.jpg', startSec: 300.48 },  // "La carga de la prueba cae del lado del que ha sido víctima."
  { file: '5_02.jpg', startSec: 304.2 },  // "Tú tienes que denunciar, reclamar a cada entidad,"
  { file: '5_05.jpg', startSec: 307.16 },  // "aportar documentación y esperar."
  { file: '5_07.jpg', startSec: 309.29 },  // "Puedes tardar meses en limpiar una sola anotación."
  { file: '5_11.jpg', startSec: 312.73 },  // "La tarjeta se cancela en un día, ¿te acuerdas?"
  { file: '5_13.jpg', startSec: 315.16 },  // "Esto no."
  { file: '5_15.jpg', startSec: 316.8 },  // "Vamos a lo que puedes hacer a partir de hoy mismo."
  { file: '5_18.jpg', startSec: 319.78 },  // "La buena noticia es que casi todo el daño se evita con cuatro hábitos que no cuesta en dinero."
  { file: '5_23.jpg', startSec: 325.47 },  // "Uno,"
  { file: '5_24.jpg', startSec: 326.29 },  // "no envies nunca una foto de tu DNA y por chat."
  { file: '5_27.jpg', startSec: 329.52 },  // "Ni por WhatsApp, ni por Telegram, ni por correo normal."
  { file: '5_30.jpg', startSec: 332.85 },  // "Si alguien lo necesita de verdad,"
  { file: '5_32.jpg', startSec: 334.69 },  // "que use su plataforma oficial de verificación."
  { file: '5_35.jpg', startSec: 337.64 },  // "Dos,"
  { file: '5_36.jpg', startSec: 338.78 },  // "cuando tengas que enviarlo de forma legítima,"
  { file: '5_39.jpg', startSec: 341.62 },  // "escribe encima con cualquier editor para qué es y con qué fecha."
  { file: '5_43.jpg', startSec: 345.86 },  // "Copia para contrato de alquiler, marzo de 2026,"
  { file: '5_46.jpg', startSec: 349.19 },  // "cruzando la imagen."
  { file: '5_48.jpg', startSec: 350.75 },  // "Eso no impide técnicamente el robo,"
  { file: '5_50.jpg', startSec: 353.0 },  // "pero le quita casi todo el valor comercial a la copia."
  { file: '5_53.jpg', startSec: 356.25 },  // "Tres,"
  { file: '5_55.jpg', startSec: 357.43 },  // "revisa tu situación una vez al año."
  { file: '5_57.jpg', startSec: 359.87 },  // "Tienes derecho por ley a preguntar a los ficheros demorosos si apareces en ellos, gratis,"
  { file: '6_02.jpg', startSec: 365.02 },  // "y a pedir a cualquier empresa que datos tuyos guarda por el derecho de acceso del reglamento europeo."
  { file: '6_08.jpg', startSec: 371.05 },  // "Cuatro,"
  { file: '6_09.jpg', startSec: 372.12 },  // "quítale el SMS y a lo importante."
  { file: '6_11.jpg', startSec: 374.73 },  // "Cambia los códigos por SMS por una aplicación de autenticación en tu banco, tu correo y tu revés."
  { file: '6_17.jpg', startSec: 380.56 },  // "Así un duplicado de SIM deja de darle acceso a nada."
  { file: '6_21.jpg', startSec: 384.76 },  // "Y si ya te ha pasado, el orden importa,"
  { file: '6_24.jpg', startSec: 387.52 },  // "denuncia en policía o guardia civil y guarda el número de la denuncia."
  { file: '6_28.jpg', startSec: 391.38 },  // "Con esa denuncia reclama por escrito a cada entidad implicada."
  { file: '6_31.jpg', startSec: 395.1 },  // "Pide la baja de la notación en los ficheros demorosos aportando la denuncia y avisa a tu operadora de que no autorizas duplicados de SIM sin presencia física."
  { file: '6_41.jpg', startSec: 404.61 },  // "Y para cerrar,"
  { file: '6_42.jpg', startSec: 406.04 },  // "lo que de verdad quiero que te lleves."
  { file: '6_44.jpg', startSec: 408.4 },  // "Volvamos a la frase del principio."
  { file: '6_47.jpg', startSec: 410.77 },  // "Tu DNI vale más que tu tarjeta en el mercado negro."
  { file: '6_50.jpg', startSec: 414.31 },  // "Y ya sabes por qué."
  { file: '6_52.jpg', startSec: 416.05 },  // "La tarjeta caduca en un día y tú puedes existir 50 años más."
  { file: '6_57.jpg', startSec: 421.46 },  // "Ahora la parte honesta que también toca decirla."
  { file: '7_00.jpg', startSec: 424.61 },  // "Nada de esto significa que tu documento ya esté vendido ni que esté escondenado a que te arruinen."
  { file: '7_06.jpg', startSec: 430.3 },  // "La mayoría de las filtraciones no acaban en un fraude concreto contra ti."
  { file: '7_10.jpg', startSec: 434.45 },  // "Pero el coste de protegerte es casi cero y el coste de limpiarlo después son años."
  { file: '7_15.jpg', startSec: 439.85 },  // "Esa asimetría es todo el argumento."
  { file: '7_18.jpg', startSec: 443.0 },  // "Y que que de claro,"
  { file: '7_19.jpg', startSec: 444.17 },  // "esto es divulgación para que sepas defenderte, no un manual para nadie."
  { file: '7_24.jpg', startSec: 448.5 },  // "Todo lo que ha soído está en informes públicos y en sentencias publicadas."
  { file: '7_28.jpg', startSec: 453.12 },  // "Si esto te ha hecho mirar tu galería de fotos con otra cara, suscríbete. Se viene más de este mundo."
];


// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_drone.mp3', startSec: 0.0, volume: 0.13 },
  { file: 'journey_start.mp3', startSec: 14.18, volume: 0.14 },
  { file: 'stop_1.mp3', startSec: 23.82, volume: 0.15 },
  { file: 'camera_shutter.mp3', startSec: 43.56, volume: 0.14 },
  { file: 'data_spill.mp3', startSec: 59.2, volume: 0.16 },
  { file: 'chat_ping.mp3', startSec: 78.62, volume: 0.15 },
  { file: 'door_creak_dark.mp3', startSec: 97.02, volume: 0.15 },
  { file: 'phishing_sting.mp3', startSec: 101.24, volume: 0.16 },
  { file: 'hard_no.mp3', startSec: 119.88, volume: 0.16 },
  { file: 'stop_2.mp3', startSec: 124.58, volume: 0.15 },
  { file: 'price_reveal.mp3', startSec: 131.46, volume: 0.15 },
  { file: 'fly_buzz.mp3', startSec: 159.34, volume: 0.14 },
  { file: 'long_tone.mp3', startSec: 166.22, volume: 0.13 },
  { file: 'danger_turn.mp3', startSec: 184.34, volume: 0.16 },
  { file: 'count_1.mp3', startSec: 196.52, volume: 0.15 },
  { file: 'count_2.mp3', startSec: 210.12, volume: 0.15 },
  { file: 'signal_lost.mp3', startSec: 223.96, volume: 0.17 },
  { file: 'sms_flood.mp3', startSec: 234.94, volume: 0.16 },
  { file: 'count_4.mp3', startSec: 254.07, volume: 0.15 },
  { file: 'personal_turn.mp3', startSec: 267.06, volume: 0.15 },
  { file: 'rejection_stamp.mp3', startSec: 278.02, volume: 0.16 },
  { file: 'file_drop.mp3', startSec: 288.47, volume: 0.15 },
  { file: 'unfair_sting.mp3', startSec: 298.37, volume: 0.15 },
  { file: 'action_sting.mp3', startSec: 316.8, volume: 0.16 },
  { file: 'tick_1.mp3', startSec: 325.47, volume: 0.15 },
  { file: 'tick_2.mp3', startSec: 337.64, volume: 0.15 },
  { file: 'tick_3.mp3', startSec: 356.25, volume: 0.15 },
  { file: 'tick_4.mp3', startSec: 371.05, volume: 0.15 },
  { file: 'urgent_step.mp3', startSec: 384.76, volume: 0.15 },
  { file: 'loop_close.mp3', startSec: 408.4, volume: 0.15 },
  { file: 'honest_turn.mp3', startSec: 421.46, volume: 0.14 },
  { file: 'subscribe.mp3', startSec: 453.12, volume: 0.17 },
];

// Música del canal: clip de 30 s repetido con Loop. A Loop se le pasa la duración de UNA
// iteración (el clip), nunca la del vídeo. Volumen 0.17: a 0.075 no se oía bajo la voz.
const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const DniRobado: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.2;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('que-hacen-con-tu-dni-robado.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`que-hacen-con-tu-dni-robado-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`que-hacen-con-tu-dni-robado-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`que-hacen-con-tu-dni-robado/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
