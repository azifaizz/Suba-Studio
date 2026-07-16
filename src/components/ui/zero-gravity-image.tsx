import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface ZeroGravityImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  index?: number;
  priority?: boolean;
}

export const ZeroGravityImage: React.FC<ZeroGravityImageProps> = ({ 
  src, 
  alt, 
  className, 
  imageClassName,
  onClick,
  index = 0,
  priority = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Cinematic Slide (No Opacity Hiding)
      gsap.fromTo(
        containerRef.current,
        {
          y: 40,
        },
        {
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
            once: true,
          }
        }
      );

      // 2. Parallax & Zero Gravity Effect
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.15,
          yPercent: -5,
        },
        {
          scale: 1,
          yPercent: 5,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          }
        }
      );

      // 3. Subtle floating ambient animation (Zero Gravity)
      const direction = index % 2 === 0 ? 1 : -1;
      gsap.to(imageRef.current, {
        y: `+=${8 * direction}`,
        x: `+=${4 * direction}`,
        rotation: 0.5 * direction,
        duration: 4 + (index % 3),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Let GSAP calculate natural heights after setup
      setTimeout(() => ScrollTrigger.refresh(), 200);
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div 
      ref={containerRef}
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden bg-[#0a0a0a] cursor-pointer block",
        className
      )}
      // Removed style={{ opacity: 0 }} to guarantee images paint instantly on DOM load
    >
      <img 
        ref={imageRef}
        src={src} 
        alt={alt} 
        loading={priority ? "eager" : "lazy"}
        className={cn(
          "w-full h-full object-cover block will-change-transform",
          "transition-[filter,brightness] duration-700 ease-out",
          "group-hover:brightness-110",
          imageClassName
        )}
      />
      {/* Premium Hover Glow/Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-colors duration-700 pointer-events-none" />
    </div>
  );
};
