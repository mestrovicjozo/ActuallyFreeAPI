import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Optimize build for Vercel deployment
  typescript: {
    ignoreBuildErrors: false,
  },
}

export default nextConfig
