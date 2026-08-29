import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteShell } from "@/components/site/SiteShell";
import { routing } from "@/i18n/routing";
import { bodyClassName } from "@/lib/fonts";
import { siteMetadata, siteViewport } from "@/lib/metadata";
import { getDocumentLanguage, type Locale } from "@/lib/routing";
import "../globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Only "en"/"zh" are valid locales. With dynamicParams disabled, unprefixed
// English paths like "/about" are not swallowed by this segment and fall
// through to the fallback root layout (src/app/(fallback)/[...rest]/page.tsx).
export const dynamicParams = false;

/**
 * Document root for every localized route.
 *
 * The `lang` attribute is derived from the statically known `[locale]` route
 * parameter, so the prerendered HTML declares `lang="en"` / `lang="zh-CN"`
 * without reading request headers or cookies.
 */
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
    <html lang={getDocumentLanguage(locale as Locale)} suppressHydrationWarning>
      <body className={bodyClassName}>
        <NextTopLoader color="#a52228" height={2} showSpinner={false} shadow={false} />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <SiteShell>{children}</SiteShell>
          </ThemeProvider>
        </NextIntlClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
