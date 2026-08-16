import { Suspense } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

// Force dynamic rendering - disable static optimization
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Simulate slow data fetching async component
async function SlowDataComponent() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = {
    fetchTime: new Date().toISOString(),
    streamingData: Math.floor(Math.random() * 1000),
    message: "This component loaded with streaming!",
  };

  return (
    <div className="bg-blue-600/20 border border-blue-600 rounded-lg p-4 w-1/3">
      <h3 className="text-blue-400 font-semibold mb-2">Slow Component 1 (5s delay)</h3>
      <div className="text-sm text-gray-300 space-y-1">
        <p>Fetch Time: {data.fetchTime}</p>
        <p>Streaming Data: {data.streamingData}</p>
        <p>Status: {data.message}</p>
      </div>
    </div>
  );
}

// Another simulate slow data fetching async component
async function AnotherSlowComponent() {
  // Simulate longer network delay
  await new Promise((resolve) => setTimeout(resolve, 8000));

  const data = {
    fetchTime: new Date().toISOString(),
    complexData: Math.floor(Math.random() * 10000),
    status: "Streaming complete!",
  };

  return (
    <div className="bg-purple-600/20 border border-purple-600 rounded-lg p-4 w-1/3">
      <h3 className="text-purple-400 font-semibold mb-2">Slow Component 2 (8s delay)</h3>
      <div className="text-sm text-gray-300 space-y-1">
        <p>Fetch Time: {data.fetchTime}</p>
        <p>Complex Data: {data.complexData}</p>
        <p>Status: {data.status}</p>
      </div>
    </div>
  );
}

// Fast loading component
function FastComponent() {
  return (
    <div className="bg-green-600/20 border border-green-600 rounded-lg p-4 w-1/3">
      <h3 className="text-green-400 font-semibold mb-2">Fast Component (Load instantly)</h3>
      <div className="text-sm text-gray-300 space-y-1">
        <p>Load Time: {new Date().toISOString()}</p>
        <p>Fast Data: {Math.floor(Math.random() * 100)}</p>
        <p>Status: Loaded instantly!</p>
      </div>
    </div>
  );
}

// Loading component
function LoadingSpinner({ message }: { message: string }) {
  return (
    <div className="bg-gray-600/20 border border-gray-600 rounded-lg p-4 w-1/3">
      <div className="flex items-center space-x-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <div>
          <h3 className="text-gray-400 font-semibold">{message}</h3>
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    </div>
  );
}

// This page demonstrates Server-Side Streaming
export default function StreamingPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Main Title Area */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          EdgeOne Pages Next.js Starter - Streaming
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Gradually render page content to improve user experience and perceived performance.
        </p>
        <p className="text-lg text-gray-400 mb-8">
          Suitable for data-intensive pages and complex content, advantages are faster first screen
          display and progressive content loading, supporting large pages and complex dashboards.
        </p>
        <a
          href="https://pages.edgeone.ai/document/framework-nextjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            variant="outline"
            className="hover:bg-gray-700 text-white px-8 py-3 text-lg cursor-pointer"
          >
            View Documentation
          </Button>
        </a>
      </div>
      {/* Streaming Rendering Demo Area */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <div className="bg-orange-600/20 border border-orange-600 rounded-lg p-4 mb-6">
            <p className="text-orange-400 text-sm">
              🚀 True streaming rendering: Page content loads progressively, fast components display
              immediately, slow components load one by one!
            </p>
          </div>

          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Streaming: Streaming Rendering Demo
          </h2>

          <div className="space-x-4 flex flex-row items-center justify-between">
            {/* Fast Component - Display immediately */}
            <FastComponent />

            {/* Slow Component 1 - Use Suspense for streaming loading */}
            <Suspense fallback={<LoadingSpinner message="Loading slow component 1 (5s)..." />}>
              <SlowDataComponent />
            </Suspense>

            {/* Slow Component 2 - Use Suspense for streaming loading */}
            <Suspense fallback={<LoadingSpinner message="Loading slow component 2 (8s)..." />}>
              <AnotherSlowComponent />
            </Suspense>
          </div>

          <div className="mt-6 p-4 bg-blue-600/20 border border-blue-600 rounded-lg">
            <h3 className="text-blue-400 font-semibold mb-2">Streaming Rendering Features</h3>
            <div className="text-sm text-gray-300 space-y-1">
              <p>
                • <strong>Progressive Loading:</strong> Page content displays progressively by
                component
              </p>
              <p>
                • <strong>Faster First Screen:</strong> Fast components display immediately without
                waiting for slow components
              </p>
              <p>
                • <strong>Better User Experience:</strong> Users can see partial content immediately
              </p>
              <p>
                • <strong>Parallel Processing:</strong> Multiple async components can load in
                parallel
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Refresh the page to see the true streaming rendering effect - content appears
              progressively!
            </p>
          </div>
        </div>
      </div>
      {/* Code Example Area */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <div className="bg-gray-900 rounded p-6 text-left">
            <pre className="text-sm">
              {`// app/streaming/page.tsx
// Force dynamic rendering - disable static optimization
export const dynamic = 'force-dynamic'
export const revalidate = 0

import { Suspense } from 'react'

export default function StreamingPage() {
  return (
    <div>
      <h1>Streaming Rendering Demo</h1>
      
      {/* Fast component displays immediately */}
      <FastComponent />
      
      {/* Slow components use Suspense for streaming loading */}
      <Suspense fallback={<LoadingSpinner message="Loading component 1..." />}>
        <SlowDataComponent />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner message="Loading component 2..." />}>
        <AnotherSlowComponent />
      </Suspense>
    </div>
  )
}

// Async server component
async function SlowDataComponent() {
  // Simulate data fetching delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  const data = await fetch('https://api.example.com/slow-data')
  return <div>Streaming data: {data.value}</div>
}`}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
