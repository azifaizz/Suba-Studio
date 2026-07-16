'use client';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string;
    variant?: 'dark' | 'light';
}

export function FlowButton({ text = "Get a Quote", className, variant = 'light', ...props }: FlowButtonProps) {
    return (
        <button
            className={cn(
                "group relative flex items-center gap-1 overflow-hidden rounded-[100px] border-[1.5px] px-8 py-3 text-sm font-semibold cursor-pointer transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] hover:rounded-[12px] active:scale-[0.95]",
                // Default (Light Background / Dark Text) - tailored for generic use
                "border-[#333333]/40 text-[#111111] hover:border-transparent hover:text-white",
                className // Allow overriding
            )}
            {...props}
        >
            {/* Left arrow (arr-2) */}
            <ArrowRight
                className="absolute w-4 h-4 left-[-25%] fill-none z-[9] group-hover:left-4 transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] stroke-current"
            />

            {/* Text */}
            <span className="relative z-[1] -translate-x-3 group-hover:translate-x-3 transition-all duration-[800ms] ease-out">
                {text}
            </span>

            {/* Circle */}
            <span className={cn(
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-[50%] opacity-0 group-hover:w-[220px] group-hover:h-[220px] group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                "bg-[#111111]" // Default hover bg
            )}></span>

            {/* Right arrow (arr-1) */}
            <ArrowRight
                className="absolute w-4 h-4 right-4 fill-none z-[9] group-hover:right-[-25%] transition-all duration-[800ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] stroke-current"
            />
        </button>
    );
}
