import type { Address, Eligibility } from './types';

/**
 * Illustrative, fictional addresses across six Southern California example cities.
 * These are NOT real customer addresses and NOT a list of supported delivery markets.
 * Eligibility is seeded per address so every outcome can be demoed.
 */
export const EXAMPLE_CITIES = ['Los Angeles', 'San Diego', 'Long Beach', 'Anaheim', 'Pasadena', 'Riverside'];

type Seed = [string, string, string, Eligibility];
const seeds: Seed[] = [
  // Same street name in different cities — the core ambiguity case.
  ['1420 Colorado Blvd', 'Pasadena', '91106', 'eligible'],
  ['1420 Colorado Blvd', 'Los Angeles', '90041', 'eligible'],
  ['220 Main St', 'Riverside', '92501', 'unavailable'],
  ['220 Main St', 'Los Angeles', '90012', 'eligible'],
  ['220 Main St', 'Anaheim', '92805', 'eligible'],
  ['512 Lincoln Ave', 'Anaheim', '92805', 'eligible'],
  ['512 Lincoln Ave', 'Pasadena', '91103', 'eligible'],
  ['950 Broadway', 'San Diego', '92101', 'unverifiable'],
  ['950 Broadway', 'Los Angeles', '90015', 'eligible'],
  ['600 Orange Ave', 'Long Beach', '90802', 'eligible'],
  ['600 Orange St', 'Riverside', '92501', 'unavailable'],
  // Distinct streets per city.
  ['3150 Ocean Blvd', 'Long Beach', '90803', 'eligible'],
  ['1875 Sunset Blvd', 'Los Angeles', '90026', 'eligible'],
  ['845 Harbor Dr', 'San Diego', '92101', 'unverifiable'],
  ['77 Market St', 'San Diego', '92101', 'eligible'],
  ['3900 University Ave', 'Riverside', '92501', 'unavailable'],
  ['2201 Katella Ave', 'Anaheim', '92806', 'eligible'],
  ['1130 Fair Oaks Ave', 'Pasadena', '91103', 'eligible'],
  ['4410 Pine Ave', 'Long Beach', '90807', 'eligible'],
  ['318 Magnolia Ave', 'Riverside', '92506', 'unavailable'],
  ['1600 Vine St', 'Los Angeles', '90028', 'eligible'],
  ['2750 Adams Ave', 'San Diego', '92116', 'eligible'],
];

export const EXAMPLE_ADDRESSES: (Address & { eligibility: Eligibility })[] = seeds.map(([line1, city, zip, eligibility], i) => ({
  id: `ex-${i}`,
  line1,
  city,
  state: 'CA',
  zip,
  eligibility,
}));

const ABBR: Record<string, string> = {
  st: 'street', str: 'street', ave: 'avenue', av: 'avenue', blvd: 'boulevard', bl: 'boulevard', dr: 'drive', rd: 'road',
  ln: 'lane', ct: 'court', pl: 'place', hwy: 'highway', pkwy: 'parkway', n: 'north', s: 'south', e: 'east', w: 'west',
  la: 'los angeles', sd: 'san diego', lb: 'long beach', ca: 'california',
};

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,#]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((w) => (ABBR[w] ?? w).split(' '));

function editDistance(a: string, b: string) {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return dp[a.length][b.length];
}

type TokenMatch = 'exact' | 'prefix' | 'typo' | null;

function matchToken(q: string, hay: string[]): TokenMatch {
  if (hay.includes(q)) return 'exact';
  if (hay.some((h) => h.startsWith(q))) return 'prefix';
  if (/^\d+$/.test(q) || q.length < 4) return null;
  const tolerance = q.length >= 7 ? 2 : 1;
  // Compare against same-length prefixes too, so partially typed typos ("colardo b") still match.
  if (hay.some((h) => editDistance(q, h) <= tolerance || (h.length > q.length && editDistance(q, h.slice(0, q.length)) <= 1))) return 'typo';
  return null;
}

export type SearchResult = { results: (Address & { eligibility: Eligibility })[]; usedCorrection: boolean };

export function searchAddresses(query: string): SearchResult {
  const qTokens = norm(query);
  if (!qTokens.length) return { results: [], usedCorrection: false };
  let usedCorrection = false;
  const scored = EXAMPLE_ADDRESSES.flatMap((a) => {
    const hay = norm(`${a.line1} ${a.city} ${a.state} ${a.zip}`);
    let score = 0;
    let corrected = false;
    for (const q of qTokens) {
      const m = matchToken(q, hay);
      if (!m) return [];
      score += m === 'exact' ? 3 : m === 'prefix' ? 2 : 1;
      if (m === 'typo') corrected = true;
    }
    if (corrected) usedCorrection = true;
    return [{ a, score }];
  });
  scored.sort((x, y) => y.score - x.score || x.a.line1.localeCompare(y.a.line1));
  return { results: scored.slice(0, 6).map((s) => s.a), usedCorrection };
}

export function eligibilityFor(a: Address): Eligibility {
  const known = EXAMPLE_ADDRESSES.find((e) => e.line1.toLowerCase() === a.line1.trim().toLowerCase() && e.zip === a.zip.trim());
  if (known) return known.eligibility;
  // Unknown manual entries: we can recognise the format but cannot claim coverage.
  return 'unverifiable';
}
