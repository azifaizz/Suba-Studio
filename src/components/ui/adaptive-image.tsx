import React from 'react';
import imageMetadata from '@/data/imageMetadata.json';

interface AdaptiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
}

export const AdaptiveImage: React.FC<AdaptiveImageProps> = ({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  ...props
}) => {
  // Try to find exact match first, then by removing leading slash if needed
  const metadata = imageMetadata[src as keyof typeof imageMetadata] || 
                   imageMetadata[src.replace(/^\//, '') as keyof typeof imageMetadata];

  if (!metadata) {
    console.warn(`No metadata found for image: ${src}`);
    return (
      <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
        <img src={src} alt={alt} className={`w-full h-full object-cover ${imageClassName}`} {...props} />
      </div>
    );
  }

  // Preserve natural aspect ratio and avoid fixed heights
  return (
    <div 
      className={`relative w-full overflow-hidden ${containerClassName}`} 
      style={{ aspectRatio: metadata.aspectRatio }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full ${imageClassName}`}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
