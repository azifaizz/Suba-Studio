import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisualStorytellingSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    // Background color change
    gsap.to(containerRef.current, {
      backgroundColor: '#F8F8F8', // Off White
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: true,
      }
    });

    // Text Reveal Line by Line
    const lines = textContainerRef.current?.querySelectorAll('.reveal-text');
    if (lines) {
      gsap.from(lines, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: textContainerRef.current,
          start: 'top 80%',
        }
      });
    }

    // Image Parallax Move Upward
    gsap.fromTo(imageRef.current, 
      { y: 100 },
      {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Quote fade in
    gsap.from(quoteRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 85%',
      }
    });

  }, { scope: containerRef });

  return (
    <section id="visual-storytelling" ref={containerRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 min-h-screen flex items-center bg-white text-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
        
        {/* Left: Typography */}
        <div ref={textContainerRef} className="flex flex-col space-y-8 md:space-y-12">
          <div className="overflow-hidden">
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif leading-tight">
              <div className="overflow-hidden"><span className="reveal-text block">Visual</span></div>
              <div className="overflow-hidden"><span className="reveal-text block italic text-[#2B2B2B]">Storytelling</span></div>
              <div className="overflow-hidden"><span className="reveal-text block">at its Finest.</span></div>
            </h2>
          </div>
          
          <div className="h-[1px] w-full bg-gray-200"></div>

          <p ref={quoteRef} className="text-base sm:text-lg md:text-xl font-sans font-light text-[#2B2B2B] leading-relaxed max-w-md">
            "A Wedding Photo is not one that just captures a fleeting moment in time, it is that which acts as a window and lets you travel back to that special moment every time you look at it."
          </p>
        </div>

        {/* Right: Image */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden rounded-sm">
          <img 
            ref={imageRef}
            src="/portrait.png" 
            alt="Ajay Benjamin" 
            className="absolute inset-0 w-full h-[120%] object-cover object-center"
          />
        </div>

      </div>
    </section>
  );
};

export default VisualStorytellingSection;
