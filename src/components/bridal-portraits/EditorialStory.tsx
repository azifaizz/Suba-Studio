import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AlbumImage {
  id: number;
  title: string;
  image: string;
}

interface Props {
  collageImages?: string[];
  albums: AlbumImage[];
}

const EditorialStory: React.FC<Props> = ({ albums }) => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Chapter 1: Parallax offset
      gsap.to('.ch1-small-img', {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ch1-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Chapter 3: Scale down reveal
      gsap.fromTo('.ch3-img',
        { scale: 1.2 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.ch3-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        }
      );

      // Chapter 4: Floating collage
      const ch4Images = gsap.utils.toArray('.ch4-img');
      ch4Images.forEach((img: HTMLElement, i: number) => {
        gsap.to(img, {
          y: (i + 1) * -40,
          ease: 'none',
          scrollTrigger: {
            trigger: '.ch4-container',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });

      // Chapter 5: Clip path reveal
      gsap.fromTo('.ch5-img-container',
        { clipPath: 'inset(20% 10% 20% 10%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.ch5-container',
            start: 'top 80%',
            end: 'center center',
            scrub: true,
          }
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: simpler animations
      gsap.fromTo('.ch5-img-container',
        { clipPath: 'inset(10% 5% 10% 5%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.ch5-container',
            start: 'top 85%',
            end: 'center center',
            scrub: true,
          }
        }
      );
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Safe fallback if not enough images
  const safeImg = (index: number) => albums[index]?.image || '';

  return (
    <section ref={containerRef} className="w-full bg-[#FAF9F7] py-20">
      
      {/* Chapter 1: The Preparation */}
      <div className="ch1-container max-w-[90rem] mx-auto px-6 md:px-12 mb-20 md:mb-40">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 relative h-[50vh] md:h-[80vh]">
            <img src={safeImg(0)} alt="The Preparation" className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-start justify-center relative">
            <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-4">Chapter One</h4>
            <h2 className="text-4xl md:text-7xl font-serif text-[#1B1B1B] mb-6 md:mb-8 leading-none">The<br/><i className="font-light">Preparation</i></h2>
            <p className="text-gray-600 font-sans font-light text-base md:text-lg max-w-sm mb-0 md:mb-12">
              The quiet moments before the grand entrance. Anticipation, excitement, and the delicate touches that complete the vision.
            </p>
            <div className="ch1-small-img absolute -bottom-32 right-0 w-2/3 h-[50vh] hidden md:block z-10 border-8 border-[#FAF9F7]">
              <img src={safeImg(1)} alt="Preparation Details" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 2: The Details (Text focused here, images in DetailShowcase) */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20 md:mb-40">
         <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-4 md:mb-6">Chapter Two</h4>
         <h2 className="text-2xl sm:text-3xl md:text-6xl font-serif text-[#1B1B1B] leading-snug">
            "The story of a bride is woven into the threads of her dress and the sparkle of her jewels."
         </h2>
      </div>

      {/* Chapter 3: The Confidence */}
      <div className="ch3-container w-full h-[60vh] md:h-screen mb-20 md:mb-40 overflow-hidden relative">
        <img src={safeImg(2)} alt="The Confidence" className="ch3-img w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8 md:p-24">
            <h4 className="text-sm font-sans tracking-widest uppercase text-white mb-2 md:mb-4">Chapter Three</h4>
            <h2 className="text-4xl md:text-8xl font-serif text-white leading-none">The<br/>Confidence</h2>
        </div>
      </div>

      {/* Chapter 4: The Smile (Magazine Collage) */}
      <div className="ch4-container max-w-[90rem] mx-auto px-6 md:px-12 mb-20 md:mb-40 py-10 md:py-20">
        <div className="text-center mb-12 md:mb-20">
          <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-2 md:mb-4">Chapter Four</h4>
          <h2 className="text-4xl md:text-7xl font-serif text-[#1B1B1B]">The Smile</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 lg:gap-12 h-auto md:h-[80vh]">
          <div className="ch4-img self-start h-[40vh] md:h-[60vh] mt-0 md:mt-12">
            <img src={safeImg(3)} alt="Smile 1" className="w-full h-full object-cover" />
          </div>
          <div className="ch4-img self-center h-[50vh] md:h-[70vh] z-10 shadow-2xl">
            <img src={safeImg(4)} alt="Smile 2" className="w-full h-full object-cover" />
          </div>
          <div className="ch4-img self-end h-[40vh] md:h-[50vh] mt-0 md:-mt-20">
            <img src={safeImg(5)} alt="Smile 3" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* Chapter 5: The Final Look */}
      <div className="ch5-container max-w-[90rem] mx-auto px-6 md:px-12 pb-20">
        <div className="flex flex-col items-center">
          <h4 className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] mb-4">Chapter Five</h4>
          <h2 className="text-5xl md:text-7xl font-serif text-[#1B1B1B] mb-16">The Final Look</h2>
          
          <div className="w-full h-[85vh] ch5-img-container overflow-hidden">
            <img src={safeImg(6)} alt="Final Look" className="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>

    </section>
  );
};

export default EditorialStory;
