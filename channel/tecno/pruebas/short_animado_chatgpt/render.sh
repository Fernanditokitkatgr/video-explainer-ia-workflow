#!/usr/bin/env bash
# Render de la prueba + loudnorm a -14 LUFS (dos pasadas) → channel/tecno/pruebas/short_animado_chatgpt.mp4
set -euo pipefail
REPO="$(cd "$(dirname "$0")/../../../.." && pwd)"
cd "$REPO/remotion"
RAW="out/short_animado_chatgpt_raw.mp4"
FINAL="$REPO/channel/tecno/pruebas/short_animado_chatgpt.mp4"
# public/ entero pesa ~7 GB y el bundler lo COPIA a %TEMP% en cada render (llenó el disco):
# se usa una carpeta pública mínima con solo los recursos de esta prueba.
rm -rf public-pruebas && mkdir -p public-pruebas && cp -r public/pruebas-chatgpt public-pruebas/
npx remotion render src/pruebas/index.ts ShortAnimadoChatgpt "$RAW" --public-dir=public-pruebas --codec=h264 --crf=18 --concurrency=3 --timeout=120000 --log=error
# Pasada 1: medir. Pasada 2: aplicar con los valores medidos (loudnorm lineal, sin bombeo).
M=$(ffmpeg -hide_banner -i "$RAW" -af loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p')
g() { echo "$M" | python -c "import json,sys;print(json.load(sys.stdin)['$1'])"; }
ffmpeg -v error -y -i "$RAW" -c:v copy -af "loudnorm=I=-14:TP=-1.5:LRA=11:measured_I=$(g input_i):measured_TP=$(g input_tp):measured_LRA=$(g input_lra):measured_thresh=$(g input_thresh):offset=$(g target_offset):linear=true,aresample=48000" -c:a aac -b:a 192k "$FINAL"
ffmpeg -hide_banner -i "$FINAL" -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1
ffprobe -v error -show_entries format=duration:stream=width,height -of compact "$FINAL"
