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
  | 'personal'
  | 'mobile-apps';

export type ProjectCategoryMeta = { label: string; badge: string; topLevel: TopLevelCategoryId };

export const projectCategories = {
  'large-minecraft-mods': { label: 'Large Minecraft Mods', badge: 'Large Mod', topLevel: 'minecraft-mods' },
  'small-minecraft-mods': { label: 'Small Minecraft Mods', badge: 'Small Mod', topLevel: 'minecraft-mods' },
  'templates-starters': { label: 'Templates & Starters', badge: 'Template', topLevel: 'minecraft-mods' },
  'minecraft-dev-tools': { label: 'Minecraft Dev Tools & Libraries', badge: 'Dev Tool', topLevel: 'minecraft-mods' },
  'minecraft-datapacks': { label: 'Minecraft Datapacks', badge: 'Datapack', topLevel: 'minecraft-datapacks' },
  'browser-extensions': { label: 'Browser Extensions', badge: 'Extension', topLevel: 'browser-extensions' },
  websites: { label: 'Websites & Web Apps', badge: 'Website', topLevel: 'websites' },
  'discord-bots': { label: 'Discord Bots & Plugins', badge: 'Discord', topLevel: 'discord-bots' },
  'scripts-developer-tools': { label: 'Scripts & Developer Tools', badge: 'Dev Tool', topLevel: 'scripts-developer-tools' },
  personal: { label: 'Personal', badge: 'Personal', topLevel: 'personal' },
} satisfies Record<ProjectCategoryId, ProjectCategoryMeta>;

export type Project = { name: string; url: string; description: string; technologies: string[]; category: ProjectCategoryId; featured?: number };

const project = (name: string, description: string | null, language: string | null, category: ProjectCategoryId, featured?: number, url = `https://github.com/brainage04/${name}`): Project => ({
  name,
  url,
  description: description ?? 'No repository description provided.',
  technologies: language ? [language] : [],
  category,
  ...(featured === undefined ? {} : { featured }),
});

// Reconciled against https://github.com/brainage04?tab=stars on 2026-07-26.
export const projects: Project[] = [
  project('BrainageHUD', 'A Minecraft Fabric client-side mod that adds useful HUD elements to Minecraft.', 'Java', 'large-minecraft-mods'),
  project('BrainageMinigames', null, 'Java', 'large-minecraft-mods'),
  project('FortniteInMinecraft', 'Adds Fortnite mechanics and items to Minecraft.', 'Java', 'large-minecraft-mods', 3),
  project('ProceduralDungeon', 'Adds a procedurally generated dungeon to Minecraft with many different themes and loot/difficulty tiers.', 'Java', 'large-minecraft-mods', 2),
  project('AcceleratedDamage', 'A server-side Fabric mod for configurable accelerated combat and damage.', 'Java', 'small-minecraft-mods'),
  project('BrainageServerUtils', null, 'Java', 'small-minecraft-mods'),
  project('GetEnchantInfo', 'A Minecraft Fabric client-side mod that adds commands that provide helpful information related to enchantments.', 'Java', 'small-minecraft-mods'),
  project('MagicCarpet', 'A Minecraft Fabric mod that adds 3 tiers of Magic Carpets.', 'Java', 'small-minecraft-mods', 1),
  project('MaxVillagerTrades', 'A Minecraft Fabric server-side mod that guarantees max-level books from Librarian trades.', 'Java', 'small-minecraft-mods'),
  project('MilkablePlayers', 'A Minecraft Fabric server-side mod that lets you milk players.', 'Java', 'small-minecraft-mods'),
  project('SimpleTPA', 'A Minecraft Fabric server-side mod that adds a "teleport ask" system.', 'Java', 'small-minecraft-mods'),
  project('SimpleTwitchChat', 'A Minecraft Fabric client-side mod that integrates Twitch chat with Minecraft chat.', 'Java', 'small-minecraft-mods'),
  project('Telekinesis', null, 'Java', 'small-minecraft-mods'),
  project('ToggleSprint', 'A simple toggle sprint/sneak mod that is allowed on Hypixel. Made with MoulConfig. Forge 1.8.9 only.', 'Kotlin', 'small-minecraft-mods'),
  project('VeinMiner', 'A Minecraft Fabric server-side mod that adds vein mining.', 'Java', 'small-minecraft-mods'),
  project('LegacyMinecraftModTemplate', 'A maintained Forge 1.8.9 mod template with Kotlin, Mixin, MoulConfig, and modern Gradle tooling.', 'Kotlin', 'templates-starters'),
  project('ModernMinecraftModTemplate', 'A template for modern Minecraft Fabric mods with automated tests, releases, and project initialization.', 'Shell', 'templates-starters'),
  project('baritone', 'google maps for block game', 'Java', 'minecraft-dev-tools', undefined, 'https://github.com/cabaletta/baritone'),
  project('BrainageLib', "Shared server-side Fabric utilities for brainage04's Minecraft mods", 'Java', 'minecraft-dev-tools'),
  project('DevUtils', 'A Minecraft Forge 1.8.9 mod that can generate pre-rendered texture atlases (and more!)', 'Java', 'minecraft-dev-tools'),
  project('FabricModdingConventions', 'Reusable Fabric client GameTest recording helpers for Minecraft mods.', 'Java', 'minecraft-dev-tools'),
  project('HudRendererLib', 'A Minecraft Fabric client-side library for rendering HUD elements.', 'Java', 'minecraft-dev-tools'),
  project('DatapackTemplate', 'My Minecraft datapack template.', 'mcfunction', 'minecraft-datapacks'),
  project('BrainageGamerules', 'A Minecraft datapack that automatically applies custom gamerules, scoreboard objectives and more to my new worlds.', 'mcfunction', 'minecraft-datapacks'),
  project('BrainageKits', 'A Minecraft datapack that contains many unique kits I use in some of my other datapacks.', null, 'minecraft-datapacks'),
  project('BrainageUtilities', 'A Minecraft datapack that adds some helpful utilities to my worlds', 'mcfunction', 'minecraft-datapacks'),
  project('BetterRhythiaDownloader', 'Chrome Manifest V3 extension that adds direct download buttons to Rhythia map cards.', 'JavaScript', 'browser-extensions'),
  project('BrowserExtensionTemplate', 'Reusable Chrome Manifest V3 extension template with linting, formatting, store assets, and release tooling.', 'JavaScript', 'browser-extensions'),
  project('CopyTabLinks', 'Chrome Manifest V3 extension that copies selected tab URLs with a configurable separator.', 'JavaScript', 'browser-extensions'),
  project('XAgeRestrictionFixer', "Chrome Manifest V3 extension that fixes X's broken age-restricted media rendering for already age-verified accounts.", 'JavaScript', 'browser-extensions'),
  project('BakingCookingRecipes', null, 'TypeScript', 'websites'),
  project('brainage04.github.io', 'My GitHub Pages website.', 'Astro', 'websites', 6),
  project('WebTuiAstroTemplate', null, 'Astro', 'websites'),
  project('brainage04-astro-shell', null, 'Astro', 'websites'),
  project('kashii-music.github.io', 'Music producer portfolio and commission site for kashii', 'Astro', 'websites'),
  project('ConversationExporter', null, 'TypeScript', 'discord-bots'),
  project('DiscordPluginInstaller', null, 'JavaScript', 'discord-bots'),
  project('HiBackBot', 'Discord bot that renames everyone to "back"', 'JavaScript', 'discord-bots'),
  project('PresenceWatcher', null, 'TypeScript', 'discord-bots'),
  project('RevengeVencordPluginTemplate', null, 'TypeScript', 'discord-bots'),
  project('XEmbedFixer', null, 'TypeScript', 'discord-bots'),
  project('instagram-unlike-helper', 'Fail-closed browser-console helper for cautiously unliking Instagram posts', 'JavaScript', 'scripts-developer-tools'),
  project('brainage04', null, null, 'personal'),
];

const isFeaturedProject = (item: Project): item is Project & { featured: number } => typeof item.featured === 'number';
export const getFeaturedProjects = () => projects.filter(isFeaturedProject).sort((left, right) => left.featured - right.featured);

export const topLevelCategories = [
  { id: 'minecraft-mods', label: 'Minecraft Mods' },
  { id: 'discord-bots', label: 'Discord Bots & Plugins' },
  { id: 'websites', label: 'Websites & Web Apps' },
  { id: 'browser-extensions', label: 'Browser Extensions' },
  { id: 'minecraft-datapacks', label: 'Minecraft Datapacks' },
  { id: 'personal', label: 'Personal' },
  { id: 'scripts-developer-tools', label: 'Scripts & Developer Tools' },
  { id: 'mobile-apps', label: 'Mobile Apps' },
] as const satisfies ReadonlyArray<{ id: TopLevelCategoryId; label: string }>;

export type ProjectCategoryGroup = { id: TopLevelCategoryId; label: string; projects: Project[]; subgroups?: Array<{ id: ProjectCategoryId; label: string; projects: Project[] }> };
export const groupProjects = (items: Project[]): ProjectCategoryGroup[] => topLevelCategories.map((category) => {
  const categoryProjects = items.filter((item) => projectCategories[item.category].topLevel === category.id);
  return category.id === 'minecraft-mods'
    ? { ...category, projects: categoryProjects, subgroups: projectCategoryOrder.slice(0, 4).map((id) => ({ id, label: projectCategories[id].label, projects: categoryProjects.filter((item) => item.category === id) })) }
    : { ...category, projects: categoryProjects };
});
