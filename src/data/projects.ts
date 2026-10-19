import type { ImageMetadata } from 'astro';
import { closedSourceProjects } from './closedSourceProjects';
import { projectSides, type ReviewedSide } from './projectSides';
import { generatedProjects } from './projects.generated';

export const projectCategoryOrder = [
  'large-minecraft-mods',
  'medium-minecraft-mods',
  'small-minecraft-mods',
  'templates-starters',
  'minecraft-dev-tools',
  'minecraft-datapacks',
  'browser-extensions',
  'websites',
  'discord-bots',
] as const;

export type ProjectCategoryId = (typeof projectCategoryOrder)[number];
export type TopLevelCategoryId =
  'minecraft-mods' | 'minecraft-datapacks' | 'browser-extensions' | 'websites' | 'discord-bots';

/** Project sizes and types, in display order. */
export const projectSizes = ['Large', 'Medium', 'Small'] as const;
export const projectTypes = ['Mod', 'Datapack'] as const;

export type ProjectSize = (typeof projectSizes)[number];
export type ProjectType = (typeof projectTypes)[number];

export type ProjectCategoryMeta = {
  label: string;
  mark: string;
  topLevel: TopLevelCategoryId;
  /** The size of every project in the category: the one source of truth for a mod's size on every page. */
  size?: ProjectSize;
};

export const projectCategories: Record<ProjectCategoryId, ProjectCategoryMeta> = {
  'large-minecraft-mods': {
    label: 'Large Minecraft Mod',
    size: 'Large',
    mark: '▦',
    topLevel: 'minecraft-mods',
  },
  'medium-minecraft-mods': {
    label: 'Medium Minecraft Mod',
    size: 'Medium',
    mark: '◈',
    topLevel: 'minecraft-mods',
  },
  'small-minecraft-mods': {
    label: 'Small Minecraft Mod',
    size: 'Small',
    mark: '✦',
    topLevel: 'minecraft-mods',
  },
  'templates-starters': {
    label: 'Templates & Starters',
    mark: '</>',
    topLevel: 'minecraft-mods',
  },
  'minecraft-dev-tools': {
    label: 'Minecraft Dev Tools & Libraries',
    mark: '⌘',
    topLevel: 'minecraft-mods',
  },
  'minecraft-datapacks': {
    label: 'Minecraft Datapacks',
    mark: '{}',
    topLevel: 'minecraft-datapacks',
  },
  'browser-extensions': {
    label: 'Browser Extensions',
    mark: '◫',
    topLevel: 'browser-extensions',
  },
  websites: {
    label: 'Websites & Website Templates',
    mark: '>_',
    topLevel: 'websites',
  },
  'discord-bots': {
    label: 'Discord Bots & Plugins',
    mark: '◉',
    topLevel: 'discord-bots',
  },
};

export type ProjectLanguage = {
  name: string;
  percentage: number;
};

/** Mod loaders in display order. */
export const modLoaders = ['Fabric', 'NeoForge', 'Forge'] as const;
export type ModLoader = (typeof modLoaders)[number];

/**
 * Where a mod must be installed: client only, server only, or both. Reviewed sides (src/data/projectSides.ts) win over
 * the side detected from metadata files (detectModSide in scripts/project-helpers.mjs).
 */
export type ModSide = 'client' | 'server' | 'both';

export type Project = {
  name: string;
  /** The public GitHub repository. Closed-source projects have none, and their cards show no link. */
  url?: string;
  description: string;
  /** A remote URL from the generated catalogue, or a bundled image for closed-source projects. */
  icon?: string | ImageMetadata;
  iconPixelated?: boolean;
  languages: ProjectLanguage[];
  category: ProjectCategoryId;
  loaders?: ModLoader[];
  side?: ModSide;
  /** The Minecraft versions the mod targets, oldest first (detectMinecraftVersions in scripts/project-helpers.mjs). */
  versions?: string[];
  /** Sorts the project ahead of the rest of the catalogue (from `featuredOrder` in scripts/project-config.mjs). */
  featured?: number;
};

/**
 * Adds hand-written entries to the generated catalogue, ordered like the generator orders it (featured first, then by
 * name). The sync workflow only rewrites projects.generated.ts, so these entries survive every sync. A name in both
 * fails the build, e.g. when a closed-source repository is made public and starred into a list: remove its entry then.
 */
export function mergeCatalogue(generated: readonly Project[], extra: readonly Project[]): Project[] {
  const names = new Set(generated.map(({ name }) => name));
  for (const { name } of extra) {
    if (names.has(name)) throw new Error(`${name} is in both the generated catalogue and the closed-source entries`);
  }
  return [...generated, ...extra].sort((left, right) => {
    const order = (left.featured ?? Infinity) - (right.featured ?? Infinity);
    return order || left.name.localeCompare(right.name);
  });
}

/** Replaces each project's detected side with its reviewed one, when it has one (a null side removes it). */
export function applyReviewedSides(catalogue: readonly Project[], sides: Record<string, ReviewedSide>): Project[] {
  return catalogue.map((project) => {
    const reviewed = sides[project.name];
    return reviewed ? { ...project, side: reviewed.side ?? undefined } : project;
  });
}

export const projects = applyReviewedSides(mergeCatalogue(generatedProjects, closedSourceProjects), projectSides);

export const topLevelCategories = [
  {
    id: 'minecraft-mods',
    label: 'Minecraft Mods',
    description: 'Fabric and NeoForge mods, mod libraries, and modding templates.',
  },
  { id: 'discord-bots', label: 'Discord Bots & Plugins', description: 'Discord bots and client plugins.' },
  {
    id: 'websites',
    label: 'Websites & Website Templates',
    description: 'Websites, browser-based apps, and web templates.',
  },
  {
    id: 'browser-extensions',
    label: 'Browser Extensions',
    description: 'Browser extensions and extension templates.',
  },
  {
    id: 'minecraft-datapacks',
    label: 'Minecraft Datapacks',
    description: 'Minecraft datapacks and datapack templates.',
  },
] as const satisfies ReadonlyArray<{ id: TopLevelCategoryId; label: string; description: string }>;

export type ProjectSubgroup = {
  id: string;
  label: string;
  projects: Project[];
};

export type ProjectCategoryGroup = {
  id: TopLevelCategoryId;
  label: string;
  description: string;
  projects: Project[];
  subgroups: ProjectSubgroup[];
};

type ProjectSubgroupRule = {
  id: string;
  label: string;
  categories?: readonly ProjectCategoryId[];
  projectNames?: readonly string[];
};

const projectSubgroupRules: Record<TopLevelCategoryId, readonly ProjectSubgroupRule[]> = {
  'minecraft-mods': [
    { id: 'large-minecraft-mods', label: 'Large Minecraft Mods', categories: ['large-minecraft-mods'] },
    { id: 'medium-minecraft-mods', label: 'Medium Minecraft Mods', categories: ['medium-minecraft-mods'] },
    { id: 'small-minecraft-mods', label: 'Small Minecraft Mods', categories: ['small-minecraft-mods'] },
    { id: 'templates-starters', label: 'Templates & Starters', categories: ['templates-starters'] },
    {
      id: 'minecraft-dev-tools',
      label: 'Minecraft Dev Tools & Libraries',
      categories: ['minecraft-dev-tools'],
    },
  ],
  'discord-bots': [
    { id: 'discord-templates', label: 'Discord Templates', projectNames: ['RevengeVencordPluginTemplate'] },
    { id: 'discord-bot-projects', label: 'Bots', projectNames: ['HiBackBot'] },
    { id: 'discord-plugins', label: 'Plugins' },
  ],
  websites: [
    { id: 'website-templates', label: 'Website Templates', projectNames: ['WebTuiAstroTemplate', 'AstroShell'] },
    { id: 'website-projects', label: 'Websites' },
  ],
  'browser-extensions': [
    { id: 'browser-extension-templates', label: 'Extension Templates', projectNames: ['BrowserExtensionTemplate'] },
    { id: 'browser-extension-projects', label: 'Browser Extensions' },
  ],
  'minecraft-datapacks': [
    { id: 'minecraft-datapack-templates', label: 'Datapack Templates', projectNames: ['DatapackTemplate'] },
    { id: 'minecraft-datapack-projects', label: 'Datapacks' },
  ],
};

const partitionProjects = (items: Project[], rules: readonly ProjectSubgroupRule[]): ProjectSubgroup[] => {
  const assignedProjects = new Set<Project>();

  return rules.map(({ id, label, categories, projectNames }) => {
    const subgroupProjects = items.filter((project) => {
      if (assignedProjects.has(project)) return false;
      const matches = categories
        ? categories.includes(project.category)
        : projectNames
          ? projectNames.includes(project.name)
          : true;
      if (matches) assignedProjects.add(project);
      return matches;
    });

    return { id, label, projects: subgroupProjects };
  });
};

export const groupProjects = (items: Project[]): ProjectCategoryGroup[] =>
  topLevelCategories.map((category) => {
    const categoryProjects = items.filter((item) => projectCategories[item.category].topLevel === category.id);
    return {
      ...category,
      projects: categoryProjects,
      subgroups: partitionProjects(categoryProjects, projectSubgroupRules[category.id]),
    };
  });
