import type { NextConfig } from "next";

// Static export: the site deploys to any static host (Vercel, Netlify, GitHub Pages, S3).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
