import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  demoLink: string;
  className?: string;
}

const FeatureCard = ({ title, description, demoLink, className = "" }: FeatureCardProps) => {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-gray-800/70 transition-all duration-300 ${className}`}
    >
      <div className="h-16">
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      </div>
      <div className="h-16">
        <p className="text-gray-300 leading-relaxed mb-4">{description}</p>
      </div>
      <Link href={demoLink}>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">
          View Demo
        </Button>
      </Link>
    </div>
  );
};

export default FeatureCard;
