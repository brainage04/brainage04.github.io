import { describe, expect, it } from 'vitest';
import type { Project } from '../data/projects';
import { formatProjectMeta, projectMeta, titleSegments } from './projectMeta';

describe('formatProjectMeta', () => {
  it('joins the version, loaders and side with pipes, in lower case', () => {
    expect(formatProjectMeta({ versions: ['26.2'], loaders: ['Fabric', 'NeoForge'], side: 'server' })).toBe(
      '26.2 | fabric, neoforge | server-side',
    );
  });

  it('shows several versions as a range from the oldest to the newest', () => {
    expect(formatProjectMeta({ versions: ['1.21.1', '1.21.10', '26.2'], loaders: ['Fabric'] })).toBe(
      '1.21.1–26.2 | fabric',
    );
    expect(formatProjectMeta({ versions: ['1.8.9'], loaders: ['Forge'] })).toBe('1.8.9 | forge');
  });

  it('names each side', () => {
    expect(formatProjectMeta({ side: 'client' })).toBe('client-side');
    expect(formatProjectMeta({ side: 'server' })).toBe('server-side');
    expect(formatProjectMeta({ side: 'both' })).toBe('server-and-client');
  });

  it('leaves out an unknown side and unknown versions', () => {
    expect(formatProjectMeta({ versions: ['26.2'], loaders: ['Forge'] })).toBe('26.2 | forge');
    expect(formatProjectMeta({ loaders: ['Fabric'], side: 'client' })).toBe('fabric | client-side');
  });

  it('never lists loaders for a datapack, so one without versions or a side has no line', () => {
    expect(formatProjectMeta({ type: 'Datapack' })).toBe('');
    expect(formatProjectMeta({ versions: ['26.2'], type: 'Datapack', loaders: ['Fabric'] })).toBe('26.2');
  });

  it('is empty when nothing is known', () => {
    expect(formatProjectMeta({})).toBe('');
  });
});

describe('projectMeta', () => {
  const project = (overrides: Partial<Project>): Project => ({
    name: 'Example',
    description: '',
    languages: [],
    category: 'large-minecraft-mods',
    ...overrides,
  });

  it("uses the project's versions, loaders and side, and the category's type unless the project gives one", () => {
    expect(projectMeta(project({ versions: ['26.2'], loaders: ['Fabric'], side: 'client' }))).toBe(
      '26.2 | fabric | client-side',
    );
    expect(projectMeta(project({ category: 'minecraft-datapacks', loaders: ['Fabric'] }))).toBe('');
    expect(projectMeta({ ...project({ category: 'minecraft-datapacks', loaders: ['Fabric'] }), type: 'Mod' })).toBe(
      'fabric',
    );
    expect(projectMeta(project({ category: 'websites' }))).toBe('');
  });
});

describe('titleSegments', () => {
  it('splits names at camel-case humps and before the dots of a domain name', () => {
    expect(titleSegments('TwitchPlaysMinecraft')).toEqual(['Twitch', 'Plays', 'Minecraft']);
    expect(titleSegments('BrainageHUD')).toEqual(['Brainage', 'HUD']);
    expect(titleSegments('HUDRendererLib')).toEqual(['HUD', 'Renderer', 'Lib']);
    expect(titleSegments('brainage04.github.io')).toEqual(['brainage04', '.github', '.io']);
    expect(titleSegments('Telekinesis')).toEqual(['Telekinesis']);
  });
});
