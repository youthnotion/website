import type { APIRoute } from "astro";

// Served on demand (a Vercel function) so uptime checks hit the live deployment, not a static file.
export const prerender = false;

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ status: "ok", runtime: "vercel" }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
