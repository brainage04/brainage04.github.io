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

export const modernMinecraftProjects = new Set([
  'AcceleratedDamage',
  'BetterVillagerTrades',
  'BrainageHUD',
  'BrainageLib',
  'BrainageMinigames',
  'BrainageServerUtils',
  'FortniteInMinecraft',
  'GetEnchantInfo',
  'HudRendererLib',
  'MagicCarpet',
  'MilkablePlayers',
  'ProceduralDungeon',
  'SimpleTPA',
  'SimpleTwitchChat',
  'Telekinesis',
  'VeinMiner',
]);

export const descriptionOverrides = {
  GifStudio:
    'Browser-based GIF compositor for selecting a base animation, positioning an image overlay, rendering with FFmpeg WebAssembly, and downloading the result without uploading source files.',
  BakingCookingRecipes:
    'Cookie and brownie calculators with Woolworths cost estimates, substitutions, nutrition, and combined shopping lists.',
  WebTuiAstroTemplate: 'Astro starter template for terminal-inspired websites.',
  AstroShell: 'Shared Astro shell components and base styles for my websites.',
  XEmbedFixer: 'Vencord and Revenge client plugin that rewrites X/Twitter links to supported embed services.',
  ConversationExporter: 'Vencord and Revenge client plugin for exporting selected Discord message ranges as JSON.',
  RevengeVencordPluginTemplate: 'Template for building Vencord and Revenge Discord client plugins.',
  DiscordPluginInstaller: 'CLI and Android tooling for installing Vencord and Revenge Discord plugins.',
  BetterVillagerTrades:
    'Fabric and NeoForge client-side trading helper that rerolls villager offers and adds per-player filters for desired items and enchantments.',
  DatapackTemplate: 'Starter Minecraft datapack template with an init script and reusable project scaffolding.',
  GetEnchantInfo:
    'Fabric and NeoForge client-only Minecraft mod that reports an enchantment maximum level and incompatibilities in game.',
  HudRendererLib: 'Fabric and NeoForge library for rendering configurable HUD elements in Minecraft.',
  ModernMinecraftModTemplate:
    'Fabric mod template with shared, client, and GameTest source sets for modern Minecraft projects.',
  ProceduralDungeon:
    'Fabric and NeoForge Minecraft mod that adds procedurally generated dungeons with varied rooms, traps, and loot.',
};
