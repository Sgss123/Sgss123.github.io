import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductCard } from "@/components/product/ProductCard";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
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

      {/* Products first */}
      <section className="editorial-section mt-0 border-t-0 pt-4">
        <div className="site-container">
          <div className="editorial-grid mb-10">
            <div>
              <SectionHeading className="text-display-lg">{t("products.title")}</SectionHeading>
            </div>
            <p className="editorial-lead">{t("products.intro")}</p>
          </div>

          <div className="grid gap-12">
            {PRODUCT_ITEMS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                title={t(product.titleKey)}
                description={t(product.descriptionKey)}
                kind={t(product.kindKey)}
                alt={t(product.media.altKey)}
                visit={t("products.visit")}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services underneath */}
      <section className="editorial-section">
        <div className="site-container">
          <div className="editorial-grid mb-10">
            <div>
              <SectionHeading className="text-display-lg">{t("items.title")}</SectionHeading>
            </div>
            <p className="editorial-lead">{t("items.intro")}</p>
          </div>

          <ol>
            {SERVICE_ITEMS.map((service, index) => (
              <li
                key={service.id}
                className="grid gap-5 border-t border-[var(--border)] py-10 last:border-b md:grid-cols-[6rem_0.9fr_1.1fr] md:items-start"
              >
                <span className="editorial-index text-3xl">0{index + 1}.</span>
                <h3 className="font-display text-display-md">{t(service.titleKey)}</h3>
                <p className="max-w-xl leading-7 text-[var(--muted-foreground)]">
                  {t(service.descriptionKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
