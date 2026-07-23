import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdaptiveImage } from '@/components/ui/adaptive-image';
import { LuxuryLightbox } from '@/components/ui/luxury-lightbox';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

interface CandidMomentsPageProps {
  subcategory: string;
}

const CandidMomentsPage: React.FC<CandidMomentsPageProps> = ({ subcategory }) => {
  const content = categoryData['candid-moments'];
  
  // Since candid moments has limited images in the dummy data, let's pull some nice ones for the scatter layout
  const allImages = [
    "/postwed/p1.JPG", "/postwed/p2.JPG", "/postwed/p3.JPG", "/postwed/p4.JPG",
    "/postwed/p5.JPG", "/postwed/p6.JPG", "/postwed/p7.JPG", "/postwed/p8.JPG",
    "/postwed/p9.JPG", "/postwed/p10.JPG", "/postwed/p11.png", "/postwed/p12.png",
    "/postwed/p13.jpg", "/postwed/p14.JPG", "/postwed/p15.jpg"
  ];
  const uniqueImages = Array.from(new Set(allImages));
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);

  const openLightbox = (imageSrc: string) => {
    const index = uniqueImages.findIndex(img => img === imageSrc);
    setLightboxIndex(index !== -1 ? index : 0);
    setLightboxOpen(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      
      // Snappy Hero Reveal
      gsap.fromTo('.hero-candid-img',
        { scale: 1.2, filter: 'grayscale(100%) blur(10px)' },
        { scale: 1, filter: 'grayscale(0%) blur(0px)', duration: 2, ease: 'expo.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#f9f9f9] min-h-screen text-gray-900 overflow-hidden selection:bg-black selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen w-full p-4 md:p-8">
        <div className="w-full h-full rounded-3xl overflow-hidden relative">
          <img 
            src={uniqueImages[0]} 
            alt="Candid Moments" 
            className="hero-candid-img w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h1 className="text-[15vw] md:text-[10vw] font-serif italic font-bold text-white leading-none mix-blend-overlay">
              Unscripted.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="py-24 px-8 md:px-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-light leading-snug text-black">
          The best photos are the ones you didn't know were being taken.
        </h2>
        <p className="mt-8 text-lg text-gray-500 font-light">
          Real emotions, unexpected smiles, beautiful chaos.
        </p>
      </section>

      {/* High Level Grid View */}
      <section className="py-24 px-4 md:px-12 max-w-7xl mx-auto">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {uniqueImages.slice(1).map((img, idx) => (
            <div 
              key={idx} 
              className="w-full break-inside-avoid mb-6 sm:mb-8 rounded-[16px] sm:rounded-[24px] overflow-hidden group relative shadow-2xl"
            >
              <AdaptiveImage src={img} imageClassName="w-full h-auto object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className="h-screen flex items-center justify-center bg-black text-white px-8">
        <h2 className="text-5xl md:text-8xl font-serif font-light text-center max-w-4xl">
          Captured <br/><span className="italic font-bold">Forever.</span>
        </h2>
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

export default CandidMomentsPage;
