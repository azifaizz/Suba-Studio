import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JoinTeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    // Background Parallax
    gsap.fromTo(bgRef.current, 
      { yPercent: -20 },
      {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Text Reveal
    gsap.from(textRef.current, {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
      }
    });

  }, { scope: containerRef });


  return (
    <section ref={containerRef} className="relative min-h-[100dvh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src="/our_story_down.jpg" 
          alt="Careers Background" 
          className="w-full h-[120%] object-cover object-center transform -translate-y-[10%]"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div ref={textRef}>
          <span className="text-[#D4AF37] font-sans tracking-widest uppercase text-sm mb-6 block">Careers</span>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-12">
            Join The Family <br/>
            <span className="italic text-white/80">Behind Thousands</span> <br/>
            of Beautiful Memories.
          </h2>
        </div>
        
        <a 
          ref={buttonRef}
          href="mailto:subastudio5484@gmail.com"
          className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden rounded-full group bg-white text-black font-sans tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">Apply Now</span>
          <div className="absolute inset-0 bg-[#111111] transform scale-0 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
        </a>
      </div>
    </section>
  );
};

export default JoinTeamSection;
