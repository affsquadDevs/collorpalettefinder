"use client";

import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import styles from "../page.module.css";
import {
    getTextColor,
    hexToHsl,
    hslToHex,
    hexToRgb,
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
            </main>
            <footer className={styles.footer}>Color theory tool · 7 harmony rules</footer>
        </div>
    );
}
