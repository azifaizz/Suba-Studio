import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { AdaptiveImage } from "@/components/ui/adaptive-image";
import { MasonryGallery } from "@/components/ui/masonry-gallery";
import { categoryData, defaultContent, CategoryContent } from '@/data/categoryContent';
import { ArrowRight } from 'lucide-react';
import CinematicStoryboardPage from '@/components/layout/CinematicStoryboardPage';
import BridalPortraitsPage from '@/pages/BridalPortraitsPage';
import CouplePortraitsPage from '@/pages/CouplePortraitsPage';
import GroomPortraitsPage from '@/pages/GroomPortraitsPage';
import WeddingRitualsPage from '@/pages/WeddingRitualsPage';
import CandidMomentsPage from '@/pages/CandidMomentsPage';
const CategoryPage = () => {
    const { subcategory } = useParams();
    const { pathname } = useLocation();
    const [content, setContent] = useState<CategoryContent>(defaultContent);

    const isVideoRoute = pathname.includes('/video/');

    useEffect(() => {
        if (subcategory) {
            const subLower = subcategory.toLowerCase();
            // Try video-specific key first if it's a video route
            const videoKey = `${subLower}-video`;
            const key = (isVideoRoute && categoryData[videoKey])
                ? videoKey
                : Object.keys(categoryData).find(k => subLower.includes(k));

            if (key) {
                setContent(categoryData[key]);
            } else {
                setContent({
                    ...defaultContent,
                    title: subcategory.replace(/-/g, ' ').toUpperCase(),
                });
            }
        }
        window.scrollTo(0, 0);
    }, [subcategory, isVideoRoute]);
    
    // Custom Page Routing for Awwwards-winning galleries
    const storyboardCategories = ['hindu', 'christian', 'engagement', 'pre-wedding', 'post-wedding', 'maternity', 'baby'];
    if (subcategory && storyboardCategories.includes(subcategory) && !isVideoRoute) {
        return <CinematicStoryboardPage subcategory={subcategory} />;
    }

    if (subcategory === 'bridal-portraits' && !isVideoRoute) {
        return <BridalPortraitsPage subcategory={subcategory} />;
    }

    if (subcategory === 'couple-portraits' && !isVideoRoute) {
        return <CouplePortraitsPage subcategory={subcategory} />;
    }

    if (subcategory === 'groom-portraits' && !isVideoRoute) {
        return <GroomPortraitsPage subcategory={subcategory} />;
    }

    if (subcategory === 'rituals' && !isVideoRoute) {
        return <WeddingRitualsPage subcategory={subcategory} />;
    }

    if (subcategory === 'candid-moments' && !isVideoRoute) {
        return <CandidMomentsPage subcategory={subcategory} />;
    }

    const isPortraitOrRitual = subcategory === 'couple-portraits' || subcategory === 'rituals' || subcategory === 'maternity' || subcategory === 'baby';
    const isFullVisibilityCategory = subcategory === 'bridal-portraits' || subcategory === 'groom-portraits' || subcategory === 'christian';
    const isBridalPortraits = subcategory === 'bridal-portraits';
    const isMaternity = subcategory === 'maternity';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className={`relative flex items-center justify-center overflow-hidden ${isVideoRoute ? 'h-screen' : (isFullVisibilityCategory ? 'h-[60vh] md:h-[75vh] bg-black' : (isPortraitOrRitual ? 'h-[80vh] md:h-[90vh]' : 'h-[70vh] md:h-[85vh]'))}`}>
                <div className="absolute inset-0">
                    {content.heroImage?.endsWith('.mp4') ? (
                        <video
                            src={content.heroImage}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className={`w-full h-full object-cover ${isVideoRoute ? 'animate-ken-burns' : ''}`}
                        />
                    ) : (
                        <img
                            src={content.heroImage}
                            alt={content.title}
                            className={`w-full h-full ${isFullVisibilityCategory ? 'object-contain' : 'object-cover'} ${isPortraitOrRitual ? 'object-[center_10%]' : 'object-top'} ${isVideoRoute ? 'animate-ken-burns' : ''}`}
                        />
                    )}
                    <div className={`absolute inset-0 ${isVideoRoute ? 'bg-gradient-to-b from-black/20 via-black/40 to-black/60' : 'bg-black/30'}`} />
                </div>
                <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center text-white h-full">
                    <Reveal>
                        {isVideoRoute && (
                            <span className="block text-[10px] md:text-xs font-medium tracking-[0.4em] uppercase text-white/70 mb-8">
                                FILMS
                            </span>
                        )}
                        <h1 className={isVideoRoute 
                            ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light mb-6 tracking-wide" 
                            : "text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-black mb-4 text-transparent [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:1.5px_white] tracking-tight whitespace-nowrap px-4 overflow-hidden text-ellipsis"}>
                            {content.title}
                        </h1>
                        <p className={isVideoRoute
                            ? "text-lg md:text-xl font-light tracking-[0.05em] text-white/80 max-w-2xl mx-auto"
                            : "text-lg md:text-2xl font-light tracking-wider italic text-white/90"}>
                            {isVideoRoute ? content.tagline : `"${content.tagline}"`}
                        </p>
                    </Reveal>
                </div>

                
            </section>

            {/* Content Section */}
            {!isVideoRoute && (
                <section className="py-24 bg-[#f3f3f3]">
                    <div className="container mx-auto px-6">
                        <div className={`flex flex-col lg:flex-row gap-16 items-start`}>
                            {/* Left Side */}
                            <div className="w-full lg:w-1/2 space-y-10">
                                <Reveal>
                                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0f3d2e] leading-tight">About This Style</h2>
                                    <p className="text-gray-600 leading-relaxed text-lg mt-6 font-light">
                                        {content.description}
                                    </p>
                                </Reveal>

                                <Reveal delay={200}>
                                    <div className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-[#0f3d2e] opacity-20"></div>
                                        <h3 className="text-2xl font-serif font-bold mb-4 text-[#0f3d2e]">{content.whyChooseTitle}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {content.whyChooseText}
                                        </p>
                                        <Button
                                            className="bg-transparent border border-[#b38b2d] text-[#b38b2d] hover:bg-[#b38b2d] hover:text-white rounded-none px-8 py-6 uppercase tracking-widest text-sm font-semibold transition-all duration-300"
                                            onClick={() => window.location.href = 'tel:+918994442768'}
                                        >
                                            Book This Service
                                        </Button>
                                    </div>
                                </Reveal>
                            </div>

                            {/* Right Side - Collage */}
                            <div className="w-full lg:w-1/2">
                                <div className={`grid gap-8 ${isBridalPortraits ? 'lg:grid-cols-[1.5fr_1fr] grid-cols-1' : 'grid-cols-2'} items-stretch`}>
                                    {isBridalPortraits && content.collageImages && content.collageImages.length >= 3 ? (
                                        <>
                                            {/* Left side: one large vertical portrait image taking 60% width */}
                                            <div className="col-span-1">
                                                <Reveal delay={100} className="h-full w-full">
                                                    <div className="rounded-[24px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] h-full w-full">
                                                        <img
                                                            src={content.collageImages[0]}
                                                            alt="Bridal portrait main"
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s]"
                                                        />
                                                    </div>
                                                </Reveal>
                                            </div>

                                            {/* Right side: two landscape images stacked vertically, each taking equal height */}
                                            <div className="col-span-1 grid grid-rows-2 gap-8 h-full">
                                                <Reveal delay={200} className="h-full">
                                                    <div className="rounded-[24px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] h-full bg-white aspect-video lg:aspect-auto">
                                                        <img
                                                            src={content.collageImages[1]}
                                                            alt="Bridal detail top"
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s]"
                                                        />
                                                    </div>
                                                </Reveal>
                                                <Reveal delay={300} className="h-full">
                                                    <div className="rounded-[24px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] h-full bg-white aspect-video lg:aspect-auto">
                                                        <img
                                                            src={content.collageImages[2]}
                                                            alt="Bridal detail bottom"
                                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-[1.5s]"
                                                        />
                                                    </div>
                                                </Reveal>
                                            </div>
                                        </>
                                    ) : content.collageImages && content.collageImages.length > 0 ? (
                                        <>
                                            {/* Main Large Slot */}
                                            <div className={content.collageImages.length === 1 ? "col-span-2" : "col-span-2"}>
                                                <Reveal delay={100}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                        {content.collageImages[0]?.endsWith('.mp4') ? (
                                                            <video
                                                                src={content.collageImages[0]}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="w-full h-auto object-cover rounded-[20px] hover:scale-105 transition-transform duration-700"
                                                            />
                                                        ) : (
                                                            <AdaptiveImage
                                                                src={content.collageImages[0]}
                                                                alt="Highlight"
                                                                imageClassName="hover:scale-105 transition-transform duration-700"
                                                            />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>

                                            {/* Slot 2 */}
                                            {content.collageImages.length > 1 && (
                                                <div className="col-span-1">
                                                    <Reveal delay={200}>
                                                        <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                            {content.collageImages[1]?.endsWith('.mp4') ? (
                                                                <video
                                                                    src={content.collageImages[1]}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="w-full h-auto object-cover rounded-[20px] hover:scale-105 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <AdaptiveImage
                                                                    src={content.collageImages[1]}
                                                                    alt="Detail"
                                                                    imageClassName="hover:scale-105 transition-transform duration-700"
                                                                />
                                                            )}
                                                        </div>
                                                    </Reveal>
                                                </div>
                                            )}

                                            {/* Slot 3 */}
                                            {content.collageImages.length > 2 && (
                                                <div className="col-span-1">
                                                    <Reveal delay={300}>
                                                        <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                            {content.collageImages[2]?.endsWith('.mp4') ? (
                                                                <video
                                                                    src={content.collageImages[2]}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="w-full h-auto object-cover rounded-[20px] hover:scale-105 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <AdaptiveImage
                                                                    src={content.collageImages[2]}
                                                                    alt="Portrait"
                                                                    imageClassName="hover:scale-105 transition-transform duration-700"
                                                                />
                                                            )}
                                                        </div>
                                                    </Reveal>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        /* Fallback to album images if no collage images are defined */
                                        <>
                                            <div className="col-span-2">
                                                <Reveal delay={100}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                        {content.albums[0]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[0]?.image} autoPlay loop muted playsInline className="w-full h-auto rounded-[20px] object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <AdaptiveImage src={content.albums[0]?.image} alt="Album 1" imageClassName="hover:scale-105 transition-transform duration-700" />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>
                                            <div className="col-span-1">
                                                <Reveal delay={200}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                        {content.albums[1]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[1]?.image} autoPlay loop muted playsInline className="w-full h-auto rounded-[20px] object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <AdaptiveImage src={content.albums[1]?.image} alt="Album 2" imageClassName="hover:scale-105 transition-transform duration-700" />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>
                                            <div className="col-span-1">
                                                <Reveal delay={300}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg">
                                                        {content.albums[2]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[2]?.image} autoPlay loop muted playsInline className="w-full h-auto rounded-[20px] object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <AdaptiveImage src={content.albums[2]?.image} alt="Album 3" imageClassName="hover:scale-105 transition-transform duration-700" />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {isVideoRoute && content.videoList && (
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl space-y-32">
                        {content.videoList.map((video, index) => (
                            <div key={video.id} className="w-full flex flex-col items-center">
                                <Reveal delay={100} className="w-full mb-12">
                                    <div className="w-full aspect-video bg-black relative">
                                        <video
                                            src={video.url}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            controls
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </Reveal>
                                
                                <Reveal delay={200} className="w-full text-center max-w-3xl">
                                    <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-3">{video.title}</h2>
                                    {video.subtitle && (
                                        <p className="text-lg md:text-xl font-light text-gray-500 mb-4">{video.subtitle}</p>
                                    )}
                                    
                                    {(video.location || video.date) && (
                                        <div className="flex items-center justify-center gap-3 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-gray-400 mb-6">
                                            {video.location && <span>{video.location}</span>}
                                            {video.location && video.date && <span>•</span>}
                                            {video.date && <span>{video.date}</span>}
                                        </div>
                                    )}
                                    
                                    {video.description && (
                                        <p className="text-gray-600 leading-relaxed font-light mb-8 max-w-2xl mx-auto">{video.description}</p>
                                    )}
                                    
                                    {index !== content.videoList.length - 1 && (
                                        <div className="w-24 h-px bg-gray-200 mx-auto mt-24" />
                                    )}
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Albums */}
            {!isVideoRoute && (
                <section className={`py-24 ${subcategory === 'baby' || subcategory === 'maternity' ? 'bg-white' : 'bg-gray-50'} overflow-hidden`}>
                    <div className={`${isVideoRoute ? 'w-full px-2' : 'container mx-auto px-6'}`}>
                        {!isVideoRoute && (
                            <Reveal>
                                <div className="text-center mb-16">
                                    <span className="text-zg-blue font-bold tracking-widest text-xs uppercase mb-2 block">Our Work</span>
                                    <h2 className="text-4xl font-serif font-bold">Featured Albums</h2>
                                </div>
                            </Reveal>
                        )}

                        <MasonryGallery
                            images={content.albums}
                            columns={{
                                default: 1,
                                sm: 2,
                                md: 3,
                                lg: 3,
                                xl: (subcategory === 'baby' || subcategory === 'maternity') ? 4 : 3
                            }}
                            gap="gap-10 space-y-10"
                        />
                    </div>
                </section>
            )}

            {/* Pagination Controls */}
            {categoryData.length > 1 && (
                <div className="flex justify-between items-center py-12 px-6 border-t border-gray-100 max-w-4xl mx-auto">
                    {prevCategory ? (
                        <Link to={`/category/${prevCategory.id}`} className="group flex flex-col items-start gap-2">
                            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Previous</span>
                            <span className="text-xl font-serif text-gray-900 group-hover:text-zg-blue transition-colors flex items-center gap-2">
                                <ArrowRight className="w-5 h-5 rotate-180" /> {prevCategory.title}
                            </span>
                        </Link>
                    ) : <div />}

                    {nextCategory ? (
                        <Link to={`/category/${nextCategory.id}`} className="group flex flex-col items-end gap-2 text-right">
                            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Next Category</span>
                            <span className="text-xl font-serif text-gray-900 group-hover:text-zg-blue transition-colors flex items-center gap-2">
                                {nextCategory.title} <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>
                    ) : <div />}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;
