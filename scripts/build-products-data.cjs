/*
 * Transforms scraped-products.json into the typed catalog the site imports.
 * Output: src/data/catalog.json  ({ products, categories, recovered })
 *
 * Run after the scrape:  node scripts/build-products-data.cjs
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "scraped-products.json");
const OUTDIR = path.join(ROOT, "src", "data");
const OUT = path.join(OUTDIR, "catalog.json");
fs.mkdirSync(OUTDIR, { recursive: true });

const raw = JSON.parse(fs.readFileSync(SRC, "utf8"));
const clean = (s) => (s && String(s).trim() ? String(s).trim() : null);

// Archived prices include the old 24% VAT. Keep the net price and apply the
// current Finnish VAT of 25.5%.
const OLD_VAT = 1.24;
const NEW_VAT = 1.255;
const reVat = (gross) =>
  typeof gross === "number" ? Math.round((gross / OLD_VAT) * NEW_VAT * 100) / 100 : null;

// stable id from the top category name (the numeric id is sub-category level)
const slug = (s) =>
  String(s)
    .toLowerCase()
    .replace(/ä/g, "a")
    .replace(/ö/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const products = Object.values(raw)
  .filter((p) => p.ok && p.name)
  .map((p) => ({
    id: p.pid,
    name: p.name.replace(/\s+/g, " ").trim(),
    code: clean(p.code) || p.pid,
    ean: clean(p.ean),
    price: reVat(p.price),
    image: p.img ? `/products/${p.img}` : null,
    description: clean(p.desc),
    category: p.cat.replace(/\s+/g, " ").trim(),
    categoryId: slug(p.cat),
  }))
  // stable, human order: category then name
  .sort((a, b) =>
    a.category === b.category
      ? a.name.localeCompare(b.name, "fi")
      : a.category.localeCompare(b.category, "fi"),
  );

const catMap = new Map();
for (const p of products) {
  if (!catMap.has(p.categoryId)) {
    catMap.set(p.categoryId, { id: p.categoryId, name: p.category, count: 0 });
  }
  catMap.get(p.categoryId).count++;
}
const categories = [...catMap.values()].sort((a, b) =>
  a.name.localeCompare(b.name, "fi"),
);

const catalog = {
  recovered: new Date().toISOString().slice(0, 10),
  categories,
  products,
};

fs.writeFileSync(OUT, JSON.stringify(catalog));
console.log(
  `Wrote ${OUT}: ${products.length} products, ${categories.length} categories, ` +
    `${products.filter((p) => p.image).length} with images, ` +
    `${products.filter((p) => p.price != null).length} with price.`,
);
