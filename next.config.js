/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // output: "export",
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  basePath: isProd ? "/advanced-web-frontend" : "",
  assetPrefix: isProd ? "/advanced-web-frontend/" : "",
};
