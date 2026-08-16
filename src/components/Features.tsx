import FeatureCard from "./FeatureCard";

const Features = () => {
  const features = [
    {
      title: "Server-Side Rendering (SSR)",
      description: "Real-time rendering through the server after each request",
      demoLink: "/ssr",
    },
    {
      title: "Incremental Static Regeneration (ISR)",
      description: "Static generation + scheduled incremental updates",
      demoLink: "/isr",
    },
    {
      title: "Static Site Generation (SSG)",
      description: "Pre-generate all pages at build time",
      demoLink: "/ssg",
    },
    {
      title: "Streaming",
      description: "Step-by-step rendering of page content, enhancing user experience",
      demoLink: "/streaming",
    },
    {
      title: "Node Functions",
      description: "Run code in Node Runtime, no server management required",
      demoLink: "/node-functions",
    },
    {
      title: "Edge Functions",
      description: "Run code in Edge Runtime, no server management required",
      demoLink: "/edge-functions",
    },
  ];

  return (
    <section className="w-full pb-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard
              key={feature.description}
              title={feature.title}
              description={feature.description}
              demoLink={feature.demoLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
