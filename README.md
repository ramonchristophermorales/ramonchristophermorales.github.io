# Ramon Christopher Morales — Portfolio

A static portfolio built with [Astro](https://astro.build) and TypeScript. It has no server and no database. Pages are prerendered to HTML, and images are converted to AVIF at build time.

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

- **Add a project:** drop screenshots in `src/assets/projects/`, import them at the top of `profile.ts`, and add an entry to `projects`. The first five show as cards (the first two are featured). The rest appear under "Earlier work".
- **Portrait:** `src/assets/img/portrait.png` (transparent background). The social preview card is `src/assets/img/og.jpg` (1200×630).

## Structure

```
src/
  components/   Header, Hero, Work, Experience, Skills, Testimonials, Contact, Icon
  data/         profile.ts (all content)
  layouts/      Base.astro (SEO, Open Graph, JSON-LD, theme)
  scripts/      site.ts (theme toggle, reveal, dialogs, gallery)
  styles/       global.css (design tokens, light/dark)
```

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main`.

1. In the repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main`. In the `ramonchristophermorales.github.io` repo the site is served at `https://ramonchristophermorales.github.io/`. Any other repo name serves it at `/<repo>/`.

**Custom domain:** add it under Settings → Pages. In the workflow, set `SITE_URL` to your domain and `BASE_PATH` to `/`.

The output in `dist/` is plain static files, so it also works on Cloudflare Pages, Netlify or Vercel. Use the build command `npm run build` and the output directory `dist`.
