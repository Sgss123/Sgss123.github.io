"use client";

import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { type Locale, localizePath } from "@/lib/routing";

const localeCookieMaxAge = 60 * 60 * 24 * 365;

function rememberLocale(locale: Locale) {
  // biome-ignore lint/suspicious/noDocumentCookie: This synchronous write must precede navigation.
  document.cookie = `WATERSPO_LOCALE=${locale}; Path=/; Max-Age=${localeCookieMaxAge}; SameSite=Lax`;
}

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("Common.language");

  return (
    <fieldset className="inline-flex items-center gap-1 text-xs">
      <legend className="sr-only">{t("label")}</legend>
      <NextLink
        href={localizePath("en", pathname)}
        onClick={() => rememberLocale("en")}
        aria-current={locale === "en" ? "true" : undefined}
        className={
          locale === "en"
            ? "font-semibold text-[var(--foreground)]"
            : "text-[var(--muted-foreground)]"
        }
      >
        {t("english")}
      </NextLink>
      <span aria-hidden="true" className="text-[var(--border-strong)]">
        /
      </span>
      <NextLink
        href={localizePath("zh", pathname)}
        onClick={() => rememberLocale("zh")}
        aria-current={locale === "zh" ? "true" : undefined}
        className={
          locale === "zh"
            ? "font-semibold text-[var(--foreground)]"
            : "text-[var(--muted-foreground)]"
        }
      >
        {t("chinese")}
      </NextLink>
    </fieldset>
  );
}
