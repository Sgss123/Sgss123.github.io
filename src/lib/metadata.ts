import type { Metadata, Viewport } from "next";
import { type Locale, localizePath } from "./routing";

/**
 * Site-level metadata shared by both root layouts, so the statically
 * prerendered fallback documents keep the same title template and icon.
 */
export const siteMetadata: Metadata = {
  title: {
    default: "Waterspo Studio",
    template: "%s · Waterspo Studio",
  },
  description: "SaaS platforms, website operations and software development.",
  icons: { icon: "/waterspo-mark.svg" },
};

/**
 * Browser UI chrome follows the active theme. The `prefers-color-scheme`
 * entries let a system-mode visitor get matching chrome without any script;
 * `next-themes` swaps the `class` attribute but not this tag, so both schemes
 * are declared and the browser picks one.
 */
export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7e8c1" },
    { media: "(prefers-color-scheme: dark)", color: "#262d32" },
  ],
};

export function buildPageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: localizePath(locale, path),
      languages: {
        en: localizePath("en", path),
        "zh-CN": localizePath("zh", path),
        "x-default": localizePath("en", path),
      },
    },
    openGraph: {
      title,
      description,
      siteName: "Waterspo Studio",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type: "website",
    },
  };
}
