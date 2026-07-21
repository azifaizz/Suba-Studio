import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { CinematicFilmPlayer } from './CinematicFilmPlayer';

interface CinematicPosterProps {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
  location?: string;
  date?: string;
  duration?: string;
  className?: string;
}

export const CinematicPoster: React.FC<CinematicPosterProps> = ({ 
  src, 
  poster, 
  title, 
  subtitle, 
  location,
  date,
  duration,
  className = ""
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <div 
        className={`group relative overflow-hidden rounded-[12px] md:rounded-[20px] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(255,255,255,0.15)] bg-[#0a0a0a] ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsOpen(true)}
      >
        {/* Cover Photo / Video First Frame */}
        {poster ? (
          <img 
            src={poster} 
            alt={title} 
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-[1.5s] ease-out group-hover:scale-110 ${isHovered ? 'blur-[8px] brightness-50' : 'blur-0'}`}
          />
        ) : (
          <video
            src={src}
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-[1.5s] ease-out group-hover:scale-110 ${isHovered ? 'blur-[8px] brightness-50' : 'blur-0'}`}
            muted
            playsInline
          />
        )}
        
        {/* Dark Vignette Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-90 z-10" />
        
        {/* Play Button Center (Luxury Glassmorphism) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-[600ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] z-20">
          <Play className="text-white ml-1 w-8 h-8" fill="currentColor" />
        </div>

        {/* Content Metadata */}
        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end pointer-events-none text-white z-20">
          <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
            
            <div className="flex flex-wrap items-center gap-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {duration && (
                <span className="px-3 py-1 text-[9px] md:text-xs font-semibold tracking-[0.2em] uppercase border border-white/20 bg-black/40 rounded-full backdrop-blur-md">
                  {duration}
                </span>
              )}
              {location && (
                <span className="text-[9px] md:text-xs tracking-[0.1em] uppercase text-white/70">
                  {location}
                </span>
              )}
              {date && (
                <>
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  <span className="text-[9px] md:text-xs tracking-[0.1em] uppercase text-white/70">
                    {date}
                  </span>
                </>
              )}
            </div>

            <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold mb-2 tracking-tight group-hover:text-[#D4AF37] transition-colors duration-700">{title}</h3>
            
            {subtitle && (
              <p className="text-sm md:text-base text-white/60 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150 max-w-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Fullscreen Player Modal */}
      {isOpen && (
        <CinematicFilmPlayer 
          src={src}
          title={title}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
