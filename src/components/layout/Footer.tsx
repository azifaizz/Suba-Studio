
import React, { useEffect, useRef } from 'react';
import { Instagram, Facebook, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react';


const Footer = () => {
    return (
        <footer className="bg-black text-white pt-24 pb-12 border-t border-white/10 relative z-20">
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
                            <a href="https://www.facebook.com/zerogravitystudios/" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors touch-target"><Facebook size={20} /></a>
                            <a href="https://www.instagram.com/zerogravityphotography/" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors touch-target"><Instagram size={20} /></a>
                            <a href="https://www.youtube.com/c/ZeroGravityPhotography" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors touch-target"><Youtube size={20} /></a>
                            <a href="https://twitter.com/zerogravityfoto" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-zg-blue transition-colors touch-target"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Our Work */}
                    <div className="footer-col">
                        <h3 className="text-lg font-bold mb-6 border-b border-zg-blue pb-2 inline-block uppercase">OUR WORK</h3>
                        <ul className="space-y-4 md:space-y-3 text-white/60 text-sm">
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/hindu" className="block py-1">Hindu Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/christian" className="block py-1">Christian Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/outdoor/pre-wedding" className="block py-1">Pre Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/outdoor/post-wedding" className="block py-1">Post Wedding Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/engagement" className="block py-1">Engagement Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/maternity" className="block py-1">Maternity Photography</a></li>
                            <li className="hover:text-zg-blue cursor-pointer transition-colors"><a href="/weddings/baby" className="block py-1">Baby Photography</a></li>
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

                <div className="footer-col border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 text-[10px] sm:text-xs uppercase tracking-widest text-white/40">
                    <p className="text-center md:text-left">&copy; 2025 Suba Studios. All Rights Reserved.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                        <a href="#" className="hover:text-white cursor-pointer transition-colors block py-2 px-4 sm:p-0">Terms and Conditions</a>
                        <a href="#" className="hover:text-white cursor-pointer transition-colors block py-2 px-4 sm:p-0">Privacy Policy</a>
                        <a href="#" className="hover:text-white cursor-pointer transition-colors block py-2 px-4 sm:p-0">Careers</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
