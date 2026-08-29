import localFont from "next/font/local";

/**
 * Shared font declarations.
 *
 * Both root layouts (the locale segment and the lightweight fallback segment)
 * must expose the same font CSS variables, otherwise a client-side navigation
 * between them would re-resolve the font stack.
 *
 * The WOFF2 files are glyph-subsetted builds produced by
 * `scripts/subset-fonts.mjs`; see `public/fonts/LICENSES.txt` for notices.
 * Bricolage Grotesque is the display face, Noto Sans SC carries body copy and
 * CJK, and IBM Plex Mono is reserved for utility text and code.
 */
const display = localFont({
  src: [
    { path: "../../public/fonts/bricolage-grotesque-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/bricolage-grotesque-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/bricolage-grotesque-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/bricolage-grotesque-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const body = localFont({
  src: [
    { path: "../../public/fonts/noto-sans-sc-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/noto-sans-sc-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/noto-sans-sc-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/noto-sans-sc-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const mono = localFont({
  src: [
    { path: "../../public/fonts/ibm-plex-mono-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/ibm-plex-mono-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-code",
  display: "swap",
  preload: false,
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
export const bodyClassName = `${fontVariables} min-h-screen antialiased`;
