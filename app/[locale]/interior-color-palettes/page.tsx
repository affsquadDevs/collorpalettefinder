import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/app/components/Markdown";
import PaletteCard from "@/app/components/PaletteCard";
import { getInteriorHub, getInteriorPalettes, getRoomGuides } from "@/app/lib/localizedContent";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

const PATH = "/interior-color-palettes";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const hub = await getInteriorHub(locale);
    return {
        title: hub.metaTitle,
        description: hub.metaDescription,
        keywords: hub.keywords,
        alternates: { canonical: canonicalFor(locale, PATH), languages: altLanguages(PATH) },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: hub.metaTitle,
            description: hub.metaDescription,
            url: canonicalFor(locale, PATH),
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
        twitter: { images: ["/opengraph-image"], card: "summary_large_image", title: hub.metaTitle, description: hub.metaDescription },
    };
}

export default async function InteriorColorPalettesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("interior");
    const hub = await getInteriorHub(locale);
    const palettes = await getInteriorPalettes(locale);
    const rooms = await getRoomGuides(locale);

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: t("homeLabel"), item: canonicalFor(locale, "") },
            { "@type": "ListItem", position: 2, name: t("pillarLabel"), item: canonicalFor(locale, PATH) },
        ],
    };

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-14 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600">{t("homeLabel")}</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-700">{t("pillarLabel")}</span>
                    </nav>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        {t("pillarTitle")} <span className="text-blue-600">{t("pillarTitleAccent")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {hub.description}
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
                    <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2 text-center">{t("curatedTitle")}</h2>
                    <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12">{t("curatedSub")}</p>

                    {rooms.map((guide) => {
                        const roomPalettes = palettes.filter((p) => p.room === guide.room).slice(0, 3);
                        if (roomPalettes.length === 0) return null;
                        return (
                            <div key={guide.slug} className="mb-16 last:mb-0">
                                <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">{guide.roomLabel}</h3>
                                    <Link href={`/interior-color-palettes/${guide.slug}`} className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700">
                                        {t("moreRoom", { room: guide.roomLabel })} &rarr;
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                    {roomPalettes.map((p) => (
                                        <PaletteCard key={p.title} title={p.title} style={p.style} colors={p.colors} description={p.description} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pt-16 lg:pt-20">
                <article className="max-w-3xl mx-auto">
                    <Markdown body={hub.body} />

                    {hub.faq.length > 0 && (
                        <section className="mt-16" aria-label={t("faqHeading")}>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("faqHeading")}</h2>
                            <div className="flex flex-col gap-4">
                                {hub.faq.map((item) => (
                                    <details key={item.q} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow">
                                        <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                                        <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    <div className="mt-14 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{t("pillarCtaTitle")}</h3>
                        <p className="text-gray-600 mb-4">{t("pillarCtaText")}</p>
                        <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                            {t("ctaButton")}
                        </Link>
                    </div>
                </article>
            </section>
        </main>
    );
}
