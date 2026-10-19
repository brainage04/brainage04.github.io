import {
  projectCategories,
  type ModLoader,
  type ModSide,
  type Project,
  type ProjectType,
  type TopLevelCategoryId,
} from '../data/projects';

export type ProjectMeta = {
  /** The Minecraft versions, oldest first. */
  versions?: readonly string[];
  type?: ProjectType;
  loaders?: readonly ModLoader[];
  side?: ModSide;
};

const sideLabels: Record<ModSide, string> = {
  server: 'server-side',
  client: 'client-side',
  both: 'server-and-client',
};

/**
 * The muted detail line on a project card, e.g. `1.21.1–26.2 | fabric, neoforge | server-side` (shown in capitals):
 * the Minecraft version, or the oldest and newest of several, then the loaders and the side. Unknown parts are left
 * out, and datapacks never list loaders.
 */
export function formatProjectMeta({ versions = [], type, loaders = [], side }: ProjectMeta): string {
  const first = versions[0];
  const last = versions.at(-1);
  return [
    first && last && first !== last ? `${first}–${last}` : (first ?? ''),
    type === 'Datapack' ? '' : loaders.join(', '),
    side ? sideLabels[side] : '',
  ]
    .filter(Boolean)
    .join(' | ')
    .toLowerCase();
}

const topLevelTypes: Partial<Record<TopLevelCategoryId, ProjectType>> = {
  'minecraft-mods': 'Mod',
  'minecraft-datapacks': 'Datapack',
};

/** A project's detail line; its type is given (as portfolio items are) or its category's. */
export function projectMeta(project: Project & { type?: ProjectType }): string {
  return formatProjectMeta({
    versions: project.versions,
    type: project.type ?? topLevelTypes[projectCategories[project.category].topLevel],
    loaders: project.loaders,
    side: project.side,
  });
}

/**
 * A project name split at its camel-case humps (`TwitchPlaysMinecraft` → Twitch, Plays, Minecraft; `BrainageHUD` →
 * Brainage, HUD) and before the dots of a domain name (`brainage04.github.io` → brainage04, .github, .io), so a card
 * title can wrap between words but never inside one, and a domain still fits a phone-width card.
 */
export function titleSegments(name: string): string[] {
  return name.split(/(?<=[a-z\d])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])|(?<=.)(?=\.)/u);
}
