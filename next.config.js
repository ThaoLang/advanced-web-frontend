/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: "my-value",
  },
  experimental: {
    scrollRestoration: true,
  },
  output: "export",
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
