import { DataDisplay, DemoLayout, PageLayout } from "@/components/layout";

// Force dynamic rendering - disable static optimization
export const dynamic = "force-dynamic";

// Simulate fetching data from API, re-fetching every time
async function getSSRData() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));

  // Get request headers to prove this runs on server
  const timestamp = Date.now();

  return {
    requestTime: new Date().toISOString(),
    serverTime: new Date().toISOString(),
    dataFetchTime: new Date().toISOString(),
    realtimeValue: Math.floor(Math.random() * 1000),
    timestamp: timestamp,
    serverHash: Math.random().toString(36).substring(7),
  };
}

// This page demonstrates Server-Side Rendering
export default async function SSRPage() {
  // This function is executed every time a request is made
  const data = await getSSRData();

  const codeExample = `// app/ssr/page.tsx
// Force dynamic rendering - disable static optimization
export const dynamic = 'force-dynamic'

export default async function SSRPage() {
  // This function runs on the server for EVERY request
  const data = await fetch('https://api.example.com/real-time-data', {
    cache: 'no-store' // Disable cache - ensures fresh data every time
  })
  
  const jsonData = await data.json()
  
  return (
    <div>
      <h2>SSR: Server-Side Rendering</h2>
      <p>This page is rendered on the server for every request.</p>
      <p>Request Time: {new Date().toISOString()}</p>
      <p>Server Time: {new Date().toISOString()}</p>
      <p>Real-time Data: {jsonData.value}</p>
    </div>
  )
}`;

  const ssrData = [
    { label: "Request Time", value: data.requestTime, color: "text-green-400" },
    { label: "Server Time", value: data.serverTime, color: "text-blue-400" },
    { label: "Data Fetch Time", value: data.dataFetchTime, color: "text-yellow-400" },
    { label: "Real-time Value", value: data.realtimeValue, color: "text-purple-400" },
    { label: "Timestamp", value: data.timestamp, color: "text-red-400" },
    { label: "Server Hash", value: data.serverHash, color: "text-indigo-400" },
  ];

  const ssrFeatures = [
    {
      title: "Real-time Rendering",
      description: "Each request is rendered on the server in real-time",
    },
    { title: "Dynamic Content", description: "Content is always up-to-date and personalized" },
    { title: "Server Processing", description: "Requires server processing for each request" },
    { title: "SEO Friendly", description: "Search engines can crawl the fully rendered content" },
  ];

  return (
    <PageLayout>
      <DemoLayout
        title="SSR"
        subtitle="Each request is rendered in real-time on the server, ensuring content is always up-to-date."
        description="Ideal for dynamic and personalized content demanding strong SEO and immediate data freshness. This ensures optimal search engine visibility and up-to-the-minute information display for applications such as interactive user portals or live data analytics platforms."
        codeExample={codeExample}
        renderMode="SSR"
        dataDisplay={
          <DataDisplay
            title="SSR: Server-Side Rendering"
            description="This page is re-rendered every time a request is made, and data such as timestamps are updated in real-time."
            data={ssrData}
            features={ssrFeatures}
          />
        }
      />
    </PageLayout>
  );
}
