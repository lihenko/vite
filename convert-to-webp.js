import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const inputDir = path.resolve(process.cwd(), 'public/img');
const outputDir = inputDir; // Зберігаємо webp у тій же папці

async function convertImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.svg') return; // пропускаємо SVG

  const outputFilePath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');

  try {
    await sharp(filePath)
      .webp({ lossless: true })
      .toFile(outputFilePath);

    console.log(`Converted: ${filePath} → ${outputFilePath}`);

    // Видаляємо оригінальний файл
    await fs.promises.unlink(filePath);
    console.log(`Deleted original: ${filePath}`);
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
  }
}


async function walkDir(dir) {
  const files = await fs.promises.readdir(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      await walkDir(fullPath);
    } else if (/\.(png|jpe?g)$/i.test(file.name)) {
      await convertImage(fullPath);
    }
  }
}

walkDir(inputDir)
  .then(() => console.log('Conversion finished!'))
  .catch(console.error);
