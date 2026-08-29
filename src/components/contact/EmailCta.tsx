"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface EmailCtaProps {
  /** Renders at the display scale used by the contact page. */
  size?: "display" | "section";
}

type CopyState = "idle" | "copied" | "failed";

/**
 * The primary contact action: a clickable `mailto:` link paired with a copy
 * button whose result is announced through a polite live region.
 */
export function EmailCta({ size = "section" }: EmailCtaProps) {
  const t = useTranslations("Contact");
  const common = useTranslations("Common.actions");
  const [state, setState] = useState<CopyState>("idle");
  const timerRef = useRef<number | null>(null);

  const email = t("email");
  const mailto = `mailto:${email}`;

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setState("idle"), 4000);
  }

  const display = size === "display";

  return (
    <div>
      <a
        href={mailto}
        aria-label={t("emailLabel")}
        className="group inline-block max-w-full align-bottom"
      >
        <span
          className={
            display
              ? "font-display block wrap-anywhere text-display-lg break-words underline decoration-[var(--accent)] decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-[var(--accent-hover)]"
              : "font-display block wrap-anywhere text-display-md break-words underline decoration-[var(--accent)] decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-[var(--accent-hover)]"
          }
        >
          {email}
        </span>
      </a>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href={mailto}>{common("emailUs")}</a>
        </Button>
        <Button variant="outline" size="lg" onClick={copy} type="button">
          {state === "copied" ? <Check className="size-4" aria-hidden="true" /> : null}
          {t("copy")}
        </Button>
      </div>

      <p aria-live="polite" className="mt-4 min-h-5 text-sm text-[var(--muted-foreground)]">
        {state === "copied" ? t("copied") : null}
        {state === "failed" ? t("copyFailed") : null}
      </p>
    </div>
  );
}
