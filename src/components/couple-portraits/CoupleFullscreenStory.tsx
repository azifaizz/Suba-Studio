import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const CoupleFullscreenStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const data = categoryData['couple-portraits'];
    const image = data.heroImage; // Choose a strong image

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=100%',
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                }
            });

            // Slow cinematic zoom
            tl.fromTo(bgRef.current, 
                { scale: 1 },
                { scale: 1.15, ease: 'none' },
                0
            );

            // Smoothly fade out text toward the release phase of the pin so there's no sudden void or abrupt release
            tl.to('.cfs-text', {
                opacity: 0,
                y: -40,
                ease: 'power2.inOut',
                duration: 0.4
            }, 0.6);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
            <div className="absolute inset-0">
                <img 
                    ref={bgRef}
                    src={image} 
                    alt="Fullscreen Love Story" 
                    className="w-full h-full object-cover opacity-80"
                />
            </div>
            
            <div className="cfs-text relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight drop-shadow-2xl max-w-4xl">
                    Only The Two Of You.
                </h2>
                <p className="mt-8 text-white/80 text-lg md:text-xl font-light tracking-wide italic">
                    Everything else fades away.
                </p>
            </div>
        </section>
    );
};

export default CoupleFullscreenStory;
