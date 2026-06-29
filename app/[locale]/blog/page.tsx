import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { readingTimeMinutes } from "@/app/lib/blog";
import { getBlogPosts } from "@/app/lib/localizedContent";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "blog" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: canonicalFor(locale, "/blog"), languages: altLanguages("/blog") },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: t("metaTitle"),
            description: t("metaDescription"),
            url: canonicalFor(locale, "/blog"),
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
        twitter: { images: ["/opengraph-image"], card: "summary_large_image", title: t("metaTitle"), description: t("metaDescription") },
    };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("blog");
    const posts = (await getBlogPosts(locale)).slice().sort((a, b) => b.date.localeCompare(a.date));

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans">
            <section className="px-6 sm:px-10 lg:px-16 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        {t("heroTitle")} <span className="text-blue-600">{t("heroAccent")}</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        {t("heroSub")}
                    </p>
                </div>
            </section>

            <section className="px-6 sm:px-10 lg:px-16 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {posts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-white rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <span className="inline-flex max-w-max items-center px-2.5 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-100/80 rounded-full border border-blue-200">
                                    {post.category}
                                </span>
                                <h2 className="text-xl md:text-2xl font-bold bg-gray-900 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 mb-3">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-1">
                                    {post.description}
                                </p>
                                <div className="flex items-center text-sm font-medium text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                    <time dateTime={post.date}>
                                        {new Date(post.date).toLocaleDateString(locale, { month: "short", day: "2-digit", year: "numeric" })}
                                    </time>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{t("minRead", { count: readingTimeMinutes(post.body) })}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
