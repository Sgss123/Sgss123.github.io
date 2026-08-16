import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "@/lib/routing";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
  localeCookie: {
    name: "WATERSPO_LOCALE",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});
