#!/bin/bash
# Calibration v2 — drop the problematic MonoImageDownsampleType flag
set -e
UP=/home/z/my-project/upload
CAL=/home/z/my-project/scripts/cal
mkdir -p "$CAL"
cd "$UP"

COMMON="-sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dQUIET -dCompatibilityLevel=1.5 -dAutoRotatePages=/None"

echo "--- A: /ebook (150 dpi)"
gs $COMMON -dPDFSETTINGS=/ebook -sOutputFile="$CAL/A_ebook.pdf" iest202.pdf

echo "--- B: /ebook + 110 dpi"
gs $COMMON -dPDFSETTINGS=/ebook -dColorImageResolution=110 -dGrayImageResolution=110 -dMonoImageResolution=200 -sOutputFile="$CAL/B_110.pdf" iest202.pdf

echo "--- C: /screen (72 dpi)"
gs $COMMON -dPDFSETTINGS=/screen -sOutputFile="$CAL/C_screen.pdf" iest202.pdf

echo "--- D: /ebook + 85 dpi (max squeeze candidate)"
gs $COMMON -dPDFSETTINGS=/ebook -dColorImageResolution=85 -dGrayImageResolution=85 -dMonoImageResolution=150 -sOutputFile="$CAL/D_85.pdf" iest202.pdf

echo "=== sizes (orig $(stat -c%s iest202.pdf) bytes) ==="
for f in A_ebook B_110 C_screen D_85; do
  s=$(stat -c%s "$CAL/$f.pdf" 2>/dev/null || echo 0)
  echo "$f: $((s/1024)) KB"
done
