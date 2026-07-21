import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const CoupleEditorialLayout = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const data = categoryData['couple-portraits'];
    
    // We need 4 distinct images for this editorial layout
    const img1 = data.collageImages[0] || data.albums[5].image;
    const img2 = data.collageImages[1] || data.albums[6].image;
    const img3 = data.collageImages[2] || data.albums[7].image;
    const img4 = data.albums[8].image;

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Reveal images with a soft mask effect
            const edImages = gsap.utils.toArray('.ed-img-container') as HTMLElement[];
            edImages.forEach((el) => {
                const img = el.querySelector('img');
                
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                });

                tl.fromTo(el, 
                    { clipPath: 'inset(100% 0 0 0)' },
                    { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.inOut' }
                );

                if (img) {
                    tl.fromTo(img,
                        { scale: 1.2 },
                        { scale: 1, duration: 1.5, ease: 'power4.out' },
                        "<"
                    );
                }
            });

            // Parallax overlapping images
            gsap.to('.ed-parallax-up', {
                y: -100,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.ed-parallax-container',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-[#FAF9F6] text-[#1A1A1A] overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl">
                
                {/* 1. One Giant Portrait */}
                <div className="w-full flex justify-center mb-32 md:mb-48">
                    <div className="ed-img-container w-full md:w-[70%] aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                        <img src={img1} alt="Editorial Main" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* 2. Two Overlapping Images */}
                <div className="ed-parallax-container relative w-full h-[600px] md:h-[800px] mb-32 md:mb-48 flex justify-center items-center">
                    <div className="absolute left-0 md:left-[10%] top-[10%] w-[60%] md:w-[40%] aspect-[4/5] z-10 ed-img-container overflow-hidden">
                        <img src={img2} alt="Editorial Overlap 1" className="w-full h-full object-cover" />
                    </div>
                    <div className="ed-parallax-up absolute right-0 md:right-[15%] top-[30%] w-[50%] md:w-[35%] aspect-[3/4] z-20 shadow-2xl ed-img-container overflow-hidden">
                        <img src={img3} alt="Editorial Overlap 2" className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* 3. Massive Whitespace & Quote */}
                <div className="w-full flex flex-col items-center justify-center py-20 mb-20">
                    <div className="w-[1px] h-24 bg-[#D4AF37] mb-12 opacity-50" />
                    <h3 className="font-serif text-3xl md:text-5xl text-center max-w-3xl leading-relaxed text-[#1A1A1A]">
                        "The genuine interactions. The unforced smiles. The pure connection."
                    </h3>
                    <div className="w-[1px] h-24 bg-[#D4AF37] mt-12 opacity-50" />
                </div>

                {/* 4. Panoramic Image */}
                <div className="w-full ed-img-container aspect-video md:aspect-[21/9] overflow-hidden mb-20">
                    <img src={img4} alt="Editorial Panorama" className="w-full h-full object-cover object-center" />
                </div>

            </div>
        </section>
    );
};

export default CoupleEditorialLayout;
