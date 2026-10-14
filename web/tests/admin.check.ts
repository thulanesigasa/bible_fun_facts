import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';
import { adminConfiguration, getAdminUser, handleAdminLogin, handleAdminStats, validateStats } from '../src/lib/admin';
const db=new PGlite();
const id='11111111-1111-4111-8111-111111111111';
const env={NODE_ENV:'production',SUPABASE_ANON_KEY:'test-publishable',SUPABASE_SERVICE_ROLE_KEY:'test-secret',ADMIN_USER_IDS:id,ADMIN_SITE_URL:'https://exegeomai.app',ADMIN_RATE_LIMIT_SALT:'test-only-admin-salt-longer-than-32-characters',ADMIN_TRUSTED_IP_HEADER:'x-test-ip'};
const token='test.access.token.with.twenty.characters';
const user={id,email:'owner@example.com',email_confirmed_at:'2026-10-01T00:00:00Z',is_anonymous:false};
before(async()=>{
  await db.exec('create role anon; create role authenticated; create role service_role bypassrls;');
  await db.exec(await readFile('../supabase/migrations/20261013061117_launch_waitlist.sql','utf8'));
  await db.exec(await readFile('../supabase/migrations/20261014135350_waitlist_admin_dashboard.sql','utf8'));
});
after(async()=>db.close());
function request(body:unknown={email:'owner@example.com',password:'test-password'},headers:Record<string,string>={}) {
  return new Request('https://exegeomai.app/api/admin/login',{method:'POST',headers:{origin:'https://exegeomai.app','content-type':'application/json','x-test-ip':'192.0.2.5',...headers},body:JSON.stringify(body)});
}
async function stats(){return (await db.query<{result:unknown}>('select public.get_launch_waitlist_stats() as result')).rows[0].result;}
const mockFetch:typeof fetch=async(url,init)=>{
  const endpoint=String(url);
  if(endpoint.endsWith('/user'))return Response.json(user);
  if(endpoint.includes('/token?'))return Response.json({access_token:token,expires_in:7200,refresh_token:'never-return-this'});
  if(endpoint.endsWith('/consume_admin_login_attempt'))return Response.json(true);
  if(endpoint.endsWith('/get_launch_waitlist_stats'))return Response.json(await stats());
  throw Error(`Unexpected mock request: ${endpoint}`);
};
test('configuration fails closed for no allowlist, invalid IDs, wrong project and insecure production origin',()=>{
  assert.ok(adminConfiguration(env));assert.equal(adminConfiguration({...env,ADMIN_USER_IDS:''}),null);
  assert.equal(adminConfiguration({...env,ADMIN_USER_IDS:'admin'}),null);
  assert.equal(adminConfiguration({...env,SUPABASE_URL:'https://another.supabase.co'}),null);
  assert.equal(adminConfiguration({...env,ADMIN_SITE_URL:'http://exegeomai.app'}),null);
});
test('unauthenticated stats never reach database or auth service',async()=>{
  let calls=0;const r=await handleAdminStats(undefined,{env,fetch:async()=>{calls++;throw Error('Must not call');}});
  assert.equal(r.status,401);assert.equal(calls,0);assert.match(r.headers.get('cache-control')!,/no-store/);
});
test('forged token, ordinary account, unconfirmed email and anonymous user cannot access admin',async()=>{
  assert.equal(await getAdminUser(token,{env,fetch:async()=>new Response('',{status:401})}),null);
  for(const blocked of [{...user,id:'22222222-2222-4222-8222-222222222222',user_metadata:{role:'admin'}},{...user,email_confirmed_at:null},{...user,is_anonymous:true}]) {
    let count=0;const r=await handleAdminStats(token,{env,fetch:async(url)=>{count++;assert.ok(String(url).endsWith('/user'));return Response.json(blocked);}});
    assert.equal(r.status,401);assert.equal(count,1);
  }
});
test('cross-origin, invalid body and missing trusted IP do not authenticate',async()=>{
  let calls=0;const deps={env,fetch:async()=>{calls++;throw Error('Must not call');}};
  assert.equal((await handleAdminLogin(request(undefined,{origin:'https://other.example'}),deps)).status,403);
  assert.equal((await handleAdminLogin(request({email:'broken',password:'x'}),deps)).status,400);
  assert.equal((await handleAdminLogin(request(undefined,{'x-test-ip':''}),deps)).status,503);
  assert.equal(calls,0);
});
test('persistent rate limit is checked before sign-in and hashes identifiers',async()=>{
  let calls=0;const r=await handleAdminLogin(request(),{env,fetch:async(url,init)=>{
    calls++;assert.ok(String(url).endsWith('/consume_admin_login_attempt'));
    const args=JSON.parse(String(init?.body));assert.match(args.p_ip_hash,/^[a-f0-9]{64}$/);assert.match(args.p_email_hash,/^[a-f0-9]{64}$/);
    assert.ok(!String(init?.body).includes('owner@example.com'));return Response.json(false);
  }});assert.equal(r.status,429);assert.equal(calls,1);assert.equal(r.headers.get('retry-after'),'900');
});
test('authorised sign-in sets a secure HttpOnly cookie without exposing credentials or refresh token',async()=>{
  const r=await handleAdminLogin(request(),{env,fetch:mockFetch});assert.equal(r.status,200);
  assert.deepEqual(await r.json(),{success:true});const cookie=r.headers.get('set-cookie')!;
  assert.match(cookie,/HttpOnly/);assert.match(cookie,/SameSite=Strict/);assert.match(cookie,/Secure/);assert.match(cookie,/Max-Age=3600/);
  assert.ok(!cookie.includes('never-return-this'));
});
test('unavailable rate limiter fails closed and does not reach sign-in',async()=>{
  let calls=0;const r=await handleAdminLogin(request(),{env,fetch:async()=>{calls++;return new Response('',{status:503});}});
  assert.equal(r.status,503);assert.equal(calls,1);
});
test('SQL stats return true zeros, 30 ordered days and no subscriber identities',async()=>{
  const result=validateStats(await stats());assert.ok(result);assert.equal(result.total,0);assert.equal(result.today,0);assert.equal(result.latestSignup,null);
  assert.equal(result.daily.length,30);assert.ok(result.daily.every(d=>d.count===0));assert.ok(!JSON.stringify(result).includes('email'));
});
test('SQL stats use SAST calendar boundaries and count each unique subscription once',async()=>{
  await db.exec(`insert into public.launch_waitlist(email,consented_at) values
    ('today@example.com',now()),
    ('yesterday@example.com',(((now() at time zone 'Africa/Johannesburg')::date-1)::timestamp at time zone 'Africa/Johannesburg')+interval '1 hour'),
    ('week@example.com',now()-interval '6 days'),
    ('month@example.com',now()-interval '29 days'),
    ('old@example.com',now()-interval '40 days');`);
  const result=validateStats(await stats())!;assert.equal(result.total,5);assert.equal(result.today,1);assert.equal(result.last7Days,3);assert.equal(result.last30Days,4);
  assert.equal(result.daily.reduce((n,d)=>n+d.count,0),4);assert.equal(result.timezone,'Africa/Johannesburg');
  const r=await handleAdminStats(token,{env,fetch:mockFetch});assert.equal(r.status,200);assert.ok(!JSON.stringify(await r.json()).includes('today@example.com'));
});
test('SQL rate limits persist per email and per IP, and stale buckets reset',async()=>{
  const ip='a'.repeat(64),email='b'.repeat(64);
  for(let i=0;i<5;i++)assert.equal((await db.query<{ok:boolean}>('select public.consume_admin_login_attempt($1,$2) as ok',[ip,email])).rows[0].ok,true);
  assert.equal((await db.query<{ok:boolean}>('select public.consume_admin_login_attempt($1,$2) as ok',[ip,email])).rows[0].ok,false);
  await db.exec("update public.admin_login_limits set window_start=now()-interval '30 minutes'");
  assert.equal((await db.query<{ok:boolean}>('select public.consume_admin_login_attempt($1,$2) as ok',[ip,email])).rows[0].ok,true);
});
test('ordinary roles cannot query subscriber data, rate buckets or execute admin functions',async()=>{
  for(const role of ['anon','authenticated']) {
    for(const query of ['select * from public.launch_waitlist','select * from public.admin_login_limits','select public.get_launch_waitlist_stats()',`select public.consume_admin_login_attempt('${'c'.repeat(64)}','${'d'.repeat(64)}')`]) {
      await db.exec(`set role ${role}`);await assert.rejects(db.query(query));await db.exec('reset role');
    }
  }
  await db.exec('set role service_role');assert.equal((await db.query<{result:{total:number}}>('select public.get_launch_waitlist_stats() as result')).rows[0].result.total,5);await db.exec('reset role');
});
test('upstream failures and malformed stats produce errors, never invented zero counts',async()=>{
  const r=await handleAdminStats(token,{env,fetch:async(url)=>String(url).endsWith('/user')?Response.json(user):new Response('',{status:500})});
  assert.equal(r.status,503);const body=await r.json();assert.ok(!('total' in body));assert.equal(validateStats({total:0}),null);
});
