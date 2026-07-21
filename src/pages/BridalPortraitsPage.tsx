import React, { useEffect, useRef } from 'react';
import { categoryData } from '@/data/categoryContent';
import BridalHero from '@/components/bridal-portraits/BridalHero';
import EditorialIntro from '@/components/bridal-portraits/EditorialIntro';
import EditorialStory from '@/components/bridal-portraits/EditorialStory';
import EditorialQuotes from '@/components/bridal-portraits/EditorialQuotes';
import FeaturedCollection from '@/components/bridal-portraits/FeaturedCollection';
import BookYourStory from '@/components/bridal-portraits/BookYourStory';
import LuxuryLightbox from '@/components/bridal-portraits/LuxuryLightbox';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  subcategory: string;
}

const BridalPortraitsPage: React.FC<Props> = ({ subcategory }) => {
  const content = categoryData[subcategory];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize local smooth scroll if the parent doesn't have it, or let the parent handle it.
    // For luxury feel, we explicitly configure a smooth lenis instance.
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  if (!content) return null;

  return (
    <div ref={containerRef} className="bg-[#FAF9F7] text-[#1B1B1B] min-h-screen selection:bg-[#D4AF37] selection:text-white overflow-hidden">
      {/* Lightbox is a portal or absolute overlay */}
      <LuxuryLightbox images={[content.heroImage, ...(content.collageImages || []), ...content.albums.map(a => a.image)]} />
      
      <BridalHero image={content.heroImage} />
      <EditorialIntro images={content.collageImages} />
      <EditorialQuotes quote="Beauty begins the moment confidence meets timeless elegance." />
      <EditorialStory collageImages={content.collageImages} albums={content.albums} />
      <EditorialQuotes quote="Every bride deserves portraits worthy of generations." />
      <FeaturedCollection albums={content.albums} />
      <BookYourStory image={content.heroImage} />
    </div>
  );
};

export default BridalPortraitsPage;
