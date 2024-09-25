/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
  remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.shopify.com',
      pathname: '/**', // Updated to allow all paths

    }],
  },
};

export default nextConfig;