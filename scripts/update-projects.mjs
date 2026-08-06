/* global fetch, console */
import { URL } from 'node:url';
import process from 'node:process';
import prettier from 'prettier';
import { writeFile } from 'node:fs/promises';
import {
  categoryOverrides,
  descriptionOverrides,
  excludedRepositories,
  featuredOrder,
  githubOwner,
  modernMinecraftProjects,
  starLists,
} from './project-config.mjs';

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

function repositoryLinks(html) {
  const repositories = new Set();
  const pattern = /href=["']\/([^/"'?#]+)\/([^/"'?#]+)["']/g;
  const ignoredOwners = new Set([
    'about',
    'account',
    'contact',
    'explore',
    'features',
    'login',
    'marketplace',
    'notifications',
    'organizations',
    'pricing',
    'settings',
    'signup',
    'stars',
  ]);

  for (const match of html.matchAll(pattern)) {
    const [, owner, name] = match;
    if (!owner || !name || ignoredOwners.has(owner) || name === 'lists') continue;
    repositories.add(`${owner}/${name}`);
  }

  return [...repositories];
}

function markdownSummary(markdown) {
  const withoutFrontMatter = markdown.replace(/^---[\s\S]*?---\s*/u, '');
  const paragraphs = withoutFrontMatter
    .split(/\n\s*\n/u)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph && !paragraph.startsWith('#') && !paragraph.startsWith('```'));

  const summary = paragraphs[0]
    ?.replace(/!\[[^\]]*\]\([^)]*\)/gu, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[`*_]/gu, '')
    .replace(/\s+/gu, ' ')
    .trim();

  return summary && summary.length <= 240 ? summary : undefined;
}

async function readmeDescription(repository) {
  try {
    const branch = encodeURIComponent(repository.default_branch);
    const readme = await request(
      `https://raw.githubusercontent.com/${repository.full_name}/${branch}/README.md`,
      'text',
    );
    return markdownSummary(readme);
  } catch {
    return undefined;
  }
}

function normalizeDescription(name, listSlug, description) {
  const override = descriptionOverrides[name];
  const value = override ?? description ?? `GitHub repository for ${name}.`;

  if (
    listSlug === 'minecraft-mods' &&
    modernMinecraftProjects.has(name) &&
    /\bFabric\b/u.test(value) &&
    !/\bNeoForge\b/u.test(value)
  ) {
    return value.replace(/\bFabric\b/gu, 'Fabric and NeoForge');
  }

  return value;
}

function languageBreakdown(languageBytes, fallbackLanguage) {
  const entries = Object.entries(languageBytes ?? {}).sort(([, left], [, right]) => right - left);
  if (entries.length === 0 && fallbackLanguage) return [{ name: fallbackLanguage, percentage: 100 }];

  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) return [];

  return entries.map(([name, bytes]) => ({
    name,
    percentage: Math.round((bytes / total) * 1000) / 10,
  }));
}

async function buildProjects() {
  const projects = new Map();

  for (const list of starLists) {
    const html = await request(`https://github.com/stars/${githubOwner}/lists/${list.slug}`, 'text');
    for (const fullName of repositoryLinks(html)) {
      if (!projects.has(fullName)) projects.set(fullName, { ...list, fullName });
    }
  }

  const featured = new Map(featuredOrder.map((name, index) => [name, index + 1]));
  const generated = [];

  for (const entry of projects.values()) {
    if (excludedRepositories.has(entry.fullName)) continue;

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

    const name = repository.name;
    const repositoryDescription = (await readmeDescription(repository)) ?? repository.description;
    if (!repositoryDescription && !descriptionOverrides[name]) {
      console.warn(`Skipping ${entry.fullName}: no description or README summary`);
      continue;
    }

    generated.push({
      name,
      url: repository.html_url,
      description: normalizeDescription(name, entry.slug, repositoryDescription),
      languages: languageBreakdown(languages, repository.language),
      category: categoryOverrides[name] ?? entry.category,
      ...(featured.has(name) ? { featured: featured.get(name) } : {}),
    });
  }

  generated.sort((left, right) => {
    const leftFeatured = left.featured ?? Number.POSITIVE_INFINITY;
    const rightFeatured = right.featured ?? Number.POSITIVE_INFINITY;
    if (leftFeatured !== rightFeatured) return leftFeatured - rightFeatured;
    return left.name.localeCompare(right.name);
  });

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
