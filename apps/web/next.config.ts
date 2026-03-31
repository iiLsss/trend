import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    // Monorepo root (absolute path required by Turbopack)
    root: path.join(__dirname, "..", ".."),
  },
};

export default nextConfig;
