#!/bin/bash
# VidhyaSaathy webapp preview launcher.
# Used as the root project's `npm run dev` so the sandbox preview serves the
# VidhyaSaathy webapp (Vite) on :3000 with its API on :3001.
# The Saathy Next.js app stays available via `npm run dev:saathy`.

set -e
VS=/home/z/my-project/vs-webapp

# API on :3001 (idempotent)
if ! curl -s -o /dev/null --max-time 2 http://127.0.0.1:3001/healthz; then
  (cd "$VS" && setsid nohup npm run dev -w apps/api >> /tmp/vs-api.log 2>&1 < /dev/null &)
  for i in $(seq 1 30); do
    curl -s -o /dev/null --max-time 2 http://127.0.0.1:3001/healthz && break
    sleep 1
  done
fi

# Web (Vite) on :3000 — foreground, bound for the preview tunnel
cd "$VS/apps/web"
exec npm run dev -- --port 3000 --host 0.0.0.0 --strictPort
