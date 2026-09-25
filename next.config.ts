import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/programs/the-skill-hut',
        destination: '/programs',
        permanent: false,
      },
      {
        source: '/simulation',
        destination: '/simulations',
        permanent: true,
      },
      {
        source: '/echelon',
        destination: '/simulations',
        permanent: true,
      },
      {
        source: '/echelon/brain-game-training',
        destination: '/simulations/virtual-training',
        permanent: true,
      },
      {
        source: '/echelon/tabletop-games',
        destination: '/tabletop-games',
        permanent: true,
      },
      {
        source: '/echelon-project-africa/:path*',
        destination: '/simulations',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
