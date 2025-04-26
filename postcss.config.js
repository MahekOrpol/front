const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  style: {
    postcss: {
      plugins: [
        autoprefixer,
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
};
