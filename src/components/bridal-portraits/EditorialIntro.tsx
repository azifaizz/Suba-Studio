import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  image1?: string;
  image2?: string;
}

const EditorialIntro: React.FC<Props> = ({ image1, image2 }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1, // Smooth scrub for parallax
      }
    });

    // Parallax on images
    tl.to('.intro-img-1', { y: -80, ease: 'none' }, 0)
      .to('.intro-img-2', { y: -150, ease: 'none' }, 0)
      .to('.intro-quote', { y: -40, ease: 'none' }, 0);

    // Initial reveal
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

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full py-16 md:py-32 lg:py-48 bg-[#FAF9F7] overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center relative z-20">
          <h2 className="intro-title text-[#1B1B1B] font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase mb-6 md:mb-8 text-center lg:text-left">
            <span className="block overflow-hidden"><span className="block">Grace</span></span>
            <span className="block overflow-hidden"><span className="block text-[#D4AF37] italic font-light normal-case">in Every</span></span>
            <span className="block overflow-hidden"><span className="block">Frame.</span></span>
          </h2>
          <p className="text-gray-600 font-sans font-light text-base md:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 text-center lg:text-left leading-relaxed">
            We don't just take pictures. We craft editorial fashion stories where you are the muse. Every gown, every glance, and every quiet breath is documented with the timeless elegance of a high-end luxury magazine.
          </p>
        </div>

        {/* Right Images (Overlapping) */}
        <div className="lg:col-span-7 relative h-[50vh] sm:h-[70vh] md:h-[90vh] mt-8 lg:mt-0">
          {/* Background large image */}
          <div className="intro-img-1 absolute top-0 right-0 w-[85%] md:w-4/5 h-[80%] rounded-[2px] overflow-hidden shadow-2xl">
            {image1 && <img src={image1} alt="Editorial 1" className="w-full h-full object-cover scale-110" />}
          </div>
          
          {/* Foreground overlapping image */}
          <div className="intro-img-2 absolute bottom-0 left-0 w-[65%] md:w-3/5 h-[65%] rounded-[2px] overflow-hidden shadow-2xl z-10 border-4 md:border-8 border-[#FAF9F7]">
            {image2 && <img src={image2} alt="Editorial 2" className="w-full h-full object-cover scale-110" />}
          </div>

          {/* Quote Card (Glassmorphism) */}
          <div className="intro-quote absolute top-1/3 -left-12 lg:-left-24 z-30 w-64 md:w-80 p-8 rounded-sm bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl hidden md:block">
            <p className="font-serif italic text-xl md:text-2xl text-[#1B1B1B] leading-snug">
              "Beauty begins the moment confidence meets timeless elegance."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialIntro;
