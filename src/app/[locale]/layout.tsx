import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteShell } from "@/components/site/SiteShell";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Only "en"/"zh" are valid locales. With dynamicParams disabled, unprefixed
// English paths like "/about" are not swallowed by this segment and fall
// through to the root catch-all fallback (src/app/[...rest]/page.tsx).
export const dynamicParams = false;

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <NextTopLoader color="#a52228" height={2} showSpinner={false} shadow={false} />
      <ThemeProvider>
        <SiteShell>{children}</SiteShell>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
