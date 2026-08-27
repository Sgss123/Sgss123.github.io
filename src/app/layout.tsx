import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KYSQ89XD2P"
          strategy="beforeInteractive"
        />
        <Script id="google-analytics" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-KYSQ89XD2P');
          `}
        </Script>
      </head>
      <body
        className={`${displayLatin.variable} ${displayCjk.variable} ${sans.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
