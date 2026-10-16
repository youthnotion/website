import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: "server",
  session: { driver: "memory" },
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [react(), tailwind()],
});
