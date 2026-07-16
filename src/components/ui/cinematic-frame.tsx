import React from 'react';
import { cn } from "@/lib/utils";

interface CinematicFrameProps {
  src: string;
  alt: string;
  index: number;
  quote?: {
    heading: string;
    description: string;
    position: 'left' | 'right' | 'bottom-left' | 'center' | 'top-right' | 'bottom-right';
  };
  orientation: 'portrait' | 'landscape' | 'square' | 'ultra-wide';
  priority?: boolean;
}

export const CinematicFrame: React.FC<CinematicFrameProps> = ({
  src,
  alt,
  index,
  quote,
  orientation,
  priority = false,
}) => {
  const highlightWords = (text: string) => {
    if (!text) return null;
    return text.split(' ').map((word, i) => {
      const isHighlighted = ['love', 'eternal', 'sacred', 'journey', 'forever', 'soul', 'together', 'fire', 'seven', 'promises', 'blessings', 'divine'].includes(word.toLowerCase().replace(/[^a-z]/g, ''));
      return (
        <span key={i} className={cn(
          "inline-block mr-[0.25em]",
          isHighlighted ? "text-white italic font-playfair" : "text-white/70"
        )}>
          {word}
        </span>
      );
    });
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'left': return 'justify-center items-start text-left';
      case 'right': return 'justify-center items-end text-right';
      case 'top-right': return 'justify-start items-end pt-24 md:pt-32 text-right';
      case 'bottom-left': return 'justify-end items-start pb-24 md:pb-32 text-left';
      case 'bottom-right': return 'justify-end items-end pb-24 md:pb-32 text-right';
      case 'center': return 'justify-center items-center text-center';
      default: return 'justify-end items-start pb-24 md:pb-32 text-left';
    }
  };

  const getImageClasses = () => {
    switch (orientation) {
      case 'portrait':
        // Never crop portrait images, use cinematic side spacing
        return 'object-contain object-center';
      case 'landscape':
        // On mobile, contain to prevent aggressive cropping. On desktop, cover for immersive experience.
        return 'object-contain md:object-cover object-center';
      case 'square':
      case 'ultra-wide':
        // Always contain square and ultra-wide to prevent distortion and cropping
        return 'object-contain object-center';
      default:
        return 'object-cover object-center';
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden group bg-black cinematic-frame">
      <div className="absolute inset-0 w-full h-full will-change-transform cinematic-image-wrapper zero-gravity">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          className={cn(
            "w-full h-full will-change-transform cinematic-image",
            getImageClasses()
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-80" />
      </div>

      {quote && (
        <div className={cn("relative z-20 w-full h-full px-6 md:px-16 lg:px-24 flex flex-col pointer-events-none", getPositionClasses(quote.position))}>
          <div className="max-w-3xl cinematic-text-wrapper">
            <div className="overflow-hidden mb-6">
              <span className="block cinematic-text font-poppins text-xs md:text-sm tracking-[0.4em] uppercase text-white/70 font-medium">
                Chapter {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            
            <div className="overflow-hidden">
              <h2 className="cinematic-text text-2xl md:text-4xl lg:text-5xl font-light font-inter leading-relaxed tracking-wide">
                {highlightWords(quote.heading)}
              </h2>
            </div>
            
            {quote.description && (
              <div className="overflow-hidden mt-8">
                <p className="cinematic-text text-white/50 font-poppins text-sm leading-relaxed max-w-xl">
                  {quote.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
