import assert from "node:assert/strict";
import test from "node:test";
import {
  documentLanguages,
  fallbackDocumentLanguage,
  getDocumentLanguage,
  locales,
} from "./routing.ts";

test('English documents declare lang="en"', () => {
  assert.equal(getDocumentLanguage("en"), "en");
});

test('Chinese documents declare lang="zh-CN"', () => {
  assert.equal(getDocumentLanguage("zh"), "zh-CN");
});

test("every supported locale maps to exactly one BCP 47 tag", () => {
  assert.deepEqual(Object.keys(documentLanguages).sort(), [...locales].sort());
  for (const locale of locales) {
    assert.match(documentLanguages[locale], /^[a-z]{2}(-[A-Z]{2})?$/);
  }
});

test("the fallback documents stay English", () => {
  assert.equal(fallbackDocumentLanguage, documentLanguages.en);
});
