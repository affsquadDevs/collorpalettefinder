import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './lib/blog'
import { INTERIOR_ROOM_GUIDES } from './lib/interiorRooms'
import { routing } from '@/i18n/routing'

const baseUrl = 'https://colorpalettefinder.com'

function urlFor(locale: string, path: string): string {
    return locale === routing.defaultLocale ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`
}

function languagesFor(path: string): Record<string, string> {
    const languages: Record<string, string> = {}
    for (const l of routing.locales) languages[l] = urlFor(l, path)
    return languages
}

export default function sitemap(): MetadataRoute.Sitemap {
    // Core pages that are fully translated → list all-locale hreflang alternates.
    const translated: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
        { path: '', priority: 1, changeFrequency: 'weekly' },
        { path: '/color-palette-generator', priority: 0.9, changeFrequency: 'weekly' },
        { path: '/how-it-works', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/privacy-policy', priority: 0.5, changeFrequency: 'yearly' },
        { path: '/terms-of-service', priority: 0.5, changeFrequency: 'yearly' },
    ]
    const coreEntries: MetadataRoute.Sitemap = translated.map((p) => ({
        url: urlFor(routing.defaultLocale, p.path),
        lastModified: new Date(),
        changeFrequency: p.changeFrequency,
        priority: p.priority,
        alternates: { languages: languagesFor(p.path) },
    }))

    // Blog + interior content is not translated yet (phase 2) → English only.
    const enOnly: MetadataRoute.Sitemap = [
        { url: `${baseUrl}/interior-color-palettes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
        ...INTERIOR_ROOM_GUIDES.map((g) => ({
            url: `${baseUrl}/interior-color-palettes/${g.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.75,
        })),
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        ...BLOG_POSTS.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        })),
    ]

    return [...coreEntries, ...enOnly]
}
