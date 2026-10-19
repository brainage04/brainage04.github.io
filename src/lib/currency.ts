export const baseCurrency = 'USD';

/** Currencies offered on the commissions page, with the prefix used for prices. */
export const currencies = {
  USD: { label: 'USD', prefix: 'US$' },
  AUD: { label: 'AUD', prefix: 'A$' },
  CAD: { label: 'CAD', prefix: 'C$' },
  EUR: { label: 'EUR', prefix: '€' },
  GBP: { label: 'GBP', prefix: '£' },
  NZD: { label: 'NZD', prefix: 'NZ$' },
} as const;

export type CurrencyCode = keyof typeof currencies;

export const isCurrencyCode = (value: unknown): value is CurrencyCode =>
  typeof value === 'string' && Object.hasOwn(currencies, value);

/** `from` prices are starting points, so they are rounded to a tidy step; hourly rates keep whole units. */
export type PriceKind = 'from' | 'hourly';

export function roundPrice(amount: number, kind: PriceKind) {
  if (kind === 'hourly') return Math.round(amount);
  const step = amount < 250 ? 10 : amount < 2500 ? 50 : 100;
  return Math.max(step, Math.round(amount / step) * step);
}

export function formatPrice(usd: number, kind: PriceKind, currency: CurrencyCode = baseCurrency, rate = 1) {
  const converted = currency === baseCurrency ? usd : roundPrice(usd * rate, kind);
  const amount = `${currencies[currency].prefix}${converted.toLocaleString('en')}`;
  const approximate = currency === baseCurrency ? '' : '≈';
  return kind === 'hourly' ? `${approximate}${amount} / hour` : `from ${approximate}${amount}`;
}

/** Live mid-market rates from the European Central Bank via Frankfurter (free, no key, CORS-enabled). */
export const ratesUrl = `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${Object.keys(currencies)
  .filter((code) => code !== baseCurrency)
  .join(',')}`;

export type ExchangeRates = { date: string; rates: Partial<Record<CurrencyCode, number>> };

export function parseRates(body: unknown): ExchangeRates {
  if (typeof body !== 'object' || body === null) throw new Error('Exchange rate response is not an object');
  const { date, rates } = body as { date?: unknown; rates?: unknown };
  if (typeof date !== 'string' || typeof rates !== 'object' || rates === null) {
    throw new Error('Exchange rate response is missing its date or rates');
  }

  const parsed: ExchangeRates['rates'] = {};
  for (const [code, rate] of Object.entries(rates)) {
    if (isCurrencyCode(code) && typeof rate === 'number' && Number.isFinite(rate) && rate > 0) parsed[code] = rate;
  }
  return { date, rates: parsed };
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

/** An ECB rate date (`2026-10-14`) as `14th October 2026`. */
export function formatRateDate(isoDate: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(isoDate);
  const month = match ? months[Number(match[2]) - 1] : undefined;
  if (!match || !month) return isoDate;
  const day = Number(match[3]);
  const suffix =
    day % 100 >= 11 && day % 100 <= 13 ? 'th' : (({ 1: 'st', 2: 'nd', 3: 'rd' } as const)[day % 10] ?? 'th');
  return `${day}${suffix} ${month} ${match[1]}`;
}

/** The note under the rates once prices are converted. */
export function conversionNote(currency: CurrencyCode, isoDate: string, usdNote: string): string {
  return `${currency} prices are approximate, converted from USD at the European Central Bank rate for ${formatRateDate(isoDate)}. ${usdNote}`;
}

export type CurrencyOutcome =
  | { kind: 'base' }
  | { kind: 'converted'; currency: CurrencyCode; rate: number; date: string }
  | { kind: 'failed'; error: unknown }
  /** The visitor picked another currency while this one was loading; change nothing. */
  | { kind: 'stale' };

/**
 * Works out what to show for `currency`. `isCurrent` is checked after the rates load and before every outcome that
 * changes the page, so a slow or failed request for an earlier choice can never overwrite a later one.
 */
export async function resolveCurrency(
  currency: CurrencyCode,
  loadRates: () => Promise<ExchangeRates>,
  isCurrent: (currency: CurrencyCode) => boolean,
): Promise<CurrencyOutcome> {
  if (currency === baseCurrency) return { kind: 'base' };

  let loaded: ExchangeRates;
  try {
    loaded = await loadRates();
  } catch (error) {
    return isCurrent(currency) ? { kind: 'failed', error } : { kind: 'stale' };
  }
  if (!isCurrent(currency)) return { kind: 'stale' };

  const rate = loaded.rates[currency];
  if (!rate) return { kind: 'failed', error: new Error(`No ${currency} rate in the response`) };
  return { kind: 'converted', currency, rate, date: loaded.date };
}
