import { ArrowUpRight } from "lucide-react";
import { ProductMedia } from "@/components/product/ProductMedia";
import type { ProductItem } from "@/lib/content";

interface ProductCardProps {
  product: ProductItem;
  title: string;
  description: string;
  kind: string;
  alt: string;
  visit: string;
  /** Only the first product above the fold should preload its screenshot. */
  priority?: boolean;
}

export function ProductCard({
  product,
  title,
  description,
  kind,
  alt,
  visit,
  priority = false,
}: ProductCardProps) {
  const featured = product.emphasis === "featured";

  return (
    <article
      className={
        featured
          ? "editorial-grid gap-0 border-t border-[var(--border)] pt-8 first:border-t-0 first:pt-0"
          : "editorial-grid gap-0 border-t border-[var(--border)] pt-8"
      }
    >
      <div className="flex flex-col gap-4">
        <p className="editorial-eyebrow">{kind}</p>
        <h3 className="font-display text-display-sm">{title}</h3>
        <p className="max-w-md leading-7 text-[var(--muted-foreground)]">{description}</p>
        <a
          href={product.href}
          target="_blank"
          rel="noopener noreferrer"
          className="editorial-link self-start"
        >
          {visit}
          <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only"> ({title})</span>
        </a>
      </div>
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title} — ${visit}`}
        className="group mt-6 block overflow-hidden border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-[var(--accent)] md:mt-0"
      >
        <ProductMedia
          media={product.media}
          alt={alt}
          priority={priority}
          className="w-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]"
        />
      </a>
    </article>
  );
}
