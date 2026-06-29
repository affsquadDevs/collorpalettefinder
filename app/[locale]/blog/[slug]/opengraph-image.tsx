import { ImageResponse } from "next/og";
import { BLOG_POSTS } from "@/app/lib/blog";
import { getBlogPost } from "@/app/lib/localizedContent";

// Per-article 1200x630 Open Graph image (shows the post title), generated at build time.
export const alt = "colorPaletteFinder article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
    return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

const PALETTE = ["#FF7B54", "#FFB26B", "#FFD56F", "#5B5EA6", "#0096C7", "#2D6A4F"];

export default async function Image({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    const post = await getBlogPost(locale, slug);
    const title = post?.title ?? "Color Theory Blog";
    const category = (post?.category ?? "colorPaletteFinder").toUpperCase();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "0 90px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: 26,
                            color: "#2563eb",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            marginBottom: 28,
                        }}
                    >
                        {category}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: title.length > 48 ? 56 : 66,
                            fontWeight: 800,
                            color: "#111827",
                            lineHeight: 1.12,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {title}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", padding: "0 90px 34px" }}>
                    <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#111827" }}>
                        colorPalette<span style={{ color: "#2563eb" }}>Finder</span>
                    </div>
                </div>
                <div style={{ display: "flex", height: 22 }}>
                    {PALETTE.map((c) => (
                        <div key={c} style={{ flex: 1, background: c }} />
                    ))}
                </div>
            </div>
        ),
        { ...size },
    );
}
