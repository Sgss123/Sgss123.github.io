import Features from "@/components/Features";
import Hero from "@/components/Hero";
import { PageLayout } from "@/components/layout";

export default function Home() {
  return (
    <PageLayout>
      <Hero />
      <Features />
    </PageLayout>
  );
}
