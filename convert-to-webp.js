const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'api-images');

fs.readdirSync(imagesDir).forEach(file => {
  if (/\.(jpg|jpeg|png)$/i.test(file)) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
    sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath)
      .then(() => console.log(`Converted: ${file} -> ${path.basename(outputPath)}`))
      .catch(err => console.error(`Error converting ${file}:`, err));
  }
}); 