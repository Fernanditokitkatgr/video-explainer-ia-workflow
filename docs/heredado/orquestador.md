# Orquestador y relevo entre colaboradores (HEREDADO)

> **HEREDADO desde el 3-nov-2026.** `scripts/orchestrate.py` encadena el método antiguo de imágenes
> (voz → whisper → inyectar FRAMES → imágenes → validar → render). Los vídeos del motor NO lo usan:
> se hacen con `scripts/motor_plano.py` (ver [docs/motor.md](../motor.md)). Este texto salió de
> `SETUP.md` en la limpieza del 3-nov-2026; la instalación vigente está en
> [docs/instalacion.md](../instalacion.md).

## Filosofía: receta vs. resultado

- **Receta** (en git, ligera): `videos.json`, `scripts/`, y por vídeo
  `channel/.../<video>/{script.md, frames.json, state.json}`.
- **Resultado** (NO en git, pesado): audio e imágenes. Se **recuperan o regeneran**
  desde las cuentas compartidas de ElevenLabs / Higgsfield a partir de la receta.

Como compartís las mismas cuentas, cualquiera puede reconstruir el resultado. El
medio no se sincroniza: se reproduce.

## El orquestador

Encadena el pipeline y guarda el progreso en `<video>/state.json` (que SÍ va a git).

```bash
# ¿Dónde se quedó un vídeo? (clave para el relevo entre los dos)
python scripts/orchestrate.py --video sueno-stick --status

# Pipeline completo (con pausas de revisión humana entre pasos):
python scripts/orchestrate.py --video sueno-stick

# Solo algunos pasos:
python scripts/orchestrate.py --video sueno-stick --steps voice,whisper,inject

# Sin pausas (CI / cuando sabes lo que haces):
python scripts/orchestrate.py --video sueno-stick --yes
```

Pasos: `voice → whisper → inject → images → validate → render`

| Paso | Qué hace | HITL |
|---|---|---|
| `voice` | ElevenLabs genera `remotion/public/<audio>.mp3` | 🛑 escucha el audio |
| `whisper` | Timestamps → fusiona timing + escenas en `frames.json` | |
| `inject` | Mete el array `FRAMES` en el `.tsx` (entre marcadores) | |
| `images` | Higgsfield genera 1 imagen por frame (reanudable) | 🛑 verifica que están todas |
| `validate` | Comprueba que existen audio + TODAS las imágenes | 🛑 revisa sincronía en el studio |
| `render` | `npx remotion render` → `remotion/output/<video>.mp4` | |

## Flujo de relevo (lo dejo a medias, sigue el otro)

1. Trabajas hasta donde llegues; el `state.json` se actualiza solo.
2. `git add -A && git commit && git push` (sube receta + estado, NO medios).
3. Tu compañero hace `git pull`, lanza `--status`, ve qué falta y continúa.
   Como las cuentas son las mismas, regenera/recupera el medio que le falte.

## Scripts sueltos

```bash
python scripts/generate_voice.py   --video <v>          # solo voz
python scripts/whisper_timestamps.py audio.mp3 --format frames --output f.json
python scripts/generate_images.py  --video <v> --start 10   # reanudar imágenes
python scripts/validate_assets.py  --all                # validar todo
```

## Añadir un vídeo nuevo

1. Entrada en `videos.json` (composición, naming, playback, rutas).
2. `channel/<canal>/videos/<video>/script.md` con el guion (1 frase por línea).
3. `.tsx` en `remotion/src/` con los marcadores `// === FRAMES:START/END ===` y
   registrado en `Root.tsx`.
4. `frames.json` con los prompts de escena (campo `scene`) por imagen.
5. `python scripts/orchestrate.py --video <video>`.

## Producción en una ventana aparte: `produce.bat` + `scripts/produce.py`

`produce.bat <slug> [<slug> …]` (en la raíz) abre una ventana de `cmd` que lanza
`scripts/produce.py --videos …`, un supervisor que encadena las etapas del método de imágenes para
uno o varios vídeos y sobrevive aunque se cierre la sesión del asistente. Cada etapa hecha se salta,
así que se puede relanzar sin gastar de más. Progreso en `channel/…/<slug>/.produce.log`.
Se deja en la raíz porque el `.bat` usa su propia carpeta (`%~dp0`) como raíz del repo.
