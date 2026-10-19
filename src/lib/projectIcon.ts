import type { ImageMetadata } from 'astro';
import { inferRemoteSize } from 'astro:assets';

/** `<Image>` source props that need no further probing: a bundled image, or a remote URL with its probed size. */
export type ResolvedIcon = { src: ImageMetadata } | { src: string; width: number; height: number };

/**
 * Resolves a project icon for `<Image>`, or undefined when there is none or a remote icon cannot be fetched (a
 * repository that went private, a moved file, a network error), so cards fall back to their mark instead of failing
 * the page or build. Bundled icons are returned as they are.
 */
export async function resolveProjectIcon(project: {
  name: string;
  icon?: string | ImageMetadata;
}): Promise<ResolvedIcon | undefined> {
  if (!project.icon) return undefined;
  if (typeof project.icon !== 'string') return { src: project.icon };

  try {
    const { width, height } = await inferRemoteSize(project.icon);
    return { src: project.icon, width, height };
  } catch (error) {
    console.warn(
      `Using the fallback mark for ${project.name}: ${error instanceof Error ? error.message : String(error)}`,
    );
    return undefined;
  }
}
