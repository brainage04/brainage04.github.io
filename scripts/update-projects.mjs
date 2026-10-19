/* global fetch, console */
import { URL, fileURLToPath } from 'node:url';
import process from 'node:process';
import prettier from 'prettier';
import { writeFile } from 'node:fs/promises';
import { categoryOverrides, excludedRepositories, featuredOrder, githubOwner, starLists } from './project-config.mjs';
import {
  collectRepositoryEntries,
  detectMinecraftVersions,
  detectModLoaders,
  detectModSide,
  isCataloguedRepository,
  nextPagePath,
  pixelArtMaxWidth,
  pngWidth,
  projectFromRepository,
  selectIconPath,
  sideMetadataPaths,
  versionMetadataPaths,
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

/** File paths on the default branch, or an empty list (with a warning) when the tree cannot be read. */
async function repositoryPaths(repository) {
  try {
    const branch = encodeURIComponent(repository.default_branch);
    const tree = await request(`https://api.github.com/repos/${repository.full_name}/git/trees/${branch}?recursive=1`);
    if (tree.truncated) console.warn(`File tree truncated for ${repository.full_name}`);
    return tree.tree.filter((entry) => entry.type === 'blob').map((entry) => entry.path);
  } catch (error) {
    console.warn(`No file tree loaded for ${repository.full_name}: ${error.message}`);
    return [];
  }
}

function rawUrl(repository, path) {
  const branch = encodeURIComponent(repository.default_branch);
  const encodedPath = path.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/${repository.full_name}/${branch}/${encodedPath}`;
}

/** The files at `paths` on the default branch, as `{ path, text }`. */
async function repositoryFiles(repository, paths) {
  return Promise.all(paths.map(async (path) => ({ path, text: await request(rawUrl(repository, path), 'text') })));
}

/** The side a mod runs on, from its release metadata files, or undefined (with a warning) when one cannot be read. */
async function repositorySide(repository, paths) {
  try {
    return detectModSide(await repositoryFiles(repository, sideMetadataPaths(paths)));
  } catch (error) {
    console.warn(`No side detected for ${repository.full_name}: ${error.message}`);
    return undefined;
  }
}

/** The Minecraft versions a mod targets, from its build files, or none (with a warning) when one cannot be read. */
async function repositoryVersions(repository, paths) {
  try {
    return detectMinecraftVersions(await repositoryFiles(repository, versionMetadataPaths(paths)));
  } catch (error) {
    console.warn(`No Minecraft versions detected for ${repository.full_name}: ${error.message}`);
    return [];
  }
}

async function repositoryIcon(repository, paths) {
  const iconPath = selectIconPath(paths);
  if (!iconPath) return undefined;

  try {
    const iconUrl = rawUrl(repository, iconPath);
    // Fetch without the token: the site serves this URL to anonymous visitors and Astro fetches it anonymously.
    const response = await fetch(iconUrl, { headers: { 'User-Agent': headers['User-Agent'] } });
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

    if (!isCataloguedRepository(repository)) {
      console.warn(`Skipping ${entry.fullName}: ${repository.disabled ? 'disabled' : 'not public'}`);
      continue;
    }

    let languages = {};
    try {
      languages = await request(repository.languages_url);
    } catch (error) {
      console.warn(`Using primary language for ${entry.fullName}: ${error.message}`);
    }

    if (!repository.description) {
      console.warn(`Using an empty description for ${entry.fullName}: no GitHub repository description`);
    }
    // Only the Minecraft mods list has icons, mod loaders, sides and versions to read from the repository's files.
    const paths = entry.slug === 'minecraft-mods' ? await repositoryPaths(repository) : [];
    const icon = await repositoryIcon(repository, paths);
    const side = await repositorySide(repository, paths);
    const versions = await repositoryVersions(repository, paths);

    generated.push(
      projectFromRepository({
        repository,
        entry,
        languages,
        icon,
        loaders: detectModLoaders(paths),
        side,
        versions,
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
