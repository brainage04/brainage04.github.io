export const projectCategoryOrder = [
  'large-minecraft-mods',
  'small-minecraft-mods',
  'templates-starters',
  'minecraft-dev-tools',
  'minecraft-datapacks',
  'browser-extensions',
  'websites',
  'discord-bots',
  'scripts-developer-tools',
  'personal',
] as const;

export type ProjectCategoryId = (typeof projectCategoryOrder)[number];
export type TopLevelCategoryId =
  | 'minecraft-mods'
  | 'minecraft-datapacks'
  | 'browser-extensions'
  | 'websites'
  | 'discord-bots'
  | 'scripts-developer-tools'
  | 'personal';

export type ProjectCategoryMeta = {
  label: string;
  badge: string;
  mark: string;
  topLevel: TopLevelCategoryId;
};

export const projectCategories = {
  'large-minecraft-mods': {
    label: 'Large Minecraft Mods',
    badge: 'Large Mod',
    mark: '▦',
    topLevel: 'minecraft-mods',
  },
  'small-minecraft-mods': {
    label: 'Small Minecraft Mods',
    badge: 'Small Mod',
    mark: '✦',
    topLevel: 'minecraft-mods',
  },
  'templates-starters': {
    label: 'Templates & Starters',
    badge: 'Template',
    mark: '</>',
    topLevel: 'minecraft-mods',
  },
  'minecraft-dev-tools': {
    label: 'Minecraft Dev Tools & Libraries',
    badge: 'Dev Tool',
    mark: '⌘',
    topLevel: 'minecraft-mods',
  },
  'minecraft-datapacks': {
    label: 'Minecraft Datapacks',
    badge: 'Datapack',
    mark: '{}',
    topLevel: 'minecraft-datapacks',
  },
  'browser-extensions': {
    label: 'Browser Extensions',
    badge: 'Extension',
    mark: '◫',
    topLevel: 'browser-extensions',
  },
  websites: { label: 'Websites & Web Apps', badge: 'Website', mark: '>_', topLevel: 'websites' },
  'discord-bots': {
    label: 'Discord Bots & Plugins',
    badge: 'Discord',
    mark: '◉',
    topLevel: 'discord-bots',
  },
  'scripts-developer-tools': {
    label: 'Scripts & Developer Tools',
    badge: 'Dev Tool',
    mark: '$_',
    topLevel: 'scripts-developer-tools',
  },
  personal: { label: 'Personal', badge: 'Personal', mark: '@', topLevel: 'personal' },
} satisfies Record<ProjectCategoryId, ProjectCategoryMeta>;

export type Project = {
  name: string;
  url: string;
  description: string;
  technologies: string[];
  category: ProjectCategoryId;
  featured?: number;
};

const project = (
  name: string,
  description: string | null,
  language: string | null,
  category: ProjectCategoryId,
  featured?: number,
  url = `https://github.com/brainage04/${name}`,
): Project => ({
  name,
  url,
  description: description ?? 'No repository description provided.',
  technologies: language ? [language] : [],
  category,
  ...(featured === undefined ? {} : { featured }),
});

// Reconciled against brainage04's eight GitHub star lists on 2026-08-02.
export const projects: Project[] = [
  project(
    'BrainageHUD',
    'A client-side Fabric Minecraft mod that adds useful HUD elements.',
    'Java',
    'large-minecraft-mods',
  ),
  project(
    'BrainageMinigames',
    'A server-side Fabric Minecraft mod that provides configurable custom events and an Ultra Hardcore minigame.',
    'Java',
    'large-minecraft-mods',
  ),
  project(
    'FortniteInMinecraft',
    'A Fabric and NeoForge Minecraft mod that adds Fortnite-inspired building, weapons, resources, and combat mechanics.',
    'Java',
    'large-minecraft-mods',
    3,
  ),
  project(
    'ProceduralDungeon',
    'A Fabric Minecraft mod that adds procedurally generated, tiered dungeons with varied rooms, traps, and loot.',
    'Java',
    'large-minecraft-mods',
    2,
  ),
  project(
    'AcceleratedDamage',
    'A server-side Fabric Minecraft mod that exposes configurable accelerated combat and damage mechanics as gamerules.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'BetterVillagerTrades',
    'Multi-loader villager trade rerolls, per-player filters, and max-level enchantment outputs.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'BrainageServerUtils',
    'A server-side Fabric Minecraft mod that adds configurable utility gamerules and administrative commands.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'GetEnchantInfo',
    'A client-side Fabric Minecraft mod that adds commands for inspecting enchantments and their maximum levels.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'MagicCarpet',
    'A Fabric Minecraft mod that adds three tiers of craftable, rideable flying carpets.',
    'Java',
    'small-minecraft-mods',
    1,
  ),
  project(
    'MilkablePlayers',
    'A server-side Fabric Minecraft mod that lets players milk other players with buckets.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'SimpleTPA',
    'A server-side Fabric Minecraft mod that adds player-to-player teleport requests.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'SimpleTwitchChat',
    'A client-side Fabric Minecraft mod that connects Minecraft chat with Twitch chat.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'Telekinesis',
    'A server-side Fabric Minecraft mod that sends mined block drops and experience directly to the player.',
    'Java',
    'small-minecraft-mods',
  ),
  project(
    'ToggleSprint',
    'A client-side Forge Minecraft mod that adds configurable toggle sprint and sneak behavior for 1.8.9.',
    'Kotlin',
    'small-minecraft-mods',
  ),
  project(
    'VeinMiner',
    'A server-side Fabric Minecraft mod that mines connected ore and tree blocks together.',
    'Java',
    'small-minecraft-mods',
  ),
  project('LegacyMinecraftModTemplate', 'My legacy Minecraft 1.8.9 modding template.', 'Kotlin', 'templates-starters'),
  project('ModernMinecraftModTemplate', 'My modern Minecraft modding template.', 'Shell', 'templates-starters'),
  project('baritone', 'google maps for block game', 'Java', 'minecraft-dev-tools'),
  project(
    'BrainageLib',
    "Shared server-side Fabric utilities for brainage04's Minecraft mods",
    'Java',
    'minecraft-dev-tools',
  ),
  project(
    'DevUtils',
    'A client-side Forge Minecraft mod that generates pre-rendered vanilla and Hypixel SkyBlock texture atlases for 1.8.9.',
    'Java',
    'minecraft-dev-tools',
  ),
  project(
    'FabricModdingConventions',
    'Reusable Fabric client GameTest recording helpers for Minecraft mods.',
    'Java',
    'minecraft-dev-tools',
  ),
  project(
    'HudRendererLib',
    'A Minecraft Fabric client-side library for rendering HUD elements.',
    'Java',
    'minecraft-dev-tools',
  ),
  project('DatapackTemplate', 'My Minecraft datapack template.', 'mcfunction', 'minecraft-datapacks'),
  project(
    'BrainageGamerules',
    'A Minecraft datapack that automatically applies custom gamerules, scoreboard objectives and more to my new worlds.',
    'mcfunction',
    'minecraft-datapacks',
  ),
  project(
    'BrainageKits',
    'A Minecraft datapack that contains many unique kits I use in some of my other datapacks.',
    null,
    'minecraft-datapacks',
  ),
  project(
    'BrainageUtilities',
    'A Minecraft datapack that adds some helpful utilities to my worlds',
    'mcfunction',
    'minecraft-datapacks',
  ),
  project(
    'CopyTabLinks',
    'Chrome Manifest V3 extension that copies selected tab URLs with a configurable separator.',
    'JavaScript',
    'browser-extensions',
  ),
  project(
    'XAgeRestrictionFixer',
    "Chrome Manifest V3 extension that fixes X's broken age-restricted media rendering for already age-verified accounts.",
    'JavaScript',
    'browser-extensions',
  ),
  project(
    'BetterRhythiaDownloader',
    'Chrome Manifest V3 extension that adds direct download buttons to Rhythia map cards.',
    'JavaScript',
    'browser-extensions',
  ),
  project(
    'BrowserExtensionTemplate',
    'Reusable Chrome Manifest V3 extension template with linting, formatting, store assets, and release tooling.',
    'JavaScript',
    'browser-extensions',
  ),
  project('brainage04.github.io', 'My GitHub Pages website.', 'Astro', 'websites', 6),
  project('GifStudio', null, 'TypeScript', 'websites'),
  project('BakingCookingRecipes', null, 'TypeScript', 'websites'),
  project('WebTuiAstroTemplate', null, 'Astro', 'websites'),
  project('AstroShell', 'Shared Astro shell components and base styles for brainage04 websites.', 'Astro', 'websites'),
  project(
    'kashiilol.github.io',
    'Music producer portfolio and commission site for kashii',
    'Astro',
    'websites',
    undefined,
    'https://github.com/kashiilol/kashiilol.github.io',
  ),
  project('HiBackBot', 'Discord bot that renames everyone to "back"', 'JavaScript', 'discord-bots'),
  project('XEmbedFixer', null, 'TypeScript', 'discord-bots'),
  project('PresenceWatcher', null, 'TypeScript', 'discord-bots'),
  project('ConversationExporter', null, 'TypeScript', 'discord-bots'),
  project('RevengeVencordPluginTemplate', null, 'TypeScript', 'discord-bots'),
  project('DiscordPluginInstaller', null, 'JavaScript', 'discord-bots'),
  project(
    'InstagramUnlikeHelper',
    'Fail-closed browser-console helper for cautiously unliking Instagram posts',
    'JavaScript',
    'scripts-developer-tools',
  ),
  project('brainage04', null, null, 'personal'),
];

const isFeaturedProject = (item: Project): item is Project & { featured: number } => typeof item.featured === 'number';
export const getFeaturedProjects = () =>
  projects.filter(isFeaturedProject).sort((left, right) => left.featured - right.featured);

export const topLevelCategories = [
  { id: 'minecraft-mods', label: 'Minecraft Mods' },
  { id: 'discord-bots', label: 'Discord Bots & Plugins' },
  { id: 'websites', label: 'Websites & Web Apps' },
  { id: 'browser-extensions', label: 'Browser Extensions' },
  { id: 'minecraft-datapacks', label: 'Minecraft Datapacks' },
  { id: 'personal', label: 'Personal' },
  { id: 'scripts-developer-tools', label: 'Scripts & Developer Tools' },
] as const satisfies ReadonlyArray<{ id: TopLevelCategoryId; label: string }>;

export type ProjectCategoryGroup = {
  id: TopLevelCategoryId;
  label: string;
  projects: Project[];
  subgroups?: Array<{ id: ProjectCategoryId; label: string; projects: Project[] }>;
};
export const groupProjects = (items: Project[]): ProjectCategoryGroup[] =>
  topLevelCategories.map((category) => {
    const categoryProjects = items.filter((item) => projectCategories[item.category].topLevel === category.id);
    return category.id === 'minecraft-mods'
      ? {
          ...category,
          projects: categoryProjects,
          subgroups: projectCategoryOrder.slice(0, 4).map((id) => ({
            id,
            label: projectCategories[id].label,
            projects: categoryProjects.filter((item) => item.category === id),
          })),
        }
      : { ...category, projects: categoryProjects };
  });
