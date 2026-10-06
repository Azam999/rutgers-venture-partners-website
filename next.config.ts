import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static files in `out/` so the site runs on any static host.
  output: "export",
  // Emit `/vip/index.html` instead of `/vip.html`; works on hosts without rewrites.
  trailingSlash: true,
  // A static export has no image optimizer. Images in /public are pre-sized by
  // scripts/fetch-assets.mjs instead.
  images: { unoptimized: true },
  // Pin the project root so a stray lockfile in a parent folder can't be mistaken for it.
  turbopack: { root: __dirname },
};

export default nextConfig;
