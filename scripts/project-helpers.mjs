// Each list entry is `<h2 class="h3"><a href="/owner/name">`; star counts, languages, and page chrome link elsewhere.
const listEntryPattern = /<h2 class="h3">\s*<a href="\/([^/"?#]+)\/([^/"?#]+)"/g;

export function repositoryLinks(html) {
  const repositories = new Set();

  for (const [, owner, name] of html.matchAll(listEntryPattern)) {
    repositories.add(`${owner}/${name}`);
  }

  return [...repositories];
}

// List pages hold 30 repositories; later pages are linked by `<a class="next_page" href="…?page=N">`.
// The last page renders a disabled `<span class="next_page">` instead.
export function nextPagePath(html) {
  return html.match(/<a\b[^>]*\bclass="next_page"[^>]*\bhref="([^"]+)"/)?.[1]?.replaceAll('&amp;', '&');
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

// Ordered by preference: the 1024px docs/icon master first, then the in-jar mod icon, then repository-level icons.
const projectIconPatterns = [
  /^docs\/icon\/icon\.(?:png|webp|jpe?g|svg)$/iu,
  /(?:^|\/)src\/(?:main|shared)\/resources\/assets\/[^/]+\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /(?:^|\/)src\/main\/resources\/(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
  /^(?:icon|logo)\.(?:png|webp|jpe?g|svg)$/iu,
];

export function selectIconPath(paths) {
  return projectIconPatterns.map((pattern) => paths.find((path) => pattern.test(path))).find(Boolean);
}

// Each loader's mod metadata file, in display order. Forge mods declare META-INF/mods.toml (1.13+) or mcmod.info (legacy
// versions such as 1.8.9). NeoForge has used neoforge.mods.toml since 1.20.5; a NeoForge mod for an older version
// (which used mods.toml) would show as Forge.
const modLoaderFiles = [
  ['Fabric', /(?:^|\/)fabric\.mod\.json$/u],
  ['NeoForge', /(?:^|\/)META-INF\/neoforge\.mods\.toml$/u],
  ['Forge', /(?:^|\/)(?:META-INF\/mods\.toml|mcmod\.info)$/u],
];

/** The mod loaders a repository builds for, from the metadata files in its tree. */
export function detectModLoaders(paths) {
  return modLoaderFiles.filter(([, pattern]) => paths.some((path) => pattern.test(path))).map(([loader]) => loader);
}

// Test, verification and tooling builds (gametest mods, test worlds, showcase stages) declare their own sides, which
// say nothing about the published mod.
const nonReleasePath = /(?:^|\/)(?:[^/]*test[^/]*|verify|tools)\//iu;

/**
 * The metadata files that can say which side a mod runs on: fabric.mod.json and the mods.toml files of the release
 * builds. Legacy mcmod.info files have no side field.
 */
export function sideMetadataPaths(paths) {
  return paths.filter(
    (path) =>
      !nonReleasePath.test(path) &&
      !path.endsWith('mcmod.info') &&
      modLoaderFiles.some(([, pattern]) => pattern.test(path)),
  );
}

const fabricEnvironments = { '*': 'both', client: 'client', server: 'server' };
const tomlSides = { BOTH: 'both', CLIENT: 'client', SERVER: 'server' };

/**
 * The side one metadata file declares: `client`, `server`, `both` or undefined when it does not say.
 * - fabric.mod.json: the top-level `environment` ("*", "client" or "server"; Fabric's default is "*").
 * - mods.toml: `displayTest = "IGNORE_SERVER_VERSION"` marks a server-side mod (vanilla clients can join). Otherwise
 *   the dependency sides: all CLIENT is a client mod, all SERVER a server mod, any BOTH a mod for both sides.
 */
export function metadataSide(path, text) {
  if (path.endsWith('.json')) {
    try {
      return fabricEnvironments[JSON.parse(text).environment ?? '*'];
    } catch {
      return undefined;
    }
  }
  if (/^\s*displayTest\s*=\s*"IGNORE_SERVER_VERSION"/mu.test(text)) return 'server';
  const sides = [...text.matchAll(/^\s*side\s*=\s*"(\w+)"/gmu)].map(([, side]) => tomlSides[side.toUpperCase()]);
  if (sides.length === 0 || sides.includes(undefined)) return undefined;
  if (sides.every((side) => side === sides[0])) return sides[0];
  return sides.includes('both') ? 'both' : undefined;
}

/**
 * A hint at the side a mod runs on, from its release metadata files (`{ path, text }`): a client or server declaration
 * in any file wins over "both", and conflicting declarations, like no declarations, give undefined. Metadata cannot say
 * where a mod must be installed (Fabric's "*" only says it can load on both sides), so the site prefers the reviewed
 * sides in src/data/projectSides.ts and uses this only for mods missing there.
 */
export function detectModSide(files) {
  const sides = new Set(files.map(({ path, text }) => metadataSide(path, text)).filter(Boolean));
  const specific = [...sides].filter((side) => side !== 'both');
  if (specific.length > 0) return specific.length === 1 ? specific[0] : undefined;
  return sides.has('both') ? 'both' : undefined;
}

// Build files that name the Minecraft version: gradle.properties (`minecraft_version=26.2`), and build scripts for
// legacy Forge (`minecraft("com.mojang:minecraft:1.8.9")`) or multi-version targets (`[minecraft: "1.21.1", …]`).
const buildFilePattern = /(?:^|\/)(?:gradle\.properties|build\.gradle(?:\.kts)?)$/u;

/** The build files of the release builds that can name the Minecraft version. */
export function versionMetadataPaths(paths) {
  return paths.filter((path) => buildFilePattern.test(path) && !nonReleasePath.test(path));
}

const versionPatterns = [
  /^\s*minecraft_version\s*=\s*(\d+(?:\.\d+)+)\s*$/gmu,
  /com\.mojang:minecraft:(\d+(?:\.\d+)+)/gu,
  /\[\s*minecraft\s*:\s*"(\d+(?:\.\d+)+)"/gu,
];

/** Compares Minecraft versions part by part (1.21.10 after 1.21.8; 26.1 after 1.21.11). */
export function compareMinecraftVersions(left, right) {
  const a = left.split('.').map(Number);
  const b = right.split('.').map(Number);
  for (let index = 0; index < Math.max(a.length, b.length); index += 1) {
    const difference = (a[index] ?? 0) - (b[index] ?? 0);
    if (difference) return difference;
  }
  return 0;
}

/** Every Minecraft version the build files (`{ path, text }`) target, oldest first, without duplicates. */
export function detectMinecraftVersions(files) {
  const versions = new Set(
    files.flatMap(({ text }) => versionPatterns.flatMap((pattern) => [...text.matchAll(pattern)].map(([, v]) => v))),
  );
  return [...versions].sort(compareMinecraftVersions);
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

// Only public, enabled repositories are catalogued. Public star-list pages never show private repositories, but the
// API call made with a token can still return one (e.g. a repository made private while the sync runs); its repository
// link and raw.githubusercontent.com icon would 404 for visitors and for Astro's anonymous image fetch.
export function isCataloguedRepository(repository) {
  return !repository.disabled && !repository.private && repository.visibility === 'public';
}

export function projectFromRepository({
  repository,
  entry,
  languages,
  icon,
  loaders = [],
  side,
  versions = [],
  categoryOverrides,
  featured,
}) {
  const name = repository.name;

  return {
    name,
    url: repository.html_url,
    description: repository.description ?? '',
    ...(icon ? { icon: icon.url, ...(icon.pixelated ? { iconPixelated: true } : {}) } : {}),
    languages: languageBreakdown(languages, repository.language),
    category: categoryOverrides[name] ?? entry.category,
    ...(loaders.length > 0 ? { loaders } : {}),
    ...(side ? { side } : {}),
    ...(versions.length > 0 ? { versions } : {}),
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
