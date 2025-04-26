const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // ADD THIS
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // ADD THIS
const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [
          purgecss({
            content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [/^btn-/, /^navbar-/, /^active/],
            },
          }),
          cssnano({
            preset: ['default', {
              discardComments: { removeAll: true },
            }],
          }),
        ] : []),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig, { env }) => {

      // 1. Split code into chunks
      webpackConfig.optimization.splitChunks = {
        chunks: "all",
        automaticNameDelimiter: "-",
      };

      // 2. Enable minimization
      if (env === "production") {
        webpackConfig.optimization.minimize = true;
        webpackConfig.optimization.minimizer = [
          new TerserPlugin({
            terserOptions: {
              compress: { drop_console: true },
              output: { comments: false },
            },
            extractComments: false,
          }),
          new CssMinimizerPlugin(), // MINIMIZE CSS ALSO!
        ];

        // 3. Add MiniCssExtractPlugin for production
        webpackConfig.plugins.push(
          new MiniCssExtractPlugin({
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
          })
        );
      }

      return webpackConfig;
    },
  },
};
