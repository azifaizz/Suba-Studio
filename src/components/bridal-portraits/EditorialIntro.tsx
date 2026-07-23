import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import imageMetadata from '../../data/imageMetadata.json';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  images?: string[];
}

const getAspectStyle = (src?: string) => {
  if (!src) return '4 / 5';
  const filename = src.split('/').pop();
  const key1 = src;
  const key2 = `/${filename}`;
  const key3 = `/Bridal/${filename}`;
  
  const meta = (imageMetadata as any)[key1] || (imageMetadata as any)[key2] || (imageMetadata as any)[key3];
  
  if (meta) {
    return `${meta.width} / ${meta.height}`;
  }
  return '4 / 5';
};

const EditorialIntro: React.FC<Props> = ({ images = [] }) => {
  const containerRef = useRef<HTMLElement>(null);
  
  const safeImg = (index: number) => images[index] || '';

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Initial reveal for typography
    gsap.from('.intro-title span', {
      y: 100,
      opacity: 0,
      rotation: 5,
      stagger: 0.1,
      duration: 1.5,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    mm.add("(min-width: 768px)", () => {
      // Container Parallax (Preserving the original animation style)
      gsap.to('.intro-img-1', { y: -100, ease: 'none', scrollTrigger: { trigger: '.intro-img-1', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-img-2', { y: -150, ease: 'none', scrollTrigger: { trigger: '.intro-img-2', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-img-3', { y: -80,  ease: 'none', scrollTrigger: { trigger: '.intro-img-3', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-img-4', { y: -120, ease: 'none', scrollTrigger: { trigger: '.intro-img-4', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-img-5', { y: -180, ease: 'none', scrollTrigger: { trigger: '.intro-img-5', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-img-6', { y: -90,  ease: 'none', scrollTrigger: { trigger: '.intro-img-6', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      gsap.to('.intro-quote', { y: -60,  ease: 'none', scrollTrigger: { trigger: '.intro-quote', start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
    });

    // Subtly scale images inside their containers for the reveal effect
    gsap.utils.toArray('.reveal-img').forEach((img: any) => {
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

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full pt-16 md:pt-24 lg:pt-32 pb-24 md:pb-40 lg:pb-56 bg-[#FAF9F7] overflow-hidden">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12">
        
        {/* Top Typography - Center aligned for a strong magazine opening */}
        <div className="flex flex-col items-center justify-center relative z-20 mb-16 md:mb-24 text-center">
          <h2 className="intro-title text-[#1B1B1B] font-serif text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[7rem] leading-[1.1] tracking-tight uppercase mb-8 flex flex-wrap justify-center gap-x-3 md:gap-x-6">
            <span className="inline-block overflow-hidden pb-2 md:pb-4"><span className="inline-block">GRACE</span></span>
            <span className="inline-block overflow-hidden pb-2 md:pb-4"><span className="inline-block text-[#D4AF37] italic font-light normal-case">in Every</span></span>
            <span className="inline-block overflow-hidden pb-2 md:pb-4"><span className="inline-block">FRAME.</span></span>
          </h2>
          <p className="text-gray-600 font-sans font-light text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            We don't just take pictures. We craft editorial fashion stories where you are the muse. Every gown, every glance, and every quiet breath is documented with the timeless elegance of a high-end luxury magazine.
          </p>
        </div>

        {/* Magazine Spread - 6 Images */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* 1. Hero Image - Landscape, very large, slightly offset right */}
          <div className="w-full md:w-[80%] lg:w-[70%] ml-auto mr-0 md:mr-[5%] relative z-10 mb-16 md:mb-24">
            <div 
              className="intro-img-1 w-full rounded-[2px] overflow-hidden shadow-2xl relative"
              style={{ aspectRatio: getAspectStyle(safeImg(0)) }}
            >
              <img src={safeImg(0)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Hero Image" />
            </div>
          </div>

          {/* 2. Supporting Portrait & Quote Card - Portrait pulled left, overlapping bottom of Hero */}
          <div className="w-full md:w-[90%] flex flex-col md:flex-row justify-between items-start md:-mt-[15%] relative z-20 mb-24 md:mb-32">
            <div 
              className="intro-img-2 w-full md:w-[45%] lg:w-[40%] rounded-[2px] overflow-hidden shadow-xl relative border-4 md:border-8 border-[#FAF9F7]"
              style={{ aspectRatio: getAspectStyle(safeImg(1)) }}
            >
              <img src={safeImg(1)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Supporting Portrait" />
            </div>
            
            {/* Quote in negative space on the right */}
            <div className="intro-quote w-full md:w-[45%] mt-12 md:mt-48 px-4 md:px-0 lg:pr-12">
              <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-[#1B1B1B] leading-tight text-center md:text-left">
                "Beauty begins the moment confidence meets timeless elegance."
              </p>
            </div>
          </div>

          {/* 3. Detail Image (Portrait) & 4. Supporting Landscape */}
          <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between relative z-10 mb-24 md:mb-40 gap-8 md:gap-0">
            
            {/* Detail Image - Portrait, floating left/center */}
            <div className="w-[80%] md:w-[40%] lg:w-[35%] ml-auto md:ml-[5%] relative z-10 mb-12 md:mb-0 md:mt-32">
              <div 
                className="intro-img-3 w-full rounded-[2px] overflow-hidden shadow-2xl relative"
                style={{ aspectRatio: getAspectStyle(safeImg(2)) }}
              >
                <img src={safeImg(2)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Detail Image" />
              </div>
            </div>

            {/* Supporting Landscape - Large landscape offset to the right */}
            <div className="w-full md:w-[55%] lg:w-[50%] mr-auto md:mr-[2%] relative z-20">
              <div 
                className="intro-img-4 w-full rounded-[2px] overflow-hidden shadow-xl relative border-4 md:border-8 border-[#FAF9F7]"
                style={{ aspectRatio: getAspectStyle(safeImg(3)) }}
              >
                <img src={safeImg(3)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Supporting Landscape" />
              </div>
            </div>

          </div>

          {/* 5. Portrait Accent & 6. Detail Portrait */}
          <div className="w-full flex flex-col md:flex-row items-end justify-start relative z-30 gap-8 md:gap-0">
            
            {/* Portrait Accent - Pulled left */}
            <div className="w-full md:w-[50%] lg:w-[45%] relative z-10 mb-12 md:mb-0 ml-[5%]">
              <div 
                className="intro-img-5 w-full rounded-[2px] overflow-hidden shadow-xl relative"
                style={{ aspectRatio: getAspectStyle(safeImg(4)) }}
              >
                <img src={safeImg(4)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Portrait Accent" />
              </div>
            </div>

            {/* Detail Portrait - Smaller, overlapping the Accent slightly on the right */}
            <div className="w-[85%] md:w-[40%] lg:w-[35%] ml-auto md:-ml-[10%] md:-mb-[15%] relative z-20 border-4 md:border-8 border-[#FAF9F7]">
              <div 
                className="intro-img-6 w-full rounded-[2px] overflow-hidden shadow-2xl relative"
                style={{ aspectRatio: getAspectStyle(safeImg(5)) }}
              >
                <img src={safeImg(5)} className="reveal-img w-full h-[115%] absolute -top-[7.5%] left-0 object-cover" alt="Detail Portrait" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default EditorialIntro;
