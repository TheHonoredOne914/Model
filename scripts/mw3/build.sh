#!/bin/bash
# Maths War v5 — assembler: concatenates parts into the final single-file app
set -e
DIR=/home/z/my-project/scripts/mw3
OUT=/home/z/my-project/download/maths-war.html
cat $DIR/p01_head.html $DIR/p02_body.html $DIR/p03_data1.js $DIR/p04_data2.js $DIR/p05_data3.js \
    $DIR/p06_labs1.js $DIR/p07_labs2.js $DIR/p08_labs3.js $DIR/p09_bossart.js $DIR/p10_ui.js > $OUT
echo "bytes: $(wc -c < $OUT)"
# extract each <script> block and syntax-check with node
node -e "
const fs=require('fs');
const html=fs.readFileSync('$OUT','utf8');
const blocks=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
console.log('script blocks:',blocks.length);
let fail=0;
blocks.forEach((b,i)=>{
  try{new Function(b)}catch(e){fail++;console.log('BLOCK '+i+' ERROR: '+e.message)}
});
// combined check (cross-block refs like function hoisting are fine at runtime, but each block must parse alone)
if(fail){process.exit(1)}
console.log('all blocks parse OK');
"
