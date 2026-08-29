import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

interface PageIntroProps {
  title: string;
  intro: string;
  /** Optional trailing element, such as the lab page's signal field. */
  children?: ReactNode;
}

export function PageIntro({ title, intro, children }: PageIntroProps) {
  return (
    <section className={cn("editorial-section border-t-0 pt-10 md:pt-16")}>
      <div className="site-container editorial-grid items-end">
        <SectionHeading as="h1" className="text-display-xl max-w-[46rem]">
          {title}
        </SectionHeading>
        <div>
          <p className="editorial-lead">{intro}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
