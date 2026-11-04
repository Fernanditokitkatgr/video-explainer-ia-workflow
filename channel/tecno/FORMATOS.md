# Catálogo de formatos (motor de animación, nov-2026)

Cada pieza (largo o Short) usa UN formato principal distinto del de la pieza anterior. Todos se montan
con el motor (`remotion/src/motor`) y un `plano.json`; las escenas nuevas están en
`remotion/src/motor/EscenasFormatos.tsx` y se piden en el plano con su `tipo`.

## Reglas comunes (todas las piezas)

- **El hook manda.** En el fotograma 0 ya hay en pantalla una pregunta o afirmación chocante (escena
  `texto` en `zona: arriba`, o la propia escena del formato), el mono ya se mueve (`entrada: "nada"`
  en Shorts, o entra saltando) y suena un golpe: `"sfx": [["golpe", 0.02, 1], ["boom", 0.04, 0.7]]`,
  `"golpes": [0.05]`. Nada de intros. Escribe 2-3 variantes de hook en `seo.md` y elige la más fuerte.
  Largos: el giro antes del segundo 15. Shorts: el título dicho en voz alta en la primera frase.
- **Temas para la mayoría**, no para frikis: tu móvil, tus cuentas, tu dinero, tu privacidad, tu curro.
- El mono siempre se mueve (el constructor de planos le cambia la pose cada ~2,2 s), sin subtítulos
  palabra a palabra (el texto va en los gráficos), coste solo de voz y miniatura sacada de un still.

## Los formatos

| # | Formato | Escena(s) del motor | Estructura | Plantilla de hook | Ejemplo hecho |
|---|---|---|---|---|---|
| 1 | **El viaje de…** | `viaje` (+ `combate` al final) | Un viajero (sobre, paquete, euro, foto) recorre un circuito de N paradas; cada "Número X" lo lleva a la parada X; las futuras se ven en gris | «N PARADAS EN 1 SEGUNDO» / «¿QUIÉN LEE TU …?» | `que-pasa-cuando-envias-un-whatsapp`, `short-el-viaje-de-tu-whatsapp` |
| 2 | **¿Qué pasa si…? (reloj)** | `reloj` (+ `linea_tiempo`, `mapa`) | Escenario imaginario contado con un reloj que corre: "Minuto 1 → Hora 12 → Día 5", rótulo grande y medidor de caos; cada momento se ancla en un caso real | «¿Y SI SE APAGA …?» con el reloj en 9:00 | `que-pasaria-si-se-apagara-internet`, `short-un-dia-sin-internet-hora-a-hora` |
| 3 | **Así funciona por dentro (capas)** | `capas` (+ `experimento`, `tier_list`, `mito_verdad`) | Zoom progresivo: cada capa se agranda y nos "metemos" en la siguiente; barra de profundidad "CAPA k" | «¿CÓMO SABE … DÓNDE ESTÁS?» | `como-sabe-google-donde-estas` |
| 4 | **Mito o verdad** | `mito_verdad` | Afirmación + aguja que duda (desde el fotograma 0) → pistas → veredicto con sello (MITO / VERDAD / A MEDIAS) | La afirmación que todo el mundo cree, entre comillas | `short-modo-avion-te-esconde-de-google` |
| 5 | **X vs Y (combate)** | `combate` | Ring con barras de vida, asaltos con ¡POW!, marcador y campeón | «X CONTRA Y: ¿QUIÉN GANA?» | final de `que-pasa-cuando-envias-un-whatsapp` (WhatsApp vs SMS) |
| 6 | **Ranking / tier list** | `tier_list` (o `lista` para top N) | Fichas que vuelan a su fila S/A/B/C/D | «ORDENO LAS 5 … DE PEOR A MEJOR» | final de `como-sabe-google-donde-estas` |
| 7 | **Línea del tiempo / antes vs ahora** | `linea_tiempo` (o `comparativa`) | La línea se desplaza para centrar cada hito | «EN 2009 … HOY …» | cortes reales en `que-pasaria-si-se-apagara-internet` |
| 8 | **Te lo demuestro (experimento)** | `experimento` | Mandos que se mueven y un resultado que responde (medidor, o antenas que triangulan) | «TE LO DEMUESTRO EN 60 SEGUNDOS» | triangulación en `como-sabe-google-donde-estas` |
| 9 | **Simulación de ataque en tiempo real** | `pantalla` + `chat` + `reloj` + reparto (`ciberdelincuente` contra `currito`) | El ciberdelincuente ataca paso a paso; el reloj marca el minuto del ataque; termina con el sello y el consejo | «EN 4 MINUTOS TE ROBAN …» | pendiente (p. ej. cómo te roban la cuenta de WhatsApp) |
| 10 | **Abuelo pregunta, mono explica** | `chat` + `pregunta` + reparto (`abuelo` y `mono`) | Cada bloque abre con la duda del abuelo en bocadillo y el mono responde con una escena | «¿Y ESTO ME LO PUEDEN HACER A MÍ?» | pendiente (timos con IA a abuelos) |
| 11 | **Juicio** | `sello` + `comparativa` + reparto (`ia` acusada, `policia`, `abuelo` de juez con `mazo`) | Acusación → pruebas → defensa → veredicto con sello | «LA IA, ACUSADA DE …» | pendiente (¿la IA te va a quitar el curro?) |

## Personajes (hoja: `channel/tecno/pruebas/motor/personajes_v3.mp4`)

protagonista, ciberdelincuente, rico, ia, abuelo, currito, nino y, desde v3: mona, cientifica, policia,
medico, alien, perro, gato, influencer, profe, cocinero, astronauta. Objetos nuevos: bolso, probeta,
sarten, aro_luz, paquete. Iconos nuevos: router, antena, satelite, servidor, wifi, nube, check,
check_azul, pin, radio, tarjeta, cajero, foto, bluetooth, brujula, campana, hospital, fibra, wasap,
edificio, carrito, ordenador, ip, mapa.

## Datos de cada escena nueva (resumen)

- `viaje`: `paradas [{nombre, icono, color}]`, `actual` (parada a la que llega), `al` (cuándo llega),
  `viajero`, `titulo`, `numero_desde`, `nombres_futuras`, `futuras: "ocultas"`, `contador {desde, hasta, sufijo}`.
- `capas`: `capas [{titulo, icono, etiqueta, color, iconos[], al}]`, `actual` (capa ya vista), `rotulo`.
- `combate`: `a`/`b {nombre, icono, color, al}`, `asaltos [{titulo, ganador: a|b|empate, al, onomatopeya}]`, `ganador`, `ganador_al`, `titulo`.
- `reloj`: `desde`/`hasta` (minutos), `al`, `dur`, `rotulo`, `subtitulo`, `escenario`, `caos` (0-100), `sucesos [{texto, icono, al, tachar_al}]`.
- `tier_list`: `items [{texto, icono, fila, al}]`, `filas [{n, color}]`, `titulo`.
- `mito_verdad`: `afirmacion`, `veredicto: mito|verdad|medias`, `al`, `pistas [{texto, al}]`, `texto_sello`.
- `linea_tiempo`: `hitos [{fecha, texto, icono, al, color}]`, `titulo`, `separacion`.
- `experimento`: `controles [{nombre, min, max, inicio, sufijo}]`, `pasos [{al, valores[], resultado, texto}]`, `resultado {nombre, sufijo, min, max}`, `visual: "antenas"`.
