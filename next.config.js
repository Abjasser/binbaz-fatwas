/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses for better performance
  compress: true,
  // Strict mode for catching potential issues
  reactStrictMode: true,
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
