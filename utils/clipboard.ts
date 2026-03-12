/**
 * Copies text to the system clipboard.
 * Tries the modern Clipboard API first, then falls back to execCommand
 * with iOS-specific selection handling.
 *
 * @returns `true` on success, `false` on failure
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  // 1. Modern Clipboard API — requires HTTPS + user gesture
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // NotAllowedError on iOS Safari or non-focused documents — fall through
    }
  }

  // 2. Legacy execCommand fallback — works on HTTP and older/mobile browsers
  try {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    // Keep it in the viewport so iOS doesn't scroll away
    el.style.cssText =
      'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;';
    document.body.appendChild(el);

    // iOS requires a Range-based selection — plain .select() is ignored
    if (/iPad|iPhone|iPod/i.test(navigator.userAgent)) {
      const range = document.createRange();
      range.selectNodeContents(el);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
      el.setSelectionRange(0, text.length);
    } else {
      el.select();
    }

    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  } catch {
    return false;
  }
}
