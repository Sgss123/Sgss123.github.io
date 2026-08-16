import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NetworkIllustration } from "@/components/site/NetworkIllustration";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildPageMetadata(locale, "/about", t("metadataTitle"), t("metadataDescription"));
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <section className="site-container grid gap-12 py-14 md:grid-cols-[1fr_1.1fr] md:py-24">
        <div className="space-y-12">
          <article className="border-l border-[var(--accent)] pl-6">
            <SectionHeading className="text-3xl">{t("businessTitle")}</SectionHeading>
            <p className="mt-4 max-w-xl leading-7 text-[var(--muted-foreground)]">
              {t("business")}
            </p>
          </article>
          <article className="border-l border-[var(--accent)] pl-6">
            <SectionHeading className="text-3xl">{t("fieldsTitle")}</SectionHeading>
            <p className="mt-4 max-w-xl leading-7 text-[var(--muted-foreground)]">{t("fields")}</p>
          </article>
        </div>
        <div className="self-center">
          <NetworkIllustration />
        </div>
      </section>
    </>
  );
}
