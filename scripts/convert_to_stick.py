#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Convierte las escenas de un vídeo (escritas con Sara) al estilo MONO STICK CUTRE (oct-2026).

El usuario eligió para la prueba de estilo un mono hecho "por alguien que no sabe dibujar": cabeza
redonda marrón torcida con orejas, ojos de punto, boca garabato, cuerpo de palitos. Las escenas se
siguen escribiendo con los helpers de siempre (que nombran a Sara) y este script:
- sustituye la descripción de Sara por la del mono stick,
- quita las frases del pelaje/cara melocotón y el estilo "flat cartoon",
- añade a TODAS las escenas el bloque de estilo cutre (v2 desde 28-oct-2026: más color y fondos
  sencillos; las escenas ya convertidas con el v1 se actualizan al volver a pasar el script),
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
# STYLE v1 (oct-2026): monocromo casi blanco. Se conserva para poder actualizar escenas ya convertidas.
STYLE_V1 = (" STYLE (applies to the whole image): deliberately crude amateur doodle, wobbly uneven black pen lines, "
            "flat colors filled carelessly slightly outside the lines, pure white background, very simple objects; "
            "any other character (animals, people, robots) is drawn equally crude as a simple stick figure with a "
            "simple head. No realistic or detailed rendering, no shading, no gradients.")
# STYLE v2 (28-oct-2026, dueño: "el mono es perfecto pero un poquito más de color y más currado"):
# el MISMO mono stick (no cambia), pero escenas con más colores planos alegres y fondos sencillos.
# OJO: sin dígitos ni "blank"/"empty" aquí: scene_diversity_check los tomaría como contenido/permiso
# en TODAS las escenas y el chequeo de objetos-con-texto dejaría de funcionar.
STYLE = (" STYLE (applies to the whole image): deliberately crude amateur doodle, wobbly uneven black pen lines, "
         "flat cheerful colors filled carelessly slightly outside the lines. The scene is clearly colorful:"
         " a simple flat-colored setting behind the action (a colored wall and floor indoors, or a "
         "flat blue sky and green or sandy ground outdoors) and every prop and object filled with a bright flat "
         "color (red, yellow, sky blue, green, orange, pink), using four to six cheerful colors in total; the background "
         "is slightly more detailed but still simple and childish (a window, a shelf, a plant, a cloud, a sun, a "
         "few doodled buildings), with white space left around the edges of the drawing. The stick monkey itself "
         "stays exactly as in the reference image (same brown head and ears, black stick body, unchanged). Any "
         "other character (animals, people, robots) is drawn equally crude as a simple stick figure with a simple "
         "head. Still an amateur doodle: no realistic or detailed rendering, no shading, no gradients, plain "
         "fills only, no three-dimensional look.")
FUR = re.compile(r"Her whole head and face are covered in the same dark chocolate-brown fur as her body, only the "
                 r"small muzzle is lighter tan, never a pale peach face\.\s*")


def convert(scene: str, style_base: str) -> str:
    if STYLE.strip() in scene:
        return scene
    if STYLE_V1.strip() in scene:                       # ya convertida con el estilo v1: subirla a v2
        return scene.replace(STYLE_V1, STYLE).replace(STYLE_V1.strip(), STYLE.strip())
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
