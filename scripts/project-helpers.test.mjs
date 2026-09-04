import { describe, expect, it } from 'vitest';
import {
  collectRepositoryEntries,
  languageBreakdown,
  projectFromRepository,
  sortProjects,
} from './project-helpers.mjs';

describe('project catalogue helpers', () => {
  it('collects unique repositories, preserves the first category, and applies exclusions', () => {
    const entries = collectRepositoryEntries(
      [
        {
          slug: 'first-list',
          category: 'first-category',
          html: [
            '<a href="/brainage04/Alpha">Alpha</a>',
            '<a href="/brainage04/Alpha">Alpha duplicate</a>',
            '<a href="/stars/brainage04">Ignored GitHub route</a>',
            '<a href="/brainage04/baritone">Excluded repository</a>',
          ].join(''),
        },
        {
          slug: 'second-list',
          category: 'second-category',
          html: '<a href="/brainage04/Alpha">Alpha again</a><a href="/other/Beta">Beta</a>',
        },
      ],
      { 'brainage04/baritone': true },
    );

    expect(entries).toEqual([
      { slug: 'first-list', category: 'first-category', fullName: 'brainage04/Alpha' },
      { slug: 'second-list', category: 'second-category', fullName: 'other/Beta' },
    ]);
  });

  it('calculates language percentages and falls back to the primary language', () => {
    expect(languageBreakdown({ TypeScript: 3, CSS: 1 }, 'JavaScript')).toEqual([
      { name: 'TypeScript', percentage: 75 },
      { name: 'CSS', percentage: 25 },
    ]);
    expect(languageBreakdown({}, 'Java')).toEqual([{ name: 'Java', percentage: 100 }]);
    expect(languageBreakdown({}, null)).toEqual([]);
  });

  it('applies category overrides and featured positions to generated projects', () => {
    expect(
      projectFromRepository({
        repository: {
          name: 'BrainageHUD',
          html_url: 'https://github.com/brainage04/BrainageHUD',
          description: null,
          language: 'Java',
        },
        entry: { category: 'small-minecraft-mods' },
        languages: {},
        icon: 'https://example.com/icon.png',
        categoryOverrides: { BrainageHUD: 'large-minecraft-mods' },
        featured: { BrainageHUD: 2 },
      }),
    ).toEqual({
      name: 'BrainageHUD',
      url: 'https://github.com/brainage04/BrainageHUD',
      description: '',
      icon: 'https://example.com/icon.png',
      languages: [{ name: 'Java', percentage: 100 }],
      category: 'large-minecraft-mods',
      featured: 2,
    });
  });

  it('sorts featured projects first and other projects alphabetically', () => {
    const projects = [
      { name: 'Zulu' },
      { name: 'Featured second', featured: 2 },
      { name: 'Alpha' },
      { name: 'Featured first', featured: 1 },
    ];

    sortProjects(projects);

    expect(projects.map(({ name }) => name)).toEqual(['Featured first', 'Featured second', 'Alpha', 'Zulu']);
  });
});
