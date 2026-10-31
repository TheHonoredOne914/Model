#!/bin/bash
# Compress the 69MB combined PDF hard (gs ebook → fallback screen) and swap into public/.
set -e
SRC=/home/z/my-project/public/Saathy_All_Chapters.pdf
OUT=/tmp/Saathy_All_Chapters_small.pdf
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH \
   -dDetectDuplicateImages=true -dColorImageResolution=110 -dGrayImageResolution=110 -dMonoImageResolution=200 \
   -sOutputFile="$OUT" "$SRC" 2>/dev/null || echo "gs ebook failed"
if [ ! -s "$OUT" ]; then
  gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="$OUT" "$SRC" 2>/dev/null
fi
A=$(stat -c%s "$SRC"); B=$(stat -c%s "$OUT")
echo "before: $A  after: $B  ratio: $(python3 -c "print(round($B/$A*100,1))")%"
if [ "$B" -lt "$A" ]; then
  cp "$OUT" "$SRC"
  echo "swapped into public/"
else
  echo "no gain, keeping original"
fi
