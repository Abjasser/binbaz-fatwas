/**
 * Root page – a server component that picks a random fatwa for the initial
 * render and passes it to the interactive client component.
 *
 * `force-dynamic` ensures each request picks a fresh random fatwa instead
 * of being cached at build time.
 */
export const dynamic = 'force-dynamic';

import { getRandomFatwa } from '@/lib/fatwas';
import { FatwaDisplay } from '@/components/FatwaDisplay';

export default function HomePage() {
  const { fatwa, index, total } = getRandomFatwa();

  return (
    <main className="bg-islamic-pattern min-h-screen">
      <FatwaDisplay
        initialFatwa={fatwa}
        initialIndex={index}
        total={total}
      />
    </main>
  );
}
