import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[6px] border border-[var(--border)] bg-[var(--surface)] p-6 text-[var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}
