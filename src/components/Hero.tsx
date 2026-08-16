import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          EdgeOne Pages Next.js Starter
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
          Build high-performance, scalable web applications using Next.js on EdgeOne Pages. Leverage
          complete Next.js rendering modes including SSR, ISR, and SSG, while building dynamic APIs
          and complex backend features.{" "}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://edgeone.ai/pages/new?from=github&template=next-mix-render-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg cursor-pointer"
            >
              <Zap className="w-5 h-5 mr-2" />
              One-Click Deployment
            </Button>
          </a>
          <a
            href="https://pages.edgeone.ai/document/framework-nextjs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg cursor-pointer">
              View Documentation
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
