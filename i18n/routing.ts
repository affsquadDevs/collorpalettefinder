import { defineRouting } from "next-intl/routing";

// English stays at the root (no prefix); other locales are prefixed
// (/es, /pt, /pl, /de, /fr, /uk, /it). Note: "uk" is the ISO-639 language
// code for Ukrainian (the country code "ua" is not a language code).
export const routing = defineRouting({
    locales: ["en", "es", "pt", "pl", "de", "fr", "uk", "it"],
    defaultLocale: "en",
    localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];

// Display names for the language switcher.
export const LOCALE_LABELS: Record<string, string> = {
    en: "English",
    es: "Español",
    pt: "Português",
    pl: "Polski",
    de: "Deutsch",
    fr: "Français",
    uk: "Українська",
    it: "Italiano",
};

// BCP-47 lang attribute / hreflang values.
export const LOCALE_HREFLANG: Record<string, string> = {
    en: "en",
    es: "es",
    pt: "pt",
    pl: "pl",
    de: "de",
    fr: "fr",
    uk: "uk",
    it: "it",
};
