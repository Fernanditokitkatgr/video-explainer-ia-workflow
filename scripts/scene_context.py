#!/usr/bin/env python3
"""MEMORIA VISUAL dentro de un mismo video.

Problema que resuelve (ago-2026): cada prompt de escena se escribia de forma
totalmente independiente, sin saber que composiciones ya se habian usado antes
en el MISMO video. Resultado: "dos monitos uno al lado del otro" repetido
decenas de veces, rachas del mismo plano, y sensacion de video repetitivo
aunque el estilo fuera coherente.

Este modulo da el CONTEXTO que faltaba. Se usa mientras se escriben las escenas
(no despues), para decidir la composicion de la escena N sabiendo lo que ya se
gasto en 1..N-1.

Uso como libreria (al escribir las escenas de un video nuevo):

    from scene_context import SceneContext
    ctx = SceneContext()                      # lee la Style Bible del canal
    for texto_de_whisper in segmentos:
        sugerencia = ctx.suggest()            # que composiciones tocan / cuales evitar
        prompt = escribir_escena(texto_de_whisper, sugerencia)
        ctx.record(prompt)                    # apunta lo usado
    print(ctx.summary())

Uso como CLI (auditar un video ya escrito, escena a escena):

    python scripts/scene_context.py --video hacker-espana-vs-eeuu
"""
import argparse
import json
import sys
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent

# Se reutiliza la MISMA clasificacion que el gate, para que "lo que sugiero al
# escribir" y "lo que se valida antes de generar" hablen exactamente el mismo idioma.
from scene_diversity_check import classify_composition  # noqa: E402

DEFAULT_BIBLE = REPO_ROOT / "channel" / "tecno" / "style-bible.json"

# Tipos de plano que son caros de repetir (se agotan rapido y cansan al espectador).
SCARCE = {"two_characters": 0.10, "split_screen": 0.02, "extreme_close_up": 0.20}


class SceneContext:
    """Lleva la cuenta de las composiciones ya usadas en el video en curso."""

    def __init__(self, bible_path: Path = DEFAULT_BIBLE, total_scenes: int | None = None):
        self.bible = json.loads(bible_path.read_text(encoding="utf-8")) if bible_path.exists() else {}
        self.framings = (
            self.bible.get("reglas_de_composicion", {}).get("framing_variety", [])
        )
        self.total_scenes = total_scenes
        self.used: list[str] = []

    # --- registro ---------------------------------------------------------
    def record(self, scene_prompt: str) -> str:
        label = classify_composition(scene_prompt)
        self.used.append(label)
        return label

    # --- consulta ---------------------------------------------------------
    @property
    def last(self) -> str | None:
        return self.used[-1] if self.used else None

    @property
    def histogram(self) -> Counter:
        return Counter(self.used)

    def run_length(self) -> int:
        """Cuantas escenas seguidas llevan el mismo tipo de plano al final."""
        if not self.used:
            return 0
        n, last = 0, self.used[-1]
        for lbl in reversed(self.used):
            if lbl != last:
                break
            n += 1
        return n

    def overused(self) -> list[str]:
        """Tipos de plano que ya han superado su cupo (escasos o >20% del total)."""
        n = len(self.used)
        if n == 0:
            return []
        denom = self.total_scenes or n
        out = []
        for label, count in self.histogram.items():
            cap = SCARCE.get(label, 0.20)
            if count / denom > cap:
                out.append(label)
        return out

    def suggest(self, n: int = 3) -> dict:
        """Que composiciones tocan ahora y cuales hay que evitar.

        - evita SIEMPRE repetir el plano de la escena anterior (regla_no_repetir_consecutivo)
        - evita los que ya se han pasado de cupo
        - prioriza los tipos de plano menos usados hasta ahora
        """
        hist = self.histogram
        avoid = set(self.overused())
        if self.last:
            avoid.add(self.last)

        candidates = [f for f in self.framings if classify_composition(f) not in avoid]
        candidates.sort(key=lambda f: hist.get(classify_composition(f), 0))

        return {
            "escena_num": len(self.used) + 1,
            "plano_anterior": self.last,
            "racha_actual": self.run_length(),
            "evitar": sorted(avoid),
            "sugerencias": candidates[:n],
            "recordatorio": (
                self.bible.get("reglas_de_composicion", {}).get("regla_anti_gemelos", "")[:160]
                if "two_characters" in avoid else ""
            ),
        }

    def summary(self) -> str:
        n = len(self.used)
        if not n:
            return "Sin escenas registradas."
        lines = [f"Escenas registradas: {n}", "Distribucion:"]
        for label, count in self.histogram.most_common():
            lines.append(f"  {label:20s} {count:4d}  ({round(100*count/n, 1)}%)")
        over = self.overused()
        if over:
            lines.append(f"Pasados de cupo: {', '.join(over)}")
        return "\n".join(lines)


def audit_video(video: str) -> None:
    """Recorre un frames.json ya escrito y muestra, escena a escena, que habria
    sugerido la memoria visual — util para ver DONDE se empezo a repetir."""
    frames_path = REPO_ROOT / "channel" / "tecno" / "videos" / video / "frames.json"
    if not frames_path.exists():
        sys.exit(f"No existe {frames_path}")
    frames = json.loads(frames_path.read_text(encoding="utf-8"))["frames"]

    ctx = SceneContext(total_scenes=len(frames))
    repetidas = []
    for i, fr in enumerate(frames):
        sug = ctx.suggest()
        label = ctx.record(fr["scene"])
        if sug["plano_anterior"] == label:
            repetidas.append((i, fr["file"], label))

    print(f"=== memoria visual: {video} ===\n")
    print(ctx.summary())
    if repetidas:
        print(f"\n{len(repetidas)} escenas repiten el plano de la anterior:")
        for i, f, lbl in repetidas[:20]:
            print(f"  [{i}] {f}: {lbl}")
    else:
        print("\nNinguna escena repite el plano de la anterior.")


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--video", required=True)
    args = p.parse_args()
    audit_video(args.video)


if __name__ == "__main__":
    main()
