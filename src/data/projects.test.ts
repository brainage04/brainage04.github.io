import { describe, expect, it } from 'vitest';
import { groupProjects, projects, type ProjectCategoryGroup, type TopLevelCategoryId } from './projects';

const projectGroups = groupProjects(projects);

const groupById = (id: TopLevelCategoryId): ProjectCategoryGroup => {
  const group = projectGroups.find((candidate) => candidate.id === id);
  if (!group) throw new Error(`Missing project group: ${id}`);
  return group;
};

const subgroupProjectNames = (groupId: TopLevelCategoryId, label: string) => {
  const subgroup = groupById(groupId).subgroups.find((candidate) => candidate.label === label);
  if (!subgroup) throw new Error(`Missing ${label} subgroup in ${groupId}`);
  return subgroup.projects.map((project) => project.name);
};

describe('project subgroups', () => {
  it('uses the requested subgroup structure and named assignments', () => {
    expect(groupById('discord-bots').subgroups.map((subgroup) => subgroup.label)).toEqual([
      'Templates',
      'Bots',
      'Plugins',
    ]);
    expect(subgroupProjectNames('discord-bots', 'Templates')).toEqual(['RevengeVencordPluginTemplate']);
    expect(subgroupProjectNames('discord-bots', 'Bots')).toEqual(['HiBackBot']);
    expect(subgroupProjectNames('discord-bots', 'Plugins')).toEqual(
      expect.arrayContaining(['ConversationExporter', 'DiscordPluginInstaller', 'XEmbedFixer']),
    );

    expect(groupById('websites').subgroups.map((subgroup) => subgroup.label)).toEqual(['Templates', 'Websites']);
    expect(subgroupProjectNames('websites', 'Templates')).toEqual(['AstroShell', 'WebTuiAstroTemplate']);

    expect(groupById('browser-extensions').subgroups.map((subgroup) => subgroup.label)).toEqual([
      'Templates',
      'Browser Extensions',
    ]);
    expect(subgroupProjectNames('browser-extensions', 'Templates')).toEqual(['BrowserExtensionTemplate']);

    expect(groupById('minecraft-datapacks').subgroups.map((subgroup) => subgroup.label)).toEqual([
      'Templates',
      'Datapacks',
    ]);
    expect(subgroupProjectNames('minecraft-datapacks', 'Templates')).toEqual(['DatapackTemplate']);
  });

  it('assigns every project to exactly one subgroup', () => {
    for (const group of projectGroups) {
      const groupedProjects = group.subgroups.flatMap((subgroup) => subgroup.projects);
      expect(new Set(groupedProjects).size, group.label).toBe(group.projects.length);
      expect(groupedProjects.map((project) => project.name).sort(), group.label).toEqual(
        group.projects.map((project) => project.name).sort(),
      );
    }
  });
});
