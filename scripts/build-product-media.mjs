/**
 * Builds the responsive product media in `public/product-media`.
 *
 * Source PNGs in `scripts/product-media-sources/` are cropped to the
 * representative UI region, then emitted as AVIF and WebP at two widths with a
 * JPEG fallback. The `<picture>` element in `ProductMedia` serves AVIF where
 * supported, WebP next, and the JPEG last.
 *
 * Sources are full-page captures of the public product sites, taken at
 * 1440x900 with `scripts/capture-product-screens.mjs`.
 *
 * Usage:
 *   node scripts/build-product-media.mjs
 *
 * Requires `sharp`, which is not a runtime dependency of the site:
 *   npm i --no-save sharp
 */
import { mkdirSync, readdirSync, statSync } from "node:fs";
import { basename, join, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "scripts/product-media-sources");
const outDir = join(root, "public/product-media");

/** Output widths matching the rendered card sizes at 1x and 2x. */
const widths = [720, 1440];

/** The representative UI region, in source pixels (1440x900 capture). */
const crop = { left: 0, top: 0, width: 1440, height: 720 };

async function emit(image, slug, width) {
  const base = join(outDir, `${slug}-${width}`);

  await image
    .clone()
    .resize({ width })
    .avif({ quality: 62, effort: 6 })
    .toFile(`${base}.avif`);

  await image
    .clone()
    .resize({ width })
    .webp({ quality: 74, effort: 5 })
    .toFile(`${base}.webp`);

  await image
    .clone()
    .resize({ width })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(`${base}.jpg`);
}

mkdirSync(outDir, { recursive: true });

const sources = readdirSync(sourceDir)
  .filter((name) => name.endsWith(".png"))
  .sort();

if (sources.length === 0) {
  console.error(`No PNG sources found in ${sourceDir}`);
  process.exit(1);
}

let total = 0;

for (const name of sources) {
  const slug = basename(name, ".png");
  const image = sharp(join(sourceDir, name)).extract(crop);
  const { width, height } = await image.metadata();

  console.log(`${slug}: source ${width}x${height} -> crop ${crop.width}x${crop.height}`);

  for (const target of widths) {
    await emit(image.clone(), slug, target);
  }

  // A low-quality inline placeholder keeps the card from shifting on load.
  const placeholder = await image
    .clone()
    .resize({ width: 24 })
    .blur(1.2)
    .webp({ quality: 30 })
    .toBuffer();

  const bytes = Buffer.from(placeholder).toString("base64");
  console.log(`  placeholder: data:image/webp;base64,${bytes}`);

  for (const target of widths) {
    for (const ext of ["avif", "webp", "jpg"]) {
      total += statSync(join(outDir, `${slug}-${target}.${ext}`)).size;
    }
  }
}

console.log(`\nTotal product media: ${(total / 1024).toFixed(1)} KB`);
