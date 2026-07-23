import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AdaptiveImage } from '@/components/ui/adaptive-image';
import imageMetadata from '@/data/imageMetadata.json';
import { SplitTextReveal } from '@/components/ui/split-text-reveal';
import { LuxuryLightbox } from '@/components/ui/luxury-lightbox';
import { categoryData } from '@/data/categoryContent';
import { ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const EditorialCard = ({ src, title, category, onClick, className = '', style }: {
    src: string;
    title?: string;
    category?: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
}) => {
    return (
        <div 
            onClick={onClick}
            className={`group overflow-hidden rounded-[16px] relative shadow-xl border border-white/10 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(212,175,55,0.2)] ${className}`}
            style={style}
        >
            <img 
                src={src} 
                alt={title || "Bridal Portrait"}
                className="w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108" 
                loading="lazy"
            />
            {/* Subtle Gradient & Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
            
            {title && (
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10">
                    {category && (
                        <span className="text-[#D4AF37] text-[10px] md:text-xs font-sans uppercase tracking-[0.2em] font-medium block mb-1.5">
                            {category}
                        </span>
                    )}
                    <h3 className="font-serif text-lg md:text-xl text-white font-medium">
                        {title}
                    </h3>
                </div>
            )}
        </div>
    );
};

interface BridalPortraitsPageProps {
    subcategory?: string;
}

const BridalPortraitsPage: React.FC<BridalPortraitsPageProps> = () => {
    const data = categoryData['bridal-portraits'];
    
    // Combine all available imagery into a rich collection
    const rawAllImages = Array.from(new Set([
        data.heroImage,
        ...(data.collageImages || []),
        ...data.albums.map(a => a.image)
    ]));

    const storyAssignedImages = [
        "/Bridal/4.JPG",   // The Dress
        "/Bridal/15.JPG",  // The Jewellery
        "/Bridal/19.jpg",  // The Expressions
        "/Bridal/8.JPG"    // The Details
    ];

    // Filter out the story images to get exactly the remaining images
    const remainingImages = rawAllImages.filter(img => !storyAssignedImages.includes(img));

    // For lightbox indexing, we can just use all remaining images (since sticky cards don't use lightbox anymore)
    const allImages = remainingImages;

    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const parallaxRef = useRef<HTMLDivElement>(null);
    const storyContainerRef = useRef<HTMLDivElement>(null);

    const storyCardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeStoryChapter, setActiveStoryChapter] = useState(0);

    const openLightbox = (imageSrc: string) => {
        const index = allImages.findIndex(img => img === imageSrc);
        setLightboxIndex(index !== -1 ? index : 0);
        setLightboxOpen(true);
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // 1. Responsive GSAP Animations using global Lenis smooth scroll
        const mm = gsap.matchMedia();

        mm.add("all", () => {
            // Hero Background Parallax Scroll & Subtle Zoom
            gsap.to('.bp-hero-bg', {
                yPercent: 25,
                scale: 1.15,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Parallax scroll & fade out on hero content
            gsap.to('.bp-hero-content', {
                y: 140,
                opacity: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Quote Section Parallax Reveal
            const quoteElements = gsap.utils.toArray('.bp-quote-reveal') as HTMLElement[];
            quoteElements.forEach((el) => {
                gsap.fromTo(el,
                    { opacity: 0, y: 50, scale: 0.96 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        });

        // Sticky Notes Stack Animation (Mobile + Desktop)
        mm.add(
            {
                isMobile: "(max-width: 767px)",
                isDesktop: "(min-width: 768px)"
            },
            (context) => {
                const { isMobile } = context.conditions as { isMobile: boolean };
                if (!storyContainerRef.current || storyCardRefs.current.length === 0) return;

                const totalCards = storyScenes.length;
                const cardScrollDistance = isMobile ? 420 : 650;
                const scrollDistance = (totalCards - 1) * cardScrollDistance;

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: storyContainerRef.current,
                        pin: true,
                        start: 'top top',
                        end: `+=${scrollDistance}px`,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                        fastScrollEnd: true,
                        onUpdate: (self) => {
                            const currentIdx = Math.min(
                                totalCards - 1,
                                Math.floor(self.progress * totalCards)
                            );
                            setActiveStoryChapter(currentIdx);
                        },
                    },
                });

                storyCardRefs.current.forEach((card, index) => {
                    if (!card) return;
                    if (index === 0) {
                        gsap.set(card, { y: '0%', scale: 1, opacity: 1, zIndex: 10 });
                    } else {
                        gsap.set(card, { y: '100%', scale: 0.96, opacity: 1, zIndex: index + 10 });
                    }
                });

                for (let i = 1; i < totalCards; i++) {
                    const prevCard = storyCardRefs.current[i - 1];
                    const currentCard = storyCardRefs.current[i];
                    if (!prevCard || !currentCard) continue;

                    const stepLabel = `step_${i}`;
                    tl.addLabel(stepLabel);

                    tl.fromTo(
                        currentCard,
                        { y: '100%', scale: 0.96 },
                        { y: '0%', scale: 1, duration: 1, ease: 'power2.out' },
                        stepLabel
                    );

                    tl.to(
                        prevCard,
                        { scale: 0.92, y: '-5%', opacity: 0, duration: 0.9, ease: 'power1.in' },
                        `${stepLabel}+=0.1`
                    );
                }
            }
        );

        // Parallax wall staggered scroll
        mm.add("(min-width: 768px)", () => {
            const items = gsap.utils.toArray('.bp-parallax-item') as HTMLElement[];
            items.forEach((item, i) => {
                const depth = i % 3 === 0 ? -90 : i % 3 === 1 ? -140 : -60;
                gsap.to(item, {
                    y: depth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            });
        });

        // Mobile-exclusive subtle scroll reveal for gallery
        mm.add("(max-width: 767px)", () => {
            const mobileCards = gsap.utils.toArray('.bp-mobile-card') as HTMLElement[];
            mobileCards.forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 30, scale: 0.97 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        });

        // Force refresh ScrollTrigger after initial render to avoid CLS layout shifts
        const refreshTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 200);

        return () => {
            clearTimeout(refreshTimer);
            mm.revert();
        };
    }, []);

    const storyScenes = [
        {
            num: "01",
            title: "The Dress",
            subtitle: "Woven Dreams",
            desc: "A masterpiece of fabric and thread. Every fold tells a story of tradition, elegance, and timeless grace.",
            image: storyAssignedImages[0]
        },
        {
            num: "02",
            title: "The Jewellery",
            subtitle: "Heirlooms of Light",
            desc: "Intricate gold, radiant diamonds, and the subtle glimmer that completes the bridal aura.",
            image: storyAssignedImages[1]
        },
        {
            num: "03",
            title: "The Expressions",
            subtitle: "Raw Beauty",
            desc: "A quiet breath, a joyful smile, a tender glance. The raw, beautiful emotions that make the moment truly yours.",
            image: storyAssignedImages[2]
        },
        {
            num: "04",
            title: "The details",
            subtitle: "Quiet Elegance",
            desc: "The henna, the subtle veil, the whispered secrets before the ceremony begins.",
            image: storyAssignedImages[3]
        }
    ];

    return (
        <div ref={containerRef} className="bg-[#0D0D0D] min-h-screen text-white overflow-x-hidden selection:bg-[#D4AF37] selection:text-white font-sans">
            
            {/* 1. Cinematic Hero Section */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[#0D0D0D]">
                    <div className="bp-hero-bg absolute inset-0 w-full h-full">
                        <img 
                            src={data.heroImage} 
                            alt="Bridal Portrait Hero" 
                            className="w-full h-full object-cover opacity-60 object-center md:object-[center_35%]"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-[#0D0D0D]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(13,13,13,0.75)_100%)]" />
                </div>

                <div className="bp-hero-content relative z-10 max-w-5xl text-center px-6 pt-20">
                    <SplitTextReveal 
                        text="Bridal Portraits" 
                        type="words" 
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-white leading-none mb-6 drop-shadow-2xl"
                    />

                    <p className="text-white/80 text-lg sm:text-xl md:text-2xl font-serif italic font-light max-w-2xl mx-auto mb-10 leading-relaxed">
                        Elegance, grace, and the timeless glow of a bride.
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
                <div className="bp-quote-reveal max-w-4xl mx-auto text-center px-6">
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mx-auto mb-8 opacity-60" />
                    <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl italic font-light text-white/90 leading-relaxed">
                        "Beauty begins the moment confidence meets timeless elegance."
                    </h2>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent mx-auto mt-8 opacity-60" />
                </div>
            </section>

            {/* 3. Pinned Cinematic Sticky Card Stack Experience */}
            <section 
                id="story-section" 
                ref={storyContainerRef} 
                className="relative w-full h-screen bg-gradient-to-b from-[#080808] via-[#0D0D0D] to-[#080808] overflow-hidden pt-16 sm:pt-24 pb-6 sm:pb-10 flex flex-col justify-center"
            >
                {/* Gold Ambient Glow Backdrops */}
                <div className="absolute top-[15%] left-10 w-[450px] h-[450px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-[10%] right-10 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 max-w-[1500px] w-full h-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 md:gap-8 lg:gap-14 relative z-20">
                    
                    {/* LEFT COLUMN: Section Title, Paragraph & Chapter Progress */}
                    <div className="w-full lg:w-[38%] xl:w-[36%] flex flex-col justify-center text-center lg:text-left shrink-0 z-30 py-1 lg:py-6">
                        <span className="text-[#D4AF37] font-serif font-bold tracking-[0.28em] text-[10px] md:text-sm uppercase mb-1 sm:mb-3 block">
                            Cinematic Chapters
                        </span>

                        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-bold text-white tracking-tight leading-[1.08] mb-1 sm:mb-5">
                            Bridal Essence
                        </h2>

                        <p className="hidden sm:block text-sm sm:text-base text-white/70 font-light leading-relaxed mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                            Each portrait is a standalone chapter. Turn the scroll wheel to slide through our signature editorial experiences, crafted with cinematic luxury and timeless devotion.
                        </p>

                        {/* Active Chapter Progress Indicator */}
                        <div className="hidden sm:flex flex-col gap-2.5 max-w-xs mx-auto lg:mx-0 pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between font-serif text-xs font-semibold tracking-[0.25em] uppercase text-white/60">
                                <span>Chapter 0{activeStoryChapter + 1}</span>
                                <span className="text-[#D4AF37] font-bold">0{storyScenes.length}</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-0.5">
                                <div
                                    className="h-full bg-[#D4AF37] rounded-full transition-all duration-300 ease-out"
                                    style={{
                                        width: `${((activeStoryChapter + 1) / storyScenes.length) * 100}%`,
                                    }}
                                />
                            </div>
                            <span className="text-xs font-serif text-white/40 italic mt-0.5">
                                Viewing: <strong className="text-white not-italic">{storyScenes[activeStoryChapter]?.title}</strong>
                            </span>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sticky Card Stack */}
                    <div className="w-full lg:w-[58%] xl:w-[56%] h-[68vh] sm:h-[68vh] lg:h-[70vh] min-h-[460px] relative flex items-center justify-center overflow-visible lg:pr-6 xl:pr-10">
                        {storyScenes.map((scene, index) => {
                            const meta = imageMetadata[scene.image as keyof typeof imageMetadata] || imageMetadata[scene.image.replace(/^\//, '') as keyof typeof imageMetadata];
                            const isLandscape = meta ? meta.aspectRatio > 1.2 : false;

                            return (
                                <div
                                    key={index}
                                    ref={(el) => (storyCardRefs.current[index] = el)}
                                    className={`absolute inset-0 m-auto w-full max-w-[680px] h-full max-h-[620px] bg-[#141414] rounded-[24px] sm:rounded-[32px] lg:rounded-[36px] p-4 sm:p-8 lg:p-10 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-shadow duration-500 group flex justify-between overflow-hidden gap-3 sm:gap-8 ${isLandscape ? 'flex-col' : 'flex-col sm:flex-row'}`}
                                >
                                    {/* Text Side */}
                                    <div className={`w-full flex flex-col justify-between z-10 shrink-0 mb-1 sm:mb-0 ${isLandscape ? 'sm:w-full' : 'sm:w-[48%]'}`}>
                                        <div>
                                            {/* Card Header Badge Removed */}

                                            {/* Title */}
                                            <h3 className="text-lg sm:text-3xl lg:text-[2.2rem] font-serif font-bold text-white leading-[1.14] mb-1 sm:mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                                                {scene.title}
                                            </h3>

                                            {/* Subtitle */}
                                            <p className="text-[#D4AF37] font-serif italic text-xs sm:text-sm mb-1 sm:mb-3">
                                                {scene.subtitle}
                                            </p>

                                            {/* Description */}
                                            <p className="text-white/70 text-xs sm:text-sm font-light leading-relaxed line-clamp-2 sm:line-clamp-4">
                                                {scene.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Image Side */}
                                    <div className={`w-full flex-1 relative rounded-xl sm:rounded-[22px] overflow-hidden bg-[#0A0A0A] border border-white/10 shrink-0 flex items-center justify-center shadow-lg min-h-[220px] xs:min-h-[260px] p-2 ${isLandscape ? 'sm:w-full sm:h-auto' : 'sm:w-[52%] sm:h-full'}`}>
                                        <img
                                            src={scene.image}
                                            alt={scene.title}
                                            loading="lazy"
                                            className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </section>

            {/* 4. Editorial Parallax Gallery Portfolio */}
            <section ref={parallaxRef} className="py-24 md:py-48 px-4 sm:px-6 md:px-16 bg-[#0D0D0D] relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6 border-b border-white/10 pb-8 md:pb-10">
                        <div>
                            <span className="text-[#D4AF37] font-sans uppercase tracking-[0.25em] text-xs font-semibold block mb-3">
                                Fine Art Gallery
                            </span>
                            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-bold tracking-tight">
                                Bridal Portrait Collection
                            </h2>
                        </div>
                    </div>

                    {/* MOBILE-ONLY Magazine Flow: Natural Aspect Ratio, No Forced Cropping, Lightbox Disabled */}
                    <div className="block md:hidden space-y-12">
                        {allImages.map((img, idx) => (
                            <div 
                                key={idx} 
                                className="bp-mobile-card relative overflow-hidden rounded-[20px] border border-white/15 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
                            >
                                <img 
                                    src={img} 
                                    alt={`Bridal Portrait ${idx + 1}`}
                                    className="w-full h-auto block object-contain rounded-[20px]"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-30 pointer-events-none rounded-[20px]" />
                            </div>
                        ))}
                    </div>

                    {/* DESKTOP/TABLET Multi-Column Staggered Grid */}
                    <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-5 grid-flow-dense gap-8 md:gap-10">
                        {remainingImages.map((img, idx) => {
                            const meta = imageMetadata[img as keyof typeof imageMetadata] || imageMetadata[img.replace(/^\//, '') as keyof typeof imageMetadata];
                            const isLandscape = meta ? meta.aspectRatio > 1.2 : false;
                            const isTall = !isLandscape;
                            
                            return (
                                <div key={idx} className={`bp-parallax-item ${isLandscape ? 'md:col-span-2 lg:col-span-2' : ''}`}>
                                    <EditorialCard 
                                        src={img} 
                                        title={data.albums[idx % data.albums.length]?.title || `Bridal Portrait 0${idx + 1}`}
                                        category="Bridal Photography"
                                        style={meta ? { aspectRatio: `${meta.aspectRatio}` } : undefined}
                                        className={!meta ? (isTall ? 'aspect-[3/4]' : 'aspect-[3/2]') : ''}
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
                        "Every bride deserves portraits worthy of generations."
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
                        Let's craft timeless memories together. Reserve your bridal portrait session with Suba Studio today.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                        <button 
                            onClick={() => window.location.href = 'tel:+918994442768'}
                            className="px-10 py-4 rounded-full bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-[0.2em] hover:bg-white transition-colors duration-400 shadow-[0_15px_40px_rgba(212,175,55,0.3)]"
                        >
                            Call Us: +91 89944 42768
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

export default BridalPortraitsPage;
