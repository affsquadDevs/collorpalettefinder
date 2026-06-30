// ─── Daily blog generator ─────────────────────────────────────────────────────
// Generates N brand-new blog posts with the Claude API, matching the existing
// posts' voice, structure, length, and on-page SEO, then writes them into the
// single source of truth (app/lib/blog.ts, English) and every locale translation
// file (content/blog/<locale>.json). A push of those changes to `main` triggers
// the Vercel production deploy and the IndexNow ping (see scripts/indexnow.mjs).
//
// Usage:
//   node scripts/generate-blog.mjs              # generate 2 posts, write files
//   node scripts/generate-blog.mjs --count 1    # generate 1 post
//   node scripts/generate-blog.mjs --no-write   # generate + print, write nothing
//
// Env:
//   ANTHROPIC_API_KEY   required — the Claude API key
//   ANTHROPIC_MODEL     optional — defaults to "claude-opus-4-8"
//
// Dependency-free: Node 20+ global fetch, no npm packages (like indexnow.mjs).

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// Keep in sync with i18n/routing.ts (non-default locales — English lives in blog.ts).
const LOCALES = ["es", "pt", "pl", "de", "fr", "uk", "it"];
const LOCALE_NAMES = {
    es: "Spanish", pt: "Portuguese", pl: "Polish", de: "German",
    fr: "French", uk: "Ukrainian", it: "Italian",
};

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";
const API_KEY = process.env.ANTHROPIC_API_KEY;

const args = process.argv.slice(2);
const COUNT = Number(args[args.indexOf("--count") + 1]) > 0 ? Number(args[args.indexOf("--count") + 1]) : 2;
const NO_WRITE = args.includes("--no-write");

const BLOG_TS = path.join(ROOT, "app/lib/blog.ts");
const localeFile = (l) => path.join(ROOT, `content/blog/${l}.json`);

// JSON Schema for a single post object (shared by generation + translation).
const POST_SCHEMA = {
    type: "object",
    properties: {
        slug: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        metaTitle: { type: "string" },
        metaDescription: { type: "string" },
        keywords: { type: "array", items: { type: "string" } },
        category: { type: "string" },
        faq: {
            type: "array",
            items: {
                type: "object",
                properties: { q: { type: "string" }, a: { type: "string" } },
                required: ["q", "a"],
            },
        },
        body: { type: "string" },
    },
    required: ["slug", "title", "description", "metaTitle", "metaDescription", "keywords", "category", "faq", "body"],
};

const POSTS_TOOL = {
    name: "submit_posts",
    description: "Submit the finished blog post objects.",
    input_schema: {
        type: "object",
        properties: { posts: { type: "array", items: POST_SCHEMA } },
        required: ["posts"],
    },
};

// ─── Anthropic Messages API (tool use → structured, valid JSON) ───────────────
// Forces the model to call submit_posts; the API returns input already parsed as
// an object, so there is no manual JSON.parse (and no "bad control character"
// failures from raw newlines in the body).
async function claudePosts(prompt, maxTokens = 16000) {
    if (!API_KEY) throw new Error("ANTHROPIC_API_KEY is not set");
    const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
            "x-api-key": API_KEY,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL,
            max_tokens: maxTokens,
            tools: [POSTS_TOOL],
            tool_choice: { type: "tool", name: "submit_posts" },
            messages: [{ role: "user", content: prompt }],
        }),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Anthropic API ${res.status}: ${text.slice(0, 500)}`);
    }
    const data = await res.json();
    const tool = (data.content || []).find((b) => b.type === "tool_use");
    if (!tool || !Array.isArray(tool.input?.posts)) {
        throw new Error(`Model did not return posts (stop_reason: ${data.stop_reason})`);
    }
    return tool.input.posts;
}

// ─── Read the English source of truth out of blog.ts ──────────────────────────
function extractBlogPosts(src) {
    const anchor = src.indexOf("BLOG_POSTS: BlogPost[] = ");
    if (anchor < 0) throw new Error("Could not locate BLOG_POSTS in blog.ts");
    const arrStart = src.indexOf("[", anchor + "BLOG_POSTS: BlogPost[] = ".length - 1);
    const arrEnd = src.indexOf("\n];", arrStart);
    if (arrStart < 0 || arrEnd < 0) throw new Error("Could not locate BLOG_POSTS array bounds");
    const arrText = src.slice(arrStart, arrEnd) + "\n]";
    return { posts: JSON.parse(arrText), arrEnd };
}

// ─── Prompts ──────────────────────────────────────────────────────────────────
function generationPrompt(samples, existingSlugs, categories) {
    return `You are a senior writer for colorPaletteFinder, a tool for designers and developers working with color. Write ${COUNT} brand-new English blog post(s) for the blog.

Match the EXISTING posts exactly in voice, depth, structure, length, and on-page SEO. Here are ${samples.length} real examples (study their tone, body length ~1300-1800 words, hex-code examples, practical first-person craft voice, and FAQ style):

${JSON.stringify(samples, null, 2)}

STRICT REQUIREMENTS for each new post object:
- "slug": short, kebab-case, unique. MUST NOT be any of these existing slugs: ${JSON.stringify(existingSlugs)}
- "title": specific and useful (not clickbait), like the samples.
- "description": 1-2 sentences for the blog index card.
- "metaTitle": <= 60 chars, ends with " — colorPaletteFinder".
- "metaDescription": 150-160 chars, includes the primary keyword.
- "keywords": array of 10-12 target keyword phrases.
- "category": reuse one of the existing categories where it fits: ${JSON.stringify([...new Set(categories)])}.
- "faq": array of 4-5 {"q","a"} objects, substantive answers (3-5 sentences).
- "body": full article in the SAME lightweight markdown subset the samples use — blocks separated by a blank line, "## H2" and "### H3" headings, "- " bullet lists, inline **bold**, *italic*, \`code\`, and [text](url) links. Use real hex codes. Where natural, link to [the color palette generator](/color-palette-generator). 1300-1800 words. Do NOT include a top-level H1 (the title renders separately).

Pick fresh, non-overlapping topics that are NOT already covered by the existing slugs. Each post must be on a distinct topic.

Call the submit_posts tool with exactly ${COUNT} post object(s).`;
}

function translationPrompt(localeName, posts) {
    return `Translate the following ${posts.length} blog post object(s) from English into ${localeName} for colorPaletteFinder.

RULES:
- Translate these fields naturally and idiomatically: "title", "description", "metaTitle", "metaDescription", "keywords" (translate each phrase), "category", "faq" (both q and a), and "body".
- Keep "metaTitle" ending with " — colorPaletteFinder" (do NOT translate the brand name).
- Preserve ALL markdown structure in "body" exactly: the same "##"/"###" headings, "- " bullets, **bold**, *italic*, \`code\`, blank-line block separation, and every [text](url) link (translate the visible text, keep the URL identical). Keep all hex codes (#xxxxxx) unchanged.
- Keep the "slug" field EXACTLY as given in English (do not translate it).
- Do NOT include a "date" field.

English posts:
${JSON.stringify(posts, null, 2)}

Call the submit_posts tool with exactly ${posts.length} translated post object(s).`;
}

// ─── Serialize an English post as a blog.ts array element (4-space indented) ───
function toTsElement(post) {
    // Field order matches the existing entries for clean diffs.
    const ordered = {
        slug: post.slug,
        title: post.title,
        description: post.description,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        date: post.date,
        category: post.category,
        faq: post.faq,
        body: post.body,
    };
    return JSON.stringify(ordered, null, 4)
        .split("\n")
        .map((line) => "    " + line)
        .join("\n");
}

// Translation entry: same as English minus the date (date comes from English at merge time).
function toLocaleEntry(post) {
    return {
        slug: post.slug,
        title: post.title,
        description: post.description,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        category: post.category,
        faq: post.faq,
        body: post.body,
    };
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const src = await readFile(BLOG_TS, "utf8");
    const { posts: english } = extractBlogPosts(src);
    const existingSlugs = english.map((p) => p.slug);
    const categories = english.map((p) => p.category);

    // Two recent posts as the style reference (trim faq to keep the prompt lean).
    const samples = english.slice(-2).map((p) => ({ ...p, faq: p.faq.slice(0, 2) }));

    console.log(`→ Generating ${COUNT} new English post(s) with ${MODEL}…`);
    const generated = await claudePosts(generationPrompt(samples, existingSlugs, categories));

    const today = new Date().toISOString().slice(0, 10);
    const seen = new Set(existingSlugs);
    const newPosts = [];
    for (const p of Array.isArray(generated) ? generated : [generated]) {
        if (!p || !p.slug || !p.body) { console.warn("  ⚠ skipping malformed post", p?.slug); continue; }
        if (seen.has(p.slug)) { console.warn(`  ⚠ duplicate slug "${p.slug}" — skipping`); continue; }
        seen.add(p.slug);
        newPosts.push({ ...p, date: today });
    }
    if (!newPosts.length) throw new Error("Model returned no usable new posts");
    console.log(`  ✓ ${newPosts.length} post(s): ${newPosts.map((p) => p.slug).join(", ")}`);

    // Translate into every locale (one call per locale → array of translated posts).
    const translations = {}; // locale -> array (slug-aligned to newPosts)
    for (const loc of LOCALES) {
        console.log(`→ Translating to ${LOCALE_NAMES[loc]} (${loc})…`);
        const arr = await claudePosts(translationPrompt(LOCALE_NAMES[loc], newPosts));
        const byOrder = newPosts.map((en, i) => {
            const tr = arr.find((t) => t && t.slug === en.slug) || arr[i] || {};
            return toLocaleEntry({ ...en, ...tr, slug: en.slug }); // force English slug
        });
        translations[loc] = byOrder;
    }

    if (NO_WRITE) {
        console.log("\n--no-write: nothing written. Generated English posts:\n");
        console.log(JSON.stringify(newPosts, null, 2));
        return;
    }

    // Write English into blog.ts (append before the array close `\n];`).
    const freshSrc = await readFile(BLOG_TS, "utf8");
    const insertAt = freshSrc.indexOf("\n];", freshSrc.indexOf("BLOG_POSTS: BlogPost[] = "));
    const tsBlock = newPosts.map(toTsElement).join(",\n");
    const newSrc = freshSrc.slice(0, insertAt) + ",\n" + tsBlock + freshSrc.slice(insertAt);
    await writeFile(BLOG_TS, newSrc);
    console.log(`  ✓ wrote ${newPosts.length} post(s) to app/lib/blog.ts`);

    // Write translations into each content/blog/<locale>.json.
    for (const loc of LOCALES) {
        const file = localeFile(loc);
        const arr = JSON.parse(await readFile(file, "utf8"));
        arr.push(...translations[loc]);
        await writeFile(file, JSON.stringify(arr, null, 4) + "\n");
        console.log(`  ✓ ${loc}.json now has ${arr.length} posts`);
    }

    console.log("\n✅ Done.");
}

main().catch((err) => {
    console.error("❌", err.message);
    process.exit(1);
});
