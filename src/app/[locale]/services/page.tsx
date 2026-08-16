import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/ui/PageIntro";
import { SERVICE_ITEMS } from "@/lib/content";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return buildPageMetadata(locale, "/services", t("metadataTitle"), t("metadataDescription"));
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <section className="site-container py-8 md:py-14">
        <ol>
          {SERVICE_ITEMS.map((service, index) => (
            <li
              key={service.id}
              className="grid gap-5 border-b border-[var(--border)] py-10 last:border-0 md:grid-cols-[6rem_0.9fr_1.1fr] md:items-start"
            >
              <span className="font-display text-3xl text-[var(--accent-text)]">0{index + 1}.</span>
              <h2 className="font-display text-4xl leading-none md:text-5xl">
                {t(service.titleKey)}
              </h2>
              <p className="max-w-xl leading-7 text-[var(--muted-foreground)]">
                {t(service.descriptionKey)}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
