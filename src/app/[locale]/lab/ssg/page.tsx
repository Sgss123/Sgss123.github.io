import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DataRows } from "@/components/lab/DataRows";
import { LabExperimentPage } from "@/components/lab/LabExperimentPage";
import { requireLabExperiment } from "@/lib/lab";
import { buildLabMetadata } from "@/lib/lab-metadata";
import type { Locale } from "@/lib/routing";

const experiment = requireLabExperiment("ssg");
const generatedAt = new Date().toISOString();
type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildLabMetadata((await params).locale, "ssg");
}

export default async function SsgPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Lab.data");

  return (
    <LabExperimentPage experiment={experiment}>
      <DataRows
        rows={[
          { label: t("buildTime"), value: generatedAt },
          { label: t("cache"), value: "static" },
        ]}
      />
    </LabExperimentPage>
  );
}
