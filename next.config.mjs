/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'staging.mediaquest.co',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  
  // Explicitly enable Turbopack (Next.js 16 default)
  turbopack: {},
};

export default nextConfig;