import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "EdgeOne Pages Next.js Starter - Hybrid Rendering Demo | EdgeOne Makers",
  description:
    "Using Next.js to build high-performance, scalable Web applications on EdgeOne Pages. Demonstrating SSR, ISR, SSG, Node Functions, and Edge Functions. · Demo only · EdgeOne Makers",
  keywords: "EdgeOne Makers, Demo only",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" className="dark">
      <head>
        <link rel="icon" href="/eo-logo-blue.svg" />
      </head>
      <body className="bg-black text-white antialiased">
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #3b82f6, 0 0 5px #3b82f6"
          zIndex={9999}
        />
        {children}
      </body>
    </html>
  );
}
