import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DataRows } from "@/components/lab/DataRows";
import { LabExperimentPage } from "@/components/lab/LabExperimentPage";
import { requireLabExperiment } from "@/lib/lab";
import { buildLabMetadata } from "@/lib/lab-metadata";
import type { Locale } from "@/lib/routing";

export const revalidate = 10;
const experiment = requireLabExperiment("isr");
type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildLabMetadata((await params).locale, "isr");
}

export default async function IsrPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Lab.data");

  return (
    <LabExperimentPage experiment={experiment}>
      <DataRows
        rows={[
          { label: t("buildTime"), value: new Date().toISOString() },
          { label: t("cache"), value: "revalidate: 10s" },
        ]}
      />
    </LabExperimentPage>
  );
}
