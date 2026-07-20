import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuxuryBookButton } from '@/components/ui/luxury-book-button';
import { Menu, X, Camera, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const navData = [
    {
        name: "HOME",
        path: "/",
        noDropdown: true,
        subMenu: []
    },
    {
        name: "OUR WORK",
        path: "/weddings",
        vertical: true,
        subMenu: [
            { name: "Hindu Wedding Photography", path: "/weddings/hindu", hasCamera: true },
            { name: "Christian Wedding Photography", path: "/weddings/christian", hasCamera: true },
            { name: "Engagement Photography", path: "/weddings/engagement", hasCamera: true },
            { name: "Pre Wedding Photography", path: "/outdoor/pre-wedding", hasCamera: true },
            { name: "Post Wedding Photography", path: "/outdoor/post-wedding", hasCamera: true },
            { name: "Maternity Photography", path: "/weddings/maternity", hasCamera: true },
            { name: "Baby Photography", path: "/weddings/baby", hasCamera: true },
        ]
    },
    {
        name: "OUR STORY",
        path: "/about",
        noDropdown: true,
        subMenu: []
    },
    {
        name: "GALLERY",
        path: "/gallery",
        vertical: true,
        subMenu: [
            { name: "Bridal Portraits", path: "/gallery/bridal-portraits", hasCamera: true },
            { name: "Couple Portraits", path: "/gallery/couple-portraits", hasCamera: true },
            { name: "Groom Portraits", path: "/gallery/groom-portraits", hasCamera: true },
            { name: "Rituals", path: "/gallery/rituals", hasCamera: true },
            { name: "Candid Moments", path: "/gallery/candid-moments", hasCamera: true },
        ]
    },
    {
        name: "VIDEOS",
        path: "/video",
        vertical: true,
        subMenu: [
            { name: "Candid Wedding Films", path: "/video/candid", hasCamera: true },
            { name: "Outdoor Wedding Films", path: "/video/outdoor", hasCamera: true },
            { name: "Short Stories", path: "/video/short-stories", hasCamera: true },
        ]
    }
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
    const [isHomeClickAnimating, setIsHomeClickAnimating] = useState(false);
    const [mobCenterDelta, setMobCenterDelta] = useState(0);
    
    const location = useLocation();
    const navigate = useNavigate();
    const logoRef = useRef<HTMLDivElement>(null);
    const logoMobRef = useRef<HTMLDivElement>(null);

    const isHome = location.pathname === '/';

    // Body scroll locking when mobile menu drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isMobileMenuOpen]);

    // Calculate exact horizontal delta required to dead-center the mobile logo at top of page
    useEffect(() => {
        const updateCenterDelta = () => {
            if (logoMobRef.current) {
                const parent = logoMobRef.current.parentElement;
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    const elemWidth = logoMobRef.current.offsetWidth;
                    const elemLeft = parentRect.left + logoMobRef.current.offsetLeft;
                    const elemCenter = elemLeft + elemWidth / 2;
                    const screenCenter = window.innerWidth / 2;
                    setMobCenterDelta(screenCenter - elemCenter);
                }
            }
        };
        updateCenterDelta();
        window.addEventListener('resize', updateCenterDelta, { passive: true });
        // Also recalculate shortly after mount just in case fonts loaded
        const timer = setTimeout(updateCenterDelta, 60);
        return () => {
            window.removeEventListener('resize', updateCenterDelta);
            clearTimeout(timer);
        };
    }, [isHome]);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            // Small scroll threshold (15px) with hysteresis band (10px) to prevent flickering
            if (currentY > 15) {
                setIsScrolled(true);
            } else if (currentY <= 10) {
                setIsScrolled(false);
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isSplitLayout = isHome && !isScrolled && !isHomeClickAnimating;

    const handleHomeClick = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        setIsMobileMenuOpen(false);
        setIsHomeClickAnimating(true);
        
        if (location.pathname !== '/') {
            navigate('/');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (logoRef.current) {
            gsap.killTweensOf(logoRef.current);
            gsap.fromTo(
                logoRef.current,
                {
                    x: window.innerWidth / 2 + 150,
                    scale: 0.86,
                    opacity: 0,
                },
                {
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.1,
                    ease: 'power4.out',
                    onComplete: () => {
                        setIsHomeClickAnimating(false);
                    }
                }
            );
        }

        // Also smoothly animate mobile logo if on mobile view
        if (logoMobRef.current && window.innerWidth < 1024) {
            gsap.killTweensOf(logoMobRef.current);
            gsap.fromTo(
                logoMobRef.current,
                {
                    x: window.innerWidth / 2 + 150,
                    scale: 0.86,
                    opacity: 0,
                },
                {
                    x: mobCenterDelta,
                    scale: 1,
                    opacity: 1,
                    duration: 1.1,
                    ease: 'power4.out',
                    onComplete: () => {
                        setIsHomeClickAnimating(false);
                    }
                }
            );
        }
    };

    const handleNavClick = (path: string) => {
        setIsMobileMenuOpen(false);
        // Smoothly close the drawer first, then execute navigation right after slide completes (~320ms)
        setTimeout(() => {
            if (path === '/') {
                handleHomeClick();
            } else {
                navigate(path);
            }
        }, 320);
    };

    const isItemActive = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        if (path === '/weddings') {
            return location.pathname.startsWith('/weddings') || location.pathname.startsWith('/outdoor');
        }
        return location.pathname.startsWith(path);
    };

    const leftNavItems = navData.slice(0, 3);
    const rightNavItems = navData.slice(3);

    const renderDesktopNavItem = (item: typeof navData[0]) => (
        <motion.div
            key={item.name}
            layout
            layoutId={`desktop-nav-item-${item.name}`}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative group px-2 xl:px-3 py-2"
            onMouseEnter={() => !item.noDropdown && setActiveSubMenu(item.name)}
            onMouseLeave={() => setActiveSubMenu(null)}
        >
            <button
                className={`flex items-center gap-1 hover:text-zg-blue transition-colors uppercase font-serif font-bold tracking-widest text-[14px] ${
                    isItemActive(item.path)
                        ? (isScrolled || !isHome ? 'text-zg-blue underline underline-offset-[8px] decoration-2' : 'text-white underline underline-offset-[8px] decoration-2')
                        : ''
                }`}
                onClick={() => item.noDropdown ? handleNavClick(item.path) : undefined}
            >
                {item.name}
                {!item.noDropdown && (
                    <ChevronDown size={12} className={`transition-transform duration-300 ${activeSubMenu === item.name ? 'rotate-180' : ''}`} />
                )}
            </button>

            {/* Desktop Dropdown Drawer */}
            {!item.noDropdown && item.subMenu.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className={`bg-white text-black shadow-2xl rounded-[12px] overflow-hidden border border-gray-100/60 backdrop-blur-xl p-2 bg-white/97 ${
                        item.vertical
                            ? 'flex flex-col gap-1 min-w-[230px]'
                            : item.subMenu.length > 4
                                ? 'grid grid-cols-3 gap-1.5 w-[360px]'
                                : item.subMenu.length > 2
                                    ? 'grid grid-cols-3 gap-1.5 w-[360px]'
                                    : 'grid grid-cols-2 gap-1.5 w-[240px]'
                    }`}>
                        {item.subMenu.map((sub) => (
                            <button
                                key={sub.name}
                                onClick={() => handleNavClick(sub.path)}
                                className={`w-full transition-all duration-300 flex items-center gap-2 text-left px-3 py-2.5 rounded-[8px] hover:bg-zg-blue group/sub relative overflow-hidden ${
                                    item.vertical ? '' : 'justify-center text-center flex-col'
                                }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-zg-blue/10 to-transparent opacity-0 group-hover/sub:opacity-100 transition-opacity" />
                                {sub.hasCamera && (
                                    <Camera
                                        size={11}
                                        className="relative z-10 text-zg-blue group-hover/sub:text-white transition-colors shrink-0"
                                        strokeWidth={2}
                                    />
                                )}
                                <span className="font-serif font-bold text-[9px] relative z-10 group-hover/sub:text-white leading-tight uppercase tracking-wider whitespace-nowrap">
                                    {sub.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
    );

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-400 ease-out ${
                    isScrolled || !isHome
                        ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-gray-100/50'
                        : 'bg-transparent py-4 sm:py-6'
                }`}
            >
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between relative h-14 md:h-16 [padding-left:max(16px,env(safe-area-inset-left))] [padding-right:max(16px,env(safe-area-inset-right))]">
                    
                    {/* Left Section (Desktop Split vs Scrolled Logo Slot) */}
                    <div className={`hidden lg:flex items-center justify-start z-40 ${isSplitLayout ? 'flex-1' : 'shrink-0'}`}>
                        {isSplitLayout ? (
                            <motion.div layout className="flex items-center gap-1 xl:gap-4">
                                {leftNavItems.map(renderDesktopNavItem)}
                            </motion.div>
                        ) : isHomeClickAnimating ? null : (
                            <motion.div
                                layout
                                layoutId="cinematic-brand-logo"
                                transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
                                onClick={() => handleHomeClick()}
                                className="cursor-pointer select-none py-1 flex items-center shrink-0"
                            >
                                <span className={`font-serif font-black tracking-[0.15em] xl:tracking-[0.24em] text-xl xl:text-2xl uppercase transition-colors duration-300 whitespace-nowrap ${
                                    isScrolled || !isHome ? 'text-black' : 'text-white'
                                }`}>
                                    SUBA STUDIOS
                                </span>
                            </motion.div>
                        )}
                    </div>

                    {/* Center Section Wrapper (Desktop Split Layout Logo) */}
                    {isSplitLayout && !isHomeClickAnimating && (
                        <div className="hidden lg:flex items-center justify-center z-40 px-4 shrink-0">
                            <motion.div
                                layout
                                layoutId="cinematic-brand-logo"
                                transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
                                onClick={() => handleHomeClick()}
                                className="pointer-events-auto cursor-pointer select-none py-2 flex items-center justify-center"
                            >
                                <span className="font-serif font-black tracking-[0.15em] xl:tracking-[0.28em] text-xl lg:text-2xl xl:text-3xl uppercase text-white transition-colors duration-300 whitespace-nowrap">
                                    SUBA STUDIOS
                                </span>
                            </motion.div>
                        </div>
                    )}

                    {/* GSAP Home Click Animation Override Layer (Desktop) */}
                    {isHomeClickAnimating && (
                        <div className="hidden lg:flex absolute inset-0 pointer-events-none items-center justify-center z-40 px-16">
                            <div
                                ref={logoRef}
                                onClick={() => handleHomeClick()}
                                className="pointer-events-auto cursor-pointer select-none py-2 flex items-center justify-center"
                            >
                                <span className={`font-serif font-black tracking-[0.15em] xl:tracking-[0.28em] text-xl lg:text-2xl xl:text-3xl uppercase transition-colors duration-300 whitespace-nowrap ${
                                    isScrolled || !isHome ? 'text-black' : 'text-white'
                                }`}>
                                    SUBA STUDIOS
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Mobile & Tablet Dedicated Continuous Logo (< 1024px / lg:hidden) */}
                    <div className="flex items-center justify-start z-40 shrink-0 lg:hidden">
                        <motion.div
                            ref={logoMobRef}
                            onClick={() => handleHomeClick()}
                            animate={{
                                x: isSplitLayout ? mobCenterDelta : 0,
                                scale: isSplitLayout ? 1 : 0.88,
                            }}
                            transition={{
                                duration: 0.42,
                                ease: [0.19, 1, 0.22, 1], // GSAP power4.out equivalent
                            }}
                            className="cursor-pointer select-none py-1 flex items-center origin-left shrink-0"
                        >
                            <span className={`font-serif font-black tracking-[0.16em] sm:tracking-[0.20em] md:tracking-[0.24em] text-base sm:text-lg md:text-xl uppercase transition-colors duration-300 whitespace-nowrap ${
                                isScrolled || !isHome || isMobileMenuOpen ? 'text-black' : 'text-white'
                            }`}>
                                SUBA STUDIOS
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Section: Nav links on desktop, Hamburger button always visible on right */}
                    <div className={`flex items-center justify-end z-50 ${isSplitLayout ? 'flex-1' : 'shrink-0 ml-auto'} gap-1 sm:gap-2`}>
                        {!isSplitLayout && (
                            <div className="hidden lg:flex items-center gap-1 xl:gap-4">
                                {leftNavItems.map(renderDesktopNavItem)}
                            </div>
                        )}
                        
                        <div className="hidden lg:flex items-center gap-1 xl:gap-4">
                            {rightNavItems.map(renderDesktopNavItem)}
                        </div>

                        {/* CTA Button (Desktop only) */}
                        <motion.div layout transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block pl-2">
                            <LuxuryBookButton onClick={() => window.location.href = 'tel:+918994442768'} />
                        </motion.div>

                        {/* Mobile Menu Toggle Button: Never clipped, always vertically centered on far right */}
                        <button
                            type="button"
                            aria-label="Open navigation menu"
                            className={`lg:hidden z-50 shrink-0 flex items-center justify-center w-12 h-12 touch-target rounded-full transition-all duration-300 active:scale-95 ${
                                isScrolled || !isHome ? 'text-black hover:bg-gray-100/80' : 'text-white hover:bg-white/10'
                            }`}
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={26} className="shrink-0" strokeWidth={2.2} />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Backdrop & Sliding Drawer (< 992px / lg:hidden) */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Dark Blurred Backdrop (z-[55]) */}
                        <motion.div
                            key="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/45 backdrop-blur-[3px] z-[55] lg:hidden cursor-pointer select-none"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        />

                        {/* Sliding Drawer Panel (z-[60]) - 85vw max-w-[380px] */}
                        <motion.div
                            key="mobile-drawer"
                            initial={{ x: '100%' }}
                            animate={{ x: '0%' }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[380px] bg-white text-black shadow-[0_0_80px_rgba(0,0,0,0.35)] z-[60] lg:hidden overflow-y-auto flex flex-col justify-between [padding-left:max(20px,env(safe-area-inset-left))] [padding-right:max(20px,env(safe-area-inset-right))] safe-pt"
                        >
                            {/* Drawer Header (Logo + Close X Button) */}
                            <div className="pt-6 sm:pt-7 pb-4 px-4 sm:px-6 flex items-center justify-between border-b border-gray-100/80 shrink-0">
                                <span className="font-serif font-black tracking-[0.22em] text-sm sm:text-base uppercase text-gray-900 select-none">
                                    SUBA STUDIOS
                                </span>
                                <button
                                    type="button"
                                    aria-label="Close navigation drawer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-12 h-12 touch-target rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all active:scale-90 shrink-0 shadow-sm"
                                >
                                    <X size={22} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Accordion Navigation Items */}
                            <div className="flex flex-col gap-1.5 py-6 px-3 sm:px-5 my-auto">
                                {navData.map((item) => (
                                    <div key={item.name} className="flex flex-col w-full">
                                        
                                        {/* Main Item Header Button */}
                                        <button
                                            type="button"
                                            className={`w-full min-h-[52px] sm:min-h-[56px] px-3 py-3.5 rounded-xl text-xl sm:text-2xl font-serif font-bold flex items-center justify-between transition-all text-left active:bg-gray-100/70 select-none ${
                                                isItemActive(item.path) || activeSubMenu === item.name
                                                    ? 'text-zg-blue'
                                                    : 'text-gray-900'
                                            }`}
                                            onClick={() => {
                                                if (item.noDropdown) {
                                                    handleNavClick(item.path);
                                                } else {
                                                    setActiveSubMenu(activeSubMenu === item.name ? null : item.name);
                                                }
                                            }}
                                        >
                                            <span className="tracking-wider uppercase block">{item.name}</span>
                                            
                                            {!item.noDropdown && (
                                                <motion.div
                                                    animate={{ rotate: activeSubMenu === item.name ? 180 : 0 }}
                                                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                                                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100/80 text-gray-700 shrink-0 ml-4"
                                                >
                                                    <ChevronDown size={20} strokeWidth={2.4} className="shrink-0" />
                                                </motion.div>
                                            )}
                                        </button>

                                        {/* Vertical Accordion Submenu (`height: 0 -> auto`) */}
                                        <AnimatePresence initial={false}>
                                            {!item.noDropdown && activeSubMenu === item.name && (
                                                <motion.div
                                                    key={`mobile-submenu-${item.name}`}
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                                                    className="overflow-hidden flex flex-col w-full"
                                                >
                                                    <div className="pt-2 pb-4 pl-5 sm:pl-6 flex flex-col gap-1 border-l-2 border-zg-blue/60 ml-3 sm:ml-4 mt-1 mb-2">
                                                        {item.subMenu.map((sub, idx) => (
                                                            <motion.button
                                                                key={sub.name}
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -8 }}
                                                                transition={{
                                                                    duration: 0.28,
                                                                    delay: idx * 0.045,
                                                                    ease: 'easeOut'
                                                                }}
                                                                onClick={() => handleNavClick(sub.path)}
                                                                className="w-full min-h-[50px] sm:min-h-[54px] px-4 py-3 rounded-xl text-left text-gray-700 hover:text-zg-blue hover:bg-zg-blue/5 active:bg-zg-blue/12 transition-all flex items-center gap-3 font-serif font-bold text-[15px] sm:text-[16px] tracking-wide uppercase select-none group/mobsub"
                                                            >
                                                                {sub.hasCamera && (
                                                                    <Camera
                                                                        size={17}
                                                                        className="text-zg-blue shrink-0 group-hover/mobsub:scale-110 transition-transform"
                                                                        strokeWidth={2.2}
                                                                    />
                                                                )}
                                                                <span className="leading-snug block whitespace-normal">{sub.name}</span>
                                                            </motion.button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>

                            {/* Drawer Footer CTA */}
                            <div className="pt-6 border-t border-gray-100 flex justify-center pb-8">
                                <LuxuryBookButton
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setTimeout(() => {
                                            window.location.href = 'tel:+918994442768';
                                        }, 320);
                                    }}
                                />
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
