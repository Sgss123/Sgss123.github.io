import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeroNetworkMark, NetworkIllustration } from "@/components/site/NetworkIllustration";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { LAB_EXPERIMENTS } from "@/lib/lab";
import { buildPageMetadata } from "@/lib/metadata";
import type { Locale } from "@/lib/routing";

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildPageMetadata(locale, "/", t("metadataTitle"), t("metadataDescription"));
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const common = await getTranslations("Common.actions");
  const lab = await getTranslations("Lab.experiments");

  const services = [t("services.saas"), t("services.operations"), t("services.development")];

  return (
    <>
      <section className="site-container grid items-center gap-10 border-b border-[var(--border)] py-10 md:min-h-[328px] md:grid-cols-[minmax(0,0.95fr)_minmax(26rem,1.05fr)] md:py-8">
        <div>
          <SectionHeading
            as="h1"
            className="max-w-[42rem] text-5xl leading-[0.9] md:text-[clamp(3.75rem,4.4vw,4.4rem)]"
          >
            {t("hero.title")}
          </SectionHeading>
          <p className="mt-5 max-w-xl text-base leading-6 text-[var(--muted-foreground)]">
            {t("hero.description")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild className="h-11 px-7 text-base">
              <Link href="/services">{common("exploreServices")}</Link>
            </Button>
            <Button asChild className="h-11 px-7 text-base" variant="outline">
              <Link href="/lab">{common("visitLab")}</Link>
            </Button>
          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl">
          <HeroNetworkMark />
        </div>
      </section>

      <section className="site-container grid border-b border-[var(--border)] md:grid-cols-[18rem_1fr]">
        <div className="border-b border-[var(--border)] py-7 md:border-r md:border-b-0 md:pr-10">
          <SectionHeading className="text-4xl leading-[0.9]">{t("services.title")}</SectionHeading>
        </div>
        <ol className="py-2 md:pl-12">
          {services.map((service, index) => (
            <li
              key={service}
              className="grid grid-cols-[4rem_1fr] items-center border-b border-[var(--border)] py-3 last:border-0"
            >
              <span className="font-display text-xl text-[var(--accent-text)]">0{index + 1}.</span>
              <span>{service}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-[#262d32] text-[#f7e8c1]">
        <div className="site-container grid items-center gap-6 py-5 md:grid-cols-[20rem_1fr] md:py-4">
          <SectionHeading className="text-3xl leading-[0.95]">{t("technology")}</SectionHeading>
          <div className="[--accent:#a52228] [--background:#262d32] [--muted-foreground:#d7cfc2]">
            <NetworkIllustration compact />
          </div>
        </div>
      </section>

      <section className="site-container grid border-b border-[var(--border)] md:grid-cols-3">
        <article className="border-b border-[var(--border)] py-6 md:border-r md:border-b-0 md:pr-8">
          <SectionHeading className="text-3xl">{t("about.title")}</SectionHeading>
          <p className="mt-2 text-sm leading-5 text-[var(--muted-foreground)]">
            {t("about.description")}
          </p>
          <Link href="/about" className="editorial-link mt-5">
            {common("aboutStudio")} <ArrowRight className="size-4" />
          </Link>
        </article>
        <article className="border-b border-[var(--border)] py-6 md:border-r md:border-b-0 md:px-8">
          <SectionHeading className="text-3xl">{t("lab.title")}</SectionHeading>
          <p className="mt-2 text-sm leading-5 text-[var(--muted-foreground)]">
            {t("lab.description")}
          </p>
          <ul className="mt-2 grid text-xs leading-4 text-[var(--muted-foreground)]">
            {LAB_EXPERIMENTS.map((experiment) => (
              <li key={experiment.slug} className="flex items-center gap-2">
                <span className="size-1.5 bg-[var(--accent)]" />
                {lab(`${experiment.titleKey}`)}
              </li>
            ))}
          </ul>
          <Link href="/lab" className="editorial-link mt-3">
            {common("enterLab")} <ArrowRight className="size-4" />
          </Link>
        </article>
        <article className="py-6 md:pl-8">
          <SectionHeading className="text-3xl">{t("contact.title")}</SectionHeading>
          <p className="mt-2 text-sm leading-5 text-[var(--muted-foreground)]">
            {t("contact.description")}
          </p>
          <p className="mt-4 italic text-[var(--muted-foreground)]">contact@example.com</p>
          <p className="text-xs text-[var(--muted-foreground)]">(placeholder)</p>
          <Button asChild className="mt-4">
            <Link href="/contact">
              {common("contact")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </article>
      </section>
    </>
  );
}
