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

export type ProjectCategoryMeta = {
  label: string;
  badge: string;
};

export const projectCategories = {
  'large-minecraft-mods': { label: 'Large Minecraft Mods', badge: 'Large Mod' },
  'small-minecraft-mods': { label: 'Small Minecraft Mods', badge: 'Small Mod' },
  'templates-starters': { label: 'Templates & Starters', badge: 'Template' },
  'minecraft-dev-tools': { label: 'Minecraft Dev Tools & Libraries', badge: 'Dev Tool' },
  'minecraft-datapacks': { label: 'Minecraft Datapacks', badge: 'Datapack' },
  'browser-extensions': { label: 'Browser Extensions', badge: 'Extension' },
  websites: { label: 'Websites', badge: 'Website' },
  'discord-bots': { label: 'Discord Bots & Plugins', badge: 'Discord' },
  'scripts-developer-tools': { label: 'Scripts & Developer Tools', badge: 'Dev Tool' },
  personal: { label: 'Personal', badge: 'Personal' },
} satisfies Record<ProjectCategoryId, ProjectCategoryMeta>;

export type Project = {
  name: string;
  url: string;
  description: string;
  technologies: string[];
  category: ProjectCategoryId;
  status: 'released' | 'wip' | 'template';
  featured?: number;
};

export const projects: Project[] = [
  {
    name: 'BrainageHUD',
    url: 'https://github.com/brainage04/BrainageHUD',
    description: 'A customizable Fabric HUD mod with widgets for position, armour, keystrokes, reach, network stats, and a drag-and-drop editor.',
    technologies: ['Java 25', 'Fabric', 'Cloth Config'],
    category: 'large-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'BrainageMinigames',
    url: 'https://github.com/brainage04/BrainageMinigames',
    description: 'A server-side Fabric mod for configurable custom events and an Ultra Hardcore minigame.',
    technologies: ['Java 25', 'Fabric'],
    category: 'large-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'FortniteInMinecraft',
    url: 'https://github.com/brainage04/FortniteInMinecraft',
    description: 'A Minecraft mod adding Fortnite mechanics and items, including building, editing, guns, consumables, and related systems.',
    technologies: ['Java 21', 'Fabric'],
    category: 'large-minecraft-mods',
    status: 'wip',
    featured: 3,
  },
  {
    name: 'ProceduralDungeon',
    url: 'https://github.com/brainage04/ProceduralDungeon',
    description: 'A server-side Fabric mod that adds procedurally generated dungeons with difficulty, loot tiers, and themes across vanilla dimensions.',
    technologies: ['Java 25', 'Fabric', 'mcfunction'],
    category: 'large-minecraft-mods',
    status: 'wip',
    featured: 2,
  },
  {
    name: 'AcceleratedDamage',
    url: 'https://github.com/brainage04/AcceleratedDamage',
    description: 'A server-side Fabric mod exposing accelerated combat and damage mechanics as configurable gamerules.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'BrainageServerUtils',
    url: 'https://github.com/brainage04/BrainageServerUtils',
    description: 'A server-side Fabric utility mod with configurable gameplay rules, setup commands, and player utilities.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'GetEnchantInfo',
    url: 'https://github.com/brainage04/GetEnchantInfo',
    description: 'A Fabric client mod with commands for enchantment levels, applicable items, conflicts, and modded enchantments.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'MagicCarpet',
    url: 'https://github.com/brainage04/MagicCarpet',
    description: 'A Fabric mod adding three tiers of Magic Carpets with recipes, advancements, flying animations, and two-rider support.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
    featured: 1,
  },
  {
    name: 'MaxVillagerTrades',
    url: 'https://github.com/brainage04/MaxVillagerTrades',
    description: 'A server-side Fabric mod that makes villager trade enchantments, items, and books use maximum levels.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'MilkablePlayers',
    url: 'https://github.com/brainage04/MilkablePlayers',
    description: 'A server-side Fabric mod that lets players milk other players when multiplayer mobs apply negative effects.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'SimpleTPA',
    url: 'https://github.com/brainage04/SimpleTPA',
    description: 'A server-side Fabric teleport-request mod with an auto-accept gamerule and per-player whitelist support.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'SimpleTwitchChat',
    url: 'https://github.com/brainage04/SimpleTwitchChat',
    description: 'A Fabric client mod that connects Twitch chat with Minecraft chat, including sending Twitch messages with /tc.',
    technologies: ['Java 21', 'Fabric', 'Twitch4J'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'Telekinesis',
    url: 'https://github.com/brainage04/Telekinesis',
    description: 'A server-side Fabric mod that puts player-mined block drops and experience directly into the player’s inventory and total.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'ToggleSprint',
    url: 'https://github.com/brainage04/ToggleSprint',
    description: 'A Forge 1.8.9 toggle sprint, toggle sneak, and HUD mod intended to be safe to use on Hypixel.',
    technologies: ['Kotlin', 'Java 8', 'Forge'],
    category: 'small-minecraft-mods',
    status: 'wip',
  },
  {
    name: 'VeinMiner',
    url: 'https://github.com/brainage04/VeinMiner',
    description: 'A server-side Fabric vein-mining mod that handles mixed stone variants within the same ore vein.',
    technologies: ['Java 25', 'Fabric'],
    category: 'small-minecraft-mods',
    status: 'released',
  },
  {
    name: 'BrowserExtensionTemplate',
    url: 'https://github.com/brainage04/BrowserExtensionTemplate',
    description: 'A reusable browser-extension template with source files, packaged releases, and GitHub Pages documentation.',
    technologies: ['JavaScript', 'Chrome Extension', 'GitHub Actions'],
    category: 'templates-starters',
    status: 'template',
  },
  {
    name: 'DatapackTemplate',
    url: 'https://github.com/brainage04/DatapackTemplate',
    description: 'A Minecraft datapack template that derives namespace and project naming from the repository name.',
    technologies: ['mcfunction', 'Shell'],
    category: 'templates-starters',
    status: 'template',
    featured: 5,
  },
  {
    name: 'FabricModdingTemplate',
    url: 'https://github.com/brainage04/FabricModdingTemplate',
    description: 'A Fabric template with server-only, client-only, and combined variants, tests, GameTests, and release automation.',
    technologies: ['Java 25', 'Shell', 'GitHub Actions'],
    category: 'templates-starters',
    status: 'template',
    featured: 4,
  },
  {
    name: 'RevengePluginTemplate',
    url: 'https://github.com/brainage04/RevengePluginTemplate',
    description: 'A reusable template for Revenge and Vencord Discord client plugins.',
    technologies: ['TypeScript', 'Revenge', 'Vencord'],
    category: 'templates-starters',
    status: 'template',
  },
  {
    name: 'WebTuiAstroTemplate',
    url: 'https://github.com/brainage04/WebTuiAstroTemplate',
    description: 'A reusable Astro and WebTUI starter with responsive components and GitHub Pages deployment.',
    technologies: ['Astro', 'TypeScript', 'WebTUI'],
    category: 'templates-starters',
    status: 'template',
  },
  {
    name: 'BrainageLib',
    url: 'https://github.com/brainage04/BrainageLib',
    description: 'A shared Fabric library for Brainage04 mods, including combined notices, configuration, and compatibility helpers.',
    technologies: ['Java 25', 'Fabric'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'DevUtils',
    url: 'https://github.com/brainage04/DevUtils',
    description: 'A Forge 1.8.9 texture-atlas generator supporting vanilla and Hypixel SkyBlock texture atlases.',
    technologies: ['Java 8', 'Forge'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'HudRendererLib',
    url: 'https://github.com/brainage04/HudRendererLib',
    description: 'A Fabric client library for rendering configurable HUD elements, extracted from BrainageHUD.',
    technologies: ['Java 25', 'Fabric', 'Cloth Config'],
    category: 'minecraft-dev-tools',
    status: 'released',
  },
  {
    name: 'BrainageGamerules',
    url: 'https://github.com/brainage04/BrainageGamerules',
    description: 'A datapack that applies preferred gamerules and scoreboard objectives to new Minecraft worlds.',
    technologies: ['mcfunction'],
    category: 'minecraft-datapacks',
    status: 'released',
  },
  {
    name: 'BrainageKits',
    url: 'https://github.com/brainage04/BrainageKits',
    description: 'A Minecraft datapack containing reusable kits shared by other mods and datapacks.',
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
    description: 'A Chrome extension that fixes X age-restricted media for already age-verified accounts.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'browser-extensions',
    status: 'released',
  },
  {
    name: 'BakingCookingRecipes',
    url: 'https://github.com/brainage04/BakingCookingRecipes',
    description: 'Recipe batch scalers with Woolworths cost estimates, substitutions, nutrition, and combined shopping lists.',
    technologies: ['Astro', 'TypeScript', 'WebTUI'],
    category: 'websites',
    status: 'released',
  },
  {
    name: 'brainage04.github.io',
    url: 'https://github.com/brainage04/brainage04.github.io',
    description: 'The source for this software portfolio, project catalogue, and blog.',
    technologies: ['Astro', 'TypeScript', 'WebTUI'],
    category: 'websites',
    status: 'released',
    featured: 6,
  },
  {
    name: 'kashii-music.github.io',
    url: 'https://github.com/brainage04/kashii-music.github.io',
    description: 'A music portfolio and commissions site for Brisbane producer kashii.',
    technologies: ['Astro', 'TypeScript', 'WebTUI'],
    category: 'websites',
    status: 'released',
  },
  {
    name: 'ConversationExporter',
    url: 'https://github.com/brainage04/ConversationExporter',
    description: 'A Revenge plugin for exporting Discord conversations.',
    technologies: ['TypeScript', 'Revenge'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'DiscordPluginInstaller',
    url: 'https://github.com/brainage04/DiscordPluginInstaller',
    description: 'A command-line installer for Discord client plugins.',
    technologies: ['JavaScript', 'Node.js'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'HiBackBot',
    url: 'https://github.com/brainage04/HiBackBot',
    description: 'A Discord bot that renames everyone to “back”.',
    technologies: ['JavaScript', 'Discord'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'PresenceWatcher',
    url: 'https://github.com/brainage04/PresenceWatcher',
    description: 'A Revenge plugin for monitoring Discord presence changes.',
    technologies: ['TypeScript', 'Revenge'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'XEmbedFixer',
    url: 'https://github.com/brainage04/XEmbedFixer',
    description: 'A Revenge plugin that fixes X and Twitter embeds in Discord.',
    technologies: ['TypeScript', 'Revenge'],
    category: 'discord-bots',
    status: 'released',
  },
  {
    name: 'brainage04-astro-shell',
    url: 'https://github.com/brainage04/brainage04-astro-shell',
    description: 'A shared Astro shell package for consistent layouts, navigation, styling, and terminal panels across sites.',
    technologies: ['Astro', 'TypeScript', 'WebTUI'],
    category: 'scripts-developer-tools',
    status: 'released',
  },
  {
    name: 'GameTestAssetGenerator',
    url: 'https://github.com/brainage04/GameTestAssetGenerator',
    description: 'A Minecraft asset-processing tool that creates placement files for item and block GameTests.',
    technologies: ['Java'],
    category: 'scripts-developer-tools',
    status: 'released',
  },
  {
    name: 'MDCTExtractor',
    url: 'https://github.com/brainage04/MDCTExtractor',
    description: 'An extractor for the MDCT image and audio format.',
    technologies: ['Java'],
    category: 'scripts-developer-tools',
    status: 'released',
  },
  {
    name: 'MobileRemover',
    url: 'https://github.com/brainage04/MobileRemover',
    description: 'A dependency-free script that removes mobile-device verification from Microsoft Teams.',
    technologies: ['JavaScript'],
    category: 'scripts-developer-tools',
    status: 'released',
  },
  {
    name: 'brainage04',
    url: 'https://github.com/brainage04/brainage04',
    description: 'The source for the brainage04 GitHub profile README.',
    technologies: ['Markdown'],
    category: 'personal',
    status: 'released',
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
