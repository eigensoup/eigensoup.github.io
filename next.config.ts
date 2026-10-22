import type { NextConfig } from "next";

// Static export: the site is served from GitHub Pages (main:/docs).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
