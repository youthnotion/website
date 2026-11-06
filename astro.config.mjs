import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import vercel from "@astrojs/vercel";

// Use the adapter that matches the host's build environment. Cloudflare remains
// the default for local development and Workers Builds.
const adapter = process.env.NETLIFY
  ? netlify()
  : process.env.VERCEL
    ? vercel()
    : cloudflare({ imageService: "compile" });

export default defineConfig({
  site: "https://youthnotion.orgs.bd",
  // Every page is prerendered to static HTML (and its images optimised at build
  // time). Routes that need a server opt out with `export const prerender = false`.
  output: "static",
  // No feature uses sessions; the memory driver stops the Cloudflare adapter
  // from requiring a SESSION KV binding.
  session: { driver: "memory" },
  adapter,
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
});
