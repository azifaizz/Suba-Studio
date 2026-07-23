import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MoveDown } from 'lucide-react';

const quoteWords = [
  { text: "EVERY", isAccent: false },
  { text: "LOVE", isAccent: true },
  { text: "STORY", isAccent: true },
  { text: "DESERVES", isAccent: false },
  { text: "TO", isAccent: false },
  { text: "BE", isAccent: false },
  { text: "REMEMBERED", isAccent: false },
  { text: "FOREVER.", isAccent: false },
];

export const HeroQuote: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Initial Entrance Animation Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Soft dark overlay fade in right after video loads
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.4, ease: 'power2.out' }
        );
      }

      // 2. Set initial hidden state for every word span
      gsap.set('.word-inner', {
        y: 20, // Smaller Y offset for smaller text
        opacity: 0,
        filter: 'blur(8px)',
        scale: 0.98,
        force3D: true,
      });

      // 3. Entrance after short 300ms delay
      gsap.to('.word-inner', {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.05, // Faster stagger for single line
        delay: 0.3,
        force3D: true,
      });

      // 4. Scroll Indicator Entrance
      if (scrollIndicatorRef.current) {
        gsap.fromTo(
          scrollIndicatorRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.4 }
        );
      }

      // 5. Scroll Indicator Idle Animation
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          y: 8,
          duration: 1.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Mouse Parallax Interaction (Desktop only, subtle 3-5px shift)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!quoteRef.current || window.innerWidth < 1024) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      // Normalized offset from center (-0.5 to 0.5)
      const deltaX = (clientX / innerWidth - 0.5) * 2;
      const deltaY = (clientY / innerHeight - 0.5) * 2;

      // Shift by exactly 4px max for gentle film-title depth
      gsap.to(quoteRef.current, {
        x: deltaX * 4.2,
        y: deltaY * 4.2,
        duration: 1.4,
        ease: 'power2.out',
        overwrite: 'auto',
        force3D: true,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll Parallax & Exit/Return Animation (`60 FPS GPU-accelerated scroll loop`)
  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // --- Quote Scroll Animation ---
        if (quoteWrapperRef.current) {
          // Calculate scroll progress through first viewport (0 to 0.72 vh)
          const maxScroll = vh * 0.72;
          const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

          // Parallax upward displacement (moves upward slower than page scroll: 0.38x scrollY)
          const translateY = scrollY * 0.38;

          // Smooth opacity decay (1 -> 0 within viewport)
          const opacity = Math.max(0, 1 - progress * 1.35);

          // Subtle blur exit (0px -> 8px)
          const blurPx = progress * 8;

          gsap.set(quoteWrapperRef.current, {
            y: translateY,
            opacity: opacity,
            filter: progress > 0.01 ? `blur(${blurPx.toFixed(1)}px)` : 'blur(0px)',
            force3D: true,
          });
        }

        // --- Scroll Indicator Scroll Animation ---
        if (scrollIndicatorRef.current) {
          // Fade out quickly over the first 120px of scroll
          const indicatorOpacity = Math.max(0, 1 - (scrollY / 120));
          // Move down slightly as it fades out
          const indicatorTranslateY = scrollY * 0.25;

          gsap.set(scrollIndicatorRef.current, {
            y: indicatorTranslateY,
            opacity: indicatorOpacity,
            force3D: true,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleScrollClick = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32 sm:pb-40 px-4 sm:px-6 md:px-12 pointer-events-none select-none overflow-hidden"
    >
      {/* Soft Dark Overlay for Readability over Hero Video */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-0 pointer-events-none opacity-0 transition-opacity"
      />

      {/* Parallax & Scroll Wrapper */}
      <div ref={quoteWrapperRef} className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Mouse Parallax Inner Container */}
        <div ref={quoteRef} className="flex justify-center items-center overflow-hidden py-1 px-2">
          
          <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-3 md:gap-x-4">
            {quoteWords.map((word, wordIndex) => (
              <span
                key={wordIndex}
                className="inline-block overflow-hidden py-1"
              >
                <span
                  className={`word-inner inline-block origin-bottom font-poppins font-medium tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] leading-snug text-[10px] sm:text-xs md:text-sm lg:text-[15px] transition-colors ${
                    word.isAccent
                      ? 'text-[#D4AF37] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)]'
                      : 'text-white/95 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]'
                  }`}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </div>

        </div>
      </div>

      {/* Premium Cinematic Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        onClick={handleScrollClick}
        className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 cursor-pointer pointer-events-auto group z-20 opacity-0"
      >
        <div ref={arrowRef} className="will-change-transform">
          <MoveDown
            size={18}
            strokeWidth={1}
            className="text-white/80 group-hover:text-[#D4AF37] transition-all duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroQuote;
