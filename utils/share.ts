import { Fatwa } from '@/types/fatwa';

/**
 * Formats a Fatwa into a human-readable string suitable for sharing.
 *
 * @param fatwa - The fatwa to format
 * @returns A formatted Arabic string
 */
export function formatFatwaForShare(fatwa: Fatwa): string {
  return `📖 ${fatwa.title}\n\n❓ السؤال:\n${fatwa.question}\n\n✅ الجواب:\n${fatwa.answer}\n\n— فتاوى الشيخ ابن باز رحمه الله`;
}

/** Pre-encoded share URLs for each platform */
export interface ShareUrls {
  whatsapp: string;
  twitter: string;
  email: string;
}

/**
 * Generates platform-specific share URLs for a given fatwa.
 *
 * @param fatwa - The fatwa to share
 * @returns An object containing ready-to-use share URLs
 */
export function buildShareUrls(fatwa: Fatwa): ShareUrls {
  const text = formatFatwaForShare(fatwa);
  const encoded = encodeURIComponent(text);
  const titleEncoded = encodeURIComponent(fatwa.title);

  return {
    whatsapp: `https://wa.me/?text=${encoded}`,
    twitter: `https://twitter.com/intent/tweet?text=${encoded}`,
    email: `mailto:?subject=${titleEncoded}&body=${encoded}`,
  };
}
