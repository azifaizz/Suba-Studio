import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(titleRef.current, { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' });
    gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
    gsap.set(buttonRef.current, { y: 20, opacity: 0 });

    // Entrance Animation
    tl.to(titleRef.current, {
      y: 0,
      opacity: 1,
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.5,
      ease: 'power4.out',
    })
    .to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, '-=1')
    .to(buttonRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    }, '-=0.8');

    // Scroll Parallax
    gsap.to(textRef.current, {
      yPercent: 50,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-black text-white flex items-center justify-center">
      {/* Content */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center px-6 text-center mt-20">
        <span className="text-sm tracking-[0.3em] uppercase text-white/70 mb-6 font-sans">
          Our Story
        </span>
        
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light mb-8 max-w-5xl mx-auto leading-tight"
        >
          Every Love Story<br />
          <span className="italic font-serif text-white/90">Deserves a Storyteller.</span>
        </h1>
        
        <p ref={subtitleRef} className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-sans font-light">
          Behind every unforgettable wedding is a storyteller who sees emotions before they become memories.
        </p>
        
        <button 
          ref={buttonRef}
          className="group relative px-8 py-4 bg-transparent border border-white/30 rounded-full overflow-hidden transition-all duration-500 hover:border-white"
          onClick={() => {
            const nextSection = document.getElementById('visual-storytelling');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="relative z-10 font-sans tracking-widest text-sm uppercase group-hover:text-black transition-colors duration-500">
            Discover Our Journey
          </span>
          <div className="absolute inset-0 bg-white transform translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
