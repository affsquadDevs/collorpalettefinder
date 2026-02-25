"use client";

import { useState, useCallback } from "react";
import { hexToHsl, hexToRgb } from "../lib/colorUtils";

interface ColorPickerProps {
    value: string;
    onChange: (hex: string) => void;
}

const PRESETS = [
    "#FF6B6B", "#FF8E53", "#FFC93C", "#6BCB77",
    "#4D96FF", "#845EC2", "#F9C6E0", "#00C9A7",
    "#C34A36", "#926AA6", "#1B998B", "#E84855",
    "#3A86FF", "#8338EC", "#FB5607", "#2EC4B6",
    "#E63946", "#457B9D", "#2A9D8F", "#E9C46A",
];

export default function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [inputVal, setInputVal] = useState(value);
    const [inputError, setInputError] = useState(false);

    const handleHexInput = useCallback(
        (raw: string) => {
            setInputVal(raw);
            const cleaned = raw.trim().replace(/^#?/, "#");
            if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) {
                setInputError(false);
                onChange(cleaned);
            } else {
                setInputError(true);
            }
        },
        [onChange]
    );

    const handleNativePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hex = e.target.value;
        setInputVal(hex);
        setInputError(false);
        onChange(hex);
    };

    const hsl = hexToHsl(value);
    const rgb = hexToRgb(value);

    return (
        <div className="flex flex-col gap-5">
            {/* Color wheel / native picker */}
            <label className="flex flex-col items-center gap-2.5 cursor-pointer relative group">
                <div
                    className="w-[120px] h-[120px] rounded-full border-[4px] border-white/12 shadow-[0_0_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-200 pointer-events-none group-hover:scale-[1.06] group-hover:shadow-[0_0_60px_rgba(0,0,0,0.6),0_0_0_2px_rgba(255,255,255,0.12)]"
                    style={{ background: value }}
                />
                <input
                    type="color"
                    value={value}
                    onChange={handleNativePicker}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    aria-label="Pick color"
                />
                <span className="text-[11px] text-[var(--text-muted)] tracking-[0.05em] uppercase pointer-events-none">Click to pick</span>
            </label>

            {/* Hex text input */}
            <div className="flex flex-col gap-2.5">
                <div className={`flex items-center gap-[6px] bg-white/5 border rounded-[10px] px-[14px] h-[44px] transition-colors duration-200 focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_var(--accent-glow)] ${inputError ? 'border-[#ff6b6b] shadow-[0_0_0_3px_rgba(255,107,107,0.2)] focus-within:border-[#ff6b6b] focus-within:shadow-[0_0_0_3px_rgba(255,107,107,0.2)]' : 'border-[var(--border)]'}`}>
                    <span className="text-[var(--text-muted)] text-[16px] font-mono">#</span>
                    <input
                        type="text"
                        value={inputVal.replace(/^#/, "")}
                        onChange={(e) => handleHexInput(e.target.value)}
                        maxLength={6}
                        className="bg-transparent border-none outline-none text-[var(--text)] text-[16px] font-[family-name:Courier_New,monospace] tracking-[0.1em] w-full uppercase placeholder:text-white/20"
                        spellCheck={false}
                        placeholder="7c6cf8"
                        aria-label="Hex color value"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    <span className="bg-white/5 border border-[var(--border)] rounded-full px-2.5 py-1 text-[11px] text-[var(--text-muted)] font-[family-name:Courier_New,monospace] tracking-[0.03em]">
                        HSL {hsl.h}° {hsl.s}% {hsl.l}%
                    </span>
                    <span className="bg-white/5 border border-[var(--border)] rounded-full px-2.5 py-1 text-[11px] text-[var(--text-muted)] font-[family-name:Courier_New,monospace] tracking-[0.03em]">
                        RGB {rgb.r} {rgb.g} {rgb.b}
                    </span>
                </div>
            </div>

            {/* Preset swatches */}
            <div className="grid grid-cols-10 gap-[6px]">
                {PRESETS.map((c) => (
                    <button
                        key={c}
                        className={`w-full aspect-square rounded-lg border-2 cursor-pointer transition-all duration-150 outline-none hover:scale-[1.15] hover:shadow-[0_4px_12px_rgba(0,0,0,0.4)] ${c.toLowerCase() === value.toLowerCase() ? 'border-white scale-[1.2] shadow-[0_0_0_2px_rgba(255,255,255,0.3)] hover:scale-[1.2]' : 'border-transparent'}`}
                        style={{ background: c }}
                        onClick={() => {
                            setInputVal(c);
                            setInputError(false);
                            onChange(c);
                        }}
                        title={c}
                        aria-label={`Select ${c}`}
                    />
                ))}
            </div>
        </div>
    );
}
