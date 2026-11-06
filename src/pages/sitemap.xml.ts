import type { APIRoute } from "astro";
import { roles } from "@/data/careers";

// Generated so a new job posting is listed for search engines automatically.
// Trailing slashes match the canonical URL each page declares.
const paths = ["/", "/about/", "/team/", "/projects/", "/careers/", ...roles.map((role) => `/careers/${role.slug}/`)];

export const GET: APIRoute = ({ site }) => {
  const urls = paths.map((path) => `  <url><loc>${new URL(path, site)}</loc></url>`).join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "content-type": "application/xml; charset=utf-8" } },
  );
};
