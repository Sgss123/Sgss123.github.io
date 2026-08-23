import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
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
      <body
        className={`${displayLatin.variable} ${displayCjk.variable} ${sans.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
