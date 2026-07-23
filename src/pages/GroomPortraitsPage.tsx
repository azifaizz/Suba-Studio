import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitTextReveal } from '@/components/ui/split-text-reveal';
import { LuxuryLightbox } from '@/components/ui/luxury-lightbox';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const EditorialImage = ({ src, onClick, className = '' }: any) => {
  return (
    <div 
      className={`cursor-pointer group overflow-hidden rounded-sm relative ${className}`} 
      onClick={onClick}
    >
      <img 
        src={src} 
        alt="Groom Portrait"
        className="absolute inset-0 w-full h-full block object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
        loading="lazy"
      />
    </div>
  );
};

interface GroomPortraitsPageProps {
  subcategory: string;
}

const GroomPortraitsPage: React.FC<GroomPortraitsPageProps> = ({ subcategory }) => {
  const content = categoryData['groom-portraits'];
  const allImages = [content.heroImage, ...content.collageImages, ...content.albums.map(a => a.image)];
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const parallaxWallsRef = useRef<HTMLDivElement>(null);

  const openLightbox = (imageSrc: string) => {
    const index = allImages.findIndex(img => img === imageSrc);
    setLightboxIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const mm = gsap.matchMedia(containerRef);

    // Apply to all screens
    mm.add("all", () => {
      // Hero slow zoom
      gsap.to('.hero-bg', {
        scale: 1.15,
        duration: 20,
        ease: 'none',
        repeat: -1,
        yoyo: true
      });

      // Dark sticky story section
      ScrollTrigger.create({
        trigger: '.sticky-story-container',
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        animation: gsap.timeline()
          // Scene 1 out
          .to('.story-text-1', { opacity: 0, y: -50, duration: 1 }, '+=0.8')
          .to('.story-img-1', { y: -100, opacity: 0, duration: 1 }, '<')
          
          // Scene 2 in
          .fromTo('.story-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '<')
          .fromTo('.story-img-2', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '<')
          
          // Scene 2 out
          .to('.story-text-2', { opacity: 0, y: -50, duration: 1 }, '+=0.8')
          .to('.story-img-2', { y: -100, opacity: 0, duration: 1 }, '<')
          
          // Scene 3 in
          .fromTo('.story-text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, '<')
          .fromTo('.story-img-3', { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '<')
          
          // Pause at end
          .to({}, { duration: 0.5 })
      });
    });

    // Apply only to desktop/tablet
    mm.add("(min-width: 768px)", () => {
      // Parallax Editorial Wall
      const wallItems = gsap.utils.toArray('.wall-item');
      wallItems.forEach((item: any, i) => {
        // More subtle parallax for editorial layout
        const speed = i % 2 === 0 ? 0.05 : -0.05;
        gsap.to(item, {
          yPercent: speed * 100,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxWallsRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      mm.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white overflow-hidden selection:bg-[#b38b2d] selection:text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-end pb-24 px-8 md:px-24 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#0a0a0a] overflow-hidden">
          <div className="hero-bg absolute inset-0 w-full h-full">
            <img 
              src={content.heroImage} 
              alt="Groom Portrait" 
              className="w-full h-full object-cover opacity-70"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <p className="text-[#b38b2d] font-serif italic tracking-widest text-sm md:text-base mb-6 uppercase">
            The Editorial
          </p>
          <SplitTextReveal 
            text="Groom Portraits" 
            type="words" 
            className="text-5xl md:text-8xl lg:text-[10rem] font-serif font-bold leading-none tracking-tighter"
          />
          <SplitTextReveal 
            text="Confidence. Elegance. Power." 
            type="words" 
            delay={0.5}
            className="text-xl md:text-3xl font-light mt-8 text-white/70"
          />
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="py-32 px-8 md:px-24 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5">
            <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight">
              The Modern <br /><span className="text-[#b38b2d] font-bold">Gentleman</span>
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg md:text-2xl font-light leading-relaxed text-white/60">
              Why should brides have all the fun? We ensure the groom gets his moment in the spotlight too. We bring a fashion-forward approach to groom photography, ensuring you look sharp, confident, and dashing on your big day.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Storytelling Section */}
      <section className="sticky-story-container h-screen w-full relative flex items-center justify-center overflow-hidden bg-[#111]">
        
        {/* Story 1 */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-32 pt-20 md:pt-24">
          <div className="w-full md:w-1/2 max-w-xl z-20 story-text-1 text-center md:text-left px-4 md:px-0">
            <span className="text-[#b38b2d] font-serif italic text-xl md:text-2xl mb-2 md:mb-4 block">01 / The Preparation</span>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 uppercase tracking-tight">The Calm Before</h3>
            <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">Adjusting the cuffs, fixing the tie, the quiet moments of focus before stepping out.</p>
          </div>
          <div className="w-full md:w-1/2 h-[45vh] md:h-[65vh] relative story-img-1 mt-8 md:mt-0 md:ml-12 px-4 md:px-0 flex justify-center items-center">
            <div className="w-fit h-fit max-w-full max-h-full overflow-hidden group rounded-xl relative border border-white/10 shadow-2xl">
              <img src={content.collageImages[0]} alt="Groom Preparation" className="w-auto h-auto max-w-full max-h-[45vh] md:max-h-[65vh] object-cover transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl block" />
            </div>
          </div>
        </div>

        {/* Story 2 */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-32 pt-20 md:pt-24 pointer-events-none">
          <div className="w-full md:w-1/2 max-w-xl z-20 story-text-2 opacity-0 text-center md:text-left px-4 md:px-0">
            <span className="text-[#b38b2d] font-serif italic text-xl md:text-2xl mb-2 md:mb-4 block">02 / The Confidence</span>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 uppercase tracking-tight">Owning the Room</h3>
            <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">A look that says it all. We capture the raw, unfiltered swagger that comes from feeling your absolute best.</p>
          </div>
          <div className="w-full md:w-1/2 h-[45vh] md:h-[65vh] relative story-img-2 mt-8 md:mt-0 md:ml-12 opacity-0 pointer-events-auto px-4 md:px-0 flex justify-center md:justify-end items-center">
            <div className="w-fit h-fit max-w-full max-h-full overflow-hidden group rounded-xl relative border border-white/10 shadow-2xl">
              <img src={content.collageImages[1]} alt="Groom Confidence" className="w-auto h-auto max-w-full max-h-[45vh] md:max-h-[65vh] object-cover transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl block" />
            </div>
          </div>
        </div>

        {/* Story 3 */}
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between px-4 md:px-32 pt-20 md:pt-24 pointer-events-none">
          <div className="w-full md:w-1/2 max-w-xl z-20 story-text-3 opacity-0 text-center md:text-left px-4 md:px-0">
            <span className="text-[#b38b2d] font-serif italic text-xl md:text-2xl mb-2 md:mb-4 block">03 / The Style</span>
            <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-serif mb-4 md:mb-6 uppercase tracking-tight">Flawless Details</h3>
            <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">The watch, the shoes, the perfectly tailored suit. Every detail matters in the making of a gentleman.</p>
          </div>
          <div className="w-full md:w-1/2 h-[45vh] md:h-[65vh] relative story-img-3 mt-8 md:mt-0 md:ml-12 opacity-0 pointer-events-auto px-4 md:px-0 flex justify-center items-center">
            <div className="w-fit h-fit max-w-full max-h-full overflow-hidden group rounded-xl relative border border-white/10 shadow-2xl">
              <img src={content.collageImages[2]} alt="Groom Style Details" className="w-auto h-auto max-w-full max-h-[45vh] md:max-h-[65vh] object-cover transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl block" />
            </div>
          </div>
        </div>

      </section>

      {/* Editorial Image Portfolio */}
      <section ref={parallaxWallsRef} className="py-32 md:py-48 px-4 md:px-12 bg-[#050505] overflow-hidden">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-5xl md:text-8xl font-serif font-bold uppercase tracking-tighter text-white/10">The Portfolio</h2>
        </div>
        
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {content.albums.map((album, idx) => {
            const isLandscape = album.image.includes('13.jpg');
            return (
              <EditorialImage 
                key={idx}
                src={album.image} 
                className={`w-full ${isLandscape ? 'aspect-[3/2] sm:col-span-2 md:col-span-3' : 'aspect-[3/4]'} wall-item`}
              />
            );
          })}
        </div>
      </section>

      <LuxuryLightbox 
        images={allImages.map((img, i) => ({ id: i, image: img }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default GroomPortraitsPage;
