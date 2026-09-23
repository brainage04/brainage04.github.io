import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import astroShell from '@brainage04/astro-shell';
import { siteConfig } from './src/site.config.ts';

export default defineConfig({
  integrations: [astroShell({ config: siteConfig, styles: ['@brainage04/astro-shell/themes/rose.css'] })],
  image: {
    domains: ['raw.githubusercontent.com'],
  },
  markdown: {
    processor: satteri({
      features: {
        smartPunctuation: false,
      },
    }),
  },
});
