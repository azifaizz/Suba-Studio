import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const chapters = [
    { title: "Chapter One", subtitle: "The First Smile" },
    { title: "Chapter Two", subtitle: "The Conversation" },
    { title: "Chapter Three", subtitle: "The Laughter" },
    { title: "Chapter Four", subtitle: "The Silence" },
    { title: "Chapter Five", subtitle: "Forever" }
];

const CouplePinnedStory = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    
    // We will use 5 images from the albums array
    const data = categoryData['couple-portraits'];
    const images = data.albums.slice(0, 5).map(a => a.image);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const imageElements = gsap.utils.toArray('.story-image') as HTMLElement[];
            const textElements = gsap.utils.toArray('.story-text') as HTMLElement[];
            
            // Initial setup: hide all except first
            gsap.set(imageElements.slice(1), { opacity: 0, scale: 1.1 });
            gsap.set(textElements.slice(1), { opacity: 0, y: 30 });

            // Create a master timeline linked to scroll
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=4000', // 4000px of scrolling
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1
                }
            });

            // For each chapter (except the first one which is already visible)
            chapters.forEach((_, i) => {
                if (i === 0) return; // Skip first chapter setup in timeline

                // Fade out previous text
                tl.to(textElements[i - 1], {
                    opacity: 0,
                    y: -30,
                    duration: 1,
                    ease: "power2.inOut"
                }, `step${i}`);

                // Fade in new text
                tl.fromTo(textElements[i], 
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.inOut" },
                `step${i}`);

                // Crossfade image: fade out previous, fade in current, scale current down to 1
                tl.to(imageElements[i - 1], {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut"
                }, `step${i}`);

                tl.to(imageElements[i], {
                    opacity: 1,
                    scale: 1,
                    duration: 1.5,
                    ease: "power2.out"
                }, `step${i}`);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#1A1A1A] overflow-hidden flex items-center justify-center">
            
            {/* Background Images Layer */}
            <div ref={imagesRef} className="absolute inset-0 w-full h-full">
                {images.map((src, i) => (
                    <div key={i} className="story-image absolute inset-0 w-full h-full">
                        <img 
                            src={src} 
                            alt={`Chapter ${i + 1}`} 
                            className="w-full h-full object-cover opacity-60"
                        />
                        {/* Soft depth blur gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-[#1A1A1A] opacity-80" />
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                    </div>
                ))}
            </div>

            {/* Foreground Text Layer */}
            <div ref={textRef} className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex items-center justify-center pointer-events-none">
                {chapters.map((chapter, i) => (
                    <div key={i} className="story-text absolute inset-0 flex flex-col items-center justify-center text-center">
                        <div className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-sm mb-4">
                            {chapter.title}
                        </div>
                        <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium tracking-tight drop-shadow-lg">
                            {chapter.subtitle}
                        </h2>
                    </div>
                ))}
            </div>

        </section>
    );
};

export default CouplePinnedStory;
