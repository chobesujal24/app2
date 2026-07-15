/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: [
      'emoji-mart',
      '@emoji-mart/react',
      '@emoji-mart/data',
      '@icons-pack/react-simple-icons',
      '@lobehub/ui',
      'gpt-tokenizer',
      'chroma-js',
      'shiki',
    ],
  },

  // Static export for Firebase Hosting
  output: 'export',

  // Generate trailing slashes for static hosting compatibility
  trailingSlash: true,

  // Disable image optimization for static export (no server)
  images: {
    unoptimized: true,
  },

  reactStrictMode: true,

  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // to fix shikiji compile error
    config.module.rules.push({
      resolve: {
        fullySpecified: false,
      },
      test: /\.m?js$/,
      type: 'javascript/auto',
    });

    config.externals.push('pino-pretty');
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
