import type { Metadata } from "next";
import { type Locale, localizePath } from "./routing";

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
