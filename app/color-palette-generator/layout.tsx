import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Color Palette Generator with Color Wheel & Contrast",
    description:
        "Interactive color palette generator with a color wheel, 7 harmony rules, HSL/RGB values & a WCAG contrast checker. Generate hex schemes free — try it now.",
    alternates: {
        canonical: "https://colorpalettefinder.com/color-palette-generator",
    },
    openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: "Color Palette Generator with Color Wheel & Contrast Checker",
        description:
            "Interactive color palette generator with a color wheel, 7 harmony rules, HSL/RGB values and a WCAG contrast checker. Generate hex schemes free.",
        url: "https://colorpalettefinder.com/color-palette-generator",
        siteName: "colorPaletteFinder",
        type: "website",
        locale: "en_US",
    },
    twitter: {
            images: ["/opengraph-image"],
        card: "summary_large_image",
        title: "Color Palette Generator with Color Wheel & Contrast",
        description:
            "Interactive color palette generator: color wheel, 7 harmony rules, HSL/RGB and a WCAG contrast checker. Free, no signup.",
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

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://colorpalettefinder.com" },
            { "@type": "ListItem", position: 2, name: "Color Palette Generator" },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
