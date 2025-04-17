import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '**', // Allows all paths under this hostname
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
