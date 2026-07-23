
export interface VideoItem {
    id: number;
    title: string;
    subtitle?: string;
    location?: string;
    date?: string;
    description?: string;
    url: string;
}

export interface CategoryContent {
    title: string;
    tagline: string;
    description: string;
    whyChooseTitle: string;
    whyChooseText: string;
    heroImage: string;
    collageImages?: string[];
    albums: { id: number; title: string; image: string }[];
    videoList?: VideoItem[];
}

export const categoryData: Record<string, CategoryContent> = {
    "outdoor": {
        title: "Best Outdoor Wedding Photography",
        tagline: "In the arms of nature, love finds its truest expression.",
        description: "Imagine a magical wedding… under the warm glow of the setting sun, surrounded by breathtaking scenery. Now, witness your love story, as the birds sing their blessings. Yes, outdoor weddings offer a beautiful ceremonial stage that enhances the romance and joy of your special day. We understand the significance of these timeless traditions and the importance of preserving them for future generations.",
        whyChooseTitle: "Why choose our service for your outdoor wedding photography?",
        whyChooseText: "A keen eye for detail is what our skilled photographers are adept at; every natural element will be captured to create images that evoke emotion and tell your unique love story. We ensure that every picture of your love story is beautifully documented, understanding your vision, desired theme and aesthetics.",
        heroImage: "/landscape.png",
        albums: [
            { id: 1, title: "Reshma R.R + Gowri Shanker G", image: "/landscape.png" },
            { id: 2, title: "Sushma + Praveen", image: "/portrait.png" },
            { id: 3, title: "M.Subasri + S.Arun Kumar", image: "/landscape.png" },
        ]
    },
    "christian": {
        title: "Best Christian Wedding Photography",
        tagline: "Faith, hope and echoes of eternal blessings.",
        description: "The beauty of Christian weddings extends beyond the ceremony with its moments of profound connection, devotion, and hope. As rings are exchanged, the solace and strength in God’s loving grace is found. Your shared faith and the genuine expressions of love should be cherished forever.",
        whyChooseTitle: "Why choose our service for your christian wedding photography?",
        whyChooseText: "From the quiet anticipation before the vows to the joyous celebration at the reception, we capture every nuance of your special day. Our photographers understand the solemnity of the church ceremony and the exuberance of the party that follows, ensuring a perfect blend of candid and traditional shots.",
        heroImage: "/Christian/4Z5A8807.JPG",
        collageImages: ["/Christian/4Z5A8754.JPG", "/Christian/4Z5A8747.JPG", "/Christian/4Z5A8732.JPG"],
        albums: [
            { id: 1, title: "", image: "/Christian/4Z5A8729.JPG" },
            { id: 2, title: "", image: "/Christian/4Z5A8752.JPG" },
            { id: 3, title: "", image: "/Christian/4Z5A8733.JPG" },
            { id: 4, title: "", image: "/Christian/4Z5A8776.JPG" },
            { id: 5, title: "", image: "/Christian/4Z5A8768.JPG" },
            { id: 6, title: "", image: "/Christian/4Z5A8297.JPG" },
            { id: 7, title: "", image: "/Christian/4Z5A8307.JPG" },
            { id: 8, title: "", image: "/Christian/4Z5A8321.JPG" },
            { id: 9, title: "", image: "/Christian/4Z5A8479.JPG" },
            { id: 10, title: "", image: "/Christian/4Z5A8531.JPG" },
            { id: 11, title: "", image: "/Christian/4Z5A8557.JPG" },
        ]
    },


    "hindu": {
        title: "Best Hindu Wedding Photography",
        tagline: "Timeless rituals, eternal love.",
        description: "Hindu weddings are a beautiful amalgamation of Vedic rituals and modern celebrations. The Saptapadi, the Kanyadaan, and the Sindoor Daan are moments of deep spiritual significance. We document these timeless traditions with a modern artistic touch.",
        whyChooseTitle: "Why choose our service for your Hindu wedding photography?",
        whyChooseText: "We combine documentary-style photography with artistic portraiture to create a comprehensive narrative of your wedding days. Our photographers are experts at capturing the intricate details of the mandap, the emotions of the vidaai, and the joy of the baraat.",
        heroImage: "/hindu/11.jpg",
        collageImages: ["/hindu/4.jpg", "/hindu/2.jpg", "/hindu/1.png"],
        albums: [
            { id: 1, title: "", image: "/hindu/1.png" },
            { id: 2, title: "", image: "/hindu/2.jpg" },
            { id: 3, title: "", image: "/hindu/3.jpg" },
            { id: 4, title: "", image: "/hindu/4.jpg" },
            { id: 5, title: "", image: "/hindu/5.jpg" },
            { id: 6, title: "", image: "/hindu/6.jpg" },
            { id: 7, title: "", image: "/hindu/7.jpg" },
            { id: 8, title: "", image: "/hindu/8.jpg" },
            { id: 9, title: "", image: "/hindu/9.jpg" },
            { id: 10, title: "", image: "/hindu/10.jpg" },
            { id: 11, title: "", image: "/hindu/11.jpg" },
            { id: 12, title: "", image: "/hindu/12.jpg" },
            { id: 13, title: "", image: "/hindu/13.jpg" },
            { id: 14, title: "", image: "/hindu/14.jpg" },
            { id: 15, title: "", image: "/hindu/15.jpg" },
            { id: 16, title: "", image: "/hindu/16.jpg" },
            { id: 17, title: "", image: "/hindu/17.jpg" },
            { id: 18, title: "", image: "/hindu/18.jpg" },
            { id: 19, title: "", image: "/hindu/19.jpg" },
            { id: 20, title: "", image: "/hindu/20.jpg" },
            { id: 21, title: "", image: "/hindu/21.jpg" },
        ]
    },
    "engagement": {
        title: "Best Engagement Photography",
        tagline: "The beginning of a beautiful forever.",
        description: "Engagements are the first step towards a lifelong commitment. We capture the excitement, the love, and the joy of this special milestone. From intimate close-ups of the ring to candid moments of celebration, we preserve every detail of your engagement.",
        whyChooseTitle: "Why choose our service for your engagement photography?",
        whyChooseText: "We specialize in capturing the raw emotions and genuine connections that make your engagement unique. Our photographers create a relaxed and comfortable environment, allowing your natural love story to unfold beautifully before the lens.",
        heroImage: "/engagement/4Z5A4700.jpg",
        collageImages: ["/engagement/1.JPG", "/engagement/4Z5A2046.JPG", "/engagement/4Z5A2060.JPG"],
        albums: [
            { id: 1, title: "", image: "/engagement/2.jpg" },
            { id: 2, title: "", image: "/engagement/4Z5A4696.jpg" },
            { id: 3, title: "", image: "/engagement/039.jpg" },
            { id: 4, title: "", image: "/engagement/040.jpg" },
        ]
    },
    "bridal-portraits": {
        title: "Bridal Portraits",
        tagline: "Elegance, grace, and the glow of a bride.",
        description: "A bride on her wedding day is a vision of beauty. We focus on capturing the intricacies of her attire, the details of her jewelry, and the emotions that play on her face. Our bridal portraits are artistic, timeless, and designed to make you look your absolute best.",
        whyChooseTitle: "Why choose us for your bridal portraits?",
        whyChooseText: "We know how to make you feel comfortable in front of the camera, guiding you through poses that highlight your best features. We play with light and shadow to create dramatic, editorial-style images that belong in a magazine.",
        heroImage: "/Bridal/14.JPG",
        collageImages: [
            "/Bridal/16.jpg", // Hero Image
            "/Bridal/19.jpg", // Supporting Portrait
            "/Bridal/8.JPG",  // Detail Image
            "/Bridal/18.JPG", // Supporting Landscape
            "/Bridal/4.JPG",  // Portrait Accent
            "/Bridal/10.JPG"  // Detail Portrait
        ],
        albums: [
            { id: 1, title: "", image: "/Bridal/1.jpg" },
            { id: 2, title: "", image: "/Bridal/2.jpg" },
            { id: 3, title: "", image: "/Bridal/3.jpg" },
            { id: 4, title: "", image: "/Bridal/5.JPG" },
            { id: 5, title: "", image: "/Bridal/15.JPG" },
            { id: 6, title: "", image: "/Bridal/20.jpg" }
        ]
    },
    "couple-portraits": {
        title: "Couple Portraits",
        tagline: "Two souls, one beautiful story.",
        description: "The connection between a couple is the heart of any wedding. We create intimate, romantic, and fun portraits that reflect your unique chemistry. Whether it's a stolen glance or a hearty laugh, we capture it all.",
        whyChooseTitle: "Why choose us for your couple portraits?",
        whyChooseText: "We move beyond stiff poses to capture genuine interactions. Our goal is to create images that feel natural and unforced, allowing your love to shine through.",
        heroImage: "/couple_portrait/b2.JPG",
        collageImages: ["/couple_portrait/pp2.jpg", "/couple_portrait/pp3.jpg", "/couple_portrait/pp4.jpg"],
        albums: [
            { id: 1, title: "", image: "/couple_portrait/b1.JPG" },
            { id: 2, title: "", image: "/couple_portrait/b3.JPG" },
            { id: 3, title: "", image: "/couple_portrait/b4.JPG" },
            { id: 4, title: "", image: "/couple_portrait/b6.JPG" },
            { id: 5, title: "", image: "/couple_portrait/b7.JPG" },
            { id: 6, title: "", image: "/couple_portrait/b8.jpg" },
            { id: 7, title: "", image: "/couple_portrait/b9.jpg" },
            { id: 8, title: "", image: "/couple_portrait/b10.JPG" },
            { id: 9, title: "", image: "/couple_portrait/b2.JPG" },
            { id: 10, title: "", image: "/couple_portrait/b11.JPG" },
            { id: 11, title: "", image: "/couple_portrait/b12.JPG" },
            { id: 12, title: "", image: "/couple_portrait/b14.JPG" },
            { id: 13, title: "", image: "/couple_portrait/b15.JPG" },
        ]
    },
    "groom-portraits": {
        title: "Groom Portraits",
        tagline: "Style, swagger, and sophistication.",
        description: "Why should brides have all the fun? We ensure the groom gets his moment in the spotlight too. From getting ready shots to stylish solo portraits, we capture the groom's personality and style.",
        whyChooseTitle: "Expert Groom Photography",
        whyChooseText: "We bring a fashion-forward approach to groom photography, ensuring you look sharp, confident, and dashing on your big day.",
        heroImage: "/groom/7.JPG",
        collageImages: ["/groom/2.JPG", "/groom/3.JPG", "/groom/4.JPG"],
        albums: [
            { id: 1, title: "", image: "/groom/5.JPG" },
            { id: 2, title: "", image: "/groom/6.JPG" },
            { id: 3, title: "", image: "/groom/1.JPG" },
            { id: 4, title: "", image: "/groom/8.JPG" },
            { id: 5, title: "", image: "/groom/9.JPG" },
            { id: 6, title: "", image: "/groom/10.JPG" },
            { id: 7, title: "", image: "/groom/11.JPG" },
            { id: 8, title: "", image: "/groom/12.JPG" },
            { id: 9, title: "", image: "/groom/13.jpg" },
        ]
    },
    "candid-moments": {
        title: "Candid Moments",
        tagline: "Unscripted joy, captured forever.",
        description: "The best photos are often the ones you didn't know were being taken. We have a knack for being in the right place at the right time to capture the raw, unfiltered emotions of your wedding day.",
        whyChooseTitle: "Masters of Candid Photography",
        whyChooseText: "Our discreet approach allows us to document your day without intruding. We capture the laughter, the tears, and the crazy dance moves in their purest form.",
        heroImage: "/landscape.png",
        albums: [
            { id: 1, title: "Laughter & Tears", image: "/landscape.png" },
            { id: 2, title: "Dance Floor Action", image: "/landscape.png" },
        ]
    },
    "jewellery": {
        title: "Jewellery Photography",
        tagline: "Sparkle, shine, and intricate details.",
        description: "Indian weddings are known for their exquisite jewellery. We take the time to capture the details of your heritage pieces, ensuring they are documented with the same care and attention as the rest of your wedding.",
        whyChooseTitle: "Detail-Oriented Photography",
        whyChooseText: "We use macro lenses and creative lighting to highlight the craftsmanship and beauty of your wedding jewellery.",
        heroImage: "/portrait.png",
        albums: [
            { id: 1, title: "Heirloom Pieces", image: "/portrait.png" },
            { id: 2, title: "Modern Bling", image: "/portfolio_fashion.png" },
        ]
    },
    "rituals": {
        title: "Wedding Rituals",
        tagline: "The sacred traditions that bind us.",
        description: "From the fire ceremony to the exchange of garlands, rituals are the soul of an Indian wedding. We document these sacred moments with respect and artistry, preserving the cultural significance of your union.",
        whyChooseTitle: "respectful Documentation",
        whyChooseText: "We understand the importance of each ritual and ensure we are in the perfect position to capture it without disrupting the ceremony.",
        heroImage: "/Rituals/r4.JPG",
        collageImages: ["/Rituals/r2.JPG", "/Rituals/r3.JPG", "/Rituals/r4.JPG"],
        albums: [
            { id: 1, title: "", image: "/Rituals/r1.JPG" },
            { id: 2, title: "", image: "/Rituals/r2.JPG" },
            { id: 3, title: "", image: "/Rituals/r3.JPG" },
            { id: 4, title: "", image: "/Rituals/r4.JPG" },
            { id: 5, title: "", image: "/Rituals/r5.JPG" },
        ]
    },
    "pre-wedding": {
        title: "Best Pre-wedding Photography",
        tagline: "The beginning of your beautiful story.",
        description: "Pre-wedding shoots are a wonderful way to tell your love story in a more casual and creative setting. We capture the chemistry and connection between you two before the big day, creating memories that last a lifetime.",
        whyChooseTitle: "Why choose our pre-wedding photography?",
        whyChooseText: "We focus on natural interactions and beautiful locations to create sets of photos that reflect your personalities. Our team ensures a relaxed atmosphere where your love can truly shine through.",
        heroImage: "/prewed/01.jpg",
        collageImages: ["/prewed/02.jpg", "/prewed/03.jpg", "/prewed/04.jpg", "/prewed/05.jpg"],
        albums: [
            { id: 1, title: "", image: "/prewed/01.jpg" },
            { id: 2, title: "", image: "/prewed/02.jpg" },
            { id: 3, title: "", image: "/prewed/03.jpg" },
            { id: 4, title: "", image: "/prewed/04.jpg" },
            { id: 5, title: "", image: "/prewed/05.jpg" },
            { id: 6, title: "", image: "/prewed/06.jpg" },
            { id: 7, title: "", image: "/prewed/07 copy.jpg" },
            { id: 8, title: "", image: "/prewed/08 copy.jpg" },
            { id: 9, title: "", image: "/prewed/09.jpg" },
            { id: 10, title: "", image: "/prewed/4Z5A3631 copy.jpg" },
            { id: 11, title: "", image: "/prewed/4Z5A3670.JPG" },
        ]
    },
    "post-wedding": {
        title: "Best Post-wedding Photography",
        tagline: "Capturing the afterglow of your union.",
        description: "Post-wedding shoots allow for a more relaxed session without the time constraints of the wedding day. We can visit beautiful locations and capture stunning portraits of you as a newly married couple.",
        whyChooseTitle: "Why choose our post-wedding photography?",
        whyChooseText: "Without the wedding day jitters, we can focus on creating more artistic and diverse shots. We work with you to find the perfect backdrop for your first official portraits as husband and wife.",
        heroImage: "/postwed/p4.JPG",
        collageImages: [
            "/postwed/p1.JPG",
            "/postwed/p3.JPG",
            "/postwed/p2.JPG"
        ],
        albums: [
            { id: 1, title: "", image: "/postwed/p1.JPG" },
            { id: 2, title: "", image: "/postwed/p2.JPG" },
            { id: 3, title: "", image: "/postwed/p3.JPG" },
            { id: 4, title: "", image: "/postwed/p4.JPG" },
            { id: 5, title: "", image: "/postwed/p5.JPG" },
            { id: 6, title: "", image: "/postwed/p6.JPG" },
            { id: 7, title: "", image: "/postwed/p7.JPG" },
            { id: 8, title: "", image: "/postwed/p8.JPG" },
            { id: 9, title: "", image: "/postwed/p9.JPG" },
            { id: 10, title: "", image: "/postwed/p10.JPG" },
            { id: 11, title: "", image: "/postwed/p12.png" }
        ]
    },
    "maternity": {
        title: "Best Maternity Photography",
        tagline: "Celebrating the miracle of life.",
        description: "Capturing the beautiful journey of motherhood with grace and elegance. Our maternity shoots are designed to highlight the glow and joy of expecting mothers in a comfortable and artistic setting.",
        whyChooseTitle: "Why choose our maternity photography?",
        whyChooseText: "We specialize in creating timeless portraits that celebrate the bond between mother and child even before they meet. Our experienced photographers know how to use lighting and posing to make every mother feel beautiful and comfortable.",
        heroImage: "/Maternity/heroimg.jpg",
        collageImages: ["/Maternity/m17.jpg", "/Maternity/m1.jpg", "/Maternity/m16.jpg", "/Maternity/m24.jpg", "/Maternity/m28.jpg"],
        albums: [
            { id: 1, title: "", image: "/Maternity/m2.jpg" },
            { id: 2, title: "", image: "/Maternity/m3.jpg" },
            { id: 3, title: "", image: "/Maternity/m4.jpg" },
            { id: 4, title: "", image: "/Maternity/m5.jpg" },
            { id: 5, title: "", image: "/Maternity/m6.jpg" },
            { id: 6, title: "", image: "/Maternity/m7.jpg" },
            { id: 7, title: "", image: "/Maternity/m8.jpg" },
            { id: 8, title: "", image: "/Maternity/m9.jpg" },
            { id: 9, title: "", image: "/Maternity/m12.jpg" },
            { id: 10, title: "", image: "/Maternity/m13.jpg" },
            { id: 11, title: "", image: "/Maternity/m14.jpg" },
            { id: 12, title: "", image: "/Maternity/m15.jpg" },
            { id: 13, title: "", image: "/Maternity/m18.jpg" },
            { id: 14, title: "", image: "/Maternity/m19.jpg" },
            { id: 15, title: "", image: "/Maternity/m20.jpg" },
            { id: 16, title: "", image: "/Maternity/m21.jpg" },
            { id: 17, title: "", image: "/Maternity/m22.jpg" },
            { id: 18, title: "", image: "/Maternity/m23.jpg" },
            { id: 19, title: "", image: "/Maternity/m25.jpg" },
            { id: 20, title: "", image: "/Maternity/m26.jpg" },
            { id: 21, title: "", image: "/Maternity/m27.jpg" },
        ]
    },
    "baby": {
        title: "Best Baby Photography",
        tagline: "Tiny hands, tiny feet, big memories.",
        description: "From newborns to toddlers, we capture the pure innocence and joy of your little ones. Our baby photography sessions are patient, fun, and designed to preserve the fleeting moments of childhood.",
        whyChooseTitle: "Why choose our baby photography?",
        whyChooseText: "We create a safe and playful environment for your babies, allowing their natural personalities to shine through. Our goal is to capture the milestones and expressions that you will treasure forever.",
        heroImage: "/Baby/bby.jpg",
        collageImages: ["/Baby/toddler.jpg"],
        albums: [
            { id: 1, title: "", image: "/Baby/20.jpg" },
            { id: 2, title: "", image: "/Baby/30.jpg" },
            { id: 3, title: "", image: "/Baby/40.jpg" },
            { id: 4, title: "", image: "/Baby/50.jpg" },
            { id: 5, title: "", image: "/Baby/60.jpg" },
            { id: 6, title: "", image: "/Baby/70.jpg" },
            { id: 7, title: "", image: "/Baby/80.jpg" },
            { id: 8, title: "", image: "/Baby/90.jpg" },
            { id: 9, title: "", image: "/Baby/100.jpg" },
            { id: 10, title: "", image: "/Baby/101.jpg" },
        ]
    },
    "candid": {
        title: "Candid Wedding Films",
        tagline: "Every glance, every smile, captured in its purest form.",
        description: "Experience your wedding day through our cinematic lens. Our candid films focus on the unscripted moments, the laughter, the tears, and the genuine connections that make your story unique. We tell your story just as it happened, preserving the essence of your most precious day.",
        whyChooseTitle: "Why choose our candid wedding films?",
        whyChooseText: "We specialize in cinematic storytelling that goes beyond traditional videography. Our team uses state-of-the-art equipment and creative editing techniques to create films that are emotionally resonant and visually stunning.",
        heroImage: "/4Z5A4700.jpg",
        albums: [],
        videoList: [
            {
                id: 1,
                title: "A Love Like This",
                subtitle: "An epic celebration of love set against the stunning backdrop of Chennai. A story of two souls becoming one.",
                location: "Chennai, India",
                date: "Dec 2024",
                url: "/Bs.mp4"
            },
            {
                id: 2,
                title: "The Vows",
                subtitle: "Sneha & Arjun",
                location: "Kerala",
                url: "/Ma.mp4"
            },
            {
                id: 3,
                title: "Under The Stars",
                subtitle: "Priya & Vikram",
                location: "Bangalore",
                url: "/Mk.mp4"
            },
            {
                id: 4,
                title: "Eternal Promise",
                subtitle: "Divya & Karthik",
                location: "Coimbatore",
                url: "/Aa.mp4"
            },
            {
                id: 5,
                title: "Midnight Joy",
                subtitle: "Aisha & Rohan",
                location: "Goa",
                url: "/Ss.mp4"
            },
            {
                id: 6,
                title: "Sunlit Whispers",
                location: "Ooty",
                url: "/Od.mp4"
            },
            {
                id: 7,
                title: "A New Beginning",
                location: "Chennai",
                url: "/Bby.mp4"
            },
            {
                id: 8,
                title: "The Grand Affair",
                subtitle: "A luxury celebration spanning three days of joy, color, and tradition.",
                location: "Udaipur",
                date: "Oct 2024",
                url: "/Mk1.mp4"
            }
        ]
    },
    "outdoor-video": {
        title: "Outdoor Wedding Films",
        tagline: "Nature's beauty meets your eternal bond.",
        description: "Capture the romance of your outdoor wedding in stunning cinematic detail. From sun-drenched ceremonies to twilight celebrations, we document every moment against the beautiful backdrop of nature.",
        whyChooseTitle: "Expert Outdoor Cinematography",
        whyChooseText: "We are experts at working with natural light and outdoor environments. Our team ensures that your outdoor wedding film is perfectly exposed and beautifully framed.",
        heroImage: "/landscape.png",
        albums: [],
        videoList: [
            { id: 1, title: "The Grand Affair", url: "/Mk1.mp4" },
            { id: 2, title: "Eternal Promise", url: "/Aa.mp4" },
            { id: 3, title: "Midnight Joy", url: "/Ss.mp4" }
        ]
    },
    "short-stories-video": {
        title: "Short Stories",
        tagline: "Every fleeting second, a lifetime of memories.",
        description: "Our short stories are high-impact, emotional highlights of your special day. We distill the absolute best moments into a cinematic experience that lets you relive the magic in just a few minutes.",
        whyChooseTitle: "Professional Cinematic Storytelling",
        whyChooseText: "We focus on the narrative arc of your day, ensuring every cut, transition, and musical choice enhances the emotional journey of your wedding story.",
        heroImage: "/suba.jpg",
        albums: [],
        videoList: [
            { id: 1, title: "A Day in the Sun", url: "/Od.mp4" },
            { id: 2, title: "Baby Shower Joy", url: "/Bby.mp4" }
        ]
    }
};

export const defaultContent: CategoryContent = {
    title: "Premium Photography Services",
    tagline: "Capturing your most cherished moments.",
    description: "At Suba Studios, we believe in telling your story through our lens. Whether it's a wedding, a pre-wedding shoot, or a special event, we bring our artistic vision and technical expertise to create stunning visuals that you will treasure forever.",
    whyChooseTitle: "Why Choose Suba Studios?",
    whyChooseText: "With over a decade of experience and a passion for storytelling, we are the preferred choice for couples who want nothing but the best. Our team of expert photographers and cinematographers work tirelessly to ensure every frame is a masterpiece.",
    heroImage: "/landscape.png",
    albums: [
        { id: 1, title: "Latest Wedding Collection", image: "/portfolio_wedding.png" },
        { id: 2, title: "Cinematic Highlights", image: "/landscape.png" },
        { id: 3, title: "Portrait Session", image: "/portrait.png" },
    ]
};
