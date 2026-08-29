# Waterspo Studio Portal

The bilingual corporate portal for Waterspo Studio (幄特斯普工作室), built with Next.js 16, React, TypeScript and Tailwind CSS.

## Features

- English routes at `/` and Chinese routes under `/zh`, with a statically prerendered fallback for hosts that do not run the proxy
- Correct `lang` attribute on every document, including the redirect fallbacks
- Signal-editorial design system: cream / slate / signal-red tokens, semantic CSS variables and a glyph-subsetted local font stack
- `SignalField`, an SVG motion primitive with scroll-triggered line drawing, pointer parallax and a reduced-motion-safe static state
- Product pages with responsive AVIF / WebP / JPEG screenshots
- Light, dark and system color themes
- Reusable editorial UI and site components
- Services, about, contact and technology lab pages
- Working SSR, ISR, SSG, Streaming, Node Function and Edge Function experiments

## Development

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Verification

```bash
pnpm lint          # biome check
pnpm test          # node --test over src/lib
pnpm build
```

Against a running dev or production server:

```bash
pnpm smoke http://127.0.0.1:3000     # HTTP route, language and metadata contract
```

Real-browser pass (requires `CHROME_PATH`, e.g. a Playwright-managed Chromium):

```bash
CHROME_PATH=$HOME/.cache/ms-playwright/chromium-*/chrome-linux64/chrome \
  node scripts/qa-browser.mjs http://127.0.0.1:3000
```

Set `QA_SKIP_SHOTS=1` to skip the full-page screenshots and run only the
interaction checks.

## Fonts and media

Fonts and product screenshots are built from sources in this repository, not
installed at request time.

```bash
node scripts/subset-fonts.mjs        # -> public/fonts
node scripts/capture-product-screens.mjs   # re-capture the live product sites
node scripts/build-product-media.mjs # -> public/product-media
```

`scripts/subset-fonts.mjs` needs `pyftsubset`:

```bash
uv tool install --index https://pypi.org/simple "fonttools[woff]"
```

Notices for the bundled typefaces live in `public/fonts/LICENSES.txt`; source
attribution for the screenshots is in `public/product-media/README.md`.
