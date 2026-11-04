# Plantilla de vídeo con el motor

Punto de partida para un vídeo nuevo de Tecnomono con el motor de animación. Está fuera de
`channel/tecno/videos/` a propósito: así ningún script la confunde con un vídeo real.

## Cómo usarla

```bash
cp -r channel/tecno/_plantilla_motor channel/tecno/videos/<slug>
rm channel/tecno/videos/<slug>/LEEME.md
# Short: además borra shorts/ (los Shorts del motor no llevan shorts.json)
```

| Archivo | Qué hacer |
|---|---|
| `script.md` | Sustituir por el guion v3 real (notas arriba, `---`, narración debajo) |
| `plano.json` | Ejemplo comentado y válido de 4 tramos (pregunta, lista, cifra, comparativa + sello). Reescribirlo para el guion real; las claves `_nota*` se pueden borrar |
| `seo.md` | Rellenar título, descripción, tags, miniatura y fuentes. Los capítulos los escribe `motor_plano.py --capitulos` |
| `shorts/shorts.json` | Lista vacía: en un LARGO del motor se deja tal cual (evita que `daily_publish.py` intente recortarlo) |
| `entrada_videos_json.json` | Copiar la entrada que toque a `videos.json` con el slug real y borrar el archivo |

Pasos completos y comandos: [docs/checklist-produccion.md](../../../docs/checklist-produccion.md).
Referencia de escenas, personajes, iconos y SFX: sección "FORMA DE TRABAJAR ACTUAL" de
[CLAUDE.md](../../../CLAUDE.md).
