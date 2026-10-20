# Ramon Christopher Morales — Portfolio

A static, arcade-style portfolio built with [Astro](https://astro.build) and TypeScript. Visitors score points for exploring: opening projects, unlocking skills, reading reviews and playing the Bug Hunt mini-game. Score and achievements are kept in localStorage. It has no server and no database. Pages are prerendered to HTML, and images are converted to AVIF at build time.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # serve the production build
npm run check     # type-check
```

## Editing content

All content lives in [`src/data/profile.ts`](src/data/profile.ts): intro, projects, experience, skills, education and testimonials.

- **Add a project:** drop screenshots in `src/assets/projects/`, import them at the top of `profile.ts`, and add an entry to `projects`. Every project is a quest card.
- **Scoring:** points, achievements and ranks live in [`src/data/game.ts`](src/data/game.ts).
- **Portrait:** `src/assets/img/portrait.png` (transparent background). The social preview card is `src/assets/img/og.jpg` (1200×630).

## Structure

```
src/
  components/   Hud, Start, Quests, BugHunt, Career, Reviews, Boss, Icon
  data/         profile.ts (all content), game.ts (points, achievements, ranks)
  layouts/      Base.astro (SEO, Open Graph, JSON-LD, theme)
  scripts/      site.ts (theme toggle, reveal, dialogs, gallery), game.ts (score, achievements)
  styles/       global.css (design tokens, light/dark)
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`.

1. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. In the `ramonchristophermorales.github.io` repo the site is served at `https://ramonchristophermorales.github.io/`. Any other repo name serves it at `/<repo>/`.

### Hostinger (ramon.moralesprojects.com)

Hostinger has no Node, so `.github/workflows/hostinger.yml` builds the site on every push to `main` and commits the output (plus `deploy/hostinger/.htaccess`) to the **`hostinger`** branch. The branch contains only the finished website.

The subdomain's web folder is a checkout of that branch. To update the live site, run this over SSH in that folder:

```bash
git pull
```

**Custom domain:** add it under Settings → Pages. In the workflow, set `SITE_URL` to your domain and `BASE_PATH` to `/`.

The output in `dist/` is plain static files, so it also works on Cloudflare Pages, Netlify or Vercel. Use the build command `npm run build` and the output directory `dist`.
