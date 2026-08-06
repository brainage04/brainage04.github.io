import { groupProjects, projects } from './projects';

const listDescriptions: Record<string, string> = {
  'Minecraft Mods': 'Fabric and NeoForge mods, mod libraries, and modding templates.',
  'Discord Bots & Plugins': 'Discord bots and client plugins.',
  'Websites & Web Apps': 'Websites, browser-based apps, and web templates.',
  'Browser Extensions': 'Browser extensions and extension templates.',
  'Minecraft Datapacks': 'Minecraft datapacks and datapack templates.',
};

export const githubStarLists = groupProjects(projects).map((group) => ({
  name: group.label,
  description: listDescriptions[group.label],
  projectCount: group.projects.length,
}));
