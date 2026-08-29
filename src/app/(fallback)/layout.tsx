import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { bodyClassName } from "@/lib/fonts";
import { siteMetadata, siteViewport } from "@/lib/metadata";
import { fallbackDocumentLanguage } from "@/lib/routing";
import "../globals.css";

export const metadata = siteMetadata;
export const viewport = siteViewport;

/**
 * Lightweight root layout for documents that exist only to redirect: the site
 * root and the unprefixed English paths. It carries the shared font variables,
 * metadata, theme provider, top loader and analytics so a redirect target keeps
 * the same presentation, but it deliberately omits the site chrome because no
 * fallback document renders visible content.
 *
 * Keeping this separate from the locale root layout lets `[locale]` emit a
 * static, request-independent `lang` attribute without forcing the redirect
 * documents through locale resolution.
 */
export default function FallbackRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={fallbackDocumentLanguage} suppressHydrationWarning>
      <body className={bodyClassName}>
        <NextTopLoader color="#a52228" height={2} showSpinner={false} shadow={false} />
        <ThemeProvider>{children}</ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
