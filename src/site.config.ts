import type { SiteConfig } from '@brainage04/astro-shell/config';

export const siteConfig = {
  siteName: 'brainage04',
  homeTitle: "brainage04's website",
  description: "brainage04's website for projects, blog posts, and other websites!",
  navItems: [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects/', activeMode: 'prefix' },
    { name: 'Blog', href: '/blog/', activeMode: 'prefix' },
    { name: 'Recipes', href: 'https://brainage04.github.io/BakingCookingRecipes/' },
    { name: 'GifStudio', href: 'https://brainage04.github.io/GifStudio/' },
  ],
  sourceHref: 'https://github.com/brainage04/brainage04.github.io',
  faviconHref: '/pfp.webp',
  faviconType: 'image/webp',
  image: '/pfp.webp',
  themeColor: '#171218',
  ownerHref: 'https://github.com/brainage04',
  ownerName: 'brainage04',
} as const satisfies SiteConfig;
