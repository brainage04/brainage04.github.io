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
    ...(icon ? { icon } : {}),
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
