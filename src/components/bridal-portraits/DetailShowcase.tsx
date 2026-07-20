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

const DetailShowcase: React.FC<Props> = ({ albums }) => {
  const containerRef = useRef<HTMLElement>(null);

  const details = [
    { title: "The Jewellery", img: albums[4]?.image || albums[0]?.image },
    { title: "The Dress", img: albums[7]?.image || albums[1]?.image },
    { title: "The Accessories", img: albums[8]?.image || albums[2]?.image },
  ];

  useGSAP(() => {
    const strips = gsap.utils.toArray('.detail-strip');
    
    strips.forEach((strip: HTMLElement, i: number) => {
      gsap.from(strip, {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: strip,
          start: 'top 85%',
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full bg-[#1B1B1B] text-white py-32">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">The Details</h2>
          <p className="text-white/60 font-sans font-light max-w-lg text-lg">
            A closer look at the elements that define the elegance of a bride.
          </p>
        </div>

        <div className="flex flex-col border-t border-white/20">
          {details.map((detail, index) => (
              <div 
                key={index}
                className="detail-strip group relative py-10 md:py-16 border-b border-white/20 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer"
              >
                <div className="flex w-full justify-between items-center z-20">
                  <h3 className="text-3xl sm:text-4xl md:text-6xl font-serif group-hover:pl-0 md:group-hover:pl-8 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">{detail.title}</h3>
                  <span className="text-sm tracking-widest uppercase text-white/50 group-hover:pr-0 md:group-hover:-pr-8 transition-all duration-700">0{index + 1}</span>
                </div>
                
                {/* Mobile Inline Image */}
                <div className="w-full h-[30vh] mt-6 overflow-hidden md:hidden z-10 relative">
                  <img src={detail.img} alt={detail.title} className="w-full h-full object-cover" />
                </div>

                {/* Desktop Hover Reveal Image */}
                <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] overflow-hidden opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none z-10">
                  <img src={detail.img} alt={detail.title} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailShowcase;
