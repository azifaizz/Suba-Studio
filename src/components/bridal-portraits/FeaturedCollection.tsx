import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imageMetadata from '../../data/imageMetadata.json';

gsap.registerPlugin(ScrollTrigger);

interface AlbumImage {
  image: string;
}

interface Props {
  albums: AlbumImage[];
}

const getAspectStyle = (src?: string) => {
  if (!src) return '4 / 5';
  const filename = src.split('/').pop();
  const key1 = src;
  const key2 = `/${filename}`;
  const key3 = `/Bridal/${filename}`;
  
  const meta = (imageMetadata as Record<string, { width: number; height: number; orientation?: string }>)[key1] || (imageMetadata as Record<string, { width: number; height: number; orientation?: string }>)[key2] || (imageMetadata as Record<string, { width: number; height: number; orientation?: string }>)[key3];
  
  if (meta) {
    return `${meta.width} / ${meta.height}`;
  }
  return '4 / 5';
};

const FeaturedCollection: React.FC<Props> = ({ albums }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Very slow, luxury parallax effects on the containers themselves
      gsap.to('.feat-container-1', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.feat-container-1',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to('.feat-container-2', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: '.feat-container-2',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      });
      
      // Reveal animations for quotes
      gsap.from('.quote-reveal', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.quote-reveal',
          start: 'top 80%',
        }
      });
    });

    // Subtly scale images inside their containers for a premium feel
    gsap.utils.toArray('.reveal-img').forEach((img: unknown) => {
      gsap.fromTo(img, 
        { scale: 1.15, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top 85%',
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const safeImg = (index: number) => albums[index % (albums.length || 1)]?.image || '';

  const handleOpenLightbox = (src: string) => {
    window.dispatchEvent(new CustomEvent('open-lightbox', { detail: src }));
  };

  return (
    <section ref={containerRef} className="w-full bg-[#FAF9F7] py-16 md:py-32 lg:py-48 overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* Missing Detail Restored: Section Title */}
        <div className="text-center mb-16 md:mb-32">
          <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-2 md:mb-4">Curated Work</h4>
          <h2 className="text-4xl md:text-7xl font-serif text-[#1B1B1B]">Featured Collection</h2>
        </div>

        {/* 1. Large Hero Portrait */}
        <div className="w-full flex justify-center mb-24 md:mb-40 reveal-container">
          <div 
            className="w-full md:w-[75%] lg:w-[65%] overflow-hidden relative cursor-pointer group shadow-2xl"
            style={{ aspectRatio: getAspectStyle(safeImg(0)) }}
            onClick={() => handleOpenLightbox(safeImg(0))}
          >
            <img src={safeImg(0)} alt="Primary Portrait" className="reveal-img absolute top-0 left-0 w-full h-[110%] object-cover object-center -mt-[5%] transition-transform duration-[2s] group-hover:scale-110" />
            
            {/* Missing Detail Restored: Hover Badge */}
            <div className="absolute bottom-6 left-6 text-white z-20">
              <span className="text-xs uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">View</span>
            </div>
          </div>
        </div>

        {/* 2. Medium Supporting Portrait + Quote Card */}
        <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12 md:gap-24 mb-24 md:mb-40 max-w-7xl mx-auto px-0 md:px-12">
          
          <div className="w-full md:w-[45%] lg:w-[40%] flex items-center justify-center pt-8 md:pt-24 lg:pt-32">
             <blockquote className="quote-reveal font-serif italic text-3xl md:text-5xl text-[#1B1B1B] leading-tight text-center md:text-left">
               "A photograph is a pause button on life's most beautiful moments."
             </blockquote>
          </div>
          
          <div 
            className="feat-container-1 w-full md:w-[50%] lg:w-[45%] overflow-hidden relative cursor-pointer group shadow-xl"
            style={{ aspectRatio: getAspectStyle(safeImg(1)) }}
            onClick={() => handleOpenLightbox(safeImg(1))}
          >
            <img src={safeImg(1)} alt="Supporting Portrait" className="reveal-img absolute top-0 left-0 w-full h-[110%] object-cover object-center -mt-[5%] transition-transform duration-[2s] group-hover:scale-110" />
            
            <div className="absolute bottom-6 left-6 text-white z-20">
              <span className="text-xs uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">View</span>
            </div>
          </div>
        </div>

        {/* 3 & 4. Elegant Detail Image + Small Accent Image */}
        <div className="flex flex-col md:flex-row items-end justify-center md:justify-start gap-12 md:gap-24 max-w-7xl mx-auto mb-10 px-0 md:px-12">
          
          {/* Detail Image */}
          <div 
            className="w-full md:w-[40%] lg:w-[35%] overflow-hidden relative cursor-pointer group shadow-2xl"
            style={{ aspectRatio: getAspectStyle(safeImg(2)) }}
            onClick={() => handleOpenLightbox(safeImg(2))}
          >
             <img src={safeImg(2)} alt="Elegant Detail" className="reveal-img absolute top-0 left-0 w-full h-[110%] object-cover object-center -mt-[5%] transition-transform duration-[2s] group-hover:scale-110" />
             
             <div className="absolute bottom-6 left-6 text-white z-20">
               <span className="text-xs uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">View</span>
             </div>
          </div>

          {/* Accent Image */}
          <div 
            className="feat-container-2 w-2/3 md:w-[30%] lg:w-[25%] overflow-hidden relative cursor-pointer group shadow-lg md:-mb-16 ml-auto md:ml-0"
            style={{ aspectRatio: getAspectStyle(safeImg(3)) }}
            onClick={() => handleOpenLightbox(safeImg(3))}
          >
             <img src={safeImg(3)} alt="Artistic Accent" className="reveal-img absolute top-0 left-0 w-full h-[110%] object-cover object-center -mt-[5%] transition-transform duration-[2s] group-hover:scale-110" />
             
             <div className="absolute bottom-6 left-6 text-white z-20">
               <span className="text-xs uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">View</span>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
