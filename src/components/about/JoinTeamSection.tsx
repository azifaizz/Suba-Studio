import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const JoinTeamSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // Magnetic Button Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia('(hover: none)').matches) return;
    const btn = buttonRef.current;
    if (!btn) return;
    
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: none)').matches) return;
    const btn = buttonRef.current;
    if (!btn) return;
    
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgRef}
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop" 
          alt="Team Working" 
          className="w-full h-[120%] object-cover object-center transform -translate-y-[10%]"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
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
        
        <button 
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative inline-flex items-center justify-center px-12 py-5 overflow-hidden rounded-full group bg-white text-black font-sans tracking-widest uppercase text-sm transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
        >
          <span className="relative z-10 group-hover:text-white transition-colors duration-500">Apply Now</span>
          <div className="absolute inset-0 bg-[#111111] transform scale-0 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
        </button>
      </div>
    </section>
  );
};

export default JoinTeamSection;
