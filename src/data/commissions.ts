import type { PriceKind } from '../lib/currency';
import { projectCategories, projectSizes, type Project, type ProjectSize, type ProjectType } from './projects';

export type CommissionRate = {
  name: string;
  /** Price in US dollars; converted client-side for other currencies. */
  usd: number;
  kind: PriceKind;
  examples: string;
  /** How long such a project usually takes, shown as its own line. */
  time?: string;
};

/**
 * In display order: the first rate (Large) is the full-width card on top of the commissions page, the rest are the row
 * of three below it. Narrow screens stack them in this order.
 */
export const commissionRates: CommissionRate[] = [
  {
    name: 'Large mod',
    usd: 800,
    kind: 'from',
    examples:
      'One extremely large or several large features – several large-scale minigames, advanced AI and pathfinding, major reworks of core vanilla functionality, large-scale YouTube/Twitch/Kick streaming integrations, adding complex functionality from other games',
    time: '2–4 weeks or longer',
  },
  {
    name: 'Small mod or datapack',
    usd: 50,
    kind: 'from',
    examples:
      'One medium or several small features – new items, mechanics, commands, gamerules, tweaks to vanilla behaviour',
    time: 'Up to a week, usually 1–2 days',
  },
  {
    name: 'Medium mod or datapack',
    usd: 200,
    kind: 'from',
    examples:
      'One large or several medium features – one large-scale minigame or several smaller ones, system backports, complex rendering, several heads-up display (HUD) elements',
    time: 'Up to 2 weeks, usually 5–10 days',
  },
  {
    name: 'Updates, ports, fixes, changes, support',
    usd: 30,
    kind: 'hourly',
    examples:
      'Updating or porting an existing mod to a different Minecraft version, mod loader or dependency set, fixing bugs, implementing changes, support during a stream or event (1 hour minimum)',
  },
];

export type CommissionExtra = {
  topic: string;
  /** What changes the price, and by how much (a percentage with a real minus sign, or a rate). */
  adjustments: { condition: string; change: string }[];
};

/** Price adjustments shown under the rate cards. */
export const commissionExtras: CommissionExtra[] = [
  {
    topic: 'Mod loaders',
    adjustments: [
      { condition: 'Fabric and NeoForge', change: 'included' },
      { condition: 'One mod loader only', change: '−10%' },
      { condition: 'Each additional mod loader', change: '+15%' },
    ],
  },
  {
    topic: 'Minecraft versions',
    adjustments: [
      { condition: 'Each additional minor version (e.g. 1.21.1 alongside 1.21.4)', change: '+5%' },
      { condition: 'Each additional major version (e.g. 1.20 alongside 1.21)', change: '+20%' },
      { condition: 'Every minor version of one major version (e.g. all of 1.21.x)', change: '+20%' },
    ],
  },
  {
    topic: 'Rush jobs',
    adjustments: [{ condition: 'Delivered in under half the timeline I would normally quote', change: '+25%' }],
  },
];

/** Shown after the extras: the prices above are starting points. */
export const commissionExtrasNote =
  "These are starting points and I'm happy to negotiate. Version prices especially depend on how much the game's code changed between versions, not on the version number: some major updates mostly add content, while some minor ones rework the internals.";

/** A catalogue project (open or closed source); its size is its catalogue category's. */
export type PortfolioEntry = { name: string; type: ProjectType };

const portfolioEntries: PortfolioEntry[] = [
  { name: 'BrainageMinigames', type: 'Mod' },
  { name: 'SparringBots', type: 'Mod' },
  { name: 'ProceduralDungeon', type: 'Mod' },
  { name: 'TwitchPlaysMinecraft', type: 'Mod' },
  { name: 'FortniteInMinecraft', type: 'Mod' },
  { name: 'GenshinInMinecraft', type: 'Mod' },
  { name: 'BrainageHUD', type: 'Mod' },
  { name: 'ToggleSprint', type: 'Mod' },
  { name: 'DebugHudBackport', type: 'Mod' },
  { name: 'TextureAtlasGenerator', type: 'Mod' },
  // Small: content mods first, then the other mods, then the Simple* utilities together.
  { name: 'MagicCarpet', type: 'Mod' },
  { name: 'IceSkates', type: 'Mod' },
  { name: 'AcceleratedDamage', type: 'Mod' },
  { name: 'BetterVillagerTrades', type: 'Mod' },
  { name: 'DimensionStructureVariants', type: 'Mod' },
  { name: 'FloodedEnd', type: 'Mod' },
  { name: 'Telekinesis', type: 'Mod' },
  { name: 'VeinMiner', type: 'Mod' },
  { name: 'SpawnCommands', type: 'Mod' },
  { name: 'SimpleHomes', type: 'Mod' },
  { name: 'SimpleTPA', type: 'Mod' },
  { name: 'SimpleTwitchChat', type: 'Mod' },
];

/** A catalogue project with its size and type. Closed-source projects (no `url`) show no repository link. */
export type PortfolioItem = Project & { size: ProjectSize; type: ProjectType };

/**
 * Resolves the portfolio against the catalogue, ordered Large, Medium, Small and by list order within a size. A
 * project's size is its catalogue category's (set in scripts/project-config.mjs or closedSourceProjects.ts), so the
 * commissions page and /projects/ always agree.
 */
export function commissionPortfolio(catalogue: readonly Project[], entries = portfolioEntries): PortfolioItem[] {
  const items: PortfolioItem[] = entries.map((entry) => {
    const project = catalogue.find((item) => item.name === entry.name);
    if (!project) throw new Error(`Commission portfolio project not found in the catalogue: ${entry.name}`);
    const size = projectCategories[project.category].size;
    if (!size) throw new Error(`Commission portfolio project ${entry.name} is not in a sized mod category`);
    return { ...project, size, type: entry.type };
  });
  return items.sort((left, right) => projectSizes.indexOf(left.size) - projectSizes.indexOf(right.size));
}

/** Small mods featured on the home page after every Large one. */
const featuredSmallProjects = ['MagicCarpet', 'IceSkates'];

/** The home page's featured projects: every Large portfolio project, then the featured Small ones, in portfolio order. */
export function featuredPortfolio(portfolio: readonly PortfolioItem[]): PortfolioItem[] {
  return portfolio.filter(({ name, size }) => size === 'Large' || featuredSmallProjects.includes(name));
}
