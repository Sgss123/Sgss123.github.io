import assert from "node:assert/strict";
import test from "node:test";
import {
  getSignalFieldPreset,
  resolveSignalFieldMotion,
  SIGNAL_FIELD_PRESETS,
  type SignalFieldPreset,
  type SignalFieldVariant,
  signalFieldEntranceDuration,
  signalFieldVariants,
  signalMotionDisabled,
} from "./signal-field.ts";

const presets = signalFieldVariants.map((variant) => getSignalFieldPreset(variant));

function viewBoxParts(preset: SignalFieldPreset) {
  return preset.viewBox.split(" ").map(Number);
}

test("the public contract exposes exactly the hero, band and lab variants", () => {
  assert.deepEqual([...signalFieldVariants], ["hero", "band", "lab"]);
  assert.deepEqual(Object.keys(SIGNAL_FIELD_PRESETS).sort(), ["band", "hero", "lab"]);
});

test("every preset declares a positive, four-number viewBox", () => {
  for (const preset of presets) {
    const parts = viewBoxParts(preset);
    assert.equal(parts.length, 4, `${preset.variant} viewBox must have 4 numbers`);
    const [minX, minY, width, height] = parts;
    assert.equal(minX, 0, `${preset.variant} viewBox must start at x=0`);
    assert.equal(minY, 0, `${preset.variant} viewBox must start at y=0`);
    assert.ok(width > 0 && height > 0, `${preset.variant} viewBox must have area`);
    assert.ok(
      Number.isInteger(width) && Number.isInteger(height),
      `${preset.variant} viewBox must use whole units`,
    );
  }
});

test("every preset carries traces and a positive stroke width", () => {
  for (const preset of presets) {
    assert.ok(preset.lines.length >= 2, `${preset.variant} needs at least two lines`);
    assert.ok(preset.strokeWidth > 0, `${preset.variant} strokeWidth must be positive`);
    for (const line of preset.lines) {
      assert.match(line.d, /^M/, `${preset.variant} line must start with a moveto`);
    }
    assert.ok(
      preset.lines.some((line) => line.accent),
      `${preset.variant} needs an accent trace`,
    );
  }
});

test("every node sits inside its preset viewBox", () => {
  for (const preset of presets) {
    const [, , width, height] = viewBoxParts(preset);
    for (const node of preset.nodes) {
      assert.ok(node.size > 0, `${preset.variant} node size must be positive`);
      assert.ok(node.x >= 0 && node.x <= width, `${preset.variant} node x out of bounds`);
      assert.ok(node.y >= 0 && node.y <= height, `${preset.variant} node y out of bounds`);
    }
    assert.ok(
      preset.nodes.some((node) => node.accent),
      `${preset.variant} needs an accent node`,
    );
  }
});

test("activation thresholds are a visible but reachable share", () => {
  for (const preset of presets) {
    assert.ok(
      preset.threshold > 0 && preset.threshold <= 0.5,
      `${preset.variant} threshold must sit in (0, 0.5]`,
    );
  }
});

test("motion defaults are enabled for every preset", () => {
  for (const preset of presets) {
    assert.equal(preset.motion.draw, true, `${preset.variant} should draw by default`);
    assert.ok(preset.motion.pointerShift > 0, `${preset.variant} should respond to the pointer`);
    assert.ok(preset.motion.durationMs > 0, `${preset.variant} needs an entrance duration`);
    assert.ok(preset.motion.staggerMs > 0, `${preset.variant} needs a line stagger`);
  }
});

test("reduced motion resolves to a static, pointer-free field", () => {
  for (const variant of signalFieldVariants) {
    const preset = getSignalFieldPreset(variant);
    const reduced = resolveSignalFieldMotion(preset, true);

    assert.equal(reduced.draw, false, `${variant} must not animate under reduced motion`);
    assert.equal(reduced.pointerShift, 0, `${variant} must ignore the pointer`);
    assert.equal(reduced.durationMs, 0, `${variant} must not reserve entrance time`);
    assert.deepEqual(reduced, signalMotionDisabled);
    assert.equal(signalFieldEntranceDuration(reduced), 0);
  }
});

test("full motion resolves to the preset's own settings", () => {
  for (const preset of presets) {
    assert.deepEqual(resolveSignalFieldMotion(preset, false), preset.motion);
    assert.equal(signalFieldEntranceDuration(preset.motion), preset.motion.durationMs);
  }
});

test("variants stay visually distinct", () => {
  const viewBoxes = new Set(presets.map((preset: SignalFieldPreset) => preset.viewBox));
  assert.equal(viewBoxes.size, presets.length);

  const heroSize = viewBoxParts(getSignalFieldPreset("hero"));
  const labSize = viewBoxParts(getSignalFieldPreset("lab"));
  assert.ok(heroSize[2] > labSize[2], "the hero field should be the widest composition");

  const variantNames = presets.map((preset) => preset.variant);
  assert.deepEqual(variantNames, ["hero", "band", "lab"] as SignalFieldVariant[]);
});
