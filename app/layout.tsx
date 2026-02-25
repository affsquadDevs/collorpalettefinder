import type { Metadata } from "next";
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
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "colorPaletteFinder — Free Color Palette Generator",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "colorPaletteFinder — Free Color Palette Generator",
    description: "Generate harmonious color palettes using color theory — complementary, analogous, triadic, and more. Free tool for designers and developers.",
    images: ["/og/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TCGB8Z42');`,
          }}
        />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2980943706375055" crossOrigin="anonymous"></script>
      </head>
      <body>
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
              logo: "https://colorpalettefinder.com/logo.svg",
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
