/* global fetch, console */
import { URL } from 'node:url';
import process from 'node:process';
import prettier from 'prettier';
import { writeFile } from 'node:fs/promises';
import { categoryOverrides, excludedRepositories, featuredOrder, githubOwner, starLists } from './project-config.mjs';
import { collectRepositoryEntries, projectFromRepository, sortProjects } from './project-helpers.mjs';

const outputPath = new URL('../src/data/projects.generated.ts', import.meta.url);
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'brainage04-project-sync',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

async function request(url, responseType = 'json') {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }
  return responseType === 'text' ? response.text() : response.json();
}

const projectIconPatterns = [
  /(?:^|\/)src\/main\/resources\/assets\/[^/]+\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /(?:^|\/)src\/main\/resources\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /^(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
];

async function repositoryIcon(repository, listSlug) {
  if (listSlug !== 'minecraft-mods') return undefined;

  try {
    const branch = encodeURIComponent(repository.default_branch);
    const tree = await request(`https://api.github.com/repos/${repository.full_name}/git/trees/${branch}?recursive=1`);
    const paths = tree.tree.filter((entry) => entry.type === 'blob').map((entry) => entry.path);
    const iconPath = projectIconPatterns.map((pattern) => paths.find((path) => pattern.test(path))).find(Boolean);

    if (!iconPath) return undefined;

    const encodedPath = iconPath.split('/').map(encodeURIComponent).join('/');
    const iconUrl = `https://raw.githubusercontent.com/${repository.full_name}/${branch}/${encodedPath}`;
    const response = await fetch(iconUrl, { headers });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} for ${iconUrl}`);
    }
    await response.arrayBuffer();
    if (!response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error(`invalid image response for ${iconUrl}`);
    }
    return iconUrl;
  } catch (error) {
    console.warn(`No icon loaded for ${repository.full_name}: ${error.message}`);
    return undefined;
  }
}

async function buildProjects() {
  const listPages = [];

  for (const list of starLists) {
    const html = await request(`https://github.com/stars/${githubOwner}/lists/${list.slug}`, 'text');
    listPages.push({ ...list, html });
  }

  const projects = collectRepositoryEntries(listPages, excludedRepositories);

  const featured = Object.fromEntries(featuredOrder.map((name, index) => [name, index + 1]));
  const generated = [];

  for (const entry of projects) {
    let repository;
    try {
      repository = await request(`https://api.github.com/repos/${entry.fullName}`);
    } catch (error) {
      console.warn(`Skipping ${entry.fullName}: ${error.message}`);
      continue;
    }

    if (repository.disabled) continue;

    let languages = {};
    try {
      languages = await request(repository.languages_url);
    } catch (error) {
      console.warn(`Using primary language for ${entry.fullName}: ${error.message}`);
    }

    if (!repository.description) {
      console.warn(`Using an empty description for ${entry.fullName}: no GitHub repository description`);
    }
    const icon = await repositoryIcon(repository, entry.slug);

    generated.push(
      projectFromRepository({
        repository,
        entry,
        languages,
        icon,
        categoryOverrides,
        featured,
      }),
    );
  }

  sortProjects(generated);

  return generated;
}

const projects = await buildProjects();
const prettierOptions = (await prettier.resolveConfig(outputPath.pathname)) ?? {};
const source = await prettier.format(
  `import type { Project } from './projects';\n\nexport const generatedProjects: Project[] = ${JSON.stringify(projects, null, 2)};\n`,
  { ...prettierOptions, filepath: outputPath.pathname, parser: 'typescript' },
);
await writeFile(outputPath, source);
console.log(`Generated ${projects.length} projects at ${outputPath.pathname}`);
