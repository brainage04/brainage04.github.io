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
    label: 'Large Minecraft Mods',
    badge: 'Large Mod',
    mark: '▦',
    topLevel: 'minecraft-mods',
  },
  'small-minecraft-mods': {
    label: 'Small Minecraft Mods',
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

export type ProjectCategoryGroup = {
  id: TopLevelCategoryId;
  label: string;
  projects: Project[];
  subgroups?: Array<{ id: ProjectCategoryId; label: string; projects: Project[] }>;
};

export const groupProjects = (items: Project[]): ProjectCategoryGroup[] =>
  topLevelCategories.map((category) => {
    const categoryProjects = items.filter((item) => projectCategories[item.category].topLevel === category.id);
    return category.id === 'minecraft-mods'
      ? {
          ...category,
          projects: categoryProjects,
          subgroups: projectCategoryOrder.slice(0, 4).map((id) => ({
            id,
            label: projectCategories[id].label,
            projects: categoryProjects.filter((item) => item.category === id),
          })),
        }
      : { ...category, projects: categoryProjects };
  });
