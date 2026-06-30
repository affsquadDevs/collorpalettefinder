#!/usr/bin/env node
/*
 * IndexNow submitter for colorpalettefinder.com
 *
 * Submits URLs to IndexNow (Bing + partner engines). It deliberately avoids
 * "batch everything on every deploy": in changed-mode it maps the files touched
 * by a deploy to the URL patterns they affect, then intersects that with the
 * live sitemap's URL set — so only the affected URLs are pinged.
 *
 * Usage:
 *   node scripts/indexnow.mjs --all                      # submit every sitemap URL (first run / manual)
 *   node scripts/indexnow.mjs --since <sha> --to <sha>   # submit only URLs affected by that commit range
 *   flags: --dry-run (print, don't POST), --endpoint <url>, --sitemap <url>
 *
 * Env overrides: INDEXNOW_KEY, INDEXNOW_ENDPOINT, INDEXNOW_SITEMAP, INDEXNOW_HOST
 */

import { execSync } from "node:child_process";

const HOST = process.env.INDEXNOW_HOST || "colorpalettefinder.com";
const ORIGIN = `https://${HOST}`;
const KEY = process.env.INDEXNOW_KEY || "08032a5578984dae90dd5de4d005ed3a";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";
const SITEMAP = process.env.INDEXNOW_SITEMAP || `${ORIGIN}/sitemap.xml`;

// Keep in sync with i18n/routing.ts
const LOCALES = ["en", "es", "pt", "pl", "de", "fr", "uk", "it"];
const NON_EN = LOCALES.filter((l) => l !== "en");

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const val = (f) => {
    const i = args.indexOf(f);
    return i >= 0 ? args[i + 1] : undefined;
};
const DRY = has("--dry-run");

function die(msg) {
    console.error(`✗ ${msg}`);
    process.exit(1);
}

async function fetchSitemapUrls() {
    const res = await fetch(SITEMAP, { headers: { "cache-control": "no-cache" } }).catch((e) => die(`fetch ${SITEMAP}: ${e.message}`));
    if (!res.ok) die(`could not fetch sitemap ${SITEMAP}: HTTP ${res.status}`);
    const xml = await res.text();
    const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    if (locs.length === 0) die(`sitemap ${SITEMAP} contained no <loc> entries`);
    return [...new Set(locs)];
}

// First path segment if it is a known non-English locale, else "en".
function localeOf(url) {
    const seg = url.slice(ORIGIN.length).replace(/^\//, "").split("/")[0];
    return NON_EN.includes(seg) ? seg : "en";
}

// Path with the locale prefix stripped, normalized: home => "/", no trailing slash.
function barePath(url) {
    let p = url.slice(ORIGIN.length);
    const parts = p.replace(/^\//, "").split("/");
    if (NON_EN.includes(parts[0])) parts.shift();
    p = "/" + parts.join("/");
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return p;
}

const ZERO = "0".repeat(40);
function changedFiles(since, to) {
    if (!since || since === ZERO) return null; // no usable base → caller submits all
    try {
        return execSync(`git diff --name-only ${since} ${to || "HEAD"}`, { encoding: "utf8" })
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
    } catch (e) {
        console.warn(`! git diff ${since}..${to} failed (${e.message}); will submit all`);
        return null;
    }
}

// Files that change no page content → never trigger a submission.
const IGNORE = [
    /^app\/sitemap\.ts$/, /^app\/robots\.[jt]s$/,
    /opengraph-image\.[jt]sx?$/, /^app\/(icon|apple-icon|favicon)\./,
    /^public\//, /^scripts\//, /^\.github\//,
    /\.md$/i, /^README/i, /^LICENSE/i, /^\.gitignore$/, /^\.vercelignore$/,
    /eslint/i, /^\.prettier/, /^\.editorconfig$/,
];
// Files that affect every page → submit all.
const GLOBAL = [
    /^app\/\[locale\]\/layout\.tsx$/,
    /^app\/\[locale\]\/not-found\.tsx$/,
    /^app\/components\//,
    /^app\/globals\.css$/,
    /^i18n\//, /^proxy\.ts$/, /^next\.config\.[jt]s$/, /^middleware\.[jt]s$/,
    /^app\/lib\/hreflang\.ts$/,
    /^package(-lock)?\.json$/, /^tsconfig\.json$/, /^postcss\.config/, /^tailwind\./,
];

// → "ALL" | "NONE" | predicate(url)=>boolean
function scopeForFile(file) {
    for (const re of IGNORE) if (re.test(file)) return "NONE";
    for (const re of GLOBAL) if (re.test(file)) return "ALL";

    let m;
    // Per-locale UI strings → every URL of that locale.
    if ((m = file.match(/^messages\/([a-z]{2})\.json$/))) {
        const loc = m[1];
        return (u) => localeOf(u) === loc;
    }
    // Per-locale blog content → that locale's blog index + posts.
    if ((m = file.match(/^content\/blog\/([a-z]{2})\.json$/))) {
        const loc = m[1];
        return (u) => localeOf(u) === loc && /^\/blog(\/|$)/.test(barePath(u));
    }
    // Per-locale interior content → that locale's pillar + room pages.
    if ((m = file.match(/^content\/interior\/([a-z]{2})\.json$/))) {
        const loc = m[1];
        return (u) => localeOf(u) === loc && /^\/interior-color-palettes(\/|$)/.test(barePath(u));
    }
    // English source data (canonical + fallback for all locales).
    if (/^app\/lib\/blog\.ts$/.test(file)) return (u) => /^\/blog(\/|$)/.test(barePath(u));
    if (/^app\/lib\/(interiorRooms|interiorPalettes|interiorContent)\.ts$/.test(file))
        return (u) => /^\/interior-color-palettes(\/|$)/.test(barePath(u));
    if (/^app\/lib\/localizedContent\.ts$/.test(file)) return (u) => /^\/(blog|interior-color-palettes)(\/|$)/.test(barePath(u));
    if (/^app\/lib\/colorUtils\.ts$/.test(file))
        return (u) => barePath(u) === "/color-palette-generator" || /^\/interior-color-palettes(\/|$)/.test(barePath(u));

    // Route components: app/[locale]/<segment...>/page.tsx → that segment, all locales.
    if ((m = file.match(/^app\/\[locale\]\/(.+)\/page\.tsx$/))) {
        const seg = m[1];
        if (seg === "blog/[slug]") return (u) => /^\/blog\/[^/]+$/.test(barePath(u));
        if (seg === "blog") return (u) => barePath(u) === "/blog";
        if (seg === "interior-color-palettes/[room]") return (u) => /^\/interior-color-palettes\/[^/]+$/.test(barePath(u));
        return (u) => barePath(u) === "/" + seg; // about, contact, how-it-works, privacy-policy, terms-of-service, interior-color-palettes, color-palette-generator
    }
    if (/^app\/\[locale\]\/page\.tsx$/.test(file)) return (u) => barePath(u) === "/";

    // Unknown but under a source dir → be safe, submit all.
    if (/^(app|content|messages)\//.test(file)) return "ALL";
    return "NONE";
}

function affectedUrls(allUrls, files) {
    const preds = [];
    for (const f of files) {
        const s = scopeForFile(f);
        if (s === "ALL") return { urls: allUrls, reason: `global change in "${f}"` };
        if (s === "NONE") continue;
        preds.push(s);
    }
    if (preds.length === 0) return { urls: [], reason: "no content-affecting files changed" };
    return { urls: allUrls.filter((u) => preds.some((p) => p(u))), reason: "mapped from changed files" };
}

async function submit(urls) {
    if (urls.length === 0) {
        console.log("IndexNow: nothing to submit.");
        return;
    }
    console.log(`IndexNow: submitting ${urls.length} URL(s) → ${ENDPOINT}`);
    urls.slice(0, 25).forEach((u) => console.log("   •", u));
    if (urls.length > 25) console.log(`   …and ${urls.length - 25} more`);
    if (DRY) {
        console.log("(--dry-run: not sending)");
        return;
    }
    for (let i = 0; i < urls.length; i += 10000) {
        const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls.slice(i, i + 10000) };
        const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify(body),
        });
        const text = await res.text().catch(() => "");
        console.log(`IndexNow response: ${res.status} ${res.statusText}${text ? " — " + text.slice(0, 200) : ""}`);
        // 200 OK and 202 Accepted both mean success.
        if (res.status !== 200 && res.status !== 202) die(`submission failed (HTTP ${res.status}).`);
    }
    console.log("IndexNow: done ✓");
}

// ── main ──────────────────────────────────────────────────────────────────────
const all = await fetchSitemapUrls();
let urls;
if (has("--all")) {
    console.log(`Mode: ALL — ${all.length} URL(s) from sitemap.`);
    urls = all;
} else {
    const files = changedFiles(val("--since"), val("--to"));
    if (files === null) {
        console.log("Mode: CHANGED but no usable diff base — falling back to ALL.");
        urls = all;
    } else {
        console.log(`Mode: CHANGED — ${files.length} file(s) in range:`);
        files.forEach((f) => console.log("   ·", f));
        const { urls: u, reason } = affectedUrls(all, files);
        console.log(`Affected: ${u.length} URL(s) (${reason}).`);
        urls = u;
    }
}
await submit(urls);
