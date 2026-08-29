/**
 * Captures the public product sites into `scripts/product-media-sources/`.
 *
 * Only publicly visible pages are captured: the marketing front page of each
 * product, with no authenticated areas or account data. Chromium must be
 * reachable via `CHROME_PATH`, for example a Playwright-managed build:
 *
 *   CHROME_PATH=$HOME/.cache/ms-playwright/chromium-*/chrome-linux64/chrome \
 *     node scripts/capture-product-screens.mjs
 *
 * Run `node scripts/build-product-media.mjs` afterwards to encode the output.
 */
import { mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { chromium } from "playwright-core";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "scripts/product-media-sources");

const targets = [
  { slug: "bridge", url: "https://ai.waterspo.top/", settle: 4000 },
  { slug: "sentence-gymnasium", url: "https://sentencegym.waterspo.top/zh-hans", settle: 4000 },
];

const executablePath = process.env.CHROME_PATH;
if (!executablePath) {
  console.error("CHROME_PATH must point at a Chromium executable.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  for (const { slug, url, settle } of targets) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    // Let client-rendered content settle before capturing.
    await page.waitForTimeout(settle);
    await page.screenshot({ path: join(outDir, `${slug}.png`), fullPage: false });
    console.log(`${slug}: ${await page.title()}`);
    await page.close();
  }
} finally {
  await browser.close();
}
