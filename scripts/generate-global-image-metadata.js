import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const publicDir = path.join(rootDir, 'public');
const outputDir = path.join(rootDir, 'src', 'data');
const outputFile = path.join(outputDir, 'imageMetadata.json');

const metadata = {};

function scanDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // Relative path to public root (e.g. "/hindu/1.jpg")
      const relPath = fullPath.replace(publicDir, '').replace(/\\/g, '/');
      
      if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
        try {
          const buffer = fs.readFileSync(fullPath);
          const dimensions = sizeOf(buffer);
          const ratio = dimensions.width / dimensions.height;
          
          let orientation = 'landscape';
          if (ratio < 0.82) {
            orientation = 'portrait';
          } else if (ratio <= 1.18) {
            orientation = 'square';
          } else if (ratio <= 1.85) {
            orientation = 'landscape';
          } else {
            orientation = 'panoramic';
          }

          metadata[relPath] = {
            width: dimensions.width,
            height: dimensions.height,
            aspectRatio: ratio,
            orientation
          };
        } catch (e) {
          console.warn(`Could not read dimensions for ${relPath}: ${e.message}`);
        }
      } else if (['.mp4', '.webm'].includes(ext)) {
        // Assume 16:9 for videos by default, since JS can't easily parse without heavy libs
        metadata[relPath] = {
          width: 1920,
          height: 1080,
          aspectRatio: 16/9,
          orientation: 'landscape'
        };
      }
    }
  }
}

console.log('Scanning public directory for images...');
scanDirectory(publicDir);

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputFile, JSON.stringify(metadata, null, 2));
console.log(`Generated metadata for ${Object.keys(metadata).length} files to ${outputFile}`);
