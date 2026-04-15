import type { NextConfig } from 'next'
// Bundle analyzer temporarily disabled - run `pnpm install` to enable
// import bundleAnalyzer from '@next/bundle-analyzer'

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true',
// })

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  experimental: {
    optimizePackageImports: ['recharts', 'lucide-react', 'framer-motion'],
  },
}

export default nextConfig
// To enable bundle analyzer: uncomment above lines and run `pnpm install`
// export default withBundleAnalyzer(nextConfig)
