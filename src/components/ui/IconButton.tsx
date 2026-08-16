import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function IconButton({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        "inline-grid size-9 place-items-center rounded-[4px] border border-transparent text-[var(--foreground)] transition-colors hover:border-[var(--border)] hover:bg-[var(--surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
