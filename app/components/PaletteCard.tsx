"use client";

import { useState } from "react";
import { getTextColor } from "../lib/colorUtils";
import { copyToClipboard } from "../lib/clipboard";

function Swatch({ hex }: { hex: string }) {
    const [copied, setCopied] = useState(false);
    const code = hex.toUpperCase();
    const text = getTextColor(hex);
    const copy = () => {
        copyToClipboard(code).then((ok) => {
            if (!ok) return;
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        });
    };
    return (
        <button
            type="button"
            onClick={copy}
            title={`Copy ${code}`}
            aria-label={`Copy ${code}`}
            className="group/swatch relative flex-1 h-20 sm:h-24 flex items-end justify-center pb-2 transition-[flex] duration-200 hover:flex-[1.4] cursor-pointer"
            style={{ background: hex }}
        >
            <span
                className="text-[11px] font-mono tracking-wide opacity-0 group-hover/swatch:opacity-100 transition-opacity px-1.5 py-0.5 rounded"
                style={{ color: text, background: text === "#ffffff" ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.25)" }}
            >
                {copied ? "Copied ✓" : code}
            </span>
        </button>
    );
}

export default function PaletteCard({
    title,
    style,
    colors,
    description,
}: {
    title: string;
    style: string;
    colors: string[];
    description: string;
}) {
    return (
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-lg transition-shadow duration-300">
            <div className="flex w-full">
                {colors.map((c, i) => (
                    <Swatch key={`${c}-${i}`} hex={c} />
                ))}
            </div>
            <div className="p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900">{title}</h3>
                    <span className="shrink-0 text-[11px] font-semibold text-blue-700 bg-blue-100/80 border border-blue-200 rounded-full px-2 py-0.5">
                        {style}
                    </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
