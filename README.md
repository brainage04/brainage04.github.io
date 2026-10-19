# brainage04.github.io

Personal Astro site for brainage04: projects, skills, social links, and blog posts, presented with AstroShell and WebTUI.

## Requirements

- Node.js 24
- npm

## Development

```bash
npm ci
npm run dev
```

Project, skill, social, and navigation data live in `src/data`; commission rates and the portfolio (which catalogue projects appear on the commissions page and home page, with their types) live in `src/data/commissions.ts`. A mod's size (Large, Medium or Small) is its catalogue category (`large-`, `medium-` or `small-minecraft-mods`, set in `categoryOverrides` in `scripts/project-config.mjs` or in `src/data/closedSourceProjects.ts`), so cards, the `/projects/` sections and the commissions portfolio always agree. Blog posts live in `src/content/blog`.

## Project catalogue

`src/data/projects.generated.ts` is generated from the configured GitHub star lists (every page of each list is read). Run `npm run update-projects` to refresh repository descriptions, language percentages, categories, featured ordering, mod loaders, mod sides, Minecraft versions, and removed repositories. The daily `Sync project catalogue` workflow runs the same command with the repository's GitHub token; when the catalogue changed it runs `npm run check`, `npm test` and `npm run build`, commits and pushes the result, then deploys that commit through the AstroShell `site-deploy.yml` reusable workflow (pushes made with the workflow token do not trigger the regular deploy).

Card descriptions are the GitHub repository descriptions: change them on GitHub (`gh repo edit <repo> --description …`), not in the site. Each card is exactly as tall as its icon (a description too long for it is clamped) and has a muted detail line in capitals, e.g. `1.21.1–26.2 | FABRIC, NEOFORGE | SERVER-SIDE`: the Minecraft version (the oldest and newest when a mod targets several), read from the default branch's build files (`minecraft_version` in `gradle.properties`, `com.mojang:minecraft:<version>` or `[minecraft: "<version>", …]` targets in `build.gradle`), then the mod loaders, read from the mod metadata files (`fabric.mod.json`, `META-INF/neoforge.mods.toml`, `META-INF/mods.toml` or `mcmod.info`), then the side. A mod's size shows through its section heading. Language percentages are shown on the home page and `/projects/`, not on the commissions page. Descriptions leave the loaders out; a test fails if a loader phrase such as "A Fabric and NeoForge Minecraft mod" comes back.

The side says where a mod must be installed, and is reviewed by hand in `src/data/projectSides.ts` from each repository's documented installation requirements, with the evidence quoted per repository. Metadata cannot say it: Fabric's `environment: "*"` only means a mod can load on both sides, and most server mods that vanilla clients can join declare it. The generator still detects a side from the metadata files (the `fabric.mod.json` environment, or a `mods.toml` `displayTest = "IGNORE_SERVER_VERSION"` or dependency sides), but it is only the fallback for a mod missing from the reviewed list; a test fails when a mod has neither, so review a new mod repository into the list when it is starred.

Only public repositories are catalogued, and icons are verified with an anonymous request, so every repository link and `raw.githubusercontent.com` icon works for visitors. A repository made private later disappears at the next sync; until then (or in a stale checkout) its icon fails to load and the card falls back to the category mark it shows without an icon instead of breaking the page.

Closed-source projects live in `src/data/closedSourceProjects.ts` and are merged into the catalogue, so the sync never removes them. Each entry's description must match its private repository's GitHub description; its loaders and versions are read from the repository's files by the same rules, its side is reviewed in `src/data/projectSides.ts`, and its icon is bundled from `src/assets/projects`. Their card titles are plain text with no repository link, which a note above each card list explains. If one is made public and starred into a list, the build fails until its hand-written entry is removed.

## Validation

```bash
npm run check
npm run lint
npm run format:check
npm test
npm run build
npm run check:routes
```

`npm run check:routes` needs a fresh `dist`. It starts `astro preview` and `astro dev` on free ports and requests every built page (all Astro routes plus each `public/**/*.html`, also by its directory URL) and a missing page, failing on any unexpected status or error overlay. The Validate workflow runs it in a separate job, and the catalogue sync runs it before committing. In dev, `public/<dir>/index.html` is served at `/<dir>/` by a small dev-only Vite plugin in `astro.config.mjs`, matching GitHub Pages.

## Deployment

Pushes to `main` are validated and deployed to [brainage04.github.io](https://brainage04.github.io/) through GitHub Actions and GitHub Pages.
