import type { Metadata, Viewport } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  title: 'فتاوى الشيخ ابن باز | Ibn Baz Fatwas',
  description:
    'مجموعة فتاوى الشيخ عبدالعزيز بن عبدالله بن باز رحمه الله، تشمل أكثر من ألفي فتوى في شتى أبواب الفقه الإسلامي.',
  keywords: ['فتاوى', 'ابن باز', 'ابن باز', 'إسلام', 'فقه', 'شريعة', 'fatwa', 'Ibn Baz'],
  openGraph: {
    title: 'فتاوى الشيخ ابن باز',
    description: 'مجموعة فتاوى الشيخ عبدالعزيز بن عبدالله بن باز رحمه الله',
    type: 'website',
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'فتاوى الشيخ ابن باز',
    description: 'مجموعة فتاوى الشيخ عبدالعزيز بن عبدالله بن باز رحمه الله',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1A472A',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={tajawal.variable}>
      <body className="font-tajawal bg-cream">{children}</body>
    </html>
  );
}
