import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(titleRef.current, { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' });
    gsap.set(subtitleRef.current, { y: 20, opacity: 0 });
    gsap.set(scrollRef.current, { y: 20, opacity: 0 });

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
    .to(scrollRef.current, {
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
        
        <div 
          ref={scrollRef}
          onClick={() => {
            const nextSection = document.getElementById('visual-storytelling');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-3 cursor-pointer group mt-8"
        >
          <div className="animate-bounce">
            <MoveDown
              size={24}
              strokeWidth={1}
              className="text-white/80 group-hover:text-[#D4AF37] transition-all duration-300"
            />
          </div>
          <span className="font-sans font-medium text-xs tracking-widest text-white/50 group-hover:text-[#D4AF37] uppercase transition-colors duration-300">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
