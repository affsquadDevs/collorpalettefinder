import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPost, readingTimeLabel, formatDate } from "@/app/lib/blog";

const SITE_URL = "https://colorpalettefinder.com";
const AUTHOR_NAME = "colorPaletteFinder Team";

export function generateStaticParams() {
    return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPost(slug);
    if (!post) {
        return { title: "Article Not Found — colorPaletteFinder" };
    }
    const url = `${SITE_URL}/blog/${post.slug}`;
    return {
        title: post.metaTitle,
        description: post.metaDescription,
        keywords: post.keywords,
        alternates: { canonical: url },
        openGraph: {
            title: post.metaTitle,
            description: post.metaDescription,
            url,
            siteName: "colorPaletteFinder",
            type: "article",
            publishedTime: post.date,
            authors: [AUTHOR_NAME],
        },
        twitter: {
            card: "summary_large_image",
            title: post.metaTitle,
            description: post.metaDescription,
        },
    };
}

// Inline formatting: **bold**, *italic*, `code`, and [text](url) links.
function renderInline(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(?<![*\w])\*(?!\*)([^*\n]+?)\*(?![*\w])|`([^`]+)`/g;
    let last = 0;
    let k = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) out.push(text.slice(last, m.index));
        if (m[1] !== undefined) {
            const label = m[1];
            const url = m[2];
            if (/^https?:\/\//.test(url)) {
                out.push(<a key={k++} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{label}</a>);
            } else {
                out.push(<Link key={k++} href={url} className="text-blue-600 hover:underline">{label}</Link>);
            }
        } else if (m[3] !== undefined) {
            out.push(<strong key={k++} className="font-semibold text-gray-900">{m[3]}</strong>);
        } else if (m[4] !== undefined) {
            out.push(<em key={k++}>{m[4]}</em>);
        } else if (m[5] !== undefined) {
            out.push(<code key={k++} className="text-[0.9em] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono">{m[5]}</code>);
        }
        last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

// Block renderer: "## "/"### " headings, "- " bullet lists, paragraphs. Blocks split on blank lines.
function renderBody(body: string) {
    const blocks = body.trim().split(/\n\s*\n/);
    return blocks.map((raw, i) => {
        const block = raw.trim();
        if (block.startsWith("### ")) {
            return (
                <h3 key={i} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">
                    {block.slice(4)}
                </h3>
            );
        }
        if (block.startsWith("## ")) {
            return (
                <h2 key={i} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">
                    {block.slice(3)}
                </h2>
            );
        }
        const lines = block.split("\n");
        if (lines.every((l) => l.trim().startsWith("- "))) {
            return (
                <ul key={i} className="list-disc pl-6 space-y-2 my-5 text-gray-700">
                    {lines.map((l, j) => (
                        <li key={j} className="leading-relaxed">{renderInline(l.trim().slice(2))}</li>
                    ))}
                </ul>
            );
        }
        return (
            <p key={i} className="text-[17px] md:text-lg text-gray-700 leading-relaxed mb-5">
                {renderInline(block.replace(/\n/g, " "))}
            </p>
        );
    });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPost(slug);

    if (!post) {
        notFound();
    }

    const url = `${SITE_URL}/blog/${post.slug}`;
    const wordCount = post.body.trim().split(/\s+/).filter(Boolean).length;

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Organization", name: AUTHOR_NAME, url: SITE_URL },
        publisher: {
            "@type": "Organization",
            name: "colorPaletteFinder",
            logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 216, height: 255 },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: { "@type": "ImageObject", url: `${SITE_URL}/blog/${post.slug}/opengraph-image`, width: 1200, height: 630 },
        keywords: post.keywords.join(", "),
        articleSection: post.category,
        wordCount,
        inLanguage: "en-US",
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
            { "@type": "ListItem", position: 3, name: post.title },
        ],
    };

    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-24">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            {/* Header Section */}
            <header className="px-6 sm:px-10 lg:px-16 pt-12 pb-12 lg:pb-16 text-center border-b border-gray-200 bg-white">
                <div className="max-w-3xl mx-auto">
                    {/* Visible breadcrumb trail (matches BreadcrumbList schema) */}
                    <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-6">
                        <Link href="/" className="hover:text-blue-600">Home</Link>
                        <span className="text-gray-300">/</span>
                        <Link href="/blog" className="hover:text-blue-600">Blog</Link>
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
                        <span className="text-gray-700">By the {AUTHOR_NAME}</span>
                        <span className="text-gray-300">•</span>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="text-gray-300">•</span>
                        <span>{readingTimeLabel(post.body)}</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="px-6 sm:px-10 lg:px-16 pt-12 lg:pt-16 max-w-3xl mx-auto w-full">
                {renderBody(post.body)}

                {/* FAQ */}
                {post.faq.length > 0 && (
                    <section className="mt-16" aria-label="Frequently asked questions">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
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

                {/* Author / editorial note (E-E-A-T) */}
                <aside className="mt-14 flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        cP
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">By the {AUTHOR_NAME}</p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-1">
                            We are designers and developers who build colorPaletteFinder and write about color theory,
                            UI design, and web accessibility from hands-on experience. Have feedback on this article?{" "}
                            <Link href="/contact" className="text-blue-600 hover:underline">Get in touch</Link>.
                        </p>
                    </div>
                </aside>

                {/* CTA */}
                <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-xl text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Want to experiment with colors?</h3>
                    <p className="text-gray-600 mb-4">Try our free color palette generator to find your perfect harmony — with a built-in WCAG contrast checker.</p>
                    <Link href="/color-palette-generator" className="inline-block bg-blue-600 text-white font-medium px-6 py-2.5 rounded-lg hover:bg-blue-700 transition">
                        Open the Generator
                    </Link>
                </div>
            </article>
        </main>
    );
}
