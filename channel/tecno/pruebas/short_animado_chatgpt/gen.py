#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prueba de concepto (nov-2026): imágenes de partida (lite) + clips animados (Veo, imagen a vídeo).

Uso (desde la raíz del repo):
    python channel/tecno/pruebas/short_animado_chatgpt/gen.py imagenes [c1 c2 ...]
    python channel/tecno/pruebas/short_animado_chatgpt/gen.py videos c1 [c2 ...] [--lite] [--sufijo _x]
    python channel/tecno/pruebas/short_animado_chatgpt/gen.py gasto

Todo pasa por scripts/gasto.py: comprueba el tope global de 250 € antes de cada llamada y apunta
cada imagen y cada clip (por segundos) en gasto_imagenes.jsonl. Además se para si ESTA prueba
supera su propio tope (TOPE_PRUEBA_EUR). Salta lo que ya existe (nunca paga dos veces lo mismo).
"""
import argparse
import json
import sys
import time
from pathlib import Path

REPO = Path(__file__).resolve().parents[4]
sys.path.insert(0, str(REPO / "scripts"))
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

import config  # noqa: E402
import gasto  # noqa: E402
from convert_to_stick import STICK  # noqa: E402
from google import genai  # noqa: E402
from google.genai import types  # noqa: E402

OUT = REPO / "remotion" / "public" / "pruebas-chatgpt"
TOPE_PRUEBA_EUR = 15.0
MARCA = "chatgpt_short_"  # prefijo de archivo en el registro: así se suma solo lo de esta prueba
VEO_FAST = "veo-3.1-fast-generate-001"
VEO_LITE = "veo-3.1-lite-generate-001"

LAYOUT = (" LAYOUT: tall vertical portrait picture. The monkey and its props are drawn in the lower-middle "
          "part of the picture, fairly big; the whole upper half of the picture is plain white paper with "
          "nothing drawn on it.")
ESTILO = (" STYLE: deliberately crude amateur doodle, wobbly uneven black pen lines, flat cheerful colors (red, "
          "yellow, sky blue, green, orange, pink) filled carelessly slightly outside the lines, pure white "
          "background, no floor, no walls, no scenery. Absolutely no text, no letters, no numbers, no symbols "
          "written anywhere. No realistic rendering, no shading, no gradients, flat two-dimensional drawing. "
          "The stick monkey stays exactly as in the reference image.")
VEO_ESTILO = (" Keep the exact same crude hand-drawn doodle style of the image: flat 2D cartoon animation, black "
              "wobbly pen lines, flat colors, pure white background that stays white. Static camera, no zoom, no "
              "camera movement. Do not add any new characters, objects, text or letters. The monkey keeps its "
              "round brown head, two round ears, dot eyes and thin black stick body.")

# Una escena por golpe del guion: imagen de partida + movimiento para Veo + segundos de clip.
ESCENAS = {
    "c1": dict(seg=6, img="The stick monkey stands in front of a huge white rounded speech bubble outline (empty "
               "inside), scratching its head with one hand, puzzled, looking at the bubble.",
               mov="The monkey scratches its head, thinks, then suddenly raises one finger with an excited 'aha' "
               "face and points up at the empty speech bubble, bouncing on its toes."),
    "c2": dict(seg=4, img="The stick monkey holds a giant pair of red scissors and is cutting a long yellow paper "
               "strip into small pieces; a few cut yellow paper pieces lie on the ground.",
               mov="The monkey snips the yellow paper strip quickly with the red scissors, snip snip snip, and "
               "small pieces of paper fall and bounce on the ground."),
    "c3": dict(seg=6, img="The stick monkey holds a long thin wooden pointer stick and points up and to the right, "
               "with a concentrated face, standing on the left side.",
               mov="The monkey taps the air upwards with the pointer stick several times, nodding seriously, then "
               "turns its head to the viewer and nods."),
    "c4": dict(seg=4, img="The stick monkey sits on a little red stool typing on an old sky-blue typewriter with a "
               "white sheet of paper sticking out of it.",
               mov="The monkey types extremely fast on the typewriter with both stick hands, its head bobbing, "
               "the typewriter carriage sliding and dinging."),
    "c5": dict(seg=6, img="The stick monkey sits on top of a tall wobbly pile of colorful books (red, blue, green, "
               "yellow covers), reading an open book held close to its face.",
               mov="The monkey flips the pages of the book super fast, tosses the book over its shoulder, grabs "
               "another book from the pile and keeps reading; the pile wobbles."),
    "c6": dict(seg=8, img="The stick monkey stands in front of a big orange control panel full of small round "
               "black knobs and little sliders, reaching up to turn one knob.",
               mov="The monkey frantically turns knob after knob on the control panel, moving its stick arms "
               "faster and faster, the little sliders jiggling up and down."),
    "c7": dict(seg=4, img="Three simple stick-figure people on the right each hold up a white blank score card; the "
               "stick monkey on the left bows politely towards them.",
               mov="The three stick people raise and wave their blank cards one after another, the monkey bows "
               "deeply twice and smiles."),
    "c8": dict(seg=8, img="The stick monkey sits on a big grey rock in a thinker pose, one stick hand under its "
               "chin, eyes looking up; an unlit yellow light bulb floats above its head.",
               mov="The monkey strokes its chin slowly thinking, then the light bulb above its head lights up "
               "bright yellow and the monkey jumps up happily with both arms raised."),
    "c9": dict(seg=8, img="The stick monkey stands proudly with its chest out next to a blank white easel board, "
               "holding a pointer, eyes half closed with a very confident smug face.",
               mov="The monkey taps the blank easel board with the pointer and lectures with big confident "
               "gestures, nodding proudly, completely sure of itself."),
    "c10": dict(seg=6, img="The stick monkey faces the viewer, cheerful, giving a thumbs up with one stick hand.",
                mov="The monkey winks at the viewer, gives a big thumbs up, and does a small happy bounce."),
}


def gastado_prueba() -> float:
    if not gasto.LEDGER.exists():
        return 0.0
    filas = [json.loads(l) for l in gasto.LEDGER.read_text(encoding="utf-8").splitlines() if l.strip()]
    return sum(r["eur"] for r in filas if r.get("archivo", "").startswith(MARCA))


def tope_prueba(siguiente: float) -> None:
    g = gastado_prueba()
    if g + siguiente > TOPE_PRUEBA_EUR:
        sys.exit(f"⛔ Tope de la prueba: llevamos {g:.2f} € y lo siguiente cuesta {siguiente:.2f} € "
                 f"(tope {TOPE_PRUEBA_EUR:.0f} €). No se gasta más.")


def imagenes(claves: list[str]) -> None:
    from generate_images_gemini import generate_frame, load_reference_parts
    ref = load_reference_parts("channel/tecno/references/mono_stick_cutre.png")["mono"]
    client = genai.Client(vertexai=True, project=config.GEMINI_VERTEX_PROJECT, location="global")
    for k in claves:
        out = OUT / f"{MARCA}{k}.png"
        if out.exists():
            print(f"  SKIP {out.name}")
            continue
        tope_prueba(gasto.PRECIO_EUR["lite"])
        prompt = f"{STICK} SCENE: {ESCENAS[k]['img']}{LAYOUT}{ESTILO}"
        generate_frame(client, "gemini-3.1-flash-lite-image", prompt, out, ref_part=ref, aspect_ratio="9:16")


def videos(claves: list[str], lite: bool, sufijo: str) -> None:
    model = VEO_LITE if lite else VEO_FAST
    client = genai.Client(vertexai=True, project=config.GEMINI_VERTEX_PROJECT, location="us-central1")
    for k in claves:
        esc = ESCENAS[k]
        src = OUT / f"{MARCA}{k}.png"
        out = OUT / "clips" / f"{MARCA}{k}{sufijo}.mp4"
        if out.exists():
            print(f"  SKIP {out.name}")
            continue
        if not src.exists():
            sys.exit(f"Falta la imagen de partida {src.name}: genera antes las imágenes.")
        seg = esc["seg"]
        coste = gasto.PRECIO_VEO_EUR_S[gasto._tipo_veo(model)] * seg
        tope_prueba(coste)
        gasto.comprobar_video(model, seg)
        print(f"→ {k}: {model}, {seg} s, ~{coste:.2f} €")
        op = client.models.generate_videos(
            model=model,
            prompt=esc["mov"] + VEO_ESTILO,
            image=types.Image(image_bytes=src.read_bytes(), mime_type="image/png"),
            config=types.GenerateVideosConfig(
                aspect_ratio="9:16", resolution="1080p", duration_seconds=seg, number_of_videos=1,
                generate_audio=False, enhance_prompt=False,
                negative_prompt="text, letters, words, numbers, realistic, 3d render, shading, gradient, "
                                "camera movement, zoom, extra characters, color background"),
        )
        t0 = time.time()
        while not op.done:
            time.sleep(10)
            op = client.operations.get(op)
            if time.time() - t0 > 900:
                sys.exit(f"  {k}: más de 15 min esperando; se para (revisar en la consola).")
        if op.error:
            print(f"  ERROR {k}: {op.error}")
            continue
        res = op.response or op.result
        vids = getattr(res, "generated_videos", None) or []
        if not vids:
            filtrados = getattr(res, "rai_media_filtered_reasons", None)
            print(f"  ERROR {k}: sin vídeo (filtrado: {filtrados})")
            continue
        data = vids[0].video.video_bytes
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_bytes(data)
        gasto.apuntar_video(model, out.name, seg)
        print(f"  OK {out.name} ({len(data) // 1024} KB, {time.time() - t0:.0f} s)")


def main() -> None:
    ap = argparse.ArgumentParser(description="Imágenes y clips de Veo de la prueba del Short animado")
    ap.add_argument("accion", choices=["imagenes", "videos", "gasto"])
    ap.add_argument("claves", nargs="*", help="escenas (c1…c10); vacío = todas")
    ap.add_argument("--lite", action="store_true", help="Veo 3.1 Lite en vez de Fast")
    ap.add_argument("--sufijo", default="", help="sufijo del clip (para comparar modelos)")
    a = ap.parse_args()
    claves = a.claves or list(ESCENAS)
    if a.accion == "imagenes":
        imagenes(claves)
    elif a.accion == "videos":
        videos(claves, a.lite, a.sufijo)
    print(f"Gasto de esta prueba: {gastado_prueba():.2f} € · {gasto.resumen()}")


if __name__ == "__main__":
    main()
