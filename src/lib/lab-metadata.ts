import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLabExperiment, type LabSlug } from "./lab";
import { buildPageMetadata } from "./metadata";
import type { Locale } from "./routing";

export async function buildLabMetadata(locale: Locale, slug: LabSlug): Promise<Metadata> {
  const experiment = getLabExperiment(slug);
  if (!experiment) return {};
  const t = await getTranslations({ locale, namespace: "Lab.experiments" });
  return buildPageMetadata(
    locale,
    `/lab/${slug}`,
    t(experiment.titleKey),
    t(experiment.descriptionKey),
  );
}
