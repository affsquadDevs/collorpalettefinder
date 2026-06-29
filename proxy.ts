import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except for:
    // - /api routes
    // - Next.js internals (/_next, /_vercel)
    // - static files at the root with a file extension (favicon, ads.txt, og images, etc.)
    matcher: ["/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)"],
};
