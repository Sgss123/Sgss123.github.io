import Script from "next/script";

const measurementId = "G-KYSQ89XD2P";

/**
 * Google Analytics loader shared by both root layouts. `beforeInteractive`
 * keeps the snippet ahead of hydration so page views are recorded even on the
 * statically prerendered fallback documents.
 */
export function GoogleAnalytics() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
