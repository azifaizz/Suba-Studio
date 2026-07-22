import Jimp from 'jimp';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public', 'postwed', 'p12.png');

Jimp.read(imagePath)
  .then(image => {
    return image.rotate(270);
  })
  .then(image => {
    return image.writeAsync(imagePath);
  })
  .then(() => {
    console.log('Successfully rotated p12.png 90 degrees to the left.');
  })
  .catch(err => {
    console.error('Error rotating image:', err);
  });
