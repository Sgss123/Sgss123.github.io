import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { EmailCta } from "@/components/contact/EmailCta";
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
      <section className="editorial-section border-t-0 pt-4">
        <div className="site-container">
          <EmailCta size="display" />
        </div>
      </section>
    </>
  );
}
