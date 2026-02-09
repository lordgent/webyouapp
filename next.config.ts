import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api-backend/:path*',
        destination: 'http://203.175.11.147:8085/:path*',
      },
    ];
  },
};

export default nextConfig;