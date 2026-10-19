import { describe, expect, it } from 'vitest';
import { closedSourceProjects } from './closedSourceProjects';
import {
  commissionExtras,
  commissionExtrasNote,
  commissionPortfolio,
  commissionRates,
  featuredPortfolio,
} from './commissions';
import { groupProjects, projects, type Project } from './projects';

const closedNames = closedSourceProjects.map(({ name }) => name);

describe('commissionPortfolio', () => {
  const portfolio = commissionPortfolio(projects);

  it('places every entry once, ordered Large, Medium, Small with the Simple* mods at the end of Small', () => {
    expect(portfolio.map(({ name, size, type, url }) => `${name}:${size}:${type}:${url ? 'Open' : 'Closed'}`)).toEqual([
      'BrainageMinigames:Large:Mod:Closed',
      'SparringBots:Large:Mod:Closed',
      'ProceduralDungeon:Large:Mod:Open',
      'TwitchPlaysMinecraft:Large:Mod:Closed',
      'FortniteInMinecraft:Large:Mod:Closed',
      'GenshinInMinecraft:Large:Mod:Closed',
      'BrainageHUD:Medium:Mod:Open',
      'ToggleSprint:Medium:Mod:Open',
      'DebugHudBackport:Medium:Mod:Closed',
      'TextureAtlasGenerator:Medium:Mod:Open',
      'MagicCarpet:Small:Mod:Open',
      'IceSkates:Small:Mod:Open',
      'AcceleratedDamage:Small:Mod:Open',
      'BetterVillagerTrades:Small:Mod:Open',
      'DimensionStructureVariants:Small:Mod:Open',
      'FloodedEnd:Small:Mod:Open',
      'Telekinesis:Small:Mod:Open',
      'VeinMiner:Small:Mod:Open',
      'SpawnCommands:Small:Mod:Open',
      'SimpleHomes:Small:Mod:Open',
      'SimpleTPA:Small:Mod:Open',
      'SimpleTwitchChat:Small:Mod:Open',
    ]);
    expect(new Set(portfolio.map(({ name }) => name)).size).toBe(portfolio.length);
  });

  it('gives closed-source entries no repository link, no languages and a bundled, not remote, icon', () => {
    const closed = portfolio.filter(({ name }) => closedNames.includes(name));

    expect(closed).toHaveLength(6);
    for (const item of closed) {
      expect(item.url).toBeUndefined();
      expect(item.languages).toEqual([]);
      expect(item.icon).toBeDefined();
      expect(JSON.stringify(item.icon)).not.toMatch(/https?:/);
    }
  });

  it('keeps open-source entries linked to their catalogue repository', () => {
    for (const item of portfolio.filter(({ name }) => !closedNames.includes(name))) {
      expect(item.url).toBe(`https://github.com/brainage04/${item.name}`);
    }
  });

  it('gives every portfolio mod at least one loader', () => {
    for (const item of portfolio) expect(item.loaders?.length, item.name).toBeGreaterThan(0);
  });

  it('fails loudly for missing projects and projects outside a sized mod category', () => {
    const tool: Project = {
      name: 'Tool',
      url: 'https://github.com/brainage04/Tool',
      description: '',
      languages: [],
      category: 'minecraft-dev-tools',
    };

    expect(() => commissionPortfolio([], [{ name: 'Missing', type: 'Mod' }])).toThrow(/not found/);
    expect(() => commissionPortfolio([tool], [{ name: 'Tool', type: 'Mod' }])).toThrow(/not in a sized/);
    expect(
      commissionPortfolio([{ ...tool, category: 'medium-minecraft-mods' }], [{ name: 'Tool', type: 'Mod' }])[0]?.size,
    ).toBe('Medium');
  });

  // Both pages take a mod's size from its category, so a portfolio project is in the matching /projects/ section.
  it('agrees with the /projects/ size sections', () => {
    const sections = groupProjects(projects).find(({ id }) => id === 'minecraft-mods')?.subgroups ?? [];
    for (const { name, size } of portfolio) {
      const section = sections.find((subgroup) => subgroup.projects.some((project) => project.name === name));
      expect(section?.label, name).toBe(`${size} Minecraft Mods`);
    }
  });
});

describe('featuredPortfolio', () => {
  it('features every Large project, then MagicCarpet and IceSkates', () => {
    expect(featuredPortfolio(commissionPortfolio(projects)).map(({ name }) => name)).toEqual([
      'BrainageMinigames',
      'SparringBots',
      'ProceduralDungeon',
      'TwitchPlaysMinecraft',
      'FortniteInMinecraft',
      'GenshinInMinecraft',
      'MagicCarpet',
      'IceSkates',
    ]);
  });
});

describe('commissionRates', () => {
  // Large is the full-width card on top; the other three are the row below it, and narrow screens stack them in order.
  it('lists the approved cards in order, Large first, in USD', () => {
    expect(commissionRates.map(({ name, usd, kind }) => `${name}: ${usd} ${kind}`)).toEqual([
      'Large mod: 800 from',
      'Small mod or datapack: 50 from',
      'Medium mod or datapack: 200 from',
      'Updates, ports, fixes, changes, support: 30 hourly',
    ]);
    expect(commissionRates.map(({ time }) => time)).toEqual([
      '2–4 weeks or longer',
      'Up to a week, usually 1–2 days',
      'Up to 2 weeks, usually 5–10 days',
      undefined,
    ]);
    // Spaced en dashes, not hyphens.
    for (const { examples } of commissionRates.slice(0, 3)) expect(examples).toMatch(/^One [^–]+ features – /);
    expect(commissionRates[3]?.examples).toMatch(/support during a stream or event \(1 hour minimum\)$/);
    expect(
      commissionExtras.map(({ topic, adjustments }) => [
        topic,
        adjustments.map(({ condition, change }) => `${condition}: ${change}`),
      ]),
    ).toEqual([
      [
        'Mod loaders',
        ['Fabric and NeoForge: included', 'One mod loader only: −10%', 'Each additional mod loader: +15%'],
      ],
      [
        'Minecraft versions',
        [
          'Each additional minor version (e.g. 1.21.1 alongside 1.21.4): +5%',
          'Each additional major version (e.g. 1.20 alongside 1.21): +20%',
          'Every minor version of one major version (e.g. all of 1.21.x): +20%',
        ],
      ],
      ['Rush jobs', ['Delivered in under half the timeline I would normally quote: +25%']],
    ]);
    // A real minus sign (U+2212), not a hyphen.
    expect(commissionExtras[0]?.adjustments[1]?.change.codePointAt(0)).toBe(0x2212);
    expect(commissionExtrasNote).toMatch(/happy to negotiate/);
  });
});
