export const githubOwner = 'brainage04';

export const starLists = [
  { slug: 'minecraft-mods', category: 'small-minecraft-mods' },
  { slug: 'discord-bots-plugins', category: 'discord-bots' },
  { slug: 'websites-web-apps', category: 'websites' },
  { slug: 'browser-extensions', category: 'browser-extensions' },
  { slug: 'minecraft-datapacks', category: 'minecraft-datapacks' },
];

// Mod sizes are categories (large/medium/small-minecraft-mods), the one source of truth for the size shown on cards,
// the /projects/ sections and the commissions portfolio. Mods in the minecraft-mods list default to small.
export const categoryOverrides = {
  BrainageHUD: 'medium-minecraft-mods',
  ToggleSprint: 'medium-minecraft-mods',
  TextureAtlasGenerator: 'medium-minecraft-mods',
  BrainageMinigames: 'large-minecraft-mods',
  FortniteInMinecraft: 'large-minecraft-mods',
  ProceduralDungeon: 'large-minecraft-mods',
  LegacyMinecraftModTemplate: 'templates-starters',
  ModernMinecraftModTemplate: 'templates-starters',
  BrainageLib: 'minecraft-dev-tools',
  FabricModdingConventions: 'minecraft-dev-tools',
  HudRendererLib: 'minecraft-dev-tools',
};

export const featuredOrder = ['MagicCarpet', 'ProceduralDungeon', 'FortniteInMinecraft'];

/**
 * Repositories intentionally kept off the site, with the reason. The sync skips them when they are starred into a list,
 * and a test (src/data/projects.test.ts) fails if one appears in the catalogue or in closedSourceProjects.ts, so a
 * private mod left out of closedSourceProjects.ts on purpose is listed here rather than forgotten.
 */
export const excludedRepositories = {
  'brainage04/baritone': 'A fork of Baritone, not my own project.',
  'brainage04/ContainerExport': 'A throwaway client-side dev tool.',
  'brainage04/NPCAddons': 'Hypixel SkyBlock automation; kept off by choice.',
};
