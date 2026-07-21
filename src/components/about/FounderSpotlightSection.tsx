import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FounderSpotlightSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax background image
    gsap.fromTo(imageRef.current,
      { yPercent: -10, scale: 1.1 },
      {
        yPercent: 10,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );

    // Fade in and slide up glassmorphism card
    gsap.from(cardRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
      }
    });

    // Animate particles
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle) => {
        gsap.to(particle, {
          y: `-${Math.random() * 100 + 50}px`,
          x: `${(Math.random() - 0.5) * 50}px`,
          rotation: Math.random() * 360,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center lg:justify-start lg:pl-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={imageRef}
          src="/suba.jpg" 
          alt="Suba - Founder" 
          className="w-full h-full object-cover transform origin-center"
        />
        {/* Soft Dark Overlay with Light Rays effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50 mix-blend-overlay"></div>
      </div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-50">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full blur-[1px]"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Information Card */}
      <div 
        ref={cardRef} 
        className="relative z-20 w-[90%] md:w-[70%] lg:w-[45%] max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 lg:p-16 rounded-sm shadow-2xl"
      >
        <div className="mb-10 relative">
          <span className="absolute -top-6 -left-4 text-6xl text-white/20 font-serif">"</span>
          <p className="text-xl md:text-2xl lg:text-3xl font-serif text-white leading-relaxed italic relative z-10">
            A Wedding Photo is not one that just captures a fleeting moment in time. It is a window that lets you relive your most beautiful memories forever.
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          {/* Handwritten Signature Font Simulation */}
          <div className="text-3xl md:text-4xl font-serif text-[#D4AF37] mb-2 transform -rotate-2">
            Suba
          </div>
          <div className="h-[1px] w-12 bg-[#D4AF37] mb-2"></div>
          <h4 className="text-white text-lg tracking-widest font-sans uppercase">Suba</h4>
          <p className="text-white/60 font-sans text-sm uppercase tracking-wider">Founder & Lead Photographer</p>
          <a href="mailto:suba@subhastudios.com" className="text-white/80 hover:text-white font-sans text-sm mt-4 transition-colors">
            suba@subhastudios.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default FounderSpotlightSection;
