import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categoryData } from '@/data/categoryContent';

gsap.registerPlugin(ScrollTrigger);

const storySteps = [
    {
        headline: "The Look",
        description: "That exact moment when the world fades away, and it's just the two of you.",
        bgColor: "#FAF9F6", // Cream
        textColor: "#1A1A1A"
    },
    {
        headline: "The Touch",
        description: "A gentle hand, a soft embrace. Love spoken without a single word.",
        bgColor: "#1A1A1A", // Charcoal
        textColor: "#FFFFFF"
    },
    {
        headline: "The Promise",
        description: "Quiet whispers of forever, captured in perfect stillness.",
        bgColor: "#EBE5D9", // Warm Ivory
        textColor: "#1A1A1A"
    },
    {
        headline: "The Journey",
        description: "Walking into tomorrow, hand in hand. Your story is just beginning.",
        bgColor: "#111111", // Soft Black
        textColor: "#FFFFFF"
    }
];

const CoupleLoveInMotion = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    
    // Borrow images from pre-wedding to ensure we have enough unique images
    const preWeddingData = categoryData['pre-wedding'] || categoryData['couple-portraits'];
    const images = preWeddingData.albums.slice(0, 4).map(a => a.image);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const rightSide = container?.querySelector('.lim-right');
            const imagesArr = gsap.utils.toArray('.lim-image') as HTMLElement[];
            const steps = gsap.utils.toArray('.lim-step-text') as HTMLElement[];
            const progress = container?.querySelector('.lim-progress-bar');
            
            if (!container || !rightSide) return;

            const mm = gsap.matchMedia();

            // Pin the left text area on desktop (>= 1024px) while the right area scrolls
            mm.add("(min-width: 1024px)", () => {
                ScrollTrigger.create({
                    trigger: container,
                    start: 'top top',
                    end: 'bottom bottom',
                    pin: textRef.current,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                });
            });

            // Animate progress bar
            gsap.to(progress, {
                scaleY: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });

            // For each image step, change background color and crossfade text
            imagesArr.forEach((img, i) => {
                const triggerParams = {
                    trigger: img,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: true,
                    invalidateOnRefresh: true,
                    onEnter: () => {
                        gsap.to(container, { backgroundColor: storySteps[i].bgColor, duration: 0.8 });
                        gsap.to(textRef.current, { color: storySteps[i].textColor, duration: 0.8 });
                        
                        // Show current text, hide others
                        steps.forEach((step, idx) => {
                            gsap.to(step, { 
                                opacity: idx === i ? 1 : 0, 
                                y: idx === i ? 0 : 20, 
                                duration: 0.6 
                            });
                        });
                    },
                    onEnterBack: () => {
                        gsap.to(container, { backgroundColor: storySteps[i].bgColor, duration: 0.8 });
                        gsap.to(textRef.current, { color: storySteps[i].textColor, duration: 0.8 });
                        
                        steps.forEach((step, idx) => {
                            gsap.to(step, { 
                                opacity: idx === i ? 1 : 0, 
                                y: idx === i ? 0 : 20, 
                                duration: 0.6 
                            });
                        });
                    }
                };

                ScrollTrigger.create(triggerParams);
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full transition-colors duration-1000 ease-in-out bg-[#FAF9F6]">
            <div className="flex flex-col lg:flex-row w-full">
                
                {/* Left Side (Pinned) */}
                <div ref={textRef} className="w-full lg:w-1/2 h-screen flex flex-col justify-center px-6 lg:px-20 text-[#1A1A1A] relative z-10 pointer-events-none">
                    <div className="absolute left-6 lg:left-12 top-1/4 bottom-1/4 w-[1px] bg-current opacity-20">
                        <div className="lim-progress-bar w-full bg-[#D4AF37] origin-top scale-y-0 h-full" />
                    </div>
                    
                    <div className="relative h-[200px] flex items-center ml-4 lg:ml-8">
                        {storySteps.map((step, i) => (
                            <div key={i} className="lim-step-text absolute inset-0 flex flex-col justify-center opacity-0 translate-y-5">
                                <div className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-70">
                                    Part 0{i + 1}
                                </div>
                                <h2 className="font-serif text-5xl md:text-6xl font-bold mb-6">
                                    {step.headline}
                                </h2>
                                <p className="text-lg md:text-xl font-light leading-relaxed max-w-md opacity-80">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side (Scrollable) */}
                <div className="lim-right w-full lg:w-1/2 flex flex-col pt-[50vh] pb-[50vh]">
                    {images.map((src, i) => (
                        <div key={i} className="lim-image w-full h-[80vh] flex items-center justify-center p-6 lg:p-12">
                            <div className="w-full h-full lg:w-[90%] lg:max-w-[500px] rounded-[30px] overflow-hidden relative mx-auto flex items-center justify-center">
                                {/* Image with parallax */}
                                <img 
                                    src={src} 
                                    alt={`Story step ${i+1}`} 
                                    className="w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoupleLoveInMotion;
