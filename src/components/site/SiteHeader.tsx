"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navItems = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/lab", key: "lab" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Common");

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background-translucent)] backdrop-blur-xl">
      <div className="site-container flex h-[84px] items-center justify-between gap-6">
        <Link href="/" aria-label={t("brand")} className="shrink-0">
          <Logo compact />
        </Link>

        <nav aria-label={t("navLabel")} className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="nav-link"
              data-active={isActive(item.href)}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <span className="h-7 w-px bg-[var(--border)]" aria-hidden="true" />
          <ThemeSwitcher />
        </div>

        <button
          type="button"
          className="inline-grid size-10 place-items-center rounded-[4px] border border-[var(--border)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? t("menu.close") : t("menu.open")}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
        >
          <div className="site-container py-5">
            <nav className="grid" aria-label={t("navLabel")}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="border-b border-[var(--border)] py-3 text-lg last:border-0"
                  onClick={() => setOpen(false)}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </nav>
            <div className="mt-5 flex items-center justify-between border-t border-[var(--border)] pt-5">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
