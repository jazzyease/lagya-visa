/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/lagya-visa',
  assetPrefix: '/lagya-visa/',
};

export default nextConfig;
