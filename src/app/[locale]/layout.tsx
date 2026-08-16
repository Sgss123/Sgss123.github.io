import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SiteShell } from "@/components/site/SiteShell";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/lib/routing";
import "../globals.css";

const displayLatin = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display-latin",
  display: "swap",
});

const displayCjk = Noto_Serif_SC({
  weight: ["400", "500", "600"],
  variable: "--font-display-cjk",
  display: "swap",
  preload: false,
});

const sans = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Waterspo Studio",
    template: "%s · Waterspo Studio",
  },
  description: "SaaS platforms, website operations and software development.",
  icons: { icon: "/waterspo-mark.svg" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
    <html lang={locale === "zh" ? "zh-CN" : "en"} suppressHydrationWarning>
      <body
        className={`${displayLatin.variable} ${displayCjk.variable} ${sans.variable} min-h-screen antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <NextTopLoader color="#a52228" height={2} showSpinner={false} shadow={false} />
            <SiteShell>{children}</SiteShell>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
