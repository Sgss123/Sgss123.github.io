import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/ui/PageIntro";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildPageMetadata(locale, "/contact", t("metadataTitle"), t("metadataDescription"));
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <section className="site-container py-16 md:py-28">
        <div className="grid gap-5 border-y border-[var(--border)] py-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="font-display text-4xl italic text-[var(--foreground)] md:text-6xl">
              {t("email")}
            </p>
          </div>
          <span className="size-3 bg-[var(--accent)]" aria-hidden="true" />
        </div>
      </section>
    </>
  );
}
