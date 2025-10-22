import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimize build for Vercel deployment
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
}

export default nextConfig
