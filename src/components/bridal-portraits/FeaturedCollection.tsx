import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AlbumImage {
  image: string;
}

interface Props {
  albums: AlbumImage[];
}

const FeaturedCollection: React.FC<Props> = ({ albums }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Parallax floating images (Desktop only)
      gsap.to('.feat-float-1', {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to('.feat-float-2', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  const safeImg = (index: number) => albums[index % (albums.length || 1)]?.image || '';

  return (
    <section ref={containerRef} className="w-full bg-[#FAF9F7] py-16 md:py-32 lg:py-48 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        
        <div className="text-center mb-16 md:mb-32">
          <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-2 md:mb-4">Curated Work</h4>
          <h2 className="text-4xl md:text-7xl font-serif text-[#1B1B1B]">Featured Collection</h2>
        </div>

        {/* Desktop Magazine Layout */}
        <div className="hidden md:block relative w-full h-auto min-h-[120vh]">
          
          {/* Dominant Portrait */}
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: safeImg(0) }))}
            className="absolute top-0 left-0 w-[45%] h-[80vh] z-10 cursor-pointer group shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden">
              <img src={safeImg(0)} alt="Featured 1" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            </div>
            <div className="absolute bottom-6 left-6 text-white z-20">
              <span className="text-xs uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md">View</span>
            </div>
          </div>

          {/* Supporting Image 1 */}
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: safeImg(1) }))}
            className="feat-float-1 absolute top-20 right-[10%] w-[35%] h-[50vh] z-20 cursor-pointer group shadow-xl border-[12px] border-[#FAF9F7]"
          >
            <div className="w-full h-full overflow-hidden">
              <img src={safeImg(1)} alt="Featured 2" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            </div>
          </div>

          {/* Supporting Image 2 */}
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: safeImg(2) }))}
            className="absolute bottom-0 left-[20%] w-[40%] h-[60vh] z-10 cursor-pointer group shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden">
              <img src={safeImg(2)} alt="Featured 3" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            </div>
          </div>

          {/* Floating Image */}
          <div 
            onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: safeImg(3) }))}
            className="feat-float-2 absolute bottom-0 right-[5%] w-[25%] h-[45vh] z-30 cursor-pointer group shadow-lg"
          >
            <div className="w-full h-full overflow-hidden">
              <img src={safeImg(3)} alt="Featured 4" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
            </div>
          </div>

        </div>

        {/* Mobile Stack Layout */}
        <div className="md:hidden flex flex-col gap-6 w-full">
          {[0, 1, 2, 3].map((idx) => (
            <div 
              key={idx}
              onClick={() => window.dispatchEvent(new CustomEvent('open-lightbox', { detail: safeImg(idx) }))}
              className={`w-full relative cursor-pointer group shadow-xl overflow-hidden ${idx === 0 ? 'h-[60vh]' : 'h-[45vh]'}`}
            >
              <img src={safeImg(idx)} alt={`Featured ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
              {idx === 0 && (
                <div className="absolute bottom-4 left-4 text-white z-20">
                  <span className="text-[10px] uppercase tracking-widest bg-black/50 px-3 py-1 backdrop-blur-md">View</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
