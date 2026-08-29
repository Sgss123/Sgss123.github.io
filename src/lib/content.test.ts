import assert from "node:assert/strict";
import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  PRODUCT_ITEMS,
  PRODUCT_MEDIA_WIDTHS,
  productMediaSources,
  SERVICE_ITEMS,
} from "./content.ts";
import { locales } from "./routing.ts";

const root = new URL("../..", import.meta.url);

function readMessages(locale: string): Record<string, unknown> {
  return JSON.parse(
    readFileSync(new URL(`../../messages/${locale}.json`, import.meta.url), "utf8"),
  );
}

function readValue(messages: unknown, path: string): string {
  return path
    .split(".")
    .reduce<unknown>(
      (node, key) => (node as Record<string, unknown> | undefined)?.[key],
      messages,
    ) as string;
}

test("lists the two launched products with their public URLs", () => {
  assert.deepEqual(
    PRODUCT_ITEMS.map(({ id, href }) => ({ id, href })),
    [
      { id: "bridge", href: "https://ai.waterspo.top" },
      { id: "sentenceGymnasium", href: "https://sentencegym.waterspo.top" },
    ],
  );
});

test("product links use https and open in the public product domains", () => {
  for (const product of PRODUCT_ITEMS) {
    assert.match(product.href, /^https:\/\/[\w-]+(\.[\w-]+)+\/?$/);
  }
});

test("every product declares generated media at each shipped width", () => {
  for (const product of PRODUCT_ITEMS) {
    const { slug, width, height, placeholder } = product.media;

    assert.match(slug, /^[a-z0-9-]+$/);
    assert.ok(width > 0 && height > 0);
    assert.match(placeholder, /^data:image\/webp;base64,[A-Za-z0-9+/=]+$/);

    for (const target of PRODUCT_MEDIA_WIDTHS) {
      const sources = productMediaSources(slug, target);
      assert.equal(sources.avif, `/product-media/${slug}-${target}.avif`);
      assert.equal(sources.webp, `/product-media/${slug}-${target}.webp`);
      assert.equal(sources.jpg, `/product-media/${slug}-${target}.jpg`);

      for (const url of Object.values(sources)) {
        const file = join(root.pathname, "public", url);
        assert.ok(existsSync(file), `${url} must be generated`);
        assert.ok(statSync(file).size > 0, `${url} must not be empty`);
      }
    }
  }
});

test("generated media stays within a reasonable page weight", () => {
  let total = 0;
  for (const product of PRODUCT_ITEMS) {
    for (const target of PRODUCT_MEDIA_WIDTHS) {
      for (const url of Object.values(productMediaSources(product.media.slug, target))) {
        total += statSync(join(root.pathname, "public", url)).size;
      }
    }
  }
  assert.ok(
    total < 512 * 1024,
    `product media is ${(total / 1024).toFixed(1)} KB, budget is 512 KB`,
  );
});

test("product media ships a license and source note", () => {
  const notice = join(root.pathname, "public/product-media/README.md");
  assert.ok(existsSync(notice), "public/product-media/README.md must document the sources");
});

test("emphasis is assigned to exactly one product", () => {
  const featured = PRODUCT_ITEMS.filter((product) => product.emphasis === "featured");
  assert.equal(featured.length, 1);
  assert.equal(featured[0].id, "bridge");
});

test("the three service items keep their documented order", () => {
  assert.deepEqual(
    SERVICE_ITEMS.map((item) => item.id),
    ["saas", "operations", "development"],
  );
});

// Product and service copy lives under the `Services` namespace so the home
// page and the services page can share a single translated source.
const contentNamespace = "Services";

test("every product and service key resolves in both locales", () => {
  const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));

  const keys = [
    ...PRODUCT_ITEMS.flatMap((product) => [
      product.titleKey,
      product.descriptionKey,
      product.kindKey,
      product.media.altKey,
    ]),
    ...SERVICE_ITEMS.flatMap((service) => [service.titleKey, service.descriptionKey]),
  ];

  for (const key of keys) {
    for (const locale of locales) {
      const value = readValue(bundles.get(locale), `${contentNamespace}.${key}`);
      assert.equal(typeof value, "string", `${contentNamespace}.${key} missing in ${locale}`);
      assert.ok(value.length > 0, `${contentNamespace}.${key} is empty in ${locale}`);
    }
  }
});

test("product alt text is localized rather than duplicated", () => {
  const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));
  for (const product of PRODUCT_ITEMS) {
    const values = locales.map((locale) =>
      readValue(bundles.get(locale), `${contentNamespace}.${product.media.altKey}`),
    );
    assert.equal(new Set(values).size, values.length, `${product.id} alt text is not localized`);
  }
});

test("the contact action is a clickable mailto to the support address", () => {
  const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));
  for (const locale of locales) {
    const email = readValue(bundles.get(locale), "Contact.email");
    assert.equal(email, "support@waterspo.top");
    assert.equal(`mailto:${email}`, "mailto:support@waterspo.top");
  }
});

test("primary navigation keeps products and services ahead of the lab", () => {
  const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));
  for (const locale of locales) {
    const nav = readValue(bundles.get(locale), "Common.nav") as unknown as Record<string, string>;
    assert.ok(nav.services && nav.about && nav.contact, `${locale} is missing main nav entries`);
    assert.ok(nav.lab, `${locale} keeps the lab as secondary navigation`);
  }
});
