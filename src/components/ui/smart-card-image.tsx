import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { StandaloneArrowCTA } from '@/components/ui/standalone-arrow-cta';
import imageMetadata from '@/data/imageMetadata.json';

interface SmartCardImageProps {
  src: string;
  alt: string;
  link: string;
  className?: string;
}

export const SmartCardImage: React.FC<SmartCardImageProps> = ({
  src,
  alt,
  link,
  className = "",
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Look up pre-calculated metadata
  const metadata = imageMetadata[src as keyof typeof imageMetadata] || 
                   imageMetadata[src.replace(/^\//, '') as keyof typeof imageMetadata];

  const orientation = metadata ? metadata.orientation : 'landscape';
  const ratio = metadata ? metadata.aspectRatio : 1.5;

  // Smart Focal Point Strategy:
  // If portrait or panoramic image is placed in a mismatched slot where cropping would lose heads/bodies,
  // intelligently switch to contain + ambient blurred backdrop so 100% of the couple is sharp and visible.
  const useContain = orientation === 'panoramic' || (orientation === 'portrait' && ratio < 0.72);

  // Image Reveal Animation (Duration 700ms, Power4.Out: fade in, scale 1.03 -> 1, slight blur removal)
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        {
          opacity: 0,
          scale: 1.03,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power4.out',
          force3D: true,
        }
      );
    }
  }, []); // Run once on mount

  // Adaptive Predefined Heights on Mobile based on detected orientation
  const getAdaptiveHeightClass = () => {
    switch (orientation) {
      case 'portrait':
        return 'h-[270px] xs:h-[300px] sm:h-full min-h-[250px] sm:min-h-0';
      case 'square':
        return 'h-[230px] xs:h-[260px] sm:h-full min-h-[210px] sm:min-h-0';
      case 'panoramic':
      case 'landscape':
      default:
        return 'h-[200px] xs:h-[230px] sm:h-full min-h-[180px] sm:min-h-0';
    }
  };

  // Smart Focal Point Object Position:
  // For portrait images, anchor around center 22% so bride and groom heads/faces are never cut off by top crop.
  // For landscape/square, center center gives balanced composition.
  const getObjectPositionStyle = (): React.CSSProperties => {
    if (orientation === 'portrait') {
      return { objectPosition: 'center 22%' };
    }
    return { objectPosition: 'center center' };
  };

  return (
    <div
      ref={containerRef}
      className={`w-full sm:w-[52%] flex-1 relative rounded-xl sm:rounded-[26px] overflow-hidden bg-[#10141D] border border-gray-100 shrink-0 flex items-center justify-center shadow-md group-hover:shadow-2xl transition-shadow duration-500 ${getAdaptiveHeightClass()} ${className}`}
      style={metadata ? { aspectRatio: ratio } : {}}
    >
      {/* 
        Dual-Layer Ambient Backdrop:
        When using smart containment or when portrait/panoramic photos breathe,
        render a rich, soft blurred version of the photo behind so there are zero harsh black borders.
      */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover scale-115 blur-2xl opacity-35 brightness-75 pointer-events-none transition-transform duration-700 ease-out group-hover:scale-120"
      />

      {/* Main High-Resolution Photograph */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        style={getObjectPositionStyle()}
        className={`relative z-10 w-full h-full transition-all duration-700 ease-out will-change-transform ${
          useContain ? 'object-contain p-1 sm:p-2' : 'object-cover'
        } group-hover:scale-[1.03] group-hover:brightness-[1.05]`}
      />

      {/* Cinematic Vignette for high-contrast standalone arrow CTA legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500 pointer-events-none" />

      {/* Standalone Premium Arrow CTA */}
      <StandaloneArrowCTA to={link} darkBackground={true} />
    </div>
  );
};
