import { getLocale, getTranslations } from "next-intl/server";
import { Logo } from "@/components/ui/Logo";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

export async function SiteFooter() {
  const t = await getTranslations("Common");
  const locale = await getLocale();

  return (
    <footer className="border-t border-[var(--border)]">
      <div className="site-container grid gap-8 py-6 md:grid-cols-[1.2fr_0.7fr_0.9fr_1fr] md:py-5">
        <div>
          <Logo />
          <p className="mt-3 text-xs text-[var(--muted-foreground)]">{t("footer.rights")}</p>
        </div>
        <nav className="grid content-start gap-2 text-sm" aria-label={t("menu.open")}>
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/services">{t("nav.services")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
        </nav>
        <nav className="grid content-start gap-2 text-sm" aria-label={t("nav.lab")}>
          <Link href="/lab">{t("nav.lab")}</Link>
          <Link href="/contact">{t("nav.contact")}</Link>
        </nav>
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
          <div className="text-sm text-[var(--muted-foreground)]">
            <p className="italic">{t("footer.email")}</p>
            <p className="text-xs">({t("footer.placeholder")})</p>
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
