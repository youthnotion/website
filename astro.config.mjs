import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

// Use the adapter that matches the host's build environment. Cloudflare remains
// the default for local development and Workers Builds.
const adapter = process.env.NETLIFY
  ? netlify()
  : process.env.VERCEL
    ? vercel({
        webAnalytics: {
          enabled: true,
        },
      })
    : cloudflare({ imageService: "compile" });

export default defineConfig({
  site: "https://youthnotion.orgs.bd",
  output: "server",
  session: { driver: "memory" },
  adapter,
  integrations: [react(), tailwind()],
});
