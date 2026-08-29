import { redirect } from "next/navigation";

// Root path fallback. In environments where the next-intl proxy (middleware)
// does not run (e.g. EdgeOne Pages), "/" has no [locale] segment to match and
// would otherwise 404. This static redirect is prerendered at build time, so it
// works even without a Node.js runtime. Where the proxy does run, it takes
// precedence and keeps its cookie/Accept-Language detection.
export default function RootPage() {
  redirect("/en");
}
