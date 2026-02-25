"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="flex items-center justify-between px-6 md:px-12 h-[72px] bg-white border-b border-gray-200 sticky top-0 z-[200]">
            <Link href="/" className="flex items-center gap-2.5 text-xl font-medium text-gray-900 no-underline shrink-0 group hover:opacity-80 transition-opacity">
                <Image src="/logo.svg" alt="colorPaletteFinder Logo" width={32} height={32} className="transition-transform duration-500" />
                <span className="tracking-tight font-light">colorPalette<strong className="font-extrabold text-blue-600">Finder</strong></span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center list-none gap-6">
                {NAV_LINKS.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`block py-1.5 text-[15px] no-underline transition-colors duration-200 font-medium ${label === "Blog"
                                ? "text-blue-600 hover:text-blue-700"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="flex items-center gap-4">
                <Link href="/color-palette-generator" className="hidden sm:inline-flex shrink-0 bg-gray-900 text-white text-[14px] font-semibold py-2.5 px-6 rounded-full no-underline transition-all duration-200 hover:bg-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] hover:-translate-y-[1px] active:scale-95 border border-transparent hover:border-gray-700">
                    Open Tool
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {isMobileMenuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute top-[72px] left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden">
                    <ul className="flex flex-col py-4 px-6 space-y-4">
                        {NAV_LINKS.map(({ href, label }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block text-[16px] font-medium transition-colors ${label === "Blog"
                                        ? "text-blue-600 hover:text-blue-700"
                                        : "text-gray-700 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li className="pt-4 mt-2 border-t border-gray-100 sm:hidden">
                            <Link
                                href="/color-palette-generator"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-center bg-gray-900 text-white text-[16px] font-semibold py-3 px-6 rounded-full"
                            >
                                Open Tool
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
