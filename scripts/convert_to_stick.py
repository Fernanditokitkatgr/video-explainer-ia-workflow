#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convierte las escenas de un vídeo (escritas con Sara) al estilo MONO STICK CUTRE (oct-2026).

El usuario eligió para la prueba de estilo un mono hecho "por alguien que no sabe dibujar": cabeza
redonda marrón torcida con orejas, ojos de punto, boca garabato, cuerpo de palitos. Las escenas se
siguen escribiendo con los helpers de siempre (que nombran a Sara) y este script:
- sustituye la descripción de Sara por la del mono stick,
- quita las frases del pelaje/cara melocotón y el estilo "flat cartoon",
- añade a TODAS las escenas el bloque de estilo cutre,
- guarda una copia de seguridad `frames_sara.json`,
- marca en videos.json `ref_image` (la hoja de personaje) y `estilo: stick_cutre`.

Uso:
    python scripts/convert_to_stick.py <slug>
"""
import json
import re
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
REF = "channel/tecno/references/mono_stick_cutre.png"
STICK = ("The main character is a stick-figure monkey drawn deliberately crude like a funny doodle by someone "
         "who cannot draw: a lopsided round flat medium-brown head with two round brown ears, two black dot eyes "
         "and a simple squiggle mouth, on a thin single black line stick body with stick arms and stick legs, "
         "nothing worn, exactly like the reference image.")
STYLE = (" STYLE (applies to the whole image): deliberately crude amateur doodle, wobbly uneven black pen lines, "
         "flat colors filled carelessly slightly outside the lines, pure white background, very simple objects; "
         "any other character (animals, people, robots) is drawn equally crude as a simple stick figure with a "
         "simple head. No realistic or detailed rendering, no shading, no gradients.")
FUR = re.compile(r"Her whole head and face are covered in the same dark chocolate-brown fur as her body, only the "
                 r"small muzzle is lighter tan, never a pale peach face\.\s*")


def convert(scene: str, style_base: str) -> str:
    if STYLE.strip() in scene:
        return scene
    if style_base and style_base in scene:
        scene = scene.replace(style_base, STICK)
    scene = FUR.sub("", scene)
    scene = re.sub(r"Sara, a friendly cartoon monkey mascot[^.]*\.", STICK, scene)
    scene = re.sub(r"flat cartoon illustration style, thick black ink outlines, simple flat colors, no gradients, "
                   r"no 3D shading,? ?", "", scene)
    scene = scene.replace("no monkey, no Sara,", "no monkey,")
    scene = scene.replace("Sara's", "the stick monkey's").replace("Sara", "the stick monkey")
    scene = scene.replace("Flat solid colors with thick black ink outlines on pure white, no gradients, no 3D "
                          "shading, no drop shadows.", "")
    return scene + STYLE


def main() -> None:
    slug = sys.argv[1]
    vids = json.loads((REPO / "videos.json").read_text(encoding="utf-8"))
    p = REPO / vids[slug]["manifest_dir"] / "frames.json"
    d = json.loads(p.read_text(encoding="utf-8"))
    backup = p.with_name("frames_sara.json")
    if not backup.exists():
        backup.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
    sb = d.get("style_base", "")
    for f in d["frames"]:
        f["scene"] = convert(f["scene"], sb)
    d["style_base"] = ""
    d["estilo"] = "stick_cutre"
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2), encoding="utf-8")
    vids[slug]["ref_image"] = REF
    vids[slug]["estilo"] = "stick_cutre"
    (REPO / "videos.json").write_text(json.dumps(vids, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"{slug}: {len(d['frames'])} escenas pasadas a mono stick cutre (copia en {backup.name})")


if __name__ == "__main__":
    main()
