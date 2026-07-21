import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  className?: string;
  type?: 'chars' | 'words' | 'lines';
  delay?: number;
  triggerStart?: string;
  duration?: number;
  stagger?: number;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  className,
  type = 'words',
  delay = 0,
  triggerStart = 'top 85%',
  duration = 1,
  stagger = 0.05,
}) => {
  const containerRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const elements = containerRef.current.querySelectorAll('.split-item');
    
    // Set initial state
    gsap.set(elements, {
      y: 50,
      opacity: 0,
      rotateX: -20,
    });
    
    const animation = gsap.to(elements, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: duration,
      stagger: stagger,
      ease: 'power3.out',
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: triggerStart,
        toggleActions: 'play none none reverse',
      }
    });
    
    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.refresh());
    };
  }, [text, type, delay, triggerStart, duration, stagger]);

  const renderContent = () => {
    if (type === 'chars') {
      return text.split('').map((char, index) => (
        <span key={index} className="split-item inline-block whitespace-pre">
          {char}
        </span>
      ));
    }
    
    if (type === 'words') {
      return text.split(' ').map((word, index) => (
        <span key={index} className="split-item inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }
    
    // Lines (simplified fallback to words if not using SplitText plugin)
    return <span className="split-item inline-block">{text}</span>;
  };

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      {renderContent()}
    </div>
  );
};
