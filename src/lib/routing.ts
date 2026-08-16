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
