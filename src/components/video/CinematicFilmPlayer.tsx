import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { Play, Pause, Volume2, VolumeX, Maximize, X } from 'lucide-react';

interface CinematicFilmPlayerProps {
  src: string;
  title: string;
  onClose: () => void;
}

export const CinematicFilmPlayer: React.FC<CinematicFilmPlayerProps> = ({ src, title, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(true);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    gsap.fromTo(containerRef.current, 
      { opacity: 0, backdropFilter: 'blur(0px)' }, 
      { opacity: 1, backdropFilter: 'blur(24px)', duration: 0.8, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: onClose
    });
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const seekTo = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * seekTo;
      setProgress(seekTo);
    }
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setIsHovering(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setIsHovering(false), 2500);
  };

  return createPortal(
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
      onClick={handleClose}
      onMouseMove={handleMouseMove}
    >
      <div 
        className="relative w-full max-w-[90vw] aspect-video bg-black rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          autoPlay
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Controls Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 transition-opacity duration-500 ${isHovering || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start bg-gradient-to-b from-black/60 to-transparent">
            <h2 className="text-white text-2xl font-serif">{title}</h2>
            <button 
              onClick={handleClose}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Bottom Bar */}
          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="group relative h-1.5 w-full bg-white/20 rounded-full cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-[#b38b2d] rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
              <input 
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button onClick={togglePlay} className="text-white hover:text-[#b38b2d] transition-colors">
                  {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                </button>
                <button onClick={toggleMute} className="text-white hover:text-[#b38b2d] transition-colors">
                  {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </button>
              </div>
              <button onClick={toggleFullScreen} className="text-white hover:text-[#b38b2d] transition-colors">
                <Maximize size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
