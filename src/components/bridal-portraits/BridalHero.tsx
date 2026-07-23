import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleViewWork } from '@/utils/navigation';

gsap.registerPlugin(ScrollTrigger);

interface BridalHeroProps {
  image: string;
}

const BridalHero: React.FC<BridalHeroProps> = ({ image }) => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Softly sharpen on load & scale down slightly
    tl.fromTo(imageRef.current, 
      { filter: 'blur(20px)', scale: 1.1 },
      { filter: 'blur(0px)', scale: 1.0, duration: 2.5, ease: 'power2.out' }
    );

    // 2. Very slow cinematic zoom (Ken Burns)
    gsap.to(imageRef.current, {
      scale: 1.12,
      duration: 25,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2.5
    });

    // 3. Text mask reveal (Split-text style)
    tl.fromTo('.hero-title-line', 
      { y: '120%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.5, stagger: 0.15, ease: 'power4.out' },
      "-=1.5"
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
      "-=1"
    )
    // 4. Buttons fade and slide upward
    .fromTo('.hero-btn',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
      "-=0.8"
    );

    // 5. Subtle parallax movement on scroll
    gsap.to(imageContainerRef.current, {
      y: '15vh',
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(textRef.current, {
      y: '25vh',
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative w-full h-[100svh] bg-[#111111] overflow-hidden flex items-center">
      
      {/* Full Background Image Container */}
      <div 
        ref={imageContainerRef}
        className="absolute inset-0 w-full h-full overflow-hidden z-0"
      >
        {/* Subtle dark gradient overlay behind the text only for readability */}
        {/* On mobile, gradient goes up from bottom. On desktop, it goes right from left. */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent md:hidden z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/90 via-[#111111]/50 to-transparent hidden md:block z-10 w-[70%] pointer-events-none" />
        
        <img 
          ref={imageRef}
          src={image} 
          alt="Bridal Portrait" 
          /* Intelligent focal-point positioning: Right-aligned on desktop, top-center on mobile */
          className="w-full h-full object-cover object-[center_15%] md:object-[75%_15%] origin-[center_20%] will-change-transform"
        />
      </div>

      {/* Text Content on the Left */}
      <div 
        ref={textRef} 
        className="relative z-20 w-full px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col justify-end md:justify-center h-full pb-16 md:pb-0 pointer-events-none"
      >
        <div className="md:w-[50%] lg:w-[45%] pointer-events-auto flex flex-col">
          <h1 className="text-white font-serif tracking-tight leading-[0.95] text-[16vw] sm:text-[12vw] md:text-[7vw] lg:text-[90px] xl:text-[110px] mb-6 uppercase flex flex-col">
            <span className="overflow-hidden inline-block pb-2"><span className="hero-title-line inline-block origin-bottom-left">Bridal</span></span>
            <span className="overflow-hidden inline-block pb-2"><span className="hero-title-line inline-block text-[#D4AF37] italic font-light normal-case">Portraits</span></span>
          </h1>
          
          <p className="hero-subtitle text-white/80 font-sans font-light tracking-wide max-w-md text-lg md:text-xl mb-10 leading-relaxed">
            Every bridal portrait celebrates confidence, beauty, tradition, and timeless grace. Let us tell your story.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <button 
              onClick={() => handleViewWork(navigate, location)}
              className="hero-btn group relative px-8 py-4 touch-target active:scale-95 transition-transform duration-300 bg-transparent border border-[#D4AF37]/50 overflow-hidden rounded-none w-full sm:w-auto"
            >
              <div className="absolute inset-0 w-full h-full bg-[#D4AF37] transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
              <span className="relative z-10 text-[#D4AF37] group-hover:text-[#111111] uppercase tracking-widest text-xs font-semibold transition-colors duration-500">Explore Gallery</span>
            </button>
            
            <button 
              onClick={() => window.location.href = 'tel:+918994442768'}
              className="hero-btn group relative px-8 py-4 touch-target active:scale-95 transition-transform duration-300 bg-white/5 backdrop-blur-md overflow-hidden rounded-none w-full sm:w-auto border border-white/10 hover:border-white/30"
            >
              <div className="absolute inset-0 w-full h-full bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
              <span className="relative z-10 text-white group-hover:text-[#111111] uppercase tracking-widest text-xs font-semibold transition-colors duration-500">Book Your Story</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BridalHero;
