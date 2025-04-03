import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Leave empty if not needed
        pathname: '/**', // Allows all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '', // Leave empty if not needed
        pathname: '/**', // Allows all paths under this hostname
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/**', // This allows all paths under the domain
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**', // This allows all paths under the domain
      },
    ],
  },
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
  webpack: (config, { isServer }) => {
    // Disable source maps in production
    if (!isServer) {
      config.devtool = false; // Disable source maps for client-side
    }
    return config;
  },
};

export default nextConfig;