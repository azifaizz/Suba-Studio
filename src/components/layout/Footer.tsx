
import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.footer-col', 
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: 'top 85%'
                    }
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-black text-white pt-24 pb-12 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">

                    {/* Brand */}
                    <div className="footer-col space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#102f76] p-2 rounded text-white font-black text-xs">
                                SS
                            </div>
                            <h2 className="text-2xl font-serif font-bold tracking-tighter">SUBA STUDIOS</h2>
                        </div>
                        <p className="text-white/60 leading-relaxed text-sm">
                            Suba Studios is considered to be the best place for visual storytelling and is among the top wedding photography studios in the country.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/zerogravitystudios/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors"><Facebook size={18} /></a>
                            <a href="https://www.instagram.com/zerogravityphotography/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors"><Instagram size={18} /></a>
                            <a href="https://www.youtube.com/c/ZeroGravityPhotography" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors"><Youtube size={18} /></a>
                            <a href="https://twitter.com/zerogravityfoto" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors"><Twitter size={18} /></a>
                        </div>
                    </div>

                    {/* Our Work */}
                    <div className="footer-col">
                        <h3 className="text-lg font-bold mb-6 border-b border-zg-blue pb-2 inline-block uppercase">OUR WORK</h3>
                        <ul className="space-y-3 text-white/60 text-sm">
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/hindu">Hindu Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/christian">Christian Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/outdoor/pre-wedding">Pre Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/outdoor/post-wedding">Post Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/engagement">Engagement Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/maternity">Maternity Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/baby">Baby Photography</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-col">
                        <h3 className="text-lg font-bold mb-6 border-b border-zg-blue pb-2 inline-block">GET IN TOUCH</h3>
                        <ul className="space-y-6 text-white/60 text-sm">
                            <li className="flex items-start gap-4">
                                <MapPin className="text-zg-blue shrink-0" size={20} />
                                <span>105A, Kamarajar St, <br />Kanchipuram, Tamil Nadu 631501</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Phone className="text-zg-blue shrink-0" size={20} />
                                <span>+91 98944 42768</span>
                            </li>
                            <li className="flex items-center gap-4">
                                <Mail className="text-zg-blue shrink-0" size={20} />
                                <span>hello@subastudios.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-col border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40">
                    <p>&copy; 2025 Suba Studios. All Rights Reserved.</p>
                    <div className="flex gap-8">
                        <span className="hover:text-white cursor-pointer transition-colors">Terms and Conditions</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Careers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
