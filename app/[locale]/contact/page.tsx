import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "contact" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: canonicalFor(locale, "/contact"), languages: altLanguages("/contact") },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: t("ogTitle"),
            description: t("ogDescription"),
            url: canonicalFor(locale, "/contact"),
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
    };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("contact");

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors text-sm border border-blue-100">
                            &larr; {t("backHome")}
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        {t("title")} <span className="text-blue-600">{t("titleAccent")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        {t("sub")}
                    </p>
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-white p-10 md:p-14 rounded-3xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("heading")}</h2>
                        <p className="text-gray-600 mb-10 text-lg">{t("body")}</p>

                        <div className="inline-block bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <span className="block text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">{t("contactLabel")}</span>
                            <a
                                href={`mailto:${t("email")}`}
                                className="text-2xl md:text-4xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors break-all"
                            >
                                {t("email")}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
