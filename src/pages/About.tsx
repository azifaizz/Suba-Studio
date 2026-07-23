import React, { useEffect } from 'react';
import Lenis from 'lenis';

import HeroSection from '@/components/about/HeroSection';
import FounderShowcaseSection from '@/components/about/FounderShowcaseSection';
import PhilosophySection from '@/components/about/PhilosophySection';
import AwardsSection from '@/components/about/AwardsSection';
import ValuesSection from '@/components/about/ValuesSection';
import TrustSection from '@/components/about/TrustSection';
import JoinTeamSection from '@/components/about/JoinTeamSection';
import BookStorySection from '@/components/about/BookStorySection';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      <main>
        <HeroSection />
        <FounderShowcaseSection />
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
