import TerserPlugin from "terser-webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
export default {
  webpack: {
    configure: (webpackConfig, { env }) => {
      // Enable code splitting
      webpackConfig.optimization.splitChunks = {
        chunks: "all",
        automaticNameDelimiter: "-",
      };
      if (env === "production") {
        // Enable JavaScript minification with console.log removal
        webpackConfig.optimization.minimize = true;
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true, // Remove console.* in production
              },
              output: {
                comments: false, // Remove comments
              },
            },
            extractComments: false,
          }),
        ];
      }
      // Add bundle analyzer plugin only when ANALYZE=true
      if (process.env.ANALYZE === "true") {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }
      return webpackConfig;
    },
  },
};