import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://colorpalettefinder.com"),
  title: "colorPaletteFinder — Free Color Palette Generator",
  description: "Generate harmonious color palettes using color theory — complementary, analogous, triadic, and more. Free tool for designers and developers.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
  },
  openGraph: {
    title: "colorPaletteFinder — Free Color Palette Generator",
    description: "Generate harmonious color palettes using color theory — complementary, analogous, triadic, and more. Free tool for designers and developers.",
    url: "https://colorpalettefinder.com",
    siteName: "colorPaletteFinder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "colorPaletteFinder — Free Color Palette Generator",
    description: "Generate harmonious color palettes using color theory — complementary, analogous, triadic, and more. Free tool for designers and developers.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
