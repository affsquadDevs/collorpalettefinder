"use client";

import { useState, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { Markdown } from "@/app/components/Markdown";
import styles from "@/app/page.module.css";
import {
    getTextColor,
    hexToHsl,
    hslToHex,
    hexToRgb,
    contrastRatio,
    type PaletteRule,
    CURATED_PALETTES,
} from "@/app/lib/colorUtils";
import { copyToClipboard } from "@/app/lib/clipboard";
import { makeDots, HARMONY_OFFSETS } from "@/app/components/ColorWheel";
import type { WheelDot } from "@/app/components/ColorWheel";

const ColorWheel = dynamic(() => import("@/app/components/ColorWheel"), { ssr: false });

const RULES: { rule: PaletteRule; key: string }[] = [
    { rule: "analogous", key: "ruleAnalogous" },
    { rule: "monochromatic", key: "ruleMonochromatic" },
    { rule: "triadic", key: "ruleTriadic" },
    { rule: "complementary", key: "ruleComplementary" },
    { rule: "split-complementary", key: "ruleSplitComplementary" },
    { rule: "square", key: "ruleSquare" },
    { rule: "tetradic", key: "ruleCompound" },
];

function CopySwatch({ hex }: { hex: string }) {
    const [copied, setCopied] = useState(false);
    const text = getTextColor(hex);
    const copy = () => {
        copyToClipboard(hex).then((ok) => {
            if (!ok) return;
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
    const t = useTranslations("tool");
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
        { label: t("contrastNormal"), size: 16, weight: 400, aa: ratio >= 4.5, aaa: ratio >= 7 },
        { label: t("contrastLarge"), size: 22, weight: 700, aa: ratio >= 3, aaa: ratio >= 4.5 },
        { label: t("contrastUiGraphics"), size: 14, weight: 600, aa: ratio >= 3, aaa: ratio >= 3 },
    ];

    return (
        <section className={styles.contrastCard} aria-label={t("contrastTitle")}>
            <div className={styles.contrastHeader}>
                <span className={styles.contrastTitle}>{t("contrastTitle")}</span>
                <div className={styles.contrastRatio} style={{ color: overall.color }}>
                    {ratio.toFixed(2)}:1
                    <span className={styles.contrastLevel}>{overall.label}</span>
                </div>
            </div>

            <div className={styles.contrastRow}>
                <label className={styles.contrastLabel}>
                    {t("contrastTextColor")}
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
                    {t("contrastBgColor")}
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
                            {t("contrastSample")}
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
    const t = useTranslations("tool");
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
    const ruleLabel = (r: PaletteRule) => t(RULES.find((x) => x.rule === r)!.key);

    return (
        <div className={styles.root}>
            <header className={styles.topbar}>
                <div className={styles.dropdownWrap} ref={dropRef}>
                    <div className={styles.dropdownGroup}>
                        <span className={styles.dropdownMeta}>{t("harmonyLabel")}</span>
                        <button className={styles.dropdownTrigger} onClick={() => setOpen((v) => !v)}>
                            {ruleLabel(rule)}
                            <svg width="12" height="12" viewBox="0 0 12 12">
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                    {open && (
                        <div className={styles.dropdown}>
                            {RULES.map((r) => (
                                <button key={r.rule} className={`${styles.dropdownItem} ${rule === r.rule ? styles.dropdownItemActive : ""}`} onClick={() => { setRule(r.rule); setWheelDots(null); setActiveCurated(null); setOpen(false); }}>
                                    {t(r.key)}{rule === r.rule && <span className={styles.checkmark}>✓</span>}
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
                    <h2 className={styles.sectionTitle}>{t("allHarmonyTitle")}</h2>
                    <div className={styles.palettesGrid}>
                        {palettes.map((p) => (
                            <div key={p.rule} className={`${styles.paletteCard} ${p.rule === rule && !activeCurated ? styles.paletteCardActive : ""}`} onClick={() => { setRule(p.rule); setWheelDots(null); setActiveCurated(null); }}>
                                <div className={styles.paletteCardStrip}>
                                    {p.colors.map((c) => (
                                        <div key={c.hex} className={styles.paletteCardChip} style={{ background: c.hex }} title={c.hex} onClick={() => {
                                            copyToClipboard(c.hex);
                                        }} />
                                    ))}
                                </div>
                                <div className={styles.paletteCardMeta}>
                                    <span className={styles.paletteCardTitle}>{ruleLabel(p.rule)}</span>
                                    <span className={styles.paletteCardCount}>{p.colors.length} {t("colorsSuffix")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.allPalettes} style={{ paddingBottom: '32px' }}>
                    <h2 className={styles.sectionTitle}>{t("curatedTitle")}</h2>
                    <div className={styles.palettesGrid}>
                        {CURATED_PALETTES.map((p, idx) => (
                            <div key={idx} className={`${styles.paletteCard} ${activeCurated === p.title ? styles.paletteCardActive : ""}`} onClick={() => handleCuratedClick(p)}>
                                <div className={styles.paletteCardStrip}>
                                    {p.colors.map((hexColor) => (
                                        <div key={hexColor} className={styles.paletteCardChip} style={{ background: hexColor }} title={hexColor} onClick={() => {
                                            copyToClipboard(hexColor);
                                        }} />
                                    ))}
                                </div>
                                <div className={styles.paletteCardMeta}>
                                    <span className={styles.paletteCardTitle}>{p.title}</span>
                                    <span className={styles.paletteCardCount}>{p.colors.length} {t("colorsSuffix")}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <article className="w-full max-w-[960px] px-6 mt-10">
                    <Markdown body={t("proseBody")} />
                </article>
            </main>
            <footer className={styles.footer}>{t("footerNote")}</footer>
        </div>
    );
}
