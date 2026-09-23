/* global fetch, console */
import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import prettier from 'prettier';
import { writeFile } from 'node:fs/promises';
import { categoryOverrides, excludedRepositories, featuredOrder, githubOwner, starLists } from './project-config.mjs';
import {
  collectRepositoryEntries,
  nextPagePath,
  pixelArtMaxWidth,
  pngWidth,
  projectFromRepository,
  selectIconPath,
  sortProjects,
} from './project-helpers.mjs';

const outputPath = fileURLToPath(new URL('../src/data/projects.generated.ts', import.meta.url));
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

async function repositoryIcon(repository, listSlug) {
  if (listSlug !== 'minecraft-mods') return undefined;

  try {
    const branch = encodeURIComponent(repository.default_branch);
    const tree = await request(`https://api.github.com/repos/${repository.full_name}/git/trees/${branch}?recursive=1`);
    const paths = tree.tree.filter((entry) => entry.type === 'blob').map((entry) => entry.path);
    const iconPath = selectIconPath(paths);

    if (!iconPath) return undefined;

    const encodedPath = iconPath.split('/').map(encodeURIComponent).join('/');
    const iconUrl = `https://raw.githubusercontent.com/${repository.full_name}/${branch}/${encodedPath}`;
    const response = await fetch(iconUrl, { headers });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} for ${iconUrl}`);
    }
    // raw.githubusercontent.com serves some PNGs as application/octet-stream, so trust the PNG signature too.
    const width = pngWidth(new Uint8Array(await response.arrayBuffer()));
    if (width === undefined && !response.headers.get('content-type')?.startsWith('image/')) {
      throw new Error(`invalid image response for ${iconUrl}`);
    }
    return { url: iconUrl, pixelated: width !== undefined && width <= pixelArtMaxWidth };
  } catch (error) {
    console.warn(`No icon loaded for ${repository.full_name}: ${error.message}`);
    return undefined;
  }
}

async function buildProjects() {
  const listPages = [];

  for (const list of starLists) {
    const pages = [];
    let pagePath = `/stars/${githubOwner}/lists/${list.slug}`;
    while (pagePath) {
      const html = await request(new URL(pagePath, 'https://github.com'), 'text');
      pages.push(html);
      pagePath = nextPagePath(html);
    }
    listPages.push({ ...list, html: pages.join('\n') });
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
const prettierOptions = (await prettier.resolveConfig(outputPath)) ?? {};
const source = await prettier.format(
  `import type { Project } from './projects';\n\nexport const generatedProjects: Project[] = ${JSON.stringify(projects, null, 2)};\n`,
  { ...prettierOptions, filepath: outputPath, parser: 'typescript' },
);
await writeFile(outputPath, source);
console.log(`Generated ${projects.length} projects at ${outputPath}`);
