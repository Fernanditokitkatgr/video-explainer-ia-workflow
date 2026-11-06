# SEO — Por qué la IA gasta tanta energía (explicado con un pueblo de monos)

## Título (≤60 chars)

1. **Por qué la IA gasta más luz que un país (con monos)** ← recomendado
2. Por qué la IA gasta tanta energía (explicado con monos)
3. ¿Cuánta luz gasta la IA? Más que todo Japón en 2030

Keywords de búsqueda: "por qué la ia gasta tanta energía", "cuánta luz gasta chatgpt", "consumo energético ia", "centros de datos electricidad".
Formato: motor de animación, enfoque narrativo con mundo persistente (escena `pueblo`, EscenasMundo.tsx; análisis en channel/tecno/pruebas/ecomonos/analisis.md). Sin imágenes generadas.

## Descripción

```
En 2030, los centros de datos que mueven Internet y la inteligencia artificial gastarán más electricidad que todo Japón. Te lo explico montando un pueblo de monos desde cero: por qué un cerebro de máquina solo sabe hacer cuentas, por qué entrenarlo gasta más que usarlo, por qué hay que enfriarlo sin parar y quién acaba pagando la factura.

Fuentes principales: Agencia Internacional de la Energía, Google, CSO de Irlanda, Bloomberg, MIT Technology Review y World Nuclear News.

Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete: cada semana, una máquina, un invento o una idea explicada fácil.

#InteligenciaArtificial #Energia #Tecnologia
```

## Capítulos

0:00 Más luz que Japón
0:11 Una pregunta de dos segundos
0:40 1. Un cerebro que hace cuentas
1:26 2. Aprender gasta más que contestar
2:10 3. El pueblo se queda corto
2:59 La parte que te toca
3:46 Ya sabes dónde se enciende la luz

## Tags

```
por que la ia gasta tanta energia, consumo energia ia, cuanta luz gasta chatgpt, centros de datos, inteligencia artificial explicada, electricidad ia, consumo chatgpt, three mile island microsoft, gpu nvidia, tecnomono
```

## Miniatura
plantilla: B (fotograma del propio vídeo: el pueblo a oscuras con el medidor de consumo; sin IA de imagen)
texto: MÁS LUZ|QUE JAPÓN
resaltar: QUE JAPÓN
posicion: left

## Shorts

Largo hecho con el motor (nov-2026): sin Shorts de recorte (shorts/shorts.json vacío).

## Notas

### Revisión de la voz (5-nov-2026)

En el 3:46, whisper base transcribió "pinta", pero con el modelo small la frase sale bien: "Ahora, piensa otra vez" (probabilidad 0,73) y "se ha encendido la luz". Es un fallo de transcripción, no de la voz: NO se regenera nada.

### Fuentes (datos del guion)

- Agencia Internacional de la Energía, *Energy and AI* (abril de 2025): centros de datos ~415 TWh en 2024 (~1,5 % de la electricidad mundial) → ~945 TWh en 2030, algo más que el consumo actual de Japón. https://www.iea.org/reports/energy-and-ai · https://www.datacenterdynamics.com/es/noticias/la-iea-prev%C3%A9-que-el-consumo-energ%C3%A9tico-de-los-centros-de-datos-se-duplique-en-2030-hasta-alcanzar-los-945-twh/
- Nvidia H100 SXM: TDP máximo de 700 W. https://www.thefpsreview.com/?p=68813
- Patterson et al. (2021), entrenamiento de GPT-3 ≈ 1.287 MWh, ≈ 120 hogares de EE. UU. en un año. https://fortune.com/2021/04/21/ai-carbon-footprint-reduce-environmental-impact-of-tech-google-research-study/
- Google (agosto de 2025), pregunta mediana a Gemini: 0,24 Wh (menos que nueve segundos de tele), 0,26 mL de agua (unas cinco gotas), 33 veces menos energía en un año. https://arxiv.org/abs/2508.15734 · https://www.technologyreview.com/2025/08/21/1122288/google-gemini-ai-energy/
- Microsoft y Constellation: reapertura de Three Mile Island 1 (Crane Clean Energy Center, Pensilvania), contrato de 20 años. https://world-nuclear-news.org/articles/constellation-seeks-regulators-help-for-2027-plant-restart
- CSO de Irlanda: los centros de datos usaron el 22 % de la electricidad medida en 2024. https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2024/
- Bloomberg (2025): precio mayorista de la luz hasta un 267 % más alto que hace cinco años en zonas cercanas a centros de datos (es el precio mayorista, no el recibo; ver PolitiFact). https://www.bloomberg.com/graphics/2025-ai-data-centers-electricity-prices/ · https://www.politifact.com/factchecks/2026/jun/11/elizabeth-warren/data-centers-rising-electricity-costs/
