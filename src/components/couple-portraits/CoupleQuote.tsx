import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CoupleQuoteProps {
    quote: string;
    delay?: number;
}

const CoupleQuote: React.FC<CoupleQuoteProps> = ({ quote }) => {
    const quoteRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: quoteRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo(lineRef.current,
                { scaleY: 0 },
                { scaleY: 1, duration: 1, ease: 'power4.inOut' }
            );

            tl.fromTo('.cq-text',
                { opacity: 0, y: 30, filter: 'blur(10px)' },
                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
                "-=0.5"
            );
        }, quoteRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={quoteRef} className="w-full py-32 md:py-48 bg-[#FAF9F6] text-[#1A1A1A] flex justify-center px-6">
            <div className="flex flex-col items-center text-center max-w-4xl relative">
                <div 
                    ref={lineRef} 
                    className="w-[1px] h-20 md:h-32 bg-[#D4AF37] mb-12 origin-top" 
                />
                <h3 className="cq-text font-serif text-3xl md:text-5xl lg:text-6xl italic font-light leading-relaxed text-[#1A1A1A]">
                    "{quote}"
                </h3>
                <div className="cq-text w-12 h-[1px] bg-[#D4AF37] mt-12 opacity-50" />
            </div>
        </section>
    );
};

export default CoupleQuote;
