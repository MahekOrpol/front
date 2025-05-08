const CompressionPlugin = require("compression-webpack-plugin");
const Critters = require("critters-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  webpack: {
    mode: 'production',
    configure: (webpackConfig) => {
      if (isProd) {
        // Enable gzip compression with better settings
        webpackConfig.plugins.push(
          new CompressionPlugin({
            filename: "[path][base].gz",
            algorithm: "gzip",
            test: /\.(js|css|html|svg)$/,
            threshold: 8192, // Only compress files > 8kb
            minRatio: 0.8,
            deleteOriginalAssets: false, // Keep original files
          })
        );

        // Improved Critical CSS inlining
        webpackConfig.plugins.push(
          new Critters({
            preload: "swap",
            preloadFonts: true,
            pruneSource: true,
            reduce: true,
            keyframes: "critical",
          })
        );

        // Enhanced code splitting
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          minimize: true,
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                  pure_funcs: ["console.log"],
                },
                mangle: true,
                output: {
                  comments: false,
                },
              },
              extractComments: false,
            }),
            new CssMinimizerPlugin(),
          ],
          splitChunks: {
            chunks: "all",
            maxInitialRequests: Infinity,
            minSize: 20 * 1024,
            maxSize: 244 * 1024,
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name(module) {
                  const packageName = module.context?.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )?.[1];
                  return packageName
                    ? `npm.${packageName.replace("@", "")}`
                    : null;
                },
                priority: 20,
              },
              common: {
                minChunks: 2,
                priority: 10,
                reuseExistingChunk: true,
              },
              styles: {
                name: "styles",
                test: /\.css$/,
                chunks: "all",
                enforce: true,
                priority: 30,
              },
            },
          },
          runtimeChunk: "single",
        };

        // Optional: Bundle Analyzer in analyze mode
        if (process.env.ANALYZE) {
          webpackConfig.plugins.push(
            new BundleAnalyzerPlugin({
              analyzerMode: "static",
              reportFilename: "bundle-report.html",
            })
          );
        }
      }

      return webpackConfig;
    },
  },
  eslint: {
    enable: false, // Disable if you want faster builds
  },
  babel: {
    plugins: [
      isProd && "transform-remove-console",
      "@babel/plugin-transform-runtime",
      ["@babel/plugin-proposal-class-properties", { loose: true }],
    ].filter(Boolean),
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
          useBuiltIns: "usage",
          corejs: 3,
        },
      ],
    ],
  },
  style: {
    postcss: {
      plugins: [
        require("autoprefixer"),
        require("cssnano")({
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
              minifyFontValues: true,
              minifyGradients: true,
            },
          ],
        }),
      ],
    },
  },
};
