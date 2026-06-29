import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './lib/blog'
import { INTERIOR_ROOM_GUIDES } from './lib/interiorRooms'
import { routing } from '@/i18n/routing'

const baseUrl = 'https://colorpalettefinder.com'

function urlFor(locale: string, path: string): string {
    return locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

// Full reciprocal hreflang set for a path: every locale + x-default (→ default locale).
function languagesFor(path: string): Record<string, string> {
    const languages: Record<string, string> = {}
    for (const l of routing.locales) languages[l] = urlFor(l, path)
    languages['x-default'] = urlFor(routing.defaultLocale, path)
    return languages
}

type Route = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly'; lastModified?: Date }

export default function sitemap(): MetadataRoute.Sitemap {
    const routes: Route[] = [
        { path: '', priority: 1, changeFrequency: 'weekly' },
        { path: '/color-palette-generator', priority: 0.9, changeFrequency: 'weekly' },
        { path: '/interior-color-palettes', priority: 0.85, changeFrequency: 'monthly' },
        ...INTERIOR_ROOM_GUIDES.map((g): Route => ({ path: `/interior-color-palettes/${g.slug}`, priority: 0.75, changeFrequency: 'monthly' })),
        { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
        ...BLOG_POSTS.map((post): Route => ({ path: `/blog/${post.slug}`, priority: 0.6, changeFrequency: 'monthly', lastModified: new Date(post.date) })),
        { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
        { path: '/terms-of-service', priority: 0.5, changeFrequency: 'yearly' },
    ]

    // Emit one <url> per (route × locale) so every language version is listed as its own
    // <loc>, each carrying the complete reciprocal hreflang set (all locales + x-default).
    const entries: MetadataRoute.Sitemap = []
    for (const r of routes) {
        const languages = languagesFor(r.path)
        for (const locale of routing.locales) {
            entries.push({
                url: urlFor(locale, r.path),
                lastModified: r.lastModified ?? new Date(),
                changeFrequency: r.changeFrequency,
                priority: r.priority,
                alternates: { languages },
            })
        }
    }
    return entries
}
