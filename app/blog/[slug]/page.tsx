import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data array for the blog posts list
const BLOG_POSTS = [
    {
        slug: "understanding-color-harmony",
        title: "Understanding Color Harmony in UI Design",
        content: "Color harmony is the visual balance of colors that makes an image or design pleasing to the eye. It works by combining colors based on their relationship on the color wheel. This includes complementary, analogous, triadic, and more.",
        date: "Dec 01, 2024",
        readTime: "5 min read",
        category: "Color Theory",
    },
    {
        slug: "wcag-contrast-ratios-explained",
        title: "WCAG Contrast Ratios Explained",
        content: "WCAG (Web Content Accessibility Guidelines) requires contrast ratios to ensure that text and interactive elements are readable. For normal text, a contrast ratio of at least 4.5:1 is required, and for large text, 3:1.",
        date: "Nov 15, 2024",
        readTime: "6 min read",
        category: "Accessibility",
    },
    {
        slug: "psychology-of-color-branding",
        title: "The Psychology of Color in Branding",
        content: "The psychology of color explores how colors influence human behavior and decision-making. Brands use blue to convey trust, red for excitement and appetite, and green for health and peace.",
        date: "Nov 02, 2024",
        readTime: "8 min read",
        category: "Branding",
    },
    {
        slug: "design-system-color-tokens",
        title: "Creating Scalable Color Tokens for Design Systems",
        content: "Color tokens abstract raw color values into semantic variables, making it easier to maintain consistency across a large application. A typical approach involves defining primitive colors (e.g., blue-500) and semantic tokens (e.g., color-primary).",
        date: "Oct 20, 2024",
        readTime: "10 min read",
        category: "UI Design",
    },
    {
        slug: "dark-mode-color-palettes",
        title: "Best Practices for Dark Mode Color Palettes",
        content: "Designing for dark mode requires more than just inverting the background and foreground colors. Use desaturated colors to reduce eye strain, ensure sufficient contrast against dark gray backgrounds instead of pure black, and test your text legibility.",
        date: "Oct 05, 2024",
        readTime: "7 min read",
        category: "UI Design",
    },
    {
        slug: "split-complementary-vs-triadic",
        title: "Split-Complementary vs Triadic Palettes",
        content: "Split-complementary uses a base color and the two colors adjacent to its complement, offering high contrast with less tension. Triadic uses three colors evenly spaced on the wheel, providing a vibrant but balanced scheme. Which one you use depends on the mood you want to evoke.",
        date: "Sep 22, 2024",
        readTime: "4 min read",
        category: "Color Theory",
    },
];

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_POSTS.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            {/* Header Section */}
            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-12 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="inline-block text-blue-600 font-medium mb-6 hover:underline">
                        &larr; Back to Blog
                    </Link>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
                        {post.title}
                    </h1>
                </div>
            </header>

            {/* Article Content */}
            <article className="px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16 max-w-3xl mx-auto w-full prose prose-lg prose-blue">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {post.content}
                </p>
                <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Want to experiment with colors?</h3>
                    <p className="text-gray-600 mb-4">Try our free color palette generator tool to find your perfect harmony.</p>
                    <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                        Open Tool
                    </Link>
                </div>
            </article>
        </main>
    );
}
