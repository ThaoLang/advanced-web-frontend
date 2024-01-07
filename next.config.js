/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  env: {
    customKey: "my-value",
  },
  experimental: {
    scrollRestoration: true,
  },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
