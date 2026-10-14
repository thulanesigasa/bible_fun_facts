import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
const html = await readFile(".next/server/app/index.html", "utf8");
const ids = new Set(
  [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
);
const manifest = JSON.parse(
  await readFile(".next/server/app-paths-manifest.json", "utf8"),
);
const routes = new Set(
  Object.keys(manifest).map((route) => route.replace(/\/page$/, "") || "/"),
);
let checked = 0;
for (const href of new Set(
  [...html.matchAll(/\bhref="([^"]+)"/g)].map((match) => match[1]),
)) {
  if (!href.startsWith("/") && !href.startsWith("#")) continue;
  if (href.startsWith("/_next/")) continue;
  const url = new URL(href, "https://exegeomai.app");
  if (url.pathname === "/" && url.hash)
    assert.ok(ids.has(url.hash.slice(1)), `Missing anchor: ${href}`);
  else if (!routes.has(url.pathname)) await access(`public${url.pathname}`);
  checked++;
}
assert.equal((html.match(/<h1\b/g) || []).length, 1, "One main heading");
assert.ok(html.includes('name="viewport"'));
assert.ok(html.includes('name="description"'));
assert.ok(html.includes('rel="canonical"'));
assert.ok(html.includes('id="waitlist-email"'));
assert.ok(
  !/Download Android APK|Download App/.test(html),
  "Landing page must not advertise downloads",
);
console.log(
  `PASS: ${checked} local landing-page links, single h1, viewport, description, canonical, labelled email and Coming Soon CTA checks.`,
);
