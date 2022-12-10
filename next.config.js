/** @type {import('next').NextConfig} */
const nextConfig = 
{
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['image.space.rakuten.co.jp'],
  }
}

module.exports = nextConfig
