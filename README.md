# colorPaletteFinder

A free, modern color palette generator built with color theory. Pick a primary color and instantly get harmonious palettes — complementary, analogous, triadic, split-complementary, tetradic, square, and monochromatic.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Page Structure

| Route | Description |
|---|---|
| `/` | Homepage — hero, features grid, FAQ with JSON-LD schema |
| `/color-palette-generator` | Main tool — color wheel, harmony rules, palette strip, contrast checker |
| `/how-it-works` | Educational page explaining color theory principles |
| `/about` | About the project |
| `/contact` | Contact page |
| `/blog` | Blog listing |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

## Key File Locations

| File | Path | Notes |
|---|---|---|
| Favicon (ICO) | `public/favicon.ico` | Browser tab icon |
| Favicon (PNG) | `public/favicon.png` | PNG fallback |
| Apple Touch Icon | `public/apple-touch-icon.png` | iOS home screen icon |
| OG Image | `public/og/og-image.png` | 1200×630 social preview image |
| Logo (SVG) | `public/logo.svg` | Site logo used in Navbar & Footer |
| robots.txt | `app/robots.ts` | Generated via Next.js Metadata API |
| sitemap.xml | `app/sitemap.ts` | Generated via Next.js Metadata API |
| ads.txt | `public/ads.txt` | Static file served from `/public` |
| IndexNow Key | `public/6ea06f23f1a44f28821755de51d6d83c.txt` | Bing IndexNow verification |
| Vercel Config | `vercel.json` | Rewrites & caching headers for static assets |
