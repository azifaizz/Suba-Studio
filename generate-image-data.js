import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

const directoryPath = path.join(process.cwd(), 'public', 'hindu');
const files = fs.readdirSync(directoryPath).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));

const images = files.map(file => {
    const buffer = fs.readFileSync(path.join(directoryPath, file));
    const dimensions = sizeOf(buffer);
    const { width, height } = dimensions;
    
    let orientation = 'square';
    if (width > height * 1.5) orientation = 'panoramic';
    else if (width > height * 1.1) orientation = 'landscape';
    else if (height > width * 1.1) orientation = 'portrait';

    return {
        src: `/hindu/${file}`,
        width,
        height,
        orientation
    };
});

const fileContent = `export type ImageOrientation = 'portrait' | 'landscape' | 'square' | 'panoramic';

export interface HinduWeddingImage {
  src: string;
  width: number;
  height: number;
  orientation: ImageOrientation;
}

export const hinduWeddingImages: HinduWeddingImage[] = ${JSON.stringify(images, null, 2)};
`;

fs.mkdirSync(path.join(process.cwd(), 'src', 'data'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'hindu-wedding-images.ts'), fileContent);

console.log('Successfully generated src/data/hindu-wedding-images.ts');
