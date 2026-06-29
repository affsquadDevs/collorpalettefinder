import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Terms of Service — colorPaletteFinder",
    description: "Read the colorPaletteFinder terms of service: usage rules, free commercial use, advertising, risk warnings and accessibility disclaimers before you start.",
};

export default function TermsOfServicePage() {
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
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 break-words break-all sm:break-normal">
                        Terms of <span className="text-blue-600">Service</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 sm:px-10 lg:px-16 pt-16">
                <div className="max-w-3xl mx-auto">

                    <article className="prose prose-lg md:prose-xl prose-blue max-w-none text-gray-700">
                        <p className="lead text-gray-900 font-medium text-xl mb-10">
                            Welcome to colorPaletteFinder. By accessing or using our website, tools, and services, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Acceptance of Terms</h2>
                        <p>
                            These terms govern your use of colorPaletteFinder. If you do not agree with any part of these terms, you must not use our website. Your continued use of the site constitutes your acceptance of these Terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. Website Usage Rules</h2>
                        <p>
                            To ensure a safe and reliable environment for all users, you agree to abide by the following basic rules when using colorPaletteFinder:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 my-4">
                            <li><strong>Lawful Use:</strong> You agree not to use the site for any unlawful purpose or in any way that violates applicable local, national, or international law.</li>
                            <li><strong>No Scraping or Automated Access:</strong> You may not use automated systems, bots, scrapers, or similar data gathering tools to extract information, colors, or palettes from our site in bulk without our express written permission.</li>
                            <li><strong>No Interference:</strong> You agree not to interfere with, disrupt, or attempt to gain unauthorized access to the servers or networks connected to our website.</li>
                            <li><strong>Personal and Professional Use:</strong> The generated palettes and tools are completely free for both your personal and professional/commercial use.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Monetization and Partner Promotions</h2>
                        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl my-6">
                            <p className="font-medium text-gray-900 m-0">
                                <strong>Free to Use:</strong> Our color generation tools and content are offered entirely for free. To keep the website running, pay server costs, and continue development, the website is monetized through advertisements and partner promotions.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 mb-0 text-base text-gray-700">
                                <li>You may see display ads or third-party banners while navigating the site.</li>
                                <li>We may include affiliate links or partner promotions in our blog content or interface. Clicking these links or purchasing through them may earn us a small commission at no extra cost to you.</li>
                                <li>We are not responsible for the content, privacy policies, or practices of any third-party websites or services linked to from our ads or promotions.</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Risk Warning and Disclaimer of Liability</h2>
                        <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
                            <p className="font-semibold text-red-800 m-0">
                                <strong>CRITICAL RISK WARNING:</strong> colorPaletteFinder provides educational color theory tools and palette generators for designers and developers. However, all calculations, color harmonies, and contrast ratios are intended for <strong>guidance only</strong>.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-4 mb-0 text-base text-red-900/80">
                                <li><strong>No Guarantee of Accuracy:</strong> While we strive to use precise mathematical formulas for generating color harmonies and verifying WCAG contrast ratios, we make no warranties regarding the absolute accuracy, reliability, or completeness of the tools.</li>
                                <li><strong>Accessibility Compliance:</strong> You are solely responsible for ensuring that the colors you choose comply with legal accessibility standards (such as WCAG guidelines, ADA compliance) in your final products. <strong>Do not rely solely on our tool for legal or critical compliance testing.</strong></li>
                                <li><strong>“As Is” Basis:</strong> The website and its tools are provided on an “AS IS” and “AS AVAILABLE” basis, without any warranties of any kind, either express or implied.</li>
                                <li><strong>Limitation of Liability:</strong> In no event shall colorPaletteFinder, its creators, or its team be liable for any direct, indirect, incidental, consequential, or special damages arising out of or in connection with your use of the website, including, but not limited to, design flaws, accessibility lawsuits, or loss of profits.</li>
                            </ul>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Intellectual Property</h2>
                        <p>
                            The website’s original content, features, layout, and functionality (excluding the generated hex codes, which are yours to use freely) are owned by colorPaletteFinder and are protected by international copyright, trademark, and intellectual property laws. You may not reproduce our branding, logo, or proprietary code without permission.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Modifications to Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will try to provide at least 30 days’ notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Contact Us</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us:
                        </p>
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-6 inline-block mb-12">
                            <span className="block text-sm font-semibold text-gray-600 uppercase tracking-widest mb-1">Legal Inquiry</span>
                            <a
                                href="mailto:hello@colorpalettefinder.com"
                                className="block text-xl md:text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors break-all"
                            >
                                hello@colorpalettefinder.com
                            </a>
                        </div>
                    </article>

                </div>
            </section>
        </main>
    );
}
