/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ["localhost", "linkmusic.ru"] },
  swcMinify: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
}

module.exports = nextConfig
