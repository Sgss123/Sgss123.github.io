import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyLabRedirects } from "./src/lib/lab";

const nextConfig: NextConfig = {
  async redirects() {
    return [...legacyLabRedirects];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
