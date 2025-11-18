import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* we are disabling this because it blocks the dynamic change of translations on the page */
  reactCompiler: false
}

export default nextConfig
