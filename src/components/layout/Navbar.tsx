import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuxuryBookButton } from '@/components/ui/luxury-book-button';
import { Menu, X, Camera, ChevronDown, ArrowLeft } from 'lucide-react';
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
        ]
    },
    {
        name: "VIDEOS",
        path: "/videos",
        noDropdown: true,
        subMenu: []
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

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

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

    // During the cinematic logo animation, force the navbar to behave perfectly as if it's at the top of the Home page
    const forceHomeTop = isHomeClickAnimating;
    const isSplitLayout = forceHomeTop || (isHome && !isScrolled);
    const isNavbarScrolled = !forceHomeTop && (isScrolled || !isHome);

    const handleHomeClick = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setIsMobileMenuOpen(false);

        if (location.pathname === '/') {
            return;
        }
        
        if (isHomeClickAnimating) return;

        // Execute state updates together immediately
        navigate('/');
        setIsHomeClickAnimating(true);

        setTimeout(() => {
            let animationsCompleted = 0;
            const checkCompletion = () => {
                animationsCompleted++;
                if (animationsCompleted >= (window.innerWidth < 1024 ? 1 : 1)) {
                    setIsHomeClickAnimating(false);
                }
            };

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
                        onComplete: checkCompletion
                    }
                );
            } else {
                setIsHomeClickAnimating(false);
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
                        onComplete: checkCompletion
                    }
                );
            }
        }, 50);
    };

    const handleNavClick = (path: string) => {
        setIsMobileMenuOpen(false);
        // Smoothly close the drawer first, then execute navigation
        const wasMobileMenuOpen = isMobileMenuOpen;
        
        const performNavigation = () => {
            if (path === '/') {
                handleHomeClick();
            } else {
                navigate(path);
            }
        };

        if (wasMobileMenuOpen) {
            // Wait for drawer to close only on mobile
            setTimeout(performNavigation, 320);
        } else {
            // Execute immediately on desktop
            performNavigation();
        }
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

    const renderDesktopNavItem = (item: typeof navData[0]) => {
        const isLeftItem = leftNavItems.some(nav => nav.name === item.name);
        const active = isItemActive(item.path);

        return (
        <motion.div
            key={item.name}
            layout={!isHomeClickAnimating}
            layoutId={isLeftItem && !isHomeClickAnimating ? `desktop-nav-item-${item.name}` : undefined}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative group px-1.5 xl:px-2.5 py-1 hover:z-[60]"
            onMouseEnter={() => !item.noDropdown && setActiveSubMenu(item.name)}
            onMouseLeave={() => setActiveSubMenu(null)}
        >
            <button
                className={`relative flex items-center gap-1 transition-all duration-300 uppercase font-serif font-medium tracking-[0.12em] text-[12px] xl:text-[13px] py-0.5 ${
                    active
                        ? (isNavbarScrolled ? 'text-zg-blue font-semibold' : 'text-white font-semibold')
                        : (isNavbarScrolled ? 'text-gray-900 hover:text-[#D4AF37]' : 'text-white/95 hover:text-[#D4AF37]')
                }`}
                onClick={() => item.noDropdown ? handleNavClick(item.path) : undefined}
            >
                {item.name}
                {!item.noDropdown && (
                    <ChevronDown size={11} className={`transition-transform duration-300 text-current ${activeSubMenu === item.name ? 'rotate-180' : ''}`} />
                )}

                {/* Luxury Gold/Blue Animated Underline Reveal */}
                <span className={`absolute -bottom-1 left-0 h-[1.5px] rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isNavbarScrolled ? 'bg-zg-blue' : 'bg-[#D4AF37]'
                } ${
                    active ? 'w-full opacity-100 shadow-[0_0_6px_rgba(212,175,55,0.5)]' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
                }`} />
            </button>

            {/* Desktop Dropdown Drawer */}
            {!item.noDropdown && item.subMenu.length > 0 && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                    <div className="bg-white text-gray-900 shadow-[0_16px_40px_rgba(0,0,0,0.12)] rounded-[14px] overflow-hidden border border-gray-200/90 backdrop-blur-2xl p-1.5 xl:p-2 flex flex-col gap-0.5 min-w-[220px] xl:min-w-[240px]">
                        {item.subMenu.map((sub) => (
                            <button
                                key={sub.name}
                                onClick={() => handleNavClick(sub.path)}
                                className="w-full transition-all duration-300 flex items-center justify-between text-left px-2.5 py-1.5 rounded-[8px] hover:bg-gray-50 group/sub relative overflow-hidden"
                            >
                                {/* Gold Indicator Accent Bar on Hover */}
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-0 group-hover/sub:h-4 bg-[#D4AF37] transition-all duration-300 rounded-r-full shadow-sm" />

                                <span className="font-serif font-medium text-[11px] xl:text-[12px] text-gray-900 group-hover/sub:text-[#D4AF37] group-hover/sub:translate-x-1 transition-all duration-300 tracking-[0.05em] uppercase whitespace-nowrap">
                                    {sub.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </motion.div>
        );
    };

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-[100] transition-all duration-400 ease-out ${
                    isNavbarScrolled
                        ? 'bg-white/95 backdrop-blur-md shadow-sm py-1.5 border-b border-gray-100/50 text-black'
                        : 'bg-transparent py-2.5 sm:py-3 text-white'
                }`}
            >
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between relative h-10 md:h-12 [padding-left:max(16px,env(safe-area-inset-left))] [padding-right:max(16px,env(safe-area-inset-right))]">
                    
                    {/* Left Section (Desktop Split vs Scrolled Logo Slot) */}
                    <div className={`hidden lg:flex items-center justify-start z-40 ${isSplitLayout ? 'flex-1' : 'shrink-0'}`}>
                        {!isHome && (
                            <button
                                onClick={handleBack}
                                className={`mr-2 group flex items-center justify-center p-2 rounded-full transition-all duration-300 active:scale-95 touch-target ${
                                    isNavbarScrolled
                                        ? 'text-gray-600 hover:text-black hover:bg-gray-100/80' 
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                                aria-label="Go back"
                            >
                                <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                            </button>
                        )}
                        {isSplitLayout ? (
                            <div className="flex items-center gap-0.5 xl:gap-1.5">
                                {leftNavItems.map(renderDesktopNavItem)}
                            </div>
                        ) : isHomeClickAnimating ? null : (
                            <motion.div
                                layout
                                layoutId="cinematic-brand-logo"
                                transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
                                onClick={() => handleHomeClick()}
                                className="cursor-pointer select-none py-1 flex items-center shrink-0"
                            >
                                <span className={`font-serif font-black tracking-[0.15em] xl:tracking-[0.22em] text-lg xl:text-xl uppercase transition-colors duration-300 whitespace-nowrap ${
                                    isNavbarScrolled ? 'text-black' : 'text-white'
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
                                className="pointer-events-auto cursor-pointer select-none py-1 flex items-center justify-center"
                            >
                                <span className="font-serif font-black tracking-[0.15em] xl:tracking-[0.24em] text-lg lg:text-xl xl:text-2xl uppercase text-white transition-colors duration-300 whitespace-nowrap">
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
                                className="pointer-events-auto cursor-pointer select-none py-1 flex items-center justify-center"
                            >
                                <span className={`font-serif font-black tracking-[0.15em] xl:tracking-[0.24em] text-lg lg:text-xl xl:text-2xl uppercase transition-colors duration-300 whitespace-nowrap ${
                                    isNavbarScrolled ? 'text-black' : 'text-white'
                                }`}>
                                    SUBA STUDIOS
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Mobile & Tablet Dedicated Continuous Logo (< 1024px / lg:hidden) */}
                    <div className="flex items-center justify-start z-40 shrink-0 lg:hidden">
                        {!isHome && (
                            <button
                                onClick={handleBack}
                                className={`mr-1 -ml-1 group flex items-center justify-center p-2 rounded-full transition-all duration-300 active:scale-95 touch-target ${
                                    isNavbarScrolled || isMobileMenuOpen
                                        ? 'text-gray-600 hover:text-black hover:bg-gray-100/80' 
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                }`}
                                aria-label="Go back"
                            >
                                <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform duration-300" />
                            </button>
                        )}
                        <motion.div
                            ref={logoMobRef}
                            onClick={() => handleHomeClick()}
                            animate={{
                                x: isSplitLayout && isHome ? mobCenterDelta : 0,
                                scale: isSplitLayout && isHome ? 1 : 0.88,
                            }}
                            transition={{
                                duration: 0.42,
                                ease: [0.19, 1, 0.22, 1], // GSAP power4.out equivalent
                            }}
                            className="cursor-pointer select-none py-1 flex items-center origin-left shrink-0"
                        >
                            <span className={`font-serif font-black tracking-[0.16em] sm:tracking-[0.20em] md:tracking-[0.24em] text-sm sm:text-base md:text-lg uppercase transition-colors duration-300 whitespace-nowrap ${
                                isNavbarScrolled || isMobileMenuOpen ? 'text-black' : 'text-white'
                            }`}>
                                SUBA STUDIOS
                            </span>
                        </motion.div>
                    </div>

                    {/* Right Section: Nav links on desktop, Hamburger button always visible on right */}
                    <div className={`flex items-center justify-end z-50 ${isSplitLayout ? 'flex-1' : 'shrink-0 ml-auto'} gap-1 sm:gap-1.5`}>
                        {!isSplitLayout && (
                            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
                                {leftNavItems.map(renderDesktopNavItem)}
                            </div>
                        )}
                        
                        <div className="hidden lg:flex items-center gap-0.5 xl:gap-1.5">
                            {rightNavItems.map(renderDesktopNavItem)}
                        </div>

                        {/* CTA Button (Desktop only) */}
                        <motion.div layout transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="hidden lg:block pl-1">
                            <LuxuryBookButton onClick={() => window.location.href = 'tel:+918994442768'} />
                        </motion.div>

                        {/* Mobile Menu Toggle Button: Toggles menu open and close */}
                        <button
                            type="button"
                            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            className={`lg:hidden z-[70] shrink-0 flex items-center justify-center w-10 h-10 touch-target rounded-full transition-all duration-300 active:scale-95 ${
                                isMobileMenuOpen
                                    ? 'text-black bg-gray-100 hover:bg-gray-200 shadow-sm'
                                    : (isNavbarScrolled ? 'text-black hover:bg-gray-100/80' : 'text-white hover:bg-white/10')
                            }`}
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        >
                            {isMobileMenuOpen ? (
                                <X size={22} className="shrink-0" strokeWidth={2.5} />
                            ) : (
                                <Menu size={22} className="shrink-0" strokeWidth={2.2} />
                            )}
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
                            className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-[340px] bg-white text-black shadow-[0_0_80px_rgba(0,0,0,0.35)] z-[60] lg:hidden overflow-y-auto flex flex-col justify-between [padding-left:max(20px,env(safe-area-inset-left))] [padding-right:max(20px,env(safe-area-inset-right))] safe-pt"
                        >
                            {/* Drawer Header (Logo + Close X Button) */}
                            <div className="pt-5 sm:pt-6 pb-3 px-4 sm:px-5 flex items-center justify-between border-b border-gray-100/80 shrink-0">
                                <span className="font-serif font-black tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-900 select-none">
                                    SUBA STUDIOS
                                </span>
                                <button
                                    type="button"
                                    aria-label="Close navigation drawer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-10 h-10 touch-target rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition-all active:scale-90 shrink-0 shadow-sm"
                                >
                                    <X size={18} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Accordion Navigation Items */}
                            <div className="flex flex-col gap-1 py-4 px-3 sm:px-4 my-auto">
                                {navData.map((item) => (
                                    <div key={item.name} className="flex flex-col w-full">
                                        
                                        {/* Main Item Header Button */}
                                        <button
                                            type="button"
                                            className={`w-full min-h-[44px] sm:min-h-[48px] px-3 py-2.5 rounded-lg text-base sm:text-lg font-serif font-bold flex items-center justify-between transition-all text-left active:bg-gray-100/70 select-none ${
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
