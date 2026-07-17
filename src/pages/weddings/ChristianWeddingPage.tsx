import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { ArrowRight, Cross, Heart, Users, CheckCircle, Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ChristianWeddingPage() {
    const mainRef = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLElement>(null);
    const galleryRef = useRef<HTMLElement>(null);
    const highlightsRef = useRef<HTMLElement>(null);
    const quotesRef = useRef<HTMLElement>(null);
    const albumsRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLElement>(null);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });

        const ctx = gsap.context(() => {
            // --- SECTION 1: HERO ANIMATION ---
            const tl = gsap.timeline();
            tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' })
              .fromTo('.hero-title .char', { y: '100%' }, { y: '0%', duration: 1.2, stagger: 0.05, ease: 'power4.out' }, "-=0.5")
              .fromTo('.hero-quote', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
              .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
              .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out' }, "-=0.8");

            // --- SECTION 2: ABOUT PARALLAX & NUMBERS ---
            gsap.to('.about-image', {
                y: 50,
                ease: 'none',
                scrollTrigger: {
                    trigger: aboutRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            const stats = gsap.utils.toArray('.stat-num') as HTMLElement[];
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target') || '0', 10);
                gsap.to(stat, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power3.out',
                    snap: { innerHTML: 1 },
                    scrollTrigger: {
                        trigger: aboutRef.current,
                        start: 'top 70%',
                    }
                });
            });

        }, mainRef);

        return () => ctx.revert();
    }, []);

    // Split text helper for Hero
    const renderSplitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span key={index} className="char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}>
                {char}
            </span>
        ));
    };

    return (
        <SmoothScroll>
            <main ref={mainRef} className="bg-[#fafafa] text-[#111] font-sans selection:bg-[#111] selection:text-white overflow-hidden">
                
                {/* SECTION 1: CINEMATIC HERO */}
                <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black">
                    <img src="/Christian/4Z5A8807.JPG" alt="Christian Wedding Hero" className="absolute inset-0 w-full h-full object-cover object-[center_20%] opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70"></div>
                    
                    <div className="relative z-10 container mx-auto px-6 text-center text-white mt-20">
                        <p className="hero-label text-xs md:text-sm tracking-[0.4em] uppercase font-poppins text-white/70 mb-6">
                            Christian Wedding
                        </p>
                        
                        <div className="hero-title overflow-hidden mb-6 flex justify-center flex-wrap">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-medium leading-tight inline-flex overflow-hidden">
                                {renderSplitText("Best Christian Wedding")}
                            </h1>
                            <br className="hidden md:block w-full"/>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-medium leading-tight inline-flex overflow-hidden">
                                {renderSplitText("Photography")}
                            </h1>
                        </div>
                        
                        <h2 className="hero-quote text-xl md:text-2xl font-serif italic text-white/90 mb-8">
                            "Faith, Hope, and Eternal Blessings."
                        </h2>
                        
                        <p className="hero-desc max-w-2xl mx-auto font-poppins text-sm md:text-base text-white/70 font-light leading-relaxed mb-12">
                            Every Christian wedding is a sacred union witnessed by love, faith, and God's grace. We preserve every meaningful moment with timeless photography and cinematic storytelling.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="hero-btn group relative px-8 py-4 bg-white text-black font-poppins text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105">
                                <span className="relative z-10 flex items-center gap-2">Explore Gallery <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
                            </button>
                            <button className="hero-btn group relative px-8 py-4 bg-transparent border border-white/30 text-white font-poppins text-sm tracking-widest uppercase hover:border-white transition-all hover:scale-105">
                                <span className="relative z-10">Book Your Story</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: ABOUT */}
                <section ref={aboutRef} className="py-32 md:py-48 px-6 container mx-auto relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="overflow-hidden rounded-sm aspect-[3/4] w-full max-w-md mx-auto">
                                <img src="/Christian/4Z5A8754.JPG" alt="About Photography" className="about-image w-full h-[120%] object-cover -mt-[10%]" />
                            </div>
                            
                            {/* Glass Stats Card */}
                            <div className="absolute -bottom-8 -right-4 md:-right-12 bg-white/70 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/50 z-10 max-w-[280px]">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center">
                                            <Camera size={20} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-serif font-bold text-[#111]"><span className="stat-num" data-target="22">0</span>+</div>
                                            <div className="text-xs font-poppins text-gray-500 uppercase tracking-wider">Years Experience</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center">
                                            <Heart size={20} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-serif font-bold text-[#111]"><span className="stat-num" data-target="5000">0</span>+</div>
                                            <div className="text-xs font-poppins text-gray-500 uppercase tracking-wider">Happy Couples</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-serif font-bold text-[#111]"><span className="stat-num" data-target="100">0</span>%</div>
                                            <div className="text-xs font-poppins text-gray-500 uppercase tracking-wider">Satisfaction</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="order-1 lg:order-2">
                            <h3 className="text-sm font-poppins tracking-[0.3em] uppercase text-gray-400 mb-6">Our Philosophy</h3>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair leading-[1.2] mb-8 text-[#111]">
                                Capturing the <br />
                                <span className="italic text-gray-500">Divine Grace</span> of your union.
                            </h2>
                            <p className="text-lg font-poppins font-light text-gray-600 leading-relaxed mb-6">
                                A Christian wedding is a profound testament of love before God. Our editorial approach ensures that every emotion, from the nervous excitement in the dressing room to the joyful tears at the altar, is documented with elegance.
                            </p>
                            <p className="text-lg font-poppins font-light text-gray-600 leading-relaxed">
                                We believe in the power of negative space, exquisite lighting, and raw emotion. Our work does not just show what happened; it makes you feel it all over again.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: STORY TIMELINE */}
                <section ref={timelineRef} className="py-24 bg-white relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h3 className="text-sm font-poppins tracking-[0.3em] uppercase text-gray-400 mb-4">The Journey</h3>
                            <h2 className="text-4xl md:text-5xl font-playfair text-[#111]">A Story in Chapters</h2>
                        </div>
                        
                        <div className="max-w-5xl mx-auto space-y-32">
                            {/* Chapter 1: Preparation */}
                            <div className="timeline-chapter flex flex-col md:flex-row items-center gap-12 md:gap-24">
                                <div className="w-full md:w-1/2 order-2 md:order-1">
                                    <div className="chapter-content">
                                        <div className="text-[#D4AF37] font-serif text-6xl mb-4 opacity-30">01</div>
                                        <h3 className="text-3xl font-playfair mb-4">The Preparation</h3>
                                        <h4 className="text-xl font-serif italic text-gray-500 mb-4">"Anticipation in the quiet moments."</h4>
                                        <p className="font-poppins text-gray-600 font-light leading-relaxed">Before the vows are spoken, there is a quiet energy. We capture the subtle glances, the careful adjustments of the veil, and the tender moments with family.</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 order-1 md:order-2 overflow-hidden rounded-sm aspect-[4/5]">
                                    <img src="/Christian/4Z5A8729.JPG" alt="Preparation" className="chapter-img w-full h-full object-cover scale-105" />
                                </div>
                            </div>
                            
                            {/* Chapter 2: Church Ceremony */}
                            <div className="timeline-chapter flex flex-col md:flex-row items-center gap-12 md:gap-24">
                                <div className="w-full md:w-1/2 overflow-hidden rounded-sm aspect-[4/5]">
                                    <img src="/Christian/4Z5A8747.JPG" alt="Church Ceremony" className="chapter-img w-full h-full object-cover scale-105" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="chapter-content">
                                        <div className="text-[#D4AF37] font-serif text-6xl mb-4 opacity-30">02</div>
                                        <h3 className="text-3xl font-playfair mb-4">Church Ceremony</h3>
                                        <h4 className="text-xl font-serif italic text-gray-500 mb-4">"Walking toward forever."</h4>
                                        <p className="font-poppins text-gray-600 font-light leading-relaxed">The majestic architecture, the soft glow of stained glass, and the powerful emotions as you walk down the aisle. Every detail is preserved in cinematic grandeur.</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Chapter 3: Ring Exchange */}
                            <div className="timeline-chapter flex flex-col md:flex-row items-center gap-12 md:gap-24">
                                <div className="w-full md:w-1/2 order-2 md:order-1">
                                    <div className="chapter-content">
                                        <div className="text-[#D4AF37] font-serif text-6xl mb-4 opacity-30">03</div>
                                        <h3 className="text-3xl font-playfair mb-4">The Promise</h3>
                                        <h4 className="text-xl font-serif italic text-gray-500 mb-4">"With this ring, I thee wed."</h4>
                                        <p className="font-poppins text-gray-600 font-light leading-relaxed">A circle with no beginning and no end. The exchange of rings is a profound symbol of eternal love and commitment, captured intimately through our lenses.</p>
                                    </div>
                                </div>
                                <div className="w-full md:w-1/2 order-1 md:order-2 overflow-hidden rounded-sm aspect-[4/5]">
                                    <img src="/Christian/4Z5A8732.JPG" alt="Ring Exchange" className="chapter-img w-full h-full object-cover scale-105" />
                                </div>
                            </div>
                            
                            {/* Chapter 4: Blessings */}
                            <div className="timeline-chapter flex flex-col md:flex-row items-center gap-12 md:gap-24">
                                <div className="w-full md:w-1/2 overflow-hidden rounded-sm aspect-square">
                                    <img src="/Christian/4Z5A8733.JPG" alt="Blessings" className="chapter-img w-full h-full object-cover scale-105" />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <div className="chapter-content">
                                        <div className="text-[#D4AF37] font-serif text-6xl mb-4 opacity-30">04</div>
                                        <h3 className="text-3xl font-playfair mb-4">Divine Blessings</h3>
                                        <h4 className="text-xl font-serif italic text-gray-500 mb-4">"Joined together in grace."</h4>
                                        <p className="font-poppins text-gray-600 font-light leading-relaxed">The prayers, the blessings from the priest, and the overwhelming sense of peace. These sacred moments are documented with the utmost respect and artistry.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: FLOATING GALLERY */}
                <section ref={galleryRef} className="py-32 bg-[#111] text-white relative overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                            <div>
                                <h3 className="text-sm font-poppins tracking-[0.3em] uppercase text-gray-400 mb-4">Portfolio</h3>
                                <h2 className="text-4xl md:text-5xl font-playfair">Editorial Gallery</h2>
                            </div>
                            <p className="font-poppins font-light text-gray-400 max-w-sm mt-6 md:mt-0">
                                A curated selection of our finest Christian wedding imagery, displaying our commitment to artistic excellence.
                            </p>
                        </div>
                        
                        <div className="flex flex-col md:grid md:grid-cols-12 gap-12 md:gap-16 items-start">
                            {/* Image 1 - Large Left */}
                            <div className="gallery-item w-[90%] md:w-full md:col-span-5 md:mt-24 aspect-[3/4] group cursor-pointer" data-speed="0.8">
                                <div className="w-full h-full overflow-hidden rounded-sm shadow-xl">
                                    <img src="/Christian/4Z5A8768.JPG" alt="Gallery 1" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                                </div>
                            </div>
                            
                            {/* Image 2 - Small Right (Overlapping on mobile) */}
                            <div className="gallery-item w-[75%] ml-auto md:w-full md:col-span-7 aspect-square group cursor-pointer z-10 -mt-16 md:mt-0" data-speed="1.2">
                                <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl border-4 border-[#111] md:border-none">
                                    <img src="/Christian/4Z5A8752.JPG" alt="Gallery 2" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                                </div>
                            </div>
                            
                            {/* Image 3 - Landscape Center */}
                            <div className="gallery-item w-[85%] mx-auto md:w-full md:col-span-8 md:-mt-20 aspect-video group cursor-pointer mt-4 md:mt-0" data-speed="0.5">
                                <div className="w-full h-full overflow-hidden rounded-sm shadow-xl">
                                    <img src="/Christian/4Z5A8479.JPG" alt="Gallery 3" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                                </div>
                            </div>
                            
                            {/* Image 4 - Medium Right Bottom (Overlapping on mobile) */}
                            <div className="gallery-item w-[80%] ml-auto md:w-full md:col-span-4 md:mt-32 aspect-[4/5] group cursor-pointer -mt-12 md:mt-32" data-speed="1.5">
                                <div className="w-full h-full overflow-hidden rounded-sm shadow-2xl border-4 border-[#111] md:border-none">
                                    <img src="/Christian/4Z5A8776.JPG" alt="Gallery 4" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* SECTION 5: HIGHLIGHT MOMENTS */}
                <section ref={highlightsRef} className="py-32 bg-[#fafafa] relative">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-24">
                            <h3 className="text-sm font-poppins tracking-[0.3em] uppercase text-gray-400 mb-4">The Details</h3>
                            <h2 className="text-4xl md:text-5xl font-playfair text-[#111]">Sacred Highlights</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Card 1 */}
                            <div className="highlight-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center mb-6 group-hover:bg-[#111] group-hover:text-white transition-colors duration-500">
                                    <Cross size={20} className="opacity-70 group-hover:opacity-100" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#111] mb-3">The First Prayer</h3>
                                <p className="text-sm font-poppins text-gray-500 leading-relaxed">A quiet moment of reflection and blessing before the grand ceremony begins.</p>
                            </div>
                            
                            {/* Card 2 */}
                            <div className="highlight-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center mb-6 group-hover:bg-[#111] group-hover:text-white transition-colors duration-500">
                                    <div className="w-5 h-5 border-2 border-current rounded-full opacity-70 group-hover:opacity-100"></div>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#111] mb-3">Ring Exchange</h3>
                                <p className="text-sm font-poppins text-gray-500 leading-relaxed">The profound symbol of unending love, captured in perfect macro detail.</p>
                            </div>
                            
                            {/* Card 3 */}
                            <div className="highlight-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center mb-6 group-hover:bg-[#111] group-hover:text-white transition-colors duration-500">
                                    <Heart size={20} className="opacity-70 group-hover:opacity-100" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#111] mb-3">The First Kiss</h3>
                                <p className="text-sm font-poppins text-gray-500 leading-relaxed">The culmination of the vows, a moment of pure joy and celebration.</p>
                            </div>
                            
                            {/* Card 4 */}
                            <div className="highlight-card bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center mb-6 group-hover:bg-[#111] group-hover:text-white transition-colors duration-500">
                                    <Users size={20} className="opacity-70 group-hover:opacity-100" />
                                </div>
                                <h3 className="text-xl font-serif font-bold text-[#111] mb-3">Family Blessing</h3>
                                <p className="text-sm font-poppins text-gray-500 leading-relaxed">The joining of two families, witnessed through tears and warm embraces.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 6: IMMERSIVE QUOTES */}
                <section ref={quotesRef} className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-black">
                    <img src="/Christian/4Z5A8807.JPG" alt="Quote Background" className="quote-bg absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-[#111]/40 mix-blend-multiply"></div>
                    
                    <div className="relative z-10 container mx-auto px-6 text-center text-white">
                        <div className="w-16 h-[1px] bg-white/50 mx-auto mb-10"></div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair italic font-light leading-tight max-w-4xl mx-auto">
                            "Love rooted in faith lasts forever. Every prayer becomes a beautiful memory."
                        </h2>
                        <div className="w-16 h-[1px] bg-white/50 mx-auto mt-10"></div>
                    </div>
                </section>

                {/* SECTION 7: FEATURED ALBUMS */}
                <section ref={albumsRef} className="py-32 bg-white relative">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                            <div>
                                <h3 className="text-sm font-poppins tracking-[0.3em] uppercase text-gray-400 mb-4">Curated</h3>
                                <h2 className="text-4xl md:text-5xl font-playfair text-[#111]">Featured Stories</h2>
                            </div>
                            <button className="group flex items-center gap-2 text-sm font-poppins tracking-[0.2em] uppercase text-[#111] mt-6 md:mt-0 pb-1 border-b border-[#111] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
                                View All Stories <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[70vh]">
                            {/* Main Featured */}
                            <div className="album-card w-full lg:w-3/5 h-[50vh] lg:h-full relative overflow-hidden rounded-md group cursor-pointer">
                                <img src="/Christian/4Z5A8747.JPG" alt="Main Album" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="overflow-hidden mb-2">
                                        <h3 className="text-white text-3xl md:text-4xl font-playfair translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">Sarah & Michael</h3>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-white/70 font-poppins text-sm tracking-widest uppercase">St. Thomas Cathedral</p>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white -translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Supporting Albums */}
                            <div className="w-full lg:w-2/5 flex flex-col gap-6 h-[80vh] lg:h-full">
                                <div className="album-card h-1/2 relative overflow-hidden rounded-md group cursor-pointer">
                                    <img src="/Christian/4Z5A8732.JPG" alt="Support Album 1" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="overflow-hidden mb-2">
                                            <h3 className="text-white text-2xl font-playfair translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">Emma & David</h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-white/70 font-poppins text-sm tracking-widest uppercase">Grace Church</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="album-card h-1/2 relative overflow-hidden rounded-md group cursor-pointer">
                                    <img src="/Christian/4Z5A8754.JPG" alt="Support Album 2" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                                    <div className="absolute bottom-0 left-0 p-8 w-full">
                                        <div className="overflow-hidden mb-2">
                                            <h3 className="text-white text-2xl font-playfair translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">Grace & James</h3>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="text-white/70 font-poppins text-sm tracking-widest uppercase">Holy Trinity</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 8: BOOK YOUR STORY CTA */}
                <section ref={ctaRef} className="relative w-full py-40 flex items-center justify-center overflow-hidden bg-[#111]">
                    <img src="/Christian/4Z5A8768.JPG" alt="CTA Background" className="cta-bg absolute inset-0 w-full h-full object-cover opacity-40" />
                    
                    <div className="relative z-10 container mx-auto px-6 text-center text-white">
                        <h2 className="text-5xl md:text-7xl font-playfair font-medium leading-tight mb-8">
                            Let's Tell Your <br />
                            <span className="italic font-light">Story Together.</span>
                        </h2>
                        
                        <p className="max-w-xl mx-auto font-poppins text-white/70 font-light leading-relaxed mb-12">
                            Whether it's a church wedding, engagement, or family celebration, let's create timeless memories together that you will cherish forever.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="group relative px-8 py-4 bg-white text-black font-poppins text-sm tracking-widest uppercase overflow-hidden transition-all hover:scale-105">
                                <span className="relative z-10 flex items-center gap-2">Book Consultation</span>
                            </button>
                        </div>
                    </div>
                </section>

            </main>
        </SmoothScroll>
    );
}
