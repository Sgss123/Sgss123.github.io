import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SignalField } from "@/components/motion/SignalField";
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
      <PageIntro title={t("title")} intro={t("intro")}>
        <SignalField variant="lab" className="mt-6" />
      </PageIntro>

      <section className="editorial-section border-t-0 pt-4">
        <div className="site-container">
          <ol>
            {LAB_EXPERIMENTS.map((experiment, index) => (
              <li key={experiment.slug} className="border-t border-[var(--border)] last:border-b">
                <Link
                  href={`/lab/${experiment.slug}`}
                  className="group grid gap-4 py-8 md:grid-cols-[5rem_0.9fr_1fr_auto] md:items-center"
                >
                  <span className="editorial-index text-2xl">0{index + 1}.</span>
                  <h2 className="font-display text-display-sm">
                    {t(`experiments.${experiment.titleKey}`)}
                  </h2>
                  <p className="max-w-xl text-sm leading-6 text-[var(--muted-foreground)]">
                    {t(`experiments.${experiment.shortKey}`)}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm text-[var(--accent-text)]">
                    {t("viewExperiment")}
                    <ArrowUpRight
                      className="size-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
