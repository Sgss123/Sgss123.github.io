export type LabSlug = "ssr" | "isr" | "ssg" | "streaming" | "node-functions" | "edge-functions";

export type RenderMode = "SSR" | "ISR" | "SSG" | "Streaming" | "Node Functions" | "Edge Functions";

export interface LabExperiment {
  slug: LabSlug;
  renderMode: RenderMode;
  titleKey: string;
  /** One-line summary used in listings. */
  shortKey: string;
  /** Full explanation used on the experiment page. */
  descriptionKey: string;
  codeExample: string;
  demo: "data" | "streaming" | "node" | "edge";
}

export const LAB_EXPERIMENTS: readonly LabExperiment[] = [
  {
    slug: "ssr",
    renderMode: "SSR",
    titleKey: "ssr.title",
    shortKey: "ssr.short",
    descriptionKey: "ssr.description",
    codeExample: "export const dynamic = 'force-dynamic';",
    demo: "data",
  },
  {
    slug: "isr",
    renderMode: "ISR",
    titleKey: "isr.title",
    shortKey: "isr.short",
    descriptionKey: "isr.description",
    codeExample: "export const revalidate = 10;",
    demo: "data",
  },
  {
    slug: "ssg",
    renderMode: "SSG",
    titleKey: "ssg.title",
    shortKey: "ssg.short",
    descriptionKey: "ssg.description",
    codeExample: "export default function StaticPage() { return <main />; }",
    demo: "data",
  },
  {
    slug: "streaming",
    renderMode: "Streaming",
    titleKey: "streaming.title",
    shortKey: "streaming.short",
    descriptionKey: "streaming.description",
    codeExample: "<Suspense fallback={<Loading />}><SlowComponent /></Suspense>",
    demo: "streaming",
  },
  {
    slug: "node-functions",
    renderMode: "Node Functions",
    titleKey: "nodeFunctions.title",
    shortKey: "nodeFunctions.short",
    descriptionKey: "nodeFunctions.description",
    codeExample: "export default function onRequest() { return new Response('Hello Node!'); }",
    demo: "node",
  },
  {
    slug: "edge-functions",
    renderMode: "Edge Functions",
    titleKey: "edgeFunctions.title",
    shortKey: "edgeFunctions.short",
    descriptionKey: "edgeFunctions.description",
    codeExample: "export default function onRequest({geo}) { return Response.json({geo}); }",
    demo: "edge",
  },
];

export function getLabExperiment(slug: string): LabExperiment | undefined {
  return LAB_EXPERIMENTS.find((experiment) => experiment.slug === slug);
}

export function requireLabExperiment(slug: LabSlug): LabExperiment {
  const experiment = getLabExperiment(slug);
  if (!experiment) throw new Error(`Missing lab experiment: ${slug}`);
  return experiment;
}

export const legacyLabRedirects = LAB_EXPERIMENTS.map(({ slug }) => ({
  source: `/${slug}`,
  destination: `/lab/${slug}`,
  permanent: true,
}));
