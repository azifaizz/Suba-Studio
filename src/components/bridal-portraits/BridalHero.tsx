import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BridalHeroProps {
  image: string;
}

const BridalHero: React.FC<BridalHeroProps> = ({ image }) => {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    // Very slow background zoom
    gsap.to(imageRef.current, {
      scale: 1.15,
      duration: 20,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true
    });

    // Initial load animations
    const tl = gsap.timeline();

    // Text mask reveal
    tl.fromTo('.hero-title-line', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power4.out", delay: 0.2 }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=1"
    )
    .fromTo('.hero-btn',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.5"
    );

    // Scroll parallax for text
    gsap.to(textRef.current, {
      y: '30vh',
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
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#111111]">
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={imageRef}
          src={image} 
          alt="Bridal Portrait" 
          className="w-full h-full object-cover object-top origin-center scale-100"
        />
        {/* Subtle cinematic dark gradient at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />
      </div>

      <div 
        ref={textRef} 
        className="relative z-10 w-full h-full flex flex-col justify-end pb-12 md:pb-20 px-6 md:px-16 max-w-7xl mx-auto"
      >
        <h1 className="text-white font-serif tracking-tight leading-[0.9] text-[15vw] sm:text-[12vw] md:text-[6vw] lg:text-[100px] mb-4 md:mb-6 uppercase flex flex-col">
          <span className="overflow-hidden inline-block"><span className="hero-title-line inline-block">Bridal</span></span>
          <span className="overflow-hidden inline-block"><span className="hero-title-line inline-block text-[#D4AF37] italic font-light normal-case">Portraits</span></span>
        </h1>
        
        <p className="hero-subtitle text-white/80 font-sans font-light tracking-wide max-w-lg text-lg md:text-xl mb-10 leading-relaxed">
          Every bridal portrait celebrates confidence, beauty, tradition, and timeless grace.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <button className="hero-btn group relative px-8 py-4 touch-target active:scale-95 transition-transform duration-300 bg-transparent border border-[#D4AF37]/50 overflow-hidden rounded-none w-full sm:w-auto">
            <div className="absolute inset-0 w-full h-full bg-[#D4AF37] transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
            <span className="relative z-10 text-[#D4AF37] group-hover:text-[#111111] uppercase tracking-widest text-xs font-semibold transition-colors duration-500">Explore Gallery</span>
          </button>
          
          <button className="hero-btn group relative px-8 py-4 touch-target active:scale-95 transition-transform duration-300 bg-white/5 backdrop-blur-md overflow-hidden rounded-none w-full sm:w-auto">
            <div className="absolute inset-0 w-full h-full bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
            <span className="relative z-10 text-white group-hover:text-[#111111] uppercase tracking-widest text-xs font-semibold transition-colors duration-500">Book Your Story</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BridalHero;
