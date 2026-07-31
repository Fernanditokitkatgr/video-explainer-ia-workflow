#!/usr/bin/env python3
"""Prepara y aplica la CAPA 2 del control de calidad: la revisión visual que un
script no puede hacer (¿la imagen pega con SU frase? ¿el texto está en español
correcto? ¿el personaje lleva el color que le toca?).

El reparto en lotes y el borrado de las imágenes rechazadas es determinista y vive
aquí; el juicio visual lo hacen agentes con visión, que es lo único que sabe mirar
un dibujo. Nació porque `preflight.py` daba PASS a una tanda en la que 3 de cada 6
imágenes eran inservibles: una ilustraba dinero en vez del capítulo 2, otra
rotulaba "AI" en inglés y otra escribía "RESPESTA" y citaba la marca equivocada.

Uso:
    # 1. Genera los lotes para repartir entre agentes revisores
    python scripts/qc_visual_prep.py --video hackear-la-ia --lotes 8

    # 2. (los agentes revisan y se recoge su veredicto en un JSON)

    # 3. Borra las rechazadas para que generate_images las vuelva a hacer
    python scripts/qc_visual_prep.py --video hackear-la-ia --aplicar veredicto.json
"""
import argparse
import json
import sys
from pathlib import Path

import config

CHECKS = """Para CADA imagen, ábrela de verdad y compárala con su frase. Marca FALLO si:
1. TEMA: la imagen no ilustra lo que dice la frase, o va de otra cosa (el generador
   tiende a rellenar escenas abstractas con gráficos de negocio, dinero o flechas
   de crecimiento que nadie pidió).
2. IDIOMA: hay texto en inglés. En español es 'IA', nunca 'AI'.
3. ORTOGRAFÍA: alguna palabra española está mal escrita.
4. INVENTADO: aparecen marcas, nombres o etiquetas que no se pidieron, o que
   contradicen lo que narra la frase.
5. FONDO: el fondo es oscuro sin que la escena sea de noche / policía / sala a oscuras.
6. PERSONAJES: el hacker bueno debe ir de sudadera AZUL con capucha ABAJO y placa;
   el malo de NEGRO con capucha ARRIBA y sin placa. Si están cambiados, es FALLO.
7. ANATOMÍA: el dibujo tiene deformidades evidentes (miembros fusionados, caras sin
   boca, ojos flotando fuera de la cabeza)."""


def cargar(video: str) -> tuple[dict, list[dict], Path]:
    cfg = config.get_video(video)
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "frames.json"
    frames = json.loads(manifest.read_text(encoding="utf-8"))["frames"]
    img_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    return cfg, frames, img_dir


def preparar(video: str, n_lotes: int) -> None:
    cfg, frames, img_dir = cargar(video)
    presentes = [f for f in frames if (img_dir / f["file"]).exists()]
    faltan = len(frames) - len(presentes)
    if faltan:
        print(f"AVISO: {faltan} imágenes aún no existen; se revisarán solo {len(presentes)}.",
              file=sys.stderr)

    tam = -(-len(presentes) // n_lotes)  # techo
    lotes = [presentes[i:i + tam] for i in range(0, len(presentes), tam)]
    out = config.REPO_ROOT / cfg["manifest_dir"] / ".qc_lotes.json"
    out.write_text(json.dumps({
        "video": video,
        "img_dir": str(img_dir),
        "checks": CHECKS,
        "lotes": [[{"file": f["file"], "text": f["text"], "scene": f["scene"]} for f in lote]
                  for lote in lotes],
    }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(lotes)} lotes de ~{tam} imágenes → {out.relative_to(config.REPO_ROOT)}")


def aplicar(video: str, veredicto_path: Path) -> None:
    """Borra las rechazadas. No las regenera: eso lo hace generate_images, que ya
    salta las que existen, así que basta con quitar las malas."""
    cfg, frames, img_dir = cargar(video)
    datos = json.loads(veredicto_path.read_text(encoding="utf-8"))
    fallos = datos if isinstance(datos, list) else datos.get("fallos", [])

    validos = {f["file"] for f in frames}
    borradas, desconocidas = [], []
    for item in fallos:
        nombre = item if isinstance(item, str) else item.get("file", "")
        if nombre not in validos:
            desconocidas.append(nombre)
            continue
        p = img_dir / nombre
        if p.exists():
            p.unlink()
            borradas.append(nombre)

    print(f"Borradas {len(borradas)} imágenes rechazadas.")
    if desconocidas:
        print(f"AVISO: {len(desconocidas)} nombres no están en frames.json: {desconocidas[:5]}")
    print(f"Ahora: python scripts/generate_images_gemini.py --video {video} --model flash")
    print("(regenera solo las que faltan; luego vuelve a pasar el QC sobre ESAS)")


def main() -> None:
    p = argparse.ArgumentParser(description="Capa 2 de QC: revisión visual con agentes")
    p.add_argument("--video", required=True)
    p.add_argument("--lotes", type=int, default=8, help="en cuántos lotes repartir la revisión")
    p.add_argument("--aplicar", type=Path, help="JSON con los fallos: borra esas imágenes")
    args = p.parse_args()

    if args.aplicar:
        aplicar(args.video, args.aplicar)
    else:
        preparar(args.video, args.lotes)


if __name__ == "__main__":
    main()
