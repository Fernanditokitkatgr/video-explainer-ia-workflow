#!/usr/bin/env python3
"""Panel de revisión: reúne los vídeos nuevos en una carpeta y genera una página para verlos.

    python scripts/revision.py            # actualiza la carpeta y la página
    python scripts/revision.py --abrir    # y la abre en el navegador

Salida en channel/tecno/REVISION/:
- REVISION.html: calendario real de YouTube, vídeos agrupados y caja de feedback por vídeo.
- videos/<grupo>/: enlaces duros a los MP4 (no ocupan disco; el original sigue en pruebas/).
- notas.json: lo que se va a hacer y lo descartado. Se edita a mano y este script lo pinta.
"""
import argparse
import html
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

REPO = Path(__file__).resolve().parent.parent
TECNO = REPO / "channel" / "tecno"
PRUEBAS = TECNO / "pruebas"
SALIDA = TECNO / "REVISION"
NOTAS = SALIDA / "notas.json"
MADRID = ZoneInfo("Europe/Madrid")

# (carpeta de pruebas, patrón de archivo, nombre del grupo en la página)
GRUPOS = [
    ("dia_a_dia", "*.mp4", "Día a día (variantes)"),
    ("mundos", "*.mp4", "Diseños nuevos"),
    ("disenos", "*.mp4", "Diseños nuevos"),
    ("naive", "*.mp4", "Diseños nuevos"),
    ("ecomonos", "*.mp4", "Diseños nuevos"),
    ("motor", "LARGO_*.mp4", "Largos"),
    ("motor", "SHORT_*.mp4", "Shorts"),
]
NOTAS_VACIAS = {"proximos": [], "descartados": [], "preguntas": []}


def segundos(iso: str) -> int:
    m = re.fullmatch(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", iso or "")
    return int(m[1] or 0) * 3600 + int(m[2] or 0) * 60 + int(m[3] or 0) if m else 0


def programados() -> list[dict]:
    sys.path.insert(0, str(REPO / "scratch-yt"))
    from upload_youtube import get_service
    yt = get_service()
    canal = yt.channels().list(part="contentDetails", mine=True).execute()
    subidas = canal["items"][0]["contentDetails"]["relatedPlaylists"]["uploads"]
    r = yt.playlistItems().list(part="contentDetails", playlistId=subidas, maxResults=50).execute()
    ids = [i["contentDetails"]["videoId"] for i in r["items"]]
    filas = []
    for v in yt.videos().list(part="snippet,status,contentDetails", id=",".join(ids)).execute()["items"]:
        cuando = v["status"].get("publishAt")
        if not cuando or v["status"].get("privacyStatus") != "private":
            continue
        fecha = datetime.fromisoformat(cuando.replace("Z", "+00:00"))
        if fecha < datetime.now(timezone.utc):
            continue
        dur = segundos(v["contentDetails"]["duration"])
        filas.append({"fecha": fecha.astimezone(MADRID), "id": v["id"], "titulo": v["snippet"]["title"],
                      "tipo": "Short" if 0 < dur <= 70 else "Largo", "dur": dur})
    return sorted(filas, key=lambda f: f["fecha"])


def enlazar() -> dict[str, list[Path]]:
    """Crea los enlaces duros y devuelve los vídeos por grupo, los más nuevos primero."""
    grupos: dict[str, list[Path]] = {}
    for carpeta, patron, grupo in GRUPOS:
        destino = SALIDA / "videos" / grupo
        for src in sorted((PRUEBAS / carpeta).glob(patron)):
            destino.mkdir(parents=True, exist_ok=True)
            dst = destino / src.name
            if dst.exists() and dst.stat().st_ino != src.stat().st_ino:
                dst.unlink()
            if not dst.exists():
                os.link(src, dst)
            grupos.setdefault(grupo, []).append(dst)
    for lista in grupos.values():
        lista.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return grupos


def lista_html(titulo: str, filas: list[str]) -> str:
    if not filas:
        return ""
    li = "".join(f"<li>{html.escape(f)}</li>" for f in filas)
    return f"<h2>{html.escape(titulo)}</h2><ul>{li}</ul>"


def tarjeta(p: Path) -> str:
    rel = html.escape(p.relative_to(SALIDA).as_posix(), quote=True)
    nombre = re.sub(r"^(LARGO|SHORT)_(short-)?", "", p.stem).replace("-", " ").replace("_", " ")
    fecha = datetime.fromtimestamp(p.stat().st_mtime, MADRID).strftime("%d-%b %H:%M")
    clave = html.escape(p.stem, quote=True)
    return (f'<article><video src="{rel}" controls preload="metadata"></video>'
            f"<h3>{html.escape(nombre)}</h3><p class=meta>{fecha}</p>"
            f'<div class=notas><button data-v="me-gusta">Me gusta</button><button data-v="no">No</button></div>'
            f'<textarea data-clave="{clave}" placeholder="Tu feedback…"></textarea></article>')


def pagina(prog: list[dict], grupos: dict[str, list[Path]], notas: dict) -> str:
    def ultimo(tipo: str) -> str:
        f = [x["fecha"] for x in prog if x["tipo"] == tipo]
        return max(f).strftime("%d-%b") if f else "nada programado"

    filas = "".join(
        f'<tr><td>{f["fecha"]:%a %d-%b %H:%M}</td><td>{f["tipo"]}</td>'
        f'<td><a href="https://youtu.be/{f["id"]}">{html.escape(f["titulo"])}</a></td></tr>' for f in prog)
    secciones = "".join(
        f"<h2>{html.escape(g)} ({len(v)})</h2><div class=rejilla>{''.join(tarjeta(p) for p in v)}</div>"
        for g, v in grupos.items())
    plantilla = (Path(__file__).parent / "revision_plantilla.html").read_text(encoding="utf-8")
    return (plantilla
            .replace("{{ACTUALIZADO}}", datetime.now(MADRID).strftime("%d-%b %H:%M"))
            .replace("{{ULTIMO_LARGO}}", ultimo("Largo")).replace("{{ULTIMO_SHORT}}", ultimo("Short"))
            .replace("{{CALENDARIO}}", filas)
            .replace("{{NOTAS}}", lista_html("Preguntas para ti", notas["preguntas"])
                     + lista_html("Próximos vídeos", notas["proximos"])
                     + lista_html("Descartados", notas["descartados"]))
            .replace("{{VIDEOS}}", secciones))


def main() -> None:
    ap = argparse.ArgumentParser(description="Actualiza la carpeta y la página de revisión")
    ap.add_argument("--abrir", action="store_true", help="abre la página en el navegador")
    args = ap.parse_args()

    SALIDA.mkdir(parents=True, exist_ok=True)
    if not NOTAS.exists():
        NOTAS.write_text(json.dumps(NOTAS_VACIAS, ensure_ascii=False, indent=2), encoding="utf-8")
    notas = {**NOTAS_VACIAS, **json.loads(NOTAS.read_text(encoding="utf-8"))}

    prog = programados()
    grupos = enlazar()
    salida = SALIDA / "REVISION.html"
    salida.write_text(pagina(prog, grupos, notas), encoding="utf-8")
    print(f"{salida} — {len(prog)} programados, {sum(map(len, grupos.values()))} vídeos")
    if args.abrir:
        os.startfile(salida)  # type: ignore[attr-defined]


if __name__ == "__main__":
    main()
