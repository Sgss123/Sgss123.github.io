import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LabExperimentPage } from "@/components/lab/LabExperimentPage";
import { StreamingResult } from "@/components/lab/StreamingResult";
import { requireLabExperiment } from "@/lib/lab";
import { buildLabMetadata } from "@/lib/lab-metadata";
import type { Locale } from "@/lib/routing";

export const dynamic = "force-dynamic";
export const revalidate = 0;
const experiment = requireLabExperiment("streaming");
type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildLabMetadata((await params).locale, "streaming");
}

export default async function StreamingPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Lab");

  return (
    <LabExperimentPage experiment={experiment}>
      <StreamingResult
        labels={{
          instant: t("data.instant"),
          first: t("data.slowOne"),
          second: t("data.slowTwo"),
          loading: t("loading"),
        }}
      />
    </LabExperimentPage>
  );
}
