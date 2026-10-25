/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // No remote image patterns are allowed — all imagery is local under /public/assets.
    remotePatterns: [],
    formats: ["image/webp", "image/avif"],
  },
  // Strict local-only asset policy: do not allow external image URLs.
  // All product, hero, logo, and facility images must live in /public/assets.
};

export default nextConfig;
