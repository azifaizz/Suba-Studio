import React, { useEffect } from 'react';
import CoupleHero from '@/components/couple-portraits/CoupleHero';
import CouplePinnedStory from '@/components/couple-portraits/CouplePinnedStory';
import CoupleEditorialLayout from '@/components/couple-portraits/CoupleEditorialLayout';
import CoupleLoveInMotion from '@/components/couple-portraits/CoupleLoveInMotion';
import CoupleQuote from '@/components/couple-portraits/CoupleQuote';
import CoupleParallaxWall from '@/components/couple-portraits/CoupleParallaxWall';
import CoupleDetails from '@/components/couple-portraits/CoupleDetails';
import CoupleFullscreenStory from '@/components/couple-portraits/CoupleFullscreenStory';
import CoupleCTA from '@/components/couple-portraits/CoupleCTA';

interface CouplePortraitsPageProps {
    subcategory?: string;
}

const CouplePortraitsPage: React.FC<CouplePortraitsPageProps> = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#FAF9F6] min-h-screen text-[#1A1A1A] overflow-x-hidden selection:bg-[#D4AF37] selection:text-white">
            {/* Cinematic Hero */}
            <CoupleHero />

            {/* Pinned Storytelling Chapters */}
            <CouplePinnedStory />

            {/* Editorial Image Compositions */}
            <CoupleEditorialLayout />

            {/* First Emotional Quote */}
            <CoupleQuote 
                quote="The most beautiful moments happen between the poses." 
                delay={0}
            />

            {/* Love In Motion (Sticky Scroll) */}
            <CoupleLoveInMotion />

            {/* Parallax Image Wall */}
            <CoupleParallaxWall />

            {/* Second Emotional Quote */}
            <CoupleQuote 
                quote="Two souls. One unforgettable story." 
                delay={0}
            />

            {/* Editorial Details (Micro-moments) */}
            <CoupleDetails />

            {/* Fullscreen Love Story Isolation */}
            <CoupleFullscreenStory />

            {/* Book Your Story CTA */}
            <CoupleCTA />
        </div>
    );
};

export default CouplePortraitsPage;
