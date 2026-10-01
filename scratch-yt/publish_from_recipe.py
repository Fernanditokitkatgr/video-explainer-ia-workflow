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

# La consola de Windows es cp1252: sin esto, un emoji en la salida de upload_youtube.py
# tumba el proceso padre A MITAD de la subida y el ID no se registra.
sys.stdout.reconfigure(encoding="utf-8", errors="replace")

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
    p.add_argument("--thumbnail", default="",
                   help="ruta a la miniatura; por defecto <manifest>/thumbnail_final.jpg (con texto) o thumbnail.jpg")
    p.add_argument("--category", default="27", help="27=Educación (por defecto)")
    p.add_argument("--dry-run", action="store_true", help="muestra qué se subiría, sin llamar a la API")
    args = p.parse_args()

    manifest_dir = get_manifest_dir(args.video)
    seo = parse_seo(manifest_dir / "seo.md")

    mp4 = REPO_ROOT / "remotion" / "output" / f"{args.video}.mp4"
    if not mp4.exists():
        sys.exit(f"No existe el render: {mp4}")
    # Ruta ABSOLUTA: la subida corre con cwd=scratch-yt/, así que una ruta relativa al repo
    # no resolvía y la miniatura se omitía siempre ("Thumbnail no encontrado").
    if args.thumbnail:
        thumbnail = Path(args.thumbnail).resolve()
    else:
        final = manifest_dir / "thumbnail_final.jpg"
        thumbnail = final if final.exists() else manifest_dir / "thumbnail.jpg"
    if not thumbnail.exists():
        sys.exit(f"No existe la miniatura: {thumbnail}")
    if thumbnail.name != "thumbnail_final.jpg":
        print("⚠️  La miniatura no es thumbnail_final.jpg: probablemente no lleva texto (scripts/thumbnail_text.py).")

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
    # Se reenvía la salida línea a línea (el login OAuth abre el navegador igual) y se captura
    # el ID para dejar sincronizados cola, videos.json y state.json sin pasos manuales.
    proc = subprocess.Popen(upload_cmd, cwd=HERE, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                            text=True, encoding="utf-8", errors="replace")
    video_id = None
    for line in proc.stdout:
        print(line, end="")
        m = re.search(r"youtu\.be/([\w-]{11})", line)
        if m:
            video_id = m.group(1)
    if proc.wait() != 0 or not video_id:
        sys.exit("La subida a YouTube falló — revisa el error de arriba. El hueco en la cola sigue reservado (bórralo a mano de publish_queue.json si vas a reintentar con otro vídeo).")
    sync_bookkeeping(args.video, video_id, publish_at, manifest_dir)


def sync_bookkeeping(video: str, video_id: str, publish_at: str, manifest_dir: Path) -> None:
    qpath = HERE / "publish_queue.json"
    q = json.loads(qpath.read_text(encoding="utf-8"))
    for e in q["queue"]:
        if e["video"] == video and e.get("scheduled_at_utc") == publish_at:
            e["video_id"] = video_id
    qpath.write_text(json.dumps(q, ensure_ascii=False, indent=2), encoding="utf-8")

    vpath = REPO_ROOT / "videos.json"
    v = json.loads(vpath.read_text(encoding="utf-8"))
    v[video]["published"] = {"youtube_id": video_id, "privacy": "private",
                             "publish_at": publish_at, "date": publish_at[:10]}
    vpath.write_text(json.dumps(v, ensure_ascii=False, indent=2), encoding="utf-8")

    steps = ["voice", "whisper", "inject", "images", "sfx", "validate", "preflight", "render"]
    (manifest_dir / "state.json").write_text(json.dumps(
        {"video": video, "steps": {s: "done" for s in steps}}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"📒 Sincronizado: cola + videos.json + state.json  ({video_id})")


if __name__ == "__main__":
    main()
