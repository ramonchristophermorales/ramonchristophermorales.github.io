// @ts-check
import process from 'node:process';
import { defineConfig } from 'astro/config';

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow.
// For a custom domain, set BASE_PATH to "/" (or leave it unset).
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://ramonchristophermorales.github.io',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  image: { responsiveStyles: true },
});
