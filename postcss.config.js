const purgecss = require('@fullhuman/postcss-purgecss').default;
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const isProduction = 'production';

module.exports = {
  style: {
    postcss: {
      plugins: [
        autoprefixer,
        ...(isProduction ? [
          purgecss({
            content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
              standard: [
                /^btn-/, 
                /^navbar-/, 
                /^active$/, 
                /^show$/, 
                /^collapse$/, 
                /^fade$/, 
                /^modal-/
              ],
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
