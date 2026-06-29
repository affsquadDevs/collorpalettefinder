import { MetadataRoute } from 'next'
import { BLOG_POSTS } from './lib/blog'
import { INTERIOR_ROOM_GUIDES } from './lib/interiorRooms'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://colorpalettefinder.com'

    const blogPosts: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    const roomPages: MetadataRoute.Sitemap = INTERIOR_ROOM_GUIDES.map((g) => ({
        url: `${baseUrl}/interior-color-palettes/${g.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.75,
    }))

    return [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${baseUrl}/color-palette-generator`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/how-it-works`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/interior-color-palettes`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.85,
        },
        ...roomPages,
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terms-of-service`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...blogPosts,
    ]
}
