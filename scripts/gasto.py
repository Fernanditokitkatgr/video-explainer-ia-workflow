#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Contador de gasto de imágenes de Google (Vertex AI) y TOPE DURO de producción.

Por qué existe (oct-2026): se acabó el crédito gratis de una cuenta sin que nadie lo viera y Google
cobró ~100 € en la tarjeta. Desde entonces:
- Cada imagen generada con éxito se apunta en `gasto_imagenes.jsonl` (raíz del repo) con su precio
  estimado (precio de lista de Google, redondeado al alza).
- Antes de cada llamada se comprueba el total: si la siguiente imagen pasaría de TOPE_EUR, el
  programa se PARA (SystemExit) y no se genera nada más. Regla del usuario: a 250 € se para TODO.
- `python scripts/gasto.py` imprime el resumen (total, hoy, quedan hasta el tope) para el aviso
  diario. Es una ESTIMACIÓN: la cifra real está en console.cloud.google.com → Facturación → Créditos.

La cuenta y el crédito actuales: viniluar32@gmail.com, crédito Free Trial de 264 € (27-oct-2026 a
26-ene-2027), proyecto project-8571ddd3-5f95-4a40-8cf. Presupuesto de Google "Tecnomono tope 250"
con avisos por correo al 50/80/90/100 %.
"""
import json
import sys
from datetime import date, datetime
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

REPO = Path(__file__).resolve().parent.parent
LEDGER = REPO / "gasto_imagenes.jsonl"
TOPE_EUR = 250.0
CREDITO_EUR = 264.0
# Precio por imagen en euros, al alza (lista de Google: flash ~0,039 $, pro ~0,134 $).
PRECIO_EUR = {"flash": 0.04, "pro": 0.13, "lite": 0.04}  # lite: provisional, calibrar con la consola


def _tipo(model: str) -> str:
    m = model.lower()
    return "lite" if "lite" in m else ("pro" if "pro" in m else "flash")


def total() -> float:
    if not LEDGER.exists():
        return 0.0
    return sum(json.loads(l)["eur"] for l in LEDGER.read_text(encoding="utf-8").splitlines() if l.strip())


def comprobar(model: str) -> None:
    """Para el programa si la siguiente imagen haría pasar del tope."""
    t = total()
    precio = PRECIO_EUR[_tipo(model)]
    if t + precio > TOPE_EUR:
        print(f"\n⛔ TOPE DE GASTO ALCANZADO: llevamos {t:.2f} € de {TOPE_EUR:.0f} €. "
              f"Producción PARADA. No se genera ninguna imagen más.", flush=True)
        raise SystemExit(3)


def apuntar(model: str, archivo: str) -> None:
    rec = {"ts": datetime.now().isoformat(timespec="seconds"), "tipo": _tipo(model),
           "eur": PRECIO_EUR[_tipo(model)], "archivo": archivo}
    with LEDGER.open("a", encoding="utf-8") as fh:
        fh.write(json.dumps(rec, ensure_ascii=False) + "\n")


def resumen() -> str:
    hoy = date.today().isoformat()
    filas = [json.loads(l) for l in LEDGER.read_text(encoding="utf-8").splitlines() if l.strip()] \
        if LEDGER.exists() else []
    t = sum(r["eur"] for r in filas)
    h = sum(r["eur"] for r in filas if r["ts"].startswith(hoy))
    return (f"Gasto de imágenes (estimado): {t:.2f} € de {TOPE_EUR:.0f} € de tope "
            f"(crédito {CREDITO_EUR:.0f} €). Hoy: {h:.2f} € ({sum(1 for r in filas if r['ts'].startswith(hoy))} "
            f"imágenes). Quedan {max(0.0, TOPE_EUR - t):.2f} € hasta el tope.")


if __name__ == "__main__":
    print(resumen())
