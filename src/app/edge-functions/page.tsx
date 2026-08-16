"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

// This page demonstrates Edge Functions
export default function EdgeFunctionsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState("");
  const handleClick = async () => {
    setIsLoading(true);
    const res = await fetch("/hello-edge");
    const text = await res.text();
    setData(text);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-black">
      <Header />

      {/* Main title area */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          EdgeOne Pages Next.js Starter - Edge Functions
        </h1>
        <p className="text-xl text-gray-300 mb-4">
          Run code at the edge, no server management required, providing the lowest latency global
          deployment.
        </p>
        <p className="text-lg text-gray-400 mb-8">
          Suitable for real-time data processing and geolocation services, the advantage is global
          edge deployment and ultra-low latency response, suitable for lightweight API, real-time
          notifications, and content personalization.
        </p>
        <a
          href="https://pages.edgeone.ai/document/edge-functions"
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

      {/* Code example area */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <div className="bg-gray-900 rounded p-6 text-left">
            <pre className="text-sm">
              {`export default function onRequest(context) {
  const {geo} = context;

  return new Response(JSON.stringify({
    message: 'Hello Edge!',
    geo: geo,
  }), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Dynamic data display area */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center">
          <Button
            onClick={handleClick}
            disabled={isLoading}
            className="bg-[#1c66e5] hover:bg-[#1c66e5]/90 text-white cursor-pointer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Execute API Call
          </Button>

          {data && (
            <div className="space-y-2 text-left overflow-hidden">
              <p className="text-gray-300">
                <span className="text-blue-400">Function Return:</span> {data}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
