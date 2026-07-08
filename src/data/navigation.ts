export type NavItem = {
  name: string;
  href: string;
  match?: string;
  activeMode?: 'exact' | 'prefix';
};

export const navigation: NavItem[] = [
  { name: 'Home', href: '/', match: '/', activeMode: 'exact' },
  {
    name: 'Projects',
    href: '/projects/',
    match: '/projects/',
    activeMode: 'prefix',
  },
  { name: 'Blog', href: '/blog/', match: '/blog/', activeMode: 'prefix' },
  { name: 'Recipes', href: '/BakingCookingRecipes/' },
];
