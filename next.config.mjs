/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;