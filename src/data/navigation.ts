import { projectAreaEntries } from './projects';

export type NavItem = {
  name: string;
  href: string;
  match?: (pathname: string) => boolean;
};

export const navigation: NavItem[] = [
  { name: 'Home', href: '/', match: (pathname) => pathname === '/' },
  {
    name: 'Projects',
    href: '/projects/',
    match: (pathname) => pathname.startsWith('/projects'),
  },
  { name: 'Blog', href: '/blog/', match: (pathname) => pathname.startsWith('/blog') },
];

export const projectNavigation = [
  { name: 'Overview', href: '/projects/' },
  ...projectAreaEntries.map(([, { name, href }]) => ({ name, href })),
] as const;
