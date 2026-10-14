# SEO — Qué pasa de verdad cuando escribes en ChatGPT

## Título (elegido: opción 1 — keyword de búsqueda primero, ≤60 chars)

1. **Cómo funciona ChatGPT de verdad (palabra a palabra)** ← recomendado
2. Qué pasa de verdad cuando escribes en ChatGPT
3. Cómo funciona ChatGPT: tokens, predicción y alucinaciones

Keywords de búsqueda: "cómo funciona chatgpt", "qué es un token", "qué es un token en chatgpt",
"por qué chatgpt se inventa cosas", "alucinaciones ia", "ventana de contexto", "temperatura ia".
Prueba de demanda: ✅ el explicativo "cómo funciona la IA" es el más visto del canal (1.009). Ver
channel/tecno/topic_backlog.md.

## Descripción

```
Cuando ChatGPT te responde, las palabras aparecen una a una, como si alguien estuviera tecleando al otro lado. Pero no hay nadie. Y ni siquiera la propia máquina sabe cómo va a terminar su frase. En este vídeo seguimos el viaje de un solo mensaje, desde que pulsas Enter hasta que aparece la última palabra.

En este vídeo te explico, sin tecnicismos, cómo funciona ChatGPT de verdad:
- Adónde va tu mensaje cuando pulsas Enter: el viaje hasta un centro de datos
- Qué es un token y cómo se corta tu frase en piezas (con un ejemplo)
- Cómo las palabras se convierten en números y en puntos de un mapa de significados
- Qué hace un modelo de lenguaje por dentro y qué significa GPT
- Por qué la respuesta aparece palabra a palabra: predecir la siguiente pieza, una cada vez
- Probabilidad y temperatura: por qué nunca responde dos veces exactamente igual
- La ventana de contexto: por qué "se olvida" de lo que dijiste en chats muy largos
- Por qué no te recuerda entre conversaciones (salvo que actives la memoria)
- Alucinaciones: por qué se inventa datos con total seguridad
- Cómo aprendió: preentrenamiento con cantidades enormes de texto y valoraciones de personas reales
- Las tarjetas gráficas que lo mueven y el coste en energía y agua

Importante: ChatGPT puede equivocarse. Para cualquier dato importante, compruébalo siempre en una fuente fiable.

Si te gusta entender cómo funciona de verdad la tecnología que usas cada día, suscríbete: cada semana, una máquina, un invento o una idea explicada fácil.

#ChatGPT #InteligenciaArtificial #Tecnologia
```

## Capítulos

0:00 Qué pasa cuando escribes en ChatGPT
0:45 Qué son los tokens
1:26 Cómo convierte las palabras en números
2:30 Por qué responde palabra a palabra
3:09 Cómo elige cada palabra: probabilidades
3:44 La ventana de contexto
4:37 Por qué ChatGPT se inventa cosas
5:10 Cómo aprendió: el preentrenamiento
6:00 Las tarjetas gráficas detrás de ChatGPT

## Tags

```
como funciona chatgpt, chatgpt, que es un token, tokens chatgpt, como funciona la inteligencia artificial, modelo de lenguaje, llm, que significa gpt, prediccion de palabras, temperatura ia, ventana de contexto, memoria chatgpt, alucinaciones ia, por que chatgpt se inventa cosas, como aprendio chatgpt, preentrenamiento, rlhf, tarjetas graficas ia, centro de datos, inteligencia artificial explicada
```

## Miniatura
texto: NADIE|ESTÁ ESCRIBIENDO
resaltar: NADIE
posicion: left

## Shorts
- titulo: ChatGPT no sabe cómo termina su propia frase | gancho: NO SABE CÓMO/TERMINA SU FRASE | desde: 2_51 | hasta: 3_47
- titulo: Por qué ChatGPT se inventa cosas (con total seguridad) | gancho: POR QUÉ/SE INVENTA COSAS | desde: 5_33 | hasta: 6_12

## Notas

- Evergreen buscable del backlog (tema #5), no noticia.
- Ángulo diferenciado de los vídeos existentes del canal ("Así funciona REALMENTE la IA" y el de
  LLM): aquí se sigue el viaje literal de UN mensaje concreto (la tortilla de patatas), paso a
  paso. Se entiende solo, sin referencias a vídeos anteriores del canal.
- Narración: 8.100 caracteres sin etiquetas de emoción (objetivo 7.800-8.300), 78 líneas.
- Hilo conductor: el mensaje "¿cómo se hace una tortilla de patatas?" + la frase recurrente
  "una pieza cada vez". Callback final al gancho ("al otro lado no hay nadie escribiendo").
- Cifras y hechos usados (todos conocidos y verificables; lo dudoso va en cualitativo):
  - Tokens = palabras enteras, trozos de palabra o signos; las palabras raras/largas se parten
    en varios (documentación de tokenización de OpenAI).
  - Ejemplo "increíblemente" → "incre / íble / mente": presentado como ILUSTRATIVO ("podría
    cortarse en algo así como"), no es la salida exacta de ningún tokenizador concreto.
  - Catálogo de "decenas de miles de piezas" (GPT-2: 50.257 tokens; tokenizadores recientes de
    OpenAI: ~100.000-200.000). Se deja cualitativo.
  - Cada token → lista de "miles de números" (embeddings; GPT-3, público: 12.288 dimensiones).
    No se da cifra concreta.
  - GPT = Generative Pre-trained Transformer ("transformador generativo preentrenado").
  - Mecanismo de atención (arquitectura Transformer, "Attention Is All You Need", 2017) —
    cualitativo, sin citar el paper en el guion.
  - Generación autorregresiva: una pieza cada vez, reinyectando lo generado; "cientos de veces"
    para una respuesta normal (cualitativo).
  - Temperatura: parámetro de muestreo; baja = más determinista, alta = más variado.
  - Ventana de contexto limitada en tokens; lo que no cabe queda fuera o se atiende peor. Sin
    cifras (varía por modelo y plan).
  - Cada mensaje se procesa leyendo la conversación entera (el modelo no guarda estado entre
    peticiones). Memoria: función opcional de ChatGPT que guarda notas y las añade al contexto.
  - Modelos de razonamiento que generan un "borrador" antes de contestar, fabricado igual (tokens)
    — cualitativo, sin nombrar modelos.
  - Alucinaciones: predice texto plausible, no consulta una base de datos de verdades.
  - Preentrenamiento con "cantidades enormes de texto" (web, libros, artículos, código) —
    cualitativo, sin cifras de tokens ni de parámetros (no públicos para los modelos actuales).
  - "Miles de millones de veces" el ejercicio de predecir la siguiente palabra (cualitativo y
    conservador: los corpus de preentrenamiento se miden en billones de tokens).
  - El ejercicio de preentrenamiento se describe como "adivinar la palabra siguiente" (correcto
    para GPT; no "tapar una palabra", que sería el enfoque de modelos tipo BERT).
  - Ajuste con valoraciones humanas (RLHF, InstructGPT, OpenAI 2022) — cualitativo.
  - "Cientos de millones de personas" usan ChatGPT (OpenAI ha comunicado cientos de millones de
    usuarios semanales) — cualitativo.
  - "Decenas de miles de tarjetas gráficas" (Microsoft comunicó en 2023 un superordenador para
    OpenAI con decenas de miles de GPU A100) — cualitativo.
  - Energía y agua para refrigeración: solo cualitativo; sin cifras por consulta (las
    estimaciones públicas varían mucho).
- Short 1 sale del gancho inicial (hasta "...Desde que pulsas Enter hasta que aparece la última
  palabra."). Short 2 del bloque alucinaciones (desde "Y aquí viene el problema más famoso..."
  hasta "...compruébalo siempre en una fuente fiable.").
- Miniatura: conecta con el concepto central (no hay nadie tecleando, es predicción) sin repetir
  las palabras del título.
