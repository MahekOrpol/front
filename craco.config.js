const TerserPlugin = require("terser-webpack-plugin");
const purgecss = require('@fullhuman/postcss-purgecss'); // <- IMPORTANT

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('autoprefixer'),
        ...(process.env.NODE_ENV === 'production' ? [
          purgecss({
            content: ['./src/**/*.js', './src/**/*.jsx', './public/index.html'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          })
        ] : []),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig, { env }) => {
      webpackConfig.optimization.splitChunks = {
        chunks: "all",
        automaticNameDelimiter: "-",
      };
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
        ];
      }
      return webpackConfig;
    },
  },
};
