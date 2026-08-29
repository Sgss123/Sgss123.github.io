export interface ServiceItem {
  id: "saas" | "operations" | "development";
  titleKey: string;
  descriptionKey: string;
}

/**
 * Presentation of a product card inside the two-up grid. `featured` gives the
 * product the wider column and the accent frame.
 */
export type ProductEmphasis = "featured" | "standard";

export interface ProductMedia {
  /** Base name under `/product-media`, without the `-{width}.{ext}` suffix. */
  slug: string;
  /** Intrinsic pixel size of the widest generated asset. */
  width: number;
  height: number;
  /** Inline WebP placeholder shown while the full asset decodes. */
  placeholder: string;
  altKey: string;
}

export interface ProductItem {
  id: "bridge" | "sentenceGymnasium";
  titleKey: string;
  descriptionKey: string;
  href: string;
  /** Short label used in the Lab proof strip and the card meta line. */
  kindKey: string;
  emphasis: ProductEmphasis;
  media: ProductMedia;
}

export const SERVICE_ITEMS: readonly ServiceItem[] = [
  { id: "saas", titleKey: "items.saas.title", descriptionKey: "items.saas.description" },
  {
    id: "operations",
    titleKey: "items.operations.title",
    descriptionKey: "items.operations.description",
  },
  {
    id: "development",
    titleKey: "items.development.title",
    descriptionKey: "items.development.description",
  },
];

/**
 * Screenshot geometry is fixed by the build: the captures are taken at 1440
 * wide and cropped to a 720-tall representative UI region, so the aspect ratio
 * is 2:1 and the widest asset is 1440x720.
 */
const MEDIA_WIDTH = 1440;
const MEDIA_HEIGHT = 720;

const BRIDGE_PLACEHOLDER =
  "data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAgCdASoYAAwAPxFysFAsJqSisAgBgCIJZQC06C0kAAD+7cZnGGMTySFCXrp+hMAxzd6ZeHdke88AAAA=";

const SENTENCE_GYMNASIUM_PLACEHOLDER =
  "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACQAwCdASoYAAwAPxF6tFAsKCUisAgBgCIJYwC06GlRV4j5eC9AAP78Fm1WNWSBplohZ9T7UEHFKBUt/T1bYkXLQBHEbKyHsAA=";

export const PRODUCT_ITEMS: readonly ProductItem[] = [
  {
    id: "bridge",
    titleKey: "products.bridge.title",
    descriptionKey: "products.bridge.description",
    href: "https://ai.waterspo.top",
    kindKey: "products.bridge.kind",
    emphasis: "featured",
    media: {
      slug: "bridge",
      width: MEDIA_WIDTH,
      height: MEDIA_HEIGHT,
      placeholder: BRIDGE_PLACEHOLDER,
      altKey: "products.bridge.alt",
    },
  },
  {
    id: "sentenceGymnasium",
    titleKey: "products.sentenceGymnasium.title",
    descriptionKey: "products.sentenceGymnasium.description",
    href: "https://sentencegym.waterspo.top",
    kindKey: "products.sentenceGymnasium.kind",
    emphasis: "standard",
    media: {
      slug: "sentence-gymnasium",
      width: MEDIA_WIDTH,
      height: MEDIA_HEIGHT,
      placeholder: SENTENCE_GYMNASIUM_PLACEHOLDER,
      altKey: "products.sentenceGymnasium.alt",
    },
  },
];

export function productMediaSources(slug: string, width: number) {
  return {
    avif: `/product-media/${slug}-${width}.avif`,
    webp: `/product-media/${slug}-${width}.webp`,
    jpg: `/product-media/${slug}-${width}.jpg`,
  };
}

export const PRODUCT_MEDIA_WIDTHS = [720, 1440] as const;
