import Link from "next/link";
import type { ReactNode } from "react";

// Renders the lightweight markdown subset used across the site:
// "## "/"### " headings, "- " bullet lists, paragraphs, and inline
// **bold**, *italic*, `code`, and [text](url) links. Blocks split on blank lines.

function renderInline(text: string): ReactNode[] {
    const out: ReactNode[] = [];
    const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(?<![*\w])\*(?!\*)([^*\n]+?)\*(?![*\w])|`([^`]+)`/g;
    let last = 0;
    let k = 0;
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        if (m.index > last) out.push(text.slice(last, m.index));
        if (m[1] !== undefined) {
            const label = m[1];
            const url = m[2];
            if (/^https?:\/\//.test(url)) {
                out.push(<a key={k++} href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{label}</a>);
            } else {
                out.push(<Link key={k++} href={url} className="text-blue-600 hover:underline">{label}</Link>);
            }
        } else if (m[3] !== undefined) {
            out.push(<strong key={k++} className="font-semibold text-gray-900">{m[3]}</strong>);
        } else if (m[4] !== undefined) {
            out.push(<em key={k++}>{m[4]}</em>);
        } else if (m[5] !== undefined) {
            out.push(<code key={k++} className="text-[0.9em] bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded font-mono">{m[5]}</code>);
        }
        last = re.lastIndex;
    }
    if (last < text.length) out.push(text.slice(last));
    return out;
}

export function Markdown({ body }: { body: string }) {
    const blocks = body.trim().split(/\n\s*\n/);
    return (
        <>
            {blocks.map((raw, i) => {
                const block = raw.trim();
                if (block.startsWith("### ")) {
                    return (
                        <h3 key={i} className="text-xl md:text-2xl font-bold text-gray-900 mt-8 mb-3">
                            {block.slice(4)}
                        </h3>
                    );
                }
                if (block.startsWith("## ")) {
                    return (
                        <h2 key={i} className="text-2xl md:text-3xl font-bold text-gray-900 mt-10 mb-4">
                            {block.slice(3)}
                        </h2>
                    );
                }
                const lines = block.split("\n");
                if (lines.every((l) => l.trim().startsWith("- "))) {
                    return (
                        <ul key={i} className="list-disc pl-6 space-y-2 my-5 text-gray-700">
                            {lines.map((l, j) => (
                                <li key={j} className="leading-relaxed">{renderInline(l.trim().slice(2))}</li>
                            ))}
                        </ul>
                    );
                }
                return (
                    <p key={i} className="text-[17px] md:text-lg text-gray-700 leading-relaxed mb-5">
                        {renderInline(block.replace(/\n/g, " "))}
                    </p>
                );
            })}
        </>
    );
}
