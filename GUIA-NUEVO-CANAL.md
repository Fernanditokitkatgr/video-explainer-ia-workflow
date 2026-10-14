# Guía paso a paso: montar un canal nuevo con este sistema

Para alguien que nunca ha usado el repo. No hace falta saber programar: casi todo se
hace pidiéndoselo a **Claude Code** (el asistente que se ejecuta en la terminal o en
VS Code) dentro de esta carpeta. Claude lee `CLAUDE.md` y sabe cómo funciona todo.
Tú decides el concepto y revisas; Claude ejecuta.

---

## 1. Qué es esto, en una frase

Una "fábrica" de vídeos explicativos animados para YouTube. Cada vídeo sale de una
cadena de pasos:

```
Tema → Guion → Voz (ElevenLabs) → Tiempos de cada frase (Whisper)
     → Una imagen por frase (Gemini) → Revisión de imágenes → Efectos de sonido
     → Montaje y render (Remotion) → Miniatura con texto → SEO
     → Subida programada a YouTube → 2 Shorts verticales programados
```

El resultado es 1 vídeo largo al día (unos 7 minutos) más 2 Shorts. Todo queda programado
en YouTube para publicarse solo.

---

## 2. Antes de empezar: lo que necesitas (una sola vez)

### Cuentas (cada una con su propia clave)

| Servicio | Para qué | Coste aproximado |
|---|---|---|
| **ElevenLabs** | La voz del narrador | Plan de pago (créditos por carácter) |
| **Google Cloud (Vertex AI)** | Generar las imágenes con Gemini | Por imagen; hay crédito de bienvenida |
| **Google Cloud (YouTube Data API)** | Subir y programar vídeos | Gratis (cuota diaria) |
| **Claude Code** | El asistente que lo ejecuta todo | Suscripción de Claude |
| **Un canal de YouTube** | Donde se publica | Gratis |

### Programas en el ordenador

- Python 3.11 o superior
- Node.js 18 o superior
- ffmpeg
- Git
- Google Cloud CLI (`gcloud`)

Si no sabes instalarlos, ábrele Claude Code y dile: *"Instálame lo que hace falta según
SETUP.md"*.

### Importante: usa tu propia copia del repo

Ahora mismo varios scripts tienen el canal `tecno` escrito dentro del código:
- la ruta del estilo visual;
- el personaje de referencia;
- los hashtags y la frase final de los Shorts;
- la cola de publicación.

Si dos canales comparten la misma carpeta, se pisan. **Lo seguro es una copia del repo
por canal:**

```bash
git clone <url-del-repo> mi-canal-nuevo
cd mi-canal-nuevo
```

En esa copia, el canal nuevo vivirá dentro de `channel/tecno/`, sustituyendo su
contenido. (Si en el futuro se quiere de verdad multi-canal en una sola carpeta, hay que
cambiar esos scripts para que lean el canal de `videos.json`. Es un cambio pequeño que
Claude puede hacer.)

### Configurar las claves (archivo `.env`)

```bash
cp .env.example .env
```

Abre `.env` y rellena:
- `ELEVENLABS_API_KEY` y `ELEVENLABS_VOICE_ID`: la voz de **tu** canal. Elígela en
  ElevenLabs y copia su ID.
- `GEMINI_VERTEX_PROJECT`: el ID de **tu** proyecto de Google Cloud.
- El resto se puede dejar como viene.

El `.env` **nunca** se sube a GitHub (ya está en `.gitignore`).

### Conectar con tu canal de YouTube

1. En Google Cloud Console, en **tu** proyecto, activa:
   - **YouTube Data API v3**, para subir.
   - **YouTube Analytics API**, para medir CTR y retención.
2. En **Google Auth Platform → Información de la marca**, rellena:
   - nombre de la app;
   - correo de asistencia;
   - página principal (la URL de tu canal);
   - política de privacidad (un Google Doc publicado basta).
3. En **Google Auth Platform → Público**, pulsa **Publicar app**. Así pasa a "En
   producción". Si se queda en "Prueba", el acceso **caduca cada 7 días** y las subidas
   automáticas se paran.
4. En **Clientes**, crea un cliente OAuth de tipo "Escritorio". Descarga el JSON y
   guárdalo como `scratch-yt/client_secret.json` (ya está en `.gitignore`, nunca se sube).
5. Ejecuta `python scratch-yt/reauth.py`. Se abre el navegador. Entra con la cuenta que
   es **dueña del canal** y acepta. Si sale "app no verificada", ve a *Configuración
   avanzada → Ir a la app*. Es normal, porque la app es tuya.

---

## 3. Montar el canal nuevo: concepto, personaje y estilo

Esto se hace **una vez** y define la identidad del canal. Pídeselo a Claude paso a paso.

### Paso 3.1: El concepto y la audiencia

Escribe en un párrafo:
- de qué va el canal;
- para quién es;
- en qué idioma;
- qué tono tiene.

Ejemplo: *"Canal de historia contada como un thriller, para adultos de 25-45 años,
castellano de España, tono cercano y con humor."*

Díselo a Claude: *"Este es el concepto del canal nuevo. Ayúdame a definir la fórmula del
canal."* (Si existen las skills `/channel-setup` o `/channel-formula`, úsalas).

### Paso 3.2: Elegir temas con demanda probada

La regla más importante, aprendida con datos reales:

> **Los vídeos que explican algo que la gente busca funcionan. Las noticias del día no.**
> En el canal original, el explicativo "Así funciona la IA" sacó 1.009 vistas. Los vídeos
> tipo noticia se quedaron en 0-15.

Haz tu `channel/tecno/topic_backlog.md` con 15 temas. Solo entra un tema si:
- un canal grande (en inglés vale) ya sacó **millones de vistas** con él;
- en tu idioma casi nadie lo ha explicado bien;
- es *evergreen*, es decir, seguirá interesando dentro de un año.

Mezcla semanal recomendada:
- 4 explicativos;
- 2 sobre dinero o trabajo del nicho;
- como mucho 1 de actualidad.

Pídeselo a Claude: *"Investiga en YouTube los vídeos más vistos sobre <tu nicho> y hazme
un topic_backlog.md como el del canal original"*.

### Paso 3.3: El personaje y el estilo visual

1. Decide el personaje protagonista. En el canal original es "Sara", una mona de dibujo
   plano con contorno negro grueso.
2. Pide a Claude que genere **3-4 versiones** del personaje con Gemini
   (`scripts/generate_thumbnail.py`). Elige la que más te guste.
3. Guárdala como `channel/tecno/references/mono_canonico.png`. Es la **imagen de
   referencia**, y Gemini la recibe en CADA imagen para que el personaje no cambie.
4. Pide a Claude que reescriba `channel/tecno/style-bible.json` para tu canal: personaje,
   paleta, tipo de ilustración y elementos prohibidos. Es la fuente de verdad del estilo.
5. **Antes de producir un vídeo entero, genera 3 imágenes de prueba con un guion real.**
   Un cambio de estilo sin probar se aplica a 140 imágenes y hay que tirarlas todas.

### Paso 3.4: Música, hashtags y frase final

- Cambia `channel/tecno/assets/musica-canal.mp3` por la música de tu canal (sin derechos
  de autor).
- En `scratch-yt/publish_shorts.py`, cambia `BASE_HASHTAGS` y la frase "Suscríbete
  para…" por las de tu canal.
- Vacía las colas del canal anterior:
  - `scratch-yt/publish_queue.json`: pon la cola vacía.
  - `scratch-yt/shorts_queue.json`.
  - `videos.json`: deja solo tus vídeos.
  - Las carpetas de `channel/tecno/videos/`.

---

## 4. Producir un vídeo, paso a paso

Para cada vídeo basta con decirle a Claude: *"Produce el siguiente vídeo del backlog
siguiendo CLAUDE.md"*. Esto es lo que va a hacer, para que sepas revisar cada paso.

| # | Paso | Qué revisas tú |
|---|---|---|
| 1 | **Guion** (`script.md`, unos 8.000 caracteres ≈ 7 min) | Que tenga gancho en los primeros 15 s, frases cortas, sin datos inventados |
| 2 | **Voz** con ElevenLabs | Escucha el principio y las frases con cifras o negaciones |
| 3 | **Whisper**: un tiempo para cada frase | Nada (automático) |
| 4 | **Escenas**: una imagen por frase (`frames.json`) | Que cada imagen cuente lo que dice la frase |
| 5 | **Comprobación de variedad** (`scene_diversity_check.py`) | Tiene que dar 0 fallos |
| 6 | **Imágenes** con Gemini (unas 2 horas, 1 imagen por minuto) | — |
| 7 | **Revisión de TODAS las imágenes** | Ver sección 7: defectos típicos |
| 8 | **Efectos de sonido** y música | — |
| 9 | **Montaje** y comprobación previa (`preflight.py`) | 0 fallos |
| 10 | **Render** con Remotion | Mira 2-3 momentos del mp4 |
| 11 | **Miniatura** base (Gemini, sin texto) y texto encima por código | Que se lea en medio segundo |
| 12 | **SEO** (`seo.md`): título, descripción, etiquetas, capítulos | Ver sección 6 |
| 13 | **Subida programada** (`publish_from_recipe.py`) | Fecha y hora en YouTube Studio |
| 14 | **2 Shorts** (`make_shorts.py` y `publish_shorts.py`) | Que el gancho tenga sentido sin el vídeo |

Comandos por vídeo (`<slug>` es el nombre de la carpeta del vídeo):

```bash
python scripts/orchestrate.py --video <slug> --steps voice,whisper --yes
python scripts/scene_diversity_check.py --video <slug>
python scripts/generate_images_gemini.py --video <slug>
python scripts/generate_sfx.py --video <slug>
python scripts/generate_remotion_tsx.py <slug>          # y registrar en remotion/src/Root.tsx
python scripts/preflight.py --video <slug> --stage render
cd remotion && npx remotion render <Composicion> output/<slug>.mp4 && cd ..
python scripts/generate_thumbnail.py --video <slug> --prompt "..."
python scripts/thumbnail_text.py --video <slug>
python scratch-yt/publish_from_recipe.py --video <slug> --dry-run   # comprobar
python scratch-yt/publish_from_recipe.py --video <slug>             # subir
python scripts/make_shorts.py <slug>
python scratch-yt/publish_shorts.py --video <slug>
```

---

## 5. Shorts, miniaturas y programación

- **Shorts:** dos por cada vídeo largo, de 1080×1920 y menos de 59 s.
  - Llevan un gancho grande arriba, subtítulos y "VÍDEO COMPLETO EN EL CANAL" al final.
  - En la descripción enlazan al vídeo largo.
  - Siempre se publican **después** del largo: a las 21:00 y a las 13:00 del día
    siguiente.
  - Se definen en `seo.md` → `## Shorts`, indicando desde qué frase hasta qué frase va
    cada uno.
- **Miniaturas:**
  - La imagen la hace Gemini **sin texto**, porque inventa letras.
  - El texto lo pone el código (`thumbnail_text.py`): 2-4 palabras, una en amarillo.
  - Se configura en `seo.md` → `## Miniatura`.
- **Calendario:**
  - Un vídeo largo al día a las 19:00 (hora de Madrid), gestionado por
    `publish_queue.py`.
  - La cola reserva sola el siguiente día libre.
- **Cuota de YouTube:** 10.000 unidades al día, unas **6 subidas**. Se reinicia a las
  09:00 de Madrid. El ritmo de 1 largo y 2 Shorts al día cabe de sobra. Si adelantas
  muchos días de golpe, lo que sobre se sube al día siguiente con
  `publish_shorts.py --pending`.

---

## 6. ¿Cubre las buenas prácticas de SEO de YouTube?

**La mayoría, sí.** Esto es lo que hace el sistema en cada vídeo:

| Buena práctica | ¿Lo hace? | Cómo |
|---|---|---|
| Temas con búsqueda y demanda probada | ✅ | `topic_backlog.md` basado en vídeos con millones de vistas |
| Título corto con la palabra clave al principio | ✅ | ≤60 caracteres, para que no se corte en el móvil |
| Miniatura con texto grande y legible | ✅ | Texto por código, 2-4 palabras, alto contraste |
| Descripción con resumen y palabras clave | ✅ | En `seo.md` |
| Capítulos (marcas de tiempo) | ✅ | Calculados con los tiempos reales del audio. Ojo: si `## Capítulos` de seo.md se queda en TODO, el vídeo se sube sin capítulos |
| Etiquetas | ✅ | 15-20 por vídeo |
| Categoría e idioma correctos | ✅ | Categoría 28 (Ciencia y tecnología) e idioma español en los Shorts |
| Publicar con constancia | ✅ | 1 al día a la misma hora |
| Shorts que llevan al vídeo largo | ✅ | 2 por vídeo, con enlace al largo |
| Gancho en los primeros segundos | ✅ | Regla del guion |
| Vídeos que se entienden solos | ✅ | Regla del guion: nada de "como vimos en el anterior" |
| Medir CTR y retención | ⚠️ Preparado | Falta activar la YouTube Analytics API (sección 2) |

**Lo que NO hace todavía (hay que hacerlo a mano en YouTube Studio, o pedir a Claude
que lo añada):**

| Buena práctica | Por qué importa | Cómo hacerlo |
|---|---|---|
| **Pantallas finales** (los vídeos sugeridos de los últimos 20 s) | Retienen al espectador en el canal | Solo en YouTube Studio; la API no lo permite |
| **Tarjetas** a otros vídeos | Igual que las anteriores | YouTube Studio |
| **Listas de reproducción** por tema | Más tiempo de visualización y otra vía de búsqueda | Se puede automatizar con la API: pídeselo a Claude |
| **Subtítulos subidos** (.srt) | Accesibilidad y algo de SEO | Se pueden generar con Whisper y subir por API: pídeselo |
| **Comentario fijado** con una pregunta | Más interacción | A mano tras publicar |
| **Prueba A/B de miniaturas** ("Probar y comparar") | Saber qué miniatura atrae más | YouTube Studio, a mano |
| **Declaración de contenido sintético** | YouTube la exige si el contenido parece real | Con dibujos animados no hace falta. Si usas imágenes o voces realistas de personas, márcalo |
| **Revisar CTR y retención cada semana** | Saber qué funciona de verdad | Cuando la Analytics API esté activa, Claude puede sacar el informe |

**Resumen honesto:** el sistema cubre muy bien la parte que se puede automatizar: tema,
título, miniatura, descripción, capítulos, constancia y Shorts. Lo que más diferencia
marca y aún falta es **medir y ajustar**: mirar el CTR y la retención cada semana y repetir
lo que funciona. Eso empieza en cuanto la API de Analytics está activa.

---

## 7. Errores típicos y cómo evitarlos

Todos aprendidos en producción real:

**Imágenes de Gemini.** Revisa SIEMPRE todas. Sale de media un 5-10 % mal.

| Defecto | Qué hacer |
|---|---|
| El personaje sale "más mono", con la cara más clara o con ropa | Borrar la imagen y regenerarla |
| Inventa letras ("DATA CENTER", "ON", "CLICK") | Escribir en la escena "no signs and no writing" |
| Cuenta mal (9 bits en vez de 8, 4 círculos en vez de 3) | Poner las cifras entre comillas ("01000001") o dibujarlo por código |
| "Plus sign" sale como una cruz roja de hospital | Pedir "math plus symbol made of two black bars" o "red diagonal X" |
| Escenas "a pantalla completa" salen en un recuadro | Escribir "FULL-BLEED, no border"; si insiste, recortar con código |
| Brazo duplicado o señalando a la nada | Borrar y regenerar |

**Otros:**
- **La voz se come palabras cortas.** Pasó con "sin": la frase acabó diciendo lo contrario
  del guion. Ningún dato clave puede depender de un "sin" o un "no" suelto. Usa un verbo:
  "que no se habían actualizado".
- **Whisper corta las frases en trozos de 1 segundo.** Pasa si el guion tiene muchas
  comas. Escribe con pocas comas o fusiona los trozos (Claude sabe hacerlo).
- **El generador lee las escenas al arrancar.** Si corriges una escena con la generación
  en marcha, esa pasada usa la versión vieja. Hay que lanzar otra pasada.
- **Títulos que prometen de más.** No pongas "en 6 minutos" si dura 7. La gente se va y
  baja la retención.
- **Texto de miniatura ambiguo.** "NADIE LA ADIVINA" se podía leer al revés. Tiene que
  entenderse a la primera.
- **Prioriza siempre la miniatura y el tema.** Pesan más que cualquier otra cosa.

---

## 8. Checklist diaria (para mantener 1 vídeo al día)

- [ ] El vídeo de mañana está subido y programado en YouTube Studio.
- [ ] Tiene miniatura con texto (compruébalo en Studio, no solo en la carpeta).
- [ ] Sus 2 Shorts están programados después del largo.
- [ ] Hay al menos 2-3 vídeos de margen en la cola.
- [ ] El siguiente tema del backlog ya tiene guion.
- [ ] Una vez por semana: revisar CTR y retención y ajustar los temas y las miniaturas.
- [ ] Cada 6 días (si la app sigue en "Prueba"): `python scratch-yt/reauth.py`. Mejor
      publicarla en producción y olvidarse.

---

**Dónde mirar más detalle:**
- `CLAUDE.md`: todas las reglas.
- `SETUP.md`: instalación.
- `VIDEO_EXPLAINER_WORKFLOW.md`: el proceso completo.
- `CAMBIOS-2026-09-29.md`: por qué se tomó cada decisión.
