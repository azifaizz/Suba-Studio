import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { categoryData, defaultContent, CategoryContent } from '@/data/categoryContent';
import { ArrowRight } from 'lucide-react';
import CinematicStoryboardPage from '@/components/layout/CinematicStoryboardPage';
import BridalPortraitsPage from '@/pages/BridalPortraitsPage';

const CategoryPage = () => {
    const { subcategory } = useParams();
    const { pathname } = useLocation();
    const [content, setContent] = useState<CategoryContent>(defaultContent);

    const isVideoRoute = pathname.includes('/video/');
    
    // Custom Page Routing for Awwwards-winning galleries
    const storyboardCategories = ['hindu', 'christian', 'engagement', 'pre-wedding', 'post-wedding', 'maternity'];
    if (subcategory && storyboardCategories.includes(subcategory) && !isVideoRoute) {
        return <CinematicStoryboardPage subcategory={subcategory} />;
    }

    if (subcategory === 'bridal-portraits' && !isVideoRoute) {
        return <BridalPortraitsPage subcategory={subcategory} />;
    }

    const isOutdoorVideo = isVideoRoute && subcategory === 'outdoor';
    const isShortStoriesVideo = isVideoRoute && subcategory === 'short-stories';
    const isPortraitOrRitual = subcategory === 'couple-portraits' || subcategory === 'rituals' || subcategory === 'maternity' || subcategory === 'baby';
    const isFullVisibilityCategory = subcategory === 'bridal-portraits' || subcategory === 'groom-portraits' || subcategory === 'christian';
    const isBridalPortraits = subcategory === 'bridal-portraits';
    const isMaternity = subcategory === 'maternity';

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

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className={`relative flex items-center justify-center overflow-hidden ${(isShortStoriesVideo || isOutdoorVideo) ? 'h-[75vh] md:h-[85vh]' : (isFullVisibilityCategory ? 'h-[60vh] md:h-[75vh] bg-black' : (isPortraitOrRitual ? 'h-[80vh] md:h-[90vh]' : 'h-[70vh] md:h-[85vh]'))}`}>
                <div className="absolute inset-0">
                    {content.heroImage?.endsWith('.mp4') ? (
                        <video
                            src={content.heroImage}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <img
                            src={content.heroImage}
                            alt={content.title}
                            className={`w-full h-full ${isFullVisibilityCategory ? 'object-contain' : 'object-cover'} ${isShortStoriesVideo ? 'object-[center_15%]' : (isPortraitOrRitual ? 'object-[center_10%]' : (isOutdoorVideo ? 'object-center' : 'object-top'))}`}
                        />
                    )}
                    <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative z-10 container mx-auto px-6 text-center text-white">
                    <Reveal>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-poppins font-black mb-4 text-transparent [-webkit-text-stroke:1px_white] sm:[-webkit-text-stroke:1.5px_white] tracking-tight whitespace-nowrap px-4 overflow-hidden text-ellipsis">
                            {content.title}
                        </h1>
                        <p className="text-lg md:text-2xl font-light tracking-wider italic text-white/90">
                            "{content.tagline}"
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Content Section */}
            {!isOutdoorVideo && !isShortStoriesVideo && (
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
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg h-[500px] md:h-[650px]">
                                                        {content.collageImages[0]?.endsWith('.mp4') ? (
                                                            <video
                                                                src={content.collageImages[0]}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={content.collageImages[0]}
                                                                alt="Highlight"
                                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                                            />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>

                                            {/* Slot 2 */}
                                            {content.collageImages.length > 1 && (
                                                <div className="col-span-1">
                                                    <Reveal delay={200}>
                                                        <div className="rounded-[20px] overflow-hidden shadow-lg h-[250px]">
                                                            {content.collageImages[1]?.endsWith('.mp4') ? (
                                                                <video
                                                                    src={content.collageImages[1]}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={content.collageImages[1]}
                                                                    alt="Detail"
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                                                        <div className="rounded-[20px] overflow-hidden shadow-lg h-[250px]">
                                                            {content.collageImages[2]?.endsWith('.mp4') ? (
                                                                <video
                                                                    src={content.collageImages[2]}
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src={content.collageImages[2]}
                                                                    alt="Portrait"
                                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
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
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg h-[400px]">
                                                        {content.albums[0]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[0]?.image} autoPlay loop muted playsInline className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <img src={content.albums[0]?.image} alt="Album 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>
                                            <div className="col-span-1">
                                                <Reveal delay={200}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg h-[250px]">
                                                        {content.albums[1]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[1]?.image} autoPlay loop muted playsInline className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <img src={content.albums[1]?.image} alt="Album 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                        )}
                                                    </div>
                                                </Reveal>
                                            </div>
                                            <div className="col-span-1">
                                                <Reveal delay={300}>
                                                    <div className="rounded-[20px] overflow-hidden shadow-lg h-[250px]">
                                                        {content.albums[2]?.image?.endsWith('.mp4') ? (
                                                            <video src={content.albums[2]?.image} autoPlay loop muted playsInline className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                                        ) : (
                                                            <img src={content.albums[2]?.image} alt="Album 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
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

            {isShortStoriesVideo && (
                <section className="py-12 md:py-24 bg-white">
                    <div className="container mx-auto px-6 space-y-8 md:space-y-12">
                        {/* First Pair: About This Style + Baby Shower Reel */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                            <div className="w-full rounded-[32px] overflow-hidden p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-[#f3f3f3]">
                                <Reveal>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0f3d2e] leading-tight mb-8">About This Style</h2>
                                    <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl">
                                        {content.description}
                                    </p>
                                </Reveal>
                            </div>
                            <div className="w-full relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-black rounded-[32px] overflow-hidden shadow-xl">
                                <video
                                    src={content.collageImages?.[0] || "/BABY SHOWER REEL.mp4"}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Second Pair: Why Choose + Outdoor.mp4 */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
                            <div className="w-full lg:order-2 rounded-[32px] overflow-hidden p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-[#f3f3f3]">
                                <Reveal delay={200}>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#0f3d2e] leading-tight mb-8">
                                        {content.whyChooseTitle}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed text-lg md:text-xl font-light max-w-2xl">
                                        {content.whyChooseText}
                                    </p>
                                </Reveal>
                            </div>
                            <div className="w-full lg:order-1 relative min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-black rounded-[32px] overflow-hidden shadow-xl">
                                <video
                                    src={content.collageImages?.[1] || "/Outdoor.mp4"}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {isOutdoorVideo && (
                <section className="py-2 px-2 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {content.albums.map((album, index) => (
                            <Reveal key={album.id} delay={index * 100} className={index === content.albums.length - 1 && content.albums.length % 2 !== 0 ? "md:col-span-2" : ""}>
                                <div className="w-full aspect-video relative bg-black overflow-hidden group">
                                    <video
                                        src={album.image}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </section>
            )}

            {/* Featured Albums */}
            {!isShortStoriesVideo && !isOutdoorVideo && (
                <section className={`${isOutdoorVideo ? 'py-12' : 'py-24'} ${subcategory === 'baby' || subcategory === 'maternity' ? 'bg-white' : 'bg-gray-50'} overflow-hidden`}>
                    <div className={`${isVideoRoute ? 'w-full px-2' : 'container mx-auto px-6'}`}>
                        {!isVideoRoute && (
                            <Reveal>
                                <div className="text-center mb-16">
                                    <span className="text-zg-blue font-bold tracking-widest text-xs uppercase mb-2 block">Our Work</span>
                                    <h2 className="text-4xl font-serif font-bold">Featured Albums</h2>
                                </div>
                            </Reveal>
                        )}

                        <div className={subcategory === 'baby' || subcategory === 'maternity'
                            ? "columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-2 space-y-2"
                            : `grid grid-cols-1 ${isVideoRoute ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-3'} ${isVideoRoute ? 'gap-2' : 'gap-10'}`
                        }>
                            {content.albums.map((album, index) => (
                                <Reveal key={album.id} delay={index * 100} className={subcategory === 'baby' || subcategory === 'maternity' ? "break-inside-avoid mb-2" : ""}>
                                    <div className={`group cursor-pointer bg-white overflow-hidden ${subcategory === 'baby' || subcategory === 'maternity' ? '' : 'rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300'}`}>
                                        <div className={subcategory === 'baby' || subcategory === 'maternity' ? "w-full" : `overflow-hidden ${isVideoRoute ? 'aspect-video' : 'aspect-[4/5]'}`}>
                                            {album.image?.endsWith('.mp4') ? (
                                                <video
                                                    src={album.image}
                                                    autoPlay={subcategory === 'candid'}
                                                    loop={subcategory === 'candid'}
                                                    muted={subcategory === 'candid'}
                                                    playsInline={subcategory === 'candid'}
                                                    controls={subcategory !== 'candid'}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <img
                                                    src={album.image}
                                                    alt={album.title}
                                                    className={`w-full ${['christian', 'engagement', 'post-wedding'].includes(subcategory || '') ? 'h-full' : 'h-auto'} object-cover ${subcategory === 'baby' || subcategory === 'maternity' ? '' : 'transition-transform duration-700 group-hover:scale-110'}`}
                                                />
                                            )}
                                        </div>
                                        {album.title && subcategory !== 'candid' && (
                                            <div className="p-6 text-center bg-white border-t border-gray-100">
                                                <h3 className="text-xl font-serif font-bold text-[#0f3d2e] tracking-tight">{album.title}</h3>
                                            </div>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default CategoryPage;
