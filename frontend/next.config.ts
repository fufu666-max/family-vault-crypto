import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // 在构建时忽略ESLint错误，避免阻止部署
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在构建时忽略TypeScript错误（如果需要）
    ignoreBuildErrors: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Suppress MetaMask SDK warning about React Native dependency
      config.resolve.alias = {
        ...config.resolve.alias,
        '@react-native-async-storage/async-storage': false,
      };
      // Ignore warnings about missing modules
      config.ignoreWarnings = [
        { module: /node_modules\/@metamask\/sdk/ },
      ];
    }
    return config;
  },
  headers() {
    return Promise.resolve([
      {
        source: '/',
        headers: [
          // FHEVM requires COOP
          // Note: Base Account SDK prefers unsafe-none, but FHEVM needs same-origin
          // The Base Account SDK warning is filtered out in error-filter.tsx
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          // FHEVM requires COEP (this will block Coinbase Analytics, which is expected)
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
    ]);
  },
  // Suppress webpack warnings
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
};

export default nextConfig;

