import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoupleCTA = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(bgRef.current,
                { scale: 1 },
                {
                    scale: 1.15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black flex items-center justify-center">
            <div className="absolute inset-0">
                <img 
                    ref={bgRef}
                    src="/10.JPG" 
                    alt="Book Your Story" 
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-8 leading-[1.1]">
                    Let's Tell Your<br />
                    <span className="italic font-light">Story Together.</span>
                </h2>
                <p className="text-white/70 text-lg md:text-xl font-light mb-12 max-w-xl">
                    Every couple has a unique story waiting to be remembered forever.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <button className="px-10 py-4 bg-[#D4AF37] text-white text-sm uppercase tracking-widest font-semibold hover:bg-white hover:text-black transition-colors duration-500 rounded-full">
                        Book Your Story
                    </button>
                    <button className="px-10 py-4 bg-transparent border border-white/30 text-white text-sm uppercase tracking-widest font-semibold hover:border-white transition-colors duration-500 rounded-full">
                        Explore Galleries
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CoupleCTA;
