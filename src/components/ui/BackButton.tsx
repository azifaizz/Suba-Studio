import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show button on all pages except the Home page
        setIsVisible(location.pathname !== '/');
    }, [location.pathname]);

    const handleBack = () => {
        // In React Router v6, window.history.state contains an 'idx' property 
        // that indicates the depth of the navigation within the app.
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            // Fallback to Home if navigated directly
            navigate('/');
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={handleBack}
                    className="fixed top-[88px] md:top-[100px] left-4 md:left-8 z-[80] group flex items-center justify-center gap-1.5 px-3 py-2 md:px-4 md:py-2.5 bg-white/75 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.08)] rounded-full text-gray-800 hover:text-black hover:bg-white/95 transition-all duration-300 touch-target"
                    aria-label="Go back"
                >
                    <ArrowLeft size={16} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-[11px] md:text-[13px] font-sans font-bold uppercase tracking-[0.15em] pt-[1px]">Back</span>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackButton;
