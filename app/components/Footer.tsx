import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 pt-12 pb-8 px-6 sm:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-16">

                    {/* Brand & Disclaimer */}
                    <div className="flex flex-col gap-4 w-full lg:max-w-sm">
                        <Link href="/" className="flex items-center gap-2.5 text-xl font-medium text-gray-900 no-underline shrink-0 group hover:opacity-80 transition-opacity">
                            <Image src="/logo.svg" alt="colorPaletteFinder Logo" width={32} height={32} className="group-hover:rotate-90 transition-transform duration-500" />
                            <span className="tracking-tight font-light">colorPalette<strong className="font-extrabold text-blue-600">Finder</strong></span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            colorPaletteFinder provides educational color theory tools and palette generators for designers and developers. All calculations are intended for guidance only.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 w-full">
                        {/* Quick Links */}
                        <div className="flex flex-col gap-3">
                            <span className="font-semibold text-gray-900 mb-1">Company</span>
                            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">Home</Link>
                            <Link href="/about" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">About</Link>
                            <Link href="/blog" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">Blog</Link>
                            <Link href="/contact" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">Contact</Link>
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-col gap-3">
                            <span className="font-semibold text-gray-900 mb-1">Legal</span>
                            <Link href="/privacy-policy" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">Privacy Policy</Link>
                            <Link href="/terms-of-service" className="text-gray-500 hover:text-blue-600 transition-colors text-sm w-fit">Terms of Service</Link>
                        </div>

                        {/* Primary Focus */}
                        <div className="flex flex-col gap-3 col-span-2 sm:col-span-1 border-t border-gray-100 pt-6 sm:border-0 sm:pt-0">
                            <span className="font-semibold text-gray-900 mb-1">Get Started</span>
                            <Link href="/how-it-works" className="font-bold text-blue-600 hover:text-blue-700 transition-colors text-base flex items-center gap-1 group w-fit">
                                How It Works <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-end gap-6 pt-8 border-t border-gray-100">
                    <span className="text-gray-400 text-sm">
                        &copy; 2026 colorPaletteFinder. All rights reserved.
                    </span>

                    <div className="flex items-center gap-5 justify-center md:justify-end">
                        <a href="https://www.facebook.com/people/Color-Palette-Finder/61587989738551/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/colorpalettefinder/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.youtube.com/@ColorPaletteFinder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition-colors" aria-label="YouTube">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM10 15.464L15.65 12 10 8.536v6.928z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="https://www.threads.com/@colorpalettefinder" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors" aria-label="Threads">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.89-6.386c1.66 0 2.87-.66 3.424-1.854.498-1.066.452-2.14.398-3.04l-.014-.23h-2.164c0 .99.043 1.954-.236 2.553-.254.542-.783.824-1.408.824-.817 0-1.354-.508-1.57-1.428-.135-.572-.142-1.393-.142-2.438 0-1.045.007-1.867.142-2.438.216-.92.753-1.428 1.57-1.428.625 0 1.154.282 1.408.824.279.599.236 1.562.236 2.553h2.164v-1.171c.05-1.455.05-2.072-.258-2.905-.443-1.189-1.46-1.805-3.55-1.805-2.09 0-3.414.777-3.953 2.144-.407 1.025-.436 2.081-.436 4.226 0 2.145.029 3.201.436 4.226.54 1.367 1.863 2.144 3.953 2.144zM16.48 9.53a4.038 4.038 0 00-.7-.417v2.09a3.606 3.606 0 00.7.202v2.109A5.82 5.82 0 0113.623 14v1.86c2.597-.107 4.195-1.285 4.636-3.084.22-.907.25-2.052.25-3.246V9.227c-.642.144-1.32.25-2.03.303z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
