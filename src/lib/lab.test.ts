import assert from "node:assert/strict";
import test from "node:test";
import {
  getLabExperiment,
  LAB_EXPERIMENTS,
  legacyLabRedirects,
  requireLabExperiment,
} from "./lab.ts";

const expectedSlugs = ["ssr", "isr", "ssg", "streaming", "node-functions", "edge-functions"];

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
