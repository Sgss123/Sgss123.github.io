/**
 * HTTP smoke tests for a running dev or production server.
 *
 *   node scripts/smoke.mjs http://127.0.0.1:3000
 *
 * Covers the route contract that the static EdgeOne fallbacks depend on:
 * document language per locale, redirect behaviour for unprefixed paths,
 * legacy Lab redirects, canonical and hreflang tags, and the presence of the
 * redesigned home page sections.
 */
const base = (process.argv[2] ?? "http://127.0.0.1:3000").replace(/\/$/, "");

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${name}`);
    return;
  }
  failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  console.log(`  FAIL ${name}${detail ? ` — ${detail}` : ""}`);
}

async function get(path, redirect = "manual") {
  const response = await fetch(`${base}${path}`, { redirect });
  const body = await response.text();
  return { status: response.status, location: response.headers.get("location"), body };
}

function docLanguage(html) {
  return html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
}

function metaContent(html, name) {
  return html.match(new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"`))?.[1];
}

function linkHref(html, rel) {
  return html.match(new RegExp(`<link[^>]*rel="${rel}"[^>]*href="([^"]*)"`))?.[1];
}

// Next emits `hrefLang` and may place either attribute first, so match the
// link element first, then read both attributes out of it.
function alternateLanguages(html) {
  return [
    ...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g),
  ]
    .map(([tag]) => {
      const lang = tag.match(/\bhreflang="([^"]*)"/i)?.[1];
      const href = tag.match(/\bhref="([^"]*)"/i)?.[1];
      return lang && href ? `${lang}:${href}` : null;
    })
    .filter((value) => value !== null);
}

console.log(`\nSmoke testing ${base}\n`);

console.log("Routes");
for (const [path, expected] of [
  ["/", 200],
  ["/en", 307],
  ["/zh", 200],
  ["/services", 200],
  ["/zh/services", 200],
  ["/about", 200],
  ["/zh/about", 200],
  ["/contact", 200],
  ["/zh/contact", 200],
  ["/lab", 200],
  ["/zh/lab", 200],
]) {
  const { status } = await get(path);
  check(`${path} → ${expected}`, status === expected, `got ${status}`);
}

console.log("\nLab experiments");
for (const slug of ["ssr", "isr", "ssg", "streaming", "node-functions", "edge-functions"]) {
  const { status } = await get(`/lab/${slug}`);
  check(`/lab/${slug} → 200`, status === 200, `got ${status}`);
}

console.log("\nLegacy lab redirects");
for (const slug of ["ssr", "isr", "ssg", "streaming", "node-functions", "edge-functions"]) {
  const { status, location } = await get(`/${slug}`);
  const target = location?.replace(base, "");
  check(
    `/${slug} → 308 /lab/${slug}`,
    status === 308 && target === `/lab/${slug}`,
    `got ${status} ${target ?? ""}`,
  );
}

console.log("\nDocument language");
for (const [path, expected] of [
  ["/", "en"],
  ["/zh", "zh-CN"],
  ["/services", "en"],
  ["/zh/services", "zh-CN"],
  ["/about", "en"],
  ["/zh/about", "zh-CN"],
  ["/contact", "en"],
  ["/zh/contact", "zh-CN"],
  ["/lab", "en"],
  ["/zh/lab", "zh-CN"],
]) {
  const { body } = await get(path);
  check(`${path} lang="${expected}"`, docLanguage(body) === expected, `got ${docLanguage(body)}`);
}

console.log("\nCanonical and hreflang");
for (const [path, canonical, languages] of [
  ["/services", "/services", ["en:/services", "zh-CN:/zh/services", "x-default:/services"]],
  ["/zh/services", "/zh/services", ["en:/services", "zh-CN:/zh/services", "x-default:/services"]],
]) {
  const { body } = await get(path);
  check(`${path} canonical=${canonical}`, linkHref(body, "canonical") === canonical);
  check(
    `${path} hreflang set`,
    JSON.stringify(alternateLanguages(body).sort()) === JSON.stringify([...languages].sort()),
    alternateLanguages(body).join(" "),
  );
}

console.log("\nRuntime APIs");
for (const [path, runtime] of [
  ["/api/hello", "nodejs"],
  ["/api/edge", "edge"],
]) {
  const response = await fetch(`${base}${path}`);
  const body = await response.text();
  check(`${path} → 200`, response.status === 200, `got ${response.status}`);
  check(`${path} reports the ${runtime} runtime`, body.includes(`"runtime":"${runtime}"`));
}

console.log("\nTheme and accessibility");
{
  const { body } = await get("/");
  const themeColor = [...body.matchAll(/<meta[^>]*name="theme-color"[^>]*>/g)].length;
  check("theme-color declared for both schemes", themeColor >= 2, `found ${themeColor}`);
  check("skip link present", body.includes('class="skip-link"'));
  check("main landmark present", body.includes('<main id="main-content"'));
  check("footer navigation labelled", body.includes("Footer navigation") || body.includes("页脚导航"));
  check("lab navigation labelled", body.includes("Lab navigation") || body.includes("实验室导航"));
}

console.log("\nHome page structure");
{
  const { body } = await get("/");
  check("brand thesis heading", body.includes("Independent ideas. Deliberate software."));
  check("products section", body.includes('id="products"'));
  check("product screenshots", body.includes("/product-media/bridge-720.avif"));
  check("lab proof band", body.includes("signal-band"));
  check("email CTA", body.includes("mailto:support@waterspo.top"));
}

console.log("\nChinese home page");
{
  const { body } = await get("/zh");
  check("localized thesis", body.includes("独立思考，审慎构建。"));
  check("localized alt text", body.includes("Waterspo Bridge 统一多模型"));
  check("ICP filing", body.includes("粤ICP备2026106743号"));
  check("police filing", body.includes("粤公网安备44010502004250号"));
}

console.log("\nContact page");
{
  const { body } = await get("/contact");
  check("clickable mailto", body.includes('href="mailto:support@waterspo.top"'));
  check("copy button", body.includes("复制") === false && body.includes("Copy email address"));
  check("polite live region", body.includes('aria-live="polite"'));
}

console.log(`\n${passed} passed, ${failures.length} failed`);

if (failures.length > 0) {
  console.error("\nFailures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
