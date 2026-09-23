import { generatedProjects } from './projects.generated';

export const projectCategoryOrder = [
  'large-minecraft-mods',
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

export type ProjectCategoryMeta = {
  label: string;
  badge: string;
  mark: string;
  topLevel: TopLevelCategoryId;
};

export const projectCategories = {
  'large-minecraft-mods': {
    label: 'Large Minecraft Mod',
    badge: 'Large Mod',
    mark: '▦',
    topLevel: 'minecraft-mods',
  },
  'small-minecraft-mods': {
    label: 'Small Minecraft Mod',
    badge: 'Small Mod',
    mark: '✦',
    topLevel: 'minecraft-mods',
  },
  'templates-starters': {
    label: 'Templates & Starters',
    badge: 'Template',
    mark: '</>',
    topLevel: 'minecraft-mods',
  },
  'minecraft-dev-tools': {
    label: 'Minecraft Dev Tools & Libraries',
    badge: 'Dev Tool',
    mark: '⌘',
    topLevel: 'minecraft-mods',
  },
  'minecraft-datapacks': {
    label: 'Minecraft Datapacks',
    badge: 'Datapack',
    mark: '{}',
    topLevel: 'minecraft-datapacks',
  },
  'browser-extensions': {
    label: 'Browser Extensions',
    badge: 'Extension',
    mark: '◫',
    topLevel: 'browser-extensions',
  },
  websites: {
    label: 'Websites & Website Templates',
    badge: 'Website',
    mark: '>_',
    topLevel: 'websites',
  },
  'discord-bots': {
    label: 'Discord Bots & Plugins',
    badge: 'Discord',
    mark: '◉',
    topLevel: 'discord-bots',
  },
} satisfies Record<ProjectCategoryId, ProjectCategoryMeta>;

export type ProjectLanguage = {
  name: string;
  percentage: number;
};

export type Project = {
  name: string;
  url: string;
  description: string;
  icon?: string;
  iconPixelated?: boolean;
  languages: ProjectLanguage[];
  category: ProjectCategoryId;
  featured?: number;
};

export const projects = generatedProjects;

const isFeaturedProject = (item: Project): item is Project & { featured: number } => typeof item.featured === 'number';
export const getFeaturedProjects = () =>
  projects.filter(isFeaturedProject).sort((left, right) => left.featured - right.featured);

export const topLevelCategories = [
  { id: 'minecraft-mods', label: 'Minecraft Mods' },
  { id: 'discord-bots', label: 'Discord Bots & Plugins' },
  { id: 'websites', label: 'Websites & Website Templates' },
  { id: 'browser-extensions', label: 'Browser Extensions' },
  { id: 'minecraft-datapacks', label: 'Minecraft Datapacks' },
] as const satisfies ReadonlyArray<{ id: TopLevelCategoryId; label: string }>;

export type ProjectSubgroup = {
  id: string;
  label: string;
  projects: Project[];
};

export type ProjectCategoryGroup = {
  id: TopLevelCategoryId;
  label: string;
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
    { id: 'small-minecraft-mods', label: 'Small Minecraft Mods', categories: ['small-minecraft-mods'] },
    { id: 'templates-starters', label: 'Templates & Starters', categories: ['templates-starters'] },
    {
      id: 'minecraft-dev-tools',
      label: 'Minecraft Dev Tools & Libraries',
      categories: ['minecraft-dev-tools'],
    },
  ],
  'discord-bots': [
    { id: 'discord-templates', label: 'Templates', projectNames: ['RevengeVencordPluginTemplate'] },
    { id: 'discord-bot-projects', label: 'Bots', projectNames: ['HiBackBot'] },
    { id: 'discord-plugins', label: 'Plugins' },
  ],
  websites: [
    { id: 'website-templates', label: 'Templates', projectNames: ['WebTuiAstroTemplate', 'AstroShell'] },
    { id: 'website-projects', label: 'Websites' },
  ],
  'browser-extensions': [
    { id: 'browser-extension-templates', label: 'Templates', projectNames: ['BrowserExtensionTemplate'] },
    { id: 'browser-extension-projects', label: 'Browser Extensions' },
  ],
  'minecraft-datapacks': [
    { id: 'minecraft-datapack-templates', label: 'Templates', projectNames: ['DatapackTemplate'] },
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
