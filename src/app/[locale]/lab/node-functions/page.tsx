import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LabExperimentPage } from "@/components/lab/LabExperimentPage";
import { RuntimeDemo } from "@/components/lab/RuntimeDemo";
import { requireLabExperiment } from "@/lib/lab";
import { buildLabMetadata } from "@/lib/lab-metadata";
import type { Locale } from "@/lib/routing";

const experiment = requireLabExperiment("node-functions");
type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return buildLabMetadata((await params).locale, "node-functions");
}

export default async function NodeFunctionsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <LabExperimentPage experiment={experiment}>
      <RuntimeDemo endpoint="/api/hello" />
    </LabExperimentPage>
  );
}
