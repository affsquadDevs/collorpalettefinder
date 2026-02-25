import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Color Palette Generator Tool — colorPaletteFinder",
    description:
        "Generate harmonious color palettes using an interactive color wheel. Choose from 7 harmony rules: complementary, analogous, triadic, split-complementary, tetradic, square, monochromatic. Free online tool.",
    alternates: {
        canonical: "https://colorpalettefinder.com/color-palette-generator",
    },
    openGraph: {
        title: "Free Color Palette Generator Tool — colorPaletteFinder",
        description:
            "Generate harmonious color palettes using an interactive color wheel. 7 harmony rules, contrast checker, instant hex copy.",
        url: "https://colorpalettefinder.com/color-palette-generator",
        siteName: "colorPaletteFinder",
        type: "website",
        locale: "en_US",
        images: [
            {
                url: "/og/og-image.png",
                width: 1200,
                height: 630,
                alt: "colorPaletteFinder — Free Color Palette Generator Tool",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Free Color Palette Generator Tool — colorPaletteFinder",
        description:
            "Generate harmonious color palettes with 7 harmony rules. Free online tool for designers and developers.",
        images: ["/og/og-image.png"],
    },
};

export default function ToolLayout({ children }: { children: React.ReactNode }) {
    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "colorPaletteFinder — Color Palette Generator",
        description:
            "Generate harmonious color palettes using an interactive color wheel. Choose from 7 harmony rules: complementary, analogous, triadic, split-complementary, tetradic, square, and monochromatic.",
        url: "https://colorpalettefinder.com/color-palette-generator",
        applicationCategory: "DesignApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        featureList:
            "Interactive Color Wheel, 7 Harmony Rules, Contrast Checker (WCAG AA/AAA), Instant Hex Copy, HSL & RGB Values, All Palettes View",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            {children}
        </>
    );
}
