# Gasto y costes

## Cuánto cuesta un vídeo hoy (motor de animación)

| Recurso | Coste |
|---|---|
| Imágenes (Google / Higgsfield) | **0 €**: el motor no genera ninguna imagen |
| Voz (ElevenLabs, `eleven_v4`) | Lo único que se paga: créditos por carácter (un largo son unos 5.000-5.600 caracteres de narración) |
| Remotion, ffmpeg, whisper | 0 € (código abierto, en local) |
| YouTube Data API | 0 € (cuota diaria gratuita) |

## El tope duro de 250 € (NO negociable)

Una cuenta anterior agotó el crédito gratuito sin que nadie lo viera y Google cobró unos 100 € en la
tarjeta. Desde oct-2026:

- `scripts/gasto.py` apunta cada imagen generada en `gasto_imagenes.jsonl` (raíz del repo, va a git) con
  su precio estimado. Antes de cada imagen comprueba el total: **a 250 € el generador se para solo**.
- El tope **solo se sube si el dueño lo pide por escrito.**
- **Hay que decirle al dueño el gasto en cada conversación:** `python scripts/gasto.py`.
- Aviso diario: la tarea **"Tecnomono aviso gasto"** ejecuta `scripts/aviso_gasto.ps1`, que enseña una
  ventana con el resumen y lo apunta en `gasto_avisos.log` (local).
- Además hay un presupuesto en Google Cloud con avisos por correo (50/80/90/100 %).
- La cifra real está en console.cloud.google.com → Facturación → Créditos; `gasto.py` es una estimación.
- Nada de pruebas de estilo ni regeneraciones masivas de imágenes sin preguntar antes y decir cuánto costará.

Estado el 3-nov-2026: 35,75 € estimados de 250 €; 0 € desde que se usa el motor.

## Referencia del método heredado

Con imágenes, un vídeo costaba unos 7-8 € (Gemini Flash ~0,04 €/imagen, Pro ~0,13 €/imagen). Tabla
completa, motores y gotchas de Vertex AI en
[heredado/reglas-metodo-imagenes.md](./heredado/reglas-metodo-imagenes.md) (sección "Cost / capacity reference").
