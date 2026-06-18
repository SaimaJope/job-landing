/* Screenshot helper for design review. Usage: node scripts/shoot.cjs */
const path = require("path");
const puppeteer = require("puppeteer-core");

const EDGE = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const BASE = "http://localhost:4173/";
const OUT = path.join(__dirname, "..", ".shots");

const sections = [
  "palvelut",
  "yritys",
  "toteutus",
  "toiminta-alue",
  "yhteystiedot",
];

async function settle(page, ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch({
    executablePath: EDGE,
    headless: "new",
    args: ["--disable-gpu", "--hide-scrollbars"],
  });

  // desktop
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950 });
  await page.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await settle(page, 2500);
  await page.screenshot({ path: path.join(OUT, "d-hero.png") });

  for (const id of sections) {
    await page.evaluate((sectionId) => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "instant", block: "start" });
      window.scrollBy(0, -40);
    }, id);
    await settle(page, 1600);
    await page.screenshot({ path: path.join(OUT, `d-${id}.png`) });
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await settle(page, 1600);
  await page.screenshot({ path: path.join(OUT, "d-footer.png") });

  // mobile
  const mob = await browser.newPage();
  await mob.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await mob.goto(BASE, { waitUntil: "networkidle0", timeout: 60000 });
  await settle(mob, 2500);
  await mob.screenshot({ path: path.join(OUT, "m-hero.png") });

  await mob.evaluate(() => {
    document.getElementById("palvelut")?.scrollIntoView({ behavior: "instant" });
  });
  await settle(mob, 1600);
  await mob.screenshot({ path: path.join(OUT, "m-palvelut.png") });

  await mob.evaluate(() => {
    document.getElementById("yhteystiedot")?.scrollIntoView({ behavior: "instant" });
  });
  await settle(mob, 1600);
  await mob.screenshot({ path: path.join(OUT, "m-yhteys.png") });

  // mobile menu open
  await mob.evaluate(() => window.scrollTo(0, 0));
  await settle(mob, 600);
  await mob.click('button[aria-label="Avaa valikko"]');
  await settle(mob, 900);
  await mob.screenshot({ path: path.join(OUT, "m-menu.png") });

  await browser.close();
  console.log("done");
})();
