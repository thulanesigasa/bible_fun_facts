import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { request as httpRequest } from 'node:http';
import { chromium } from 'playwright';
const base = 'http://127.0.0.1:3200';
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3200'], { stdio: ['ignore','pipe','pipe'] });
let logs = ''; server.stdout.on('data', c=>{logs+=c;}); server.stderr.on('data',c=>{logs+=c;});
let browser;
try {
  for(let i=0;;i++) { try { await fetch(base);break; } catch { if(i>120 || server.exitCode!==null) throw Error(logs); await new Promise(r=>setTimeout(r,500)); } }
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>new URL(m[1]));
  assert.ok(urls.length >= 19);
  assert.ok(urls.every(u=>u.protocol==='https:' && u.hostname==='exegeomai.app' && !u.hash));
  assert.equal(new Set(urls.map(u=>u.href)).size,urls.length);
  const robots=await (await fetch(`${base}/robots.txt`)).text();
  assert.ok(robots.includes('Allow: /'));assert.ok(robots.includes('Disallow: /api/'));assert.ok(robots.includes('https://exegeomai.app/sitemap.xml'));
  const llms=await (await fetch(`${base}/llms.txt`)).text();assert.ok(llms.startsWith('# exégeomai'));assert.equal(await (await fetch(`${base}/llm.txt`)).text(),llms);
  for(const [from,to] of [['/deletion','/account-deletion'],['/safety-and-trust','/safety'],['/privacy.html','/privacy'],['/terms.html','/terms']]) {
    const r=await fetch(`${base}${from}`,{redirect:'manual'});assert.ok([307,308].includes(r.status));assert.ok(r.headers.get('location').endsWith(to));
  }
  const redirect=await new Promise((resolve,reject)=>{
    const req=httpRequest(`${base}/privacy?from=test`,{headers:{Host:'exegeomai.app','X-Forwarded-Proto':'http'}},res=>{res.resume();resolve({status:res.statusCode,location:res.headers.location});});
    req.on('error',reject);req.end();
  });
  assert.equal(redirect.status,308);assert.equal(redirect.location,'https://exegeomai.app/privacy?from=test');
  const seenLinks=new Set();const titles=new Set();const descriptions=new Set();const errors=[];
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,args:['--no-sandbox']});
  const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
    window.__vitals={lcp:0,cls:0};
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__vitals.lcp=e.startTime;}).observe({type:'largest-contentful-paint',buffered:true});
    new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__vitals.cls+=e.value;}).observe({type:'layout-shift',buffered:true});
  });
  let vitals;
  for(const url of urls) {
    const path=url.pathname;
    const response=await page.goto(`${base}${path}`,{waitUntil:'networkidle'});assert.equal(response.status(),200,path);
    assert.ok(response.headers()['strict-transport-security']);
    const canonical=page.locator('link[rel="canonical"]');assert.equal(await canonical.count(),1,path);
    assert.equal(await canonical.getAttribute('href'),path==='/'?'https://exegeomai.app':`https://exegeomai.app${path}`);
    const title=await page.title();assert.ok(title.length>8);assert.ok(!titles.has(title),`Duplicate title: ${path}`);titles.add(title);
    const desc=await page.locator('meta[name="description"]').getAttribute('content');assert.ok(desc.length>70);assert.ok(!descriptions.has(desc),`Duplicate description: ${path}`);descriptions.add(desc);
    assert.ok(!(await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'),path);
    assert.equal(await page.locator('h1').count(),1,path);
    const levels=await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(els=>els.map(e=>Number(e.tagName[1])));
    for(let i=1;i<levels.length;i++)assert.ok(levels[i]<=levels[i-1]+1,`Heading jump in ${path}: ${levels}`);
    assert.equal(await page.locator('img:not([alt])').count(),0,path);
    for(const el of await page.locator('img[alt=""]').all())assert.ok(await el.evaluate(e=>!!e.closest('[aria-hidden="true"]')),`Decorative image not marked: ${path}`);
    assert.ok(await page.locator('meta[property="og:image"]').getAttribute('content'));
    const schemas=await page.locator('script[type="application/ld+json"]').allTextContents();assert.ok(schemas.length>=2);
    for(const schema of schemas)assert.equal(JSON.parse(schema)['@context'],'https://schema.org');
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`Mobile overflow: ${path}`);
    const links=await page.locator('a[href]').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
    for(const href of links) {
      const target=new URL(href,`${base}${path}`);if(target.origin!==base)continue;
      seenLinks.add(target.pathname+target.hash);
    }
    if(path==='/')vitals=await page.evaluate(()=>window.__vitals);
    if(path==='/privacy')assert.ok((await page.locator('article').innerText()).split(/\s+/).length>15000);
    // Small-phone layouts should also fit without horizontal page scrolling.
    await page.setViewportSize({width:320,height:720});
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`320px overflow: ${path}`);
    await page.setViewportSize({width:390,height:844});
  }
  const documents=new Map();
  for(const link of seenLinks) {
    const url=new URL(link,base);const r=await fetch(url.href);assert.equal(r.status,200,`Broken internal link: ${link}`);
    if(url.hash){if(!documents.has(url.pathname))documents.set(url.pathname,await r.text());assert.ok(documents.get(url.pathname).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),`Broken anchor: ${link}`);}
  }
  const og=await fetch(`${base}/opengraph-image`);assert.equal(og.status,200);assert.ok(og.headers.get('content-type').startsWith('image/'));
  assert.deepEqual(errors,[]);
  console.log(`PASS: ${urls.length} pages, ${seenLinks.size} internal links/anchors, unique metadata, single canonicals, heading order, alt attributes, schema, redirects, sitemap, robots, LLM files, and 320/390px layouts.`);
  console.log(`Local browser observation (not field Core Web Vitals): LCP ${Math.round(vitals.lcp)} ms; CLS ${vitals.cls.toFixed(3)}. Real-user INP and hosted metrics need production traffic.`);
} finally { await browser?.close();server.kill('SIGTERM');if(server.exitCode===null)await once(server,'exit'); }
