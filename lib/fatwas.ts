/**
 * Server-side data access layer for Ibn Baz fatwas.
 * This module MUST only be imported in server components and API routes.
 * It uses Node.js `fs` to read the JSON file from disk.
 */

import fs from 'fs';
import path from 'path';
import { Fatwa } from '@/types/fatwa';

/** In-memory cache – populated on first call and reused for the process lifetime */
let _cache: Fatwa[] | null = null;

/**
 * Loads all fatwas from public/fatwas.json.
 * Results are cached in process memory for subsequent requests.
 */
function loadFatwas(): Fatwa[] {
  if (_cache) return _cache;

  const filePath = path.join(process.cwd(), 'public', 'fatwas.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  _cache = JSON.parse(raw) as Fatwa[];
  return _cache;
}

/** Returns the total number of fatwas in the collection */
export function getTotalFatwas(): number {
  return loadFatwas().length;
}

/**
 * Picks a uniformly random fatwa and returns it with metadata.
 * @returns The fatwa, its 1-based index, and the total count
 */
export function getRandomFatwa(): { fatwa: Fatwa; index: number; total: number } {
  const fatwas = loadFatwas();
  const idx = Math.floor(Math.random() * fatwas.length);
  return {
    fatwa: fatwas[idx],
    index: idx + 1,
    total: fatwas.length,
  };
}
