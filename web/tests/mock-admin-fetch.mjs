// Test-server preload only. Not imported by application code.
import { readFile } from 'node:fs/promises';
const originalFetch=globalThis.fetch;
const id='11111111-1111-4111-8111-111111111111';
const token='test.access.token.with.twenty.characters';
globalThis.fetch=async(input,init)=>{
  const url=typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
  if(!url.startsWith('https://ibwooiejzxhbzplnldcz.supabase.co/'))return originalFetch(input,init);
  if(url.endsWith('/consume_admin_login_attempt'))return Response.json(true);
  if(url.includes('/token?')){
    const body=JSON.parse(init?.body ? String(init.body) : input instanceof Request ? await input.clone().text() : '{}');
    return body.password==='dashboard-test-password'?Response.json({access_token:token,expires_in:3600}):Response.json({error:'Invalid credentials'},{status:401});
  }
  if(url.endsWith('/user')){
    const headers=new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));
    return headers.get('authorization')===`Bearer ${token}`?Response.json({id,email:'owner@example.com',email_confirmed_at:'2026-10-01T00:00:00Z',is_anonymous:false}):Response.json({error:'Unauthorised'},{status:401});
  }
  if(url.endsWith('/get_launch_waitlist_stats')){
    const fixture=JSON.parse(await readFile(process.env.ADMIN_TEST_FIXTURE,'utf8'));
    return fixture.fail?Response.json({error:'Test database unavailable'},{status:503}):Response.json(fixture);
  }
  throw Error('Unexpected Supabase request in admin browser test');
};
