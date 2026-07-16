import React from 'react';
import { LuxuryBookButton } from "@/components/ui/luxury-book-button";

const Contact = () => {
    return (
        <div className="pt-24 min-h-screen bg-white text-black">
            <div className="max-w-4xl mx-auto px-6">

                {/* Heading */}
                <h1 className="text-5xl font-bold mb-6">
                    BOOK US NOW
                </h1>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-8 max-w-2xl">
                    Your dream day starts here. Tell us the details, and we’ll handle 
                    the magic. Get in touch with us and let us make your special 
                    day an event of your lifetime using our digital eye.
                </p>
                <div className="mb-12">
                    <LuxuryBookButton onClick={() => window.location.href = 'tel:+918994442768'} />
                </div>

                {/* Call Us Section */}
                <div className="border-t pt-8">
                    <h2 className="text-2xl font-semibold mb-4">
                        Call Us
                    </h2>

                    <a
                        href="tel:+918994442768"
                        className="text-3xl font-bold hover:text-zg-blue transition-colors duration-300"
                    >
                        +91 89944 42768
                    </a>

                    <p className="text-gray-500 mt-2">
                        Mon - Sat, 9am - 6pm
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Contact;
