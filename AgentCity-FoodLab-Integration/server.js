// Local server: serves this folder and lets Mia (AgentCity developer) call the Claude API.
// The API key stays in the ANTHROPIC_API_KEY environment variable and never reaches the browser.
const http = require("http"), fs = require("fs"), path = require("path");
const ROOT = __dirname, PORT = Number(process.env.PORT) || 5500;
const KEY = process.env.ANTHROPIC_API_KEY, MODEL = process.env.MODEL || "claude-sonnet-5-5";
const TYPES = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".webp": "image/webp", ".txt": "text/plain" };
const SYSTEM = "You are Mia Chen, a developer at a small software company. Reply with ONE complete, self-contained HTML file (inline CSS and JS, no external resources) and nothing else. No markdown fences.";
const ORIGINS = [`http://127.0.0.1:${PORT}`, `http://localhost:${PORT}`];

function send(res, code, body, type = "application/json") { res.writeHead(code, { "content-type": type }); res.end(body); }

http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/api/mia") {
    if (req.headers.origin && !ORIGINS.includes(req.headers.origin)) return send(res, 403, JSON.stringify({ error: "Origin not allowed" }));
    let body = "";
    for await (const chunk of req) { body += chunk; if (body.length > 5000) return send(res, 413, JSON.stringify({ error: "Too large" })); }
    try {
      if (!KEY) throw new Error("ANTHROPIC_API_KEY is not set on the server.");
      const { title } = JSON.parse(body);
      if (!title || typeof title !== "string") throw new Error("Missing task title.");
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "content-type": "application/json", "x-api-key": KEY, "anthropic-version": "2023-06-01" },
        body: JSON.stringify({ model: MODEL, max_tokens: 4000, system: SYSTEM,
          messages: [{ role: "user", content: `Task from the CodeLearn e-learning site: ${title.slice(0, 200)}` }] })
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error?.message || "Claude API error");
      const html = data.content.filter(b => b.type === "text").map(b => b.text).join("").trim()
        .replace(/^```(?:html)?\s*/i, "").replace(/\s*```$/, "");
      return send(res, 200, JSON.stringify({ html }));
    } catch (error) { return send(res, 500, JSON.stringify({ error: error.message })); }
  }
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (p.endsWith("/")) p += "index.html";
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT + path.sep)) return send(res, 403, "Forbidden", "text/plain");
  fs.readFile(file, (error, data) => error
    ? send(res, 404, "Not found", "text/plain")
    : send(res, 200, data, TYPES[path.extname(file)] || "application/octet-stream"));
}).listen(PORT, "127.0.0.1", () => console.log(`Open http://127.0.0.1:${PORT}/  (Mia AI ${KEY ? "ready" : "needs ANTHROPIC_API_KEY"})`));
