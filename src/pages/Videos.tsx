import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { CLEAN_VIDEOS, CleanVideoItem } from '@/data/videoData';

interface SingleVideoPlayerProps {
    video: CleanVideoItem;
    activeVideoId: string | null;
    setActiveVideoId: (id: string | null) => void;
}

const MinimalVideoCard: React.FC<SingleVideoPlayerProps> = ({ video, activeVideoId, setActiveVideoId }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    // Pause this video if another video starts playing
    useEffect(() => {
        if (activeVideoId !== video.id && isPlaying) {
            if (videoRef.current) {
                videoRef.current.pause();
            }
            setIsPlaying(false);
        }
    }, [activeVideoId, video.id, isPlaying]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
                if (activeVideoId === video.id) {
                    setActiveVideoId(null);
                }
            } else {
                setActiveVideoId(video.id);
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleFullscreen = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex flex-col"
        >
            <div className="bg-white rounded-[24px] p-4 md:p-5 lg:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex-1 flex flex-col border border-gray-50/80">
                {/* 16:9 Responsive Video Player */}
                <div
                    onClick={togglePlay}
                    className="relative w-full aspect-video bg-black rounded-[16px] overflow-hidden cursor-pointer group"
                >
                <video
                    ref={videoRef}
                    src={video.url}
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                    onPlay={() => {
                        setIsPlaying(true);
                        setActiveVideoId(video.id);
                    }}
                    onPause={() => {
                        setIsPlaying(false);
                    }}
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Play Button Overlay */}
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-0 flex items-center justify-center z-10"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                                <Play className="w-7 h-7 md:w-8 md:h-8 ml-1 fill-white text-white" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mute & Fullscreen Controls - Bottom Right */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white border border-white/10 transition-colors"
                        title={isMuted ? "Unmute" : "Mute"}
                    >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <button
                        onClick={handleFullscreen}
                        className="p-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white border border-white/10 transition-colors"
                        title="Fullscreen"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Minimal Info: Couple Name & Short Caption ONLY */}
            <div className="mt-6 md:mt-8 px-2 flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-normal text-gray-900 tracking-tight mb-3">
                    {video.coupleName}
                </h2>
                <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed max-w-sm mx-auto">
                    "{video.caption}"
                </p>
            </div>
            </div>
        </motion.div>
    );
};

const Videos: React.FC = () => {
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen bg-white pt-28 md:pt-36 pb-28">
            {/* Header Hero Section */}
            <section className="container mx-auto px-6 mb-16 md:mb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl mx-auto"
                >
                    <span className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-3 block">
                        Portfolio
                    </span>
                    <h1 className="text-4xl md:text-5xl font-serif font-normal text-gray-900 tracking-tight mb-4">
                        CINEMATIC FILMS
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed">
                        A collection of timeless love stories captured through motion.
                    </p>
                </motion.div>
            </section>

            {/* Two-Column Editorial Grid */}
            <section className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
                    {CLEAN_VIDEOS.map((video) => (
                        <MinimalVideoCard
                            key={video.id}
                            video={video}
                            activeVideoId={activeVideoId}
                            setActiveVideoId={setActiveVideoId}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Videos;
