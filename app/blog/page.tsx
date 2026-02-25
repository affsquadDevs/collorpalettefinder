import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://colorpalettefinder.com";

export const metadata: Metadata = {
    title: "Color Theory Blog — colorPaletteFinder",
    description:
        "Read our latest articles on color theory, UI design, color harmony rules, and accessibility.",
    alternates: {
        canonical: `${SITE_URL}/blog`,
    },
    openGraph: {
        title: "Color Theory Blog — colorPaletteFinder",
        description:
            "Read our latest articles on color theory, UI design, color harmony rules, and accessibility.",
        url: `${SITE_URL}/blog`,
        siteName: "colorPaletteFinder",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/og/og-image.png",
                width: 1200,
                height: 630,
                alt: "colorPaletteFinder — Color Theory Blog",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Color Theory Blog — colorPaletteFinder",
        description:
            "Read our latest articles on color theory, UI design, color harmony rules, and accessibility.",
        images: ["/og/og-image.png"],
    },
};

// Mock data array for the blog posts list
const BLOG_POSTS = [
    {
        slug: "understanding-color-harmony",
        title: "Understanding Color Harmony in UI Design",
        description: "Learn how to use complementary, analogous, and triadic colors effectively to build stunning interfaces that convert.",
        date: "Dec 01, 2024",
        readTime: "5 min read",
        category: "Color Theory",
    },
    {
        slug: "wcag-contrast-ratios-explained",
        title: "WCAG Contrast Ratios Explained",
        description: "A practical guide to understanding accessibility standards for text and UI elements. Make your products usable for everyone.",
        date: "Nov 15, 2024",
        readTime: "6 min read",
        category: "Accessibility",
    },
    {
        slug: "psychology-of-color-branding",
        title: "The Psychology of Color in Branding",
        description: "Why do tech companies love blue? Why is fast food always red and yellow? Discover the hidden meaning behind brand palettes.",
        date: "Nov 02, 2024",
        readTime: "8 min read",
        category: "Branding",
    },
    {
        slug: "design-system-color-tokens",
        title: "Creating Scalable Color Tokens for Design Systems",
        description: "Learn how to structure primary, secondary, semantic, and neutral color scales for large-scale web applications.",
        date: "Oct 20, 2024",
        readTime: "10 min read",
        category: "UI Design",
    },
    {
        slug: "dark-mode-color-palettes",
        title: "Best Practices for Dark Mode Color Palettes",
        description: "Designing for dark mode isn't just inverting colors. Here is how to pick the right desaturated hues to reduce eye strain.",
        date: "Oct 05, 2024",
        readTime: "7 min read",
        category: "UI Design",
    },
    {
        slug: "split-complementary-vs-triadic",
        title: "Split-Complementary vs Triadic Palettes",
        description: "Two popular rules for engaging designs. Find out which one to use for your next creative project.",
        date: "Sep 22, 2024",
        readTime: "4 min read",
        category: "Color Theory",
    },
];

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
                        {BLOG_POSTS.map((post) => (
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
                                    <time dateTime={post.date}>{post.date}</time>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

        </main>
    );
}
