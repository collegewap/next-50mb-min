const shouldAnalyzeBundles = false

let nextConfig = {
  // [...]
}

if (shouldAnalyzeBundles) {
  const withNextBundleAnalyzer =
    require('next-bundle-analyzer')(/* options come there */)
  nextConfig = withNextBundleAnalyzer(nextConfig)
}

module.exports = nextConfig
