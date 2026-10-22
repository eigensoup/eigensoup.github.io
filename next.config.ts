import type { NextConfig } from "next";

// Static export; Vercel serves out/ and applies the redirects in vercel.json.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
