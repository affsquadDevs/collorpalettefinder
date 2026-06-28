"use client";

import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "../page.module.css";
import {
    getTextColor,
    hexToHsl,
    hslToHex,
    hexToRgb,
    contrastRatio,
    type PaletteRule,
    CURATED_PALETTES,
} from "../lib/colorUtils";
import { makeDots, HARMONY_OFFSETS } from "../components/ColorWheel";
import type { WheelDot } from "../components/ColorWheel";

const ColorWheel = dynamic(() => import("../components/ColorWheel"), { ssr: false });

const RULES: { rule: PaletteRule; label: string }[] = [
    { rule: "analogous", label: "Analogous" },
    { rule: "monochromatic", label: "Monochromatic" },
    { rule: "triadic", label: "Triadic" },
    { rule: "complementary", label: "Complementary" },
    { rule: "split-complementary", label: "Split Complementary" },
    { rule: "square", label: "Square" },
    { rule: "tetradic", label: "Compound" },
];

function CopySwatch({ hex }: { hex: string }) {
    const [copied, setCopied] = useState(false);
    const text = getTextColor(hex);
    const copy = () => {
        navigator.clipboard.writeText(hex).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        });
    };
    return (
        <button className={styles.swatch} style={{ background: hex, color: text } as React.CSSProperties} onClick={copy} title={`Copy ${hex}`}>
            <span className={styles.swatchHex}>{copied ? "✓" : hex.toUpperCase()}</span>
        </button>
    );
}

function ContrastChecker({ initialFg, initialBg }: { initialFg: string; initialBg: string }) {
    const [fg, setFg] = useState(initialFg);
    const [bg, setBg] = useState(initialBg);
    const [fgInput, setFgInput] = useState(initialFg.replace("#", ""));
    const [bgInput, setBgInput] = useState(initialBg.replace("#", ""));

    const ratio = useMemo(() => contrastRatio(fg, bg), [fg, bg]);

    const setColor = (which: "fg" | "bg", raw: string) => {
        const clean = raw.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
        if (which === "fg") setFgInput(clean);
        else setBgInput(clean);
        if (/^[0-9a-fA-F]{6}$/.test(clean)) {
            const full = "#" + clean;
            if (which === "fg") setFg(full);
            else setBg(full);
        }
    };

    const overall =
        ratio >= 7
            ? { label: "AAA", color: "#15803d" }
            : ratio >= 4.5
                ? { label: "AA", color: "#15803d" }
                : ratio >= 3
                    ? { label: "AA Large", color: "#b45309" }
                    : { label: "Fail", color: "#b91c1c" };

    const checks = [
        { label: "Normal text (AA 4.5:1)", size: 16, weight: 400, aa: ratio >= 4.5, aaa: ratio >= 7 },
        { label: "Large text (AA 3:1)", size: 22, weight: 700, aa: ratio >= 3, aaa: ratio >= 4.5 },
        { label: "UI & graphics (3:1)", size: 14, weight: 600, aa: ratio >= 3, aaa: ratio >= 3 },
    ];

    return (
        <section className={styles.contrastCard} aria-label="WCAG contrast checker">
            <div className={styles.contrastHeader}>
                <span className={styles.contrastTitle}>WCAG Contrast Checker</span>
                <div className={styles.contrastRatio} style={{ color: overall.color }}>
                    {ratio.toFixed(2)}:1
                    <span className={styles.contrastLevel}>{overall.label}</span>
                </div>
            </div>

            <div className={styles.contrastRow}>
                <label className={styles.contrastLabel}>
                    Text color
                    <div className={styles.contrastInputWrap}>
                        <span className={styles.contrastColorBox} style={{ background: fg }} />
                        <span className={styles.hashSign}>#</span>
                        <input
                            className={styles.contrastInput}
                            value={fgInput.toUpperCase()}
                            onChange={(e) => setColor("fg", e.target.value)}
                            maxLength={6}
                            spellCheck={false}
                            aria-label="Text color hex value"
                        />
                        <input
                            type="color"
                            className={styles.contrastNative}
                            value={fg}
                            onChange={(e) => setColor("fg", e.target.value.replace("#", ""))}
                            aria-label="Pick text color"
                        />
                    </div>
                </label>

                <label className={styles.contrastLabel}>
                    Background color
                    <div className={styles.contrastInputWrap}>
                        <span className={styles.contrastColorBox} style={{ background: bg }} />
                        <span className={styles.hashSign}>#</span>
                        <input
                            className={styles.contrastInput}
                            value={bgInput.toUpperCase()}
                            onChange={(e) => setColor("bg", e.target.value)}
                            maxLength={6}
                            spellCheck={false}
                            aria-label="Background color hex value"
                        />
                        <input
                            type="color"
                            className={styles.contrastNative}
                            value={bg}
                            onChange={(e) => setColor("bg", e.target.value.replace("#", ""))}
                            aria-label="Pick background color"
                        />
                    </div>
                </label>
            </div>

            <div className={styles.contrastPreviews}>
                {checks.map((c) => (
                    <div key={c.label} className={styles.contrastPreview} style={{ background: bg, color: fg }}>
                        <span className={styles.contrastPreviewLabel}>{c.label}</span>
                        <span className={styles.contrastPreviewText} style={{ fontSize: `${c.size}px`, fontWeight: c.weight }}>
                            The quick brown fox
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700 }}>
                            {c.aaa ? "AAA ✓" : c.aa ? "AA ✓" : "Fail ✕"}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function ToolPage() {
    const [hex, setHex] = useState("#5B5EA6");
    const [rule, setRule] = useState<PaletteRule>("complementary");
    const [open, setOpen] = useState(false);
    const dropRef = useRef<HTMLDivElement>(null);
    const [wheelDots, setWheelDots] = useState<WheelDot[] | null>(null);
    const [activeCurated, setActiveCurated] = useState<string | null>(null);

    const defaultDots = useMemo(() => makeDots(hex, rule), [hex, rule]);
    const dots = wheelDots || defaultDots;
    const hsl = useMemo(() => hexToHsl(hex), [hex]);
    const palettes = useMemo(() => {
        return RULES.map((r) => ({
            rule: r.rule,
            title: r.label,
            colors: makeDots(hex, r.rule).map((d) => ({ hex: d.hex })),
        }));
    }, [hex]);
    const [hexInput, setHexInput] = useState(hex.replace("#", ""));

    const handleCuratedClick = (p: typeof CURATED_PALETTES[0]) => {
        const firstHex = p.colors[0];
        setHex(firstHex);
        setHexInput(firstHex.replace("#", ""));
        setActiveCurated(p.title);

        const customDots: WheelDot[] = p.colors.map((c, i) => {
            const { h, s, l } = hexToHsl(c);
            return { hue: h, saturation: s, lightness: l, label: i === 0 ? "Primary" : `Color ${i + 1}`, hex: c };
        });
        setWheelDots(customDots);
    };

    const handleHexInput = (val: string) => {
        setHexInput(val.replace(/[^0-9a-fA-F]/g, "").slice(0, 6));
        const full = "#" + val;
        if (/^#[0-9a-fA-F]{6}$/.test(full)) {
            setHex(full);
            setWheelDots(null);
            setActiveCurated(null);
        }
    };
    const handleHueSlider = (h: number) => {
        const newHex = hslToHex(h, hsl.s, hsl.l);
        setHex(newHex);
        setHexInput(newHex.replace("#", ""));
        setWheelDots(null);
        setActiveCurated(null);
    };

    const activeRule = RULES.find((r) => r.rule === rule)!;

    return (
        <div className={styles.root}>
            <header className={styles.topbar}>
                <div className={styles.dropdownWrap} ref={dropRef}>
                    <div className={styles.dropdownGroup}>
                        <span className={styles.dropdownMeta}>Color Harmony</span>
                        <button className={styles.dropdownTrigger} onClick={() => setOpen((v) => !v)}>
                            {activeRule.label}
                            <svg width="12" height="12" viewBox="0 0 12 12">
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    {open && (
                        <div className={styles.dropdown}>
                            {RULES.map((r) => (
                                <button key={r.rule} className={`${styles.dropdownItem} ${rule === r.rule ? styles.dropdownItemActive : ""}`} onClick={() => { setRule(r.rule); setWheelDots(null); setActiveCurated(null); setOpen(false); }}>
                                    {r.label}{rule === r.rule && <span className={styles.checkmark}>✓</span>}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.topHexWrap}>
                    <div className={styles.topHexSwatch} style={{ background: hex }} />
                    <span className={styles.hashSign}>#</span>
                    <input type="text" value={hexInput.toUpperCase()} onChange={(e) => handleHexInput(e.target.value)} className={styles.topHexInput} maxLength={6} spellCheck={false} />
                    <input type="color" value={hex} onChange={(e) => { setHex(e.target.value); setHexInput(e.target.value.replace("#", "")); setWheelDots(null); setActiveCurated(null); }} className={styles.topNativePicker} title="Pick color" />
                </div>
            </header>

            <main className={styles.main}>
                <div className={styles.wheelSection}>
                    <ColorWheel primaryHex={hex} rule={rule} onChange={(h) => { setHex(h); setHexInput(h.replace("#", "")); setActiveCurated(null); }} onPaletteChange={setWheelDots} overrideDots={wheelDots} />
                    <div className={styles.sliderRow}>
                        <input type="range" min={0} max={359} value={hsl.h} onChange={(e) => handleHueSlider(Number(e.target.value))} className={styles.hueSlider} />
                    </div>
                </div>

                <div className={styles.paletteStrip}>
                    {dots.map((dot) => <CopySwatch key={dot.hex + dot.label} hex={dot.hex} />)}
                </div>

                <ContrastChecker initialFg={hex} initialBg="#FFFFFF" />

                <section className={styles.allPalettes}>
                    <h2 className={styles.sectionTitle}>All Harmony Palettes</h2>
                    <div className={styles.palettesGrid}>
                        {palettes.map((p) => (
                            <div key={p.rule} className={`${styles.paletteCard} ${p.rule === rule && !activeCurated ? styles.paletteCardActive : ""}`} onClick={() => { setRule(p.rule); setWheelDots(null); setActiveCurated(null); }}>
                                <div className={styles.paletteCardStrip}>
                                    {p.colors.map((c) => (
                                        <div key={c.hex} className={styles.paletteCardChip} style={{ background: c.hex }} title={c.hex} onClick={() => {
                                            navigator.clipboard.writeText(c.hex);
                                        }} />
                                    ))}
                                </div>
                                <div className={styles.paletteCardMeta}>
                                    <span className={styles.paletteCardTitle}>{p.title}</span>
                                    <span className={styles.paletteCardCount}>{p.colors.length} colors</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.allPalettes} style={{ paddingBottom: '32px' }}>
                    <h2 className={styles.sectionTitle}>Curated Palettes</h2>
                    <div className={styles.palettesGrid}>
                        {CURATED_PALETTES.map((p, idx) => (
                            <div key={idx} className={`${styles.paletteCard} ${activeCurated === p.title ? styles.paletteCardActive : ""}`} onClick={() => handleCuratedClick(p)}>
                                <div className={styles.paletteCardStrip}>
                                    {p.colors.map((hexColor) => (
                                        <div key={hexColor} className={styles.paletteCardChip} style={{ background: hexColor }} title={hexColor} onClick={(e) => {
                                            navigator.clipboard.writeText(hexColor);
                                        }} />
                                    ))}
                                </div>
                                <div className={styles.paletteCardMeta}>
                                    <span className={styles.paletteCardTitle}>{p.title}</span>
                                    <span className={styles.paletteCardCount}>{p.colors.length} colors</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <article className="w-full max-w-[960px] px-6 mt-10 text-gray-700">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Color Palette Generator</h2>
                    <p className="mb-4 leading-relaxed">
                        This free color palette generator turns a single starting color into a complete, harmonious
                        scheme using classic color-theory math. Pick a base color with the wheel, the hue slider, or by
                        typing a hex code, then choose a harmony rule to instantly see a matching set of colors. Every
                        swatch can be copied to your clipboard with one click, ready to paste straight into CSS,
                        Tailwind, Figma, or any design tool.
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 mb-8 leading-relaxed">
                        <li><strong>Choose a base color</strong> — drag the dot on the color wheel, move the hue slider, type a six-digit hex value, or use the native color picker in the top bar.</li>
                        <li><strong>Select a harmony rule</strong> — open the “Color Harmony” dropdown and pick the relationship you want (complementary, analogous, triadic, and more).</li>
                        <li><strong>Copy your colors</strong> — hover a swatch in the palette strip to reveal its hex code, then click to copy it.</li>
                        <li><strong>Check accessibility</strong> — use the built-in WCAG contrast checker above to confirm your text and background colors are readable.</li>
                        <li><strong>Explore variations</strong> — scan the “All Harmony Palettes” grid to compare every rule for your base color, or start from one of the curated palettes.</li>
                    </ol>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">The Seven Color Harmony Rules</h2>
                    <p className="mb-4 leading-relaxed">
                        Color harmonies describe how hues relate to one another on the color wheel. Each rule produces a
                        different mood and level of contrast:
                    </p>
                    <ul className="space-y-3 mb-8 leading-relaxed">
                        <li><strong>Complementary</strong> — two hues directly opposite each other (180° apart). Maximum contrast and energy; great for calls to action.</li>
                        <li><strong>Analogous</strong> — neighboring hues (about 30° apart). Calm, cohesive, and natural-looking.</li>
                        <li><strong>Triadic</strong> — three hues evenly spaced 120° apart. Vibrant yet balanced.</li>
                        <li><strong>Split-Complementary</strong> — a base color plus the two hues flanking its complement. Strong contrast with less tension than pure complementary.</li>
                        <li><strong>Tetradic</strong> — four hues forming a rectangle on the wheel. Rich and varied; works best with one dominant color.</li>
                        <li><strong>Square</strong> — four hues evenly spaced 90° apart. Bold and balanced with equal visual weight.</li>
                        <li><strong>Monochromatic</strong> — a single hue at varying lightness and saturation. Elegant, clean, and easy to apply.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Checking Color Contrast for Accessibility</h2>
                    <p className="mb-4 leading-relaxed">
                        A beautiful palette still needs to be readable. The Web Content Accessibility Guidelines (WCAG)
                        define minimum contrast ratios between text and its background: <strong>4.5:1</strong> for normal
                        body text and <strong>3:1</strong> for large text to meet the AA level, and <strong>7:1</strong>
                        for the stricter AAA level. The contrast checker on this page calculates the exact ratio between
                        any two colors and shows whether they pass AA or AAA, so you can adjust your palette before it
                        ships.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <div className="space-y-5 mb-4 leading-relaxed">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Is the color palette generator free?</h3>
                            <p>Yes. The tool is completely free for both personal and commercial projects, with no sign-up required.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">What color formats does it support?</h3>
                            <p>You can enter and copy colors as hex codes, and each generated color is calculated from its underlying HSL and RGB values.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-1">Which harmony rule should I use?</h3>
                            <p>Use complementary or split-complementary for high-impact accents, analogous or monochromatic for calm and cohesive interfaces, and triadic or square when you need a richer, multi-color scheme.</p>
                        </div>
                    </div>
                </article>
            </main>
            <footer className={styles.footer}>Color theory tool · 7 harmony rules</footer>
        </div>
    );
}
