import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        hostname: 'ranveersoni.me',
      },
      {
        hostname: 'codemeapixel.dev',
      },
      {
        hostname: 'cordx.ca',
      },
    ],
  },
};

export default nextConfig;
