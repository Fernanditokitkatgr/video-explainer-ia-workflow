#!/usr/bin/env python3
"""
Generate stickman frames for a Stick to the Plan video using Higgsfield nano_banana_pro.
Usage:
    python scripts/generate_images.py --video ayuno-intermitente
"""
import argparse
import os
import sys
import time
import json
import urllib.request
import urllib.error
from pathlib import Path

try:
    import requests as _requests
except ImportError:
    sys.exit("Install requests: pip3 install requests")

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

API_KEY = os.environ.get("HIGGSFIELD_API_KEY")
MCP_URL = "https://mcp.higgsfield.ai/mcp"
MODEL = "nano_banana_pro"
STYLE_BASE = (
    "Simple stickman drawing on white paper, hand-drawn thick black marker lines, "
    "muscular stickman character with long hair, headband, red glasses. "
    "Red glasses are the ONLY color accent. Pure white background. Minimal, clean. "
)

# (filename, scene description) — matches FRAMES array in AyunoIntermitente.tsx
FRAMES = [
    ("0_00.jpg", "Stick standing in front of an open fridge, clock on wall shows 10:00, morning light"),
    ("0_06.jpg", "Stick staring into the fridge with wide curious eyes"),
    ("0_10.jpg", "Stick closing the fridge door firmly, determined expression"),
    ("0_15.jpg", "Close-up of Stick's face with a small lightbulb drawn above his head"),
    ("0_17.jpg", "Stick looking at his own body with curiosity, arrows pointing inward to his torso"),
    ("0_23.jpg", "A large ON/OFF switch labeled REPARACION, Stick pointing at it excitedly"),
    ("0_28.jpg", "Stick eating a big meal, a large upward arrow next to him labeled insulina"),
    ("0_31.jpg", "A giant cell door wide open, tiny packages being delivered through it non-stop"),
    ("0_33.jpg", "Construction stick-figure workers carrying boxes through the open cell door"),
    ("0_37.jpg", "Workers inside a cell stacking boxes labeled construccion, no cleaning crew in sight"),
    ("0_42.jpg", "Dirty cluttered cell interior, dust everywhere, no cleaning happening"),
    ("0_44.jpg", "Stick sitting with a coffee, arrow going down labeled insulina"),
    ("0_48.jpg", "The giant cell door closing slowly, construction workers leaving with their boxes"),
    ("0_50.jpg", "A tiny cleaning crew in overalls entering through the closed door with mops and tools"),
    ("0_53.jpg", "Text AUTOFAGIA in bold with Stick pointing at it, Greek letters scattered in background"),
    ("1_00.jpg", "The cleaning crew inside a cell finding tangled broken protein strings on the floor"),
    ("1_04.jpg", "Crew dismantling broken parts with tiny tools, sorting pieces into two piles"),
    ("1_08.jpg", "Good pieces going into a bin labeled reutilizar, bad pieces into a trash can"),
    ("1_12.jpg", "A building being renovated from the inside, scaffolding inside, clean facade outside"),
    ("1_17.jpg", "Construction workers trying to enter the cell door but it is closed, they wait outside"),
    ("1_24.jpg", "Stick eating a snack, clock ticking, construction workers always at the door again"),
    ("1_28.jpg", "Stick's body silhouette as a dusty building that was never renovated"),
    ("1_31.jpg", "A large stopwatch showing 14 to 16 hours, cleaning crew waiting patiently"),
    ("1_34.jpg", "A clock face split: 16 dark hours labeled ayuno, 8 bright hours labeled comer"),
    ("1_40.jpg", "Stick relaxing with coffee, label 16:8 with a green checkmark"),
    ("1_44.jpg", "Timeline: Stick eats at 12, eats at 20, a bracket spanning 16 hours labeled mantenimiento"),
    ("1_52.jpg", "Tiny maintenance workers operating inside Stick's body silhouette during the 16-hour gap"),
    ("1_56.jpg", "Stick flexing, tiny glowing batteries inside his muscles labeled mitocondrias"),
    ("2_00.jpg", "Two batteries side by side: one dim labeled insulina alta, one bright labeled ayuno"),
    ("2_06.jpg", "A car engine with clogged dirty filters versus clean filters, same engine label"),
    ("2_10.jpg", "The clean-filter engine with speed lines, running better"),
    ("2_15.jpg", "Stick's brain with a fuel gauge needle moving from glucosa to cetonas"),
    ("2_19.jpg", "The liver labeled higado producing small pentagon shapes labeled cetonas"),
    ("2_24.jpg", "Stick's brain glowing with stars, alert focused expression"),
    ("2_27.jpg", "Stick with clear sharp eyes and upright posture, no fog or cloud around his head"),
    ("2_32.jpg", "Warning sign labeled OJO, a clock timeline showing 12 to 16 hours"),
    ("2_38.jpg", "A bar chart glycogen tank emptying slowly over 16 hours"),
    ("2_41.jpg", "16:8 label with green checkmark, cleaning crew giving thumbs up"),
    ("2_43.jpg", "Stick looking at his watch, thought bubble showing a plate and a clock"),
    ("2_47.jpg", "A simple eating window timeline: breakfast time arrow to dinner time, bracket showing gap"),
    ("2_51.jpg", "Two timelines side by side: old eating schedule versus new schedule with bigger gap"),
    ("2_54.jpg", "Stick with a medical cross symbol and a doctor stick figure in white coat"),
    ("2_58.jpg", "Stick standing next to a person in a wheelchair and a person with a heart symbol"),
    ("3_02.jpg", "An open science book with beaker and molecules, label la ciencia dice"),
    ("3_05.jpg", "A light switch labeled interruptor de reparacion being turned ON, light radiates"),
    ("3_10.jpg", "Stick holding a sign that reads el ayuno no es una dieta"),
    ("3_13.jpg", "A clock face with a bracket labeled ventana de tiempo"),
    ("3_16.jpg", "Same food portions squeezed into a smaller time window on a timeline diagram"),
    ("3_20.jpg", "Cleaning crew repair workers and recycling team all working together inside Stick's body"),
    ("3_24.jpg", "Stick sleeping peacefully, cleaning crew working inside him, label ayuno"),
    ("3_29.jpg", "A sleep timeline extended by 2 hours with an arrow labeled alargar la ventana"),
    ("3_32.jpg", "Stick closing the fridge one more time, calm satisfied smile"),
    ("3_37.jpg", "Stick making a black coffee, steam rising from the cup"),
    ("3_43.jpg", "Stick sitting quietly by a window, coffee in hand, peaceful morning light"),
    ("3_47.jpg", "Stick with a thought bubble containing an hourglass"),
    ("3_52.jpg", "Stick standing tall, confident fist-bump pose. Text below: Stick to the plan."),
]


def mcp_call(method: str, params: dict) -> dict:
    body = {"jsonrpc": "2.0", "id": 1, "method": method, "params": params}
    r = _requests.post(
        MCP_URL,
        json=body,
        headers={
            "Authorization": f"Bearer {API_KEY}",
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


def generate_frame(filename: str, scene: str, out_dir: Path) -> None:
    out_path = out_dir / filename
    if out_path.exists():
        print(f"  SKIP {filename} (already exists)")
        return

    prompt = STYLE_BASE + scene

    # Submit generation job
    resp = mcp_call("tools/call", {
        "name": "generate_image",
        "arguments": {
            "params": {
                "model": MODEL,
                "prompt": prompt,
                "aspect_ratio": "16:9",
            }
        },
    })

    content = resp.get("result", {}).get("structuredContent", {})
    job_id = content.get("job_id") or content.get("id") or content.get("jobId")
    if not job_id:
        print(f"  ERROR {filename}: no job_id in response: {str(content)[:200]}")
        return

    # Poll until done
    for attempt in range(60):
        time.sleep(5)
        status_resp = mcp_call("tools/call", {
            "name": "job_status",
            "arguments": {"job_id": job_id},
        })
        sc = status_resp.get("result", {}).get("structuredContent", {})
        state = sc.get("status", "")
        if state == "completed":
            url = sc.get("output_url") or (sc.get("outputs") or [{}])[0].get("url", "")
            if not url:
                print(f"  ERROR {filename}: completed but no URL")
                return
            # Download
            dl = _requests.get(url, timeout=30)
            dl.raise_for_status()
            out_path.write_bytes(dl.content)
            print(f"  OK {filename}")
            return
        elif state in ("failed", "error"):
            print(f"  FAIL {filename}: {sc.get('error','unknown error')}")
            return
        else:
            print(f"  ... {filename} [{attempt+1}] status={state}")

    print(f"  TIMEOUT {filename} after 5 min")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--video", default="ayuno-intermitente")
    parser.add_argument("--start", type=int, default=0, help="Start at frame index (resume)")
    args = parser.parse_args()

    if not API_KEY:
        sys.exit("HIGGSFIELD_API_KEY not set in .env")

    out_dir = Path("remotion/public") / args.video
    out_dir.mkdir(parents=True, exist_ok=True)

    total = len(FRAMES)
    for i, (filename, scene) in enumerate(FRAMES[args.start:], start=args.start):
        print(f"[{i+1}/{total}] {filename}")
        generate_frame(filename, scene, out_dir)

    print(f"\nDone. {sum(1 for f,_ in FRAMES if (out_dir/f).exists())}/{total} images in {out_dir}/")


if __name__ == "__main__":
    main()
