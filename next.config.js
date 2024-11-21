/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  crossOrigin: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
}

module.exports = nextConfig
