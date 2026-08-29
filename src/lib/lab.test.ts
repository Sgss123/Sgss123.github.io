import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  getLabExperiment,
  LAB_EXPERIMENTS,
  legacyLabRedirects,
  requireLabExperiment,
} from "./lab.ts";
import { locales } from "./routing.ts";

const expectedSlugs = ["ssr", "isr", "ssg", "streaming", "node-functions", "edge-functions"];

function readMessages(locale: string): unknown {
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

test("the lab exposes the six retained rendering experiments", () => {
  assert.deepEqual(
    LAB_EXPERIMENTS.map((experiment) => experiment.slug),
    expectedSlugs,
  );
});

test("experiment lookup rejects unknown slugs", () => {
  assert.equal(getLabExperiment("ssr")?.renderMode, "SSR");
  assert.equal(getLabExperiment("not-real"), undefined);
});

test("registered slugs can be required without an optional result", () => {
  assert.equal(requireLabExperiment("streaming").demo, "streaming");
});

test("every legacy route redirects permanently to its English lab page", () => {
  assert.deepEqual(
    legacyLabRedirects,
    expectedSlugs.map((slug) => ({
      source: `/${slug}`,
      destination: `/lab/${slug}`,
      permanent: true,
    })),
  );
});

test("every experiment carries a title, a short summary and a description", () => {
  for (const experiment of LAB_EXPERIMENTS) {
    assert.ok(experiment.shortKey.endsWith(".short"), `${experiment.slug} needs a shortKey`);
    assert.ok(
      experiment.descriptionKey.endsWith(".description"),
      `${experiment.slug} needs a descriptionKey`,
    );
  }
});

test("experiment copy resolves in both locales", () => {
  const bundles = new Map(locales.map((locale) => [locale, readMessages(locale)]));

  for (const experiment of LAB_EXPERIMENTS) {
    for (const key of [experiment.titleKey, experiment.shortKey, experiment.descriptionKey]) {
      for (const locale of locales) {
        const value = readValue(bundles.get(locale), `Lab.experiments.${key}`);
        assert.equal(typeof value, "string", `${key} missing in ${locale}`);
        assert.ok(value.length > 0, `${key} is empty in ${locale}`);
      }
    }
  }
});

test("the short summary is shorter than the full description", () => {
  const bundle = readMessages("en");
  for (const experiment of LAB_EXPERIMENTS) {
    const short = readValue(bundle, `Lab.experiments.${experiment.shortKey}`);
    const full = readValue(bundle, `Lab.experiments.${experiment.descriptionKey}`);
    assert.ok(short.length < full.length, `${experiment.slug} summary is not shorter`);
  }
});
