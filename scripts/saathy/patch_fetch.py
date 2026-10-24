#!/usr/bin/env python3
"""Patch window.fetch in the running page to fake a successful chat completion."""
import subprocess

JS = r"""
(() => {
  const orig = window.fetch;
  const content = [
    "**Newtons First Law** says an object stays at rest, or keeps moving uniformly, unless a net external force acts on it.",
    "",
    "## In simple words",
    "Things keep doing whatever they are doing until a force changes that.",
    "",
    "**Example:** passengers jerk forward when a bus brakes suddenly.",
    "",
    "$$F_{net} = 0 \\Rightarrow a = 0$$",
    "",
    "| Situation | Net force | Motion |",
    "|---|---|---|",
    "| Book on the table | Zero | At rest |",
    "| Rolling ball (no friction) | Zero | Constant velocity |",
    "",
    "Want me to give you 3 practice questions on this?"
  ].join("\n");
  window.fetch = (u, o) => {
    if (String(u).includes("/chat/completions")) {
      const body = { choices: [{ message: { role: "assistant", content } }] };
      return Promise.resolve(new Response(JSON.stringify(body), { status: 200, headers: { "Content-Type": "application/json" } }));
    }
    return orig(u, o);
  };
  return "fetch patched";
})()
"""
r = subprocess.run(["agent-browser", "eval", JS], capture_output=True, text=True)
print(r.stdout.strip() or r.stderr.strip())
