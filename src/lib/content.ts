export interface ServiceItem {
  id: "saas" | "operations" | "development";
  titleKey: string;
  descriptionKey: string;
}

export interface ProductItem {
  id: "bridge" | "sentenceGymnasium";
  titleKey: string;
  descriptionKey: string;
  href: string;
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

export const PRODUCT_ITEMS: readonly ProductItem[] = [
  {
    id: "bridge",
    titleKey: "products.bridge.title",
    descriptionKey: "products.bridge.description",
    href: "https://ai.waterspo.top",
  },
  {
    id: "sentenceGymnasium",
    titleKey: "products.sentenceGymnasium.title",
    descriptionKey: "products.sentenceGymnasium.description",
    href: "https://sentencegym.waterspo.top",
  },
];
