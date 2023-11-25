/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    customKey: "my-value",
  },
};

const withNextIntl = require("next-intl/plugin")();

module.exports = withNextIntl(nextConfig);
