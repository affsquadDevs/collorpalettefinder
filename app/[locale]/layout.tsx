import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages, getTranslations } from "next-intl/server";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { routing } from "@/i18n/routing";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const SITE_URL = "https://colorpalettefinder.com";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "meta" });

    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
        languages[l] = l === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${l}`;
    }
    languages["x-default"] = SITE_URL;

    const canonical = locale === routing.defaultLocale ? SITE_URL : `${SITE_URL}/${locale}`;

    return {
        metadataBase: new URL(SITE_URL),
        title: { default: t("siteTitle"), template: "%s" },
        description: t("siteDescription"),
        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/favicon.png", type: "image/png" },
            ],
            apple: [{ url: "/apple-touch-icon.png" }],
        },
        alternates: { canonical, languages },
        openGraph: {
            title: t("siteTitle"),
            description: t("siteDescription"),
            url: canonical,
            siteName: "colorPaletteFinder",
            type: "website",
            locale,
        },
        twitter: {
            card: "summary_large_image",
            title: t("siteTitle"),
            description: t("siteDescription"),
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} className={inter.className}>
            <body>
                {/* Google Consent Mode v2 + Google Tag Manager. Consent defaults are set FIRST
                    (non-essential storage denied) so no ad-personalization data is processed
                    before the published Google CMP ("Privacy & messaging") message records a
                    choice. Runs before the page is interactive and before the AdSense loader. */}
                <Script
                    id="consent-and-gtm"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TCGB8Z42');`,
                    }}
                />
                {/* Google AdSense loader — ad serving is gated by the CMP / Consent Mode above. */}
                <Script
                    id="adsbygoogle-loader"
                    async
                    strategy="afterInteractive"
                    crossOrigin="anonymous"
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2980943706375055"
                />
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-TCGB8Z42"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Organization",
                            name: "colorPaletteFinder",
                            url: "https://colorpalettefinder.com",
                            logo: "https://colorpalettefinder.com/logo.png",
                            description:
                                "A free color palette generator and WCAG contrast checker built on color theory, for designers and developers.",
                            contactPoint: {
                                "@type": "ContactPoint",
                                contactType: "customer support",
                                email: "hello@colorpalettefinder.com",
                                url: "https://colorpalettefinder.com/contact",
                            },
                            sameAs: [
                                "https://www.facebook.com/people/Color-Palette-Finder/61587989738551/",
                                "https://www.instagram.com/colorpalettefinder/",
                                "https://www.youtube.com/@ColorPaletteFinder",
                                "https://www.threads.com/@colorpalettefinder",
                            ],
                        }),
                    }}
                />
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    {children}
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
