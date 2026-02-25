import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Privacy Policy | colorPaletteFinder",
    description: "Learn how colorPaletteFinder collects, uses, and protects your data.",
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
                            <li>To improve, personalize, and expand our website's functionality based on user interactions.</li>
                            <li>To understand and analyze how users interact with our color palette tools.</li>
                            <li>To communicate with you, including responding to inquiries or providing customer support.</li>
                            <li>To detect, prevent, and address technical issues or security breaches.</li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">3. Cookies and Tracking Technologies</h2>
                        <p>
                            We may use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
                        </p>
                        <p>
                            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some functional portions of our website efficiently.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">4. Third-Party Services</h2>
                        <p>
                            We may employ third-party companies and individuals globally to facilitate our website ("Service Providers"), to provide the service on our behalf, or to assist us in analyzing how our website is used (e.g., Google Analytics).
                        </p>
                        <p>
                            These third parties have access to your identifying data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">5. Data Security</h2>
                        <p>
                            We take the security of your data seriously and strive to use commercially acceptable means to protect it. However, please be aware that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we endeavor to protect your personal data, we cannot guarantee its absolute security.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">6. Children's Privacy</h2>
                        <p>
                            Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">7. Changes to This Privacy Policy</h2>
                        <p>
                            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this document. We advise you to review this Privacy Policy periodically for any changes.
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
