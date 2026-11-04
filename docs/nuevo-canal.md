# Guía paso a paso: montar un canal nuevo con este sistema

Para alguien que nunca ha usado el repo. No hace falta saber programar: casi todo se
hace pidiéndoselo a **Claude Code** (el asistente que se ejecuta en la terminal o en
VS Code) dentro de esta carpeta. Claude lee `CLAUDE.md` y sabe cómo funciona todo.
Tú decides el concepto y revisas; Claude ejecuta.

> Actualizada el 3-nov-2026 para el **motor de animación** (los vídeos se dibujan por código, sin
> imágenes generadas). La versión anterior de esta guía, con Gemini, está en el historial de git
> (`GUIA-NUEVO-CANAL.md`); sus errores típicos de imágenes están en
> [heredado/reglas-metodo-imagenes.md](./heredado/reglas-metodo-imagenes.md).

---

## 1. Qué es esto, en una frase

Una "fábrica" de vídeos explicativos animados para YouTube. Cada vídeo sale de una
cadena de pasos:

```
Tema → Guion → Voz (ElevenLabs v4) → Tiempos de cada palabra (Whisper)
     → plano.json (qué pasa en cada frase) → Render con el motor (Remotion)
     → Miniatura (fotograma + texto por código) → SEO → Subida programada a YouTube
```

El resultado es 1 vídeo largo al día (5-7 minutos) más Shorts propios en vertical. Todo queda
programado en YouTube para publicarse solo. Detalle del motor: [motor.md](./motor.md).

---

## 2. Antes de empezar: lo que necesitas (una sola vez)

### Cuentas (cada una con su propia clave)

| Servicio | Para qué | Coste aproximado |
|---|---|---|
| **ElevenLabs** | La voz del narrador | Plan de pago (créditos por carácter) |
| **Google Cloud (YouTube Data API)** | Subir y programar vídeos | Gratis (cuota diaria) |
| **Claude Code** | El asistente que lo ejecuta todo | Suscripción de Claude |
| **Un canal de YouTube** | Donde se publica | Gratis |

### Programas en el ordenador

- Python 3.11 o superior
- Node.js 18 o superior
- ffmpeg
- Git

Si no sabes instalarlos, ábrele Claude Code y dile: *"Instálame lo que hace falta según
docs/instalacion.md"*.

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

El estilo está **en el código del motor**, no en imágenes de referencia:

1. El protagonista y su reparto se dibujan en `remotion/src/motor/Mono.tsx` (tipos, poses, caras,
   objetos); la paleta, la fuente y el trazo, en `remotion/src/motor/base.ts`.
2. Para otro personaje, pide a Claude que añada un **tipo nuevo** en `Mono.tsx` (de forma aditiva) y
   revísalo con `python scripts/motor_plano.py --hoja` (hoja de todo el reparto moviéndose).
3. Haz un Short de prueba con un guion real antes de producir en serie.

### Paso 3.4: Hashtags, frase final y colas

- Sin música: el canal no la usa (decisión de la audiencia); cada escena trae sus efectos.
- En `scratch-yt/publish_shorts.py`, cambia `BASE_HASHTAGS` y la frase "Suscríbete
  para…" por las de tu canal.
- Vacía las colas del canal anterior:
  - `scratch-yt/publish_queue.json`: pon la cola vacía.
  - `scratch-yt/shorts_queue.json`.
  - `scratch-yt/pending_long.txt`.
  - `videos.json`: deja solo tus vídeos.
  - Las carpetas de `channel/tecno/videos/`.

---

## 4. Producir un vídeo, paso a paso

Para cada vídeo basta con decirle a Claude: *"Produce el siguiente vídeo del backlog
con el motor, siguiendo CLAUDE.md"*. La lista completa con comandos está en
[checklist-produccion.md](./checklist-produccion.md); esto es lo que revisas tú:

| # | Paso | Qué revisas tú |
|---|---|---|
| 1 | **Guion** (`script.md`, 5.000-5.600 caracteres ≈ 5-6 min) | Gancho en los primeros 15 s, lista clara, sin datos inventados |
| 2 | **Voz** con ElevenLabs v4 | Escucha el principio y las frases con cifras o negaciones |
| 3 | **Plano** (`plano.json`) y fotogramas de revisión | Que pase algo nuevo cada 2-3 s y nada se solape |
| 4 | **Render** con el motor | Mira 2-3 momentos del MP4 |
| 5 | **Miniatura**: fotograma del vídeo + texto por código | Que se lea en medio segundo |
| 6 | **SEO** (`seo.md`): título, descripción, etiquetas, capítulos | Ver sección 6 |
| 7 | **Gate** (`preflight.py`) y cola (`pending_long.txt`) | 0 fallos; fecha y hora en YouTube Studio |

---

## 5. Shorts, miniaturas y programación

- **Shorts:** vídeos propios en 9:16 hechos con el motor (no recortes del largo), de menos de 60 s,
  con la primera frase igual al título. Ver [shorts-y-tiktok.md](./shorts-y-tiktok.md).
- **Miniaturas:** un fotograma del propio vídeo (`motor_plano.py <slug> --still <s>`) y el texto encima
  por código (`thumbnail_text.py`): 2-4 palabras, una en amarillo. Se configura en `seo.md` → `## Miniatura`.
- **Calendario:** un vídeo largo al día a las 19:00 (hora de Madrid), gestionado por
  `publish_queue.py` y la tarea diaria `daily_publish.py`. Ver [publicacion.md](./publicacion.md).
- **Cuota de YouTube:** 10.000 unidades al día, unas **6 subidas**. Lo que no quepa se sube en la
  siguiente ejecución.

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
| Shorts | ✅ | Shorts propios con el motor, pregunta de curiosidad en la primera frase |
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

**Del motor:** solapes de texto y personajes, o un tramo que se queda quieto. Revisa siempre los
fotogramas (`--stills`) y el ritmo que imprime `motor_plano.py`.

**Otros:**
- **La voz se come palabras cortas.** Pasó con "sin": la frase acabó diciendo lo contrario
  del guion. Ningún dato clave puede depender de un "sin" o un "no" suelto. Usa un verbo:
  "que no se habían actualizado".
- **Un ancla del plano que no está en la voz** (`no encuentro «…»`): la palabra se dijo distinta o
  whisper la oyó de otra forma. Mira `words.json` y usa la palabra tal cual aparece ahí.
- **Títulos que prometen de más.** No pongas "en 6 minutos" si dura 7. La gente se va y
  baja la retención.
- **Texto de miniatura ambiguo.** "NADIE LA ADIVINA" se podía leer al revés. Tiene que
  entenderse a la primera.
- **Prioriza siempre la miniatura y el tema.** Pesan más que cualquier otra cosa.

---

## 8. Checklist diaria (para mantener 1 vídeo al día)

- [ ] El vídeo de mañana está subido y programado en YouTube Studio.
- [ ] Tiene miniatura con texto (compruébalo en Studio, no solo en la carpeta).
- [ ] Los Shorts del día están programados.
- [ ] Hay al menos 2-3 vídeos de margen en la cola.
- [ ] El siguiente tema del backlog ya tiene guion.
- [ ] Una vez por semana: revisar CTR y retención y ajustar los temas y las miniaturas.
- [ ] Cada 6 días (si la app sigue en "Prueba"): `python scratch-yt/reauth.py`. Mejor
      publicarla en producción y olvidarse.

---

**Dónde mirar más detalle:**
- [CLAUDE.md](../CLAUDE.md): todas las reglas.
- [instalacion.md](./instalacion.md): instalación.
- [checklist-produccion.md](./checklist-produccion.md): el proceso completo.
- [archivo/notas/CAMBIOS-2026-09-29.md](../archivo/notas/CAMBIOS-2026-09-29.md): por qué se tomó cada decisión del plan de crecimiento.
