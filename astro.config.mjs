import { existsSync } from 'node:fs';
import { join, sep } from 'node:path';
import { URL } from 'node:url';
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import astroShell from '@brainage04/astro-shell';
import { siteConfig } from './src/site.config.ts';

/**
 * Dev only: serve `public/<dir>/index.html` at `/<dir>/` (and redirect `/<dir>` there), as GitHub Pages and
 * `astro preview` do. The Astro dev server only serves public files by their exact path.
 */
const publicDirectoryIndex = {
  name: 'public-directory-index',
  apply: 'serve',
  configureServer(server) {
    const publicDir = server.config.publicDir;
    server.middlewares.use((request, response, next) => {
      const url = new URL(request.url ?? '/', 'http://localhost');
      let pathname;
      try {
        pathname = decodeURIComponent(url.pathname);
      } catch {
        return next();
      }
      const index = join(publicDir, pathname, 'index.html');
      if (pathname === '/' || !index.startsWith(publicDir + sep) || !existsSync(index)) return next();

      if (pathname.endsWith('/')) {
        request.url = `${url.pathname}index.html${url.search}`;
        return next();
      }
      response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
    });
  },
};

export default defineConfig({
  integrations: [
    astroShell({
      config: siteConfig,
      styles: ['@brainage04/astro-shell/themes/rose.css', './src/styles/site.css'],
    }),
  ],
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
  vite: {
    plugins: [publicDirectoryIndex],
  },
});
