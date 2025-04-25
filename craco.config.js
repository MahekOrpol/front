import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
export const webpack = {
  configure: (webpackConfig) => {
    webpackConfig.optimization.minimize = true;
    webpackConfig.optimization.minimizer = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ];
    return webpackConfig;
  },
};