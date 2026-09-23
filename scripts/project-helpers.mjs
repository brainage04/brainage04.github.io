const ignoredRepositoryOwners = {
  about: true,
  account: true,
  contact: true,
  explore: true,
  features: true,
  login: true,
  marketplace: true,
  notifications: true,
  organizations: true,
  pricing: true,
  settings: true,
  signup: true,
  stars: true,
};

export function repositoryLinks(html) {
  const repositories = new Set();
  const pattern = /href=["']\/([^/"'?#]+)\/([^/"'?#]+)["']/g;

  for (const match of html.matchAll(pattern)) {
    const [, owner, name] = match;
    if (!owner || !name || Object.hasOwn(ignoredRepositoryOwners, owner) || name === 'lists') continue;
    repositories.add(`${owner}/${name}`);
  }

  return [...repositories];
}

export function collectRepositoryEntries(listPages, excludedRepositories) {
  const repositories = new Map();

  for (const { html, ...list } of listPages) {
    for (const fullName of repositoryLinks(html)) {
      if (Object.hasOwn(excludedRepositories, fullName) || repositories.has(fullName)) continue;
      repositories.set(fullName, { ...list, fullName });
    }
  }

  return [...repositories.values()];
}

// Ordered by preference: the in-jar mod icon first, then repository-level icons.
const projectIconPatterns = [
  /(?:^|\/)src\/main\/resources\/assets\/[^/]+\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /(?:^|\/)src\/main\/resources\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /^(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
];

export function selectIconPath(paths) {
  return projectIconPatterns.map((pattern) => paths.find((path) => pattern.test(path))).find(Boolean);
}

const pngSignature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

/** Width from the PNG IHDR chunk, or undefined when the bytes are not a PNG. */
export function pngWidth(bytes) {
  if (bytes.length < 24 || pngSignature.some((byte, index) => bytes[index] !== byte)) return undefined;
  return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(16);
}

// Icons at or below this width are pixel art and must be scaled without smoothing.
export const pixelArtMaxWidth = 64;

export function languageBreakdown(languageBytes, fallbackLanguage) {
  const entries = Object.entries(languageBytes ?? {}).sort(([, left], [, right]) => right - left);
  if (entries.length === 0 && fallbackLanguage) return [{ name: fallbackLanguage, percentage: 100 }];

  const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0);
  if (!total) return [];

  return entries.map(([name, bytes]) => ({
    name,
    percentage: Math.round((bytes / total) * 1000) / 10,
  }));
}

export function projectFromRepository({ repository, entry, languages, icon, categoryOverrides, featured }) {
  const name = repository.name;

  return {
    name,
    url: repository.html_url,
    description: repository.description ?? '',
    ...(icon ? { icon: icon.url, ...(icon.pixelated ? { iconPixelated: true } : {}) } : {}),
    languages: languageBreakdown(languages, repository.language),
    category: categoryOverrides[name] ?? entry.category,
    ...(Object.hasOwn(featured, name) ? { featured: featured[name] } : {}),
  };
}

export function sortProjects(projects) {
  projects.sort((left, right) => {
    const leftFeatured = left.featured ?? Number.POSITIVE_INFINITY;
    const rightFeatured = right.featured ?? Number.POSITIVE_INFINITY;
    if (leftFeatured !== rightFeatured) return leftFeatured - rightFeatured;
    return left.name.localeCompare(right.name);
  });
}
