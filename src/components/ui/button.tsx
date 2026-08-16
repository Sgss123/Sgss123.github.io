import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 motion-safe:hover:-translate-y-px",
  {
    variants: {
      variant: {
        default:
          "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]",
        destructive:
          "border-[var(--accent)] bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]",
        outline:
          "border-[var(--accent)] bg-transparent text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]",
        secondary:
          "border-[var(--border-strong)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-strong)]",
        ghost:
          "border-transparent bg-transparent text-[var(--foreground)] hover:border-[var(--border)] hover:bg-[var(--surface)]",
        link: "h-auto border-0 bg-transparent p-0 text-[var(--accent-text)] underline-offset-4 hover:underline motion-safe:hover:translate-y-0",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-3.5",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
