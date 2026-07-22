import fs from 'fs';
import path from 'path';
import sizeOf from 'image-size';

const metaPath = path.join(process.cwd(), 'src', 'data', 'imageMetadata.json');
let meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const dir = path.join(process.cwd(), 'public', 'postwed');
const files = fs.readdirSync(dir);

const hardcodedPortraits = ['p3', 'p6', 'p9', 'p11', 'p12', 'p13', 'p15'];

files.forEach(file => {
    const buffer = fs.readFileSync(path.join(dir, file));
    const dimensions = sizeOf(buffer);
    let { width, height } = dimensions;
    
    const basename = path.parse(file).name;
    const isPortrait = hardcodedPortraits.includes(basename);

    // If actual dimensions contradict the user's explicit instructions, swap them logically for metadata
    if (isPortrait && width > height) {
        // Swap for metadata so it acts as portrait
        const temp = width;
        width = height;
        height = temp;
    } else if (!isPortrait && height > width) {
        // Swap for metadata so it acts as landscape
        const temp = width;
        width = height;
        height = temp;
    }
    
    let orientation = 'square';
    if (width > height * 1.5) orientation = 'panoramic';
    else if (width > height * 1.1) orientation = 'landscape';
    else if (height > width * 1.1) orientation = 'portrait';

    const key = `/postwed/${file}`;
    meta[key] = {
        width,
        height,
        aspectRatio: width / height,
        orientation
    };
});

fs.writeFileSync(metaPath, JSON.stringify(meta, null, 4));
console.log('Updated imageMetadata.json');
