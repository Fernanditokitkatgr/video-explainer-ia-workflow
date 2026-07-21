#!/usr/bin/env python3
"""Cola de publicación diaria — un vídeo aprobado se publica a las 19:00 (Europe/Madrid).

No hay ningún proceso corriendo a las 19:00: YouTube publica solo (vía `publishAt` en
`upload_youtube.py`). Este script solo decide QUÉ hora exacta le toca a cada vídeo nuevo
que se aprueba, para que dos vídeos aprobados el mismo día no choquen en el mismo slot —
cada uno coge el siguiente día libre a las 19:00, en orden de aprobación.

Uso:
    python publish_queue.py next                        # próximo hueco libre (sin reservarlo)
    python publish_queue.py reserve --video <slug>       # reserva el próximo hueco para <slug>, imprime el ISO UTC
    python publish_queue.py mark-published --video <slug> --video-id <id>
    python publish_queue.py list
"""
import argparse
import json
import sys
from datetime import datetime, timedelta, time as dtime
from pathlib import Path
from zoneinfo import ZoneInfo

TZ = ZoneInfo("Europe/Madrid")
PUBLISH_HOUR = 19  # 19:00 hora de Madrid
QUEUE_PATH = Path(__file__).parent / "publish_queue.json"


def load_queue() -> list[dict]:
    if not QUEUE_PATH.exists():
        return []
    return json.loads(QUEUE_PATH.read_text(encoding="utf-8")).get("queue", [])


def save_queue(queue: list[dict]) -> None:
    QUEUE_PATH.write_text(json.dumps({"queue": queue}, ensure_ascii=False, indent=2), encoding="utf-8")


def next_slot(queue: list[dict]) -> datetime:
    """Próximo día (a partir de mañana) sin ningún slot 'scheduled' ya ocupado, a las 19:00 Madrid."""
    taken_dates = {
        datetime.fromisoformat(e["scheduled_at_utc"].replace("Z", "+00:00")).astimezone(TZ).date()
        for e in queue
        if e.get("status") == "scheduled"
    }
    day = datetime.now(TZ).date() + timedelta(days=1)
    while day in taken_dates:
        day += timedelta(days=1)
    return datetime.combine(day, dtime(hour=PUBLISH_HOUR), tzinfo=TZ)


def cmd_next(_args) -> None:
    slot = next_slot(load_queue())
    print(slot.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ"))


def cmd_reserve(args) -> None:
    queue = load_queue()
    if any(e["video"] == args.video and e.get("status") == "scheduled" for e in queue):
        sys.exit(f"'{args.video}' ya tiene un hueco reservado en la cola — revisa con 'list' antes de reservar otro.")
    slot = next_slot(queue)
    slot_utc = slot.astimezone(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ")
    queue.append({
        "video": args.video,
        "video_id": None,
        "scheduled_at_utc": slot_utc,
        "status": "scheduled",
        "approved_at": datetime.now(ZoneInfo("UTC")).strftime("%Y-%m-%dT%H:%M:%SZ"),
    })
    save_queue(queue)
    print(slot_utc)


def cmd_mark_published(args) -> None:
    queue = load_queue()
    for e in queue:
        if e["video"] == args.video and e.get("status") == "scheduled":
            e["status"] = "published"
            e["video_id"] = args.video_id
            save_queue(queue)
            print(f"OK: {args.video} -> published ({args.video_id})")
            return
    sys.exit(f"No se encontró una entrada 'scheduled' para '{args.video}' en la cola.")


def cmd_list(_args) -> None:
    queue = load_queue()
    if not queue:
        print("Cola vacía.")
        return
    for e in queue:
        print(f"{e['scheduled_at_utc']}  [{e['status']:>10}]  {e['video']}  {e.get('video_id') or ''}")


if __name__ == "__main__":
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    sub.add_parser("next").set_defaults(func=cmd_next)

    p_reserve = sub.add_parser("reserve")
    p_reserve.add_argument("--video", required=True)
    p_reserve.set_defaults(func=cmd_reserve)

    p_mark = sub.add_parser("mark-published")
    p_mark.add_argument("--video", required=True)
    p_mark.add_argument("--video-id", required=True)
    p_mark.set_defaults(func=cmd_mark_published)

    sub.add_parser("list").set_defaults(func=cmd_list)

    args = p.parse_args()
    args.func(args)
