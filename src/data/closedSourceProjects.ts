import brainageMinigamesIcon from '../assets/projects/brainageminigames.png';
import debugHudBackportIcon from '../assets/projects/debughudbackport.png';
import fortniteInMinecraftIcon from '../assets/projects/fortniteinminecraft.png';
import genshinInMinecraftIcon from '../assets/projects/genshininminecraft.png';
import sparringBotsIcon from '../assets/projects/sparringbots.png';
import twitchPlaysMinecraftIcon from '../assets/projects/twitchplaysminecraft.png';
import type { Project } from './projects';

/**
 * Projects whose repositories are private, shown on /projects/, the home page and the commissions page. The sync
 * workflow cannot read private repositories, so these are written by hand and merged into the generated catalogue:
 * - `description` is the repository's GitHub description, word for word; change both together.
 * - `loaders` and `versions` come from the files in the repository, by the rules the generator applies to public
 *   repositories (detectModLoaders and detectMinecraftVersions in scripts/project-helpers.mjs): the mod metadata files
 *   (fabric.mod.json, META-INF/neoforge.mods.toml, META-INF/mods.toml or mcmod.info) and the build files
 *   (gradle.properties `minecraft_version`). Their sides are reviewed in src/data/projectSides.ts.
 * - The icon is bundled from src/assets/projects, since a private repository's raw URL 404s for visitors.
 * No `url`: the cards show no repository link.
 */
export const closedSourceProjects: Project[] = [
  {
    name: 'BrainageMinigames',
    description: 'Highly configurable minigames and duels such as UHC, Capture the Wool, Bed Wars, SkyWars and more!',
    icon: brainageMinigamesIcon,
    iconPixelated: true,
    languages: [],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['26.2'],
  },
  {
    name: 'SparringBots',
    description:
      "Highly intelligent PvP bots that play like competent players, using heuristics plus imitation learning from real players' matches.",
    icon: sparringBotsIcon,
    languages: [],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['26.2'],
  },
  {
    name: 'TwitchPlaysMinecraft',
    description:
      'Highly configurable mod that facilitates control of the player via Twitch chat commands, with the end goal of beating Minecraft.',
    icon: twitchPlaysMinecraftIcon,
    languages: [],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['26.2'],
  },
  {
    name: 'FortniteInMinecraft',
    description:
      'Adds core Fortnite mechanics such as building, editing, weapons, resources, movement and combat to Minecraft.',
    icon: fortniteInMinecraftIcon,
    languages: [],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['26.2'],
  },
  {
    name: 'GenshinInMinecraft',
    description: "Recreation of the Genshin Impact game in Minecraft built on top of WanggMC's Blocky Teyvat map.",
    icon: genshinInMinecraftIcon,
    languages: [],
    category: 'large-minecraft-mods',
    loaders: ['Fabric', 'NeoForge'],
    versions: ['26.2'],
  },
  {
    name: 'DebugHudBackport',
    description: "Backports Minecraft's 26.4 debug screen to 1.16.1.",
    icon: debugHudBackportIcon,
    languages: [],
    category: 'medium-minecraft-mods',
    loaders: ['Fabric'],
    versions: ['1.16.1'],
  },
];
