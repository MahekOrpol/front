module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  css: [
    './src/**/*.css'
  ],
  safelist: [
    'whatsapp-float',
    'hide-header',
    'main-header',
    /^swiper-/
  ]
} 