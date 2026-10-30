// 로컬 테스트용 서버: node dev-server.js  →  http://localhost:3000
const http = require("http"), fs = require("fs"), path = require("path");
try { process.loadEnvFile(path.join(__dirname, ".env.local")); } catch (e) { console.log(".env.local 없음 → 키 없이 실행"); }
http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname.startsWith("/api/")) {
    const f = path.join(__dirname, "api", path.basename(url.pathname) + ".js");
    if (!fs.existsSync(f)) { res.statusCode = 404; return res.end("not found"); }
    res.status = c => { res.statusCode = c; return res; };
    res.json = o => { res.setHeader("Content-Type", "application/json; charset=utf-8"); res.end(JSON.stringify(o)); };
    return require(f)(req, res);
  }
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.end(fs.readFileSync(path.join(__dirname, "index.html")));
}).listen(3000, () => console.log("http://localhost:3000"));