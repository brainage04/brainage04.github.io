import { groupProjects, projects } from './projects';

const listDescriptions: Record<string, string> = {
  'Minecraft Mods': 'Fabric and Forge mods, mod libraries, and modding templates.',
  'Discord Bots & Plugins': 'Discord bots, client plugins, and Discord tooling.',
  'Websites & Web Apps': 'Websites, browser-based apps, and web templates.',
  'Browser Extensions': 'Browser extensions and extension templates.',
  'Minecraft Datapacks': 'Minecraft datapacks and datapack templates.',
  Personal: 'Profile, résumé, and other personal repositories.',
  'Scripts & Developer Tools': 'Standalone scripts, patches, and developer utilities.',
  'Mobile Apps': 'Android and other mobile applications.',
};

export const githubStarLists = groupProjects(projects).map((group) => ({
  name: group.label,
  description: listDescriptions[group.label],
  projectCount: group.projects.length,
}));
