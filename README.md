# Praxis Website

Bilingual static website for a psychotherapy practice. The working project name is temporary;
the final practice name can be changed centrally once it has been chosen.

## Technology

- Semantic HTML
- Bootstrap and custom Sass
- Modern JavaScript modules
- Vite development and production builds
- ESLint and Prettier quality checks

All JavaScript dependencies are installed locally in `node_modules` and recorded in
`package-lock.json`. The dependency directory and generated `dist` directory are excluded from
Git.

## Local development on Fedora

From this directory:

```bash
nvm use
npm install
npm run dev
```

Vite prints a local URL, normally `http://localhost:5173`. Open it in a browser and leave the
terminal running while editing. Press `Ctrl+C` in that terminal to stop the server.

## Checks

```bash
npm run lint
npm run format:check
npm run build
npm run preview
```

`npm run build` creates the deployable static site in `dist/`. Do not edit files in `dist/`
directly because it is regenerated from the source files.

## Continuous feedback deployment

Every push to the `develop` branch runs the quality checks, creates a production build, and deploys
that build to GitHub Pages:

<https://joao4569.github.io/praxis-website/>

The preview is public, so it must never contain patient information, credentials, private notes, or
other sensitive data. Preview builds include a `noindex, nofollow` directive for search engines.
This discourages indexing but does not make the site private.

The deployment workflow is stored in `.github/workflows/deploy-pages.yml`. Its repository-aware
base path ensures that styles, scripts, pages, and language links work under `/praxis-website/`.

The normal feedback cycle is:

1. Make and test changes locally.
2. Commit approved work on `develop`.
3. Push `develop` to GitHub.
4. Wait for the “Deploy feedback site to GitHub Pages” workflow to finish.
5. Share or refresh the Pages URL above.

When the real domain is connected, the deployment base path and preview-only search directive must
be changed for production.
