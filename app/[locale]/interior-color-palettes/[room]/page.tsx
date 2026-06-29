import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/app/components/Markdown";
import PaletteCard from "@/app/components/PaletteCard";
import { INTERIOR_ROOM_GUIDES } from "@/app/lib/interiorRooms";
import { getRoomGuideBySlug, getRoomGuides, getInteriorPalettes } from "@/app/lib/localizedContent";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

export function generateStaticParams() {
    return INTERIOR_ROOM_GUIDES.map((g) => ({ room: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; room: string }> }): Promise<Metadata> {
    const { locale, room } = await params;
    const g = await getRoomGuideBySlug(locale, room);
    if (!g) {
        return { title: "Page Not Found — colorPaletteFinder" };
    }
    const path = `/interior-color-palettes/${g.slug}`;
    return {
        title: g.metaTitle,
        description: g.metaDescription,
        keywords: g.keywords,
        alternates: { canonical: canonicalFor(locale, path), languages: altLanguages(path) },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: g.metaTitle,
            description: g.metaDescription,
            url: canonicalFor(locale, path),
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
        twitter: { images: ["/opengraph-image"], card: "summary_large_image", title: g.metaTitle, description: g.metaDescription },
    };
}

export default async function RoomPage({ params }: { params: Promise<{ locale: string; room: string }> }) {
    const { locale, room } = await params;
    setRequestLocale(locale);
    const g = await getRoomGuideBySlug(locale, room);
    if (!g) {
        notFound();
    }

    const t = await getTranslations("interior");
    const allPalettes = await getInteriorPalettes(locale);
    const palettes = allPalettes.filter((p) => p.room === g.room);
    const others = (await getRoomGuides(locale)).filter((r) => r.slug !== g.slug);
    const path = `/interior-color-palettes/${g.slug}`;

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: t("homeLabel"), item: canonicalFor(locale, "") },
            { "@type": "ListItem", position: 2, name: t("pillarLabel"), item: canonicalFor(locale, "/interior-color-palettes") },
            { "@type": "ListItem", position: 3, name: `${g.roomLabel} ${t("schemesSuffix")}`, item: canonicalFor(locale, path) },
        ],
    };

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-14 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600">{t("homeLabel")}</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/interior-color-palettes" className="hover:text-blue-600">{t("pillarLabel")}</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-700">{g.roomLabel}</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        {g.roomLabel} <span className="text-blue-600">{t("schemesSuffix")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {g.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3 justify-center">
                        <Link href="/color-palette-generator" className="inline-flex items-center justify-center bg-gray-900 text-white text-sm font-semibold py-3 px-7 rounded-full transition-all hover:bg-black hover:-translate-y-[1px] active:scale-95">
                            {t("ctaBuild")}
                        </Link>
                    </div>
                </div>
            </header>

            <section className="px-6 sm:px-10 lg:px-16 pt-14 lg:pt-20">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-center">{t("roomPalettesTitle", { room: g.roomLabel })}</h2>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">{t("roomPalettesSub", { room: g.roomLabel })}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {palettes.map((p) => (
                            <PaletteCard key={p.title} title={p.title} style={p.style} colors={p.colors} description={p.description} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pt-16 lg:pt-20">
                <article className="max-w-3xl mx-auto">
                    <Markdown body={g.body} />

                    {g.faq.length > 0 && (
                        <section className="mt-16" aria-label={t("faqHeading")}>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("faqHeading")}</h2>
                            <div className="flex flex-col gap-4">
                                {g.faq.map((item) => (
                                    <details key={item.q} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow">
                                        <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                                        <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("otherRooms")}</h2>
                        <div className="flex flex-wrap gap-3">
                            {others.map((r) => (
                                <Link
                                    key={r.slug}
                                    href={`/interior-color-palettes/${r.slug}`}
                                    className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-700 transition-colors"
                                >
                                    {r.roomLabel}
                                </Link>
                            ))}
                            <Link
                                href="/interior-color-palettes"
                                className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                            >
                                {t("allPalettes")} &rarr;
                            </Link>
                        </div>
                    </section>

                    <div className="mt-14 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t("roomCtaTitle")}</h3>
                        <p className="text-gray-600 mb-4">{t("roomCtaText")}</p>
                        <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                            {t("ctaButton")}
                        </Link>
                    </div>
                </article>
            </section>
        </main>
    );
}
