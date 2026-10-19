import { describe, expect, it } from 'vitest';
import { excludedRepositories } from '../../scripts/project-config.mjs';
import { closedSourceProjects } from './closedSourceProjects';
import {
  applyReviewedSides,
  groupProjects,
  mergeCatalogue,
  projectCategories,
  projects,
  type Project,
  type ProjectCategoryId,
  type TopLevelCategoryId,
} from './projects';
import { generatedProjects } from './projects.generated';
import { projectSides } from './projectSides';

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
  project('MediumMod', 'medium-minecraft-mods'),
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
      ['minecraft-mods', 5],
      ['discord-bots', 3],
      ['websites', 3],
      ['browser-extensions', 2],
      ['minecraft-datapacks', 2],
    ]);
  });

  it('splits subgroups by project category', () => {
    expect(subgroupNames('minecraft-mods')).toEqual({
      'Large Minecraft Mods': ['LargeMod'],
      'Medium Minecraft Mods': ['MediumMod'],
      'Small Minecraft Mods': ['SmallMod'],
      'Templates & Starters': ['ModTemplate'],
      'Minecraft Dev Tools & Libraries': ['ModLibrary'],
    });
  });

  it('assigns named projects first and leaves the rest to the catch-all subgroup', () => {
    expect(subgroupNames('discord-bots')).toEqual({
      'Discord Templates': ['RevengeVencordPluginTemplate'],
      Bots: ['HiBackBot'],
      Plugins: ['SomePlugin'],
    });
    expect(subgroupNames('websites')).toEqual({
      'Website Templates': ['WebTuiAstroTemplate', 'AstroShell'],
      Websites: ['SomeWebsite'],
    });
    expect(subgroupNames('browser-extensions')).toEqual({
      'Extension Templates': ['BrowserExtensionTemplate'],
      'Browser Extensions': ['SomeExtension'],
    });
    expect(subgroupNames('minecraft-datapacks')).toEqual({
      'Datapack Templates': ['DatapackTemplate'],
      Datapacks: ['SomeDatapack'],
    });
  });

  // Each subgroup is a labelled region on /projects/, and screen readers list regions by name.
  it('gives every subgroup a unique label', () => {
    const labels = projectGroups.flatMap((group) => group.subgroups.map(({ label }) => label));
    expect(new Set(labels).size).toBe(labels.length);
  });

  it('places every project in exactly one subgroup', () => {
    const grouped = projectGroups.flatMap((group) => group.subgroups.flatMap((subgroup) => subgroup.projects));

    expect(grouped).toHaveLength(fixture.length);
    expect(new Set(grouped)).toEqual(new Set(fixture));
  });
});

describe('mergeCatalogue', () => {
  it('orders featured projects first, then by name, and refuses a name in both lists', () => {
    const generated = [{ ...project('Zulu', 'websites'), featured: 1 }, project('Bravo', 'websites')];
    const closed = [{ ...project('Alpha', 'websites'), url: undefined }];

    expect(mergeCatalogue(generated, closed).map(({ name }) => name)).toEqual(['Zulu', 'Alpha', 'Bravo']);
    expect(() => mergeCatalogue(generated, [project('Bravo', 'websites')])).toThrow(/Bravo is in both/);
  });
});

describe('applyReviewedSides', () => {
  it('replaces detected sides with reviewed ones, removes them for a null side and keeps unreviewed ones', () => {
    const catalogue = [
      { ...project('Server', 'small-minecraft-mods'), side: 'both' as const },
      { ...project('Template', 'templates-starters'), side: 'both' as const },
      { ...project('Unreviewed', 'small-minecraft-mods'), side: 'client' as const },
    ];
    const sides = {
      Server: { side: 'server' as const, source: 'README' },
      Template: { side: null, source: 'README' },
    };

    expect(applyReviewedSides(catalogue, sides).map(({ name, side }) => [name, side])).toEqual([
      ['Server', 'server'],
      ['Template', undefined],
      ['Unreviewed', 'client'],
    ]);
  });
});

describe('mod sides', () => {
  const sides = Object.fromEntries(projects.map(({ name, side }) => [name, side]));

  // Each of these declares environment "*" in fabric.mod.json, but its README says vanilla clients need nothing.
  it('labels server mods that vanilla clients can join as server-side', () => {
    for (const name of ['SimpleTPA', 'ProceduralDungeon', 'SparringBots']) expect(sides[name], name).toBe('server');
  });

  it('labels mods that add items or entities as server-and-client', () => {
    expect(sides.MagicCarpet).toBe('both');
  });

  // A new mod repository must be reviewed into src/data/projectSides.ts, or at least have a detectable side.
  it('gives every Minecraft mod a reviewed or detected side', () => {
    const mods = [...generatedProjects, ...closedSourceProjects].filter(
      ({ category }) => projectCategories[category].topLevel === 'minecraft-mods',
    );
    for (const mod of mods)
      expect(Object.hasOwn(projectSides, mod.name) || mod.side !== undefined, mod.name).toBe(true);
  });

  it('reviews only projects in the catalogue', () => {
    const names = projects.map(({ name }) => name);
    for (const name of Object.keys(projectSides)) expect(names, name).toContain(name);
  });
});

describe('the site catalogue', () => {
  it('leaves out every intentionally excluded repository', () => {
    const names = new Set([...projects.map(({ name }) => name), ...Object.keys(projectSides)]);
    for (const fullName of Object.keys(excludedRepositories)) {
      expect(names.has(fullName.split('/')[1] ?? ''), fullName).toBe(false);
    }
  });

  it('lists every closed-source project in its category, with no repository link, after the generated ones', () => {
    expect(projects).toHaveLength(generatedProjects.length + closedSourceProjects.length);
    const largeMods = groupProjects(projects)
      .find(({ id }) => id === 'minecraft-mods')
      ?.subgroups.find(({ id }) => id === 'large-minecraft-mods')
      ?.projects.map(({ name }) => name);
    for (const name of ['BrainageMinigames', 'SparringBots', 'TwitchPlaysMinecraft', 'FortniteInMinecraft']) {
      expect(largeMods).toContain(name);
    }
    for (const closed of closedSourceProjects) {
      expect(closed.url).toBeUndefined();
      expect(JSON.stringify(closed.icon)).not.toMatch(/https?:/);
    }
  });

  // Mod loaders are on each card's detail line, so descriptions (the GitHub repository descriptions) must not repeat
  // them. Fix a failure on GitHub with `gh repo edit --description`, then run `npm run update-projects`.
  it('keeps mod loader names out of descriptions, except as a subject', () => {
    const loaderPhrase =
      /\b(?:Fabric|NeoForge|Forge)(?: and (?:Fabric|NeoForge|Forge))?(?: [\d.]+)? (?:Minecraft )?(?:mod|bots?)\b|\((?:Fabric|NeoForge|Forge)\)|\bto (?:Fabric|NeoForge|Forge) \d/u;
    for (const { name, description } of projects) expect(description, name).not.toMatch(loaderPhrase);
    expect('A Fabric and NeoForge Minecraft mod that adds carpets.').toMatch(loaderPhrase);
    expect('A Forge 1.8.9 Minecraft mod that adds sprinting.').toMatch(loaderPhrase);
    expect('Server-side Fabric bots that fight like players.').toMatch(loaderPhrase);
    expect('Backports the debug screen to 1.16.1 (Fabric)').toMatch(loaderPhrase);
    expect('Gradle plugins for shared Fabric and NeoForge build conventions.').not.toMatch(loaderPhrase);
  });
});
