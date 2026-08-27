import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/PageIntro";
import { PRODUCT_ITEMS, SERVICE_ITEMS } from "@/lib/content";
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
              className="grid gap-5 border-b border-(--border) py-10 last:border-0 md:grid-cols-[6rem_0.9fr_1.1fr] md:items-start"
            >
              <span className="font-display text-3xl text-(--accent-text)">0{index + 1}.</span>
              <h2 className="font-display text-4xl leading-none md:text-5xl">
                {t(service.titleKey)}
              </h2>
              <p className="max-w-xl leading-7 text-(--muted-foreground)">
                {t(service.descriptionKey)}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="border-t border-(--border) bg-surface">
        <div className="site-container py-8 md:py-14">
          <h2 className="font-display text-4xl leading-none md:text-5xl">{t("products.title")}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-(--muted-foreground)">
            {t("products.intro")}
          </p>
          <ol className="mt-8 grid gap-5 md:grid-cols-2">
            {PRODUCT_ITEMS.map((product, index) => (
              <li key={product.id} className="border border-(--border) p-6">
                <span className="font-display text-xl text-(--accent-text)">0{index + 1}.</span>
                <h3 className="mt-5 font-display text-3xl leading-none">{t(product.titleKey)}</h3>
                <p className="mt-4 leading-7 text-(--muted-foreground)">
                  {t(product.descriptionKey)}
                </p>
                <Button asChild variant="outline" className="mt-6">
                  <a href={product.href} target="_blank" rel="noreferrer">
                    {t("products.visit")} <ArrowUpRight className="size-4" />
                  </a>
                </Button>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
