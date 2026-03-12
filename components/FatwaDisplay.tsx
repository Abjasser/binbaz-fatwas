'use client';

import { useState, useCallback, useEffect } from 'react';
import { Fatwa, FatwaResponse, ToastState } from '@/types/fatwa';
import { FatwaCard } from './FatwaCard';
import { ActionButtons } from './ActionButtons';
import { Toast } from './Toast';

const STORAGE_KEY = 'binbaz_last_fatwa';

interface StoredFatwa {
  fatwa: Fatwa;
  index: number;
}

interface FatwaDisplayProps {
  initialFatwa: Fatwa;
  initialIndex: number;
  total: number;
}

/**
 * Main client-side component that manages fatwa state, transitions,
 * localStorage persistence, toast notifications, and keyboard shortcuts.
 */
export function FatwaDisplay({ initialFatwa, initialIndex, total }: FatwaDisplayProps) {
  const [fatwa, setFatwa] = useState<Fatwa>(initialFatwa);
  const [index, setIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [toast, setToast] = useState<ToastState | null>(null);

  // ── Restore last-viewed fatwa from localStorage on mount ──
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { fatwa: saved, index: savedIndex } = JSON.parse(stored) as StoredFatwa;
        setFatwa(saved);
        setIndex(savedIndex);
      }
    } catch {
      // localStorage unavailable or data is corrupt – use the server-provided fatwa
    }
  }, []);

  // ── Persist current fatwa to localStorage whenever it changes ──
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ fatwa, index } satisfies StoredFatwa));
    } catch {
      // Ignore storage errors
    }
  }, [fatwa, index]);

  const showToast = useCallback((message: string, type: ToastState['type'] = 'success') => {
    setToast({ message, type });
  }, []);

  /**
   * Fetches a new random fatwa: fade out → swap → fade in.
   */
  const fetchNextFatwa = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsVisible(false);

    try {
      const res = await fetch('/api/fatwa/random');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: FatwaResponse = await res.json();

      await new Promise<void>((resolve) => setTimeout(resolve, 300));

      setFatwa(data.fatwa);
      setIndex(data.index);
    } catch {
      showToast('حدث خطأ أثناء تحميل الفتوى', 'error');
    } finally {
      setIsVisible(true);
      setIsLoading(false);
    }
  }, [isLoading, showToast]);

  // ── Keyboard shortcut: Enter → next fatwa ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'Enter') {
        e.preventDefault();
        fetchNextFatwa();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [fetchNextFatwa]);

  return (
    <div className="min-h-screen flex flex-col bg-cream font-tajawal" dir="rtl">

      {/* ── Slim masthead ── */}
      <div className="bg-dark-green-dark py-3 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-4">
          <div className="h-px flex-1 bg-gold/20" />
          <p className="text-gold/75 text-xs md:text-sm font-medium tracking-widest whitespace-nowrap select-none">
            فتاوى الشيخ عبدالعزيز بن باز رحمه الله
          </p>
          <div className="h-px flex-1 bg-gold/20" />
        </div>
      </div>

      {/* ── Animated content area ── */}
      <main
        className={`transition-opacity duration-300 ease-in-out
                    ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <FatwaCard
          title={fatwa.title}
          question={fatwa.question}
          answer={fatwa.answer}
          index={index}
        />
      </main>

      {/* ── Actions ── */}
      <div className="bg-cream py-8 md:py-10 px-6">
        <ActionButtons
          fatwa={fatwa}
          isLoading={isLoading}
          onNext={fetchNextFatwa}
          onCopySuccess={() => showToast('تم نسخ الفتوى بنجاح')}
          onCopyError={() => showToast('تعذّر نسخ الفتوى، يرجى المحاولة مجدداً', 'error')}
        />

      </div>

      {/* ── Footer ── */}
      <footer className="bg-dark-green-dark py-4 px-6 text-center text-xs">
        <p className="text-gold/40 mb-1 select-none">فتاوى الشيخ ابن باز رحمه الله</p>
        <a
          href="https://www.linkedin.com/in/abdullah-aljasser-4b76ba210"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold/60 hover:text-gold transition-colors duration-200"
        >
          عبدالله الجاسر
        </a>
      </footer>

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
