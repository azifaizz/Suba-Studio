import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number; // milliseconds
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Trigger when element is slightly in view
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect(); // Only animate once
            }
        }, {
            threshold: 0.1,
            // Optional: add rootMargin if we want to trigger earlier/later
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                "transform transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                className
            )}
        >
            {children}
        </div>
    );
};
