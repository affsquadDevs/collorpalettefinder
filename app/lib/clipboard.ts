// Robust copy-to-clipboard that never throws.
// Tries the async Clipboard API (secure contexts), then falls back to the
// legacy execCommand path. Returns true on success, false otherwise — so
// callers can show a "copied" state without risking an unhandled rejection
// (e.g. NotAllowedError when running inside an iframe without clipboard-write).
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (typeof navigator !== "undefined" && navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch {
        // fall through to the legacy method
    }

    try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
    } catch {
        return false;
    }
}
