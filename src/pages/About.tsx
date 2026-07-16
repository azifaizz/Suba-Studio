import React from 'react';
import { Button } from '@/components/ui/button';
import { Reveal } from "@/components/ui/reveal";
import { LuxuryBookButton } from '@/components/ui/luxury-book-button';

const About = () => {
    return (
        <div className="pt-20 min-h-screen bg-white text-black">
            {/* Hero */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black text-white">
                <div className="absolute inset-0 opacity-60">
                    <img src="/hero.png" alt="About Hero" className="w-full h-full object-cover" />
                </div>
                <div className="relative z-10 text-center container mx-auto px-6">
                    <Reveal>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">About Us</h1>
                        <p className="text-xl max-w-2xl mx-auto text-white/80">
                            Visual Storytelling at its Finest
                        </p>
                    </Reveal>
                </div>
            </section>

            {/* Story */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-16 items-center">
                    <div className="w-full md:w-1/2">
                        <Reveal>
                            <div className="relative">
                                <div className="absolute inset-0 bg-zg-blue/10 transform translate-x-4 translate-y-4 rounded-lg" />
                                <img src="/portrait.png" alt="Ajay Benjamin" className="relative w-full rounded-lg shadow-xl" />
                            </div>
                        </Reveal>
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <Reveal>
                            <h2 className="text-4xl font-serif font-bold mb-4">Suba Studios Story</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Suba Studios is considered to be the best place for visual storytelling. Our love for photography knows no bounds, and we’ve developed our techniques to perfection. Our photographers have a distinct artistic perspective, a recognizable signature, and a consistent quality across their work.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our main goal is to think creatively and provide exceptional customer service. We always stay updated on the latest trends including pre-wedding photography, post-wedding photography, and couple poses. We make sure that our style of couple photography resonates with clients and leaves a lasting impression.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                "A Wedding Photo is not one that just captures a fleeting moment in time, it is that which acts as a window and lets you travel back to that special moment every time you look at it"
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row-reverse gap-16 items-center">
                        <div className="w-full md:w-1/2">
                            <Reveal>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-zg-blue/10 transform -translate-x-4 translate-y-4 rounded-lg" />
                                    <img src="/hero.png" alt="Ajay Benjamin - Founder" className="relative w-full rounded-lg shadow-xl" />
                                </div>
                            </Reveal>
                        </div>
                        <div className="w-full md:w-1/2 space-y-6">
                            <Reveal>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-zg-blue">Founder, Managing Director & Lead Photographer</h3>
                                <h2 className="text-4xl font-serif font-bold">Ajay Benjamin</h2>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    As he was waiting to go abroad to do his Masters, his love for Photography found him. An engineer turned photographer, an avid entrepreneur, an excited traveler, and a car enthusiast!
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    With his creativity and unconditional love for photography, Ajay has always tried to break the glass ceiling in the most creative ways. What began only as a hobby soon found him working freelance gigs. The more photos he took the more he realized this is what he wanted to do.
                                </p>
                                <p className="text-lg text-gray-600 leading-relaxed">
                                    Ajay has always believed that a wedding is not just the culmination of a couple’s commitment. He’s the storyteller in the mix; He believes every Wedding has a story waiting to be discovered and hunts the story down with his lens.
                                </p>
                                <p className="font-bold text-zg-blue">
                                    E-mail: ajay@subastudios.com
                                </p>
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Awards & Honours */}
            <section id="awards" className="py-24 container mx-auto px-6">
                <Reveal>
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-4xl font-serif font-bold mb-12">Awards & Honours</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-zg-blue">
                                <h3 className="text-xl font-bold mb-2">Best Wedding Photographer - South India</h3>
                                <p className="text-gray-600">Awarded by Wedding Vows Magazine for excellence in candid wedding photography.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-zg-blue">
                                <h3 className="text-xl font-bold mb-2">Top 10 Indian Photographers</h3>
                                <p className="text-gray-600">Recognized by Canvera as one of the most influential photographers in the industry.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-zg-blue">
                                <h3 className="text-xl font-bold mb-2">Featured in Vogue India</h3>
                                <p className="text-gray-600">Our celebrity wedding shoots have been featured in major fashion and lifestyle publications.</p>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-2xl border-l-4 border-zg-blue">
                                <h3 className="text-xl font-bold mb-2">Creative Excellence Award</h3>
                                <p className="text-gray-600">For outstanding contribution to the field of visual storytelling and cinematography.</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>

            {/* Careers */}
            <section id="careers" className="py-24 bg-black text-white">
                <div className="container mx-auto px-6 text-center">
                    <Reveal>
                        <h2 className="text-4xl font-serif font-bold mb-6">Join Our Team</h2>
                        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
                            We are always looking for passionate storytellers, editors, and photographers to join the Suba Studios family. If you have a unique vision and a drive to create magic, we want to hear from you.
                        </p>
                        <Button variant="outline" className="border-white text-black hover:bg-white/90 px-10 py-6 rounded-full text-lg">
                            Apply Now
                        </Button>
                    </Reveal>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6">
                    <Reveal>
                        <h2 className="text-3xl font-serif font-bold mb-6">Let us make your special day an event of your lifetime</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                            Get in touch with us and let us make your special day an event of your lifetime using our digital eye.
                        </p>
                        <div className="flex justify-center">
                            <LuxuryBookButton onClick={() => window.location.href = 'tel:+918994442768'} />
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
};

export default About;
