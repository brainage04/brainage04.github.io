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

Project, skill, social, and navigation data live in `src/data`. Blog posts live in `src/content/blog`.

## Project catalogue

`src/data/projects.generated.ts` is generated from the configured GitHub star lists. Run `npm run update-projects` to refresh repository descriptions, language percentages, categories, featured ordering, and removed repositories. The daily `Sync project catalogue` workflow runs the same command with the repository's GitHub token and commits changes.

## Validation

```bash
npm run check
npm run lint
npm run format:check
npm run build
```

## Deployment

Pushes to `main` are validated and deployed to [brainage04.github.io](https://brainage04.github.io/) through GitHub Actions and GitHub Pages.
