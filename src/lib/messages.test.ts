import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { locales } from "./routing.ts";

function readMessages(locale: string): unknown {
  const url = new URL(`../../messages/${locale}.json`, import.meta.url);
  return JSON.parse(readFileSync(url, "utf8"));
}

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object") return [prefix];
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    flattenKeys(child, prefix ? `${prefix}.${key}` : key),
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

const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));
const referenceKeys = flattenKeys(bundles.get("en")).sort();

test("every locale ships a message bundle", () => {
  for (const locale of locales) {
    assert.ok(bundles.has(locale), `missing messages/${locale}.json`);
  }
});

test("locales expose an identical message key set", () => {
  for (const locale of locales) {
    assert.deepEqual(flattenKeys(bundles.get(locale)).sort(), referenceKeys);
  }
});

test("message keys are unique after flattening", () => {
  assert.equal(new Set(referenceKeys).size, referenceKeys.length);
});

test("text shared across locales is byte-identical", () => {
  const sharedKeys = ["Common.footer.email", "Contact.email"];
  for (const key of sharedKeys) {
    const values = locales.map((locale) => readValue(bundles.get(locale), key));
    assert.equal(new Set(values).size, 1, `${key} differs across locales`);
    assert.equal(values[0], "support@waterspo.top");
  }
});

test("Chinese filings are present only in the Chinese bundle", () => {
  assert.notEqual(readValue(bundles.get("zh"), "Common.footer.icp"), "");
  assert.notEqual(readValue(bundles.get("zh"), "Common.footer.police"), "");
  assert.equal(readValue(bundles.get("en"), "Common.footer.icp"), "");
  assert.equal(readValue(bundles.get("en"), "Common.footer.police"), "");
});
