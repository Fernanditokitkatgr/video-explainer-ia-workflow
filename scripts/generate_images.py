#!/usr/bin/env python3
"""Genera los frames stickman de un vídeo con Higgsfield.

Lee la RECETA de imágenes desde el manifest del vídeo:
    <manifest_dir>/frames.json  →  { "frames": [ { "file": "...", "scene": "..." }, ... ] }
El modelo, URL, aspect ratio y estilo base salen del .env (config.py).
Reanudable: salta las imágenes que ya existen.

Uso:
    python scripts/generate_images.py --video ayuno-intermitente
    python scripts/generate_images.py --video sueno-stick --start 10
"""
import argparse
import json
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Install requests: pip install -r requirements.txt")

import config


def load_frames(cfg: dict) -> list[dict]:
    manifest = config.REPO_ROOT / cfg["manifest_dir"] / "frames.json"
    if not manifest.exists():
        sys.exit(f"No existe la receta de imágenes: {manifest}\n"
                 f"Necesitas un frames.json con [{{file, scene}}] para '{cfg['name']}'.")
    data = json.loads(manifest.read_text(encoding="utf-8"))
    frames = data.get("frames", data) if isinstance(data, dict) else data
    missing_scene = [f["file"] for f in frames if not f.get("scene")]
    if missing_scene:
        sys.exit(f"Faltan prompts de escena (campo 'scene') en frames.json para: "
                 f"{', '.join(missing_scene[:5])}{'…' if len(missing_scene) > 5 else ''}")
    return frames


def mcp_call(method: str, params: dict) -> dict:
    body = {"jsonrpc": "2.0", "id": 1, "method": method, "params": params}
    r = requests.post(
        config.HIGGSFIELD_MCP_URL,
        json=body,
        headers={
            "Authorization": f"Bearer {config.HIGGSFIELD_API_KEY}",
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
        },
        timeout=60,
    )
    r.raise_for_status()
    for line in r.text.splitlines():
        if line.startswith("data:"):
            return json.loads(line[5:].strip())
    raise ValueError(f"No data line in response: {r.text[:200]}")


def generate_frame(filename: str, scene: str, out_dir: Path) -> bool:
    out_path = out_dir / filename
    if out_path.exists():
        print(f"  SKIP {filename} (ya existe)")
        return True

    prompt = config.HIGGSFIELD_STYLE_BASE + scene
    resp = mcp_call("tools/call", {
        "name": "generate_image",
        "arguments": {"params": {
            "model": config.HIGGSFIELD_MODEL,
            "prompt": prompt,
            "aspect_ratio": config.HIGGSFIELD_ASPECT_RATIO,
        }},
    })
    content = resp.get("result", {}).get("structuredContent", {})
    job_id = content.get("job_id") or content.get("id") or content.get("jobId")
    if not job_id:
        print(f"  ERROR {filename}: sin job_id: {str(content)[:200]}")
        return False

    delay = 5.0
    for attempt in range(60):
        time.sleep(delay)
        sc = mcp_call("tools/call", {
            "name": "job_status", "arguments": {"job_id": job_id},
        }).get("result", {}).get("structuredContent", {})
        state = sc.get("status", "")
        if state == "completed":
            url = sc.get("output_url") or (sc.get("outputs") or [{}])[0].get("url", "")
            if not url:
                print(f"  ERROR {filename}: completado pero sin URL")
                return False
            dl = requests.get(url, timeout=30)
            dl.raise_for_status()
            out_path.write_bytes(dl.content)
            print(f"  OK {filename}")
            return True
        if state in ("failed", "error"):
            print(f"  FAIL {filename}: {sc.get('error', 'error desconocido')}")
            return False
        print(f"  … {filename} [{attempt + 1}] status={state}")
        delay = min(delay * 1.3, 30)  # backoff exponencial suave, tope 30s

    print(f"  TIMEOUT {filename} tras ~5 min")
    return False


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera imágenes con Higgsfield")
    parser.add_argument("--video", required=True, help="Nombre de vídeo en videos.json")
    parser.add_argument("--start", type=int, default=0, help="Empieza en este índice (reanudar)")
    args = parser.parse_args()

    config.require("HIGGSFIELD_API_KEY")
    cfg = config.get_video(args.video)
    frames = load_frames(cfg)
    out_dir = config.PUBLIC_DIR / cfg["images_subpath"]
    out_dir.mkdir(parents=True, exist_ok=True)

    total = len(frames)
    for i, fr in enumerate(frames[args.start:], start=args.start):
        print(f"[{i + 1}/{total}] {fr['file']}")
        generate_frame(fr["file"], fr["scene"], out_dir)

    have = sum(1 for fr in frames if (out_dir / fr["file"]).exists())
    print(f"\nHecho. {have}/{total} imágenes en {out_dir}/")


if __name__ == "__main__":
    main()
