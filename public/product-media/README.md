# Product media

Screenshots of the two publicly launched Waterspo products, used on the home
and services pages.

## Sources

| File | Product | Public URL | Captured |
|---|---|---|---|
| `bridge-*` | Waterspo Bridge | <https://ai.waterspo.top> | 2026-08-29 |
| `sentence-gymnasium-*` | SentenceGymnasium | <https://sentencegym.waterspo.top> | 2026-08-29 |

Both captures are full-page screenshots of the public, publicly accessible
product sites taken at 1440x900 and cropped to the top 1440x720 region, which
shows the representative UI: navigation, hero, and the first content band. No
authenticated areas, account data, or personal information are included.

## Generation

Sources live in `scripts/product-media-sources/`. To refresh:

```bash
node scripts/capture-product-screens.mjs   # re-capture from the live sites
node scripts/build-product-media.mjs       # crop, resize and encode
```

Output per product and width (`720`, `1440`):

- `.avif` — served first, best compression
- `.webp` — served where AVIF is unsupported
- `.jpg` — universal fallback

The inline placeholders embedded in `src/lib/content.ts` are produced by the
same script; update `BRIDGE_PLACEHOLDER` / `SENTENCE_GYMNASIUM_PLACEHOLDER`
whenever the sources change.

## Licensing

The screenshots depict Waterspo's own products. Product names, logos and
interface designs remain the property of their respective owners; the images are
used here for identification of the products described on this site.
