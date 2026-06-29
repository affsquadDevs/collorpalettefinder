import { INTERIOR_PALETTES } from "./interiorPalettes";

// ─── Color Conversion Utilities ──────────────────────────────────────────────

export interface ColorInfo {
    hex: string;
    rgb: { r: number; g: number; b: number };
    hsl: { h: number; s: number; l: number };
    name?: string;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const clean = hex.replace("#", "");
    const full =
        clean.length === 3
            ? clean
                .split("")
                .map((c) => c + c)
                .join("")
            : clean;
    return {
        r: parseInt(full.slice(0, 2), 16),
        g: parseInt(full.slice(2, 4), 16),
        b: parseInt(full.slice(4, 6), 16),
    };
}

export function rgbToHex(r: number, g: number, b: number): string {
    return (
        "#" +
        [r, g, b]
            .map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0"))
            .join("")
    );
}

export function rgbToHsl(
    r: number,
    g: number,
    b: number
): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
}

export function hslToRgb(
    h: number,
    s: number,
    l: number
): { r: number; g: number; b: number } {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
        r: Math.round(f(0) * 255),
        g: Math.round(f(8) * 255),
        b: Math.round(f(4) * 255),
    };
}

export function hslToHex(h: number, s: number, l: number): string {
    const { r, g, b } = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
    const { r, g, b } = hexToRgb(hex);
    return rgbToHsl(r, g, b);
}

export function makeColorInfo(hex: string): ColorInfo {
    const rgb = hexToRgb(hex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { hex: hex.toUpperCase(), rgb, hsl };
}

// ─── Luminance & Contrast ────────────────────────────────────────────────────

export function relativeLuminance(r: number, g: number, b: number): number {
    const toLinear = (v: number) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function contrastRatio(hex1: string, hex2: string): number {
    const c1 = hexToRgb(hex1);
    const c2 = hexToRgb(hex2);
    const l1 = relativeLuminance(c1.r, c1.g, c1.b);
    const l2 = relativeLuminance(c2.r, c2.g, c2.b);
    const bright = Math.max(l1, l2);
    const dark = Math.min(l1, l2);
    return Math.round(((bright + 0.05) / (dark + 0.05)) * 100) / 100;
}

export function getTextColor(hex: string): string {
    const { r, g, b } = hexToRgb(hex);
    const l = relativeLuminance(r, g, b);
    return l > 0.179 ? "#000000" : "#ffffff";
}

// ─── Palette Generation Rules ────────────────────────────────────────────────

function clampHue(h: number): number {
    return ((h % 360) + 360) % 360;
}

export type PaletteRule =
    | "complementary"
    | "analogous"
    | "triadic"
    | "tetradic"
    | "split-complementary"
    | "monochromatic"
    | "square";

export interface PaletteColor {
    hex: string;
    label: string;
    hsl: { h: number; s: number; l: number };
    rgb: { r: number; g: number; b: number };
}

export interface Palette {
    rule: PaletteRule;
    title: string;
    description: string;
    colors: PaletteColor[];
}

function makeColor(h: number, s: number, l: number, label: string): PaletteColor {
    const hex = hslToHex(h, s, l);
    const rgb = hexToRgb(hex);
    return { hex: hex.toUpperCase(), label, hsl: { h, s, l }, rgb };
}

export function generatePalettes(hex: string): Palette[] {
    const { h, s, l } = hexToHsl(hex);

    // Fix: wider, more faithful saturation/lightness range
    const cs = Math.min(Math.max(s, 40), 90);
    const cl = Math.min(Math.max(l, 35), 70);

    const palettes: Palette[] = [
        // 1. Complementary
        {
            rule: "complementary",
            title: "Complementary",
            description: "Opposite hues on the color wheel — high contrast, bold, vibrant.",
            colors: [
                makeColor(h, cs, cl, "Primary"),
                makeColor(h, cs, Math.min(cl + 15, 90), "Primary Light"),
                makeColor(clampHue(h + 180), cs, cl, "Complement"),
                makeColor(clampHue(h + 180), cs, Math.min(cl + 15, 90), "Complement Light"),
            ],
        },

        // 2. Analogous
        {
            rule: "analogous",
            title: "Analogous",
            description: "Adjacent hues — harmonious, serene, naturally pleasing.",
            colors: [
                makeColor(clampHue(h - 30), cs, cl, "−30°"),
                makeColor(clampHue(h - 15), cs, Math.max(cl - 5, 20), "−15°"),
                makeColor(h, cs, cl, "Primary"),
                makeColor(clampHue(h + 15), cs, Math.max(cl - 5, 20), "+15°"),
                makeColor(clampHue(h + 30), cs, cl, "+30°"),
            ],
        },

        // 3. Triadic
        {
            rule: "triadic",
            title: "Triadic",
            description: "Three evenly spaced hues (120° apart) — balanced and rich.",
            colors: [
                makeColor(h, cs, cl, "Primary"),
                makeColor(clampHue(h + 120), cs, cl, "Second"),
                makeColor(clampHue(h + 240), cs, cl, "Third"),
                makeColor(h, Math.max(cs - 20, 10), Math.min(cl + 30, 92), "Primary Tint"),
            ],
        },

        // 4. Split-Complementary
        {
            rule: "split-complementary",
            title: "Split-Complementary",
            description: "Primary + two colors flanking its complement — softer than complementary.",
            colors: [
                makeColor(h, cs, cl, "Primary"),
                makeColor(clampHue(h + 150), cs, cl, "Left Split"),
                makeColor(clampHue(h + 210), cs, cl, "Right Split"),
                makeColor(h, Math.max(cs - 15, 10), Math.min(cl + 25, 90), "Tint"),
            ],
        },

        // 5. Tetradic (Rectangle) — fix: proper 90° spacing
        {
            rule: "tetradic",
            title: "Tetradic",
            description: "Four hues forming a rectangle on the wheel — diverse and vivid.",
            colors: [
                makeColor(h, cs, cl, "Primary"),
                makeColor(clampHue(h + 90), cs, cl, "Second"),
                makeColor(clampHue(h + 180), cs, cl, "Complement"),
                makeColor(clampHue(h + 270), cs, cl, "Fourth"),
            ],
        },

        // 6. Square
        {
            rule: "square",
            title: "Square",
            description: "Four evenly spaced hues (90° apart) — bold, equal weight.",
            colors: [
                makeColor(h, cs, cl, "Primary"),
                makeColor(clampHue(h + 90), cs, cl, "+90°"),
                makeColor(clampHue(h + 180), cs, cl, "+180°"),
                makeColor(clampHue(h + 270), cs, cl, "+270°"),
            ],
        },

        // 7. Monochromatic
        {
            rule: "monochromatic",
            title: "Monochromatic",
            description: "Same hue, varying lightness and saturation — elegant and cohesive.",
            colors: [
                makeColor(h, cs, Math.max(cl - 30, 10), "Darkest"),
                makeColor(h, cs, Math.max(cl - 15, 15), "Dark"),
                makeColor(h, cs, cl, "Base"),
                makeColor(h, Math.max(cs - 15, 10), Math.min(cl + 20, 85), "Light"),
                makeColor(h, Math.max(cs - 25, 5), Math.min(cl + 38, 94), "Lightest"),
            ],
        },
    ];

    return palettes;
}

export const CURATED_PALETTES = [
    {
        title: "Sunset Glow",
        colors: ["#FF7B54", "#FFB26B", "#FFD56F", "#939B62"],
    },
    {
        title: "Ocean Breeze",
        colors: ["#00B4D8", "#0096C7", "#0077B6", "#023E8A"],
    },
    {
        title: "Forest Canopy",
        colors: ["#2D6A4F", "#40916C", "#52B788", "#74C69D"],
    },
    {
        title: "Lavender Dream",
        colors: ["#C8B6FF", "#E7C6FF", "#FFD6FF", "#B8C0FF"],
    },
    {
        title: "Berry Bliss",
        colors: ["#9D0208", "#D00000", "#DC2F02", "#E85D04"],
    },
    {
        title: "Midnight City",
        colors: ["#121212", "#282828", "#3F3F3F", "#575757"],
    },
    {
        title: "Neon Cyberpunk",
        colors: ["#7109AA", "#B20238", "#E70A8A", "#0DFBE8"],
    },
    {
        title: "Pastel Spring",
        colors: ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF"],
    },
    {
        title: "Earthy Neutrals",
        colors: ["#D4A373", "#CCD5AE", "#E9EDC9", "#FEFAE0"],
    },
    {
        title: "Deep Space",
        colors: ["#0B0C10", "#1F2833", "#C5C6C7", "#45A29E"],
    },
    {
        title: "Autumn Leaves",
        colors: ["#6B2D5C", "#A3333D", "#E07A5F", "#F2CC8F"],
    },
    {
        title: "Winter Frost",
        colors: ["#E0FBFC", "#98C1D9", "#3D5A80", "#293241"],
    },
    {
        title: "Vintage Cinema",
        colors: ["#2C363F", "#E75A7C", "#F8F1FF", "#A7A5C6"],
    },
    {
        title: "Desert Sands",
        colors: ["#EDC7B7", "#EEE2DC", "#BAB2B5", "#123C69"],
    },
    {
        title: "Tropical Sunrise",
        colors: ["#F9A03F", "#F7D08A", "#E3F09B", "#87B6A7"],
    },
    {
        title: "Mystic Woods",
        colors: ["#5C4D7D", "#4C5B61", "#829399", "#D0E5E0"],
    },
    {
        title: "Cyber Neon",
        colors: ["#FF007F", "#7F00FF", "#00FFFF", "#00FF00"],
    },
    {
        title: "Soft Pastels",
        colors: ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9"],
    },
    {
        title: "Coffee House",
        colors: ["#4A3B32", "#705A4A", "#997A61", "#C4A484"],
    },
    {
        title: "Royal Velvet",
        colors: ["#311432", "#4D194D", "#7C227C", "#A52A2A"],
    },
    {
        title: "Earthy Boho",
        colors: ["#A3A380", "#D6CE93", "#EFEBCE", "#D8A48F", "#BB8588"],
    },
    {
        title: "Retro 80s",
        colors: ["#FF90B3", "#FFC2E2", "#B8B5FF", "#7868E6", "#EDF6E5"],
    },
    {
        title: "Vivid Triplet",
        colors: ["#FF0054", "#9E0059", "#390099"],
    },
    {
        title: "Minty Fresh",
        colors: ["#B5EAD7", "#C7CEEA", "#FF9AA2"],
    },
    {
        title: "Warm Ombre",
        colors: ["#FF7B54", "#FFB26B", "#FFD56F", "#F9F871", "#939B62", "#00887A"],
    },
    // Interior / room palettes (also featured on /interior-color-palettes)
    ...INTERIOR_PALETTES.map((p) => ({ title: p.title, colors: p.colors })),
];
