import React from 'react';
import { AbsoluteFill, Audio, Img, Loop, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';

// cuanto-gana-de-verdad-un-youtuber-en-espana - canal tecno.
// === FRAMES:START (generado - no editar a mano) ===
const FRAMES: { file: string; startSec: number; labels?: string[] }[] = [
  { file: '0_00.jpg', startSec: 0.0 },  // Comida familiar,
  { file: '0_01.jpg', startSec: 1.44 },  // tu primo deja el tenedor y lo suelta, los youtubers se forran, suben un vídeo y youtube les llena la cuenta,
  { file: '0_07.jpg', startSec: 7.64 },  // es así?
  { file: '0_08.jpg', startSec: 8.46 },  // No,
  { file: '0_09.jpg', startSec: 8.98 },  // youtube es solo una de las 10 formas de cobrar y casi nunca la mejor,
  { file: '0_12.jpg', startSec: 12.92 },  // aquí van las 10,
  { file: '0_14.jpg', startSec: 14.1 },  // de la más conocida a la más sorprendente Y al final verás cuánto se queda de verdad un youtuber famoso de cada
  { file: '0_20.jpg', startSec: 20.18 },  // lo adivinas?
  { file: '0_21.jpg', startSec: 20.98 },  // Número uno,
  { file: '0_22.jpg', startSec: 22.0 },  // los anuncios, el clásico,
  { file: '0_24.jpg', startSec: 24.04 },  // antes de tu vídeo sale un anuncio,
  { file: '0_25.jpg', startSec: 25.9 },  // la marca le paga a youtube y youtube reparte En los vídeos largos el creador se lleva el 55 % y cuánto es eso?
  { file: '0_33.jpg', startSec: 33.18 },  // En 2020 Jaime Altozano lo contó en público,
  { file: '0_36.jpg', startSec: 36.0 },  // por cada millón de visitas desde España ganaba entre 600 y 800 euros,
  { file: '0_40.jpg', startSec: 40.32 },  // lo que nadie te cuenta Si el millón venía de Latinoamérica bajaba entre 100 y 300,
  { file: '0_45.jpg', startSec: 45.38 },  // su estilo,
  { file: '0_46.jpg', startSec: 46.4 },  // un millón de visitas y menos de 1000 euros Número 2, el programa de socios, el portero, para cobrar anuncios p
  { file: '1_05.jpg', startSec: 65.58 },  // lo que nadie te cuenta Con 500 suscriptores ya puedes cobrar cuotas de socio,
  { file: '1_10.jpg', startSec: 70.1 },  // los anuncios esperan a los mil Su estilo,
  { file: '1_12.jpg', startSec: 72.72 },  // te deja entrar en la fiesta pero la barra libre llega después Número 3,
  { file: '1_17.jpg', startSec: 77.26 },  // los shorts,
  { file: '1_18.jpg', startSec: 78.2 },  // la ucha común,
  { file: '1_19.jpg', startSec: 79.3 },  // aquí el anuncio sale entre un short y otro,
  { file: '1_21.jpg', startSec: 81.8 },  // nadie sabe que vídeo lo ha pagado Youtube lo mete todo en una ucha,
  { file: '1_25.jpg', startSec: 85.72 },  // paga la música y reparte el resto según tus visitas, de tu parte te quedas el 45 % 10 puntos menos que en un v
  { file: '1_33.jpg', startSec: 93.68 },  // lo que nadie te cuenta Desde febrero de 2027 solo cobrarás si sumas 10 millones de visitas en 90 días Su estil
  { file: '1_41.jpg', startSec: 101.6 },  // millones de visitas y unas monedas en la ucha Número 4,
  { file: '1_45.jpg', startSec: 105.76 },  // los patrocinios, el anuncio de dentro,
  { file: '1_48.jpg', startSec: 108.34 },  // una marca te paga para que hables de ella en tu vídeo Si ganas más de 300 .000 euros al año y tienes un millón
  { file: '1_54.jpg', startSec: 114.82 },  // la ley te apunta en un registro del estado, como a una tele Lo que nadie te cuenta,
  { file: '1_59.jpg', startSec: 119.5 },  // si escondes que es publicidad te pueden multar En julio de 2026 la CNMC multúa y bailanos con 710 euros En uno
  { file: '2_12.jpg', startSec: 132.84 },  // paga la marca y si lo escondes pagas tu
  { file: '2_15.jpg', startSec: 135.84 },  // Número 5,
  { file: '2_16.jpg', startSec: 136.78 },  // las suscripciones de Twitch la cuota mensual Tus fans te pagan cada mes por verte en directo y Twitch se queda
  { file: '2_24.jpg', startSec: 144.7 },  // Septiembre de 2025,
  { file: '2_26.jpg', startSec: 146.44 },  // Kaizenad pasa del millón de suscriptores activos,
  { file: '2_29.jpg', startSec: 149.22 },  // nadie lo había conseguido nunca en Twitch Lo que nadie te cuenta,
  { file: '2_32.jpg', startSec: 152.88 },  // lo logró con un maratón de directos de un mes entero Su estilo,
  { file: '2_36.jpg', startSec: 156.8 },  // te pagan cada mes,
  { file: '2_38.jpg', startSec: 158.16 },  // mientras sigas en directo Número 6,
  { file: '2_40.jpg', startSec: 160.82 },  // las propinas,
  { file: '2_42.jpg', startSec: 162.08 },  // el fan generoso,
  { file: '2_43.jpg', startSec: 163.38 },  // en un directo un fan paga para que su mensaje salga destacado Es el super chat y desde 2021 existe super thank
  { file: '2_50.jpg', startSec: 170.62 },  // propinas de 2 a 50 dólares en cualquier vídeo Tú te quedas al 70 % Lo que nadie te cuenta,
  { file: '2_57.jpg', startSec: 177.36 },  // ese 70 se calcula después de quitar impuestos Y si el fan paga desde un iPhone también se resta la comisión de
  { file: '3_04.jpg', startSec: 184.88 },  // el fan paga 10 y a ti nunca te llegan 10 Y ahora empiezan las sorprendentes, Número 7,
  { file: '3_11.jpg', startSec: 191.34 },  // los productos con tu nombre El muñeco,
  { file: '3_14.jpg', startSec: 194.06 },  // camisetas,
  { file: '3_15.jpg', startSec: 195.0 },  // peluches o un personaje de videojuego con tu cara Enero de 2021,
  { file: '3_19.jpg', startSec: 199.86 },  // de gref presenta en directo su skin de Fortnite Le ven a la vez más de 2 .400 .000 personas,
  { file: '3_25.jpg', startSec: 205.72 },  // record de Twitch Lo que nadie te cuenta,
  { file: '3_28.jpg', startSec: 208.62 },  // los creadores tienen un código Y Epic les paga 5 dólares por cada 10 .000 pavos que gastan sus fans Su estilo,
  { file: '3_35.jpg', startSec: 215.74 },  // tu cara se vende,
  { file: '3_36.jpg', startSec: 216.98 },  // en camiseta o en skin Número 8,
  { file: '3_39.jpg', startSec: 219.72 },  // los eventos en directo, el estadio Creadores famosos en un ring,
  { file: '3_44.jpg', startSec: 224.16 },  // entradas y patrocinios Julio de 2025 La velada del año de Ibai llena la cartuja de Sevilla,
  { file: '3_50.jpg', startSec: 230.42 },  // unas 80 .000 personas Y en Twitch se conectan a la vez más de 9 .000 .000 de dispositivos
  { file: '3_55.jpg', startSec: 235.92 },  // Su empresa facturó 11 .700 .000 euros ese año Y ganó 1 .700 .000, lo que nadie te cuenta De cada 10 euros que 
  { file: '4_05.jpg', startSec: 245.2 },  // solo 1 .5 .000 acaba en beneficio Su estilo,
  { file: '4_08.jpg', startSec: 248.34 },  // un combate de boxeo y una empresa de 11 .000 .000 Y llegamos a las 2 últimas,
  { file: '4_13.jpg', startSec: 253.6 },  // las que de verdad sorprenden Número 9,
  { file: '4_16.jpg', startSec: 256.72 },  // la marca propia,
  { file: '4_17.jpg', startSec: 257.96 },  // el negocio de fuera Montas tu propia empresa y tus videos se convierten en su anuncio gratis Es lo que hace mi
  { file: '4_33.jpg', startSec: 273.8 },  // lo que nadie te cuenta Sus videos vendieron casi lo mismo y perdieron casi 80 .000 .000 Su estilo,
  { file: '4_40.jpg', startSec: 280.68 },  // los videos cuentan, el chocolate paga
  { file: '4_43.jpg', startSec: 283.34 },  // Número 10,
  { file: '4_44.jpg', startSec: 284.54 },  // Hacienda,
  { file: '4_45.jpg', startSec: 285.38 },  // el socio que nadie ve Enero de 2021,
  { file: '4_48.jpg', startSec: 288.68 },  // el Rubius anuncian un directo que se muda andorra Allí el impuesto sobre la renta tiene un tope del 10 % Y en 
  { file: '4_55.jpg', startSec: 295.56 },  // está ya el debate,
  { file: '4_56.jpg', startSec: 296.82 },  // lo que nadie te cuenta Para Hacienda, sigues viviendo en España si pasas aquí más de 183 días al año Volvamos 
  { file: '5_04.jpg', startSec: 304.74 },  // ¿cuánto se queda de verdad un youtuber famoso?
  { file: '5_07.jpg', startSec: 307.1 },  // La empresa del Rubius hizo pública sus cifras de 2019
  { file: '5_10.jpg', startSec: 310.6 },  // Ingresó unos 2 .000 .000 .000 .000 .000 euros Más de un millón se fue en impuestos y a él le quedaron unos 867
  { file: '5_19.jpg', startSec: 319.66 },  // de cada 2 euros que gana uno se lo lleva a Hacienda Así que tu primo tiene razón a medias,
  { file: '5_25.jpg', startSec: 325.0 },  // algunos se forran Pero casi nunca con los anuncios ¿Y tú?
  { file: '5_29.jpg', startSec: 329.06 },  // ¿De cual de las 10 vivirías?
  { file: '5_30.jpg', startSec: 330.78 },  // Teleon los comentarios
  { file: '5_32.jpg', startSec: 332.03 },  // Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete Cada semana, una máqu
];

// === FRAMES:END ===

const SFX: { file: string; startSec: number; volume?: number }[] = [
  { file: 'intro_tense.mp3', startSec: 0.4, volume: 0.13 },
  { file: 'count_1.mp3', startSec: 20.0, volume: 0.13 },
  { file: 'mystery_sting.mp3', startSec: 20.18, volume: 0.13 },
  { file: 'count_2.mp3', startSec: 48.75, volume: 0.13 },
  { file: 'count_3.mp3', startSec: 76.25, volume: 0.13 },
  { file: 'count_4.mp3', startSec: 105.0, volume: 0.13 },
  { file: 'count_5.mp3', startSec: 135.0, volume: 0.13 },
  { file: 'count_6.mp3', startSec: 160.0, volume: 0.13 },
  { file: 'chapter_sting_1.mp3', startSec: 190.0, volume: 0.13 },
  { file: 'chapter_sting_2.mp3', startSec: 218.75, volume: 0.13 },
  { file: 'chapter_sting_3.mp3', startSec: 255.0, volume: 0.13 },
  { file: 'chapter_sting_final.mp3', startSec: 282.5, volume: 0.13 },
  { file: 'dramatic_hit.mp3', startSec: 296.82, volume: 0.13 },
  { file: 'subscribe_chime.mp3', startSec: 332.03, volume: 0.13 },
];

const MUSIC_FILE = 'musica-canal.mp3';
const MUSIC_CLIP_SECONDS = 30;
const MUSIC_VOLUME = 0.0;

export const CuantoGanaDeVerdadUnYoutuberEnEspana: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const PLAYBACK_RATE = 1.25;
  const currentSec = (frame / fps) * PLAYBACK_RATE;
  let activeIndex = 0;
  for (let i = 0; i < FRAMES.length; i++) { if (FRAMES[i].startSec <= currentSec) { activeIndex = i; } else { break; } }
  const activeFrame = FRAMES[activeIndex];
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      <Audio src={staticFile('cuanto-gana-de-verdad-un-youtuber-en-espana.mp3')} playbackRate={PLAYBACK_RATE} />
      <Loop durationInFrames={Math.round(MUSIC_CLIP_SECONDS * fps)}>
        <Audio src={staticFile(`cuanto-gana-de-verdad-un-youtuber-en-espana-sfx/${MUSIC_FILE}`)} volume={MUSIC_VOLUME} />
      </Loop>
      {SFX.map((sfx, i) => (
        <Sequence key={i} from={Math.round((sfx.startSec / PLAYBACK_RATE) * fps)}>
          <Audio src={staticFile(`cuanto-gana-de-verdad-un-youtuber-en-espana-sfx/${sfx.file}`)} volume={sfx.volume ?? 0.15} playbackRate={PLAYBACK_RATE} />
        </Sequence>
      ))}
      {activeFrame && (
        <Img src={staticFile(`cuanto-gana-de-verdad-un-youtuber-en-espana/${activeFrame.file}`)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      )}
    </AbsoluteFill>
  );
};
