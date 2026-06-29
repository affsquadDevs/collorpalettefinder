import { routing } from "@/i18n/routing";

const SITE_URL = "https://colorpalettefinder.com";

// Build the hreflang `alternates` map for a given path across all locales.
// path is the route WITHOUT a locale prefix, e.g. "" (home), "/about".
export function altLanguages(path = ""): Record<string, string> {
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
        languages[l] = l === routing.defaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${l}${path}`;
    }
    languages["x-default"] = `${SITE_URL}${path}`;
    return languages;
}

export function canonicalFor(locale: string, path = ""): string {
    return locale === routing.defaultLocale ? `${SITE_URL}${path}` : `${SITE_URL}/${locale}${path}`;
}
