'use client';

import { useEffect, useRef } from 'react';
import { Fatwa } from '@/types/fatwa';
import { buildShareUrls } from '@/utils/share';

interface ShareMenuProps {
  fatwa: Fatwa;
  isOpen: boolean;
  onClose: () => void;
}

const SHARE_OPTIONS = [
  {
    id: 'whatsapp' as const,
    label: 'واتساب',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-600">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.527 5.845L.057 23.854a.5.5 0 00.608.625l6.156-1.612A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.647-.52-5.147-1.424l-.37-.22-3.815.999 1.015-3.71-.24-.383A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    hoverClass: 'hover:bg-green-50',
  },
  {
    id: 'twitter' as const,
    label: 'تويتر / X',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-900">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    hoverClass: 'hover:bg-gray-50',
  },
  {
    id: 'email' as const,
    label: 'البريد الإلكتروني',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-gold-dark">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    hoverClass: 'hover:bg-amber-50',
  },
] as const;

/** Dropdown menu for sharing a fatwa on various platforms */
export function ShareMenu({ fatwa, isOpen, onClose }: ShareMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    // Small delay to avoid the triggering click closing the menu immediately
    const id = setTimeout(() => {
      document.addEventListener('mousedown', handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(id);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const urls = buildShareUrls(fatwa);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="خيارات المشاركة"
      className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2
                 bg-white rounded-2xl shadow-card border border-gold-light
                 py-2 min-w-[200px] animate-slide-down z-40"
    >
      {/* Decorative arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px
                      border-8 border-transparent border-t-white" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-[-1px]
                      border-8 border-transparent border-t-gold-light" />

      {SHARE_OPTIONS.map((option) => (
        <a
          key={option.id}
          href={urls[option.id]}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          onClick={onClose}
          className={`flex items-center gap-3 px-5 py-3 text-brown
                      transition-colors duration-150 ${option.hoverClass}
                      hover:text-brown-dark w-full`}
        >
          <span className="flex-shrink-0" aria-hidden="true">
            {option.icon}
          </span>
          <span className="font-medium text-sm">{option.label}</span>
        </a>
      ))}
    </div>
  );
}
