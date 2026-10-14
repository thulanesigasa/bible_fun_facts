import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { chromium } from 'playwright';

// Run after npm run build. NAV_TEST_MODE=development also verifies dev hydration.
const development = process.env.NAV_TEST_MODE === 'development';
const port = 3100;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', development ? 'dev' : 'start', '--hostname', '127.0.0.1', '--port', String(port)], {
  cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'],
});
let serverOutput = '';
server.stdout.on('data', chunk => { serverOutput += chunk; });
server.stderr.on('data', chunk => { serverOutput += chunk; });
const base = `http://127.0.0.1:${port}`;
let browser;
try {
  for (let attempt = 0; ; attempt++) {
    try { await fetch(base); break; } catch {
      if (server.exitCode !== null || attempt >= 120) throw new Error(serverOutput);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox'],
  });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto(base);
  const csp = response.headers()['content-security-policy'];
  assert.equal(csp.includes("'unsafe-eval'"), development, 'eval must be permitted only in development');
  // A delayed effect confirms hydration before testing clicks.
  await page.getByRole('button', { name: 'Essential Only' }).click();
  const toggle = page.locator('.hamburger');
  const menu = page.locator('#mobile-nav-menu');
  async function openMenu() {
    await toggle.tap();
    await page.waitForFunction(() => document.querySelector('.hamburger').getAttribute('aria-expanded') === 'true');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('#mobile-nav-menu')).opacity === '1');
    assert.equal(await menu.evaluate(el => el.inert), false);
    assert.equal(await page.evaluate(() => document.body.style.overflow), 'hidden');
    assert.equal(await toggle.evaluate(el => {
      const r = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2));
    }), true, 'the open panel must not intercept the close button');
    assert.notEqual(await toggle.locator('svg').evaluate(el => getComputedStyle(el).transform), 'none');
  }
  async function closedMenu() {
    await page.waitForFunction(() => document.querySelector('.hamburger').getAttribute('aria-expanded') === 'false');
    await page.waitForFunction(() => getComputedStyle(document.querySelector('#mobile-nav-menu')).visibility === 'hidden');
    assert.equal(await menu.evaluate(el => el.inert), true);
    assert.notEqual(await page.evaluate(() => document.body.style.overflow), 'hidden');
  }
  assert.equal(await toggle.count(), 1);
  await openMenu();
  await toggle.tap();
  await closedMenu();
  await openMenu();
  await page.keyboard.press('Escape');
  await closedMenu();
  assert.equal(await toggle.evaluate(el => el === document.activeElement), true);
  await openMenu();
  await menu.getByRole('link', { name: 'Features', exact: true }).tap();
  await closedMenu();
  await page.waitForFunction(() => Math.abs(document.getElementById('features').getBoundingClientRect().top - 96) < 5);
  // Short mobile viewport needs an independently scrollable menu.
  await page.setViewportSize({ width: 390, height: 320 });
  await openMenu();
  assert.equal(await menu.evaluate(el => el.scrollHeight > el.clientHeight), true);
  await menu.evaluate(el => { el.scrollTop = el.scrollHeight; });
  assert.ok(await menu.evaluate(el => el.scrollTop) > 0);
  await page.setViewportSize({ width: 1280, height: 800 });
  await closedMenu();
  assert.equal(await toggle.isVisible(), false);
  assert.equal(await page.locator('.desktop-nav').isVisible(), true);
  await page.setViewportSize({ width: 390, height: 844 });
  // These pages formerly rendered a second Header with its own state.
  for (const route of ['/about', '/privacy', '/features', '/contact', '/faq']) {
    await page.goto(`${base}${route}`);
    assert.equal(await toggle.count(), 1, `${route} must have one header`);
    await openMenu();
    await toggle.tap();
    await closedMenu();
  }
  await openMenu();
  await menu.getByRole('link', { name: 'FAQ', exact: true }).tap();
  await page.waitForURL(`${base}/#faq`);
  await closedMenu();
  assert.deepEqual(errors, [], 'no JavaScript or CSP errors');
  console.log(`Navigation browser checks passed (${development ? 'development' : 'production'}).`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
  if (server.exitCode === null) await once(server, 'exit');
}
