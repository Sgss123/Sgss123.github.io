"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeSwitcher } from "./ThemeSwitcher";

/**
 * Main navigation. Lab is deliberately secondary: it lives in the footer, so
 * the header stays focused on the commercial path.
 */
const navItems = [
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Common");
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Return focus to the trigger so keyboard users are not stranded at the
    // end of the document once the panel unmounts.
    toggleRef.current?.focus();
  }, []);

  // Escape closes the menu from anywhere inside it.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      close();
    };

    panelRef.current?.addEventListener("keydown", onKeyDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      panelRef.current?.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  // Close on route change so the panel never covers the new page, for example
  // when the language switch navigates from inside the open menu. Unlike
  // `close()` this does not move focus, which belongs to the new document.
  useEffect(() => {
    if (pathname) setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background-translucent)] backdrop-blur-xl">
      <div className="site-container flex min-h-21 items-center justify-between gap-6 py-3">
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
          ref={toggleRef}
          type="button"
          className="inline-grid size-11 place-items-center rounded-[4px] border border-[var(--border)] lg:hidden"
          onClick={() => (open ? close() : setOpen(true))}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? t("menu.close") : t("menu.open")}
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-navigation"
          ref={panelRef}
          className="border-t border-[var(--border)] bg-[var(--background)] lg:hidden"
        >
          <div className="site-container py-5">
            <nav className="grid" aria-label={t("navLabel")}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-11 items-center border-b border-[var(--border)] text-lg last:border-0"
                  onClick={close}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <Link
                href="/lab"
                aria-current={isActive("/lab") ? "page" : undefined}
                className="flex min-h-11 items-center text-base text-[var(--muted-foreground)]"
                onClick={close}
              >
                {t("nav.lab")}
              </Link>
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
