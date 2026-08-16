import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import type { LabExperiment } from "@/lib/lab";

interface LabExperimentPageProps {
  experiment: LabExperiment;
  children: ReactNode;
}

export async function LabExperimentPage({ experiment, children }: LabExperimentPageProps) {
  const t = await getTranslations("Lab");
  const common = await getTranslations("Common.actions");

  return (
    <>
      <section className="site-container border-b border-[var(--border)] py-12 md:py-18">
        <Link href="/lab" className="editorial-link mb-10">
          <ArrowLeft className="size-4" /> {common("backToLab")}
        </Link>
        <div className="grid gap-7 md:grid-cols-[1fr_1.3fr] md:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.16em] text-[var(--accent-text)]">
              {experiment.renderMode}
            </p>
            <SectionHeading as="h1" className="mt-3 text-5xl leading-[0.95] md:text-7xl">
              {t(`experiments.${experiment.titleKey}`)}
            </SectionHeading>
          </div>
          <p className="max-w-2xl text-base leading-7 text-[var(--muted-foreground)]">
            {t(`experiments.${experiment.descriptionKey}`)}
          </p>
        </div>
      </section>

      <section className="site-container grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
        <div>
          <h2 className="mb-4 text-sm uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {t("code")}
          </h2>
          <div className="code-block">
            <pre>
              <code>{experiment.codeExample}</code>
            </pre>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
            {t("result")}
          </h2>
          {children}
        </div>
      </section>
    </>
  );
}
