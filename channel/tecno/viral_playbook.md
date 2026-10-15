# Playbook de viralidad — Tecnomono (2026-10-15)

Construido sobre `competitor_report.md` (14-oct). Evidencia nueva:
- 25 miniaturas descargadas y revisadas una a una (15 vídeos largos y 10 Shorts del top) + 6 nuestras.
- Subtítulos automáticos de 15 vídeos (yt-dlp, `es-orig`/`en-orig`), con marcas de tiempo cada 10 s.
- Volcado de los 916 vídeos de los 20 canales (API, `competitor_scan.scan_channel`) para comparar los títulos del top (x≥3) con los de abajo (x≤1).

Leyenda: **[V]** = verificado con datos o subtítulos de este análisis · **[I]** = inferencia mía, sin probar.

---

## 0. Lo más importante (tres hallazgos que cambian el plan)

1. **[V] El formato "TODOS los X explicados" NO es mágico: depende del tema.** Este es el canal completo de Tecnotipos:
   - TODAS las MAFIAS HACKER x19,1 · TODOS los HACKERS x10,7 · TODOS los CIBERATAQUES x6,4 · TODOS los VIRUS x3,0
   - TODOS los MANDOS GAMING x1,1 · USB x1,0 · WEBS OSCURAS x0,8 · Consolas NINTENDO x0,7 · Gráficas NVIDIA x0,5 · NAVEGADORES x0,3 · procesadores Intel x0,2

   Lo que funciona es la lista de **personajes con identidad** (grupos, tipos de hacker, ataques con nombre propio). Las listas de **productos o hardware** se hunden. Nuestro "todos-los-tipos-de-ia-explicados" usó iconos de objetos (cerebro, robot, micro…), que es la versión que fracasa.
2. **[V] En Siliconversations gana el comportamiento raro de la IA y pierde todo lo demás.** Arriba: Seahorse x17 · Goblins x4,6 · AI Slop x4,5 · "I Tricked ChatGPT Into Committing Crimes" x4,1. Abajo: concursos, política europea, "TikTokers Keep Stealing My Videos" o "Chippy The GPU" (x0,1-0,6). Tienen la misma mascota y la misma duración. **La variable es el tema, no la producción.**
3. **[V] Los vídeos que más funcionaron NO tienen un gancho de presentación.** Entran directamente en la escena:
   - Siliconversations (x17) abre con ChatGPT en pleno bucle ("Yes… the actual seahorse emoji is – Oops. Still not right…") desde el segundo 0.
   - Tecnotipos (x19) arranca con "Anonymous surgió a partir de comunidades de internet…", sin introducción.

   Nuestro guion del caballito de mar empieza con "Hazle esta pregunta… Y prepárate… lo que viene no es una broma… al final de este vídeo vas a entender". Son 4 frases de promesa antes de que pase nada.

---

## 1. Miniaturas

### Lo que se ve en las 15 miniaturas de vídeos largos [V]

| Vídeo (x) | Palabras | Personaje / emoción | Fondo | Flechas o elementos | ¿Repite el título? |
|---|---|---|---|---|---|
| Tecnotipos MAFIAS (x19) | 0 de gancho, 10 etiquetas | 10 hackers con capucha, cada uno con su icono (máscara, oso, bandera) | blanco, 2D plano con contorno negro | cuadrícula 5×2 | Lo ilustra (enseña las "mafias") |
| Tecnotipos HACKERS (x10,7) | 0 + 10 etiquetas | 10 personajes de tipos distintos | blanco, 2D | cuadrícula 5×2 | Lo ilustra |
| Tecnotipos CIBERATAQUES (x6,4) | 0 + 10 etiquetas con año | 10 iconos dentro de círculos de colores | blanco | cuadrícula 5×2 | Lo ilustra |
| Species 12 endings (x18,8) | 4 ("WE'RE HERE", "DARK FARMS", "HUMAN ZOO") | ninguno | negro, gráfica de neón | flecha a "estamos aquí" | Lo complementa |
| Siliconversations Seahorse (x17) | 4 grandes ("What's Wrong Little Robot?") + 4 en bocadillo | robot mareado (ojos en espiral) + caballito gigante | **blanco, dibujo a mano** | 3 elementos | Lo complementa (no dice "emoji" ni "insane") |
| Species Murder (x13,8) | 2 "(NO, SERIOUSLY)" | logo de OpenAI sangrando | negro | 1 elemento | Lo complementa (responde a la incredulidad del título) |
| LEMMiNO Cicada (x12) | 2 (nombre) | cigarra | negro + rojo | 1 | Lo repite |
| LEMMiNO MH370 / D.B. Cooper (x8,5 / x6,9) | 0 | avión / silueta roja cayendo | azul / rojo-azul | 1-2 | No hay texto |
| Homosapiens Marianas (x7,3) | 3 "ALGO NO CUADRA" (blanco + rojo) | buzo diminuto ante un abismo | negro azulado | línea roja "11.000 m" | Lo complementa |
| QuantumFracture Milenio (x6,5) | 2 "¿Y AHORA?" | su cara, preocupado | azul con ecuaciones | 2 | Lo complementa ("Lo preocupante viene ahora") |
| Species Minecraft (x6,1) | 3 "IT GOT WEIRD." | figura roja de espaldas, foco de luz | ciudad nocturna | 1 | Lo complementa |
| Species AI 2027 / POV (x6,0 / x5,6) | 2 + etiquetas sobre una gráfica | ninguno | negro, curva roja | flechas y puntos | Lo complementa |
| Two Minute Papers (x5,1) | 2 "MASSIVE LEAP" | logo saltando un abismo | negro | 1 | Lo complementa |

**Patrones [V]:**
- **0-4 palabras de gancho.** Ninguna de las 15 pasa de 4. Las 5 mejores de habla hispana que tienen texto usan 2-3 palabras.
- **Un solo foco o una cuadrícula ordenada, nada intermedio.** El foco único va sobre fondo oscuro (Species, LEMMiNO, Homosapiens). La cuadrícula de personajes va sobre fondo blanco (Tecnotipos).
- **Sale cara humana con emoción en 1 de 15** (QuantumFracture, que es el creador en persona). Ninguna miniatura de las de mascota usa a la mascota "señalando con cara de susto".
- **El texto casi nunca repite el título**: hace de respuesta o de segunda mitad ("(NO, SERIOUSLY)", "IT GOT WEIRD.", "¿Y AHORA?", "ALGO NO CUADRA").
- **Fondo blanco y 2D con contorno negro (nuestro estilo) SÍ puede ganar.** Lo demuestran Tecnotipos x19 y Siliconversations x17. El estilo no es el problema.
- El rojo es el color de alarma: aparece en 10 de 15 (texto, línea o elemento).

### Shorts [V]
Las miniaturas de los 10 Shorts (oardefault) son **fotogramas del propio vídeo**: subtítulo de 1-2 palabras en amarillo o verde con contorno negro en el tercio inferior. En 6 de 10 aparece el personaje recurrente de Homosapiens (esqueleto con ojos saltones) o el muñeco 3D de CdeCiencia. Nadie diseña una portada para el Short: lo que importa es el **primer fotograma**.

### Comparación con las nuestras [V]
He revisado caballito de mar, 13 IAs, WannaCry, "Estoy liberada", ASML y contraseña. **Las 6 tienen la misma plantilla**: texto de 2-4 palabras arriba a la izquierda, Sara a la derecha con los ojos muy abiertos y la boca abierta, casi siempre señalando, y un objeto en medio.
- El tamaño del texto, el contraste y el número de palabras están bien (cumplen la regla de ≤4).
- **Problema 1 [I]**: en el feed, las 6 parecen la misma miniatura. Siempre la misma emoción y la misma postura. Ninguna miniatura del top repite ese esquema vídeo tras vídeo.
- **Problema 2 [V]**: la de "13 IAS ¿CUÁL USAS?" es la versión perdedora del formato Tecnotipos: iconos de objetos en lugar de personajes, más texto y la mascota quitando sitio.
- **Problema 3 [V]**: la del caballito de mar dice "¿EXISTE? NO.", que da la respuesta. Siliconversations no la da ("What's Wrong Little Robot?"): enseña el **síntoma** (robot mareado), no la solución.

### Reglas
1. **M1 — Elige entre dos plantillas, no mezcles.**
   - **(A) Cuadrícula** de 8-10 personajes con etiqueta, sobre blanco y sin gancho (respaldo: Tecnotipos x19 / x10,7 / x6,4).
   - **(B) Foco único** + 2-3 palabras sobre fondo oscuro o de color plano (respaldo: Species x13,8 "(NO, SERIOUSLY)", Homosapiens x7,3 "ALGO NO CUADRA").
2. **M2 — El texto completa el título, no lo resume.** Si el título pregunta, la miniatura reacciona ("¿Y AHORA?", "IT GOT WEIRD."). Nunca escribas la respuesta (fallo: "¿EXISTE? NO.").
3. **M3 — Sara no siempre señala con susto.** Rota las emociones: mareada (como el robot de Seahorse), sospechosa, sudando o de espaldas. A veces, Sara **dentro de la escena** como protagonista, al estilo del esqueleto de Homosapiens, y no como espectadora a un lado. [I]
4. **M4 — En las cuadrículas, cada casilla es un personaje con un rasgo identificable** (máscara, bandera, animal), no un icono. Las casillas pueden ser monos o personajes de la misma familia visual que Sara. [V para el formato, I para usar monos]
5. **M5 — Un solo acento rojo de alarma** (línea, cifra o palabra), como Homosapiens con "11.000 m" y "NO CUADRA". [V]

---

## 2. Títulos

### Datos: top (x≥3) frente a abajo (x≤1), 916 vídeos [V]

| Rasgo | Largos top (n=44) | Largos abajo (n=281) | Shorts top (n=44) | Shorts abajo (n=186) |
|---|---|---|---|---|
| Longitud (mediana) | 45 caracteres / 8 palabras | 47 / 8 | 43 / 8 | 38 / 7 |
| Palabra de peligro, misterio o rareza* | **41 %** | 11 % | 14 % | 5 % |
| Es una pregunta | 20 % | 14 % | **50 %** | 33 % |
| Lleva un número | 34 % | 35 % | 7 % | 9 % |
| Palabra entera en MAYÚSCULAS | 32 % | 32 % | 23 % | 20 % |
| Lleva emoji | 2 % | 9 % | 30 % | 16 % |

\*Lista mía de palabras (insane, murder, weird, obsessed, aterroriza, preocupante, misterio, mafias, hacker, roba, desespera…), así que la cifra exacta es orientativa [I]. La diferencia de 41 % frente a 11 % es lo bastante grande como para fiarse.

En español, los largos del top usan menos palabras (mediana de 8 frente a 10) y llevan palabra emocional en el 47 % frente al 7 %.

**Conclusiones:**
- **Los números y las MAYÚSCULAS no explican nada por sí solos [V]**: salen igual arriba que abajo. "5 MINUTOS" funciona en Tecnotipos por el tema, no por el número (el de procesadores Intel también dice "3 Minutos" y se queda en x0,2).
- **Lo que separa es la tensión emocional**:
  - "Drive ChatGPT **Insane**" x17
  - "**Literally Attempted Murder**" x13,8
  - "**Lo Preocupante** Viene Ahora" x6,5
  - "Sigue **Aterrorizando** a los Científicos" x7,3
  - "**OBSESSED** with Goblins" x4,6
- **En los Shorts, la pregunta es el formato dominante** (50 %):
  - "¿Qué pasaría si…?" CdeCiencia x17
  - "¿Cuánto tiempo durarías…?" Homosapiens x29,7
  - "¿Por qué … NO …?" El Robot de Platón x3,5 (dos veces)
- **Plantilla "creencia rota" [V]**: "El Átomo NO Es Como Te lo Enseñaron" (Date un Vlog, Short x4,4), "¿Por Qué NO SE USA Alcohol al 100%…?" (x3,5).

### Reglas
1. **T1 — ≤55 caracteres, con la keyword al principio y UNA palabra de tensión** (loco, obsesionada, aterra, intentó matar, nadie sabe, preocupante). Respaldo: la tabla de arriba y Seahorse x17.
2. **T2 — Para un comportamiento raro de la IA, usa "Por qué [IA] [hace algo absurdo]"**, en pregunta y con el sujeto concreto (ChatGPT, Claude, Gemini) en lugar de "la IA". Respaldo: Siliconversations x17 / x4,6.
3. **T3 — Para un hecho increíble, plantea una afirmación y deja la incredulidad para la miniatura.** "Una IA intentó MATAR para que no la apagaran" + "(EN SERIO)". Respaldo: Species x13,8.
4. **T4 — "TODOS los X explicados en 5 MINUTOS" solo si X son personajes del mundo del crimen o de la seguridad** (hackers, grupos, estafas, ataques). Nunca hardware ni productos. Respaldo: x19 / x10,7 / x6,4 frente a x0,2-1,1 del mismo canal.
5. **T5 — Fuera del título** [V]: autopromoción, política y "mi canal". Siliconversations x0,1-0,6, QuantumFracture "Podcast"/"Camisetas" x0,1-0,2.

---

## 3. Ganchos y estructura del vídeo largo

### Lo que dicen los subtítulos [V]

| Vídeo (x) | Qué dice en los primeros 10 s | Promesa / open loop | Ritmo de revelaciones | Cierre |
|---|---|---|---|---|
| Seahorse (x17) | Se ve a ChatGPT en bucle, en directo ("Yes… Oops… Here it is for real… No…") | Se resuelve en el minuto 3 con una teoría propia ("I have a theory. An emoji theory!": efecto Mandela + Reddit) | Escena loca (0-0:50) → cómo funciona un LLM (1:00-1:50) → por qué se rompe (1:50-2:50) → giro: "otros emojis inexistentes no lo rompen, ¿por qué este?" (2:50) → teoría (3:00-4:20) → remate de seguridad de IA con humor | "See you all next time" en 4:58. Sin resumen |
| Species Murder (x13,8) | "By now you've probably seen the headlines. An AI model blackmailed an employee…" | En 0:10 sube un nivel: "what happened next was far worse… literally tried to murder". Pregunta abierta en 0:30 ("Are we watching the first signs…?") | Un dato concreto cada 20-30 s: Kyle Johnson 5 p.m., aventura, email literal, "95 %", "80 %", Grok razonando, sala de servidores sin oxígeno, "over 90 %", 96 % → 37 % | Enlaza con el siguiente vídeo ("In this next video…"). Tiempo de pantalla final, no un "suscríbete" |
| Species 12 endings (x18,8) | "AI scientists warn… end life on Earth. So surely this is the worst outcome, right? **No.**" | En 1:20: "By the end of this video, you won't read the news the same way". Orden anunciado: "from the most normal to the weirdest" | 12 bloques que van de menos a más raros. El peor ("zoo humano") queda guardado para el final (25:00), con "Remember when I said…" | Pregunta a la audiencia ("which do you think is most likely?") + enlace a otro vídeo |
| Minecraft (x6,1) | "As you watch this, a thousand AI agents… are building a civilization. And they don't know they're in a simulation." | En 0:40 sube a "lead to literal human extinction" | Tres papers prometidos ("I'll break down three") | — |
| Tecnotipos MAFIAS (x19) | Primer grupo directamente: "Anonymous surgió…" | Ninguno | Un grupo cada 35-45 s (10 grupos en 5:47). Cada bloque es: qué es → cómo atacaba → a quién → por qué importa | Corta en seco tras el grupo 10 |
| QuantumFracture (x6,5) | "Notición: … la IA acaba de resolver uno de los problemas del milenio" + 3 preguntas (qué, cómo, qué consecuencias) | Las 3 preguntas son el índice | Apuesta personal (el "chuletón") como hilo humano | Sube la apuesta en directo y anuncia el podcast |
| Two Minute Papers (x5,1) | "GPT-6 Astra has arrived and I am stunned" | "wait until we look into the paper" | "but it gets better" (1:10), "But it gets weirder" (3:50) | Patrocinio |

### Reglas
1. **G1 — Abre CON el fenómeno, no hablando del fenómeno.** La primera frase ya es la escena: el bucle, la cifra o el email. Respaldo: Seahorse x17, Species x13,8, Tecnotipos x19.
   - Prohibido en los 10 primeros segundos: "prepárate", "lo que viene no es una broma", "en este vídeo vas a ver".
2. **G2 — Antes del segundo 15, un "¿esto es lo peor? No."**: una escalada explícita. Respaldo: Species x18,8 ("surely this is the worst outcome, right? No."), Species x13,8 ("what happened next was far worse").
3. **G3 — Una pregunta abierta que se resuelve en el último tercio, anunciada como "tengo una teoría / la respuesta te va a sorprender".** Respaldo: Seahorse, teoría en 3:00 de 4:58. Esto ya está en CLAUDE.md línea 128; aquí solo se ajusta cuándo cerrarla: en el 60-75 % del vídeo, no en la última frase.
4. **G4 — Un dato concreto con nombre propio cada 20-30 s** (persona, hora, porcentaje, cita literal). Respaldo: Species x13,8 (Kyle Johnson, 5 p.m., 95 %, 80 %, 90 %, 96→37 %).
5. **G5 — Un giro con frase bisagra cada ~60 s**: "Pero aquí viene lo raro", "Y esto es lo peor", "Pero hay algo que no cuadra". Respaldo: Two Minute Papers ("it gets better" / "it gets weirder"), Species ("But here's the worst part", dos veces).
6. **G6 — En listas, ordena de lo normal a lo más raro y anúncialo en la primera frase.** Respaldo: Species x18,8 ("We'll start with the most normal scenarios and finish with the weirdest").
7. **G7 — Cierre: pregunta a la audiencia + "en este otro vídeo…" en lugar de un resumen.** Respaldo: Species x13,8 y x18,8. [I] El resumen final hace perder audiencia justo antes de la pantalla final.

---

## 4. Shorts

### Lo que dicen los subtítulos [V]

| Short (x) | Dur. | Primera frase | Estructura | Final |
|---|---|---|---|---|
| ¿Cuánto durarías con un LEÓN? (x29,7) | 61 s | La propia pregunta del título | **Reloj**: "Minuto uno… Hora cinco… Hora 20… Hora 48… Hora 50", un salto cada 8-10 s y la tensión sube | Desenlace seco ("Te convertiste en comida") |
| Médico en el Antiguo Egipto (x21,2) | 63 s | La pregunta del título | **Reloj**: "Día 1… Día dos… Día tres… Semana uno… Mes uno" + un giro absurdo (Sócrates) | Se corta en el clímax (el faraón): pide la parte 2 |
| Gaviota detiene un gol (x17) | 41 s | La escena entera en una frase | Situación → consecuencia inesperada (el árbitro para el juego) → regla real | Remate irónico ("nadie gana por culpa de ella") |
| ¿Qué pasa cuando muere una ballena? (x13,4) | 34 s | "Parece el final… pero apenas está empezando" | Creencia → "lo más increíble viene después" | Frase redonda ("una ciudad submarina llena de vida") |
| Trituradora con traje de acero (x13) | 44 s | La pregunta tal cual + "podrías pensar que…" | Intuición falsa → mecanismo real | Frase de por qué existen las protecciones |
| USB de 100 M$ (x12,9) | 58 s | "Un extraño te ofrece un macabro juego" (te pone a ti en la escena) | Reto → soluciones descartadas → idea ingeniosa (palomas) | **Pregunta al espectador** ("¿Dónde esconderías la tuya?"), que trae comentarios |
| 🤖 "Quiero más RAM" (x30,8) | 30 s | "¿Cuánta RAM tiene tu ordenador?" (podcast) | Anécdota personal con cifras (128 GB, 11.000 €) | Pregunta abierta ("¿dónde guardan todo eso?") |

**Patrones [V]:**
- **Empiezan siempre por el título dicho en voz alta o por la escena; nunca por el contexto.**
- **Duración**: entre 30 y 63 s en el top. En el volumen completo (n=350), la franja de 30-45 s es la que más Shorts x≥3 tiene (22 %), frente al 6 % de <30 s y el 10-14 % del resto. **[V], aunque con muestra pequeña.**
- **Subtítulos palabra a palabra, centrados en el tercio inferior**, en amarillo, verde o blanco con contorno negro (se ve en las 10 miniaturas).
- **No hay bucle con el inicio en ninguno de los 7.** Terminan en desenlace seco, pregunta al espectador o cliffhanger. El mito del "loop perfecto" no aparece en estos datos.
- **Personaje recurrente** (esqueleto de Homosapiens en 5 de sus 6 Shorts del top, el muñeco de CdeCiencia).

### Reglas
1. **S1 — La primera frase ES el título**, dicho tal cual en el segundo 0. Respaldo: los 7 Shorts analizados.
2. **S2 — El formato reloj "Hora 1… Hora 24… Día 3…" para "¿Cuánto durarías / qué pasaría si…?"**, con un salto de tiempo cada 8-10 s y un rótulo grande del tiempo (el "Hora 1" / "DIA 1" verde de las miniaturas). Respaldo: Homosapiens x29,7 y x21,2.
3. **S3 — Sara como protagonista DENTRO de la situación** (Sara encerrada sin internet, Sara en una trituradora de datos), igual que el esqueleto de Homosapiens. No como narradora a un lado. [V para el patrón, I para Sara]
4. **S4 — 30-45 s; cerrar con desenlace seco o con "¿y tú qué harías?"** Respaldo: USB x12,9 y los datos de duración.
5. **S5 — Temas**: escenarios hipotéticos sobre infraestructura y tecnología (nuestro 48 % de retención en hardware) contados como reto o peligro. Fuera los sueldos (34 %, ya vetado en CLAUDE.md).

---

## 5. Ritmo y duración

- **[V] Datos nuestros**: los largos de 4-4,5 min retienen un 48-50 % y los de 6-7 min un 26-35 %.
- **[V] Competencia**:
  - Siliconversations: sus dos mayores éxitos duran 4:58 y 5:08. Su mediana es peor en los ≤7 min (x0,8) que en los >7 min (x1,3), porque los cortos incluyen los vídeos de política y autopromoción.
  - Tecnotipos: 5:12-5:47 en los éxitos de lista.
  - Fireship: ≤7 min, x1,0.
  - **La duración no predice el multiplicador; el tema sí.**
- **Regla R1**: **4:30-5:30 para los largos.** Coincide con nuestro pico de retención y con los dos x17-x19 de mascota y lista. [V]
- **Regla R2**: en las listas, **10 elementos de 30-35 s** (Tecnotipos: 35-45 s por grupo en 5:47). [V]
- **Regla R3**: un cambio visual (imagen nueva) cada 3-5 s y una revelación cada 20-30 s (G4). [I para los cambios visuales: los subtítulos no muestran los cortes. La cadencia de revelaciones sí es V.]

---

## 6. Temas: 10 con multiplicador demostrado

Ya hechos, así que no se repiten: caballito de mar, tipos de IA, WannaCry.

| # | Tema (título propuesto) | Referencia y multiplicador | Formato | ¿Verificar con fuente primaria? |
|---|---|---|---|---|
| 1 | **Los 12 finales posibles de la IA (en 5 minutos)** | Species "MIT Explains the 12 Possible Endings for AI" x18,8 | Lista, de normal a raro; cuadrícula de 12 escenarios | Sí: *Life 3.0* de Max Tegmark (cap. 5, los 12 escenarios). Las citas de Sutton, LeCun y Hinton, a su fuente original |
| 2 | **Una IA intentó MATAR para que no la apagaran (en serio)** | Species x13,8 | Historia con escalada; foco único oscuro | **Sí, crítico**: informe "Agentic Misalignment" de Anthropic (jun-2025). Era un escenario artificial de laboratorio y hay que decirlo; las cifras (96 %, 37 %, >90 %) salen del paper, no del vídeo |
| 3 | **TODOS los GRUPOS HACKER de los gobiernos explicados** (Lazarus, Fancy Bear, Sandworm, APT41, Equation Group…) | Tecnotipos MAFIAS x19 / HACKERS x10,7 | Cuadrícula de 10 personajes (variación: Estados en lugar de mafias) | Sí: atribuciones oficiales (CISA, Mandiant, MITRE ATT&CK) |
| 4 | **TODOS los tipos de MALWARE explicados en 5 minutos** (virus, gusano, troyano, ransomware, rootkit, keylogger…) | Tecnotipos "TODOS los VIRUS" x3,0 / CIBERATAQUES x6,4 | Cuadrícula; cada malware es un personaje | Bajo (definiciones estándar). Los ejemplos históricos, con fuente |
| 5 | **Por qué ChatGPT está OBSESIONADO con los goblins** | Siliconversations x4,6 | IA rara con mascota, 5 min | **Sí**: el artículo de OpenAI que cita el vídeo (175 %, 3.881 %, instrucción del system prompt de Codex). No he podido comprobarlo |
| 6 | **Dejaron a 1.000 IAs solas en Minecraft y montaron una civilización** | Species x6,1 | Historia + "3 experimentos" (Smallville de Stanford, Project Sid) | Sí: paper de Smallville (Park et al., 2023) y el informe de Project Sid (Altera). El vídeo dice "MIT researchers"; comprobar quién lo hizo |
| 7 | **Cicada 3301: el puzle de internet que nadie ha resuelto** | LEMMiNO x12 | Misterio en 5 min; foco único oscuro | Sí: hay mucho mito. Usar los mensajes originales archivados y fuentes periodísticas |
| 8 | **Engañaron a la IA para que se saltara sus normas: los trucos más locos** (DAN, la "abuela", ASCII art…) | Siliconversations "I Tricked ChatGPT Into Committing Crimes" x4,1 | Lista de jailbreaks contada como historias, sin instrucciones utilizables | Sí: papers de jailbreak (p. ej. ArtPrompt 2024) y reportajes. Contar solo casos ya parcheados |
| 9 | **¿Qué pasaría si se cortaran TODOS los cables submarinos?** (Short + largo) | CdeCiencia "Qué pasaría si…" x13-x17 + nuestra retención de infraestructura (48 %) | Short en formato reloj (S2): "Hora 1… Día 3…" | Sí: TeleGeography (número de cables, % del tráfico), cortes reales (mar Rojo 2024, Báltico) |
| 10 | **¿Cuánto durarías si internet desaparece? Hora 1…** (Short) | Homosapiens "¿Cuánto tiempo durarías encerrado con un LEÓN?" x29,7 / Egipto x21,2 | Short reloj con Sara de protagonista | Parcial: lo que dependa de datos (pagos, GPS, hospitales), con fuente. El resto es hipotético y debe sonar como tal |

En reserva: **"Por qué la IA se está comiendo toda la RAM del mundo"**. Nate Gentile, Short "Quiero más RAM" x30,8 + "RAM traída directa desde Heian" x6,8. Hay que verificar precios y contratos de HBM/DRAM (TrendForce).

---

## 7. Qué cambiar en el pipeline

1. **`scripts/thumbnail_text.py`**
   - **Modo sin texto de gancho y con etiquetas en cuadrícula**: nuevo `--grid "Anonymous,Lizard Squad,…" --cols 5`, que escriba etiquetas negras de ~6 % de alto bajo cada casilla (como Tecnotipos). Hoy `--text` es obligatorio (línea 116), así que la plantilla A es imposible.
   - **Acento rojo**: añadir `--accent red` para la palabra resaltada, además del amarillo (Homosapiens "NO CUADRA", Species). Bastaría un `RED = (230, 30, 30)` y un `--hl-color`.
   - **Aviso si el texto contiene la respuesta** (SÍ, NO, cifras que el título pregunta), igual que ya avisa `make_shorts.py` con el `gancho`.
2. **Prompt de miniatura (skill `/thumbnail-creator` y la sección "Miniatura" de CLAUDE.md, línea 337)**
   - Sustituir "un único sujeto focal con expresión clara (sorpresa, shock)" por "plantilla A (cuadrícula de 8-10 personajes con rasgo distintivo, fondo blanco) o plantilla B (foco único, fondo oscuro o de color plano, un acento rojo)".
   - Añadir **una lista de emociones de Sara que hay que rotar** (mareada, sospechosa, sudando, de espaldas o metida en la escena) y prohibir repetir "señala con la boca abierta" en dos vídeos seguidos.
   - En las listas: "personajes, no iconos de objetos".
3. **Estructura del guion (CLAUDE.md, sección Hook, línea 128, y el generador de guiones)**
   - **Prohibir las frases meta en las 3 primeras líneas** ("prepárate", "no es una broma", "en este vídeo", "al final vas a entender"). La línea 1 debe ser la escena o el dato.
   - **Línea 2-3 obligatoria de escalada**: "Y eso no es lo peor." / "¿Lo más raro? Esto otro."
   - **Resolver la pregunta abierta en el 60-75 % del vídeo** y cerrar con una pregunta a la audiencia + enlace a otro vídeo. Sin resumen.
   - **Un dato con nombre propio cada 2-3 líneas** y una frase bisagra ("Pero aquí viene lo raro") cada ~8-10 líneas, que equivale a ~60 s.
   - Duración objetivo: **4:30-5:30** (≈5.000-5.800 caracteres de narración, frente a los ~6.500 actuales).
4. **`make_shorts.py` / Shorts nativos**
   - Nuevo tipo de Short, **reloj**: el `gancho` es la pregunta y el rótulo grande va cambiando ("HORA 1", "DÍA 3") en cada salto, con el mismo sistema que `reveal`.
   - La primera frase del Short = el `titulo`.
   - Duración objetivo de 30-45 s.
5. **Backlog (`topic_backlog.md`)**: añadir el filtro de los hallazgos 1 y 2. Si una lista es de productos o hardware, o el tema es política o autopromoción, se descarta aunque el formato funcione en otro canal.
6. **`competitor_scan.py`**: guardar también el JSON en bruto (`competitor_rows.json`) para poder repetir este análisis de títulos sin volver a gastar cuota. Ahora solo se escribe el markdown.
