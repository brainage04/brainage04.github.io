import { describe, expect, it } from 'vitest';
import { readingMinutes } from './blog';

const words = (count: number, separator = ' ') => Array.from({ length: count }, () => 'word').join(separator);

describe('readingMinutes', () => {
  it('never reports less than one minute', () => {
    expect(readingMinutes('')).toBe(1);
    expect(readingMinutes(undefined)).toBe(1);
    expect(readingMinutes(words(40))).toBe(1);
  });

  it('rounds to the nearest minute at 200 words per minute, across any whitespace', () => {
    expect(readingMinutes(words(299))).toBe(1);
    expect(readingMinutes(words(300))).toBe(2);
    expect(readingMinutes(`  ${words(200)}\n\n- ${words(399, '\n')}\t`)).toBe(3);
  });
});
