import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/app/components/Markdown";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "howItWorks" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: canonicalFor(locale, "/how-it-works"), languages: altLanguages("/how-it-works") },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: t("ogTitle"),
            description: t("ogDescription"),
            url: canonicalFor(locale, "/how-it-works"),
            siteName: "colorPaletteFinder",
            type: "article",
            locale,
        },
    };
}

export default async function HowItWorksPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("howItWorks");

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors text-sm border border-blue-100">
                            &larr; {t("backHome")}
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 break-words sm:break-normal">
                        {t("title")} <span className="text-blue-600">{t("titleAccent")}</span> {t("titleEnd")}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        {t("sub")}
                    </p>
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto">
                    <article className="max-w-none">
                        <Markdown body={t("body")} />
                    </article>

                    <div className="mt-20 text-center bg-gray-50 border border-gray-200 rounded-3xl p-10 md:p-14">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t("ctaTitle")}</h3>
                        <p className="text-gray-500 mb-8 max-w-lg mx-auto">{t("ctaText")}</p>
                        <div className="relative inline-block group">
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 transition duration-500 animate-rgb blur-md"></div>
                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-100 transition duration-500 animate-rgb"></div>
                            <Link
                                href="/color-palette-generator"
                                className="relative inline-flex items-center justify-center px-10 py-4 rounded-2xl bg-gray-950 text-white text-[17px] font-semibold transition-transform duration-300 group-hover:scale-[0.98]"
                            >
                                {t("ctaButton")}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
