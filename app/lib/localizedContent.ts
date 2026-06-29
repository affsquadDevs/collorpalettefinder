import { routing } from "@/i18n/routing";
import { BLOG_POSTS, type BlogPost } from "./blog";
import { INTERIOR_HUB, type HubContent } from "./interiorContent";
import { INTERIOR_ROOM_GUIDES, type RoomGuide } from "./interiorRooms";
import { INTERIOR_PALETTES, type InteriorPalette } from "./interiorPalettes";

export type LocalizedRoomGuide = RoomGuide & { roomLabel: string };

const isDefault = (l: string) => l === routing.defaultLocale;

async function load(path: string): Promise<unknown | null> {
    try {
        return (await import(`@/content/${path}.json`)).default;
    } catch {
        return null;
    }
}

// ─── Blog ────────────────────────────────────────────────────────────────────
export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
    if (isDefault(locale)) return BLOG_POSTS;
    const tr = (await load(`blog/${locale}`)) as Partial<BlogPost>[] | null;
    if (!tr) return BLOG_POSTS;
    const map = new Map(tr.map((p) => [p.slug, p]));
    // Keep English slug + date; override the translatable fields.
    return BLOG_POSTS.map((en) => ({ ...en, ...(map.get(en.slug) ?? {}), slug: en.slug, date: en.date }));
}

export async function getBlogPost(locale: string, slug: string): Promise<BlogPost | undefined> {
    return (await getBlogPosts(locale)).find((p) => p.slug === slug);
}

// ─── Interior ────────────────────────────────────────────────────────────────
export async function getInteriorHub(locale: string): Promise<HubContent> {
    if (isDefault(locale)) return INTERIOR_HUB;
    const d = (await load(`interior/${locale}`)) as { hub?: Partial<HubContent> } | null;
    return d?.hub ? { ...INTERIOR_HUB, ...d.hub } : INTERIOR_HUB;
}

export async function getRoomGuides(locale: string): Promise<LocalizedRoomGuide[]> {
    const base: LocalizedRoomGuide[] = INTERIOR_ROOM_GUIDES.map((en) => ({ ...en, roomLabel: en.room }));
    if (isDefault(locale)) return base;
    const d = (await load(`interior/${locale}`)) as { rooms?: Partial<LocalizedRoomGuide>[] } | null;
    if (!d?.rooms) return base;
    const map = new Map(d.rooms.map((r) => [r.slug, r]));
    // tr overrides roomLabel + translatable fields; keep English `room` (palette matching key) + slug.
    return base.map((en) => ({ ...en, ...(map.get(en.slug) ?? {}), room: en.room, slug: en.slug }));
}

export async function getRoomGuideBySlug(locale: string, slug: string): Promise<LocalizedRoomGuide | undefined> {
    return (await getRoomGuides(locale)).find((g) => g.slug === slug);
}

export async function getInteriorPalettes(locale: string): Promise<InteriorPalette[]> {
    if (isDefault(locale)) return INTERIOR_PALETTES;
    const d = (await load(`interior/${locale}`)) as { palettes?: { title: string; style?: string; description?: string }[] } | null;
    if (!d?.palettes) return INTERIOR_PALETTES;
    const map = new Map(d.palettes.map((p) => [p.title, p]));
    // Match by English title; override style + description; keep room (matching key), colors, title.
    return INTERIOR_PALETTES.map((en) => {
        const tr = map.get(en.title);
        return tr ? { ...en, style: tr.style ?? en.style, description: tr.description ?? en.description } : en;
    });
}
