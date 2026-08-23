import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { defaultLocale, locales } from "@/lib/routing";

// Fallback for hosts that do not execute the next-intl proxy (middleware),
// e.g. EdgeOne Pages static hosting. In such environments "/" has no
// [locale] segment to match and would otherwise 404. Where the proxy does
// run it takes precedence, so this page is only reached as a last resort.
function detectLocale(cookieValue: string | undefined, acceptLanguage: string | null): string {
  if (cookieValue && (locales as readonly string[]).includes(cookieValue)) {
    return cookieValue;
  }
  const firstLanguage = acceptLanguage?.split(",")[0];
  const base = firstLanguage?.split(";")[0]?.trim().toLowerCase().split("-")[0];
  if (base && (locales as readonly string[]).includes(base)) {
    return base;
  }
  return defaultLocale;
}

export default async function RootPage() {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = detectLocale(
    cookieStore.get("WATERSPO_LOCALE")?.value,
    headerStore.get("accept-language"),
  );
  redirect(locale === "en" ? "/en" : "/zh");
}
