import { chromium } from "playwright";
import { pathToFileURL } from "node:url";

const html = pathToFileURL("/workspace/.grok/og-card.html").href;
const out = "/workspace/.grok/og-card-raw.png";
const fav16 = "/workspace/.grok/favicon-16.png";
const fav32 = "/workspace/.grok/favicon-32.png";
const favSvg = pathToFileURL("/workspace/.grok/favicon.svg").href;

const browser = await chromium.launch({ args: ["--allow-file-access-from-files"] });

const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 2,
});
await page.goto(html, { waitUntil: "networkidle" });
await page.waitForTimeout(200);
await page.screenshot({ path: out, type: "png" });

async function rasterFav(size, dest) {
  const p = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await p.setContent(
    `<html><body style="margin:0;background:transparent">
      <img src="${favSvg}" width="${size}" height="${size}" style="display:block">
     </body></html>`,
    { waitUntil: "load" },
  );
  await p.screenshot({ path: dest, type: "png", omitBackground: true });
  await p.close();
}

await rasterFav(16, fav16);
await rasterFav(32, fav32);
await browser.close();
console.log("wrote", out, fav16, fav32);
