# Self-hosted visit counter — setup

Cloudflare Worker + KV. ~10 minutes, no credit card.

## 1. Cloudflare account

1. Go to <https://dash.cloudflare.com/sign-up>, sign up with your email, verify it.
2. You do **not** need to add a domain. Workers run on `*.workers.dev` for free.

## 2. Get the code onto your machine

The worker lives in this repo under `worker/`:

```bash
git clone https://github.com/RealMathModel/RealMathModel.github.io.git
cd RealMathModel.github.io/worker
```

```
worker/
  src/index.js
  wrangler.toml
```

(GitHub Pages will serve these two files as static text at
`/worker/src/index.js` etc. That is harmless — they contain no secrets — but
if you would rather they not be public, move the `worker/` folder to its own
private repo.)

You need Node 18+ (`node -v`). `npx` ships with it; there's nothing to install
globally.

## 3. Log in

```bash
cd worker
npx wrangler login
```

A browser window opens; approve the access request.

## 4. Create the KV namespace

```bash
npx wrangler kv namespace create HITS
```

It prints something like:

```
[[kv_namespaces]]
binding = "HITS"
id = "a1b2c3d4e5f60718293a4b5c6d7e8f90"
```

Copy that `id` into `wrangler.toml`, replacing `PASTE_YOUR_KV_NAMESPACE_ID_HERE`.

Optional — start the count at a non-zero number (e.g. carry over your
GoatCounter total):

```bash
npx wrangler kv key put --binding=HITS total "48213" --remote
```

## 5. Deploy

```bash
npx wrangler deploy
```

Output ends with the live URL, e.g.
`https://rmm-counter.yourname.workers.dev`.

Check it:

```bash
curl -s https://rmm-counter.yourname.workers.dev/
# {"count":0}
```

(That `curl` reads without incrementing — only `POST` from the site's origin
increments.)

## 6. Wire up the page

In `index.html`, replace the GoatCounter badge IIFE with the block in
`counter-block.html`, and set:

```js
var API='https://rmm-counter.yourname.workers.dev/';
```

Commit and push. Load the site, open DevTools → Network, confirm a `POST` to
the worker returning `{"count":N}` and the badge appearing.

## 7. Later changes

Edit `src/index.js`, run `npx wrangler deploy` again. To read or reset the
count:

```bash
npx wrangler kv key get   --binding=HITS total --remote
npx wrangler kv key put   --binding=HITS total "0" --remote
```

---

## What the number means

**Counts:**

- Every full page load from a browser that runs JS and isn't blocking the
  worker domain — once per tab session (the `sessionStorage` guard).
- Repeat visitors: each new tab, and each new session in the same tab after
  the browser clears session storage. This is closer to "visits" than to
  "pageviews" or "unique visitors".

**Doesn't count:**

- **Bots and crawlers** — Googlebot, GPTBot, most scrapers: no JS execution,
  no fetch, no count. Headless browsers *will* count. This is a feature: your
  number stays closer to human traffic than a server log would.
- **Ad blockers / privacy extensions** — uBlock Origin et al. block by
  hostname lists. `workers.dev` isn't on those lists today, so you'll lose far
  fewer hits than GoatCounter does. But a strict blocker or a `connect-src`
  CSP could still drop it, and then the badge just stays hidden.
- **Prefetches / speculative loads** — Chrome's prerender runs JS, so a
  prerendered page that the user never visits *can* count. Small inflation,
  rare in practice.
- **Hash-route navigation** — deliberately excluded by the session guard.
  Clicking around inside the Study Hub adds nothing.
- **Users with JS off**, and anyone whose fetch fails for any reason.

Net: treat the number as "browser sessions that got far enough to run the
script". It will read **lower** than GoatCounter's pageview total (which counts
every hash route change) and **higher** than its unique-visitor count. Keep
GoatCounter open for referrers and per-page breakdowns — the beacon is
untouched.

## Free-tier limits

Workers free plan, per day, per account:

| Resource | Free allowance |
|---|---|
| Worker requests | 100,000 / day |
| CPU time | 10 ms per request (this worker uses well under 1 ms) |
| KV reads | 100,000 / day |
| KV writes | **1,000 / day** |
| KV storage | 1 GB |

**The binding constraint is KV writes: 1,000/day.** One write = one counted
visit. So you're fine up to roughly **1,000 new visits per day**; reads
(repeat loads in an already-counted tab) are effectively free at this scale.

Past that, writes start failing — the worker still returns the last known
count, so the badge keeps working, it just stops rising until midnight UTC.
If you ever get there, the fix is the Workers Paid plan ($5/mo) or the
alternative below.

There is also a hard KV limit worth knowing: **~1 write per second to the same
key**. Sustained bursts above that get rate-limited.

## The honest caveat about KV (read this)

You asked for Worker + KV, and for a personal site it's fine. But KV is the
wrong *primitive* for a counter, and I'd rather you know why:

1. **Lost updates.** Read-modify-write isn't atomic. Two visitors landing
   within the same few hundred milliseconds both read `N` and both write
   `N+1`. You lose one. At your traffic this is a rounding error; at 10
   concurrent visitors it's a visible undercount.
2. **Eventual consistency.** KV reads are served from edge caches and can lag
   writes by up to ~60 seconds globally. A visitor in Cairo may see a number
   a minute behind one in Frankfurt. You specifically asked for "live, not
   hourly-cached" — KV gives you "usually within a minute", not "exact".
3. **1,000 writes/day** as above.

**Durable Objects solve all three.** A Durable Object is a single-threaded
addressable instance with its own transactional storage — increments are
genuinely atomic, reads are strongly consistent, and it's on the Workers free
tier now (with a much higher write budget). It's about the same amount of code
and the same `wrangler deploy`.

If you want it, say so and I'll ship the DO version — same API shape, same
front-end block, so nothing in `index.html` changes. I built KV because you
specified it, and it will work; I just wouldn't call it the better design.

## Security notes

- No token, key, or secret is in `index.html`. The page sends an unauthenticated
  `POST` and reads a number back. That's the whole contract.
- `Access-Control-Allow-Origin` is the exact site origin, never `*`, and
  `Vary: Origin` is set so no cache mixes responses across origins.
- CORS is a *browser* control, not a security boundary. Anyone can `curl -X
  POST` your worker with a forged `Origin` header and inflate the count. For a
  visit badge that's acceptable; there's no way to prevent it without either a
  secret in the page (which you correctly ruled out) or Cloudflare Turnstile.
  If it ever gets abused, add a Cloudflare Rate Limiting rule on the worker
  route — it's free and takes two minutes.
- `Cache-Control: no-store` on every response keeps browsers and Cloudflare's
  edge from serving a stale number.
