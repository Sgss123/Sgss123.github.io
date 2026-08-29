import { redirect } from "next/navigation";
import { LAB_EXPERIMENTS } from "@/lib/lab";

// Unprefixed English paths (e.g. "/about", "/services", "/lab/ssr") have no
// [locale] segment, so on hosts that do not execute the next-intl proxy they
// would 404. This catch-all prerenders a redirect to the corresponding
// "/en/..." route at build time (listed paths) and falls back to a dynamic
// redirect for anything else, so the English UI stays reachable everywhere.
const EN_PATHS: string[][] = [
  ["about"],
  ["contact"],
  ["services"],
  ["lab"],
  ...LAB_EXPERIMENTS.map(({ slug }) => ["lab", slug]),
];

export function generateStaticParams() {
  return EN_PATHS.map((rest) => ({ rest }));
}

export default async function EnglishFallbackPage({
  params,
}: {
  params: Promise<{ rest: string[] }>;
}) {
  const { rest } = await params;
  redirect(`/en/${rest.join("/")}`);
}
