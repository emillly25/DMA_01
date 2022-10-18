/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['postfiles.pstatic.net'],
  },
}

module.exports = nextConfig
