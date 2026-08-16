import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageIntro } from "@/components/ui/PageIntro";
import { Link } from "@/i18n/navigation";
import { LAB_EXPERIMENTS } from "@/lib/lab";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Lab" });
  return buildPageMetadata(locale, "/lab", t("metadataTitle"), t("metadataDescription"));
}

export default async function LabPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Lab");

  return (
    <>
      <PageIntro title={t("title")} intro={t("intro")} />
      <section className="site-container py-8 md:py-14">
        <ol>
          {LAB_EXPERIMENTS.map((experiment, index) => (
            <li key={experiment.slug} className="border-b border-[var(--border)] last:border-0">
              <Link
                href={`/lab/${experiment.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-[5rem_0.9fr_1fr_auto] md:items-center"
              >
                <span className="font-display text-2xl text-[var(--accent-text)]">
                  0{index + 1}.
                </span>
                <h2 className="font-display text-3xl md:text-4xl">
                  {t(`experiments.${experiment.titleKey}`)}
                </h2>
                <p className="max-w-xl text-sm leading-6 text-[var(--muted-foreground)]">
                  {t(`experiments.${experiment.descriptionKey.replace("description", "short")}`)}
                </p>
                <span className="inline-flex items-center gap-2 text-sm text-[var(--accent-text)]">
                  {t("viewExperiment")}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
