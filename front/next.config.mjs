/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "img.bbystatic.com",
      },
      {
        protocol: "https",
        hostname: "nextjs.org",
      },
    ],
  },
};

export default nextConfig;
