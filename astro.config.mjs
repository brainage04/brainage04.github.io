import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://brainage04.github.io',
  markdown: {
    processor: satteri({
      features: {
        smartPunctuation: false,
      },
    }),
  },
});
