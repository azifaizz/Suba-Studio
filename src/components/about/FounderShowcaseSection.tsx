import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderShowcaseSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Portrait animations
    gsap.fromTo(imageWrapperRef.current,
      { opacity: 0, scale: 0.98, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(imageRef.current,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Floating movement
    gsap.to(imageWrapperRef.current, {
      y: -10,
      duration: 3.5,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.8,
    });

    // Typography split-text reveal (simulated with line-by-line wraps)
    const textLines = textContainerRef.current?.querySelectorAll('.reveal-line');
    if (textLines) {
      gsap.fromTo(textLines,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: 'top 80%',
          }
        }
      );
    }

    // Quote blur & fade
    gsap.fromTo(quoteRef.current,
      { opacity: 0, filter: 'blur(10px)', y: 20 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
        }
      }
    );

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 lg:py-48 overflow-hidden bg-[#FAFAF8] text-[#111111]">
      {/* Subtle paper grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}></div>

      <div className="max-w-screen-2xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start gap-16 lg:gap-24 relative z-10">
        
        {/* Left: Founder Portrait */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div ref={imageWrapperRef} className="w-full max-w-2xl relative overflow-hidden rounded-sm shadow-2xl shadow-black/5">
            <img 
              ref={imageRef}
              src="/suba.jpg" 
              alt="Ajay Benjamin - Founder" 
              loading="lazy"
              className="w-full h-auto block transform origin-center scale-[1.05]"
            />
          </div>
        </div>

        {/* Right: Typography */}
        <div ref={textContainerRef} className="w-full lg:w-1/2 flex flex-col justify-center lg:pt-12 xl:pt-24">
          <div className="overflow-hidden mb-6">
            <span className="reveal-line block text-[#D4AF37] text-xs md:text-sm tracking-[0.3em] uppercase font-sans">
              Founder
            </span>
          </div>
          
          <div className="overflow-hidden mb-2">
            <h2 className="reveal-line block text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-tight">
              Ajay Benjamin
            </h2>
          </div>

          <div className="overflow-hidden mb-10">
            <h3 className="reveal-line block text-[#2B2B2B]/70 font-sans tracking-widest uppercase text-xs md:text-sm">
              Founder • Managing Director • Lead Photographer
            </h3>
          </div>

          <div className="w-16 h-[1px] bg-[#D4AF37] mb-10 opacity-70"></div>
          
          <div className="flex flex-col gap-8 text-[#2B2B2B]/80 font-sans font-light text-base md:text-lg leading-relaxed max-w-lg mb-12">
            <div className="overflow-hidden">
              <p className="reveal-line block">
                Establishing a sanctuary for visual storytelling, Ajay's focus remains singular: to discover the soul within the frame. His visionary approach continues to set the benchmark for luxury wedding photography and cinematic elegance across the nation.
              </p>
            </div>
            <div className="overflow-hidden">
              <a href="mailto:suba@subhastudios.com" className="reveal-line inline-block text-[#111111] hover:text-[#D4AF37] transition-colors duration-500 border-b border-[#111111]/20 hover:border-[#D4AF37] pb-1">
                suba@subhastudios.com
              </a>
            </div>
          </div>

          {/* Quote */}
          <div className="relative pl-8 md:pl-12 border-l border-[#D4AF37]/30 mt-8 lg:mt-16">
            <span className="absolute -left-2 -top-6 text-6xl md:text-8xl text-[#D4AF37]/20 font-serif leading-none">"</span>
            <p ref={quoteRef} className="italic text-[#111111] font-serif text-2xl md:text-3xl leading-relaxed">
              A Wedding Photo is not one that just captures a fleeting moment in time.<br/>
              It is a window that lets you relive your most beautiful memories forever.
            </p>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default FounderShowcaseSection;
