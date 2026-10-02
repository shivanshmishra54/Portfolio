import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const certsDir = path.join(publicDir, 'certificates');

async function optimizeImages() {
  console.log('Optimizing hero image...');
  const heroPath = path.join(publicDir, 'hero.jpg');
  if (fs.existsSync(heroPath)) {
    const heroWebp = path.join(publicDir, 'hero.webp');
    await sharp(heroPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(heroWebp);
    console.log('Optimized hero.jpg -> hero.webp');
    fs.unlinkSync(heroPath);
  }

  console.log('Optimizing certificates...');
  if (fs.existsSync(certsDir)) {
    const files = fs.readdirSync(certsDir);
    for (const file of files) {
      if (file.endsWith('.png') || file.endsWith('.jpg')) {
        const inputPath = path.join(certsDir, file);
        const outputPath = path.join(certsDir, file.replace(/\.(png|jpg)$/, '.webp'));
        
        await sharp(inputPath)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 80, lossless: false })
          .toFile(outputPath);
        
        console.log(`Optimized ${file} -> ${path.basename(outputPath)}`);
        fs.unlinkSync(inputPath);
      }
    }
  }
}

optimizeImages().catch(console.error);
