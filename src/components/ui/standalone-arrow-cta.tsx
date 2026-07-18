import React, { useRef } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface StandaloneArrowCTAProps {
  to?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  darkBackground?: boolean;
}

export const StandaloneArrowCTA: React.FC<StandaloneArrowCTAProps> = ({
  to,
  onClick,
  className = "absolute bottom-6 right-6 sm:bottom-7 sm:right-7 lg:bottom-8 lg:right-8 z-20",
  darkBackground = true,
}) => {
  const navigate = useNavigate();
  const arrowWrapperRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 60 FPS GSAP Click/Tap Animation: Scale to 0.95 and return smoothly
    if (arrowWrapperRef.current) {
      gsap.fromTo(
        arrowWrapperRef.current,
        { scale: 0.95 },
        {
          scale: 1,
          duration: 0.25,
          ease: "power3.out",
          onComplete: () => {
            if (onClick) {
              onClick(e);
            } else if (to) {
              navigate(to);
            }
          },
        }
      );
    } else {
      if (onClick) {
        onClick(e);
      } else if (to) {
        navigate(to);
      }
    }
  };

  return (
    <button
      ref={arrowWrapperRef}
      type="button"
      onClick={handleClick}
      aria-label="Explore more details"
      /* Accessibility: Minimum touch target of 44x44px. No circular background, no border, no rounded box, no badge. */
      className={`min-w-[44px] min-h-[44px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center p-2 rounded-none bg-transparent border-0 shadow-none appearance-none outline-none focus:outline-none select-none cursor-pointer group/cta ${className}`}
    >
      {/* 
        Standalone Premium Thin Arrow (Apple/Leica/Awwwards aesthetic)
        - Desktop Hover (`sm:group-hover:` & `sm:group-hover/cta:`): slides 10px right, scale 1 -> 1.08, opacity 100%, subtle glow over 300ms with Power3.Out cubic-bezier.
        - Mobile (`max-width: 768px`): No hover effects, visible & easy to tap (`active:scale-95`).
      */}
      <ArrowRight
        strokeWidth={1.25}
        className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 will-change-transform opacity-85 transition-all duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] sm:group-hover:translate-x-[10px] sm:group-hover/cta:translate-x-[10px] sm:group-hover:scale-[1.08] sm:group-hover/cta:scale-[1.08] sm:group-hover:opacity-100 sm:group-hover/cta:opacity-100 active:scale-95 sm:active:scale-95 ${
          darkBackground
            ? "text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)] sm:group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.75)] sm:group-hover/cta:drop-shadow-[0_0_14px_rgba(255,255,255,0.75)]"
            : "text-[#183A7A] drop-shadow-[0_1px_4px_rgba(24,58,122,0.15)] sm:group-hover:drop-shadow-[0_0_12px_rgba(24,58,122,0.4)] sm:group-hover/cta:drop-shadow-[0_0_12px_rgba(24,58,122,0.4)]"
        }`}
      />
    </button>
  );
};
