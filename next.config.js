/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "images.pexels.com", "res.cloudinary.com"],
  },
};

module.exports = withNextIntl(nextConfig);
