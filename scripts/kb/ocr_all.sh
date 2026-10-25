#!/usr/bin/env bash
# OCR both image-based textbook PDFs into per-page text files.
# Output: scripts/kb/ocr/sci/NNN.txt and scripts/kb/ocr/sst/NNN.txt
set -u
ROOT=/home/z/my-project/scripts/kb/ocr
LOCK=/tmp/saathy_ocr.lock
mkdir -p "$ROOT/sci" "$ROOT/sst"

if [ -f "$LOCK" ]; then
  pid="$(cat "$LOCK")"
  if kill -0 "$pid" 2>/dev/null; then echo "another OCR run ($pid) is active — exiting"; exit 0; fi
fi
echo $$ > "$LOCK"
trap 'rm -f "$LOCK"' EXIT

# Render + OCR page batches: keep peak parallelism small (2 CPUs) and stream
# each batch through tesseract before rendering the next, so memory stays flat.
ocr_book() {
  local pdf="$1" out="$2" first="$3" last="$4" batch=16
  local tmp="$ROOT/tmp_$$"
  mkdir -p "$tmp"
  local p="$first"
  while [ "$p" -le "$last" ]; do
    local e=$((p + batch - 1)); [ "$e" -gt "$last" ] && e="$last"
    echo "[$(date +%H:%M:%S)] $out pages $p-$e"
    pdftoppm -f "$p" -l "$e" -r 150 -gray "$pdf" "$tmp/pg"
    ls "$tmp"/pg-*.pgm | xargs -P 2 -I{} bash -c '
      f="{}"; b="$(basename "$f" .pgm)"
      tesseract "$f" "'"$ROOT"'/'"$out"'/$b" -l eng --psm 3 2>/dev/null || rm -f "$f"
      rm -f "$f"
    '
    p=$((e + 1))
  done
  # normalise names: pg-007.txt -> 007.txt
  for f in "$ROOT/$out"/pg-*.txt; do
    n="$(basename "$f" .txt)"; n="${n#pg-}"
    mv "$f" "$ROOT/$out/$n.txt"
  done
  rm -rf "$tmp"
  echo "[$(date +%H:%M:%S)] done $out: $(ls "$ROOT/$out" | wc -l) pages"
}

# Science: 292 pages, SST: 360 pages (verified via pdfinfo)
if [ "${1:-}" = "sci" ] || [ "${1:-}" = "sst" ]; then
  ocr_book "/home/z/my-project/upload/$( [ "$1" = "sci" ] && echo Science_Textbook_Grade_9_Complete_Compressed.pdf || echo Class9_SST_All_Chapters_Combined_261029_160729.pdf )" "$1" "$2" "$3"
  exit 0
fi
ocr_book /home/z/my-project/upload/Science_Textbook_Grade_9_Complete_Compressed.pdf sci 1 292
ocr_book /home/z/my-project/upload/Class9_SST_All_Chapters_Combined_261029_160729.pdf sst 1 360
echo "ALL OCR DONE"
