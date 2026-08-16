import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  compact?: boolean;
}

export function Logo({ className, showWordmark = true, compact = false }: LogoProps) {
  return (
    <span className={cn("inline-flex flex-col items-center gap-0.5 text-current", className)}>
      <svg
        viewBox="0 0 770 440"
        role="img"
        aria-label="Waterspo Studio"
        className={cn("h-auto shrink-0", compact ? "w-16" : "w-18")}
      >
        <path fill="currentColor" d="M55 35h128l119 258 88-198h112L336 420h-91L55 35Z" />
        <path fill="currentColor" d="M270 35h127l117 258L604 35h126L559 420h-92L270 35Z" />
      </svg>
      {showWordmark ? (
        <span className="leading-none">
          <span className="block text-[9px] font-semibold tracking-[-0.02em]">Waterspo Studio</span>
        </span>
      ) : null}
    </span>
  );
}
