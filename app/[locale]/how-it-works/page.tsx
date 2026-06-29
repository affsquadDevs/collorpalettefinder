import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Use a Color Palette Generator & Color Wheel",
    description: "Learn how to use a color palette generator: pick colors on the color wheel, apply harmony rules, and check WCAG contrast. Step-by-step guide with hex tips.",
    alternates: {
        canonical: "https://colorpalettefinder.com/how-it-works",
    },
    openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: "How to Use a Color Palette Generator & Color Wheel",
        description: "Step-by-step guide to building harmonious, accessible color palettes — using the color wheel, 7 harmony rules, and a WCAG contrast checker.",
        url: "https://colorpalettefinder.com/how-it-works",
        siteName: "colorPaletteFinder",
        type: "article",
    },
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://colorpalettefinder.com" },
        { "@type": "ListItem", position: 2, name: "How It Works" },
    ],
};

export default function HowItWorksPage() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">

            {/* Header Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors text-sm border border-blue-100">
                            &larr; Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 break-words break-all sm:break-normal">
                        How <span className="text-blue-600">colorPaletteFinder</span> Works
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        A complete guide to using our professional color tools. Generate perfect, accessible, and mathematically sound color harmonies in seconds.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto">

                    {/* Intro */}
                    <article className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-600">
                        <p className="lead text-gray-800 font-medium text-xl mb-12">
                            colorPaletteFinder is built on classic color theory principles combined with modern digital design requirements. We’ve designed a seamless interface where you don’t need to manually calculate hues or verify contrast ratios — the tool does the heavy lifting for you.
                        </p>

                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">1. The Interactive Color Wheel</h2>
                        <p>
                            At the core of colorPaletteFinder is the interactive <strong>HSL Color Wheel</strong>. Unlike standard rectangular color pickers, our circular color wheel maps directly to color theory dynamics.
                        </p>
                        <ul className="list-disc pl-6 space-y-3 my-6">
                            <li><strong>Hue (The angle)</strong>: Drag the dot around the outer edge to change the fundamental color family (red, blue, green, etc.).</li>
                            <li><strong>Saturation (Distance from center)</strong>: Drag the dot towards the center to make the color grayish and muted, or towards the edge for maximum vibrancy.</li>
                            <li><strong>Lightness</strong>: Adjusted dynamically to assure that generated harmony colors retain a balanced visual weight.</li>
                        </ul>
                        <p>
                            Move the primary color dot, and watch all the dependent harmony colors instantly adapt in real-time, maintaining their strict mathematical relationships.
                        </p>


                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">2. Choosing a Harmony Rule</h2>
                        <p>
                            Depending on the aesthetic you are trying to achieve, you can select from seven different mathematically proven color harmony rules:
                        </p>

                        <div className="grid gap-6 my-8">
                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Complementary</h3>
                                <p className="text-[17px]">Colors located directly opposite each other on the color wheel (180° apart). Creates maximum contrast and high-impact energy.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Analogous</h3>
                                <p className="text-[17px]">Colors that sit next to each other on the wheel (separated by 30°). This creates a serene and comfortable, natural-looking design.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Triadic</h3>
                                <p className="text-[17px]">Three colors that are equally spaced around the wheel (120° apart). Offers high contrast while retaining better color balance than complementary schemes.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Split-Complementary</h3>
                                <p className="text-[17px]">A base color, plus the two colors adjacent to its complement. Offers the strong visual contrast of the complementary scheme, but requires less tension.</p>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Monochromatic</h3>
                                <p className="text-[17px]">Variations in lightness and saturation of a single hue. Produces a cohesive, clean, and elegant look.</p>
                            </div>
                        </div>


                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">3. WCAG Contrast Checking</h2>
                        <p>
                            Creating a beautiful palette is only half the job; the colors must also be accessible to all users. Specifically, text must be readable against background colors.
                        </p>
                        <p>
                            colorPaletteFinder features a built-in contrast checker at the bottom of the tool. Select any two generated colors (e.g., a background and a text color), and it calculates the contrast ratio.
                        </p>
                        <ul className="list-disc pl-6 space-y-3 my-6">
                            <li><strong>AA Standard</strong>: Requires a contrast ratio of at least <strong>4.5:1</strong> for normal text, and 3:1 for large text.</li>
                            <li><strong>AAA Standard</strong>: The gold standard for accessibility, requiring a ratio of at least <strong>7:1</strong> for normal text.</li>
                        </ul>


                        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">4. Copying and Exporting</h2>
                        <p>
                            Once your perfect palette is generated, integrating it into your project is effortless.
                        </p>
                        <p>
                            Hover over any color swatch in the palette strip to reveal its exact HEX code. Clicking the swatch instantly copies the six-digit HEX code to your clipboard (e.g., <code>#1A2B3C</code>), ready to be pasted directly into CSS, Tailwind configs, Figma, or Adobe Creative Cloud.
                        </p>
                    </article>

                    {/* CTA */}
                    <div className="mt-20 text-center bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Ready to start designing?</h3>
                        <p className="text-gray-500 mb-8 max-w-lg mx-auto">
                            Jump into the tool and generate your first accessible, harmonious color scheme.
                        </p>

                        <div className="relative inline-block group">
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition duration-500 animate-rgb blur-md"></div>
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-100 transition duration-500 animate-rgb"></div>
                            <Link
                                href="/color-palette-generator"
                                className="relative inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gray-950 text-white text-[17px] font-semibold transition-transform duration-300 group-hover:scale-[0.98]"
                            >
                                Launch colorPaletteFinder Toolbar
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            </main>
        </>
    );
}
