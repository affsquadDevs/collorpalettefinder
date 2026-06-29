import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact colorPaletteFinder — Questions & Feedback",
    description: "Contact the colorPaletteFinder team with questions, feedback, bug reports or support requests. We reply within 24–48 hours — just send us an email today.",
    openGraph: {
            images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
        title: "Contact colorPaletteFinder — Questions & Feedback",
        description: "Reach out to us if you have any questions or feedback.",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen bg-[#fafafa] text-gray-900 font-sans pb-32">

            {/* Header Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-12 pb-16 bg-white border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-2 bg-blue-50/50 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors text-sm border border-blue-100">
                            &larr; Back to Home
                        </Link>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
                        Contact <span className="text-blue-600">Us</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We’d love to hear from you. Reach out with your questions or feedback.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="bg-white p-10 md:p-14 rounded-3xl border border-gray-200 shadow-sm">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                        <p className="text-gray-600 mb-10 text-lg">
                            If you need help using the tool, want to report a bug, or just want to say hi, drop us an email! We aim to respond within 24-48 hours.
                        </p>

                        <div className="inline-block bg-blue-50 border border-blue-100 rounded-2xl p-6">
                            <span className="block text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">Primary Contact</span>
                            <a
                                href="mailto:hello@colorpalettefinder.com"
                                className="text-2xl md:text-4xl font-extrabold text-gray-900 hover:text-blue-600 transition-colors break-all"
                            >
                                hello@colorpalettefinder.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
