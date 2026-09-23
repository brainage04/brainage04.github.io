import { describe, expect, it } from 'vitest';
import { groupProjects, type Project, type ProjectCategoryId, type TopLevelCategoryId } from './projects';

const project = (name: string, category: ProjectCategoryId): Project => ({
  name,
  url: `https://github.com/brainage04/${name}`,
  description: '',
  languages: [],
  category,
});

const fixture: Project[] = [
  project('SmallMod', 'small-minecraft-mods'),
  project('LargeMod', 'large-minecraft-mods'),
  project('ModTemplate', 'templates-starters'),
  project('ModLibrary', 'minecraft-dev-tools'),
  project('SomePlugin', 'discord-bots'),
  project('HiBackBot', 'discord-bots'),
  project('RevengeVencordPluginTemplate', 'discord-bots'),
  project('SomeWebsite', 'websites'),
  project('WebTuiAstroTemplate', 'websites'),
  project('AstroShell', 'websites'),
  project('SomeExtension', 'browser-extensions'),
  project('BrowserExtensionTemplate', 'browser-extensions'),
  project('DatapackTemplate', 'minecraft-datapacks'),
  project('SomeDatapack', 'minecraft-datapacks'),
];

const projectGroups = groupProjects(fixture);

const subgroupNames = (id: TopLevelCategoryId) => {
  const group = projectGroups.find((candidate) => candidate.id === id);
  if (!group) throw new Error(`Missing project group: ${id}`);
  return Object.fromEntries(
    group.subgroups.map((subgroup) => [subgroup.label, subgroup.projects.map((item) => item.name)]),
  );
};

describe('groupProjects', () => {
  it('routes projects to their top-level category', () => {
    expect(projectGroups.map((group) => [group.id, group.projects.length])).toEqual([
      ['minecraft-mods', 4],
      ['discord-bots', 3],
      ['websites', 3],
      ['browser-extensions', 2],
      ['minecraft-datapacks', 2],
    ]);
  });

  it('splits subgroups by project category', () => {
    expect(subgroupNames('minecraft-mods')).toEqual({
      'Large Minecraft Mods': ['LargeMod'],
      'Small Minecraft Mods': ['SmallMod'],
      'Templates & Starters': ['ModTemplate'],
      'Minecraft Dev Tools & Libraries': ['ModLibrary'],
    });
  });

  it('assigns named projects first and leaves the rest to the catch-all subgroup', () => {
    expect(subgroupNames('discord-bots')).toEqual({
      Templates: ['RevengeVencordPluginTemplate'],
      Bots: ['HiBackBot'],
      Plugins: ['SomePlugin'],
    });
    expect(subgroupNames('websites')).toEqual({
      Templates: ['WebTuiAstroTemplate', 'AstroShell'],
      Websites: ['SomeWebsite'],
    });
    expect(subgroupNames('browser-extensions')).toEqual({
      Templates: ['BrowserExtensionTemplate'],
      'Browser Extensions': ['SomeExtension'],
    });
    expect(subgroupNames('minecraft-datapacks')).toEqual({
      Templates: ['DatapackTemplate'],
      Datapacks: ['SomeDatapack'],
    });
  });

  it('places every project in exactly one subgroup', () => {
    const grouped = projectGroups.flatMap((group) => group.subgroups.flatMap((subgroup) => subgroup.projects));

    expect(grouped).toHaveLength(fixture.length);
    expect(new Set(grouped)).toEqual(new Set(fixture));
  });
});
