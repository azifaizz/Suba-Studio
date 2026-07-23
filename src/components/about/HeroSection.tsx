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

  useGSAP(() => {
    const tl = gsap.timeline();

    // Initial state
    gsap.set(titleRef.current, { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' });
    gsap.set(subtitleRef.current, { y: 20, opacity: 0 });

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
    }, '-=1');

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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/our_story_cover.jpg" 
          alt="Our Story Background" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70"></div>
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 flex flex-col items-center justify-center px-6 text-center mt-20">
        <h1 
          ref={titleRef}
          className="text-[60px] sm:text-[70px] md:text-[100px] lg:text-[145px] font-serif font-light mb-4 md:mb-6 max-w-full mx-auto leading-[1.05] tracking-tight"
        >
          Every Love Story<br />
          <span className="italic font-serif text-white/90">Deserves a Storyteller.</span>
        </h1>
        
        <p ref={subtitleRef} className="text-[11px] sm:text-[12px] md:text-[14px] lg:text-[16px] tracking-wide text-white/80 max-w-[95%] md:max-w-max mx-auto font-sans font-light md:whitespace-nowrap">
          Behind every unforgettable wedding is a storyteller who sees emotions before they become memories.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
