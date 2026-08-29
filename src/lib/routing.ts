export type Locale = "en" | "zh";

export const locales = ["en", "zh"] as const;
export const defaultLocale: Locale = "en";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/zh") return "/";
  if (pathname.startsWith("/zh/")) return pathname.slice(3) || "/";
  return pathname || "/";
}

export function localizePath(locale: Locale, pathname: string): string {
  const unprefixed = stripLocalePrefix(pathname);
  if (locale === "en") return unprefixed;
  return unprefixed === "/" ? "/zh" : `/zh${unprefixed}`;
}

/**
 * BCP 47 document languages keyed by application locale.
 *
 * The value is resolved from the `[locale]` route parameter at render time, so
 * production HTML carries the correct `lang` attribute without reading request
 * headers or cookies. That keeps locale documents statically renderable on
 * hosts that do not execute the next-intl proxy.
 */
export const documentLanguages: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
};

/** Fallback documents (`/` and unprefixed English redirects) are English. */
export const fallbackDocumentLanguage = "en";

export function getDocumentLanguage(locale: Locale): string {
  return documentLanguages[locale];
}
