import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignalField } from "@/components/motion/SignalField";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { PRODUCT_ITEMS, SERVICE_ITEMS } from "@/lib/content";
import { LAB_EXPERIMENTS } from "@/lib/lab";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildPageMetadata(locale, "/", t("metadataTitle"), t("metadataDescription"));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const common = await getTranslations("Common.actions");
  // Product and service copy is translated once under `Services` and shared.
  const services = await getTranslations("Services");
  const lab = await getTranslations("Lab.experiments");

  return (
    <>
      {/* 1. Brand thesis */}
      <section className="editorial-section border-t-0 pt-10 md:pt-16">
        <div className="site-container editorial-grid items-center">
          <div>
            <p className="editorial-eyebrow">{t("thesis.eyebrow")}</p>
            <SectionHeading as="h1" className="text-display-xl mt-4 max-w-[46rem]">
              {t("thesis.title")}
            </SectionHeading>
            <p className="editorial-lead mt-6">{t("thesis.description")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#products" className="editorial-link">
                {common("viewProducts")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <Link href="/lab" className="editorial-link">
                {common("visitLab")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="order-first md:order-none">
            <SignalField variant="hero" activateOnScroll={false} />
          </div>
        </div>
      </section>

      {/* 2. Two products */}
      <section id="products" className="editorial-section scroll-mt-24">
        <div className="site-container">
          <div className="editorial-grid mb-10">
            <div>
              <p className="editorial-eyebrow">{t("products.eyebrow")}</p>
              <SectionHeading className="text-display-lg mt-3">
                {t("products.title")}
              </SectionHeading>
            </div>
            <p className="editorial-lead">{t("products.intro")}</p>
          </div>

          <div className="grid gap-12">
            {PRODUCT_ITEMS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                title={services(product.titleKey)}
                description={services(product.descriptionKey)}
                kind={services(product.kindKey)}
                alt={services(product.media.altKey)}
                visit={services("products.visit")}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Capabilities */}
      <section className="editorial-section">
        <div className="site-container">
          <div className="editorial-grid mb-10">
            <div>
              <p className="editorial-eyebrow">{t("capabilities.eyebrow")}</p>
              <SectionHeading className="text-display-lg mt-3">
                {t("capabilities.title")}
              </SectionHeading>
            </div>
            <p className="editorial-lead">{services("intro")}</p>
          </div>
          <ol className="grid gap-px border-t border-[var(--border)] md:grid-cols-3">
            {SERVICE_ITEMS.map((service, index) => (
              <li
                key={service.id}
                className="border-b border-[var(--border)] py-8 md:border-r md:border-b-0 md:pr-8 md:last:border-r-0"
              >
                <span className="editorial-index text-3xl">0{index + 1}.</span>
                <h3 className="font-display text-display-sm mt-4">{services(service.titleKey)}</h3>
                <p className="mt-3 max-w-sm leading-7 text-[var(--muted-foreground)]">
                  {services(service.descriptionKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. Lab proof, on the inverted signal band */}
      <section className="editorial-section signal-band">
        <div className="site-container editorial-grid items-center">
          <div>
            <p className="editorial-eyebrow">{t("lab.eyebrow")}</p>
            <SectionHeading className="text-display-lg mt-3">{t("lab.title")}</SectionHeading>
            <p className="editorial-lead mt-4">{t("lab.description")}</p>
            <Link href="/lab" className="editorial-link mt-6">
              {t("lab.view")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <SignalField variant="band" />
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-[var(--muted-foreground)]">
              {LAB_EXPERIMENTS.map((experiment) => (
                <li key={experiment.slug} className="flex items-center gap-2">
                  <span className="size-1.5 shrink-0 bg-[var(--accent)]" aria-hidden="true" />
                  {lab(experiment.titleKey)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Studio statement */}
      <section className="editorial-section">
        <div className="site-container editorial-grid">
          <div>
            <p className="editorial-eyebrow">{t("studio.eyebrow")}</p>
            <SectionHeading className="text-display-md mt-3">{t("studio.title")}</SectionHeading>
          </div>
          <div>
            <p className="editorial-lead">{t("studio.description")}</p>
            <Link href="/about" className="editorial-link mt-6">
              {common("aboutStudio")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Email CTA */}
      <section className="editorial-section border-b border-[var(--border)]">
        <div className="site-container editorial-grid items-end">
          <div>
            <p className="editorial-eyebrow">{t("cta.eyebrow")}</p>
            <SectionHeading className="text-display-lg mt-3">{t("cta.title")}</SectionHeading>
          </div>
          <div>
            <p className="editorial-lead">{t("cta.description")}</p>
            <div className="mt-6">
              <a
                href="mailto:support@waterspo.top"
                className="font-display wrap-anywhere text-display-md break-words underline decoration-[var(--accent)] decoration-1 underline-offset-[0.18em]"
              >
                support@waterspo.top
              </a>
            </div>
            <Link href="/contact" className="editorial-link mt-6">
              {common("contact")}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
