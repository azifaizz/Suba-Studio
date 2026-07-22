import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';
import { AdaptiveImage } from '@/components/ui/adaptive-image';

gsap.registerPlugin(ScrollTrigger);

const CoupleParallaxWall = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    
    const cpData = categoryData['couple-portraits'];
    const preData = categoryData['pre-wedding'];
    
    // Mix of 7 images to create a scattered wall
    const images = [
        cpData.albums[0].image,
        cpData.albums[1].image,
        preData.albums[3].image,
        cpData.albums[3].image,
        preData.albums[4].image,
        cpData.albums[5].image,
        preData.albums[6].image,
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            if (!container) return;

            // Subtle floating animation for all images
            const pwFloats = gsap.utils.toArray('.pw-float') as HTMLElement[];
            pwFloats.forEach((el, i) => {
                gsap.to(el, {
                    y: i % 2 === 0 ? 20 : -20,
                    x: i % 3 === 0 ? 10 : -10,
                    duration: 4 + i,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1
                });
            });

            // Parallax ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

            // Fast items (Foreground)
            tl.to('.pw-fast', { y: -300, ease: 'none' }, 0);
            
            // Medium items (Midground)
            tl.to('.pw-med', { y: -150, ease: 'none' }, 0);
            
            // Slow items (Background)
            tl.to('.pw-slow', { y: -50, ease: 'none' }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-[#FAF9F6] py-24 px-4 md:px-12">
            
            {/* Center Focus Text */}
            <div className="text-center mb-16 md:mb-24">
                <h2 className="font-serif text-5xl md:text-7xl text-[#1A1A1A] font-bold tracking-tighter">
                    Fragments of <span className="italic font-light">Eternity</span>
                </h2>
            </div>

            {/* Masonry Grid */}
            <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
                {images.map((img, idx) => (
                    <div key={idx} className="break-inside-avoid rounded-[20px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <AdaptiveImage src={img} alt={`Wall ${idx + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CoupleParallaxWall;
