import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleViewWork } from '@/utils/navigation';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  image: string;
}

const BookYourStory: React.FC<Props> = ({ image }) => {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useGSAP(() => {
    // Parallax background zoom
    gsap.fromTo(imageRef.current, 
      { scale: 1 },
      {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#111111] flex items-center justify-center">
      
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          ref={imageRef}
          src={image} 
          alt="Book Your Story" 
          className="w-full h-full object-cover object-top"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center">
        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 leading-[1.1] tracking-tight">
          Your Story<br/>
          <i className="font-light text-[#D4AF37]">Deserves Timeless Elegance.</i>
        </h2>
        
        <p className="font-sans font-light text-lg md:text-xl text-white/80 max-w-2xl mb-12">
          From the smallest details to the grandest moments, let us preserve your bridal journey through timeless visual storytelling.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <button 
            onClick={() => window.location.href = 'tel:+918994442768'}
            className="group relative px-10 py-5 bg-[#D4AF37] overflow-hidden rounded-none border border-[#D4AF37]"
          >
            <div className="absolute inset-0 w-full h-full bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
            <span className="relative z-10 text-[#111111] uppercase tracking-widest text-xs font-bold transition-colors duration-500">Book Your Story</span>
          </button>
          
          <button 
            onClick={() => handleViewWork(navigate, location)}
            className="group relative px-10 py-5 bg-transparent overflow-hidden rounded-none border border-white/30"
          >
            <div className="absolute inset-0 w-full h-full bg-white transform scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-x-100" />
            <span className="relative z-10 text-white group-hover:text-[#111111] uppercase tracking-widest text-xs font-bold transition-colors duration-500">View More Galleries</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookYourStory;
