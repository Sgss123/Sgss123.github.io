/**
 * Builds the locally hosted, project-glyph-subsetted WOFF2 files in
 * `public/fonts`.
 *
 * The glyph set is derived from the shipped content (both message bundles,
 * every string literal in `src/`, and a base set of ASCII plus editorial
 * punctuation), so the fonts only carry glyphs this project can render.
 * Re-run this script after editing copy so newly introduced glyphs are
 * included:
 *
 *   node scripts/subset-fonts.mjs
 *
 * Requires `pyftsubset` from fonttools on PATH:
 *   uv tool install --index https://pypi.org/simple "fonttools[woff]"
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const outDir = join(root, "public/fonts");
const charsetFile = join(root, ".next/font-charset.txt");

/** Combined WOFF2 budget from the design brief, in bytes. */
const sizeBudget = 500 * 1024;

const pyftsubset = process.env.PYFTSUBSET ?? "pyftsubset";

/**
 * Base glyph set. Covers ASCII, the editorial punctuation used across the site
 * and the symbols rendered by the Lab experiments and filings.
 */
const baseCharacters = [
  " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  " ©«°·»¿×÷",
  "‐‑‒–—―‘’“”†‡•…′″‹›",
  "←↑→↓↔⇒−≤≥",
  "、。〈〉《》「」『』【】〔〕！＂＃％＆＇（）＊，．／：；？＠［］｛｝～",
  "￥",
].join("");

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function collectMessageStrings(value, sink) {
  if (typeof value === "string") sink.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectMessageStrings(item, sink));
  else if (value && typeof value === "object")
    Object.values(value).forEach((item) => collectMessageStrings(item, sink));
}

function collectCharacters() {
  const chunks = [baseCharacters];

  for (const file of readdirSync(join(root, "messages")).filter((name) => name.endsWith(".json"))) {
    const sink = [];
    collectMessageStrings(JSON.parse(readFileSync(join(root, "messages", file), "utf8")), sink);
    chunks.push(sink.join(""));
  }

  // String literals from application code: UI copy, code examples shown in the
  // Lab, and Tailwind class names. Latin-only noise is free to keep, and it
  // guarantees code samples render in the mono face.
  for (const file of walk(join(root, "src"))) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const source = readFileSync(file, "utf8");
    const literals = source.match(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g) ?? [];
    chunks.push(literals.map((literal) => literal.slice(1, -1)).join(""));
  }

  return [...new Set([...chunks.join("")])].sort().join("");
}

const jobs = [
  {
    family: "bricolage-grotesque",
    weights: [400, 500, 600, 700],
    source: (weight) =>
      `node_modules/@fontsource/bricolage-grotesque/files/bricolage-grotesque-latin-${weight}-normal.woff2`,
  },
  {
    family: "noto-sans-sc",
    weights: [400, 500, 600, 700],
    source: (weight) =>
      `node_modules/@fontsource/noto-sans-sc/files/noto-sans-sc-chinese-simplified-${weight}-normal.woff2`,
  },
  {
    family: "ibm-plex-mono",
    weights: [400, 500],
    source: (weight) =>
      `node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${weight}-normal.woff2`,
  },
];

/**
 * Writes `public/fonts/LICENSES.txt`. Every family here is SIL OFL 1.1, so the
 * notice carries per-family attribution followed by the full license text.
 */
function writeLicenseNotice() {
  const notices = jobs.map(({ family }) => {
    const manifest = JSON.parse(
      readFileSync(join(root, "node_modules/@fontsource", family, "package.json"), "utf8"),
    );
    const copyright = readFileSync(join(root, "node_modules/@fontsource", family, "LICENSE"), "utf8")
      .split("\n")
      .find((line) => line.trim().length > 0)
      .trim();
    return [`${family} (subsetted from @fontsource/${family} ${manifest.version})`, `  ${copyright}`, ""];
  });

  const ofl = readFileSync(join(root, "node_modules/@fontsource/noto-sans-sc/LICENSE"), "utf8")
    .split("\n")
    .slice(8)
    .join("\n")
    .trim();

  writeFileSync(
    join(outDir, "LICENSES.txt"),
    [
      "Font notices",
      "=============",
      "",
      "The WOFF2 files in this directory are glyph-subsetted builds produced by",
      "`scripts/subset-fonts.mjs`. They retain only the glyphs this site can render;",
      "the typeface designs themselves are unmodified.",
      "",
      ...notices.flat(),
      "",
      "All three families are licensed under the SIL Open Font License, Version 1.1.",
      "The full license text follows.",
      "",
      ofl,
      "",
    ].join("\n"),
  );
}

const characters = collectCharacters();
mkdirSync(outDir, { recursive: true });
mkdirSync(join(root, ".next"), { recursive: true });
writeFileSync(charsetFile, characters);
writeLicenseNotice();

console.log(`Glyph set: ${characters.length} unique characters`);
console.log(`CJK glyphs: ${[...characters].filter((c) => /[㐀-鿿]/.test(c)).length}\n`);

let total = 0;
const results = [];

for (const { family, weights, source } of jobs) {
  for (const weight of weights) {
    const input = join(root, source(weight));
    const output = join(outDir, `${family}-${weight}.woff2`);

    execFileSync(
      pyftsubset,
      [
        input,
        `--output-file=${output}`,
        "--flavor=woff2",
        `--text-file=${charsetFile}`,
        "--layout-features=*",
        "--no-hinting",
        "--desubroutinize",
        "--name-IDs=0,1,2,3,4,5,6,13,14",
        "--obfuscate-names",
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );

    const size = statSync(output).size;
    total += size;
    results.push({ file: basename(output), size });
    console.log(`${basename(output).padEnd(34)} ${(size / 1024).toFixed(1)} KB`);
  }
}

console.log(`\nTotal: ${(total / 1024).toFixed(1)} KB / ${(sizeBudget / 1024).toFixed(0)} KB budget`);

if (total > sizeBudget) {
  console.error(`\nFont budget exceeded by ${((total - sizeBudget) / 1024).toFixed(1)} KB.`);
  process.exit(1);
}
