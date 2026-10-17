import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cada-unidad-que-caza-hackers-en-espana - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Tienes 18 años,
  { file: '0_01.jpg', startSec: 1.76 },  // vives en calpe, en la costa de Alicante.
  { file: '0_04.jpg', startSec: 4.5 },  // Según la policía has atacado a más de 40 organismos,
  { file: '0_07.jpg', startSec: 7.84 },  // la Guardia Civil,
  { file: '0_09.jpg', startSec: 9.0 },  // Defensa,
  { file: '0_10.jpg', startSec: 10.18 },  // bases de datos de la OTAN.
  { file: '0_11.jpg', startSec: 11.9 },  // Cambia de apodo carapoco,
  { file: '0_13.jpg', startSec: 13.44 },  // escondes tu dinero en más de 50 cuentas de criptomonedas.
  { file: '0_17.jpg', startSec: 17.6 },  // 4 de febrero de 2025,
  { file: '0_19.jpg', startSec: 19.96 },  // llaman a tu puerta.
  { file: '0_21.jpg', startSec: 21.5 },  // Una sola unidad de policía?
  { file: '0_23.jpg', startSec: 23.38 },  // No,
  { file: '0_24.jpg', startSec: 24.16 },  // varias a la vez y algunas casi nadie sabe que existen.
  { file: '0_27.jpg', startSec: 27.82 },  // Aquí van diez.
  { file: '0_29.jpg', startSec: 29.12 },  // Las que cazan hackers en España,
  { file: '0_31.jpg', startSec: 31.22 },  // de la más conocida a la más secreta,
  { file: '0_33.jpg', startSec: 33.42 },  // y una de las que te pilló trabaja con los espías.
  { file: '0_36.jpg', startSec: 36.16 },  // ¿A divinas cual?
  { file: '0_37.jpg', startSec: 37.62 },  // Número uno, la unidad central de ciberdelincuencia, policía nacional.
  { file: '0_41.jpg', startSec: 41.76 },  // Según la prensa fue la que dirigió la casa del chaval de calpe,
  { file: '0_44.jpg', startSec: 44.94 },  // pero su pieza más grande llegó antes.
  { file: '0_47.jpg', startSec: 47.76 },  // Marzo de 2018,
  { file: '0_49.jpg', startSec: 49.56 },  // Alicante,
  { file: '0_50.jpg', startSec: 50.42 },  // la policía nacional detiene a un Ucraniano.
  { file: '0_52.jpg', startSec: 52.98 },  // El gobierno solo lo llamó Denyska.
  { file: '0_55.jpg', startSec: 55.42 },  // Según Europa,
  { file: '0_56.jpg', startSec: 56.54 },  // su banda había atacado a más de 100 bancos en 40 países,
  { file: '1_00.jpg', startSec: 60.54 },  // jaqueaban los cajeros desde lejos y les ordenaban escupir billetes a una hora fija.
  { file: '1_05.jpg', startSec: 65.7 },  // Al lado esperaba alguien para recogerlos.
  { file: '1_08.jpg', startSec: 68.08 },  // Las pérdidas superaron los mil millones de euros.
  { file: '1_11.jpg', startSec: 71.4 },  // Su estilo,
  { file: '1_12.jpg', startSec: 72.42 },  // caza al que roba bancos y empisar ninguno.
  { file: '1_15.jpg', startSec: 75.32 },  // Número dos, el grupo de delitos telemáticos, de la UCEO de la Guardia Civil.
  { file: '1_20.jpg', startSec: 80.38 },  // Su caso más famoso se llama Mariposa, una red de ordenadores zombies.
  { file: '1_24.jpg', startSec: 84.72 },  // Según panda security había infectado unos 13 millones de ordenadores en 190 países.
  { file: '1_30.jpg', startSec: 90.84 },  // Robaba contra señas y apuntaba todo lo que te cleabas.
  { file: '1_34.jpg', startSec: 94.44 },  // Y como pillaron a los dueños,
  { file: '1_36.jpg', startSec: 96.18 },  // por un despiste,
  { file: '1_37.jpg', startSec: 97.42 },  // el jefe se hacía llamar Ned Cairo.
  { file: '1_39.jpg', startSec: 99.7 },  // Siempre se conectaba escondido tras una UBPN,
  { file: '1_42.jpg', startSec: 102.88 },  // un día se conectó desde su casa sin ella,
  { file: '1_45.jpg', startSec: 105.34 },  // y en 2010 la Guardia Civil detuvo a tres españoles. Su estilo,
  { file: '1_49.jpg', startSec: 109.94 },  // espera que te equivocue su una sola vez.
  { file: '1_52.jpg', startSec: 112.78 },  // Número tres, el área central del cybercrimen,
  { file: '1_55.jpg', startSec: 115.32 },  // Mosuz de Escuadra.
  { file: '1_56.jpg', startSec: 116.68 },  // La policía de Cataluña también tiene sus cazadores.
  { file: '1_59.jpg', startSec: 119.54 },  // En 2024 alguien presume en un foro de tener datos de bancos españoles,
  { file: '2_04.jpg', startSec: 124.08 },  // de una auto escuela y de una universidad pública.
  { file: '2_07.jpg', startSec: 127.6 },  // Usaba aplicaciones anónimas para borrar su rastro,
  { file: '2_10.jpg', startSec: 130.56 },  // aún así los Mosos y la policía nacional siguieron el hilo.
  { file: '2_13.jpg', startSec: 133.98 },  // Julio de 2025,
  { file: '2_15.jpg', startSec: 135.84 },  // una casa de rosas, en Girona. Dentro vivía un estudiante de informática,
  { file: '2_20.jpg', startSec: 140.5 },  // encontraron unos diez móviles y más de treinta tarjeta SIM.
  { file: '2_24.jpg', startSec: 144.52 },  // Su estilo,
  { file: '2_25.jpg', startSec: 145.54 },  // te encuentra aunque te escondas en la Internet oculta.
  { file: '2_29.jpg', startSec: 149.08 },  // Número cuatro,
  { file: '2_30.jpg', startSec: 149.96 },  // Incibe,
  { file: '2_31.jpg', startSec: 150.78 },  // el Instituto Nacional de Ciber Seguridad,
  { file: '2_33.jpg', startSec: 153.0 },  // está en León.
  { file: '2_34.jpg', startSec: 154.28 },  // Este no detiene a nadie,
  { file: '2_35.jpg', startSec: 155.74 },  // te atiende a ti.
  { file: '2_37.jpg', startSec: 157.5 },  // Si te ha jaqueado llamas al 017,
  { file: '2_39.jpg', startSec: 159.96 },  // es gratis.
  { file: '2_41.jpg', startSec: 161.08 },  // En 2025 ese teléfono atendió 142 mil consultas, y su equipo gestionó más de 122 mil incidentes.
  { file: '2_49.jpg', startSec: 169.4 },  // Pero tiene una herramienta que casi nadie conoce,
  { file: '2_52.jpg', startSec: 172.2 },  // el Servicio Antibotnet,
  { file: '2_54.jpg', startSec: 174.14 },  // entras en su web y te dice si alguna parato de tu casa forma parte de una red zombie,
  { file: '2_59.jpg', startSec: 179.2 },  // como mariposa.
  { file: '3_00.jpg', startSec: 180.56 },  // Su estilo,
  { file: '3_01.jpg', startSec: 181.6 },  // el único cazador al que puedes llamar tu.
  { file: '3_04.jpg', startSec: 184.52 },  // Número cinco,
  { file: '3_05.jpg', startSec: 185.7 },  // la agencia española de protección de datos.
  { file: '3_08.jpg', startSec: 188.36 },  // Una agencia de papeles cazando?
  { file: '3_10.jpg', startSec: 190.36 },  // Sí,
  { file: '3_11.jpg', startSec: 191.14 },  // y muerde.
  { file: '3_12.jpg', startSec: 192.5 },  // 2023,
  { file: '3_13.jpg', startSec: 193.62 },  // al mendraléjo,
  { file: '3_14.jpg', startSec: 194.9 },  // circulantes nudos falsos de chicas de instituto,
  { file: '3_17.jpg', startSec: 197.9 },  // hechos con una aplicación de IA.
  { file: '3_20.jpg', startSec: 200.34 },  // La policía investigó a los menores que los crearon,
  { file: '3_23.jpg', startSec: 203.06 },  // y en noviembre de 2025,
  { file: '3_25.jpg', startSec: 205.38 },  // la agencia puso una multa de 2000 euros por uno de esos montajes.
  { file: '3_29.jpg', startSec: 209.82 },  // Según la prensa, fue la primera sancion así en Europa.
  { file: '3_33.jpg', startSec: 213.42 },  // Su estilo,
  { file: '3_34.jpg', startSec: 214.44 },  // no te mete en la cárcel,
  { file: '3_35.jpg', startSec: 215.94 },  // te toca el bolsillo.
  { file: '3_37.jpg', startSec: 217.52 },  // Y ahora empiezan los raros.
  { file: '3_39.jpg', startSec: 219.28 },  // Número seis, los especialistas en ciberamenazas de la Comisaría General de Información.
  { file: '3_44.jpg', startSec: 224.04 },  // Es la parte de la policía nacional que vigila las amenazas contra el Estado.
  { file: '3_48.jpg', startSec: 228.06 },  // Finales de 2022,
  { file: '3_49.jpg', startSec: 229.76 },  // alguien entra en el Consejo General del Poder Judicial,
  { file: '3_52.jpg', startSec: 232.52 },  // con contraseña robadas.
  { file: '3_54.jpg', startSec: 234.3 },  // Desde ahí llega a datos de cientos de miles de contribuyentes.
  { file: '3_58.jpg', startSec: 238.16 },  // 31 de marzo de 2023,
  { file: '4_00.jpg', startSec: 240.6 },  // Operación Pausada,
  { file: '4_02.jpg', startSec: 242.18 },  // detienen en Madrid a un chaval de 19 años.
  { file: '4_04.jpg', startSec: 244.78 },  // La prensa lo conoce como Alcasec. Y según vos, Pópuli, guardaba datos robados en una plataforma llamada Ojo de
  { file: '4_12.jpg', startSec: 252.06 },  // Su estilo,
  { file: '4_13.jpg', startSec: 253.18 },  // caza al que se mete con el Estado.
  { file: '4_15.jpg', startSec: 255.54 },  // Número siete,
  { file: '4_16.jpg', startSec: 256.88 },  // los cazadores de ciberterroristas de la Guardia Civil,
  { file: '4_19.jpg', startSec: 259.76 },  // su presa era No Nein 057,
  { file: '4_22.jpg', startSec: 262.4 },  // un grupo pro ruso,
  { file: '4_23.jpg', startSec: 263.98 },  // tumba las webs de los países que ayudan a Ucrania,
  { file: '4_26.jpg', startSec: 266.62 },  // las inundas de visitas falsas hasta que se caen.
  { file: '4_29.jpg', startSec: 269.44 },  // Y usa voluntarios,
  { file: '4_30.jpg', startSec: 270.92 },  // cualquiera se baja su programa y ataca desde casa.
  { file: '4_33.jpg', startSec: 273.98 },  // Julio de 2024, la Guardia Civil detiene a tres en Manacor, en Guelva y en Sevilla.
  { file: '4_40.jpg', startSec: 280.06 },  // Los acusa de daños informáticos con fines terroristas.
  { file: '4_43.jpg', startSec: 283.22 },  // Y la respuesta del grupo,
  { file: '4_44.jpg', startSec: 284.88 },  // lo llamó Caza de Brujas y prometió un ataque masivo contra Internet en España.
  { file: '4_50.jpg', startSec: 290.42 },  // Su estilo,
  { file: '4_51.jpg', startSec: 291.3 },  // va por los soldados rasos de la ciberguerra.
  { file: '4_54.jpg', startSec: 294.28 },  // Número 8, el centro europeo de ciberdelincuencia,
  { file: '4_57.jpg', startSec: 297.6 },  // de Europol,
  { file: '4_58.jpg', startSec: 298.72 },  // está en la haya y coordina a las policías de toda Europa,
  { file: '5_02.jpg', startSec: 302.18 },  // la española también.
  { file: '5_03.jpg', startSec: 303.62 },  // Su gran presa fue Lockbid,
  { file: '5_05.jpg', startSec: 305.74 },  // una de las bandas de ransomware mas activas del mundo.
  { file: '5_08.jpg', startSec: 308.7 },  // En febrero de 2024, la policía tomó su web y colgó su propio cartel.
  { file: '5_13.jpg', startSec: 313.8 },  // Octubre de 2024,
  { file: '5_15.jpg', startSec: 315.7 },  // aeropuerto de Madrid,
  { file: '5_17.jpg', startSec: 317.1 },  // la Guardia Civil detiene a un hombre.
  { file: '5_19.jpg', startSec: 319.12 },  // Según Europa, la administraba un alojamiento blindado que usaba Lockbid, un servicio hecho para ignorar a la p
  { file: '5_25.jpg', startSec: 325.54 },  // Los agentes españoles se llevaron nueve servidores.
  { file: '5_28.jpg', startSec: 328.58 },  // Su estilo,
  { file: '5_29.jpg', startSec: 329.58 },  // junta a 12 países para cazar a uno.
  { file: '5_32.jpg', startSec: 332.3 },  // Y llegamos a los más secretos.
  { file: '5_34.jpg', startSec: 334.8 },  // Número 9,
  { file: '5_35.jpg', startSec: 335.92 },  // el mando conjunto del ciber espacio,
  { file: '5_37.jpg', startSec: 337.98 },  // el del ejército.
  { file: '5_39.jpg', startSec: 339.34 },  // Nació en 2020 y vigila las redes de defensa a las 24 horas.
  { file: '5_43.jpg', startSec: 343.78 },  // Casi nada de lo que hace es público,
  { file: '5_45.jpg', startSec: 345.84 },  // lo que se ve es su entrenamiento.
  { file: '5_47.jpg', startSec: 347.98 },  // Cada año juega en Lockheed Shields, un ejercicio de la OTAN.
  { file: '5_51.jpg', startSec: 351.58 },  // Durante dos días de fiendes redes eléctricas, bancos y centrales nucleares de mentira, contra miles de ataques
  { file: '5_58.jpg', startSec: 358.54 },  // En 2026 el equipo español quedó duo décimo y primero en una de las categorías.
  { file: '6_03.jpg', startSec: 363.78 },  // Su estilo entra en la guerra para que nunca llegue.
  { file: '6_07.jpg', startSec: 367.44 },  // Y el último, el más secreto de todos.
  { file: '6_10.jpg', startSec: 370.3 },  // Número 10,
  { file: '6_11.jpg', startSec: 371.3 },  // el Centro Criptológico Nacional y su equipo de respuesta,
  { file: '6_14.jpg', startSec: 374.56 },  // el CCN Cert.
  { file: '6_16.jpg', startSec: 376.48 },  // Depende del CNI, los espías de España,
  { file: '6_19.jpg', startSec: 379.56 },  // protege los ordenadores de las administraciones públicas.
  { file: '6_22.jpg', startSec: 382.76 },  // Marzo de 2021,
  { file: '6_24.jpg', startSec: 384.54 },  // un ransomware tumba al CP,
  { file: '6_26.jpg', startSec: 386.42 },  // las oficinas de empleo se quedan sin sistema.
  { file: '6_29.jpg', startSec: 389.06 },  // Según el ministerio de trabajo, sus técnicos y los del Centro Criptológico trabajaron juntos para recuperarlo.
  { file: '6_35.jpg', startSec: 395.04 },  // Su estilo nunca sale en la foto, pero siempre está detrás.
  { file: '6_39.jpg', startSec: 399.88 },  // Así que volvamos al chaval de Calpe.
  { file: '6_42.jpg', startSec: 402.04 },  // ¿Quién de los 10 trabaja con los espías?
  { file: '6_44.jpg', startSec: 404.6 },  // La caza la dirigió la policía nacional, con la Guardia Civil y con Europol,
  { file: '6_48.jpg', startSec: 408.98 },  // pero según la prensa hubo un apoyo más,
  { file: '6_51.jpg', startSec: 411.44 },  // el Centro Criptológico Nacional,
  { file: '6_53.jpg', startSec: 413.52 },  // el del CNI.
  { file: '6_55.jpg', startSec: 415.1 },  // ¿Y tú?
  { file: '6_56.jpg', startSec: 415.98 },  // ¿Cuál de los 10 te parece más temible?
  { file: '6_58.jpg', startSec: 418.3 },  // Te leo en los comentarios.
  { file: '6_59.jpg', startSec: 419.88 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete.
  { file: '7_05.jpg', startSec: 425.12 },  // Cada semana, una máquina, un invento o una idea explicada fácil.
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'keyboard_tension.mp3', startSec: 0.5, volume: 0.13 },
  { file: 'door_slam.mp3', startSec: 20, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 36, volume: 0.13 },
  { file: 'police_sting.mp3', startSec: 50, volume: 0.13 },
  { file: 'cash_bigger.mp3', startSec: 61, volume: 0.13 },
  { file: 'digital_glitch.mp3', startSec: 80, volume: 0.13 },
  { file: 'trap_snap.mp3', startSec: 103, volume: 0.13 },
  { file: 'door_open.mp3', startSec: 136, volume: 0.13 },
  { file: 'phone_ring.mp3', startSec: 158, volume: 0.13 },
  { file: 'scan_sweep.mp3', startSec: 174, volume: 0.13 },
  { file: 'stamp_thud.mp3', startSec: 205, volume: 0.13 },
  { file: 'tense_transition.mp3', startSec: 218, volume: 0.13 },
  { file: 'gavel.mp3', startSec: 241, volume: 0.13 },
  { file: 'alarm_beep.mp3', startSec: 264, volume: 0.13 },
  { file: 'chains_padlock.mp3', startSec: 304, volume: 0.13 },
  { file: 'airport_chime.mp3', startSec: 317, volume: 0.13 },
  { file: 'secret_tone.mp3', startSec: 332, volume: 0.13 },
  { file: 'sword_clash.mp3', startSec: 352, volume: 0.13 },
  { file: 'power_down.mp3', startSec: 385, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 411, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 420, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.3;

export const CadaUnidadQueCazaHackersEnEspana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cada-unidad-que-caza-hackers-en-espana.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cada-unidad-que-caza-hackers-en-espana-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cada-unidad-que-caza-hackers-en-espana-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cada-unidad-que-caza-hackers-en-espana/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
