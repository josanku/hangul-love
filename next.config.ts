import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Serve the standalone p5.js art pieces (copied into public/gallery)
    return [
      { source: "/gallery/:file", destination: "/gallery/:file" },
    ];
  },
};

export default nextConfig;
