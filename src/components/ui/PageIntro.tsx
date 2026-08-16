import { SectionHeading } from "./SectionHeading";

interface PageIntroProps {
  title: string;
  intro: string;
}

export function PageIntro({ title, intro }: PageIntroProps) {
  return (
    <section className="site-container border-b border-[var(--border)] py-16 md:py-24">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.7fr)] md:items-end">
        <SectionHeading as="h1" className="text-5xl leading-[0.95] md:text-7xl">
          {title}
        </SectionHeading>
        <p className="max-w-xl text-base leading-7 text-[var(--muted-foreground)] md:text-lg">
          {intro}
        </p>
      </div>
    </section>
  );
}
