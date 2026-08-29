import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EditorialSectionProps {
  /** Small mono label above the heading. */
  eyebrow?: string;
  title?: string;
  /** Intro copy that sits under the heading. */
  lead?: string;
  /** Heading level. Sections default to `h2` because pages own their `h1`. */
  as?: "h1" | "h2" | "h3";
  /** Renders the section on the inverted signal band. */
  inverted?: boolean;
  className?: string;
  children?: ReactNode;
}

/**
 * Shared editorial section: a hairline rule, a mono eyebrow, a display heading
 * and optional lead copy, followed by the section body.
 */
export function EditorialSection({
  eyebrow,
  title,
  lead,
  as: Heading = "h2",
  inverted = false,
  className,
  children,
}: EditorialSectionProps) {
  const headingId = title ? `section-${toSlug(title)}` : undefined;

  return (
    <section
      className={cn("editorial-section", inverted && "signal-band", className)}
      aria-labelledby={headingId}
    >
      <div className="site-container">
        {(eyebrow || title || lead) && (
          <div className="editorial-grid mb-10">
            <div>
              {eyebrow ? <p className="editorial-eyebrow">{eyebrow}</p> : null}
              {title ? (
                <Heading id={headingId} className="font-display text-display-lg mt-3">
                  {title}
                </Heading>
              ) : null}
            </div>
            {lead ? <p className="editorial-lead">{lead}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9一-鿿]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
