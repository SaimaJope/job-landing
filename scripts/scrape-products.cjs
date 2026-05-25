/*
 * One-off scraper: recovers the old jobkauppa.fi product catalog from the
 * Wayback Machine (the live shop is offline / cert expired).
 *
 * Input:  wb_products.json  ([ [timestamp, url], ... ] from the CDX index)
 * Output: scraped-products.json  (keyed by product id, resumable)
 *         public/products/<id>.<ext>  (downloaded product images)
 *
 * Run:  node scripts/scrape-products.cjs            (full run, resumable)
 *       CONC=6 node scripts/scrape-products.cjs     (concurrency)
 *       LIMIT=20 node scripts/scrape-products.cjs   (test first 20 pending)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ROWS = JSON.parse(fs.readFileSync(path.join(ROOT, "wb_products.json"), "utf8"));
const OUT = path.join(ROOT, "scraped-products.json");
const IMGDIR = path.join(ROOT, "public", "products");
fs.mkdirSync(IMGDIR, { recursive: true });

const LIMIT = process.env.LIMIT ? parseInt(process.env.LIMIT, 10) : Infinity;
const CONC = process.env.CONC ? parseInt(process.env.CONC, 10) : 6;

const dec = (s) => {
  try {
    return decodeURIComponent(String(s).replace(/\+/g, " "));
  } catch {
    return String(s).replace(/\+/g, " ");
  }
};
const entities = (s) =>
  String(s)
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const pick = (re, h) => {
  const m = h.match(re);
  return m ? entities(m[1]) : "";
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// dedupe by product id, keep the most recent snapshot
const byPid = new Map();
for (const [ts, url] of ROWS) {
  const pid = url.split("/").pop();
  const prev = byPid.get(pid);
  if (!prev || ts > prev[0]) byPid.set(pid, [ts, url]);
}
const items = [...byPid.values()];

let out = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")) : {};
let dirty = 0;
function flush(force = false) {
  dirty++;
  if (force || dirty % 15 === 0) fs.writeFileSync(OUT, JSON.stringify(out, null, 1));
}

async function fetchText(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return await r.text();
      if (r.status === 429) await sleep(2500 * (i + 1));
    } catch {
      await sleep(700 * (i + 1));
    }
  }
  return null;
}
async function fetchBuf(url, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { redirect: "follow" });
      if (r.ok) return Buffer.from(await r.arrayBuffer());
    } catch {
      await sleep(600);
    }
  }
  return null;
}

async function scrapeOne([ts, url]) {
  const pid = url.split("/").pop();
  if (out[pid] && out[pid].ok) return;

  const parts = url.split("/").filter(Boolean);
  // path after /fi/ : top category is the segment after 'fi'
  const fi = parts.indexOf("fi");
  const topcat = dec(parts[fi + 1]);

  const snap = `http://web.archive.org/web/${ts}id_/${url}`;
  const h = await fetchText(snap);
  if (!h) {
    out[pid] = { ok: false, pid, err: "fetch failed", url };
    flush();
    return;
  }

  const name = pick(/<h1>([\s\S]*?)<\/h1>/i, h);
  const code = pick(/Tuotekoodi:\s*<span[^>]*>([\s\S]*?)<\/span>/i, h);
  const priceRaw = pick(/<span class="price">([\s\S]*?)<\/span>/i, h);
  const priceNum = (() => {
    const m = priceRaw.match(/([0-9]+(?:[.,][0-9]+)?)/);
    return m ? parseFloat(m[1].replace(",", ".")) : null;
  })();

  // validate this is really a product page, not a category/index leaf
  const isProduct = !!code || priceNum != null || /smtCart/.test(h);
  if (!isProduct || !name) {
    out[pid] = { ok: false, pid, err: "not a product", url };
    flush();
    return;
  }

  const ean = pick(/EAN-koodi<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/i, h);
  const supplier = pick(/Toimittaja<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>/i, h);
  const desc = pick(/og:description"\s+content="([\s\S]*?)"/i, h);
  const imgUrl = pick(/og:image"\s+content="([\s\S]*?)"/i, h);

  let imgFile = "";
  if (imgUrl && /product_pictures/i.test(imgUrl)) {
    const imgSnap = `http://web.archive.org/web/${ts}im_/${imgUrl}`;
    const buf = await fetchBuf(imgSnap);
    if (buf && buf.length > 300) {
      const ext = (imgUrl.match(/\.(jpe?g|png|gif|webp)/i) || [null, "jpg"])[1].toLowerCase();
      imgFile = `${pid}.${ext === "jpeg" ? "jpg" : ext}`;
      fs.writeFileSync(path.join(IMGDIR, imgFile), buf);
    }
  }

  out[pid] = {
    ok: true,
    pid,
    name,
    code,
    ean,
    supplier,
    price: priceNum,
    priceText: priceRaw,
    desc,
    img: imgFile,
    cat: topcat,
    catid: parts[parts.length - 3],
    ts,
    url,
  };
  flush();
}

(async () => {
  const pending = items.filter(([, url]) => {
    const pid = url.split("/").pop();
    return !(out[pid] && out[pid].ok);
  });
  const work = pending.slice(0, LIMIT);
  console.log(
    `total=${items.length} alreadyOk=${items.length - pending.length} toFetch=${work.length} conc=${CONC}`,
  );

  let idx = 0;
  let done = 0;
  async function worker() {
    while (idx < work.length) {
      const myItem = work[idx++];
      await scrapeOne(myItem);
      done++;
      if (done % 25 === 0) console.log(`${done}/${work.length}`);
      await sleep(60);
    }
  }
  await Promise.all(Array.from({ length: CONC }, worker));
  flush(true);

  const okCount = Object.values(out).filter((x) => x.ok).length;
  const withImg = Object.values(out).filter((x) => x.ok && x.img).length;
  console.log(`DONE. ok=${okCount} withImage=${withImg} totalCandidates=${items.length}`);
})();
