/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Root-relative assets (/_next/...) so `npm run dev`, `serve out`, and most hosts work.
  // For GitHub Pages at /repo-name/, rebuild with: BASE_PATH=/repo-name next build
  ...(process.env.BASE_PATH
    ? {
        basePath: process.env.BASE_PATH,
        assetPrefix: `${process.env.BASE_PATH}/`,
      }
    : {}),
};

export default nextConfig;
