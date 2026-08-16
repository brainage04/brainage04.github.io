export const githubOwner = 'brainage04';

export const starLists = [
  { slug: 'minecraft-mods', category: 'small-minecraft-mods' },
  { slug: 'discord-bots-plugins', category: 'discord-bots' },
  { slug: 'websites-web-apps', category: 'websites' },
  { slug: 'browser-extensions', category: 'browser-extensions' },
  { slug: 'minecraft-datapacks', category: 'minecraft-datapacks' },
];

export const categoryOverrides = {
  BrainageHUD: 'large-minecraft-mods',
  BrainageMinigames: 'large-minecraft-mods',
  FortniteInMinecraft: 'large-minecraft-mods',
  ProceduralDungeon: 'large-minecraft-mods',
  LegacyMinecraftModTemplate: 'templates-starters',
  ModernMinecraftModTemplate: 'templates-starters',
  BrainageLib: 'minecraft-dev-tools',
  DevUtils: 'minecraft-dev-tools',
  FabricModdingConventions: 'minecraft-dev-tools',
  HudRendererLib: 'minecraft-dev-tools',
};

export const featuredOrder = ['MagicCarpet', 'ProceduralDungeon', 'FortniteInMinecraft'];

export const excludedRepositories = new Set(['brainage04/baritone']);
