"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { hslToHex, hexToHsl } from "../lib/colorUtils";
import type { PaletteRule } from "../lib/colorUtils";

// ─── Harmony offsets ─────────────────────────────────────────────────────────
// Fix #2 — classic color theory offsets
export const HARMONY_OFFSETS: Record<PaletteRule, number[]> = {
    complementary: [0, 180],
    analogous: [0, -30, -60, 30, 60],
    triadic: [0, 120, 240],
    "split-complementary": [0, 150, 210],   // ±30° from complement
    tetradic: [0, 60, 180, 240], // Two distinct complementary pairs
    square: [0, 90, 180, 270],
    monochromatic: [0],
};

export interface WheelDot {
    hue: number;
    saturation: number;
    lightness: number;
    label: string;
    hex: string;
}

export function makeDots(primaryHex: string, rule: PaletteRule): WheelDot[] {
    const { h, s, l } = hexToHsl(primaryHex);

    // Fix #1 — wider, more faithful saturation/lightness range
    const cs = Math.min(Math.max(s, 40), 90);
    const cl = Math.min(Math.max(l, 35), 70);

    if (rule === "monochromatic") {
        // Spread dots along the saturation axis (same hue angle, different distance from center)
        const sats = [15, 32, 52, 68, 85];
        return sats.map((sv, i) => {
            const hex = hslToHex(h, sv, cl);
            return { hue: h, saturation: sv, lightness: cl, label: i === 2 ? "Base" : `Tone ${i + 1}`, hex };
        });
    }

    return HARMONY_OFFSETS[rule].map((offset, i) => {
        const hue = ((h + offset) % 360 + 360) % 360;
        // Fix #3 — keep secondary dots close to primary; only tiny lightness variation
        const sat = cs;
        const lv = i === 0 ? cl : Math.min(Math.max(cl + (i % 2 === 0 ? 5 : -5), 35), 72);
        const hex = hslToHex(hue, sat, lv);
        return { hue, saturation: sat, lightness: lv, label: i === 0 ? "Primary" : `Color ${i + 1}`, hex };
    });
}

// ─── Polar ↔ canvas ───────────────────────────────────────────────────────────
const SIZE = 320;
const RADIUS = SIZE / 2 - 14;
const CX = SIZE / 2;
const CY = SIZE / 2;

function dotToXY(dot: WheelDot): [number, number] {
    const angle = ((dot.hue - 90) * Math.PI) / 180;
    const r = (dot.saturation / 100) * RADIUS;
    return [CX + r * Math.cos(angle), CY + r * Math.sin(angle)];
}

function xyToHueSat(x: number, y: number): { hue: number; sat: number } | null {
    const dx = x - CX;
    const dy = y - CY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > RADIUS) return null;
    let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (angle < 0) angle += 360;
    if (angle >= 360) angle -= 360;
    return { hue: Math.round(angle), sat: Math.round((dist / RADIUS) * 100) };
}

// ─── Draw wheel to canvas ─────────────────────────────────────────────────────
function drawWheel(canvas: HTMLCanvasElement, dots: WheelDot[]) {
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    if (canvas.width !== SIZE * dpr) {
        canvas.width = SIZE * dpr;
        canvas.height = SIZE * dpr;
        canvas.style.width = SIZE + "px";
        canvas.style.height = SIZE + "px";
        ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, SIZE, SIZE);

    // ── Draw hue+saturation wheel pixel-by-pixel ──────────────────────────────
    const imageData = ctx.createImageData(SIZE, SIZE);
    const data = imageData.data;

    // Fix #4 — use correct full HSL→RGB for wheel pixels (L=0.5 at edge, white at center)
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const dx = x - CX;
            const dy = y - CY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > RADIUS) continue;

            let hDeg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
            if (hDeg < 0) hDeg += 360;
            if (hDeg >= 360) hDeg -= 360;

            const satN = dist / RADIUS; // 0 = center (white) → 1 = edge (full color)
            // Correct HSL→RGB: H=hDeg, S=satN, L=0.5
            const hn = hDeg / 60;
            const c = satN; // chroma = (1 - |2L-1|) * S = 1 * satN at L=0.5
            const xv = c * (1 - Math.abs((hn % 2) - 1));
            const m = 0.5 - c / 2; // L - C/2
            let r = 0, g = 0, b = 0;
            if (hn < 1) { r = c; g = xv; b = 0; }
            else if (hn < 2) { r = xv; g = c; b = 0; }
            else if (hn < 3) { r = 0; g = c; b = xv; }
            else if (hn < 4) { r = 0; g = xv; b = c; }
            else if (hn < 5) { r = xv; g = 0; b = c; }
            else { r = c; g = 0; b = xv; }

            const idx = (y * SIZE + x) * 4;
            data[idx] = Math.round((r + m) * 255);
            data[idx + 1] = Math.round((g + m) * 255);
            data[idx + 2] = Math.round((b + m) * 255);
            data[idx + 3] = 255;
        }
    }
    // Fast pixel-by-pixel rendering
    const offscreen = document.createElement("canvas");
    offscreen.width = SIZE;
    offscreen.height = SIZE;
    const offCtx = offscreen.getContext("2d")!;
    offCtx.putImageData(imageData, 0, 0);

    // Draw the generated offscreen image onto the scaled canvas, respecting device pixel ratio
    ctx.drawImage(offscreen, 0, 0);

    // Clip to circle
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(CX, CY, RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // ── Draw harmony lines ────────────────────────────────────────────────────
    const positions = dots.map(dotToXY);
    if (positions.length > 1) {
        ctx.save();
        ctx.strokeStyle = "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1.5;
        for (let i = 1; i < positions.length; i++) {
            ctx.beginPath();
            ctx.moveTo(positions[0][0], positions[0][1]);
            ctx.lineTo(positions[i][0], positions[i][1]);
            ctx.stroke();
        }
        ctx.restore();
    }

    // ── Draw dots ─────────────────────────────────────────────────────────────
    dots.forEach((dot, i) => {
        const [px, py] = positions[i];

        // Outer white ring
        ctx.beginPath();
        ctx.arc(px, py, 13, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.95)";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Dot fill
        ctx.beginPath();
        ctx.arc(px, py, 10, 0, Math.PI * 2);
        ctx.fillStyle = dot.hex;
        ctx.fill();

        // Primary inner dot
        if (i === 0) {
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fill();
        }
    });
}

// ─── Component ────────────────────────────────────────────────────────────────
interface ColorWheelProps {
    primaryHex: string;
    rule: PaletteRule;
    onChange: (hex: string) => void;
    onPaletteChange?: (dots: WheelDot[]) => void;
    overrideDots?: WheelDot[] | null;
}

export default function ColorWheel({ primaryHex, rule, onChange, onPaletteChange, overrideDots }: ColorWheelProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dots, setDots] = useState<WheelDot[]>(() => overrideDots || makeDots(primaryHex, rule));
    const dotsRef = useRef<WheelDot[]>(dots);
    const dragging = useRef<number | null>(null);

    // ── Sync dots when primaryHex, rule, or overrideDots changes, then redraw ──
    useEffect(() => {
        const newDots = overrideDots || makeDots(primaryHex, rule);

        // Prevent unnecessary state updates if dots essentially are the same
        // We know primaryHex or rule changed, so update is usually needed
        dotsRef.current = newDots;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDots(newDots);

        if (canvasRef.current) drawWheel(canvasRef.current, newDots);
    }, [primaryHex, rule, overrideDots]);

    // ── Initial draw ───────────────────────────────────────────────────────────
    useEffect(() => {
        if (canvasRef.current) drawWheel(canvasRef.current, dotsRef.current);
    }, []);

    // ── Mouse / touch helpers ──────────────────────────────────────────────────
    const getPos = useCallback((e: React.MouseEvent | MouseEvent) => {
        const rect = canvasRef.current!.getBoundingClientRect();
        const scale = SIZE / rect.width;
        return {
            x: (e.clientX - rect.left) * scale,
            y: (e.clientY - rect.top) * scale,
        };
    }, []);

    const hitTest = useCallback((x: number, y: number) => {
        for (let i = 0; i < dotsRef.current.length; i++) {
            const [px, py] = dotToXY(dotsRef.current[i]);
            if (Math.sqrt((x - px) ** 2 + (y - py) ** 2) < 18) return i;
        }
        return -1;
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        const { x, y } = getPos(e);
        const hit = hitTest(x, y);
        if (hit >= 0) dragging.current = hit;
    }, [getPos, hitTest]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (dragging.current === null) return;
        const { x, y } = getPos(e);
        const result = xyToHueSat(x, y);
        if (!result) return;

        const current = dotsRef.current;
        const primary = current[0];

        let newDots = current;

        if (dragging.current === 0) {
            // Move primary → recalculate all harmony dots
            const newPrimaryHex = hslToHex(result.hue, result.sat, primary.lightness);
            newDots = makeDots(newPrimaryHex, rule);
        } else {
            // Move a non-primary dot freely
            const dot = current[dragging.current];
            const newHex = hslToHex(result.hue, result.sat, dot.lightness);
            newDots = current.map((d, i) =>
                i === dragging.current
                    ? { ...d, hue: result.hue, saturation: result.sat, hex: newHex }
                    : d
            );
        }

        dotsRef.current = newDots;
        if (canvasRef.current) drawWheel(canvasRef.current, newDots);

        setDots(newDots);

        if (dragging.current === 0) {
            onChange(newDots[0].hex);
        }
        if (onPaletteChange) {
            onPaletteChange(newDots);
        }

    }, [getPos, rule, onChange, onPaletteChange]);

    const handleMouseUp = useCallback(() => {
        dragging.current = null;
    }, []);

    // Global mouse-up so release outside canvas also works
    useEffect(() => {
        const up = () => handleMouseUp();
        window.addEventListener("mouseup", up);
        return () => window.removeEventListener("mouseup", up);
    }, [handleMouseUp]);

    return (
        <div className="flex flex-col items-center gap-5">
            <canvas
                ref={canvasRef}
                className="block rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.06)] select-none"
                style={{ cursor: "crosshair" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
            />
            <div className="flex gap-[10px] flex-wrap justify-center">
                {dots.map((d) => (
                    <div key={d.hex + d.label} className="flex items-center gap-[6px] text-[12px] text-[#555] font-[family-name:Courier_New,monospace]">
                        <div className="w-[14px] h-[14px] rounded-full border border-black/15 shrink-0" style={{ background: d.hex }} />
                        <span>{d.hex.toUpperCase()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
