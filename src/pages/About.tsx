import React, { useEffect } from 'react';
import Lenis from 'lenis';

import HeroSection from '@/components/about/HeroSection';
import VisualStorytellingSection from '@/components/about/VisualStorytellingSection';
import TheJourneySection from '@/components/about/TheJourneySection';
import FounderSpotlightSection from '@/components/about/FounderSpotlightSection';
import PhilosophySection from '@/components/about/PhilosophySection';
import AwardsSection from '@/components/about/AwardsSection';
import ValuesSection from '@/components/about/ValuesSection';
import TrustSection from '@/components/about/TrustSection';
import JoinTeamSection from '@/components/about/JoinTeamSection';
import BookStorySection from '@/components/about/BookStorySection';

const About = () => {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <main>
        <HeroSection />
        <VisualStorytellingSection />
        <TheJourneySection />
        <FounderSpotlightSection />
        <PhilosophySection />
        <AwardsSection />
        <ValuesSection />
        <TrustSection />
        <JoinTeamSection />
        <BookStorySection />
      </main>
    </div>
  );
};

export default About;
