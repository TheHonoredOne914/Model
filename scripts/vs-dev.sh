#!/bin/bash
# Saathy preview launcher.
# Used as the root project's `npm run dev` so the sandbox preview serves the
# VidhyaSaathy webapp (public/Saathy.html) on :3000 with the /api/brain cloud
# endpoint (z-ai SDK) — the chat works with zero configuration.
# The Saathy Next.js app stays available via `npm run dev:saathy`.

cd /home/z/my-project
exec node scripts/saathy-server.mjs
