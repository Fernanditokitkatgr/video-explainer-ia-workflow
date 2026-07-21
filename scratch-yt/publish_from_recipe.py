#!/usr/bin/env python3
"""Publica un vídeo tirando SIEMPRE del paquete SEO real (`seo.md`), no de copiar/pegar a mano.

Lee `channel/<canal>/videos/<video>/seo.md` (título recomendado, descripción con capítulos,
tags) generado por el pipeline, reserva el próximo hueco de la cola diaria de publicación
(`publish_queue.py`, 19:00 Europe/Madrid) y sube el vídeo a YouTube ya programado
(`upload_youtube.py --publish-at`) con esa misma metadata — así ningún tag, capítulo o
palabra clave se pierde entre el guion y la subida real.

Requiere que ya hayas pasado el HITL (revisor de vídeo + tu confirmación) antes de correr esto:
este script NO hace ninguna verificación de calidad, solo empaqueta y publica.

Uso:
    python publish_from_recipe.py --video como-funcionan-los-llm \
        --thumbnail ../channel/tecno/videos/como-funcionan-los-llm/thumbnail-variants/variante_a_cerebro_stickfigure.jpg
"""
import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
REPO_ROOT = HERE.parent


def get_manifest_dir(video: str) -> Path:
    videos_json = json.loads((REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    if video not in videos_json:
        sys.exit(f"'{video}' no existe en videos.json")
    return REPO_ROOT / videos_json[video]["manifest_dir"]


def parse_seo(seo_path: Path) -> dict:
    if not seo_path.exists():
        sys.exit(f"No existe {seo_path} — genera el SEO antes de publicar.")
    text = seo_path.read_text(encoding="utf-8")

    # Título: dentro de "## Título", la línea marcada "recomendado" (o la primera numerada si no hay marca).
    titulo_section = re.search(r"## Título.*?\n(.*?)(?=\n## )", text, re.S)
    if not titulo_section:
        sys.exit("No se encontró la sección '## Título' en seo.md")
    lines = [l for l in titulo_section.group(1).splitlines() if re.match(r"^\d+\.", l.strip())]
    if not lines:
        sys.exit("No se encontraron opciones de título numeradas en seo.md")
    chosen = next((l for l in lines if "recomendado" in l.lower()), lines[0])
    title = re.sub(r"^\d+\.\s*", "", chosen).strip()
    title = re.sub(r"\*\*(.+?)\*\*", r"\1", title)
    title = re.sub(r"\s*←.*$", "", title).strip()

    # Descripción: primer bloque ```...``` dentro de "## Descripción".
    desc_section = re.search(r"## Descripción\s*\n```\n(.*?)\n```", text, re.S)
    if not desc_section:
        sys.exit("No se encontró el bloque de descripción (```...```) bajo '## Descripción' en seo.md")
    description = desc_section.group(1).strip()

    # Tags: bloque ```...``` dentro de "## Tags".
    tags_section = re.search(r"## Tags\s*\n```\n(.*?)\n```", text, re.S)
    if not tags_section:
        sys.exit("No se encontró el bloque de tags (```...```) bajo '## Tags' en seo.md")
    tags = tags_section.group(1).strip()

    return {"title": title, "description": description, "tags": tags}


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("--video", required=True, help="slug tal como aparece en videos.json")
    p.add_argument("--thumbnail", required=True, help="ruta a la miniatura elegida (HITL)")
    p.add_argument("--category", default="27", help="27=Educación (por defecto)")
    p.add_argument("--dry-run", action="store_true", help="muestra qué se subiría, sin llamar a la API")
    args = p.parse_args()

    manifest_dir = get_manifest_dir(args.video)
    seo = parse_seo(manifest_dir / "seo.md")

    mp4 = REPO_ROOT / "remotion" / "output" / f"{args.video}.mp4"
    if not mp4.exists():
        sys.exit(f"No existe el render: {mp4}")
    thumbnail = Path(args.thumbnail)
    if not thumbnail.exists():
        sys.exit(f"No existe la miniatura: {thumbnail}")

    print(f"Título:      {seo['title']}")
    print(f"Descripción: {len(seo['description'])} caracteres")
    print(f"Tags:        {seo['tags'][:100]}...")
    print(f"Vídeo:       {mp4}")
    print(f"Miniatura:   {thumbnail}")

    if args.dry_run:
        print("\n--dry-run: no se reserva hueco ni se sube nada.")
        return

    reserve = subprocess.run(
        [sys.executable, str(HERE / "publish_queue.py"), "reserve", "--video", args.video],
        capture_output=True, text=True, cwd=HERE,
    )
    if reserve.returncode != 0:
        sys.exit(f"No se pudo reservar hueco en la cola:\n{reserve.stderr}")
    publish_at = reserve.stdout.strip()
    print(f"\nHueco reservado: {publish_at} (UTC)")

    upload_cmd = [
        sys.executable, str(HERE / "upload_youtube.py"), str(mp4),
        "--title", seo["title"],
        "--description", seo["description"],
        "--tags", seo["tags"],
        "--thumbnail", str(thumbnail),
        "--category", args.category,
        "--publish-at", publish_at,
    ]
    # Sin capturar stdout: el primer login OAuth necesita abrir el navegador en foreground.
    result = subprocess.run(upload_cmd, cwd=HERE)
    if result.returncode != 0:
        sys.exit("La subida a YouTube falló — revisa el error de arriba. El hueco en la cola sigue reservado (bórralo a mano de publish_queue.json si vas a reintentar con otro vídeo).")


if __name__ == "__main__":
    main()
