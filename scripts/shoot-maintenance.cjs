/* One-off screenshot of the maintenance page. Usage: node scripts/shoot-maintenance.cjs */
const path = require("path");
const fs = require("fs");
const http = require("http");
const puppeteer = require("puppeteer-core");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ROOT = path.join(__dirname, "..", "out");
const OUT = path.join(__dirname, "..", ".shots");
const PORT = 4174;

const TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".json": "application/json",
  ".ico": "image/x-icon",
};

function serveStatic() {
  return http.createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split("?")[0]);
    let filePath = path.join(ROOT, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(ROOT, "index.html");
    }
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      res.writeHead(200, { "Content-Type": TYPES[ext] || "application/octet-stream" });
      res.end(data);
    });
  });
}

async function settle(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  const server = serveStatic();
  await new Promise((resolve) => server.listen(PORT, resolve));
  const BASE = `http://localhost:${PORT}/`;

  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await settle(3000);
  await page.screenshot({ path: path.join(OUT, "maint-desktop.png") });

  const mob = await browser.newPage();
  await mob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mob.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await settle(3000);
  await mob.screenshot({ path: path.join(OUT, "maint-mobile.png") });

  await browser.close();
  server.close();
  console.log("done");
})();
