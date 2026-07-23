import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleViewWork } from '@/utils/navigation';

gsap.registerPlugin(ScrollTrigger);

const BookStorySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    // Very slow background zoom
    gsap.fromTo(bgRef.current,
      { scale: 1 },
      {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );

    // Fade up content
    gsap.from(contentRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] lg:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={bgRef}
          src="/lvid.MP4" 
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover origin-center"
        />
        {/* Soft dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>
      </div>

      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-serif text-white mb-8">
          Let Us Tell <br/>
          <span className="italic">Your Story.</span>
        </h2>
        
        <p className="text-lg md:text-xl text-white/80 font-sans font-light mb-12 leading-relaxed">
          Every wedding deserves timeless visual storytelling crafted with passion, emotion, and artistry.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button 
            onClick={() => window.location.href = 'tel:+918994442768'}
            className="w-full sm:w-auto px-10 py-4 bg-[#D4AF37] text-white font-sans uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500 rounded-sm"
          >
            Book Your Story
          </button>
          
          <button 
            onClick={() => handleViewWork(navigate, location)}
            className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white text-white font-sans uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500 rounded-sm"
          >
            View Our Work
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookStorySection;
