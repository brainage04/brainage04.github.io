export type ProjectArea = 'java' | 'other';

export type ProjectAreaPage = {
  name: string;
  href: string;
  title: string;
  description: string;
  metaDescription: string;
  summary: string;
};

export type Project = {
  name: string;
  url: string;
  description: string;
  technologies: string[];
  category: string;
  area: ProjectArea;
  status: 'released' | 'wip' | 'template';
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: 'MagicCarpet',
    url: 'https://github.com/brainage04/MagicCarpet',
    description: 'A Minecraft Fabric mod that adds three tiers of Magic Carpets, including recipes, advancements, flying animations, and two-rider support.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Mods',
    area: 'java',
    status: 'released',
    featured: true,
  },
  {
    name: 'FabricModdingTemplate',
    url: 'https://github.com/brainage04/FabricModdingTemplate',
    description: 'A Fabric modding template with server-only, client-only, and server+client splits, test/GameTest modules, and release/Modrinth automation.',
    technologies: ['Java 21', 'Shell', 'GitHub Actions'],
    category: 'Minecraft Mods',
    area: 'java',
    status: 'template',
    featured: true,
  },
  {
    name: 'ProceduralDungeon',
    url: 'https://github.com/brainage04/ProceduralDungeon',
    description: 'A Minecraft Fabric server-side mod that adds procedurally generated dungeons with difficulty/loot tiers and themes across vanilla dimensions.',
    technologies: ['Java 21', 'Fabric', 'mcfunction'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'wip',
    featured: true,
  },
  {
    name: 'SimpleTPA',
    url: 'https://github.com/brainage04/SimpleTPA',
    description: 'A Minecraft Fabric server-side mod that implements teleport requests, with an auto-accept gamerule and per-player whitelist support.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'VeinMiner',
    url: 'https://github.com/brainage04/VeinMiner',
    description: 'A Minecraft Fabric server-side vein mining mod that handles mixed stone variants of the same ore vein.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'Telekinesis',
    url: 'https://github.com/brainage04/Telekinesis',
    description: 'A Minecraft Fabric server-side mod that automatically teleports mob and block drops into your inventory.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'MaxVillagerTrades',
    url: 'https://github.com/brainage04/MaxVillagerTrades',
    description: 'A Minecraft Fabric server-side mod that makes villager trade enchantments, items, and books use maximum levels.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'MilkablePlayers',
    url: 'https://github.com/brainage04/MilkablePlayers',
    description: 'A Minecraft Fabric server-side mod that lets players milk other players, useful when multiplayer mobs apply negative effects.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'BrainageMinigames',
    url: 'https://github.com/brainage04/BrainageMinigames',
    description: 'A Minecraft Fabric server-side mod for hosting minigames in separate dimensions without switching worlds or disrupting an existing world.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Server Mods',
    area: 'java',
    status: 'wip',
  },
  {
    name: 'BrainageHUD',
    url: 'https://github.com/brainage04/BrainageHUD',
    description: 'A customizable Minecraft Fabric HUD mod with widgets for position, armor, keystrokes, reach, network stats, and a drag-and-drop editor.',
    technologies: ['Java 21', 'Fabric', 'Cloth Config'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'wip',
    featured: true,
  },
  {
    name: 'HudRendererLib',
    url: 'https://github.com/brainage04/HudRendererLib',
    description: 'A Minecraft Fabric client-side library for rendering HUD elements, extracted from BrainageHUD.',
    technologies: ['Java 21', 'Fabric', 'Cloth Config'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'GetEnchantInfo',
    url: 'https://github.com/brainage04/GetEnchantInfo',
    description: 'A Minecraft Fabric client-side mod that adds commands for enchantment levels, applicable items, conflicts, and modded enchantments.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'SimpleTwitchChat',
    url: 'https://github.com/brainage04/SimpleTwitchChat',
    description: 'A Minecraft Fabric client-side mod that bridges Twitch chat and Minecraft chat, including sending Twitch messages with /tc.',
    technologies: ['Java 21', 'Fabric', 'Twitch4J'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'released',
  },
  {
    name: 'ToggleSprint',
    url: 'https://github.com/brainage04/ToggleSprint',
    description: 'A Minecraft Forge 1.8.9 toggle sprint/sneak and HUD mod intended to be safe to use on Hypixel.',
    technologies: ['Kotlin', 'Java 8', 'Forge', 'MoulConfig'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'wip',
  },
  {
    name: 'IceSkates',
    url: 'https://github.com/brainage04/IceSkates',
    description: 'A Minecraft Fabric mod that adds Ice Skates and Roller Skates for boat-like gliding on ice and regular terrain.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Client Mods',
    area: 'java',
    status: 'wip',
  },
  {
    name: 'FortniteInMinecraft',
    url: 'https://github.com/brainage04/FortniteInMinecraft',
    description: 'A Minecraft mod adding Fortnite mechanics including building, editing, guns, consumables, and related systems.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Mods',
    area: 'java',
    status: 'wip',
  },
  {
    name: 'DevUtils',
    url: 'https://github.com/brainage04/DevUtils',
    description: 'A Minecraft Forge 1.8.9 texture atlas generator supporting the vanilla and Hypixel SkyBlock texture atlases.',
    technologies: ['Java 8', 'Forge'],
    category: 'Minecraft Tools',
    area: 'java',
    status: 'released',
  },
  {
    name: 'TextureAtlasGenerator',
    url: 'https://github.com/brainage04/TextureAtlasGenerator',
    description: 'A Fabric 1.21 port of the texture atlas generator from DevUtils.',
    technologies: ['Java 21', 'Fabric'],
    category: 'Minecraft Tools',
    area: 'java',
    status: 'wip',
  },
  {
    name: 'DatapackTemplate',
    url: 'https://github.com/brainage04/DatapackTemplate',
    description: 'A Minecraft datapack template that refactors namespace/name from the repository name.',
    technologies: ['mcfunction', 'Shell'],
    category: 'Minecraft Datapacks',
    area: 'java',
    status: 'template',
  },
  {
    name: 'BrainageGamerules',
    url: 'https://github.com/brainage04/BrainageGamerules',
    description: 'A Minecraft datapack that automatically applies custom gamerules and scoreboard objectives to new worlds.',
    technologies: ['mcfunction'],
    category: 'Minecraft Datapacks',
    area: 'java',
    status: 'released',
  },
  {
    name: 'BrainageUtilities',
    url: 'https://github.com/brainage04/BrainageUtilities',
    description: 'A Minecraft datapack with utility triggers, including Night Vision.',
    technologies: ['mcfunction'],
    category: 'Minecraft Datapacks',
    area: 'java',
    status: 'released',
  },
  {
    name: 'BrainageKits',
    url: 'https://github.com/brainage04/BrainageKits',
    description: 'A Minecraft datapack containing useful kits used across other mods and datapacks.',
    technologies: ['mcfunction'],
    category: 'Minecraft Datapacks',
    area: 'java',
    status: 'released',
  },
  {
    name: 'SoundFinder',
    url: 'https://github.com/brainage04/SoundFinder',
    description: 'A tool for locating Minecraft sounds stored inside .jar files.',
    technologies: ['Python'],
    category: 'Python Projects',
    area: 'other',
    status: 'released',
  },
  {
    name: 'CopyTabLinks',
    url: 'https://github.com/brainage04/CopyTabLinks',
    description: 'A Chrome Manifest V3 extension that copies selected tab URLs with a configurable separator.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'Web Projects',
    area: 'other',
    status: 'released',
  },
  {
    name: 'XAgeRestrictionFixer',
    url: 'https://github.com/brainage04/XAgeRestrictionFixer',
    description: 'A Chrome Manifest V3 extension that fixes X age-restricted media rendering for already age-verified accounts.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'Web Projects',
    area: 'other',
    status: 'released',
  },
  {
    name: 'BetterRhythiaDownloader',
    url: 'https://github.com/brainage04/BetterRhythiaDownloader',
    description: 'A Chrome Manifest V3 extension that adds direct download buttons to Rhythia map cards.',
    technologies: ['JavaScript', 'Chrome Extension'],
    category: 'Web Projects',
    area: 'other',
    status: 'released',
  },
  {
    name: 'HiBackBot',
    url: 'https://github.com/brainage04/HiBackBot',
    description: 'A Discord bot that renames everyone to "back".',
    technologies: ['JavaScript', 'Discord'],
    category: 'Web Projects',
    area: 'other',
    status: 'released',
  },
  {
    name: 'brainage04.github.io',
    url: 'https://github.com/brainage04/brainage04.github.io',
    description: 'The source code for this website.',
    technologies: ['Astro', 'WebTUI', 'HTML', 'CSS', 'TypeScript'],
    category: 'Web Projects',
    area: 'other',
    status: 'released',
  },
];

export const projectAreas = {
  java: {
    name: 'Java',
    href: '/projects/java/',
    title: 'Java Projects',
    description: 'Minecraft mods, datapacks, templates, and tools. Most are Fabric projects, with some Forge-era tooling.',
    metaDescription: 'Minecraft mods, datapacks, templates, and tools by brainage04.',
    summary: 'Minecraft/modding/datapack entries',
  },
  other: {
    name: 'Other',
    href: '/projects/other/',
    title: 'Other Projects',
    description: 'C#, Python, data visualisation, browser extensions, Discord bots, and web projects.',
    metaDescription: 'C#, Python, browser extension, Discord bot, and web projects by brainage04.',
    summary: 'C#, Python, web, and tooling entries',
  },
} satisfies Record<ProjectArea, ProjectAreaPage>;

export const projectAreaEntries = Object.entries(projectAreas) as [ProjectArea, ProjectAreaPage][];

export const getProjectsByArea = (area: ProjectArea) => projects.filter((project) => project.area === area);

export const getFeaturedProjects = () => projects.filter((project) => project.featured);

export const groupProjects = (items: Project[]) =>
  items.reduce<Record<string, Project[]>>((groups, project) => {
    groups[project.category] ??= [];
    groups[project.category].push(project);
    return groups;
  }, {});
