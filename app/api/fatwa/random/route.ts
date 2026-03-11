/**
 * GET /api/fatwa/random
 *
 * Returns a single random fatwa along with its 1-based index and the
 * total count of fatwas in the collection.
 *
 * `force-dynamic` prevents Next.js from caching this route so every
 * request returns a genuinely random result.
 */
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { getRandomFatwa } from '@/lib/fatwas';

export async function GET() {
  try {
    const result = getRandomFatwa();
    return NextResponse.json(result, {
      headers: {
        // Prevent downstream caches from serving stale results
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('[/api/fatwa/random] Failed to load fatwas:', error);
    return NextResponse.json(
      { error: 'Failed to load fatwa. Please try again.' },
      { status: 500 }
    );
  }
}
