module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Optional: Temporarily disable minimization if CssMinimizerPlugin is causing trouble
        webpackConfig.optimization.minimize = false;
        return webpackConfig;
      },
    },
  };
  