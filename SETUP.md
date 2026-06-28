# SETUP — pipeline colaborativo (2 personas, mismas cuentas)

Todo lo necesario para producir un vídeo vive en git (scripts, config, **guiones,
timings y prompts de imagen**). Lo único que no va a git son las **API keys** y los
**medios pesados** (`.mp3`, `.png`, `.mp4`). Por eso, tras clonar, solo necesitas
rellenar tu `.env` y ya trabajas igual que tu compañero.

## Filosofía: receta vs. resultado

- **Receta** (en git, ligera): `videos.json`, `scripts/`, y por vídeo
  `channel/.../<video>/{script.md, frames.json, state.json}`.
- **Resultado** (NO en git, pesado): audio e imágenes. Se **recuperan o regeneran**
  desde las cuentas compartidas de ElevenLabs / Higgsfield a partir de la receta.

Como compartís las mismas cuentas, cualquiera puede reconstruir el resultado. El
medio no se sincroniza: se reproduce.

## Primer arranque (cada persona, una vez)

```bash
# 1. Dependencias Python
pip install -r requirements.txt

# 2. Tu .env local (NO se sube a git)
cp .env.example .env          # luego edita .env y pega las 2 API keys
#    · ELEVENLABS_API_KEY  → cuenta de pago con la voz Triline
#    · HIGGSFIELD_API_KEY  → cuenta compartida (Higgsfield → Settings → API key)
#    Pasaos las keys por un canal seguro, NUNCA por chat ni commit.

# 3. Dependencias Remotion
cd remotion && npm install && cd ..
```

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
