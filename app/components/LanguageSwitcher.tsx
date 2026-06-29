"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, LOCALE_LABELS } from "@/i18n/routing";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onClick);
        return () => document.removeEventListener("mousedown", onClick);
    }, []);

    const switchTo = (l: string) => {
        setOpen(false);
        if (l !== locale) {
            // Keep the same path, swap the locale.
            router.replace(pathname, { locale: l });
        }
    };

    return (
        <div className={`relative ${className}`} ref={ref}>
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label="Change language"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-2 py-1.5 rounded-md"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" strokeWidth="1.6" />
                    <path strokeWidth="1.6" d="M3 12h18M12 3c2.5 2.5 2.5 15.5 0 18M12 3c-2.5 2.5-2.5 15.5 0 18" />
                </svg>
                <span className="uppercase">{locale}</span>
                <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <ul
                    role="listbox"
                    className="absolute right-0 top-[calc(100%+6px)] z-[300] min-w-[160px] bg-white border border-gray-200 rounded-xl shadow-lg py-1.5"
                >
                    {routing.locales.map((l) => (
                        <li key={l}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={l === locale}
                                onClick={() => switchTo(l)}
                                className={`flex w-full items-center justify-between px-4 py-2 text-sm text-left transition-colors hover:bg-gray-50 ${l === locale ? "font-semibold text-blue-600" : "text-gray-700"}`}
                            >
                                {LOCALE_LABELS[l]}
                                {l === locale && <span className="text-blue-600">✓</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
