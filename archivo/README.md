# archivo/

Cosas que ya no forman parte de la forma de trabajar, pero que **no se han borrado** porque son trabajo
hecho o contexto histórico. Se movieron aquí en la limpieza del 3-nov-2026 después de comprobar que
ningún script, `.bat`, tarea programada ni documento vigente las usaba por su ruta.

Nada de esta carpeta hace falta para producir. Si algo de aquí vuelve a usarse, sácalo a su sitio y
documéntalo.

| Ruta | Qué es | Por qué se archivó |
|---|---|---|
| `notas/CAMBIOS-2026-06-28.md` | Bitácora de la sesión que montó el pipeline colaborativo (receta frente a resultado, `.env`, orquestador) | Histórico. Lo vigente está en `docs/instalacion.md` y `docs/heredado/orquestador.md` |
| `notas/CAMBIOS-2026-09-29.md` | Plan de crecimiento de sep-2026: diagnóstico con datos, decisiones de SEO, Shorts y temas | Histórico. Sus reglas vivas están en `CLAUDE.md` ("Reglas editoriales"). Lo cita un `seo.md` antiguo por su nombre |
| `notas/SESION-CONTEXTO-ayuno.md` | Instrucciones de una sesión de jun-2026 para generar las imágenes de "Ayuno intermitente" con Higgsfield (antes `SESION-CONTEXTO.md` en la raíz) | Tarea de un solo uso del método de imágenes |
| `docs-superpowers/` | Plan y especificación (jul-2026) del agente de SEO y packaging de canal (`/video-seo`, `/channel-setup`, `youtube_channel.py`) | Ya implementado; documentos de diseño, no de uso |
| `scratch-yt/sueno_narration.txt`, `scratch-yt/sueno_timestamps.json` | Narración y tiempos sueltos del vídeo "Qué le pasa a tu cuerpo cuando duermes mal" | Restos de pruebas; nada los lee |
| `scripts/generate_remotion_tsx.py` | Primer generador de `.tsx` por vídeo | Sustituido por `scripts/make_tsx.py`; nada lo llamaba |
| `estilos-higgsfield/`, `estilos-test-silk/` | Pruebas de estilo visual (jul-ago 2026) con Higgsfield: mono, sombra hacker, pizarra, risografía… (unos 48 MB; antes en la raíz) | Pruebas del método de imágenes. No van a git (imágenes) |
| `sueltos/test_sfx.mp3` | Prueba suelta de un efecto de sonido (jul-2026; antes en la raíz) | Prueba; no va a git |

Las imágenes y audios de esta carpeta siguen fuera de git por las reglas `*.png`, `*.jpg` y `*.mp3`
del `.gitignore`: solo están en el disco de quien las generó.

`scripts-out/` **no** se ha archivado aunque sea del método antiguo: `videos.json` apunta a
`scripts-out/ayuno-intermitente.es.txt` como guion de ese vídeo.
