# Método heredado: imágenes generadas + Ken Burns

Así se hicieron los vídeos de Tecnomono hasta el 3-nov-2026: una imagen por frase generada con Gemini
(Vertex AI) o Higgsfield, montada con Ken Burns en un `.tsx` por vídeo (`remotion/src/*.tsx`, registrados
en `remotion/src/Root.tsx`), con música y con Shorts recortados del largo.

**No se usa para vídeos nuevos** (Google está bloqueado y el motor cuesta 0 € en imágenes). Se conserva
para mantener, re-renderizar o entender los vídeos antiguos.

| Documento | Contenido |
|---|---|
| [workflow-imagenes.md](./workflow-imagenes.md) | Guía paso a paso del método antiguo (antes `VIDEO_EXPLAINER_WORKFLOW.md`) |
| [orquestador.md](./orquestador.md) | `orchestrate.py`, `produce.bat` y el relevo entre colaboradores (antes parte de `SETUP.md`) |
| [reglas-metodo-imagenes.md](./reglas-metodo-imagenes.md) | Todas las reglas y gotchas del método de imágenes que estaban en `CLAUDE.md` |

Los scripts del método siguen en `scripts/` (ver [../scripts.md](../scripts.md)): no se han movido
porque se importan entre sí y algunos vídeos antiguos los nombran en sus `.tsx`.
