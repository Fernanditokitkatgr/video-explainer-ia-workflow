#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Prueba de MUNDOS temáticos (no es producción): tres clips 9:16 con la MISMA voz y la MISMA estructura.

    python channel/tecno/pruebas/mundos/hacer_mundos.py   # escribe <mundo>/plano.json y public-motor/prueba-mundo-*/

Un vídeo real no necesita nada de esto: basta con poner "mundo" en su plano.json (ver docs/motor.md). Este script
existe porque la prueba no tiene entrada en videos.json. La voz sale de voz/voz.mp3 (una sola generación).
"""
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

AQUI = Path(__file__).resolve().parent
REPO = AQUI.parents[3]
sys.path.insert(0, str(REPO / "scripts"))
import motor_plano as mp  # noqa: E402
from make_shorts import align_words, script_words  # noqa: E402
from whisper_timestamps import cached_words  # noqa: E402

VOZ = AQUI / "voz" / "voz.mp3"

CLIPS = {
    "hacking": {
        "rival": "ciberdelincuente",
        "gancho": {"texto": "ESTE SMS\nNO ES DE\nTU BANCO", "kicker": "./analizar sms.txt", "barra": "sms_scan", "color": "alerta", "tam": 124},
        "visual": {"icono": "movil", "etiqueta": "ESCANEANDO", "alerta_texto": "PHISHING DETECTADO"},
        "titulo": {"texto": "ATAQUE EN 3 PASOS", "kicker": "cat ataque.log", "barra": "ataque.log", "tam": 92},
        "pasos": [("FINGE SER TU BANCO", "Te da confianza", "sobre"), ("PIDE UN CÓDIGO", "Solo un momento", "llave"),
                  ("CUENTA VACÍA", "Demasiado tarde", "calavera")],
        "dice": ("¡Soy tu banco!", "Solo tu código"), "sello": "HACKEADO",
    },
    "ia": {
        "rival": "ia",
        "gancho": {"texto": "LA IA\nTE ESTÁ\nENGANCHANDO", "kicker": "FIG. 01 · ANÁLISIS", "tam": 124},
        "visual": {"icono": "chip", "etiqueta": "MODELO DE LENGUAJE", "alerta_texto": "BUCLE DE USO DETECTADO"},
        "titulo": {"texto": "ESQUEMA EN 3 FASES", "kicker": "FIG. 02 · FUNCIONAMIENTO", "tam": 92},
        "pasos": [("TE DA RESPUESTAS", "Gratis y al instante", "bombilla"), ("TE PIDE TUS DATOS", "Solo un poco más", "ojo"),
                  ("YA DEPENDES DE ELLA", "Y te cuesta salir", "cadena")],
        "dice": ("¡Pregúntame!", "¿Y tus datos?"), "sello": "ENGANCHADO",
    },
    "periodico": {
        "rival": "rico",
        "gancho": {"texto": "LA ESTAFA\nQUE SIGUE\nFUNCIONANDO", "kicker": "ÚLTIMA HORA · BOSTON, 1920", "tam": 112},
        "visual": {"icono": "banco", "etiqueta": "Fig. 1: La oficina de Ponzi", "alerta_texto": "Fig. 2: Colas para cobrar"},
        "titulo": {"texto": "EL TIMO PONZI", "kicker": "ASÍ FUNCIONA", "tam": 96},
        "pasos": [("PAGA A LOS PRIMEROS", "Con el dinero de los nuevos", "dolar"), ("PIDE TUS AHORROS", "Y promete un 50 %", "hucha"),
                  ("QUIEBRA", "Agosto de 1920", "grafico_baja")],
        "dice": ("¡Un 50 %!", "¡Confíe en mí!"), "sello": "QUIEBRA", "y_gancho": 450, "y_titulo": 335,
    },
}
# Estilos de dibujo: la misma historia que hacking para que solo cambie el dibujo. rótulos sin el "alerta" de consola.
for _e in ("comic", "collage", "pegatina"):
    CLIPS[_e] = {**CLIPS["hacking"], "gancho": {"texto": "ESTE SMS\nNO ES DE\nTU BANCO", "kicker": "¡Ojo!", "tam": 124},
                 "titulo": {"texto": "ATAQUE EN 3 PASOS", "kicker": "Así funciona",
                            "tam": {"comic": 92, "collage": 60, "pegatina": 78}[_e]}}


def plano(c: dict, mundo: str) -> dict:
    """Misma estructura y mismos tiempos en los tres mundos: solo cambian los textos y el rival."""
    r = c["rival"]
    Y1, Y2, Y3 = 560, 770, 980
    pasos = c["pasos"]
    return {
        "formato": "9:16", "mundo": mundo, "cola": 1.2,
        "reparto": {"mono": {"tipo": "protagonista", "narrador": True}, r: {"tipo": r}},
        "tramos": [
            {"en": "", "relleno": False,
             "escenas": [{"tipo": "m_rotulo", **c["gancho"], "al": "@-0.5", "zona": {"y": c.get("y_gancho", 400)}},
                         {"tipo": "m_visual", **c["visual"], "al": "@-0.5", "y": 860, "tam": 220, "alerta_al": "@casi", "tramos": 1}],
             "personajes": {
                 "mono": {"x": 0.27, "entrada": "nada", "pose": "señalar", "cara": "sorpresa",
                          "cambios": [{"al": "@pasando", "pose": "brazos_arriba", "salta": True},
                                      {"al": "@casi", "pose": "miedo", "cara": "miedo"}]},
                 r: {"x": 0.74, "entrada": "nada", "pose": "brazos_cruzados", "cara": "chulo", "mira": "izq",
                     "cambios": [{"al": "@casi", "pose": "jarras", "cara": "risa"}]}},
             "sfx": [["golpe", 0.02, 1.0], ["boom", 0.04, 0.7]], "golpes": [0.05]},
            {"en": "Funciona siempre", "relleno": False,
             "escenas": [{"tipo": "m_rotulo", **c["titulo"], "al": "@inicio", "zona": {"y": c.get("y_titulo", 300)}, "tramos": 3}],
             "personajes": {"mono": {"pose": "pensar", "cara": "normal",
                                     "cambios": [{"al": "@igual", "pose": "señalar_arriba", "cara": "sorpresa"}]},
                            r: {"pose": "saludar", "cara": "guiño"}}},
            {"en": "Primero te", "relleno": False,
             "escenas": [{"tipo": "m_paso", "n": 1, "titulo": pasos[0][0], "detalle": pasos[0][1], "icono": pasos[0][2], "al": "@Primero", "y": Y1, "tramos": 2}],
             "personajes": {"mono": {"pose": "presentar", "cara": "risa"},
                            r: {"pose": "presentar", "cara": "risa", "dice": [{"texto": c["dice"][0], "al": "@da", "hasta": "@da+1.2"}]}}},
            {"en": "Luego te", "relleno": False,
             "escenas": [{"tipo": "m_paso", "n": 2, "titulo": pasos[1][0], "detalle": pasos[1][1], "icono": pasos[1][2], "al": "@Luego", "y": Y2, "tramos": 1}],
             "personajes": {"mono": {"pose": "pensar", "cara": "normal"},
                            r: {"pose": "señalar", "cara": "chulo", "dice": [{"texto": c["dice"][1], "al": "@pide"}]}}},
            {"en": "Y cuando", "relleno": False,
             "escenas": [{"tipo": "m_paso", "n": 3, "titulo": pasos[2][0], "detalle": pasos[2][1], "icono": pasos[2][2], "al": "@quieres", "y": Y3, "color": "alerta"},
                         {"tipo": "sello", "texto": c["sello"], "al": "@ya", "caja": {"x": 540, "y": 770}, "tam": 112 if len(c["sello"]) > 8 else 130, "color": "rojo"}],
             "personajes": {"mono": {"pose": "miedo", "cara": "miedo", "cambios": [{"al": "@ya", "pose": "encogerse", "cara": "triste"}]},
                            r: {"pose": "celebrar", "cara": "risa", "cambios": [{"al": "@ya", "salta": True}]}},
             "golpes": ["@ya"]},
        ],
    }


def main() -> None:
    voz_dir = AQUI / "voz"
    cruda = cached_words(VOZ, voz_dir / "whisper_cache.json")
    sw = script_words(voz_dir / "script.md")
    words = [{"text": w, "start": round(a, 3), "end": round(b, 3)} for w, (a, b) in zip(sw, align_words(sw, cruda))]
    for mundo, c in CLIPS.items():
        slug = f"prueba-mundo-{mundo}"
        src = plano(c, mundo)
        carpeta = AQUI / mundo
        carpeta.mkdir(exist_ok=True)
        (carpeta / "plano.json").write_text(json.dumps(src, ensure_ascii=False, indent=1), encoding="utf-8")
        gains = mp.preparar_publico(slug, VOZ)
        res, R = mp.resolver_plano(slug, {"manifest_dir": str(carpeta.relative_to(REPO))}, src, words, mp.ffprobe_dur(VOZ), gains)
        for a in R.avisos:
            print("  ⚠", a)
        if R.errores:
            sys.exit("\n".join(R.errores))
        (mp.PUB / slug / "plano.json").write_text(json.dumps(res, ensure_ascii=False), encoding="utf-8")
        print(f"{mundo}: {res['duracion']} s, ritmo {mp.ritmo(res)[:2]}")


if __name__ == "__main__":
    main()
