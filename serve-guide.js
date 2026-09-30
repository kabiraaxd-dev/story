// Tiny static server to share the Vue 2 → Vue 3 Migration Guide deliverables.
// Start:  node serve-guide.js
// Stop:   Ctrl+C (or taskkill /IM node.exe /F if started in background)
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8765;
const DIR = __dirname;
const FILE_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".pdf": "application/pdf",
};

const FILES = [
  { name: "VUE3_MIGRATION_GUIDE.md", desc: "Markdown source", icon: "📝" },
  { name: "VUE3_MIGRATION_GUIDE.html", desc: "Styled HTML (browser)", icon: "🌐" },
  { name: "VUE3_MIGRATION_GUIDE.pdf", desc: "Print-ready PDF (A4)", icon: "📄" },
];

function indexPage() {
  const items = FILES
    .map((f) => {
      const p = path.join(DIR, f.name);
      const size = fs.existsSync(p) ? fs.statSync(p).size : 0;
      const kb = Math.max(1, Math.round(size / 1024));
      return (
        '<a class="file" href="/' + f.name + '">' +
        '<span class="icon">' + f.icon + "</span>" +
        '<span class="name">' + f.name + "</span>" +
        '<span class="meta">' + f.desc + " · " + (size ? kb + " KB" : "missing") + "</span>" +
        '<span class="go">Download ⬇</span></a>'
      );
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8">
<title>Vue 3 Migration Guide — Downloads</title>
<style>
  body { font-family: "Segoe UI", Arial, sans-serif; margin: 0; min-height: 100vh;
         background: linear-gradient(135deg,#42b883 0%,#35a475 45%,#35495e 100%); color:#fff; }
  .wrap { max-width: 720px; margin: 10vh auto; padding: 40px 24px; }
  h1 { font-size: 1.9rem; margin: 0 0 4px; }
  p { margin: 0 0 26px; opacity: .9; }
  .file { display: flex; align-items: center; background: rgba(255,255,255,.12);
          border: 1px solid rgba(255,255,255,.35); border-radius: 12px;
          padding: 16px 18px; margin: 12px 0; text-decoration: none; transition: background .2s; }
  .file:hover { background: rgba(255,255,255,.22); }
  .icon { font-size: 1.6rem; margin-right: 16px; }
  .name { font-family: Consolas, Menlo, monospace; font-size: .98rem; font-weight: 600; margin-right: 12px; }
  .meta { font-size: .82rem; opacity: .85; margin-right: auto; }
  .go { font-size: .85rem; font-weight: 700; background: #fff; color: #26313f;
        padding: 6px 14px; border-radius: 8px; }
</style></head><body><div class="wrap">
  <h1>📦 Vue 2 → Vue 3 Migration Guide</h1>
  <p>Choose your format — all three are the same document.</p>
${items}
  <p style="margin-top:20px;opacity:.65;font-size:.8rem">Served from ${DIR} · stop server with: <b>taskkill /IM node.exe /F</b></p>
</div></body></html>`;
}

http
  .createServer((req, res) => {
    const url = req.url.split("?")[0];
    if (url === "/" || url === "/index.html") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(indexPage());
      return;
    }
    const fileName = path.basename(url);
    const ext = path.extname(fileName).toLowerCase();
    if (!FILE_TYPES[ext]) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not found");
      return;
    }
    const filePath = path.join(DIR, fileName);
    if (!fs.existsSync(filePath)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("File not found: " + fileName);
      return;
    }
    res.writeHead(200, {
      "Content-Type": FILE_TYPES[ext],
      "Content-Disposition": 'attachment; filename="' + fileName + '"',
      "Content-Length": fs.statSync(filePath).size,
    });
    fs.createReadStream(filePath).pipe(res);
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log("Serving guide downloads on http://127.0.0.1:" + PORT);
  });