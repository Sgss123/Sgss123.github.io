import assert from "node:assert/strict";
import test from "node:test";
import { PRODUCT_ITEMS } from "./content.ts";

test("lists the two launched products with their public URLs", () => {
  assert.deepEqual(
    PRODUCT_ITEMS.map(({ id, href }) => ({ id, href })),
    [
      { id: "bridge", href: "https://ai.waterspo.top" },
      { id: "sentenceGymnasium", href: "https://sentencegym.waterspo.top" },
    ],
  );
});
