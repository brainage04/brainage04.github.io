export type NavItem = {
  name: string;
  href: string;
  match?: (pathname: string) => boolean;
};

export const navigation: NavItem[] = [
  { name: 'Home', href: '/', match: (pathname) => pathname === '/' },
  { name: 'Skills', href: '/skills/', match: (pathname) => pathname.startsWith('/skills') },
  {
    name: 'Projects',
    href: '/coding-projects/',
    match: (pathname) => pathname.startsWith('/coding-projects'),
  },
  { name: 'Blog', href: '/blog/', match: (pathname) => pathname.startsWith('/blog') },
];

export const projectNavigation = [
  { name: 'Overview', href: '/coding-projects/' },
  { name: 'Java', href: '/coding-projects/java/' },
  { name: 'Other', href: '/coding-projects/other/' },
] as const;
