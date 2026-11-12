import { eligibilityFor, searchAddresses, type SearchResult } from './data';
import type { Address, Eligibility, Scenario } from './types';

export class ProviderError extends Error {
  constructor(public kind: 'offline' | 'error') {
    super(kind);
  }
}

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(id);
      reject(new DOMException('aborted', 'AbortError'));
    });
  });

const isOffline = (s: Scenario) => s.network === 'offline' || (typeof navigator !== 'undefined' && navigator.onLine === false);

/** Mock geocoding provider. Latency varies so out-of-order responses can occur and must be ignored by callers. */
export async function fetchSuggestions(query: string, scenario: Scenario, signal?: AbortSignal): Promise<SearchResult> {
  if (isOffline(scenario)) {
    await wait(150, signal);
    throw new ProviderError('offline');
  }
  const base = scenario.network === 'slow' ? 3800 : 260;
  await wait(base + Math.random() * 320, signal);
  if (scenario.network === 'error') throw new ProviderError('error');
  return searchAddresses(query);
}

export async function checkEligibility(a: Address, scenario: Scenario, signal?: AbortSignal): Promise<Eligibility> {
  await wait(scenario.network === 'slow' ? 2600 : 1100, signal);
  if (scenario.eligibilityService === 'failing' || isOffline(scenario)) throw new ProviderError(isOffline(scenario) ? 'offline' : 'error');
  return eligibilityFor(a);
}

export async function locate(scenario: Scenario, signal?: AbortSignal): Promise<Address> {
  await wait(1200, signal);
  if (scenario.location === 'denied') throw new Error('denied');
  if (scenario.location === 'unavailable') throw new Error('unavailable');
  return { id: 'loc', line1: '3150 Ocean Blvd', city: 'Long Beach', state: 'CA', zip: '90803' };
}
