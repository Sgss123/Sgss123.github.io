import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { legacyLabRedirects } from "./src/lib/lab";

const nextConfig: NextConfig = {
  // Required by EdgeOne Makers / local dev via IP: 127.0.0.1
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [...legacyLabRedirects];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
