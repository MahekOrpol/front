/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['dev.crystovajewels.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24, // 24 hours
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    // Add image optimization loader
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|webp)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 75,
            },
            optipng: {
              enabled: true,
              optimizationLevel: 5,
            },
            pngquant: {
              quality: [0.7, 0.9],
              speed: 4,
            },
            webp: {
              quality: 80,
              lossless: false,
              nearLossless: true,
            },
          },
        },
      ],
    });

    // Enable JavaScript optimization
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
        minimize: true,
      };
    }

    return config;
  },
  // Enable production source maps for better debugging
  productionBrowserSourceMaps: false, // Disable source maps in production for better performance
  // Enable compression
  compress: true,
  poweredByHeader: false, // Remove X-Powered-By header
  generateEtags: true, // Enable ETag generation
  // Add HTTP/2 Server Push
  experimental: {
    modern: true,
    optimizeCss: true,
  },
  // Enable progressive web app features
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 