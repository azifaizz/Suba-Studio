import React, { useState, useEffect, useRef } from 'react';
import { hinduWeddingImages } from '@/data/hindu-wedding-images';
import { hinduWeddingQuotes } from '@/data/hindu-wedding-quotes';
import { CinematicFrame } from '@/components/ui/cinematic-frame';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { CinematicLightbox } from '@/components/ui/cinematic-lightbox';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HinduWeddingPage() {
    const allImages = hinduWeddingImages;
    const totalImages = allImages.length;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!mainRef.current) return;
            
            const sections = gsap.utils.toArray('.cinematic-section') as HTMLElement[];
            if (sections.length === 0) return;
            
            // Zero Gravity Float Animation for all images
            gsap.set('.zero-gravity', { y: -3 });
            gsap.to('.zero-gravity', {
                y: 3,
                duration: 4,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut"
            });

            // Parallax ScrollTrigger logic for each section natively scrolling
            sections.forEach((section, i) => {
                const nextSection = sections[i + 1] as HTMLElement | null;
                
                // --- OUTGOING ANIMATION ---
                // As the NEXT section slides up over THIS section, this section reacts.
                if (nextSection) {
                    const currentWrapper = section.querySelector('.parallax-wrapper');
                    const currentTexts = section.querySelectorAll('.cinematic-text');
                    
                    if (currentWrapper) {
                        gsap.fromTo(currentWrapper, 
                            { scale: 1, yPercent: 0, opacity: 1 },
                            {
                                scale: 1.02,
                                yPercent: -15,
                                opacity: 0.95,
                                ease: "none",
                                immediateRender: false,
                                scrollTrigger: {
                                    trigger: nextSection,
                                    start: "top bottom", // Starts when next section's top enters from bottom
                                    end: "top top",      // Ends when next section docks at top
                                    scrub: true
                                }
                            }
                        );
                    }

                    if (currentTexts.length > 0) {
                        gsap.fromTo(currentTexts, 
                            { y: 0, opacity: 1, filter: "blur(0px)" },
                            {
                                y: -30,
                                opacity: 0,
                                filter: "blur(10px)",
                                ease: "power2.in",
                                immediateRender: false,
                                scrollTrigger: {
                                    trigger: nextSection,
                                    start: "top bottom",
                                    end: "top 50%", // Fades out fully by the time next section is halfway up
                                    scrub: true
                                }
                            }
                        );
                    }
                }

                // --- INCOMING ANIMATION ---
                // As THIS section slides up into view, its contents animate.
                if (i > 0) {
                    const incomingWrapper = section.querySelector('.incoming-wrapper');
                    if (incomingWrapper) {
                        gsap.fromTo(incomingWrapper, 
                            { opacity: 0, scale: 1.05 },
                            {
                                opacity: 1,
                                scale: 1,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top bottom",
                                    end: "top top",
                                    scrub: true
                                }
                            }
                        );
                    }
                }

                // --- INCOMING TEXT ANIMATION ---
                const texts = section.querySelectorAll('.cinematic-text');
                if (texts.length > 0) {
                    if (i === 0) {
                        // First image's text plays automatically on load
                        gsap.fromTo(texts, 
                            { y: 30, opacity: 0, filter: "blur(10px)" },
                            { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.1, duration: 1.2, delay: 0.2, ease: "power3.out" }
                        );
                    } else {
                        // Subsequent texts scrub in naturally as the section nears the top
                        gsap.fromTo(texts, 
                            { y: 30, opacity: 0, filter: "blur(10px)" },
                            {
                                y: 0,
                                opacity: 1,
                                filter: "blur(0px)",
                                stagger: 0.1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: section,
                                    start: "top 60%", // Start animating when it's 60% up the screen
                                    end: "top top",
                                    scrub: true
                                }
                            }
                        );
                    }
                }
            });

            // Global Snapping mechanism
            ScrollTrigger.create({
                trigger: mainRef.current,
                start: "top top",
                end: "bottom bottom",
                snap: {
                    snapTo: 1 / (totalImages - 1),
                    duration: { min: 0.2, max: 0.6 },
                    ease: "power2.inOut"
                }
            });

        }, mainRef);
        
        return () => ctx.revert();
    }, [totalImages]);

    return (
        <SmoothScroll>
            <div className="bg-black min-h-screen text-white font-sans selection:bg-white/30">
                {/* Intro Section */}
                <section className="h-[70vh] md:h-[80vh] flex flex-col items-center justify-center text-center px-4 md:px-8 relative z-20 bg-black pt-20 md:pt-24">
                    <p className="text-white/50 tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-poppins">The Sacred Union</p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair mb-6 leading-tight">
                        A Journey of <br className="md:hidden" />
                        <span className="italic text-white/90">Eternal Love</span>
                    </h1>
                    <p className="max-w-xl mx-auto text-white/60 font-inter text-sm md:text-base leading-relaxed font-light">
                        Experience the beauty, tradition, and emotion of a timeless Hindu wedding. Every frame is a chapter in their story.
                    </p>
                    
                    <div className="mt-16 md:mt-24 animate-bounce">
                        <p className="text-white/30 text-xs tracking-widest uppercase mb-2">Scroll to Begin</p>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent mx-auto"></div>
                    </div>
                </section>

                {/* Main Storytelling Gallery */}
                <main ref={mainRef} className="w-full relative z-10 bg-black">
                    {allImages.map((img, index) => {
                        const quote = hinduWeddingQuotes[index];
                        return (
                            <section
                                key={img.src} 
                                className="cinematic-section sticky top-0 w-full h-screen overflow-hidden cursor-pointer will-change-transform"
                                style={{ zIndex: index + 1 }}
                                onClick={() => setLightboxIndex(index)}
                            >
                                <div className="incoming-wrapper w-full h-full relative">
                                    <div className="parallax-wrapper w-full h-full relative">
                                        <CinematicFrame
                                            src={img.src}
                                            alt={`Sacred Moment ${index + 1}`}
                                            index={index}
                                            quote={quote}
                                            orientation={img.orientation}
                                            priority={index < 3}
                                        />
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </main>

                {/* Remaining Page Content (Scrolls up natively after the gallery unpins) */}
                <section className="relative z-20 w-full min-h-[50vh] bg-black text-white flex flex-col items-center justify-center py-32 px-6">
                    <div className="max-w-2xl text-center">
                        <span className="block font-poppins text-sm tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Continue the Journey</span>
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">Ready to Tell Your Story?</h2>
                        <p className="font-poppins text-white/70 mb-12 max-w-lg mx-auto">
                            Every wedding is unique. Let us preserve yours with the same cinematic elegance.
                        </p>
                        <button className="px-8 py-4 bg-transparent border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors duration-500 font-poppins text-sm tracking-widest uppercase">
                            Book Subha Studios
                        </button>
                    </div>
                </section>

                {/* Lightbox Overlay */}
                <CinematicLightbox 
                    images={allImages}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNavigate={setLightboxIndex}
                />
            </div>
        </SmoothScroll>
    );
}
