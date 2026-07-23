import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { WhatsAppButton } from '../ui/WhatsAppButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default Layout;
