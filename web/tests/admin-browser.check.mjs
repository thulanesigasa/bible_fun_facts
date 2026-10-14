import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { writeFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { chromium } from 'playwright';
const temporary=await mkdtemp(join(tmpdir(),'exegeomai-admin-'));
const fixture=join(temporary,'stats.json');
const daily=Array.from({length:30},(_,i)=>({date:new Date(Date.UTC(2026,8,15+i)).toISOString().slice(0,10),count:i===29?3:i===28?2:0}));
const stats={total:12,today:3,last7Days:5,last30Days:5,latestSignup:'2026-10-14T11:00:00Z',updatedAt:'2026-10-14T12:00:00Z',timezone:'Africa/Johannesburg',daily};
await writeFile(fixture,JSON.stringify(stats));
const base='http://127.0.0.1:3500';
const site='https://exegeomai.app';
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3500'],{stdio:['ignore','pipe','pipe'],env:{...process.env,
  NODE_OPTIONS:`--import ${resolve('tests/mock-admin-fetch.mjs')}`,ADMIN_TEST_FIXTURE:fixture,
  ADMIN_USER_IDS:'11111111-1111-4111-8111-111111111111',ADMIN_SITE_URL:'https://exegeomai.app',
  ADMIN_RATE_LIMIT_SALT:'test-only-admin-salt-longer-than-32-characters',ADMIN_TRUSTED_IP_HEADER:'x-test-ip',
  SUPABASE_ANON_KEY:'test-publishable',SUPABASE_SERVICE_ROLE_KEY:'test-secret',
}});
let logs='';server.stdout.on('data',c=>logs+=c);server.stderr.on('data',c=>logs+=c);let browser;
try{
  for(let i=0;;i++){try{await fetch(base);break;}catch{if(i>100||server.exitCode!==null)throw Error(logs);await new Promise(r=>setTimeout(r,300));}}
  const direct=await fetch(`${base}/admin`,{redirect:'manual'});assert.ok([307,308].includes(direct.status));assert.ok(direct.headers.get('location').endsWith('/admin/login'));
  assert.equal((await fetch(`${base}/api/admin/waitlist`)).status,401);
  browser=await chromium.launch({executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH||undefined,args:['--no-sandbox']});
  const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  // Proxy the canonical HTTPS browser origin to the isolated local test server.
  await page.route('https://exegeomai.app/**',async route=>{
    const url=new URL(route.request().url());
    const response=await route.fetch({maxRedirects:0,url:`${base}${url.pathname}${url.search}`,headers:{...route.request().headers(),cookie:route.request().headers().cookie || '',host:'127.0.0.1:3500',origin:site,'x-test-ip':'192.0.2.40'}});
    await route.fulfill({response});
  });
  await page.goto(`${site}/admin/login`,{waitUntil:'networkidle'});
  assert.ok((await page.locator('meta[name="robots"]').getAttribute('content')).includes('noindex'));
  await page.getByLabel('Email address').fill('owner@example.com');await page.getByLabel('Password',{exact:true}).fill('wrong-password');await page.getByRole('button',{name:'Sign in to dashboard'}).click();
  await page.locator('.admin-error').waitFor();assert.ok((await page.locator('.admin-error').innerText()).includes('authorised'), await page.locator('.admin-error').innerText());
  await page.getByLabel('Password',{exact:true}).fill('dashboard-test-password');await page.getByRole('button',{name:'Sign in to dashboard'}).click();await page.waitForURL(`${site}/admin`);
  await page.locator('.admin-number').first().waitFor();assert.deepEqual(await page.locator('.admin-number').allTextContents(),['12','3','5','5']);
  if(process.env.ADMIN_QA_SCREENSHOT)await page.screenshot({path:process.env.ADMIN_QA_SCREENSHOT,fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
  const cookies=await context.cookies();const session=cookies.find(c=>c.name==='exegeomai_admin_session');assert.ok(session.httpOnly);assert.ok(session.secure);assert.equal(session.sameSite,'Strict');
  const storage=await page.evaluate(()=>({local:Object.keys(localStorage),session:Object.keys(sessionStorage)}));assert.ok(!JSON.stringify(storage).includes('admin_session'));
  await writeFile(fixture,JSON.stringify({fail:true}));await page.getByRole('button',{name:'Refresh',exact:true}).click();await page.locator('.admin-error').waitFor();assert.ok((await page.locator('.admin-error').innerText()).includes('last successful snapshot'));assert.equal(await page.locator('.admin-number').first().innerText(),'12');
  await writeFile(fixture,JSON.stringify({...stats,total:0,today:0,last7Days:0,last30Days:0,latestSignup:null,daily:daily.map(d=>({...d,count:0}))}));
  await page.getByRole('button',{name:'Refresh',exact:true}).click();await page.getByText('No signups in the last 30 days.',{exact:false}).waitFor();assert.equal(await page.locator('.admin-number').first().innerText(),'0');
  await page.setViewportSize({width:320,height:720});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1));
  await page.getByRole('button',{name:'Sign out',exact:true}).click();await page.waitForURL(`${site}/admin/login`);
  assert.ok(!(await context.cookies()).some(c=>c.name==='exegeomai_admin_session'));const protectedPage=await fetch(`${base}/admin`,{redirect:'manual'});assert.ok([307,308].includes(protectedPage.status));assert.ok(protectedPage.headers.get('location').endsWith('/admin/login'));assert.equal((await fetch(`${base}/api/admin/waitlist`)).status,401);
  assert.deepEqual(errors,[]);console.log('PASS: admin login, unauthorised protection, secure cookie, real dashboard rendering, error/stale state, zero state, mobile layouts and logout with mocked providers.');
}finally{await browser?.close();server.kill();if(server.exitCode===null)await once(server,'exit');await rm(temporary,{recursive:true,force:true});}
