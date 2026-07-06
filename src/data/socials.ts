export type SocialLink = {
  name: string;
  href: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
};

export const socials: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/brainage04',
    icon: '/assets/images/socials/github.png',
    iconWidth: 230,
    iconHeight: 225,
  },
  {
    name: 'Twitter / X',
    href: 'https://x.com/brainage19',
    icon: '/assets/images/socials/x.png',
    iconWidth: 2400,
    iconHeight: 2453,
  },
  {
    name: 'Discord',
    href: 'https://discord.com/users/brainage04',
    icon: '/assets/images/socials/discord.png',
    iconWidth: 619,
    iconHeight: 469,
  },
];
