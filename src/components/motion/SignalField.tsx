"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  getSignalFieldPreset,
  type SignalFieldMotion,
  type SignalFieldPreset,
  type SignalFieldState,
  type SignalFieldVariant,
  signalMotionDisabled,
} from "@/lib/signal-field";
import { cn } from "@/lib/utils";

export interface SignalFieldProps {
  variant: SignalFieldVariant;
  className?: string;
  /** Accessible name. When omitted the field is treated as decorative. */
  label?: string;
  /**
   * Wait for the field to scroll into view before the entrance plays.
   * Set to `false` for above-the-fold compositions.
   */
  activateOnScroll?: boolean;
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Decorative signal-trace field rendered as inline SVG.
 *
 * Motion is CSS-driven rather than per-frame JavaScript: the entrance is a
 * `stroke-dashoffset` animation seeded from the measured path length, and the
 * pointer response writes two custom properties consumed by a CSS `translate`.
 * Pointer updates are coalesced into a single `requestAnimationFrame`, so
 * moving the cursor can never schedule more than one style write per frame, and
 * the pending frame is cancelled on unmount.
 *
 * The server render emits the completed composition with no animation, so the
 * field is correct without JavaScript and reduced-motion users simply never
 * receive the entrance.
 */
export function SignalField({
  variant,
  className,
  label,
  activateOnScroll = true,
}: SignalFieldProps) {
  const preset: SignalFieldPreset = getSignalFieldPreset(variant);
  const containerRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef<number | null>(null);
  const [state, setState] = useState<SignalFieldState>("complete");
  const [motion, setMotion] = useState<SignalFieldMotion>(signalMotionDisabled);
  const [lengths, setLengths] = useState<number[]>([]);
  // The entrance must play at most once. Without this latch the completion
  // effect flips `state` back to "complete", which re-runs the activation
  // effect and restarts the draw in an endless loop.
  const playedRef = useRef(false);

  // Match the user's motion preference, and follow it if it changes.
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const sync = () => setMotion(query.matches ? signalMotionDisabled : preset.motion);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [preset]);

  // Measure each trace so the entrance can draw it exactly. The measurement is
  // discarded unless the DOM already matches the preset, which guards against
  // recording lengths from a previous variant mid-render.
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    const paths = element.querySelectorAll<SVGPathElement>("path.signal-line");
    if (paths.length !== preset.lines.length) return;
    playedRef.current = false;
    setLengths(Array.from(paths, (path) => path.getTotalLength()));
  }, [preset]);

  // Start the entrance once the field is on screen and its traces are measured.
  // `state` is deliberately not a dependency: the completion effect returns the
  // field to "complete", which would otherwise re-arm this effect.
  useEffect(() => {
    if (!motion.draw || playedRef.current) return;
    if (lengths.length === 0) return;

    const element = containerRef.current;
    if (!element) return;

    const start = () => {
      playedRef.current = true;
      setState("drawing");
    };

    if (!activateOnScroll) {
      start();
      return;
    }

    // Without IntersectionObserver the field simply stays in its completed
    // state rather than animating late or never resolving.
    if (typeof IntersectionObserver === "undefined") {
      playedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { threshold: preset.threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [activateOnScroll, lengths.length, motion.draw, preset.threshold]);

  // Return to the solid, completed composition when the entrance finishes.
  useEffect(() => {
    if (state !== "drawing") return;
    const total = motion.durationMs + motion.staggerMs * Math.max(preset.lines.length - 1, 0);
    const timer = window.setTimeout(() => setState("complete"), total);
    return () => window.clearTimeout(timer);
  }, [motion.durationMs, motion.staggerMs, preset.lines.length, state]);

  // Pointer parallax, coalesced to a single write per animation frame.
  useEffect(() => {
    const element = containerRef.current;
    if (!element || motion.pointerShift <= 0) return;

    const onPointerMove = (event: PointerEvent) => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
        const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
        element.style.setProperty("--signal-shift-x", `${dx * motion.pointerShift}px`);
        element.style.setProperty("--signal-shift-y", `${dy * motion.pointerShift}px`);
      });
    };

    const onPointerLeave = () => {
      element.style.setProperty("--signal-shift-x", "0px");
      element.style.setProperty("--signal-shift-y", "0px");
    };

    element.addEventListener("pointermove", onPointerMove, { passive: true });
    element.addEventListener("pointerleave", onPointerLeave);
    return () => {
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [motion.pointerShift]);

  const rootStyle = {
    "--signal-field-stroke-width": preset.strokeWidth,
    "--signal-motion-duration": `${motion.durationMs}ms`,
    "--signal-motion-ease": "cubic-bezier(0.22, 0.61, 0.36, 1)",
  } as CSSProperties;

  return (
    <svg
      ref={containerRef}
      viewBox={preset.viewBox}
      className={cn("signal-field", className)}
      data-state={state}
      data-variant={preset.variant}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      fill="none"
      style={rootStyle}
    >
      <g
        style={{
          transform:
            motion.pointerShift > 0
              ? "translate(var(--signal-shift-x, 0px), var(--signal-shift-y, 0px))"
              : undefined,
          transition:
            motion.pointerShift > 0 ? "transform 320ms var(--signal-motion-ease)" : undefined,
        }}
      >
        {preset.lines.map((line, index) => (
          <path
            key={`${preset.variant}-line-${line.d.slice(0, 12)}`}
            d={line.d}
            className={cn(
              "signal-line",
              line.accent && "signal-line-accent",
              line.muted && "signal-line-muted",
            )}
            style={
              {
                "--signal-field-length": lengths[index],
                animationDelay: motion.draw ? `${index * motion.staggerMs}ms` : undefined,
              } as CSSProperties
            }
          />
        ))}
        {preset.nodes.map((node) => (
          <rect
            key={`${preset.variant}-node-${node.x}-${node.y}`}
            x={node.x - node.size / 2}
            y={node.y - node.size / 2}
            width={node.size}
            height={node.size}
            className={cn("signal-node", node.accent && "signal-node-accent")}
          />
        ))}
      </g>
    </svg>
  );
}
