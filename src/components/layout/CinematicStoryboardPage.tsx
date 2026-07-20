import React, { useState, useEffect, useRef } from 'react';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { CinematicLightbox } from '@/components/ui/cinematic-lightbox';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';
import { useParams, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const premiumQuotes = [
  "Every ritual is a <span class='text-[#D4AF37]'>blessing</span>.<br/>Every blessing becomes a memory.",
  "<span class='text-[#D4AF37]'>Two souls.</span><br/>One sacred promise.",
  "Love begins with faith.<br/><span class='text-[#D4AF37]'>Memories begin with us.</span>",
  "The most beautiful stories<br/>are written through <span class='text-[#D4AF37]'>tradition</span>.",
  "Some moments last a day.<br/>These <span class='text-[#D4AF37]'>memories last forever</span>."
];

// Helper to chunk array
const chunkArray = (arr: any[], size: number) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );
};

export default function CinematicStoryboardPage({ subcategory }: { subcategory: string }) {
    // 1. Fetch data for this specific category
    const content = categoryData[subcategory];
    
    // Fallback if content isn't found
    if (!content) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Category not found</div>;
    }

    // Combine hero, collage, and album images into a single flat list for the storyboard
    // We map them to the format the Lightbox expects { src: string }
    const allImages = [
        ...(content.heroImage && !content.heroImage.endsWith('.mp4') ? [{ src: content.heroImage }] : []),
        ...(content.collageImages ? content.collageImages.filter(img => !img.endsWith('.mp4')).map(img => ({ src: img })) : []),
        ...(content.albums ? content.albums.filter(album => album.image && !album.image.endsWith('.mp4')).map(album => ({ src: album.image })) : [])
    ];

    // Remove duplicates just in case
    const uniqueImages = Array.from(new Map(allImages.map(item => [item.src, item])).values());

    // Chunk images into groups of 3
    const chapters = chunkArray(uniqueImages, 3);
    
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const mainRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [subcategory]); // Scroll to top when subcategory changes

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!mainRef.current) return;

            // 1. Image Entrance Animations & Parallax
            const storyChapters = gsap.utils.toArray('.story-chapter') as HTMLElement[];
            
            storyChapters.forEach((chapter) => {
                const img1 = chapter.querySelector('.story-img-1');
                const img2 = chapter.querySelector('.story-img-2');
                const img3 = chapter.querySelector('.story-img-3');
                
                // Pure Scroll Animation: Individual triggers so they come in one by one as user scrolls
                if (img1) {
                    gsap.fromTo(img1, 
                        { xPercent: -60, y: 100, rotation: -8, opacity: 0 },
                        { 
                            xPercent: 0, y: 0, rotation: 0, opacity: 1, ease: "none",
                            scrollTrigger: {
                                trigger: img1,
                                start: "top 95%", 
                                end: "top 50%", 
                                scrub: 1
                            }
                        }
                    );
                }
                
                if (img2) {
                    gsap.fromTo(img2, 
                        { xPercent: 60, y: 100, rotation: 8, opacity: 0, filter: "blur(10px)" },
                        { 
                            xPercent: 0, y: 0, rotation: 0, opacity: 1, filter: "blur(0px)", ease: "none",
                            scrollTrigger: {
                                trigger: img2,
                                start: "top 95%",
                                end: "top 50%",
                                scrub: 1
                            }
                        }
                    );
                }
                
                if (img3) {
                    gsap.fromTo(img3, 
                        { xPercent: -60, y: 100, rotation: -8, opacity: 0 },
                        { 
                            xPercent: 0, y: 0, rotation: 0, opacity: 1, ease: "none",
                            scrollTrigger: {
                                trigger: img3,
                                start: "top 95%",
                                end: "top 50%",
                                scrub: 1
                            }
                        }
                    );
                }

                // Subtle Parallax while scrolling through the section
                gsap.to(img1, {
                    yPercent: -10, // Side images move faster
                    ease: "none",
                    scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: true }
                });
                
                gsap.to(img2, {
                    yPercent: -5, // Center image moves slower
                    ease: "none",
                    scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: true }
                });

                gsap.to(img3, {
                    yPercent: -15, // Side images move faster
                    ease: "none",
                    scrollTrigger: { trigger: chapter, start: "top bottom", end: "bottom top", scrub: true }
                });
            });

            // 2. Full-Screen Quote Parallax & Fade-in
            const quotes = gsap.utils.toArray('.quote-section') as HTMLElement[];
            quotes.forEach((quote) => {
                const text = quote.querySelector('.quote-text');
                const bg = quote.querySelector('.quote-bg');
                
                if (text) {
                    gsap.fromTo(text, 
                        { y: 50, opacity: 0 },
                        { 
                            y: 0, opacity: 1, duration: 1.5, ease: "power3.out",
                            scrollTrigger: {
                                trigger: quote,
                                start: "top 70%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
                
                if (bg) {
                    gsap.fromTo(bg,
                        { yPercent: -15 },
                        {
                            yPercent: 15,
                            ease: "none",
                            scrollTrigger: {
                                trigger: quote,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    )
                }
            });

        }, mainRef);
        
        return () => ctx.revert();
    }, [chapters.length, subcategory]); // Re-run GSAP when subcategory changes

    return (
        <SmoothScroll>
            <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#D4AF37]/30 selection:text-white overflow-hidden">
                {/* Intro Section */}
                <section className="h-[90vh] flex flex-col items-center justify-center text-center px-4 md:px-8 relative z-20 pt-20 md:pt-24">
                    <p className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs md:text-sm mb-6 font-poppins">{content.tagline}</p>
                    <h1 className="text-4xl md:text-6xl lg:text-8xl font-playfair mb-6 leading-tight tracking-tight px-4">
                        {content.title.split(' Photography')[0]} <br className="md:hidden" />
                        <span className="italic text-white/90">Photography</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-white/60 font-inter text-sm md:text-base leading-relaxed font-light px-4">
                        {content.description}
                    </p>
                    
                    <div className="mt-16 md:mt-24 animate-pulse">
                        <p className="text-white/30 text-xs tracking-widest uppercase mb-4">Scroll to Begin</p>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37]/60 to-transparent mx-auto"></div>
                    </div>
                </section>

                <main ref={mainRef} className="w-full relative z-10">
                    {chapters.map((chunk, chapterIdx) => {
                        const isLast = chapterIdx === chapters.length - 1;
                        const showQuote = chapterIdx % 2 === 0 && !isLast;
                        const quoteHtml = premiumQuotes[chapterIdx % premiumQuotes.length];
                        
                        return (
                            <React.Fragment key={`chapter-${chapterIdx}`}>
                                {/* Story Chapter - Cinematic 3-Image Stack */}
                                <section className="story-chapter relative w-full min-h-[100vh] md:min-h-[90vh] flex flex-col items-center justify-center py-16 md:py-20 px-4 md:px-12 lg:px-24">
                                    <div className="w-full max-w-[1800px] mx-auto flex flex-col md:grid md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-16 md:items-center">
                                        
                                        {/* Image 1 (Left Desktop, Top Mobile) */}
                                        {chunk[0] && (
                                            <div 
                                                className="story-img-1 w-[85%] mr-auto md:w-full md:col-span-1 lg:col-span-3 lg:col-start-2 relative aspect-[4/5] md:aspect-[3/4] rounded-[16px] md:rounded-[24px] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.4)] group will-change-transform z-10"
                                                onClick={() => {
                                                    const imgIdx = uniqueImages.findIndex(i => i.src === chunk[0].src);
                                                    setLightboxIndex(imgIdx);
                                                }}
                                            >
                                                <img 
                                                    src={chunk[0].src} 
                                                    alt="Cinematic Detail" 
                                                    className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105"
                                                />
                                            </div>
                                        )}

                                        {/* Image 2 (Center Hero Desktop, Middle Mobile) */}
                                        {chunk[1] && (
                                            <div 
                                                className="story-img-2 w-[95%] mx-auto -mt-16 md:mt-0 md:w-full col-span-1 lg:col-span-4 relative aspect-[3/4] md:aspect-[4/5] rounded-[16px] md:rounded-[28px] overflow-hidden cursor-pointer shadow-[0_30px_60px_rgba(0,0,0,0.7)] group will-change-transform z-20"
                                                onClick={() => {
                                                    const imgIdx = uniqueImages.findIndex(i => i.src === chunk[1].src);
                                                    setLightboxIndex(imgIdx);
                                                }}
                                            >
                                                <img 
                                                    src={chunk[1].src} 
                                                    alt="Cinematic Hero Moment" 
                                                    className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105"
                                                />
                                            </div>
                                        )}

                                        {/* Image 3 (Right Desktop, Bottom Mobile) */}
                                        {chunk[2] && (
                                            <div 
                                                className="story-img-3 w-[85%] ml-auto -mt-16 md:mt-0 md:w-full lg:col-span-3 relative aspect-[4/5] md:aspect-[3/4] rounded-[16px] md:rounded-[24px] overflow-hidden cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.4)] group will-change-transform z-10"
                                                onClick={() => {
                                                    const imgIdx = uniqueImages.findIndex(i => i.src === chunk[2].src);
                                                    setLightboxIndex(imgIdx);
                                                }}
                                            >
                                                <img 
                                                    src={chunk[2].src} 
                                                    alt="Cinematic Detail" 
                                                    className="w-full h-full object-cover transition-all duration-700 ease-out md:group-hover:scale-[1.03] md:group-hover:brightness-105"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </section>

                                {/* Full-Screen Editorial Quote Section */}
                                {showQuote && (
                                    <section className="quote-section relative w-full h-[60vh] md:h-[100vh] flex items-center justify-center overflow-hidden bg-[#050505]">
                                        {/* Blurred background image */}
                                        <div className="absolute inset-0 z-0 overflow-hidden">
                                            <div 
                                                className="quote-bg w-full h-[130%] -top-[15%] absolute bg-cover bg-center opacity-30" 
                                                style={{ 
                                                    backgroundImage: `url(${chunk[1]?.src || chunk[0]?.src})`,
                                                    filter: 'blur(15px)'
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-black/70 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]"></div>
                                        </div>
                                        
                                        {/* Quote Text */}
                                        <div className="relative z-10 px-6 max-w-5xl text-center">
                                            <h2 
                                                className="quote-text font-playfair text-3xl md:text-5xl lg:text-7xl leading-snug md:leading-tight text-white/90 font-light"
                                                dangerouslySetInnerHTML={{ __html: quoteHtml }}
                                            />
                                        </div>
                                    </section>
                                )}
                            </React.Fragment>
                        );
                    })}
                </main>

                {/* Final CTA Section */}
                <section className="relative z-20 w-full min-h-[50vh] md:min-h-[60vh] bg-[#050505] text-white flex flex-col items-center justify-center py-20 md:py-32 px-6 border-t border-white/5 mt-12">
                    <div className="max-w-2xl text-center">
                        <span className="block font-poppins text-[10px] md:text-xs tracking-[0.4em] uppercase text-[#D4AF37] mb-6 md:mb-8">{content.whyChooseTitle}</span>
                        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 md:mb-8">Ready to Tell Your Story?</h2>
                        <p className="font-poppins text-white/60 mb-10 md:mb-12 max-w-lg mx-auto text-sm md:text-base leading-relaxed px-4">
                            {content.whyChooseText}
                        </p>
                        <button className="px-8 py-4 md:px-10 md:py-5 bg-transparent border border-white/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-500 font-poppins text-xs md:text-sm tracking-widest uppercase hover:bg-[#D4AF37]/5">
                            Book Subha Studios
                        </button>
                    </div>
                </section>

                {/* Lightbox Overlay */}
                <CinematicLightbox 
                    images={uniqueImages as any}
                    currentIndex={lightboxIndex}
                    onClose={() => setLightboxIndex(null)}
                    onNavigate={setLightboxIndex}
                />
            </div>
        </SmoothScroll>
    );
}
