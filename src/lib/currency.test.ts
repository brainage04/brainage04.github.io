import { describe, expect, it } from 'vitest';
import {
  conversionNote,
  formatPrice,
  formatRateDate,
  parseRates,
  ratesUrl,
  resolveCurrency,
  roundPrice,
  type CurrencyCode,
  type ExchangeRates,
} from './currency';

describe('formatRateDate', () => {
  it('writes the ECB date with an ordinal day and the full month name', () => {
    const days = { 1: '1st', 2: '2nd', 3: '3rd', 4: '4th', 11: '11th', 12: '12th', 13: '13th', 21: '21st' };
    for (const [day, ordinal] of Object.entries(days)) {
      expect(formatRateDate(`2026-01-${day.padStart(2, '0')}`)).toBe(`${ordinal} January 2026`);
    }
    expect(formatRateDate('2026-02-22')).toBe('22nd February 2026');
    expect(formatRateDate('2026-03-23')).toBe('23rd March 2026');
    expect(formatRateDate('2026-10-14')).toBe('14th October 2026');
    expect(formatRateDate('2026-12-31')).toBe('31st December 2026');
  });

  it('leaves an unexpected date as it is', () => {
    expect(formatRateDate('14 Oct 2026')).toBe('14 Oct 2026');
    expect(formatRateDate('2026-13-01')).toBe('2026-13-01');
  });

  it('names the date in the conversion note', () => {
    expect(conversionNote('AUD', '2026-10-14', 'Quotes and invoices are in USD.')).toBe(
      'AUD prices are approximate, converted from USD at the European Central Bank rate for 14th October 2026. Quotes and invoices are in USD.',
    );
  });
});

describe('commission currency conversion', () => {
  it('shows USD prices exactly', () => {
    expect(formatPrice(100, 'from')).toBe('from US$100');
    expect(formatPrice(1200, 'from')).toBe('from US$1,200');
    expect(formatPrice(30, 'hourly')).toBe('US$30 / hour');
  });

  it('marks converted prices as approximate and rounds them', () => {
    expect(formatPrice(100, 'from', 'AUD', 1.4331)).toBe('from ≈A$140');
    expect(formatPrice(400, 'from', 'AUD', 1.4331)).toBe('from ≈A$550');
    expect(formatPrice(700, 'from', 'GBP', 0.77)).toBe('from ≈£550');
    expect(formatPrice(30, 'hourly', 'EUR', 0.894)).toBe('≈€27 / hour');
  });

  it('rounds from prices to a step that grows with the amount', () => {
    expect(roundPrice(143.3, 'from')).toBe(140);
    expect(roundPrice(1003, 'from')).toBe(1000);
    expect(roundPrice(2870, 'from')).toBe(2900);
    expect(roundPrice(2, 'from')).toBe(10);
    expect(roundPrice(42.99, 'hourly')).toBe(43);
  });

  it('requests every offered currency against USD', () => {
    expect(ratesUrl).toBe('https://api.frankfurter.dev/v1/latest?base=USD&symbols=AUD,CAD,EUR,GBP,NZD');
  });

  it('keeps only usable rates for offered currencies', () => {
    expect(parseRates({ date: '2026-10-13', rates: { AUD: 1.43, JPY: 150, EUR: 0, GBP: 'x' } })).toEqual({
      date: '2026-10-13',
      rates: { AUD: 1.43 },
    });
    expect(() => parseRates({ message: 'not found' })).toThrow();
    expect(() => parseRates(null)).toThrow();
  });
});

/** A rates request that resolves or rejects when the test says so. */
type DeferredRates = {
  promise: Promise<ExchangeRates>;
  resolve: (rates: ExchangeRates) => void;
  reject: (error: Error) => void;
};

describe('resolveCurrency', () => {
  function deferredRates(): DeferredRates {
    let resolve!: (rates: ExchangeRates) => void;
    let reject!: (error: Error) => void;
    const promise = new Promise<ExchangeRates>((onResolve, onReject) => {
      resolve = onResolve;
      reject = onReject;
    });
    return { promise, resolve, reject };
  }

  it('converts the current choice and leaves USD without a request', async () => {
    const load = () => Promise.resolve({ date: '2026-10-13', rates: { AUD: 1.43 } });

    await expect(resolveCurrency('AUD', load, () => true)).resolves.toEqual({
      kind: 'converted',
      currency: 'AUD',
      rate: 1.43,
      date: '2026-10-13',
    });
    await expect(
      resolveCurrency(
        'USD',
        () => Promise.reject(new Error('unused')),
        () => true,
      ),
    ).resolves.toEqual({
      kind: 'base',
    });
  });

  it('reports a failure only while the failed currency is still selected', async () => {
    await expect(
      resolveCurrency(
        'AUD',
        () => Promise.resolve({ date: '2026-10-13', rates: {} }),
        () => true,
      ),
    ).resolves.toMatchObject({ kind: 'failed' });
    await expect(
      resolveCurrency(
        'AUD',
        () => Promise.reject(new Error('offline')),
        () => true,
      ),
    ).resolves.toMatchObject({ kind: 'failed' });
  });

  it.each([
    ['resolves late without an AUD rate', (aud: DeferredRates) => aud.resolve(cadOnly)],
    ['fails late', (aud: DeferredRates) => aud.reject(new Error('timeout'))],
  ])('keeps a later CAD choice when the earlier AUD request %s', async (_, settleAud) => {
    let selected: CurrencyCode = 'AUD';
    const isCurrent = (currency: CurrencyCode) => selected === currency;
    const aud = deferredRates();

    const audOutcome = resolveCurrency('AUD', () => aud.promise, isCurrent);
    selected = 'CAD';
    const cadOutcome = resolveCurrency('CAD', () => Promise.resolve(cadOnly), isCurrent);
    settleAud(aud);

    await expect(audOutcome).resolves.toEqual({ kind: 'stale' });
    await expect(cadOutcome).resolves.toEqual({ kind: 'converted', currency: 'CAD', rate: 1.37, date: '2026-10-13' });
  });
});

const cadOnly: ExchangeRates = { date: '2026-10-13', rates: { CAD: 1.37 } };
