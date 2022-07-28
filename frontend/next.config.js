/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["localhost", "linkmusic.ru"] },
  swcMinify: true,
}

module.exports = nextConfig
