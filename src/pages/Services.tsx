import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Reveal } from "@/components/ui/reveal";
import { Camera, Video, Heart, Image as ImageIcon } from "lucide-react";

const services = [
    {
        icon: <Camera size={40} />,
        title: "Candid Wedding Photography",
        description: "Unscripted, raw, and beautiful moments captured as they happen. We focus on the genuine emotions and interactions that make your wedding unique.",
        image: "/portfolio_wedding.png"
    },
    {
        icon: <Video size={40} />,
        title: "Cinematic Wedding Films",
        description: "High-definition storytelling that feels like a movie. Our cinematographers create a visual narrative that immortalizes your love story.",
        image: "/hero.png"
    },
    {
        icon: <Heart size={40} />,
        title: "Pre-Wedding & Outdoor",
        description: "Creative and romantic outdoor shoots that capture the chemistry before the big day. From beaches to heritage sites, we travel everywhere.",
        image: "/portfolio_romantic.png"
    },
    {
        icon: <ImageIcon size={40} />,
        title: "Traditional Photography",
        description: "Ensuring no ritual or guest is missed. We document the ceremonial grandeur with clarity and respect for tradition.",
        image: "/portrait.png"
    }
];

const Services = () => {
    return (
        <div className="pt-20 min-h-screen bg-white text-black">
            <div className="container mx-auto px-6 py-24">
                <Reveal>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h1 className="text-5xl font-serif font-bold mb-6">Our Services</h1>
                        <p className="text-gray-600 text-lg">
                            We take our craft seriously. From straightforward coverage to themed documentary-style wedding albums, we offer a range of services to capture your moments perfectly.
                        </p>
                    </div>
                </Reveal>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {services.map((service, index) => (
                        <Reveal key={index} delay={index * 100}>
                            <div className="group space-y-6">
                                <div className="overflow-hidden rounded-2xl shadow-lg aspect-video">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <div className="w-16 h-16 bg-zg-blue/10 text-zg-blue rounded-full flex items-center justify-center">
                                        {service.icon}
                                    </div>
                                    <h3 className="text-3xl font-serif font-bold group-hover:text-zg-blue transition-colors">{service.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {service.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal>
                    <div className="mt-24 text-center bg-gray-50 rounded-3xl p-12">
                        <h3 className="text-3xl font-serif font-bold mb-6">Ready to create magic together?</h3>
                        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                            Whether it's a grand wedding or an intimate ceremony, we are ready to caption your story.
                        </p>
                        <Button
                            className="bg-zg-blue hover:bg-zg-blue/90 text-white px-10 py-6 rounded-full text-lg"
                            onClick={() => window.location.href = 'tel:+918994442768'}
                        >
                            Get a Quote
                        </Button>
                    </div>
                </Reveal>
            </div>
        </div>
    );
};

export default Services;
