import React, { useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LuxuryBookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const LuxuryBookButton = React.forwardRef<HTMLButtonElement, LuxuryBookButtonProps>(
  ({ className, text = "BOOK YOUR STORY", onClick, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      
      // Magnetic pull effect (subtle 3-6px movement based on cursor position inside button)
      const x = (clientX - (left + width / 2)) * 0.15; 
      const y = (clientY - (top + height / 2)) * 0.15;
      
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    return (
      <motion.button
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
        whileHover={{ scale: 1.03, y: -3 }}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "group relative flex items-center justify-center gap-2 overflow-hidden rounded-[9999px] px-6 py-3 sm:px-8 sm:py-3.5 cursor-pointer",
          "bg-[#111111]/80 backdrop-blur-xl border border-white/15 shadow-md",
          "hover:bg-[#D4AF37] hover:border-transparent hover:shadow-[0_4px_20px_rgba(212,175,55,0.3)]",
          "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          className
        )}
        {...props}
      >
        {/* Shine Sweep Animation (CSS driven, 10s infinite loop) */}
        <div className="absolute inset-0 -translate-x-[150%] animate-shine bg-gradient-to-r from-transparent via-white/20 to-transparent w-[150%] pointer-events-none" />

        {/* Minimal Camera Icon */}
        <Camera 
          size={14} 
          strokeWidth={1.5} 
          className="text-white group-hover:text-black transition-colors duration-300 relative z-10 will-change-transform group-hover:rotate-[5deg]" 
        />
        
        {/* Text */}
        <span className="relative z-10 font-poppins font-semibold text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-white group-hover:text-black transition-all duration-300 group-hover:tracking-[0.12em]">
          {text}
        </span>
      </motion.button>
    );
  }
);

LuxuryBookButton.displayName = "LuxuryBookButton";
