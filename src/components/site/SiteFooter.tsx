import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export async function SiteFooter() {
  const t = await getTranslations("Common");
  const locale = await getLocale();

  // Lab is secondary navigation, so it lives here rather than in the header.
  const labNav = (
    <nav className="grid content-start gap-1 text-sm" aria-label={t("labNavLabel")}>
      <Link href="/lab" className="flex min-h-11 items-center">
        {t("nav.lab")}
      </Link>
    </nav>
  );

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="site-container grid gap-8 py-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] md:py-5">
        <div>
          <Logo />
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">{t("footer.rights")}</p>
        </div>

        <nav className="grid content-start gap-1 text-sm" aria-label={t("footerNavLabel")}>
          <Link href="/" className="flex min-h-11 items-center">
            {t("nav.home")}
          </Link>
          <Link href="/services" className="flex min-h-11 items-center">
            {t("nav.services")}
          </Link>
          <Link href="/about" className="flex min-h-11 items-center">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="flex min-h-11 items-center">
            {t("nav.contact")}
          </Link>
        </nav>

        {labNav}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            <a
              href={`mailto:${t("footer.email")}`}
              className="wrap-anywhere break-words underline decoration-[var(--accent)] decoration-1 underline-offset-4 hover:text-[var(--foreground)]"
            >
              {t("footer.email")}
            </a>
          </div>
        </div>
      </div>

      {locale === "zh" && (
        <div className="site-container border-t border-[var(--border)] py-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--muted-foreground)]">
            <a
              href={t("footer.icpHref")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] hover:underline"
            >
              {t("footer.icp")}
            </a>
            <a
              href={t("footer.policeHref")}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--foreground)] hover:underline"
            >
              {t("footer.police")}
            </a>
          </div>
        </div>
      )}
    </footer>
  );
}
