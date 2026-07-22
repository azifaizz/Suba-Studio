import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { SplitTextReveal } from '@/components/ui/split-text-reveal';
import { LuxuryLightbox } from '@/components/ui/luxury-lightbox';
import { categoryData } from '@/data/categoryContent';
import { Camera, Sparkles, ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EditorialCard = ({ src, title, category, onClick, className = '' }: {
    src: string;
    title?: string;
    category?: string;
    onClick: () => void;
    className?: string;
}) => {
    return (
        <div 
            onClick={onClick}
            className={`group cursor-pointer overflow-hidden rounded-[16px] relative shadow-xl border border-white/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] ${className}`}
        >
            <img 
                src={src} 
                alt={title || "Couple Portrait"}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108" 
                loading="lazy"
            />
            {/* Subtle Gradient & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {title && (
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10">
                    {category && (
                        <span className="text-[#D4AF37] text-xs font-sans uppercase tracking-[0.25em] font-semibold block mb-2">
                            {category}
                        </span>
                    )}
                    <h3 className="font-serif text-2xl md:text-3xl text-white font-medium">
                        {title}
                    </h3>
                </div>
            )}
            
            {/* Gold Accent Corner Bar */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera size={14} />
            </div>
        </div>
    );
};

interface CouplePortraitsPageProps {
    subcategory?: string;
}

const CouplePortraitsPage: React.FC<CouplePortraitsPageProps> = () => {
    const data = categoryData['couple-portraits'];
    const preWeddingData = categoryData['pre-wedding'] || data;
    
    // Combine all available imagery into a rich collection
    const allImages = Array.from(new Set([
        data.heroImage,
        ...data.collageImages,
        ...data.albums.map(a => a.image),
        ...preWeddingData.albums.map(a => a.image)
    ]));

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const storyContainerRef = useRef<HTMLDivElement>(null);

    const openLightbox = (imageSrc: string) => {
        const index = allImages.findIndex(img => img === imageSrc);
        setLightboxIndex(index !== -1 ? index : 0);
        setLightboxOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // 1. Initialize Lenis Smooth Scrolling Engine
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 0.9,
        });

        lenis.on('scroll', ScrollTrigger.update);

        const tickerCb = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);

        // 2. Responsive GSAP Animations
        const mm = gsap.matchMedia(containerRef);

        mm.add("all", () => {
            // Hero Background Subtle Zoom
            gsap.to('.cp-hero-bg', {
                scale: 1.12,
                duration: 18,
                ease: 'none',
                repeat: -1,
                yoyo: true
            });

            // Parallax scroll on hero content
            gsap.to('.cp-hero-content', {
                y: 120,
                opacity: 0,
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // Pinned Story Section (Desktop / Tablet)
        mm.add("(min-width: 768px)", () => {
            if (storyContainerRef.current) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: storyContainerRef.current,
                        start: 'top top',
                        end: '+=350%',
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                });

                // Scene 1 -> 2
                tl.to('.cps-text-1', { opacity: 0, y: -40, duration: 1 }, '+=1')
                  .to('.cps-img-1', { scale: 0.9, opacity: 0, duration: 1 }, '<')
                  .fromTo('.cps-text-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '<')
                  .fromTo('.cps-img-2', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '<')
                  
                  // Scene 2 -> 3
                  .to('.cps-text-2', { opacity: 0, y: -40, duration: 1 }, '+=1')
                  .to('.cps-img-2', { scale: 0.9, opacity: 0, duration: 1 }, '<')
                  .fromTo('.cps-text-3', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '<')
                  .fromTo('.cps-img-3', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '<')

                  // Scene 3 -> 4
                  .to('.cps-text-3', { opacity: 0, y: -40, duration: 1 }, '+=1')
                  .to('.cps-img-3', { scale: 0.9, opacity: 0, duration: 1 }, '<')
                  .fromTo('.cps-text-4', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '<')
                  .fromTo('.cps-img-4', { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 1, duration: 1 }, '<')

                  // Pause at final scene before smooth release
                  .to({}, { duration: 0.8 });
            }

            // Parallax wall staggered scroll
            const items = gsap.utils.toArray('.cp-parallax-item') as HTMLElement[];
            items.forEach((item, i) => {
                const depth = (i % 3 + 1) * 30;
                gsap.to(item, {
                    y: -depth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: parallaxRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            });
        });

        return () => {
            lenis.destroy();
            gsap.ticker.remove(tickerCb);
            mm.revert();
        };
    }, []);

    const storyScenes = [
        {
            num: "01",
            title: "The First Smile",
            subtitle: "Where Every Story Begins",
            desc: "The gentle anticipation before the world turns to watch two souls meet.",
            image: data.albums[0]?.image || data.heroImage
        },
        {
            num: "02",
            title: "The Conversation",
            subtitle: "Words Spoken Without a Sound",
            desc: "A shared glance that carries an entire lifetime of secret understanding.",
            image: data.albums[1]?.image || data.collageImages[0]
        },
        {
            num: "03",
            title: "The Laughter",
            subtitle: "Pure & Unfiltered",
            desc: "Spontaneous, joyful moments when pose dissolves into genuine affection.",
            image: data.albums[2]?.image || data.collageImages[1]
        },
        {
            num: "04",
            title: "The Embrace",
            subtitle: "Finding Home in Each Other",
            desc: "Warmth, quiet stillness, and a bond crafted for generations.",
            image: data.albums[3]?.image || data.heroImage
        }
    ];

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] min-h-screen text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-white font-sans">
            
            {/* 1. Cinematic Hero Section */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0D0D0D]">
                    <div className="cp-hero-bg absolute inset-0 w-full h-full">
                        <img 
                            src={data.heroImage} 
                            alt="Couple Portrait Hero" 
                            className="w-full h-full object-cover opacity-60 object-[center_35%]"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0D0D0D]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,13,0.75)_100%)]" />
                </div>

                <div className="cp-hero-content relative z-10 max-w-5xl text-center px-6 pt-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs font-semibold mb-8 backdrop-blur-md">
                        <Sparkles size={13} />
                        <span>Suba Studio Fine Art</span>
                    </div>
                    
                    <SplitTextReveal 
                        text="Couple Portraits" 
                        type="words" 
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-white leading-none mb-6 drop-shadow-2xl"
                    />

                    <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-serif italic font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                        Every love story has its own magic. We frame the moments between the beats.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                        <button 
                            onClick={() => {
                                const target = document.getElementById('story-section');
                                target?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-8 py-3.5 rounded-full bg-[#D4AF37] text-black font-semibold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors duration-400 flex items-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.3)]"
                        >
                            <span>Explore Stories</span>
                            <ArrowRight size={14} />
                        </button>
                        <button 
                            onClick={() => window.location.href = 'tel:+918994442768'}
                            className="px-8 py-3.5 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white font-semibold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-400"
                        >
                            Book Session
                        </button>
                    </div>
                </div>
            </section>

            {/* 2. Editorial Quote Divider 1 */}
            <section className="py-24 md:py-36 bg-[#0D0D0D] border-y border-white/10 relative overflow-hidden">
                <div className="max-w-4xl mx-auto text-center px-6">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mx-auto mb-8 opacity-60" />
                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl italic font-light text-white/90 leading-relaxed">
                        "The most genuine portraits are captured when two hearts forget the lens is watching."
                    </h2>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mx-auto mt-8 opacity-60" />
                </div>
            </section>

            {/* 3. Pinned Cinematic Storytelling Experience */}
            <section id="story-section" ref={storyContainerRef} className="relative h-screen w-full bg-[#080808] overflow-hidden flex items-center justify-center">
                
                {storyScenes.map((scene, i) => (
                    <div 
                        key={i}
                        className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center px-6 md:px-20 lg:px-32 transition-all ${
                            i === 0 ? 'cps-img-1' : `cps-img-${i+1} opacity-0`
                        }`}
                    >
                        {/* Background Image Layer with Depth Effects */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <img 
                                src={scene.image} 
                                alt={scene.title} 
                                className="w-full h-full object-cover opacity-50 filter brightness-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/90" />
                        </div>

                        {/* Foreground Content Card */}
                        <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
                            
                            {/* Text Info */}
                            <div className={`w-full md:w-1/2 text-left ${i === 0 ? 'cps-text-1' : `cps-text-${i+1} opacity-0`}`}>
                                <span className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs font-bold mb-3 block">
                                    Chapter {scene.num}
                                </span>
                                <h3 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-bold tracking-tight leading-none mb-4">
                                    {scene.title}
                                </h3>
                                <p className="text-[#D4AF37] font-serif italic text-lg md:text-xl mb-6">
                                    {scene.subtitle}
                                </p>
                                <p className="text-white/70 text-base md:text-lg font-light max-w-md leading-relaxed">
                                    {scene.desc}
                                </p>
                            </div>

                            {/* Clickable Image Preview */}
                            <div className="w-full md:w-1/2 aspect-[4/5] max-w-md rounded-[24px] overflow-hidden border border-white/15 shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative group cursor-pointer" onClick={() => openLightbox(scene.image)}>
                                <img 
                                    src={scene.image} 
                                    alt={scene.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                                        <Camera size={20} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </section>

            {/* 4. Editorial Parallax Gallery Portfolio */}
            <section ref={parallaxRef} className="py-32 md:py-48 px-6 md:px-16 bg-[#0D0D0D] relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/10 pb-10">
                        <div>
                            <span className="text-[#D4AF37] font-sans uppercase tracking-[0.25em] text-xs font-semibold block mb-3">
                                Fine Art Gallery
                            </span>
                            <h2 className="font-serif text-4xl sm:text-6xl text-white font-bold tracking-tight">
                                Couple Portrait Collection
                            </h2>
                        </div>
                        <p className="text-white/60 font-light max-w-md text-sm md:text-base leading-relaxed">
                            Click on any portrait to enter the full-screen cinematic gallery experience with full detail.
                        </p>
                    </div>

                    {/* Multi-Column Staggered Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {allImages.slice(0, 9).map((img, idx) => {
                            const isTall = idx % 2 === 0;
                            return (
                                <div key={idx} className="cp-parallax-item">
                                    <EditorialCard 
                                        src={img} 
                                        title={data.albums[idx % data.albums.length]?.title || `Love Portrait 0${idx + 1}`}
                                        category="Couple Photography"
                                        onClick={() => openLightbox(img)}
                                        className={isTall ? 'aspect-[3/4]' : 'aspect-[4/5] md:aspect-[3/4]'}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* 5. Second Quote Separator */}
            <section className="py-24 bg-[#080808] border-y border-white/10 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <Heart className="w-8 h-8 text-[#D4AF37] mx-auto mb-6 stroke-[1.5] animate-pulse" />
                    <h3 className="font-serif text-3xl md:text-4xl text-white italic font-light leading-snug">
                        "Two souls. One unforgettable story."
                    </h3>
                </div>
            </section>

            {/* 6. Luxury Booking CTA */}
            <section className="py-32 md:py-48 px-6 bg-[#0D0D0D] relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <span className="text-[#D4AF37] font-sans uppercase tracking-[0.3em] text-xs font-semibold block mb-4">
                        Your Story Awaits
                    </span>
                    
                    <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-white font-bold tracking-tight mb-8">
                        Ready to Frame Your Moments?
                    </h2>

                    <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
                        Let's craft timeless memories together. Reserve your couple portrait session with Suba Studio today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                        <button 
                            onClick={() => window.location.href = 'tel:+918994442768'}
                            className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors duration-400 shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
                        >
                            Call Us: +91 89944 42768
                        </button>
                        <button 
                            onClick={() => window.location.href = 'mailto:info@subastudios.com'}
                            className="px-10 py-4 rounded-full bg-white/5 border border-white/20 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-400"
                        >
                            Send Inquiry
                        </button>
                    </div>
                </div>
            </section>

            {/* Full-Screen Interactive Luxury Lightbox */}
            <LuxuryLightbox 
                images={allImages.map((img, i) => ({ id: i, image: img }))}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />

        </div>
    );
};

export default CouplePortraitsPage;
