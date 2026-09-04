import { describe, expect, it } from 'vitest';
import { formatBlogDate } from './formatDate';

describe('formatBlogDate', () => {
  it('formats the calendar date in Brisbane rather than UTC', () => {
    expect(formatBlogDate(new Date('2026-01-01T15:30:00Z'))).toBe('02 Jan 2026 AEST');
  });
});
