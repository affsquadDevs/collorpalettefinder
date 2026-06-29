import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS, readingTimeLabel, formatDate } from "../lib/blog";

const SITE_URL = "https://colorpalettefinder.com";

export const metadata: Metadata = {
    title: "Color Theory Blog — Design, Harmony & Accessibility",
    description:
        "Color theory blog with articles on color harmony, palettes, accessibility and UI design. Practical color and design tips for developers and designers.",
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: "Color Theory Blog — Design, Harmony & Accessibility",
        description:
            "Color theory blog with articles on color harmony, palettes, accessibility and UI design. Practical color and design tips for developers and designers.",
        url: `${SITE_URL}/blog`,
        siteName: "colorPaletteFinder",
        type: "website",
        locale: "en_US",
    },
    twitter: {
            images: ["/opengraph-image"],
        card: "summary_large_image",
        title: "Color Theory Blog — Design, Harmony & Accessibility",
        description:
            "Color theory blog with articles on color harmony, palettes, accessibility and UI design. Practical color and design tips for developers and designers.",
    },
};

export default function BlogPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans">

            {/* Blog Hero Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-20 pb-16 lg:pt-28 lg:pb-24 text-center">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        Color Theory <span className="text-blue-600">Blog</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        Articles and guides about color theory, UI design, color harmony rules, and web accessibility.
                    </p>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="px-6 sm:px-10 lg:px-16 pb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {[...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col bg-white rounded-2xl p-6 md:p-8 border border-gray-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Category Badge */}
                                <span className="inline-flex max-w-max items-center px-2.5 py-1 mb-4 text-xs font-semibold text-blue-700 bg-blue-100/80 rounded-full border border-blue-200">
                                    {post.category}
                                </span>

                                {/* Title */}
                                <h2 className="text-xl md:text-2xl font-bold bg-gray-900 bg-clip-text text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 mb-3">
                                    {post.title}
                                </h2>

                                {/* Description */}
                                <p className="text-gray-600 text-[15px] leading-relaxed mb-6 flex-1">
                                    {post.description}
                                </p>

                                {/* Footer Metadata */}
                                <div className="flex items-center text-sm font-medium text-gray-500 mt-auto pt-4 border-t border-gray-100">
                                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{readingTimeLabel(post.body)}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
