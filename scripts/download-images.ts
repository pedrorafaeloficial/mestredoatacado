import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.resolve(__dirname, '../public/assets');

if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const images = [
  {
    url: 'https://drive.google.com/uc?export=view&id=17gMvQN5JOFA0uEmoYRFKEsedurymYnZ5',
    filename: 'logo-new.png',
  },
  {
    url: 'https://drive.google.com/uc?export=view&id=1SlKs20n1S4ZK58oRatsgp7kEUwl6SRK_',
    filename: 'hero-stock.jpg',
  },
];

async function downloadImage(url: string, filename: string) {
  const filePath = path.join(assetsDir, filename);
  console.log(`Downloading ${url} to ${filePath}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(buffer));
    console.log(`Successfully downloaded ${filename}`);
  } catch (error) {
    console.error(`Error downloading ${filename}:`, error);
    process.exit(1);
  }
}

async function main() {
  for (const image of images) {
    await downloadImage(image.url, image.filename);
  }
}

main();
