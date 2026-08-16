import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ children, className, as: Comp = "h2" }: SectionHeadingProps) {
  return <Comp className={cn("font-display text-balance", className)}>{children}</Comp>;
}
