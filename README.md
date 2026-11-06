# Youth Notion

The Youth Notion website, built with [Astro](https://astro.build) and no UI framework. Every page is prerendered to static HTML at build time, and images are optimised during the build. The only on-demand route is `/api/health.json`. The site has a single, permanently dark theme.

## Local development

Requires Node.js 18.20.8 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro (usually `http://localhost:4321`). To preview the Cloudflare Worker build locally, run:

```sh
npm run build
npx wrangler dev
```

## Cloudflare Workers Builds

Use the repository's `main` branch and configure:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Build output directory: leave unset; Wrangler reads the Worker and assets paths from `wrangler.jsonc`.

The Astro Cloudflare adapter writes the server entry point to `dist/_worker.js/index.js` and static assets to `dist/`. No database binding is required. The current site does not use sessions or persistence; D1 can be added when a future feature needs it.

For a local one-step build and deploy, use `npm run deploy`.

## Netlify and Vercel

The Astro config selects the matching server adapter from the host's build environment (`NETLIFY` or `VERCEL`). Cloudflare remains the default for local development and Cloudflare Workers Builds.

- **Netlify:** use `npm run build` as the build command and `dist` as the publish directory. The Netlify build environment selects `@astrojs/netlify` and deploys SSR routes as Netlify Functions.
- **Vercel:** import the repository and let Vercel detect Astro. The Vercel build environment selects `@astrojs/vercel` and deploys SSR routes to Vercel Functions.

Each provider builds its own adapter output from the same source; do not upload a Cloudflare Worker build artifact to Netlify or Vercel.

## Site structure

```
src/
  data/         All site copy and facts: site.ts (contact, navigation, socials),
                team.ts, projects.ts, careers.ts, content.ts (objectives, journey, FAQ)
  assets/       Images that Astro optimises at build time (team photos, logo, project logos)
  layouts/      BaseLayout.astro: document head, SEO, structured data, header and footer
  components/
    layout/     Header and Footer
    ui/         Reusable pieces: Button, Icon, Logo, Emblem, PageHero, ProjectCard, Portrait…
    ui/hero-art/  The animation in each inner page's hero, passed to PageHero as `slot="art"`
    sections/   Page sections, one folder per page (home/, about/, team/, projects/)
  scripts/      Client-side TypeScript (the home hero's node field, the team constellation)
  lib/          Small shared helpers (octagon geometry)
  styles/       global.css: design tokens, typography and shared utilities
  pages/        One file per route
public/         Files served as-is (favicon, social image, robots.txt, llms.txt)
```

### Editing content

- **Team members:** add the photo to `src/assets/team/`, import it in `src/data/team.ts`, and add an entry. Roles starting with "Director" are listed first and badged. The team count shown across the site updates automatically.
- **Projects:** edit `src/data/projects.ts`. The home page, projects page, footer and hero emblem all read from it.
- **FAQ, objectives and the about-page journey:** edit `src/data/content.ts`.
- **Job postings:** edit `src/data/careers.ts`. Each role gets its own page, Google job data and a sitemap entry automatically. Remove a role when it closes.

### Styling

Styles are scoped to each component in its `<style>` block. Shared design tokens (colours, fonts, spacing) live as CSS custom properties at the top of `src/styles/global.css`. The recurring cut-corner shape is the `.chamfer` utility, and `.octagon` crops to the logo's octagon.
