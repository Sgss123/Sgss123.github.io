"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { type SVGProps, useEffect, useState } from "react";
import type { ThemeMode } from "@/components/providers/ThemeProvider";
import { IconButton } from "@/components/ui/IconButton";

function SystemIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5a8.5 8.5 0 0 1 0 17Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const themes: Array<{ value: ThemeMode; icon: typeof Sun | typeof SystemIcon }> = [
  { value: "light", icon: Sun },
  { value: "system", icon: SystemIcon },
  { value: "dark", icon: Moon },
];

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Common.theme");

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-9 w-[108px]" aria-hidden="true" />;

  return (
    <fieldset className="inline-flex">
      <legend className="sr-only">{t("label")}</legend>
      {themes.map(({ value, icon: Icon }) => (
        <IconButton
          key={value}
          onClick={() => setTheme(value)}
          aria-label={t(value)}
          aria-pressed={theme === value}
          className={theme === value ? "bg-[var(--surface-strong)] text-[var(--accent-text)]" : ""}
        >
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
        </IconButton>
      ))}
    </fieldset>
  );
}
