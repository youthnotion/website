import type { APIRoute } from "astro";

// Served on demand so uptime checks hit the running worker, not a static file.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ status: "ok", runtime: "astro-cloudflare" }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
