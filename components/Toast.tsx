'use client';

import { useEffect } from 'react';
import { ToastType } from '@/types/fatwa';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
}

const ICONS: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const BG_CLASSES: Record<ToastType, string> = {
  success: 'bg-dark-green text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-gold-dark text-white',
};

/** Auto-dismissing toast notification displayed at the bottom of the screen */
export function Toast({ message, type = 'success', onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl
                  shadow-2xl ${BG_CLASSES[type]} animate-fade-in-up
                  flex items-center gap-3 min-w-[200px] max-w-[90vw]
                  font-tajawal text-base font-medium`}
    >
      <span
        className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold"
        aria-hidden="true"
      >
        {ICONS[type]}
      </span>
      <span>{message}</span>
    </div>
  );
}
