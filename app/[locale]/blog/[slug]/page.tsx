import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Markdown } from "@/app/components/Markdown";
import { BLOG_POSTS, readingTimeMinutes } from "@/app/lib/blog";
import { getBlogPost } from "@/app/lib/localizedContent";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

const SITE_URL = "https://colorpalettefinder.com";

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = await getBlogPost(locale, slug);
    if (!post) {
        return { title: "Article Not Found — colorPaletteFinder" };
    }
    const path = `/blog/${post.slug}`;
    return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        alternates: { canonical: canonicalFor(locale, path), languages: altLanguages(path) },
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            url: canonicalFor(locale, path),
            siteName: "colorPaletteFinder",
            type: "article",
            publishedTime: post.date,
            authors: ["colorPaletteFinder Team"],
        },
        twitter: { card: "summary_large_image", title: post.metaTitle, description: post.metaDescription },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = await getBlogPost(locale, slug);
    if (!post) {
        notFound();
    }

    const t = await getTranslations("blog");
    const path = `/blog/${post.slug}`;
    const url = canonicalFor(locale, path);
    const wordCount = post.body.trim().split(/\s+/).filter(Boolean).length;
    const dateStr = new Date(post.date).toLocaleDateString(locale, { month: "short", day: "2-digit", year: "numeric" });

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: "colorPaletteFinder Team", url: SITE_URL },
        publisher: {
            "@type": "Organization",
            name: "colorPaletteFinder",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 216, height: 255 },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: { "@type": "ImageObject", url: `${url}/opengraph-image`, width: 1200, height: 630 },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
        wordCount,
        inLanguage: locale,
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: t("homeLabel"), item: canonicalFor(locale, "") },
            { "@type": "ListItem", position: 2, name: t("blogLabel"), item: canonicalFor(locale, "/blog") },
            { "@type": "ListItem", position: 3, name: post.title },
        ],
    };

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-12 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600">{t("homeLabel")}</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/blog" className="hover:text-blue-600">{t("blogLabel")}</Link>
                        <span className="text-gray-300">/</span>
                        <span className="text-gray-700 truncate max-w-[200px]">{post.category}</span>
                    </nav>

                    <span className="inline-flex max-w-max items-center px-2.5 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-100/80 rounded-full border border-blue-200">
                        {post.category}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-medium text-gray-500">
                        <span className="text-gray-700">{t("byline")}</span>
                        <span className="text-gray-300">•</span>
                        <time dateTime={post.date}>{dateStr}</time>
                        <span className="text-gray-300">•</span>
                        <span>{t("minRead", { count: readingTimeMinutes(post.body) })}</span>
                    </div>
                </div>
            </header>

            <article className="px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16 max-w-3xl mx-auto w-full">
                <Markdown body={post.body} />

                {post.faq.length > 0 && (
                    <section className="mt-16" aria-label={t("faqHeading")}>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{t("faqHeading")}</h2>
                        <div className="flex flex-col gap-4">
                            {post.faq.map((item) => (
                                <details key={item.q} className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow">
                                    <summary className="cursor-pointer font-semibold text-gray-900">{item.q}</summary>
                                    <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                <aside className="mt-14 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        cP
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">{t("byline")}</p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-1">
                            {t("authorBio")}{" "}
                            <Link href="/contact" className="text-blue-600 hover:underline">{t("authorBioLink")}</Link>.
                        </p>
                    </div>
                </aside>

                <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t("ctaTitle")}</h3>
                    <p className="text-gray-600 mb-4">{t("ctaText")}</p>
                    <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                        {t("ctaButton")}
                    </Link>
                </div>
            </article>
        </main>
    );
}
