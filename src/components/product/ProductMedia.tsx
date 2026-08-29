import {
  PRODUCT_MEDIA_WIDTHS,
  type ProductMedia as ProductMediaData,
  productMediaSources,
} from "@/lib/content";

interface ProductMediaProps {
  media: ProductMediaData;
  /** Translated alternative text. */
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Responsive product screenshot. AVIF is served where supported, WebP next and
 * JPEG last; the aspect ratio is reserved up front so the card never shifts,
 * and the inline placeholder keeps the frame from flashing empty.
 */
export function ProductMedia({ media, alt, className, priority = false }: ProductMediaProps) {
  const [narrow, wide] = PRODUCT_MEDIA_WIDTHS;
  const narrowSources = productMediaSources(media.slug, narrow);
  const wideSources = productMediaSources(media.slug, wide);

  return (
    <div className={className} style={{ aspectRatio: `${media.width} / ${media.height}` }}>
      <picture>
        <source
          type="image/avif"
          srcSet={`${narrowSources.avif} ${narrow}w, ${wideSources.avif} ${wide}w`}
          sizes="(min-width: 1024px) 720px, 100vw"
        />
        <source
          type="image/webp"
          srcSet={`${narrowSources.webp} ${narrow}w, ${wideSources.webp} ${wide}w`}
          sizes="(min-width: 1024px) 720px, 100vw"
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- served from /public with fixed geometry */}
        <img
          src={wideSources.jpg}
          srcSet={`${narrowSources.jpg} ${narrow}w, ${wideSources.jpg} ${wide}w`}
          sizes="(min-width: 1024px) 720px, 100vw"
          width={media.width}
          height={media.height}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          className="size-full object-cover object-top"
          style={{ backgroundImage: `url(${media.placeholder})`, backgroundSize: "cover" }}
        />
      </picture>
    </div>
  );
}
