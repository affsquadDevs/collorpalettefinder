import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About colorPaletteFinder — Free Color Palette Tool",
    description: "Learn what colorPaletteFinder is: a free mathematical color palette generator for designers, developers and creatives. See our mission and who it's for.",
    alternates: {
        canonical: "https://colorpalettefinder.com/about",
    },
    openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: "About colorPaletteFinder",
        description: "Learn about the mission behind colorPaletteFinder — the ultimate free color palette generator for professionals.",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">

            {/* Header Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors text-sm border border-blue-100">
                            &larr; Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        About <span className="text-blue-600">colorPaletteFinder</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Our mission is to make professional color theory accessible to everyone. We build simple, mathematically precise tools for designers and developers.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto">

                    <article className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-600">
                        <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">What is colorPaletteFinder?</h2>
                        <p>
                            <strong>colorPaletteFinder</strong> is a free, interactive web application designed to help creators generate harmonious, aesthetically pleasing color palettes instantly. Whether you are building a new brand identity, designing a user interface, or creating digital art, our tool provides the perfect starting point by utilizing classic, mathematically proven color theory rules.
                        </p>
                        <p>
                            Instead of guessing which colors look good together, colorPaletteFinder uses an interactive HSL (Hue, Saturation, Lightness) color wheel to instantly calculate exact matches based on Complementary, Analogous, Triadic, and other professional harmony formulas.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Our Main Goal</h2>
                        <p>
                            Our primary goal is to <strong>bridge the gap between complex color theory and practical digital design</strong>. We believe that choosing the right colors shouldn’t require an advanced degree in art history or expensive proprietary software.
                        </p>
                        <p>
                            We aim to provide a frictionless, educational, and high-quality tool that ensures:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 my-6">
                            <li><strong>Accessibility first:</strong> Built-in WCAG contrast checkers guarantee that the palettes you create are inclusive and legible for all users.</li>
                            <li><strong>Efficiency:</strong> One-click HEX code copying speeds up the workflow for developers adopting Tailwind CSS, plain CSS, or other modern styling frameworks.</li>
                            <li><strong>Education:</strong> By visualizing exactly how harmony rules function on a wheel, users naturally learn the mechanics of color relationships over time.</li>
                        </ul>

                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Who is it for?</h2>
                        <p>
                            colorPaletteFinder was built with the modern web in mind. It serves:
                        </p>
                        <ul className="list-disc pl-6 space-y-3 my-6">
                            <li><strong>UI/UX Designers</strong> sketching wireframes and establishing universal design systems.</li>
                            <li><strong>Frontend Developers</strong> needing quick, accessible color variables for their stylesheets.</li>
                            <li><strong>Digital Marketers &amp; Creators</strong> ensuring brand consistency across campaigns.</li>
                        </ul>
                    </article>

                    {/* CTA */}
                    <div className="mt-20 text-center bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Start generating today</h3>
                        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                            Experience the easiest way to build professional color palettes. No sign-up required.
                        </p>

                        <div className="relative inline-block group">
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition duration-500 animate-rgb blur-md"></div>
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-100 transition duration-500 animate-rgb"></div>
                            <Link
                                href="/color-palette-generator"
                                className="relative inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gray-950 text-white text-[17px] font-semibold transition-transform duration-300 group-hover:scale-[0.98]"
                            >
                                Open the ColorFinder Tool
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
