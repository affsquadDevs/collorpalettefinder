import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy — colorPaletteFinder",
    description: "Read the colorPaletteFinder privacy policy: how we collect, use, and protect your data, plus cookies, advertising, analytics and your consent choices.",
};

export default function PrivacyPolicyPage() {
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
                        Privacy <span className="text-blue-600">Policy</span>
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
                            At colorPaletteFinder, your privacy is a top priority. This Privacy Policy explains how we collect, use, and protect your information when you use our website and color generation tools.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">1. Information We Collect</h2>
                        <p>
                            We believe in minimizing data collection. We only collect the information necessary to provide and improve our services to you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 my-4">
                            <li><strong>Log and Usage Data:</strong> Like most websites, our servers automatically record information that your browser sends when you visit our site. This may include your IP address, browser type and version, the pages of our site that you visit, the time and date of your visit, and the time spent on those pages.</li>
                            <li><strong>Device Data:</strong> Information concerning the device or computer you use to access the website, including hardware models, operating systems, and device identifiers.</li>
                            <li><strong>Information You Provide:</strong> If you choose to contact us via email, we will collect your email address and any content provided in your message to respond effectively.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">2. How We Use Your Information</h2>
                        <p>
                            The information we collect is used in the following ways:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 my-4">
                            <li>To provide, operate, and maintain our website.</li>
                            <li>To improve, personalize, and expand our website’s functionality based on user interactions.</li>
                            <li>To understand and analyze how users interact with our color palette tools.</li>
                            <li>To communicate with you, including responding to inquiries or providing customer support.</li>
                            <li>To detect, prevent, and address technical issues or security breaches.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Cookies and Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to operate our website, remember your preferences, analyze traffic, and — together with our advertising partners — deliver and measure advertising. Cookies are small data files that may include an anonymous unique identifier.
                        </p>
                        <p>
                            The cookies we use fall into three broad categories: <strong>essential cookies</strong> required for the site to function, <strong>analytics cookies</strong> that help us understand how the site is used, and <strong>advertising cookies</strong> set by Google and other third-party vendors (described in Section 4 below).
                        </p>
                        <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you are located in the European Economic Area (EEA), the United Kingdom, or Switzerland, we ask for your consent before setting non-essential cookies, and you can change or withdraw that consent at any time using the privacy settings on our site. However, if you do not accept cookies, some functional portions of our website may not work efficiently.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Advertising, Analytics &amp; Third-Party Services</h2>
                        <p>
                            colorPaletteFinder is free to use. To cover our hosting and development costs, we display advertising served by Google and other third-party vendors. This section explains how advertising and other third-party services work on our site and how you can control them.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 my-4">
                            <li><strong>Google AdSense:</strong> We use Google AdSense to display ads. Google, as a third-party vendor, uses cookies to serve ads on our site.</li>
                            <li><strong>Google advertising cookies:</strong> Google&apos;s use of advertising cookies (including cookies served from the <code>google.com</code> and <code>doubleclick.net</code> domains) enables Google and its partners to serve ads to you based on your visit to colorPaletteFinder and/or other sites on the Internet.</li>
                            <li><strong>Third-party vendors &amp; ad networks:</strong> Third-party vendors and ad networks may also use cookies, web beacons, and similar technologies to collect information and serve ads they believe are relevant to your interests.</li>
                            <li><strong>Analytics:</strong> We use services such as Google Analytics and Google Tag Manager to understand how visitors use our site. These providers may set their own cookies and process usage data on our behalf.</li>
                        </ul>
                        <p>
                            <strong>How to opt out of personalized advertising:</strong> You may opt out of personalized advertising by visiting <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ads Settings</a>. You can opt out of some third-party vendors&apos; use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.aboutads.info/choices</a>, or, if you are in the EEA or UK, <a href="https://www.youronlinechoices.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.youronlinechoices.eu</a>.
                        </p>
                        <p>
                            For more information on how Google uses data when you use our site, please review <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">How Google uses information from sites or apps that use our services</a>.
                        </p>
                        <p>
                            <strong>Consent (EEA, UK &amp; Switzerland):</strong> For visitors in the European Economic Area, the United Kingdom, and Switzerland, we use a Google-certified Consent Management Platform to request your consent before any non-essential or advertising cookies are set. By default, ad personalization and analytics storage are disabled until you provide consent. You can change or withdraw your consent at any time through the privacy settings on our site.
                        </p>
                        <p>
                            Any other third parties we employ have access to your data only to perform tasks on our behalf and are obligated not to disclose or use it for any other purpose. We are not responsible for the privacy practices of these third parties; we encourage you to review their respective privacy policies.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Data Security</h2>
                        <p>
                            We take the security of your data seriously and strive to use commercially acceptable means to protect it. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we endeavor to protect your personal data, we cannot guarantee its absolute security.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Children’s Privacy</h2>
                        <p>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the “Last Updated” date at the top of this document. We advise you to review this Privacy Policy periodically for any changes.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">8. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact our data protection team:
                        </p>
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mt-6 inline-block">
                            <span className="block text-sm font-semibold text-blue-600 uppercase tracking-widest mb-1">Privacy Inquiry</span>
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
