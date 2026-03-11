'use client';

import { useState, useCallback } from 'react';
import { Fatwa } from '@/types/fatwa';
import { copyToClipboard } from '@/utils/clipboard';
import { formatFatwaForShare } from '@/utils/share';
import { ShareMenu } from './ShareMenu';

interface ActionButtonsProps {
  fatwa: Fatwa;
  isLoading: boolean;
  onNext: () => void;
  onCopySuccess: () => void;
  onCopyError: () => void;
}

/** Action bar with Next, Copy, and Share buttons */
export function ActionButtons({
  fatwa,
  isLoading,
  onNext,
  onCopySuccess,
  onCopyError,
}: ActionButtonsProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = useCallback(async () => {
    if (isCopying) return;
    setIsCopying(true);
    const text = formatFatwaForShare(fatwa);
    const ok = await copyToClipboard(text);
    setIsCopying(false);
    ok ? onCopySuccess() : onCopyError();
  }, [fatwa, isCopying, onCopySuccess, onCopyError]);

  const toggleShare = useCallback(() => {
    setIsShareOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap" dir="rtl">
      {/* ── Next Fatwa ── */}
      <button
        onClick={onNext}
        disabled={isLoading}
        aria-label="الفتوى التالية"
        className="group flex items-center gap-2 px-7 py-4
                   bg-dark-green text-white font-bold text-base
                   rounded-xl shadow-md
                   hover:bg-dark-green-light
                   active:scale-95
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-green focus-visible:ring-offset-2
                   transition-all duration-200
                   disabled:opacity-60 disabled:cursor-not-allowed
                   min-h-[52px] min-w-[160px]"
      >
        {isLoading ? (
          <span
            className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"
            aria-hidden="true"
          />
        ) : (
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span>الفتوى التالية</span>
      </button>

      {/* ── Copy ── */}
      <button
        onClick={handleCopy}
        disabled={isCopying}
        aria-label="نسخ نص الفتوى"
        className="flex items-center gap-2 px-6 py-4
                   bg-gold text-white font-bold text-base
                   rounded-xl shadow-md
                   hover:bg-gold-dark
                   active:scale-95
                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
                   transition-all duration-200
                   disabled:opacity-60
                   min-h-[52px]"
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
        <span>انسخ</span>
      </button>

      {/* ── Share ── */}
      <div className="relative">
        <button
          onClick={toggleShare}
          aria-label="مشاركة الفتوى"
          aria-expanded={isShareOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 px-6 py-4
                     bg-brown text-white font-bold text-base
                     rounded-xl shadow-md
                     hover:bg-brown-light
                     active:scale-95
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brown focus-visible:ring-offset-2
                     transition-all duration-200
                     min-h-[52px]"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            aria-hidden="true"
          >
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span>شارك</span>
        </button>

        <ShareMenu
          fatwa={fatwa}
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
        />
      </div>
    </div>
  );
}
