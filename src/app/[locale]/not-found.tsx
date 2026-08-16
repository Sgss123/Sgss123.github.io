import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="site-container grid min-h-[60vh] place-items-center py-20 text-center">
      <div>
        <p className="font-display text-2xl text-[var(--accent-text)]">404</p>
        <SectionHeading as="h1" className="mt-3 text-5xl md:text-7xl">
          {t("title")}
        </SectionHeading>
        <p className="mt-5 text-[var(--muted-foreground)]">{t("description")}</p>
        <Button asChild className="mt-8">
          <Link href="/">{t("action")}</Link>
        </Button>
      </div>
    </section>
  );
}
