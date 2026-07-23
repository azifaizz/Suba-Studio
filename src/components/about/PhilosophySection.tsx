import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const philosophies = [
  {
    title: "Creativity",
    desc: "Breaking the glass ceiling in the most creative ways. We push boundaries to craft images that are both avant-garde and timeless.",
    number: "01"
  },
  {
    title: "Emotion",
    desc: "We look for the unseen tear, the hidden smile, the unsaid words. Emotion is the true color of our photography.",
    number: "02"
  },
  {
    title: "Storytelling",
    desc: "A wedding is not just an event; it is a narrative. We are hunters of stories, capturing your unique journey frame by frame.",
    number: "03"
  },
  {
    title: "Perfection",
    desc: "From the grandest landscapes to the smallest details, we have developed our techniques to absolute perfection.",
    number: "04"
  },
  {
    title: "Authenticity",
    desc: "Capturing genuine emotions, unscripted moments, and heartfelt connections exactly as they unfold, preserving the true essence of every celebration.",
    number: "05"
  },
  {
    title: "Timelessness",
    desc: "Crafting elegant photographs that transcend trends, allowing every memory to remain beautiful, meaningful, and cherished for generations.",
    number: "06"
  },
  {
    title: "Elegance",
    desc: "Blending refined composition, graceful light, and artistic detail to create imagery that reflects sophistication, beauty, and timeless luxury.",
    number: "07"
  }
];

const PhilosophySection = () => {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.philosophy-card') as HTMLElement[];
    
    if (cards.length > 0) {
      const mm = gsap.matchMedia();

      // Only apply stacking animation on screens md and up (min-width: 768px)
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: `top top+=${100 + i * 20}px`,
            endTrigger: containerRef.current,
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
            markers: false,
          });
          
          // Scale down slightly as next cards stack on top
          if (i < cards.length - 1) {
            gsap.to(card, {
              scale: 1 - ((cards.length - i) * 0.02),
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: `top top+=${100 + (i + 1) * 20}px`,
                end: `top top+=${100 + i * 20}px`,
                scrub: true,
              }
            });
          }
        });
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-16 lg:py-24 bg-[#ECECEC] relative">
      <div className="max-w-4xl mx-auto px-6">
        
        <div className="mb-24 text-center">
          <span className="text-sm tracking-widest uppercase text-[#2B2B2B] font-sans">Our Philosophy</span>
          <h2 className="text-5xl md:text-6xl font-serif mt-4 text-[#111111]">Suba Signatures</h2>
        </div>

        <div className="relative md:pb-[50vh]">
          {philosophies.map((phil, i) => (
            <div 
              key={i} 
              className="philosophy-card w-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] p-12 md:p-16 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between mb-12 last:mb-0 relative overflow-hidden group"
            >
              {/* Soft glow effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="md:w-1/3 mb-8 md:mb-0 relative z-10">
                <span className="text-6xl md:text-8xl font-serif text-[#F8F8F8] absolute -top-10 -left-6 md:-left-10 z-[-1] font-bold select-none drop-shadow-sm">{phil.number}</span>
                <h3 className="text-3xl md:text-4xl font-serif text-[#111111]">{phil.title}</h3>
              </div>
              
              <div className="md:w-2/3 md:pl-12 relative z-10">
                <p className="text-lg md:text-xl text-[#2B2B2B] font-sans font-light leading-relaxed">
                  {phil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default PhilosophySection;
