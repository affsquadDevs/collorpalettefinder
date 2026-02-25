import { NextResponse } from "next/server";

const INDEXNOW_KEY = "6ea06f23f1a44f28821755de51d6d83c";
const HOST = "colorpalettefinder.com";

const SITE_URLS = [
    `https://${HOST}`,
    `https://${HOST}/color-palette-generator`,
    `https://${HOST}/how-it-works`,
    `https://${HOST}/about`,
    `https://${HOST}/contact`,
    `https://${HOST}/blog`,
    `https://${HOST}/privacy-policy`,
    `https://${HOST}/terms-of-service`,
];

export async function GET() {
    try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
                host: HOST,
                key: INDEXNOW_KEY,
                keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
                urlList: SITE_URLS,
            }),
        });

        return NextResponse.json({
            success: response.ok,
            status: response.status,
            statusText: response.statusText,
            urlsSubmitted: SITE_URLS.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: String(error) },
            { status: 500 }
        );
    }
}
