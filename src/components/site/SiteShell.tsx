import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export async function SiteShell({ children }: { children: ReactNode }) {
  const t = await getTranslations("Common");
  const mainId = "main-content";

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a href={`#${mainId}`} className="skip-link">
        {t("skipToContent")}
      </a>
      <SiteHeader />
      <main id={mainId} tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
