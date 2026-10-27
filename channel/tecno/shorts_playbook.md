# Playbook de Shorts (y miniaturas de largos) — Tecnomono (2026-10-27)

Por qué existe: los Shorts traen el 89 % de las vistas, pero la gente dice que no los entiende. Cortamos el largo sin contexto, los títulos no funcionan y el texto amarillo de arriba (`gancho`) no se entiende el 90 % de las veces. Aquí se compara lo que hacemos con lo que hacen los Shorts que se disparan y se propone una especificación nueva.

Evidencia de este análisis (27-oct-2026):
- **API de YouTube**: Shorts (playlist `UUSH…`) y largos (`UULF…`) de los últimos 12 meses de 22 canales, con el multiplicador sobre la mediana de Shorts del propio canal. Además, 6 búsquedas `search.list` (Shorts, orden por vistas, desde oct-2025) para encontrar canales pequeños que se disparan.
- **17 Shorts del top revisados uno a uno**: fotogramas a 0,1 s, 1 s, 3 s y del final, y subtítulos automáticos (`es-orig`/`en-orig`) para la primera frase y el cierre.
- **9 miniaturas de largos** de canales de monigote o dibujo (Tieso Explica, Tecnotipos, The Paint Explainer, Siliconversations).
- **Nuestros 57 Shorts**: vistas, `engagedViews`, duración media vista y % visto (YouTube Analytics API, jul-oct 2026).
- El código actual: `scripts/make_shorts.py` y las secciones `## Shorts` de los `seo.md`.

Leyenda: **[V]** verificado con datos, fotogramas o subtítulos de este análisis · **[I]** inferencia mía, sin probar.

---

## 0. Resumen en 6 líneas

1. **[V] Nuestros Shorts no fallan por poco. Se quedan todos en el grupo de prueba.** 45 de 57 tienen entre 400 y 1.440 vistas y ninguno pasa de 1.440. Solo el **47 %** de las vistas llega a "vista con interacción" (`engagedViews` 18.311 de 38.915), y la mediana de % visto es del **45 %**, con 20 s vistos de media.
2. **[V] Ninguno de los 17 Shorts ganadores lleva un rótulo fijo de 2 líneas con una pregunta arriba**, que es justo lo que hacemos con el `gancho`. Cuando hay texto arriba, es **el nombre del tema** ("OWEN HART - WWE") o **el título entero** durante los 2-3 primeros segundos ("¿Cómo no matar a tu enemigo?").
3. **[V] En los 17, la primera frase dice de qué va el vídeo**: o es el título en voz alta, o es la escena con el sujeto nombrado ("Cuando un mosquito se posa sobre ti, no usa una aguja, sino seis"). Los nuestros empiezan con "Número dos, el grupo de delitos telemáticos de la UCO…" o "La siguiente pista llevaba a tres números primos…", frases que solo se entienden dentro del largo.
4. **[V] 14 de los 17 son piezas hechas para el Short, no recortes.** El único recorte de verdad (Nate Gentile, de un pódcast) es una anécdota cerrada que arranca con una pregunta.
5. **[V] Ninguno cierra con "vídeo completo en el canal".** Cierran con un dato seco, con una frase cortada que enlaza con el principio (QuantumFracture, MinuteEarth) o con un "suscríbete para saber X" atado al tema (Cleo Abram).
6. **Propuesta**: **Shorts con guion propio de 30-45 s** que reutilizan las imágenes del largo (y como mucho una imagen vertical nueva para el primer fotograma, ~0,04 €). La primera frase es el título. El `gancho` se sustituye por un **rótulo de tema** de 1-4 palabras. Subtítulos de 1-2 palabras. Fuera el CTA congelado de 3 s.

---

## 1. Lo que hacen los ganadores en Shorts

### 1.1 Nuestros datos primero [V]

| Indicador (57 Shorts, jul-oct 2026) | Valor |
|---|---|
| Vistas totales / vistas con interacción | 38.915 / 18.311 (**47 %**) |
| Mediana de duración vista | 20 s (los Shorts duran 26-59 s) |
| Mediana de % visto | 45 % |
| Suscriptores ganados con los 57 | 60 |
| Shorts por encima de 1.500 vistas | **0** |

- Desde el 31-mar-2025, YouTube cuenta una vista de Short en cuanto empieza a reproducirse, sin tiempo mínimo ([ppc.land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/), [Tubefilter](https://www.tubefilter.com/?p=185419)). Las "vistas con interacción" son el criterio antiguo y más estricto.
- Que solo el 47 % llegue a vista con interacción significa que **más de la mitad desliza en el primer segundo o dos** [V].
- **[I]** El techo plano de ~1.000 vistas tiene pinta de ser el grupo de prueba en el que YouTube enseña cada Short. Si el porcentaje de gente que se queda es bajo, no lo empuja más. Varias guías de creadores describen así el mecanismo ([vidIQ](https://vidiq.com/blog/post/youtube-shorts-algorithm/), [Subscribr](https://subscribr.ai/youtube-strategy/youtube-shorts-analytics-metrics-viral)), pero YouTube no lo documenta oficialmente.
- **Conclusión [I]**: lo que hay que arreglar es **el primer segundo** (lo que se ve y lo que se oye). El resto del Short pesa menos. "Sin Einstein tu GPS fallaría 10 km" retiene el 87 % y aun así se queda en 434 vistas: el que se queda, ve el Short entero, pero muy pocos se quedan.
- Lo que más interacción saca de lo nuestro: historias raras de IA con sujeto concreto ("Gemini se dio cuenta... y paró sola", 1.440 vistas, 52 % con interacción) y objetos físicos sorprendentes ("Los tiburones muerden cables de internet", 56 %).
- Lo peor: "¿Cómo nadie se dio cuenta en 2 meses?" (174 vistas y el 18 % de retención, con un título sin sujeto) y los de sueldos.

### 1.2 Los 17 Shorts analizados [V]

"x" = vistas / mediana de Shorts del propio canal. En canales pequeños sale "x subs" = vistas / suscriptores.

| # | Short (canal) | Vistas · x | Dur. | Primera frase (subtítulos) | Texto en pantalla en el 1.er segundo | ¿Corte o pieza propia? | Estructura | Cierre |
|---|---|---|---|---|---|---|---|---|
| 1 | [¿Qué animal puede ROMPERTE una pierna de UNA mordida?](https://youtu.be/dSQaUyqV1WQ) (Homosapiens) | 49,6 M · x32,7 | 61 s | El título tal cual | **Ninguno**. La imagen lo cuenta sola: oso + pierna-esqueleto en una máquina. A los 3 s, fila de 6 emojis de animales arriba que se van tachando | Propia | Ranking de menos a más (pitbull → … → cocodrilo) | Clímax y corte seco |
| 2 | [¿Qué animal te COMERÍA más rápido?](https://youtu.be/AlsbPzjKeIw) (Homosapiens) | 20,7 M · x13,6 | 61 s | "¿En cuánto tiempo te devoran estos animales? Ratas." | Ninguno. Después, rótulos de 1 palabra: "Ratas", "Tiempo: 12 horas" | Propia | Ranking con cronómetro | Último puesto (pirañas, 8 min) |
| 3 | [¿Cuánto tiempo durarías encerrado con un LEÓN?](https://youtu.be/czN7o_dMw-4) (Homosapiens) | 5,5 M · x29,7 | 61 s | El título | **"Hora 1"** en verde grande, en el centro y abajo | Propia | Reloj (Minuto 1 → Hora 50) | Frase cortada ("te convertiste en comida de…") |
| 4 | [Así funcionan las agujas de los mosquitos](https://youtu.be/I3w0zFRtGnY) (CdeCiencia) | 18,6 M · x28,7 | 33 s | "Cuando un mosquito se posa sobre ti, no usa una aguja, sino seis." | Solo el subtítulo de 1 palabra ("CUANDO", "MOSQUITO" en amarillo) en el centro y abajo | Propia | Mecanismo paso a paso ("Primero… Acto seguido…") | Consecuencia seca (picor y roncha) |
| 5 | [El cirujano que firmaba órganos](https://youtu.be/85oekOGDaR0) (CdeCiencia) | 12,3 M · x19,0 | 24 s | "Escribió sus iniciales con láser en el hígado de una paciente durante un trasplante…" | Subtítulo de 1 palabra ("ESCRIBIÓ") | Propia | Acto → descubrimiento → castigo | "Perdió la licencia" |
| 6 | [Quiero más RAM](https://youtu.be/ImKo5rVlFfI) (Nate Gentile) | 5,5 M · x23,7 | 30 s | "¿Cuánta RAM tiene tu ordenador?" | Subtítulo de 2-3 palabras en caja negra | **Corte** de pódcast, pero es una anécdota cerrada | Pregunta → cifras personales (128 GB, 11.000 €) | Pregunta abierta |
| 7 | [¿Cómo no matar a tu enemigo?](https://youtu.be/NIkHUElgJmQ) (CuriosaMente, dibujo 2D) | 2,5 M · x9,9 | 61 s | El título | **El título entero arriba** (5 palabras, blanco, letra de rotulador) los 2-3 primeros segundos; luego desaparece | Propia | Historia (Napoleón) con giro | Giro final (culpa a los jacobinos) |
| 8 | [Los días cada vez son más largos. ¿Por qué?](https://youtu.be/jwd0s5A9hhI) (QuantumFracture) | 3,4 M · x11,9 | 54 s | "Los días cada vez son más largos." | **Ninguno**. Monigote blanco liso con un cronómetro (lo más parecido a nuestro estilo) | Propia | Pregunta → mecanismo (la Luna frena la Tierra) | **Bucle**: acaba en "Y por…", que empalma con "…los días cada vez son más largos" |
| 9 | [¿Qué pasaría si vendes GOMITAS en el Imperio Romano?](https://youtu.be/SiUDaRv1NA8) (El Esqueleto Observa, 165 K subs) | 2,7 M · x16 subs | 61 s | El título | Ninguno. Imagen a pantalla completa con el personaje fijo (esqueleto) | Propia | Reloj ("Día 1…") con escalada absurda | Remate que recoge el principio ("y todo porque te preguntaste") |
| 10 | [¿Qué pasaría si saltas en otros planetas?](https://youtu.be/Y7z-T2MoOGE) (El Chico Datos, 101 K) | 2,7 M · x27 subs | 52 s | Casi el título ("¿Qué tan alto podrías saltar en distintos planetas?") | Subtítulo de 1 palabra. Etiqueta pequeña del ítem arriba a la izquierda ("TIERRA 🌍") | Propia | Ranking por planetas | El más extremo, al final (Fobos) |
| 11 | [¿Qué pasa si ELIMINAS la APP STORE?](https://youtu.be/8MN1VH-VnEg) (Genius Manu, 256 K) | 584 K · x2,3 subs | 29 s | El título | Subtítulo pequeño | Propia | Pregunta → prueba en directo | "En resumen, no pasa nada" |
| 12 | [El triste final de los primeros criogenizados](https://youtu.be/omfiKgTf-XA) (El Robot de Platón) | 533 K · x6,1 | 41 s | "En preguntas que no te dejan dormir. ¿Qué le pasó a los primeros humanos criogenizados?" | Nombre de la serie en subtítulo grande. A los 3 s, **la pregunta entera arriba** en letra pequeña | Propia (serie) | Pregunta → respuesta → por qué | "Aún no" |
| 13 | [How Electrical Outlets Work](https://youtu.be/0BZ1C83I2R4) (Zack D. Films) | 61,2 M · x5,4 | 25 s | (sin subtítulos públicos) | **Ninguno**. Corte 3D del enchufe por dentro | Propia | Mecanismo visual | — |
| 14 | [What If The Earth Was Flat?](https://youtu.be/YSAwI50XS00) (Cleo Abram) | 28,9 M · x9,5 | 56 s | El título + "Would we fall off? … It's even weirder than you think." | Subtítulo de 3-4 palabras, blanco, en mayúsculas, en el centro | Propia | Pregunta → 3 consecuencias | "Para saber X, **suscríbete**" (CTA atado al tema) |
| 15 | [This Microrobot Could Save Your Life](https://youtu.be/f663rl4Y3dQ) (Cleo Abram) | 18,7 M · x6,1 | 40 s | "Look at this. This is a tiny robot that delivers drugs…" | Flecha enorme señalando el robot; "SOURCE: ETH ZÜRICH" pequeño arriba | Propia | Objeto → qué hace → para qué | "Huge, if true" + CTA atado al tema |
| 16 | [Owen Hart's Death Explained](https://youtu.be/Xv9QYPyBBXE) (simple stick figure shorts, **391 subs**) | 145 K · **x371 subs** | 41 s | "This is how Owen Hart died." | **Etiqueta fija arriba "OWEN HART - WWE"** (4 palabras, negro sobre blanco, pequeña) + viñeta 16:9 de monigotes en el centro sobre blanco + 1 palabra gigante debajo | Propia | Historia lineal con fecha y nombres | Desenlace seco |
| 17 | [How a Torpedo Finds Its Target](https://youtu.be/c3Z2oDxIG20) (Lost Chapters, 2,6 K) | 146 K · x56 subs | 23 s | "When a torpedo is launched, it drives itself through the water…" | Subtítulo de 1 palabra, blanco | Propia | Mecanismo | Seco |

Extra para el caso "recortar del largo":
- **Species | Documenting AGI**, que sí recorta y remezcla sus largos ([ejemplo con enlace al original](https://youtu.be/nG9djgxJ5rE)): mediana de Shorts 22 K frente a 1,3 M de mediana de largos [V].
- **CdeCiencia y Homosapiens**, que hacen piezas propias: medianas de Shorts de 644 K y 1,5 M, **por encima** de sus largos (180 K y 803 K) [V].
- [I] No es causa demostrada (los temas también son distintos), pero apunta en la misma dirección que la queja del usuario.

### 1.3 Patrones

1. **Primera frase = título o escena con el sujeto nombrado** (17/17) [V]. Nunca contexto ("Número dos…", "La siguiente pista…") ni pronombres sin referente.
2. **No hay rótulo fijo de pregunta arriba** (0/17) [V]. Hay tres tipos de texto arriba, y los tres **nombran el tema**:
   - **Etiqueta de tema fija y pequeña**: "OWEN HART - WWE" (#16), "TIERRA 🌍" como etiqueta del ítem (#10).
   - **El título entero solo los 2-3 primeros segundos**, mientras se dice en voz alta (#7, #12).
   - **Rótulo que cambia con cada bloque**: "Hora 1" (#3), "Ratas / Tiempo: 12 horas" (#2) o la fila de emojis que se van tachando (#1).
3. **El primer fotograma se entiende sin sonido** (17/17) [V]: oso + pierna, mosquito sobre la piel, enchufe en corte, Tierra plana. Es la "miniatura" del feed (ya visto en `viral_playbook.md` §1, "Shorts").
4. **Subtítulos de 1-2 palabras** en el centro y abajo (a ~60-70 % de la altura), en amarillo, blanco o verde con contorno negro: 8 de 17. Frases de 3-5 palabras: 4 (Nate, Cleo ×2, Genius Manu). Sin subtítulos en los fotogramas: 3 [V].
5. **Duración: 23-61 s.** Mediana de CdeCiencia 23 s, de Zack D. Films 35 s y de Homosapiens 62 s [V]. **Ritmo: 2,7-3,8 palabras por segundo** (subtítulos) [V].
6. **Cuatro estructuras repetidas** [V]:
   - **Ranking** de menos a más (#1, #2, #10).
   - **Reloj** "Hora 1 / Día 1" (#3, #9).
   - **Mecanismo** paso a paso, "no usa una aguja, sino seis" (#4, #8, #13, #17).
   - **Mini-historia** con nombre, fecha y castigo (#5, #7, #16).
7. **Cierre**: 0/17 mandan al vídeo completo [V].
   - Seco: 9.
   - Bucle con frase cortada: QuantumFracture, MinuteEarth ([coyotes](https://youtu.be/RYCVihgO3g8), x11,9) y probablemente el León.
   - CTA atado al tema: Cleo ×2.
   - Remate que recoge el principio: Esqueleto.
   - Esto matiza el `viral_playbook.md` §4, que decía "ningún viral hace bucle": **3 de 17 sí lo hacen** [V].
8. **Un recorte de 16:9 sobre fondo blanco puede funcionar** (#16: viñeta horizontal de monigotes en el centro, blanco arriba y abajo, etiqueta y 1 palabra gigante) [V]. Lo que delata un recorte en lo nuestro son **las franjas azul marino** (`BG = "0x0B1220"`): unos 600 px arriba y otros 600 abajo [V en el código].
9. **Personaje fijo dentro de la escena** (esqueleto de Homosapiens y Esqueleto Observa, monigote de QuantumFracture) [V]. Sara (la mona) debe ser protagonista y no narradora, igual que en el `viral_playbook.md` S3.

### 1.4 Diagnóstico de nuestros Shorts actuales [V]

| Short | Primera frase real (`frames.json` en `desde`) | `gancho` | Problema |
|---|---|---|---|
| ¿Cómo pillaron al dueño de 13 millones de ordenadores zombis? | "Número dos, el grupo de delitos telemáticos, de la UCO de la Guardia Civil." | ¿CÓMO LO/PILLARON? | Empieza con un número de lista. El gancho usa un pronombre ("LO") y no dice quién |
| ¿Cómo se roban mil millones a los bancos sin entrar en ninguno? | "Número uno, la unidad central de ciberdelincuencia…" | ¿CÓMO SACABAN/EL DINERO? | Igual. "Sacaban": ¿quién? |
| ¿Qué escondía la imagen más misteriosa de 4chan? | "La primera pista era fácil…" | ¿QUÉ HAY/DENTRO? | "Primera pista" de algo que no se ha presentado. "Dentro" ¿de qué? |
| ¿Por qué Cicada 3301 estaba lleno de primos? | "La siguiente pista llevaba a tres números primos…" | ¿POR QUÉ/PRIMOS? | Arranca a mitad de historia |
| ¿Quién estaba detrás de Cicada 3301? | (bloque final) | ¿LA NSA?/¿LA CIA? | No nombra Cicada: quien no conoce el tema no sabe de qué hablan |
| (próximo) ¿Se puede escribir un mensaje solo con pensarlo? | "Las once de la noche. La cama." | ¿ESCRIBIR/CON LA MENTE? | Arranca con la hora de un día que no se ha planteado |

**El patrón**: el `titulo` está bien escrito (es una pregunta con sujeto), pero **ni se dice al principio ni sale en pantalla**. Lo que se ve es un gancho abreviado que da por hecho el contexto, y lo que se oye es una frase del medio del largo.

---

## 2. Especificación nueva de Shorts para Tecnomono

### 2.1 Decisión: guion propio para el Short, no recorte

- **Sí: guion dedicado de 30-45 s** por Short, escrito a la vez que el `seo.md` del largo. **2 por largo en YouTube** (tope actual de `MAX_SHORTS_PER_LONG`).
- **El recorte del largo queda solo como excepción**: si un tramo del largo ya empieza con el sujeto nombrado y se entiende solo (lo comprueba la validación del §4).
- **Coste bajo, reutilizando** [I para la estimación de tiempo; los precios salen de CLAUDE.md]:
  - **Imágenes**: se reutilizan las del largo (`remotion/public/<slug>/<clave>.jpg`, 1376×768 sobre blanco puro). Se elige 1 imagen por frase.
  - **Primer fotograma**: opcional, **1 imagen vertical nueva** (9:16, Flash ~0,04 €) para el plano de apertura, que hace de miniatura en el feed. Tope: 2 imágenes nuevas por Short (≤0,08 €), así que con 2 Shorts por largo salen ≤0,16 €. Hay que avisar del gasto igualmente (regla de los 250 €).
  - **Voz**: ~120-150 palabras (~700-850 caracteres) por Short con la misma voz y los mismos `voice_settings` del largo. Unas 1.500 palabras de crédito de ElevenLabs por vídeo.
  - **Subtítulos**: del propio guion del Short alineado con Whisper, como ahora.

### 2.2 Plantilla del mini-guion (30-45 s, 100-150 palabras)

A 1,25 de velocidad, nuestro ritmo real está en unas 3,2-3,6 palabras por segundo, así que 150 palabras son ≈ 42-47 s. Hay que medirlo con el primer Short.

```
L1 (0-3 s)    EL TÍTULO DICHO EN VOZ ALTA. Sujeto con nombre + lo sorprendente.
              Ni "número X", ni pronombres, ni "hoy", ni "¿sabías que…?" sin sujeto.
L2 (3-7 s)    Subida de apuesta o el "no es lo que crees": "Y no es lo peor." / "Pero no lo hace solo."
B1-B3 (7-35 s) Tres golpes de 8-10 s. Cada uno con UN dato con nombre propio o cifra.
              Una imagen nueva cada 2-3 s. Formato a elegir (§1.3.6): ranking · reloj · mecanismo · mini-historia.
P  (35-42 s)  La respuesta sorprendente (aquí entra el `reveal` con su pop).
F  (últimos 1-2 s) Cierre seco o frase-bucle que empalma con L1. Nada de "vídeo completo".
```

Reglas duras:
- **S1'**: `L1` == `titulo` (o el `titulo` es L1 recortada a ≤60 caracteres). El título nombra el tema en sus 4 primeras palabras.
- **S2'**: el Short se entiende sin haber visto el largo. Prueba: léeselo a alguien sin contexto. Si pregunta "¿quién?" o "¿de qué?", no vale.
- **S3'**: Sara aparece **dentro** de la escena del primer fotograma (sin señalar desde un lado).
- **S4'**: el primer fotograma se entiende sin sonido: un objeto o escena reconocible (móvil, robot doblando ropa, cable en el fondo del mar), no un plano general con iconos pequeños.

### 2.3 Texto en pantalla (sustituye al `gancho`)

| Capa | Qué es | Reglas | Cuándo |
|---|---|---|---|
| **`tema`** (nuevo) | Etiqueta del sujeto, estilo "OWEN HART - WWE" | **1-4 palabras, ≤22 caracteres. Tiene que llevar el nombre propio u objeto del que va el Short.** Sin verbos, sin interrogación, sin pronombres. Blanco o negro, ~56-64 px, arriba del todo | Todo el Short |
| **`titulo` en pantalla** | El título, grande, mientras se dice | Igual que L1. Hasta 2 líneas, ~90 px, arriba | 0 → fin de L1 (~2,5 s), luego desaparece |
| **`rotulos`** (nuevo, opcional) | Rótulo que cambia en cada golpe ("7:00", "Nº 4 · TIKTOK", "1 MES") | ≤3 palabras, verde o dorado grande, a media altura | Al empezar cada golpe |
| **`reveal`** (ya existe) | El remate | Igual que ahora | Cuando se dice |

Ejemplos con NUESTROS temas:

| Mal (el `gancho` de ahora) | Por qué falla | Bien: `tema` + `titulo` dicho y escrito |
|---|---|---|
| ¿CÓMO LO/PILLARON? | Pronombre, no hay sujeto | `tema: BOTNET MARIPOSA` · "Trece millones de ordenadores zombis. Y a su dueño lo pilló la Guardia Civil." |
| ¿CÓMO SACABAN/EL DINERO? | ¿Quién? ¿Qué dinero? | `tema: CAJEROS HACKEADOS` (o `CARBANAK`, el nombre que usó Europol en 2018; el guion del largo no lo dice, así que hay que comprobarlo antes) · "Robaron mil millones a los bancos sin entrar en ninguno." |
| ¿QUÉ HAY/DENTRO? | ¿Dentro de qué? | `tema: CICADA 3301` · "En 2012 apareció en 4chan una foto con un mensaje escondido." |
| ¿POR QUÉ/PRIMOS? | Una sola palabra técnica sin contexto | `tema: CICADA 3301` · "El puzle más difícil de internet estaba lleno de números primos. Por esto." |
| ¿LA NSA?/¿LA CIA? | No nombra el tema | `tema: CICADA 3301` · "Nadie sabe quién creó el puzle más difícil de internet. Estos son los sospechosos." |
| ¿ESCRIBIR/CON LA MENTE? | Vago: ¿quién, cómo? | `tema: CHIP NEURALINK` · "Ya hay gente escribiendo en el móvil solo con pensarlo." |
| ¿QUIÉN MANEJA/EL ROBOT DE CASA? | Pasable, pero sin nombre propio | `tema: ROBOT NEO` · "Este robot de casa cuesta veinte mil dólares. Y a veces lo maneja una persona." |
| ¿CUÁNTOS VÍDEOS DE TIKTOK/TE ENGANCHAN? | Bien (nombra TikTok), pero el `titulo` no se dice | `tema: TIKTOK` · "Según los documentos internos de TikTok, bastan doscientos sesenta vídeos para engancharte." |

Validación automática (ver §4): un `tema` o `titulo` en pantalla **falla** si contiene solo pronombres o adverbios (LO, LA, LE, ESTO, ESO, DENTRO, AQUÍ, ELLOS) o si no comparte ningún sustantivo o nombre propio con el `titulo`.

### 2.4 Fórmula del título del Short

`[Sujeto concreto] + [lo increíble o el conflicto]`, ≤50 caracteres, con el sujeto en las 4 primeras palabras. Es la misma frase que L1.

Plantillas [V por el top, adaptadas]:
1. **Mecanismo**: "Cuando [haces X], [objeto] no hace Y: hace Z" (mosquito x28,7). → "Cuando desbloqueas con la cara, tu móvil no hace una foto".
2. **¿Qué pasaría si…?** (Homosapiens, Esqueleto, Cleo). → "¿Qué pasaría si mañana se cortan los cables submarinos?"
3. **Ranking**: "¿Qué [X] te [verbo de tensión] antes?" (x32,7). → "¿Qué red social te engancha antes?"
4. **Mini-historia**: "[Persona/rol] + [acto increíble]" (cirujano x19). → "Un chaval de 22 años paró un virus mundial con 10 dólares" (ya es nuestro 4.º mejor en interacción).

Prohibido:
- "¿Sabías que…?" sin sujeto delante. Los nuestros del 26-27 oct tienen 106-190 vistas, aunque son muy recientes [I].
- Títulos sin sujeto ("¿Cómo nadie se dio cuenta en 2 meses?", 174 vistas) [V].
- Sueldos y profesiones (ya vetado).

### 2.5 Subtítulos

- **2 palabras por bloque** (hoy son 3). Karaoke dorado sobre blanco con contorno negro, Montserrat ExtraBold **~110 px**, centrados a **~62 % de la altura** (no pegados abajo: en el feed tapan la interfaz de YouTube) [V para el patrón; I para la cifra exacta].
- Las palabras clave (el nombre propio y la cifra) salen en una línea propia, de 1 palabra, en verde o dorado. Es lo que hacen CdeCiencia y Homosapiens.

### 2.6 Composición visual

- **Fondo blanco** (nuestras imágenes son de fondo blanco puro, así que el borde desaparece), no azul marino. La imagen del largo se escala a ~1,35× del ancho (1458 px), se recorta a 1080 y va encuadrada en la mitad superior. Así parece una viñeta grande, como el #16, y no un vídeo horizontal metido en un marco [I sobre el factor; V sobre el patrón].
- Primer fotograma: si hay imagen vertical nueva, a pantalla completa.
- Movimiento lento (zoom del 3-5 %) en cada imagen, con un corte cada 2-3 s.

### 2.7 Cierre y enlace al largo

- **Fuera el fotograma congelado de 3 s con "VÍDEO COMPLETO EN EL CANAL"** [V: 0/17 lo hacen. I: es tiempo muerto que baja el % visto].
- Dos cierres posibles:
  - **Seco**: la frase P y corte.
  - **Bucle**: F es media frase que empalma con L1, como en QuantumFracture: "…y por eso" → "Los días cada vez son más largos".
- Enlace al largo:
  1. Primera línea de la descripción: "Vídeo completo: <enlace>" (ya lo hace `publish_shorts.py`).
  2. **"Vídeo relacionado" puesto a mano en Studio**. La API no lo permite (CLAUDE.md), y es el enlace que de verdad se ve en el Short.
  3. Si se quiere CTA hablado, al estilo Cleo y atado al tema, dentro de los 45 s: "Las otras nueve redes están en el vídeo largo." [I]
- TikTok: el mismo Short sin CTA hablado; texto con keyword en la primera línea (igual que ahora).

### 2.8 Ejemplos completos para los próximos vídeos (los datos salen de sus `script.md`)

**A. `asi-sera-un-dia-normal-en-2035` · Short 1** (formato mini-historia y objeto)
```
tema: ROBOT NEO
titulo: Este robot de casa cuesta 20.000 dólares (y no va solo)
L1  Este robot de casa cuesta veinte mil dólares. Y a veces no va solo.
L2  Se llama NEO. Lo vende la empresa One X. Y dobla tu ropa.
B1  Promete entregarlo en Estados Unidos en dos mil veintiséis.            [rotulo: 20.000 $]
B2  Pero cuando NEO no sabe hacer algo, no se rinde.                       [rotulo: ¿SOLO?]
B3  Se conecta a distancia… y alguien se pone a los mandos.
P   Un empleado. Viendo tu casa.                                            [reveal: UN/EMPLEADO]
F   El robot de casa ya existe. Lo que le falta es aprender solo.
```
Imágenes: las del bloque de las 20:00 del largo, más 1 vertical nueva de Sara en el sofá mientras NEO le dobla una camiseta.

**B. `cada-red-social-y-como-te-engancha` · Short 1** (formato mecanismo y cifra)
```
tema: TIKTOK
titulo: TikTok sabe cuántos vídeos bastan para engancharte
L1  TikTok sabe cuántos vídeos bastan para engancharte. Lo pone en sus documentos.
L2  Se filtraron en Kentucky. Y la cifra es pequeña.
B1  Su anzuelo es el scroll infinito. Lo inventó Aza Raskin en dos mil seis.  [rotulo: SCROLL INFINITO]
B2  Hoy dice que se arrepiente.
B3  Y el feed Para ti aprende de cada segundo que miras.
P   Según su propia investigación: doscientos sesenta vídeos. Unos treinta y cinco minutos.  [reveal: 260/VÍDEOS]
F   Y Bruselas ya ha acusado a su diseño adictivo de saltarse la ley europea.
```

---

## 3. Miniaturas y títulos de los vídeos largos

### 3.1 Lo que se ve en los ganadores de monigote y dibujo [V]

| Vídeo (x) | Título | Miniatura |
|---|---|---|
| Tieso: [Terremotos](https://youtu.be/-eNYW0j3oYY) (x332, 458 K) | "Todos Los Tipos de Terremotos Explicados en 10 Minutos" | 8 círculos de color con un icono y la **etiqueta** de magnitud ("5.0-6.0"). Sin texto de gancho |
| Tieso: [Policía de España](https://youtu.be/G6lpKAUdaCQ) (x122) | "Cada Policía De España Explicada" | **3 monigotes** con casco, cada uno sobre su bandera, con el **nombre** encima: POLICÍA · MOSSOS · ERTZAINTZA |
| Tieso: [Fuerzas especiales](https://youtu.be/MMG93Zznrpg) (x84) | "Cada Fuerza Especial De España Explicada En 9 Minutos" | 3 monigotes: GEOS · MOE · GEAS, sobre la bandera |
| Tieso: [Déjà vu](https://youtu.be/rgEZmLbJvWs) (x100) | "EL DEJAVU explicado en 4 MINUTOS" | 1 monigote con la mano en la cabeza y "copias" fantasma + **"¿DEJA VU?"** (el tema, 2 palabras) sobre fondo oscuro |
| Tecnotipos: [Mafias hacker](https://youtu.be/IGokHETRlcA) (x18) | "TODAS las MAFIAS HACKER Explicadas en 5 MINUTOS" | Cuadrícula 5×2 de personajes con **nombre** debajo |
| Paint Explainer: [War crimes](https://youtu.be/cm_RnwY_vYI) (x5,2) | "Every Major US War Crime, in 20 Minutes" | 1 personaje grande + 4 palabras = **el tema** |
| Paint Explainer: [Jail deaths](https://youtu.be/qTmAXRmJuVM) (x4,3) | "The Worst Jail Deaths Ever" | 2 viñetas, cada una con su **etiqueta** ("NASAL TUBE", "BOILING SHOWER") |
| Siliconversations: [Seahorse](https://youtu.be/W2xZxYaGlfs) (x15) | "Why Does The Seahorse Emoji Drive ChatGPT Insane?" | 3 elementos + "What's Wrong Little Robot?" (el síntoma) |

**Patrón [V]**:
- En 7 de 8, el texto de la miniatura **es el nombre de lo que vas a ver** (etiquetas o tema), no una pregunta suelta. Es la misma lección que en los Shorts.
- Formatos que se repiten:
  - Cuadrícula de 8-10 con etiquetas.
  - **Trío** de personajes con etiqueta grande encima: Tieso, ×2 en el top 5. Es nuevo frente al playbook anterior.
  - Foco único + 2-4 palabras del tema.
- Títulos de 5-9 palabras con el **sujeto delante** y "Cada/Todos los X explicados (en N minutos)". Tieso usa "Cada … De España" en 4 de sus 8 mejores.

### 3.2 Reglas (amplían M1-M5 y T1-T5 de `viral_playbook.md`)

- **M6 — El texto de la miniatura nombra el tema o etiqueta los elementos.** Prohibido el texto que solo se entiende con el título al lado ("¿Y AHORA?", "¿CUÁL USAS?") salvo en el formato foco único + síntoma, y aun así con el sujeto a la vista. [V: 7/8]
- **M7 — Nueva plantilla C, "trío"**: 3 personajes (Sara + 2, o 3 objetos-personaje) con su **nombre en mayúsculas encima** (~15 % de la altura) sobre un fondo de color por casilla. Más legible en el móvil que una cuadrícula de 10. [V: Tieso x84-x122]
- **T6 — El título empieza por el sujeto**: "Cada red social…", "Un día normal en 2035…". La palabra de tensión va al final (T1).

### 3.3 Aplicado a los dos próximos vídeos

**"Así será un día normal en 2035"**
- Título: **"Así será un día normal en 2035 (y lo que puede fallar)"**, el que ya está recomendado. Cumple T1 y T6.
  - Alternativa al estilo Tieso para probar con "Probar y comparar" en Studio (a mano): "Cada tecnología de tu día en 2035, explicada".
- Miniatura:
  - **Opción 1 (recomendada, plantilla C)**: arriba, "2035" enorme en negro. Debajo, 3 casillas con etiqueta: **ROBOTAXI · ROBOT EN CASA · CHIP CEREBRAL**. Sara metida en la casilla del robotaxi (en el asiento de atrás, sin conductor), con cara de sospecha y no señalando. Un acento rojo: el volante que gira solo.
  - **Opción 2**: la cuadrícula 5×2 del `seo.md`. Ojo: son 10 *objetos*, la versión que menos rinde según T4. Si se usa, que las etiquetas sean grandes y que haya al menos 3 casillas con personaje (robot NEO, dron con cara, coche con ojos).
  - Mal: "¿ESTARÁS AQUÍ?", "EL FUTURO" o cualquier pregunta sin sujeto.

**"Cada red social explicada (y el truco que te ENGANCHA)"**
- Título: el recomendado del `seo.md` está bien (sujeto delante y palabra de tensión).
- Miniatura:
  - **Opción 1 (cuadrícula 5×2 del `seo.md`)**: vale, porque las etiquetas son los nombres de las redes (M6). Requisito: etiqueta ≥7 % de la altura, porque sin logos **la etiqueta es lo único que identifica la red**.
  - **Opción 2 (plantilla C)**: WHATSAPP · TIKTOK · INSTAGRAM, cada personaje-objeto con su anzuelo (bocadillo espía, móvil-tragaperras, espejo con corazón) y Sara atrapada dentro del móvil-tragaperras. Un acento rojo en la palanca.
  - Mal: "¿POR QUÉ NO PARAS?" (no dice redes sociales).

---

## 4. Cambios en `scripts/make_shorts.py` (por prioridad; NO implementados)

**P0 — lo que ataca la queja directamente**

1. **Modo Short con guion propio** (`tipo: guion` en `## Shorts` de `seo.md`, con el guion en `<manifest_dir>/shorts/short_N.md`):
   - **Formato del `.md`**: una línea por frase con la imagen al final, `L1 Texto… | img: 3_42` o `img: nuevo:<prompt vertical 9:16>`. Cabecera con `tema`, `titulo`, `reveal`, `rotulos` y `cierre: seco|bucle`.
   - **Voz**: con las mismas funciones y `voice_settings` del largo (`scripts/generate_voice.py`). La velocidad se aplica igual (`playback_rate`).
   - **Tiempos**: con `whisper_timestamps.py` sobre ese audio. Así cada frase tiene su inicio y su fin, y la imagen cambia con la frase.
   - **Imágenes nuevas**: `img: nuevo:` llama a `generate_images_gemini.py` en 9:16, pasando por `gasto.comprobar` (tope de 250 €), con un máximo de 2 por Short.
   - **Montaje**: con ffmpeg (imágenes con un zoom lento + audio + .ass), sin Remotion, para no tocar el pipeline del largo.
   - **Convivencia**: el modo recorte (`desde`/`hasta`) se mantiene.
2. **Fuera el `gancho` fijo; entran `tema` y `titulo` en pantalla**:
   - El estilo `Hook` pasa a ser `Titulo`: de 0 s al fin de la primera frase (o 2,5 s en modo recorte).
   - Nuevo estilo `Tema`: ~60 px, arriba, durante todo el Short.
   - Si un `seo.md` antiguo trae `gancho` y no `tema`, se avisa y se usa el `gancho` como `titulo`, sin dejarlo fijo.
3. **Validación de comprensión** (avisa, y con `--estricto` aborta):
   - La primera frase del Short (en modo recorte, `caps_words[i0]`) debe parecerse al `titulo` (difflib ≥0,6) o contener su sujeto.
   - Se marcan las primeras frases que empiezan por "Número", "La siguiente", "Pero", "Y ", "Su ", "Este/Esta", "Ahí", o por un pronombre.
   - `tema` y `titulo`: se rechazan los que solo llevan pronombres o adverbios (LO, LA, ESTO, DENTRO…) y los que no comparten ningún sustantivo con el `titulo`.
4. **Fuera el CTA congelado de 3 s**: se quitan `tpad=stop_duration=3` y `apad=pad_dur=3`, y `dur = body`.
   - `cierre: bucle` hace un fundido de audio de 0,2 s y no 1,2 s, para que el empalme no se note.
   - El CTA hablado, si lo hay, va en el guion.
   - `--tiktok` sigue pudiendo poner su "SÍGUEME" como texto sobre los últimos 2 s, sin congelar la imagen.

**P1 — forma**

5. **Fondo blanco y encuadre**: `BG = "0xFFFFFF"`. En el modo recorte, escalar a ~1458 de ancho, recortar a 1080 y colocar en y≈280 (mitad superior), dejando el hueco de los subtítulos debajo. Contorno negro de subtítulos y del `tema` de 6-7 px para que se lean sobre el blanco.
6. **Subtítulos de 2 palabras** (`chunk_caption(per=2)`), `Fontsize 110`, `MarginV` para dejarlos a ~62 % de la altura (≈700 px desde abajo), y una línea de una sola palabra en verde o dorado para los nombres propios y las cifras (lista sacada del `titulo` y el `tema`).
7. **`rotulos:`** con tiempo, a media altura, que cambian en cada golpe ("7:00", "Nº 4 · TIKTOK"). Se sincronizan buscando la palabra igual que `find_reveal_start`: reutilizar esa función.
8. **Duración**: aviso si queda <20 s o >50 s y si las palabras por segundo salen fuera de 2,8-3,9. `MAX_DUR` baja de 58,5 a 50.

**P2 — medir y cerrar el ciclo**

9. **Manifiesto**: `shorts.json` guarda `tipo`, `tema`, `primera_frase` y `cierre`, para poder cruzarlo después con los resultados.
10. **`scripts/shorts_stats.py`** (nuevo): `views`, `engagedViews`, `averageViewDuration` y `averageViewPercentage` por Short, con YouTube Analytics (`filters=video==id1,id2…`; el filtro `creatorContentType` da error 400 con estas métricas, comprobado el 27-oct). El indicador que manda es **% de vistas con interacción**, hoy en el 47 %. **Objetivo: ≥65 % en los Shorts de guion propio** [I sobre la cifra objetivo].
11. **Ranking con fila de iconos** (opcional, plantilla de Homosapiens #1): una fila de 5-6 iconos arriba que se van tachando en cada golpe.

**Fuera de `make_shorts.py`, pero necesario**
- CLAUDE.md, "## Shorts": sustituir la regla del `gancho` por la de `tema` + `titulo` en pantalla. Añadir "guion propio por defecto" y la plantilla del §2.2. Matizar "ninguno de los virales hace bucle" (3/17 sí).
- `publish_shorts.py`: recordatorio por consola de poner a mano el **vídeo relacionado** en Studio después de cada subida.
