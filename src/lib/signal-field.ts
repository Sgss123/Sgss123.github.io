/**
 * Public contract for the `SignalField` motion primitive.
 *
 * The presets are plain data so they can be unit tested without a DOM: the
 * component only renders what a preset describes, and every motion affordance
 * has a reduced-motion-safe default.
 */

export type SignalFieldVariant = "hero" | "band" | "lab";

export const signalFieldVariants = ["hero", "band", "lab"] as const;

export type SignalFieldState = "idle" | "drawing" | "complete";

export interface SignalFieldLine {
  /** SVG path data in the preset's viewBox coordinate space. */
  d: string;
  /** Renders in the signal red accent. */
  accent?: boolean;
  /** Renders as a dashed, lower-contrast trace. */
  muted?: boolean;
}

export interface SignalFieldNode {
  x: number;
  y: number;
  /** Edge length of the square node marker, in viewBox units. */
  size: number;
  accent?: boolean;
}

export interface SignalFieldMotion {
  /** Enables the line-draw entrance. */
  draw: boolean;
  /** Pointer parallax amplitude in viewBox units. `0` disables pointer response. */
  pointerShift: number;
  /** Entrance duration in milliseconds. */
  durationMs: number;
  /** Delay between consecutive lines in the entrance, in milliseconds. */
  staggerMs: number;
}

export interface SignalFieldPreset {
  variant: SignalFieldVariant;
  viewBox: string;
  strokeWidth: number;
  lines: readonly SignalFieldLine[];
  nodes: readonly SignalFieldNode[];
  motion: SignalFieldMotion;
  /** Visible share of the field required before the entrance activates. */
  threshold: number;
}

/** Motion settings used whenever the user asks for reduced motion. */
export const signalMotionDisabled: SignalFieldMotion = {
  draw: false,
  pointerShift: 0,
  durationMs: 0,
  staggerMs: 0,
};

const heroNodes: readonly SignalFieldNode[] = [
  { x: 46, y: 40, size: 5 },
  { x: 110, y: 40, size: 4 },
  { x: 190, y: 250, size: 6, accent: true },
  { x: 265, y: 80, size: 4 },
  { x: 340, y: 250, size: 6, accent: true },
  { x: 420, y: 40, size: 4 },
  { x: 500, y: 40, size: 5 },
  { x: 225, y: 40, size: 4 },
  { x: 300, y: 250, size: 5 },
  { x: 375, y: 80, size: 6, accent: true },
  { x: 455, y: 250, size: 4 },
  { x: 535, y: 40, size: 4 },
  { x: 610, y: 40, size: 5 },
];

const bandNodes: readonly SignalFieldNode[] = [
  { x: 24, y: 30, size: 8, accent: true },
  { x: 66, y: 56, size: 5 },
  { x: 104, y: 20, size: 5 },
  { x: 142, y: 88, size: 8, accent: true },
  { x: 182, y: 42, size: 5 },
  { x: 220, y: 112, size: 5 },
  { x: 258, y: 26, size: 8, accent: true },
  { x: 304, y: 68, size: 5 },
  { x: 344, y: 24, size: 5 },
  { x: 388, y: 98, size: 8, accent: true },
  { x: 430, y: 45, size: 5 },
  { x: 470, y: 114, size: 5 },
  { x: 512, y: 26, size: 8, accent: true },
  { x: 558, y: 70, size: 5 },
  { x: 604, y: 42, size: 5 },
  { x: 650, y: 104, size: 8, accent: true },
];

const labNodes: readonly SignalFieldNode[] = [
  { x: 12, y: 84, size: 6, accent: true },
  { x: 68, y: 40, size: 4 },
  { x: 116, y: 96, size: 4 },
  { x: 168, y: 24, size: 6, accent: true },
  { x: 220, y: 72, size: 4 },
  { x: 268, y: 36, size: 4 },
  { x: 308, y: 68, size: 6, accent: true },
];

export const SIGNAL_FIELD_PRESETS: Record<SignalFieldVariant, SignalFieldPreset> = {
  hero: {
    variant: "hero",
    viewBox: "0 0 660 300",
    strokeWidth: 1.2,
    lines: [
      { d: "M46 40h64l80 210 75-170 75 170 80-210h80", accent: true },
      { d: "M225 40h64l86 210 80-170 80 170 75-210" },
      { d: "M110 40 300 250M265 80 455 250M340 250 535 40", muted: true },
    ],
    nodes: heroNodes,
    motion: { draw: true, pointerShift: 14, durationMs: 900, staggerMs: 90 },
    threshold: 0.25,
  },
  band: {
    variant: "band",
    viewBox: "0 0 680 150",
    strokeWidth: 0.9,
    lines: [
      { d: "M24 30 104 20 142 88 220 112 258 26 344 24 388 98 470 114 512 26 604 42 650 104" },
      {
        d: "M66 56 182 42 220 112 304 68 388 98 430 45 558 70 650 104",
        muted: true,
      },
      { d: "M24 30 142 88 258 26 388 98 512 26 650 104", accent: true },
    ],
    nodes: bandNodes,
    motion: { draw: true, pointerShift: 8, durationMs: 700, staggerMs: 70 },
    threshold: 0.35,
  },
  lab: {
    variant: "lab",
    viewBox: "0 0 320 120",
    strokeWidth: 1,
    lines: [
      { d: "M12 84 68 40 116 96 168 24 220 72 268 36 308 68", accent: true },
      { d: "M12 100 92 108 156 52 212 104 308 96", muted: true },
    ],
    nodes: labNodes,
    motion: { draw: true, pointerShift: 5, durationMs: 600, staggerMs: 60 },
    threshold: 0.4,
  },
};

export function getSignalFieldPreset(variant: SignalFieldVariant): SignalFieldPreset {
  return SIGNAL_FIELD_PRESETS[variant];
}

/**
 * Resolves the motion settings for a preset. Reduced-motion users always get a
 * static, fully drawn field with no pointer response.
 */
export function resolveSignalFieldMotion(
  preset: SignalFieldPreset,
  prefersReducedMotion: boolean,
): SignalFieldMotion {
  return prefersReducedMotion ? signalMotionDisabled : preset.motion;
}

/** Total time the entrance occupies, including the per-line stagger. */
export function signalFieldEntranceDuration(motion: SignalFieldMotion): number {
  if (!motion.draw) return 0;
  return motion.durationMs;
}
