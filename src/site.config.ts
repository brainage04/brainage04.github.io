import type { SiteConfig } from '@brainage04/astro-shell/config';

export const siteConfig = {
  siteName: 'brainage04',
  homeTitle: "brainage04's website",
  description: "brainage04's website for projects, blog posts, and other websites!",
  navItems: [
    { name: 'Home', href: '/', match: '/', activeMode: 'exact' },
    { name: 'Projects', href: '/projects/', match: '/projects/', activeMode: 'prefix' },
    { name: 'Blog', href: '/blog/', match: '/blog/', activeMode: 'prefix' },
    { name: 'Recipes', href: '/BakingCookingRecipes/' },
    { name: 'GifStudio', href: '/GifStudio/' },
  ],
  sourceHref: 'https://github.com/brainage04/brainage04.github.io',
  faviconHref: '/pfp.webp',
  faviconType: 'image/webp',
  image: '/pfp.webp',
  themeColor: '#171218',
  preconnectHrefs: [],
  ownerHref: 'https://github.com/brainage04',
  ownerName: 'brainage04',
  creatorHref: undefined,
  creatorName: undefined,
} as const satisfies SiteConfig;
