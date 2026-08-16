import { DataDisplay, DemoLayout, PageLayout } from "@/components/layout";

// This page demonstrates Static Site Generation
export default function SSGPage() {
  const codeExample = `// app/ssg/page.tsx
// No export const dynamic or revalidate - defaults to static generation

export default function SSGPage() {
  // This function runs at build time only
  const data = {
    buildTime: new Date().toISOString(),
    staticContent: 'This content is generated at build time'
  }
  
  return (
    <div>
      <h2>SSG: Static Site Generation</h2>
      <p>This page is pre-generated at build time.</p>
      <p>Build Time: {data.buildTime}</p>
      <p>Content: {data.staticContent}</p>
    </div>
  )
}`;

  const ssgData = [
    { label: "Build Time", value: new Date().toISOString(), color: "text-blue-400" },
    { label: "Rendering Strategy", value: "Static Generation", color: "text-green-400" },
    { label: "Cache Duration", value: "Indefinite (until rebuild)", color: "text-yellow-400" },
  ];

  const ssgFeatures = [
    { title: "Build-time Generation", description: "Content is generated once at build time" },
    { title: "Fastest Performance", description: "Serves pre-built HTML files directly" },
    { title: "CDN Friendly", description: "Can be cached at CDN level for maximum performance" },
    { title: "SEO Optimized", description: "Search engines can easily crawl static content" },
  ];

  return (
    <PageLayout>
      <DemoLayout
        title="SSG"
        subtitle="Pre-generates all pages at build time for maximum performance."
        description="Suitable for corporate websites and static content, the advantage is the fastest possible loading speed, but content cannot be updated without rebuilding the site."
        codeExample={codeExample}
        renderMode="SSG"
        dataDisplay={
          <DataDisplay
            title="SSG: Static Site Generation"
            description="This page is pre-generated at build time and served as static HTML."
            data={ssgData}
            features={ssgFeatures}
          />
        }
      />
    </PageLayout>
  );
}
