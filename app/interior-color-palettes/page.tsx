import type { Metadata } from "next";
import Link from "next/link";
import { Markdown } from "../components/Markdown";
import PaletteCard from "../components/PaletteCard";
import { INTERIOR_PALETTES, INTERIOR_ROOMS } from "../lib/interiorPalettes";
import { INTERIOR_HUB } from "../lib/interiorContent";

const SITE_URL = "https://colorpalettefinder.com";
const PAGE_URL = `${SITE_URL}/interior-color-palettes`;

export const metadata: Metadata = {
    title: INTERIOR_HUB.metaTitle,
    description: INTERIOR_HUB.metaDescription,
    keywords: INTERIOR_HUB.keywords,
    alternates: { canonical: PAGE_URL },
    openGraph: {
        images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: INTERIOR_HUB.metaTitle,
        description: INTERIOR_HUB.metaDescription,
        url: PAGE_URL,
        siteName: "colorPaletteFinder",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        images: ["/opengraph-image"],
        card: "summary_large_image",
        title: INTERIOR_HUB.metaTitle,
        description: INTERIOR_HUB.metaDescription,
    },
};

export default function InteriorColorPalettesPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Interior Color Palettes", item: PAGE_URL },
        ],
    };

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Hero */}
            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-14 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-700">Interior Color Palettes</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        Interior Color Palettes &amp; <span className="text-blue-600">Room Color Schemes</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {INTERIOR_HUB.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                        <Link
                            href="/color-palette-generator"
                            className="inline-flex items-center justify-center bg-gray-900 text-white text-sm font-semibold py-3 px-7 rounded-full transition-all hover:bg-black hover:-translate-y-[1px] active:scale-95"
                        >
                            Build your own in the generator
                        </Link>
                    </div>
                </div>
            </header>

            {/* Palettes by room */}
            <section className="px-6 sm:px-10 lg:px-16 pt-14 lg:pt-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-center">
                        Curated palettes, room by room
                    </h2>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">
                        Livable, harmonious schemes to start from. Click any swatch to copy its hex code.
                    </p>

                    {INTERIOR_ROOMS.map((room) => {
                        const palettes = INTERIOR_PALETTES.filter((p) => p.room === room);
                        if (palettes.length === 0) return null;
                        return (
                            <div key={room} className="mb-16 last:mb-0">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">{room}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {palettes.map((p) => (
                                        <PaletteCard
                                            key={p.title}
                                            title={p.title}
                                            style={p.style}
                                            colors={p.colors}
                                            description={p.description}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Editorial guide */}
            <section className="px-6 sm:px-10 lg:px-16 pt-16 lg:pt-20">
                <article className="max-w-3xl mx-auto">
                    <Markdown body={INTERIOR_HUB.body} />

                    {/* FAQ */}
                    {INTERIOR_HUB.faq.length > 0 && (
                        <section className="mt-16" aria-label="Frequently asked questions">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
                            <div className="flex flex-col gap-4">
                                {INTERIOR_HUB.faq.map((item) => (
                                    <details key={item.q} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow">
                                        <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                                        <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* CTA */}
                    <div className="mt-14 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to build your room palette?</h3>
                        <p className="text-gray-600 mb-4">Sample a color from your floor, rug, or a piece you love, then generate a harmonious scheme around it — with a built-in contrast check.</p>
                        <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                            Open the Generator
                        </Link>
                    </div>
                </article>
            </section>
        </main>
    );
}
