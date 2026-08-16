import { DataDisplay, DemoLayout, PageLayout } from "@/components/layout";

// Configure ISR to revalidate every 10 seconds
export const revalidate = 10;

// Simulate external API call using real fetch to demonstrate ISR caching
async function getISRData() {
  return {
    buildTime: new Date().toISOString(),
    cacheStatus: "cached for 10 seconds",
  };
}

// This page demonstrates Incremental Static Regeneration
export default async function ISRPage() {
  const data = await getISRData();

  const codeExample = `// app/isr/page.tsx
export const revalidate = 10 // page-level revalidation

export default async function ISRPage() {
  // This fetch result will be cached for 10 seconds
  const response = await fetch('https://api.example.com/posts/1', {
    next: { revalidate: 10 }
  })
  
  const data = await response.json()
  
  return (
    <div>
      <h2>ISR Demo</h2>
      <p>Build Time: {new Date().toISOString()}</p>
      <p>Cache Status: {data.cacheStatus}</p>
    </div>
  )
}`;

  const isrData = [
    { label: "Page Build Time", value: data.buildTime, color: "text-blue-400" },
    { label: "Cache Status", value: data.cacheStatus, color: "text-green-400" },
  ];

  const isrFeatures = [
    {
      title: "Development Mode",
      description: "Re-generates every time (for development debugging)",
    },
    {
      title: "Production Mode",
      description: "True caching behavior, returns the same content within 10 seconds",
    },
    {
      title: "Background Update",
      description: "Returns old version first, then re-generates in the background",
    },
    { title: "Zero Downtime", description: "Users can always access the page during updates" },
  ];

  return (
    <PageLayout>
      <DemoLayout
        title="ISR"
        subtitle="Static generation with timed updates, balancing performance and freshness."
        description="Suitable for news or blog websites, the advantage is fast loading and incremental updates, avoiding full site rebuilds, but the first request after expiration may be slightly slower."
        codeExample={codeExample}
        renderMode="ISR"
        dataDisplay={
          <DataDisplay
            title="ISR: Incremental Static Regeneration"
            description="This page demonstrates true ISR behavior: static generation + timed revalidation"
            data={isrData}
            features={isrFeatures}
          />
        }
      />
    </PageLayout>
  );
}
