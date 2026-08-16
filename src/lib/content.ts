export interface ServiceItem {
  id: "saas" | "operations" | "development";
  titleKey: string;
  descriptionKey: string;
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
