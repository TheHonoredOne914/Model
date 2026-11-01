/* Saathy preview server — serves public/ (root = Saathy.html) + /api/brain via z-ai SDK.
   Used by `npm run dev` (scripts/vs-dev.sh) so the sandbox preview opens the
   VidhyaSaathy webapp directly, with a working Saathy brain and zero configuration. */
import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, resolve, sep } from "node:path";
import ZAI from "z-ai-web-dev-sdk";

const ROOT = resolve(process.cwd(), "public");
const PORT = 3000;
const JSONH = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const MIME = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2",
};

let zaiPromise = null;
const getZAI = () => (zaiPromise ||= ZAI.create());

async function handleBrain(req, res, body) {
  let data;
  try { data = JSON.parse(body || "{}"); }
  catch { res.writeHead(400, JSONH); return res.end(JSON.stringify({ error: "bad json" })); }
  if (data.ping) { res.writeHead(200, JSONH); return res.end(JSON.stringify({ brain: "cloud", ok: true })); }
  const msgs = Array.isArray(data.messages)
    ? data.messages.filter(m => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim()).slice(-16)
    : [];
  if (!msgs.length) { res.writeHead(400, JSONH); return res.end(JSON.stringify({ error: "messages required" })); }
  const history = data.system
    ? [{ role: "assistant", content: String(data.system).slice(0, 12000) }, ...msgs]
    : msgs;
  try {
    const zai = await getZAI();
    const completion = await zai.chat.completions.create({
      messages: history,
      thinking: { type: "disabled" },
    });
    const text = completion?.choices?.[0]?.message?.content || "";
    if (!String(text).trim()) throw new Error("empty response");
    res.writeHead(200, JSONH);
    res.end(JSON.stringify({ text }));
  } catch (e) {
    console.error("[brain]", (e && e.message) || e);
    res.writeHead(502, JSONH);
    res.end(JSON.stringify({ error: String((e && e.message) || e) }));
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  try {
    if (url.pathname === "/api/brain") {
      if (req.method !== "POST") { res.writeHead(405, JSONH); return res.end(JSON.stringify({ error: "POST only" })); }
      let body = "";
      req.on("data", c => { body += c; if (body.length > 1e6) req.destroy(); });
      return req.on("end", () => handleBrain(req, res, body));
    }
    if (url.pathname === "/api/healthz") {
      res.writeHead(200, JSONH); return res.end(JSON.stringify({ ok: true, brain: "cloud" }));
    }
    let p = decodeURIComponent(url.pathname);
    if (p === "/" || p === "/index.html") p = "/Saathy.html";
    const file = normalize(join(ROOT, p));
    if (!file.startsWith(ROOT + sep) && file !== ROOT) { res.writeHead(403); return res.end("forbidden"); }
    const buf = await readFile(file);
    res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
    res.end(buf);
  } catch (e) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("not found");
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Saathy preview server — http://0.0.0.0:" + PORT + " (root: public/Saathy.html, brain: z-ai SDK)");
});
