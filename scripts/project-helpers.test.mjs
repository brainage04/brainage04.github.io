import { describe, expect, it } from 'vitest';
import {
  collectRepositoryEntries,
  compareMinecraftVersions,
  detectMinecraftVersions,
  detectModLoaders,
  detectModSide,
  isCataloguedRepository,
  languageBreakdown,
  metadataSide,
  nextPagePath,
  pngWidth,
  projectFromRepository,
  selectIconPath,
  sideMetadataPaths,
  sortProjects,
  versionMetadataPaths,
} from './project-helpers.mjs';

// Trimmed from the markup of https://github.com/stars/<owner>/lists/<slug>.
const listEntry = (fullName) => `
  <div class="col-12 d-block width-full tmp-py-4 border-bottom color-border-muted">
    <div class="d-inline-block mb-1">
      <h2 class="h3">
        <a href="/${fullName}">
          <span class="text-normal">${fullName.split('/')[0]} / </span>${fullName.split('/')[1]}
        </a>
      </h2>
    </div>
    <div class="f6 color-fg-muted mt-2">
      <a class="Link--muted tmp-mr-3" href="/${fullName}/stargazers">0</a>
    </div>
  </div>`;

describe('project catalogue helpers', () => {
  it('collects unique repositories, preserves the first category, and applies exclusions', () => {
    const entries = collectRepositoryEntries(
      [
        {
          slug: 'first-list',
          category: 'first-category',
          html: [
            '<a href="/brainage04/NotAnEntry">Page chrome</a>',
            listEntry('brainage04/Alpha'),
            listEntry('brainage04/Alpha'),
            listEntry('brainage04/baritone'),
          ].join(''),
        },
        {
          slug: 'second-list',
          category: 'second-category',
          html: listEntry('brainage04/Alpha') + listEntry('other/Beta'),
        },
      ],
      { 'brainage04/baritone': true },
    );

    expect(entries).toEqual([
      { slug: 'first-list', category: 'first-category', fullName: 'brainage04/Alpha' },
      { slug: 'second-list', category: 'second-category', fullName: 'other/Beta' },
    ]);
  });

  it('follows the next-page link until the last page', () => {
    expect(
      nextPagePath(
        '<span class="previous_page disabled" aria-disabled="true">Previous</span> ' +
          '<a rel="next" aria-label="Page 2" href="/stars/brainage04/lists/mods?page=2">2</a> ' +
          '<a class="next_page" aria-label="Next page" rel="next" href="/stars/brainage04/lists/mods?page=2">Next</a>',
      ),
    ).toBe('/stars/brainage04/lists/mods?page=2');
    expect(
      nextPagePath(
        '<a class="previous_page" rel="prev" href="/stars/brainage04/lists/mods?page=1">Previous</a> ' +
          '<span class="next_page disabled" aria-label="Next page" aria-disabled="true">Next</span>',
      ),
    ).toBeUndefined();
  });

  it('calculates language percentages and falls back to the primary language', () => {
    expect(languageBreakdown({ TypeScript: 3, CSS: 1 }, 'JavaScript')).toEqual([
      { name: 'TypeScript', percentage: 75 },
      { name: 'CSS', percentage: 25 },
    ]);
    expect(languageBreakdown({}, 'Java')).toEqual([{ name: 'Java', percentage: 100 }]);
    expect(languageBreakdown({}, null)).toEqual([]);
  });

  it('catalogues only public, enabled repositories so no card links to a private repository or icon', () => {
    const repository = { disabled: false, private: false, visibility: 'public' };

    expect(isCataloguedRepository(repository)).toBe(true);
    expect(isCataloguedRepository({ ...repository, private: true, visibility: 'private' })).toBe(false);
    expect(isCataloguedRepository({ ...repository, visibility: 'internal' })).toBe(false);
    expect(isCataloguedRepository({ ...repository, disabled: true })).toBe(false);
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
        icon: { url: 'https://example.com/icon.png', pixelated: true },
        loaders: ['Fabric', 'NeoForge'],
        categoryOverrides: { BrainageHUD: 'large-minecraft-mods' },
        featured: { BrainageHUD: 2 },
      }),
    ).toEqual({
      name: 'BrainageHUD',
      url: 'https://github.com/brainage04/BrainageHUD',
      description: '',
      icon: 'https://example.com/icon.png',
      iconPixelated: true,
      languages: [{ name: 'Java', percentage: 100 }],
      category: 'large-minecraft-mods',
      loaders: ['Fabric', 'NeoForge'],
      featured: 2,
    });
  });

  it('prefers the docs/icon master, then the in-jar mod icon', () => {
    const jarIcon = 'common/src/main/resources/assets/magic_carpet/icon.png';

    expect(selectIconPath(['icon.png', jarIcon, 'docs/icon/icon.png'])).toBe('docs/icon/icon.png');
    expect(selectIconPath(['docs/icon/provenance/icon.png', 'icon.png', jarIcon])).toBe(jarIcon);
    expect(selectIconPath(['src/shared/resources/assets/actionassist/icon.png'])).toBe(
      'src/shared/resources/assets/actionassist/icon.png',
    );
  });

  it('detects mod loaders from their metadata files, in display order', () => {
    expect(
      detectModLoaders([
        'neoforge/src/main/resources/META-INF/neoforge.mods.toml',
        'fabric/src/main/resources/fabric.mod.json',
        'fabric/src/gametest/resources/fabric.mod.json',
      ]),
    ).toEqual(['Fabric', 'NeoForge']);
    expect(detectModLoaders(['src/main/resources/fabric.mod.json'])).toEqual(['Fabric']);
    // Legacy Forge (1.8.9) and modern Forge.
    expect(detectModLoaders(['src/main/resources/mcmod.info'])).toEqual(['Forge']);
    expect(detectModLoaders(['forge/src/main/resources/META-INF/mods.toml'])).toEqual(['Forge']);
    expect(detectModLoaders(['data/pack.mcmeta', 'docs/fabric.mod.json.md'])).toEqual([]);
  });

  it('reads sides only from release metadata files', () => {
    expect(
      sideMetadataPaths([
        'fabric/src/main/resources/fabric.mod.json',
        'fabric/src/gametest/resources/fabric.mod.json',
        'neoforge/src/clientGametest/resources/META-INF/neoforge.mods.toml',
        'neoforge/src/main/resources/META-INF/neoforge.mods.toml',
        'common/src/matchBots/resources/fabric.mod.json',
        'testworld/src/main/resources/fabric.mod.json',
        'tools/showcase/stage-mod/fabric.mod.json',
        'src/main/resources/mcmod.info',
        'README.md',
      ]),
    ).toEqual([
      'fabric/src/main/resources/fabric.mod.json',
      'neoforge/src/main/resources/META-INF/neoforge.mods.toml',
      'common/src/matchBots/resources/fabric.mod.json',
    ]);
  });

  it('reads the side from fabric.mod.json environments and mods.toml declarations', () => {
    const fabric = (environment) => ({
      path: 'fabric.mod.json',
      text: JSON.stringify({ environment, mixins: [{ config: 'a.mixins.json', environment: 'client' }] }),
    });
    const toml = (text) => ({ path: 'META-INF/neoforge.mods.toml', text });

    const side = ({ path, text }) => metadataSide(path, text);

    expect(side(fabric('*'))).toBe('both');
    expect(side(fabric(undefined))).toBe('both');
    expect(side(fabric('client'))).toBe('client');
    expect(side(fabric('server'))).toBe('server');
    expect(metadataSide('fabric.mod.json', '{ not json')).toBeUndefined();
    expect(side(toml('side="CLIENT"\nside = "CLIENT"'))).toBe('client');
    expect(side(toml('side="BOTH"\nside="SERVER"'))).toBe('both');
    expect(side(toml('displayTest="IGNORE_SERVER_VERSION"\nside="BOTH"'))).toBe('server');
    expect(side(toml('modId="x"'))).toBeUndefined();

    // A client or server declaration wins over "both"; conflicting ones, or none, are unknown.
    expect(detectModSide([fabric('*'), toml('displayTest="IGNORE_SERVER_VERSION"')])).toBe('server');
    expect(detectModSide([fabric('*'), toml('side="BOTH"')])).toBe('both');
    expect(detectModSide([fabric('client'), fabric('server')])).toBeUndefined();
    expect(detectModSide([])).toBeUndefined();
  });

  it('reads Minecraft versions from release build files', () => {
    expect(
      versionMetadataPaths([
        'gradle.properties',
        'neoforge/gradle.properties',
        'build.gradle.kts',
        'targets/mc1211/neoforge/gradle.properties',
        'tools/showcase/gradle.properties',
        'fabric/src/gametest/build.gradle',
        'settings.gradle',
      ]),
    ).toEqual([
      'gradle.properties',
      'neoforge/gradle.properties',
      'build.gradle.kts',
      'targets/mc1211/neoforge/gradle.properties',
    ]);

    const modern = { path: 'gradle.properties', text: 'mod_version=1.0.0\nminecraft_version=26.2\n' };
    const legacy = {
      path: 'build.gradle.kts',
      text: 'minecraft("com.mojang:minecraft:1.8.9")\nforge("…:1.8.9-11.15")',
    };
    const targets = {
      path: 'build.gradle',
      text: [
        'ext.minecraftTargets = [',
        '  mc12110: [minecraft: "1.21.10", fabricApi: "0.138.4+1.21.10"],',
        '  mc1211 : [minecraft: "1.21.1",  fabricApi: "0.116.14+1.21.1"],',
        '  mc262  : [minecraft: "26.2",    fabricApi: "0.156.0+26.2"]',
        ']',
        'from file("fixtures/${unobfuscated ? target.minecraft : "1.21"}")',
      ].join('\n'),
    };

    expect(detectMinecraftVersions([modern, { ...modern, path: 'neoforge/gradle.properties' }])).toEqual(['26.2']);
    expect(detectMinecraftVersions([legacy])).toEqual(['1.8.9']);
    expect(detectMinecraftVersions([targets])).toEqual(['1.21.1', '1.21.10', '26.2']);
    expect(detectMinecraftVersions([{ path: 'gradle.properties', text: 'loader_version=0.19.3' }])).toEqual([]);
  });

  it('orders Minecraft versions numerically', () => {
    expect(['26.1.2', '1.21.10', '1.21.8', '26.1'].sort(compareMinecraftVersions)).toEqual([
      '1.21.8',
      '1.21.10',
      '26.1',
      '26.1.2',
    ]);
  });

  it('omits loaders for repositories without any', () => {
    const project = projectFromRepository({
      repository: { name: 'Site', html_url: 'https://github.com/brainage04/Site', description: 'A site.' },
      entry: { category: 'websites' },
      languages: {},
      categoryOverrides: {},
      featured: {},
    });
    expect(project).not.toHaveProperty('loaders');
    expect(project).not.toHaveProperty('side');
    expect(project).not.toHaveProperty('versions');
  });

  it('reads PNG widths regardless of the served content type', () => {
    const png = new Uint8Array(24);
    png.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    png.set([0, 0, 0, 32], 16);

    expect(pngWidth(png)).toBe(32);
    expect(pngWidth(new Uint8Array(24))).toBeUndefined();
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
