# Youth Notion

Youth Notion is an Astro site that reuses the original React components, Tailwind styles, and brand assets. Astro server renders the public home and about pages with Cloudflare's Workers adapter. Authentication, payment, journal, and contact flows are not part of this site.

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

- `src/pages/` contains the home, about, health, and not-found routes.
- `src/components/` contains the React sections and Astro navigation.
- `src/layouts/Layout.astro` defines shared document metadata and site chrome.
- `src/styles/index.css` and `tailwind.config.ts` preserve the site's Tailwind styling.
- `public/` contains the site brand and page assets, including the Youth Notion favicon.
