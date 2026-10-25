#!/bin/bash
# Mock the chat-completions endpoint with a valid OpenAI-style response (heredoc-safe quoting)
cd /home/z/my-project
BODY='{"choices":[{"message":{"role":"assistant","content":"**Newtons First Law** says an object stays at rest or in uniform motion unless a net external force acts on it.\n\n## In simple words\nThings keep doing what they are doing until forced to change.\n\n**Example:** passengers jerk forward when a bus brakes suddenly.\n\n$$F_{net} = 0 \\Rightarrow a = 0$$\n\n| Situation | Net force | Motion |\n|---|---|---|\n| Book on table | Zero | At rest |\n| Ball rolling (frictionless) | Zero | Constant velocity |\n\nWant me to give you 3 practice questions on this?"}]}}'
agent-browser network route "**/chat/completions" --body "$BODY" --status 200 --headers '{"Content-Type":"application/json"}'
