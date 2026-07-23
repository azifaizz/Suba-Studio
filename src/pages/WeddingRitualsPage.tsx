import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdaptiveImage } from '@/components/ui/adaptive-image';
import { LuxuryLightbox } from '@/components/ui/luxury-lightbox';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

interface WeddingRitualsPageProps {
  subcategory: string;
}

const WeddingRitualsPage: React.FC<WeddingRitualsPageProps> = ({ subcategory }) => {
  const content = categoryData['rituals'];
  const allImages = [content.heroImage, ...content.collageImages, ...content.albums.map(a => a.image)];
  const uniqueImages = Array.from(new Set(allImages));
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const openLightbox = (imageSrc: string) => {
    const index = uniqueImages.findIndex(img => img === imageSrc);
    setLightboxIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero image parallax and blur fade
      gsap.to('.hero-img', {
        yPercent: 30,
        filter: 'blur(10px)',
        opacity: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Horizontal Timeline Scroll
      const horizontalContainer = horizontalRef.current;
      if (horizontalContainer) {
        const panels = gsap.utils.toArray('.timeline-panel');
        
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '.horizontal-section',
            pin: true,
            scrub: 1,
            end: () => `+=${horizontalContainer.offsetWidth}`,
          }
        });
      }

      // Sacred Quote Reveal
      gsap.fromTo('.sacred-quote', 
        { opacity: 0, filter: 'blur(20px)', y: 50 },
        { 
          opacity: 1, 
          filter: 'blur(0px)', 
          y: 0, 
          duration: 2, 
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.quote-section',
            start: 'top 70%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const timelineChapters = [
    { title: "The Beginning", text: "The anticipation, the sacred rituals that set the stage for a lifelong journey.", img: uniqueImages[0] },
    { title: "Sacred Fire", text: "With the Agni as witness, vows are exchanged. The warmth of the fire reflects the warmth of love.", img: uniqueImages[1] },
    { title: "Blessings", text: "Families unite, offering their blessings and showering love upon the couple.", img: uniqueImages[2] },
    { title: "The Promise", text: "Seven steps, seven promises. A bond forged in tradition and eternity.", img: uniqueImages[3] },
    { title: "The Celebration", text: "Tears of joy, laughter, and the beautiful chaos of two families becoming one.", img: uniqueImages[4] || uniqueImages[0] }
  ];

  return (
    <div ref={containerRef} className="bg-[#1c1712] min-h-screen text-[#f4ecd8] overflow-hidden selection:bg-[#c97a34] selection:text-white">
      {/* Hero Section */}
      <section className="hero-section relative h-[100vh] w-full overflow-hidden flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#0a0805]">
          <img 
            src={content.heroImage} 
            alt="Wedding Rituals" 
            className="hero-img w-full h-full object-cover object-center opacity-80"
          />
          {/* Warm cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1712] via-[#1c1712]/30 to-[#c97a34]/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1c1712]" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-6">
          <p className="text-[#d89758] font-serif tracking-[0.3em] text-sm md:text-base uppercase mb-8">A Cinematic Documentary</p>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-light leading-none tracking-tight">
            Sacred <br/><span className="italic text-[#c97a34]">Traditions</span>
          </h1>
        </div>
      </section>

      {/* Intro Quote */}
      <section className="quote-section py-32 px-8 md:px-24 flex items-center justify-center min-h-[50vh]">
        <h2 className="sacred-quote text-3xl md:text-5xl lg:text-6xl font-serif font-light text-center max-w-5xl leading-tight text-[#eaddc5]">
          "Rituals are the soul of an Indian wedding. We document these moments with reverence, preserving the profound cultural significance of your union."
        </h2>
      </section>

      {/* Horizontal Timeline */}
      <section className="horizontal-section h-screen w-full overflow-hidden bg-[#16120e]">
        <div ref={horizontalRef} className="h-full flex w-[500vw] md:w-[300vw]">
          {timelineChapters.map((chapter, index) => (
            <div key={index} className="timeline-panel h-full w-screen flex-shrink-0 flex items-center justify-center p-8 md:p-24 relative">
              
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin] bg-[#c97a34] rounded-full blur-[150px] opacity-10 pointer-events-none" />

              <div className="w-full h-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10">
                
                {/* Text Context */}
                <div className="w-full md:w-1/3 flex flex-col justify-center order-2 md:order-1">
                  <span className="text-[#d89758] font-serif italic text-xl mb-4 block">Chapter 0{index + 1}</span>
                  <h3 className="text-4xl md:text-6xl font-serif mb-6">{chapter.title}</h3>
                  <p className="text-lg text-[#b8ab9a] font-light leading-relaxed">
                    {chapter.text}
                  </p>
                </div>

                {/* Cinematic Image */}
                <div className="w-full md:w-2/3 h-[50vh] md:h-[70vh] order-1 md:order-2">
                  <div 
                    className="w-full h-full overflow-hidden rounded-sm shadow-2xl relative group"
                  >
                    <div className="absolute inset-0 bg-[#c97a34]/10 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0" />
                    <AdaptiveImage 
                      src={chapter.img} 
                      alt={chapter.title}
                      imageClassName="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" 
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className="py-40 px-8 flex items-center justify-center bg-[#1c1712]">
        <p className="text-[#c97a34] font-serif italic text-2xl md:text-4xl text-center">
          Every tradition tells a story.
        </p>
      </section>

      <LuxuryLightbox 
        images={uniqueImages.map((img, i) => ({ id: i, image: img }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default WeddingRitualsPage;
