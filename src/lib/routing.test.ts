import assert from "node:assert/strict";
import test from "node:test";
import { getLocaleFromPath, localizePath, stripLocalePrefix } from "./routing.ts";

test("English paths stay unprefixed", () => {
  assert.equal(localizePath("en", "/services"), "/services");
  assert.equal(localizePath("en", "/zh/lab/ssr"), "/lab/ssr");
});

test("Chinese paths receive exactly one zh prefix", () => {
  assert.equal(localizePath("zh", "/services"), "/zh/services");
  assert.equal(localizePath("zh", "/zh/services"), "/zh/services");
  assert.equal(localizePath("zh", "/"), "/zh");
});

test("query strings and hashes survive locale changes", () => {
  assert.equal(localizePath("zh", "/lab/ssr?view=code#result"), "/zh/lab/ssr?view=code#result");
  assert.equal(stripLocalePrefix("/zh/lab/ssr?view=code#result"), "/lab/ssr?view=code#result");
});

test("locale is derived from the visible path", () => {
  assert.equal(getLocaleFromPath("/zh/about"), "zh");
  assert.equal(getLocaleFromPath("/about"), "en");
  assert.equal(getLocaleFromPath("/zh"), "zh");
});
