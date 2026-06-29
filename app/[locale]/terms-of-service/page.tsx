import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Markdown } from "@/app/components/Markdown";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

const LAST_UPDATED = "2026-06-01";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "terms" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: canonicalFor(locale, "/terms-of-service"), languages: altLanguages("/terms-of-service") },
    };
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("terms");
    const updated = new Date(LAST_UPDATED).toLocaleDateString(locale, { month: "long", day: "numeric", year: "numeric" });

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 break-words sm:break-normal">
                        {t("title")} <span className="text-blue-600">{t("titleAccent")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        {t("lastUpdatedLabel")} {updated}
                    </p>
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto">
                    <p className="text-gray-900 font-medium text-xl mb-10 leading-relaxed">{t("intro")}</p>
                    <article className="max-w-none">
                        <Markdown body={t("body")} />
                    </article>
                </div>
            </section>
        </main>
    );
}
