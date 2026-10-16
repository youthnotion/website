import type { APIRoute } from "astro";

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ status: "ok", runtime: "astro-cloudflare" }), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
