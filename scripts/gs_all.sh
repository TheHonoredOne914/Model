#!/bin/bash
# Step 1: gs image-crush pass on all 23 chapters -> work/gs/
set -e
UP=/home/z/my-project/upload
OUT=/home/z/my-project/scripts/work/gs
mkdir -p "$OUT"
cd "$UP"

for f in iemh101 iemh102 iemh103 iemh104 iemh105 iemh106 iemh107 iemh108 \
         iemh201 iemh202 iemh203 iemh204 iemh205 iemh206 \
         iest103 iest108 iest109 iest201 iest202 iest203 iest204 iest205 iest206; do
  if [ -s "$OUT/$f.pdf" ]; then echo "skip $f (done)"; continue; fi
  gs -sDEVICE=pdfwrite -dNOPAUSE -dBATCH -dQUIET -dCompatibilityLevel=1.5 \
     -dAutoRotatePages=/None -dPDFSETTINGS=/ebook \
     -dColorImageResolution=110 -dGrayImageResolution=110 -dMonoImageResolution=200 \
     -sOutputFile="$OUT/$f.pdf" "$f.pdf"
  o=$(stat -c%s "$f.pdf"); n=$(stat -c%s "$OUT/$f.pdf")
  echo "$f: $((o/1024))KB -> $((n/1024))KB"
done
echo "=== totals ==="
du -ch "$OUT"/*.pdf | tail -1
