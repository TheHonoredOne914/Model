#!/bin/bash
# Saathy — UI screenshot run v2: robust eval-based clicks.
set -e
cd /home/z/my-project
OUT=/home/z/my-project/download/saathy-screens
mkdir -p "$OUT"

setsid nohup bun run dev > /tmp/devserver.log 2>&1 < /dev/null &
disown
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/learn --max-time 10 || true)
  [ "$code" = "200" ] && break
  sleep 2
done
echo "server ready (learn=$code)"

B() { agent-browser --session saathy "$@"; }
CLICK() { B eval "(() => { const t=[...document.querySelectorAll('button,a')]; const el=t.find(e=>e.textContent.replace(/\\s+/g,' ').trim().includes('$1')); if(el){el.click(); return 'clicked';} return 'not-found: $1'; })()"; }

B set viewport 1440 900

# desk — seeded progress, concept map first
B open http://localhost:3000/learn/gm/1
B wait --load networkidle
B eval "localStorage.setItem('saathy.learn.gm.1', JSON.stringify({band:2,slidesViewed:6,quizBest:0,cardsKnown:0,xp:0,done:['explore'],weak:[]})); 'ok'"
B reload
B wait --load networkidle
sleep 1.4
B eval "document.getElementById('explore-panel').scrollIntoView(); window.scrollBy(0,-80); 'ok'"
sleep 0.6
B screenshot "$OUT/03-desk-concept-map.png"

# flowchart tab
CLICK "Chapter flow"
sleep 1.2
B screenshot "$OUT/04-desk-flowchart.png"

# slides overlay
CLICK "Slides se seekho"
sleep 1.8
B screenshot "$OUT/05-slide-1.png"
CLICK "Agla →"
sleep 1.5
B screenshot "$OUT/06-slide-2.png"
CLICK "Exit slides"
sleep 0.9

# examples overlay — reveal steps, then answer
CLICK "Solved examples"
sleep 1.6
B screenshot "$OUT/07-examples-1.png"
CLICK "Agla step likho"
sleep 0.7
CLICK "Agla step likho"
sleep 0.7
CLICK "Answer dikhao"
sleep 1.0
B screenshot "$OUT/08-examples-answer.png"
CLICK "✕ Exit"
sleep 0.9

# quiz overlay + instant feedback
CLICK "Seedha quiz"
sleep 1.6
B screenshot "$OUT/09-quiz.png"
B eval "(() => { const opts=[...document.querySelectorAll('button')].filter(b=>b.className.includes('rounded-xl')&&b.className.includes('w-full')); opts[0]?.click(); return opts.length; })()"
sleep 0.8
B screenshot "$OUT/10-quiz-feedback.png"
CLICK "Exit quiz"
sleep 0.9

# games hub
CLICK "Games"
sleep 1.6
B screenshot "$OUT/11-games.png"
CLICK "← Exit"
sleep 0.9

# master report — full progress
B eval "localStorage.setItem('saathy.learn.gm.1', JSON.stringify({band:3,slidesViewed:14,quizBest:81,cardsKnown:9,xp:120,done:['explore','learn','solve','try','fix','play'],weak:['1.2','1.4']})); 'ok'"
B reload
B wait --load networkidle
sleep 1.3
CLICK "Master"
sleep 1.4
B screenshot "$OUT/12-master-report.png"

B close
echo "DONE"
ls -la "$OUT"
