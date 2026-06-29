import type { Metadata } from "next";
import Link from "next/link";

const SITE_URL = "https://colorpalettefinder.com";

export const metadata: Metadata = {
  title: "Free Color Palette Generator — Hex Color Schemes Online",
  description:
    "Free color palette generator built on color theory. Create complementary, analogous & triadic schemes with hex codes instantly — no signup. Start now.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Free Color Palette Generator — Hex Color Schemes Online",
    description:
      "Free color palette generator built on color theory. Create complementary, analogous & triadic color schemes with hex codes instantly — no signup.",
    url: SITE_URL,
    siteName: "colorPaletteFinder",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Color Palette Generator — Hex Color Schemes Online",
    description:
      "Free color palette generator built on color theory. Complementary, analogous & triadic hex schemes, instantly. No signup.",
  },
};

const FAQ = [
  {
    q: "What is a color palette?",
    a: "A color palette is a curated set of colors intended to work together harmoniously. Designers use palettes to create visual consistency in interfaces, branding, and artwork.",
  },
  {
    q: "How does color harmony work?",
    a: "Color harmony is based on the relationships between hues on the color wheel. Rules like complementary, analogous, and triadic ensure combinations are visually pleasing.",
  },
  {
    q: "What is the difference between complementary and split-complementary?",
    a: "Complementary uses two opposite hues for maximum contrast. Split-complementary uses the base color plus two colors ±30° from the direct complement — softer and less harsh.",
  },
  {
    q: "How do I use colorPaletteFinder?",
    a: "Open the tool, pick your primary color using the color wheel or hex input, then choose a harmony rule. The tool instantly generates a matching palette you can copy with one click.",
  },
  {
    q: "What is WCAG contrast and why does it matter?",
    a: "WCAG defines contrast ratios to ensure text is readable for all users, including those with visual impairments. A ratio of 4.5:1 meets AA standard; 7:1 meets AAA.",
  },
  {
    q: "Can I copy the hex codes from the generated palette?",
    a: "Yes — hover over any color swatch in the palette strip and click to instantly copy its hex code to your clipboard.",
  },
];

const FEATURES = [
  {
    icon: "◉",
    title: "Interactive Color Wheel",
    desc: "Drag dots directly on the HSL wheel to explore hue and saturation relationships in real time.",
  },
  {
    icon: "◈",
    title: "7 Harmony Rules",
    desc: "Complementary, Analogous, Triadic, Split-Complementary, Tetradic, Square, Monochromatic.",
  },
  {
    icon: "⊡",
    title: "Instant Copy",
    desc: "Click any swatch to copy the hex code. Share palettes and use them directly in your code.",
  },
  {
    icon: "◑",
    title: "Contrast Checker",
    desc: "Check WCAG AA / AAA accessibility ratios between any two colors in your palette.",
  },
  {
    icon: "⬡",
    title: "HSL & RGB Values",
    desc: "Every color shows its full HSL and RGB breakdown — no manual conversion needed.",
  },
  {
    icon: "▦",
    title: "All Palettes at Once",
    desc: "Compare all 7 harmony schemes for your base color in a scannable grid at the bottom of the tool.",
  },
];

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "colorPaletteFinder",
    url: SITE_URL,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans">

        {/* HERO */}
        <section className="px-6 sm:px-10 lg:px-16 pt-10 pb-10 lg:pt-12 lg:pb-12 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

            {/* Left Column: Text & CTA */}
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] leading-[1.1] font-extrabold tracking-tight mb-8">
                <span className="block text-gray-900">Find Your Perfect</span>
                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
                  Color Palette
                </span>
              </h1>

              <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-500 mb-10 leading-relaxed">
                Instantly generate harmonious palettes using proven color theory rules.
                Built for designers, developers, and creatives.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/color-palette-generator"
                  className="inline-flex items-center justify-center bg-gray-900 text-white text-base font-semibold py-3.5 px-8 rounded-full transition-all duration-200 hover:bg-black hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] hover:-translate-y-[1px] active:scale-95"
                >
                  Open the Generator
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center justify-center text-base font-semibold py-3.5 px-8 rounded-full border border-gray-300 text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-900"
                >
                  How it works
                </Link>
              </div>

            </div>

            {/* Right Column: Animated Colorful Cards */}
            <div className="hidden lg:flex flex-1 justify-center items-center w-full min-h-[350px] md:min-h-[450px] relative mt-10 lg:mt-0 lg:pr-10">
              <Link href="/color-palette-generator" aria-label="Open the color palette generator" className="relative flex items-center justify-center w-full h-full">
                {[
                  { color: 'bg-rose-500', rotate: '-24deg', delay: '0s', offset: '-120px' },
                  { color: 'bg-orange-400', rotate: '-12deg', delay: '0.2s', offset: '-60px' },
                  { color: 'bg-yellow-400', rotate: '0deg', delay: '0.4s', offset: '0px' },
                  { color: 'bg-emerald-400', rotate: '12deg', delay: '0.6s', offset: '60px' },
                  { color: 'bg-blue-500', rotate: '24deg', delay: '0.8s', offset: '120px' },
                ].map((s, i) => (
                  <div
                    key={i}
                    className={`group absolute w-24 h-40 sm:w-32 sm:h-52 md:w-36 md:h-60 lg:w-40 lg:h-64 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border-[4px] md:border-[6px] lg:border-[8px] border-white/95 ${s.color} animate-float cursor-pointer overflow-hidden transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-4 hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] hover:z-50`}
                    style={{
                      '--rot': s.rotate,
                      animationDelay: s.delay,
                      marginLeft: s.offset,
                      zIndex: i,
                    } as React.CSSProperties}
                  >
                    {/* Inner Shine Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </Link>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="px-6 sm:px-10 lg:px-16 py-12">
          <div className="max-w-6xl mx-auto text-center">

            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              Everything You Need
            </h2>

            <p className="text-lg text-gray-500 mb-20 max-w-2xl mx-auto">
              Powerful color tools packed into one clean, interactive interface.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="p-12 rounded-3xl bg-white shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center text-3xl mb-8 shadow-sm border border-gray-100">
                    {f.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-4 text-gray-900">
                    {f.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* FAQ */}
        <section className="flex justify-center items-center px-6 sm:px-10 lg:px-16 py-12 bg-white">
          <div className="w-[90%] max-w-4xl mx-auto text-center">

            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
              Frequently Asked Questions
            </h2>

            <p className="text-lg text-gray-500 mb-16">
              Everything you need to know about colorPaletteFinder
            </p>

            <div className="flex flex-col gap-8 text-left">
              {FAQ.map(({ q, a }) => (
                <details
                  key={q}
                  className="rounded-2xl border border-gray-200 p-6 hover:shadow-sm transition-all"
                >
                  <summary className="cursor-pointer font-semibold text-lg mb-3">
                    {q}
                  </summary>
                  <p className="text-gray-500 leading-relaxed">
                    {a}
                  </p>
                </details>
              ))}
            </div>

          </div>
        </section>

      </main>

    </>
  );
}