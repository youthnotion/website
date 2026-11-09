# Youth Notion

The Youth Notion website, built with [Astro](https://astro.build) and no UI framework. Every page is prerendered to static HTML at build time, and images are optimised during the build. The only on-demand route is `/api/health.json`. The site has a single, permanently dark theme.

## Local development

Requires Node.js 18.20.8 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Astro (usually `http://localhost:4321`). `npm run build` produces the production build, and `npm run check` type-checks the project.

## Deployment

The site is hosted on Vercel, which builds and deploys every push to `main` automatically; pull requests get preview deployments. Vercel detects Astro, so no build settings are needed. All pages are prerendered, and `/api/health.json` runs as a serverless function.

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
