const CompressionPlugin = require('compression-webpack-plugin');
const Critters = require('critters-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProd =  'production';

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      if (isProd) {
        // Enable gzip compression
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );

        // Critical CSS inlining
        webpackConfig.plugins.push(
          new Critters({
            preload: 'swap',
            pruneSource: true,
          })
        );

        // Optional: Bundle Analyzer
        if (process.env.ANALYZE) {
          webpackConfig.plugins.push(new BundleAnalyzerPlugin());
        }

        // Code splitting
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20 * 1024, // 20 KB
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                const packageName = module.context?.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
                return packageName ? `npm.${packageName.replace('@', '')}` : null;
              },
              
            },
          },
        };
      }

      return webpackConfig;
    }
  },
  eslint: {
    enable: false, // Disable if you want faster builds
  },
  babel: {
    plugins: [
      isProd && "transform-remove-console" // Remove console.logs in production
    ].filter(Boolean),
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')
      ],
    },
  },
};