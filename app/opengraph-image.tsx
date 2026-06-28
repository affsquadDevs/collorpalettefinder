import { ImageResponse } from "next/og";

// Branded 1200x630 Open Graph image generated at build time (next/og).
export const alt = "colorPaletteFinder — Free Color Palette Generator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PALETTE = ["#FF7B54", "#FFB26B", "#FFD56F", "#5B5EA6", "#0096C7", "#2D6A4F"];

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    background: "#ffffff",
                    fontFamily: "sans-serif",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "0 90px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            fontSize: 30,
                            color: "#2563eb",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            marginBottom: 24,
                        }}
                    >
                        colorPaletteFinder
                    </div>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 74,
                            fontWeight: 800,
                            color: "#111827",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        Free Color Palette Generator
                    </div>
                    <div style={{ display: "flex", fontSize: 34, color: "#6b7280", marginTop: 30 }}>
                        Color theory · 7 harmony rules · WCAG contrast checker
                    </div>
                </div>
                <div style={{ display: "flex", height: 110 }}>
                    {PALETTE.map((c) => (
                        <div key={c} style={{ flex: 1, background: c }} />
                    ))}
                </div>
            </div>
        ),
        { ...size },
    );
}
