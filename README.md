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
