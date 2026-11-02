#!/bin/bash
# Watchdog: keeps the Next.js dev server alive on :3000.
# If the port stops answering, restart it. Log everything to /tmp/vs-watchdog.log
cd /home/z/my-project
while true; do
  code=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/ --max-time 6)
  if [ "$code" != "200" ]; then
    echo "[$(date '+%H:%M:%S')] down (code=$code) — restarting" >> /tmp/vs-watchdog.log
    # kill any zombie holders then start fresh
    fuser -k 3000/tcp 2>/dev/null
    sleep 1
    npx next dev -p 3000 >> /tmp/vs-watchdog.log 2>&1 &
    NP=$!
    # wait for it to come up
    for i in $(seq 1 30); do
      sleep 2
      c=$(curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:3000/ --max-time 5)
      if [ "$c" = "200" ]; then
        echo "[$(date '+%H:%M:%S')] up (pid $NP)" >> /tmp/vs-watchdog.log
        break
      fi
      if ! kill -0 $NP 2>/dev/null; then
        echo "[$(date '+%H:%M:%S')] child died during boot" >> /tmp/vs-watchdog.log
        break
      fi
    done
  fi
  sleep 8
done
