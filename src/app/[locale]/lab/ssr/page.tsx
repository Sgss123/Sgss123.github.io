import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DataRows } from "@/components/lab/DataRows";
import { LabExperimentPage } from "@/components/lab/LabExperimentPage";
import { requireLabExperiment } from "@/lib/lab";
import { buildLabMetadata } from "@/lib/lab-metadata";
import type { Locale } from "@/lib/routing";

export const dynamic = "force-dynamic";
const experiment = requireLabExperiment("ssr");
type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildLabMetadata((await params).locale, "ssr");
}

export default async function SsrPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Lab.data");
  const now = new Date().toISOString();

  return (
    <LabExperimentPage experiment={experiment}>
      <DataRows
        rows={[
          { label: t("requestTime"), value: now },
          { label: t("generatedValue"), value: Math.floor(Math.random() * 1000) },
        ]}
      />
    </LabExperimentPage>
  );
}
