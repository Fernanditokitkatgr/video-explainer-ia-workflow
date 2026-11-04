# Checklist de producción (motor de animación)

Un vídeo de principio a fin. `<slug>` es el nombre de la carpeta del vídeo (minúsculas y guiones).
Los Shorts siguen la misma lista con las diferencias marcadas como **Short**.

## Preparar

- [ ] **Tema** del `channel/tecno/topic_backlog.md` (curiosidad masiva o España, formato "Cada X / Todos los X").
      Antes de titular, busca qué vídeos existen ya sobre el tema.
- [ ] **Carpeta** desde la plantilla: `cp -r channel/tecno/_plantilla_motor channel/tecno/videos/<slug>`
      (y lee su `LEEME.md`). **Short:** slug `short-<tema>` y sin carpeta `shorts/`.
- [ ] **Entrada en `videos.json`** con `"estilo": "motor"` (copia la de `entrada_videos_json.json`).
- [ ] **Guion v3** en `script.md`: gancho con escena, lista anunciada, "Número X." plano, 5.000-5.600
      caracteres, 8-10 etiquetas v4, cifras con letras, negaciones con verbo, datos con fuente en `seo.md`.
      **Short:** ~190 palabras y la primera frase es el título.

## Voz y plano

- [ ] `python scripts/generate_voice.py --video <slug> --model eleven_v4` → `remotion/public/<audio_static>`. Escúchala.
- [ ] Primer borrador de `plano.json` (basta con el reparto y un tramo) y `python scripts/motor_plano.py <slug>`:
      crea `words.json` con los tiempos de cada palabra.
- [ ] `python scripts/motor_plano.py <slug> --negaciones`: ¿se comió la voz algún no/sin/nunca? Si sí, cambia la frase y regenera la voz.
- [ ] Plano completo: un tramo por frase o idea, **algo nuevo cada 2-3 s**, el mono siempre en movimiento,
      personajes que se turnan, sin subtítulos (el texto va en los gráficos).
- [ ] `python scripts/motor_plano.py <slug>` sin errores y con el ritmo bien (hueco máximo ≤ 3 s idealmente).
- [ ] `python scripts/motor_plano.py <slug> --stills 3,10,25 --dir <carpeta>` y revisar: solapes, textos cortados, personajes tapados.

## Render y empaquetado

- [ ] `python scripts/motor_plano.py <slug> --render` → `remotion/output/<slug>.mp4` (unos 10 min por 5 min de vídeo).
      **Un solo render por slug a la vez** y nunca con `&` desde la herramienta Bash.
- [ ] Mira 2-3 momentos del MP4 y escucha el principio.
- [ ] **Miniatura:** `python scripts/motor_plano.py <slug> --still <s> --out channel/tecno/videos/<slug>/thumbnail.png`,
      luego `ffmpeg -i …/thumbnail.png …/thumbnail.jpg` y `python scripts/thumbnail_text.py --video <slug>`
      (lee `## Miniatura` de `seo.md`) → `thumbnail_final.jpg`. 2-4 palabras que completen el título sin dar la respuesta.
- [ ] `python scripts/motor_plano.py <slug> --capitulos` → `## Capítulos` de `seo.md` con tiempos reales.
- [ ] `seo.md` completo: título ≤60 caracteres con `← recomendado`, descripción, 15-20 tags, fuentes.
- [ ] Largo: `shorts/shorts.json` con `"shorts": []`.
- [ ] `python scripts/preflight.py --video <slug> --stage publish` en verde.

## Publicar

- [ ] **Largo:** añadir `<slug>` como última línea de `scratch-yt/pending_long.txt`. La tarea "Tecnomono YouTube 0935"
      lo sube a su día (19:00 de Madrid). **Un vídeo al día, nunca en tanda.**
- [ ] **Short:** `python scratch-yt/upload_youtube.py remotion/output/<slug>.mp4 --title … --description … --tags … --thumbnail … --category 28 --publish-at <UTC>`.
- [ ] Apuntar fecha e ID en `seo.md` y comprobarlo en YouTube Studio (miniatura incluida).
- [ ] Decirle al dueño el gasto: `python scripts/gasto.py`.

## Mantener el canal

- [ ] 2-3 vídeos de margen en la cola (`python scratch-yt/publish_queue.py list`).
- [ ] Login de YouTube al día: `python scratch-yt/reauth.py` si sale `invalid_grant` (caduca cada 7 días en modo Testing).
- [ ] Cada 2-3 semanas: `python scripts/competitor_scan.py` y ajustar temas y títulos.
