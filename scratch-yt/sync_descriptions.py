#!/usr/bin/env python3
"""Pone en YouTube la descripción actual de seo.md (con capítulos) en los vídeos ya subidos.

Hasta oct-2026 publish_from_recipe.py no añadía los capítulos de "## Capítulos" a la
descripción, así que ningún vídeo subido los tiene. Este script los añade a los que ya tienen
capítulos válidos en seo.md y todavía no los muestran en YouTube. Conserva título, tags y
categoría tal cual están en YouTube: solo cambia la descripción.

Cada actualización gasta 50 unidades de la cuota diaria; si se agota, se para y basta con
volver a ejecutarlo al día siguiente (salta los que ya están al día).

Uso:
    python sync_descriptions.py            # aplica
    python sync_descriptions.py --dry-run  # solo muestra qué cambiaría
"""
import argparse
import contextlib
import io
import json
import sys

from googleapiclient.errors import HttpError

import publish_from_recipe as pfr
import upload_youtube as uy

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    args = p.parse_args()

    queue = json.loads((pfr.HERE / "publish_queue.json").read_text(encoding="utf-8"))["queue"]
    vids = json.loads((pfr.REPO_ROOT / "videos.json").read_text(encoding="utf-8"))
    yt = uy.get_service()
    for e in queue:
        cfg = vids.get(e["video"])
        if not e.get("video_id") or not cfg:
            continue
        try:
            with contextlib.redirect_stderr(io.StringIO()):
                desc = pfr.parse_seo(pfr.REPO_ROOT / cfg["manifest_dir"] / "seo.md")["description"]
        except SystemExit:
            continue
        if "Capítulos:" not in desc:
            continue
        items = yt.videos().list(part="snippet", id=e["video_id"]).execute().get("items", [])
        if not items:
            print(f"?? {e['video']}: {e['video_id']} no aparece en YouTube")
            continue
        snip = items[0]["snippet"]
        # Ya al día si YouTube muestra exactamente este bloque de capítulos. No basta con buscar
        # "0:00": los primeros vídeos se subieron con capítulos estimados a mano (y erróneos)
        # dentro de la descripción, y hay que sustituirlos.
        block = desc[desc.index("Capítulos:"):].split("\n\n", 1)[0]
        if block in snip.get("description", "").replace("\r\n", "\n"):
            continue
        if args.dry_run:
            print(f"cambiaría {e['video']} ({e['video_id']})")
            continue
        body = {"id": e["video_id"], "snippet": {
            "title": snip["title"], "categoryId": snip["categoryId"],
            "tags": snip.get("tags", []), "description": desc}}
        try:
            yt.videos().update(part="snippet", body=body).execute()
        except HttpError as err:
            if "quota" in str(err).lower():
                sys.exit("Cuota de YouTube agotada: vuelve a ejecutarlo mañana.")
            raise
        print(f"OK capítulos en {e['video']} ({e['video_id']})")


if __name__ == "__main__":
    main()
