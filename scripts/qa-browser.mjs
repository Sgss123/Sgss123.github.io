/**
 * Real-browser QA pass over a running dev or production server.
 *
 *   CHROME_PATH=… node scripts/qa-browser.mjs http://127.0.0.1:3000
 *
 * Exercises the interactions that static checks cannot: theme persistence,
 * locale navigation, the mobile menu, reduced-motion behaviour, and the
 * contact copy button. Screenshots land in `.next/qa/`.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { chromium } from "playwright-core";

const base = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const root = resolve(import.meta.dirname, "..");
const outDir = join(root, ".next/qa");

const executablePath = process.env.CHROME_PATH;
if (!executablePath) {
  console.error("CHROME_PATH must point at a Chromium executable.");
  process.exit(1);
}

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

/**
 * Set `QA_SKIP_SHOTS=1` to run only the interaction checks. Full-page
 * screenshots across every viewport, theme and locale are slow and are usually
 * only needed when reviewing visual output.
 */
const captureScreens = process.env.QA_SKIP_SHOTS !== "1";

const results = [];
function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? "ok  " : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
}

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  executablePath,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

try {
  // --- Responsive screenshots across themes -------------------------------
  for (const viewport of viewports) {
    for (const theme of ["light", "dark"]) {
      for (const locale of ["", "/zh"]) {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          colorScheme: theme,
          deviceScaleFactor: 1,
        });
        const page = await context.newPage();
        for (const path of ["/", "/services", "/about", "/contact", "/lab"]) {
          const response = await page.goto(`${base}${locale}${path}`, {
            waitUntil: "load",
            timeout: 45000,
          });
          const slug = `${viewport.name}-${theme}${locale || "-en"}${path === "/" ? "-home" : path.replaceAll("/", "-")}`;
          if (captureScreens) {
            await page.screenshot({ path: join(outDir, `${slug}.png`), fullPage: true });
          }

          const status = response?.status() ?? 0;
          record(`${slug} loads (${status})`, status === 200, `status ${status}`);

          // Horizontal overflow is the most common responsive defect.
          const overflow = await page.evaluate(
            () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
          );
          record(`${slug} has no horizontal overflow`, overflow <= 1, `${overflow}px`);
        }
        await context.close();
      }
    }
  }

  // --- Theme persistence --------------------------------------------------
  // The interaction checks use the `/en` prefix explicitly: the next-intl proxy
  // negotiates a locale from `Accept-Language`, and headless Chromium reports
  // the system locale, so `/` may serve either language.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "load" });

    // The header and footer each render a switcher, so scope to the header.
    await page.getByRole("button", { name: /^dark$/i }).first().click();
    await page.waitForTimeout(300);
    const darkApplied = await page.evaluate(() => document.documentElement.classList.contains("dark"));
    record("dark theme applies to <html>", darkApplied);

    await page.reload({ waitUntil: "load" });
    await page.waitForTimeout(300);
    const persisted = await page.evaluate(() =>
      document.documentElement.classList.contains("dark"),
    );
    record("dark theme persists across reload", persisted);
    await context.close();
  }

  // --- Locale navigation --------------------------------------------------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${base}/en/services`, { waitUntil: "load" });

    await page.getByRole("link", { name: "中文" }).first().click();
    await page.waitForURL(/\/zh\/services/, { timeout: 15000 });
    const lang = await page.evaluate(() => document.documentElement.lang);
    record("switching language navigates to /zh/services", page.url().includes("/zh/services"));
    record("Chinese document declares lang=zh-CN", lang === "zh-CN", lang);
    await context.close();
  }

  // --- Mobile menu --------------------------------------------------------
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "load" });

    const toggle = page.getByRole("button", { name: /open navigation/i });
    await toggle.click();
    await page.waitForTimeout(200);
    record("mobile menu opens", await page.getByRole("button", { name: /close navigation/i }).isVisible());

    await page.keyboard.press("Escape");
    await page.waitForTimeout(200);
    const stillOpen = await page.getByRole("button", { name: /close navigation/i }).isVisible();
    record("Escape closes the mobile menu", !stillOpen);

    const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-controls"));
    record("focus returns to the toggle", focused === "mobile-navigation", String(focused));

    await toggle.click();
    await page.waitForTimeout(200);
    await page.locator("#mobile-navigation").getByRole("link", { name: /^About$/i }).click();
    await page.waitForURL(/\/about/, { timeout: 15000 });
    const menuClosed = !(await page.getByRole("button", { name: /close navigation/i }).isVisible());
    record("menu closes after navigating", menuClosed);
    await context.close();
  }

  // --- Contact copy button + live region ----------------------------------
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      permissions: ["clipboard-read", "clipboard-write"],
    });
    const page = await context.newPage();
    await page.goto(`${base}/en/contact`, { waitUntil: "load" });

    await page.getByRole("button", { name: /copy email/i }).click();
    await page.waitForTimeout(400);
    const announced = await page.getByText(/copied to the clipboard/i).isVisible();
    record("copy announces through the live region", announced);

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    record("clipboard holds the support address", clipboard === "support@waterspo.top", clipboard);
    await context.close();
  }

  // --- Reduced motion -----------------------------------------------------
  {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "load" });
    await page.waitForTimeout(600);

    const animated = await page.evaluate(() => {
      const field = document.querySelector(".signal-field");
      if (!field) return "no-field";
      const line = field.querySelector(".signal-line");
      return line ? getComputedStyle(line).strokeDasharray : "no-line";
    });
    record(
      "reduced motion renders solid traces",
      animated === "none" || animated === "no-field" || animated === "no-line",
      String(animated),
    );
    await context.close();
  }

  // --- Signal field entrance ----------------------------------------------
  // Regression guard: the entrance must settle on "complete" and stay there.
  // An earlier build re-armed the activation effect on completion and looped
  // between "drawing" and "complete" forever.
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "load" });

    const samples = [];
    for (let index = 0; index < 6; index += 1) {
      await page.waitForTimeout(400);
      samples.push(
        await page.evaluate(() => document.querySelector(".signal-field")?.dataset.state ?? "none"),
      );
    }
    const settled = samples.slice(2).every((sample) => sample === "complete");
    record("signal field entrance settles on complete", settled, samples.join(" > "));

    const dash = await page.evaluate(() => {
      const line = document.querySelector(".signal-field .signal-line");
      return line ? getComputedStyle(line).strokeDasharray : "none";
    });
    record("completed traces are solid", dash === "none", dash);

    // Pointer parallax writes custom properties and resets on leave.
    const field = page.locator(".signal-field").first();
    const box = await field.boundingBox();
    await page.mouse.move(box.x + box.width * 0.8, box.y + box.height * 0.3, { steps: 5 });
    await page.waitForTimeout(400);
    const shift = await page.evaluate(() =>
      document.querySelector(".signal-field").style.getPropertyValue("--signal-shift-x"),
    );
    record("pointer parallax responds", shift !== "" && shift !== "0px", shift || "(unset)");

    await page.mouse.move(5, 5, { steps: 3 });
    await page.waitForTimeout(400);
    const reset = await page.evaluate(() =>
      document.querySelector(".signal-field").style.getPropertyValue("--signal-shift-x"),
    );
    record("pointer parallax resets on leave", reset === "0px", reset);
    await context.close();
  }

  // --- Accessibility snapshot --------------------------------------------
  {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(`${base}/en`, { waitUntil: "load" });

    const headings = await page.evaluate(() =>
      [...document.querySelectorAll("h1, h2, h3")].map((node) => `${node.tagName}:${node.textContent?.trim()}`),
    );
    const h1Count = headings.filter((heading) => heading.startsWith("H1")).length;
    record("exactly one h1 per page", h1Count === 1, `found ${h1Count}`);

    const missingAlt = await page.evaluate(
      () => [...document.querySelectorAll("img")].filter((img) => !img.getAttribute("alt")).length,
    );
    record("every image has alt text", missingAlt === 0, `${missingAlt} missing`);

    const landmarks = await page.evaluate(() => ({
      header: document.querySelectorAll("header").length,
      main: document.querySelectorAll("main").length,
      footer: document.querySelectorAll("footer").length,
    }));
    record(
      "landmarks are present once each",
      landmarks.header === 1 && landmarks.main === 1 && landmarks.footer === 1,
      JSON.stringify(landmarks),
    );

    // Tab order should reach the skip link first.
    await page.keyboard.press("Tab");
    const firstStop = await page.evaluate(() => document.activeElement?.textContent?.trim());
    const skipIsFirst = await page.evaluate(
      () => document.activeElement?.classList.contains("skip-link") ?? false,
    );
    record("skip link is the first tab stop", skipIsFirst, String(firstStop));
    await context.close();
  }
} finally {
  await browser.close();
}

const failed = results.filter((result) => !result.ok);
const summary = {
  base,
  total: results.length,
  passed: results.length - failed.length,
  failed: failed.length,
  failures: failed,
};
writeFileSync(join(outDir, "report.json"), `${JSON.stringify(summary, null, 2)}\n`);

console.log(`\n${summary.passed} passed, ${summary.failed} failed`);
console.log(`Screenshots: ${outDir}`);

if (failed.length > 0) process.exit(1);
