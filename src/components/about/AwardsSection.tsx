import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const awards = [
  {
    title: "Best Wedding Photographer",
    org: "South India",
    desc: "Awarded by Wedding Vows Magazine for excellence in candid wedding photography."
  },
  {
    title: "Top 10 Indian Photographers",
    org: "Canvera",
    desc: "Recognized as one of the most influential photographers in the industry."
  },
  {
    title: "Featured in Vogue India",
    org: "Vogue",
    desc: "Our celebrity wedding shoots have been featured in major fashion and lifestyle publications."
  },
  {
    title: "Creative Excellence Award",
    org: "Cinematography",
    desc: "For outstanding contribution to the field of visual storytelling and cinematography."
  }
];

const AwardsSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Horizontal scroll effect on desktop
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const wrapper = scrollWrapperRef.current;
      if (!wrapper) return;

      // Mathematically correct finite scroll
      // We want to translate exactly enough so the right edge of the wrapper 
      // (which includes the px-24 right padding) touches the right edge of the viewport.
      const totalWidth = Math.max(0, wrapper.scrollWidth - window.innerWidth);

      gsap.to(wrapper, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalWidth}`,
          pin: true,
          scrub: 1,
        }
      });
    });

    // Fade up cards
    const cards = gsap.utils.toArray('.award-card') as HTMLElement[];
    cards.forEach((card, i) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        }
      });
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 lg:py-0 lg:h-screen bg-white flex flex-col justify-center overflow-hidden">
      <div className="px-6 lg:px-24 mb-8 shrink-0">
        <h2 className="text-5xl md:text-7xl font-serif text-[#111111]">Awards & <span className="italic text-[#2B2B2B]">Honours</span></h2>
      </div>

      <div className="w-full relative">
        <div 
          ref={scrollWrapperRef} 
          className="flex flex-col lg:flex-row gap-8 px-6 lg:px-24"
        >
          {awards.map((award, i) => (
            <div 
              key={i} 
              className="award-card group relative w-full lg:w-[450px] shrink-0 bg-[#F8F8F8] border border-gray-100 p-10 lg:p-14 lg:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 lg:hover:-translate-y-2 cursor-pointer"
            >
              {/* Magazine style badge */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#111111] text-[#D4AF37] flex items-center justify-center transform translate-x-2 -translate-y-2 rotate-12 lg:group-hover:rotate-0 transition-transform duration-500 shadow-xl z-10">
                <span className="font-serif text-2xl font-bold">W</span>
              </div>
              
              <div className="mb-8 pb-8 border-b border-gray-200">
                <span className="text-sm font-sans tracking-widest uppercase text-[#D4AF37] block mb-2">{award.org}</span>
                <h3 className="text-2xl lg:text-3xl font-serif text-[#111111] leading-snug lg:group-hover:text-[#D4AF37] transition-colors duration-300">{award.title}</h3>
              </div>
              
              <p className="text-[#2B2B2B] font-sans font-light leading-relaxed">
                {award.desc}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#111111] opacity-0 lg:group-hover:opacity-20 transform translate-x-4 -translate-y-4 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
