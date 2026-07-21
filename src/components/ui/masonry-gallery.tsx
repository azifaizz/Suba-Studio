import React from 'react';
import { AdaptiveImage } from '@/components/ui/adaptive-image';

interface MasonryGalleryProps {
  images: { id: number | string; image: string; title?: string }[];
  columns?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export const MasonryGallery: React.FC<MasonryGalleryProps> = ({ 
  images, 
  columns = { default: 1, sm: 2, lg: 3 }, 
  gap = 'gap-4 space-y-4' 
}) => {
  // Construct column classes dynamically based on props
  const colClasses = [
    columns.default ? `columns-${columns.default}` : 'columns-1',
    columns.sm ? `sm:columns-${columns.sm}` : '',
    columns.md ? `md:columns-${columns.md}` : '',
    columns.lg ? `lg:columns-${columns.lg}` : '',
    columns.xl ? `xl:columns-${columns.xl}` : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={`${colClasses} ${gap} w-full`}>
      {images.map((item, index) => (
        <div key={item.id || index} className="break-inside-avoid relative group rounded-[20px] overflow-hidden shadow-lg mb-4">
          {item.image.endsWith('.mp4') || item.image.endsWith('.webm') ? (
            <video 
              src={item.image} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-auto rounded-[20px] object-cover transition-transform duration-700 group-hover:scale-105" 
            />
          ) : (
            <AdaptiveImage
              src={item.image}
              alt={item.title || `Gallery image ${index + 1}`}
              imageClassName="transition-transform duration-700 group-hover:scale-105"
            />
          )}
          
          {item.title && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
              <h3 className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {item.title}
              </h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
