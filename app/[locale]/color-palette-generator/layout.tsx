import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { altLanguages, canonicalFor } from "@/app/lib/hreflang";

const PATH = "/color-palette-generator";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "tool" });
    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: { canonical: canonicalFor(locale, PATH), languages: altLanguages(PATH) },
        openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
            title: t("metaTitle"),
            description: t("ogDescription"),
            url: canonicalFor(locale, PATH),
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
        twitter: {
            images: ["/opengraph-image"],
            card: "summary_large_image",
            title: t("metaTitle"),
            description: t("twitterDescription"),
        },
    };
}

export default async function ToolLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("tool");
    const url = canonicalFor(locale, PATH);

    const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "colorPaletteFinder — Color Palette Generator",
        description: t("metaDescription"),
        url,
        applicationCategory: "DesignApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        inLanguage: locale,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList:
            "Interactive Color Wheel, 7 Harmony Rules, Contrast Checker (WCAG AA/AAA), Instant Hex Copy, HSL & RGB Values, All Palettes View",
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: canonicalFor(locale, "") },
            { "@type": "ListItem", position: 2, name: t("metaTitle"), item: url },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            {children}
        </>
    );
}
