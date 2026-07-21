import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { AdaptiveImage } from '@/components/ui/adaptive-image';

const categories = ["All", "Weddings", "Outdoor", "Video", "Events"];

const portfolioData = [
    { id: 1, title: "Royal Wedding in Jaipur", category: "Weddings", image: "/portfolio_wedding.png" },
    { id: 2, title: "Sunset Love", category: "Outdoor", image: "/portfolio_romantic.png" },
    { id: 3, title: "Cinematic Film", category: "Video", image: "/hero.png" },
    { id: 4, title: "Baby Shower", category: "Events", image: "/portfolio_fashion.png" },
    { id: 5, title: "Temple Wedding", category: "Weddings", image: "/portrait.png" },
    { id: 6, title: "Beach Pre-Wedding", category: "Outdoor", image: "/landscape.png" },
];

const Portfolio = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredData = activeCategory === "All"
        ? portfolioData
        : portfolioData.filter(item => item.category === activeCategory);

    return (
        <div className="pt-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 py-12">
                <Reveal>
                    <h1 className="text-5xl font-serif font-bold mb-8 text-center">Our Portfolio</h1>
                    <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                        A curated collection of our finest work, showcasing love, style, and emotion.
                    </p>
                </Reveal>

                {/* Filter Tabs */}
                <Reveal delay={200}>
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all",
                                    activeCategory === cat
                                        ? "bg-zg-blue text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </Reveal>

                {/* Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {filteredData.map((item, index) => (
                        <Reveal key={item.id} delay={index * 100}>
                            <div className="group relative overflow-hidden rounded-xl cursor-pointer break-inside-avoid">
                                <AdaptiveImage
                                    src={item.image}
                                    alt={item.title}
                                    imageClassName="transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 pointer-events-none">
                                    <span className="text-zg-blue text-xs font-bold uppercase mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                                    <h3 className="text-white text-lg font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
