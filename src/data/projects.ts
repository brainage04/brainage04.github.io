export const projectCategoryOrder = [
  'large-minecraft-mods',
  'small-minecraft-mods',
  'templates-starters',
  'minecraft-dev-tools',
  'minecraft-datapacks',
  'browser-extensions',
  'websites',
  'discord-bots',
] as const;

export type ProjectCategoryId = (typeof projectCategoryOrder)[number];

export type ProjectCategoryMeta = {
  label: string;
  badge: string;
  summary: string;
};

export const projectCategories = {
  'large-minecraft-mods': {
    label: 'Large Minecraft Mods',
    badge: 'Large Mod',
    summary: 'Bigger or systems-heavy Minecraft work: generated content, UI-heavy mods, and multi-feature experiments.',
  },
  'small-minecraft-mods': {
    label: 'Small Minecraft Mods',
    badge: 'Small Mod',
    summary: 'Smaller content mods, utility tweaks, and focused gameplay changes that are easier to describe in one sentence.',
  },
  'templates-starters': {
    label: 'Templates & Starters',
    badge: 'Template',
    summary: 'Reusable project scaffolds for starting Minecraft mods and datapacks with the boring setup already handled.',
  },
  'minecraft-dev-tools': {
    label: 'Minecraft Dev Tools & Libraries',
    badge: 'Dev Tool',
    summary: 'Libraries, asset tooling, and helper utilities used to build or maintain Minecraft projects.',
  },
  'minecraft-datapacks': {
    label: 'Minecraft Datapacks',
    badge: 'Datapack',
    summary: 'mcfunction datapacks and reusable vanilla-data utilities.',
  },
  'browser-extensions': {
    label: 'Browser Extensions',
    badge: 'Extension',
    summary: 'Small browser-side tools for fixing or improving specific websites and workflows.',
  },
  websites: {
    label: 'Websites',
    badge: 'Website',
    summary: 'Public websites and web experiments.',
  },
  'discord-bots': {
    label: 'Discord Bots',
    badge: 'Bot',
    summary: 'Discord automation and chat tooling.',
  },
} satisfies Record<ProjectCategoryId, ProjectCategoryMeta>;

export type Project = {
  name: string;
  url?: string;
  description: string;
  technologies: string[];
  category: ProjectCategoryId;
  status: 'released' | 'wip' | 'template' | 'coming-soon';
  featured?: number;
};

export const projects: Project[] = [
  {
    name: '???',
    description: 'Coming soon...',
    technologies: ['Java 25', 'Fabric', 'Twitch'],
    category: 'large-minecraft-mods',
    status: 'coming-soon',
    featured: 1,
  },
  {
    name: 'MagicCarpet',
    url: 'https://github.com/brainage04/MagicCarpet',
    description: 'A Minecraft Fabric mod that adds three tiers of Magic Carpets, including recipes, advancements, flying animations, and two-rider support.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'FabricModdingTemplate',
    url: 'https://github.com/brainage04/FabricModdingTemplate',
    description: 'A Fabric modding template with server-only, client-only, and server+client splits, test/GameTest modules, and release/Modrinth automation.',
    technologies: ['Java 25', 'Shell', 'GitHub Actions'],
    category: 'templates-starters',
    status: 'template',
    featured: 4,
  },
  {
    name: 'ProceduralDungeon',
    url: 'https://github.com/brainage04/ProceduralDungeon',
    description: 'A Minecraft Fabric server-side mod that adds procedurally generated dungeons with difficulty/loot tiers and themes across vanilla dimensions.',
    technologies: ['Java 25', 'Fabric', 'mcfunction'],
    category: 'large-minecraft-mods',
    status: 'wip',
    featured: 2,
  },
  {
    name: 'SimpleTPA',
    url: 'https://github.com/brainage04/SimpleTPA',
    description: 'A Minecraft Fabric server-side mod that implements teleport requests, with an auto-accept gamerule and per-player whitelist support.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'VeinMiner',
    url: 'https://github.com/brainage04/VeinMiner',
    description: 'A Minecraft Fabric server-side vein mining mod that handles mixed stone variants of the same ore vein.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'MaxVillagerTrades',
    url: 'https://github.com/brainage04/MaxVillagerTrades',
    description: 'A Minecraft Fabric server-side mod that makes villager trade enchantments, items, and books use maximum levels.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'MilkablePlayers',
    url: 'https://github.com/brainage04/MilkablePlayers',
    description: 'A Minecraft Fabric server-side mod that lets players milk other players, useful when multiplayer mobs apply negative effects.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'BrainageHUD',
    url: 'https://github.com/brainage04/BrainageHUD',
    description: 'A customizable Minecraft Fabric HUD mod with widgets for position, armor, keystrokes, reach, network stats, and a drag-and-drop editor.',
    technologies: ['Java 25', 'Fabric', 'Cloth Config'],
    category: 'large-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'HudRendererLib',
    url: 'https://github.com/brainage04/HudRendererLib',
    description: 'A Minecraft Fabric client-side library for rendering HUD elements, extracted from BrainageHUD.',
    technologies: ['Java 25', 'Fabric', 'Cloth Config'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'GetEnchantInfo',
    url: 'https://github.com/brainage04/GetEnchantInfo',
    description: 'A Minecraft Fabric client-side mod that adds commands for enchantment levels, applicable items, conflicts, and modded enchantments.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'SimpleTwitchChat',
    url: 'https://github.com/brainage04/SimpleTwitchChat',
    description: 'A Minecraft Fabric client-side mod that bridges Twitch chat and Minecraft chat, including sending Twitch messages with /tc.',
    technologies: ['Java 21', 'Fabric', 'Twitch4J'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'ToggleSprint',
    url: 'https://github.com/brainage04/ToggleSprint',
    description: 'A Minecraft Forge 1.8.9 toggle sprint/sneak and HUD mod intended to be safe to use on Hypixel.',
    technologies: ['Kotlin', 'Java 8', 'Forge', 'MoulConfig'],
    category: 'small-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'IceSkates',
    url: 'https://github.com/brainage04/IceSkates',
    description: 'A Minecraft Fabric mod that adds Ice Skates and Roller Skates for boat-like gliding on ice and regular terrain.',
    technologies: ['Java 21', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'FortniteInMinecraft',
    url: 'https://github.com/brainage04/FortniteInMinecraft',
    description: 'A Minecraft mod adding Fortnite mechanics including building, editing, guns, consumables, and related systems.',
    technologies: ['Java 21', 'Fabric'],
    category: 'large-minecraft-mods',
    status: 'wip',
    featured: 3,
  },
  {
    name: 'DevUtils',
    url: 'https://github.com/brainage04/DevUtils',
    description: 'A Minecraft Forge 1.8.9 texture atlas generator supporting the vanilla and Hypixel SkyBlock texture atlases.',
    technologies: ['Java 8', 'Forge'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'TextureAtlasGenerator',
    url: 'https://github.com/brainage04/TextureAtlasGenerator',
    description: 'A Fabric 1.21 port of the texture atlas generator from DevUtils.',
    technologies: ['Java 21', 'Fabric'],
    category: 'minecraft-dev-tools',
    status: 'wip',
  },
  {
    name: 'DatapackTemplate',
    url: 'https://github.com/brainage04/DatapackTemplate',
    description: 'A Minecraft datapack template that refactors namespace/name from the repository name.',
    technologies: ['mcfunction', 'Shell'],
    category: 'templates-starters',
    status: 'template',
    featured: 5,
  },
  {
    name: 'BrainageGamerules',
    url: 'https://github.com/brainage04/BrainageGamerules',
    description: 'A Minecraft datapack that automatically applies custom gamerules and scoreboard objectives to new worlds.',
    technologies: ['mcfunction'],
    category: 'minecraft-datapacks',
    status: 'released',
  },
  {
    name: 'BrainageUtilities',
    url: 'https://github.com/brainage04/BrainageUtilities',
    description: 'A Minecraft datapack with utility triggers, including Night Vision.',
    technologies: ['mcfunction'],
    category: 'minecraft-datapacks',
    status: 'released',
  },
  {
    name: 'BrainageKits',
    url: 'https://github.com/brainage04/BrainageKits',
    description: 'A Minecraft datapack containing useful kits used across other mods and datapacks.',
    technologies: ['mcfunction'],
    category: 'minecraft-datapacks',
    status: 'released',
  },
  {
    name: 'SoundFinder',
    url: 'https://github.com/brainage04/SoundFinder',
    description: 'A tool for locating Minecraft sounds stored inside .jar files.',
    technologies: ['Python'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'CopyTabLinks',
    url: 'https://github.com/brainage04/CopyTabLinks',
    description: 'A Chrome Manifest V3 extension that copies selected tab URLs with a configurable separator.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'browser-extensions',
    status: 'released',
  },
  {
    name: 'XAgeRestrictionFixer',
    url: 'https://github.com/brainage04/XAgeRestrictionFixer',
    description: 'A Chrome Manifest V3 extension that fixes X age-restricted media rendering for already age-verified accounts.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'browser-extensions',
    status: 'released',
  },
  {
    name: 'BetterRhythiaDownloader',
    url: 'https://github.com/brainage04/BetterRhythiaDownloader',
    description: 'A Chrome Manifest V3 extension that adds direct download buttons to Rhythia map cards.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'browser-extensions',
    status: 'released',
  },
  {
    name: 'HiBackBot',
    url: 'https://github.com/brainage04/HiBackBot',
    description: 'A Discord bot that renames everyone to "back".',
    technologies: ['JavaScript', 'Discord'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'brainage04.github.io',
    url: 'https://github.com/brainage04/brainage04.github.io',
    description: 'The source code for this website.',
    technologies: ['Astro', 'WebTUI', 'HTML', 'CSS', 'TypeScript'],
    category: 'websites',
    status: 'released',
    featured: 6,
  },
];

const isFeaturedProject = (project: Project): project is Project & { featured: number } => typeof project.featured === 'number';

export const getFeaturedProjects = () =>
  projects.filter(isFeaturedProject).sort((left, right) => left.featured - right.featured);

export type ProjectCategoryGroup = ProjectCategoryMeta & {
  id: ProjectCategoryId;
  projects: Project[];
};

export const groupProjects = (items: Project[]): ProjectCategoryGroup[] => {
  const groupedProjects = projectCategoryOrder.reduce(
    (groups, category) => {
      groups[category] = [];
      return groups;
    },
    {} as Record<ProjectCategoryId, Project[]>,
  );

  for (const project of items) {
    groupedProjects[project.category].push(project);
  }

  return projectCategoryOrder
    .map((category) => ({
      id: category,
      ...projectCategories[category],
      projects: groupedProjects[category],
    }))
    .filter((group) => group.projects.length > 0);
};
