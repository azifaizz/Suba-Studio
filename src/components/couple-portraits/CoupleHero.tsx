import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const CoupleHero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLImageElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const data = categoryData['couple-portraits'];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Background slow zoom
            gsap.to(bgRef.current, {
                scale: 1.15,
                duration: 20,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });

            // Split text reveal
            const title = textRef.current?.querySelector('h1');
            const desc = textRef.current?.querySelector('p');
            const label = textRef.current?.querySelector('.hero-label');
            const buttons = textRef.current?.querySelectorAll('button');

            gsap.fromTo(label, 
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.2 }
            );

            gsap.fromTo(title, 
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 2, ease: 'power4.out', delay: 0.4 }
            );

            gsap.fromTo(desc,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.8 }
            );

            gsap.fromTo(buttons,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.5, stagger: 0.2, ease: 'power3.out', delay: 1.2 }
            );

            // Parallax on scroll
            gsap.to(textRef.current, {
                y: 150,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-screen overflow-hidden bg-[#111]">
            <div className="absolute inset-0">
                <img 
                    ref={bgRef}
                    src={data.heroImage || "/b8.jpg"} 
                    alt="Couple Portrait" 
                    className="w-full h-full object-cover object-[center_30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-[#111] opacity-90" />
            </div>

            <div 
                ref={textRef} 
                className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6"
            >
                <div className="hero-label text-[#D4AF37] font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-6">
                    Couple Portraits
                </div>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight mb-8 max-w-4xl leading-[1.1]">
                    Every Love Story<br />
                    <span className="italic font-light">Has Its Own Magic.</span>
                </h1>
                <p className="text-white/80 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12">
                    The most beautiful portraits are created when two hearts simply forget the camera exists.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <button className="px-10 py-4 bg-white text-black text-sm uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-white transition-colors duration-500 rounded-full">
                        Explore Story
                    </button>
                    <button className="px-10 py-4 bg-transparent border border-white/30 text-white text-sm uppercase tracking-widest font-semibold hover:border-white transition-colors duration-500 rounded-full">
                        Book Your Session
                    </button>
                </div>
            </div>

            {/* Floating Particles (CSS handled) */}
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-screen">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full blur-[2px] animate-pulse" />
                <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white rounded-full blur-[3px] animate-pulse delay-700" />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full blur-[1px] animate-pulse delay-300" />
            </div>
        </section>
    );
};

export default CoupleHero;
