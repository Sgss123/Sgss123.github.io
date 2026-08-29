import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignalField } from "@/components/motion/SignalField";
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

  const facts = [
    { title: t("businessTitle"), body: t("business") },
    { title: t("fieldsTitle"), body: t("fields") },
  ];

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />

      <section className="editorial-section border-t-0 pt-4">
        <div className="site-container editorial-grid gap-y-12">
          <div className="grid gap-12">
            {facts.map((fact) => (
              <article key={fact.title} className="border-l-2 border-[var(--accent)] pl-6 md:pl-8">
                <SectionHeading className="text-display-sm">{fact.title}</SectionHeading>
                <p className="editorial-lead mt-4">{fact.body}</p>
              </article>
            ))}
          </div>
          <div className="self-center">
            <SignalField variant="hero" />
          </div>
        </div>
      </section>
    </>
  );
}
