#!/bin/bash
# Answer the chapter-1 quiz correctly via agent-browser REFS (overlay-safe).
cd /home/z/my-project
QMAP='src/data/artifacts/gm/ch01.json'
for round in $(seq 1 12); do
  q=$(agent-browser eval "document.querySelector('h2.font-note')?.textContent ?? ''" 2>/dev/null | sed 's/^"//; s/"$//')
  ans=$(node -e "
    const j = JSON.parse(require('fs').readFileSync('$QMAP','utf8'));
    const hit = j.quiz.find(x => String(process.argv[1]).trim().startsWith(x.q.slice(0, 40)));
    if (hit) console.log(hit.options[hit.answer]); else console.log('');
  " "$q")
  if [ -z "$ans" ]; then echo "round $round: no match for: $q"; break; fi
  # map answer text -> ref from the live snapshot
  ref=$(agent-browser snapshot -i -c 2>/dev/null | grep -oE '\- button "[ABCD] [^"]*" \[ref=([a-z0-9]+)\]' | grep -F "$ans" | grep -oE 'ref=[a-z0-9]+' | head -1 | cut -d= -f2)
  if [ -z "$ref" ]; then echo "round $round: ref not found for: $ans"; break; fi
  echo "round $round: $ans -> @$ref"
  agent-browser click "@$ref" >/dev/null 2>&1
  sleep 0.75
  if [ "$round" == "1" ]; then agent-browser screenshot download/ui-screens/10-quiz-answered.png >/dev/null 2>&1; fi
  # advance: prefer "Agla", fall back to "Result dekho"
  aref=$(agent-browser snapshot -i -c 2>/dev/null | grep -oE '\- button "(Agla →|Result dekho)" \[ref=([a-z0-9]+)\]' | grep -oE 'ref=[a-z0-9]+' | head -1 | cut -d= -f2)
  if [ -z "$aref" ]; then echo "round $round: no advance button, stopping"; break; fi
  agent-browser click "@$aref" >/dev/null 2>&1
  sleep 0.75
done
agent-browser screenshot download/ui-screens/11-quiz-result.png
echo QUIZ-DONE
