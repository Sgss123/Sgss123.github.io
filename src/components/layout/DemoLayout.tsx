import { Button } from "@/components/ui/button";

interface DemoLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  codeExample: string;
  dataDisplay: React.ReactNode;
  renderMode: "SSR" | "ISR" | "SSG" | "Streaming" | "Node Functions" | "Edge Functions";
  className?: string;
}

const DemoLayout = ({
  subtitle,
  description,
  codeExample,
  dataDisplay,
  renderMode,
  className = "",
}: DemoLayoutProps) => {
  const getRenderModeColor = (mode: string) => {
    switch (mode) {
      case "SSR":
        return "bg-orange-600/20 border-orange-600 text-orange-400";
      case "ISR":
        return "bg-green-600/20 border-green-600 text-green-400";
      case "SSG":
        return "bg-blue-600/20 border-blue-600 text-blue-400";
      case "Streaming":
        return "bg-purple-600/20 border-purple-600 text-purple-400";
      case "Node Functions":
        return "bg-yellow-600/20 border-yellow-600 text-yellow-400";
      case "Edge Functions":
        return "bg-pink-600/20 border-pink-600 text-pink-400";
      default:
        return "bg-gray-600/20 border-gray-600 text-gray-400";
    }
  };

  const getRenderModeIcon = (mode: string) => {
    switch (mode) {
      case "SSR":
        return "🔄";
      case "ISR":
        return "⏱️";
      case "SSG":
        return "📄";
      case "Streaming":
        return "🌊";
      case "Node Functions":
        return "🖥️";
      case "Edge Functions":
        return "⚡";
      default:
        return "📋";
    }
  };

  return (
    <div className={className}>
      {/* Main title area */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          EdgeOne Pages Next.js Starter - {renderMode}
        </h1>
        <p className="text-xl text-gray-300 mb-4">{subtitle}</p>
        <p className="text-lg text-gray-400 mb-8">{description}</p>
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

      {/* Code example area */}
      <div className="container mx-auto px-4 mb-8">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <div className="bg-gray-900 rounded p-6 text-left">
            <pre className="text-sm text-gray-200">{codeExample}</pre>
          </div>
        </div>
      </div>

      {/* Dynamic data display area */}
      <div className="container mx-auto px-4 mb-20">
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center">
          <div className={`${getRenderModeColor(renderMode)} border rounded-lg p-4 mb-6`}>
            <p className="text-sm">
              {getRenderModeIcon(renderMode)} This page uses the {renderMode} strategy!
            </p>
          </div>

          {dataDisplay}
        </div>
      </div>
    </div>
  );
};

export default DemoLayout;
