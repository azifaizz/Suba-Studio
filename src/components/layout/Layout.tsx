import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import BackButton from '../ui/BackButton';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <BackButton />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
