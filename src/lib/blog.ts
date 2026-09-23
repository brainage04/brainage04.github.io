import type { CollectionEntry } from 'astro:content';

const WORDS_PER_MINUTE = 200;

export const readingMinutes = (body = '') => {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

export const newestPostFirst = (left: CollectionEntry<'blog'>, right: CollectionEntry<'blog'>) =>
  right.data.pubDate.valueOf() - left.data.pubDate.valueOf();
