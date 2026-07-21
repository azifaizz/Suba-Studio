import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const CoupleDetails = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const data = categoryData['couple-portraits'];
    
    // Borrow 4 images for the details section
    const images = [
        data.albums[4].image,
        data.albums[5].image,
        data.albums[6].image,
        data.albums[7].image
    ];

    const details = [
        { title: "The Details", desc: "Intertwined fingers. A gentle touch." },
        { title: "The Glances", desc: "Words spoken without a sound." },
        { title: "The Laughter", desc: "Pure, unfiltered, and completely yours." },
        { title: "The Embrace", desc: "Finding home in each other's arms." }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.cd-item') as HTMLElement[];
            items.forEach((item, i) => {
                const img = item.querySelector('.cd-img');
                const text = item.querySelector('.cd-text');

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none none'
                    }
                });

                tl.fromTo(img, 
                    { filter: 'blur(20px) grayscale(100%)', scale: 0.8, opacity: 0 },
                    { filter: 'blur(0px) grayscale(0%)', scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out' }
                );

                tl.fromTo(text,
                    { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
                    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
                    "-=1"
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-[#1A1A1A] text-white overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                
                <div className="text-center mb-32">
                    <h2 className="font-serif text-4xl md:text-6xl font-light tracking-wide">
                        The In-Between <span className="italic text-[#D4AF37]">Moments</span>
                    </h2>
                </div>

                <div className="space-y-32 md:space-y-48">
                    {images.map((src, i) => (
                        <div key={i} className={`cd-item flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24`}>
                            
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="w-full max-w-sm aspect-[4/5] rounded-[30px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#111]">
                                    <img src={src} alt={details[i].title} className="cd-img w-full h-full object-cover origin-center" />
                                </div>
                            </div>

                            <div className="cd-text w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
                                <div className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-sm mb-4">
                                    0{i + 1}
                                </div>
                                <h3 className="font-serif text-4xl md:text-5xl mb-6">
                                    {details[i].title}
                                </h3>
                                <p className="text-white/60 text-lg font-light leading-relaxed max-w-md mx-auto md:mx-0">
                                    {details[i].desc}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoupleDetails;
