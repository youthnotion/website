import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

// Hosted on Vercel. Analytics and Speed Insights are loaded by components in
// BaseLayout.astro, so the adapter's own webAnalytics option stays off.
export default defineConfig({
  site: "https://youthnotion.orgs.bd",
  // Every page is prerendered to static HTML (and its images optimised at build
  // time). Routes that need a server opt out with `export const prerender = false`.
  output: "static",
  adapter: vercel(),
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
