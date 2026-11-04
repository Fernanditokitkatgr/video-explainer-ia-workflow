# Publicación en YouTube

Cómo llega un vídeo terminado a YouTube sin copiar y pegar nada, y qué corre solo en el ordenador.
Los Shorts y TikTok tienen su propia página: [shorts-y-tiktok.md](./shorts-y-tiktok.md).

## Regla de oro

**Un vídeo largo al día, nunca en tanda.** Si hay tres vídeos listos, salen en tres días distintos.
Se sube privado con `publishAt` y YouTube lo hace público él solo a su hora: no hace falta que el
ordenador esté encendido en ese momento, solo al subirlo.

## Vídeo largo: de `pending_long.txt` a YouTube

1. El vídeo está renderizado (`remotion/output/<slug>.mp4`), tiene `thumbnail_final.jpg` y `seo.md`
   completo (título con `← recomendado`, descripción, tags y `## Capítulos` con tiempos reales), y
   `python scripts/preflight.py --video <slug> --stage publish` pasa.
2. Se añade el slug, **una línea por vídeo y en orden de publicación**, a `scratch-yt/pending_long.txt`
   (local, no va a git).
3. La tarea programada **"Tecnomono YouTube 0935"** lanza `scratch-yt/daily_publish.bat` →
   `daily_publish.py`, que:
   - sube como mucho 2 largos por ejecución con `publish_from_recipe.py` (lee `seo.md`, reserva el
     siguiente día libre a las **19:00 de Madrid** en `publish_queue.py` y sube con
     `upload_youtube.py --publish-at`);
   - después sube los Shorts pendientes del método heredado (`publish_shorts.py --pending`);
   - si se agota la cuota, **para** y deja en `pending_long.txt` lo que falta para la siguiente vez.
4. Registro en `scratch-yt/daily_publish.log`.

Para probar sin subir: `python scratch-yt/daily_publish.py --dry-run` o
`python scratch-yt/publish_from_recipe.py --video <slug> --dry-run`.

## Subida manual (Shorts del motor y casos sueltos)

```bash
python scratch-yt/upload_youtube.py remotion/output/<slug>.mp4 \
  --title "…" --description "…" --tags "a,b,c" \
  --thumbnail channel/tecno/videos/<slug>/thumbnail_final.jpg \
  --category 28 --publish-at 2026-11-05T16:00:00Z
```

- `--publish-at` va en **UTC** (16:00Z = 17:00 de Madrid en invierno) y obliga a `private`.
- `--category`: 27 = Educación (lo que usa `publish_from_recipe.py` por defecto), 28 = Ciencia y
  tecnología (lo que usan los Shorts).
- Apunta el ID y la fecha en el `seo.md` del vídeo.

## Comandos de mantenimiento

```bash
python scratch-yt/publish_queue.py list                      # qué vídeo va a qué día
python scratch-yt/publish_queue.py next                      # próximo hueco libre (sin reservarlo)
python scratch-yt/sync_descriptions.py --dry-run             # llevar a YouTube los capítulos de seo.md
python scratch-yt/reauth.py                                  # renovar el login de YouTube (navegador)
```

## Tareas programadas de Windows

Comprobar con `schtasks /query /fo LIST /v | findstr /i "Tecnomono"`.

| Tarea | Qué lanza | Cuándo (según `schtasks`, 3-nov-2026) |
|---|---|---|
| Tecnomono YouTube 0935 | `scratch-yt/daily_publish.bat` | Diaria desde las 08:35, repetida cada 2 h durante 14 h |
| Tecnomono TikTok 1330 | `scratch-yt/tiktok_next.bat` | 13:30 |
| Tecnomono TikTok 2130 | `scratch-yt/tiktok_next.bat` | 21:30 |
| Tecnomono aviso gasto | `scripts/aviso_gasto.ps1` | Diaria (ventana con el gasto de imágenes) |

Los `.bat` usan `C:\Python313\python.exe` y su propia carpeta como directorio de trabajo: **no se
pueden mover ni renombrar** sin cambiar también la tarea.

## Problemas conocidos

- **El login caduca cada 7 días** mientras la app OAuth esté en modo *Testing*
  (`invalid_grant: Token has been expired or revoked`). Se renueva con `reauth.py`. Solución
  definitiva: publicar la app en producción en Google Cloud.
- **Cuota diaria de YouTube:** unas 6 subidas al día (`quotaExceeded` / `uploadLimitExceeded`).
  `daily_publish.py` para limpio y reintenta en la siguiente ejecución.
- **Un traceback no significa que la subida fallara.** `upload_youtube.py` llegó a fallar *después*
  de subir por imprimir emojis en una consola `cp1252` (ya arreglado). Comprueba en YouTube antes de
  volver a subir.
- **Subtítulos por API** (`captions.insert`) necesitan además el scope `youtube.force-ssl`.
- **El "vídeo relacionado" de un Short** no se puede fijar por API: solo a mano en YouTube Studio.
- Cada canal o colaborador necesita **su propio proyecto de Google Cloud y cliente OAuth**:
  [scratch-yt/GUIA-COLABORADOR-YOUTUBE.md](../scratch-yt/GUIA-COLABORADOR-YOUTUBE.md).
