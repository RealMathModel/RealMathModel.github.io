/**
 * realmathmodel visit counter — Cloudflare Worker + KV
 *
 * GET  /  -> read the current total, no increment
 * POST /  -> increment the total, return the new value
 * OPTIONS -> CORS preflight
 *
 * Response body is always {"count": <number>}.
 * CORS is locked to the site origin; no secrets live in the page.
 */

const ALLOWED_ORIGIN = "https://realmathmodel.github.io";
const KEY = "total";

function corsHeaders(origin) {
  const h = {
    "Vary": "Origin",
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  };
  if (origin === ALLOWED_ORIGIN) {
    h["Access-Control-Allow-Origin"] = ALLOWED_ORIGIN;
    h["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
    h["Access-Control-Allow-Headers"] = "Content-Type";
    h["Access-Control-Max-Age"] = "86400";
  }
  return h;
}

function json(body, status, origin) {
  return new Response(JSON.stringify(body), {
    status,
    headers: Object.assign(
      { "Content-Type": "application/json; charset=utf-8" },
      corsHeaders(origin)
    ),
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      // Preflight. Only the allowed origin gets ACAO headers back, so any
      // other origin's preflight fails in the browser as intended.
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "GET" && request.method !== "POST") {
      return json({ error: "method not allowed" }, 405, origin);
    }

    // Reject cross-origin reads from anywhere else outright. A missing Origin
    // header (curl, server-side) is allowed to read but not to increment.
    if (origin && origin !== ALLOWED_ORIGIN) {
      return json({ error: "forbidden" }, 403, origin);
    }

    const raw = await env.HITS.get(KEY);
    let count = parseInt(raw || "0", 10);
    if (!Number.isFinite(count) || count < 0) count = 0;

    if (request.method === "POST" && origin === ALLOWED_ORIGIN) {
      count = count + 1;
      await env.HITS.put(KEY, String(count));
    }

    return json({ count }, 200, origin);
  },
};
