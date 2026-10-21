import type { Project } from './projects';

export const generatedProjects: Project[] = [
  {
    name: 'MagicCarpet',
    url: 'https://github.com/brainage04/MagicCarpet',
    description: 'Adds 3 tiers of craftable, rideable flying carpets.',
    icon: 'https://raw.githubusercontent.com/brainage04/MagicCarpet/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 84.2,
      },
      {
        name: 'Python',
        percentage: 15.8,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
    featured: 1,
  },
  {
    name: 'ProceduralDungeon',
    url: 'https://github.com/brainage04/ProceduralDungeon',
    description:
      'Highly optimised procedural dungeon generator with 20 themes and 5 difficulty/loot tiers across all 3 vanilla dimensions, with custom rooms, locked chests and boss fights.',
    icon: 'https://raw.githubusercontent.com/brainage04/ProceduralDungeon/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 99,
      },
      {
        name: 'Shell',
        percentage: 1,
      },
    ],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'server',
    versions: ['26.2'],
    featured: 2,
  },
  {
    name: 'AcceleratedDamage',
    url: 'https://github.com/brainage04/AcceleratedDamage',
    description:
      'Adds highly configurable accelerated combat and damage mechanics that emulate a server running at up to 10x speed.',
    icon: 'https://raw.githubusercontent.com/brainage04/AcceleratedDamage/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'ActionAssist',
    url: 'https://github.com/brainage04/ActionAssist',
    description:
      'A Minecraft mod that automates repetitive client actions such as using, attacking, sneaking, and hotbar transfers.',
    icon: 'https://raw.githubusercontent.com/brainage04/ActionAssist/main/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 99.6,
      },
      {
        name: 'JavaScript',
        percentage: 0.4,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'client',
    versions: ['1.21.1', '1.21.4', '1.21.5', '1.21.8', '1.21.10', '1.21.11', '26.1.2', '26.2'],
  },
  {
    name: 'AstroShell',
    url: 'https://github.com/brainage04/AstroShell',
    description: 'Shared Astro shell and WebTUI foundation for the sites in this workspace.',
    languages: [
      {
        name: 'Astro',
        percentage: 46,
      },
      {
        name: 'CSS',
        percentage: 32,
      },
      {
        name: 'TypeScript',
        percentage: 14.8,
      },
      {
        name: 'JavaScript',
        percentage: 7.2,
      },
    ],
    category: 'websites',
  },
  {
    name: 'BakingCookingRecipes',
    url: 'https://github.com/brainage04/BakingCookingRecipes',
    description:
      'Astro recipe calculators for scaling batches, comparing substitutions, estimating costs, and combining shopping lists.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 77.7,
      },
      {
        name: 'Astro',
        percentage: 15.4,
      },
      {
        name: 'CSS',
        percentage: 6.3,
      },
      {
        name: 'JavaScript',
        percentage: 0.6,
      },
    ],
    category: 'websites',
  },
  {
    name: 'BetterRhythiaDownloader',
    url: 'https://github.com/brainage04/BetterRhythiaDownloader',
    description: 'Chrome Manifest V3 extension that adds direct download buttons to Rhythia map cards.',
    languages: [
      {
        name: 'JavaScript',
        percentage: 88.8,
      },
      {
        name: 'CSS',
        percentage: 6.9,
      },
      {
        name: 'HTML',
        percentage: 4.3,
      },
    ],
    category: 'browser-extensions',
  },
  {
    name: 'BetterVillagerTrades',
    url: 'https://github.com/brainage04/BetterVillagerTrades',
    description: 'Adds villager trade rerolls, per-player trade filters, and max-level enchantment outputs.',
    icon: 'https://raw.githubusercontent.com/brainage04/BetterVillagerTrades/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'brainage04.github.io',
    url: 'https://github.com/brainage04/brainage04.github.io',
    description: 'My GitHub Pages website.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 51.3,
      },
      {
        name: 'Astro',
        percentage: 26.1,
      },
      {
        name: 'JavaScript',
        percentage: 20.9,
      },
      {
        name: 'HTML',
        percentage: 1.3,
      },
      {
        name: 'CSS',
        percentage: 0.3,
      },
    ],
    category: 'websites',
  },
  {
    name: 'BrainageGamerules',
    url: 'https://github.com/brainage04/BrainageGamerules',
    description:
      'A Minecraft datapack that automatically applies custom gamerules, scoreboard objectives and more to my new worlds.',
    languages: [
      {
        name: 'mcfunction',
        percentage: 100,
      },
    ],
    category: 'minecraft-datapacks',
  },
  {
    name: 'BrainageHUD',
    url: 'https://github.com/brainage04/BrainageHUD',
    description:
      'Highly configurable modern HUD mod that can display position, reach, armour, keystrokes, enchants, status effects and much more!',
    icon: 'https://raw.githubusercontent.com/brainage04/BrainageHUD/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'medium-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'client',
    versions: ['26.2'],
  },
  {
    name: 'BrainageKits',
    url: 'https://github.com/brainage04/BrainageKits',
    description: 'A Minecraft datapack that contains many unique kits I use in some of my other datapacks.',
    languages: [],
    category: 'minecraft-datapacks',
  },
  {
    name: 'BrainageLib',
    url: 'https://github.com/brainage04/BrainageLib',
    description:
      "A Minecraft mod that provides shared command feedback and a combined first-join help message for brainage04's server mods.",
    icon: 'https://raw.githubusercontent.com/brainage04/BrainageLib/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'minecraft-dev-tools',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'BrainageServerUtils',
    url: 'https://github.com/brainage04/BrainageServerUtils',
    description: 'A Minecraft mod that adds configurable utility gamerules and administrative commands.',
    icon: 'https://raw.githubusercontent.com/brainage04/BrainageServerUtils/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'BrainageUtilities',
    url: 'https://github.com/brainage04/BrainageUtilities',
    description: 'A Minecraft datapack that adds some helpful utilities to my worlds',
    languages: [
      {
        name: 'mcfunction',
        percentage: 100,
      },
    ],
    category: 'minecraft-datapacks',
  },
  {
    name: 'BrowserExtensionTemplate',
    url: 'https://github.com/brainage04/BrowserExtensionTemplate',
    description:
      'Reusable Chrome Manifest V3 extension template with linting, formatting, store assets, and release tooling.',
    languages: [
      {
        name: 'JavaScript',
        percentage: 62.3,
      },
      {
        name: 'HTML',
        percentage: 28.4,
      },
      {
        name: 'CSS',
        percentage: 9.3,
      },
    ],
    category: 'browser-extensions',
  },
  {
    name: 'ConversationExporter',
    url: 'https://github.com/brainage04/ConversationExporter',
    description: 'Discord client plugin for selecting a message range and exporting it as raw JSON.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 86.7,
      },
      {
        name: 'JavaScript',
        percentage: 13.3,
      },
    ],
    category: 'discord-bots',
  },
  {
    name: 'CopyTabLinks',
    url: 'https://github.com/brainage04/CopyTabLinks',
    description: 'Chrome Manifest V3 extension that copies selected tab URLs with a configurable separator.',
    languages: [
      {
        name: 'JavaScript',
        percentage: 68.4,
      },
      {
        name: 'HTML',
        percentage: 19.6,
      },
      {
        name: 'CSS',
        percentage: 12,
      },
    ],
    category: 'browser-extensions',
  },
  {
    name: 'DatapackTemplate',
    url: 'https://github.com/brainage04/DatapackTemplate',
    description: 'My Minecraft datapack template.',
    languages: [
      {
        name: 'mcfunction',
        percentage: 83.5,
      },
      {
        name: 'Shell',
        percentage: 16.5,
      },
    ],
    category: 'minecraft-datapacks',
  },
  {
    name: 'DimensionStructureVariants',
    url: 'https://github.com/brainage04/DimensionStructureVariants',
    description: 'Adds cross-dimension variants of vanilla structures, such as End villages and Overworld End cities.',
    icon: 'https://raw.githubusercontent.com/brainage04/DimensionStructureVariants/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'DiscordPluginInstaller',
    url: 'https://github.com/brainage04/DiscordPluginInstaller',
    description: 'CLI for installing, reinstalling, and uninstalling Vencord and Revenge plugins.',
    languages: [
      {
        name: 'JavaScript',
        percentage: 99.1,
      },
      {
        name: 'Shell',
        percentage: 0.9,
      },
    ],
    category: 'discord-bots',
  },
  {
    name: 'FloodedEnd',
    url: 'https://github.com/brainage04/FloodedEnd',
    description: 'Floods the End with water.',
    icon: 'https://raw.githubusercontent.com/brainage04/FloodedEnd/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'GifStudio',
    url: 'https://github.com/brainage04/GifStudio',
    description: 'Browser-based GIF compositor with image overlays and client-side FFmpeg rendering.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 80.9,
      },
      {
        name: 'Astro',
        percentage: 10.2,
      },
      {
        name: 'CSS',
        percentage: 8.1,
      },
      {
        name: 'JavaScript',
        percentage: 0.7,
      },
    ],
    category: 'websites',
  },
  {
    name: 'HiBackBot',
    url: 'https://github.com/brainage04/HiBackBot',
    description: 'Discord bot that renames everyone to "back"',
    languages: [
      {
        name: 'JavaScript',
        percentage: 100,
      },
    ],
    category: 'discord-bots',
  },
  {
    name: 'HudRendererLib',
    url: 'https://github.com/brainage04/HudRendererLib',
    description: 'A Minecraft mod that provides shared rendering code for configurable HUD elements.',
    icon: 'https://raw.githubusercontent.com/brainage04/HudRendererLib/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'minecraft-dev-tools',
    loaders: ['Fabric', 'NeoForge'],
    side: 'client',
    versions: ['26.2'],
  },
  {
    name: 'IceSkates',
    url: 'https://github.com/brainage04/IceSkates',
    description: 'Adds craftable ice skates, roller skates, and ice-themed swords.',
    icon: 'https://raw.githubusercontent.com/brainage04/IceSkates/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'kashiilol.github.io',
    url: 'https://github.com/kashiilol/kashiilol.github.io',
    description: 'Music producer portfolio and commission site for kashii',
    languages: [
      {
        name: 'Astro',
        percentage: 67.5,
      },
      {
        name: 'TypeScript',
        percentage: 26.6,
      },
      {
        name: 'CSS',
        percentage: 4.8,
      },
      {
        name: 'JavaScript',
        percentage: 1.1,
      },
    ],
    category: 'websites',
  },
  {
    name: 'LegacyMinecraftModTemplate',
    url: 'https://github.com/brainage04/LegacyMinecraftModTemplate',
    description:
      'A 1.8.9 Minecraft mod template that sets up Kotlin, Mixin, MoulConfig, and reusable configuration utilities.',
    icon: 'https://raw.githubusercontent.com/brainage04/LegacyMinecraftModTemplate/main/docs/icon/icon.png',
    languages: [
      {
        name: 'Kotlin',
        percentage: 66.1,
      },
      {
        name: 'Java',
        percentage: 21.1,
      },
      {
        name: 'Shell',
        percentage: 12.8,
      },
    ],
    category: 'templates-starters',
    loaders: ['Forge'],
    versions: ['1.8.9'],
  },
  {
    name: 'MinecraftModConventions',
    url: 'https://github.com/brainage04/MinecraftModConventions',
    description:
      'A Minecraft mod that provides client GameTest recording helpers, bundled with Gradle plugins for shared Fabric and NeoForge build conventions.',
    icon: 'https://raw.githubusercontent.com/brainage04/MinecraftModConventions/main/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 95.2,
      },
      {
        name: 'Python',
        percentage: 4.8,
      },
    ],
    category: 'minecraft-dev-tools',
    loaders: ['Fabric'],
    side: 'client',
    versions: ['26.2'],
  },
  {
    name: 'ModernMinecraftModTemplate',
    url: 'https://github.com/brainage04/ModernMinecraftModTemplate',
    description:
      'A Minecraft mod template that sets up split common and client sources, GameTests, and a project init script.',
    icon: 'https://raw.githubusercontent.com/brainage04/ModernMinecraftModTemplate/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Shell',
        percentage: 51.5,
      },
      {
        name: 'Java',
        percentage: 48.5,
      },
    ],
    category: 'templates-starters',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'RevengeVencordPluginTemplate',
    url: 'https://github.com/brainage04/RevengeVencordPluginTemplate',
    description: 'Working Revenge and Vencord plugin template with a shared core.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 54.7,
      },
      {
        name: 'JavaScript',
        percentage: 45.3,
      },
    ],
    category: 'discord-bots',
  },
  {
    name: 'SimpleHomes',
    url: 'https://github.com/brainage04/SimpleHomes',
    description: 'Adds named, persistent homes that players can share with each other.',
    icon: 'https://raw.githubusercontent.com/brainage04/SimpleHomes/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'SimpleTPA',
    url: 'https://github.com/brainage04/SimpleTPA',
    description: 'Adds a player-to-player teleport request system.',
    icon: 'https://raw.githubusercontent.com/brainage04/SimpleTPA/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'SimpleTwitchChat',
    url: 'https://github.com/brainage04/SimpleTwitchChat',
    description: 'Integrates Twitch chat into Minecraft chat.',
    icon: 'https://raw.githubusercontent.com/brainage04/SimpleTwitchChat/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'client',
    versions: ['26.2'],
  },
  {
    name: 'SpawnCommands',
    url: 'https://github.com/brainage04/SpawnCommands',
    description: 'Adds commands for world, personal, and shared spawn points.',
    icon: 'https://raw.githubusercontent.com/brainage04/SpawnCommands/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'Telekinesis',
    url: 'https://github.com/brainage04/Telekinesis',
    description: 'Sends mined block drops and experience directly to the player instead of dropping it on the ground.',
    icon: 'https://raw.githubusercontent.com/brainage04/Telekinesis/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'TextureAtlasGenerator',
    url: 'https://github.com/brainage04/TextureAtlasGenerator',
    description: 'Exports vanilla and Hypixel SkyBlock item texture atlases.',
    icon: 'https://raw.githubusercontent.com/brainage04/TextureAtlasGenerator/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'medium-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'client',
    versions: ['26.2'],
  },
  {
    name: 'ToggleSprint',
    url: 'https://github.com/brainage04/ToggleSprint',
    description:
      'Highly configurable legacy HUD mod that can display position, reach, armour, keystrokes, enchants, status effects and much more! Also adds toggle sprint and sneak.',
    icon: 'https://raw.githubusercontent.com/brainage04/ToggleSprint/main/docs/icon/icon.png',
    languages: [
      {
        name: 'Kotlin',
        percentage: 88.5,
      },
      {
        name: 'Java',
        percentage: 11.5,
      },
    ],
    category: 'medium-minecraft-mods',
    loaders: ['Forge'],
    versions: ['1.8.9'],
  },
  {
    name: 'VeinMiner',
    url: 'https://github.com/brainage04/VeinMiner',
    description:
      'Facilitates mining of connected ore and tree blocks together (accounts for deepslate ore and log variants!)',
    icon: 'https://raw.githubusercontent.com/brainage04/VeinMiner/master/docs/icon/icon.png',
    languages: [
      {
        name: 'Java',
        percentage: 100,
      },
    ],
    category: 'small-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    side: 'both',
    versions: ['26.2'],
  },
  {
    name: 'WebTuiAstroTemplate',
    url: 'https://github.com/brainage04/WebTuiAstroTemplate',
    description: 'Minimal Astro starter with AstroShell and WebTUI for terminal-style GitHub Pages sites.',
    languages: [
      {
        name: 'Astro',
        percentage: 71.2,
      },
      {
        name: 'TypeScript',
        percentage: 19.8,
      },
      {
        name: 'JavaScript',
        percentage: 7.2,
      },
      {
        name: 'CSS',
        percentage: 1.7,
      },
    ],
    category: 'websites',
  },
  {
    name: 'XAgeRestrictionFixer',
    url: 'https://github.com/brainage04/XAgeRestrictionFixer',
    description:
      "Chrome Manifest V3 extension that fixes X's broken age-restricted media rendering for already age-verified accounts.",
    languages: [
      {
        name: 'Java',
        percentage: 53.3,
      },
      {
        name: 'JavaScript',
        percentage: 30.6,
      },
      {
        name: 'Shell',
        percentage: 9.3,
      },
      {
        name: 'HTML',
        percentage: 3.9,
      },
      {
        name: 'CSS',
        percentage: 2.9,
      },
    ],
    category: 'browser-extensions',
  },
  {
    name: 'XEmbedFixer',
    url: 'https://github.com/brainage04/XEmbedFixer',
    description: 'Vencord and Revenge plugin that rewrites X/Twitter links for reliable Discord embeds.',
    languages: [
      {
        name: 'TypeScript',
        percentage: 86,
      },
      {
        name: 'JavaScript',
        percentage: 14,
      },
    ],
    category: 'discord-bots',
  },
];
